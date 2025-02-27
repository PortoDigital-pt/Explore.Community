import React, { Fragment } from 'react';
import { string } from 'prop-types';
import BackButton from './BackButton';
import withBreakpoint from '../util/withBreakpoint';

const GenericCardHeader = ({ breakpoint })  => {
  return (
    <Fragment>
      {breakpoint === 'large' && <BackButton />}
    </Fragment>
  );
}

GenericCardHeader.propTypes = {
  breakpoint: string.isRequired,
};

export default withBreakpoint(GenericCardHeader);
