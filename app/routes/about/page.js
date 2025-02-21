/* eslint-disable react/no-array-index-key */
import React from 'react';
import { func, string } from 'prop-types';
import useRouter from 'found/useRouter';
import { FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { configShape } from '../../util/shapes';
import { setOnboarded } from '../../action/userPreferencesActions';

// TODO: review this

const AboutPage = ({ currentLanguage }, { config, executeAction }) => {
  const { router } = useRouter();
  return (
    <div className="about-page fullscreen">
      <div className="page-frame fullscreen momentum-scroll">
        {config.aboutThisService[currentLanguage].map((section, i) =>
          (section.paragraphs && section.paragraphs.length) || section.link ? (
            <div key={`about-section-${i}`}>
              <h1 className="about-header">{section.header}</h1>
              {section.paragraphs &&
                section.paragraphs.map((p, j) => (
                  <p
                    key={`about-section-${i}-p-${j}`}
                    // eslint-disable-next-line
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              {section.link && (
                <a href={section.link} target="_blank" rel="noreferrer">
                  <FormattedMessage
                    id="journey-planner-manual"
                    defaultMessage="Journey planner manual"
                  />
                </a>
              )}
            </div>
          ) : (
            false
          )
        )}
          <div className="call-to-action-button" onClick={()=> {
            executeAction(setOnboarded, true);
            router.push('/');
          }}>
            <FormattedMessage
              id="back-to-front-page"
              defaultMessage="Back to front page"
            />
          </div>
      
      </div>
    </div>
  );
};

AboutPage.propTypes = {
  currentLanguage: string.isRequired
};

AboutPage.contextTypes = {
  executeAction: func.isRequired,
  config: configShape.isRequired
};

const connectedComponent = connectToStores(
  AboutPage,
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage()
  })
);

export { connectedComponent as default, AboutPage as Component };
