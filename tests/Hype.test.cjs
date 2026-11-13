const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Hype } = require('../dist/nodes/Hype/Hype.node.js');
const exampleWorkflow = require('../examples/top10-youtube-gaming-trends.json');

const operation = 'top10_youtube_gaming_trends';
test('describes Hype as a no-credential node with one readable action', () => {
	const description = new Hype().description;

	assert.equal(description.displayName, 'Hype');
	assert.equal(description.subtitle, 'Top 10 YouTube Gaming Trends');
	assert.equal(description.credentials, undefined);
	assert.equal(description.usableAsTool, true);
	assert.equal(description.properties.length, 2);
	assert.equal(description.properties[0].displayName, 'Operation');
	assert.equal(description.properties[0].default, operation);
	assert.equal(description.properties[0].options.length, 1);
	assert.equal(description.properties[0].options[0].value, operation);
	assert.equal(description.properties[0].options[0].name, 'Top 10 YouTube Gaming Trends');
	assert.equal(
		description.properties[0].options[0].description,
		'Get the top 10 trending gaming topics on YouTube from the last 30 days',
	);
	assert.equal(description.properties[0].options[0].action, 'Get top 10 gaming trends');
	assert.equal(description.properties[1].name, 'email');
	assert.equal(description.properties[1].required, undefined);
	assert.equal(description.properties[1].default, '');
	assert.equal(typeof Hype.prototype.execute, 'undefined');
});

test('keeps the example workflow pointed at node version 1', () => {
	const hypeNode = exampleWorkflow.nodes.find(
		(node) => node.type === '@hype-ad/n8n-nodes-hype.hype',
	);

	assert.ok(hypeNode);
	assert.equal(hypeNode.typeVersion, 1);
});

test('declares the n8n API request and optional email in declarative routing', () => {
	const description = new Hype().description;

	assert.deepEqual(description.requestDefaults, {
		baseURL: 'https://hype-ad-backend-prod-hfapdhcecffyfhev.spaincentral-01.azurewebsites.net',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
	assert.deepEqual(description.properties[0].options[0].routing.request, {
		method: 'POST',
		url: '/api/n8n/top10/gaming',
	});
	assert.equal(description.properties[0].options[0].routing.send.preSend.length, 1);
	assert.equal(typeof description.properties[0].options[0].routing.send.preSend[0], 'function');
	assert.deepEqual(description.properties[1].routing, {
		request: {
			body: {
				email: '={{$value}}',
			},
		},
	});
});

test('preserves the email and request options when adding n8n identifiers', async () => {
	const description = new Hype().description;
	const prepareRequest = description.properties[0].options[0].routing.send.preSend[0];
	const request = {
		method: 'POST',
		url: '/api/n8n/top10/gaming',
		headers: { Accept: 'application/json' },
		body: { email: 'reader@example.com' },
	};
	const result = await prepareRequest.call(
		{ getInstanceId: () => 'test-instance', getWorkflow: () => ({ id: 'test-workflow' }) },
		request,
	);

	assert.equal(result.method, 'POST');
	assert.equal(result.url, '/api/n8n/top10/gaming');
	assert.deepEqual(result.headers, { Accept: 'application/json' });
	assert.deepEqual(result.body, {
		email: 'reader@example.com',
		instanceId: 'test-instance',
		workflowId: 'test-workflow',
	});
});

test('prepares a request without an email or saved workflow ID', async () => {
	const description = new Hype().description;
	const prepareRequest = description.properties[0].options[0].routing.send.preSend[0];
	const result = await prepareRequest.call(
		{ getInstanceId: () => 'test-instance', getWorkflow: () => ({}) },
		{ method: 'POST', url: '/api/n8n/top10/gaming' },
	);

	assert.deepEqual(result.body, { instanceId: 'test-instance' });
});
