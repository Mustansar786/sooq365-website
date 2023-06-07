import gql from 'graphql-tag';

export const ContactMutation = gql`
 mutation contact($name: String!,$subject: String!,$content: String!,$email: String!,$phone: String!){
        createContact(data:{
                name:$name,
                email:$email,
                subject:$subject,
                content:$content,
                phone: $phone
        }){
            id
        }

    }
`;
