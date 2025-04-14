import React from 'react';
import { string } from 'prop-types';
import withBreakpoint from '../../../util/withBreakpoint';
import useListData from '../../../hooks/useListData';

const ListPage = ({ breakpoint }) => {
  return <div className="list-page">List</div>;
};

ListPage.propTypes = {
  breakpoint: string.isRequired
};

export default withBreakpoint(ListPage);
