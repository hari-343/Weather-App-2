# Weather App

A sleek, interactive, and responsive weather application built with **HTML5**, **CSS3**, and **JavaScript (ES6+)**. The app fetches live weather data from the [OpenWeatherMap API](https://openweathermap.org/api) and displays current conditions plus a 4-day forecast for any city.

![Weather App Screenshot](screenshots/main.png) <!-- You can replace this path with your actual screenshot path -->

## Features

- **City Search:** Find weather information for any city.
- **Current Weather Display:** Shows temperature, weather conditions, humidity, and wind speed.
- **Weather Icons:** Dynamically displays icons based on the weather.
- **4-Day Forecast:** Forecast for the next 4 days at noon.
- **Responsive Design:** Works seamlessly on mobile and desktop.
- **User-Friendly UI:** Smooth animations, glassmorphism design, and intuitive layout.
- **Error Handling:** Displays “City not found” for invalid city names.

## Screenshots

| Search City | Current Weather | Dynamic Icons | 4-Day Forecast |
|-------------|----------------|---------------|----------------|
| ![Search](screenshots/search.png) | ![Weather](screenshots/current.png) | ![Icons](screenshots/icons.png) | ![Forecast](screenshots/forecast.png) |

## Technologies Used

- **HTML5:** Semantic markup for structured content.
- **CSS3:** Glassmorphism, responsive styling, animations.
- **JavaScript (ES6+):** DOM manipulation, fetch API, async/await.
- **OpenWeatherMap API:** Real-time weather and forecast data.
- **Google Fonts & Material Icons:** Typography and iconography.

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/weather-app.git
    ```
2. **Navigate to the project folder:**
    ```bash
    cd weather-app
    ```
3. **Open `index.html` in your browser.**

## Usage

- Enter a city name in the search input.
- Click the **Search** button or press **Enter**.
- View current weather and 4-day forecast.
- Invalid city names show an error message.

## API Integration

The app requires a valid [OpenWeatherMap API](https://openweathermap.org/api) key.

1. **Sign up** at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up).
2. Go to your [API keys](https://home.openweathermap.org/api_keys) page.
3. Copy your API key.
4. Open `script.js` and replace `'YOUR_API_KEY'`:

    ```javascript
    // script.js
    const apiKey = 'YOUR_API_KEY'; // <-- Replace with your actual API key
    ```

**Note:** Never share your API key publicly.

## Contributing

Contributions are welcome! Please open issues or pull requests for any improvements, bug fixes, or feature requests.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- [OpenWeatherMap](https://openweathermap.org/)
- [Google Fonts](https://fonts.google.com/)
- [Material Icons](https://fonts.google.com/icons)
