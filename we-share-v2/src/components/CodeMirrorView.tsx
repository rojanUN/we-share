import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
// language modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/mode/clike/clike';
// import { Toast } from '../helper/toast';
import Dropdown from './common/Dropdown';
import { useEffect, useState } from 'react';
import Button from './common/Button';
import { PlayIcon } from '../helper/icons';
import { languageMimeTypeMap } from '../helper/helper';
import { Question } from '../types';

const languages = [
    'Javascript',
    'Python',
    'Rust',
    'C++',
    'Java',
    'PHP',
    'Go',
    'C',
    'C#',
];

interface CodeMirrorViewType {
    activeQuestionIndex?: number | null;
    question: Question | null;
    questions: Question[] | null;
}

function CodeMirrorView(props: CodeMirrorViewType) {
    const { activeQuestionIndex, question, questions } = props;
    const [code, setCode] = useState(
        questions?.reduce((acc: any, question: any) => {
            acc[question && question.id] = '';
            return acc;
        }, {})
    );
    // const [code2, setCode2] = useState<string>('');
    const [currentLanguage, setCurrentLanguage] =
        useState<string>('Javascript');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [options, setOptions] = useState({
        lineWrapping: true,
        mode: currentLanguage.toLowerCase() ?? 'javascript',
        lint: true,
        theme: 'dracula',
        lineNumbers: true,
        smartIndent: true,
        showCursorWhenSelecting: true,
    });

    const handleLanguageChange = (newLanguage: string) => {
        setCurrentLanguage(newLanguage);
        setOptions((prevOptions) => ({
            ...prevOptions,
            mode: languageMimeTypeMap[currentLanguage.toLowerCase()],
        }));
    };

    useEffect(() => {
        handleLanguageChange(currentLanguage);
    }, [currentLanguage]);

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const [prob, setProb] = useState('');
    async function fetchProblem() {
        const response = await fetch(
            'http://localhost:8080/api/problems/get/single',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ slug: question?.question }),
            }
        );
        const data = await response.json();
        setProb(data.data.content);
    }
    useEffect(() => {
        fetchProblem();
    }, [question?.question]);

    return (
        <div className="h-full w-full flex flex-col gap-2 md:flex-row">
            <div className="flex-1">
                <p className="text-[20px] font-semibold">
                    Q.
                    {activeQuestionIndex && activeQuestionIndex + 1}{' '}
                    {question?.question}
                </p>
                <div
                    className="custom-scrollbar mt-3 h-[70vh] overflow-y-scroll overflow-x-hidden"
                    dangerouslySetInnerHTML={{ __html: prob.replace('\n', '') }}
                />
            </div>
            <div className="flex-[2_2_0%] h-max">
                <div className="flex justify-between items-center my-2 mr-4">
                    <p className="font-semibold">
                        <span className="inline-block font-bold mr-1 text-[#1935CA]">
                            &lt;/&gt;
                        </span>
                        Code
                    </p>
                    <Dropdown
                        isOpen={isDropdownOpen}
                        onToggle={handleDropdownToggle}
                        options={languages}
                        selectedOption={currentLanguage}
                        setSelectedOption={setCurrentLanguage}
                    />
                </div>
                <CodeMirror
                    value={question && code[question.id]}
                    options={options}
                    onBeforeChange={(_editor, _data, value) => {
                        setCode((prevValues: any) => ({
                            ...prevValues,
                            [question!.id]: value,
                        }));
                    }}
                    onPaste={(_editor, _event) => {
                        // Toast.Error('Pasting is not allowed!');
                        // event.preventDefault();
                    }}
                />
                <div className="flex flex-row justify-end my-2">
                    <Button
                        variant="primary"
                        handleBtnClick={() => {
                            console.log('run code btn clicked.');
                            console.log(eval(code));
                        }}
                        outline
                    >
                        <span>
                            <PlayIcon />
                        </span>
                        Run Code
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CodeMirrorView;
