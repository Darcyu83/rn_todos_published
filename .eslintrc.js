module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "airbnb", "airbnb/hooks","airbnb-typescript",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
    "rules": {
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
        '@typescript-eslint/no-empty-interface':'warn',
        'no-empty-pattern':'warn',
    },
    "settings": {
        "import/resolver": {
          "typescript": {}
        }
      },

};
