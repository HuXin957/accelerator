module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["babel-plugin-root-import",
      {
        "rootPathPrefix": "app", // `app` 默认
        "rootPathSuffix": "./app",
      }],
  ]
};
