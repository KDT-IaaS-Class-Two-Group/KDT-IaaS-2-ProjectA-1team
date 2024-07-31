import React from "react";

interface ButtonProps {
    textNode : string;
    onclickFunc? : () => void;
    className? : string;
}

const ButtonClick : React.FC<ButtonProps> = ({textNode, onclickFunc, className}) => {
    return (
        <button onClick={onclickFunc} className={className}>{textNode}</button>
    )
}


export default ButtonClick