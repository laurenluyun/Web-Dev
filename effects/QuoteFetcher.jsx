import { useEffect, useState } from "react";
const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";

export default function QuoteFetcher() {
    const [quote, setQuote] = useState({ text: "", author: "" });
    // set up the initial state with useEffect
     // use aysnc function because need to await API call and 
    // then call set quote with the new quote information 
    // but effect callbacks have to be synchronous, so we can wrap our async function
    // in a synchronous funciton (fetchAndSetQuote) and then immediately execute it
    useEffect(() => {
        fetchAndSetQuote();
        // only execute the effect on the first render
    }, []);
   
    async function fetchAndSetQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        // pass the random url as json  
        const jsonResponse = await response.json();
        // extract the quote  
        const randomQuote = jsonResponse.quote;
        // console.log(randomQuote);
        setQuote(randomQuote);
    }
    return (
        <div>
            <button onClick={fetchAndSetQuote}>Get Quote Using handler</button>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}