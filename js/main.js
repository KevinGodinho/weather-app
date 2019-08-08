/*jslint browser:true */
'use strict';

var weatherConditions = new XMLHttpRequest();
var weatherForecast = new XMLHttpRequest();
var cObj;
var fObj;

function loadWeather(){
    var zip = document.getElementById('zip').value;
    if(zip == ""){
        zip = 92129;
    }
    
    var conditionsPath = "//api.openweathermap.org/data/2.5/weather?zip="+zip+",us&appid=d91c249f7d344dfb5ed27c143c8539fc&units=imperial";
    var forecastPath = "//api.openweathermap.org/data/2.5/forecast?zip="+zip+",us&appid=d91c249f7d344dfb5ed27c143c8539fc&units=imperial";
    
    // GET THE CONDITIONS
weatherConditions.open('GET', conditionsPath, true);
weatherConditions.responseType = 'text';
weatherConditions.send(null);
    
    // GET THE FORECARST
weatherForecast.open('GET', forecastPath, true);
weatherForecast.responseType = 'text'; 
weatherForecast.send();
}//end function



weatherConditions.onload = function() {
    if (weatherConditions.status === 200){
        cObj = JSON.parse(weatherConditions.responseText); 
        console.log(cObj);
        document.getElementById('location').innerHTML = cObj.name;
        document.getElementById('weather').innerHTML = cObj.weather[0].description;
        document.getElementById('temperature').innerHTML = cObj.main.temp;
        document.getElementById('desc').innerHTML = "Wind Speed " + cObj.wind.speed;

    } //end if
}; //end function



weatherForecast.onload = function() {
if (weatherForecast.status === 200){
	fObj = JSON.parse(weatherForecast.responseText);
	console.log(fObj);
    
    var date_raw = fObj.list[0].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r1c1').innerHTML = date_raw;
    
    var iconcode = fObj.list[0].weather[0].icon;
    var icon_path = "http://openweathermap.org/img/w/"+iconcode+".png";
    document.getElementById('r1c2').src = icon_path;
    document.getElementById('r1c3').innerHTML = fObj.list[0].main.temp_min+"&deg;";
    document.getElementById('r1c4').innerHTML = fObj.list[0].main.temp_max+"&deg;";
    
    var date_raw = fObj.list[8].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r2c1').innerHTML = date_raw;
    
    var iconcode = fObj.list[8].weather[0].icon;
    var icon_path = "http://openweathermap.org/img/w/"+iconcode+".png";
    document.getElementById('r2c2').src = icon_path;
    document.getElementById('r2c3').innerHTML = fObj.list[8].main.temp_min+"&deg;";
    document.getElementById('r2c4').innerHTML = fObj.list[8].main.temp_max+"&deg;";
    
    var date_raw = fObj.list[16].dt_txt;
    date_raw = date_raw.substring(5,11);
    document.getElementById('r3c1').innerHTML = date_raw;
    
    var iconcode = fObj.list[16].weather[0].icon;
    var icon_path = "http://openweathermap.org/img/w/"+iconcode+".png";
    document.getElementById('r3c2').src = icon_path;
    document.getElementById('r3c3').innerHTML = fObj.list[16].main.temp_min+"&deg;";
    document.getElementById('r3c4').innerHTML = fObj.list[16].main.temp_max+"&deg;";
	
} //end if
}; //end function


loadWeather();