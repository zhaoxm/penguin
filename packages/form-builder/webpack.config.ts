import { Configuration } from "webpack";

const config: Configuration = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    filename: "my-first-webpack.bundle.js",
  },
  module: {
    rules: [
      { test: /\.txt$/, use: "raw-loader" },
      {
        test: /\.ts(x)$/,
        use: "ts-loader",
      },
    ],
  },
};

export default config;
