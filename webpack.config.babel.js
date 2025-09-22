const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJsPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const OfflinePlugin = require('offline-plugin');

const CompressionPlugin = require('compression-webpack-plugin');

const WebpackAssetsManifest = require('webpack-assets-manifest');
const StatsPlugin = require('stats-webpack-plugin');

// const CopyWebpackPlugin = require('copy-webpack-plugin');

const {
  languages,
  themeEntries,
  faviconPlugins
} = require('./build/contextHelper');

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';
const isDevelopment = !isProduction;

const languageExp = new RegExp(`^./(${languages.join('|')})$`);
const momentExpression = /moment[/\\]locale$/;
const reactIntlExpression = /react-intl[/\\]locale-data$/;
const intlExpression = /intl[/\\]locale-data[/\\]jsonp$/;
const themeExpression = /sass[/\\]themes$/;
const selectedTheme = new RegExp(
  `^./(${process.env.CONFIG || 'default'})/main.scss$`
);

const productionPlugins = [
  ...faviconPlugins,
  new OfflinePlugin({
    excludes: [
      '**/.*',
      '**/*.map',
      '**/*.txt',
      '../stats.json',
      '../manifest.json',
      '**/*.gz',
      '**/*.br',
      'js/*_theme.*.js',
      'js/*_sprite.*.js',
      'assets/iconstats-*.json',
      'assets/icons-*/*'
    ],
    caches: {
      main: [':rest:'],
      additional: [],
      optional: [
        '*.png',
        'css/*.css',
        'assets/*.svg',
        'emitter/*.js',
        'assets/geojson/*.geojson',
        ':externals:'
      ]
    },
    // src for google fonts might change so https://fonts.gstatic.com addresses might require
    // some maintenance in this list to still keep them cached by service worker in the future.
    externals: [
      'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu7GxKOzY.woff2',
      'https://fonts.gstatic.com/s/roboto/v20/KFOmCnqEu92Fr1Mu4mxK.woff2',
      'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfChc4EsA.woff2',
      'https://fonts.gstatic.com/s/roboto/v20/KFOlCnqEu92Fr1MmWUlfBBc4.woff2',
      'https://fonts.gstatic.com/s/robotocondensed/v19/ieVl2ZhZI2eCN5jzbjEETS9weq8-19y7DRs5.woff2',
      'https://fonts.gstatic.com/s/robotocondensed/v19/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7DQ.woff2',
      'https://fonts.gstatic.com/s/robotocondensed/v19/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCoYb8td.woff2',
      'https://fonts.gstatic.com/s/robotocondensed/v19/ieVi2ZhZI2eCN5jzbjEETS9weq8-32meGCQYbw.woff2'
    ],
    updateStrategy: 'changed',
    autoUpdate: 1000 * 60 * 5,
    safeToUseOptionalCaches: true,
    ServiceWorker: {
      entry: './app/util/font-sw.js',
      events: true
    },
    version: '[hash]'
  }),
  new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].css',
    chunkFilename: 'css/[name].[contenthash].css'
  }),
  new CompressionPlugin({
    filename: '[path].gz[query]',
    test: /\.(js|css|html|svg|ico)$/,
    minRatio: 0.95,
    algorithm: 'gzip'
  }),
  new CompressionPlugin({
    filename: '[path].br[query]',
    test: /\.(js|css|html|svg|ico)$/,
    minRatio: 0.95,
    algorithm: 'brotliCompress'
  }),
  new StatsPlugin('../stats.json', {
    // We use stats.json in app/server.js to know which assets to serve. We
    // only need `.entrypoints.main.assets` for that.
    // https://github.com/webpack/webpack/blob/v4.44.1/declarations/WebpackOptions.d.ts#L1250-L1458
    all: false,
    entrypoints: true
  }),
  new WebpackAssetsManifest({ output: '../manifest.json' }),
  new webpack.DefinePlugin({
    'process.env.KIOSK_UA_REGEX': JSON.stringify(process.env.KIOSK_UA_REGEX)
  })
];

