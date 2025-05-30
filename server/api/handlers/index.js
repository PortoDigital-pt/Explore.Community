/* eslint-disable no-console */
import { validationResult } from 'express-validator';
import { getOffset, getInfinitePagination } from '../pagination';
import { buildNGSIQueryString, customFetch } from '../util';

export const getList = async (toDto, defaultQueryParams, request, response) => {
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
  console.log('rest: ', queryRest);
  const paginated = page !== undefined;

  if (paginated) {
    // eslint-disable-next-line no-param-reassign
    defaultQueryParams.offset = getOffset({
      limit: queryRest.limit ?? defaultQueryParams.limit,
      page
    });
  }
  console.log(
    'QUERY: ',
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords: `${lat},${lon}`,
      ...defaultQueryParams,
      ...queryRest
    })}`
  );
  const { data, total, status, text } = await customFetch(
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords: `${lat},${lon}`,
      ...defaultQueryParams,
      ...queryRest
    })}`,
    paginated
  );

  if (!data) {
    return response.status(status).send(text);
  }

  let pagination = null;

  if (paginated) {
    pagination = getInfinitePagination({
      total,
      page,
      limit: defaultQueryParams.limit
    });
  }

  return response.status(status).json({
    data: data.map(item => toDto(item, language)),
    pagination
  });
};

export const getDetail = async (toDto, request, response) => {
  const validation = validationResult(request);

  if (!validation.isEmpty()) {
    const [{ msg }] = validation.array();

    return response.status(400).send(msg);
  }

  const {
    params: { id },
    query: { language }
  } = request;

  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(toDto(data, language));
};
