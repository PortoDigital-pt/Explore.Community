import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { locationShape } from '../../../../util/shapes';
import Skeleton from '../../../../component/amporto/skeleton';
import Card from '../../../../component/amporto/card';
import { usePoisList } from './usePoisList';
// TODO: extract resusable code

const PoisSection = ({ location }, { intl }) => {
  const { pois, error } = usePoisList();

  // TODO: in case of error, show a message.

  return (
    <div className="section">
      <h3 className="title">{intl.messages['place-to-visit']}</h3>
      <div className="list">
        {pois?.map((_, i) => <Card key={i} className="small" />) ??
          Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={`${i}-item`} className="small" />
          ))}
      </div>
      <button
        className="show-all"
        type="button"
        aria-label={intl.messages['find-all-interest']}
      >
        {intl.messages['find-all-interest']}
      </button>
    </div>
  );
};

PoisSection.contextTypes = {
  intl: intlShape.isRequired
};

PoisSection.propTypes = {
  location: locationShape.isRequired
};

export default connectToStores(
  PoisSection,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState()
  })
);
