const WeatherIcon: React.FC = () => {
  const svgUrl = "https://www.yr.no/en/content/1-159947/meteogram.svg";

  return <img src={svgUrl} alt="Weather Icon" />;
};

export default WeatherIcon;
