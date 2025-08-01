import React, { lazy, Suspense, useEffect, useState, useMemo } from 'react';
import { bool, string } from 'prop-types';
import { intlShape } from 'react-intl';
import { connectToStores } from 'fluxible-addons-react';
import cx from 'classnames';
import { locationShape, configShape } from '../../../util/shapes';
import { getWeatherIconId, getWeatherInfoFromResponse } from './util';
import Icon from '../../Icon';
import useModal from '../../../hooks/useModal';
import useListData from '../../../hooks/useListData';
import { getWeather } from '../../../util/amporto/api';

const CustomModal = lazy(() => import('@hsl-fi/modal'));

const Weather = ({ lang, floating, location }, { config, intl }) => {
  const { isOpen, open, close } = useModal();
  const [weatherInfo, setWeatherInfo] = useState(null);
  const { weatherCityCode } = config;

  const args = useMemo(() => ({ limit: 1 }), []);

  const { data } = useListData({
    location,
    coordinatesBounds: config.coordinatesBounds,
    getData: getWeather,
    args
  });

  useEffect(() => {
    if (data) {
      setWeatherInfo(getWeatherInfoFromResponse(weatherCityCode, data));
    }
  }, [data]);

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
          <span className="max-temperature">{weatherInfo.temperature}°</span>
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

                  <span className="temperature">
                    {weatherInfo.temperature}°
                  </span>
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
  floating: bool,
  location: locationShape.isRequired,
};

export default connectToStores(
  Weather,
  ['PreferencesStore', 'PositionStore'],
  context => ({
    lang: context.getStore('PreferencesStore').getLanguage(),
    location: context.getStore('PositionStore').getLocationState()
  })
);
