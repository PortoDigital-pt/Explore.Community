import {
  PageContent as PoiPageContent,
  MobileContent as PoiMobilePageContent
} from './pois/page';
import {
  PageContent as EventPageContent,
  MobileContent as EventMobilePageContent,
  EventContactDetails
} from './events/page';
import { PageContent as TouristTripPageContent } from './routes/page';
import { MobileContent as TouristTripMobilePageContent } from './routes/mobile-content';
import { RoutesDetails } from './routes/detail';

export const MOBILE_PAGE_CONTENT_TYPE_MAP = {
  pois: PoiMobilePageContent,
  events: EventMobilePageContent,
  routes: TouristTripMobilePageContent
};

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventPageContent,
  routes: TouristTripPageContent
};

export const PAGE_CONTENT_PIECES_TYPE_MAP = {
  events: { details: EventContactDetails },
  routes: { details: RoutesDetails }
};
