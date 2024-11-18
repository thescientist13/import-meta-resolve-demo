# import-meta-resolve-demo

Demo repo for using `import.meta.resolve`

## Demo

1. Clone the repo
1. Install NodeJS LTS (or run `nvm use`)
1. Install dependencies with `npm ci`

You can now run the demo by running  `npm run demo`

## Observations

### Missing main (`ERR_MODULE_NOT_FOUND`)

It looks like the **@types/trusted-types** package throws an `ERR_MODULE_NOT_FOUND`, presumably because it has an empty [main field in _package.json_](https://unpkg.com/browse/@types/trusted-types@2.0.7/package.json)?

```sh
➜  import-meta-resolve-demo git:(master) ✗ npm run demo

> import-meta-resolve-demo@1.0.0 demo
> node .

✅ SUCCESS: resolved lit at location =>  file:///Users/owenbuckley/Workspace/github/import-meta-resolve-demo/node_modules/lit/index.js
🚨 ERROR: could not resolve @types/trusted-types Error: Cannot find package '/Users/owenbuckley/Workspace/github/import-meta-resolve-demo/node_modules/@types/trusted-types' imported from /Users/owenbuckley/Workspace/github/import-meta-resolve-demo/index.js
    at legacyMainResolve (node:internal/modules/esm/resolve:204:26)
    at packageResolve (node:internal/modules/esm/resolve:827:14)
    at moduleResolve (node:internal/modules/esm/resolve:907:18)
    at defaultResolve (node:internal/modules/esm/resolve:1037:11)
    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:650:12)
    at #cachedDefaultResolve (node:internal/modules/esm/loader:599:25)
    at #resolveAndMaybeBlockOnLoaderThread (node:internal/modules/esm/loader:615:38)
    at ModuleLoader.resolveSync (node:internal/modules/esm/loader:632:52)
    at Object.resolve (node:internal/modules/esm/initialize_import_meta:33:25)
    at file:///Users/owenbuckley/Workspace/github/import-meta-resolve-demo/index.js:6:34 {
  code: 'ERR_MODULE_NOT_FOUND'
}
```