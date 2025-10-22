# Custom themes and configurations

Appearance and behavior of Explore.Community can be customized by:
- Optionally creating a custom config file to a path `app/configurations/config.<theme>.js`. Leave CONFIG variable empty to use the default configuration.
- Optionally adding custom style definitions to `sass/themes/<theme>` folder. Leave CONFIG variable empty to use the default theme.
- If you do add a custom configuration and theme, they both need to share the same name. e.g. Your configuration would be `config.example.js` and your custom styles theme would be in a folder called `example`, following the same structure as the default one.
- Your custom configuration will be merged with the default one.
- You need to add both `defaultEndpoint` and `ngsi.dataProvider` properties to the default config or your own custom one. These are mandatory and the only extra steps you need to run your app. Refer to `app/configurations/config.default.js` for more information.


## Themes in development mode

Dynamic theme mapping is not available when the UI server is launched as 'npm run dev'. The desired theme can de selected as:
- `CONFIG=<theme> npm run dev`


## Themes in production mode

Dynamic theme mapping is available by default in production mode i.e. when the app is launched using `npm start` command. A single
selected theme can be forced by setting the `CONFIG` env. variable:
- `CONFIG=<theme> npm start`


## Building the production version

The build command `npm run build` collects all existing themes found from `app/configurations` folder.

