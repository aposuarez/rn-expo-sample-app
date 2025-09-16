import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries($code: ID) {
    countries {
      code
      name
      emoji
      capital
      continent { name }
    }
    country(code: $code) {
      code
      name
      emoji
      capital
      currency
    }
  }
`;


