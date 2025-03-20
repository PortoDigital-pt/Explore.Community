import React from 'react';
import Accordion from '..';
import Icon from '../../../Icon';

const config = {
  categories: {
    transports: ['Autocarro', 'Eletrico', 'Metro', 'Trem', 'Bicicletas'],
    pois: [
      'Casas de Fado',
      'Caves de Vinhos e Quintas',
      'Centros de exposições & Galerias de arte',
      'Estátuas, Esculturas e Fontes',
      'Marinas e Portos',
      'Miradouros',
      'Monumentos',
      'Museus e Centros Temáticos',
      'Parques e Jardins',
      'Pontes',
      'Postos de Turismo',
      'Ruas e Praças',
      'Salas de Concerto',
      'Teatros',
      'Templos Religiosos'
    ],
    events: [
      'Ar livre',
      'Aula',
      'Canção',
      'Cinema',
      'Circo',
      'Comédia',
      'Concerto',
      'Conversa',
      'Dança',
      'Escuta',
      'Espetáculo',
      'Exposição',
      'Feira',
      'Festa',
      'Filme',
      'Instalação',
      'Leitura',
      'Oficina',
      'Ópera',
      'Palestra',
      'Performance',
      'Provas',
      'Teatro',
      'Visita'
    ]
  }
};

const data = [
  {
    type: 'transports',
    title: 'Transportes',
    icon: 'icon-icon_bus_with_background',
    selected: false,
    categories: config.categories.transports
  },
  {
    type: 'pois',
    title: 'Pontos de interesse',
    icon: 'icon-explore-icon_pois_with_background',
    selected: false,
    categories: config.categories.pois
  },
  {
    type: 'events',
    title: 'Eventos',
    icon: 'icon-explore-icon_events_with_background',
    selected: false,
    categories: config.categories.events
  }
];

function AccordionGroup() {
  const getContentCategories = item => {
    return item.categories.map(category => (
      <div className="category-item" key={category}>
        <span className="name">{category}</span>

        <Icon img="icon-icon_check_new" viewBox="0 0 24 24" />
      </div>
    ));
  };

  const buildAccordion = () => {
    return data.map(it => {
      return (
        <Accordion key={it.type} title={it.title} iconId={it.icon}>
          <div className="accordion-category-list">
            {getContentCategories(it)}
          </div>
        </Accordion>
      );
    });
  };

  return <div className="accordion-group-container">{buildAccordion()}</div>;
}

AccordionGroup.propTypes = {
  // title: string.isRequired,
  // iconId: string.isRequired,
  // children: node.isRequired,
};

export default AccordionGroup;
