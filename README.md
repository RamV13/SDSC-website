# SDSC Website

Repository containing the website infrastructure for Sarva Dharma Service Center.

## Contents

- `dist/` contains the actual website resources that should be deployed
- `src/` contains the source JS/CSS
- `webpack.config.js` contains the configuration for the Webpack bundling process

## Development

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/get-npm)

### Installation
- `npm install`

### Utilities
- `npm run serve` will launch the development server so the website can be accesses at `http://localhost:8080`
- `npm run build` builds all of the assets in a minified form for production into `dist/`
- `npm run watch` watches the `src/` directory for changes and triggers the Webpack build process when changes occur

### Modifications
- HTML: modify `dist/index.html`
- CSS: modify `src/mystyles.scss`
- JS: modify `src/index.js`
