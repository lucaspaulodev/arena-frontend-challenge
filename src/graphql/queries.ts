import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query GetPosts($first: Int, $after: String, $order: PostsOrder, $postedBefore: DateTime, $postedAfter: DateTime) {
    posts(first: $first, after: $after, order: $order, postedBefore: $postedBefore, postedAfter: $postedAfter) {
      edges {
        cursor
        node {
          id
          name
          tagline
          thumbnail {
            url
          }
          votesCount
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`;

export const GET_POST_DETAILS = gql`
  query GetPostDetails($id: ID!) {
    post(id: $id) {
      id
      name
      tagline
      description
      commentsCount
      topics {
        edges {
          node {
            name
          }
        }
      }
    }
  }
`;

// export const SEARCH_POSTS = gql`
//   query SearchPosts($query: String!, $first: Int, $after: String, $postedBefore: DateTime, $postedAfter: DateTime) {
//     posts(search: $query, first: $first, after: $after, postedBefore: $postedBefore, postedAfter: $postedAfter) {
//       edges {
//         cursor
//         node {
//           id
//           name
//           tagline
//           thumbnail {
//             url
//           }
//           votesCount
//         }
//       }
//       pageInfo {
//         endCursor
//         hasNextPage
//       }
//     }
//   }
// `;
