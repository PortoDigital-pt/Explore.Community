import { BIKEAVL_WITHMAX } from '../util/vehicleRentalUtils';

require('dotenv')?.config();

const {
  CONFIG,
  API_URL,
  OTP_URL,
  MAP_URL,
  POI_MAP_PREFIX,
  APP_TITLE,
  APP_DESCRIPTION,
  BOUNDING_BOX,
  TIME_ZONE,
  TIME_ZONE_DATA,
  ROOTLINK,
  INDEX_PATH,
  TEXT_LOGO,
  LOGO,
  CONTACT_NAME,
  USE_SEARCH_POLYGON,
  FEED_IDS,
  SEARCH_SOURCES,
  PELIAS_LAYER,
  MINIMAL_REGEXP,
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  MAP_ATTRIBUTION,
  APP_BAR_LINK_NAME,
  APP_BAR_LINK_HREF,
  MODES_FERRY_AVAILABLE_SELECTION,
  MODES_FERRY_DEFAULT,
  MODES_CITY_BYKE_AVAILABLE_SELECTION,
  MODES_CITY_BYKE_DEFAULT,
  HIDE_WEATHER_LABEL,
  ALWAYS_SHOW_DISTANCE_IN_KM,
  ALLOW_LOGIN,
  HOST_NAMES,
  USE_REALTIME_TRAVELLER_CAPACITIES,
  VEHICLES,
  SHOW_VEHICLES_ON_STOP_PAGE,
  SHOW_VEHICLES_ON_SUMMARY_PAGE,
  SHOW_WEATHER_INFORMATION,
  INCLUDE_PUBLIC_WITH_BIKE_PLAN,
  REDIRECT_REITTIOPAS_PARAMS,
  SHOW_NEAR_YOU_BUTTONS,
  NEAR_YOU_MODES,
  NARROW_NEAR_YOU_BUTTONS,
  MESSAGE_BAR_ALERTS,
  SHOW_CO2_IN_ITINERARY_SUMMARY,
} = process.env;

const YEAR = 1900 + new Date().getYear();

const minLat = Number(BOUNDING_BOX.split(',')[1]);
const maxLat = Number(BOUNDING_BOX.split(',')[3]);
const minLon = Number(BOUNDING_BOX.split(',')[0]);
const maxLon = Number(BOUNDING_BOX.split(',')[2]);

const realtime = require('./realtimeUtils.amporto').default;

