// const WeatherIcon: React.FC = () => {
//   const svgUrl = "https://www.yr.no/en/content/1-159947/meteogram.svg";

//   return (
//     <img src={svgUrl} alt="Weather Icon" style={{ borderRadius: "10%" }} />
//   );
// };

// export default WeatherIcon;

const WeatherTable: React.FC = () => {
  const tableUrl = "https://www.yr.no/en/content/1-159947/table.html";

  return (
    <iframe
      src={tableUrl}
      title="Weather Table"
      style={{ width: "100%", height: "600px", border: "none" }}
    />
  );
};

export default WeatherTable;

// if time make weather circle trough different locations
