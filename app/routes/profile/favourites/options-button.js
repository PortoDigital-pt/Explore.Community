import React, { useMemo } from 'react';
import { func } from 'prop-types';
import { intlShape } from 'react-intl';
import Icon from '../../../component/Icon';
import FloatingMenu from '../../../component/amporto/floating-menu';
import useModal from '../../../hooks/useModal';
import { favouriteShape } from '../../../util/shapes';

const OptionsButton = ({ favourite, onEdit, onDelete, intl }) => {
  const { isOpen, open, close } = useModal();

  const btnLabel = useMemo(() => {
    return intl?.messages[
      favourite ? 'favourites-menu-edit' : 'favourites-menu-add'
    ];
  }, [favourite, intl]);

  const btnDeleteLabel = useMemo(() => {
    return intl?.messages['favourites-menu-delete'];
  }, [intl]);

  return (
    <>
      <button type="button" onClick={open} aria-label="options">
        <Icon img="icon-more-vertical" viewBox="0 0 24 24" />
      </button>
      <FloatingMenu isOpen={isOpen} close={close}>
        <button
          type="button"
          className="floating-menu-item"
          onClick={() => {
            onEdit();
            close();
          }}
          aria-label={btnLabel}
        >
          {btnLabel}
        </button>

        {favourite?.favouriteId && (
          <>
            <div className="divider" />
            <button
              type="button"
              className="floating-menu-item"
              onClick={() => {
                onDelete();
                close();
              }}
              aria-label={btnDeleteLabel}
            >
              {btnDeleteLabel}
            </button>
          </>
        )}
      </FloatingMenu>
    </>
  );
};

OptionsButton.propTypes = {
  favourite: favouriteShape,
  onEdit: func.isRequired,
  onDelete: func.isRequired,
  intl: intlShape.isRequired
};

export default OptionsButton;
