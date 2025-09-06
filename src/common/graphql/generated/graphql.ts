/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big number integer */
  BigInt: { input: any; output: any; }
};

export type Event = {
  __typename?: 'Event';
  capacity: Scalars['BigInt']['output'];
  createdAt: Scalars['BigInt']['output'];
  endDate: Scalars['BigInt']['output'];
  eventId: Scalars['BigInt']['output'];
  id: Scalars['String']['output'];
  isActive: Scalars['Boolean']['output'];
  isPaid: Scalars['Boolean']['output'];
  metadata?: Maybe<EventMetadata>;
  metadataHash: Scalars['String']['output'];
  organizer: Scalars['String']['output'];
  paymentTokens: Array<EventToken>;
  payments: Array<Payment>;
  poaps: Array<Poap>;
  registrations: Array<Registration>;
  requiresApproval: Scalars['Boolean']['output'];
  startDate: Scalars['BigInt']['output'];
  tickets: Array<Ticket>;
  updatedAt?: Maybe<Scalars['BigInt']['output']>;
  venueType: Scalars['String']['output'];
};


export type EventPaymentTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventTokenOrderByInput>>;
  where?: InputMaybe<EventTokenWhereInput>;
};


export type EventPaymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentOrderByInput>>;
  where?: InputMaybe<PaymentWhereInput>;
};


export type EventPoapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PoapOrderByInput>>;
  where?: InputMaybe<PoapWhereInput>;
};


export type EventRegistrationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RegistrationOrderByInput>>;
  where?: InputMaybe<RegistrationWhereInput>;
};


export type EventTicketsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TicketOrderByInput>>;
  where?: InputMaybe<TicketWhereInput>;
};

export type EventEdge = {
  __typename?: 'EventEdge';
  cursor: Scalars['String']['output'];
  node: Event;
};

export type EventMetadata = {
  __typename?: 'EventMetadata';
  description: Scalars['String']['output'];
  event: Event;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  referenceHash: Scalars['String']['output'];
  title: Scalars['String']['output'];
  virtualLink?: Maybe<Scalars['String']['output']>;
};

export type EventMetadataConnection = {
  __typename?: 'EventMetadataConnection';
  edges: Array<EventMetadataEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventMetadataEdge = {
  __typename?: 'EventMetadataEdge';
  cursor: Scalars['String']['output'];
  node: EventMetadata;
};

export enum EventMetadataOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  EventCapacityAsc = 'event_capacity_ASC',
  EventCapacityAscNullsFirst = 'event_capacity_ASC_NULLS_FIRST',
  EventCapacityAscNullsLast = 'event_capacity_ASC_NULLS_LAST',
  EventCapacityDesc = 'event_capacity_DESC',
  EventCapacityDescNullsFirst = 'event_capacity_DESC_NULLS_FIRST',
  EventCapacityDescNullsLast = 'event_capacity_DESC_NULLS_LAST',
  EventCreatedAtAsc = 'event_createdAt_ASC',
  EventCreatedAtAscNullsFirst = 'event_createdAt_ASC_NULLS_FIRST',
  EventCreatedAtAscNullsLast = 'event_createdAt_ASC_NULLS_LAST',
  EventCreatedAtDesc = 'event_createdAt_DESC',
  EventCreatedAtDescNullsFirst = 'event_createdAt_DESC_NULLS_FIRST',
  EventCreatedAtDescNullsLast = 'event_createdAt_DESC_NULLS_LAST',
  EventEndDateAsc = 'event_endDate_ASC',
  EventEndDateAscNullsFirst = 'event_endDate_ASC_NULLS_FIRST',
  EventEndDateAscNullsLast = 'event_endDate_ASC_NULLS_LAST',
  EventEndDateDesc = 'event_endDate_DESC',
  EventEndDateDescNullsFirst = 'event_endDate_DESC_NULLS_FIRST',
  EventEndDateDescNullsLast = 'event_endDate_DESC_NULLS_LAST',
  EventEventIdAsc = 'event_eventId_ASC',
  EventEventIdAscNullsFirst = 'event_eventId_ASC_NULLS_FIRST',
  EventEventIdAscNullsLast = 'event_eventId_ASC_NULLS_LAST',
  EventEventIdDesc = 'event_eventId_DESC',
  EventEventIdDescNullsFirst = 'event_eventId_DESC_NULLS_FIRST',
  EventEventIdDescNullsLast = 'event_eventId_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIsActiveAsc = 'event_isActive_ASC',
  EventIsActiveAscNullsFirst = 'event_isActive_ASC_NULLS_FIRST',
  EventIsActiveAscNullsLast = 'event_isActive_ASC_NULLS_LAST',
  EventIsActiveDesc = 'event_isActive_DESC',
  EventIsActiveDescNullsFirst = 'event_isActive_DESC_NULLS_FIRST',
  EventIsActiveDescNullsLast = 'event_isActive_DESC_NULLS_LAST',
  EventIsPaidAsc = 'event_isPaid_ASC',
  EventIsPaidAscNullsFirst = 'event_isPaid_ASC_NULLS_FIRST',
  EventIsPaidAscNullsLast = 'event_isPaid_ASC_NULLS_LAST',
  EventIsPaidDesc = 'event_isPaid_DESC',
  EventIsPaidDescNullsFirst = 'event_isPaid_DESC_NULLS_FIRST',
  EventIsPaidDescNullsLast = 'event_isPaid_DESC_NULLS_LAST',
  EventMetadataHashAsc = 'event_metadataHash_ASC',
  EventMetadataHashAscNullsFirst = 'event_metadataHash_ASC_NULLS_FIRST',
  EventMetadataHashAscNullsLast = 'event_metadataHash_ASC_NULLS_LAST',
  EventMetadataHashDesc = 'event_metadataHash_DESC',
  EventMetadataHashDescNullsFirst = 'event_metadataHash_DESC_NULLS_FIRST',
  EventMetadataHashDescNullsLast = 'event_metadataHash_DESC_NULLS_LAST',
  EventOrganizerAsc = 'event_organizer_ASC',
  EventOrganizerAscNullsFirst = 'event_organizer_ASC_NULLS_FIRST',
  EventOrganizerAscNullsLast = 'event_organizer_ASC_NULLS_LAST',
  EventOrganizerDesc = 'event_organizer_DESC',
  EventOrganizerDescNullsFirst = 'event_organizer_DESC_NULLS_FIRST',
  EventOrganizerDescNullsLast = 'event_organizer_DESC_NULLS_LAST',
  EventRequiresApprovalAsc = 'event_requiresApproval_ASC',
  EventRequiresApprovalAscNullsFirst = 'event_requiresApproval_ASC_NULLS_FIRST',
  EventRequiresApprovalAscNullsLast = 'event_requiresApproval_ASC_NULLS_LAST',
  EventRequiresApprovalDesc = 'event_requiresApproval_DESC',
  EventRequiresApprovalDescNullsFirst = 'event_requiresApproval_DESC_NULLS_FIRST',
  EventRequiresApprovalDescNullsLast = 'event_requiresApproval_DESC_NULLS_LAST',
  EventStartDateAsc = 'event_startDate_ASC',
  EventStartDateAscNullsFirst = 'event_startDate_ASC_NULLS_FIRST',
  EventStartDateAscNullsLast = 'event_startDate_ASC_NULLS_LAST',
  EventStartDateDesc = 'event_startDate_DESC',
  EventStartDateDescNullsFirst = 'event_startDate_DESC_NULLS_FIRST',
  EventStartDateDescNullsLast = 'event_startDate_DESC_NULLS_LAST',
  EventUpdatedAtAsc = 'event_updatedAt_ASC',
  EventUpdatedAtAscNullsFirst = 'event_updatedAt_ASC_NULLS_FIRST',
  EventUpdatedAtAscNullsLast = 'event_updatedAt_ASC_NULLS_LAST',
  EventUpdatedAtDesc = 'event_updatedAt_DESC',
  EventUpdatedAtDescNullsFirst = 'event_updatedAt_DESC_NULLS_FIRST',
  EventUpdatedAtDescNullsLast = 'event_updatedAt_DESC_NULLS_LAST',
  EventVenueTypeAsc = 'event_venueType_ASC',
  EventVenueTypeAscNullsFirst = 'event_venueType_ASC_NULLS_FIRST',
  EventVenueTypeAscNullsLast = 'event_venueType_ASC_NULLS_LAST',
  EventVenueTypeDesc = 'event_venueType_DESC',
  EventVenueTypeDescNullsFirst = 'event_venueType_DESC_NULLS_FIRST',
  EventVenueTypeDescNullsLast = 'event_venueType_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ImageAsc = 'image_ASC',
  ImageAscNullsFirst = 'image_ASC_NULLS_FIRST',
  ImageAscNullsLast = 'image_ASC_NULLS_LAST',
  ImageDesc = 'image_DESC',
  ImageDescNullsFirst = 'image_DESC_NULLS_FIRST',
  ImageDescNullsLast = 'image_DESC_NULLS_LAST',
  LocationAddressAsc = 'location_address_ASC',
  LocationAddressAscNullsFirst = 'location_address_ASC_NULLS_FIRST',
  LocationAddressAscNullsLast = 'location_address_ASC_NULLS_LAST',
  LocationAddressDesc = 'location_address_DESC',
  LocationAddressDescNullsFirst = 'location_address_DESC_NULLS_FIRST',
  LocationAddressDescNullsLast = 'location_address_DESC_NULLS_LAST',
  LocationIdAsc = 'location_id_ASC',
  LocationIdAscNullsFirst = 'location_id_ASC_NULLS_FIRST',
  LocationIdAscNullsLast = 'location_id_ASC_NULLS_LAST',
  LocationIdDesc = 'location_id_DESC',
  LocationIdDescNullsFirst = 'location_id_DESC_NULLS_FIRST',
  LocationIdDescNullsLast = 'location_id_DESC_NULLS_LAST',
  LocationLatitudeAsc = 'location_latitude_ASC',
  LocationLatitudeAscNullsFirst = 'location_latitude_ASC_NULLS_FIRST',
  LocationLatitudeAscNullsLast = 'location_latitude_ASC_NULLS_LAST',
  LocationLatitudeDesc = 'location_latitude_DESC',
  LocationLatitudeDescNullsFirst = 'location_latitude_DESC_NULLS_FIRST',
  LocationLatitudeDescNullsLast = 'location_latitude_DESC_NULLS_LAST',
  LocationLongitudeAsc = 'location_longitude_ASC',
  LocationLongitudeAscNullsFirst = 'location_longitude_ASC_NULLS_FIRST',
  LocationLongitudeAscNullsLast = 'location_longitude_ASC_NULLS_LAST',
  LocationLongitudeDesc = 'location_longitude_DESC',
  LocationLongitudeDescNullsFirst = 'location_longitude_DESC_NULLS_FIRST',
  LocationLongitudeDescNullsLast = 'location_longitude_DESC_NULLS_LAST',
  LocationNameAsc = 'location_name_ASC',
  LocationNameAscNullsFirst = 'location_name_ASC_NULLS_FIRST',
  LocationNameAscNullsLast = 'location_name_ASC_NULLS_LAST',
  LocationNameDesc = 'location_name_DESC',
  LocationNameDescNullsFirst = 'location_name_DESC_NULLS_FIRST',
  LocationNameDescNullsLast = 'location_name_DESC_NULLS_LAST',
  LocationPlaceIdAsc = 'location_placeId_ASC',
  LocationPlaceIdAscNullsFirst = 'location_placeId_ASC_NULLS_FIRST',
  LocationPlaceIdAscNullsLast = 'location_placeId_ASC_NULLS_LAST',
  LocationPlaceIdDesc = 'location_placeId_DESC',
  LocationPlaceIdDescNullsFirst = 'location_placeId_DESC_NULLS_FIRST',
  LocationPlaceIdDescNullsLast = 'location_placeId_DESC_NULLS_LAST',
  ReferenceHashAsc = 'referenceHash_ASC',
  ReferenceHashAscNullsFirst = 'referenceHash_ASC_NULLS_FIRST',
  ReferenceHashAscNullsLast = 'referenceHash_ASC_NULLS_LAST',
  ReferenceHashDesc = 'referenceHash_DESC',
  ReferenceHashDescNullsFirst = 'referenceHash_DESC_NULLS_FIRST',
  ReferenceHashDescNullsLast = 'referenceHash_DESC_NULLS_LAST',
  TitleAsc = 'title_ASC',
  TitleAscNullsFirst = 'title_ASC_NULLS_FIRST',
  TitleAscNullsLast = 'title_ASC_NULLS_LAST',
  TitleDesc = 'title_DESC',
  TitleDescNullsFirst = 'title_DESC_NULLS_FIRST',
  TitleDescNullsLast = 'title_DESC_NULLS_LAST',
  VirtualLinkAsc = 'virtualLink_ASC',
  VirtualLinkAscNullsFirst = 'virtualLink_ASC_NULLS_FIRST',
  VirtualLinkAscNullsLast = 'virtualLink_ASC_NULLS_LAST',
  VirtualLinkDesc = 'virtualLink_DESC',
  VirtualLinkDescNullsFirst = 'virtualLink_DESC_NULLS_FIRST',
  VirtualLinkDescNullsLast = 'virtualLink_DESC_NULLS_LAST'
}

