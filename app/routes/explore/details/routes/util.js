const PARAMS = {
  accessibilityOption: 0,
  optimize: 'GREENWAYS',
  bikeSpeed: 5.55,
  ticketTypes: 'none',
  walkBoardCost: 120,
  walkReluctance: 1.8,
  walkSpeed: 1.2,
  transferPenalty: 0,
  minTransferTime: 'PT90S',
  includeBikeSuggestions: false,
  includeParkAndRideSuggestions: false,
  includeCarSuggestions: false,
  showBikeAndParkItineraries: false,
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
  allowedBikeRentalNetworks: null,
  scooterNetworks: null,
  allowedRentalNetworks: null,
  datetime: {
    earliestDeparture: '2025-05-21T13:44:07+01:00'
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
