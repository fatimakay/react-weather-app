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
 const [bgImage, setBgImage] = useState(Clear); //dynamic bg image based on weather

 //API URL for converting city name to geo-coordinates
const url=`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&&appid=b5241f214761c26348909ac9b8ee53d0`

const getCoordinates = (e) =>{
  if(e.key==='Enter'){
    axios.get(url)
    .then((response) => {
      //use coordinates to get weather info
      getWeatherData(response.data[0].lat, response.data[0].lon); 
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
useEffect(() => {
  //change bg based on current weather condition
  if(data.weather) {
    if(data.weather[0].main === "Clouds"){
         setBgImage(Clouds);
    }else if(data.weather[0].main==="Rain" || data.weather[0].main==="Drizzle"){
      setBgImage(Rain); 
    }else if(data.weather[0].main==="Thunderstorm" || data.weather[0].main==="Squall"){
      setBgImage(Thunderstorm); 
    }else if(data.weather[0].main==="Clear"){
      setBgImage(Clear);
    }else if(data.weather[0].main==="Haze" || data.weather[0].main==="Smoke" 
    || data.weather[0].main==="Mist" || data.weather[0].main==="Fog" ){
      setBgImage(Haze);
    }
    else if(data.weather[0].main==="Snow"){
      setBgImage(Snow);
    } else if(data.weather[0].main==="Dust" || data.weather[0].main==="Sand"){
      setBgImage(Dust);
    }
    else{ 
       setBgImage(Clear);
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
    <div className="App" style={{ background: `url(${(bgImage)}) no-repeat center center/cover` }}>
  
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
