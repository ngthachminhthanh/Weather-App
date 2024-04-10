import React, { useState } from 'react'
import axios from 'axios'

function App() {
    const [data, setData] = useState({})
    const [location, setLocation] = useState('')
    const [error, setError] = useState(null);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=7f453343977452bbed1ca3192bfc70b5`;

    const searchLocation = async (event) => { 
        if (event.key === 'Enter') {
            try {
                const response = await axios.get(url);
                setData(response.data);
                setError(null); 
            } catch (error) {
                setError("Please enter correct location. Let's try again."); 
                setData({})
            }
            setLocation('');
        }
    }

    return (
        <div className="app">
            <div className='search'>
                <input 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyDown={searchLocation}
                    placeholder='Enter Location'
                    type='text' 
                />
            </div>
            <div className='container'>
                {error && ( 
                    <div className="error">
                        {error}
                    </div>
                )}
                <div className='top'>
                    <div className='location'>
                        <p>{data.name}</p>
                    </div>
                    <div className='temp'>
                        { data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
                    </div>
                    <div className='description'>
                        { data.weather ? <p>{data.weather[0].main}</p> : null}
                    </div>
                </div>
                <div className='bottom'>
                    <div className='feels'>
                        { data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
                        <p>Feels like</p>
                    </div>      
                    <div className='humidity'>
                        { data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                        <p>Humidity</p>
                    </div>
                    <div className='wind'>
                        { data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                        <p>Wind Speed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
