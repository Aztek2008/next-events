export interface IPerformers {
  colors: null;
  divisions: null;
  has_upcoming_events: boolean;
  home_venue_id: null;
  id: number | string;
  image: string;
  image_attribution: null | string;
  image_license: null | string;
  images: { [key: string]: string };
  location: null;
  name: string;
  num_upcoming_events: number;
  popularity: number;
  primary: boolean;
  score: number;
  short_name: string;
  slug: string;
  stats: { [key: string]: number };
  taxonomies: [{}];
  type: string;
  url: string;
}

export interface IEvent {
  type: string;
  id: string | undefined;
  datetime_utc: Date;
  venue: {};
  datetime_tbd: boolean;
  performers: [IPerformers];
  is_open: boolean;
  links: [];
  datetime_local: Date;
  time_tbd: boolean;
  short_title: string;
  visible_until_utc: Date;
  stats: {};
  taxonomies: {}[];
  url: string;
  score: number;
  announce_date: Date;
  created_at: Date;
  date_tbd: boolean;
  title: string;
  popularity: number;
  description: string;
  status: string;
  access_method: null;
  event_promotion: null;
  announcements: {};
  conditional: boolean;
  enddatetime_utc: null;
  themes: [];
  domain_information: [];
}