export type EventMetadataWhereInput = {
  AND?: InputMaybe<Array<EventMetadataWhereInput>>;
  OR?: InputMaybe<Array<EventMetadataWhereInput>>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  image_contains?: InputMaybe<Scalars['String']['input']>;
  image_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  image_endsWith?: InputMaybe<Scalars['String']['input']>;
  image_eq?: InputMaybe<Scalars['String']['input']>;
  image_gt?: InputMaybe<Scalars['String']['input']>;
  image_gte?: InputMaybe<Scalars['String']['input']>;
  image_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  image_lt?: InputMaybe<Scalars['String']['input']>;
  image_lte?: InputMaybe<Scalars['String']['input']>;
  image_not_contains?: InputMaybe<Scalars['String']['input']>;
  image_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  image_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  image_not_eq?: InputMaybe<Scalars['String']['input']>;
  image_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  image_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  image_startsWith?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<LocationWhereInput>;
  location_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referenceHash_contains?: InputMaybe<Scalars['String']['input']>;
  referenceHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  referenceHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  referenceHash_eq?: InputMaybe<Scalars['String']['input']>;
  referenceHash_gt?: InputMaybe<Scalars['String']['input']>;
  referenceHash_gte?: InputMaybe<Scalars['String']['input']>;
  referenceHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referenceHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  referenceHash_lt?: InputMaybe<Scalars['String']['input']>;
  referenceHash_lte?: InputMaybe<Scalars['String']['input']>;
  referenceHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  referenceHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  referenceHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  referenceHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  referenceHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  referenceHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  referenceHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  title_endsWith?: InputMaybe<Scalars['String']['input']>;
  title_eq?: InputMaybe<Scalars['String']['input']>;
  title_gt?: InputMaybe<Scalars['String']['input']>;
  title_gte?: InputMaybe<Scalars['String']['input']>;
  title_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  title_lt?: InputMaybe<Scalars['String']['input']>;
  title_lte?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  title_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  title_not_eq?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  title_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  title_startsWith?: InputMaybe<Scalars['String']['input']>;
  virtualLink_contains?: InputMaybe<Scalars['String']['input']>;
  virtualLink_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  virtualLink_endsWith?: InputMaybe<Scalars['String']['input']>;
  virtualLink_eq?: InputMaybe<Scalars['String']['input']>;
  virtualLink_gt?: InputMaybe<Scalars['String']['input']>;
  virtualLink_gte?: InputMaybe<Scalars['String']['input']>;
  virtualLink_in?: InputMaybe<Array<Scalars['String']['input']>>;
  virtualLink_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  virtualLink_lt?: InputMaybe<Scalars['String']['input']>;
  virtualLink_lte?: InputMaybe<Scalars['String']['input']>;
  virtualLink_not_contains?: InputMaybe<Scalars['String']['input']>;
  virtualLink_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  virtualLink_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  virtualLink_not_eq?: InputMaybe<Scalars['String']['input']>;
  virtualLink_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  virtualLink_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  virtualLink_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export enum EventOrderByInput {
  CapacityAsc = 'capacity_ASC',
  CapacityAscNullsFirst = 'capacity_ASC_NULLS_FIRST',
  CapacityAscNullsLast = 'capacity_ASC_NULLS_LAST',
  CapacityDesc = 'capacity_DESC',
  CapacityDescNullsFirst = 'capacity_DESC_NULLS_FIRST',
  CapacityDescNullsLast = 'capacity_DESC_NULLS_LAST',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtAscNullsLast = 'createdAt_ASC_NULLS_LAST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsFirst = 'createdAt_DESC_NULLS_FIRST',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  EndDateAsc = 'endDate_ASC',
  EndDateAscNullsFirst = 'endDate_ASC_NULLS_FIRST',
  EndDateAscNullsLast = 'endDate_ASC_NULLS_LAST',
  EndDateDesc = 'endDate_DESC',
  EndDateDescNullsFirst = 'endDate_DESC_NULLS_FIRST',
  EndDateDescNullsLast = 'endDate_DESC_NULLS_LAST',
  EventIdAsc = 'eventId_ASC',
  EventIdAscNullsFirst = 'eventId_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'eventId_ASC_NULLS_LAST',
  EventIdDesc = 'eventId_DESC',
  EventIdDescNullsFirst = 'eventId_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'eventId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsActiveAsc = 'isActive_ASC',
  IsActiveAscNullsFirst = 'isActive_ASC_NULLS_FIRST',
  IsActiveAscNullsLast = 'isActive_ASC_NULLS_LAST',
  IsActiveDesc = 'isActive_DESC',
  IsActiveDescNullsFirst = 'isActive_DESC_NULLS_FIRST',
  IsActiveDescNullsLast = 'isActive_DESC_NULLS_LAST',
  IsPaidAsc = 'isPaid_ASC',
  IsPaidAscNullsFirst = 'isPaid_ASC_NULLS_FIRST',
  IsPaidAscNullsLast = 'isPaid_ASC_NULLS_LAST',
  IsPaidDesc = 'isPaid_DESC',
  IsPaidDescNullsFirst = 'isPaid_DESC_NULLS_FIRST',
  IsPaidDescNullsLast = 'isPaid_DESC_NULLS_LAST',
  MetadataHashAsc = 'metadataHash_ASC',
  MetadataHashAscNullsFirst = 'metadataHash_ASC_NULLS_FIRST',
  MetadataHashAscNullsLast = 'metadataHash_ASC_NULLS_LAST',
  MetadataHashDesc = 'metadataHash_DESC',
  MetadataHashDescNullsFirst = 'metadataHash_DESC_NULLS_FIRST',
  MetadataHashDescNullsLast = 'metadataHash_DESC_NULLS_LAST',
  MetadataDescriptionAsc = 'metadata_description_ASC',
  MetadataDescriptionAscNullsFirst = 'metadata_description_ASC_NULLS_FIRST',
  MetadataDescriptionAscNullsLast = 'metadata_description_ASC_NULLS_LAST',
  MetadataDescriptionDesc = 'metadata_description_DESC',
  MetadataDescriptionDescNullsFirst = 'metadata_description_DESC_NULLS_FIRST',
  MetadataDescriptionDescNullsLast = 'metadata_description_DESC_NULLS_LAST',
  MetadataIdAsc = 'metadata_id_ASC',
  MetadataIdAscNullsFirst = 'metadata_id_ASC_NULLS_FIRST',
  MetadataIdAscNullsLast = 'metadata_id_ASC_NULLS_LAST',
  MetadataIdDesc = 'metadata_id_DESC',
  MetadataIdDescNullsFirst = 'metadata_id_DESC_NULLS_FIRST',
  MetadataIdDescNullsLast = 'metadata_id_DESC_NULLS_LAST',
  MetadataImageAsc = 'metadata_image_ASC',
  MetadataImageAscNullsFirst = 'metadata_image_ASC_NULLS_FIRST',
  MetadataImageAscNullsLast = 'metadata_image_ASC_NULLS_LAST',
  MetadataImageDesc = 'metadata_image_DESC',
  MetadataImageDescNullsFirst = 'metadata_image_DESC_NULLS_FIRST',
  MetadataImageDescNullsLast = 'metadata_image_DESC_NULLS_LAST',
  MetadataReferenceHashAsc = 'metadata_referenceHash_ASC',
  MetadataReferenceHashAscNullsFirst = 'metadata_referenceHash_ASC_NULLS_FIRST',
  MetadataReferenceHashAscNullsLast = 'metadata_referenceHash_ASC_NULLS_LAST',
  MetadataReferenceHashDesc = 'metadata_referenceHash_DESC',
  MetadataReferenceHashDescNullsFirst = 'metadata_referenceHash_DESC_NULLS_FIRST',
  MetadataReferenceHashDescNullsLast = 'metadata_referenceHash_DESC_NULLS_LAST',
  MetadataTitleAsc = 'metadata_title_ASC',
  MetadataTitleAscNullsFirst = 'metadata_title_ASC_NULLS_FIRST',
  MetadataTitleAscNullsLast = 'metadata_title_ASC_NULLS_LAST',
  MetadataTitleDesc = 'metadata_title_DESC',
  MetadataTitleDescNullsFirst = 'metadata_title_DESC_NULLS_FIRST',
  MetadataTitleDescNullsLast = 'metadata_title_DESC_NULLS_LAST',
  MetadataVirtualLinkAsc = 'metadata_virtualLink_ASC',
  MetadataVirtualLinkAscNullsFirst = 'metadata_virtualLink_ASC_NULLS_FIRST',
  MetadataVirtualLinkAscNullsLast = 'metadata_virtualLink_ASC_NULLS_LAST',
  MetadataVirtualLinkDesc = 'metadata_virtualLink_DESC',
  MetadataVirtualLinkDescNullsFirst = 'metadata_virtualLink_DESC_NULLS_FIRST',
  MetadataVirtualLinkDescNullsLast = 'metadata_virtualLink_DESC_NULLS_LAST',
  OrganizerAsc = 'organizer_ASC',
  OrganizerAscNullsFirst = 'organizer_ASC_NULLS_FIRST',
  OrganizerAscNullsLast = 'organizer_ASC_NULLS_LAST',
  OrganizerDesc = 'organizer_DESC',
  OrganizerDescNullsFirst = 'organizer_DESC_NULLS_FIRST',
  OrganizerDescNullsLast = 'organizer_DESC_NULLS_LAST',
  RequiresApprovalAsc = 'requiresApproval_ASC',
  RequiresApprovalAscNullsFirst = 'requiresApproval_ASC_NULLS_FIRST',
  RequiresApprovalAscNullsLast = 'requiresApproval_ASC_NULLS_LAST',
  RequiresApprovalDesc = 'requiresApproval_DESC',
  RequiresApprovalDescNullsFirst = 'requiresApproval_DESC_NULLS_FIRST',
  RequiresApprovalDescNullsLast = 'requiresApproval_DESC_NULLS_LAST',
  StartDateAsc = 'startDate_ASC',
  StartDateAscNullsFirst = 'startDate_ASC_NULLS_FIRST',
  StartDateAscNullsLast = 'startDate_ASC_NULLS_LAST',
  StartDateDesc = 'startDate_DESC',
  StartDateDescNullsFirst = 'startDate_DESC_NULLS_FIRST',
  StartDateDescNullsLast = 'startDate_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtAscNullsLast = 'updatedAt_ASC_NULLS_LAST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsFirst = 'updatedAt_DESC_NULLS_FIRST',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST',
  VenueTypeAsc = 'venueType_ASC',
  VenueTypeAscNullsFirst = 'venueType_ASC_NULLS_FIRST',
  VenueTypeAscNullsLast = 'venueType_ASC_NULLS_LAST',
  VenueTypeDesc = 'venueType_DESC',
  VenueTypeDescNullsFirst = 'venueType_DESC_NULLS_FIRST',
  VenueTypeDescNullsLast = 'venueType_DESC_NULLS_LAST'
}

export type EventToken = {
  __typename?: 'EventToken';
  event: Event;
  id: Scalars['String']['output'];
  price: Scalars['BigInt']['output'];
  tokenAddress: Scalars['String']['output'];
};

export type EventTokenEdge = {
  __typename?: 'EventTokenEdge';
  cursor: Scalars['String']['output'];
  node: EventToken;
};

export enum EventTokenOrderByInput {
  EventCapacityAsc = 'event_capacity_ASC',
  EventCapacityAscNullsFirst = 'event_capacity_ASC_NULLS_FIRST',
  EventCapacityAscNullsLast = 'event_capacity_ASC_NULLS_LAST',
  EventCapacityDesc = 'event_capacity_DESC',
  EventCapacityDescNullsFirst = 'event_capacity_DESC_NULLS_FIRST',
  EventCapacityDescNullsLast = 'event_capacity_DESC_NULLS_LAST',
  EventCreatedAtAsc = 'event_createdAt_ASC',
  EventCreatedAtAscNullsFirst = 'event_createdAt_ASC_NULLS_FIRST',
  EventCreatedAtAscNullsLast = 'event_createdAt_ASC_NULLS_LAST',
  EventCreatedAtDesc = 'event_createdAt_DESC',
  EventCreatedAtDescNullsFirst = 'event_createdAt_DESC_NULLS_FIRST',
  EventCreatedAtDescNullsLast = 'event_createdAt_DESC_NULLS_LAST',
  EventEndDateAsc = 'event_endDate_ASC',
  EventEndDateAscNullsFirst = 'event_endDate_ASC_NULLS_FIRST',
  EventEndDateAscNullsLast = 'event_endDate_ASC_NULLS_LAST',
  EventEndDateDesc = 'event_endDate_DESC',
  EventEndDateDescNullsFirst = 'event_endDate_DESC_NULLS_FIRST',
  EventEndDateDescNullsLast = 'event_endDate_DESC_NULLS_LAST',
  EventEventIdAsc = 'event_eventId_ASC',
  EventEventIdAscNullsFirst = 'event_eventId_ASC_NULLS_FIRST',
  EventEventIdAscNullsLast = 'event_eventId_ASC_NULLS_LAST',
  EventEventIdDesc = 'event_eventId_DESC',
  EventEventIdDescNullsFirst = 'event_eventId_DESC_NULLS_FIRST',
  EventEventIdDescNullsLast = 'event_eventId_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIsActiveAsc = 'event_isActive_ASC',
  EventIsActiveAscNullsFirst = 'event_isActive_ASC_NULLS_FIRST',
  EventIsActiveAscNullsLast = 'event_isActive_ASC_NULLS_LAST',
  EventIsActiveDesc = 'event_isActive_DESC',
  EventIsActiveDescNullsFirst = 'event_isActive_DESC_NULLS_FIRST',
  EventIsActiveDescNullsLast = 'event_isActive_DESC_NULLS_LAST',
  EventIsPaidAsc = 'event_isPaid_ASC',
  EventIsPaidAscNullsFirst = 'event_isPaid_ASC_NULLS_FIRST',
  EventIsPaidAscNullsLast = 'event_isPaid_ASC_NULLS_LAST',
  EventIsPaidDesc = 'event_isPaid_DESC',
  EventIsPaidDescNullsFirst = 'event_isPaid_DESC_NULLS_FIRST',
  EventIsPaidDescNullsLast = 'event_isPaid_DESC_NULLS_LAST',
  EventMetadataHashAsc = 'event_metadataHash_ASC',
  EventMetadataHashAscNullsFirst = 'event_metadataHash_ASC_NULLS_FIRST',
  EventMetadataHashAscNullsLast = 'event_metadataHash_ASC_NULLS_LAST',
  EventMetadataHashDesc = 'event_metadataHash_DESC',
  EventMetadataHashDescNullsFirst = 'event_metadataHash_DESC_NULLS_FIRST',
  EventMetadataHashDescNullsLast = 'event_metadataHash_DESC_NULLS_LAST',
  EventOrganizerAsc = 'event_organizer_ASC',
  EventOrganizerAscNullsFirst = 'event_organizer_ASC_NULLS_FIRST',
  EventOrganizerAscNullsLast = 'event_organizer_ASC_NULLS_LAST',
  EventOrganizerDesc = 'event_organizer_DESC',
  EventOrganizerDescNullsFirst = 'event_organizer_DESC_NULLS_FIRST',
  EventOrganizerDescNullsLast = 'event_organizer_DESC_NULLS_LAST',
  EventRequiresApprovalAsc = 'event_requiresApproval_ASC',
  EventRequiresApprovalAscNullsFirst = 'event_requiresApproval_ASC_NULLS_FIRST',
  EventRequiresApprovalAscNullsLast = 'event_requiresApproval_ASC_NULLS_LAST',
  EventRequiresApprovalDesc = 'event_requiresApproval_DESC',
  EventRequiresApprovalDescNullsFirst = 'event_requiresApproval_DESC_NULLS_FIRST',
  EventRequiresApprovalDescNullsLast = 'event_requiresApproval_DESC_NULLS_LAST',
  EventStartDateAsc = 'event_startDate_ASC',
  EventStartDateAscNullsFirst = 'event_startDate_ASC_NULLS_FIRST',
  EventStartDateAscNullsLast = 'event_startDate_ASC_NULLS_LAST',
  EventStartDateDesc = 'event_startDate_DESC',
  EventStartDateDescNullsFirst = 'event_startDate_DESC_NULLS_FIRST',
  EventStartDateDescNullsLast = 'event_startDate_DESC_NULLS_LAST',
  EventUpdatedAtAsc = 'event_updatedAt_ASC',
  EventUpdatedAtAscNullsFirst = 'event_updatedAt_ASC_NULLS_FIRST',
  EventUpdatedAtAscNullsLast = 'event_updatedAt_ASC_NULLS_LAST',
  EventUpdatedAtDesc = 'event_updatedAt_DESC',
  EventUpdatedAtDescNullsFirst = 'event_updatedAt_DESC_NULLS_FIRST',
  EventUpdatedAtDescNullsLast = 'event_updatedAt_DESC_NULLS_LAST',
  EventVenueTypeAsc = 'event_venueType_ASC',
  EventVenueTypeAscNullsFirst = 'event_venueType_ASC_NULLS_FIRST',
  EventVenueTypeAscNullsLast = 'event_venueType_ASC_NULLS_LAST',
  EventVenueTypeDesc = 'event_venueType_DESC',
  EventVenueTypeDescNullsFirst = 'event_venueType_DESC_NULLS_FIRST',
  EventVenueTypeDescNullsLast = 'event_venueType_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  PriceAsc = 'price_ASC',
  PriceAscNullsFirst = 'price_ASC_NULLS_FIRST',
  PriceAscNullsLast = 'price_ASC_NULLS_LAST',
  PriceDesc = 'price_DESC',
  PriceDescNullsFirst = 'price_DESC_NULLS_FIRST',
  PriceDescNullsLast = 'price_DESC_NULLS_LAST',
  TokenAddressAsc = 'tokenAddress_ASC',
  TokenAddressAscNullsFirst = 'tokenAddress_ASC_NULLS_FIRST',
  TokenAddressAscNullsLast = 'tokenAddress_ASC_NULLS_LAST',
  TokenAddressDesc = 'tokenAddress_DESC',
  TokenAddressDescNullsFirst = 'tokenAddress_DESC_NULLS_FIRST',
  TokenAddressDescNullsLast = 'tokenAddress_DESC_NULLS_LAST'
}

export type EventTokenWhereInput = {
  AND?: InputMaybe<Array<EventTokenWhereInput>>;
  OR?: InputMaybe<Array<EventTokenWhereInput>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  price_eq?: InputMaybe<Scalars['BigInt']['input']>;
  price_gt?: InputMaybe<Scalars['BigInt']['input']>;
  price_gte?: InputMaybe<Scalars['BigInt']['input']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  price_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  price_lt?: InputMaybe<Scalars['BigInt']['input']>;
  price_lte?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tokenAddress_contains?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_eq?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EventTokensConnection = {
  __typename?: 'EventTokensConnection';
  edges: Array<EventTokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type EventWhereInput = {
  AND?: InputMaybe<Array<EventWhereInput>>;
  OR?: InputMaybe<Array<EventWhereInput>>;
  capacity_eq?: InputMaybe<Scalars['BigInt']['input']>;
  capacity_gt?: InputMaybe<Scalars['BigInt']['input']>;
  capacity_gte?: InputMaybe<Scalars['BigInt']['input']>;
  capacity_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  capacity_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  capacity_lt?: InputMaybe<Scalars['BigInt']['input']>;
  capacity_lte?: InputMaybe<Scalars['BigInt']['input']>;
  capacity_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  capacity_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endDate_eq?: InputMaybe<Scalars['BigInt']['input']>;
  endDate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  endDate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  endDate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  endDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  endDate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  endDate_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  endDate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isActive_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isActive_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isActive_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isPaid_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isPaid_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isPaid_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<EventMetadataWhereInput>;
  metadataHash_contains?: InputMaybe<Scalars['String']['input']>;
  metadataHash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  metadataHash_endsWith?: InputMaybe<Scalars['String']['input']>;
  metadataHash_eq?: InputMaybe<Scalars['String']['input']>;
  metadataHash_gt?: InputMaybe<Scalars['String']['input']>;
  metadataHash_gte?: InputMaybe<Scalars['String']['input']>;
  metadataHash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataHash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  metadataHash_lt?: InputMaybe<Scalars['String']['input']>;
  metadataHash_lte?: InputMaybe<Scalars['String']['input']>;
  metadataHash_not_contains?: InputMaybe<Scalars['String']['input']>;
  metadataHash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  metadataHash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  metadataHash_not_eq?: InputMaybe<Scalars['String']['input']>;
  metadataHash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  metadataHash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  metadataHash_startsWith?: InputMaybe<Scalars['String']['input']>;
  metadata_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  organizer_contains?: InputMaybe<Scalars['String']['input']>;
  organizer_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  organizer_endsWith?: InputMaybe<Scalars['String']['input']>;
  organizer_eq?: InputMaybe<Scalars['String']['input']>;
  organizer_gt?: InputMaybe<Scalars['String']['input']>;
  organizer_gte?: InputMaybe<Scalars['String']['input']>;
  organizer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  organizer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  organizer_lt?: InputMaybe<Scalars['String']['input']>;
  organizer_lte?: InputMaybe<Scalars['String']['input']>;
  organizer_not_contains?: InputMaybe<Scalars['String']['input']>;
  organizer_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  organizer_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  organizer_not_eq?: InputMaybe<Scalars['String']['input']>;
  organizer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  organizer_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  organizer_startsWith?: InputMaybe<Scalars['String']['input']>;
  paymentTokens_every?: InputMaybe<EventTokenWhereInput>;
  paymentTokens_none?: InputMaybe<EventTokenWhereInput>;
  paymentTokens_some?: InputMaybe<EventTokenWhereInput>;
  payments_every?: InputMaybe<PaymentWhereInput>;
  payments_none?: InputMaybe<PaymentWhereInput>;
  payments_some?: InputMaybe<PaymentWhereInput>;
  poaps_every?: InputMaybe<PoapWhereInput>;
  poaps_none?: InputMaybe<PoapWhereInput>;
  poaps_some?: InputMaybe<PoapWhereInput>;
  registrations_every?: InputMaybe<RegistrationWhereInput>;
  registrations_none?: InputMaybe<RegistrationWhereInput>;
  registrations_some?: InputMaybe<RegistrationWhereInput>;
  requiresApproval_eq?: InputMaybe<Scalars['Boolean']['input']>;
  requiresApproval_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  requiresApproval_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_eq?: InputMaybe<Scalars['BigInt']['input']>;
  startDate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  startDate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  startDate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  startDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  startDate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  startDate_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  startDate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  tickets_every?: InputMaybe<TicketWhereInput>;
  tickets_none?: InputMaybe<TicketWhereInput>;
  tickets_some?: InputMaybe<TicketWhereInput>;
  updatedAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  venueType_contains?: InputMaybe<Scalars['String']['input']>;
  venueType_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  venueType_endsWith?: InputMaybe<Scalars['String']['input']>;
  venueType_eq?: InputMaybe<Scalars['String']['input']>;
  venueType_gt?: InputMaybe<Scalars['String']['input']>;
  venueType_gte?: InputMaybe<Scalars['String']['input']>;
  venueType_in?: InputMaybe<Array<Scalars['String']['input']>>;
  venueType_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  venueType_lt?: InputMaybe<Scalars['String']['input']>;
  venueType_lte?: InputMaybe<Scalars['String']['input']>;
  venueType_not_contains?: InputMaybe<Scalars['String']['input']>;
  venueType_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  venueType_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  venueType_not_eq?: InputMaybe<Scalars['String']['input']>;
  venueType_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  venueType_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  venueType_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type EventsConnection = {
  __typename?: 'EventsConnection';
  edges: Array<EventEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Location = {
  __typename?: 'Location';
  address?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  latitude: Scalars['String']['output'];
  longitude: Scalars['String']['output'];
  metadata: EventMetadata;
  name: Scalars['String']['output'];
  placeId?: Maybe<Scalars['String']['output']>;
};

export type LocationEdge = {
  __typename?: 'LocationEdge';
  cursor: Scalars['String']['output'];
  node: Location;
};

export enum LocationOrderByInput {
  AddressAsc = 'address_ASC',
  AddressAscNullsFirst = 'address_ASC_NULLS_FIRST',
  AddressAscNullsLast = 'address_ASC_NULLS_LAST',
  AddressDesc = 'address_DESC',
  AddressDescNullsFirst = 'address_DESC_NULLS_FIRST',
  AddressDescNullsLast = 'address_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  LatitudeAsc = 'latitude_ASC',
  LatitudeAscNullsFirst = 'latitude_ASC_NULLS_FIRST',
  LatitudeAscNullsLast = 'latitude_ASC_NULLS_LAST',
  LatitudeDesc = 'latitude_DESC',
  LatitudeDescNullsFirst = 'latitude_DESC_NULLS_FIRST',
  LatitudeDescNullsLast = 'latitude_DESC_NULLS_LAST',
  LongitudeAsc = 'longitude_ASC',
  LongitudeAscNullsFirst = 'longitude_ASC_NULLS_FIRST',
  LongitudeAscNullsLast = 'longitude_ASC_NULLS_LAST',
  LongitudeDesc = 'longitude_DESC',
  LongitudeDescNullsFirst = 'longitude_DESC_NULLS_FIRST',
  LongitudeDescNullsLast = 'longitude_DESC_NULLS_LAST',
  MetadataDescriptionAsc = 'metadata_description_ASC',
  MetadataDescriptionAscNullsFirst = 'metadata_description_ASC_NULLS_FIRST',
  MetadataDescriptionAscNullsLast = 'metadata_description_ASC_NULLS_LAST',
  MetadataDescriptionDesc = 'metadata_description_DESC',
  MetadataDescriptionDescNullsFirst = 'metadata_description_DESC_NULLS_FIRST',
  MetadataDescriptionDescNullsLast = 'metadata_description_DESC_NULLS_LAST',
  MetadataIdAsc = 'metadata_id_ASC',
  MetadataIdAscNullsFirst = 'metadata_id_ASC_NULLS_FIRST',
  MetadataIdAscNullsLast = 'metadata_id_ASC_NULLS_LAST',
  MetadataIdDesc = 'metadata_id_DESC',
  MetadataIdDescNullsFirst = 'metadata_id_DESC_NULLS_FIRST',
  MetadataIdDescNullsLast = 'metadata_id_DESC_NULLS_LAST',
  MetadataImageAsc = 'metadata_image_ASC',
  MetadataImageAscNullsFirst = 'metadata_image_ASC_NULLS_FIRST',
  MetadataImageAscNullsLast = 'metadata_image_ASC_NULLS_LAST',
  MetadataImageDesc = 'metadata_image_DESC',
  MetadataImageDescNullsFirst = 'metadata_image_DESC_NULLS_FIRST',
  MetadataImageDescNullsLast = 'metadata_image_DESC_NULLS_LAST',
  MetadataReferenceHashAsc = 'metadata_referenceHash_ASC',
  MetadataReferenceHashAscNullsFirst = 'metadata_referenceHash_ASC_NULLS_FIRST',
  MetadataReferenceHashAscNullsLast = 'metadata_referenceHash_ASC_NULLS_LAST',
  MetadataReferenceHashDesc = 'metadata_referenceHash_DESC',
  MetadataReferenceHashDescNullsFirst = 'metadata_referenceHash_DESC_NULLS_FIRST',
  MetadataReferenceHashDescNullsLast = 'metadata_referenceHash_DESC_NULLS_LAST',
  MetadataTitleAsc = 'metadata_title_ASC',
  MetadataTitleAscNullsFirst = 'metadata_title_ASC_NULLS_FIRST',
  MetadataTitleAscNullsLast = 'metadata_title_ASC_NULLS_LAST',
  MetadataTitleDesc = 'metadata_title_DESC',
  MetadataTitleDescNullsFirst = 'metadata_title_DESC_NULLS_FIRST',
  MetadataTitleDescNullsLast = 'metadata_title_DESC_NULLS_LAST',
  MetadataVirtualLinkAsc = 'metadata_virtualLink_ASC',
  MetadataVirtualLinkAscNullsFirst = 'metadata_virtualLink_ASC_NULLS_FIRST',
  MetadataVirtualLinkAscNullsLast = 'metadata_virtualLink_ASC_NULLS_LAST',
  MetadataVirtualLinkDesc = 'metadata_virtualLink_DESC',
  MetadataVirtualLinkDescNullsFirst = 'metadata_virtualLink_DESC_NULLS_FIRST',
  MetadataVirtualLinkDescNullsLast = 'metadata_virtualLink_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PlaceIdAsc = 'placeId_ASC',
  PlaceIdAscNullsFirst = 'placeId_ASC_NULLS_FIRST',
  PlaceIdAscNullsLast = 'placeId_ASC_NULLS_LAST',
  PlaceIdDesc = 'placeId_DESC',
  PlaceIdDescNullsFirst = 'placeId_DESC_NULLS_FIRST',
  PlaceIdDescNullsLast = 'placeId_DESC_NULLS_LAST'
}

export type LocationWhereInput = {
  AND?: InputMaybe<Array<LocationWhereInput>>;
  OR?: InputMaybe<Array<LocationWhereInput>>;
  address_contains?: InputMaybe<Scalars['String']['input']>;
  address_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_eq?: InputMaybe<Scalars['String']['input']>;
  address_gt?: InputMaybe<Scalars['String']['input']>;
  address_gte?: InputMaybe<Scalars['String']['input']>;
  address_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  address_lt?: InputMaybe<Scalars['String']['input']>;
  address_lte?: InputMaybe<Scalars['String']['input']>;
  address_not_contains?: InputMaybe<Scalars['String']['input']>;
  address_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  address_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  address_not_eq?: InputMaybe<Scalars['String']['input']>;
  address_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  address_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  address_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  latitude_contains?: InputMaybe<Scalars['String']['input']>;
  latitude_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  latitude_endsWith?: InputMaybe<Scalars['String']['input']>;
  latitude_eq?: InputMaybe<Scalars['String']['input']>;
  latitude_gt?: InputMaybe<Scalars['String']['input']>;
  latitude_gte?: InputMaybe<Scalars['String']['input']>;
  latitude_in?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  latitude_lt?: InputMaybe<Scalars['String']['input']>;
  latitude_lte?: InputMaybe<Scalars['String']['input']>;
  latitude_not_contains?: InputMaybe<Scalars['String']['input']>;
  latitude_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  latitude_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  latitude_not_eq?: InputMaybe<Scalars['String']['input']>;
  latitude_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  latitude_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  latitude_startsWith?: InputMaybe<Scalars['String']['input']>;
  longitude_contains?: InputMaybe<Scalars['String']['input']>;
  longitude_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  longitude_endsWith?: InputMaybe<Scalars['String']['input']>;
  longitude_eq?: InputMaybe<Scalars['String']['input']>;
  longitude_gt?: InputMaybe<Scalars['String']['input']>;
  longitude_gte?: InputMaybe<Scalars['String']['input']>;
  longitude_in?: InputMaybe<Array<Scalars['String']['input']>>;
  longitude_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  longitude_lt?: InputMaybe<Scalars['String']['input']>;
  longitude_lte?: InputMaybe<Scalars['String']['input']>;
  longitude_not_contains?: InputMaybe<Scalars['String']['input']>;
  longitude_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  longitude_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  longitude_not_eq?: InputMaybe<Scalars['String']['input']>;
  longitude_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  longitude_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  longitude_startsWith?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<EventMetadataWhereInput>;
  metadata_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  placeId_contains?: InputMaybe<Scalars['String']['input']>;
  placeId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  placeId_endsWith?: InputMaybe<Scalars['String']['input']>;
  placeId_eq?: InputMaybe<Scalars['String']['input']>;
  placeId_gt?: InputMaybe<Scalars['String']['input']>;
  placeId_gte?: InputMaybe<Scalars['String']['input']>;
  placeId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  placeId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  placeId_lt?: InputMaybe<Scalars['String']['input']>;
  placeId_lte?: InputMaybe<Scalars['String']['input']>;
  placeId_not_contains?: InputMaybe<Scalars['String']['input']>;
  placeId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  placeId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  placeId_not_eq?: InputMaybe<Scalars['String']['input']>;
  placeId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  placeId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  placeId_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type LocationsConnection = {
  __typename?: 'LocationsConnection';
  edges: Array<LocationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Poap = {
  __typename?: 'POAP';
  animationUrl?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  description: Scalars['String']['output'];
  dropImageDropId?: Maybe<Scalars['Int']['output']>;
  dropImagePublicId?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['String']['output']>;
  event: Event;
  eventTemplateId?: Maybe<Scalars['Int']['output']>;
  eventUrl?: Maybe<Scalars['String']['output']>;
  expiryDate?: Maybe<Scalars['String']['output']>;
  fancyId: Scalars['String']['output'];
  fromAdmin?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  poapId: Scalars['Int']['output'];
  privateEvent?: Maybe<Scalars['Boolean']['output']>;
  startDate?: Maybe<Scalars['String']['output']>;
  virtualEvent?: Maybe<Scalars['Boolean']['output']>;
  year?: Maybe<Scalars['Int']['output']>;
};

export type PoapEdge = {
  __typename?: 'POAPEdge';
  cursor: Scalars['String']['output'];
  node: Poap;
};

export enum PoapOrderByInput {
  AnimationUrlAsc = 'animationUrl_ASC',
  AnimationUrlAscNullsFirst = 'animationUrl_ASC_NULLS_FIRST',
  AnimationUrlAscNullsLast = 'animationUrl_ASC_NULLS_LAST',
  AnimationUrlDesc = 'animationUrl_DESC',
  AnimationUrlDescNullsFirst = 'animationUrl_DESC_NULLS_FIRST',
  AnimationUrlDescNullsLast = 'animationUrl_DESC_NULLS_LAST',
  CityAsc = 'city_ASC',
  CityAscNullsFirst = 'city_ASC_NULLS_FIRST',
  CityAscNullsLast = 'city_ASC_NULLS_LAST',
  CityDesc = 'city_DESC',
  CityDescNullsFirst = 'city_DESC_NULLS_FIRST',
  CityDescNullsLast = 'city_DESC_NULLS_LAST',
  CountryAsc = 'country_ASC',
  CountryAscNullsFirst = 'country_ASC_NULLS_FIRST',
  CountryAscNullsLast = 'country_ASC_NULLS_LAST',
  CountryDesc = 'country_DESC',
  CountryDescNullsFirst = 'country_DESC_NULLS_FIRST',
  CountryDescNullsLast = 'country_DESC_NULLS_LAST',
  DescriptionAsc = 'description_ASC',
  DescriptionAscNullsFirst = 'description_ASC_NULLS_FIRST',
  DescriptionAscNullsLast = 'description_ASC_NULLS_LAST',
  DescriptionDesc = 'description_DESC',
  DescriptionDescNullsFirst = 'description_DESC_NULLS_FIRST',
  DescriptionDescNullsLast = 'description_DESC_NULLS_LAST',
  DropImageDropIdAsc = 'dropImageDropId_ASC',
  DropImageDropIdAscNullsFirst = 'dropImageDropId_ASC_NULLS_FIRST',
  DropImageDropIdAscNullsLast = 'dropImageDropId_ASC_NULLS_LAST',
  DropImageDropIdDesc = 'dropImageDropId_DESC',
  DropImageDropIdDescNullsFirst = 'dropImageDropId_DESC_NULLS_FIRST',
  DropImageDropIdDescNullsLast = 'dropImageDropId_DESC_NULLS_LAST',
  DropImagePublicIdAsc = 'dropImagePublicId_ASC',
  DropImagePublicIdAscNullsFirst = 'dropImagePublicId_ASC_NULLS_FIRST',
  DropImagePublicIdAscNullsLast = 'dropImagePublicId_ASC_NULLS_LAST',
  DropImagePublicIdDesc = 'dropImagePublicId_DESC',
  DropImagePublicIdDescNullsFirst = 'dropImagePublicId_DESC_NULLS_FIRST',
  DropImagePublicIdDescNullsLast = 'dropImagePublicId_DESC_NULLS_LAST',
  EndDateAsc = 'endDate_ASC',
  EndDateAscNullsFirst = 'endDate_ASC_NULLS_FIRST',
  EndDateAscNullsLast = 'endDate_ASC_NULLS_LAST',
  EndDateDesc = 'endDate_DESC',
  EndDateDescNullsFirst = 'endDate_DESC_NULLS_FIRST',
  EndDateDescNullsLast = 'endDate_DESC_NULLS_LAST',
  EventTemplateIdAsc = 'eventTemplateId_ASC',
  EventTemplateIdAscNullsFirst = 'eventTemplateId_ASC_NULLS_FIRST',
  EventTemplateIdAscNullsLast = 'eventTemplateId_ASC_NULLS_LAST',
  EventTemplateIdDesc = 'eventTemplateId_DESC',
  EventTemplateIdDescNullsFirst = 'eventTemplateId_DESC_NULLS_FIRST',
  EventTemplateIdDescNullsLast = 'eventTemplateId_DESC_NULLS_LAST',
  EventUrlAsc = 'eventUrl_ASC',
  EventUrlAscNullsFirst = 'eventUrl_ASC_NULLS_FIRST',
  EventUrlAscNullsLast = 'eventUrl_ASC_NULLS_LAST',
  EventUrlDesc = 'eventUrl_DESC',
  EventUrlDescNullsFirst = 'eventUrl_DESC_NULLS_FIRST',
  EventUrlDescNullsLast = 'eventUrl_DESC_NULLS_LAST',
  EventCapacityAsc = 'event_capacity_ASC',
  EventCapacityAscNullsFirst = 'event_capacity_ASC_NULLS_FIRST',
  EventCapacityAscNullsLast = 'event_capacity_ASC_NULLS_LAST',
  EventCapacityDesc = 'event_capacity_DESC',
  EventCapacityDescNullsFirst = 'event_capacity_DESC_NULLS_FIRST',
  EventCapacityDescNullsLast = 'event_capacity_DESC_NULLS_LAST',
  EventCreatedAtAsc = 'event_createdAt_ASC',
  EventCreatedAtAscNullsFirst = 'event_createdAt_ASC_NULLS_FIRST',
  EventCreatedAtAscNullsLast = 'event_createdAt_ASC_NULLS_LAST',
  EventCreatedAtDesc = 'event_createdAt_DESC',
  EventCreatedAtDescNullsFirst = 'event_createdAt_DESC_NULLS_FIRST',
  EventCreatedAtDescNullsLast = 'event_createdAt_DESC_NULLS_LAST',
  EventEndDateAsc = 'event_endDate_ASC',
  EventEndDateAscNullsFirst = 'event_endDate_ASC_NULLS_FIRST',
  EventEndDateAscNullsLast = 'event_endDate_ASC_NULLS_LAST',
  EventEndDateDesc = 'event_endDate_DESC',
  EventEndDateDescNullsFirst = 'event_endDate_DESC_NULLS_FIRST',
  EventEndDateDescNullsLast = 'event_endDate_DESC_NULLS_LAST',
  EventEventIdAsc = 'event_eventId_ASC',
  EventEventIdAscNullsFirst = 'event_eventId_ASC_NULLS_FIRST',
  EventEventIdAscNullsLast = 'event_eventId_ASC_NULLS_LAST',
  EventEventIdDesc = 'event_eventId_DESC',
  EventEventIdDescNullsFirst = 'event_eventId_DESC_NULLS_FIRST',
  EventEventIdDescNullsLast = 'event_eventId_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIsActiveAsc = 'event_isActive_ASC',
  EventIsActiveAscNullsFirst = 'event_isActive_ASC_NULLS_FIRST',
  EventIsActiveAscNullsLast = 'event_isActive_ASC_NULLS_LAST',
  EventIsActiveDesc = 'event_isActive_DESC',
  EventIsActiveDescNullsFirst = 'event_isActive_DESC_NULLS_FIRST',
  EventIsActiveDescNullsLast = 'event_isActive_DESC_NULLS_LAST',
  EventIsPaidAsc = 'event_isPaid_ASC',
  EventIsPaidAscNullsFirst = 'event_isPaid_ASC_NULLS_FIRST',
  EventIsPaidAscNullsLast = 'event_isPaid_ASC_NULLS_LAST',
  EventIsPaidDesc = 'event_isPaid_DESC',
  EventIsPaidDescNullsFirst = 'event_isPaid_DESC_NULLS_FIRST',
  EventIsPaidDescNullsLast = 'event_isPaid_DESC_NULLS_LAST',
  EventMetadataHashAsc = 'event_metadataHash_ASC',
  EventMetadataHashAscNullsFirst = 'event_metadataHash_ASC_NULLS_FIRST',
  EventMetadataHashAscNullsLast = 'event_metadataHash_ASC_NULLS_LAST',
  EventMetadataHashDesc = 'event_metadataHash_DESC',
  EventMetadataHashDescNullsFirst = 'event_metadataHash_DESC_NULLS_FIRST',
  EventMetadataHashDescNullsLast = 'event_metadataHash_DESC_NULLS_LAST',
  EventOrganizerAsc = 'event_organizer_ASC',
  EventOrganizerAscNullsFirst = 'event_organizer_ASC_NULLS_FIRST',
  EventOrganizerAscNullsLast = 'event_organizer_ASC_NULLS_LAST',
  EventOrganizerDesc = 'event_organizer_DESC',
  EventOrganizerDescNullsFirst = 'event_organizer_DESC_NULLS_FIRST',
  EventOrganizerDescNullsLast = 'event_organizer_DESC_NULLS_LAST',
  EventRequiresApprovalAsc = 'event_requiresApproval_ASC',
  EventRequiresApprovalAscNullsFirst = 'event_requiresApproval_ASC_NULLS_FIRST',
  EventRequiresApprovalAscNullsLast = 'event_requiresApproval_ASC_NULLS_LAST',
  EventRequiresApprovalDesc = 'event_requiresApproval_DESC',
  EventRequiresApprovalDescNullsFirst = 'event_requiresApproval_DESC_NULLS_FIRST',
  EventRequiresApprovalDescNullsLast = 'event_requiresApproval_DESC_NULLS_LAST',
  EventStartDateAsc = 'event_startDate_ASC',
  EventStartDateAscNullsFirst = 'event_startDate_ASC_NULLS_FIRST',
  EventStartDateAscNullsLast = 'event_startDate_ASC_NULLS_LAST',
  EventStartDateDesc = 'event_startDate_DESC',
  EventStartDateDescNullsFirst = 'event_startDate_DESC_NULLS_FIRST',
  EventStartDateDescNullsLast = 'event_startDate_DESC_NULLS_LAST',
  EventUpdatedAtAsc = 'event_updatedAt_ASC',
  EventUpdatedAtAscNullsFirst = 'event_updatedAt_ASC_NULLS_FIRST',
  EventUpdatedAtAscNullsLast = 'event_updatedAt_ASC_NULLS_LAST',
  EventUpdatedAtDesc = 'event_updatedAt_DESC',
  EventUpdatedAtDescNullsFirst = 'event_updatedAt_DESC_NULLS_FIRST',
  EventUpdatedAtDescNullsLast = 'event_updatedAt_DESC_NULLS_LAST',
  EventVenueTypeAsc = 'event_venueType_ASC',
  EventVenueTypeAscNullsFirst = 'event_venueType_ASC_NULLS_FIRST',
  EventVenueTypeAscNullsLast = 'event_venueType_ASC_NULLS_LAST',
  EventVenueTypeDesc = 'event_venueType_DESC',
  EventVenueTypeDescNullsFirst = 'event_venueType_DESC_NULLS_FIRST',
  EventVenueTypeDescNullsLast = 'event_venueType_DESC_NULLS_LAST',
  ExpiryDateAsc = 'expiryDate_ASC',
  ExpiryDateAscNullsFirst = 'expiryDate_ASC_NULLS_FIRST',
  ExpiryDateAscNullsLast = 'expiryDate_ASC_NULLS_LAST',
  ExpiryDateDesc = 'expiryDate_DESC',
  ExpiryDateDescNullsFirst = 'expiryDate_DESC_NULLS_FIRST',
  ExpiryDateDescNullsLast = 'expiryDate_DESC_NULLS_LAST',
  FancyIdAsc = 'fancyId_ASC',
  FancyIdAscNullsFirst = 'fancyId_ASC_NULLS_FIRST',
  FancyIdAscNullsLast = 'fancyId_ASC_NULLS_LAST',
  FancyIdDesc = 'fancyId_DESC',
  FancyIdDescNullsFirst = 'fancyId_DESC_NULLS_FIRST',
  FancyIdDescNullsLast = 'fancyId_DESC_NULLS_LAST',
  FromAdminAsc = 'fromAdmin_ASC',
  FromAdminAscNullsFirst = 'fromAdmin_ASC_NULLS_FIRST',
  FromAdminAscNullsLast = 'fromAdmin_ASC_NULLS_LAST',
  FromAdminDesc = 'fromAdmin_DESC',
  FromAdminDescNullsFirst = 'fromAdmin_DESC_NULLS_FIRST',
  FromAdminDescNullsLast = 'fromAdmin_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ImageUrlAsc = 'imageUrl_ASC',
  ImageUrlAscNullsFirst = 'imageUrl_ASC_NULLS_FIRST',
  ImageUrlAscNullsLast = 'imageUrl_ASC_NULLS_LAST',
  ImageUrlDesc = 'imageUrl_DESC',
  ImageUrlDescNullsFirst = 'imageUrl_DESC_NULLS_FIRST',
  ImageUrlDescNullsLast = 'imageUrl_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  PoapIdAsc = 'poapId_ASC',
  PoapIdAscNullsFirst = 'poapId_ASC_NULLS_FIRST',
  PoapIdAscNullsLast = 'poapId_ASC_NULLS_LAST',
  PoapIdDesc = 'poapId_DESC',
  PoapIdDescNullsFirst = 'poapId_DESC_NULLS_FIRST',
  PoapIdDescNullsLast = 'poapId_DESC_NULLS_LAST',
  PrivateEventAsc = 'privateEvent_ASC',
  PrivateEventAscNullsFirst = 'privateEvent_ASC_NULLS_FIRST',
  PrivateEventAscNullsLast = 'privateEvent_ASC_NULLS_LAST',
  PrivateEventDesc = 'privateEvent_DESC',
  PrivateEventDescNullsFirst = 'privateEvent_DESC_NULLS_FIRST',
  PrivateEventDescNullsLast = 'privateEvent_DESC_NULLS_LAST',
  StartDateAsc = 'startDate_ASC',
  StartDateAscNullsFirst = 'startDate_ASC_NULLS_FIRST',
  StartDateAscNullsLast = 'startDate_ASC_NULLS_LAST',
  StartDateDesc = 'startDate_DESC',
  StartDateDescNullsFirst = 'startDate_DESC_NULLS_FIRST',
  StartDateDescNullsLast = 'startDate_DESC_NULLS_LAST',
  VirtualEventAsc = 'virtualEvent_ASC',
  VirtualEventAscNullsFirst = 'virtualEvent_ASC_NULLS_FIRST',
  VirtualEventAscNullsLast = 'virtualEvent_ASC_NULLS_LAST',
  VirtualEventDesc = 'virtualEvent_DESC',
  VirtualEventDescNullsFirst = 'virtualEvent_DESC_NULLS_FIRST',
  VirtualEventDescNullsLast = 'virtualEvent_DESC_NULLS_LAST',
  YearAsc = 'year_ASC',
  YearAscNullsFirst = 'year_ASC_NULLS_FIRST',
  YearAscNullsLast = 'year_ASC_NULLS_LAST',
  YearDesc = 'year_DESC',
  YearDescNullsFirst = 'year_DESC_NULLS_FIRST',
  YearDescNullsLast = 'year_DESC_NULLS_LAST'
}

export type PoapWhereInput = {
  AND?: InputMaybe<Array<PoapWhereInput>>;
  OR?: InputMaybe<Array<PoapWhereInput>>;
  animationUrl_contains?: InputMaybe<Scalars['String']['input']>;
  animationUrl_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  animationUrl_endsWith?: InputMaybe<Scalars['String']['input']>;
  animationUrl_eq?: InputMaybe<Scalars['String']['input']>;
  animationUrl_gt?: InputMaybe<Scalars['String']['input']>;
  animationUrl_gte?: InputMaybe<Scalars['String']['input']>;
  animationUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  animationUrl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  animationUrl_lt?: InputMaybe<Scalars['String']['input']>;
  animationUrl_lte?: InputMaybe<Scalars['String']['input']>;
  animationUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  animationUrl_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  animationUrl_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  animationUrl_not_eq?: InputMaybe<Scalars['String']['input']>;
  animationUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  animationUrl_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  animationUrl_startsWith?: InputMaybe<Scalars['String']['input']>;
  city_contains?: InputMaybe<Scalars['String']['input']>;
  city_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  city_endsWith?: InputMaybe<Scalars['String']['input']>;
  city_eq?: InputMaybe<Scalars['String']['input']>;
  city_gt?: InputMaybe<Scalars['String']['input']>;
  city_gte?: InputMaybe<Scalars['String']['input']>;
  city_in?: InputMaybe<Array<Scalars['String']['input']>>;
  city_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  city_lt?: InputMaybe<Scalars['String']['input']>;
  city_lte?: InputMaybe<Scalars['String']['input']>;
  city_not_contains?: InputMaybe<Scalars['String']['input']>;
  city_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  city_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  city_not_eq?: InputMaybe<Scalars['String']['input']>;
  city_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  city_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  city_startsWith?: InputMaybe<Scalars['String']['input']>;
  country_contains?: InputMaybe<Scalars['String']['input']>;
  country_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  country_endsWith?: InputMaybe<Scalars['String']['input']>;
  country_eq?: InputMaybe<Scalars['String']['input']>;
  country_gt?: InputMaybe<Scalars['String']['input']>;
  country_gte?: InputMaybe<Scalars['String']['input']>;
  country_in?: InputMaybe<Array<Scalars['String']['input']>>;
  country_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  country_lt?: InputMaybe<Scalars['String']['input']>;
  country_lte?: InputMaybe<Scalars['String']['input']>;
  country_not_contains?: InputMaybe<Scalars['String']['input']>;
  country_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  country_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  country_not_eq?: InputMaybe<Scalars['String']['input']>;
  country_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  country_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  country_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_eq?: InputMaybe<Scalars['String']['input']>;
  description_gt?: InputMaybe<Scalars['String']['input']>;
  description_gte?: InputMaybe<Scalars['String']['input']>;
  description_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  description_lt?: InputMaybe<Scalars['String']['input']>;
  description_lte?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  description_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  description_not_eq?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  description_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  description_startsWith?: InputMaybe<Scalars['String']['input']>;
  dropImageDropId_eq?: InputMaybe<Scalars['Int']['input']>;
  dropImageDropId_gt?: InputMaybe<Scalars['Int']['input']>;
  dropImageDropId_gte?: InputMaybe<Scalars['Int']['input']>;
  dropImageDropId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dropImageDropId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dropImageDropId_lt?: InputMaybe<Scalars['Int']['input']>;
  dropImageDropId_lte?: InputMaybe<Scalars['Int']['input']>;
  dropImageDropId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  dropImageDropId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  dropImagePublicId_contains?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_endsWith?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_eq?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_gt?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_gte?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dropImagePublicId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  dropImagePublicId_lt?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_lte?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_not_contains?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_not_eq?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  dropImagePublicId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  dropImagePublicId_startsWith?: InputMaybe<Scalars['String']['input']>;
  endDate_contains?: InputMaybe<Scalars['String']['input']>;
  endDate_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  endDate_endsWith?: InputMaybe<Scalars['String']['input']>;
  endDate_eq?: InputMaybe<Scalars['String']['input']>;
  endDate_gt?: InputMaybe<Scalars['String']['input']>;
  endDate_gte?: InputMaybe<Scalars['String']['input']>;
  endDate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_lt?: InputMaybe<Scalars['String']['input']>;
  endDate_lte?: InputMaybe<Scalars['String']['input']>;
  endDate_not_contains?: InputMaybe<Scalars['String']['input']>;
  endDate_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  endDate_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  endDate_not_eq?: InputMaybe<Scalars['String']['input']>;
  endDate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  endDate_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  endDate_startsWith?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<EventWhereInput>;
  eventTemplateId_eq?: InputMaybe<Scalars['Int']['input']>;
  eventTemplateId_gt?: InputMaybe<Scalars['Int']['input']>;
  eventTemplateId_gte?: InputMaybe<Scalars['Int']['input']>;
  eventTemplateId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventTemplateId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventTemplateId_lt?: InputMaybe<Scalars['Int']['input']>;
  eventTemplateId_lte?: InputMaybe<Scalars['Int']['input']>;
  eventTemplateId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  eventTemplateId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  eventUrl_contains?: InputMaybe<Scalars['String']['input']>;
  eventUrl_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  eventUrl_endsWith?: InputMaybe<Scalars['String']['input']>;
  eventUrl_eq?: InputMaybe<Scalars['String']['input']>;
  eventUrl_gt?: InputMaybe<Scalars['String']['input']>;
  eventUrl_gte?: InputMaybe<Scalars['String']['input']>;
  eventUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eventUrl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventUrl_lt?: InputMaybe<Scalars['String']['input']>;
  eventUrl_lte?: InputMaybe<Scalars['String']['input']>;
  eventUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  eventUrl_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  eventUrl_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  eventUrl_not_eq?: InputMaybe<Scalars['String']['input']>;
  eventUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  eventUrl_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  eventUrl_startsWith?: InputMaybe<Scalars['String']['input']>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expiryDate_contains?: InputMaybe<Scalars['String']['input']>;
  expiryDate_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  expiryDate_endsWith?: InputMaybe<Scalars['String']['input']>;
  expiryDate_eq?: InputMaybe<Scalars['String']['input']>;
  expiryDate_gt?: InputMaybe<Scalars['String']['input']>;
  expiryDate_gte?: InputMaybe<Scalars['String']['input']>;
  expiryDate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  expiryDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  expiryDate_lt?: InputMaybe<Scalars['String']['input']>;
  expiryDate_lte?: InputMaybe<Scalars['String']['input']>;
  expiryDate_not_contains?: InputMaybe<Scalars['String']['input']>;
  expiryDate_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  expiryDate_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  expiryDate_not_eq?: InputMaybe<Scalars['String']['input']>;
  expiryDate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  expiryDate_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  expiryDate_startsWith?: InputMaybe<Scalars['String']['input']>;
  fancyId_contains?: InputMaybe<Scalars['String']['input']>;
  fancyId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fancyId_endsWith?: InputMaybe<Scalars['String']['input']>;
  fancyId_eq?: InputMaybe<Scalars['String']['input']>;
  fancyId_gt?: InputMaybe<Scalars['String']['input']>;
  fancyId_gte?: InputMaybe<Scalars['String']['input']>;
  fancyId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fancyId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fancyId_lt?: InputMaybe<Scalars['String']['input']>;
  fancyId_lte?: InputMaybe<Scalars['String']['input']>;
  fancyId_not_contains?: InputMaybe<Scalars['String']['input']>;
  fancyId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  fancyId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  fancyId_not_eq?: InputMaybe<Scalars['String']['input']>;
  fancyId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  fancyId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  fancyId_startsWith?: InputMaybe<Scalars['String']['input']>;
  fromAdmin_eq?: InputMaybe<Scalars['Boolean']['input']>;
  fromAdmin_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  fromAdmin_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  imageUrl_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  imageUrl_endsWith?: InputMaybe<Scalars['String']['input']>;
  imageUrl_eq?: InputMaybe<Scalars['String']['input']>;
  imageUrl_gt?: InputMaybe<Scalars['String']['input']>;
  imageUrl_gte?: InputMaybe<Scalars['String']['input']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  imageUrl_lt?: InputMaybe<Scalars['String']['input']>;
  imageUrl_lte?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_eq?: InputMaybe<Scalars['String']['input']>;
  imageUrl_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  imageUrl_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  imageUrl_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  poapId_eq?: InputMaybe<Scalars['Int']['input']>;
  poapId_gt?: InputMaybe<Scalars['Int']['input']>;
  poapId_gte?: InputMaybe<Scalars['Int']['input']>;
  poapId_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  poapId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  poapId_lt?: InputMaybe<Scalars['Int']['input']>;
  poapId_lte?: InputMaybe<Scalars['Int']['input']>;
  poapId_not_eq?: InputMaybe<Scalars['Int']['input']>;
  poapId_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  privateEvent_eq?: InputMaybe<Scalars['Boolean']['input']>;
  privateEvent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  privateEvent_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_contains?: InputMaybe<Scalars['String']['input']>;
  startDate_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  startDate_endsWith?: InputMaybe<Scalars['String']['input']>;
  startDate_eq?: InputMaybe<Scalars['String']['input']>;
  startDate_gt?: InputMaybe<Scalars['String']['input']>;
  startDate_gte?: InputMaybe<Scalars['String']['input']>;
  startDate_in?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_lt?: InputMaybe<Scalars['String']['input']>;
  startDate_lte?: InputMaybe<Scalars['String']['input']>;
  startDate_not_contains?: InputMaybe<Scalars['String']['input']>;
  startDate_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  startDate_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  startDate_not_eq?: InputMaybe<Scalars['String']['input']>;
  startDate_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  startDate_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  startDate_startsWith?: InputMaybe<Scalars['String']['input']>;
  virtualEvent_eq?: InputMaybe<Scalars['Boolean']['input']>;
  virtualEvent_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  virtualEvent_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  year_eq?: InputMaybe<Scalars['Int']['input']>;
  year_gt?: InputMaybe<Scalars['Int']['input']>;
  year_gte?: InputMaybe<Scalars['Int']['input']>;
  year_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  year_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  year_lt?: InputMaybe<Scalars['Int']['input']>;
  year_lte?: InputMaybe<Scalars['Int']['input']>;
  year_not_eq?: InputMaybe<Scalars['Int']['input']>;
  year_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export type PoaPsConnection = {
  __typename?: 'POAPsConnection';
  edges: Array<PoapEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['BigInt']['output'];
  event: Event;
  id: Scalars['String']['output'];
  isRefunded: Scalars['Boolean']['output'];
  payer: Scalars['String']['output'];
  paymentDate: Scalars['BigInt']['output'];
  registration?: Maybe<Registration>;
  ticket?: Maybe<Ticket>;
  token: EventToken;
};

export type PaymentEdge = {
  __typename?: 'PaymentEdge';
  cursor: Scalars['String']['output'];
  node: Payment;
};

export enum PaymentOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountAscNullsFirst = 'amount_ASC_NULLS_FIRST',
  AmountAscNullsLast = 'amount_ASC_NULLS_LAST',
  AmountDesc = 'amount_DESC',
  AmountDescNullsFirst = 'amount_DESC_NULLS_FIRST',
  AmountDescNullsLast = 'amount_DESC_NULLS_LAST',
  EventCapacityAsc = 'event_capacity_ASC',
  EventCapacityAscNullsFirst = 'event_capacity_ASC_NULLS_FIRST',
  EventCapacityAscNullsLast = 'event_capacity_ASC_NULLS_LAST',
  EventCapacityDesc = 'event_capacity_DESC',
  EventCapacityDescNullsFirst = 'event_capacity_DESC_NULLS_FIRST',
  EventCapacityDescNullsLast = 'event_capacity_DESC_NULLS_LAST',
  EventCreatedAtAsc = 'event_createdAt_ASC',
  EventCreatedAtAscNullsFirst = 'event_createdAt_ASC_NULLS_FIRST',
  EventCreatedAtAscNullsLast = 'event_createdAt_ASC_NULLS_LAST',
  EventCreatedAtDesc = 'event_createdAt_DESC',
  EventCreatedAtDescNullsFirst = 'event_createdAt_DESC_NULLS_FIRST',
  EventCreatedAtDescNullsLast = 'event_createdAt_DESC_NULLS_LAST',
  EventEndDateAsc = 'event_endDate_ASC',
  EventEndDateAscNullsFirst = 'event_endDate_ASC_NULLS_FIRST',
  EventEndDateAscNullsLast = 'event_endDate_ASC_NULLS_LAST',
  EventEndDateDesc = 'event_endDate_DESC',
  EventEndDateDescNullsFirst = 'event_endDate_DESC_NULLS_FIRST',
  EventEndDateDescNullsLast = 'event_endDate_DESC_NULLS_LAST',
  EventEventIdAsc = 'event_eventId_ASC',
  EventEventIdAscNullsFirst = 'event_eventId_ASC_NULLS_FIRST',
  EventEventIdAscNullsLast = 'event_eventId_ASC_NULLS_LAST',
  EventEventIdDesc = 'event_eventId_DESC',
  EventEventIdDescNullsFirst = 'event_eventId_DESC_NULLS_FIRST',
  EventEventIdDescNullsLast = 'event_eventId_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIsActiveAsc = 'event_isActive_ASC',
  EventIsActiveAscNullsFirst = 'event_isActive_ASC_NULLS_FIRST',
  EventIsActiveAscNullsLast = 'event_isActive_ASC_NULLS_LAST',
  EventIsActiveDesc = 'event_isActive_DESC',
  EventIsActiveDescNullsFirst = 'event_isActive_DESC_NULLS_FIRST',
  EventIsActiveDescNullsLast = 'event_isActive_DESC_NULLS_LAST',
  EventIsPaidAsc = 'event_isPaid_ASC',
  EventIsPaidAscNullsFirst = 'event_isPaid_ASC_NULLS_FIRST',
  EventIsPaidAscNullsLast = 'event_isPaid_ASC_NULLS_LAST',
  EventIsPaidDesc = 'event_isPaid_DESC',
  EventIsPaidDescNullsFirst = 'event_isPaid_DESC_NULLS_FIRST',
  EventIsPaidDescNullsLast = 'event_isPaid_DESC_NULLS_LAST',
  EventMetadataHashAsc = 'event_metadataHash_ASC',
  EventMetadataHashAscNullsFirst = 'event_metadataHash_ASC_NULLS_FIRST',
  EventMetadataHashAscNullsLast = 'event_metadataHash_ASC_NULLS_LAST',
  EventMetadataHashDesc = 'event_metadataHash_DESC',
  EventMetadataHashDescNullsFirst = 'event_metadataHash_DESC_NULLS_FIRST',
  EventMetadataHashDescNullsLast = 'event_metadataHash_DESC_NULLS_LAST',
  EventOrganizerAsc = 'event_organizer_ASC',
  EventOrganizerAscNullsFirst = 'event_organizer_ASC_NULLS_FIRST',
  EventOrganizerAscNullsLast = 'event_organizer_ASC_NULLS_LAST',
  EventOrganizerDesc = 'event_organizer_DESC',
  EventOrganizerDescNullsFirst = 'event_organizer_DESC_NULLS_FIRST',
  EventOrganizerDescNullsLast = 'event_organizer_DESC_NULLS_LAST',
  EventRequiresApprovalAsc = 'event_requiresApproval_ASC',
  EventRequiresApprovalAscNullsFirst = 'event_requiresApproval_ASC_NULLS_FIRST',
  EventRequiresApprovalAscNullsLast = 'event_requiresApproval_ASC_NULLS_LAST',
  EventRequiresApprovalDesc = 'event_requiresApproval_DESC',
  EventRequiresApprovalDescNullsFirst = 'event_requiresApproval_DESC_NULLS_FIRST',
  EventRequiresApprovalDescNullsLast = 'event_requiresApproval_DESC_NULLS_LAST',
  EventStartDateAsc = 'event_startDate_ASC',
  EventStartDateAscNullsFirst = 'event_startDate_ASC_NULLS_FIRST',
  EventStartDateAscNullsLast = 'event_startDate_ASC_NULLS_LAST',
  EventStartDateDesc = 'event_startDate_DESC',
  EventStartDateDescNullsFirst = 'event_startDate_DESC_NULLS_FIRST',
  EventStartDateDescNullsLast = 'event_startDate_DESC_NULLS_LAST',
  EventUpdatedAtAsc = 'event_updatedAt_ASC',
  EventUpdatedAtAscNullsFirst = 'event_updatedAt_ASC_NULLS_FIRST',
  EventUpdatedAtAscNullsLast = 'event_updatedAt_ASC_NULLS_LAST',
  EventUpdatedAtDesc = 'event_updatedAt_DESC',
  EventUpdatedAtDescNullsFirst = 'event_updatedAt_DESC_NULLS_FIRST',
  EventUpdatedAtDescNullsLast = 'event_updatedAt_DESC_NULLS_LAST',
  EventVenueTypeAsc = 'event_venueType_ASC',
  EventVenueTypeAscNullsFirst = 'event_venueType_ASC_NULLS_FIRST',
  EventVenueTypeAscNullsLast = 'event_venueType_ASC_NULLS_LAST',
  EventVenueTypeDesc = 'event_venueType_DESC',
  EventVenueTypeDescNullsFirst = 'event_venueType_DESC_NULLS_FIRST',
  EventVenueTypeDescNullsLast = 'event_venueType_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsRefundedAsc = 'isRefunded_ASC',
  IsRefundedAscNullsFirst = 'isRefunded_ASC_NULLS_FIRST',
  IsRefundedAscNullsLast = 'isRefunded_ASC_NULLS_LAST',
  IsRefundedDesc = 'isRefunded_DESC',
  IsRefundedDescNullsFirst = 'isRefunded_DESC_NULLS_FIRST',
  IsRefundedDescNullsLast = 'isRefunded_DESC_NULLS_LAST',
  PayerAsc = 'payer_ASC',
  PayerAscNullsFirst = 'payer_ASC_NULLS_FIRST',
  PayerAscNullsLast = 'payer_ASC_NULLS_LAST',
  PayerDesc = 'payer_DESC',
  PayerDescNullsFirst = 'payer_DESC_NULLS_FIRST',
  PayerDescNullsLast = 'payer_DESC_NULLS_LAST',
  PaymentDateAsc = 'paymentDate_ASC',
  PaymentDateAscNullsFirst = 'paymentDate_ASC_NULLS_FIRST',
  PaymentDateAscNullsLast = 'paymentDate_ASC_NULLS_LAST',
  PaymentDateDesc = 'paymentDate_DESC',
  PaymentDateDescNullsFirst = 'paymentDate_DESC_NULLS_FIRST',
  PaymentDateDescNullsLast = 'paymentDate_DESC_NULLS_LAST',
  RegistrationApprovedAtAsc = 'registration_approvedAt_ASC',
  RegistrationApprovedAtAscNullsFirst = 'registration_approvedAt_ASC_NULLS_FIRST',
  RegistrationApprovedAtAscNullsLast = 'registration_approvedAt_ASC_NULLS_LAST',
  RegistrationApprovedAtDesc = 'registration_approvedAt_DESC',
  RegistrationApprovedAtDescNullsFirst = 'registration_approvedAt_DESC_NULLS_FIRST',
  RegistrationApprovedAtDescNullsLast = 'registration_approvedAt_DESC_NULLS_LAST',
  RegistrationApprovedAsc = 'registration_approved_ASC',
  RegistrationApprovedAscNullsFirst = 'registration_approved_ASC_NULLS_FIRST',
  RegistrationApprovedAscNullsLast = 'registration_approved_ASC_NULLS_LAST',
  RegistrationApprovedDesc = 'registration_approved_DESC',
  RegistrationApprovedDescNullsFirst = 'registration_approved_DESC_NULLS_FIRST',
  RegistrationApprovedDescNullsLast = 'registration_approved_DESC_NULLS_LAST',
  RegistrationAttendeeAsc = 'registration_attendee_ASC',
  RegistrationAttendeeAscNullsFirst = 'registration_attendee_ASC_NULLS_FIRST',
  RegistrationAttendeeAscNullsLast = 'registration_attendee_ASC_NULLS_LAST',
  RegistrationAttendeeDesc = 'registration_attendee_DESC',
  RegistrationAttendeeDescNullsFirst = 'registration_attendee_DESC_NULLS_FIRST',
  RegistrationAttendeeDescNullsLast = 'registration_attendee_DESC_NULLS_LAST',
  RegistrationIdAsc = 'registration_id_ASC',
  RegistrationIdAscNullsFirst = 'registration_id_ASC_NULLS_FIRST',
  RegistrationIdAscNullsLast = 'registration_id_ASC_NULLS_LAST',
  RegistrationIdDesc = 'registration_id_DESC',
  RegistrationIdDescNullsFirst = 'registration_id_DESC_NULLS_FIRST',
  RegistrationIdDescNullsLast = 'registration_id_DESC_NULLS_LAST',
  RegistrationRegisteredAtAsc = 'registration_registeredAt_ASC',
  RegistrationRegisteredAtAscNullsFirst = 'registration_registeredAt_ASC_NULLS_FIRST',
  RegistrationRegisteredAtAscNullsLast = 'registration_registeredAt_ASC_NULLS_LAST',
  RegistrationRegisteredAtDesc = 'registration_registeredAt_DESC',
  RegistrationRegisteredAtDescNullsFirst = 'registration_registeredAt_DESC_NULLS_FIRST',
  RegistrationRegisteredAtDescNullsLast = 'registration_registeredAt_DESC_NULLS_LAST',
  RegistrationStatusAsc = 'registration_status_ASC',
  RegistrationStatusAscNullsFirst = 'registration_status_ASC_NULLS_FIRST',
  RegistrationStatusAscNullsLast = 'registration_status_ASC_NULLS_LAST',
  RegistrationStatusDesc = 'registration_status_DESC',
  RegistrationStatusDescNullsFirst = 'registration_status_DESC_NULLS_FIRST',
  RegistrationStatusDescNullsLast = 'registration_status_DESC_NULLS_LAST',
  TicketAttendeeAsc = 'ticket_attendee_ASC',
  TicketAttendeeAscNullsFirst = 'ticket_attendee_ASC_NULLS_FIRST',
  TicketAttendeeAscNullsLast = 'ticket_attendee_ASC_NULLS_LAST',
  TicketAttendeeDesc = 'ticket_attendee_DESC',
  TicketAttendeeDescNullsFirst = 'ticket_attendee_DESC_NULLS_FIRST',
  TicketAttendeeDescNullsLast = 'ticket_attendee_DESC_NULLS_LAST',
  TicketCheckedInAtAsc = 'ticket_checkedInAt_ASC',
  TicketCheckedInAtAscNullsFirst = 'ticket_checkedInAt_ASC_NULLS_FIRST',
  TicketCheckedInAtAscNullsLast = 'ticket_checkedInAt_ASC_NULLS_LAST',
  TicketCheckedInAtDesc = 'ticket_checkedInAt_DESC',
  TicketCheckedInAtDescNullsFirst = 'ticket_checkedInAt_DESC_NULLS_FIRST',
  TicketCheckedInAtDescNullsLast = 'ticket_checkedInAt_DESC_NULLS_LAST',
  TicketIdAsc = 'ticket_id_ASC',
  TicketIdAscNullsFirst = 'ticket_id_ASC_NULLS_FIRST',
  TicketIdAscNullsLast = 'ticket_id_ASC_NULLS_LAST',
  TicketIdDesc = 'ticket_id_DESC',
  TicketIdDescNullsFirst = 'ticket_id_DESC_NULLS_FIRST',
  TicketIdDescNullsLast = 'ticket_id_DESC_NULLS_LAST',
  TicketIsUsedAsc = 'ticket_isUsed_ASC',
  TicketIsUsedAscNullsFirst = 'ticket_isUsed_ASC_NULLS_FIRST',
  TicketIsUsedAscNullsLast = 'ticket_isUsed_ASC_NULLS_LAST',
  TicketIsUsedDesc = 'ticket_isUsed_DESC',
  TicketIsUsedDescNullsFirst = 'ticket_isUsed_DESC_NULLS_FIRST',
  TicketIsUsedDescNullsLast = 'ticket_isUsed_DESC_NULLS_LAST',
  TicketIssuedAtAsc = 'ticket_issuedAt_ASC',
  TicketIssuedAtAscNullsFirst = 'ticket_issuedAt_ASC_NULLS_FIRST',
  TicketIssuedAtAscNullsLast = 'ticket_issuedAt_ASC_NULLS_LAST',
  TicketIssuedAtDesc = 'ticket_issuedAt_DESC',
  TicketIssuedAtDescNullsFirst = 'ticket_issuedAt_DESC_NULLS_FIRST',
  TicketIssuedAtDescNullsLast = 'ticket_issuedAt_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdAscNullsLast = 'token_id_ASC_NULLS_LAST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsFirst = 'token_id_DESC_NULLS_FIRST',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenPriceAsc = 'token_price_ASC',
  TokenPriceAscNullsFirst = 'token_price_ASC_NULLS_FIRST',
  TokenPriceAscNullsLast = 'token_price_ASC_NULLS_LAST',
  TokenPriceDesc = 'token_price_DESC',
  TokenPriceDescNullsFirst = 'token_price_DESC_NULLS_FIRST',
  TokenPriceDescNullsLast = 'token_price_DESC_NULLS_LAST',
  TokenTokenAddressAsc = 'token_tokenAddress_ASC',
  TokenTokenAddressAscNullsFirst = 'token_tokenAddress_ASC_NULLS_FIRST',
  TokenTokenAddressAscNullsLast = 'token_tokenAddress_ASC_NULLS_LAST',
  TokenTokenAddressDesc = 'token_tokenAddress_DESC',
  TokenTokenAddressDescNullsFirst = 'token_tokenAddress_DESC_NULLS_FIRST',
  TokenTokenAddressDescNullsLast = 'token_tokenAddress_DESC_NULLS_LAST'
}

export type PaymentWhereInput = {
  AND?: InputMaybe<Array<PaymentWhereInput>>;
  OR?: InputMaybe<Array<PaymentWhereInput>>;
  amount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  amount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  amount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  amount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isRefunded_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isRefunded_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isRefunded_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  payer_contains?: InputMaybe<Scalars['String']['input']>;
  payer_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  payer_endsWith?: InputMaybe<Scalars['String']['input']>;
  payer_eq?: InputMaybe<Scalars['String']['input']>;
  payer_gt?: InputMaybe<Scalars['String']['input']>;
  payer_gte?: InputMaybe<Scalars['String']['input']>;
  payer_in?: InputMaybe<Array<Scalars['String']['input']>>;
  payer_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  payer_lt?: InputMaybe<Scalars['String']['input']>;
  payer_lte?: InputMaybe<Scalars['String']['input']>;
  payer_not_contains?: InputMaybe<Scalars['String']['input']>;
  payer_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  payer_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  payer_not_eq?: InputMaybe<Scalars['String']['input']>;
  payer_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  payer_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  payer_startsWith?: InputMaybe<Scalars['String']['input']>;
  paymentDate_eq?: InputMaybe<Scalars['BigInt']['input']>;
  paymentDate_gt?: InputMaybe<Scalars['BigInt']['input']>;
  paymentDate_gte?: InputMaybe<Scalars['BigInt']['input']>;
  paymentDate_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  paymentDate_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  paymentDate_lt?: InputMaybe<Scalars['BigInt']['input']>;
  paymentDate_lte?: InputMaybe<Scalars['BigInt']['input']>;
  paymentDate_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  paymentDate_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  registration?: InputMaybe<RegistrationWhereInput>;
  registration_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  ticket?: InputMaybe<TicketWhereInput>;
  ticket_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token?: InputMaybe<EventTokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PaymentsConnection = {
  __typename?: 'PaymentsConnection';
  edges: Array<PaymentEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Profit = {
  __typename?: 'Profit';
  createdAt: Scalars['BigInt']['output'];
  eventId?: Maybe<Scalars['BigInt']['output']>;
  id: Scalars['String']['output'];
  profitAmount: Scalars['BigInt']['output'];
  recipient?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  type: Scalars['String']['output'];
  withdrawnAmount?: Maybe<Scalars['BigInt']['output']>;
  withdrawnAt?: Maybe<Scalars['BigInt']['output']>;
};

export type ProfitEdge = {
  __typename?: 'ProfitEdge';
  cursor: Scalars['String']['output'];
  node: Profit;
};

export enum ProfitOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtAscNullsFirst = 'createdAt_ASC_NULLS_FIRST',
  CreatedAtAscNullsLast = 'createdAt_ASC_NULLS_LAST',
  CreatedAtDesc = 'createdAt_DESC',
  CreatedAtDescNullsFirst = 'createdAt_DESC_NULLS_FIRST',
  CreatedAtDescNullsLast = 'createdAt_DESC_NULLS_LAST',
  EventIdAsc = 'eventId_ASC',
  EventIdAscNullsFirst = 'eventId_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'eventId_ASC_NULLS_LAST',
  EventIdDesc = 'eventId_DESC',
  EventIdDescNullsFirst = 'eventId_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'eventId_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProfitAmountAsc = 'profitAmount_ASC',
  ProfitAmountAscNullsFirst = 'profitAmount_ASC_NULLS_FIRST',
  ProfitAmountAscNullsLast = 'profitAmount_ASC_NULLS_LAST',
  ProfitAmountDesc = 'profitAmount_DESC',
  ProfitAmountDescNullsFirst = 'profitAmount_DESC_NULLS_FIRST',
  ProfitAmountDescNullsLast = 'profitAmount_DESC_NULLS_LAST',
  RecipientAsc = 'recipient_ASC',
  RecipientAscNullsFirst = 'recipient_ASC_NULLS_FIRST',
  RecipientAscNullsLast = 'recipient_ASC_NULLS_LAST',
  RecipientDesc = 'recipient_DESC',
  RecipientDescNullsFirst = 'recipient_DESC_NULLS_FIRST',
  RecipientDescNullsLast = 'recipient_DESC_NULLS_LAST',
  TokenAsc = 'token_ASC',
  TokenAscNullsFirst = 'token_ASC_NULLS_FIRST',
  TokenAscNullsLast = 'token_ASC_NULLS_LAST',
  TokenDesc = 'token_DESC',
  TokenDescNullsFirst = 'token_DESC_NULLS_FIRST',
  TokenDescNullsLast = 'token_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST',
  WithdrawnAmountAsc = 'withdrawnAmount_ASC',
  WithdrawnAmountAscNullsFirst = 'withdrawnAmount_ASC_NULLS_FIRST',
  WithdrawnAmountAscNullsLast = 'withdrawnAmount_ASC_NULLS_LAST',
  WithdrawnAmountDesc = 'withdrawnAmount_DESC',
  WithdrawnAmountDescNullsFirst = 'withdrawnAmount_DESC_NULLS_FIRST',
  WithdrawnAmountDescNullsLast = 'withdrawnAmount_DESC_NULLS_LAST',
  WithdrawnAtAsc = 'withdrawnAt_ASC',
  WithdrawnAtAscNullsFirst = 'withdrawnAt_ASC_NULLS_FIRST',
  WithdrawnAtAscNullsLast = 'withdrawnAt_ASC_NULLS_LAST',
  WithdrawnAtDesc = 'withdrawnAt_DESC',
  WithdrawnAtDescNullsFirst = 'withdrawnAt_DESC_NULLS_FIRST',
  WithdrawnAtDescNullsLast = 'withdrawnAt_DESC_NULLS_LAST'
}

export type ProfitWhereInput = {
  AND?: InputMaybe<Array<ProfitWhereInput>>;
  OR?: InputMaybe<Array<ProfitWhereInput>>;
  createdAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  createdAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  createdAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  createdAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventId_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_gt?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_gte?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  eventId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  eventId_lt?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_lte?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  eventId_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  profitAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  profitAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  profitAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  profitAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  profitAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  profitAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  profitAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  profitAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  profitAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  recipient_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recipient_endsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_eq?: InputMaybe<Scalars['String']['input']>;
  recipient_gt?: InputMaybe<Scalars['String']['input']>;
  recipient_gte?: InputMaybe<Scalars['String']['input']>;
  recipient_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  recipient_lt?: InputMaybe<Scalars['String']['input']>;
  recipient_lte?: InputMaybe<Scalars['String']['input']>;
  recipient_not_contains?: InputMaybe<Scalars['String']['input']>;
  recipient_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  recipient_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_not_eq?: InputMaybe<Scalars['String']['input']>;
  recipient_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  recipient_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  recipient_startsWith?: InputMaybe<Scalars['String']['input']>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_eq?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_not_eq?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_contains?: InputMaybe<Scalars['String']['input']>;
  type_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  type_endsWith?: InputMaybe<Scalars['String']['input']>;
  type_eq?: InputMaybe<Scalars['String']['input']>;
  type_gt?: InputMaybe<Scalars['String']['input']>;
  type_gte?: InputMaybe<Scalars['String']['input']>;
  type_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_lt?: InputMaybe<Scalars['String']['input']>;
  type_lte?: InputMaybe<Scalars['String']['input']>;
  type_not_contains?: InputMaybe<Scalars['String']['input']>;
  type_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  type_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  type_not_eq?: InputMaybe<Scalars['String']['input']>;
  type_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  type_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_startsWith?: InputMaybe<Scalars['String']['input']>;
  withdrawnAmount_eq?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnAmount_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawnAmount_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAmount_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  withdrawnAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  withdrawnAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  withdrawnAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type ProfitsConnection = {
  __typename?: 'ProfitsConnection';
  edges: Array<ProfitEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  eventById?: Maybe<Event>;
  eventMetadata: Array<EventMetadata>;
  eventMetadataById?: Maybe<EventMetadata>;
  eventMetadataConnection: EventMetadataConnection;
  eventTokenById?: Maybe<EventToken>;
  eventTokens: Array<EventToken>;
  eventTokensConnection: EventTokensConnection;
  events: Array<Event>;
  eventsConnection: EventsConnection;
  locationById?: Maybe<Location>;
  locations: Array<Location>;
  locationsConnection: LocationsConnection;
  paymentById?: Maybe<Payment>;
  payments: Array<Payment>;
  paymentsConnection: PaymentsConnection;
  poapById?: Maybe<Poap>;
  poaps: Array<Poap>;
  poapsConnection: PoaPsConnection;
  profitById?: Maybe<Profit>;
  profits: Array<Profit>;
  profitsConnection: ProfitsConnection;
  registrationById?: Maybe<Registration>;
  registrations: Array<Registration>;
  registrationsConnection: RegistrationsConnection;
  squidStatus?: Maybe<SquidStatus>;
  ticketById?: Maybe<Ticket>;
  tickets: Array<Ticket>;
  ticketsConnection: TicketsConnection;
  whitelistedTokenById?: Maybe<WhitelistedToken>;
  whitelistedTokens: Array<WhitelistedToken>;
  whitelistedTokensConnection: WhitelistedTokensConnection;
};


export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventMetadataArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventMetadataOrderByInput>>;
  where?: InputMaybe<EventMetadataWhereInput>;
};


export type QueryEventMetadataByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventMetadataConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventMetadataOrderByInput>;
  where?: InputMaybe<EventMetadataWhereInput>;
};


export type QueryEventTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventTokenOrderByInput>>;
  where?: InputMaybe<EventTokenWhereInput>;
};


export type QueryEventTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventTokenOrderByInput>;
  where?: InputMaybe<EventTokenWhereInput>;
};


export type QueryEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<EventOrderByInput>>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryEventsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<EventOrderByInput>;
  where?: InputMaybe<EventWhereInput>;
};


export type QueryLocationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryLocationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<LocationOrderByInput>>;
  where?: InputMaybe<LocationWhereInput>;
};


export type QueryLocationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<LocationOrderByInput>;
  where?: InputMaybe<LocationWhereInput>;
};


export type QueryPaymentByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPaymentsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PaymentOrderByInput>>;
  where?: InputMaybe<PaymentWhereInput>;
};


export type QueryPaymentsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<PaymentOrderByInput>;
  where?: InputMaybe<PaymentWhereInput>;
};


