# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Deployment Instructions

### Setting up pm2 and Deploying to EC2

1. **Install pm2**:
   ```bash
   npm install pm2 -g
   ```

2. **Create pm2 ecosystem file**:
   Create a file named `ecosystem.config.js` in the root of your project with the following content:
   ```js
   module.exports = {
     apps: [
       {
         name: 'frontend',
         script: 'npm',
         args: 'start',
         env: {
           NODE_ENV: 'production',
         },
       },
     ],
   };
   ```

3. **Deploy to EC2**:
   - SSH into your EC2 instance.
   - Clone your repository.
   - Install dependencies and build the project:
     ```bash
     npm install
     npm run build
     ```
   - Start the application using pm2:
     ```bash
     pm2 start ecosystem.config.js
     ```

### Configuring GitHub Actions Workflow

1. **Create GitHub Actions workflow file**:
   Create a file named `deploy.yml` in the `.github/workflows` directory with the following content:
   ```yaml
   name: Deploy to EC2

   on:
     push:
       branches:
         - main

   jobs:
     deploy:
       runs-on: ubuntu-latest

       steps:
         - name: Checkout code
           uses: actions/checkout@v2

         - name: Set up Node.js
           uses: actions/setup-node@v2
           with:
             node-version: '14'

         - name: Install dependencies
           run: npm install

         - name: Build project
           run: npm run build

         - name: Deploy to EC2
           env:
             SSH_PRIVATE_KEY: ${{ secrets.SSH_PRIVATE_KEY }}
             EC2_HOST: ${{ secrets.EC2_HOST }}
             EC2_USER: ${{ secrets.EC2_USER }}
           run: |
             ssh -o StrictHostKeyChecking=no -i $SSH_PRIVATE_KEY $EC2_USER@$EC2_HOST 'cd /path/to/your/project && git pull && npm install && npm run build && pm2 restart ecosystem.config.js'
   ```
