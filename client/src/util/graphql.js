import gql from 'graphql-tag'
export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      bio
      createdAt
      brandLink
      username
    }
  }
`;

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      caption
      image
      price
      title
      brandLink
      productLink
      createdAt
      username
    }
  }
`;

export const LOAD_POSTS_QUERY = gql`
query LoadPosts($limit: Int!) {
  loadPosts(limit: $limit) {
    caption
    price
    title
    brandLink
    productLink
    createdAt
    id
    image
    username
  }
}`