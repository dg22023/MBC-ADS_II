#Mini Booking Coworking (MBC-ADS_II)

Mini Booking Coworking es un sistema de gestión de reservas para espacios de coworking.  
Permite administrar las reservas de salas, oficinas y espacios compartidos, gestionando usuarios, horarios, disponibilidad y pagos.  
El proyecto forma parte del desarrollo académico del curso de Análisis y Diseño de Sistemas II, y busca simular una plataforma funcional de coworking moderno.

---

##Tecnologías principales

- **Frontend:** Angular 17 + Angular Material  
- **Backend:** Spring Boot (Java 17, Maven)  
- **Base de Datos:** PostgreSQL  
- **Contenedores:** Docker y Docker Compose  
- **Control de versiones:** Git y GitHub  

---

##Funcionalidades principales

- Registro y autenticación de usuarios.  
- Gestión de espacios disponibles para coworking.  
- Reserva y cancelación de espacios.  
- Visualización de disponibilidad en tiempo real.  
- Administración de usuarios, roles y horarios.  
- Integración con base de datos PostgreSQL.  
- Interfaz web moderna y responsiva desarrollada con Angular Material.  
- Backend REST API con Spring Boot.  

---

##Requisitos previos

Para ejecutar el proyecto necesitas tener instalado:

- **Java 17 o superior**  
- **Maven**  
- **Node.js (v18 o superior)**  
- **Angular CLI**  
- **PostgreSQL**  
- **Docker y Docker Compose** *(opcional, solo si deseas ejecutarlo con contenedores)*

---

configuracion del entorno (.env)
El proyecto utiliza el archivo .env para manejar las variables de entorno necesarias para la configuracion de los servicios.
Este archivo debe colocarse en la raiz del proyecto antes de ejecutar los contenedores o iniciar lo servicios manualmente.

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

---

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

