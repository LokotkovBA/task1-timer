import { useEffect, useRef, useState } from "react";
import "./App.scss";

function App() {
    const [timestamp, setTimestamp] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval>>();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        return () => {
            clearInterval(intervalRef.current);
        };
    }, []);

    function startTimer() {
        clearInterval(intervalRef.current);
        if (inputRef.current?.value) {
            setTimestamp(parseInt(inputRef.current.value));
        }
        intervalRef.current = setInterval(() => {
            setTimestamp((prevTimestamp) => prevTimestamp + 1);
        }, 1000);
    }

    return (
        <main className="timer">
            <input ref={inputRef} type="number" placeholder="Seconds" />
            <button onClick={startTimer}>Start</button>
            {parseTimestamp(timestamp)}
        </main>
    );
}
export default App;

function parseTimestamp(timestamp: number): string {
    let division = timestamp / 60;
    const minutes = leadingZero((Math.trunc(division) % 60).toString());
    division /= 60;
    const hours = leadingZero(Math.trunc(division).toString());
    const seconds = leadingZero((timestamp % 60).toString());

    return `${hours}:${minutes}:${seconds}`;
}

function leadingZero(time: string) {
    return time.length < 2 ? `0${time}` : time;
}
