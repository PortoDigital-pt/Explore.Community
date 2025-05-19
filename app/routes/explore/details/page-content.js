import {
  PageContent as PoiPageContent,
  MobileContent as PoiMobilePageContent,
} from './pois/page';
import {
  PageContent as EventPageContent,
  MobileContent as EventMobilePageContent,
  EventContactDetails,
} from './events/page';
import {
  TouristTripContactDetails,
  PageContent as TouristTripPageContent,
} from './tourist-trip/page';

import { MobileContent as TouristTripMobilePageContent } from './tourist-trip/mobile-content';

export const MOBILE_PAGE_CONTENT_TYPE_MAP = {
  pois: PoiMobilePageContent,
  events: EventMobilePageContent,
  touristTrips: TouristTripMobilePageContent,
};

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventPageContent,
  touristTrips: TouristTripPageContent,
};

export const PAGE_CONTENT_PIECES_TYPE_MAP = {
  events: { details: EventContactDetails },
  touristTrips: { details: TouristTripContactDetails },
};
