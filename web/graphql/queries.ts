import { gql } from '@apollo/client';

export const GET_USER_DASHBOARD = gql`
  query GetUserDashboard {
    me {
      _id
      uuid
      username
      email
      firstName
      lastName
      profilePictureUrl
      role
      createdAt
      publicKey
      solanaTransactionId
    }
  }
`;