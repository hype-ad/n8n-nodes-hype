import type { INodeType, INodeTypeDescription } from 'n8n-workflow';

import { API_BASE_URL } from './constants';
import { PROPERTIES } from './operations';

export class Hype implements INodeType {
	description: INodeTypeDescription & { usableAsTool: true } = {
		displayName: 'Hype',
		name: 'hype',
		subtitle: 'Top 10 YouTube Gaming Trends',
		icon: 'file:hype.svg',
		group: ['transform'],
		version: 1,
		description: 'Get YouTube gaming trends from Hype',
		defaults: {
			name: 'Hype',
		},
		inputs: ['main'],
		outputs: ['main'],
		usableAsTool: true,
		requestDefaults: {
			baseURL: API_BASE_URL,
			headers: {
				Accept: 'text/plain',
				'Content-Type': 'application/json',
			},
		},
		properties: PROPERTIES,
	};
}
