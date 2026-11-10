const assert = require('node:assert/strict');
const { test } = require('node:test');
const { Hype } = require('../dist/nodes/Hype/Hype.node.js');
const exampleWorkflow = require('../examples/top10-youtube-gaming-trends.json');

const operation = 'top10_youtube_gaming_trends';
const expectedBody = {
	days: 30,
	channelSet: 'Top 100',
	category: 'Gaming',
	scoring: 'Revenue',
};

test('describes Hype as a no-credential node with one readable action', () => {
	const description = new Hype().description;

	assert.equal(description.displayName, 'Hype');
	assert.equal(description.subtitle, 'Top 10 YouTube Gaming Trends');
	assert.equal(description.credentials, undefined);
	assert.equal(description.usableAsTool, true);
	assert.equal(description.properties.length, 1);
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
	assert.equal(typeof Hype.prototype.execute, 'undefined');
});

test('keeps the example workflow pointed at node version 1', () => {
	const hypeNode = exampleWorkflow.nodes.find((node) => node.type === '@hype-ad/n8n-nodes-hype.hype');

	assert.ok(hypeNode);
	assert.equal(hypeNode.typeVersion, 1);
});

test('declares the fixed public API request in declarative routing', () => {
	const description = new Hype().description;

	assert.deepEqual(description.requestDefaults, {
		baseURL:
			'https://hype-ad-backend-prod-hfapdhcecffyfhev.spaincentral-01.azurewebsites.net',
		headers: {
			Accept: 'text/plain',
			'Content-Type': 'application/json',
		},
	});
	assert.deepEqual(description.properties[0].options[0].routing, {
		request: {
			method: 'POST',
			url: '/api/Trends/top10/public',
			body: expectedBody,
		},
	});
});
