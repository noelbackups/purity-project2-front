import React, { useState, useEffect } from "react";

const Timer = ({ delayResend = "180" }) => {
    const [delay, setDelay] = useState(+delayResend);
    const minutes = Math.floor(delay / 60);
    const seconds = Math.floor(delay % 60);
    useEffect(() => {
        const timer = setInterval(() => {
            setDelay(delay - 1);
        }, 1000);

        if (delay === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        };
    });

    return (
        <>
            {delay > 0 ?
                <span>
                    {(minutes > 0) ? minutes + ':' : null}{seconds + 's...'}
                </span> : 'Expirado'}
        </>
    );
};

export default Timer;