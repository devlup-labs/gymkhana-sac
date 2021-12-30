import gql from "graphql-tag";
import { COMMITTEE_EVENTS_FRAGMENT } from "../fragments/eventFragment";
import { COMMITTEE_NEWS_FRAGMENT } from "../fragments/newsFragment";
import { COMMITTEE_DATA_FRAGMENT } from "../fragments/committeeDataFragment";
import { OFFICE_BEARER_FRAGMENT } from "../fragments/officeBearerFragment";

export const GET_COMMITTEE_DATA_QUERY = gql`
  query committees($slugText: String!) {
    committees(slug: $slugText) {
      edges {
        node {
          ...CommitteeDataFields
          ctype
          description
          resourcesLink
          cover {
            ...Sizes
          }
          ...CNewsFields
          ...CEventFields
          activitySet {
            edges {
              node {
                name
                description
                customHtml
              }
            }
          }
          customHtml
          membershipSet {
            edges {
              node {
                role
                userprofile {
                  ...OfficeBearerFields
                }
              }
            }
          }
        }
      }
    }
  }
  ${OFFICE_BEARER_FRAGMENT}
  ${COMMITTEE_EVENTS_FRAGMENT}
  ${COMMITTEE_NEWS_FRAGMENT}
  ${COMMITTEE_DATA_FRAGMENT}
`;
