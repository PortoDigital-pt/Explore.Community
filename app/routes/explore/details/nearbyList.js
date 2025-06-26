import React from 'react';
import Skeleton from '../../../component/amporto/skeleton';
import Card from '../../../component/amporto/card';

export const NearByList = ({ type, data, cardType, setSelected, open }) => {
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
