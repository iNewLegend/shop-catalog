# Shop-Catalog

## Backend
  - Core PHP Backend
  
## Frontend
  - Simple API
  - Core: Set of modules to communicate with DOM.
  - Modules: Component, Logger, Page
  - Components: Cart, Catalog
  - Pages: Catalog, Checkout 
  - Services: Terminal


## Build-With
  - Core PHP
  - jQuery
  - Babel
  - Webpack
  
## Goals
  - Remove jQuery.
  - Modular
  - Well structured
  - Apply MVC.
  - No dependencies except babel and webpack. 

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
```
## Frontend
*
    ```
    $ cd shop-catalog
    $ npm install
    $ npm run watch_server
    ```
* Access this url `http://localhost:8080`
## Backend
### Few backends are available
```/backend/inewlegend/php``` Simple, no composer, no dependencies backend:
*
    

    $ cd shop-catalog/backend/inewlegend.php
    $ php -S localhost:8081

* Access this url `http://localhost:8081/?cmd=admin/install/<mysql_host>/<mysql_username>/<mysql_password>/<mysql_database_name>` and dont forget replace <> with yours real credentials. this will create the database and create simple mock catalog.


