import gql from 'graphql-tag'
export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      bio
      createdAt
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
      color
      createdAt
      username
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;

export const LOAD_POSTS_QUERY = gql`
query LoadPosts($limit: Int!) {
  loadPosts(limit: $limit) {
    caption
    color
    commentCount
    comments {
      body
      createdAt
      id
      username
    }
    createdAt
    id
    image
    username
  }
}`