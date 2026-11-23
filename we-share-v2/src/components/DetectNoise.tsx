import React, { useRef, useEffect } from 'react';
import { Toast } from '../helper/toast';
import { CustomError } from '../types/question';

declare global {
    interface Window {
        vad: any;
        ort: any;
    }
}

function DetectNoise({
    setSoundLevel,
}: {
    setSoundLevel: React.Dispatch<React.SetStateAction<number>>;
}) {
    const vadRef = useRef<any>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const intervalRef = useRef<number | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        const initVAD = async () => {
            if (window.vad && window.ort) {
                try {
                    // MicVAD loads its own model; no separate onnx load needed here
                    vadRef.current = await window.vad.MicVAD.new({});
                    vadRef.current.start();

                    const audioContext = new AudioContext();
                    audioContextRef.current = audioContext;
                    const analyser = audioContext.createAnalyser();
                    analyser.fftSize = 2048;
                    analyser.smoothingTimeConstant = 0.8;
                    analyserRef.current = analyser;

                    navigator.mediaDevices
                        .getUserMedia({ audio: true })
                        .then((stream) => {
                            mediaStreamRef.current = stream;
                            const source =
                                audioContext.createMediaStreamSource(stream);
                            source.connect(analyser);
                            const bufferLength = analyser.frequencyBinCount;
                            const dataArray = new Uint8Array(bufferLength);

                            const updateSoundLevel = () => {
                                analyser.getByteFrequencyData(dataArray);
                                let sum = 0;
                                for (let i = 0; i < bufferLength; i++) {
                                    sum += dataArray[i];
                                }
                                const average = sum / bufferLength;
                                const threshold = 8;
                                setSoundLevel(
                                    average < threshold ? 0 : average
                                );
                            };

                            // Start updating sound level
                            intervalRef.current = window.setInterval(
                                updateSoundLevel,
                                100
                            ); // Update every 100ms
                        })
                        .catch((error) => {
                            console.error('Error accessing microphone:', error);
                        });
                } catch (error) {
                    console.error('Error initializing VAD:', error);
                    Toast.Error(
                        'Failed to initialize VAD',
                        CustomError.audioError
                    );
                }
            } else {
                console.error('VAD or ORT library not loaded');
                Toast.Error('Failed to initialize VAD', CustomError.audioError);
            }
        };

        initVAD();

        return () => {
            if (vadRef.current) {
                console.log(vadRef.current, 'vad red >>>>>>>>>>>');
                if (vadRef.current.pause) {
                    console.log('vad paused');
                    vadRef.current.pause(); // Call pause to stop VAD
                }
            }
            if (
                audioContextRef.current &&
                audioContextRef.current.state !== 'closed'
            ) {
                audioContextRef.current.close().catch((error) => {
                    console.error('Error closing AudioContext:', error);
                });
            }
            console.log('this is medistream ref', mediaStreamRef.current);
            if (mediaStreamRef.current) {
                const tracks = mediaStreamRef.current.getTracks();
                tracks.forEach((track) => track.stop());
            }
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);
    return null;
}

export default DetectNoise;
