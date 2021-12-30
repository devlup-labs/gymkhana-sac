import gql from "graphql-tag";

export const MEMBERSHIP_DATA_FRAGMENT = gql`
  fragment MembershipDataFields on MembershipNode {
    committee
    userprofile
    role
  }
`;
