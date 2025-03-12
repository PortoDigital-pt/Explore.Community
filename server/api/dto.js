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

export const poiToDto = poi => {
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
    id,
    address: decodeURIComponent(address.value.streetAddress),
    category: getLanguageValuesAndDecode(category_lang.value),
    contacts: getLanguageValuesAndDecode(contactPoint.value),
    description: getLanguageValuesAndDecode(description_lang.value),
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: getLanguageValuesAndDecode(name_lang.value)
  };
};

export const eventToDto = event => {
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
