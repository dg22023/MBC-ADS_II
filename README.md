#Mini Booking Coworking (MBC-ADS_II)

Mini Booking Coworking es un sistema de gestión de reservas para espacios de coworking.  
Permite administrar las reservas de salas, oficinas y espacios compartidos, gestionando usuarios, horarios, disponibilidad y pagos.  
El proyecto forma parte del desarrollo académico del curso de Análisis y Diseño de Sistemas II, y busca simular una plataforma funcional de coworking moderno.

---
Docker

#  Clonar el repositorio
git clone https://github.com/dg22023/MBC-ADS_II.git

cd MBC-ADS_II

# (Opcional) Crear archivo de variables de entorno
cp .env.example .env

# Edita el archivo .env y configura tus variables (por ejemplo, DATABASE_URL, API_URL, etc.)

# Construir y levantar los contenedores en segundo plano
docker compose up -d --build

# Verificar que los servicios estén corriendo
docker ps

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
