import { useState, useEffect, useCallback } from 'react';
// import WebCam from '../components/WebCam';
import 'react-toastify/dist/ReactToastify.css';
import QuestionNav from '../components/QuestionNav';
import Button from '../components/common/Button';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    setActiveQuesIndex,
    setSelectedQuestion,
    setCheckedQuestions,
} from '../feature/exam/examSlice';
import { ClockIcon } from '../helper/icons';
import { CheckedQuestionType } from '../types';
import Modal from '../components/common/Modal';
import CircularProgress from '../components/common/CircularProgress';
import { exitFullscreen, formatCountDownTimer } from '../helper/helper';
import { SessionStorage } from '../helper/sessionStorage';
import RadioBtn from '../components/common/RadioBtn';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/common/Alert';

const examDuration = import.meta.env.VITE_EXAM_DURATION;

const ExamPortal = function ExamPortal() {
    const navigate = useNavigate();
    const [coutdownTime, setCountDownTimer] = useState(() => {
        const savedCountdownTime =
            SessionStorage.getSessionItem('countdownTimer');
        return savedCountdownTime !== null
            ? JSON.parse(savedCountdownTime)
            : examDuration || 30;
    }); // 3600 sec for 1 hour
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const selectedQuestion = useAppSelector((state) => state.exam);
    const dispatch = useAppDispatch();

    const [fullScreenExitedCount, setfullscreenExitedCount] = useState(0);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(display-mode: fullscreen)');

        const handleMediaQueryChange = (event: any) => {
            if (event.matches) {
                // setfullscreenCount((prev) => prev + 1);
            } else {
                setfullscreenExitedCount((prevState) => prevState + 1);
                setIsAlertOpen(true);
            }
        };

        mediaQuery.addEventListener('change', handleMediaQueryChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaQueryChange);
        };
    }, [fullScreenExitedCount]);

    const handleMCQSubmit = useCallback(() => {
        setCountDownTimer(examDuration || 30);
        SessionStorage.removeAllSession();
        dispatch(setCheckedQuestions([]));

        // if (selectedQuestion?.questions) {
        //     setSelectedQuestion(selectedQuestion.questions[0]);
        // }

        exitFullscreen();
        setIsModalOpen(false);
        navigate('/exam-completed');
    }, [dispatch, navigate]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            SessionStorage.setSessionItem('countdownTimer', coutdownTime);
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        const timerId = setInterval(() => {
            setCountDownTimer((prevTime: number) => prevTime - 1);
        }, 1000);

        if (coutdownTime <= 0) {
            clearInterval(timerId);
            handleMCQSubmit();
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            clearInterval(timerId);
        };
    }, [coutdownTime, handleMCQSubmit]);

    // Retrieve the saved state from sessionStorage when the component mounts
    useEffect(() => {
        const savedState = SessionStorage.getSessionItem('questionsState');
        if (savedState) {
            dispatch(setCheckedQuestions(JSON.parse(savedState)));
        }
    }, [dispatch]);

    const handleOptionChange = ({
        id,
        selectedOption,
        selectedOptionIndex,
    }: CheckedQuestionType) => {
        const existingQuestion = selectedQuestion?.checkedQuestions?.find(
            (q) => q.id === id
        );
        let updatedState;

        if (existingQuestion) {
            // Update the existing question
            updatedState = selectedQuestion?.checkedQuestions?.map((q) =>
                q.id === id
                    ? {
                          ...q,
                          selectedOption,
                          selectedOptionIndex,
                      }
                    : q
            );
        } else {
            // Add new question
            updatedState = [
                ...selectedQuestion.checkedQuestions!,
                {
                    id,
                    selectedOption,
                    selectedOptionIndex,
                },
            ];
        }

        dispatch(setCheckedQuestions(updatedState!));
        SessionStorage.setSessionItem('questionsState', updatedState);
    };

    const handlePrevBtnClick = () => {
        const newIndex = (selectedQuestion?.activeQuesIndex ?? 0) - 1;
        const newQuestion = selectedQuestion?.questions?.[newIndex];
        if (newQuestion) {
            dispatch(setSelectedQuestion(newQuestion));
            dispatch(setActiveQuesIndex(newIndex));
        }
    };
    const handleNxtBtnClick = () => {
        const newIndex = (selectedQuestion?.activeQuesIndex ?? 0) + 1;
        const newQuestion = selectedQuestion?.questions?.[newIndex];
        if (newQuestion) {
            dispatch(setSelectedQuestion(newQuestion));
            dispatch(setActiveQuesIndex(newIndex));
        }
    };

    return (
        <div className="h-[100vh] w-full flex flex-col md:flex-row ">
            <Alert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
                You must be in full screen, otherwise you might be disqualified.
                Press Ok to enable full screen mode
            </Alert>
            <div className="flex-[1_1_0%] mx-auto justify-center items-center md:min-w-[300px] p-6">
                {/* <WebCam /> */}
                <QuestionNav />
            </div>

            <div className="flex-[6_6_0%] p-6 h-full bg-custom-gradient grid place-items-center">
                <div className="flex flex-col h-max md:min-w-[70%] bg-white rounded-[20px] px-10 py-14">
                    <div className="h-20 mb-6 w-full flex justify-between items-center">
                        <div>
                            <div className="flex">
                                <div className="h-full my-auto mr-3">
                                    <ClockIcon style={{ fontSize: '30px' }} />
                                </div>
                                <div>
                                    <p className="tracking-wide text-[#797777]">
                                        Time Remaining
                                    </p>
                                    <p className="text-[18px] font-bold mt-[-4px] tracking-wider">
                                        {formatCountDownTimer(coutdownTime)}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="primary"
                            handleBtnClick={() => setIsModalOpen(true)}
                        >
                            Submit
                        </Button>
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        title="Submission"
                        onClose={() => setIsModalOpen(false)}
                        handleSubmit={handleMCQSubmit}
                    >
                        <h2>Stats:</h2>
                        <div className="h-max flex flex-col flex-wrap justify-between md:flex-row">
                            <div className="flex-[1_1_0%] md:max-h-[10rem]">
                                <CircularProgress
                                    value={
                                        selectedQuestion.checkedQuestions
                                            ?.length!
                                    }
                                    max={selectedQuestion?.questions?.length!}
                                />
                            </div>
                            <div className="flex-[1_1_0%] flex flex-col ml-auto justify-center font-bold text-[20px]">
                                <p>
                                    <span className="inline-block w-[100px] mr-4">
                                        Attempted:
                                    </span>
                                    {selectedQuestion.checkedQuestions?.length}
                                </p>
                                <p>
                                    <span className="inline-block w-[100px] mr-4">
                                        Remaining:
                                    </span>
                                    {selectedQuestion.questions?.length! -
                                        selectedQuestion.checkedQuestions
                                            ?.length!}
                                </p>
                                <p>
                                    <span className="inline-block w-[100px] mr-4">
                                        Total:
                                    </span>
                                    {selectedQuestion.questions?.length}
                                </p>
                            </div>
                        </div>
                        <p className="text-center my-4">
                            Note*: Once you submit you can&apos;t revert back.
                            Thank you!
                        </p>
                    </Modal>
                    <p className="text-[20px] font-semibold">
                        Q.
                        {(selectedQuestion.activeQuesIndex ||
                            selectedQuestion.activeQuesIndex === 0) &&
                            selectedQuestion.activeQuesIndex + 1}{' '}
                        {selectedQuestion.question}
                    </p>

                    <div className="flex flex-col flex-wrap mt-3 ml-8 w-max">
                        {selectedQuestion?.options?.map((option, i) => (
                            <div
                                key={i}
                                className="inline-flex min-w-max px-4 py-3.5 rounded-[7px] my-2 items-center border-2 border-solid border-[#eee]"
                            >
                                <RadioBtn
                                    name={`ques-${selectedQuestion.id}`}
                                    qid={selectedQuestion.id!}
                                    label={option}
                                    index={i}
                                    handleOptionChange={() =>
                                        handleOptionChange({
                                            id: selectedQuestion.id!,
                                            selectedOption: option,
                                            selectedOptionIndex: i,
                                        })
                                    }
                                    checkedQuestions={
                                        selectedQuestion?.checkedQuestions!
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-4 p-5">
                        <Button
                            variant="primary"
                            handleBtnClick={handlePrevBtnClick}
                            disabled={selectedQuestion.activeQuesIndex === 0}
                            outline
                        >
                            Previous
                        </Button>
                        <Button
                            variant="primary"
                            handleBtnClick={handleNxtBtnClick}
                            disabled={selectedQuestion.activeQuesIndex === 26}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamPortal;
