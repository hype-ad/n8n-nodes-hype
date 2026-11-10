# @hype-ad/n8n-nodes-hype

An [n8n](https://n8n.io/) community node for [Hype](https://hype.ad).

One action: **Top 10 YouTube Gaming Trends**. No API key or configuration is needed.

## What it does

The node sends this fixed request once per incoming item:

```http
POST https://hype-ad-backend-prod-hfapdhcecffyfhev.spaincentral-01.azurewebsites.net/api/Trends/top10/public
Accept: text/plain
Content-Type: application/json
```

```json
{
  "days": 30,
  "channelSet": "Top 100",
  "category": "Gaming",
  "scoring": "Revenue"
}
```

It returns the complete JSON response as one n8n output item. It does not rename fields, validate trend scores, or split the response. Trends are in `$json.data`; the API may return fewer than ten. An empty result remains `data: []`. API status and message fields remain in the output. HTTP and network failures follow n8n's **Continue On Fail** setting.

The node uses n8n's declarative request routing: the base URL, headers, POST path, and fixed body are defined in its node description. It has no custom execution method.

Use n8n's **Split Out** node on `data` if you want one item per trend. The Hype node also supports AI Agent tool connections.

Import [the example workflow](examples/top10-youtube-gaming-trends.json) to try **Manual Trigger → Hype → Edit Fields**.

## Installation

After publication, install `@hype-ad/n8n-nodes-hype` through **Settings → Community Nodes** on your self-hosted n8n instance. n8n Cloud availability requires n8n verification.

Hype declares Node.js **18.10 or later**, matching the supplied Brave and Perplexity wrappers. Your n8n installation has its own Node.js requirements: this package does not make newer n8n releases run on Node 18.

## Development

```sh
npm ci
npm run lint
npm test
```

`npm run build` compiles TypeScript and copies the icon and node metadata to `dist/nodes`. `npm run dev` watches TypeScript files; it does not start n8n.

To try the node with an existing local n8n installation:

```sh
npm run build
N8N_CUSTOM_EXTENSIONS="$PWD/dist/nodes" n8n start
```

Run that command from this project directory using a Node.js version supported by your installed n8n. Open the editor address printed by n8n, add Hype, and execute the Gaming action. Restart n8n after rebuilding changes.

To produce a package without publishing:

```sh
npm run build
npm pack
```

You can install that tarball into an existing self-hosted n8n instance:

```sh
mkdir -p ~/.n8n/nodes
cd ~/.n8n/nodes
npm install /absolute/path/to/hype-ad-n8n-nodes-hype-0.1.0.tgz
```

Restart n8n after installation. See [PUBLISHING.md](PUBLISHING.md) for the release checklist.

## Why development tools are in package.json

This follows the supplied Brave and Perplexity projects:

1. We edit TypeScript files in `nodes/`.
2. On our development machine, TypeScript compiles them into JavaScript in `dist/nodes/`. Gulp copies the icon and metadata. ESLint checks the source.
3. We publish the compiled files. Users run those JavaScript files inside n8n.

TypeScript, Gulp, ESLint, and Prettier are **development dependencies**. They are used to prepare the package and are not installed as dependencies of the published Hype package. There are no consumer installation scripts that build Hype.

`n8n-workflow` is different: it is n8n's shared API. We use it during development, and n8n provides it when loading community nodes. It is declared as an optional peer dependency so npm does not download a separate, newer n8n runtime when users install Hype. Hype still needs to run inside n8n.

One project is enough: `nodes/` contains the source, and `dist/nodes/` contains the result users run. The temporary `init/` reference repositories are not needed to build, test, or install Hype.

## Version history

### 0.1.0

Initial release: one public Gaming trends request, with the complete API response returned unchanged.
