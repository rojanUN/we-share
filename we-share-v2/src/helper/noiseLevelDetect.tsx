import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NOISE_THRESHOLD = 0.12;
let showToast = true;

const NoiseDetect: React.FC = () => {
    const [noiseLevel, setNoiseLevel] = useState<number>(0);

    useEffect(() => {
        const startMonitoring = async () => {
            try {
                const audioCtx = new (window.AudioContext)();
                console.log('AudioContext state:', audioCtx.state);
                if (audioCtx.state === 'suspended') {
                    await audioCtx.resume();
                    console.log('Resumed AudioContext');
                }

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                console.log('Microphone access granted');

                const source = audioCtx.createMediaStreamSource(stream);

                console.log('Loading audio worklet module...');
                await audioCtx.audioWorklet.addModule('worklet/worklet.js');
                console.log('Audio worklet module loaded');
                const noiseLevelProcessor = new AudioWorkletNode(audioCtx, 'noise-level-processor');

                noiseLevelProcessor.port.onmessage = (event: MessageEvent) => {
                    const newNoiseLevel = event.data as number;
                    setNoiseLevel(newNoiseLevel);
                    if (newNoiseLevel > NOISE_THRESHOLD && showToast) {
                        showToast = false;
                        toast.error('High Noise Detected!', {
                            onClose: () => {
                                showToast = true;
                            }
                        });
                    }
                };

                console.log('Connecting audio nodes...');
                source.connect(noiseLevelProcessor);
                noiseLevelProcessor.connect(audioCtx.destination);
                console.log('Audio nodes connected');
            } catch (error) {
                console.error('Error starting audio context:', error);
                toast.error('Error starting audio context. Please make sure you have granted microphone access.');
            }
        };

        startMonitoring();
    }, []);

    return (
        <div>
            <h1>Noise Level Detector</h1>
            <p>Current Noise Level: {noiseLevel.toFixed(2)}</p>
            <button id="startButton">Start Monitoring</button>
            <ToastContainer />
        </div>
    );
};

export default NoiseDetect;
