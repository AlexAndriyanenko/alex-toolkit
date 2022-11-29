const path = require("path");

module.exports = {
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  framework: "@storybook/react",
  stories: ["../src/stories/**/*.stories.@(tsx|mdx)"],
  addons: ["@storybook/theming", "storybook-css-modules"],
  webpackFinal: (config) => {
    config.resolve.alias.components = path.resolve(__dirname, "../src/components");
    config.resolve.alias.utils = path.resolve(__dirname, "../src/utils");
    config.resolve.alias.assets = path.resolve(__dirname, "../src/assets");
    config.resolve.alias.hooks = path.resolve(__dirname, "../src/hooks");
    config.resolve.alias.models = path.resolve(__dirname, "../src/models");

    // modify storybook's file-loader rule to avoid conflicts with svgr
    const imagesPath = path.resolve(__dirname, "../src/assets/images");
    const fileLoaderRule = config.module.rules.find((rule) => rule.test.test(".svg"));
    fileLoaderRule.exclude = imagesPath;

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
        "file-loader",
      ],
    });

    return config;
  },
};
