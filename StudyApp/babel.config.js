module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./FrontEnd"],
          "extensions": [".js", ".ios.js", ".android.js"],
          "alias": {
            "_assets": "./FrontEnd/assets",
            "_fonts": "./FrontEnd/assets/fonts",
            "_images": "./FrontEnd/assets/images",
            "_components": "./FrontEnd/components",
            "_navigations": "./FrontEnd/navigations",
            "_helper": "./FrontEnd/helper",
            "_config": "./FrontEnd/config",
            "_structure": "./FrontEnd/structure"
          }
        }
      ]
    ]
  };
};
