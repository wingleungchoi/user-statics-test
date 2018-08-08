module.exports = {
    "extends": "airbnb-base",
    "env": {
        "mocha": true
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