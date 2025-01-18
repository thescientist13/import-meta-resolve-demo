import { createRequire, isBuiltin } from 'node:module';

const DEPS = ['lit', '@types/trusted-types', 'process', '@libsql/core', '@types/ws'];

for(const dep of DEPS) {
  try {
    const resolved = import.meta.resolve(dep);
    const isNodeBuiltIn = isBuiltin(resolved);
    const marker = resolved && isNodeBuiltIn ? '⚠️ WARNING' : '✅ SUCCESS';

    console.log(`\n ${marker}: resolved ${dep} at location => ${resolved} ({ isNodeBuiltIn: ${isNodeBuiltIn} })`);
  } catch(err) {
    console.log(`\n ⚠️ WARNING: could not resolve ${dep} using \`import.meta.url\`' falling back to \`require.resolve\` - `, err);

    try {
      const require = createRequire(import.meta.url);

      require.resolve(dep);
      console.log(`\n ✅ SUCCESS: was able to resolve ${dep} using \`require.resolve\``);
    } catch (e) {
      console.error(`\n 🚨 ERROR: could not resolve ${dep} using \`require.resolve\` - `, e);
    }
  }
  console.log('-------------------------------------------------------------------------')
}