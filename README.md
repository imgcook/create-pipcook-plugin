# @pipcook/create-pipcook-plugin

Create plugin for Pipcook in only one command via [npm-init](https://docs.npmjs.com/cli/v6/commands/npm-init).

## Getting started

The are many ways to create a plugin for Pipcook.

```sh
# via NPM
$ npm init @pipcook/create-pipcook-plugin --category data-collect --python my-plugin

# via Pipcook
$ pipcook plugin create-data-collect ./my-plugin
```

To create a TypeScript(default) plugin:

```sh
$ npm init @pipcook/create-pipcook-plugin my-plugin
```

To create a plugin with its category:

```sh
$ npm init @pipcook/create-pipcook-plugin --category data-collect my-plugin
```

Supported categories of plugin are:

- `data-collect`
- `data-access`
- `data-process`
- `model-define`
- `model-train`
- `model-evaluate`

To create a Python plugin:

```sh
$ npm init @pipcook/create-pipcook-plugin --python
```

## How to write a template for new plugin

1. create a directory at ./templates, and name in `v1-default-${plugin-category}`.
2. create an `index.ts` under created template directory, and write the template there.
3. submit a Pull Request to this repository.

To debug the new plugin template, we could use `npx` command:

```sh
$ npm link
$ npx @pipcook/create-pipcook-plugin foobar --category new-category
```

## License

MIT.
