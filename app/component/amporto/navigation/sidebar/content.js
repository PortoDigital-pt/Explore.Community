import React from 'react';
import { func } from 'prop-types';
import Icon from '../../../Icon';
import LanguageSelection from '../../../LangSelect';

// TODO: name from config?

const Content = ({ onClose }) => (
  <>
    <>
      <div className="top">
        <h1>Explore.Porto</h1>
        <button onClick={onClose} type='button'>
          <Icon img="icon-close" viewBox="0 0 33 33" />
        </button>
      </div>
      <LanguageSelection />
      <nav>nav items</nav>
    </>
    <footer>footer</footer>
  </>
);

Content.propTypes = {
  onClose: func.isRequired
};

export default Content;
