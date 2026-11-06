import type { INodePropertyOptions } from 'n8n-workflow';

const key = 'top10_youtube_gaming_trends';
const endpoint = '/api/Trends/top10/public';
const body = {
	days: 30,
	channelSet: 'Top 100',
	category: 'Gaming',
	scoring: 'Revenue',
};

const details: INodePropertyOptions = {
	name: 'Top 10 YouTube Gaming Trends',
	value: key,
	description: 'Get public YouTube gaming trends for the last 30 days',
	action: 'Top 10 YouTube Gaming Trends',
};

const operation = { key, endpoint, body, details };

export default operation;
