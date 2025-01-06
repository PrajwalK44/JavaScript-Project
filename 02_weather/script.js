document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput=document.getElementById('city-input');
    const getWeatherBtn=document.getElementById('get-weather-btn');
    const weatherInfo=document.getElementById('weather-info');
    const cityName=document.getElementById('city-name');
    const temperature=document.getElementById('temperature');
    const description=document.getElementById('description');
    const errorMessage=document.getElementById('error-message');
    const API_KEY="7e36f06bda87293dfe0e17237dc4117c";

    getWeatherBtn.addEventListener('click', async ()=>{
        const cityName=cityInput.value.trim()
        if(!cityName){
            alert("City Field cannot be Null");
            return;
        }

        try {
            const weatherData = await fetchWeatherData(cityName);
            displayWeatherData(weatherData);
        } catch (error) {
            showError()
        }

    })

    async function fetchWeatherData(city) {
        //gets the data
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

        const response=await fetch(url)
        // console.log(typeof response);
        // console.log(response);
        if(!response.ok){
            throw new Error('City Not Found');
        }
        const data=await response.json()
        return data;
    }

    function displayWeatherData(data) {
        //display
        console.log(data);
        console.log(data.name);
        console.log( )
        const tempInCelsius=(data.main.temp -  273.15).toFixed(2);
        weatherInfo.classList.remove('hidden');
        cityName.innerHTML=`City- ${data.name}`
        temperature.innerHTML=`Temperature- ${tempInCelsius} &#8451;`
        description.innerHTML=`Description- ${data.weather[0].description}`
    }

    function showError() {
        weatherInfo.classList.add("hidden") 
        errorMessage.classList.remove('hidden')
    }
})