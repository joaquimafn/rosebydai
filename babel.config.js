module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    alias: {
                        '@': './',
                        '@components': './components',
                        '@screens': './screens',
                        '@navigation': './navigation',
                        '@hooks': './hooks',
                        '@utils': './utils',
                        '@services': './services',
                        '@store': './store',
                        '@assets': './assets',
                        '@types': './types',
                        '@theme': './theme',
                    },
                },
            ],
        ],
    };
}; 