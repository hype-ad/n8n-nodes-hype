import type { INodeProperties } from 'n8n-workflow';

import top10_youtube_gaming_trends from './top10_youtube_gaming_trends';

const operations = [top10_youtube_gaming_trends];
const map: Record<string, typeof top10_youtube_gaming_trends> = Object.fromEntries(
	operations.map((operation) => {
		const entry = [operation.key, operation];
		return entry;
	}),
);
const all_operations = operations.map(({ details }) => {
	return details;
});

const properties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: all_operations,
		default: 'top10_youtube_gaming_trends',
	},
];

export { map as OPERATIONS, properties as PROPERTIES };
