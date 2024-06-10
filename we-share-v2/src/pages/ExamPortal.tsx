// import WebCam from '../components/WebCam';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import QuestionNav from '../components/QuestionNav';
import Button from '../components/common/Button';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
    setActiveQuesIndex,
    setSelectedQuestion,
} from '../feature/exam/examSlice';
import { ClockIcon } from '../helper/icons';

function ExamPortal() {
    const selectedQuestion = useAppSelector((state) => state.exam);
    const dispatch = useAppDispatch();

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
                                        00 : 59 : 00
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button variant="primary" handleBtnClick={() => {}}>
                            Submit
                        </Button>
                    </div>
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
                                <label
                                    className="relative flex items-center rounded-full cursor-pointer"
                                    htmlFor={`option-${i}`}
                                >
                                    <input
                                        name="color"
                                        type="radio"
                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-full border border-[#1935CA] text-[#1935CA] transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#1935CA] checked:before:bg-[#1935CA] hover:before:opacity-10"
                                        id={`option-${i}`}
                                    />
                                    <span className="absolute text-[#1935CA] transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-3.5 w-3.5"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                        >
                                            <circle
                                                data-name="ellipse"
                                                cx="8"
                                                cy="8"
                                                r="8"
                                            ></circle>
                                        </svg>
                                    </span>
                                </label>
                                <label
                                    className="text-[18px] mt-px pl-3 font-normal cursor-pointer select-none"
                                    htmlFor={`option-${i}`}
                                >
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-4 p-5">
                        <Button
                            variant="secondary"
                            handleBtnClick={handlePrevBtnClick}
                            disabled={selectedQuestion.activeQuesIndex === 0}
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default ExamPortal;
