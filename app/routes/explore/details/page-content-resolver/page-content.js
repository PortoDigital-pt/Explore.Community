import {
  PageContent as PoiPageContent,
  MobileContent as PoiMobilePageContent
} from '../pois/page';
import {
  MobileContent as EventMobilePageContent,
  PageContent as EventsPageContent
} from '../events/page';
import { PageContent as RoutesPageContent } from '../routes/page';
import { MobileContent as RoutesMobilePageContent } from '../routes/mobile-content';
import {
  PageContent as DistrictsPageContent,
  Mobile as DistrictsMobilePageContent
} from '../districts/page';

export const MOBILE_PAGE_CONTENT_TYPE_MAP = {
  pois: PoiMobilePageContent,
  events: EventMobilePageContent,
  routes: RoutesMobilePageContent,
  districts: DistrictsMobilePageContent
};

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventsPageContent,
  routes: RoutesPageContent,
  districts: DistrictsPageContent
};
