import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import { configShape } from '../../util/shapes';

import RightOffcanvasToggle from './RightOffcanvasToggle';
import DatetimepickerContainer from '../DatetimepickerContainer';

class SearchSettings extends React.Component {
  static propTypes = {
    toggleSettings: PropTypes.func.isRequired,
    color: PropTypes.string
  };
  /* eslint-enable react/no-unused-prop-types */

  static contextTypes = {
    config: configShape.isRequired
  };

  state = {};

  render() {
    const { toggleSettings, color } = this.props;

    return (
      <div className={cx(['searchsettings-container'])}>
        <div className="datetimepicker-container">
          <DatetimepickerContainer
            realtime={false}
            embedWhenClosed={
              !this.context.config.hideItinerarySettings && (
                <div className="open-advanced-settings">
                  <RightOffcanvasToggle
                    onToggleClick={toggleSettings}
                    color={color}
                  />
                </div>
              )
            }
            embedWhenOpen={
              <div className="open-embed-container">
                <div className="open-advanced-settings open-embed">
                  {!this.context.config.hideItinerarySettings && (
                    <RightOffcanvasToggle
                      onToggleClick={toggleSettings}
                      color={color}
                    />
                  )}
                </div>
              </div>
            }
            color={this.context.config.colors.primary}
            iconColor={color}
          />
        </div>
      </div>
    );
  }
}

export default SearchSettings;
