import React from 'react';

const StyledButton = ({ children, onClick, disabled, type = "button" }) => {
    console.log("children ::", children);

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className="flex items-center gap-2 rounded-lg bg-[#64748b] text-white px-4 py-2 transition-all duration-300 
 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.4)_0%,rgba(34,197,94,0.5)_100%)] hover:bg-[linear-gradient(to_bottom,rgba(255,255,255,0.6)_0%,rgba(34,197,94,0.7)_100%)] shadow-[0_2px_16px_0_rgba(34,197,94,1)] hover:shadow-[0_2px_20px_1px_rgba(34,197,94,1)] disabled:opacity-70 max-sm:ml-1 max-sm:gap-1 max-sm:p-1 w-full m-auto font-semibold justify-center"
        >
            {children}
        </button>
    );
};

export default StyledButton;
