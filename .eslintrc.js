module.exports = {
    "extends": "airbnb-base",
    "env": {
        "mocha": true
    },
    "settings": {
        "import/resolver": {
          "node": {
            "paths": ["."]
          }
        }
      },
    "rules": {
        "camelcase": [
            0,
            {
                "properties": "never"
            }
        ],
        "no-underscore-dangle": [
            "error",
            {
                "allow": ["_id", "_doc"]
            }
        ]
    }
};