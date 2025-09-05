/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query GetUserEventsStats($orderBy: [EventOrderByInput!]!, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, where: $where) {\n    totalCount\n  }\n}": typeof types.GetUserEventsStatsDocument,
    "query GetUserEvents($orderBy: [EventOrderByInput!]!, $after: String, $first: Int, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, after: $after, first: $first, where: $where) {\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        eventId\n        metadataHash\n        isPaid\n        organizer\n        startDate\n        endDate\n        metadata {\n          title\n          description\n          image\n          virtualLink\n          location {\n            id\n            name\n            address\n            placeId\n            latitude\n            longitude\n          }\n        }\n        tickets {\n          id\n          attendee\n          payment {\n            amount\n            token {\n              id\n              tokenAddress\n            }\n            payer\n          }\n          registration {\n            id\n            attendee\n            approved\n            approvedAt\n            registeredAt\n          }\n          issuedAt\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": typeof types.GetUserEventsDocument,
};
const documents: Documents = {
    "query GetUserEventsStats($orderBy: [EventOrderByInput!]!, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, where: $where) {\n    totalCount\n  }\n}": types.GetUserEventsStatsDocument,
    "query GetUserEvents($orderBy: [EventOrderByInput!]!, $after: String, $first: Int, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, after: $after, first: $first, where: $where) {\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        eventId\n        metadataHash\n        isPaid\n        organizer\n        startDate\n        endDate\n        metadata {\n          title\n          description\n          image\n          virtualLink\n          location {\n            id\n            name\n            address\n            placeId\n            latitude\n            longitude\n          }\n        }\n        tickets {\n          id\n          attendee\n          payment {\n            amount\n            token {\n              id\n              tokenAddress\n            }\n            payer\n          }\n          registration {\n            id\n            attendee\n            approved\n            approvedAt\n            registeredAt\n          }\n          issuedAt\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}": types.GetUserEventsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserEventsStats($orderBy: [EventOrderByInput!]!, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, where: $where) {\n    totalCount\n  }\n}"): (typeof documents)["query GetUserEventsStats($orderBy: [EventOrderByInput!]!, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, where: $where) {\n    totalCount\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetUserEvents($orderBy: [EventOrderByInput!]!, $after: String, $first: Int, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, after: $after, first: $first, where: $where) {\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        eventId\n        metadataHash\n        isPaid\n        organizer\n        startDate\n        endDate\n        metadata {\n          title\n          description\n          image\n          virtualLink\n          location {\n            id\n            name\n            address\n            placeId\n            latitude\n            longitude\n          }\n        }\n        tickets {\n          id\n          attendee\n          payment {\n            amount\n            token {\n              id\n              tokenAddress\n            }\n            payer\n          }\n          registration {\n            id\n            attendee\n            approved\n            approvedAt\n            registeredAt\n          }\n          issuedAt\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"): (typeof documents)["query GetUserEvents($orderBy: [EventOrderByInput!]!, $after: String, $first: Int, $where: EventWhereInput) {\n  eventsConnection(orderBy: $orderBy, after: $after, first: $first, where: $where) {\n    totalCount\n    edges {\n      cursor\n      node {\n        id\n        eventId\n        metadataHash\n        isPaid\n        organizer\n        startDate\n        endDate\n        metadata {\n          title\n          description\n          image\n          virtualLink\n          location {\n            id\n            name\n            address\n            placeId\n            latitude\n            longitude\n          }\n        }\n        tickets {\n          id\n          attendee\n          payment {\n            amount\n            token {\n              id\n              tokenAddress\n            }\n            payer\n          }\n          registration {\n            id\n            attendee\n            approved\n            approvedAt\n            registeredAt\n          }\n          issuedAt\n        }\n      }\n    }\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;