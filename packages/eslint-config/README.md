# eslint-config

[![npm version](https://badge.fury.io/js/%40dc0de%2Feslint-config.svg)](https://badge.fury.io/js/%40dc0de%2Feslint-config)

Eslint config extended from `eslint-config-base` with [eslint-plugin-typescript](https://github.com/nzakas/eslint-plugin-typescript) support.

#### Installation

```bash
yarn add -D eslint@^4.19.1 && @dc0de/eslint-config
```

#### Usage

```json
{
  "extends": ["@dc0de/eslint-config"]
}
```

##### With WebStorm

Add `--plugin typescript` to eslint extra options.
