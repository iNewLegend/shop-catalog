# Shop-Catalog

###Is  for:
  - Just 4 fun project, for a study and practice.
  - Trying different things and approaches, new ideas.
  - Trying to figure out new way at looking at things.
  - Be creative, anyway its has to be for fun.
  - Be strict but with a cool way.
  - Give any ideas chance to live.

## Backend(s)
  - Core PHP
  - NestJS.
  
## Frontend
  - Core: Set of modules to communicate with DOM & Appling MVC.

### Build-With
- Babel
- Webpack
- JQuery

## Current Goals
- Remove jQuery.
- Modular
- Well structured
- No dependencies except babel and webpack. 

## Done Goals
- Apply MVC.
  
# [ Demo ]
### preview
![alt text](https://i.ibb.co/JFQ9Wm1/1.png)
![alt text](https://i.ibb.co/KGgyCx1/2.png)
![alt text](https://i.ibb.co/gygZSBb/3.png)
![alt text](https://i.ibb.co/cYV4d2G/image.png)
![alt text](https://i.ibb.co/kHsq0dq/image.png)

### [ Live ]
No hosting at the moment

# [ Install ]:
```shell script
$ git clone https://github.com/iNewLegend/shop-catalog.git
$ cd shop-catalog
$ npm install
```
## [ Frontend ]
```shell script
$ npm run frontend:watch:server
```
* Access this url [http://localhost:8080](http://localhost:8080)
## [ Backend ]
### The available backends:
* ```/backend/inewlegend/php``` Simple, no composer, no dependency's backend:

    ```shell script
    $ npm run backend:php:debug
    ```
    * For creating the database access this url `http://localhost:8081/?cmd=admin/install/<mysql_host>/<mysql_username>/<mysql_password>/<mysql_database_name>` and dont forget replace <> with yours real credentials. this will create the database and create simple mock catalog.
    * ## Rules:
        ### Code Access
        | Type | Modules | Services | Library
        | ------ | ------ | ------ | ------ |
        | Modules | Yes | No | No
        | Services | Yes | Yes | Yes
        | Library | No | No | Yes
        
* ```/backend/underyourskin/nestjs``` NestJS backend
    ```shell script
    $ npm run backend:nestjs:debug
    ```
    * For configure the database access this file `backend/underyourskin/nestjs/config/database.json`
    
