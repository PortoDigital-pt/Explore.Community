import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';

const Skeleton = ({ className }) => (
  <div className={classnames('skeleton', className)} />
);

Skeleton.propTypes = {
  className: string
};

export default Skeleton;
