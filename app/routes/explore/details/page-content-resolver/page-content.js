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
  PageContent as BlocksPageContent,
  Mobile as BlocksMobilePageContent
} from '../blocks/page';

export const MOBILE_PAGE_CONTENT_TYPE_MAP = {
  pois: PoiMobilePageContent,
  events: EventMobilePageContent,
  routes: RoutesMobilePageContent,
  blocks: BlocksMobilePageContent
};

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventsPageContent,
  routes: RoutesPageContent,
  blocks: BlocksPageContent
};
