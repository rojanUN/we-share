import { toast } from 'react-toastify';
import { CameraIcon, ErrorIcon, MicIcon } from './icons';
import { CustomError } from '../types/question';

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
    public static Error(
        title: string,
        type?: CustomError,
        // setShowToastOnce?: React.Dispatch<React.SetStateAction<boolean>>
        closePreviousToast?: () => void
    ) {
        toast.error(title, {
            icon: () => getToastErrorIcon(type!),
            onClose: () => {
                closePreviousToast && closePreviousToast();
            },
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
