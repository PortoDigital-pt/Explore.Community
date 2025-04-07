/* eslint-disable camelcase */
const decode = value => decodeURIComponent(decodeURIComponent(value));

const extractValuesAndDecode = values => {
  if (!values) {
    return null;
  }

  if (typeof values === 'string') {
    return decode(values);
  }

  if (Array.isArray(values)) {
    const result = values.filter(item => !!item).map(decode);
    return result.length > 0 ? result : null;
  }

  return Object.entries(values).reduce((acc, [key, value]) => {
    if (!value) {
      return {
        ...acc,
        [key]: null
      };
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map(decode)
      };
    }

    return {
      ...acc,
      [key]: decode(value.value ?? value)
    };
  }, {});
};

export const poiToDto = (poi, language) => {
  const {
    id,
    address,
    category_lang,
    contactPoint,
    description_lang,
    location,
    name_lang,
    priceRange,
    calendar,
    districtGroups,
    image,
    extraImages
  } = poi;
  
  return {
    type: 'pois',
    id,
    address: extractValuesAndDecode(address.value),
    category: extractValuesAndDecode(
      category_lang.value[language] || category_lang.value.pt
    ),
    contacts: extractValuesAndDecode(contactPoint.value),
    description: extractValuesAndDecode(
      description_lang.value[language] || description_lang.value.pt
    ),
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: extractValuesAndDecode(
      name_lang.value[language] || name_lang.value.pt
    ),
    priceRange: extractValuesAndDecode(priceRange.value),
    calendar: extractValuesAndDecode(calendar.value),
    districts: extractValuesAndDecode(districtGroups.value),
    images: extractValuesAndDecode([image.value, ...extraImages.value])
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
