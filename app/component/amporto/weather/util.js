export const getWeatherInfoFromResponse = (cityCode, response) => {
  const [weatherResponse, radiationResponse] = response;

  const todayFormatted = new Date().toLocaleDateString('en-CA');
  const weatherInfo = weatherResponse.data?.find(
    weather => todayFormatted === weather.forecastDate
  );

  const radiationInfo = radiationResponse.find(
    radiation =>
      todayFormatted === radiation.data &&
      cityCode === radiation.globalIdLocal?.toString()
  );

  weatherInfo.uv = radiationInfo?.iUv;
  return weatherInfo;
};

export const getWeatherIconId = weatherId => {
  switch (weatherId) {
    case 0:
      return '';
    case 1:
      return 'sun';
    case 27:
    case 26:
    case 25:
    case 24:
    case 17:
    case 16:
    case 5:
    case 4:
    case 3:
    case 2:
      return 'cloud';
    case 20:
    case 14:
    case 12:
    case 11:
    case 9:
    case 8:
    case 7:
    case 6:
      return 'cloud-rain';
    case 10:
      return 'cloud-drizzle';
    case 15:
    case 13:
      return 'droplet';
    case 21:
    case 18:
      return 'cloud-snow';
    case 23:
    case 19:
      return 'cloud-lightning';
    case 22:
      return 'wind';
    default:
      return '';
  }
};
