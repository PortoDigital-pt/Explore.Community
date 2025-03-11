import React, { useEffect } from 'react';
import { string } from 'prop-types';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import { useSelectedEvent } from './useSelectedEvent';

const Page = ({ language, breakpoint }, { match, router }) => {
  const { selectedEvent, error } = useSelectedEvent({ id: match.params.id });

  useEffect(() => {
    if (error) {
      // force 404 page
      router.push('/explore/events');
    }
  }, [error, router.push]);

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
  match: matchShape.isRequired,
  router: routerShape.isRequired,
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
