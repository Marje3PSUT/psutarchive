# Contributing to PSUT Archive Front End

_This guideline is for Marje3 dev team_. There will be another one for all contributors after the first production
release.

## Understanding the tech stack

This project is built with [Nuxt 3](https://nuxt.com/) and it gets the data from
[our API](https://github.com/Marje3PSUT/psutarchive-api) which is built with [Strapi 4](https://docs.strapi.io/). We use
[DaisyUI](https://daisyui.com/) for styling components, as well as [Tailwind CSS](https://tailwindcss.com/) for more CSS
flexibility.

## Set up your local development environment

First, make sure that you have [Git installed](https://git-scm.com/downloads) as well as
[Node v18](https://nodejs.org/en). Enable [`yarn`](https://yarnpkg.com/getting-started/install) then follow these steps
to download and run the project locally:

1. Run `git clone https://github.com/Marje3PSUT/psutarchive.git`
2. `cd psutarchive`
3. `yarn install`
4. Create `.env` file and copy the content of `.env.example` into it, then add the required environment variables to
   connect to the API. (You can run the API locally with
   [these steps](https://github.com/Marje3PSUT/psutarchive-api#run-locally), make sure to
   [generate your API token](https://docs.strapi.io/user-docs/settings/API-tokens) and add it to `.env`)
5. Start the local development server: `yarn dev`

Installing the following VS Code extensions is highly recommended:

- [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) for Vue 3 support.
- [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) for integration with ESlint
  library.
- [language-postcss](https://marketplace.visualstudio.com/items?itemName=cpylua.language-postcss) for Tailwind CSS +
  PostCSS syntax highlighting.
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) for
  Tailwind CSS autocomplete and syntax highlighting.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for code formatting.

Now you're good to go.

## Development guideline

### I. Only work on the tasks assigned to you

Only work on things with an [open issue](https://github.com/Marje3PSUT/psutarchive/issues?q=is%3Aopen+is%3Aissue), if
there is not an issue, then [create one](https://github.com/Marje3PSUT/psutarchive/issues/new). Please only work on the
issues assigned to you to avoid overlapping or duplicate work (ask me to assign the issue to you).

### II. Create a separate branch from `dev` branch for your task

Always create a new branch from the `dev` branch for _each new task_.

Follow this branch naming convention: `<prefix>/branch-name`

- `<prefix>`: The prefix should be one of the following:
  - `feat` for new features
  - `fix` for bug fixes
  - `task` for other general tasks
  - `docs` for documentation
- `branch-name` should be short and concise and written in kebab-case (separate each word with '-')

**Example**:

```sh
git checkout dev && git pull # pull the latest changes from dev

git checkout -b task/new-branch-name # create new branch
```

### III. Write descriptive and concise commit messages

A commit message should describe the changes made in the commit in a clear and concise way. Follow these guidelines when
writing commit messages:

- Limit the first line of the commit message to 72 characters or less.
- Use the imperative mood and present tense in the subject line, e.g. "Add footer" instead of "Added footer".
- Use the body of the commit message to provide additional context or details, _if necessary_.
  - Use bullet points in the body of the commit message to break down changes, _if necessary_.

### IV. Always check your code formatting and linting before pushing

To identify current linting issues, run `npm run lint`.

If you've installed [ESlint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) VS Code
extension, it should point these issues out to you directly in the code.

Fix these issues before pushing your code.

### V. Do not hardcode strings in the code

To maintain localization for strings, never hardcode strings in the code. But instead, write each new _translatable_
string inside [`/lang`](https://github.com/Marje3PSUT/psutarchive/tree/dev/lang) with the English and Arabic
translations. Then call the string in the code using `$t('string_key')` where `string_key` is the property key you chose
for the string (the key must be the same for both languages).

For more information, check out [i18n documentation](https://v8.i18n.nuxtjs.org/getting-started/basic-usage).

## Development workflow

When you're assigned to a new task, follow this workflow:

1. After setting up your local environment, create a new branch for your task, according to the convention described
   above.
2. Test your feature / bugfix, then fix linting issues, if any (run `yarn lint` to see the issues).
3. **Before pushing your changes**, check if the base branch (dev branch) has newer changes and rebase your branch on
   top of it. This ensures that your changes are built on top of the latest codebase. Just run
   `git pull --rebase origin dev` while on your branch. Try to resolve any merge conflicts that _may_ occur after this
   step.
4. Commit your changes according to the convention above, then push them to your new branch
   (`git push -u origin your-branch-name`). _If you've pushed to your branch before, then you can just run `git push`_.
5. Create a pull request.

## Resources

- [Vue.js Docs](https://vuejs.org/guide/introduction.html)
- [Nuxt Docs](https://nuxt.com/docs)
- [DaisyUI Components Docs](https://daisyui.com/components/)
- [Strapi Nuxt Module](https://strapi.nuxtjs.org/usage): Learn how to fetch data from our API inside Nuxt.
