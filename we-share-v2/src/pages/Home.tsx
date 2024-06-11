import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { enterFullscreen } from '../helper/helper';

function Home() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>This is a home page.</h1>
            <Button
                variant="primary"
                outline
                handleBtnClick={() => {
                    navigate('/exam-portal');
                    enterFullscreen();
                }}
            >
                Go To Exam
            </Button>
        </div>
    );
}

export default Home;
