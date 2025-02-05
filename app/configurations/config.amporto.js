/* eslint-disable */
import { number } from 'prop-types';
import { BIKEAVL_WITHMAX } from '../util/vehicleRentalUtils';

const CONFIG = process.env.CONFIG || 'amporto';
const API_URL = process.env.API_URL || 'https://dev-api.digitransit.fi';
const OTP_URL = process.env.OTP_URL || `${API_URL}/routing/v2/routers/waltti/`;
const MAP_URL =
  process.env.MAP_URL || 'https://digitransit-dev-cdn-origin.azureedge.net';
const POI_MAP_PREFIX =
  process.env.POI_MAP_PREFIX || `${MAP_URL}/map/v3/finland`;

const APP_TITLE = 'Explore.Communities';
const APP_DESCRIPTION = 'Explore.Communities';

const YEAR = 1900 + new Date().getYear();

const BOUNDING_BOX =
  process.env.BOUNDING_BOX || '-9.010822,40.859282,-7.659503,41.461013';


const minLat = Number(BOUNDING_BOX.split(',')[1]);
const maxLat = Number(BOUNDING_BOX.split(',')[3]);
const minLon = Number(BOUNDING_BOX.split(',')[0]);
const maxLon = Number(BOUNDING_BOX.split(',')[2]);

const realtime = require('./realtimeUtils.amporto').default;

const rootLink = process.env.ROOTLINK || 'https://test.hslfi.hsldev.com';

export default {
  CONFIG,
  URL: {
    MAP: {
      default: `${MAP_URL}/`,
      en: `${MAP_URL}/`,
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
      default: `${POI_MAP_PREFIX}/en/vehicleParking/`
    },
    PARK_AND_RIDE_GROUP_MAP: {
      default: `${POI_MAP_PREFIX}/en/vehicleParkingGroups/`
    },
    ROOTLINK: rootLink,
  },

  indexPath: 'amporto',

  title: APP_TITLE,

  textLogo: false,
  logo: 'amporto/logo_porto.svg',

  contactName: {
    default: '',
  },

  useSearchPolygon: true,
  searchParams: {
    'boundary.country': 'PRT',
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon,
  },
  feedIds: [ "1", "2" ],

  realTime: realtime,

  searchSources: ['oa', 'osm', 'custom'],
  search: {
    peliasLayer: ['address', 'stop', 'venue_ropi'],
    minimalRegexp: new RegExp('.+'),
  },

  availableLanguages: ['pt', 'en'],
  defaultLanguage: 'pt',

  timezoneData:
    'Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5',
  timeZone: 'Europe/Lisbon',


  map: {
    attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a>', // DT-3470, DT-3397
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
      }
    },
  },

  appBarLink: { name: 'Portal do Munícipe', href: 'https://portaldomunicipe.cm-porto.pt' },

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
      availableForSelection: false,
      defaultValue: false,
    },
    /*
    funicular: {
      availableForSelection: true,
      defaultValue: true,
    },
    */
    citybike: {
      availableForSelection: true,
      defaultValue: false, // always false
    },
    /*
    car: {
      availableForSelection: true,
      default: false,
    },
    */
  },
  hideWeatherLabel: true,
  alwaysShowDistanceInKm: true,

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
        href:
          'https://kauppa.waltti.fi/media/authority/154/files/Saavutettavuusseloste_Waltti-reittiopas_JyQfJhC.htm',
      },
    ],
  },

  allowLogin: true,
  /* depends on https://github.com/HSLdevcom/fav-service */
  // allowFavouritesFromLocalstorage: !process.env.OIDC_CLIENT_ID,
  hostnames: [
    // DEV hostnames
    'http://localhost:8080',
    'http://localhost:8081',
    'https://ui-dtv3.services.dev.portodigital.pt',
    // PROD hostnames
  ],

  defaultEndpoint: {
    address: 'Porto - Portugal',
    lat: 41.1533658,
    lon: -8.6046909,
  },

  useRealtimeTravellerCapacities: true,

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
    layers: [
      /*
      {
        name: {
          pt: 'Ciclovias',
          en: 'Bike routes',
        },
        url: 'https://servergeo.cm-porto.pt/arcgis/rest/services/PUBLICO/Portal_da_Mobilidade_ext/MapServer/11/query?where=2<3&text=&objectIds=&time=&timeRelation=esriTimeRelationOverlaps&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&sqlFormat=none&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=geojson',
        isOffByDefault: true,
      },
      */
      /*
      {
        name: {
          en: 'Zones',
        },
        url: '/assets/geojson/lpr_zone_lines_20220113.geojson',
        isOffByDefault: true,
      },
      Example from jyvaskyla (no in code; producion environment onyl):
      {

          "name": {
              "fi": "Myyntipisteet",
              "sv": "Servicekontorer",
              "en": "Service points"
          },
          "url": "https://jakoon.jkl.fi/reittiopas/Asiakaspalvelupisteet/myyntipisteet.geojson"
      },
      */
    ],
  },

  vehicles: true,
  showVehiclesOnStopPage: true,
  showVehiclesOnSummaryPage: true,

  /* no WFS compatible data for Portugal, so hideWeatherLabel: true */
  showWeatherInformation: false,

  includePublicWithBikePlan: true,

  redirectReittiopasParams: true,

  showNearYouButtons: true,
  nearYouModes: [
    'favorite',
    'bus',
    'tram',
    'subway',
    'citybike',
  ],
  narrowNearYouButtons: true,

  messageBarAlerts: true,

  stopCard: {
    header: {
      virtualMonitorBaseUrl: 'https://virtualmonitor.services.dev.portodigital.pt/',
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
  showCO2InItinerarySummary: true,

  availableTickets: null

};
