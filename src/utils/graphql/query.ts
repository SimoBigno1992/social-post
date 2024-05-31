import { gql } from '@apollo/client'

export const GET_USER_LIST = gql`
    query users {
        users {
            nodes {
                id
                name
                email
                status
            }
        }
    }
`