const getLanguageValuesAndDecode = values =>
  !values ? 
  null :
  Object.entries(values).reduce(
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
    address: getLanguageValuesAndDecode(address.value),
    category: getLanguageValuesAndDecode(category_lang.value),
    contacts: contactPoint.value,
    description: getLanguageValuesAndDecode(description_lang.value),
    location: { coordinates: location.value.coordinates },
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
    address: decodeURIComponent(address?.value),
    category: category?.value,
    contacts: {
      image: decodeURIComponent(contentUrl?.value) ?? null,
      website: decodeURIComponent(webSite?.value)
    },
    description: decodeURIComponent(description?.value),
    startDate: startDate?.value,
    endDate: endDate?.value,
    priceFrom: eventPriceFrom?.value ?? null,
    priceTo: eventPriceTo?.value ?? null,
    location: { coordinates: location.value.coordinates },
    name: decodeURIComponent(name?.value)
  };
};
