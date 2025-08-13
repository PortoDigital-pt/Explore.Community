import { validationResult } from 'express-validator';
import { defaultWeatherQueryParams, buildNGSIQueryString } from '../util';

export const getWeather = async (request, response) => {
  const validation = validationResult(request);

  if (!validation.isEmpty()) {
    const [{ msg }] = validation.array();
    return response.status(400).send(msg);
  }

  const {
    query: { language, page, ...queryRest },
    config: {
      filters,
      ngsi: { dataProvider },
      defaultEndpoint: { lat, lon }
    }
  } = request;

  const data = await Promise.all([
    fetch(
      `${process.env.WEATHER_CITY_URL}?${buildNGSIQueryString({
        filters,
        dataProvider,
        coords: `${lat},${lon}`,
        ...defaultWeatherQueryParams,
        ...queryRest
      })}`
    ).then(response => response.json()),
    fetch(
      `${process.env.WEATHER_API}/cities/daily/${process.env.WEATHER_CITY_CODE}.json`
    ).then(response => response.json()),
    fetch(`${process.env.WEATHER_API}/uv/uv.json`).then(response =>
      response.json()
    )
  ]);

  return response.status(200).json({ data });
};
