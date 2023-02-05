import React, { useState } from 'react';
import "./App.css"

function App() {
    const [data, setData] = useState(null);
    const [inputText, setInputText] = useState('');
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({inputText: inputText})
    });
  
      const json = await response.json();
      setData(json);
    };
  
    return (
    <div className='card'>
      <div className='inputarea'>
        <form onSubmit={handleSubmit}>
          <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} />
          <button type="submit">Generate Document</button>
        </form>
        {data && <p>Generated file: {data.fileName}</p>}
        </div>
      </div>
    );
  }
  
  export default App;
