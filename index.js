#!/usr/bin/env node

const commander = require('commander');
const chalk = require('chalk');
const packageJson = require('./package.json');
const createPlugin = require('./create-pipcook-plugin');

let projectName;

function abort(msg) {
	console.error(chalk.red(msg));
	process.exit(1);
}

const program = new commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments('<project-directory>')
  .usage(`<project-directory> [options]`)
  .action(name => {
    projectName = name;
  })
  .option('--category <plugin>', 'specify a category for the created plugin')
  // .option('--pipcook <ver>', 'specify a version for Pipcook, 1')
  .option('--python', 'create a plugin for Python developers')
  .parse(process.argv);

const { category, python } = program;
createPlugin(projectName, {
	template: `v1-${python ? 'python' : 'default'}-${category}`,
	pipcook: '1',
	python,
	category,
});
