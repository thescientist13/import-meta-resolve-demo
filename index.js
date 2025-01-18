import { createRequire, isBuiltin } from 'node:module';

const DEPS = ['lit', '@types/trusted-types', 'process'];

for(const dep of DEPS) {
  try {
    const resolved = import.meta.resolve(dep);
    const isNodeBuiltIn = isBuiltin(resolved);

    console.log(`\n ✅ SUCCESS: resolved ${dep} at location => ${resolved} ({ isNodeBuiltIn: ${isNodeBuiltIn} })`);
  } catch(err) {
    console.log(`\n ⚠️ WARNING: could not resolve ${dep}, falling back to \`require.resolve\``, err);

    try {
      const require = createRequire(import.meta.url);

      require.resolve(dep);
    } catch (e) {
      console.error(`\n 🚨 ERROR: could not resolve ${dep}`, e);
    }
  }
}