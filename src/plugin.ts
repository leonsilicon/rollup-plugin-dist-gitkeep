import * as fs from 'node:fs';
import * as path from 'node:path';
import type { Plugin } from 'rollup';

export function distGitkeep(): Plugin {
	return {
		name: 'dist-gitkeep',
		writeBundle(options) {
			if (options.dir !== undefined) {
				fs.writeFileSync(path.join(options.dir, '.gitkeep'), '');
			}
		},
	};
}
