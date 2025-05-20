import {
  PageContent as PoiPageContent,
  MobileContent as PoiMobilePageContent
} from '../pois/page';
import {
  PageContent as EventPageContent,
  MobileContent as EventMobilePageContent
} from '../events/page';
import { PageContent as TouristTripPageContent } from '../routes/page';
import { MobileContent as TouristTripMobilePageContent } from '../routes/mobile-content';

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
