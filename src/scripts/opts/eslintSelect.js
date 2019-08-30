/**
 * 选择 Eslint 类型
 */

const selectors = {
  'eslint-config-airbnb': {
    config: 'airbnb',
    deps: ['eslint-config-airbnb', 'eslint-plugin-import', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react', 'eslint-plugin-react-hooks'],
  },
  '@mi/eslint-config-mcfe-react-app': {
    config: '@mi/eslint-config-mcfe-react-app',
    deps: ['@mi/eslint-config-mcfe-react-app', 'eslint-plugin-flowtype', 'eslint-plugin-import', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react'],
  },
  'eslint-config-react-app': {
    config: 'eslint-config-react-app',
    deps: [
      'eslint-config-react-app',
      'eslint-plugin-flowtype',
      'eslint-plugin-import',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
    ],
  },
}

module.exports = selectors
