import React, { useState, useMemo } from 'react';
import { shape, string } from 'prop-types';
import SwipeableTabs from '../../component/SwipeableTabs';

const parseBoldText = text => {
  if (!/\*\*(\w+)\*\*/.test(text)) {
    return text;
  }

  const parts = text.split(/(\*\*.*?\*\*)/);

  return parts.map(part => {
    const isBold = part.match(/\*\*(.*?)\*\*/);

    return isBold ? <strong key={isBold[1]}>{isBold[1]}</strong> : part;
  });
};

export const Content = ({ pages, currentLanguage }) => {
  const [page, setPage] = useState(0);

  const tabs = useMemo(
    () =>
      Object.entries(pages).map(([key, { heading, paragraph }]) => (
        <div className="tab" key={key}>
          <h2>{parseBoldText(heading[currentLanguage])}</h2>
          {paragraph && <p>{parseBoldText(paragraph[currentLanguage])}</p>}
        </div>
      )),
    [currentLanguage]
  );

  return (
    <div className="content">
      <SwipeableTabs
        tabs={tabs}
        tabIndex={page}
        onSwipe={page => setPage(page)}
        classname="swipe-desktop-view"
        hideArrows
        navigationOnBottom
        ariaFrom="swipe-onboarding"
        ariaFromHeader="swipe-onboarding"
      />
    </div>
  );
};

Content.propTypes = {
  pages: shape.isRequired,
  currentLanguage: string.isRequired
};
