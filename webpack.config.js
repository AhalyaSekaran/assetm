module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/,
          loader: "postcss",
          options: {
            postcssOptions: {
              ident: "postcss",
              syntax: "postcss-scss",
              plugins: [
                require("postcss-import"),
                require("tailwindcss"),
                require("autoprefixer"),
              ],
            },
          },
        },
      ],
    },
  };
  