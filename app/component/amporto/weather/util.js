const ICON_NAMES = {
  1: 'icon-weather-sun',
  2: 'icon-weather-mostly-sunny',
  3: 'icon-weather-partly-cloudy',
  4: 'icon-weather-cloudy',
  5: 'icon-weather-dense-hazy-sun',
  6: 'icon-weather-partly-cloudy-with-rain',
  7: 'icon-weather-partly-cloudy-with-light-rain',
  8: 'icon-weather-partly-cloudy-with-heavy-rain',
  9: 'icon-weather-cloudy-rain-showers',
  10: 'icon-weather-cloudy-light-rain-showers',
  11: 'icon-weather-cloudy-heavy-rain-showers',
  12: 'icon-weather-cloud-drizzle',
  13: 'icon-weather-cloud-light-rain',
  14: 'icon-weather-cloud-rain',
  15: 'icon-weather-cloud-light-drizzle',
  16: 'icon-weather-hazy-sun',
  17: 'icon-weather-fog',
  18: 'icon-weather-cloud-snow',
  19: 'icon-weather-cloud-lightning',
  20: 'icon-weather-partly-cloudy-with-thunderstorms',
  21: 'icon-weather-cloud-hail',
  22: 'icon-weather-frost',
  23: 'icon-weather-cloud-thunderstorms',
  24: 'icon-weather-cloud-cover',
  25: 'icon-weather-mostly-cloudy',
  26: 'icon-weather-fog',
  27: 'icon-weather-partly-sunny',
  28: 'icon-weather-partly-cloudy-with-snow',
  29: 'icon-weather-cloudy-rain-and-snow',
  30: 'icon-weather-partly-cloudy-with-rain-and-snow'
};

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

export const getWeatherIconId = weatherId => ICON_NAMES[weatherId] || '';
