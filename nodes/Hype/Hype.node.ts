import type { INodeType, INodeTypeDescription } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

import { API_BASE_URL } from './constants';
import { PROPERTIES } from './operations';

export class Hype implements INodeType {
	description: INodeTypeDescription & { usableAsTool: true } = {
		displayName: 'Hype',
		name: 'hype',
		subtitle: 'Top 10 YouTube Gaming Trends',
		icon: {
			light: 'file:hype.svg',
			dark: 'file:hype.dark.svg',
		},
		group: ['transform'],
		version: 1,
		description: 'Get the top 10 trending topics on YouTube',
		defaults: {
			name: 'Hype',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		requestDefaults: {
			baseURL: API_BASE_URL,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: PROPERTIES,
	};
}