export type QueryPoapByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPoapsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<PoapOrderByInput>>;
  where?: InputMaybe<PoapWhereInput>;
};


export type QueryPoapsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<PoapOrderByInput>;
  where?: InputMaybe<PoapWhereInput>;
};


export type QueryProfitByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryProfitsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProfitOrderByInput>>;
  where?: InputMaybe<ProfitWhereInput>;
};


export type QueryProfitsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ProfitOrderByInput>;
  where?: InputMaybe<ProfitWhereInput>;
};


export type QueryRegistrationByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryRegistrationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<RegistrationOrderByInput>>;
  where?: InputMaybe<RegistrationWhereInput>;
};


export type QueryRegistrationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<RegistrationOrderByInput>;
  where?: InputMaybe<RegistrationWhereInput>;
};


export type QueryTicketByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTicketsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TicketOrderByInput>>;
  where?: InputMaybe<TicketWhereInput>;
};


export type QueryTicketsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TicketOrderByInput>;
  where?: InputMaybe<TicketWhereInput>;
};


export type QueryWhitelistedTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryWhitelistedTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<WhitelistedTokenOrderByInput>>;
  where?: InputMaybe<WhitelistedTokenWhereInput>;
};


export type QueryWhitelistedTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<WhitelistedTokenOrderByInput>;
  where?: InputMaybe<WhitelistedTokenWhereInput>;
};

