import type { INodeProperties } from 'n8n-workflow';

const properties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Top 10 YouTube Gaming Trends',
				value: 'top10_youtube_gaming_trends',
				description: 'Get the top 10 trending gaming topics on YouTube from the last 30 days',
				action: 'Get top 10 gaming trends',
				routing: {
					request: {
						method: 'POST',
						url: '/api/Trends/top10/public',
						body: {
							days: 30,
							channelSet: 'Top 100',
							category: 'Gaming',
							scoring: 'Revenue',
						},
					},
				},
			},
		],
		default: 'top10_youtube_gaming_trends',
	},
];

export { properties as PROPERTIES };
