import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [timestamp, setTimestamp] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimestamp((prevStamp) => prevStamp + 1);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return <main className="timer">{parseTimestamp(timestamp)}</main>;
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
