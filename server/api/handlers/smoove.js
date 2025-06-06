import { validationResult } from 'express-validator';
import { customFetch } from '../util';

export const getSmooveDetail = async (request, response) => {
  const validation = validationResult(request);

  if (!validation.isEmpty()) {
    const [{ msg }] = validation.array();

    return response.status(400).send(msg);
  }

  const { data, status, text } = await customFetch(
    `${process.env.SMOOVE_URL}${request.params.id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  const [
    {
      vehicle_ids: { value }
    }
  ] = data;

  return response.status(status).json(
    value.reduce(
      (acc, current) => {
        const type = current.includes('scooter') ? 'scooters' : 'bicycles';
        return { ...acc, [type]: ++acc[type] };
      },
      { bicycles: 0, scooters: 0 }
    )
  );
};
