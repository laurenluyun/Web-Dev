import { useState, useEffect } from "react";

export default function Counter() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("");
    //  the function myEffect will run any time the component re-renders 
    useEffect(function myEffect() {
        console.log("MY EFFECT WAS CALLED!");
    },
    // this means only execute effect when the state count is changed  
    [count])
    const increment = () => {
        setCount(c => (c + 1));
    };
    const handleChange = (e) => {
        setName(e.target.value)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
            <p>Name: {name}</p>
            <input type="text" value={name} onChange={handleChange} />
        </div>
    )
}