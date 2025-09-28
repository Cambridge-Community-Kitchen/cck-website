import { GraphQLClient } from 'graphql-request';

const { OPENCOLLECTIVE_API_TOKEN } = process.env;
const COLLECTIVE_SLUG = 'cambridge-community-kitchen';

const client = new GraphQLClient(
	'https://api.opencollective.com/graphql/v2',
	{
		headers: {
			authorization: `Bearer ${OPENCOLLECTIVE_API_TOKEN}`
		}
	}
);

export const getAllPosts = () => client.request(`
	{
		collective(slug: "${COLLECTIVE_SLUG}") {
			updates {
				nodes {
					id
					slug
					summary
					title
					html
					publishedAt
				}
			}
		}
	}
`).then(
	(response) => response.collective?.updates?.nodes ?? []
);

export const getCollectiveDescription = () => client.request(`
	{
		collective(slug: "${COLLECTIVE_SLUG}") {
			longDescription
		}
	}
`).then(
	(response) => response.collective?.longDescription
);

export const getPost = (pageSlug) => client.request(`
	{
		collective(slug: "${COLLECTIVE_SLUG}") {
			updates {
				nodes {
					id
					slug
					summary
					title
					html
				}
			}
		}
	}
`, {
	slug: pageSlug,
}).then(
	(response) => (
		response.collective?.updates?.nodes?? []
	).find(
		(node) => node.slug === pageSlug
	)
);