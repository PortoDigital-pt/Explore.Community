import { getOngoingTrip, setOngoingTrip } from '../../store/sessionStorage';

export const IsThereAnOngoingTrip = destinationAddress => {
  const ongoingTrip = getOngoingTrip();

  if (ongoingTrip?.route?.pois?.length) {
    return ongoingTrip?.route?.pois?.some(
      poi => poi.name === destinationAddress
    );
  }

  return false;
};

export const shouldCancelOngoingTrip = destinationAddress => {
  const ongoingTrip = getOngoingTrip();

  if (ongoingTrip?.route?.pois?.length) {
    const destination = ongoingTrip?.route?.pois[ongoingTrip?.selectedItem];

    return destination?.name !== destinationAddress;
  }

  return true;
};

export const isItTheLastPoint = (selectedItem, pois) => {
  if (!pois?.length) {
    return false;
  }

  return selectedItem === pois.length - 1;
};

export const setSelectedItemToNextPoint = () => {
  const ongoingTrip = { ...getOngoingTrip() };

  ongoingTrip.selectedItem += 1;
  setOngoingTrip(ongoingTrip);

  return ongoingTrip;
};
