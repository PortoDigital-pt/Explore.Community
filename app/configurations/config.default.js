/* eslint-disable prefer-template */
import dotenv from 'dotenv';
import safeJsonParse from '../util/safeJsonParser';
import { BIKEAVL_WITHMAX } from '../util/vehicleRentalUtils';
import realTime from './realtimeUtils';

dotenv.config();

const {
  PORT = 8080,
  ROOTLINK,
  CONFIG,
  NODE_ENV,
  API_URL,
  ASSET_URL,
  GEOCODING_BASE_URL,
  API_SUBSCRIPTION_QUERY_PARAMETER_NAME,
  API_SUBSCRIPTION_HEADER_NAME,
  API_SUBSCRIPTION_TOKEN,
  RUN_ENV,
  MAP_URL,
  EXPLORE_TILES_URL,
  OTP_URL,
  OTP_TIMEOUT = 12000,
  APP_PATH = '',
  APP_DESCRIPTION,
  GTM_ID = null,
  APP_TITLE,
  INDEX_PATH = '',
  SHOW_ROUTES,
  SHOW_BLOCKS,
  SHOW_FAVOURITES,
  BOUNDING_BOX,
  MAP_ATTRIBUTION,
  FEED_IDS = '1,2',
  SEARCH_SOURCES = 'oa,osm,custom',
  PELIAS_LAYER = 'address,stop,venue',
  MINIMAL_REGEXP = '.+',
  AVAILABLE_LANGUAGES = 'pt,en',
  DEFAULT_LANGUAGE = 'pt',
  TIME_ZONE_DATA = 'Europe/Lisbon|LMT WET WEST WEMT CET CEST|A.J 0 -10 -20 -10 -20|012121212121212121212121212121212121212121212321232123212321212121212121212121212121212121212121214121212121212121212121212121212124545454212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-2le00 aPX0 Sp0 LX0 1vc0 Tc0 1uM0 SM0 1vc0 Tc0 1vc0 SM0 1vc0 6600 1co0 3E00 17c0 1fA0 1a00 1io0 1a00 1io0 17c0 3I00 17c0 1cM0 1cM0 3Fc0 1cM0 1a00 1fA0 1io0 17c0 1cM0 1cM0 1a00 1fA0 1io0 1qM0 Dc0 1tA0 1cM0 1dc0 1400 gL0 IM0 s10 U00 dX0 Rc0 pd0 Rc0 gL0 Oo0 pd0 Rc0 gL0 Oo0 pd0 14o0 1cM0 1cP0 1cM0 1cM0 1cM0 1cM0 1cM0 3Co0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 pvy0 1cM0 1cM0 1fA0 1cM0 1cM0 1cN0 1cL0 1cN0 1cM0 1cM0 1cM0 1cM0 1cN0 1cL0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|27e5',
  TIME_ZONE = 'Europe/Lisbon',
  ALLOW_LOGIN,
  ALLOW_FAVOURITES_FROM_LOCAL_STORAGE = 'true',
  VIRTUAL_MONITOR_BASE_URL,
  USE_REALTIME_TRAVELLER_CAPACITIES,
  PRIVACY_POLICY,
  COOKIES_POLICY,
  CULTURAL_AGENDA,
  SHOW_NEAR_YOU_BUTTONS,
  NEAR_YOU_MODES = 'favorite,bus,tram,subway,citybike',
  WEATHER_API = 'https://api.ipma.pt/open-data/forecast/meteorology',
  WEATHER_CITY_CODE,
  SHOW_PROFILE_NOTIFICATION,
  EVENT_SOURCE,
  REALTIME_PATCH,
  SHOW_WIFI
} = process.env;
const hasAPISubscriptionQueryParameter =
  API_SUBSCRIPTION_QUERY_PARAMETER_NAME && API_SUBSCRIPTION_TOKEN;

const realTimePatch = safeJsonParse(REALTIME_PATCH) || {};

const minLat = Number(BOUNDING_BOX.split(',')[1]);
const maxLat = Number(BOUNDING_BOX.split(',')[3]);
const minLon = Number(BOUNDING_BOX.split(',')[0]);
const maxLon = Number(BOUNDING_BOX.split(',')[2]);

