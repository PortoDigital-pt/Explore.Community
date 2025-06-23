/* eslint-disable no-console */
import { isBrowser } from '../util/browser';

function handleSecurityError(error, logMessage) {
  if (error.name === 'SecurityError') {
    if (logMessage) {
      console.log(logMessage);
    }
  } else {
    throw error;
  }
}

export const getSessionStorage = (
  runningInBrowser,
  errorHandler = handleSecurityError
) => {
  if (runningInBrowser) {
    try {
      return window.sessionStorage;
    } catch (error) {
      errorHandler(error);
      return null;
    }
  } else {
    return global.sessionStorage;
  }
};

function setItem(key, value) {
  const sessionStorage = getSessionStorage(isBrowser);
  if (sessionStorage) {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      if (error.name === 'QuotaExceededError') {
        // eslint-disable-next-line no-console
        console.log(
          '[sessionStorage]' + // eslint-disable-line no-console
            ' Unable to save state; sessionStorage is not available in Safari private mode'
        );
      } else {
        handleSecurityError(
          error,
          '[sessionStorage]' +
            ' Unable to save state; access to sessionStorage denied by browser settings'
        );
      }
    }
  }
}

function getItem(key) {
  const sessionStorage = getSessionStorage(isBrowser);
  if (sessionStorage) {
    try {
      return sessionStorage.getItem(key);
    } catch (error) {
      handleSecurityError(error);
    }
  }
  return null;
}

function getItemAsJson(key, defaultValue) {
  let item = getItem(key);

  if (item == null) {
    item = defaultValue || '[]';
  }

  return JSON.parse(item);
}

export function setSessionMessageIds(data) {
  setItem('messages', data);
}

export function getSessionMessageIds() {
  return getItemAsJson('messages', '[]');
}

export function setOngoingTrip(value) {
  setItem('ongoing-trip', value);
}

export function getOngoingTrip(destinationAddress) {
  const item = getItem('ongoing-trip');

  if (!item) {
    return null;
  }

  if (destinationAddress) {
    const trip = JSON.parse(item);
    const destination = trip.route.pois.find(
      poi => poi.name === destinationAddress
    );

    if (destination) {
      trip.selectedItem = destination.position - 1;
    }

    setOngoingTrip(trip);
    return trip;
  }

  return JSON.parse(item);
}

export function clearOngoingTrip() {
  try {
    sessionStorage.removeItem('ongoing-trip');
  } catch (error) {
    console.trace(error);
  }
}
