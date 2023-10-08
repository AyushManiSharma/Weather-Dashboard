let $SearchBtn = $('#SearchBtn');
let $ClearBtn = $('#Clear');
let BtnPlace = $('#BtnSpots');
let Input = document.querySelector('#search-city');
let CityName = document.querySelector('#CityName');
let Temp = document.querySelector('#Temp');
let Wind = document.querySelector('#Wind');
let Humid = document.querySelector('#Humidity');
let Index = document.querySelector('#Index');
let createImage = document.createElement('img');
let createImage2 = document.createElement('img');
let createImage3 = document.createElement('img');
let HistoryCities = $(JSON.parse(localStorage.getItem('saved')));

addEntry();
function addEntry() {
    HistoryCities.sort();
    for (let i = 0; i < HistoryCities.length; i++) {
        if (HistoryCities[i] === HistoryCities[i - 1]) {
            HistoryCities.splice(i, 1);
            i--;
        }
    }
    CreateBtn();
}

function CreateBtn() {
    BtnPlace.children().remove();
    for (const element of HistoryCities) {
        let btn = document.createElement("button");
        btn.textContent = (element);
        btn.setAttribute('id', 'Relook');
        document.getElementById('BtnSpots').appendChild(btn);
    }
}

$SearchBtn.on('click', function (event) {
    console.log(Input.value);
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + Input.value + '&appid=55a621c514a6bcf2dde6b6f72b563167')
        .then(response => response.json())
        .then(data => {
            let CityValue = data['name'];
            let TemperValue = data['main']['temp'];
            let windValue = data['wind']['speed'];
            let HumidValue = data['main']['humidity'];
            let ImgValue = data.weather[0].icon;

            CityName.innerHTML = (CityValue + " ");
            let convertTemp = Math.trunc(TemperValue - 273.15);
            Temp.innerHTML = "Temperature: " + convertTemp + " °F";;
            Wind.innerHTML = ("Wind: " + windValue + " mph");
            Humid.innerHTML = ("Humidity: " + HumidValue);
            createImage.src = "http://openweathermap.org/img/wn/" + ImgValue + ".png";

            document.getElementById('Index').append(createImage);
            HistoryCities.push(CityValue);
            localStorage.setItem('saved', JSON.stringify(HistoryCities));
            addEntry();
        })

        .catch(err => alert("Wrong city name"))

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + Input.value + '&units=metric&appid=55a621c514a6bcf2dde6b6f72b563167')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let Icon1 = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
            $('#Icon1').attr('src', Icon1);
            document.getElementById("Temp1").innerHTML = 'Temp: ' + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind1").innerHTML = 'Wind: ' + Number(data.list[0].wind.speed) + " Mph";
            document.getElementById("Humidity1").innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity);
            document.getElementById("Date1").innerHTML = (data.list[0].dt_txt);

            let Icon2 = 'https://openweathermap.org/img/w/' + data.list[8].weather[0].icon + '.png';
            $('#Icon2').attr('src', Icon2);
            document.getElementById("Temp2").innerHTML = 'Temp: ' + Number(data.list[8].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind2").innerHTML = 'Wind: ' + Number(data.list[8].wind.speed) + " Mph";
            document.getElementById("Humidity2").innerHTML = 'Humidity: ' + Number(data.list[8].main.humidity);
            document.getElementById("Date2").innerHTML = (data.list[8].dt_txt);

            let Icon3 = 'https://openweathermap.org/img/w/' + data.list[16].weather[0].icon + '.png';
            $('#Icon3').attr('src', Icon3);
            document.getElementById("Temp3").innerHTML = 'Temp: ' + Number(data.list[16].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind3").innerHTML = 'Wind: ' + Number(data.list[16].wind.speed) + " Mph";
            document.getElementById("Humidity3").innerHTML = 'Humidity: ' + Number(data.list[16].main.humidity);
            document.getElementById("Date3").innerHTML = (data.list[16].dt_txt);

            let Icon4 = 'https://openweathermap.org/img/w/' + data.list[24].weather[0].icon + '.png';
            $('#Icon4').attr('src', Icon4);
            document.getElementById("Temp4").innerHTML = 'Temp: ' + Number(data.list[24].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind4").innerHTML = 'Wind: ' + Number(data.list[24].wind.speed) + " Mph";
            document.getElementById("Humidity4").innerHTML = 'Humidity: ' + Number(data.list[24].main.humidity);
            document.getElementById("Date4").innerHTML = (data.list[24].dt_txt);

            let Icon5 = 'https://openweathermap.org/img/w/' + data.list[32].weather[0].icon + '.png';
            $('#Icon5').attr('src', Icon5);
            document.getElementById("Temp5").innerHTML = 'Temp: ' + Number(data.list[32].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind5").innerHTML = 'Wind: ' + Number(data.list[32].wind.speed) + " Mph";
            document.getElementById("Humidity5").innerHTML = 'Humidity: ' + Number(data.list[32].main.humidity);
            document.getElementById("Date5").innerHTML = (data.list[32].dt_txt);
        })

});

