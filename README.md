# Daily Dress Me
This web-app is a simple service that recommends clothing to wear based on the weather. It uses jQuery, Bootstrap 4, Darksky API and Google Places API for its functionality. It also uses http://cors-anywhere.herokuapp.com/ to deal with CORS-related issues with respect to Darksky API.

The web-app uses temperature, gender and general weather conditions for making the recommendation.

It is also hosted on https://daily-dress-me.bitballoon.com/

## Installation
1. Clone this repo.
2. Open index.html in your browser.

## Functionality Implemented
1. autocomplete for places using Google Places API
2. Weather information retrieval using Darksky API (fixed CORS issues)
3. Current location link to get current location information (using Geolocation browser API) and subsequently weather information for said location.
4. Used jQuery and Bootstrap 4 to create a functional, responsive simple website.

## Future work
1. Make the recomendation more expressive e.g. based on occasion.
2. Allow for some selection of present wardrobe collection to improve recommendations.
3. Improve documentation and images. 