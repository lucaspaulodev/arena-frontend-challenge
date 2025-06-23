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