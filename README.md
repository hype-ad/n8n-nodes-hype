# n8n-nodes-hype

This is an n8n community node for [Hype](https://hype.ad). Discover **Top 10 YouTube Trending Topics**. Use Hype's insights to explore timely topics in your n8n workflow.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Actions](#actions)
- [Usage](#usage)
- [Resources](#resources)
- [Development](#development)
- [Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Quick Installation

1. Go to **Settings → Community Nodes**.
2. Select **Install**.
3. Enter `@hype-ad/n8n-nodes-hype` in **Enter npm package name**.
4. Agree to the risks of using community nodes.
5. Select **Install**.

After installation, restart your n8n instance for the Hype node to appear.

## Actions

### Top 10 YouTube Gaming Trends

Get trends from the last 30 days without an API key or credentials.

## Usage

Add Hype to a workflow and select **Top 10 YouTube Gaming Trends**. Run the workflow to get recent gaming topics from YouTube. Connect Hype to other nodes to use those topics in later workflow steps.

To get one item for each trend, connect n8n's **Split Out** node and select `data`. You can also connect Hype to an AI Agent.

You can import [the example workflow](examples/top10-youtube-gaming-trends.json) to try **Manual Trigger → Hype → Edit Fields**.

## Resources

- [Hype](https://hype.ad)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Example workflow](examples/top10-youtube-gaming-trends.json)

## Development

Run these commands from the project directory:

```sh
npm ci
npm run lint
npm test
```

`npm test` builds the node and runs its tests. To build it without running the tests, use `npm run build`. The build puts the compiled node and its assets under `dist/`. `npm run dev` watches TypeScript files; it does not start n8n.

To load the local build in an existing n8n installation:

```sh
npm run build
N8N_CUSTOM_EXTENSIONS="$PWD/dist" n8n start
```

Run n8n with a Node.js version supported by that n8n installation. Open the local editor, add the Hype node, and execute the action. Restart n8n after rebuilding the node.

## Version history

### 0.1.0

- Add the Top 10 YouTube Gaming Trends action.
