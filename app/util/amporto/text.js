import React from 'react';

export const parseConfigDescriptionTextWithLink = (text, link) => {
  if (!link || !/(\*link\*.*?\*link\*)/.test(text)) {
    return text;
  }

  const parts = text.split(/(\*link\*.*?\*link\*)/);

  return parts.map(part => {
    const isLink = part.match(/\*link\*(.*?)\*link\*/);

    return isLink ? (
      <a href={link} target="_blank" key={isLink[1]} rel="noreferrer">
        {isLink[1]}
      </a>
    ) : (
      part
    );
  });
};
