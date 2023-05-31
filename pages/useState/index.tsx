import { useState } from "react";

export default function App() {
    const [counter, setCounter] = useState<number>(0);
    const [string, setString] = useState<string>("Hello world!");

    return (
        <div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>+++</button>
            <div>{string}</div>
            <button onClick={() => setString(string + counter)}>+++</button>
        </div>
    );
}
