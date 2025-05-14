import { touristTripToDto } from '../dto';

export const RESPONSE_EXAMPLE = [
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:bonfim-e-zona-oriental-2',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary'],
      },
      metadata: {},
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {},
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Um roteiro na zona oriental da cidade que combina locais emblemáticos variados, do desporto à cultura e espaços verdes.',
        en: ' An itinerary in the eastern part of the city that combines a variety of emblematic places, from sports to culture and green spaces.',
      },
      metadata: {},
    },
    difficulty: {
      type: 'Text',
      value: 'easy',
      metadata: {},
    },
    distance: {
      type: 'Text',
      value: '650m',
      metadata: {},
    },
    duration: {
      type: 'Text',
      value: 'PT3H',
      metadata: {},
    },
    extraImages: {
      type: 'StructuredValue',
      value: [
        'https://assets.portodigital.pt/ropi/files/8c95db3d-6558-4617-aa37-fa14b9cf2510.jpg',
        'https://assets.portodigital.pt/ropi/files/1a64e6da-d689-4749-b359-c5988e86e4e1.jpg',
        'https://assets.portodigital.pt/ropi/files/8c2b3632-bde5-426c-8bbf-d0e1716e8910.jpg',
        'https://assets.portodigital.pt/ropi/files/be5b575d-a355-4e20-86ea-2d63d74d235b.jpg',
      ],
      metadata: {},
    },
    image: {
      type: 'Text',
      value:
        'https://assets.portodigital.pt/ropi/files/7a39f14d-701b-43df-9ef0-59dc8f16fb03.jpg',
      metadata: {},
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
            description:
              'Visita%20ao%20Museu%20FC%20Porto%20e%20Est%C3%A1dio%20do%20Drag%C3%A3o%20com%20APP%20e%20exposi%C3%A7%C3%A3o%20digital',
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5fec93079296f50001817de0',
            name: 'Casa São Roque',
            description:
              'Casa%20S%C3%A3o%20Roque%3A%20arte%20contempor%C3%A2nea%2C%20arquitetura%20%C3%BAnica%20e%20jardim%20aberto%20todo%20o%20ano',
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b45f979e000018e5ac1',
            name: 'Parque de São Roque',
            description:
              'Parque%20S%C3%A3o%20Roque%3A%20jardins%20rom%C3%A2nticos%2C%20esculturas%20e%20labirinto%2C%20aberto%20todo%20o%20ano',
          },
        ],
      },
      metadata: {},
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {},
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.58273213, 41.16078345],
      },
      metadata: {},
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Bonfim e Zona Oriental 2',
        en: 'Bonfim and Oriental Zone 2',
      },
      metadata: {},
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T15:44:23.884Z',
      metadata: {},
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-13T14:05:00.103Z',
      metadata: {},
    },
  },
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:quarteirao-das-artes-miguel-bombarda',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary'],
      },
      metadata: {},
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {},
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Uma rua inteira dedicada à expressão artística, ideal para os amantes de arte!',
        en: 'A whole street dedicated to artistic expression, ideal for art lovers!',
      },
      metadata: {},
    },
    difficulty: {
      type: 'Text',
      value: 'easy',
      metadata: {},
    },
    distance: {
      type: 'Text',
      value: '800m',
      metadata: {},
    },
    duration: {
      type: 'Text',
      value: 'PT1H30M',
      metadata: {},
    },
    image: {
      type: 'Text',
      value: 'https://assets.visitporto.travel/pois/2076_1.jpg',
      metadata: {},
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
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b52f979e000011cf7c6',
            name: 'Ó! Galeria',
            description:
              'Projeto%20de%20venda%20de%20ilustra%C3%A7%C3%B5es%20e%20arte%20de%20autores%20diversos%20no%20Porto.',
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5ff898b49296f500017cf9cb',
            name: 'Dom Quixote e Sancho Panca',
            description:
              'Mural%20Dom%20Quixote%20de%202013,%20primeiro%20legal%20no%20Porto,%20com%20arte%20urbana%20moderna.',
          },
          {
            type: 'ListItem',
            position: 4,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4af979e000013ddcb6',
            name: 'Galeria Trindade',
            description:
              'Galeria%20de%20Miguel%20Bombarda%20com%20exposi%C3%A7%C3%B5es%20e%20acervo%20em%20dois%20andares.',
          },
          {
            type: 'ListItem',
            position: 5,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b48f979e000016c5612',
            name: 'Ap arte Galeria',
            description:
              'Galeria%20de%202010%20que%20promove%20jovens%20artistas%20e%20consagrados%20no%20Porto.',
          },
          {
            type: 'ListItem',
            position: 6,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b58f979e000015dbe1c',
            name: 'Paula Quintã Gallery',
            description:
              'Galeria%2C%20restauro%20e%20design%20contempor%C3%A2neo%20com%20pe%C3%A7as%20%C3%BAnicas%20e%20exposi%C3%A7%C3%B5es.',
          },
          {
            type: 'ListItem',
            position: 7,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4bf979e0000193908e',
            name: 'Galeria Usar o Tempo',
            description:
              'Galeria%20de%20arte%20em%20Miguel%20Bombarda%2C%20Porto.',
          },
          {
            type: 'ListItem',
            position: 8,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b47f979e00001c8342f',
            name: 'Serpente Contemporânea',
            description:
              'Galeria%20com%20exposi%C3%A7%C3%B5es%20de%20arte%20contempor%C3%A2nea%2C%20instala%C3%A7%C3%A3o%2C%20foto%20e%20escultura.',
          },
          {
            type: 'ListItem',
            position: 9,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4af979e000013ddcae',
            name: 'Galeria Fernando Santos',
            description:
              'Primeira%20galeria%20em%20Miguel%20Bombarda%2C%20promove%20arte%20contempor%C3%A2nea%20em%20Portugal%20e%20fora.',
          },
          {
            type: 'ListItem',
            position: 10,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4bf979e0000193908d',
            name: 'Galeria Presença',
            description:
              'Galeria%20Presen%C3%A7a%20divulga%20arte%20portuguesa%20e%20internacional%20com%20artistas%20emergentes.',
          },
          {
            type: 'ListItem',
            position: 11,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4bf979e0000193908c',
            name: 'Galeria Quadrado Azul',
            description:
              'Galeria%20que%20representa%20artistas%20portugueses%20e%20estrangeiros%2C%20jovens%20e%20consagrados.',
          },
        ],
      },
      metadata: {},
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {},
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.622465, 41.149367],
      },
      metadata: {},
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Quarteirão das Artes - Miguel Bombarda',
        en: 'Miguel Bombarda Art Block',
      },
      metadata: {},
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T16:49:15.111Z',
      metadata: {},
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-13T14:05:00.103Z',
      metadata: {},
    },
  },
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:bonfim-e-zona-oriental-3',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary'],
      },
      metadata: {},
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {},
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Jardins para relaxar e locais com vistas de cortar a respiração.',
        en: 'Gardens to relax in and places with breathtaking views.',
      },
      metadata: {},
    },
    difficulty: {
      type: 'Text',
      value: 'hard',
      metadata: {},
    },
    distance: {
      type: 'Text',
      value: '1700m',
      metadata: {},
    },
    duration: {
      type: 'Text',
      value: 'PT1H30M',
      metadata: {},
    },
    image: {
      type: 'Text',
      value:
        'https://assets.portodigital.pt/ropi/files/9a3ce24a-f24e-4084-91df-409e86948b95.jpg',
      metadata: {},
    },
    itinerary: {
      type: 'StructuredValue',
      value: {
        itemListOrder: 'ItemListOrdered',
        itemListElement: [
          {
            type: 'ListItem',
            position: 1,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b49f979e0000169b571',
            name: 'Parque de Nova Sintra',
            description:
              'Parque%20com%20jardins%20densos%2C%20fontes%20hist%C3%B3ricas%20e%20antiga%20quinta%20da%20fam%C3%ADlia%20Reid',
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b46f979e00001234afb',
            name: 'Jardim de São Lázaro',
            description:
              'Jardim%20S.%20L%C3%A1zaro%3A%20rom%C3%A2ntico%2C%20fontes%2C%20magn%C3%B3lias%20e%20perto%20da%20Biblioteca%20Municipal%20do%20Porto',
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4ef979e00001fe47dc',
            name: 'Fontaínhas',
            description:
              'Miradouro%20da%20Ponte%20do%20Infante%20com%20vista%20para%20Gaia%20e%20fogos%20de%20S.%20Jo%C3%A3o',
          },
        ],
      },
      metadata: {},
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {},
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.5907293, 41.1453047],
      },
      metadata: {},
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Bonfim e Zona Oriental 3',
        en: 'Bonfim and Oriental Zone 3',
      },
      metadata: {},
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T15:56:38.801Z',
      metadata: {},
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-13T14:05:00.103Z',
      metadata: {},
    },
  },
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:ribeirinha-e-miragaia',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary'],
      },
      metadata: {},
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {},
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Alguns recantos históricos da cidade por onde vale a pena perder-se.',
        en: 'Some historic corners worth getting lost in.',
      },
      metadata: {},
    },
    difficulty: {
      type: 'Text',
      value: 'hard',
      metadata: {},
    },
    distance: {
      type: 'Text',
      value: '1800m',
      metadata: {},
    },
    duration: {
      type: 'Text',
      value: 'PT3H',
      metadata: {},
    },
    image: {
      type: 'Text',
      value:
        'https://assets.portodigital.pt/ropi/files/63e0c32a-b23a-4e6d-81da-5a8b0a9df01e.jpg',
      metadata: {},
    },
    itinerary: {
      type: 'StructuredValue',
      value: {
        itemListOrder: 'ItemListOrdered',
        itemListElement: [
          {
            type: 'ListItem',
            position: 1,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b47f979e00001c8341b',
            name: 'Museu do carro Elétrico',
            description:
              'Museu%20dos%20el%C3%A9tricos%20hist%C3%B3ricos%20do%20Porto%20na%20antiga%20Central%20de%20Massarelos',
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4af979e000013ddcb8',
            name: 'Kubikgallery',
            description:
              'Kubikgallery%3A%20arte%20contempor%C3%A2nea%20com%20artistas%20emergentes%20e%20consagrados',
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b56f979e000012c5e2f',
            name: 'Mural Coletivo da Restauração',
            description:
              'Projeto%20art%C3%ADstico%20de%20In%C3%AAs%20Arisca%2C%20Pablo%20Cidad%20e%20outros%20criadores',
          },
          {
            type: 'ListItem',
            position: 4,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b55f979e000013060a8',
            name: 'Palácio das Sereias',
            description:
              'Casa%20das%20Sereias%2C%20pal%C3%A1cio%20do%20s%C3%A9c.%20XVIII%20com%20portal%20ladeado%20por%20esculturas%20ex%C3%B3ticas',
          },
          {
            type: 'ListItem',
            position: 5,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b46f979e00001234b34',
            name: 'Bandeirinha da Saúde',
            description:
              'Pir%C3%A2mide%20da%20Sa%C3%BAde%3A%20marco%20de%20quarentena%20contra%20peste%20junto%20%C3%A0%20Casa%20das%20Sereias',
          },
          {
            type: 'ListItem',
            position: 6,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b50f979e0000196beb5',
            name: 'Alfândega do Porto',
            description:
              'Museu%20dos%20Transportes%20na%20Alf%C3%A2ndega%20Nova%20com%20projeto%20de%20Souto%20Moura',
          },
          {
            type: 'ListItem',
            position: 7,
            item: 'urn:ngsi-ld:PointOfInterest:5fff23a89296f50001a64897',
            name: 'Mural Mira',
            description:
              'Mural%20de%20Daniel%20Eime%20retratando%20uma%20idosa%2C%20s%C3%ADmbolo%20da%20popula%C3%A7%C3%A3o%20ribeirinha%20do%20Porto',
          },
          {
            type: 'ListItem',
            position: 8,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4df979e000019f80d6',
            name: 'Escadas do Caminho Novo',
            description:
              'Escadaria%20de%20Miragaia%20com%20vista%20para%20a%20encosta%20de%20Gaia%20e%20muralha%20medieval',
          },
        ],
      },
      metadata: {},
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {},
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.63292961, 41.14765395],
      },
      metadata: {},
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Ribeirinha e Miragaia',
        en: 'Ribeirinha and Miragaia',
      },
      metadata: {},
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T16:07:08.764Z',
      metadata: {},
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-13T14:05:00.103Z',
      metadata: {},
    },
  },
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:cruzeiro-das-seis-pontes-no-douro',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary'],
      },
      metadata: {},
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {},
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Um cruzeiro pelo Rio Douro para admirar as pontes que unem as duas cidades e as suas belas margens.',
        en: ' A cruise on the Douro River to admire the bridges that unite the two cities and their beautiful banks.',
      },
      metadata: {},
    },
    difficulty: {
      type: 'Text',
      value: 'medium',
      metadata: {},
    },
    distance: {
      type: 'Text',
      value: '7000m',
      metadata: {},
    },
    duration: {
      type: 'Text',
      value: 'PT2H30M',
      metadata: {},
    },
    image: {
      type: 'Text',
      value: 'https://assets.visitporto.travel/pois/1181_1.jpg',
      metadata: {},
    },
    itinerary: {
      type: 'StructuredValue',
      value: {
        itemListOrder: 'ItemListOrdered',
        itemListElement: [
          {
            type: 'ListItem',
            position: 1,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b48f979e000016c55e0',
            name: 'Ponte do Freixo',
            description:
              'A%20ponte%20de%201995%20liga%20o%20Est%C3%A1dio%20do%20Drag%C3%A3o%20a%20Gaia%20com%20duas%20vigas%20g%C3%A9meas%20de%20705m.',
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4af979e000013ddcef',
            name: 'Ponte de São João',
            description:
              'Ponte%20ferrovi%C3%A1ria%20de%201991%20com%20recorde%20mundial%20em%20v%C3%A3o%20central%20de%20250m.',
          },
          {
            type: 'ListItem',
            position: 3,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b45f979e000018e5aac',
            name: 'Ponte Maria Pia',
            description:
              'Obra%20de%20Eiffel%20de%201877,%20arco%20biarticulado%20e%20Monumento%20Nacional%20desde%201982.',
          },
          {
            type: 'ListItem',
            position: 4,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b49f979e0000169b549',
            name: 'Ponte do Infante',
            description:
              'Ponte%20de%202003%20com%20arco%20de%20280m,%20ligando%20Fonta%C3%ADnhas%20%C3%A0%20Oliveira%20do%20Douro.',
          },
          {
            type: 'ListItem',
            position: 5,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b46f979e00001234af3',
            name: 'Ponte Luíz I',
            description:
              'Ponte%20D.%20Lu%C3%ADs%20I%20de%201886%20com%20dois%20tabuleiros%20e%20arco%20recorde%20em%20ferro%20forjado.',
          },
          {
            type: 'ListItem',
            position: 6,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b48f979e000016c5606',
            name: 'Ponte da Arrábida',
            description:
              'Arr%C3%A1bida,%20ponte%20de%201963%20com%20v%C3%A3o%20de%20270m,%20recorde%20em%20bet%C3%A3o%20armado.',
          },
        ],
      },
      metadata: {},
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {},
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.581116, 41.144665],
      },
      metadata: {},
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Cruzeiro das 6 Pontes no Douro',
        en: '6 Bridges Douro Cruise',
      },
      metadata: {},
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T16:28:33.905Z',
      metadata: {},
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-13T14:05:00.103Z',
      metadata: {},
    },
  },
  {
    id: 'urn:ngsi-ld:TouristTrip:porto:bonfim-e-zona-oriental-1',
    type: 'TouristTrip',
    category_lang: {
      type: 'StructuredValue',
      value: {
        pt: ['Roteiro'],
        en: ['Itinerary'],
      },
      metadata: {},
    },
    dataProvider: {
      type: 'Text',
      value: 'ExplorePorto',
      metadata: {},
    },
    description_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Um sítio de grande belza e serenidade junto ao Rio Douro, ideal para desfrutar de uma vista panorâmica.',
        en: 'A place of great beauty and serenity next to the Douro River, ideal for enjoying a panoramic view.',
      },
      metadata: {},
    },
    difficulty: {
      type: 'Text',
      value: 'easy',
      metadata: {},
    },
    distance: {
      type: 'Text',
      value: '260m',
      metadata: {},
    },
    duration: {
      type: 'Text',
      value: 'PT55M',
      metadata: {},
    },
    extraImages: {
      type: 'StructuredValue',
      value: [
        'https://assets.visitporto.travel/pois/1858_1.jpg',
        'https://assets.visitporto.travel/pois/1858_8.jpg',
        'https://assets.visitporto.travel/pois/1858_2.jpg',
        'https://assets.visitporto.travel/pois/1664_4.jpg',
        'https://assets.visitporto.travel/pois/1664_5.jpg',
      ],
      metadata: {},
    },
    image: {
      type: 'Text',
      value: 'https://assets.visitporto.travel/pois/1664_1.jpg',
      metadata: {},
    },
    itinerary: {
      type: 'StructuredValue',
      value: {
        itemListOrder: 'ItemListOrdered',
        itemListElement: [
          {
            type: 'ListItem',
            position: 1,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b52f979e000011cf7c4',
            name: 'Palácio do Freixo',
            description:
              'Existem%20vários%20momentos%20deliciosos%20ao%20longo%20da%20sua%20estadia%20no%20Pestana%20Palácio%20do%20Freixo%20e%20pode%20ter%20a%20certeza%20que%20todos%20têm%20um%20toque%20do%20all-day%20dining%20do%20bar%20Nasoni,%20que%20também%20pode%20provar%20no%20bar%20da%20piscina%20e%20das%20iguarias%20que%20pode%20apreciar%20no%20excelente%20restaurante%20Palatium.%20Estes%20três%20espaços%20são%20perfeitos%20para%20o%20receber%20ao%20longo%20do%20dia%20e%20da%20noite.%20Os%20sabores%20encontram%20a%20sua%20essência,%20neste%20espaço%20que%20privilegia%20os%20produtos%20locais%20e%20respeita%20as%20origens.%20Mas%20o%20maior%20luxo%20que%20aqui%20encontra%20é,%20sem%20dúvida,%20o%20serviço%20incrivelmente%20atento%20e%20presente,%20sempre%20pronto%20para%20lhe%20sugerir%20hipóteses%20e%20abrir%20o%20caminho%20para%20novos%20sabores%20e%20experiências.',
          },
          {
            type: 'ListItem',
            position: 2,
            item: 'urn:ngsi-ld:PointOfInterest:5cd04b4df979e000019f80a0',
            name: 'Marina do Freixo',
            description:
              'A%20Marina%20do%20Freixo%20encontra-se%20sob%20a%20gestão%20do%20Sport%20Club%20do%20Porto.%20Possui%20um%20guincho%20até%2010%20toneladas,%20rampa%20de%20acesso%20à%20água,%20lugar%20para%2076%20embarcações%20até%2016m%20de%20comprimento,%20acostagem%20de%20embarcações%20até%20100m,%20balneários%20com%20água%20quente,%20assim%20como%20cafetaria%20e%20restaurante%20abertos%20ao%20público%20e%20apoio%20técnico%20para%20todo%20o%20tipo%20de%20embarcações.',
          },
        ],
      },
      metadata: {},
    },
    language: {
      type: 'Text',
      value: 'en',
      metadata: {},
    },
    location: {
      type: 'geo:json',
      value: {
        type: 'Point',
        coordinates: [-8.5730205, 41.1434381],
      },
      metadata: {},
    },
    name_lang: {
      type: 'StructuredValue',
      value: {
        pt: 'Bonfim e Zona Oriental 1',
        en: 'Bonfim and Oriental Zone 1',
      },
      metadata: {},
    },
    dateCreated: {
      type: 'DateTime',
      value: '2025-04-30T15:35:45.617Z',
      metadata: {},
    },
    dateModified: {
      type: 'DateTime',
      value: '2025-05-13T14:05:00.103Z',
      metadata: {},
    },
  },
];

export const getTouristTrips = (req, res) => {
  const response = RESPONSE_EXAMPLE.map(touristTrip =>
    touristTripToDto(touristTrip)
  );
  res.status(200).json({ data: response });
};
