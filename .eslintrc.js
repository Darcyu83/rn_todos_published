module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "jest": true
    },
    "extends": [
        "plugin:@typescript-eslint/recommended",
        "airbnb", 
        "airbnb/hooks",
        "airbnb-typescript",
        "prettier"      
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "./tsconfig.json",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
    },
    "plugins": ["react", "react-hooks", "@typescript-eslint", "prettier"],
    "rules": {
        "@typescript-eslint/no-restricted-imports": [
            "warn",
            {
              "name": "react-redux",
              "importNames": ["useSelector", "useDispatch"],
              "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
            }
          ],
        'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state'] }],
        'no-empty-pattern':'warn',
        '@typescript-eslint/no-empty-interface':'warn',
        '@typescript-eslint/no-unused-vars':'warn',
    },
    "settings": {
        "import/resolver": {
          "typescript": {}
        }
      },

};
