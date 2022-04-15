module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    //  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['prettier'],
    rules: {
        // 'prettier/prettier': 'error',
        'no-extra-semi': 'error',
        'no-unexpected-multiline': 'error',
    },
};
