# NxPratice

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ Your new, shiny [Nx workspace](https://nx.dev) is almost ready ✨.

[Learn more about this workspace setup and its capabilities](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or run `npx nx graph` to visually explore what was created. Now, let's get you up to speed!

## Finish your remote caching setup

[Click here to finish setting up your workspace!](https://cloud.nx.app/connect/OGde4L6jGh)

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve web
```

To create a production bundle:

```sh
npx nx build web
```

To see all available targets to run for a project, run:

```sh
npx nx show project web
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:

- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

# Nx Monorepo Setup with Angular, Tailwind CSS, and NestJS

This guide walks you through initializing an Nx workspace, setting up Angular and NestJS applications, and adding Tailwind CSS.

---

## 1. Initialize Nx Globally

Install the Nx CLI globally using one of the following methods:

### Using npm:

```bash
npm install -g nx
```

### Or on Ubuntu:

```bash
sudo add-apt-repository ppa:nrwl/nx
sudo apt update
sudo apt install nx
```

---

## 2. Create a New Nx Workspace

Use the following command to start creating your workspace:

```bash
npx create-nx-workspace@latest
```

When prompted:

- Choose a preset (e.g., `apps`, or `empty`)
- Provide a workspace name
- Enable or disable Nx Cloud based on your preference

---

## 3. Add an Angular Application

To generate an Angular application inside your workspace:

```bash
npx nx g @nx/angular:application web
```

This creates the app in `apps/web`.

---

## 4. Add Tailwind CSS to Angular

It's best to follow the [official Tailwind CSS Angular setup guide](https://tailwindcss.com/docs/guides/angular).

Alternatively, you can use the Nx plugin:

```bash
npx nx g @nx/angular:setup-tailwind web
```

---

## 5. Add NestJS Plugin and Create a NestJS Application

Install the NestJS plugin:

```bash
nx add @nx/nest
```

Generate a NestJS app inside `apps/`:

```bash
nx g @nx/nest:app my-nest-app
```

---

## 6. Generate an Angular Component

To generate a component in your Angular app:

```bash
nx generate @nx/angular:component --name=joint-demo --path=apps/web/src/app/components/joint-demo.component
```

This creates `joint-demo` inside `apps/web/src/app/components/`.

---

## 7. Common Nx Commands

### Serve the Angular app:

```bash
nx serve web
```

### Serve the NestJS app:

```bash
nx serve my-nest-app
```

### Build apps:

```bash
nx build web
nx build my-nest-app
```

### Lint, Test, Format:

```bash
nx lint web
nx test web
nx format:write
```

---

## 8. Final Structure

```
apps/
├── web/           # Angular app
└── my-nest-app/   # NestJS app

libs/
# Optional shared libraries can be added here
```

---

## ✅ You're Ready!

Your monorepo is now set up with:

- Nx workspace
- Angular frontend (with Tailwind CSS)
- NestJS backend
- Organized structure for scalable development

Happy coding! 🚀
