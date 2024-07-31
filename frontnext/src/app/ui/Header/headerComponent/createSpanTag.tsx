import React from 'react'

interface SpanProps {
    textNode : string;
    className? : string;
}

const SpanTag : React.FC<SpanProps> = ({textNode, className}) => {
    return (
        <span className={className}>{textNode}</span>
    )
}

export default SpanTag