// The request itself is a string that looks like this:
// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
// The apiKey is the key described above. The latitude and longitude are just simple strings that contain the coordinates of a specific location.
// You can keep the API key and coordinates of your preferred location in the utils/constants.js file.
// Weather API returns a lot of information, but for our project, we’ll only need to extract the city name and the current temperature value, as well as define the weather types. Create a function to extract all of the necessary data from the API.
// We recommend keeping all of the data manipulation functionality (fetching and filtering) with the API in a separate utils/weatherApi.js file. Import the API module to App.js. The request to the API should only be made when mounting the App component.
// Since the cards need to be filtered by weather type in Main.js, you can write the logic of defining temperature ranges in utils/weatherApi.js. For example:
// if (temperature >= 86) {
//   return 'hot';
// } else if (temperature >= 66 && temperature <= 85) {
//   return 'warm';
// } else if (temperature <= 65) {
//   return 'cold';
// }
// Here, we only use three ranges based on our own personal temperature sensitivity but you are free to define your ranges and expand the number of weather types.

//First, you need to go to https://openweathermap.org/ and register. Upon registration, you will get a unique API key, which is necessary to make requests to the API. You can find this key on the account dashboard:
