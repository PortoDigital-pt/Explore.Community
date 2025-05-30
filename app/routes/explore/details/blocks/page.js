import React from 'react';
import { intlShape } from 'react-intl';
import classname from 'classnames';
import ImageSlider from '../../../../component/amporto/image-slider';
import { BlockDetails } from './details';
import { blockShape } from './shape';

export const PageContent = ({ selectedData }, { intl }) => {
  return (
    <>
      {selectedData.images && (
        <div className="image">
          <ImageSlider images={selectedData.images} name={selectedData.name} />
        </div>
      )}
      <div
        className={classname('details', {
          lower: selectedData.images === null
        })}
      >
        <BlockDetails selectedData={selectedData} />
        {selectedData.description && (
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <p>{selectedData.description}</p>
          </div>
        )}
      </div>
    </>
  );
};

PageContent.propTypes = {
  selectedData: blockShape.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};
