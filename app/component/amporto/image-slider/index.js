import React, { useState, useMemo } from 'react';
import { string, arrayOf } from 'prop-types';
import SwipeableTabs from '../../SwipeableTabs';
import withBreakpoint from '../../../util/withBreakpoint';

const ImageSlider = ({ breakpoint, images, name }) => {
  const [page, setPage] = useState(0);

  const tabs = useMemo(
    () =>
      images.map((src, i) => (
        <img
          key={`${src}-${i + 1}`}
          src={src}
          alt={`${name}-${i + 1}`}
          loading="lazy"
        />
      )),
    [images, name]
  );

  return (
    <div className="slider">
      <SwipeableTabs
        tabs={tabs}
        tabIndex={page}
        onSwipe={page => setPage(page)}
        classname="swipe-desktop-view"
        hideArrows={breakpoint !== 'large'}
        navigationOnBottom
        ariaFrom="swipe-onboarding"
        ariaFromHeader="swipe-onboarding"
      />
    </div>
  );
};

ImageSlider.propTypes = {
  breakpoint: string.isRequired,
  images: arrayOf(string).isRequired,
  name: string.isRequired
};

export default withBreakpoint(ImageSlider);
