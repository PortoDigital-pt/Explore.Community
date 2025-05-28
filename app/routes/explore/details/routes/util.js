const PARAMS = {
  modes: {
    directOnly: true,
    transitOnly: false,
    direct: ['WALK'],
    transit: {
      access: null,
      transfer: null,
      egress: null,
      transit: null
    }
  },
  datetime: {
    earliestDeparture: new Date()
  },
  first: 1,
  numItineraries: 1,
  wheelchair: false,
  planType: 'WALK',
  noIterationsForShortTrips: false,
  via: []
};

export const buildPlanQuery = pois => {
  const queries = [];

  pois?.forEach((poi, index) => {
    const nextPoi = pois[index + 1];

    if (nextPoi) {
      const queryParams = { ...PARAMS };

      queryParams.fromPlace = {
        location: {
          coordinate: {
            latitude: poi.lat,
            longitude: poi.lon
          }
        },
        label: poi.name
      };

      queryParams.toPlace = {
        location: {
          coordinate: {
            latitude: nextPoi.lat,
            longitude: nextPoi.lon
          }
        },
        label: nextPoi.name
      };

      queries.push(queryParams);
    }
  });

  return queries;
};

export const getItineraryPath = poi =>
  `/browse/-/${poi.name}::${poi.lat},${poi.lon}`;
