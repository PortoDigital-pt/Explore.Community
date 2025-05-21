export const POI_ONE = {
  name: 'Poi ONE',
  lon: -8.58273213,
  lat: 41.16078345
};

export const POI_TWO = {
  name: 'Poi TWO',
  lon: -8.622465,
  lat: 41.149367
};

export const MOCK_PARAMS = {
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
  fromPlace: {
    location: {
      coordinate: {
        latitude: POI_ONE.lat,
        longitude: POI_ONE.lon
      }
    },
    label: POI_ONE.name
  },
  toPlace: {
    location: {
      coordinate: {
        latitude: POI_TWO.lat,
        longitude: POI_TWO.lon
      }
    },
    label: POI_ONE.name
  },
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

export const LEGS = [
  {
    legId: null,
    mode: 'subway',
    legGeometry: {
      points: 'ybczFrxps@yUX????aViI??'
      // points: 'kaczFlaps@FBpAt@NHEHEL?@M^?XCl@J|C@THz@BRk@XC@GEYCc@AO@C@C@A@k@tDMZGX@?v@V??',
    },
    from: {
      lat: 41.144766,
      lon: -8.607251,
      name: 'Crocodile Club-yyy'
    },
    to: {
      lat: 41.14494,
      lon: -8.610815
    }
  }
];

export const buildPlanQuery = pois => {
  console.log('log-buildPlanQuery', pois);
  const queries = [];

  pois?.forEach((poi, index) => {
    const nextPoi = pois[index + 1];

    if (nextPoi) {
      const queryParams = { ...MOCK_PARAMS };

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

  // const asyncOperations = [];

  // queries.forEach((it: string) => {
  //   asyncOperations.push(this.someUseCase.execute());
  // });
  // await Promise.all(asyncOperations);

  return queries;
};
