# Souq

To load Categories in your Database:
run inside Master directory: 

```
mongorestore --db Souq toImport
```

and for testing import these samples:

```
mongoimport --db Souq --collection users --drop --file users.json

mongoimport --db Souq --collection products --drop --file products.json
```
