import React, { lazy, Suspense, useEffect, useState } from 'react';
import { bool, string } from 'prop-types';
import { intlShape } from 'react-intl';
import { connectToStores } from 'fluxible-addons-react';
import cx from 'classnames';
import { configShape } from '../../../util/shapes';
import { getJsons } from '../../../util/xhrPromise';
import { getWeatherIconId, getWeatherInfoFromResponse } from './util';
import Icon from '../../Icon';
import useModal from '../../../hooks/useModal';

const CustomModal = lazy(() => import('@hsl-fi/modal'));

const Weather = ({ lang, floating }, { config, intl }) => {
  const { isOpen, open, close } = useModal();
  const [weatherInfo, setWeatherInfo] = useState(null);
  const { weatherApi, weatherCityCode } = config;

  useEffect(() => {
    if (weatherApi && weatherCityCode) {
      const featchWeatherInfo = async () => {
        try {
          const result = await getJsons([
            `${weatherApi}/cities/daily/${weatherCityCode}.json`,
            `${weatherApi}/uv/uv.json`
          ]);

          setWeatherInfo(getWeatherInfoFromResponse(weatherCityCode, result));
        } catch (err) {
          // eslint-disable-next-line no-console
          console.trace('Error retrieving weather info', err);
        }
      };

      featchWeatherInfo();
    }
  }, []);

  return (
    weatherInfo && (
      <>
        <button
          type="button"
          aria-label={intl.messages.weather}
          className={cx('weather-container', { floating })}
          onClick={open}
        >
          <Icon
            img={getWeatherIconId(weatherInfo.idWeatherType)}
            viewBox="0 0 24 24"
          />
          <span className="max-temperature">{weatherInfo.tMax}°</span>
        </button>
        {isOpen && (
          <Suspense fallback="">
            <CustomModal
              appElement="#app"
              isOpen={isOpen}
              className="weather-popup"
              overlayClassName="weather-popup-overlay"
              shouldFocusAfterRender
              shouldCloseOnEsc
            >
              <div className="weather-popup-content">
                <div className="header">
                  {intl.messages['weather-popup-title']}
                </div>

                <div className="temperature-container">
                  <Icon
                    img={getWeatherIconId(weatherInfo.idWeatherType)}
                    viewBox="0 0 24 24"
                  />

                  <span className="temperature">{weatherInfo.tMax}°</span>
                </div>

                <div className="aditional-info-container">
                  <Icon
                    className="icon-uv-radiation"
                    img="icon-weather-sun"
                    viewBox="0 0 24 24"
                  />
                  <span className="radiation-info">
                    {`${intl.messages['weather-uv']}: ${weatherInfo.uv || '-'}`}
                  </span>

                  <Icon
                    className="icon-weather-wind"
                    img="icon-weather-wind"
                    viewBox="0 0 24 24"
                  />
                  <span className="wind-info">
                    {`${
                      config.weather.windDirection[weatherInfo.predWindDir][
                        lang
                      ]
                    }: ${
                      config.weather.wind[weatherInfo.classWindSpeed][lang]
                    }`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={close}
                  aria-label={intl.messages.close}
                >
                  {intl.messages.close}
                </button>
              </div>
            </CustomModal>
          </Suspense>
        )}
      </>
    )
  );
};

Weather.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

Weather.propTypes = {
  lang: string.isRequired,
  floating: bool
};

export default connectToStores(Weather, ['PreferencesStore'], context => ({
  lang: context.getStore('PreferencesStore').getLanguage()
}));