export type Registration = {
  __typename?: 'Registration';
  approved?: Maybe<Scalars['Boolean']['output']>;
  approvedAt?: Maybe<Scalars['BigInt']['output']>;
  attendee: Scalars['String']['output'];
  event: Event;
  id: Scalars['String']['output'];
  registeredAt: Scalars['BigInt']['output'];
  status: RegistrationStatus;
  ticket?: Maybe<Ticket>;
};

export type RegistrationEdge = {
  __typename?: 'RegistrationEdge';
  cursor: Scalars['String']['output'];
  node: Registration;
};

export enum RegistrationOrderByInput {
  ApprovedAtAsc = 'approvedAt_ASC',
  ApprovedAtAscNullsFirst = 'approvedAt_ASC_NULLS_FIRST',
  ApprovedAtAscNullsLast = 'approvedAt_ASC_NULLS_LAST',
  ApprovedAtDesc = 'approvedAt_DESC',
  ApprovedAtDescNullsFirst = 'approvedAt_DESC_NULLS_FIRST',
  ApprovedAtDescNullsLast = 'approvedAt_DESC_NULLS_LAST',
  ApprovedAsc = 'approved_ASC',
  ApprovedAscNullsFirst = 'approved_ASC_NULLS_FIRST',
  ApprovedAscNullsLast = 'approved_ASC_NULLS_LAST',
  ApprovedDesc = 'approved_DESC',
  ApprovedDescNullsFirst = 'approved_DESC_NULLS_FIRST',
  ApprovedDescNullsLast = 'approved_DESC_NULLS_LAST',
  AttendeeAsc = 'attendee_ASC',
  AttendeeAscNullsFirst = 'attendee_ASC_NULLS_FIRST',
  AttendeeAscNullsLast = 'attendee_ASC_NULLS_LAST',
  AttendeeDesc = 'attendee_DESC',
  AttendeeDescNullsFirst = 'attendee_DESC_NULLS_FIRST',
  AttendeeDescNullsLast = 'attendee_DESC_NULLS_LAST',
  EventCapacityAsc = 'event_capacity_ASC',
  EventCapacityAscNullsFirst = 'event_capacity_ASC_NULLS_FIRST',
  EventCapacityAscNullsLast = 'event_capacity_ASC_NULLS_LAST',
  EventCapacityDesc = 'event_capacity_DESC',
  EventCapacityDescNullsFirst = 'event_capacity_DESC_NULLS_FIRST',
  EventCapacityDescNullsLast = 'event_capacity_DESC_NULLS_LAST',
  EventCreatedAtAsc = 'event_createdAt_ASC',
  EventCreatedAtAscNullsFirst = 'event_createdAt_ASC_NULLS_FIRST',
  EventCreatedAtAscNullsLast = 'event_createdAt_ASC_NULLS_LAST',
  EventCreatedAtDesc = 'event_createdAt_DESC',
  EventCreatedAtDescNullsFirst = 'event_createdAt_DESC_NULLS_FIRST',
  EventCreatedAtDescNullsLast = 'event_createdAt_DESC_NULLS_LAST',
  EventEndDateAsc = 'event_endDate_ASC',
  EventEndDateAscNullsFirst = 'event_endDate_ASC_NULLS_FIRST',
  EventEndDateAscNullsLast = 'event_endDate_ASC_NULLS_LAST',
  EventEndDateDesc = 'event_endDate_DESC',
  EventEndDateDescNullsFirst = 'event_endDate_DESC_NULLS_FIRST',
  EventEndDateDescNullsLast = 'event_endDate_DESC_NULLS_LAST',
  EventEventIdAsc = 'event_eventId_ASC',
  EventEventIdAscNullsFirst = 'event_eventId_ASC_NULLS_FIRST',
  EventEventIdAscNullsLast = 'event_eventId_ASC_NULLS_LAST',
  EventEventIdDesc = 'event_eventId_DESC',
  EventEventIdDescNullsFirst = 'event_eventId_DESC_NULLS_FIRST',
  EventEventIdDescNullsLast = 'event_eventId_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIsActiveAsc = 'event_isActive_ASC',
  EventIsActiveAscNullsFirst = 'event_isActive_ASC_NULLS_FIRST',
  EventIsActiveAscNullsLast = 'event_isActive_ASC_NULLS_LAST',
  EventIsActiveDesc = 'event_isActive_DESC',
  EventIsActiveDescNullsFirst = 'event_isActive_DESC_NULLS_FIRST',
  EventIsActiveDescNullsLast = 'event_isActive_DESC_NULLS_LAST',
  EventIsPaidAsc = 'event_isPaid_ASC',
  EventIsPaidAscNullsFirst = 'event_isPaid_ASC_NULLS_FIRST',
  EventIsPaidAscNullsLast = 'event_isPaid_ASC_NULLS_LAST',
  EventIsPaidDesc = 'event_isPaid_DESC',
  EventIsPaidDescNullsFirst = 'event_isPaid_DESC_NULLS_FIRST',
  EventIsPaidDescNullsLast = 'event_isPaid_DESC_NULLS_LAST',
  EventMetadataHashAsc = 'event_metadataHash_ASC',
  EventMetadataHashAscNullsFirst = 'event_metadataHash_ASC_NULLS_FIRST',
  EventMetadataHashAscNullsLast = 'event_metadataHash_ASC_NULLS_LAST',
  EventMetadataHashDesc = 'event_metadataHash_DESC',
  EventMetadataHashDescNullsFirst = 'event_metadataHash_DESC_NULLS_FIRST',
  EventMetadataHashDescNullsLast = 'event_metadataHash_DESC_NULLS_LAST',
  EventOrganizerAsc = 'event_organizer_ASC',
  EventOrganizerAscNullsFirst = 'event_organizer_ASC_NULLS_FIRST',
  EventOrganizerAscNullsLast = 'event_organizer_ASC_NULLS_LAST',
  EventOrganizerDesc = 'event_organizer_DESC',
  EventOrganizerDescNullsFirst = 'event_organizer_DESC_NULLS_FIRST',
  EventOrganizerDescNullsLast = 'event_organizer_DESC_NULLS_LAST',
  EventRequiresApprovalAsc = 'event_requiresApproval_ASC',
  EventRequiresApprovalAscNullsFirst = 'event_requiresApproval_ASC_NULLS_FIRST',
  EventRequiresApprovalAscNullsLast = 'event_requiresApproval_ASC_NULLS_LAST',
  EventRequiresApprovalDesc = 'event_requiresApproval_DESC',
  EventRequiresApprovalDescNullsFirst = 'event_requiresApproval_DESC_NULLS_FIRST',
  EventRequiresApprovalDescNullsLast = 'event_requiresApproval_DESC_NULLS_LAST',
  EventStartDateAsc = 'event_startDate_ASC',
  EventStartDateAscNullsFirst = 'event_startDate_ASC_NULLS_FIRST',
  EventStartDateAscNullsLast = 'event_startDate_ASC_NULLS_LAST',
  EventStartDateDesc = 'event_startDate_DESC',
  EventStartDateDescNullsFirst = 'event_startDate_DESC_NULLS_FIRST',
  EventStartDateDescNullsLast = 'event_startDate_DESC_NULLS_LAST',
  EventUpdatedAtAsc = 'event_updatedAt_ASC',
  EventUpdatedAtAscNullsFirst = 'event_updatedAt_ASC_NULLS_FIRST',
  EventUpdatedAtAscNullsLast = 'event_updatedAt_ASC_NULLS_LAST',
  EventUpdatedAtDesc = 'event_updatedAt_DESC',
  EventUpdatedAtDescNullsFirst = 'event_updatedAt_DESC_NULLS_FIRST',
  EventUpdatedAtDescNullsLast = 'event_updatedAt_DESC_NULLS_LAST',
  EventVenueTypeAsc = 'event_venueType_ASC',
  EventVenueTypeAscNullsFirst = 'event_venueType_ASC_NULLS_FIRST',
  EventVenueTypeAscNullsLast = 'event_venueType_ASC_NULLS_LAST',
  EventVenueTypeDesc = 'event_venueType_DESC',
  EventVenueTypeDescNullsFirst = 'event_venueType_DESC_NULLS_FIRST',
  EventVenueTypeDescNullsLast = 'event_venueType_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  RegisteredAtAsc = 'registeredAt_ASC',
  RegisteredAtAscNullsFirst = 'registeredAt_ASC_NULLS_FIRST',
  RegisteredAtAscNullsLast = 'registeredAt_ASC_NULLS_LAST',
  RegisteredAtDesc = 'registeredAt_DESC',
  RegisteredAtDescNullsFirst = 'registeredAt_DESC_NULLS_FIRST',
  RegisteredAtDescNullsLast = 'registeredAt_DESC_NULLS_LAST',
  StatusAsc = 'status_ASC',
  StatusAscNullsFirst = 'status_ASC_NULLS_FIRST',
  StatusAscNullsLast = 'status_ASC_NULLS_LAST',
  StatusDesc = 'status_DESC',
  StatusDescNullsFirst = 'status_DESC_NULLS_FIRST',
  StatusDescNullsLast = 'status_DESC_NULLS_LAST',
  TicketAttendeeAsc = 'ticket_attendee_ASC',
  TicketAttendeeAscNullsFirst = 'ticket_attendee_ASC_NULLS_FIRST',
  TicketAttendeeAscNullsLast = 'ticket_attendee_ASC_NULLS_LAST',
  TicketAttendeeDesc = 'ticket_attendee_DESC',
  TicketAttendeeDescNullsFirst = 'ticket_attendee_DESC_NULLS_FIRST',
  TicketAttendeeDescNullsLast = 'ticket_attendee_DESC_NULLS_LAST',
  TicketCheckedInAtAsc = 'ticket_checkedInAt_ASC',
  TicketCheckedInAtAscNullsFirst = 'ticket_checkedInAt_ASC_NULLS_FIRST',
  TicketCheckedInAtAscNullsLast = 'ticket_checkedInAt_ASC_NULLS_LAST',
  TicketCheckedInAtDesc = 'ticket_checkedInAt_DESC',
  TicketCheckedInAtDescNullsFirst = 'ticket_checkedInAt_DESC_NULLS_FIRST',
  TicketCheckedInAtDescNullsLast = 'ticket_checkedInAt_DESC_NULLS_LAST',
  TicketIdAsc = 'ticket_id_ASC',
  TicketIdAscNullsFirst = 'ticket_id_ASC_NULLS_FIRST',
  TicketIdAscNullsLast = 'ticket_id_ASC_NULLS_LAST',
  TicketIdDesc = 'ticket_id_DESC',
  TicketIdDescNullsFirst = 'ticket_id_DESC_NULLS_FIRST',
  TicketIdDescNullsLast = 'ticket_id_DESC_NULLS_LAST',
  TicketIsUsedAsc = 'ticket_isUsed_ASC',
  TicketIsUsedAscNullsFirst = 'ticket_isUsed_ASC_NULLS_FIRST',
  TicketIsUsedAscNullsLast = 'ticket_isUsed_ASC_NULLS_LAST',
  TicketIsUsedDesc = 'ticket_isUsed_DESC',
  TicketIsUsedDescNullsFirst = 'ticket_isUsed_DESC_NULLS_FIRST',
  TicketIsUsedDescNullsLast = 'ticket_isUsed_DESC_NULLS_LAST',
  TicketIssuedAtAsc = 'ticket_issuedAt_ASC',
  TicketIssuedAtAscNullsFirst = 'ticket_issuedAt_ASC_NULLS_FIRST',
  TicketIssuedAtAscNullsLast = 'ticket_issuedAt_ASC_NULLS_LAST',
  TicketIssuedAtDesc = 'ticket_issuedAt_DESC',
  TicketIssuedAtDescNullsFirst = 'ticket_issuedAt_DESC_NULLS_FIRST',
  TicketIssuedAtDescNullsLast = 'ticket_issuedAt_DESC_NULLS_LAST'
}

