//find a place
$(function() {
  $("#geocomplete").geocomplete({detailsAttribute: "data-geo"
    }).bind("geocode:result", function(event, result) {
      console.log(event);
      console.log(result.geometry.location.lat() + ", " + result.geometry.location.lng() );
      getWeatherDetails(result.geometry.location.lat(), result.geometry.location.lng())
      console.log(result)
    });
      

  $("#find").click(function() {
    $("#geocomplete").trigger("geocode");
  });

  $("#gender input[type=radio]").change(function(){
    $("#geocomplete").trigger("geocode");
  });

  // current location
  $(".search_button").click(function() {
    navigator.geolocation.getCurrentPosition(function(position) {
      console.log(position.coords.latitude, position.coords.longitude);
      getWeatherDetails(position.coords.latitude, position.coords.longitude);
      
    });
  });
});


function getWeatherDetails(lat, lng){
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/90c4ae9ccc2d9fa391abda1bf5f8b174/" + lat + "," + lng + "?units=si",
    success: callResult
  });
}

function callResult (data) {
console.log(data,data.currently.icon);

var gender = $("#gender input[name='gender']:checked").attr('value');
var currentTemp = data.currently.temperature; //details
var summary = data.currently.summary; //details
var humidity = data.currently.humidity; //range 0 to 1
var weatherType = data.currently.icon; // clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
var tempRange = "";

if (currentTemp<0){
  tempRange = "below-0";
} else if (currentTemp <= 20 && currentTemp > 0) {
  tempRange = "0-20";
} else if (currentTemp <= 40 && currentTemp > 20) {
  tempRange = "20-40";
} else if ( currentTemp > 40) {
  tempRange = "above-40";
} 

var dressObj = dresStyle[weatherType][gender]["temp"][tempRange];

showDressSuggestions(dressObj, '#result_id', {
  temp: currentTemp,
  humidity: humidity,
  summary: summary,
  currentWeather: weatherType
});
}

function showDressSuggestions(obj, parentEl, weatherObj){
  var mainImgs = obj.imgs; //imgs are array
  var accessoriesImgs = obj.accessories; //accessories are arr of imgs
  var explanation = obj.explanation; //explanation is string
  var currentTemp = weatherObj.temp;
  var currentWeatherCond = weatherObj.currentWeather
  var resultStrcture = '\
  <div class="container">\
    <div class="row justify-content-center">\
      <p class="weather-info"> Temperature: ' + currentTemp + ' &#8451; </p>\
      <p class="weather-info"> Weather Condition:' + currentWeatherCond + '</p>\
    </div>\
    <div class="row">\
      <div class="col-sm-4 hero-img">\
        <img class="img-fluid" src="imgs/' + mainImgs[0] +' ">\
      </div>\
      <div class="col-sm-8 accessories">\
        <div class="row justify-content-center">\
          <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[0]+'">\
          </div>\
          <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[1]+'">\
          </div>\
          <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[2]+'">\
          </div>\
        </div>\
        <div class="row justify-content-center">\
          <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[3]+'">\
          </div>\
          <div class="col-sm-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[4]+'">\
          </div>\
        </div>\
      </div>\
    </div>\
    <div class="row">\
      <div class="col align-self-center explanation">\
        <p class="text-justify">' + explanation + '</p>\
      </div>\
    </div>\
  </div>';
$(parentEl).empty();
$(parentEl).append(resultStrcture)
}

