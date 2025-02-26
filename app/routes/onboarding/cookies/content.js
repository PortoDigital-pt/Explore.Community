import React from 'react';
import { intlShape } from 'react-intl';
import { func, string } from 'prop-types';
import { configShape } from '../../../util/shapes';
import Icon from '../../../component/Icon';

const parsePolicyLinkText = (text, privacyPolicyLink) => {
  if (!privacyPolicyLink || !/(\*link\*.*?\*link\*)/.test(text)) {
    return text;
  }

  const parts = text.split(/(\*link\*.*?\*link\*)/);

  return parts.map(part => {
    const isLink = part.match(/\*link\*(.*?)\*link\*/);

    return isLink ? (
      <a
        href={privacyPolicyLink}
        target="_blank"
        key={isLink[1]}
        rel="noreferrer"
      >
        {isLink[1]}
      </a>
    ) : (
      part
    );
  });
};

const Content = (
  { language, onClose, onAcceptCookies, onRejectCookies },
  { config: { cookiesDescription, privacyPolicyLink }, intl }
) => (
  <>
    <button
      className="close"
      onClick={() => {
        onRejectCookies();
        onClose();
      }}
      type="button"
      aria-label="close"
    >
      <Icon img="icon-close" viewBox="0 0 33 33" />
    </button>

    <div className="badge">
      <Icon img="icon-badge" viewBox="0 0 32 33" />
      <h5>{intl.messages['cookies-title']}</h5>
    </div>

    <p>
      {parsePolicyLinkText(cookiesDescription[language], privacyPolicyLink)}
    </p>

    <div className="action">
      <button
        className="reject"
        onClick={() => {
          onRejectCookies();
          onClose();
        }}
        type="button"
        aria-label={intl.messages['cookies-reject-aria']}
      >
        {intl.messages['cookies-reject']}
      </button>
      <button
        className="accept"
        onClick={() => {
          onAcceptCookies();
          onClose();
        }}
        type="button"
        aria-label={intl.messages['cookies-accept']}
      >
        {intl.messages['cookies-accept']}
      </button>
    </div>
  </>
);

Content.propTypes = {
  language: string.isRequired,
  onClose: func.isRequired,
  onAcceptCookies: func.isRequired,
  onRejectCookies: func.isRequired
};

Content.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default Content;
