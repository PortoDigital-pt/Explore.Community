import React from 'react';
import { intlShape } from 'react-intl';
import { func } from 'prop-types';
import { configShape } from '../../../util/shapes';
import Icon from '../../../component/Icon';

const Content = ({ onClose }, { intl }) => (
  <>
    <button
      className="close"
      onClick={onClose}
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
      A Explore.Porto recolhe e armazena informações através de cookies para
      melhorar a sua experiência. Ao clicar em aceitar, concorda com o uso de
      cookies. Saiba mais na nossa Política de Privacidade.
    </p>

    <div className="action">
      <button
        className="reject"
        onClick={() => {}}
        type="button"
        aria-label={intl.messages['cookies-reject-aria']}
      >
        {intl.messages['cookies-reject']}
      </button>
      <button
        className="accept"
        onClick={() => {}}
        type="button"
        aria-label={intl.messages['cookies-accept']}
      >
        {intl.messages['cookies-accept']}
      </button>
    </div>
  </>
);

Content.propTypes = {
  onClose: func.isRequired
};

Content.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default Content;
