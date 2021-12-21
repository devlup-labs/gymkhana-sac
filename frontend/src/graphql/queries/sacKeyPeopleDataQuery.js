import gql from "graphql-tag";
import { OFFICE_BEARER_FRAGMENT } from "../fragments/officeBearerFragment";

export const GET_SAC_KEY_PEOPLE_DATA_QUERY = gql`
  query {
    sacKeyPeople {
      edges {
        node {
          genSecy {
            ...OfficeBearerFields
          }
          genSecySac {
            ...OfficeBearerFields
          }
        }
      }
    }
  }
  ${OFFICE_BEARER_FRAGMENT}
`;