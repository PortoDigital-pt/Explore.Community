/* eslint-disable camelcase */

const getLanguageValuesAndDecode = values =>
  !values
    ? null
    : Object.entries(values).reduce(
        (acc, [language, value]) => ({
          ...acc,
          [language]: value ? decodeURIComponent(value.value ?? value) : null
        }),
        {}
      );

export const poiToDto = (poi, language) => {
  const {
    id,
    address,
    category_lang,
    contactPoint,
    description_lang,
    location,
    name_lang
  } = poi;

  return {
    type: 'pois',
    id,
    address: decodeURIComponent(address.value.streetAddress),
    category: decodeURIComponent(
      category_lang.value[language] || category_lang.value.pt
    ),
    contacts: getLanguageValuesAndDecode(contactPoint.value),
    description: decodeURIComponent(
      description_lang.value[language] || description_lang.value.pt
    ),
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: decodeURIComponent(name_lang.value[language] || name_lang.value.pt)
  };
};

export const eventToDto = (event, language) => {
  const {
    id,
    address,
    category,
    contentUrl,
    description,
    startDate,
    endDate,
    eventPriceFrom,
    eventPriceTo,
    location,
    name,
    webSite
  } = event;

  return {
    type: 'events',
    id,
    address: decodeURIComponent(address.value),
    category: decodeURIComponent(category?.value),
    contacts: {
      image: contentUrl?.value ? decodeURIComponent(contentUrl.value) : null,
      website: webSite?.value ? decodeURIComponent(webSite.value) : null
    },
    description: description?.value
      ? decodeURIComponent(description.value)
      : null,
    startDate: startDate?.value ?? null,
    endDate: endDate?.value ?? null,
    priceFrom: eventPriceFrom?.value ?? null,
    priceTo: eventPriceTo?.value ?? null,
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: decodeURIComponent(name?.value)
  };
};
