# Mini Booking Coworking (MBC-ADS_II)

Mini Booking Coworking es un sistema de gestión de reservas para espacios de coworking.  
Permite administrar las reservas de salas, oficinas y espacios compartidos, gestionando usuarios, horarios, disponibilidad y pagos.  
El proyecto forma parte del desarrollo académico del curso de Análisis y Diseño de Sistemas II, y busca simular una plataforma funcional de coworking moderno.

---
# Docker

##  Clonar el repositorio
git clone https://github.com/dg22023/MBC-ADS_II.git

## Moverse al directorio raiz del proyecto
cd MBC-ADS_II

## Crear archivo de variables de entorno
cp .env.example .env

o

touch .env

## (Opcional)Edita el archivo .env y configura tus variables (por ejemplo, DATABASE_URL, API_URL, etc.)
## Incluir estas variables para la conexion con NeonDB
## Credenciales de Neon para la conexión JDBC
JDBC_DATABASE_URL=jdbc:postgresql://ep-square-truth-a432mw7o-pooler.us-east-1.aws.neon.tech:5432/neondb?sslmode=require&channelBinding=require  
DB_USER=neondb_owner  
DB_PASS=npg_YJimpE4beTa3  

# (Metodo Seguro)
# En terminal exportar cada variable antes de construir los contenedores
export JDBC_DATABASE_URL=jdbc:postgresql://ep-square-truth-a432mw7o-pooler.us-east-1.aws.neon.tech:5432/neondb?sslmode=require&channelBinding=require  
export DB_USER=neondb_owner  
export DB_PASS=npg_YJimpE4beTa3  

# Construir y levantar los contenedores en segundo plano
docker compose up -d

# Verificar que los servicios estén corriendo
docker ps

## Tecnologías principales

- **Frontend:** Angular 17 + Angular Material  
- **Backend:** Spring Boot (Java 17, Maven)  
- **Base de Datos:** PostgreSQL  
- **Contenedores:** Docker y Docker Compose  
- **Control de versiones:** Git y GitHub  

---

## Funcionalidades principales

- Registro y autenticación de usuarios.  
- Gestión de espacios disponibles para coworking.  
- Reserva y cancelación de espacios.  
- Visualización de disponibilidad en tiempo real.  
- Administración de usuarios, roles y horarios.  
- Integración con base de datos PostgreSQL.  
- Interfaz web moderna y responsiva desarrollada con Angular Material.  
- Backend REST API con Spring Boot.  

---

## Requisitos previos Local

Para ejecutar el proyecto necesitas tener instalado:

- **Java 17 o superior**  
- **Maven**  
- **Node.js (v18 o superior)**  
- **Angular CLI**  
- **PostgreSQL**  
- **Docker y Docker Compose** *(opcional, solo si deseas ejecutarlo con contenedores)*

---

Configuración del entorno (.env)
El proyecto utiliza un archivo .env para manejar las variables de entorno necesarias para la configuración de los servicios.
Este archivo debe colocarse en la raíz del proyecto antes de ejecutar los contenedores o iniciar los servicios manualmente.

Ejemplo de variables dentro del archivo .env:

POSTGRES_DB=mini_booking
POSTGRES_USER=admin
POSTGRES_PASSWORD=12345
DB_PORT=5432

SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/mini_booking
SPRING_DATASOURCE_USERNAME=admin
SPRING_DATASOURCE_PASSWORD=12345
BACKEND_PORT=8080

FRONTEND_PORT=4200

Pasos para ejecutar con Docker

1. Clona el repositorio:
   git clone https://github.com/usuario/MBC-ADS_II.git
   cd MBC-ADS_II

2. Crea el archivo .env en la raíz del proyecto y copia las variables mostradas arriba.

3. Construye y levanta los contenedores con Docker Compose:
   docker-compose up --build

4. Verifica que los servicios estén corriendo:
   docker ps

5. Accede al proyecto:
   - Frontend Angular: http://localhost:4200
   - Backend Spring Boot API: http://localhost:8080/api
   - Base de datos PostgreSQL: localhost:5432

6. Para detener los contenedores:
   docker-compose down
   
---
