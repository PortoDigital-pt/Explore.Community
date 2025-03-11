import React from 'react';
import { string } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import { useSelectedEvent } from './useSelectedEvent';

const Page = ({ language, breakpoint }, { match }) => {
  const selectedEvent = useSelectedEvent({ id: match.params.id });

  if (!selectedEvent) {
    return <Loading />;
  }

  return (
    <div className="events">
      <span>{JSON.stringify(selectedEvent)}</span>
    </div>
  );
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
