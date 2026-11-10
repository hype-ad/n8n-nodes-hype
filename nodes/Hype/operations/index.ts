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
						url: '/api/n8n/top10/gaming',
					},
				},
			},
		],
		default: 'top10_youtube_gaming_trends',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		description: 'Optional email address to include with the request.',
		hint: 'Share your email if you would like to get the latest updates about the n8n-Hype integration.',
		displayOptions: {
			show: {
				operation: ['top10_youtube_gaming_trends'],
			},
		},
		routing: {
			request: {
				body: {
					email: '={{$value}}',
				},
			},
		},
	},
];

export { properties as PROPERTIES };
