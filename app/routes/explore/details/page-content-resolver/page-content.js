import {
  PageContent as PoiPageContent,
  MobileContent as PoiMobilePageContent
} from '../pois/page';
import {
  PageContent as EventPageContent,
  MobileContent as EventMobilePageContent
} from '../events/page';
import { PageContent as RoutesPageContent } from '../routes/page';
import { PageContent as BlocksPageContent } from '../blocks/page';
import { MobileContent as RoutesMobilePageContent } from '../routes/mobile-content';

export const MOBILE_PAGE_CONTENT_TYPE_MAP = {
  pois: PoiMobilePageContent,
  events: EventMobilePageContent,
  routes: RoutesMobilePageContent
};

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventPageContent,
  routes: RoutesPageContent,
  blocks: BlocksPageContent
};
