import React from "react";

interface PulseLogoProps {
    className?: string;
    width?: number;
    height?: number;
}

export function PulseLogo({ className = "", width = 48, height = 48 }: PulseLogoProps) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Central Core - Royal Blue */}
            <circle cx="24" cy="24" r="6" fill="#007bff" />

            {/* Golden Amber Ring - The Spark/Pulse */}
            <circle cx="24" cy="24" r="14" stroke="#FFB020" strokeWidth="3" />

            {/* Orbital Ring - Dashed Royal Blue */}
            <circle
                cx="24"
                cy="24"
                r="21"
                stroke="#007bff"
                strokeWidth="1.5"
                strokeDasharray="2 4"
                className="dark:stroke-blue-400"
            />
        </svg>
    );
}
