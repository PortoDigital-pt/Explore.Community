import React, { useState, useRef, useMemo } from 'react';

const useExpandableDescription = ({ description, intl }) => {
  const [expanded, setExpanded] = useState(false);
  const firstSentence = useRef(`${description.split('.')[0].trim()}.`);

  return useMemo(
    () => () => (
      <>
        <p>{expanded ? description : firstSentence.current}</p>
        <button
          className="read-more-button"
          onClick={() => setExpanded(prev => !prev)}
        >
          {intl.messages[expanded ? 'read-less' : 'read-more']}
        </button>
      </>
    ),
    [expanded]
  );
};

export default useExpandableDescription;
