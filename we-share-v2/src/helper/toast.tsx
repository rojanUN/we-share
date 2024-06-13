import { toast } from 'react-toastify';
import { CameraIcon, ErrorIcon, MicIcon } from './icons';
import { CustomError } from '../types';

function getToastErrorIcon(type: CustomError) {
    switch (type) {
        case CustomError.webCamError:
            return <CameraIcon style={{ fontSize: '1.2rem' }} />;
        case CustomError.audioError:
            return <MicIcon style={{ fontSize: '1.2rem' }} />;
        default:
            return <ErrorIcon style={{ fontSize: '1.2rem' }} />;
    }
}

export class Toast {
    public static Error(title: string, type?: CustomError) {
        toast.error(title, {
            icon: () => getToastErrorIcon(type!),
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: type ? 'light' : 'colored',
        });
    }
}
