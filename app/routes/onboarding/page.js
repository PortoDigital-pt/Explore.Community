/* eslint-disable react/no-array-index-key */
import React from 'react';
import { func, string } from 'prop-types';
import useRouter from 'found/useRouter';
import { FormattedMessage } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { configShape } from '../../util/shapes';
import { setOnboarded } from '../../action/userPreferencesActions';

// TODO: onboarding

const OnboardingPage = ({ currentLanguage, firstAccess }, { config, executeAction }) => {
  const { match: { location }, router } = useRouter();
  
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
          <div className="call-to-action-button" onClick={() => { 
              executeAction(setOnboarded, true);

              // execute navigation in the next event loop tick - allowing time to process the store update.
              // this ensures onboarded store state updates before the Main component reads it on the next page.
              setTimeout(() => {
                router.push(firstAccess === location.pathname ? '/' : firstAccess);
              }, 10);
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

OnboardingPage.propTypes = {
  currentLanguage: string.isRequired,
  firstAccess: string.isRequired
};

OnboardingPage.contextTypes = {
  executeAction: func.isRequired,
  config: configShape.isRequired
};

const connectedComponent = connectToStores(
  OnboardingPage,
  ['PreferencesStore'],
  context => ({
    currentLanguage: context.getStore('PreferencesStore').getLanguage(),
    firstAccess: context.getStore('PreferencesStore').getFirstAccess()
  })
);

export { connectedComponent as default, OnboardingPage as Component };
