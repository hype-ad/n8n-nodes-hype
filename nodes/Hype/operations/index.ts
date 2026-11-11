import type {
	IDataObject,
	IExecuteSingleFunctions,
	IHttpRequestOptions,
	INodeProperties,
} from 'n8n-workflow';

async function addN8nIdentifiers(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body as IDataObject | undefined;
	const workflowId = this.getWorkflow().id;

	requestOptions.body = {
		...(body && typeof body === 'object' ? body : {}),
		instanceId: this.getInstanceId(),
		...(workflowId ? { workflowId } : {}),
	};

	return requestOptions;
}

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
					send: {
						preSend: [addN8nIdentifiers],
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
			placeholder: 'name@email.com',
			description: 'Optional email address to include with the request',
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
