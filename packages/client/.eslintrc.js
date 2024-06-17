module.exports = {
    settings: {
        react: {
            version: '19.0'
        },
        'json/sort-package-json': false
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        project: ['./tsconfig.json']
    },
    plugins: [
        '@typescript-eslint',
        'react-hooks',
        'testing-library',
        'jest-dom',
        'json-format',
        'yaml',
        'html',
        'simple-import-sort',
        'prettier',
    ],
    env: {
        browser: true,
        node: true,
        es6: true
    },
    extends: [
        'standard-react',
        'standard-jsx',
        'standard-with-typescript',
        'plugin:react/recommended',
        'plugin:testing-library/react',
        'plugin:jest-dom/recommended',
        'plugin:yaml/recommended',
        'prettier'
    ],
    rules: {
        'simple-import-sort/imports': 'warn',
        'simple-import-sort/exports': 'warn',
        'no-console': [
            'error',
            {
                allow: ['warn', 'error']
            }
        ],
        'react/prop-types': 'off',
        'react/display-name': 'off',
        'testing-library/no-container': 0,
        'testing-library/no-node-access': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        '@typescript-eslint/ban-types': 'warn',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/block-spacing': 'warn',
        '@typescript-eslint/await-thenable': 'warn',
        '@typescript-eslint/prefer-optional-chain': 'warn',
        '@typescript-eslint/consistent-type-exports': 'off',
        '@typescript-eslint/consistent-type-imports': 'off',
        '@typescript-eslint/prefer-nullish-coalescing': 'warn',
        '@typescript-eslint/no-confusing-void-expression': 'off',
        '@typescript-eslint/strict-boolean-expressions': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'warn',
        '@typescript-eslint/no-misused-promises': [
            'warn',
            { 'checksVoidReturn': false },
        ],
        'prettier/prettier': [
            'warn',
            {
                'semi': false,
                'trailing-comma': 'es5',
                'singleQuote': true,
                'printWidth': 100,
            }
        ],
    },
    ignorePatterns: [
        '!.*.json',
        '.eslintrc.js',
        'esbuild.js',
        'jest.*.js',
        'tailwind.*.js',
        'webpack.*.js',
        'tsconfig.json',
        '.pnp.js',
        '.yarn/',
        'dist/',
        'packages/evb-example-producer/',
        'node_modules/',
        'coverage/'
    ]
};
