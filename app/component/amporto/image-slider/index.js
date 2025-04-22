import React, { useState, useMemo, useEffect } from 'react';
import { string, arrayOf } from 'prop-types';
import SwipeableTabs from '../../SwipeableTabs';
import withBreakpoint from '../../../util/withBreakpoint';

const ImageSlider = ({ breakpoint, images, name }) => {
  const [page, setPage] = useState(0);
  const [loadedImages, setLoadedImages] = useState(0);

  const tabs = useMemo(
    () =>
      images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${name}-${i + 1}`}
          loading="lazy"
          onLoad={() => images.length > 1 && setLoadedImages(prev => prev + 1)}
        />
      )),
    [images, name]
  );

  useEffect(() => {
    if (loadedImages === images.length) {
      // on first load react swipe does not know the image size
      window.dispatchEvent(new Event('resize'));
    }
  }, [loadedImages, images.length]);

  return tabs.length === 1 ? (
    tabs[0]
  ) : (
    <div className="slider">
      <SwipeableTabs
        tabs={tabs}
        tabIndex={page}
        onSwipe={page => setPage(page)}
        classname="swipe-desktop-view"
        hideArrows={breakpoint !== 'large'}
        navigationOnBottom
        ariaFrom="swipe-pictures"
        ariaFromHeader="swipe-pictures"
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
