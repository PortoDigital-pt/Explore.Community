import React, { useState, useRef, useMemo } from 'react';
import Icon from '../component/Icon';

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
        {hasMore.current && (
          <button
            type="button"
            className="read-more-button"
            onClick={() => setExpanded(prev => !prev)}
            aria-label={intl.messages[expanded ? 'read-less' : 'read-more']}
          >
            {intl.messages[expanded ? 'read-less' : 'read-more']}
            <Icon
              img={`icon-chevron-${expanded ? 'up' : 'down'}`}
              viewBox="0 0 24 24"
              className="icon-suffix"
            />
          </button>
        )}
      </>
    ),
    [expanded]
  );
};

export default useExpandableDescription;
