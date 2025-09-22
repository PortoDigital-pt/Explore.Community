export const isKioskUA = () =>
  !!process.env.KIOSK_UA_REGEX &&
  new RegExp(process.env.KIOSK_UA_REGEX, 'i').test(navigator?.userAgent);