module.exports = {
  mode,
  entry: {
    main: ['./app/util/publicPath', './app/client'],
    ...(isProduction ? themeEntries : {})
  },
  output: {
    path: path.join(__dirname, '_static'),
    filename: isDevelopment ? 'js/[name].js' : 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[chunkhash].js',
    publicPath: isDevelopment ? '/proxy/' : `${process.env.APP_PATH || ''}/`,
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'app')],
        loader: 'babel-loader',
        options: {
          configFile: false,
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false
              }
            ],
            [
              '@babel/preset-react',
              { development: isDevelopment, useBuiltIns: true }
            ]
          ],
          plugins: [
            'relay',
            [
              '@babel/plugin-transform-runtime',
              {
                helpers: true,
                regenerator: true,
                useESModules: true
              }
            ],
            '@babel/plugin-syntax-dynamic-import',
            '@babel/plugin-transform-class-properties',
            '@babel/plugin-transform-json-strings'
          ]
        }
      },
      {
        test: /\.scss$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.(eot|png|ttf|woff|svg|jpeg|jpg)$/,
        loader: isDevelopment ? 'file-loader' : 'url-loader',
        options: { limit: 10000, outputPath: 'assets' }
      }
    ]
  },
  devtool:
    process.env.WEBPACK_DEVTOOL === 'false'
      ? false
      : process.env.WEBPACK_DEVTOOL || (isProduction ? 'source-map' : 'eval'),
  plugins: [
    new webpack.ContextReplacementPlugin(momentExpression, languageExp),
    new webpack.ContextReplacementPlugin(reactIntlExpression, languageExp),
    new webpack.ContextReplacementPlugin(intlExpression, languageExp),
    ...(isDevelopment
      ? [
          new webpack.ContextReplacementPlugin(themeExpression, selectedTheme),
          new webpack.DefinePlugin({
            'process.env.KIOSK_UA_REGEX': JSON.stringify(
              process.env.KIOSK_UA_REGEX
            )
          })
        ]
      : productionPlugins)
  ],
  optimization: {
    minimizer: [
      new TerserJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: !isProduction
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    moduleIds: 'named',
    chunkIds: 'named',
    splitChunks: {
      chunks: isProduction ? 'all' : 'async',
      cacheGroups: {
        react: {
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom|react-relay|relay-runtime)[\\/]/,
          reuseExistingChunk: false
        },
        digitransitComponents: {
          name: 'digitransit-components',
          test: /[\\/]node_modules[\\/](@digitransit-component|@digitransit-search-util|@digitransit-util|@hsl-fi)[\\/]/,
          reuseExistingChunk: false
        }
      }
    },
    runtimeChunk: isProduction
  },
  performance: { hints: false },
  node: {
    net: 'empty',
    tls: 'empty'
  },
  cache: true,
  resolve: {
    mainFields: ['browser', 'module', 'jsnext:main', 'main'],
    alias: {
      lodash: 'lodash-es',
      'lodash.merge': 'lodash-es/merge',
      moment$: 'moment/moment.js',
      'babel-runtime/helpers/slicedToArray': path.join(
        __dirname,
        'app/util/slicedToArray'
      ),
      'babel-runtime/core-js/get-iterator': path.join(
        __dirname,
        'app/util/getIterator'
      )
    }
  },
  externals: {
    'babel-runtime/core-js/array/from': 'var Array.from',
    '../core-js/array/from': 'var Array.from',
    'babel-runtime/core-js/json/stringify': 'var JSON.stringify',
    'babel-runtime/core-js/map': 'var Map',
    'babel-runtime/core-js/object/assign': 'var Object.assign',
    'babel-runtime/core-js/object/create': 'var Object.create',
    '../core-js/object/create': 'var Object.create',
    'babel-runtime/core-js/object/define-property': 'var Object.defineProperty',
    '../core-js/object/define-property': 'var Object.defineProperty',
    'babel-runtime/core-js/object/entries': 'var Object.entries',
    'babel-runtime/core-js/object/freeze': 'var Object.freeze',
    'babel-runtime/core-js/object/keys': 'var Object.keys',
    '../core-js/object/get-own-property-descriptor':
      'var Object.getOwnPropertyDescriptor',
    'babel-runtime/core-js/object/get-prototype-of':
      'var Object.getPrototypeOf',
    '../core-js/object/get-prototype-of': 'var Object.getPrototypeOf',
    'babel-runtime/core-js/object/set-prototype-of':
      'var Object.setPrototypeOf',
    '../core-js/object/set-prototype-of': 'var Object.setPrototypeOf',
    'babel-runtime/core-js/promise': 'var Promise',
    '../core-js/symbol': 'var Symbol',
    '../core-js/symbol/iterator': 'var Symbol.iterator',
    'babel-runtime/core-js/weak-map': 'var WeakMap',

    'babel-runtime/helpers/extends': 'var Object.assign',
    'object-assign': 'var Object.assign',
    'simple-assign': 'var Object.assign',

    'fbjs/lib/fetch': 'var fetch',
    './fetch': 'var fetch',

    'fbjs/lib/Map': 'var Map'
  },
  devServer: {
    allowedHosts: 'all',
    compress: true,
    host: '0.0.0.0',
    hot: false,
    port: process.env.HOT_LOAD_PORT || 9000,
    devMiddleware: {
      publicPath: '/'
    },
    static: false,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    client: {
      overlay: true
    }
  }
};
