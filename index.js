const DEPS = ['lit', '@types/trusted-types'];


for(const dep of DEPS) {
  try {
    const resolved = import.meta.resolve(dep);

    console.log(`✅ SUCCESS: resolved ${dep} at location => `, resolved);
  } catch(e) {
    console.error(`🚨 ERROR: could not resolve ${dep}`, e);
  }
}