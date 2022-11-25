// The Main component is a wrapper for the main content of the app. It includes:
// The WeatherCard component, which shows the current temperature. Weather data is sent here, in addition to the Header, as props. Note that the weather data is not stored in Main.js, so you need to pass it down from the App component.
// Clothing item cards, which are filtered based on the current weather. Wrap the ItemCard component into the unordered list and use the filter() and map() methods.

//WeatherCard
//The WeatherCard receives data from its parent (props chain example: App → Main → WeatherCard). The weather data itself can be a big object, but we only need the temperature to render in the card. The measurement units aren’t important at this stage. We’ll only use Fahrenheit for now.
//ItemCard
//ItemCard is a component that renders the image and title for an item of clothing. Moreover, the image is an interactive element, meaning that if the user clicks on it, the item modal will open. Note that the item card itself doesn’t know about the modal state. Therefore, you need to pass it down from App to Main. In other words, when the user clicks on the image, you need to call the state change function handleCardClick() that ItemCard receives as a prop.
