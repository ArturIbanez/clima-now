import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import styles from "./detail.module.css"
import logimg from "../../assets/ClimaNowLogo.png"
import { TiWeatherSunny, TiWeatherCloudy, TiWeatherShower, TiWeatherSnow, TiWeatherStormy } from "react-icons/ti";
import { WiFog } from "react-icons/wi";
import { GoGear } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import.meta.env

export function Detail(){

    const navigate = useNavigate()

    interface Coords{
        name: string;
        lat: number;
        lon: number;
        country: string;
        state: string;
    }
    
    interface Weather {
  city: {
    name: string;
    country: string;
    sunrise: number;
    sunset: number;
    timezone: number;
  };
  list: {
    dt: number;
    dt_txt: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
    };
    weather: {
      main: string;
      description: string;
    }[];
    wind: {
      speed: number;
      deg: number;
      gust?: number;
    };
  }[];
}

        const { cidade } = useParams();
        const [coords, setCoords] = useState<Coords>();
        const [weather, setWeather] = useState<Weather>()
        const [loading, setLoading] = useState(true)

        const API_KEY= import.meta.env.VITE_OPENWEATHER_API_KEY

    useEffect(() => {
        async function getCoords(){
            try{
                fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cidade}&limit=1&appid=${API_KEY}`)
                .then(response => response.json())
                .then( data => {
                    if (!data || data.length === 0) {
                        navigate("/", { state: { notFound: true } })
                        return
                    }
                    const coordsData = data[0]
                
                    setCoords(coordsData)
                })
            }catch(error){
                console.log(error)
                navigate("/")
            }
            
        }   
    
        getCoords()
    
    }, [cidade])

    useEffect(() => {
        if (!coords) return

        async function getWeather(){
            try{
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${coords?.lat}&lon=${coords?.lon}&units=metric&lang=pt_br&appid=${API_KEY}`)
                .then(response => response.json())
                .then( data => {
                    const weatherData = data

                    console.log(weatherData)
                    setWeather(weatherData)
                    setLoading(false)
            })
            }catch(error){
                console.log(error)
                navigate("/")   
            }
            
        }

        getWeather()

    }, [coords])    

    const current = weather?.list[0]
    const oneDayAfter = weather?.list?.[11]
    const twoDayAfter = weather?.list?.[19]
    const threeDayAfter = weather?.list?.[27]
    const fourDayAfter = weather?.list?.[35]


    const windSpeedKmh = current?.wind?.speed ? (current.wind?.speed * 3.6).toFixed(1) : null
    const weatherDescription = current?.weather?.[0]?.description
    const country = weather?.city?.country
    const countryImg = `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`

    function renderWeatherIcon(description: string){
        switch(description.toLocaleLowerCase()){
            case "céu limpo":
                return <TiWeatherSunny className={styles.weatherIcon} size={32}/>
            case "algumas nuvens":
            case "nuvens dispersas":
            case "nublado":
                return <TiWeatherCloudy className={styles.weatherIcon} size={32}/>
            case "chuva leve":
            case "chuva":
            case "chuva moderada":
                return <TiWeatherShower className={styles.weatherIcon} size={32}/>
            case "neve":
                return <TiWeatherSnow className={styles.weatherIcon} size={32}/>
            case "névoa":
            case "nevoeiro":
                return <WiFog className={styles.weatherIcon} size={32}/>
            case "trovoada":
                return <TiWeatherStormy className={styles.weatherIcon} size={32}/>
            default:
                return null
        }
    }

    function convertToLocalTime(timestamp: number, timezone: number) {
        const localTimestamp = (timestamp + timezone) * 1000
        const date = new Date(localTimestamp)   

        const hours = date.getUTCHours().toString().padStart(2, '0')
        const minutes = date.getUTCMinutes().toString().padStart(2, '0')

        return `${hours}:${minutes}`
    }

    function formatDate(dt: number) {
    const date = new Date(dt * 1000);
    return date.toLocaleDateString("pt-BR", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });
    }


    if(loading || !weather){
        return(
            <div className={styles.loading}>
                <GoGear size={90} color="fff"/>
            </div>
        )
    }else{
       return(
        <div className={styles.details}>
            <section className={styles.logo}>
               <Link to={"/"}><img src={logimg} alt="Imagem logo climaNow" /></Link>
            </section>

            <aside className={styles.weather}>
                
                <section className={styles.section1}>
                    <div className={styles.cityName}>
                        <h1>{coords?.name}</h1>
                        <img
                            alt={country}
                            src={countryImg}/>
                    </div>
                        <p className={styles.temp}>{current?.main?.temp?.toFixed(0)}°C</p>
                    <div className={styles.currentWeather}>
                        <p className={styles.description}>{weatherDescription}</p>
                        { weatherDescription && renderWeatherIcon(weatherDescription)}
                    </div>
                </section>

                <section className={styles.section2}>
                    <div className={styles.infoDetails1}>
                        <p>Sensação Térmica: {current?.main?.feels_like?.toFixed(0)}°C</p>
                        <p>Temperatura máxima: {current?.main?.temp_max?.toFixed(0)}°C</p>
                        <p>Temperatura mínima: {current?.main?.temp_min.toFixed(0)}°C</p>
                        <p>Nascer do sol: {convertToLocalTime(weather.city.sunrise, weather.city.timezone)}</p>
                        <p>Pôr do sol: {convertToLocalTime(weather.city.sunset, weather.city.timezone)}</p>
                    </div>

                    <div className={styles.infoDetails2}>
                        <p>Humidade: {current?.main?.humidity}%</p>
                        <p>Direção do vento: {current?.wind?.deg}°</p>
                        <p>Velocidade do vento: {windSpeedKmh} Km/h</p>
                        <p>Pressão ao nível do solo: {current?.main?.grnd_level} hPa</p>
                        <p>Pressão ao nível do mar: {current?.main?.sea_level} hPa</p>
                    </div>

                    <div className={styles.infoDetails3}>
                        <p>{formatDate(oneDayAfter!.dt)}</p>
                        <p>{formatDate(twoDayAfter!.dt)}</p>
                        <p>{formatDate(threeDayAfter!.dt)}</p>
                        <p>{formatDate(fourDayAfter!    .dt)}</p>
                    </div>
                    <div className={styles.forecastWeatherSymbol}>
                        <p>{ oneDayAfter?.weather?.[0]?.description && renderWeatherIcon(oneDayAfter?.weather?.[0]?.description)}</p>
                        <p>{ twoDayAfter?.weather?.[0]?.description && renderWeatherIcon(twoDayAfter?.weather?.[0]?.description)}</p>
                        <p>{ threeDayAfter?.weather?.[0]?.description && renderWeatherIcon(threeDayAfter?.weather?.[0]?.description)}</p>
                        <p>{ fourDayAfter?.weather?.[0]?.description && renderWeatherIcon(fourDayAfter?.weather?.[0]?.description)}</p>
                    </div>
                    <div className={styles.forecastWeatherTemperature}>
                        <p>{ oneDayAfter?.main.temp_max.toFixed(0)}°C / { oneDayAfter?.main.temp_min.toFixed(0)}°C</p>
                        <p>{ twoDayAfter?.main.temp_max.toFixed(0)}°C / { twoDayAfter?.main.temp_min.toFixed(0)}°C</p>
                        <p>{ threeDayAfter?.main.temp_max.toFixed(0)}°C / { threeDayAfter?.main.temp_min.toFixed(0)}°C</p>
                        <p>{ fourDayAfter?.main.temp_max.toFixed(0)}°C / { fourDayAfter?.main.temp_min.toFixed(0)}°C</p>
                    </div>
                    <div className={styles.forecastWeatherDescription}>
                        <p>{ oneDayAfter?.weather?.[0].description}</p>
                        <p>{ twoDayAfter?.weather?.[0].description}</p>
                        <p>{ threeDayAfter?.weather?.[0].description}</p>
                        <p>{ fourDayAfter?.weather?.[0].description}</p>
                    </div>

                </section>

            </aside>
        </div>
        ) 
    }
    
}