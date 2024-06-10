import { toast } from 'react-toastify';
import { CameraIcon, MicIcon } from './icons';
import { CustomError } from '../types';

export class Toast {
    public static Error(title: string, type: CustomError) {
        toast.error(title, {
            icon: () =>
                type === CustomError.webCamError ? (
                    <CameraIcon style={{ fontSize: '1.2rem' }} />
                ) : (
                    <MicIcon style={{ fontSize: '1.2rem' }} />
                ),
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
        });
    }
}
