interface ButtonType {
    children: React.ReactNode;
    variant: 'secondary' | 'primary';
    disabled?: boolean;
    handleBtnClick: () => void;
}

function Button({ children, variant, disabled, handleBtnClick }: ButtonType) {
    return (
        <button
            type="button"
            onClick={handleBtnClick}
            disabled={disabled}
            className={`border-2 border-solid h-fit ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} rounded-[7px] py-[5px] px-[20px] text-[18px] tracking-wide font-bold 
            ${variant === 'secondary' ? 'border-[#1935CA] text-[#1935CA]' : 'border-[#1935CA] bg-[#1935CA] text-white'} 
            ${variant === 'secondary' ? 'disabled:border-gray-400 disabled:text-gray-400' : 'disabled:border-gray-400 disabled:bg-gray-400 disabled:text-gray-300'}`}
        >
            {children}
        </button>
    );
}

export default Button;
