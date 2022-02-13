module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          "root": ["./main"],
          "extensions": [".js", ".ios.js", ".android.js"],
          "alias": {
            "_assets": "./main/assets",
            "_fonts": "./main/assets/fonts",
            "_images": "./main/assets/images",
            "_components": "./main/components",
            "_navigations": "./main/navigations",
            "_helper": "./main/helper",
            "_config": "./main/config",
            "_structure": "./main/structure"
          }
        }
      ]
    ]
  };
};
