import React, { useState } from "react";
import "./App.css";

function RandomQuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuote = () => {
    setLoading(true);
    setQuote(null);
    setError("");

    fetch("https://api.api-ninjas.com/v1/quotes", {
      method: "GET",
      headers: {
        "X-Api-Key": "TMyULz30qjfEOXZs7ypL42WTjupXzO9CpmRQMiBc",
      },
    })
      .then((res) => {
        console.log("Response status:", res.status);
        console.log("Response status text:", res.statusText);
        if (!res.ok) {
          throw new Error("Network response was not ok " + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Data received:", data);
        setQuote(data[0]);
      })
      .catch((error) => {
        console.error("Error details:", error);
        setError("Error fetching quote: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
   <div>
      <h1>Quote Generator</h1>
      <p>Click the button to fetch a random quote</p>

      <div className="main">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {quote && (
        <>
        <div>
          
          <p className="quote">{quote.quote}</p>
          <p className="author">~{quote.author}</p>
        </div>

        </>
      )}
              <button onClick={fetchQuote}>Generate Quote</button>

      </div>
    
    </div>
  );
}

export default RandomQuoteGenerator;
