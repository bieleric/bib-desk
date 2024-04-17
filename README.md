# bib-desk
This is a simple library software


## Build

### Hints
1. Change loaded file to ```dist/vue/index.html``` in ```main.js```
2. Add ```base: "./"``` in ```vite.config.js```

## Development
1. Start Vue instance on localhost
```
npm run dev
```
2. Start Electron instance based on URL in main.js
```
npm run start:electron
```

## Deployment
1. Build Vue app to ```dist/vue```
```
npm run build
```
2. Check ```package.json``` in ```extraResources``` that path to database is correct
3. Check in ```database.js``` that the path points to the right destination of the database after packaging regarding to OS
4. Package the application
```
npm run package
```