const WeatherIcon: React.FC = () => {
  const svgUrl = "https://www.yr.no/en/content/1-159947/meteogram.svg";

  return (
    <img src={svgUrl} alt="Weather Icon" style={{ borderRadius: "10%" }} />
  );
};

export default WeatherIcon;

// if time make weather circle trough different locations
