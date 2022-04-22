import { join } from 'desm';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { rollup } from 'rollup';
import { expect, test } from 'vitest';

import distGitkeep from '~/index.js';

function fixture(fixtureName: string) {
	const testFolder = join(import.meta.url, '..');
	const fixturesFolder = join(import.meta.url, '../fixtures');
	const fixturePath = path.join(fixturesFolder, fixtureName);
	const tempFolder = path.join(testFolder, 'temp');

	if (!fs.existsSync(tempFolder)) {
		fs.mkdirSync(tempFolder, { recursive: true });
	}

	const tempFixturePath = path.join(tempFolder, fixtureName);

	fs.cpSync(fixturePath, tempFixturePath, {
		recursive: true,
	});

	return tempFixturePath;
}

test('creates a .gitkeep folder', async () => {
	const tempProjectDir = fixture('my-project');

	const bundle = await rollup({
		plugins: [distGitkeep()],
		input: path.join(tempProjectDir, 'index.js'),
	});

	await bundle.write({
		dir: path.join(tempProjectDir, 'dist'),
	});

	expect(fs.existsSync(path.join(tempProjectDir, 'dist/.gitkeep'))).toBe(true);
});
