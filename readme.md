# Shop-Catalog
## Includes
  - Simple PHP Backend
  - Simple API
  - Modules: Logger, Page
  - Components: Cart, Catalog
  - Services: Terminal


## Build-With
  - jQuery
  - ES6
  - Babel
  - Webpack
  
## Goals
  - Remove jQuery.
  - Modular
  - Well structured
  - Apply MVC.

# Code
Editor: PhpStrom

## Rules:
### Code Access
| Type | Modules | Services | Library
| ------ | ------ | ------ | ------ |
| Modules | Yes | No | No
| Services | Yes | Yes | Yes
| Library | No | No | Yes

# demo
### preview
![alt text](https://i.ibb.co/JFQ9Wm1/1.png)
![alt text](https://i.ibb.co/KGgyCx1/2.png)
![alt text](https://i.ibb.co/gygZSBb/3.png)
![alt text](https://i.ibb.co/cYV4d2G/image.png)
![alt text](https://i.ibb.co/kHsq0dq/image.png)

### Live
No hosting at the moment

# install:
```
git clone https://github.com/iNewLegend/shop-catalog.git
cd shop-catalog/frontend
npm install
npm run watch
```

Another session
```
cd shop-catalog
mysql <your mysql auth>
mysql> create database market
$ mysql -u <your user> market < database.sql
$ nano api/config/database.php
$ php -S localhost:8080
````
## http://localhost:8080/frontend/

