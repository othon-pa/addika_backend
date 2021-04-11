# Challenge-todos
### BE application.

## Installation guide Back-End
### 1. Install dependencies
Run this command in order to install the dependencies of server
```sh
$ npm install
```

### 2. Create .env file in the root
| Env variable　　　　　　　　　　　　　| Description 　　　　　　　　| Example |
| :--  | :--         | :--         |
| `DB_DATABASE` | DB name that we're going to connect. | DB_DATABASE=addika_test
| `DB_USER` | Our user that access to the DB. | DB_USER=root
| `DB_PASSWORD` | Password to authenticate and connect to our DB. | DB_PASSWORD=""
| `DB_HOST` | Host where our DB lives. | DB_HOST=localhost
| `DB_PORT` | Port in the host for our DB. | DB_PORT=3306
| `PORT` | Port where the server is going to run. This has to have the port 3001. | PORT=3001


### 3. Create database
You can choose any name but remember to set the same name in .env file

### 4. Execute migrations
This will create the table in the database.
```sh
$ npx sequelize-cli db:migrate
```

### 5. Excecute backend
```sh
$ npm start
```