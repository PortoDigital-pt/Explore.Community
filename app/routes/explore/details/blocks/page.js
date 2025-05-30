import React, { useState, useMemo, useCallback } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { string } from 'prop-types';
import { intlShape } from 'react-intl';
import { useRouter } from 'found';
import classname from 'classnames';
import ImageSlider from '../../../../component/amporto/image-slider';
import Card from '../../../../component/amporto/card';
import Skeleton from '../../../../component/amporto/skeleton';
import { blockShape } from './shape';
import useListData from '../../../../hooks/useListData';
import useModal from '../../../../hooks/useModal';
import { getPoiList, getEventList } from '../../../../util/amporto/api';
import { DetailsContentModal } from '../../common';
import { PAGE_CONTENT_TYPE_MAP } from '../page-content-resolver/page-content';
import Icon from '../../../../component/Icon';

const List = ({ type, data, cardType, setSelected, open }) => {
  return data === null
    ? Array.from({ length: 10 }, (_, i) => (
        <Skeleton key={`${i}-item`} className={`${cardType}-card`} />
      ))
    : data.map(item => (
        <Card
          key={item.id}
          className={`${cardType}-card`}
          onClick={() => {
            setSelected(item);
            open();
          }}
          data={item}
          type={type}
        />
      ));
};

const PageContent = ({ selectedData, language }, { intl }) => {
  const { isOpen, open, close } = useModal();
  const [selected, setSelected] = useState(null);
  const { router } = useRouter();

  const poiArgs = useMemo(
    () => ({
      language,
      block: selectedData.name,
      limit: selectedData.pois?.length
    }),
    [language, selectedData]
  );
  const eventArgs = useMemo(
    () => ({
      language,
      block: selectedData.name,
      limit: selectedData.events?.length
    }),
    [language, selectedData]
  );

  const ModalPageContent = useMemo(
    () => PAGE_CONTENT_TYPE_MAP[selected?.type],
    [selected?.type]
  );

  const { data: poiData } = useListData({
    enabled: selectedData.pois?.length > 0,
    getData: getPoiList,
    args: poiArgs
  });

  const { data: eventData } = useListData({
    enabled: selectedData.events?.length > 0,
    getData: getEventList,
    args: eventArgs
  });

  const navigate = useCallback(
    id => router.push(`/${selected?.type}/${id}`),
    [router.push, selected?.type]
  );

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
        <div className="detail-info">
          <div className="pois-and-duration">
            {selectedData.pois?.length > 0 && (
              <div>
                <Icon img="icon-camera" viewBox="0 0 16 16" />
                <p>
                  {selectedData.pois.length} {intl.messages.pois.toLowerCase()}
                </p>
              </div>
            )}
          </div>

          {selectedData.events?.length > 0 && (
            <div>
              <Icon img="icon-events" viewBox="0 0 16 16" />
              <p>
                {selectedData.events.length}{' '}
                {intl.messages['events-blocks'].toLowerCase()}
              </p>
            </div>
          )}
        </div>
        {selectedData.description && (
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <p>{selectedData.description}</p>
          </div>
        )}
      </div>

      {selectedData.pois?.length > 0 && (
        <div className="list">
          <h3>O que visitar</h3>
          <div className="list-scroll">
            <List
              type="pois"
              cardType="small"
              data={poiData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      {selectedData.events?.length > 0 && (
        <div className="list">
          <h3>{`A acontecer no ${selectedData.name}`}</h3>
          <div className="list-scroll">
            <List
              type="events"
              cardType="large"
              data={eventData}
              open={open}
              setSelected={setSelected}
            />
          </div>
        </div>
      )}

      {isOpen && selected !== null && (
        <DetailsContentModal
          isOpen={isOpen}
          data={selected}
          onBackBtnClick={() => {
            setSelected(null);
            close();
          }}
          onSeeOnMap={() => {
            close();
            navigate(selected.id);
          }}
          PageContent={ModalPageContent}
        />
      )}
    </>
  );
};

PageContent.propTypes = {
  selectedData: blockShape.isRequired,
  language: string.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};

export default connectToStores(
  PageContent,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
