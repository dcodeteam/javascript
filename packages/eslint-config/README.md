# eslint-config

[![npm version](https://badge.fury.io/js/%40dc0de%2Feslint-config.svg)](https://badge.fury.io/js/%40dc0de%2Feslint-config)

Eslint config extended from `eslint-config-base` with [eslint-plugin-typescript](https://github.com/nzakas/eslint-plugin-typescript) support.

#### Installation

```bash
# NPM
npm i -D @dc0de/eslint-config

# Yarn
yarn add -D @dc0de/eslint-config
```

#### Usage

```json
{
  "extends": ["@dc0de/eslint-config"]
}
```

##### With WebStorm

Add `--plugin typescript` to eslint extra options.
