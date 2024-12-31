import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import { FaCloudSun } from "react-icons/fa";

const Home = () => {
    const [city, setCity] = useState("Bhubaneswar");
    const [data, setData] = useState(undefined);
    const [currentDate, setCurrentDate] = useState("");

    const cityList = ["Mumbai", "Delhi", "Bangalore"];

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        setCurrentDate(formattedDate);
    }, []);

    const handleChange = (e) => {
        const toCapitalCase = (word) => word.trim().charAt(0).toUpperCase() + word.trim().slice(1).toLowerCase();
        setCity(toCapitalCase(e.target.value));
    };

    const getWeather = async () => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8daa5d58458ae8b89c18365e0ed08db0`);
        const result = await response.json();
        setData(result);
    };

    let min_temp, max_temp, main_temp, city_name, weather;
    if (data) {
        min_temp = Math.floor(data.main.temp_min - 273.15);
        max_temp = Math.floor(data.main.temp_max - 273.15);
        main_temp = Math.floor(data.main.temp - 273.15);
        city_name = data.name;
        weather = data.weather[0].description;
    } else {
        min_temp = max_temp = main_temp = 0;
        city_name = "City";
        weather = "Weather";
    }

    return (
        <div className="card">
            <Navbar />
            <h1>{city_name}</h1>
            <p className="current-date">{currentDate}</p>
            <div>
                <FaCloudSun size={50} />
                <p>{weather}</p>
                <p>{main_temp}°C</p>
                <p>
                    Min: {min_temp}°C / Max: {max_temp}°C
                </p>
            </div>
            <div>
                <input type="search" placeholder="Search city" list="cities" onChange={handleChange} />
                <datalist id="cities">
                    {cityList.map((ele, index) => (
                        <option value={ele} key={index} />
                    ))}
                </datalist>
                <button onClick={getWeather}>Search</button>
            </div>
        </div>
    );
};
export default Home;
