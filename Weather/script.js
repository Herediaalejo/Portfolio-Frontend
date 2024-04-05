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
    console.log(query)
    const weather = {
        temperature: kelvinToCelcius(data.main.temp),
        main: data.weather[0].main,
        location: cityData.name,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        country: data.sys.country,
        iconId: data.weather[0].icon,
        icon: WEATHER_ICONS[data.weather[0].icon]
    }
    updateHtml(weather)
    document.querySelector("main").style.visibility = "visible";
}

searchBar.addEventListener('submit', getWeather)

searchInput.addEventListener('input', (event) => {
    event.preventDefault();
    //console.log(event.target.value)
})

function updateHtml({ temperature, main, location, country, humidity, wind, iconId, icon }){
    const temp = document.querySelector('.info__temperature')
    const condition = document.querySelector('.info__condition')
    const locationDiv = document.querySelector('.info__location')
    const humPercentage = document.querySelector('.info-conditions__humidity')
    const windSpeed = document.querySelector('.info-conditions__wind-speed')
    const infoImage = document.querySelector('.info__image')
    const input = document.querySelector('.search-bar__input')
    const body = document.querySelector('body')
    input.value = ''
    infoImage.setAttribute('src', `./images/SVG/${icon}.svg`)
    temp.innerText = `${temperature}°C`;
    condition.innerText = main;
    locationDiv.innerHTML = `${location}, <span style="font-weight: bold">${country}</span>`;
    humPercentage.innerText = `${humidity}%`;
    windSpeed.innerText = `${wind} Km/h`;
    let bodyClass = '';

    if (main === 'Clouds'){
        bodyClass = 'body--clouds'
    } else if (main === 'Rain') {
        bodyClass = 'body--rain'
    } else {
        bodyClass = 'body--clear'
    }

    if(iconId.includes('n')){
        bodyClass += ' body--night'
    }

    body.className = bodyClass
}