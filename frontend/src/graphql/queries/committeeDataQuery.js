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
          description
          resourcesLink
          cover {
            ...Sizes
          }
          captain {
            ...OfficeBearerFields
          }
          viceCaptainOne {
            ...OfficeBearerFields
          }
          viceCaptainTwo {
            ...OfficeBearerFields
          }
          viceCaptainThree {
            ...OfficeBearerFields
          }
          mentor {
            ...OfficeBearerFields
          }
          coreMembers {
            edges {
              node {
                ...OfficeBearerFields
              }
            }
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
        }
      }
    }
  }
  ${OFFICE_BEARER_FRAGMENT}
  ${COMMITTEE_EVENTS_FRAGMENT}
  ${COMMITTEE_NEWS_FRAGMENT}
  ${COMMITTEE_DATA_FRAGMENT}
`;