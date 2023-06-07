import gql from 'graphql-tag';

export const FaqClientQuery = 
  gql`
    query clientfaqs($lang_code: String!,$skip: Int ,$limit: Int){
      clientfaqs(lang_code: $lang_code, skip: $skip, limit: $limit){
        id,
        title
        answer
        language
      }
    }
`;