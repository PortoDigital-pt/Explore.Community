import { routesToDto } from '../dto';

const ROUTES_MOCK = [
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:bonfim-e-zona-oriental-2',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary']
      },
      metadata: {}
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {}
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Um roteiro na zona oriental da cidade que combina locais emblemáticos variados, do desporto à cultura e espaços verdes.',
        en: ' An itinerary in the eastern part of the city that combines a variety of emblematic places, from sports to culture and green spaces.'
      },
      metadata: {}
    },
    difficulty: {
      type: 'Text',
      value: 'easy',
      metadata: {}
    },
    distance: {
      type: 'Text',
      value: '650m',
      metadata: {}
    },
    duration: {
      type: 'Text',
      value: 'PT3H',
      metadata: {}
    },
    extraImages: {
      type: 'StructuredValue',
      value: [
        'https://assets.portodigital.pt/ropi/files/7a39f14d-701b-43df-9ef0-59dc8f16fb03.jpg',
        'https://assets.portodigital.pt/ropi/files/8c95db3d-6558-4617-aa37-fa14b9cf2510.jpg',
        'https://assets.portodigital.pt/ropi/files/1a64e6da-d689-4749-b359-c5988e86e4e1.jpg',
        'https://assets.portodigital.pt/ropi/files/8c2b3632-bde5-426c-8bbf-d0e1716e8910.jpg',
        'https://assets.portodigital.pt/ropi/files/be5b575d-a355-4e20-86ea-2d63d74d235b.jpg'
      ],
      metadata: {}
    },
    image: {
      type: 'Text',
      value:
        'https://assets.portodigital.pt/ropi/files/7a39f14d-701b-43df-9ef0-59dc8f16fb03.jpg',
      metadata: {}
    },
    itinerary: {
      type: 'StructuredValue',
      value: {
        itemListOrder: 'ItemListOrdered',
        itemListElement: [
          {
            type: 'ListItem',
            position: 1,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b55f979e000013060ee',
            name: 'Museu do Porto',
            description_lang: {
              type: 'StructuredValue',
              value: {
                pt: 'Visita%20ao%20Museu%20FC%20Porto%20e%20Est%C3%A1dio%20do%20Drag%C3%A3o%20com%20APP%20e%20exposi%C3%A7%C3%A3o%20digital.',
                en: 'Visit%20to%20the%20FC%20Porto%20Museum%20and%20Est%C3%A1dio%20do%20Drag%C3%A3o%20with%20APP%20and%20digital%20exhibition.'
              }
            },
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.58273213, 41.16078345]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5fec93079296f50001817de0',
            name: 'Casa São Roque',
            description_lang: {
              type: 'StructuredValue',
              value: {
                pt: 'Casa%20S%C3%A3o%20Roque%3A%20arte%20contempor%C3%A2nea%2C%20arquitetura%20%C3%BAnica%20e%20jardim%20aberto%20todo%20o%20ano',
                en: 'Casa%20S%C3%A3o%20Roque%3A%20contemporary%20art%2C%20unique%20architecture%20and%20garden%20open%20all%20year%20round.'
              }
            },
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.5868984, 41.15770441]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b45f979e000018e5ac1',
            name: 'Parque de São Roque',
            description_lang: {
              type: 'StructuredValue',
              value: {
                pt: 'Parque%20S%C3%A3o%20Roque%3A%20jardins%20rom%C3%A2nticos%2C%20esculturas%20e%20labirinto%2C%20aberto%20todo%20o%20ano',
                en: 'Parque%20S%C3%A3o%20Roque%3A%20romantic%20gardens%2C%20sculptures%20and%20labyrinth%2C%20open%20all%20year%20round'
              }
            },
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.588905, 41.158657]
              },
              metadata: {}
            }
          }
        ]
      },
      metadata: {}
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {}
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.58273213, 41.16078345]
      },
      metadata: {}
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Bonfim e Zona Oriental 2',
        en: 'Bonfim and Oriental Zone 2'
      },
      metadata: {}
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T15:44:23.884Z',
      metadata: {}
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-19T16:09:13.345Z',
      metadata: {}
    }
  },
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:quarteirao-das-artes-miguel-bombarda',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary']
      },
      metadata: {}
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {}
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Uma rua inteira dedicada à expressão artística, ideal para os amantes de arte!',
        en: 'A whole street dedicated to artistic expression, ideal for art lovers!'
      },
      metadata: {}
    },
    difficulty: {
      type: 'Text',
      value: 'easy',
      metadata: {}
    },
    distance: {
      type: 'Text',
      value: '800m',
      metadata: {}
    },
    duration: {
      type: 'Text',
      value: 'PT1H30M',
      metadata: {}
    },
    extraImages: {
      type: 'StructuredValue',
      value: [
        'https://assets.visitporto.travel/pois/2076_1.jpg',
        'https://assets.visitporto.travel/pois/2076_2.jpg',
        'https://assets.visitporto.travel/pois/937_1.jpg',
        'https://assets.portodigital.pt/ropi/files/cf6af33f-99e5-4693-9ac1-16de7bec69a8.jpg',
        'https://assets.visitporto.travel/pois/1045_1.jpg',
        'https://assets.portodigital.pt/ropi/files/685f2aee-4fea-4aae-ab57-325a50589bcc.jpg',
        'http://assets.visitporto.travel/pois/1309_3.jpg',
        'https://assets.portodigital.pt/ropi/files/a6011ebe-4997-44df-b6ab-578f2c1c59df.jpg'
      ],
      metadata: {}
    },
    image: {
      type: 'Text',
      value: 'https://assets.visitporto.travel/pois/2076_1.jpg',
      metadata: {}
    },
    itinerary: {
      type: 'StructuredValue',
      value: {
        itemListOrder: 'ItemListOrdered',
        itemListElement: [
          {
            type: 'ListItem',
            position: 1,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b50f979e0000196becc',
            name: 'Rua de Miguel Bombarda',
            description:
              'Rua%20Miguel%20Bombarda,%20epicentro%20de%20arte,%20moda%20e%20design%20no%20Porto.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.622465, 41.149367]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b52f979e000011cf7c6',
            name: 'Ó! Galeria',
            description:
              'Projeto%20de%20venda%20de%20ilustra%C3%A7%C3%B5es%20e%20arte%20de%20autores%20diversos%20no%20Porto.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.617647349, 41.150044031]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5ff898b49296f500017cf9cb',
            name: 'Dom Quixote e Sancho Panca',
            description:
              'Mural%20Dom%20Quixote%20de%202013,%20primeiro%20legal%20no%20Porto,%20com%20arte%20urbana%20moderna.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.61778538, 41.14994173]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 4,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4af979e000013ddcb6',
            name: 'Galeria Trindade',
            description:
              'Galeria%20de%20Miguel%20Bombarda%20com%20exposi%C3%A7%C3%B5es%20e%20acervo%20em%20dois%20andares.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.6194843, 41.1498443]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 5,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b48f979e000016c5612',
            name: 'Ap arte Galeria',
            description:
              'Galeria%20de%202010%20que%20promove%20jovens%20artistas%20e%20consagrados%20no%20Porto.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.61959976, 41.14978327]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 6,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b58f979e000015dbe1c',
            name: 'Paula Quintã Gallery',
            description:
              'Galeria%2C%20restauro%20e%20design%20contempor%C3%A2neo%20com%20pe%C3%A7as%20%C3%BAnicas%20e%20exposi%C3%A7%C3%B5es.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.620279, 41.1496424]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 7,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4bf979e0000193908e',
            name: 'Galeria Usar o Tempo',
            description:
              'Galeria%20de%20arte%20em%20Miguel%20Bombarda%2C%20Porto.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.6220523, 41.1494712]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 8,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b47f979e00001c8342f',
            name: 'Serpente Contemporânea',
            description:
              'Galeria%20com%20exposi%C3%A7%C3%B5es%20de%20arte%20contempor%C3%A2nea%2C%20instala%C3%A7%C3%A3o%2C%20foto%20e%20escultura.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.62244368, 41.14947997]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 9,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4af979e000013ddcae',
            name: 'Galeria Fernando Santos',
            description:
              'Primeira%20galeria%20em%20Miguel%20Bombarda%2C%20promove%20arte%20contempor%C3%A2nea%20em%20Portugal%20e%20fora.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.622723, 41.149512]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 10,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4bf979e0000193908d',
            name: 'Galeria Presença',
            description:
              'Galeria%20Presen%C3%A7a%20divulga%20arte%20portuguesa%20e%20internacional%20com%20artistas%20emergentes.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.623711039, 41.149306752]
              },
              metadata: {}
            }
          },
          {
            type: 'ListItem',
            position: 11,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4bf979e0000193908c',
            name: 'Galeria Quadrado Azul',
            description:
              'Galeria%20que%20representa%20artistas%20portugueses%20e%20estrangeiros%2C%20jovens%20e%20consagrados.',
            location: {
              type: 'geo:json',
              value: {
                type: 'Point',
                coordinates: [-8.6240451, 41.149229]
              },
              metadata: {}
            }
          }
        ]
      },
      metadata: {}
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {}
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.622465, 41.149367]
      },
      metadata: {}
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Quarteirão das Artes - Miguel Bombarda',
        en: 'Miguel Bombarda Art Block'
      },
      metadata: {}
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T16:49:15.111Z',
      metadata: {}
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-15T10:17:42.055Z',
      metadata: {}
    }
  }
];

export const getList = async (req, res) => {
  const {
    query: { language }
  } = req;

  return res.status(200).json({
    data: ROUTES_MOCK.map(item => routesToDto(item, language)),
    pagination: null
  });
};

export const getDetail = async (req, res) => {
  const {
    query: { language }
  } = req;
  return res.status(200).json(routesToDto(ROUTES_MOCK[0], language));
};
