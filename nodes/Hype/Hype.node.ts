import {
	NodeApiError,
	NodeOperationError,
	type IExecuteFunctions,
	type INodeExecutionData,
	type INodeType,
	type INodeTypeDescription,
	type JsonObject,
} from 'n8n-workflow';

import { API_BASE_URL } from './constants';
import { OPERATIONS, PROPERTIES } from './operations';

export class Hype implements INodeType {
	description: INodeTypeDescription & { usableAsTool: true } = {
		displayName: 'Hype',
		name: 'hype',
		subtitle: '={{$parameter["operation"]}}',
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
		properties: PROPERTIES,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = OPERATIONS[this.getNodeParameter('operation', i) as string];
				if (!operation) {
					throw new NodeOperationError(this.getNode(), 'Unsupported Hype operation');
				}

				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: `${API_BASE_URL}${operation.endpoint}`,
					headers: {
						Accept: 'text/plain',
						'Content-Type': 'application/json',
					},
					body: operation.body,
					json: true,
				});

				const item: INodeExecutionData = { json: response, pairedItem: { item: i } };
				returnData.push(item);
			} catch (error) {
				if (this.continueOnFail()) {
					const item: INodeExecutionData = {
						json: { error: error.message },
						pairedItem: { item: i },
					};
					returnData.push(item);
				} else {
					throw new NodeApiError(this.getNode(), error as JsonObject, { itemIndex: i });
				}
			}
		}

		const result = [returnData];
		return result;
	}
}
