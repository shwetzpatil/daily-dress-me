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
//   console.log(
//     data,
//     data.currently.summary,
//     data.currently.temperature,
//     data.currently.precipIntensity
//   );
//   if (data.currently.precipIntensity === 0) {
//     if (
//       data.currently.temperature <= 20 && data.currently.temperature > 0
//     ) {
//       if ($("#gender").val() === "female") {
//         console.log("A");
//         $("#result_id").html("<span class='ak'>Ak</span>"+ data.currently.temperature );
//         $("#result_img").attr(
//           "src",
//           "https://images.pexels.com/photos/871495/pexels-photo-871495.jpeg?auto=compress&cs=tinysrgb&h=350"

          
//         );
//       } else {
//         console.log("male dress option");
//       }
//     } else if (
//       data.currently.temperature <= 40 && data.currently.temperature > 20
//     ) {
//       console.log("B");
//     } else if (
//       data.currently.temperature <= 60 && data.currently.temperature > 40
//     ) {
//       console.log("C");
//     } else {
//       if ($("#gender").val() === "female") {
//         console.log("A");
//         $("#result_id").html("A");
//         $("#result_img").attr(
//           "src",
//           "https://www.canstockphoto.co.uk/zoom/?height=328&width=448&id=15379210&_ts=1528314370997&scale=1.7857142857142858&left=225&top=25"
//         );
//       } else {
//         console.log("male dress option");
//         $("#result_id").html("male dress option");
//       }
//     }
//   }
console.log(data,data.currently.icon);

var gender = $("#gender").val()
var currentTemp = data.currently.temperature; //details
var summary = data.currently.summary; //details
var humidity = data.currently.humidity; //range 0 to 1
var weatherType = data.currently.icon; // clear-day, clear-night, rain, snow, sleet, wind, fog, cloudy, partly-cloudy-day, or partly-cloudy-night
var tempRange = "";

if (currentTemp<0){
  tempRange = "below-0";
}else if (currentTemp <= 20 && currentTemp > 0) {
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
  // switch(icon){
  //   case "clear-day": showDressSuggestions(clearDay(gender, currentTemp), "#result_id"); 
  //   //$("#result_id").html(clearDay(gender,currentTemp));
  //   break;
  //   case "clear-night": console.log("casual wear");
  //   break;
  //   case "rain": showDressSuggestions(clearDay(gender, currentTemp), "#result_id");
  //   //$("#result_id").html(clearDay(gender,currentTemp));
  //   break;
  //   case "snow": console.log("jacket");
  //   break;
  //   case "sleet": console.log("casual wear");
  //   break;
  //   case "wind": console.log("layers");
  //   break;
  //   case "fog": console.log("sweater");
  //   break;
  //   case "cloudy": console.log("carry umbrella");
  //   break;
  //   case "partly-cloudy-day": showDressSuggestions(clearDay(gender, currentTemp), "#result_id");
  //    //$("#result_id").html(JSON.stringify(clearDay(gender,currentTemp)));
  //   break;
  //   case "partly-cloudy-night": console.log("c");
  //   break;
  //   default: console.log("Your choice");
  // }
}

// function clearDay (gender, temp) {
//   //check if gender is female
//   if (gender === "female") {
//     //check if temp cond is between 0-20
//     if (temp<0){
//       return (dresStyle["clear-day"]["female"]["temp"]["below-0"]);
//     }else if (temp <= 20 && temp > 0) {
//       return (dresStyle["clear-day"]["female"]["temp"]["0-20"]);
//     } else if (temp <= 40 && temp > 20) {
//       return (dresStyle["clear-day"]["female"]["temp"]["20-40"]);
//     } else if ( temp > 40) {
//       return (dresStyle["clear-day"]["female"]["temp"]["above-40"]);
//     } 
//   } else {
//     if (temp<0){
//       return (dresStyle["clear-day"]["male"]["temp"]["below-0"]);
//     }else if(temp <= 20 && temp > 0) {
//       return (dresStyle["clear-day"]["male"]["temp"]["0-20"]);
//     } else if (temp <= 40 && temp > 20) {
//       return (dresStyle["clear-day"]["male"]["temp"]["0-20"]);
//     } else if (temp > 40) {
//       return (dresStyle["clear-day"]["male"]["temp"]["0-20"]);
//     }
//   }
// }

function showDressSuggestions(obj, parentEl, weatherObj){
  var mainImgs = obj.imgs; //imgs are array
  var accessoriesImgs = obj.accessories //accessories are arr of imgs
  var explanation = obj.explanation; //explanation is string
  var resultStrcture = '\
  <div class="container">\
    <div class="row">\
      <div class="col-4">\
        <img class="img-fluid" src="imgs/' + mainImgs[0] +' ">\
      </div>\
      <div class="col-8">\
        <div class="row justify-content-center">\
          <div class="col-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[0]+'">\
          </div>\
          <div class="col-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[1]+'">\
          </div>\
          <div class="col-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[2]+'">\
          </div>\
        <div class="row justify-content-center">\
          <div class="col-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[3]+'">\
          </div>\
          <div class="col-3">\
            <img class="img-fluid" src="imgs/'+accessoriesImgs[4]+'">\
          </div>\
        </div>\
        <div class="row">\
          <div class="col align-self-center">\
            <p>' + explanation + '</p>\
          </div>\
        </div>\
    </div>\
  </div>\
'
$(parentEl).empty();
$(parentEl).append(resultStrcture)
}


