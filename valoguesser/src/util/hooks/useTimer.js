import { useCallback, useRef, useEffect, useState } from 'react'

const useTimer = (onDone, timeInSeconds) => {

    const [timer, setTimer] = useState(timeInSeconds);
    const [play, setPlay] = useState(false);
    const interval = useRef(null);

    const countDown = useCallback(() => {
        interval.current = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);
    }, []);

    const pause = () => {
        if (interval.current) {
            clearInterval(interval.current);
            setPlay(false);
        }
    };
    const start = useCallback(() => {
        setPlay(true);
        countDown();
    }, [countDown]);

    const restart = () => {
        if (interval.current) {
            clearInterval(interval.current);
        }
        setTimer(timeInSeconds);
        start();
    }

    // once the timer reaches 0, pause and clear the countdown and perform your callback action
    useEffect(() => {
        if (interval.current && timer <= 0) {
            pause();
            setPlay(false);
            interval.current = null;
            onDone();
        }
    }, [timer, onDone]);

    // when the hook is invoked starts the countdown,
    // pause when the play is false
    useEffect(() => {
        if (play === true) {
            countDown();
        }
        return () => {
            clearInterval(interval.current)
        }
    }, [countDown, play]);

    return {
        time: timer,
        pause,
        start,
        restart
    };

}

export default useTimer