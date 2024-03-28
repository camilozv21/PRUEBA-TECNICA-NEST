<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```

4. Levantar la base de datos
```
docker-compose up -d
```

5. Clonar el archivo ```.env.template``` y renombrar la copia a ```.env```

6. Lenar las variables de entorno definidas en el ```.env```

Nota: __LAS VARIABLES DE ENTORNO SE VAN A SUBIR AL REPOSITORIO CON LA FINALIDAD DE HACER MAS FACIL EL PROCESO DE PRUEBA, SIN EMBARGO MAS QUE CLARO QUE NO ES UNA BUENA PRACTICA__

7. Ejecutar la aplicacion en dev:
```
npm run start:dev
```

8. Reconstruir la base de datos con la semilla __ESTE COMANDO ELIMINA LOS REGISTROS DE LA BASE DE DATOS__
```
http://localhost:3000/api/seed
```

# Production Build

1. Crear el archivo ```.env.prod```

2. Llenar varibales de entorno para pdn

3. Crear la nueva imagen 
```
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```



## Stack usado
* MongoDB
* Nest