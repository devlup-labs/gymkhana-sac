import gql from "graphql-tag";

export const COMMITTEE_DATA_FRAGMENT = gql`
  fragment CommitteeDataFields on CommitteeNode {
    name
    slug
  }
`;
