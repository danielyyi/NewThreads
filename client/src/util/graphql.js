import gql from 'graphql-tag'
export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      bio
      createdAt
      brandLink
      pfp
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
      productLink
      createdAt
      username
    }
  }
`;

export const LOAD_POSTS_QUERY = gql`
query LoadPosts($limit: Int!, $offset: Int!) {
  loadPosts(limit: $limit, offset: $offset) {
    caption
    price
    title
  
    productLink
    createdAt
    id
    image
    username
  }
}`

export const LOAD_USERS_QUERY = gql`
query LoadUsers($limit: Int!, $offset: Int!) {
  loadUsers(limit: $limit, offset: $offset) {
    id
      bio
      createdAt
      brandLink
      username
      pfp
  }
}`

export const GET_RANDOM_USER_QUERY = gql`
 {
  getRandomUser {
    id
      bio
      createdAt
      pfp
      brandLink
      username
  }
}`