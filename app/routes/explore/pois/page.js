import React from 'react';
import { string } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import { useSelectedPoi } from './useSelectedPoi';

const Page = ({ language, breakpoint }, { match }) => {
  const selectedPoi = useSelectedPoi({ id: match.params.id, language });

  if (!selectedPoi) {
    return <Loading />;
  }

  return <div className="pois">{JSON.stringify(selectedPoi)}</div>;
};

Page.contextTypes = {
  match: matchShape.isRequired
};

Page.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired
};

export default connectToStores(
  withBreakpoint(Page),
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
