import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
mutation RegisterUser(
  $uuid: String!
  $email: String!
  $password: String!
  $username: String!
  $firstName: String
  $lastName: String
  $role: String!
  $profilePictureUrl: String
) {
  register(
    uuid: $uuid
    email: $email
    password: $password
    username: $username
    firstName: $firstName
    lastName: $lastName
    role: $role
    profilePictureUrl: $profilePictureUrl
  ) {
    token
    user {
      _id
      email
      username
    }
  }
}
`;

export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        username
      }
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($token: String!, $newPassword: String!) {
    resetPassword(token: $token, newPassword: $newPassword)
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email)
  }
`;

export const CREATE_IP = gql`
mutation CreateIPAsset($input: IPAssetInput!) {
  createIPAsset(input: $input) {
    uuid
    name
    description
    videoLink
    fileLink
    blockchainId
    proofHash
    createdAt
    updatedAt
    status
    type
    commercialTerms
    collaborators
  }
}
`;