# Custom themes and configurations

Appearance and behavior of digitransit-ui can be customized by:
- Creating a custom config file to a path `app/configurations/config.<theme>.js`
- Optionally adding custom style definitions to `sass/themes/<theme>` folder


## Themes in development mode

Dynamic theme mapping is not available when the UI server is launched as 'npm run dev'. The desired theme can de selected as:
- `CONFIG=<theme> npm run dev`


## Themes in production mode

Dynamic theme mapping is available by default in production mode i.e. when the app is launched using `npm start` command. A single
selected theme can be forced by setting the `CONFIG` env. variable:
- `CONFIG=<theme> npm start`


## Building the production version

The build command `npm run build` collects all existing themes found from `app/configurations` folder.