export enum RegistrationStatus {
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  None = 'NONE',
  Pending = 'PENDING'
}

export type RegistrationWhereInput = {
  AND?: InputMaybe<Array<RegistrationWhereInput>>;
  OR?: InputMaybe<Array<RegistrationWhereInput>>;
  approvedAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  approvedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  approvedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  approvedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  approvedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  approvedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  approvedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  approvedAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  approvedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  approved_eq?: InputMaybe<Scalars['Boolean']['input']>;
  approved_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  approved_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  attendee_contains?: InputMaybe<Scalars['String']['input']>;
  attendee_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  attendee_endsWith?: InputMaybe<Scalars['String']['input']>;
  attendee_eq?: InputMaybe<Scalars['String']['input']>;
  attendee_gt?: InputMaybe<Scalars['String']['input']>;
  attendee_gte?: InputMaybe<Scalars['String']['input']>;
  attendee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attendee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  attendee_lt?: InputMaybe<Scalars['String']['input']>;
  attendee_lte?: InputMaybe<Scalars['String']['input']>;
  attendee_not_contains?: InputMaybe<Scalars['String']['input']>;
  attendee_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  attendee_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  attendee_not_eq?: InputMaybe<Scalars['String']['input']>;
  attendee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attendee_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  attendee_startsWith?: InputMaybe<Scalars['String']['input']>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  registeredAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  registeredAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  registeredAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  registeredAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  registeredAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  registeredAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  registeredAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  registeredAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  registeredAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  status_eq?: InputMaybe<RegistrationStatus>;
  status_in?: InputMaybe<Array<RegistrationStatus>>;
  status_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  status_not_eq?: InputMaybe<RegistrationStatus>;
  status_not_in?: InputMaybe<Array<RegistrationStatus>>;
  ticket?: InputMaybe<TicketWhereInput>;
  ticket_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type RegistrationsConnection = {
  __typename?: 'RegistrationsConnection';
  edges: Array<RegistrationEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The hash of the last processed finalized block */
  finalizedHash?: Maybe<Scalars['String']['output']>;
  /** The height of the last processed finalized block */
  finalizedHeight?: Maybe<Scalars['Int']['output']>;
  /** The hash of the last processed block */
  hash?: Maybe<Scalars['String']['output']>;
  /** The height of the last processed block */
  height?: Maybe<Scalars['Int']['output']>;
};

export type Ticket = {
  __typename?: 'Ticket';
  attendee: Scalars['String']['output'];
  checkedInAt?: Maybe<Scalars['BigInt']['output']>;
  event: Event;
  id: Scalars['String']['output'];
  isUsed: Scalars['Boolean']['output'];
  issuedAt: Scalars['BigInt']['output'];
  payment?: Maybe<Payment>;
  registration?: Maybe<Registration>;
};

export type TicketEdge = {
  __typename?: 'TicketEdge';
  cursor: Scalars['String']['output'];
  node: Ticket;
};

export enum TicketOrderByInput {
  AttendeeAsc = 'attendee_ASC',
  AttendeeAscNullsFirst = 'attendee_ASC_NULLS_FIRST',
  AttendeeAscNullsLast = 'attendee_ASC_NULLS_LAST',
  AttendeeDesc = 'attendee_DESC',
  AttendeeDescNullsFirst = 'attendee_DESC_NULLS_FIRST',
  AttendeeDescNullsLast = 'attendee_DESC_NULLS_LAST',
  CheckedInAtAsc = 'checkedInAt_ASC',
  CheckedInAtAscNullsFirst = 'checkedInAt_ASC_NULLS_FIRST',
  CheckedInAtAscNullsLast = 'checkedInAt_ASC_NULLS_LAST',
  CheckedInAtDesc = 'checkedInAt_DESC',
  CheckedInAtDescNullsFirst = 'checkedInAt_DESC_NULLS_FIRST',
  CheckedInAtDescNullsLast = 'checkedInAt_DESC_NULLS_LAST',
  EventCapacityAsc = 'event_capacity_ASC',
  EventCapacityAscNullsFirst = 'event_capacity_ASC_NULLS_FIRST',
  EventCapacityAscNullsLast = 'event_capacity_ASC_NULLS_LAST',
  EventCapacityDesc = 'event_capacity_DESC',
  EventCapacityDescNullsFirst = 'event_capacity_DESC_NULLS_FIRST',
  EventCapacityDescNullsLast = 'event_capacity_DESC_NULLS_LAST',
  EventCreatedAtAsc = 'event_createdAt_ASC',
  EventCreatedAtAscNullsFirst = 'event_createdAt_ASC_NULLS_FIRST',
  EventCreatedAtAscNullsLast = 'event_createdAt_ASC_NULLS_LAST',
  EventCreatedAtDesc = 'event_createdAt_DESC',
  EventCreatedAtDescNullsFirst = 'event_createdAt_DESC_NULLS_FIRST',
  EventCreatedAtDescNullsLast = 'event_createdAt_DESC_NULLS_LAST',
  EventEndDateAsc = 'event_endDate_ASC',
  EventEndDateAscNullsFirst = 'event_endDate_ASC_NULLS_FIRST',
  EventEndDateAscNullsLast = 'event_endDate_ASC_NULLS_LAST',
  EventEndDateDesc = 'event_endDate_DESC',
  EventEndDateDescNullsFirst = 'event_endDate_DESC_NULLS_FIRST',
  EventEndDateDescNullsLast = 'event_endDate_DESC_NULLS_LAST',
  EventEventIdAsc = 'event_eventId_ASC',
  EventEventIdAscNullsFirst = 'event_eventId_ASC_NULLS_FIRST',
  EventEventIdAscNullsLast = 'event_eventId_ASC_NULLS_LAST',
  EventEventIdDesc = 'event_eventId_DESC',
  EventEventIdDescNullsFirst = 'event_eventId_DESC_NULLS_FIRST',
  EventEventIdDescNullsLast = 'event_eventId_DESC_NULLS_LAST',
  EventIdAsc = 'event_id_ASC',
  EventIdAscNullsFirst = 'event_id_ASC_NULLS_FIRST',
  EventIdAscNullsLast = 'event_id_ASC_NULLS_LAST',
  EventIdDesc = 'event_id_DESC',
  EventIdDescNullsFirst = 'event_id_DESC_NULLS_FIRST',
  EventIdDescNullsLast = 'event_id_DESC_NULLS_LAST',
  EventIsActiveAsc = 'event_isActive_ASC',
  EventIsActiveAscNullsFirst = 'event_isActive_ASC_NULLS_FIRST',
  EventIsActiveAscNullsLast = 'event_isActive_ASC_NULLS_LAST',
  EventIsActiveDesc = 'event_isActive_DESC',
  EventIsActiveDescNullsFirst = 'event_isActive_DESC_NULLS_FIRST',
  EventIsActiveDescNullsLast = 'event_isActive_DESC_NULLS_LAST',
  EventIsPaidAsc = 'event_isPaid_ASC',
  EventIsPaidAscNullsFirst = 'event_isPaid_ASC_NULLS_FIRST',
  EventIsPaidAscNullsLast = 'event_isPaid_ASC_NULLS_LAST',
  EventIsPaidDesc = 'event_isPaid_DESC',
  EventIsPaidDescNullsFirst = 'event_isPaid_DESC_NULLS_FIRST',
  EventIsPaidDescNullsLast = 'event_isPaid_DESC_NULLS_LAST',
  EventMetadataHashAsc = 'event_metadataHash_ASC',
  EventMetadataHashAscNullsFirst = 'event_metadataHash_ASC_NULLS_FIRST',
  EventMetadataHashAscNullsLast = 'event_metadataHash_ASC_NULLS_LAST',
  EventMetadataHashDesc = 'event_metadataHash_DESC',
  EventMetadataHashDescNullsFirst = 'event_metadataHash_DESC_NULLS_FIRST',
  EventMetadataHashDescNullsLast = 'event_metadataHash_DESC_NULLS_LAST',
  EventOrganizerAsc = 'event_organizer_ASC',
  EventOrganizerAscNullsFirst = 'event_organizer_ASC_NULLS_FIRST',
  EventOrganizerAscNullsLast = 'event_organizer_ASC_NULLS_LAST',
  EventOrganizerDesc = 'event_organizer_DESC',
  EventOrganizerDescNullsFirst = 'event_organizer_DESC_NULLS_FIRST',
  EventOrganizerDescNullsLast = 'event_organizer_DESC_NULLS_LAST',
  EventRequiresApprovalAsc = 'event_requiresApproval_ASC',
  EventRequiresApprovalAscNullsFirst = 'event_requiresApproval_ASC_NULLS_FIRST',
  EventRequiresApprovalAscNullsLast = 'event_requiresApproval_ASC_NULLS_LAST',
  EventRequiresApprovalDesc = 'event_requiresApproval_DESC',
  EventRequiresApprovalDescNullsFirst = 'event_requiresApproval_DESC_NULLS_FIRST',
  EventRequiresApprovalDescNullsLast = 'event_requiresApproval_DESC_NULLS_LAST',
  EventStartDateAsc = 'event_startDate_ASC',
  EventStartDateAscNullsFirst = 'event_startDate_ASC_NULLS_FIRST',
  EventStartDateAscNullsLast = 'event_startDate_ASC_NULLS_LAST',
  EventStartDateDesc = 'event_startDate_DESC',
  EventStartDateDescNullsFirst = 'event_startDate_DESC_NULLS_FIRST',
  EventStartDateDescNullsLast = 'event_startDate_DESC_NULLS_LAST',
  EventUpdatedAtAsc = 'event_updatedAt_ASC',
  EventUpdatedAtAscNullsFirst = 'event_updatedAt_ASC_NULLS_FIRST',
  EventUpdatedAtAscNullsLast = 'event_updatedAt_ASC_NULLS_LAST',
  EventUpdatedAtDesc = 'event_updatedAt_DESC',
  EventUpdatedAtDescNullsFirst = 'event_updatedAt_DESC_NULLS_FIRST',
  EventUpdatedAtDescNullsLast = 'event_updatedAt_DESC_NULLS_LAST',
  EventVenueTypeAsc = 'event_venueType_ASC',
  EventVenueTypeAscNullsFirst = 'event_venueType_ASC_NULLS_FIRST',
  EventVenueTypeAscNullsLast = 'event_venueType_ASC_NULLS_LAST',
  EventVenueTypeDesc = 'event_venueType_DESC',
  EventVenueTypeDescNullsFirst = 'event_venueType_DESC_NULLS_FIRST',
  EventVenueTypeDescNullsLast = 'event_venueType_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsUsedAsc = 'isUsed_ASC',
  IsUsedAscNullsFirst = 'isUsed_ASC_NULLS_FIRST',
  IsUsedAscNullsLast = 'isUsed_ASC_NULLS_LAST',
  IsUsedDesc = 'isUsed_DESC',
  IsUsedDescNullsFirst = 'isUsed_DESC_NULLS_FIRST',
  IsUsedDescNullsLast = 'isUsed_DESC_NULLS_LAST',
  IssuedAtAsc = 'issuedAt_ASC',
  IssuedAtAscNullsFirst = 'issuedAt_ASC_NULLS_FIRST',
  IssuedAtAscNullsLast = 'issuedAt_ASC_NULLS_LAST',
  IssuedAtDesc = 'issuedAt_DESC',
  IssuedAtDescNullsFirst = 'issuedAt_DESC_NULLS_FIRST',
  IssuedAtDescNullsLast = 'issuedAt_DESC_NULLS_LAST',
  PaymentAmountAsc = 'payment_amount_ASC',
  PaymentAmountAscNullsFirst = 'payment_amount_ASC_NULLS_FIRST',
  PaymentAmountAscNullsLast = 'payment_amount_ASC_NULLS_LAST',
  PaymentAmountDesc = 'payment_amount_DESC',
  PaymentAmountDescNullsFirst = 'payment_amount_DESC_NULLS_FIRST',
  PaymentAmountDescNullsLast = 'payment_amount_DESC_NULLS_LAST',
  PaymentIdAsc = 'payment_id_ASC',
  PaymentIdAscNullsFirst = 'payment_id_ASC_NULLS_FIRST',
  PaymentIdAscNullsLast = 'payment_id_ASC_NULLS_LAST',
  PaymentIdDesc = 'payment_id_DESC',
  PaymentIdDescNullsFirst = 'payment_id_DESC_NULLS_FIRST',
  PaymentIdDescNullsLast = 'payment_id_DESC_NULLS_LAST',
  PaymentIsRefundedAsc = 'payment_isRefunded_ASC',
  PaymentIsRefundedAscNullsFirst = 'payment_isRefunded_ASC_NULLS_FIRST',
  PaymentIsRefundedAscNullsLast = 'payment_isRefunded_ASC_NULLS_LAST',
  PaymentIsRefundedDesc = 'payment_isRefunded_DESC',
  PaymentIsRefundedDescNullsFirst = 'payment_isRefunded_DESC_NULLS_FIRST',
  PaymentIsRefundedDescNullsLast = 'payment_isRefunded_DESC_NULLS_LAST',
  PaymentPayerAsc = 'payment_payer_ASC',
  PaymentPayerAscNullsFirst = 'payment_payer_ASC_NULLS_FIRST',
  PaymentPayerAscNullsLast = 'payment_payer_ASC_NULLS_LAST',
  PaymentPayerDesc = 'payment_payer_DESC',
  PaymentPayerDescNullsFirst = 'payment_payer_DESC_NULLS_FIRST',
  PaymentPayerDescNullsLast = 'payment_payer_DESC_NULLS_LAST',
  PaymentPaymentDateAsc = 'payment_paymentDate_ASC',
  PaymentPaymentDateAscNullsFirst = 'payment_paymentDate_ASC_NULLS_FIRST',
  PaymentPaymentDateAscNullsLast = 'payment_paymentDate_ASC_NULLS_LAST',
  PaymentPaymentDateDesc = 'payment_paymentDate_DESC',
  PaymentPaymentDateDescNullsFirst = 'payment_paymentDate_DESC_NULLS_FIRST',
  PaymentPaymentDateDescNullsLast = 'payment_paymentDate_DESC_NULLS_LAST',
  RegistrationApprovedAtAsc = 'registration_approvedAt_ASC',
  RegistrationApprovedAtAscNullsFirst = 'registration_approvedAt_ASC_NULLS_FIRST',
  RegistrationApprovedAtAscNullsLast = 'registration_approvedAt_ASC_NULLS_LAST',
  RegistrationApprovedAtDesc = 'registration_approvedAt_DESC',
  RegistrationApprovedAtDescNullsFirst = 'registration_approvedAt_DESC_NULLS_FIRST',
  RegistrationApprovedAtDescNullsLast = 'registration_approvedAt_DESC_NULLS_LAST',
  RegistrationApprovedAsc = 'registration_approved_ASC',
  RegistrationApprovedAscNullsFirst = 'registration_approved_ASC_NULLS_FIRST',
  RegistrationApprovedAscNullsLast = 'registration_approved_ASC_NULLS_LAST',
  RegistrationApprovedDesc = 'registration_approved_DESC',
  RegistrationApprovedDescNullsFirst = 'registration_approved_DESC_NULLS_FIRST',
  RegistrationApprovedDescNullsLast = 'registration_approved_DESC_NULLS_LAST',
  RegistrationAttendeeAsc = 'registration_attendee_ASC',
  RegistrationAttendeeAscNullsFirst = 'registration_attendee_ASC_NULLS_FIRST',
  RegistrationAttendeeAscNullsLast = 'registration_attendee_ASC_NULLS_LAST',
  RegistrationAttendeeDesc = 'registration_attendee_DESC',
  RegistrationAttendeeDescNullsFirst = 'registration_attendee_DESC_NULLS_FIRST',
  RegistrationAttendeeDescNullsLast = 'registration_attendee_DESC_NULLS_LAST',
  RegistrationIdAsc = 'registration_id_ASC',
  RegistrationIdAscNullsFirst = 'registration_id_ASC_NULLS_FIRST',
  RegistrationIdAscNullsLast = 'registration_id_ASC_NULLS_LAST',
  RegistrationIdDesc = 'registration_id_DESC',
  RegistrationIdDescNullsFirst = 'registration_id_DESC_NULLS_FIRST',
  RegistrationIdDescNullsLast = 'registration_id_DESC_NULLS_LAST',
  RegistrationRegisteredAtAsc = 'registration_registeredAt_ASC',
  RegistrationRegisteredAtAscNullsFirst = 'registration_registeredAt_ASC_NULLS_FIRST',
  RegistrationRegisteredAtAscNullsLast = 'registration_registeredAt_ASC_NULLS_LAST',
  RegistrationRegisteredAtDesc = 'registration_registeredAt_DESC',
  RegistrationRegisteredAtDescNullsFirst = 'registration_registeredAt_DESC_NULLS_FIRST',
  RegistrationRegisteredAtDescNullsLast = 'registration_registeredAt_DESC_NULLS_LAST',
  RegistrationStatusAsc = 'registration_status_ASC',
  RegistrationStatusAscNullsFirst = 'registration_status_ASC_NULLS_FIRST',
  RegistrationStatusAscNullsLast = 'registration_status_ASC_NULLS_LAST',
  RegistrationStatusDesc = 'registration_status_DESC',
  RegistrationStatusDescNullsFirst = 'registration_status_DESC_NULLS_FIRST',
  RegistrationStatusDescNullsLast = 'registration_status_DESC_NULLS_LAST'
}

export type TicketWhereInput = {
  AND?: InputMaybe<Array<TicketWhereInput>>;
  OR?: InputMaybe<Array<TicketWhereInput>>;
  attendee_contains?: InputMaybe<Scalars['String']['input']>;
  attendee_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  attendee_endsWith?: InputMaybe<Scalars['String']['input']>;
  attendee_eq?: InputMaybe<Scalars['String']['input']>;
  attendee_gt?: InputMaybe<Scalars['String']['input']>;
  attendee_gte?: InputMaybe<Scalars['String']['input']>;
  attendee_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attendee_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  attendee_lt?: InputMaybe<Scalars['String']['input']>;
  attendee_lte?: InputMaybe<Scalars['String']['input']>;
  attendee_not_contains?: InputMaybe<Scalars['String']['input']>;
  attendee_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  attendee_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  attendee_not_eq?: InputMaybe<Scalars['String']['input']>;
  attendee_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  attendee_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  attendee_startsWith?: InputMaybe<Scalars['String']['input']>;
  checkedInAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  checkedInAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  checkedInAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  checkedInAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  checkedInAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  checkedInAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  checkedInAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  checkedInAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  checkedInAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  event?: InputMaybe<EventWhereInput>;
  event_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isUsed_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isUsed_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isUsed_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  issuedAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  issuedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  issuedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  issuedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  issuedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  issuedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  issuedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  issuedAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  issuedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  payment?: InputMaybe<PaymentWhereInput>;
  payment_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  registration?: InputMaybe<RegistrationWhereInput>;
  registration_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type TicketsConnection = {
  __typename?: 'TicketsConnection';
  edges: Array<TicketEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type WhitelistedToken = {
  __typename?: 'WhitelistedToken';
  id: Scalars['String']['output'];
  isWhitelisted: Scalars['Boolean']['output'];
  tokenAddress: Scalars['String']['output'];
  updatedAt: Scalars['BigInt']['output'];
};

export type WhitelistedTokenEdge = {
  __typename?: 'WhitelistedTokenEdge';
  cursor: Scalars['String']['output'];
  node: WhitelistedToken;
};

export enum WhitelistedTokenOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  IsWhitelistedAsc = 'isWhitelisted_ASC',
  IsWhitelistedAscNullsFirst = 'isWhitelisted_ASC_NULLS_FIRST',
  IsWhitelistedAscNullsLast = 'isWhitelisted_ASC_NULLS_LAST',
  IsWhitelistedDesc = 'isWhitelisted_DESC',
  IsWhitelistedDescNullsFirst = 'isWhitelisted_DESC_NULLS_FIRST',
  IsWhitelistedDescNullsLast = 'isWhitelisted_DESC_NULLS_LAST',
  TokenAddressAsc = 'tokenAddress_ASC',
  TokenAddressAscNullsFirst = 'tokenAddress_ASC_NULLS_FIRST',
  TokenAddressAscNullsLast = 'tokenAddress_ASC_NULLS_LAST',
  TokenAddressDesc = 'tokenAddress_DESC',
  TokenAddressDescNullsFirst = 'tokenAddress_DESC_NULLS_FIRST',
  TokenAddressDescNullsLast = 'tokenAddress_DESC_NULLS_LAST',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtAscNullsFirst = 'updatedAt_ASC_NULLS_FIRST',
  UpdatedAtAscNullsLast = 'updatedAt_ASC_NULLS_LAST',
  UpdatedAtDesc = 'updatedAt_DESC',
  UpdatedAtDescNullsFirst = 'updatedAt_DESC_NULLS_FIRST',
  UpdatedAtDescNullsLast = 'updatedAt_DESC_NULLS_LAST'
}

export type WhitelistedTokenWhereInput = {
  AND?: InputMaybe<Array<WhitelistedTokenWhereInput>>;
  OR?: InputMaybe<Array<WhitelistedTokenWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  isWhitelisted_eq?: InputMaybe<Scalars['Boolean']['input']>;
  isWhitelisted_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  isWhitelisted_not_eq?: InputMaybe<Scalars['Boolean']['input']>;
  tokenAddress_contains?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_eq?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
  updatedAt_eq?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_gte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  updatedAt_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  updatedAt_lt?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_lte?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  updatedAt_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
};

export type WhitelistedTokensConnection = {
  __typename?: 'WhitelistedTokensConnection';
  edges: Array<WhitelistedTokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type GetEventByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', id: string, eventId: any, metadataHash: string, isPaid: boolean, isActive: boolean, capacity: any, organizer: string, startDate: any, endDate: any, venueType: string, requiresApproval: boolean, metadata?: { __typename?: 'EventMetadata', title: string, description: string, image?: string | null, virtualLink?: string | null, location?: { __typename?: 'Location', id: string, name: string, address?: string | null, placeId?: string | null, latitude: string, longitude: string } | null } | null, tickets: Array<{ __typename?: 'Ticket', id: string, isUsed: boolean, checkedInAt?: any | null, attendee: string, issuedAt: any, payment?: { __typename?: 'Payment', amount: any, payer: string, token: { __typename?: 'EventToken', id: string, tokenAddress: string } } | null, registration?: { __typename?: 'Registration', id: string, attendee: string, approved?: boolean | null, approvedAt?: any | null, registeredAt: any } | null }>, paymentTokens: Array<{ __typename?: 'EventToken', tokenAddress: string, price: any }>, payments: Array<{ __typename?: 'Payment', amount: any }>, registrations: Array<{ __typename?: 'Registration', id: string, attendee: string, approved?: boolean | null, approvedAt?: any | null, registeredAt: any, ticket?: { __typename?: 'Ticket', id: string, payment?: { __typename?: 'Payment', amount: any, payer: string, token: { __typename?: 'EventToken', id: string, tokenAddress: string } } | null } | null }> } | null };

export type GetEventGuestsQueryVariables = Exact<{
  id: Scalars['String']['input'];
  registrationsFilter?: InputMaybe<RegistrationWhereInput>;
  paymentFilter?: InputMaybe<PaymentWhereInput>;
}>;


export type GetEventGuestsQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', id: string, eventId: any, isPaid: boolean, capacity: any, requiresApproval: boolean, metadata?: { __typename?: 'EventMetadata', title: string, image?: string | null, description: string } | null, tickets: Array<{ __typename?: 'Ticket', id: string, attendee: string, issuedAt: any, payment?: { __typename?: 'Payment', id: string, amount: any, payer: string, isRefunded: boolean, paymentDate: any, token: { __typename?: 'EventToken', id: string, price: any, tokenAddress: string }, registration?: { __typename?: 'Registration', id: string } | null } | null, registration?: { __typename?: 'Registration', id: string, approved?: boolean | null, approvedAt?: any | null, registeredAt: any } | null }>, registrations: Array<{ __typename?: 'Registration', id: string, approved?: boolean | null, attendee: string, registeredAt: any }>, payments: Array<{ __typename?: 'Payment', id: string, amount: any, payer: string, isRefunded: boolean, paymentDate: any, token: { __typename?: 'EventToken', id: string, price: any, tokenAddress: string }, registration?: { __typename?: 'Registration', id: string } | null }> } | null };

export type GetEventPoapsQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type GetEventPoapsQuery = { __typename?: 'Query', eventById?: { __typename?: 'Event', id: string, eventId: any, metadata?: { __typename?: 'EventMetadata', title: string, description: string } | null, poaps: Array<{ __typename?: 'POAP', id: string, poapId: number, fancyId: string, name: string, description: string, animationUrl?: string | null, imageUrl?: string | null, startDate?: string | null, endDate?: string | null, eventUrl?: string | null, city?: string | null, country?: string | null }> } | null };

export type GetUserEventsStatsQueryVariables = Exact<{
  orderBy: Array<EventOrderByInput> | EventOrderByInput;
  where?: InputMaybe<EventWhereInput>;
}>;


export type GetUserEventsStatsQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number } };

export type GetUserEventsQueryVariables = Exact<{
  orderBy: Array<EventOrderByInput> | EventOrderByInput;
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<EventWhereInput>;
}>;


export type GetUserEventsQuery = { __typename?: 'Query', eventsConnection: { __typename?: 'EventsConnection', totalCount: number, edges: Array<{ __typename?: 'EventEdge', cursor: string, node: { __typename?: 'Event', id: string, eventId: any, metadataHash: string, isPaid: boolean, organizer: string, startDate: any, endDate: any, metadata?: { __typename?: 'EventMetadata', title: string, description: string, image?: string | null, virtualLink?: string | null, location?: { __typename?: 'Location', id: string, name: string, address?: string | null, placeId?: string | null, latitude: string, longitude: string } | null } | null, tickets: Array<{ __typename?: 'Ticket', id: string, attendee: string, issuedAt: any, payment?: { __typename?: 'Payment', amount: any, payer: string, token: { __typename?: 'EventToken', id: string, tokenAddress: string } } | null, registration?: { __typename?: 'Registration', id: string, attendee: string, approved?: boolean | null, approvedAt?: any | null, registeredAt: any } | null }> } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, endCursor: string } } };


export const GetEventByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"metadataHash"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"placeId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"virtualLink"}}]}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"venueType"}},{"kind":"Field","name":{"kind":"Name","value":"requiresApproval"}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isUsed"}},{"kind":"Field","name":{"kind":"Name","value":"checkedInAt"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"registeredAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentTokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registrations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"registeredAt"}},{"kind":"Field","name":{"kind":"Name","value":"ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payer"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetEventGuestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventGuests"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registrationsFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"RegistrationWhereInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paymentFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"capacity"}},{"kind":"Field","name":{"kind":"Name","value":"requiresApproval"}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payer"}},{"kind":"Field","name":{"kind":"Name","value":"isRefunded"}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"registeredAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registrations"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registrationsFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"registeredAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payments"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paymentFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"payer"}},{"kind":"Field","name":{"kind":"Name","value":"isRefunded"}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentDate"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventGuestsQuery, GetEventGuestsQueryVariables>;
export const GetEventPoapsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventPoaps"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"eventId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}},{"kind":"Field","name":{"kind":"Name","value":"poaps"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"poapId"}},{"kind":"Field","name":{"kind":"Name","value":"fancyId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"animationUrl"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"eventUrl"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}}]}}]}}]}}]} as unknown as DocumentNode<GetEventPoapsQuery, GetEventPoapsQueryVariables>;
export const GetUserEventsStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserEventsStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventOrderByInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}}]}}]} as unknown as DocumentNode<GetUserEventsStatsQuery, GetUserEventsStatsQueryVariables>;
export const GetUserEventsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventOrderByInput"}}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"where"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"EventWhereInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"Variable","name":{"kind":"Name","value":"where"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"eventId"}},{"kind":"Field","name":{"kind":"Name","value":"metadataHash"}},{"kind":"Field","name":{"kind":"Name","value":"isPaid"}},{"kind":"Field","name":{"kind":"Name","value":"organizer"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"virtualLink"}},{"kind":"Field","name":{"kind":"Name","value":"location"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"address"}},{"kind":"Field","name":{"kind":"Name","value":"placeId"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payer"}}]}},{"kind":"Field","name":{"kind":"Name","value":"registration"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attendee"}},{"kind":"Field","name":{"kind":"Name","value":"approved"}},{"kind":"Field","name":{"kind":"Name","value":"approvedAt"}},{"kind":"Field","name":{"kind":"Name","value":"registeredAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserEventsQuery, GetUserEventsQueryVariables>;