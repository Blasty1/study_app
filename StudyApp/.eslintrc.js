module.exports = {
    root: true,
    extends: '@react-native-community',
    plugins: ['import'],
    settings: {
      'import/resolver': {
        node: {
          paths: ['FrontEnd'],
          alias: {
            _assets: "./FrontEnd/assets",
            _components: "./FrontEnd/components",
            _navigations: "./FrontEnd/navigations",
            _helper: "./FrontEnd/helper",
            _config: "./FrontEnd/config",
            _structure: "./FrontEnd/structure"
          },
        },
      },
    },
  };
  