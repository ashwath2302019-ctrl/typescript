npm scripts are useful because they create shortcuts for long commands.
Instead of remembering and typing complex commands every time,
developers can simply run commands like `npm start` or `npm run build`.

**Write a comment** in `NOTES.md` explaining the difference between `dependencies` and `devDependencies` and why `nodemon` belongs in `devDependencies`.

Dependencies is neede for running your application . for example if we need to create a website for a product we
should mention the product details , price tags and so on which the customers sees and react. Devdepencies is 
needed only during the devlopment stage that is in the above example the "assembling,constructing the product"
is hidden (i.e) the customers will not take account into that.

# npm install vs npm ci

npm install is used during development. It installs packages from package.json and can update package-lock.json. I use it when I add a new package or work normally on my project.

npm ci is used for clean and exact installation. It installs packages exactly from package-lock.json and removes the old node_modules folder first. I use it when setting up the project on another computer, in a team, or during deployment.