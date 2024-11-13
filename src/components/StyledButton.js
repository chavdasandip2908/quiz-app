import React from 'react';

const StyledButton = ({ children, onClick, type = "button", bgColor = "rgb(100 116 139)", gradientStartColor = "rgba(255,255,255,0.4)", gradientEndColor = "rgba(34,197,94,0.5)", hoverGradientStartColor = "rgba(255,255,255,0.6)", hoverGradientEndColor = "rgba(34,197,94,0.7)", shadowColor = "rgba(34,197,94,1)" }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`flex items-center gap-2 rounded-lg bg-[${bgColor}] text-white px-4 py-2 transition-all duration-300 
 bg-[linear-gradient(to_bottom,${gradientStartColor}_0%,${gradientEndColor}_100%)] hover:bg-[linear-gradient(to_bottom,${hoverGradientStartColor}_0%,${hoverGradientEndColor}_100%)] shadow-[0_2px_16px_0_${shadowColor}] hover:shadow-[0_2px_20px_1px_${shadowColor}] disabled:opacity-70 max-sm:ml-1 max-sm:gap-1 max-sm:p-1 w-full m-auto font-semibold justify-center`}
        >
            {children}
        </button>
    );
};

export default StyledButton;
