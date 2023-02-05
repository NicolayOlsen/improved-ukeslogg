import React, { useState } from 'react';
import "./App.css"

function App() {
    const [weekNumber, setWeekNumber] = useState('');
    const [fridayText, setFridayText] = useState('');
    const [mondayText, setMondayText] = useState('');
    const [tuesdayText, setTuesdayText] = useState('');
    const [wednesdayText, setWednesdayText] = useState('');
    const [thursdayText, setThursdayText] = useState('');
    const [data, setData] = useState(null);
  
    const handleSubmit = async (event) => {
        event.preventDefault();
      
          // Call the API with all the text inputs as a single object
          const inputText = {
              weekNumber,
              fridayText,
              mondayText,
              tuesdayText,
              wednesdayText,
              thursdayText,
          };
      
        const response = await fetch('http://127.0.0.1:5000/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(inputText)
      });
      
        const json = await response.json();
        setData(json);
      };
      
      return (
      <div className='calender'>
        <div className='friday'>
          <h1>Uke</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" value={weekNumber} onChange={e => setWeekNumber(e.target.value)} />
            <br/>
          </form>
        </div>
        <div className='friday'>
          <h1>Fredag</h1>
          <form onSubmit={handleSubmit}>
            <textarea type="text" value={fridayText} onChange={e => setFridayText(e.target.value)} />
            <br/>
          </form>
        </div>
        <div className='friday'>
          <h1>Mandag</h1>
          <form onSubmit={handleSubmit}>
            <textarea type="text" value={mondayText} onChange={e => setMondayText(e.target.value)} />
            <br/>
          </form>
        </div>
        <div className='friday'>
          <h1>Tirsdag</h1>
          <form onSubmit={handleSubmit}>
            <textarea type="text" value={tuesdayText} onChange={e => setTuesdayText(e.target.value)} />
            <br/>
          </form>
        </div>
        <div className='friday'>
          <h1>Onsdag</h1>
          <form onSubmit={handleSubmit}>
            <textarea type="text" value={wednesdayText} onChange={e => setWednesdayText(e.target.value)} />
            <br/>
          </form>
        </div>
        <div className='friday'>
          <h1>Torsdag</h1>
          <form onSubmit={handleSubmit}>
            <textarea type="text" value={thursdayText} onChange={e => setThursdayText(e.target.value)} />
            <br/>
            <button type="submit">GENERER UKESLOGG</button>
          </form>
        </div>
        {data && <p>Generert fil: {data.fileName}</p>}
    </div>
);
}
export default App;
