# editor: vscode

# frontend:
### es6 plain js: index.html (no extrernal libraries or freamworks except jQuery)
### es5 babel with webpack: index_babel.html

# backend:
### folder: api

## to start the backend
```
mysql <your mysql info>
mysql> create database elementor_market
$ mysql -u root market < market.sql
$ vim api/config/database.php
$ php -S localhost:8080
````
## es6 http://localhost:8080/
## es5 http://localhost:8080/babel-index.html

## build for es5 with the command 
````
$ npm install
$ npm run webpack
````