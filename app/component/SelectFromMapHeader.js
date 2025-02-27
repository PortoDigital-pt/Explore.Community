import React from 'react';
import { string } from 'prop-types';
import { intlShape } from 'react-intl';
import { configShape } from '../util/shapes';
import BackButton from './BackButton';

export default function SelectFromMapHeaderComponent({ titleId }, { intl }) {
  return (
    <div className="select-from-map-nav-container">
      <BackButton
        title={intl.formatMessage({
          id: titleId,
          defaultMessage: 'Select viaPoint'
        })}
      />
    </div>
  );
}

SelectFromMapHeaderComponent.propTypes = {
  titleId: string
};

SelectFromMapHeaderComponent.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};
