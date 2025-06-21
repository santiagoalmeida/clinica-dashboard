# Backend Documentation

Este es el backend del proyecto "Clinica Dashboard", que se encarga de manejar la lógica del servidor y la interacción con la base de datos SQL Server.

## Estructura del Proyecto

- **src/app.ts**: Punto de entrada de la aplicación. Configura el servidor Express y establece middleware y rutas.
- **src/controllers/agenda.controller.ts**: Contiene la clase `AgendaController` con métodos para manejar solicitudes relacionadas con la agenda de la clínica.
- **src/routes/agenda.routes.ts**: Define las rutas para las operaciones de la agenda utilizando `AgendaController`.
- **src/services/agenda.service.ts**: Contiene la clase `AgendaService` con métodos para interactuar con la base de datos.
- **src/database/sqlserver.ts**: Establece la conexión con la base de datos SQL Server.
- **src/types/index.ts**: Define interfaces que representan los tipos de datos utilizados en la aplicación.

## Instalación

Para instalar las dependencias del backend, navega a la carpeta `backend` y ejecuta:

```
npm install
```

## Ejecución

Para iniciar el servidor, utiliza el siguiente comando:

```
npm start
```

El servidor se ejecutará en el puerto especificado en el archivo de configuración.

## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o un pull request en el repositorio.

## Licencia

Este proyecto está bajo la Licencia MIT.