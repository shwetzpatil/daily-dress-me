$(function() {
  //initialization of autocomplete for locations.
  $("#geocomplete").geocomplete({detailsAttribute: "data-geo"
    }).bind("geocode:result", function(event, result) {
      console.log(event);
      console.log(result.geometry.location.lat() + ", " + result.geometry.location.lng() );
      getWeatherDetails(result.geometry.location.lat(), result.geometry.location.lng())
      console.log(result)
    });
      

  //trigger click on click of search button
  $("#find").click(function() {
    $("#geocomplete").trigger("geocode");
  });

  //trigger click on change of gender
  $("#gender input[type=radio]").change(function(){
    $("#geocomplete").trigger("geocode");
  });

  // use current location link logic using geolocation browser API
  $(".search_button").click(function() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position.coords.latitude, position.coords.longitude);
        getWeatherDetails(position.coords.latitude, position.coords.longitude);
        
      });
    }else{
      alert('Geolocation API not available');
    }
  });
});

//function to get weather details from Darksky API
function getWeatherDetails(lat, lng){
  //use https://cors-anywhere.herokuapp.com to fix CORS issues
  $.ajax({
    url: "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/90c4ae9ccc2d9fa391abda1bf5f8b174/" + lat + "," + lng + "?units=si",
    success: callResult
  });
}

//handle weather information from API.
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

  //get dress recommendation
  var dressObj = dresStyle[weatherType][gender]["temp"][tempRange];

  //render weather information and dress recommendation.
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
  
  //template to render.
  var resultStrcture = '\
  <div class="container">\
    <div class="row justify-content-center weather-detail">\
      <p class="weather-info"><span style="color: #007bff"><i class="fas fa-thermometer-empty"></i></span>  Temperature : ' + currentTemp + ' &#8451; </p>\
      <p class="weather-info"><span style="color: #007bff"><i class="fab fa-cloudversify"></i></span>  Weather Condition : ' + currentWeatherCond + '</p>\
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

  //empty parent before appending
  $(parentEl).empty();
  $(parentEl).append(resultStrcture)
}


