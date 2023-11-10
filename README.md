# Hyperlocal Community Engagement Platform

Welcome to the mono repo, have a look around!

## What's inside?

This monorepo includes the following packages/apps:

### Services, Apps and Packages

- `community-service`: a [serverless](https://www.serverless.com/) microservice
- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `ui`: a stub React component library shared by both `web` and `docs`
  applications
- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-next`
  and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

All services/packages/apps are 100%
[TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd hyperlocal-community
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd hyperlocal-community
yarn dev
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
