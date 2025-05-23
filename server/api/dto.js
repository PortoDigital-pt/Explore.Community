/* eslint-disable camelcase */
import { formatCalendar } from './date';
import { getPrice } from './price';

const decode = value => decodeURIComponent(value);

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
        [key]: null,
      };
    }

    if (Array.isArray(value)) {
      return {
        ...acc,
        [key]: value.map(decode),
      };
    }

    return {
      ...acc,
      [key]: decode(value.value ?? value),
    };
  }, {});
};

const formattedPois = (pois, language) =>
  pois.map(poi => {
    const auxPoi = { ...poi };

    const rawDescription = auxPoi.item_description
      ? auxPoi.item_description?.value[language] ||
        auxPoi.item_description?.value?.pt
      : auxPoi.item_description_lang?.value[language] ||
        auxPoi.item_description_lang?.value?.pt;

    const lon = auxPoi.item_location?.value?.coordinates[0];
    const lat = auxPoi.item_location?.value?.coordinates[1];

    delete auxPoi.location;
    delete auxPoi.item_description;

    return {
      ...auxPoi,
      description: extractValuesAndDecode(rawDescription),
      lat,
      lon,
    };
  });

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
      category_lang.value[language] || category_lang.value.pt,
    ),
    contacts: extractValuesAndDecode(contactPoint.value),
    description: extractValuesAndDecode(
      description_lang.value[language] || description_lang.value.pt,
    ),
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: extractValuesAndDecode(
      name_lang.value[language] || name_lang.value.pt,
    ),
    priceRange: extractValuesAndDecode(priceRange.value),
    calendar: formatCalendar(calendar.value, language),
    districts: extractValuesAndDecode(districtGroups.value),
    images: extractValuesAndDecode(
      extraImages.value?.length === 0 ? [image.value] : extraImages.value,
    ),
  };
};

export const eventToDto = (event, language) => {
  const {
    id,
    address,
    section_lang,
    contentURL,
    description_lang,
    startDate,
    endDate,
    eventPriceFrom,
    eventPriceTo,
    location,
    name_lang,
    source,
  } = event;

  return {
    type: 'events',
    id,
    address: extractValuesAndDecode(address.value),
    category: extractValuesAndDecode(
      section_lang.value[language] || section_lang.value.pt,
    ),
    website: extractValuesAndDecode(source.value),
    description: extractValuesAndDecode(
      description_lang.value[language] || description_lang.value.pt,
    ),
    startDate: startDate?.value ?? null,
    endDate: endDate?.value ?? null,
    price: getPrice({
      eventPriceFrom: eventPriceFrom.value,
      eventPriceTo: eventPriceTo.value,
    }),
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: extractValuesAndDecode(
      name_lang.value[language] || name_lang.value.pt,
    ),
    images: extractValuesAndDecode([contentURL.value]),
  };
};

export const routesToDto = (touristTrip, language) => {
  const {
    id,
    category_lang,
    description_lang,
    location,
    name_lang,
    image,
    extraImages,
    itinerary: {
      value: { itemListElement: pois },
    },
    difficulty: { value: difficulty },
    distance: { value: distance },
    duration: { value: duration },
  } = touristTrip;

  return {
    type: 'routes',
    id,
    category: extractValuesAndDecode(
      category_lang.value[language] || category_lang.value.pt,
    ),
    description: extractValuesAndDecode(
      description_lang.value[language] || description_lang.value.pt,
    ),
    lon: location.value.coordinates[0],
    lat: location.value.coordinates[1],
    name: extractValuesAndDecode(
      name_lang.value[language] || name_lang.value.pt,
    ),
    images: extractValuesAndDecode(
      extraImages?.value?.length === 0 ? [image?.value] : extraImages?.value,
    ),
    pois: formattedPois(pois, language),
    difficulty,
    distance,
    duration: duration?.replace('PT', ''),
  };
};
