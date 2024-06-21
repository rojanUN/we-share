import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
// language modes
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/rust/rust';
import 'codemirror/mode/python/python';
import 'codemirror/mode/go/go';
import 'codemirror/mode/clike/clike';
import { Toast } from '../helper/toast';
import Dropdown from './common/Dropdown';
import { useEffect, useState } from 'react';
import Button from './common/Button';
import { PlayIcon } from '../helper/icons';
import { languageMimeTypeMap } from '../helper/helper';

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

function CodeMirrorView() {
    const [code, setCode] = useState<string>('');
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

    return (
        <div className="h-full w-full flex flex-col md:flex-row">
            <div className="flex-1">qustion tab</div>
            <div className="flex-[2_2_0%] h-max overflow-x-hidden overflow-y-scroll">
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
                    value={code}
                    options={options}
                    onBeforeChange={(_editor, _data, value) => setCode(value)}
                    onPaste={(_editor, event) => {
                        Toast.Error('Pasting is not allowed!');
                        event.preventDefault();
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
