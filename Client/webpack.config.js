const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('@kentico/xperience-webpack-config');

module.exports = (webpackConfigEnv, argv) => {
    const baseConfig = baseWebpackConfig({
        orgName: 'dancing-goat',
        projectName: 'reporting',
        webpackConfigEnv,
        argv
    });

    const projectConfig = {
        module: {
            rules: [
                {
                    test: /\.(js|ts)x?$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader'
                }
            ]
        },
        output: {
            clean: true
        },
        devServer: {
            port: 3070
        }
    };

    return webpackMerge.merge(projectConfig, baseConfig);
};