export default {
  PORT,
  CONFIG,
  NODE_ENV,
  OTPTimeout: OTP_TIMEOUT,
  URL: {
    ROOTLINK,
    API_URL,
    ASSET_URL,
    MAP_URL,
    OTP: OTP_URL,
    MAP: {
      default: MAP_URL,
      en: MAP_URL
    },
    EXPLORE_TILES: {
      default: EXPLORE_TILES_URL
    },
    STOP_MAP: {
      default: `${OTP_URL}routers/default/vectorTiles/stops,stations/`
    },
    RENTAL_STATION_MAP: {
      default: `${OTP_URL}routers/default/vectorTiles/rentalStations/`
    },
    REALTIME_RENTAL_STATION_MAP: {
      default: `${OTP_URL}routers/default/vectorTiles/realtimeRentalStations/`
    },

    FONT: 'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@400;700',
    PELIAS: `${GEOCODING_BASE_URL}/search${
      hasAPISubscriptionQueryParameter
        ? `?${API_SUBSCRIPTION_QUERY_PARAMETER_NAME}=${API_SUBSCRIPTION_TOKEN}`
        : ''
    }`,
    PELIAS_REVERSE_GEOCODER: `${GEOCODING_BASE_URL}/reverse${
      hasAPISubscriptionQueryParameter
        ? `?${API_SUBSCRIPTION_QUERY_PARAMETER_NAME}=${API_SUBSCRIPTION_TOKEN}`
        : ''
    }`,
    PELIAS_PLACE: `${GEOCODING_BASE_URL}/place${
      hasAPISubscriptionQueryParameter
        ? `?${API_SUBSCRIPTION_QUERY_PARAMETER_NAME}=${API_SUBSCRIPTION_TOKEN}`
        : ''
    }`,
    EMBEDDED_SEARCH_GENERATION: '/reittihakuelementti'
  },

  API_SUBSCRIPTION_QUERY_PARAMETER_NAME,
  API_SUBSCRIPTION_HEADER_NAME,
  API_SUBSCRIPTION_TOKEN,
  RUN_ENV,

  hasAPISubscriptionQueryParameter,

  hasAPISubscriptionHeader:
    API_SUBSCRIPTION_HEADER_NAME && API_SUBSCRIPTION_TOKEN,

  APP_PATH,
  title: APP_TITLE,
  indexPath: INDEX_PATH,

  minZoomToShowOnMap: 14,

  privacyPolicyLink: PRIVACY_POLICY,
  cookiesPolicyLink: COOKIES_POLICY,
  culturalAgendaLink: CULTURAL_AGENDA,

  // navbar items
  optionalNavigationItems: {
    routes: SHOW_ROUTES === 'true',
    blocks: SHOW_BLOCKS === 'true',
    favourites: SHOW_FAVOURITES === 'true'
  },

  searchParams: {
    'boundary.country': 'PRT',
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon
  },
  feedIds: FEED_IDS.split(','),

  realTime,
  realTimePatch,

  // Google Tag Manager id
  GTMid: GTM_ID,
  /*
   * Define the icon and icon color used for each citybike station. Two icons are available,
   * 'citybike-stop-digitransit' and 'citybike-stop-digitransit-secondary'. For the first icon
   * the color controls the color of the background and for the second the color of the bicycle
   */
  getAutoSuggestIcons: {
    // eslint-disable-next-line no-unused-vars
    citybikes: station => {
      return ['citybike-stop-digitransit', '#f2b62d'];
    }
  },
  /*
   * by default search endpoints from all but gtfs sources, correct gtfs source
   * figured based on feedIds config variable
   */
  searchSources: SEARCH_SOURCES.split(','),

  search: {
    suggestions: {
      useTransportIcons: false
    },
    usePeliasStops: false,
    mapPeliasModality: false,
    peliasMapping: {},
    peliasLayer: PELIAS_LAYER.split(','),
    peliasLocalization: null,
    minimalRegexp: new RegExp(MINIMAL_REGEXP)
  },

  nearbyRoutes: {
    radius: 10000,
    bucketSize: 1000
  },

  omitNonPickups: true,
  maxNearbyStopAmount: 5,
  maxNearbyStopRefetches: 5,
  maxNearbyStopDistance: {
    favorite: 20000,
    bus: 50000,
    tram: 20000,
    subway: 20000,
    rail: 50000,
    ferry: 50000,
    citybike: 20000,
    airplane: 100000
  },

  defaultSettings: {
    accessibilityOption: 0,
    optimize: 'GREENWAYS',
    bikeSpeed: 5.55,
    ticketTypes: 'none',
    walkBoardCost: 120,
    walkReluctance: 1.8,
    walkSpeed: 1.2,
    transferPenalty: 0,
    minTransferTime: 90,
    includeBikeSuggestions: true,
    includeParkAndRideSuggestions: false,
    includeCarSuggestions: false,
    showBikeAndParkItineraries: false
  },

  /**
   * These are used for dropdown selection of values to override the default
   * settings. This means that values ought to be relative to the current default.
   * If not, the selection may not make any sense.
   */
  defaultOptions: {
    walkReluctance: {
      least: 5,
      less: 3,
      more: 1,
      most: 0.2
    },
    walkSpeed: [0.69, 0.97, 1.2, 1.67, 2.22],
    bikeSpeed: [2.77, 4.15, 5.55, 6.94, 8.33]
  },

  transferPenaltyHigh: 1600,

  suggestWalkMaxDistance: 10000,
  suggestBikeMaxDistance: 30000,
  // if you enable car suggestions but the linear distance between all points is less than this, then a car route will
  // not be computed
  suggestCarMinDistance: 2000,
  availableLanguages: AVAILABLE_LANGUAGES.split(','),
  defaultLanguage: DEFAULT_LANGUAGE,
  timezoneData: TIME_ZONE_DATA,
  timeZone: TIME_ZONE,
  allowLogin: ALLOW_LOGIN === 'true',
  allowFavouritesFromLocalstorage:
    ALLOW_FAVOURITES_FROM_LOCAL_STORAGE === 'true',
  useExtendedRouteTypes: false,
  mainMenu: {
    // Whether to show the left menu toggle button at all
    show: true,
    showDisruptions: true,
    showLoginCreateAccount: true,
    showOffCanvasList: true,
    showFrontPageLink: true,
    stopMonitor: {
      show: false
    },
    showEmbeddedSearch: true
  },

  itinerary: {
    // Wait time to show "wait leg"? e.g. 180 means over 3 minutes are shown as wait time.
    // Measured in seconds.
    waitThreshold: 180,
    // Number of days to include to the service time range from the future
    serviceTimeRange: 60
  },

  map: {
    showWifi: SHOW_WIFI  === 'true',
    useRetinaTiles: true,
    tileSize: 512,
    zoomOffset: -1,
    minZoom: 9,
    maxZoom: 18,
    controls: {
      zoom: {
        // available controls positions: 'topleft', 'topright', 'bottomleft, 'bottomright'
        position: 'bottomright'
      },
      scale: {
        position: 'bottomright'
      }
    },
    genericMarker: {
      // Do not render name markers at zoom levels below this value
      nameMarkerMinZoom: 18,

      popup: {
        offset: [106, 16],
        maxWidth: 250,
        minWidth: 250
      }
    },

    line: {
      halo: {
        weight: 7,
        thinWeight: 2
      },

      leg: {
        weight: 6,
        thinWeight: 2
      },

      passiveColor: '#758993'
    },

    showZoomControl: true,
    showLayerSelector: false,
    showStopMarkerPopupOnMobile: true,
    showScaleBar: true,
    attribution: MAP_ATTRIBUTION,
    useModeIconsInNonTileLayer: false,
    // areBounds is for keeping map and user inside given area
    areaBounds: {
      corner1: [minLat, minLon],
      corner2: [maxLat, maxLon]
    }
  },

  stopCard: {
    header: {
      showDescription: true,
      showStopCode: true,
      showDistance: true,
      virtualMonitorBaseUrl: VIRTUAL_MONITOR_BASE_URL
    }
  },

  autoSuggest: {
    // Let Pelias suggest based on current user location
    locationAware: true
  },

  vehicleRental: {
    // Config for map features. NOTE: availability for routing is controlled by
    // transportModes.citybike.availableForSelection
    showFullInfo: false,
    cityBikeMinZoom: 14,
    cityBikeSmallIconZoom: 14,
    // When should bikeshare availability be rendered in orange rather than green
    fewAvailableCount: 3,
    networks: {
      smoove: {
        enabled: true,
        season: {
          alwaysOn: true
        },
        capacity: BIKEAVL_WITHMAX,
        icon: 'citybike',
        type: 'citybike'
      }
    },
    capacity: BIKEAVL_WITHMAX,
    buyInstructions: {
      fi: 'Osta käyttöoikeutta päiväksi, viikoksi tai koko kaudeksi',
      sv: 'Köp ett abonnemang för en dag, en vecka eller för en hel säsong',
      en: 'Buy a daily, weekly or season pass'
    },
    maxNearbyRentalVehicleAmount: 5,
    maxDistanceToRentalVehiclesInMeters: 100,
    maxMinutesToRentalJourneyStart: 60,
    maxMinutesToRentalJourneyEnd: 720,
    allowDirectScooterJourneys: false
  },

  // Lowest level for stops and terminals are rendered
  stopsMinZoom: 14,
  // Highest level when stops and terminals are still rendered as small markers
  stopsSmallMaxZoom: 14,
  // Highest level when terminals are still rendered instead of individual stops
  terminalStopsMaxZoom: 18,
  terminalStopsMinZoom: 12,
  // lowest zoom level when to draw rail platforms
  railPlatformsMinZoom: 15,
  terminalNamesZoom: 16,
  stopsIconSize: {
    small: 8,
    selected: 28,
    default: 18
  },

  appBarStyle: 'default',

  alwaysShowDistanceInKm: true,

  colors: {
    primary: '#493e90',
    backgroundInfo: '#e5f2fa',
    iconColors: {
      'mode-airplane': '#0046ad',
      'mode-bus': '#A7D9FE',
      'mode-tram': '#A2874F',
      'mode-metro': '#ed8c00',
      'mode-subway': '#00095F',
      'mode-rail': '#af8dbc',
      'mode-ferry': '#247C7B',
      'mode-citybike': '#FFE99D',
      'mode-scooter': '#C5CAD2',
      pois: '#99DCD5',
      events: '#FEC8A7',
      accesspoints: '#493e90'
    },
    itineraryDefault: '#493e90',
    originDestination: {
      icon: {
        color: '#0c534a'
      }
    }
  },
  iconModeSet: 'digitransit',
  fontWeights: {
    medium: 700
  },

  sprites: 'assets/svg-sprite.default.svg',

  disruption: {
    showInfoButton: true
  },

  agency: {
    show: true
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION,

    image: {
      url: '/img/default-social-share.png',
      width: 2400,
      height: 1260
    },

    twitter: {
      card: 'summary_large_image',
      site: ROOTLINK
    }
  },

  meta: {
    description: APP_DESCRIPTION,
    keywords: APP_TITLE
  },

  hideExternalOperator: () => false,
  useTicketIcons: false,

  // Control what transport modes that should be possible to select in the UI
  // and whether the transport mode is used in trip planning by default.
  transportModes: {
    bus: {
      availableForSelection: true,
      defaultValue: true
    },

    tram: {
      availableForSelection: true,
      defaultValue: true
    },

    rail: {
      availableForSelection: false,
      defaultValue: false
    },

    subway: {
      availableForSelection: true,
      defaultValue: true
    },

    airplane: {
      availableForSelection: false,
      defaultValue: false
    },

    ferry: {
      availableForSelection: false,
      defaultValue: false
    },

    funicular: {
      availableForSelection: false,
      defaultValue: false
    },

    citybike: {
      availableForSelection: false,
      defaultValue: false
    },

    scooter: {
      availableForSelection: false,
      defaultValue: false
    }
  },

  moment: {
    relativeTimeThreshold: {
      seconds: 55,
      minutes: 59,
      hours: 23,
      days: 26,
      months: 11
    }
  },

  useSearchPolygon: true,
  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
    [minLon, minLat]
  ],

  // Minimun distance between from and to locations in meters. User is noticed
  // if distance is less than this.
  minDistanceBetweenFromAndTo: 20,

  // If certain mode(s) only exist in limited number of areas, listing the areas as a list of polygons for
  // selected mode key will remove the mode(s) from queries if no coordinates in the query are within the polygon(s).
  // This reduces complexity in finding routes for the query.
  modePolygons: {},

  // Default origin endpoint to use when user is outside of area
  /* e.g. override here or in your own config!
    defaultEndpoint: {
      address: 'Porto - Portugal',
      lat: 41.14858,
      lon: -8.610945
    }
  */
  defaultEndpoint: {},

  defaultMapZoom: 17,

  availableRouteTimetables: {},

  routeTimetableUrlResolver: {},

  showTenWeeksOnRouteSchedule: true,

  useRealtimeTravellerCapacities: USE_REALTIME_TRAVELLER_CAPACITIES === 'true',

  minutesToDepartureLimit: 9,

  routeCancelationAlertValidity: {
    before: 3600, // 1 hour
    after: 900 // 15 minutes
  },

  // this flag when true enables imperial measurements  'feet/miles system'
  imperialEnabled: false,

  vehicles: true,
  showVehiclesOnStopPage: true,
  trafficNowLink: '',

  timetables: {},

  showVehiclesOnItineraryPage: true,

  showWeatherInformation: false,
  showBikeAndParkItineraries: false,

  includePublicWithBikePlan: false,
  includeBikeSuggestions: true,
  includeCarSuggestions: false,
  includeParkAndRideSuggestions: false,
  // Park and ride and car suggestions separated
  separatedParkAndRideSwitch: false,

  showNearYouButtons: SHOW_NEAR_YOU_BUTTONS === 'true',
  nearYouModes: NEAR_YOU_MODES.split(','),
  narrowNearYouButtons: true,

  /* Option to disable the "next" column of the Route panel as it can be confusing sometimes: https://github.com/mfdz/digitransit-ui/issues/167 */
  displayNextDeparture: true,

  messageBarAlerts: false,

  availableTickets: null,
  zones: {
    stops: true,
    itinerary: true
  },

  viaPointsEnabled: true,

  // Toggling this off shows the alert bodytext instead of the header
  showAlertHeader: true,

  showSimilarRoutesOnRouteDropDown: false,

  prioritizedStopsNearYou: {},

  constantOperationStops: {},
  constantOperationRoutes: {},

  embeddedSearch: {
    title: {
      fi: 'Reittihakuelementti',
      en: 'Route search element',
      sv: 'Ruttsökningselement'
    },
    infoText: {
      fi: 'Luo reittihakuelementti ja lisää se omaan palveluusi. Hakukomponentin Hae reitti -painikkeesta siirrytään Reittioppaaseen.',
      en: 'Create a route search element and add it to your own service. The Find route button in the search component will transfer you to the journey planner.',
      sv: 'Skapa ett ruttsökningselement och lägg det till din egen tjänst. Sök rutt-knappen i sökkomponenten tar dig till reseplaneraren.'
    }
  },

  showAlternativeLegs: true,
  // Notice! Turning on this setting forces the search for car routes (for the CO2 comparison only).
  showCO2InItinerarySummary: true,
  geoJsonSvgSize: 20,
  geoJson: {
    layers: []
  },
  routeNotifications: [
    {
      showForBikeWithPublic: true,

      id: 'externalCostWithBike',

      content: {
        fi: [
          'Kulkuneuvossa mahdollisuus kuljettaa pyörää. ',
          'Tarkasta pyörän kuljettamisen mahdollinen maksullisuus operaattorilta.'
        ],
        en: [
          'There is a possibility to transport a bicycle in the vehicle. ',
          'Check the possible cost of transporting a bicycle from the operator.'
        ],
        sv: [
          'Möjlighet att transportera cykel i fordonet. ',
          'Kontrollera eventuell avgift för att transportera cykel från operatören.'
        ]
      }
    },
    {
      showForCarWithPublic: true,

      id: 'externalCostWithCar',

      content: {
        fi: [
          'Kulkuneuvossa mahdollisuus kuljettaa autoa. ',
          'Tarkasta auton kuljettamisen mahdollinen maksullisuus operaattorilta.'
        ],
        en: [
          'You can take your car on board. ',
          'Check with the transport operator if an additional fee will be charged for the transportation of cars.'
        ],
        sv: [
          'Du kan ta med bilen ombord. ',
          'Kontrollera med trafikoperatören om det är avgiftsbelagt att transportera bilar.'
        ]
      }
    }
  ],
  navigation: false,
  sendAnalyticsCustomEventGoals: false,
  shortenLongTextThreshold: 10, // for route number in itinerary summary

  coordinatesBounds: {
    minLat,
    maxLat,
    minLon,
    maxLon
  },

  // description used in explore page, as event section description
  /* e.g. override here or in your own config!
  cards: {
    events: {
      pt: 'Desde exposições de arte emocionantes até concertos ao ar livre, mergulhe na vida cultural vibrante enquanto explora cada canto da cidade. Para ver mais eventos visite a página da *link*Agenda Cultural do Porto*link*.',
      en: 'From exciting art exhibitions to open-air concerts, immerse yourself in the vibrant cultural life as you explore every corner of the city. For more events, visit the *link*Porto Cultural Agenda*link* page.'
    }
  } 
  */
  cards: {},

  // cookies notice used in onboarding page
  /* e.g. override here or in your own config!
  cookiesDescription: {
    pt: 'A Explore.Porto recolhe e armazena informações através de cookies para melhorar a sua experiência. Ao clicar em aceitar, concorda com o uso de cookies. Saiba mais na nossa *link*Política de Privacidade*link*.',
    en: 'Explore.Porto collects and stores information through cookies to improve your experience. By clicking accept, you agree to the use of cookies. Find out more in our *link*Privacy Policy*link*.'
  }
  */
  cookiesDescription: {},

  // onboarding pages
  /* e.g. override here or in your own config
  onboarding: {
    page1: {
      heading: {
        en: 'Explore the city of Porto at **your** **own** **pace**',
        pt: 'Explore a cidade do Porto **ao** **seu** **ritmo**'
      }
    },
    page2: {
      heading: {
        en: 'A new way to get **around** **the** **city** of Porto',
        pt: 'Uma nova forma de se **deslocar** **na** **cidade** do Porto'
      },
      paragraph: {
        en: 'All schedules and transport information available **at** **your** **fingertips**.',
        pt: 'Todos os horários e informaçãos sobre transportes disponíveis **na** **palma** **da** **sua** **mão**.'
      }
    }
  }
  */
  onboarding: null,

  // keys and language translations for your filters
  /* e.g. override here or in your own config!
  filters: {
    pois: {
      fadoHouse: { pt: 'Casas de Fado', en: 'Fado Houses' }
    },
    events: {
      outdoor: { pt: 'Ao Fresco', en: 'Out and about' }
    }
  }
  */
  filters: {
    stop: {
      bus: { pt: 'Autocarro', en: 'Bus' },
      tram: { pt: 'Elétrico', en: 'Tram' },
      subway: { pt: 'Metro', en: 'Subway' },
      rail: { pt: 'Comboio', en: 'Rail' },
      citybike: { pt: 'Bicicletas', en: 'Citybikes' }
    },
    pois: {
      fadoHouse: { pt: 'Casas de Fado', en: 'Fado Houses' }
    },
    events: {
      outdoor: { pt: 'Ao Fresco', en: 'Out and about' }
    }
  },

  // data providers used in NGSI queries and in map Tiles filtering
  // override here or in your own config!
  /* ngsi: {
    dataProvider: {
      pois: '',
      events: ''
    }
  }, */
  ngsi: {
    dataProvider: {}
  },

  weatherApi: WEATHER_API,
  // code from IPMA API for your city
  weatherCityCode: WEATHER_CITY_CODE,
  weather: {
    wind: {
      0: { pt: 'Sem Informação', en: 'No Information' },
      1: { pt: 'Fraco', en: 'Weak' },
      2: { pt: 'Moderado', en: 'Moderate' },
      3: { pt: 'Forte', en: 'Strong' },
      4: { pt: 'Muito forte', en: 'Very Strong' }
    },
    windDirection: {
      N: { pt: 'Norte', en: 'North' },
      NE: { pt: 'Nordeste', en: 'Northeast' },
      E: { pt: 'Leste', en: 'East' },
      SE: { pt: 'Sudeste', en: 'Southeast' },
      S: { pt: 'Sul', en: 'South' },
      SW: { pt: 'Sudoeste', en: 'Southwest' },
      W: { pt: 'Oeste', en: 'West' },
      NW: { pt: 'Noroeste', en: 'Northwest' }
    }
  },
  profile: {
    showNotification: SHOW_PROFILE_NOTIFICATION === 'true',
    showAuthenticationInfo: ALLOW_LOGIN === 'true'
  },
  eventSource: EVENT_SOURCE
};
