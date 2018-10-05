const fse = require('fs-extra');
const rollup = require('rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');
const postcss = require('postcss');
const path = require('path');

async function buildJS() {
    const bundle = await rollup.rollup({
        input: 'demo/src/js/demo.js',
        plugins: [
            resolve(),
            commonjs({
                include: 'node_modules/**'
            }),
            babel()
        ]
    });
    
    await bundle.write({
        file: 'demo/dist/js/demo-bundle.js',
        format: 'iife',
        name: 'demo-bundle.js'
    });
}

async function buildCSS() {
    const srcFilepath = 'demo/src/css/style.css';
    const destFilepath = 'demo/dist/css/style.css';

    const plugins = [
		require('postcss-easy-import'),
    	require('postcss-nested'),
		require('cssnano')
	];

    const contents = await fse.readFile(srcFilepath);

    const result = await postcss(plugins).process(contents, {
        from: srcFilepath,
        to: destFilepath
    });
    
    await fse.ensureDir(path.dirname(destFilepath));

    fse.writeFile(destFilepath, result.css);
}

function copyHTML() {
    fse.copy('demo/src/index.html', 'demo/dist/index.html');
}

fse.ensureDir('demo/dist');

buildJS();
buildCSS();
copyHTML();

