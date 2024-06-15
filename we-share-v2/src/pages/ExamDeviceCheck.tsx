import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';
import { enterFullscreen } from '../helper/helper';
import WebCam from '../components/WebCam';
import { getModel, loadModel } from '../helper/loadModelHelper';
import { useAppDispatch } from '../app/hooks';
import { setShowToast } from '../feature/exam/examSlice';
import {
    BackArrowIcon,
    CheckedIcon,
    CloseIcon,
    MicIcon,
    SpeakerIcon,
    TipsIcon,
    VideoIcon,
} from '../helper/icons';
import Dropdown from '../components/common/Dropdown';
import { CustomError } from '../types';
import { Toast } from '../helper/toast';

function ExamDeviceCheck() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeviceChecked, setIsDeviceChecked] = useState(false);
    const [isModelsLoaded, setIsModelsLoaded] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [checkCameraPermission, setCheckCameraPermission] = useState<boolean>(true);
    const [checkMicPermission, setCheckMicPermission] = useState<boolean>(true);
    const [videoOptions, setVideoOptions] = useState<string[]>([]);
    const [audioOptions, setAudioOptions] = useState<string[]>([]);

    const micToastShownRef = useRef<boolean>(false);
    const cameraToastShownRef = useRef<boolean>(false);

    const handleDropdownToggle = (dropdown: number | null) => {
        setOpenDropdown((prev: number | null) =>
            prev === dropdown ? null : dropdown
        );
    };

    useEffect(() => {
        async function initializeModel() {
            await loadModel();
            const model = getModel();
            if (model) {
                setIsModelsLoaded(true);
            }
        }
        initializeModel();
    }, [isModelsLoaded]);

    const handlePermissionChange = async (permissionName: 'microphone' | 'camera') => {
        try {
            const permission = await navigator.permissions.query({ name: permissionName as PermissionName });
            const newState = permission.state === 'granted';

            if (permissionName === 'microphone') {
                setCheckMicPermission(newState);
                if (!newState && !micToastShownRef.current) {
                    Toast.Error('Microphone permission denied', CustomError.audioError);
                    micToastShownRef.current = true;
                }
            } else if (permissionName === 'camera') {
                setCheckCameraPermission(newState);
                if (!newState && !cameraToastShownRef.current) {
                    Toast.Error('Camera permission denied', CustomError.webCamError);
                    cameraToastShownRef.current = true;
                }
            }
        } catch (error) {
            console.error(`Error checking ${permissionName} permission:`, error);
        }
    };

    useEffect(() => {
        const checkPermissions = async () => {
            try {
                const micPermission = await navigator.permissions.query({ name: 'microphone' as PermissionName });
                const cameraPermission = await navigator.permissions.query({ name: 'camera' as PermissionName });

                handlePermissionChange('microphone');
                handlePermissionChange('camera');

                micPermission.onchange = () => {
                    micToastShownRef.current = false;
                    handlePermissionChange('microphone');
                };
                cameraPermission.onchange = () => {
                    cameraToastShownRef.current = false;
                    handlePermissionChange('camera');
                };
            } catch (error) {
                console.error('Error checking permissions:', error);
            }
        };

        checkPermissions();

        return () => {
            navigator.permissions.query({ name: 'microphone' as PermissionName }).then(permission => {
                permission.onchange = null;
            });
            navigator.permissions.query({ name: 'camera' as PermissionName }).then(permission => {
                permission.onchange = null;
            });
        };
    }, []);

    useEffect(() => {
        const getDevices = async () => {
            try {
                let audioStream = null;
                let videoStream = null;

                if (checkMicPermission) {
                    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                }

                if (checkCameraPermission) {
                    videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                }

                // Combine audio and video devices
                const audioDevices = audioStream ? await navigator.mediaDevices.enumerateDevices() : [];
                const videoDevices = videoStream ? await navigator.mediaDevices.enumerateDevices() : [];

                const filteredDevices = [
                    ...audioDevices.filter(device => device.kind === 'audioinput'),
                    ...videoDevices.filter(device => device.kind === 'videoinput')
                ] as MediaDeviceInfo[];

                setDevices(filteredDevices);

                // Cleanup streams
                if (audioStream) {
                    audioStream.getTracks().forEach(track => track.stop());
                }
                if (videoStream) {
                    videoStream.getTracks().forEach(track => track.stop());
                }

            } catch (error) {
                console.error('Error getting devices:', error);
                setDevices([]);
            }
        };

        getDevices();
    }, [checkMicPermission, checkCameraPermission]);


    useEffect(() => {
        const filterVideoOptions = (deviceList: MediaDeviceInfo[]) => {
            setVideoOptions(deviceList.filter(device => device.kind === 'videoinput').map(device => device.label));
        }
        filterVideoOptions(devices);

        const filterAudioOptions = (deviceList: MediaDeviceInfo[]) => {
            setAudioOptions(deviceList.filter(device => device.kind === 'audioinput').map(device => device.label));
        }

        filterAudioOptions(devices);
    }, [devices]);

    return (
        <div className="h-[100dvh] px-5 md:px-20 bg-[#f4fbf9] grid place-items-center">
            <div className="flex w-full flex-col min-h-[31.25rem] h-[31.25rem] box-border gap-16 items-center md:flex-row md:gap-10">
                <div className="h-full flex-1">
                    <div className="h-full w-full relative">
                        {isModelsLoaded ? (
                            <WebCam isModelsLoaded={isModelsLoaded} />
                        ) : (
                            <div className="h-full w-full text-[#fff] bg-[#000] grid place-items-center">
                                <p>Please Wait...</p>
                            </div>
                        )}
                        <div className="w-2 h-[60%] max-h-[60%] absolute bottom-12 left-6 flex flex-col items-center gap-2">
                            <div className="h-full overflow-clip rotate-180 rounded-md bg-[#fff] w-full relative">
                                <div className="absolute top-0 left-0 rounded-md bg-[#E38800] h-[40%] w-full"></div>
                            </div>
                            <div className="bg-[#EFEFEF] rounded-[50%] h-[40px] w-[35px] grid place-items-center">
                                <SpeakerIcon
                                    style={{
                                        fontSize: '18px',
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <p className="mt-5 text-[17px] flex items-center ">
                        <span className="text-[#47a992] font-bold inline-flex">
                            <TipsIcon
                                style={{
                                    fontSize: '34px',
                                    marginTop: '-5px',
                                    marginRight: '2px',
                                }}
                            />{' '}
                            <span
                                style={{
                                    marginTop: '3px',
                                    marginRight: '10px',
                                }}
                            >
                                Tips:{' '}
                            </span>
                        </span>
                        <span className="inline-block mt-[3px]">
                            Stay in a well lit area for better experience
                        </span>
                    </p>
                </div>
                {!isDeviceChecked ? (
                    <div className="h-full flex-1 flex flex-col justify-between">
                        <div>
                            <h1>Test Device</h1>
                            <p className="text-lg mt-3">
                                Verify your audio and video permissions by
                                confirming your camera and microphone settings
                                prior to the exam.
                            </p>
                        </div>
                        <div>
                            <h4>Set Preferences</h4>
                            <div className="flex flex-col w-max gap-4 mt-4">
                                <Dropdown
                                    isOpen={openDropdown === 1}
                                    onToggle={() => handleDropdownToggle(1)}
                                    options={audioOptions}
                                />
                                <Dropdown
                                    isWebCam
                                    isOpen={openDropdown === 2}
                                    onToggle={() => handleDropdownToggle(2)}
                                    options={videoOptions}
                                />
                            </div>
                        </div>
                        <div>
                            <Button
                                variant="secondary"
                                handleBtnClick={() => {
                                    setIsDeviceChecked(true);
                                }}
                            >
                                Check Device
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="h-full flex-1 flex flex-col items-start w-full">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setIsDeviceChecked(false)}
                        >
                            <BackArrowIcon
                                style={{
                                    fontSize: '18px',
                                    color: '#47a992',
                                    marginRight: '5px',
                                }}
                            />
                            <span className="font-semibold">Back</span>
                        </div>
                        <div className="mt-6">
                            <h1>Test Device</h1>
                            <p className="text-lg mt-3">
                                Ensure your device is set properly.
                            </p>
                        </div>
                        <div className="flex flex-col w-max gap-4 mt-6 text-[18px] text-[#949191]">
                            <div className="flex items-center">
                                <MicIcon style={{ fontSize: '25px' }} />
                                <p className="ml-3 w-[100px]">Microphone</p>
                                <p className="text-[#47a992] flex items-center ml-6 gap-2 font-semibold">
                                    {audioOptions.length > 0 && (
                                        <>
                                            <CheckedIcon />
                                            Ok
                                        </>
                                    )}                                </p>
                                <p className="text-red-400 flex items-center ml-6 gap-2 font-semibold">

                                    {audioOptions.length === 0 && (<> <CloseIcon /> Not Found</>)}
                                </p>
                            </div>
                            <div className="flex items-center">
                                <VideoIcon style={{ fontSize: '25px' }} />
                                <p className="ml-3 w-[100px]">Camera</p>
                                <p className="text-[#47a992] flex items-center ml-6 gap-2 font-semibold">
                                    {videoOptions.length > 0 && (
                                        <>
                                            <CheckedIcon />
                                            Ok
                                        </>
                                    )}
                                </p>
                                <p className="text-red-400 flex items-center ml-6 gap-2 font-semibold">
                                    {videoOptions.length === 0 && (< > <CloseIcon /> Not Found</>)}
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto">
                            <Button
                                variant="secondary"
                                handleBtnClick={() => {
                                    dispatch(setShowToast(true));
                                    navigate('/exam-portal');
                                    enterFullscreen();
                                }}
                            >
                                Start Exam
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExamDeviceCheck;
