import gql from "graphql-tag";

export const EVENT_FRAGMENT = gql`
  fragment Event on EventNode {
    name
    description
    location
    date
  }
`;

export const SOCIETY_EVENTS_FRAGMENT = gql`
  fragment EventFields on SocietyNode {
    eventSet {
      edges {
        node {
          ...Event
        }
      }
    }
  }
  ${EVENT_FRAGMENT}
`;

export const COMMITTEE_EVENTS_FRAGMENT = gql`
  fragment CEventFields on CommitteeNode {
    eventSet {
      edges {
        node {
          ...Event
        }
      }
    }
  }
  ${EVENT_FRAGMENT}
`;