import { createRequire } from 'module';

const DEPS = ['lit', '@types/trusted-types'];

for(const dep of DEPS) {
  try {
    const resolved = import.meta.resolve(dep);

    console.log(`✅ SUCCESS: resolved ${dep} at location => `, resolved);
  } catch(err) {
    console.log(`⚠️ WARNING: could not resolve ${dep}, falling back to \`require.resolve\``, err);

    try {
      const require = createRequire(import.meta.url);
      const requireResolved = require.resolve(dep);
    } catch (e) {
      console.error(`🚨 ERROR: could not resolve ${dep}`, e);
    }
  }
}