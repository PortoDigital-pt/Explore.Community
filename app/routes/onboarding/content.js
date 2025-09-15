import React, { useMemo } from 'react';
import {
  objectOf,
  shape,
  string,
  bool,
  func,
  arrayOf,
  number,
  oneOfType
} from 'prop-types';
import SwipeableTabs from '../../component/SwipeableTabs';

const parseBoldText = text => {
  if (!/\*\*(\w+)\*\*/.test(text)) {
    return text;
  }

  const parts = text.split(/(\*\*.*?\*\*)/);

  return parts.map((part, index) => {
    const isBold = part.match(/\*\*(.*?)\*\*/);
    return isBold ? (
      <strong key={`${isBold[1]}-${index}`}>{isBold[1]}</strong>
    ) : (
      part
    );
  });
};

export const Content = ({
  page,
  onSwipe,
  pages,
  currentLanguage,
  onExplore,
  showOnExplore,
  onExploreDescription,
  logos
}) => {
  const tabs = useMemo(
    () =>
      Object.entries(pages).map(([key, { heading, paragraph }]) => (
        <div className="tab" key={key}>
          <h2>{parseBoldText(heading[currentLanguage])}</h2>
          {paragraph && <p>{parseBoldText(paragraph[currentLanguage])}</p>}
        </div>
      )),
    [pages, currentLanguage]
  );

  return (
    <div className="content">
      <SwipeableTabs
        tabs={tabs}
        tabIndex={page}
        onSwipe={onSwipe}
        classname="swipe-desktop-view"
        navigationOnBottom
        ariaFrom="swipe-onboarding"
        ariaFromHeader="swipe-onboarding"
      />

      {showOnExplore && (
        <button
          aria-label={onExploreDescription}
          type="button"
          onClick={onExplore}
        >
          {onExploreDescription}
        </button>
      )}

      {Array.isArray(logos) ? (
        <div className="logos">
          {logos.map(name => (
            <img
              key={name}
              src={`/img/onboarding-logos/${name}.svg`}
              alt={name}
              loading="eager"
            />
          ))}
        </div>
      ) : (
        <div className="logo">
          <img
            key={logos}
            src={`/img/${logos}.svg`}
            alt={logos}
            loading="eager"
          />
        </div>
      )}
    </div>
  );
};

Content.propTypes = {
  page: number.isRequired,
  onSwipe: func.isRequired,
  pages: objectOf(
    shape({
      heading: shape({ pt: string.isRequired, en: string.isRequired })
        .isRequired,
      paragraph: shape({ pt: string.isRequired, en: string.isRequired })
    })
  ).isRequired,
  currentLanguage: string.isRequired,
  onExplore: func.isRequired,
  showOnExplore: bool.isRequired,
  onExploreDescription: string.isRequired,
  logos: oneOfType([string, arrayOf(string)]).isRequired
};
