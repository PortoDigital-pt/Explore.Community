import { PageContent as PoiPageContent } from './pois/page';
import {
  PageContent as EventPageContent,
  EventContactDetails
} from './events/page';

export const PAGE_CONTENT_TYPE_MAP = {
  pois: PoiPageContent,
  events: EventPageContent
};

export const PAGE_CONTENT_PIECES_TYPE_MAP = {
  events: { details: EventContactDetails }
};
