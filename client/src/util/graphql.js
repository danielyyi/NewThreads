import gql from "graphql-tag";
export const FETCH_USERS_QUERY = gql`
  {
    getUsers {
      id
      bio
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
      user
      title
      productLink
      createdAt
      username
    }
  }
`;

export const LOAD_POSTS_QUERY = gql`
  query LoadPosts(
    $limit: Int!
    $offset: Int!
    $category: String!
    $price: String
  ) {
    loadPosts(
      limit: $limit
      offset: $offset
      category: $category
      price: $price
    ) {
      price
      title
      category
      user
      id
      image
      username
    }
  }
`;

export const GET_AUTO = gql`
  query GetAuto($counter: Int!) {
    getAuto(counter: $counter) {
      price
      title
      category
      productLink
      id
      image
      username
    }
  }
`;

export const COUNT_POSTS = gql`
query Query($userId: ID!) {
  countPosts(userId: $userId)
}
`;

export const LOAD_USERS_QUERY = gql`
  query LoadUsers($limit: Int!, $offset: Int!) {
    loadUsers(limit: $limit, offset: $offset) {
      id
      bio
      username
      pfp
    }
  }
`;

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
  }
`;

export const EDIT_PROFILE = gql`
  query EditProfile(
    $username: String
    $brandLink: String
    $bio: String
    $pfp: String
    $email: String
  ) {
    editProfile(
      username: $username
      brandLink: $brandLink
      bio: $bio
      pfp: $pfp
      email: $email
    ) {
      username
      brandLink
      bio
      pfp
      email
    }
  }
`;
