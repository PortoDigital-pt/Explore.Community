export const getPrice = ({ eventPriceFrom, eventPriceTo }) => {
  if (!eventPriceFrom || !eventPriceTo) {
    return null;
  }

  if (eventPriceFrom === '0' && eventPriceTo === '0') {
    return '0';
  }

  if (eventPriceFrom === eventPriceTo) {
    return `${eventPriceTo} €`;
  }

  return `${eventPriceFrom} - ${eventPriceTo} €`;
};
