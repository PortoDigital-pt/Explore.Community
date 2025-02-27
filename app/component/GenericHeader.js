import React from 'react';
import { string } from 'prop-types';
import BackButton from './BackButton';
import withBreakpoint from '../util/withBreakpoint';

const GenericCardHeader = ({ breakpoint }) => {
  return breakpoint === 'large' && <BackButton />;
};

GenericCardHeader.propTypes = {
  breakpoint: string.isRequired
};

export default withBreakpoint(GenericCardHeader);
