import { useEffect, useState } from "react";
const RANDOM_QUOTE_URL = "https://inspo-quotes-api.herokuapp.com/quotes/random";
import "./src/App.css";

export default function QuoteFetchLoader() {
    const [quote, setQuote] = useState({ text: "", author: "" });
    // set a new state
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        fetchAndSetQuote();
    }, []);
   
    async function fetchAndSetQuote() {
        const response = await fetch(RANDOM_QUOTE_URL);
        // pass the random url as json  
        const jsonResponse = await response.json();
        // extract the quote  
        const randomQuote = jsonResponse.quote;
        // console.log(randomQuote);
        setQuote(randomQuote);
        setIsLoading(false);
    }
    return (
        <div>
            <p className="Loader" style={{opacity: isLoading ? 1 : 0}}>Loading...</p>
            <h1>{quote.text}</h1>
            <h3>{quote.author}</h3>
        </div>
    )
}