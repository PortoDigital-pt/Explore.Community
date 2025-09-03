import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'found';
import { stopShape, configShape } from '../../util/shapes';
import AddressRow from '../AddressRow';
import ZoneIcon from '../ZoneIcon';
import PlatformNumber from '../PlatformNumber';
import FavouriteStopContainer from '../FavouriteStopContainer';
import { getZoneLabel } from '../../util/legUtils';
import Icon from '../../component/Icon';

const StopNearYouHeader = (
  { stop, desc, isStation, linkAddress },
  { config }
) => {
  return (
    <div className="stop-near-you-header-container">
      <Icon
        img={isStation ? 'icon-icon_subway_with_background' : 'icon-icon_bus_with_background'}
        viewBox="0 0 50 50"
      />
      <div className="stop-header-content">
        <Link
          onClick={e => {
            e.stopPropagation();
          }}
          to={linkAddress}
        >
          <h2 className="stop-near-you-name">
            {stop.name}
            <span className="sr-only">
              <PlatformNumber number={stop.platformCode} short={false} />
            </span>
          </h2>
        </Link>
        <div className="stop-near-you-info">
          <AddressRow desc={desc} code={stop.code} isTerminal={isStation} />
          <PlatformNumber number={stop.platformCode} short />
          {config.zones.stops &&
            config.feedIds.includes(stop.gtfsId.split(':')[0]) && (
              <ZoneIcon
                zoneId={getZoneLabel(stop.zoneId, config)}
                showUnknown={false}
              />
            )}
        </div>
      </div>
    </div>
  );
};

StopNearYouHeader.propTypes = {
  stop: stopShape.isRequired,
  linkAddress: PropTypes.string.isRequired,
  desc: PropTypes.string,
  isStation: PropTypes.bool
};

StopNearYouHeader.defaultProps = {
  isStation: false,
  desc: undefined
};

StopNearYouHeader.contextTypes = {
  config: configShape.isRequired
};

export default StopNearYouHeader;
