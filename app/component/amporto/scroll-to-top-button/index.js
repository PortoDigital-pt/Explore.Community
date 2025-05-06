import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import { intlShape } from 'react-intl';
import withBreakpoint from '../../../util/withBreakpoint';
import useScrollYPosition from '../../../hooks/useScrollYPosition';
import Icon from '../../Icon';

const ScrollToTopButton = ({ breakpoint }, { intl }) => {
  const { scrollY, scrollToTop } = useScrollYPosition(breakpoint);

  return (
    scrollY >= 1000 && (
      <button
        className={classnames('toTop', { largeTop: breakpoint === 'large' })}
        type="button"
        aria-label={intl.messages['scroll-to-top']}
        onClick={scrollToTop}
      >
        <Icon img="icon-icon_arrow-collapse--left_new" viewBox="0 0 24 24" />
      </button>
    )
  );
};

ScrollToTopButton.propTypes = {
  breakpoint: string.isRequired
};

ScrollToTopButton.contextTypes = {
  intl: intlShape.isRequired
};

export default withBreakpoint(ScrollToTopButton);
