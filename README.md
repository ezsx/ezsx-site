# ezsx

A restrained public index of systems and tools across backend, platform,
secure connectivity, retrieval, and GPU compute.

## Local development

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Static GitHub Pages export:

```bash
npm run build:static
```

The static artifact is written to `out/` with English at `/`, Russian at
`/ru/`, and a standalone `404.html`. The canonical site is
`https://ezsx.github.io`.

The source remains in `ezsx/ezsx-site`. The `ezsx/ezsx.github.io` repository
owns the GitHub Pages workflow and publishes the generated artifact.
