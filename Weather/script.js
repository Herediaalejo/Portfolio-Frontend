console.log("Script Running...")

const API_KEY = 'd263dd80b37e2fa37304e43295955579'
const searchBar = document.querySelector(".search-bar")
const searchInput = document.querySelector(".search-bar__input")

async function getCity(inputText) {
    try{
        const limit = 5;
        const query = `http://api.openweathermap.org/geo/1.0/direct?q=${inputText}&limit=${limit}&appid=${API_KEY}`;
        const result = await fetch(query)
        const data = await result.json()
        return data[0];
    }catch(e){
        console.log(e)
    }
}

async function getWeather(event) {
    event.preventDefault();
    const inputText = event.target.input__text.value;
    if (!inputText) return;
    const cityData = await getCity(inputText)
    const lat = cityData.lat;
    const lon = cityData.lon;
    const query = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    const result = await fetch(query)
    const data = await result.json()
    const weather = {
        temperature: kelvinToCelcius(data.main.temp),
        main: data.weather[0].main,
        name: cityData.name,
        humidity: data.main.humidity,
        wind: data.wind.speed
    }
    updateHtml(weather)
    document.querySelector("main").style.visibility = "visible";
}

searchBar.addEventListener('submit', getWeather)

searchInput.addEventListener('input', (event) => {
    event.preventDefault();
    //console.log(event.target.value)
})

function updateHtml({ temperature, main, name, humidity, wind }){
    const temp = document.querySelector('.info__temperature')
    const condition = document.querySelector('.info__condition')
    const location = document.querySelector('.info-extra__location')
    const humPercentage = document.querySelector('.info-conditions__humidity-percentage')
    const windSpeed = document.querySelector('.info-conditions__wind-speed-speed')
    temp.innerText = `${temperature}°C`;
    condition.innerText = main;
    location.innerText = name;
    humPercentage.innerText = `${humidity}%`;
    windSpeed.innerText = `${wind} Km/h`;
}