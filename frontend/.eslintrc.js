module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ['plugin:react/recommended', 'standard-with-typescript'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error', 'always'],
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/semi': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/member-delimiter-style': 'off',
        '@typescript-eslint/space-before-function-paren': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'off',
        'react/prop-types': 0,
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/promise-function-async': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        'n/no-callback-literal': 'off',
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@src', './src']],
                extensions: ['.js', '.jsx', '.ts', '.tsx'],
            },
        },
    },
};
