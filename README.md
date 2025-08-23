# Sistema de Gestión de Estudiantes y Calificaciones

Este proyecto consiste en una aplicación web completa para gestionar estudiantes y sus calificaciones, compuesta por:

- **API Backend**: Servidor FastAPI que maneja la lógica de negocio y la base de datos
- **Frontend**: Aplicación React con TypeScript que proporciona la interfaz de usuario

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Python 3.12+](https://www.python.org/downloads/)
- [Node.js v23.5.0](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Ejecución Individual de Aplicaciones

### Opción 1: Ejecutar la API Backend

#### Con Python nativo:
```bash
# Navegar al directorio de la API
cd API

# Crear un entorno virtual (recomendado)
python -m venv venv

# Activar el entorno virtual
# En macOS/Linux:
source venv/bin/activate
# En Windows:
# venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt

# Ejecutar la aplicación
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

La API estará disponible en: http://localhost:8000

#### Con Docker:
```bash
# Navegar al directorio de la API
cd API

# Construir la imagen
docker build -t estudiantes-api .

# Ejecutar el contenedor
docker run -p 8000:8000 -v $(pwd):/app estudiantes-api
```

### Opción 2: Ejecutar el Frontend

#### Con Node.js nativo:
```bash
# Navegar al directorio del frontend
cd fronted

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar en modo producción
npm run build
npm run serve
```

El frontend estará disponible en: http://localhost:3000

#### Con Docker:
```bash
# Navegar al directorio del frontend
cd fronted

# Construir la imagen
docker build -t estudiantes-frontend .

# Ejecutar el contenedor
docker run -p 3000:80 estudiantes-frontend
```

## 🐳 Ejecutar Ambas Aplicaciones con Docker Compose

La forma más sencilla de ejecutar todo el sistema es usando Docker Compose desde el directorio raíz:

```bash
# Desde el directorio raíz del proyecto
docker-compose up --build
```

Este comando:
- Construye las imágenes de Docker para ambas aplicaciones
- Inicia la API en el puerto 8000
- Inicia el frontend en el puerto 3000
- Configura la red entre ambos servicios
- Establece las dependencias correctas

### Comandos útiles de Docker Compose:

```bash
# Ejecutar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs api
docker-compose logs frontend

# Detener los servicios
docker-compose down

# Detener y eliminar volúmenes
docker-compose down -v

# Reconstruir las imágenes
docker-compose up --build --force-recreate
```

## 🌐 Acceso a las Aplicaciones

Una vez que ambos servicios estén ejecutándose:

- **Frontend**: http://localhost:3000
- **API Backend**: http://localhost:8000
- **Documentación de la API**: http://localhost:8000/docs

## 🔧 Configuración del Entorno

### Variables de Entorno

El frontend utiliza la variable `VITE_API_URL` para conectarse a la API. Esta variable se configura automáticamente en Docker, pero si ejecutas las aplicaciones nativamente, asegúrate de que apunte a la URL correcta de tu API.

### Puertos

- **API**: Puerto 8000
- **Frontend**: Puerto 3000 (en desarrollo) o 80 (en Docker)

## 📁 Estructura del Proyecto

```
notas/
├── API/                    # Backend FastAPI
│   ├── app/
│   │   ├── main.py        # Punto de entrada de la API
│   │   └── models/        # Modelos de datos
│   ├── requirements.txt    # Dependencias de Python
│   └── Dockerfile         # Configuración de Docker para la API
├── fronted/               # Frontend React
│   ├── src/               # Código fuente
│   ├── package.json       # Dependencias de Node.js
│   └── Dockerfile         # Configuración de Docker para el frontend
└── docker-compose.yml     # Orquestación de servicios
```

## 🚨 Solución de Problemas

### Problemas Comunes

1. **Puerto ya en uso**: Asegúrate de que los puertos 8000 y 3000 no estén siendo utilizados por otras aplicaciones
2. **Error de permisos en Docker**: En algunos sistemas, puede ser necesario ejecutar `docker-compose` con `sudo`
3. **Problemas de red**: Si las aplicaciones no pueden comunicarse, verifica que Docker esté ejecutándose correctamente

### Logs y Debugging

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ejecutar comandos dentro de un contenedor
docker-compose exec api bash
docker-compose exec frontend sh
```

## 📚 Recursos Adicionales

- [Documentación de FastAPI](https://fastapi.tiangolo.com/)
- [Documentación de React](https://react.dev/)
- [Documentación de Docker](https://docs.docker.com/)
- [Documentación de Docker Compose](https://docs.docker.com/compose/)

## 🤝 Contribución

Para contribuir al proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.
