import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { locationShape } from '../../../../util/shapes';
import Skeleton from '../../../../component/amporto/skeleton';

const Places = ({ location }, { intl }) => {
    return ( 
        <div className="places">
            <h3>{intl.messages['place-to-visit']}</h3>
            <div className="list">
                {['1', '2', '3', '4', '5', '6'].map(element => <Skeleton key={element} className="item"/>)}
            </div>
            <button type='button' aria-label={intl.messages['find-all-interest']}>{intl.messages['find-all-interest']}</button>
        </div>
    );  
}

Places.contextTypes = {
    intl: intlShape.isRequired,
  };
  
Places.propTypes = {
    location: locationShape.isRequired,
};

export default connectToStores(
    Places,
    ['PositionStore'],
    ({ getStore }) => ({
      location: getStore('PositionStore').getLocationState()
    })
  );