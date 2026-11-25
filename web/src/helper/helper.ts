import { CheckedQuestionType, CodeSnippet } from '../types/question';

export const asyncHandler = <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    finallyCallback?: () => void,
    errorCallback?: (err: any) => void
) => {
    return async (...args: Parameters<T>): Promise<T | void> => {
        try {
            return await fn(...args);
        } catch (error) {
            errorCallback && errorCallback(error);
            console.log('Error in asyncHandler:', error);
            throw error;
        } finally {
            finallyCallback && finallyCallback();
        }
    };
};

export const formatCountDownTimer = (seconds: number) => {
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
};

export const isOptionSelected = (
    questionId: number,
    option: string,
    checkedQuestions: CheckedQuestionType[]
) => {
    const question = checkedQuestions?.find((q) => q.id === questionId);
    return question ? question.selectedOption === option : false;
};

export const enterFullscreen = () => {
    const elem = document.documentElement as HTMLElement & {
        mozRequestFullScreen?: () => Promise<void>;
        webkitRequestFullscreen?: () => Promise<void>;
        msRequestFullscreen?: () => Promise<void>;
    };

    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
};

export const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
    }
};

export const languageMimeTypeMap: Record<string, string> = {
    javascript: 'text/javascript',
    python: 'text/x-python',
    java: 'text/x-java',
    c: 'text/x-csrc',
    'c++': 'text/x-c++src',
    rust: 'text/x-rustsrc',
    go: 'text/x-go',
    php: 'text/x-php',
    'c#': 'text/x-csharp',
};

export const findLanguageCode = (
    codeSnippets: CodeSnippet[] = [],
    lang: string = 'JavaScript'
) => {
    const language = codeSnippets.find(
        (codeSnippet) => codeSnippet.lang === lang
    );
    return language ? language.code : '// Write your code here';
};