$('#BtnSpots').on('click', '#Relook', function (event) {
    console.log("Clicked");
    let city = $(this).text();
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=55a621c514a6bcf2dde6b6f72b563167')
        .then(response => response.json())
        .then(data => {
            let CityValue = data['name'];
            let TemperValue = data['main']['temp'];
            let windValue = data['wind']['speed'];
            let HumidValue = data['main']['humidity'];
            let ImgValue = data.weather[0].icon;

            CityName.innerHTML = (CityValue + " ");
            let convertTemp = Math.trunc(1.8 * (TemperValue - 273) + 32);
            Temp.innerHTML = ("Temperature: " + convertTemp + " °F");
            Wind.innerHTML = ("Wind: " + windValue + " mph");
            Humid.innerHTML = ("Humidity: " + HumidValue);

            createImage.src = "http://openweathermap.org/img/wn/" + ImgValue + ".png";

            document.getElementById('Index').append(createImage);

            HistoryCities.push(CityValue);
            localStorage.setItem('saved', JSON.stringify(HistoryCities));
            addEntry();
        })

        .catch(err => alert("Wrong city name"))

    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=55a621c514a6bcf2dde6b6f72b563167')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let Icon1 = 'https://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png';
            $('#Icon1').attr('src', Icon1);
            document.getElementById("Temp1").innerHTML = 'Temp: ' + Number(data.list[0].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind1").innerHTML = 'Wind: ' + Number(data.list[0].wind.speed) + " Mph";
            document.getElementById("Humidity1").innerHTML = 'Humidity: ' + Number(data.list[0].main.humidity);
            document.getElementById("Date1").innerHTML = (data.list[0].dt_txt);

            let Icon2 = 'https://openweathermap.org/img/w/' + data.list[8].weather[0].icon + '.png';
            $('#Icon2').attr('src', Icon2);
            document.getElementById("Temp2").innerHTML = 'Temp: ' + Number(data.list[8].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind2").innerHTML = 'Wind: ' + Number(data.list[8].wind.speed) + " Mph";
            document.getElementById("Humidity2").innerHTML = 'Humidity: ' + Number(data.list[8].main.humidity);
            document.getElementById("Date2").innerHTML = (data.list[8].dt_txt);

            let Icon3 = 'https://openweathermap.org/img/w/' + data.list[16].weather[0].icon + '.png';
            $('#Icon3').attr('src', Icon3);
            document.getElementById("Temp3").innerHTML = 'Temp: ' + Number(data.list[16].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind3").innerHTML = 'Wind: ' + Number(data.list[16].wind.speed) + " Mph";
            document.getElementById("Humidity3").innerHTML = 'Humidity: ' + Number(data.list[16].main.humidity);
            document.getElementById("Date3").innerHTML = (data.list[16].dt_txt);

            let Icon4 = 'https://openweathermap.org/img/w/' + data.list[24].weather[0].icon + '.png';
            $('#Icon4').attr('src', Icon4);
            document.getElementById("Temp4").innerHTML = 'Temp: ' + Number(data.list[24].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind4").innerHTML = 'Wind: ' + Number(data.list[24].wind.speed) + " Mph";
            document.getElementById("Humidity4").innerHTML = 'Humidity: ' + Number(data.list[24].main.humidity);
            document.getElementById("Date4").innerHTML = (data.list[24].dt_txt);

            let Icon5 = 'https://openweathermap.org/img/w/' + data.list[32].weather[0].icon + '.png';
            $('#Icon5').attr('src', Icon5);
            document.getElementById("Temp5").innerHTML = 'Temp: ' + Number(data.list[32].main.temp).toFixed(0) + "°F";
            document.getElementById("Wind5").innerHTML = 'Wind: ' + Number(data.list[32].wind.speed) + " Mph";
            document.getElementById("Humidity5").innerHTML = 'Humidity: ' + Number(data.list[32].main.humidity);
            document.getElementById("Date5").innerHTML = (data.list[32].dt_txt);
        })

});

$ClearBtn.on('click', function () {
    localStorage.clear();
    location.reload();
})

// Add this code inside your existing script.js file or include it in a separate JavaScript file
document.getElementById("Clear").addEventListener("click", function () {
    // Perform the action to clear the history here
    // For example, you can clear local storage or perform any other relevant tasks
    console.log("Clear History button clicked");
});