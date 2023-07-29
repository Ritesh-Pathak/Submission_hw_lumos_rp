//import logo from './logo.svg';
import './App.css';
import React , {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [data,setData]=useState(0);
  const [quoteAuthor, setQuoteAuthor]=useState();
  const [quoteString, setQuoteString]= useState();
  const [submit,setSubmit]= useState();
  const [quote, setQuote] = useState([]);
  function getQuote(){

    fetch("https://api.quotable.io/random").then(
      response =>response.json().then(
       (quote)=>{
        setData(quote);
       }
      )
    )
  }

  const handleSubmit = async()=>{
    try{
      const res= await axios.post('http://localhost:5050/quote',{
        "author":quoteAuthor,
        "quote":quoteString
      });
      setSubmit(res);
    }
    catch{
      alert("Something Went Wrong")
    }
  }
  useEffect(()=>{
    axios.get('http://localhost:5050/quote').then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.log(err)
    })
  },[submit])
  return (
    <div className="App">
      <header className="App-header">
       <h1 className='Title' >Welcome to the peaceful world of quotations</h1>
       <h3 className='Quote'>Quote: {data.content}</h3>
       <h3 className='author'>Author: {data.author}</h3>
       <button className='Generator' onClick={getQuote}> Get Quote</button>
       <div className='form'>
        A thought of our esteemed readers:-{quote &&quote.map((item)=>(<div>
          {item.quote} by {item.author}</div>))}
          <div>
            <h3 className='formStatement'>If you want to add your quote</h3>
            <div>
              <label className='name'>Your Name:</label>
              <input className='box1' onChange={(e)=>{setQuoteAuthor(e.target.value)}}/>
            </div>
            <div>
            <label className='quoteForm'>Your Quote:</label>
            <input className='box2' onChange={(e)=>{setQuoteString(e.target.value)}}/>
            </div>
            <button className='submit' onClick={handleSubmit}>Submit</button>
          </div>
        
        </div> 
        
      </header>
    </div>
  

  );
}

export default App;
