import fs from 'node:fs';
import { createRequire, isBuiltin } from 'node:module';

const { dependencies = {} } = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

for(const dependency of Object.keys(dependencies)) {
  try {
    const resolved = import.meta.resolve(dependency);
    const isNodeBuiltIn = isBuiltin(resolved);
    const marker = resolved && isNodeBuiltIn ? '⚠️ WARNING' : '✅ SUCCESS';

    console.log(`\n ${marker}: resolved ${dependency} at location => ${resolved} ({ isNodeBuiltIn: ${isNodeBuiltIn} })`);
  } catch(err) {
    console.log(`\n ⚠️ WARNING: could not resolve ${dependency} using \`import.meta.url\`' falling back to \`require.resolve\` - `, err);

    try {
      const require = createRequire(import.meta.url);

      require.resolve(dependency);
      console.log(`\n ✅ SUCCESS: was able to resolve ${dependency} using \`require.resolve\``);
    } catch (e) {
      console.error(`\n 🚨 ERROR: could not resolve ${dependency} using \`require.resolve\` - `, e);
    }
  }
  console.log('-------------------------------------------------------------------------')
}