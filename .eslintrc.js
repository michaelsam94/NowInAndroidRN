module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['src/core/domain/**/*.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '@core/data',
                  '@core/data/*',
                  '@features',
                  '@features/*',
                  'react',
                  'react-native',
                  'react-native/*',
                  'expo',
                  'expo-*',
                ],
                message:
                  'Domain layer must not import data, features, or UI frameworks.',
              },
            ],
          },
        ],
      },
    },
    {
      files: ['src/features/**/*.ts', 'src/features/**/*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              {
                group: [
                  '@features/*/hooks',
                  '@features/*/hooks/*',
                  '@features/*/screens',
                  '@features/*/screens/*',
                  '@features/*/store',
                  '@features/*/store/*',
                  '@features/*/components',
                  '@features/*/components/*',
                ],
                message:
                  'Import from another feature public API (@features/<name>) only.',
              },
            ],
          },
        ],
      },
    },
  ],
};
