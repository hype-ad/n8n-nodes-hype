const { rm } = require('fs/promises');
const { task, src, dest } = require('gulp');

task('clean', clean);
task('build:icons', copyIcons);

function clean() {
	const result = rm('dist', { recursive: true, force: true });
	return result;
}

function copyIcons() {
	const result = src('nodes/**/*.{png,svg,json}', { base: '.' }).pipe(dest('dist'));
	return result;
}