export default {
  CONFIG,
  URL: {
    ROOTLINK,
    API_URL,
    MAP: {
      default: MAP_URL,
      en: MAP_URL,
    },
    STOP_MAP: {
      default: `${OTP_URL}routers/default/vectorTiles/stops,stations/`,
    },
    RENTAL_STATION_MAP: {
      default: `${OTP_URL}routers/default/vectorTiles/rentalStations/`,
    },
    REALTIME_RENTAL_STATION_MAP: {
      default: `${OTP_URL}routers/default/vectorTiles/realtimeRentalStations/`,
    },
    PARK_AND_RIDE_MAP: {
      default: `${POI_MAP_PREFIX}/en/vehicleParking/`,
    },
    PARK_AND_RIDE_GROUP_MAP: {
      default: `${POI_MAP_PREFIX}/en/vehicleParkingGroups/`,
    },
  },

  title: APP_TITLE,
  indexPath: INDEX_PATH,
  textLogo: TEXT_LOGO === 'true',
  logo: LOGO,

  contactName: {
    default: CONTACT_NAME,
  },

  useSearchPolygon: USE_SEARCH_POLYGON === 'true',
  searchParams: {
    'boundary.country': 'PRT',
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
  },
  feedIds: FEED_IDS?.split(',') || ['1', '2'],

  realTime: realtime,

  searchSources: SEARCH_SOURCES?.split(',') || ['oa', 'osm', 'custom'],
  search: {
    peliasLayer: PELIAS_LAYER?.split(',') || ['address', 'stop', 'venue_ropi'],
    minimalRegexp: new RegExp(MINIMAL_REGEXP),
  },

  availableLanguages: AVAILABLE_LANGUAGES?.split(',') || ['pt', 'en'],
  defaultLanguage: DEFAULT_LANGUAGE || 'pt',

  timezoneData: TIME_ZONE_DATA,
  timeZone: TIME_ZONE,

  map: {
    attribution: MAP_ATTRIBUTION,
    areaBounds: {
      corner1: [minLat, minLon],
      corner2: [maxLat, maxLon],
    },
  },

  vehicleRental: {
    networks: {
      smoove: {
        enabled: true,
        season: {
          alwaysOn: true,
        },
        capacity: BIKEAVL_WITHMAX,
        icon: 'citybike',
        name: {
          fi: 'Helsinki ja Espoo',
          sv: 'Helsingfors och Esbo',
          en: 'Helsinki and Espoo',
        },
        type: 'citybike',
        url: {
          fi: 'https://www.hsl.fi/kaupunkipyorat/helsinki',
          sv: 'https://www.hsl.fi/sv/stadscyklar/helsingfors',
          en: 'https://www.hsl.fi/en/citybikes/helsinki',
        },
      },
    },
  },

  appBarLink: {
    name: APP_BAR_LINK_NAME,
    href: APP_BAR_LINK_HREF,
  },

  colors: {
    primary: '#243E8B',
    iconColors: {
      'mode-bus': '#243E8B',
    },
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,
  },

  meta: {
    description: APP_DESCRIPTION,
    keywords: 'digitransit',
  },

  transportModes: {
    ferry: {
      availableForSelection: MODES_FERRY_AVAILABLE_SELECTION === 'true',
      defaultValue: MODES_FERRY_DEFAULT === 'true',
    },
    citybike: {
      availableForSelection: MODES_CITY_BYKE_AVAILABLE_SELECTION === 'true',
      defaultValue: MODES_CITY_BYKE_DEFAULT === 'true',
    },
  },
  hideWeatherLabel: HIDE_WEATHER_LABEL === 'true',
  alwaysShowDistanceInKm: ALWAYS_SHOW_DISTANCE_IN_KM === 'true',

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
    [minLon, minLat],
  ],

  menu: {
    copyright: { label: `© APD ${YEAR}` },
    content: [
      {
        name: 'about-this-service',
        route: '/tietoja-palvelusta',
      },
      {
        name: 'accessibility-statement',
        href: 'https://kauppa.waltti.fi/media/authority/154/files/Saavutettavuusseloste_Waltti-reittiopas_JyQfJhC.htm',
      },
    ],
  },

  allowLogin: ALLOW_LOGIN === 'true',
  /* depends on https://github.com/HSLdevcom/fav-service */
  hostnames: HOST_NAMES?.split(','),

  defaultEndpoint: {
    address: 'Porto - Portugal',
    lat: 41.1533658,
    lon: -8.6046909,
  },

  useRealtimeTravellerCapacities: USE_REALTIME_TRAVELLER_CAPACITIES === 'true',

  aboutThisService: {
    en: [
      {
        header: 'About this service',
        paragraphs: [
          'This service is provided by APD for route planning in AMP region. The service covers public transport, walking, cycling, and some private car use. Service is built on Digitransit platform.',
        ],
      },
    ],
    pt: [
      {
        header: 'Sobre este serviço',
        paragraphs: [
          'Este serviço é prestado pela APD para o planeamento de rotas na região AMP. O serviço cobre transporte público, caminhada, ciclismo e algum uso de carro particular. O serviço é construído na plataforma Digitransit.',
        ],
      },
    ],
  },

  themeMap: {
    porto: 'porto',
    amporto: 'amporto',
  },

  geoJson: {
    layers: [],
  },

  vehicles: VEHICLES === 'true',
  showVehiclesOnStopPage: SHOW_VEHICLES_ON_STOP_PAGE === 'true',
  showVehiclesOnSummaryPage: SHOW_VEHICLES_ON_SUMMARY_PAGE === 'true',

  /* no WFS compatible data for Portugal, so hideWeatherLabel: true */
  showWeatherInformation: SHOW_WEATHER_INFORMATION === 'true',

  includePublicWithBikePlan: INCLUDE_PUBLIC_WITH_BIKE_PLAN === 'true',

  redirectReittiopasParams: REDIRECT_REITTIOPAS_PARAMS === 'true',

  showNearYouButtons: SHOW_NEAR_YOU_BUTTONS === 'true',
  nearYouModes: NEAR_YOU_MODES?.split(',') || [],
  narrowNearYouButtons: NARROW_NEAR_YOU_BUTTONS === 'true',

  messageBarAlerts: MESSAGE_BAR_ALERTS === 'true',

  stopCard: {
    header: {
      virtualMonitorBaseUrl:
        'https://virtualmonitor.services.dev.portodigital.pt/',
    },
  },
  mainMenu: {
    stopMonitor: {
      show: true,
      url: 'https://virtualmonitor.services.dev.portodigital.pt/createview',
    },
  },

  zones: {
    stops: true,
    itinerary: true,
  },

  // Notice! Turning on this setting forces the search for car routes (for the CO2 comparison only).
  showCO2InItinerarySummary: SHOW_CO2_IN_ITINERARY_SUMMARY === 'true',

  availableTickets: null,
};
