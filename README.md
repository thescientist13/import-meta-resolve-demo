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

### No main exports map entry point (`ERR_PACKAGE_PATH_NOT_EXPORTED`)

Noticed that a handful of packages ([**@libsql/core**](https://unpkg.com/browse/@libsql/core@0.14.0/), [**@types/ws**](https://unpkg.com/browse/@types/ws@8.5.13/), [**dunder-proto**](https://unpkg.com/browse/dunder-proto@1.0.1/), [**math-intrinsics**](https://unpkg.com/browse/math-intrinsics@1.1.0/)) do have an exports map
```js
"exports": {
  "foo": {

  }
}
```

but they don't specifically have a ["main" entry point](https://nodejs.org/api/packages.html#subpath-exports) in their exports map
> _When using the `"exports"` field, custom subpaths can be defined along with the main entry point by treating the main entry point as the "." subpath_
```js
"exports": {
  ".": "./index.js",
  "foo": {

  }
}
```

And so as a result, `import.meta.resolve` will return a `ERR_PACKAGE_PATH_NOT_EXPORTED` error

```sh
🚨 ERROR: could not resolve @libsql/core Error [ERR_PACKAGE_PATH_NOT_EXPORTED]: No "exports" main defined in /Users/owenbuckley/Workspace/github/import-meta-resolve-demo/node_modules/@libsql/core/package.json
    at exportsNotFound (node:internal/modules/esm/resolve:294:10)
    at packageExportsResolve (node:internal/modules/esm/resolve:641:9)
    at resolveExports (node:internal/modules/cjs/loader:591:36)
    at Module._findPath (node:internal/modules/cjs/loader:668:31)
    at Module._resolveFilename (node:internal/modules/cjs/loader:1130:27)
    at Function.resolve (node:internal/modules/helpers:187:19)
    at file:///Users/owenbuckley/Workspace/github/import-meta-resolve-demo/index.js:17:15
    at ModuleJob.run (node:internal/modules/esm/module_job:218:25)
    at async ModuleLoader.import (node:internal/modules/esm/loader:329:24)
    at async loadESM (node:internal/process/esm_loader:34:7) {
  code: 'ERR_PACKAGE_PATH_NOT_EXPORTED'
}
```

### Node Built-ins Hijacking Dependencies

Noticed that when resolved the [**process**](https://unpkg.com/browse/process@0.11.10/) package, `import.meta.resolve` resolves to the NodeJS built-in version

```sh
✅ SUCCESS: resolved process at location => node:process ({ isNodeBuiltIn: true })
```