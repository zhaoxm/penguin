import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts(x)$/,
        use: "swc-loader",
        exclude: /node_modules/,
      },
      { test: /\.txt$/, use: "raw-loader" },
    ],
  },
};

export default config;
