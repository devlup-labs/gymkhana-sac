import gql from "graphql-tag";
import { COMMITTEE_EVENTS_FRAGMENT } from "../fragments/eventFragment";
import { COMMITTEE_NEWS_FRAGMENT } from "../fragments/newsFragment";
import { COMMITTEE_DATA_FRAGMENT } from "../fragments/committeeDataFragment";
import { OFFICE_BEARER_FRAGMENT } from "../fragments/officeBearerFragment";
import { MEMBERSHIP_DATA_FRAGMENT } from "../fragments/membershipFragment";

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
          members {
            edges {
              node {
                phone
                cover {
                  ...Sizes
                }
                avatar {
                  ...Sizes
                }
                about
                user {
                  firstName
                  lastName
                  email
                }
                socialLinks {
                  edges {
                    node {
                      ...SocialMedia
                    }
                  }
                }
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
  ${MEMBERSHIP_DATA_FRAGMENT}
`;
