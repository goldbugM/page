import React from 'react';
import './ShinyText.css';

interface ShinyTextProps {
    text?: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    children?: React.ReactNode;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
    text, 
    disabled = false, 
    speed = 5, 
    className = '',
    children 
}) => {
    const animationDuration = `${speed}s`;
    const displayText = children || text || '';

    return (
        <div
            className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
            style={{ animationDuration }}
        >
            {displayText}
        </div>
    );
};

export default ShinyText;
