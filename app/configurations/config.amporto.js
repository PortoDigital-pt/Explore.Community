export default {
  URL: {
    FONT: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300..800'
  },

  sprites: 'assets/svg-sprite.amporto.svg',

  colors: {
    primary: '#000F9F',
    iconColors: {
      accesspoints: '#000F9F'
    },
    itineraryDefault: '#000F9F',
    originDestination: {
      icon: {
        color: '#00095F'
      }
    }
  },

  includePublicWithBikePlan: true,
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
      availableForSelection: false,
      defaultValue: false
    },
    citybike: {
      availableForSelection: true,
      defaultValue: false
    }
  },

  defaultEndpoint: {
    address: 'Porto - Portugal',
    lat: 41.14858,
    lon: -8.610945
  },

  cards: {
    events: {
      pt: 'Desde exposições de arte emocionantes até concertos ao ar livre, mergulhe na vida cultural vibrante enquanto explora cada canto da cidade. Para ver mais eventos visite a página da *link*Agenda Cultural do Porto*link*.',
      en: 'From exciting art exhibitions to open-air concerts, immerse yourself in the vibrant cultural life as you explore every corner of the city. For more events, visit the *link*Porto Cultural Agenda*link* page.'
    },
    blocks: {
      pt: 'Explore os quarteirões temáticos da cidade, de arte a gastronomia. Descubra cada esquina cheia de histórias e experiências únicas e cativantes.',
      en: 'Explore the city’s themed blocks, from art to gastronomy. Discover every corner filled with unique and captivating stories and experiences.'
    }
  },

  cookiesDescription: {
    pt: 'A Explore.Porto recolhe e armazena informações através de cookies para melhorar a sua experiência. Ao clicar em aceitar, concorda com o uso de cookies. Saiba mais na nossa *link*Política de Privacidade*link*.',
    en: 'Explore.Porto collects and stores information through cookies to improve your experience. By clicking accept, you agree to the use of cookies. Find out more in our *link*Privacy Policy*link*.'
  },

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
      outdoor: { pt: 'Ao Fresco', en: 'Out and about' },
      artAndExhibition: {
        pt: 'Arte e exposições',
        en: 'Art and exhibitions'
      },
      cinema: { pt: 'Cinema', en: 'Film' },
      talks: { pt: 'Conversas', en: 'Talks' },
      sports: { pt: 'Desporto e movimento', en: 'Sports and motion' },
      families: { pt: 'Famílias', en: 'Families' },
      musicAndClubbing: {
        pt: 'Música e clubbing',
        en: 'Music and clubbing'
      },
      stages: { pt: 'Palcos', en: 'Stage' }
    },
    routes: {
      itinerary: { pt: 'Roteiro', en: 'Itinerary' }
    },
    blocks: {
      cultural: { pt: 'Cultural', en: 'Cultural' }
    }
  },

  ngsi: {
    dataProvider: {
      pois: 'http:%2F%2Fcitysdk.url.pt%2Fpois%2F,https:%2F%2Fcity-api.wearebitmaker.com%2FCitySDK%2Fpois',
      events: 'Agenda%20Porto',
      routes: 'ExplorePorto',
      blocks: 'VisitPorto'
    }
  }
};
