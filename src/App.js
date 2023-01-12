import { Container, Box, Typography, createTheme, ThemeProvider, TextField, IconButton, InputAdornment, OutlinedInput, Input, createMuiTheme, CssBaseline } from '@mui/material';
import axios from 'axios';
import Quicksand from './assets/font/Quicksand-Regular.ttf';
import { useState } from 'react';
import './App.css';
import {  SearchOutlined } from '@material-ui/icons';
import Clouds from './assets/images/clouds.png'
import Rain from './assets/images/rain.png';
import Clear from './assets/images/clear.png'; 
import Haze from './assets/images/haze.png';
import Snow from './assets/images/snow.png';
import Dust from './assets/images/dust.png';
import Thunderstorm from './assets/images/thunderstorm.png';
import { useEffect } from 'react';


function App() {
 const [data, setData] = useState({}); //to store weather data
 const [location, setLocation] = useState(''); //to store user's input in search
 const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"); //dynamic bg image based on weather

 //API URL for converting city name to geo-coordinates
const url=`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&&appid=b5241f214761c26348909ac9b8ee53d0`

const getCoordinates = (e) =>{
  if(e.key==='Enter'){
    axios.get(url)
    .then((response) => {
      //use coordinates to get weather info
      getWeatherData(response.data[0].lat, response.data[0].lon); 
      getForecast(response.data[0].lat, response.data[0].lon);
      // console.log(response.data[0].lat, response.data[0].lon);
      // setData(response.data)
      // console.log(response.data);
      setLocation(''); //reset search bar
    })
  }
}  

const getWeatherData = (lat, lon) => {
  //second url to get weather info from geolocation
  axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=b5241f214761c26348909ac9b8ee53d0`)
  .then((response) =>{
    setData(response.data);
    console.log(response.data);
  })
}
const getForecast = (lat, lon) => {
    //get 5 day data 
  axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=b5241f214761c26348909ac9b8ee53d0`)
  .then((response) => {
    console.log('5day', response.data); 
  })
}
useEffect(() => {
  //change bg based on current weather condition
  if(data.weather) {
    if(data.weather[0].main === "Clouds"){
      setBgImage("https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
      }else if(data.weather[0].main==="Rain" || data.weather[0].main==="Drizzle"){
      setBgImage("https://images.unsplash.com/photo-1433863448220-78aaa064ff47?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"); 
    }else if(data.weather[0].main==="Thunderstorm" || data.weather[0].main==="Squall"){
      setBgImage("https://images.pexels.com/photos/1162251/pexels-photo-1162251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
    }else if(data.weather[0].main==="Clear"){
      setBgImage("https://images.unsplash.com/photo-1656762118188-b01ac10fb16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80"); 
    }else if(data.weather[0].main==="Haze" || data.weather[0].main==="Smoke" 
    || data.weather[0].main==="Mist" || data.weather[0].main==="Fog" ){
      setBgImage("https://images.unsplash.com/photo-1490780960365-b5e36e1d824c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"); 
    }
    else if(data.weather[0].main==="Snow"){
      setBgImage('https://images.unsplash.com/photo-1518873890627-d4b177c06e51?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
    } else if(data.weather[0].main==="Dust" || data.weather[0].main==="Sand"){
      setBgImage("https://images.wallpaperscraft.com/image/single/desert_dunes_sand_198958_1920x1080.jpg"); 
    }
    else{ 
      setBgImage("https://images.unsplash.com/photo-1656762118188-b01ac10fb16f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1934&q=80"); 
    }
 }
});
//using custom font for all MUI variants
function createFontFamily(fontFamily) {
  return {
    h1: { fontFamily },
    h2: { fontFamily },
    h3: { fontFamily },
    h4: { fontFamily },
    h5: { fontFamily },
    h6: { fontFamily },
    subtitle1: { fontFamily },
    subtitle2: { fontFamily },
    body1: { fontFamily },
    body2: { fontFamily },
    button: { fontFamily },
    caption: { fontFamily },
    overline: { fontFamily },
  };
}
//Override MUI theme
const theme = createTheme({
  typography: {
    fontFamily: createFontFamily('Quicksand'),
  },
  palette: {
    primary: {
      main: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Quicksand';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: url(${Quicksand});
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <div className="App" style={{ background: `url(${(bgImage)}) no-repeat center  center/cover` }}>
     <Box className="container"
     maxWidth='sm'
     alignItems='center'
     margin='0 auto'
     marginTop={5}
      sx={{
      height: 500,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
     }}>
      <Box className="search">

<Input value={location}
onChange={e => setLocation(e.target.value)}
onKeyDown={getCoordinates}
className="searchbar"
variant="standard"
color='primary'
placeholder="Enter your city..."
endAdornment={ 
  <InputAdornment position="end">
  <IconButton 
  color='primary'
  aria-label="toggle search"
  edge="end">
    <SearchOutlined/>
  </IconButton>
  </InputAdornment>}
/>
</Box>
      <Box className="top" 
      marginTop={-10}
      sx={{fontFamily: 'Quicksand'}} >
      <Box className="description">
      {data.weather ? <Typography variant="body1" fontWeight="bold" lineHeight={1} sx={{fontSize: 25 }}>{data.weather[0].main}</Typography> : null }
      </Box>
      <Box className="location">
       {data.sys ? <Typography variant="subtitle" sx={{fontSize: 18}}>{data.name}, {data.sys.country}</Typography> : null } 
      </Box>  
      <Box className="temperature">
        {data.main ? <Typography variant="h1" fontWeight="bold" sx={{lineHeight: 1}}>{data.main.temp.toFixed()}°</Typography> : null }
      </Box>
      
      </Box>

      {data.name!= undefined && 
       <Box className="bottom"
      display='flex'
      padding={2}
       justifyContent='space-evenly'
       borderRadius= {3}
       width= {1}
       margin="0 auto"
        mb={5}
       >
       <Box className="feelslike">
       {data.main ? <Typography variant="h6" fontWeight="bold">{data.main.feels_like.toFixed()}°</Typography> : null }
           <Typography variant="h6">Feels Like</Typography>
         </Box>
         <Box className="humidity">
         {data.main ? <Typography variant="h6" fontWeight="bold">{data.main.humidity}%</Typography> : null }
         <Typography variant="h6">Humidity</Typography>
         </Box>
         <Box className="wind">
         {data.wind ? <Typography variant="h6" fontWeight="bold">{data.wind.speed.toFixed()}MPH</Typography> : null }
         <Typography variant="h6">Wind</Typography>
         </Box>
       </Box>
      }
     
     </Box>
     
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
