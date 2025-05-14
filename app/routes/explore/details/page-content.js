import {
  PageContent as PoiPageContent,
  MobileContent as PoiMobilePageContent
} from './pois/page';
import {
  PageContent as EventPageContent,
  MobileContent as EventMobilePageContent,
  EventContactDetails
} from './events/page';

export const MOBILE_PAGE_CONTENT_TYPE_MAP = {
  pois: PoiMobilePageContent,
  events: EventMobilePageContent,
  touristTrips: PoiMobilePageContent
};

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventPageContent,
  touristTrips: PoiPageContent
};

export const PAGE_CONTENT_PIECES_TYPE_MAP = {
  events: { details: EventContactDetails }
};
