import { gql } from "@apollo/client";

export function generateGetNoticesQuery(firstValue) {
  return gql`
    query GetNotices($cursor: String) {
      notices(first: ${firstValue}, after: $cursor) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            index
            input {
              index
            }
            payload
          }
        }
      }
    }
  `;
}

export default generateGetNoticesQuery; 