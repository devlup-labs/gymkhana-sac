import gql from "graphql-tag";
import { OFFICE_BEARER_FRAGMENT } from "../fragments/officeBearerFragment";
import { SIZES_FRAGMENT } from "../fragments/sizesFragment";
import { EVENT_FRAGMENT } from "../fragments/eventFragment";
import { NEWS_FRAGMENT } from "../fragments/newsFragment";
import { SOCIETY_DATA_FRAGMENT } from "../fragments/societyDataFragment";
import { COMMITTEE_DATA_FRAGMENT } from "../fragments/committeeDataFragment";
import { FACULTY_FRAGMENT } from "../fragments/facultyFragment";

export const GET_BOARD_DATA_QUERY = gql`
  query boards($slugText: String!) {
    boards(slug: $slugText) {
      edges {
        node {
          name
          description
          reportLink
          constitutionLink
          president {
            ...FacultyFields
          }
          vicePresident {
            ...OfficeBearerFields
          }
          slug
          cover {
            ...Sizes
          }
          societySet {
            edges {
              node {
                __typename
                ...SocietyDataFields
                cover {
                  ...Sizes
                }
              }
            }
          }
          committeeSet {
            edges {
              node {
                __typename
                ...CommitteeDataFields
                cover {
                  ...Sizes
                }
              }
            }
          }
          upcomingEvents {
            edges {
              node {
                ...Event
              }
            }
          }
          pastNews {
            edges {
              node {
                ...News
              }
            }
          }
        }
      }
    }
  }
  ${OFFICE_BEARER_FRAGMENT}
  ${SIZES_FRAGMENT}
  ${EVENT_FRAGMENT}
  ${NEWS_FRAGMENT}
  ${SOCIETY_DATA_FRAGMENT}
  ${COMMITTEE_DATA_FRAGMENT}
  ${FACULTY_FRAGMENT}
`;
