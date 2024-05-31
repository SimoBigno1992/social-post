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

export const GET_POST_BY_USER = gql`
	query posts($userId: String) {
		posts(userId: $userId) {
			nodes {
				body
				comments
				id
				title
				userId
			}
		}
	}
`