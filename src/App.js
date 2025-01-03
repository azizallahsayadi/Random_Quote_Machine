
import { useState , useEffect } from 'react';
import './App.scss';

function App() {
  const quotesDb = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
  const [quoteIndex , setQuoteIndex] = useState(0);
  const [quotes, setQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetch(quotesDb)
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not OK: " + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        const quoteArray = data.quotes;
        setQuotes(quoteArray.map(quote => quote.quote)); // Extract quotes
        setAuthors(quoteArray.map(quote => quote.author)); // Extract authors
      })
      .catch(error => console.error("Fetch error: ", error));
  }, []);
  


  const getRandomIndex = ()=>{
    let randomIndex = Math.floor(Math.random()*quotes.length);
    setQuoteIndex(randomIndex);
    return randomIndex;
  }
  return (

    <div className="App">
      <header className="App-header">
        <div id="quote-box">
        <p  id="text">"{quotes[quoteIndex]}"</p>
        <p id="author">- {authors[quoteIndex]}</p>
        <button id="new-quote" onClick={getRandomIndex}> new Quote</button>
        <a id="tweet-quote" href ="http://www.twitter.com/intent/tweet">Tweeter</a>
        </div>
      </header>
    </div>
  );
}

export default App;
