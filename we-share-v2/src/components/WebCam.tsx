import { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import { detectNoise } from '../helper/helper';
import { Toast } from '../helper/toast';
import { CustomError } from '../types';

const WebCam = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isModelsLoaded, setIsModelsLoaded] = useState(false);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isNoise, setIsNoise] = useState(false);
    const [noiseLevel, setNoiseLevel] = useState(0);

    useEffect(() => {
        // Load models and start detection
        const loadModels = async () => {
            await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
            await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
            setIsModelsLoaded(true);
        };

        loadModels();
    }, []);

    // useEffect(() => {
    //     detectNoise(setNoiseLevel);
    //     setIsNoise((prevState) => !prevState);
    // }, [noiseLevel]);

    useEffect(() => {
        if (isModelsLoaded) {
            // Start video feed
            const startVideo = async () => {
                if (
                    navigator.mediaDevices &&
                    navigator.mediaDevices.getUserMedia
                ) {
                    navigator.mediaDevices
                        .getUserMedia({ video: {} })
                        .then((stream) => {
                            if (videoRef.current) {
                                videoRef.current.srcObject = stream;
                                videoRef.current.onloadedmetadata = () => {
                                    videoRef.current?.play();
                                    setIsVideoPlaying(true);
                                    detectFace();
                                };
                            }
                        })
                        .catch((err) =>
                            console.error('getUserMedia error:', err)
                        );
                }
            };

            startVideo();
        }
    }, [isModelsLoaded]);

    const detectFace = async () => {
        const video = videoRef.current;

        // The function that will be called in each frame
        const detect = async () => {
            try {
                if (video) {
                    const detections = await faceapi
                        .detectAllFaces(
                            video,
                            new faceapi.TinyFaceDetectorOptions()
                        )
                        .withFaceLandmarks();

                    if (detections.length > 0) {
                        const landmarks = detections[0].landmarks;
                        const leftEye = landmarks.getLeftEye();
                        const rightEye = landmarks.getRightEye();

                        const videoWidth = video.videoWidth;
                        const videoHeight = video.videoHeight;
                        const videoCenterX = videoWidth / 2;
                        const videoCenterY = videoHeight / 2;

                        const leftEyeX = leftEye[0].x;
                        const leftEyeY = leftEye[0].y;
                        const rightEyeX = rightEye[0].x;
                        const rightEyeY = rightEye[0].y;

                        const averageEyeX = (leftEyeX + rightEyeX) / 2;
                        const averageEyeY = (leftEyeY + rightEyeY) / 2;

                        const tolerance = 50; // Adjust this value based on your preference
                        const isLookingAtScreen =
                            Math.abs(averageEyeX - videoCenterX) < tolerance &&
                            Math.abs(averageEyeY - videoCenterY) < tolerance;

                        if (!isLookingAtScreen) {
                            // Toast.Error(
                            //     'Please look at your screen',
                            //     CustomError.webCamError
                            // );
                        }
                    }
                } else {
                    throw new Error('Please look at your screen');
                }
            } catch (error) {
                console.log(error, 'error');

                // Toast.Error(
                //     'Please look at your screen',
                //     CustomError.webCamError
                // );
            }

            // Schedule the next frame
            requestAnimationFrame(detect);
        };

        // Start the detection loop
        requestAnimationFrame(detect);
    };

    return (
        <div>
            <h2>Web Cam</h2>
            {((isModelsLoaded && !isVideoPlaying) || !isModelsLoaded) && (
                <div>Please wait...</div>
            )}
            <video
                ref={videoRef}
                className={`rounded-xl  max-h-[340px] my-2.5 ${isNoise ? 'outline outline-4 outline-offset-0 outline-[#1935CA]' : ''}`}
            />
        </div>
    );
};

export default WebCam;
