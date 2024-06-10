import { Toast } from './toast';
import { CustomError } from '../types';

export const detectNoise = (
    setNoiseLevel: React.Dispatch<React.SetStateAction<number>>
) => {
    let mediaStream: MediaStream | null = null;
    let audioContext: AudioContext | null = null;
    let analyser: AnalyserNode | null = null;
    let scriptProcessor: ScriptProcessorNode | null = null;
    let average = 0;
    let lastToastTime = 0;
    const toastCooldown = 3000; // 5 seconds cooldown

    const handleSuccess = (stream: MediaStream) => {
        mediaStream = stream;
        const AudioContext =
            window.AudioContext || (window as any).webkitAudioContext;
        audioContext = new AudioContext();
        analyser = audioContext.createAnalyser();
        scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 2048;

        const microphone = audioContext.createMediaStreamSource(mediaStream);
        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = () => {
            if (analyser) {
                const array = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(array);

                let values = 0;

                for (let i = 0; i < array.length; i++) {
                    values += array[i];
                }

                average = Math.round(values / array.length);
                if (average > 60) {
                    const currentTime = Date.now();
                    if (currentTime - lastToastTime > toastCooldown) {
                        // Toast.Error(
                        //     'Too much noise detected',
                        //     CustomError.audioError
                        // );
                        lastToastTime = currentTime;
                    }
                }

                setNoiseLevel(average);
            }
        };
    };

    const handleError = (error: Error) => {
        console.error('The following getUserMedia error occurred: ', error);
    };

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then(handleSuccess)
            .catch(handleError);
    } else {
        console.error('getUserMedia not supported on your browser!');
    }
};
