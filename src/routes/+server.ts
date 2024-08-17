import { json } from '@sveltejs/kit'

export async function POST() {
	return json({
		"count": [
			{
				"date": "2024-08-11T00:00:00.000Z",
				"value": 3
			},
			{
				"date": "2024-08-12T00:00:00.000Z",
				"value": 1
			},
			{
				"date": "2024-08-13T00:00:00.000Z",
				"value": 1
			},
			{
				"date": "2024-08-14T00:00:00.000Z",
				"value": 1
			},
			{
				"date": "2024-08-16T00:00:00.000Z",
				"value": 5
			}
		],
		"totalCount": 11
	})
}
