import { gql } from '@apollo/client';

export const NEW_MESSAGE_SUBSCRIPTION = gql`
subscription chat($Id: ID!){
    messageCreated(conversation: $Id){
        id
        body
        createdAt
        sender {
            id
            profile {
                first_name
                last_name
                selfie_image
            }
        }
    }
}
`;


export const NEW_CONVERSATION_SUBSCRIPTION = gql`

subscription conversationUpdate{
  conversationUpdated{
            id
            last_message{
                id
                body
                createdAt
            }
            un_seen_count
            vehicle{
              id
              brand {
                name
              }
              model {
                name
              }
              trim {
                name
              }
              trim {
                name
              }
              owner{
                id
              }
              thumb
              host_rate_avg
              rate_avg
              price
              attributes
            }
            booking{
              id
              start_at
              end_at
              billing{
                amount
                final_amount
              }
              canceled_reason{
                text
                reasonType
              }
              reject_reason{
                text
                reasonType
              }
              vehicle {
                id
                brand {
                  name
                }
                model {
                  name
                }
                trim {
                  name
                }
                trim {
                  name
                }
                owner{
                  id
                }
                thumb
                host_rate_avg
                rate_avg
                price
                attributes
              }
            }
            members{
                id
                profile{
                    selfie_image
                    first_name
                    last_name
                }
            }
        }
    }

`;
