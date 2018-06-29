const path = require('path');

module.exports = {
  use: [
    (neutrino) => {
      // add src folder to webpack.resolve.modules:
      neutrino.config.resolve.modules.add(neutrino.options.source)

      /*
       * eslint preset custom settings
       */
      /*
       * Set paths to src folders for eslint import/resolver. Now it will not complaint on unresolved external
       * when we skip src folder in path, for example:
       * import item from 'modules/item';
       * instead of:
       * import item from 'src/modules/item';
       */
      const eslintSettings = {
        settings: {
          'import/resolver': {
            'node': {
              'moduleDirectory': [
                'node_modules',
                // Not working with absolute path from neutrino.options.source
                // neutrino.options.source
                path.relative(neutrino.options.root, neutrino.options.source)
              ]
            }
          }
        },
        useEslintrc: true,
        emitWarning: process.env.NODE_ENV === 'development',
        rules: {
          // Disable JSX only in .jsx files
          'react/jsx-filename-extension': 'off',
          // Отключить запрет на пробел после { и перед }
          'react/jsx-curly-spacing': 'off',
          'global-require': 'warn',
          'no-unused-vars': 'warn'
        }
      };

      // console.log('eslintSettings: ' + JSON.stringify(eslintSettings, null, '  '));

      neutrino.use('@neutrinojs/airbnb', {
        eslint: eslintSettings
      });
      // neutrino.use('@neutrinojs/eslint', {
      //   eslint: eslintSettings
      // });
    },
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'merge-admin'
        }
      }
    ],
    '@neutrinojs/jest',
    // 'neutrino-middleware-react-ext',
    'neutrino-middleware-postcss-scss-modules',
    // 'redux-observable-utils',
  ]
};