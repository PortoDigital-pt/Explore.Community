import React from 'react';
import { string, oneOf, shape } from 'prop-types';
import Link from 'found/Link';
import Icon from '../../Icon';
import { configShape } from '../../../util/shapes';

const getName = (language, properties) => {
  const name = properties[`name_${language}`];

  if (language === 'pt' && !name) {
    return `It has no name`;
  }

  if (language === 'en' && !name) {
    return `${properties.name_pt ?? 'Missing PORTUGUESE'}. Missing ENGLISH`;
  }

  return decodeURIComponent(name);
};

const SelectExploreRow = ({ language, type, properties }, { config }) => {
  if (type === 'accesspoints') {
    return null;
  }
  
  return (
    <Link
      className="stop-popup-choose-row"
      to={`/explore/${type}/${properties.id}`}
    >
      <span className="choose-row-left-column" aria-hidden="true">
        <Icon
          viewBox="0 0 44 44"
          img={`icon-explore-icon_${type}_no_map`}
          color={config.colors.iconColors[type]}
        />
      </span>
      <span className="choose-row-center-column">
        <h5 className="choose-row-header">{getName(language, properties)}</h5>
      </span>
      <span className="choose-row-right-column">
        <Icon img="icon-icon_arrow-collapse--right" />
      </span>
    </Link>
  );
};

SelectExploreRow.propTypes = {
  language: string.isRequired,
  type: oneOf(['pois', 'events', 'accesspoints']).isRequired,
  properties: shape().isRequired
};

SelectExploreRow.contextTypes = {
  config: configShape.isRequired
};

export default SelectExploreRow;
