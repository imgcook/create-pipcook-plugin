'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const chalk = require('chalk');
const semver = require('semver');

function ensureNodeVersion() {
  const unsupportedNodeVersion = !semver.satisfies(process.version, '>=10');
  if (unsupportedNodeVersion) {
    console.log(
      chalk.yellow(
        `You are using Node ${process.version} so the project will be bootstrapped with an old unsupported version of tools.\n` +
          `Please update to Node 10 or higher for a better, fully supported experience.\n`
      )
    );
    process.exit(1);
  }
}

async function ensureAndGetTemplate(name) {
  const templatePath = path.join(__dirname, 'templates', name);
  if (!await fs.exists(templatePath)) {
    throw new TypeError(`${templatePath} not exists`);
  }
  return templatePath;
}

async function createPlugin(name, { pipcook, template, category = '', python }) {
  ensureNodeVersion();

  const root = path.resolve(name);
  const pluginName = path.basename(root);
  await fs.ensureDir(name);

  console.log(`Creating a new Pipcook plugin in ${chalk.green(root)}.`);

  const packageJson = {
    name: pluginName,
    version: '0.1.0',
    private: true,
    scripts: {},
    dependencies: {},
    pipcook: {
      category: category.replace(/-([a-z])/, (s) => s[1].toUpperCase()),
      datatype: '',
    }
  };

  if (python) {
    packageJson.main = '__init__.py';
    packageJson.pipcook.runtime = 'python';
  } else {
    packageJson.main = 'dist/index';
    packageJson.types = 'dist/index';
    packageJson.scripts = {
      build: 'npm run clean && npm run compile',
      clean: 'rm -rf ./dist && rm -rf tsconfig.tsbuildinfo',
      compile: 'tsc -b tsconfig.json'
    };
    packageJson.dependencies = {
      '@pipcook/pipcook-core': `^${pipcook}`
    }
  }

  fs.writeFileSync(
    path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2) + os.EOL
  );

  // write README
  await fs.writeFileSync(
    path.join(root, 'README.md'),
    [
      `# ${pluginName}`,
      '\n## Description',
      `A ${packageJson.pipcook.category} plugin.`,
      '\n## Parameters',
      '| Parameter | Type | Description |',
      '|:----------|:-----|:------------|',
    ].join('\n')
  );

  // move runtime files
  await fs.copy(
    path.join(__dirname, `templates/v${pipcook}-runtime-${python ? 'python' : 'default'}`),
    root
  );

  // move template files if presents
  if (category && !python) {
    const tmplPath = await ensureAndGetTemplate(template);
    await fs.copy(
      path.join(tmplPath, 'index.ts'),
      path.join(root, 'src/index.ts')
    );
  }

  console.log('The plugin is created.');
}

module.exports = createPlugin;
