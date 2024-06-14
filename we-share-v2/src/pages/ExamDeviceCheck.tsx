import { useEffect, useState } from 'react';
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

function ExamDeviceCheck() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isDeviceChecked, setIsDeviceChecked] = useState(false);
    const [isModelsLoaded, setIsModelsLoaded] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<number | null>(null);

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
                                />
                                <Dropdown
                                    isWebCam
                                    isOpen={openDropdown === 2}
                                    onToggle={() => handleDropdownToggle(2)}
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
                                    <CheckedIcon /> Ok
                                </p>
                                <p className="text-red-400 flex items-center ml-6 gap-2 font-semibold">
                                    <CloseIcon /> Not found
                                </p>
                            </div>
                            <div className="flex items-center">
                                <VideoIcon style={{ fontSize: '25px' }} />
                                <p className="ml-3 w-[100px]">Camera</p>
                                <p className="text-[#47a992] flex items-center ml-6 gap-2 font-semibold">
                                    <CheckedIcon /> Ok
                                </p>
                                <p className="text-red-400 flex items-center ml-6 gap-2 font-semibold">
                                    <CloseIcon /> Not found
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
