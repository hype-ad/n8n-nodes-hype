const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Hype } = require('../dist/nodes/Hype/Hype.node.js');

const operation = 'top10_youtube_gaming_trends';
const node = {
	id: 'hype',
	name: 'Hype',
	type: '@hype-ad/n8n-nodes-hype.hype',
	typeVersion: 1,
	position: [0, 0],
	parameters: { operation },
};

async function execute(items, httpRequest, continueOnFail = false, selectedOperation = operation) {
	assert.ok(Array.isArray(items));
	assert.equal(typeof httpRequest, 'function');
	assert.equal(typeof continueOnFail, 'boolean');
	assert.equal(typeof selectedOperation, 'string');
	const context = {
		getInputData: () => items,
		getNodeParameter: () => selectedOperation,
		getNode: () => node,
		continueOnFail: () => continueOnFail,
		helpers: { httpRequest },
	};
	const result = await Hype.prototype.execute.call(context);
	return result;
}

test('offers only the Gaming action, without credentials or other fields', () => {
	const description = new Hype().description;
	assert.equal(description.credentials, undefined);
	assert.equal(description.properties.length, 1);
	assert.equal(description.properties[0].options.length, 1);
	assert.equal(description.properties[0].options[0].value, operation);
	assert.equal(description.properties[0].options[0].name, 'Top 10 YouTube Gaming Trends');
	assert.equal(description.usableAsTool, true);
});

test('sends the fixed POST and returns the complete API response unchanged', async () => {
	const response = {
		status: 'ok',
		message: '',
		days: '30',
		data: [{ name: 'survival horror', value: 86.3, contents: 64, views: 104333938 }],
		dataTotalCount: 293,
	};
	const requests = [];
	const input = [{ json: { days: 1, category: 'Sports', channelSet: 'Other', scoring: 'Views' } }];
	const result = await execute(input, async (request) => {
		requests.push(request);
		return response;
	});
	assert.deepEqual(requests, [
		{
			method: 'POST',
			url: 'https://hype-ad-backend-prod-hfapdhcecffyfhev.spaincentral-01.azurewebsites.net/api/Trends/top10/public',
			headers: { Accept: 'text/plain', 'Content-Type': 'application/json' },
			body: { days: 30, channelSet: 'Top 100', category: 'Gaming', scoring: 'Revenue' },
			json: true,
		},
	]);
	assert.deepEqual(result, [[{ json: response, pairedItem: { item: 0 } }]]);
	assert.strictEqual(result[0][0].json, response);
});

test('leaves empty results and API status messages in the response', async () => {
	const responses = [
		{ status: 'ok', data: [] },
		{ status: 'error', message: 'No report available', data: null },
	];
	for (const response of responses) {
		const result = await execute([{ json: {} }], async () => response);
		assert.deepEqual(result[0][0].json, response);
	}
});

test('makes one request per input item and preserves item linking', async () => {
	let requests = 0;
	const input = [{ json: {} }, { json: {} }];
	const result = await execute(input, async () => {
		requests += 1;
		const response = { request: requests };
		return response;
	});
	assert.equal(requests, 2);
	assert.deepEqual(
		result[0].map((item) => item.pairedItem),
		[{ item: 0 }, { item: 1 }],
	);
});

test('does not call the API without input items', async () => {
	const result = await execute([], async () => {
		assert.fail('No request expected');
	});
	assert.deepEqual(result, [[]]);
});

test('reports request failures through n8n', async () => {
	for (const message of ['HTTP 400', 'HTTP 429', 'HTTP 500', 'ECONNRESET']) {
		await assert.rejects(
			execute([{ json: {} }], async () => {
				throw new Error(message);
			}),
			{ name: 'NodeApiError' },
		);
	}
});

test('respects Continue On Fail and continues with the next input', async () => {
	let requests = 0;
	const result = await execute(
		[{ json: {} }, { json: {} }],
		async () => {
			requests += 1;
			if (requests === 1) {
				throw new Error('Network unavailable');
			}
			const response = { status: 'ok', data: [] };
			return response;
		},
		true,
	);
	assert.deepEqual(result[0][0], {
		json: { error: 'Network unavailable' },
		pairedItem: { item: 0 },
	});
	assert.deepEqual(result[0][1], { json: { status: 'ok', data: [] }, pairedItem: { item: 1 } });
});

test('rejects an unknown operation before making a request', async () => {
	await assert.rejects(
		execute(
			[{ json: {} }],
			async () => {
				assert.fail('No request expected');
			},
			false,
			'unknown',
		),
		/Unsupported Hype operation/,
	);
});
