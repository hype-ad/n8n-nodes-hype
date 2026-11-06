# Publication checklist

The package is prepared for local testing. Implementation does not publish to npm or submit to n8n.

1. Review the source, README, MIT license, author, and repository metadata. Make `https://github.com/hype-ad/n8n-nodes-hype` public before using npm provenance.
2. Confirm your publishing account has write access to the `hype-ad` npm organization. The package name is `@hype-ad/n8n-nodes-hype`. If changing the name, update `package.json`, `package-lock.json`, `Hype.node.json`, and the example workflow's node type together.
3. Run `npm ci`, `npm run lint`, `npm test`, and `npm pack --dry-run`. CI checks Node 18.10, 22, and 24. Confirm the package contains the compiled node, metadata, icon, README, and license, and excludes `init/`, tests, and development dependencies.
4. In a local n8n editor, import `examples/top10-youtube-gaming-trends.json`, confirm only the Gaming action is offered, execute it without credentials, and inspect the downstream Edit Fields output. Also try the AI Agent tool connector if that is part of your intended workflow.
5. Set the intended version in `package.json` and the lockfile before the release. The publish workflow does not modify versions or commit files.
6. Configure npm **Trusted Publishers** for GitHub owner `hype-ad`, repository `n8n-nodes-hype`, workflow `publish.yml`. The publishing machine uses Node.js 24 for npm trusted publishing; this does not change Hype's Node 18.10 minimum. The workflow uses `id-token: write` and `npm publish --provenance --access public`. No persistent npm token is used. For a brand-new package, complete npm's initial package setup before configuring its trusted publisher; any initial publication intended for verification must also run through GitHub Actions with provenance.
7. When ready to publish, manually run **Publish** in GitHub Actions for the reviewed commit. Check the published tarball and npm provenance attestation.
8. Run `npx @n8n/scan-community-package @hype-ad/n8n-nodes-hype` against the published package. Resolve any findings before submitting it to the [n8n Creator Portal](https://creators.n8n.io/nodes).

Reference: [n8n submission and provenance requirements](https://docs.n8n.io/connect/create-nodes/deploy-your-node/submit-community-nodes/) and [verification guidelines](https://docs.n8n.io/connect/create-nodes/build-your-node/reference/verification-guidelines/). Passing local checks does not itself confer n8n verification.
