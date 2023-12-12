-- Crear base de datos vivo_db;
-- Tabla roles
CREATE TABLE ROLES (
    rol_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    rol_name VARCHAR(30) NOT NULL
);

-- Tabla usuarios
CREATE TABLE EMPLEADOS (
    employee_id INT(11) AUTO_INCREMENT PRIMARY KEY,
    rol_id INT(11),
    nombre VARCHAR(50),
    apellido_paterno VARCHAR(50),
    apellido_materno VARCHAR(50),
    curp VARCHAR(18),
    nss VARCHAR(20),
    ine VARCHAR(250),
    rfc VARCHAR(15),
    fecha_nacimiento DATE,
    numero_telefono VARCHAR(15),
    correo_electronico VARCHAR(80),
    fecha_ingreso DATE,
    contrato VARCHAR(250),
    numero_empleado VARCHAR(100),
    password VARCHAR(250),
    calle VARCHAR(50),
    num_ext VARCHAR(50),
    num_int VARCHAR(10),
    colonia VARCHAR(50),
    cp VARCHAR(50),
    municipio VARCHAR(50),
    estado VARCHAR(50),
    estatus BOOLEAN NOT NULL,
    FOREIGN KEY (rol_id) REFERENCES ROLES(rol_id)
);

-- Tabla servicios
CREATE TABLE SERVICIOS (
    servicio_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_servicio VARCHAR(100),
    descripcion_servicio VARCHAR(255),
    tipo_servicio VARCHAR(100),
    renta_mensual DECIMAL(10, 2),
    pronto_pago DECIMAL(10, 2),
    megabytes INT,
    costo_servicios DECIMAL(10, 2) DEFAULT 100.00,
    televisores INT(1),
    costo_tvadicional DECIMAL(10, 2) DEFAULT 100.00,
    imagen_principal VARCHAR(100),
    imagen_1 VARCHAR(100),
    imagen_2 VARCHAR(100),
    comentario TEXT
);

-- Tabla clientes
CREATE TABLE CLIENTES (
    id_cliente INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    apellido_paterno VARCHAR(100),
    apellido_materno VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    fecha_registro DATE,
    ine VARCHAR(100),
    calle VARCHAR(50),
    num_ext VARCHAR(50),
    num_int VARCHAR(10),
    colonia VARCHAR(50),
    cp VARCHAR(50),
    municipio VARCHAR(50),
    estado VARCHAR(50),
    comprobante_domicilio VARCHAR(100),
    RFC VARCHAR(20),
    estatus BOOLEAN
);

-- Tabla contratos
CREATE TABLE CONTRATOS (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT(11),
    id_servicio INT(11),
    fecha_contrato DATE,
    televisores INT(1),
    pago_inicial DECIMAL (10, 2),
    renta_mensual DECIMAL(10, 2),
    pronto_pago DECIMAL(10, 2),
    comentario TEXT,
    borrado BOOLEAN,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente),
    FOREIGN KEY (id_servicio) REFERENCES SERVICIOS(servicio_id)
);

-- Tabla cuentas cliente
CREATE TABLE CUENTAS_CLIENTE (
    id_cuenta INT(11) AUTO_INCREMENT PRIMARY KEY,
    id_contrato INT(11),
    id_cliente INT(11),
    correo VARCHAR(50),
    contraseña VARCHAR(250),
    FOREIGN KEY (id_contrato) REFERENCES CONTRATOS(id_contrato),
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente)
);

-- Tabla estados de cuenta
CREATE TABLE ESTADO_CUENTA (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_contrato INT(11),
    monto_pago DECIMAL(10, 2),
    fecha_limite DATE,
    periodo DATE,
    estatus BOOLEAN,
    fecha_pago DATE,
    monto_pagado DECIMAL(10, 2),
    FOREIGN KEY (id_contrato) REFERENCES CONTRATOS(id_contrato)
);

-- Tabla pagos
CREATE TABLE PAGOS (
    id_pago INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_estado_cuenta INT(11),
    monto_pagado DECIMAL(10, 2),
    fecha_pago DATE,
    FOREIGN KEY (id_estado_cuenta) REFERENCES ESTADO_CUENTA(id_estadocuenta)
);

-- Tabla gastos
CREATE TABLE GASTOS (
    id_gasto INT(11) PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100),
    comentario TEXT,
    monto DECIMAL(10, 2),
    fecha DATE,
    fecha_modificacion TIMESTAMP
);

-- Tabla proveedores
CREATE TABLE PROVEEDORES (
    id_proveedor INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    calle VARCHAR(50),
    num_ext VARCHAR(50),
    num_int VARCHAR(10),
    colonia VARCHAR(50),
    cp VARCHAR(50),
    municipio VARCHAR(50),
    estado VARCHAR(50),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    activo BOOLEAN
);

-- Tabla vehiculos
CREATE TABLE AUTOMOVILES (
    id_vehiculo INT(11) PRIMARY KEY AUTO_INCREMENT,
    marca VARCHAR(100),
    modelo VARCHAR(100),
    placa VARCHAR(20),
    anio INT(11),
    color VARCHAR(50),
    tipo_combustible VARCHAR(50),
    kilometraje INT(11),
    estatus BOOLEAN
);

-- Tabla asignaciones
CREATE TABLE ASIGNACIONES_AUTOS (
    id_asignacion INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT(11),
    id_vehiculo INT(11),
    fecha_asignacion DATE,
    observaciones TEXT,
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADOS(employee_id),
    FOREIGN KEY (id_vehiculo) REFERENCES AUTOMOVILES(id_vehiculo)
);

-- Tabla inventario
CREATE TABLE MATERIALES (
    id_material INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    descripcion VARCHAR(255),
    stock INT,
    tipo VARCHAR(50),
    id_proveedor INT(11),
    FOREIGN KEY (id_proveedor) REFERENCES PROVEEDORES(id_proveedor)
);

-- Tabla clientes potenciales
CREATE TABLE CLIENTES_POTENCIALES (
    id_cliente_potencial INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(100),
    servicio_deseado VARCHAR(100),
    comentario VARCHAR(255)
);

-- Tabla asistencias
CREATE TABLE ASISTENCIAS (
    id_asistencia INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT(11),
    id_tipo INT(11),
    hora_entrada TIME,
    hora_salida TIME,
    fecha_asistencia DATE,
    horas_trabajadas INT(11),
    FOREIGN KEY (id_tipo) REFERENCES TIPO_ASISTENCIAS(id_tipo),
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADOS(employee_id)
);

-- Tabla tipos de asistencias
CREATE TABLE TIPO_ASISTENCIAS (
    id_tipo INT(11) AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    estatus BOOLEAN
);

-- Tabla tickets
CREATE TABLE TICKETS (
    id_ticket INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT(11),
    id_cliente INT(11),
    titulo VARCHAR(100),
    descripcion TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Pendiente', 'En Progreso', 'Completada', 'Cancelada') DEFAULT 'Pendiente',
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADOS(employee_id)
);

-- Tabla calendario
CREATE TABLE CALENDARIO (
    id_calendario INT(11) PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT(11),
    titulo VARCHAR(100),
    descripcion TEXT,
    fecha DATE,
    FOREIGN KEY (id_empleado) REFERENCES EMPLEADOS(employee_id)
);

