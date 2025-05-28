import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon';
import IconMarker from './IconMarker';
import ViaPointPopup from './popups/ViaPointPopup';

export default function LocationMarker({
  position,
  className,
  isLarge,
  type,
  disabled,
  iconText,
  highlight,
  onClick
}) {
  const getValidType = markertype => {
    switch (markertype) {
      case 'from':
        return 'from';
      case 'to':
        return 'to';
      case 'poi':
        return 'poi';
      case 'via':
      default:
        return 'via';
    }
  };

  const getIconName = markertype => {
    switch (markertype) {
      case 'poi':
        return 'icon-circle';
      case 'from':
      case 'via':
      case 'to':
      default:
        return `icon-icon_mapMarker-${markertype || 'via'}-map`;
    }
  };
  const validType = getValidType(type);
  const sideLength = isLarge ? 30 : 24;

  return (
    <IconMarker
      position={position}
      className={cx(validType, className)}
      icon={{
        className: cx(validType, className),
        element: (
          <Icon
            img={getIconName(validType)}
            color={disabled ? '#bbbbbb' : null}
            text={iconText}
            className={cx({
              highlight
            })}
          />
        ),
        iconAnchor: [sideLength / 2, sideLength],
        iconSize: [sideLength, sideLength]
      }}
      zIndexOffset={12000}
      onClick={() => (onClick ? onClick() : null)}
    >
      {validType === 'via' && (
        <ViaPointPopup
          lat={position.lat}
          lon={position.lon}
          key={`${position.lat}${position.lon}`}
        />
      )}
    </IconMarker>
  );
}

LocationMarker.propTypes = {
  position: IconMarker.propTypes.position,
  className: PropTypes.string,
  isLarge: PropTypes.bool,
  type: PropTypes.oneOf(['from', 'via', 'to', 'favourite']),
  disabled: PropTypes.bool,
  iconText: PropTypes.string,
  highlight: PropTypes.bool,
  onClick: PropTypes.func
};

LocationMarker.defaultProps = {
  position: undefined,
  className: undefined,
  isLarge: false,
  type: 'via',
  disabled: false,
  iconText: undefined,
  highlight: false,
  onClick: undefined
};
