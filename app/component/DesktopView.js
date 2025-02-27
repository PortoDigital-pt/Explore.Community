import PropTypes from 'prop-types';
import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import BackButton from './BackButton';
import ScrollableWrapper from './ScrollableWrapper';
import DesktopNavigation from './amporto/navigation/desktop-navigation';

export default function DesktopView({
  title,
  header,
  map,
  content,
  settingsDrawer,
  scrollable,
  bckBtnVisible,
  bckBtnFallback
}) {
  return (
    <div className="desktop">
      <div className="main-content" role="main">
        <DesktopNavigation />
        {bckBtnVisible && (
              <BackButton
                title={title}
                fallback={bckBtnFallback}
              />
        )}
         {header}
        <ScrollableWrapper scrollable={scrollable}>
          <ErrorBoundary>{content}</ErrorBoundary>
        </ScrollableWrapper>
      </div>
      <div className="map-content">
        {settingsDrawer}
        {map && <ErrorBoundary>{map}</ErrorBoundary>}
      </div>
    </div>
  );
}

DesktopView.propTypes = {
  title: PropTypes.node,
  header: PropTypes.node,
  map: PropTypes.node,
  content: PropTypes.node,
  settingsDrawer: PropTypes.node,
  scrollable: PropTypes.bool,
  bckBtnVisible: PropTypes.bool,
  bckBtnFallback: PropTypes.string
};

DesktopView.defaultProps = {
  title: undefined,
  header: undefined,
  map: undefined,
  content: undefined,
  settingsDrawer: undefined,
  scrollable: false,
  bckBtnVisible: true,
  bckBtnFallback: undefined
};
