# AI Agent Guidance for this Repository

## Project structure
- This workspace is primarily a TypeScript learning repository under `session1/`.
- Source files live in `session1/src/`.
- Compiler settings are defined in `session1/tsconfig.json`.
- Output is configured to `session1/dist/`, but there is no existing build script for automated compilation.

## Important notes
- `session1/package.json` is the only package metadata file in the repository.
- `npm test` is currently a placeholder and does not execute real tests.
- There is no existing documentation beyond sample TypeScript source files.
- The project uses `type: commonjs` and `module: nodenext` in TypeScript configuration.

## How to work in this repo
- Prefer modifications in `session1/src/*.ts` unless the user explicitly requests another location.
- For new code, keep samples simple and educational: use explicit types and clear comments.
- If adding dependencies, update `session1/package.json` and use `npm install` from within `session1/`.
- Do not assume a test framework or build automation exists unless the user adds one.

## AI features requests
- There are no existing AI integrations or frameworks in this repo.
- If asked to implement AI-related functionality, clarify whether the user wants:
  - a conceptual TypeScript example,
  - a runtime integration with an external API,
  - or a demonstration of AI-related TypeScript patterns.
- Keep feature implementations consistent with the educational tone of the repo.

## Useful commands
- `cd session1 && npm install` to install packages after changes to `package.json`.
- `cd session1 && npx tsc --project tsconfig.json` to compile the TypeScript sources.
- `cd session1 && npm test` is not currently useful until a real test script is added.

## Best practices for agents
- Preserve the existing repository structure and avoid creating unnecessary root-level files outside of AI agent docs.
- When editing TypeScript, respect `strict: true` and prefer typed interfaces, explicit return types, and safe value handling.
- If creating or updating instructions, keep them minimal and focused on the actual repository layout and conventions.
