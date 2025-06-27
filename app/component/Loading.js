import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ContainerSpinner from '@hsl-fi/container-spinner';

const defaultMessage = (
  <span className="sr-only" aria-busy="true" aria-live="polite">
    <FormattedMessage id="loading" defaultMessage="Loading" />
  </span>
);

export default function Loading(props) {
  return (
    <ContainerSpinner visible className={props.className}>
      {props?.children || defaultMessage}
    </ContainerSpinner>
  );
}

Loading.displayName = 'Loading';

Loading.propTypes = { children: PropTypes.node };
Loading.propTypes = { className: PropTypes.string };

Loading.defaultProps = { children: undefined, className: '' };
