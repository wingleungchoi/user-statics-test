create a new Transaction for a given account_id
```
curl -X POST \
  https://jmwtdw2qxk.execute-api.us-east-1.amazonaws.com/dev/v1/transactions \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -H 'postman-token: b4b9a964-3af1-4c78-883e-36f304408f1f' \
  -d '{
        "account_id": "5b686c29c297fb740ed0d193",
        "description": "my salary",
        "amount": 10000,
        "ccy": "HKD",
        "date": "2018-08-06T23:43:24+08:00"
}'
```