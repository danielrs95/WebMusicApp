const path = require('path');
const webpack = require('webpack');

// Definimos nuestro unico export, que será un objeto de jabascript con la confiuración para webpack

module.exports = {
  // Definimos el entry point para webpack el cuál será el index.js porque este es el que importará a todos los otros componentes
  entry: './src/index.js',

  // Definimos el modo, estará en development
  mode: 'development',

  /*
    Definimos las reglas, para especificar como queremos que webpack convierta el codigo.

    Webpack logra esto con algo llamado loaders, basicamente, packages que webpack usa para transformar el codigo de cierta manera

    Por ejemplo, la primera regla que definiremos será convertir ES6 a JS para esto:
      1. Definimos un module property y esto será un objeto
      2. Dentro de este necesitaremos una property llamada rules y eso será un array
      3. Acá pondremos ya la regla para transfromar ES6 code a regular JS
        - Esto tendrá una propiedad llamada test que es una expresión regular para seleccionar todos los archivos js y jsx
        - Excluimos todos los archivos que están en los node_modules
        - Seleccionamos el loader, osea el babel
        - Especificamos las opciones y esto será un objeto con una propiedad presets al babel/env
  */
  module: {
    rules: [
      // Regla para manejar JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },

      // Style loader & css loader
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  // Agregamos la propiedad resolve
  resolve: { extensions: ['*', '.js', '.jsx'] },

  // Definimos el output
  output: {
    path: path.resolve(__dirname, 'dist/'),
    publicPath: '/dist/',
    filename: 'bundle.js',
  },

  // Definimos opciones para nuestro server cuando estemos en development y que nos permita ver la aplicacion en el explorador
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 3000,
    publicPath: 'http://localhost:3000/dist/',
    hotOnly: true,
  },

  // Agregamos plugins
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
