import React, { useState, useRef, useMemo } from 'react';

const useExpandableDescription = ({ description, intl }) => {
  const [expanded, setExpanded] = useState(false);
  const firstSentence = useRef(`${description?.split('.')[0].trim()}.`);
  const hasMore = useRef(!!description?.split('.')[1]);

  return useMemo(
    () => () => (
      <>
        <p>
          {!hasMore.current || expanded ? description : firstSentence.current}
        </p>
        {hasMore.current && !expanded && (
          <button
            type="button"
            className="read-more-button"
            onClick={() => setExpanded(prev => !prev)}
          >
            {intl.messages['read-more']}
          </button>
        )}
      </>
    ),
    [expanded]
  );
};

export default useExpandableDescription;
