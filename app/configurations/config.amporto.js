import { BIKEAVL_WITHMAX } from '../util/vehicleRentalUtils';

require('dotenv')?.config();

const {
  CONFIG,
  API_URL,
  OTP_URL,
  MAP_URL,
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
  SHOW_ROUTES,
  SHOW_BLOCKS,
  SHOW_FAVOURITES,
  PRIVACY_POLICY,
  COOKIES_POLICY,
  EXPLORE_TILES_URL,
  CULTURAL_AGENDA,
  WEATHER_API,
  WEATHER_CITY_CODE,
  SHOW_PROFILE_NOTIFICATION
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
    FONT: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800'
  },

  exploreMinZoom: 13,

  title: APP_TITLE,
  indexPath: INDEX_PATH,
  textLogo: TEXT_LOGO === 'true',
  logo: LOGO,

  // navbar items
  optionalNavigationItems: {
    routes: SHOW_ROUTES === 'true',
    blocks: SHOW_BLOCKS === 'true',
    favourites: SHOW_FAVOURITES === 'true'
  },

  contactName: {
    default: CONTACT_NAME
  },

  useSearchPolygon: USE_SEARCH_POLYGON === 'true',
  searchParams: {
    'boundary.country': 'PRT',
    'boundary.rect.min_lat': minLat,
    'boundary.rect.max_lat': maxLat,
    'boundary.rect.min_lon': minLon,
    'boundary.rect.max_lon': maxLon
  },
  feedIds: FEED_IDS?.split(',') || ['1', '2'],

  realTime: realtime,

  searchSources: SEARCH_SOURCES?.split(',') || ['oa', 'osm', 'custom'],
  search: {
    peliasLayer: PELIAS_LAYER?.split(',') || ['address', 'stop', 'venue'],
    minimalRegexp: new RegExp(MINIMAL_REGEXP)
  },

  availableLanguages: AVAILABLE_LANGUAGES?.split(',') || ['pt', 'en'],
  defaultLanguage: DEFAULT_LANGUAGE || 'pt',

  timezoneData: TIME_ZONE_DATA,
  timeZone: TIME_ZONE,

  map: {
    showLayerSelector: false,
    attribution: MAP_ATTRIBUTION,
    areaBounds: {
      corner1: [minLat, minLon],
      corner2: [maxLat, maxLon]
    }
  },

  vehicleRental: {
    networks: {
      smoove: {
        enabled: true,
        season: {
          alwaysOn: true
        },
        capacity: BIKEAVL_WITHMAX,
        icon: 'citybike',
        name: {
          fi: 'Helsinki ja Espoo',
          sv: 'Helsingfors och Esbo',
          en: 'Helsinki and Espoo'
        },
        type: 'citybike',
        url: {
          fi: 'https://www.hsl.fi/kaupunkipyorat/helsinki',
          sv: 'https://www.hsl.fi/sv/stadscyklar/helsingfors',
          en: 'https://www.hsl.fi/en/citybikes/helsinki'
        }
      }
    }
  },

  appBarLink: {
    name: APP_BAR_LINK_NAME,
    href: APP_BAR_LINK_HREF
  },

  sprites: 'assets/svg-sprite.amporto.svg',

  colors: {
    primary: '#000F9F',
    iconColors: {
      'mode-bus': '#A7D9FE',
      'mode-tram': '#A2874F',
      'mode-subway': '#00095F',
      'mode-citybike': '#FFE99D',
      pois: '#99DCD5',
      events: '#FEC8A7',
      accesspoints: '#000F9F'
    },
    originDestination: {
      icon: {
        color: '#00095F',
        inverseColor: '#FAFAFA'
      }
    }
  },

  socialMedia: {
    title: APP_TITLE,
    description: APP_DESCRIPTION
  },

  meta: {
    description: APP_DESCRIPTION,
    keywords: 'digitransit'
  },

  transportModes: {
    airplane: {
      availableForSelection: false,
      defaultValue: false
    },
    rail: {
      availableForSelection: false,
      defaultValue: false
    },
    ferry: {
      availableForSelection: MODES_FERRY_AVAILABLE_SELECTION === 'true',
      defaultValue: MODES_FERRY_DEFAULT === 'true'
    },
    citybike: {
      availableForSelection: MODES_CITY_BYKE_AVAILABLE_SELECTION === 'true',
      defaultValue: MODES_CITY_BYKE_DEFAULT === 'true'
    }
  },
  hideWeatherLabel: HIDE_WEATHER_LABEL === 'true',
  alwaysShowDistanceInKm: ALWAYS_SHOW_DISTANCE_IN_KM === 'true',

  areaPolygon: [
    [minLon, minLat],
    [minLon, maxLat],
    [maxLon, maxLat],
    [maxLon, minLat],
    [minLon, minLat]
  ],

  menu: {
    copyright: { label: `© APD ${YEAR}` },
    content: [
      {
        name: 'about-this-service',
        route: '/about'
      },
      {
        name: 'accessibility-statement',
        href: 'https://kauppa.waltti.fi/media/authority/154/files/Saavutettavuusseloste_Waltti-reittiopas_JyQfJhC.htm'
      }
    ]
  },

  allowLogin: ALLOW_LOGIN === 'true',
  /* depends on https://github.com/HSLdevcom/fav-service */
  hostnames: HOST_NAMES?.split(','),

  defaultEndpoint: {
    address: 'Porto - Portugal',
    lat: 41.1533658,
    lon: -8.6046909
  },
  defaultMapZoom: 16,

  useRealtimeTravellerCapacities: USE_REALTIME_TRAVELLER_CAPACITIES === 'true',

  privacyPolicyLink: PRIVACY_POLICY,
  cookiesPolicyLink: COOKIES_POLICY,
  culturalAgendaLink: CULTURAL_AGENDA,

  cards: {
    events: {
      pt: 'Desde exposições de arte emocionantes até concertos ao ar livre, mergulhe na vida cultural vibrante enquanto explora cada canto da cidade. Para ver mais eventos visite a página da *link*Agenda Cultural do Porto*link*.',
      en: 'From exciting art exhibitions to open-air concerts, immerse yourself in the vibrant cultural life as you explore every corner of the city. For more events, visit the *link*Porto Cultural Agenda*link* page.'
    }
  },

  cookiesDescription: {
    pt: 'A Explore.Porto recolhe e armazena informações através de cookies para melhorar a sua experiência. Ao clicar em aceitar, concorda com o uso de cookies. Saiba mais na nossa *link*Política de Privacidade*link*.',
    en: 'Explore.Porto collects and stores information through cookies to improve your experience. By clicking accept, you agree to the use of cookies. Find out more in our *link*Privacy Policy*link*.'
  },

  themeMap: {
    porto: 'porto',
    amporto: 'amporto'
  },

  geoJson: {
    layers: []
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
        'https://virtualmonitor.services.dev.portodigital.pt/'
    }
  },
  mainMenu: {
    stopMonitor: {
      show: true,
      url: 'https://virtualmonitor.services.dev.portodigital.pt/createview'
    }
  },

  zones: {
    stops: true,
    itinerary: true
  },

  // Notice! Turning on this setting forces the search for car routes (for the CO2 comparison only).
  showCO2InItinerarySummary: SHOW_CO2_IN_ITINERARY_SUMMARY === 'true',

  availableTickets: null,

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
    },
    page3: {
      heading: {
        en: 'No ideas on what to **visit**?',
        pt: 'Sem ideias do que **visitar**?'
      },
      paragraph: {
        en: 'We have prepared themed routes based on your preferences: historical tours, parks and gardens, and much more.',
        pt: 'Preparámos roteiros temáticos de acordo com as suas preferências: roteiros históricos, parques e jardins e muito mais.'
      }
    },
    page4: {
      heading: {
        en: "Discover the essence of Porto in the city's **different** **blocks**",
        pt: 'Conheça a essência Portuense nos diferentes **quarteirões** **da** **cidade**'
      },
      paragraph: {
        en: 'Discover what the city of Porto has to offer beyond the historic center.',
        pt: 'Descubra o que a cidade do Porto tem para oferecer fora do centro histórico.'
      }
    },
    page5: {
      heading: {
        en: 'Stay up to date with all **cultural** **events**',
        pt: 'Fique por dentro de todos os **eventos** **culturais**'
      },
      paragraph: {
        en: 'Every day, the city of Porto has event suggestions for you.',
        pt: 'Todos os dias a cidade do Porto tem sugestões de eventos para si.'
      }
    }
  },
  filters: {
    stop: {
      bus: { pt: 'Autocarro', en: 'Bus' },
      tram: { pt: 'Elétrico', en: 'Tram' },
      subway: { pt: 'Metro', en: 'Subway' },
      rail: { pt: 'Comboio', en: 'Rail' },
      citybike: { pt: 'Bicicletas', en: 'Citybikes' }
    },
    pois: {
      fadoHouse: {
        pt: 'Casas de Fado',
        en: 'Fado Houses'
      },
      wineCellarsAndFarms: {
        pt: 'Caves de Vinhos e Quintas',
        en: 'Wine Cellars and Farms'
      },
      exhibitionCentersAndArtGalleries: {
        pt: 'Centros de exposições & Galerias de arte',
        en: 'Exhibition Centers & Art Galleries'
      },
      statuesSculpturesAndFountains: {
        pt: 'Estátuas, Esculturas e Fontes',
        en: 'Statues, Sculptures and Fountains'
      },
      marinasAndPorts: {
        pt: 'Marinas e Portos',
        en: 'Marinas and Ports'
      },
      viewpoints: {
        pt: 'Miradouros',
        en: 'Viewpoints'
      },
      monuments: {
        pt: 'Monumentos',
        en: 'Monuments'
      },
      museumsAndThematicCenters: {
        pt: 'Museus e Centros Temáticos',
        en: 'Museums and Thematic Centers'
      },
      parksAndGardens: {
        pt: 'Parques e Jardins',
        en: 'Parks and Gardens'
      },
      bridges: {
        pt: 'Pontes',
        en: 'Bridges'
      },
      tourismOffices: {
        pt: 'Postos de Turismo',
        en: 'Tourism Offices'
      },
      streetsAndSquares: {
        pt: 'Ruas e Praças',
        en: 'Streets and Squares'
      },
      concertHalls: {
        pt: 'Salas de Concerto',
        en: 'Concert Halls'
      },
      theaters: {
        pt: 'Teatros',
        en: 'Theaters'
      },
      religiousTemples: {
        pt: 'Templos Religiosos',
        en: 'Religious Temples'
      }
    },
    events: {
      cultural: { pt: 'Cultural', en: 'Cultural' }, // TODO: temporary, will be removed
      outdoor: { pt: 'Ar%20livre', en: 'Outdoor' },
      class: { pt: 'Aula', en: 'Class' },
      song: { pt: 'Canção', en: 'Song' },
      cinema: { pt: 'Cinema', en: 'Cinema' },
      circus: { pt: 'Circo', en: 'Circus' },
      comedy: { pt: 'Comédia', en: 'Comedy' },
      concert: { pt: 'Concerto', en: 'Concert' },
      conversation: { pt: 'Conversa', en: 'Conversation' },
      dance: { pt: 'Dança', en: 'Dance' },
      listening: { pt: 'Escuta', en: 'Listening' },
      show: { pt: 'Espetáculo', en: 'Show' },
      exhibition: { pt: 'Exposição', en: 'Exhibition' },
      fair: { pt: 'Feira', en: 'Fair' },
      party: { pt: 'Festa', en: 'Party' },
      film: { pt: 'Filme', en: 'Film' },
      installation: { pt: 'Instalação', en: 'Installation' },
      reading: { pt: 'Leitura', en: 'Reading' },
      workshop: { pt: 'Oficina', en: 'Workshop' },
      opera: { pt: 'Ópera', en: 'Opera' },
      lecture: { pt: 'Palestra', en: 'Lecture' },
      performance: { pt: 'Performance', en: 'Performance' },
      tests: { pt: 'Provas', en: 'Tests' },
      theater: { pt: 'Teatro', en: 'Theater' },
      visit: { pt: 'Visita', en: 'Visit' }
    }
  },
  ngsi: {
    dataProvider: {
      pois: 'http:%2F%2Fcitysdk.url.pt%2Fpois%2F,https:%2F%2Fcity-api.wearebitmaker.com%2FCitySDK%2Fpois',
      events: ''
    }
  },
  coordinatesBounds: {
    minLat,
    maxLat,
    minLon,
    maxLon
  },
  weatherApi: WEATHER_API,
  weatherCityCode: WEATHER_CITY_CODE,
  weather: {
    cities: {
      1131200: { pt: 'Porto', en: 'Porto' }
    },
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
  }
};
