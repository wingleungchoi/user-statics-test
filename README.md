# interview-transactions-wing-leung
- node version: v8.10
- follow airbnb style guide: https://github.com/airbnb/javascript
- deploy script:
    - `$ AWS_ACCESS_KEY_ID=xxx AWS_SECRET_ACCESS_KEY=xxx  serverless deploy`
    - note: serverless requires this AWS_ACCESS_KEY_ID has AdministratorAccess right in IAM
- test script:
    - `$ npm test`

# Steps to test
1. npm i
2. NODE_ENV=test node_modules/.bin/sequelize db:create // for test DB creation
3. NODE_ENV=test node_modules/.bin/sequelize db:migrate // for test DB migration
4. npm test
