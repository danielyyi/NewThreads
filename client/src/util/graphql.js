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
      tags{
        name
        color
      }
      productLink
      createdAt
      username
    }
  }
`;

export const LOAD_POSTS_QUERY = gql`
query LoadPosts($limit: Int!, $offset: Int!, $category: String, $sex: String, $price: String, $tags: String) {
  loadPosts(limit: $limit, offset: $offset, category: $category, sex: $sex, price: $price, tags: $tags) {
    id
    image
    price
    title
    tags {
      color
      name
    }
    user
    username
  }
}
`;

export const GET_AUTO = gql`
  query GetAuto($counter: Int!) {
    getAuto(counter: $counter) {
      price
      title
      tags{
        name
        color
      }
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


export const GET_TAGS_QUERY = gql`
query Query {
  getTags {
    color
    name
  }
}
`;

export const FILTER_TAGS_QUERY = gql`
query Tags($tags: [String]!) {
  filterTags(tags: $tags) {
    tags {
      color
      name
    }
    category
    id
    image
    price
    title
    username
    user
  }
}
`;


export const GET_TAG_QUERY = gql`
query Query($name: String!) {
  getTag(name: $name) {
    color
    name
  }
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
