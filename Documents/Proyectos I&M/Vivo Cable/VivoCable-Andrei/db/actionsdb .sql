-- INSERTAR ROL
DELIMITER //
CREATE PROCEDURE CreateRole(
    IN roleName VARCHAR(30)
)
BEGIN
    INSERT INTO ROLES (rol_name) VALUES (roleName);
END //
DELIMITER ;
CALL CreateRole('Nuevo Rol');

-- ELIMINAR ROL
DELIMITER //
CREATE PROCEDURE DeleteRole(
    IN roleId INT
)
BEGIN
    DELETE FROM ROLES
    WHERE rol_id = roleId;
END //
DELIMITER ;
CALL DeleteRole(1);

-- ACTUALIZAR ROL
DELIMITER //
CREATE PROCEDURE UpdateRole(
    IN roleId INT,
    IN newRoleName VARCHAR(30)
)
BEGIN
    UPDATE ROLES
    SET rol_name = newRoleName
    WHERE rol_id = roleId;
END //
DELIMITER ;
CALL UpdateRole(1, 'Rol Actualizado');

-- INSERTAR EMPLEADO
DELIMITER //
CREATE PROCEDURE CreateEmployee(
    IN roleId INT,
    IN firstName VARCHAR(50),
    IN lastNamePat VARCHAR(50),
    IN lastNameMat VARCHAR(50),
    IN curp VARCHAR(18),
    IN nss VARCHAR(20),
    IN ine VARCHAR(250),
    IN rfc VARCHAR(15),
    IN birthDate DATE,
    IN phoneNumber VARCHAR(15),
    IN emailAddress VARCHAR(80),
    IN hireDate DATE,
    IN contract VARCHAR(250),
    IN employeeNumber VARCHAR(100),
    IN password VARCHAR(250),
    IN street VARCHAR(50),
    IN streetNumber VARCHAR(50),
    IN intNumber VARCHAR(10),
    IN neighborhood VARCHAR(50),
    IN postalCode VARCHAR(50),
    IN city VARCHAR(50),
    IN state VARCHAR(50),
    IN status BOOLEAN
)
BEGIN
    INSERT INTO EMPLEADOS (
        rol_id, nombre, apellido_paterno, apellido_materno, curp, nss,
        ine, rfc, fecha_nacimiento, numero_telefono, correo_electronico,
        fecha_ingreso, contrato, numero_empleado, contraseña, calle,
        num_ext, num_int, colonia, cp, municipio, estado, estatus
    ) VALUES (
        roleId, firstName, lastNamePat, lastNameMat, curp, nss,
        ine, rfc, birthDate, phoneNumber, emailAddress,
        hireDate, contract, employeeNumber, password, street,
        streetNumber, intNumber, neighborhood, postalCode, city, state, status
    );
END //
DELIMITER ;

-- ELIMINAR EMPLEADO
DELIMITER //
CREATE PROCEDURE DeleteEmployee(
    IN empId INT
)
BEGIN
    DELETE FROM EMPLEADOS
    WHERE employee_id = empId;
END //
DELIMITER ;

-- ACTUALIZAR EMPLEADO
DELIMITER //
CREATE PROCEDURE UpdateEmployee(
    IN empId INT,
    IN roleId INT,
    IN firstName VARCHAR(50),
    IN lastNamePat VARCHAR(50),
    IN lastNameMat VARCHAR(50),
    IN curp VARCHAR(18),
    IN nss VARCHAR(20),
    IN ine VARCHAR(250),
    IN rfc VARCHAR(15),
    IN birthDate DATE,
    IN phoneNumber VARCHAR(15),
    IN emailAddress VARCHAR(80),
    IN hireDate DATE,
    IN contract VARCHAR(250),
    IN employeeNumber VARCHAR(100),
    IN password VARCHAR(250),
    IN street VARCHAR(50),
    IN streetNumber VARCHAR(50),
    IN intNumber VARCHAR(10),
    IN neighborhood VARCHAR(50),
    IN postalCode VARCHAR(50),
    IN city VARCHAR(50),
    IN state VARCHAR(50),
    IN status BOOLEAN
)
BEGIN
    UPDATE EMPLEADOS
    SET
        rol_id = roleId,
        nombre = firstName,
        apellido_paterno = lastNamePat,
        apellido_materno = lastNameMat,
        curp = curp,
        nss = nss,
        ine = ine,
        rfc = rfc,
        fecha_nacimiento = birthDate,
        numero_telefono = phoneNumber,
        correo_electronico = emailAddress,
        fecha_ingreso = hireDate,
        contrato = contract,
        numero_empleado = employeeNumber,
        contraseña = password,
        calle = street,
        num_ext = streetNumber,
        num_int = intNumber,
        colonia = neighborhood,
        cp = postalCode,
        municipio = city,
        estado = state,
        estatus = status
    WHERE employee_id = empId;
END //
DELIMITER ;

-- INSERTAR SERVICIO
DELIMITER //
CREATE PROCEDURE CreateService(
    IN serviceName VARCHAR(100),
    IN serviceDescription VARCHAR(255),
    IN serviceType VARCHAR(100),
    IN monthlyRent DECIMAL(10, 2),
    IN earlyPayment DECIMAL(10, 2),
    IN megabytes INT,
    IN serviceCost DECIMAL(10, 2),
    IN tvCount INT,
    IN additionalTvCost DECIMAL(10, 2),
    IN mainImage VARCHAR(100),
    IN image1 VARCHAR(100),
    IN image2 VARCHAR(100),
    IN comment TEXT
)
BEGIN
    INSERT INTO SERVICIOS (
        nombre_servicio, descripcion_servicio, tipo_servicio, renta_mensual,
        pronto_pago, megabytes, costo_servicios, televisores, costo_tvadicional,
        imagen_principal, imagen_1, imagen_2, comentario
    ) VALUES (
        serviceName, serviceDescription, serviceType, monthlyRent,
        earlyPayment, megabytes, serviceCost, tvCount, additionalTvCost,
        mainImage, image1, image2, comment
    );
END //
DELIMITER ;

-- ELIMINAR SERVICIO
DELIMITER //
CREATE PROCEDURE DeleteService(
    IN serviceId INT
)
BEGIN
    DELETE FROM SERVICIOS
    WHERE servicio_id = serviceId;
END //
DELIMITER ;

-- ACTUALIZAR SERVICIO
DELIMITER //
CREATE PROCEDURE UpdateService(
    IN serviceId INT,
    IN serviceName VARCHAR(100),
    IN serviceDescription VARCHAR(255),
    IN serviceType VARCHAR(100),
    IN monthlyRent DECIMAL(10, 2),
    IN earlyPayment DECIMAL(10, 2),
    IN megabytes INT,
    IN serviceCost DECIMAL(10, 2),
    IN tvCount INT,
    IN additionalTvCost DECIMAL(10, 2),
    IN mainImage VARCHAR(100),
    IN image1 VARCHAR(100),
    IN image2 VARCHAR(100),
    IN comment TEXT
)
BEGIN
    UPDATE SERVICIOS
    SET
        nombre_servicio = serviceName,
        descripcion_servicio = serviceDescription,
        tipo_servicio = serviceType,
        renta_mensual = monthlyRent,
        pronto_pago = earlyPayment,
        megabytes = megabytes,
        costo_servicios = serviceCost,
        televisores = tvCount,
        costo_tvadicional = additionalTvCost,
        imagen_principal = mainImage,
        imagen_1 = image1,
        imagen_2 = image2,
        comentario = comment
    WHERE servicio_id = serviceId;
END //
DELIMITER ;

-- INSERTAR CLIENTE
DELIMITER //
CREATE PROCEDURE CreateClient(
    IN firstName VARCHAR(100),
    IN lastNamePat VARCHAR(100),
    IN lastNameMat VARCHAR(100),
    IN phone VARCHAR(20),
    IN email VARCHAR(100),
    IN registrationDate DATE,
    IN ine VARCHAR(100),
    IN street VARCHAR(50),
    IN streetNumber VARCHAR(50),
    IN intNumber VARCHAR(10),
    IN neighborhood VARCHAR(50),
    IN postalCode VARCHAR(50),
    IN city VARCHAR(50),
    IN state VARCHAR(50),
    IN addressProof VARCHAR(100),
    IN rfc VARCHAR(20),
    IN status BOOLEAN
)
BEGIN
    INSERT INTO CLIENTES (
        nombre, apellido_paterno, apellido_materno, telefono, correo,
        fecha_registro, ine, calle, num_ext, num_int, colonia,
        cp, municipio, estado, comprobante_domicilio, RFC, estatus
    ) VALUES (
        firstName, lastNamePat, lastNameMat, phone, email,
        registrationDate, ine, street, streetNumber, intNumber, neighborhood,
        postalCode, city, state, addressProof, rfc, status
    );
END //
DELIMITER ;

-- ELIMINAR CLIENTE
DELIMITER //
CREATE PROCEDURE DeleteClient(
    IN clientId INT
)
BEGIN
    DELETE FROM CLIENTES
    WHERE id_cliente = clientId;
END //
DELIMITER ;

-- ACTUALIZAR CLIENTE
DELIMITER //
CREATE PROCEDURE UpdateClient(
    IN clientId INT,
    IN firstName VARCHAR(100),
    IN lastNamePat VARCHAR(100),
    IN lastNameMat VARCHAR(100),
    IN phone VARCHAR(20),
    IN email VARCHAR(100),
    IN registrationDate DATE,
    IN ine VARCHAR(100),
    IN street VARCHAR(50),
    IN streetNumber VARCHAR(50),
    IN intNumber VARCHAR(10),
    IN neighborhood VARCHAR(50),
    IN postalCode VARCHAR(50),
    IN city VARCHAR(50),
    IN state VARCHAR(50),
    IN addressProof VARCHAR(100),
    IN rfc VARCHAR(20),
    IN status BOOLEAN
)
BEGIN
    UPDATE CLIENTES
    SET
        nombre = firstName,
        apellido_paterno = lastNamePat,
        apellido_materno = lastNameMat,
        telefono = phone,
        correo = email,
        fecha_registro = registrationDate,
        ine = ine,
        calle = street,
        num_ext = streetNumber,
        num_int = intNumber,
        colonia = neighborhood,
        cp = postalCode,
        municipio = city,
        estado = state,
        comprobante_domicilio = addressProof,
        RFC = rfc,
        estatus = status
    WHERE id_cliente = clientId;
END //
DELIMITER ;

--Crear Contrato
DELIMITER //
CREATE PROCEDURE AgregarContrato(
    IN p_id_cliente INT,
    IN p_id_servicio INT,
    IN p_televisores INT
)
BEGIN
    SET @v_fecha_contrato = CURDATE(); -- Utiliza la fecha actual del sistema

    -- Obtener información del servicio
    SET @v_renta_mensual = (SELECT renta_mensual FROM SERVICIOS WHERE servicio_id = p_id_servicio);
    SET @v_pronto_pago = (SELECT pronto_pago FROM SERVICIOS WHERE servicio_id = p_id_servicio);
    SET @v_tv_adicional = (SELECT costo_tvadicional FROM SERVICIOS WHERE servicio_id = p_id_servicio);

    -- Cálculos para el primer pago
    SET @v_dias_mes = DAY(LAST_DAY(@v_fecha_contrato));
    SET @v_dias_servicio = @v_dias_mes - DAY(@v_fecha_contrato);
    SET @v_precio_por_dia = @v_renta_mensual / @v_dias_mes;
    SET @v_primer_pago = ((@v_precio_por_dia * @v_dias_servicio) + (p_televisores * 100)) + 100;

    -- Ajustar el costo mensual y pronto pago según el número de televisores
    IF p_televisores >= 4 THEN
        SET @v_renta_mensual = @v_renta_mensual + (p_televisores - 3) * @v_tv_adicional;
        SET @v_pronto_pago = @v_pronto_pago + (p_televisores - 3) * @v_tv_adicional;
    END IF;

    -- Insertar el nuevo contrato
    INSERT INTO CONTRATOS (
        id_cliente, id_servicio, fecha_contrato, televisores,
        pago_inicial, renta_mensual, pronto_pago, comentario, borrado
    )
    VALUES (
        p_id_cliente, p_id_servicio, @v_fecha_contrato, p_televisores,
        @v_primer_pago, @v_renta_mensual, @v_pronto_pago, '', FALSE
    );
END;
//
DELIMITER ;
CALL AgregarContrato(1, 3, 2);

--Crear Estado de Cuenta
DELIMITER //
CREATE TRIGGER CrearEstadoCuentaDespuesInsertarContrato
AFTER INSERT ON CONTRATOS
FOR EACH ROW
BEGIN
    DECLARE v_fecha_contrato DATE;
    DECLARE v_fecha_limite DATE;
    DECLARE v_periodo DATE;
    
    SET v_fecha_contrato = NEW.fecha_contrato;
    SET v_fecha_limite = NEW.fecha_contrato;
    SET v_periodo = NEW.fecha_contrato;
    
    INSERT INTO ESTADO_CUENTA (
        id_contrato, monto_pago, fecha_limite, periodo, estatus,
        fecha_pago, monto_pagado
    ) VALUES (
        NEW.id_contrato, NEW.pago_inicial, v_fecha_limite, v_periodo, 0,
        NULL, NULL
    );
END;
//
DELIMITER ;

--REALIZAR PAGOS
DELIMITER //
CREATE PROCEDURE RealizarPago(
    IN p_id_estadocuenta INT,
    IN p_monto_pagado DECIMAL(10, 2)
)
BEGIN
    -- Actualizar el estado de cuenta
    UPDATE ESTADO_CUENTA
    SET
        estatus = 1,
        fecha_pago = CURDATE(),
        monto_pagado = p_monto_pagado
    WHERE id_estadocuenta = p_id_estadocuenta;

    -- Obtener información del contrato
    SET @v_id_contrato = (SELECT id_contrato FROM ESTADO_CUENTA WHERE id_estadocuenta = p_id_estadocuenta);
    SET @v_renta_mensual = (SELECT renta_mensual FROM CONTRATOS WHERE id_contrato = @v_id_contrato);
    SET @v_pronto_pago = (SELECT pronto_pago FROM CONTRATOS WHERE id_contrato = @v_id_contrato);

    -- Calcular nuevo estado de cuenta para el siguiente mes
    INSERT INTO ESTADO_CUENTA (
        id_contrato, monto_pago, fecha_limite, periodo, estatus,
        fecha_pago, monto_pagado
    )
    VALUES (
        @v_id_contrato, @v_pronto_pago, 
        DATE_ADD(CURDATE(), INTERVAL 1 MONTH),
        DATE_ADD(CURDATE(), INTERVAL 1 MONTH),
        0, NULL, NULL
    );

    -- Insertar el pago en la tabla "PAGO"
    INSERT INTO PAGO (id_estadocuenta, monto_pagado, fecha_pago)
    VALUES (p_id_estadocuenta, p_monto_pagado, CURDATE());
END;
//
DELIMITER ;
-- Llamar al procedimiento RealizarPago para realizar un pago y actualizar el estado de cuenta
CALL RealizarPago(1, 150.00); -- Suponiendo que el ID del estado de cuenta es 1 y el monto pagado es 150.00

--PROCEDIMIENTO PARA ACTUALIZAR ESTADO DE CUENTA
--***************NO SIRVE ESTA MAMADA*****************
DELIMITER //
CREATE PROCEDURE ActualizarEstadoCuentaProcedure()
BEGIN
    DECLARE fecha_sistema DATE;
    DECLARE dia_mes INT;

    SET fecha_sistema = CURDATE();
    SET dia_mes = DAY(fecha_sistema);

    IF dia_mes BETWEEN 1 AND 5 THEN
        UPDATE ESTADO_CUENTA
        SET monto_pago = (SELECT pronto_pago FROM CONTRATOS WHERE id_contrato = ESTADO_CUENTA.id_contrato),
            fecha_limite = DATE_FORMAT(CONCAT(YEAR(fecha_sistema), '-', MONTH(fecha_sistema), '-05'), '%Y-%m-%d')
        WHERE estatus = 0;
    ELSEIF dia_mes BETWEEN 6 AND 15 THEN
        UPDATE ESTADO_CUENTA
        SET monto_pago = (SELECT renta_mensual FROM CONTRATOS WHERE id_contrato = ESTADO_CUENTA.id_contrato),
            fecha_limite = DATE_FORMAT(CONCAT(YEAR(fecha_sistema), '-', MONTH(fecha_sistema), '-15'), '%Y-%m-%d')
        WHERE estatus = 0;
    ELSE
        UPDATE ESTADO_CUENTA
        SET monto_pago = (SELECT renta_mensual FROM CONTRATOS WHERE id_contrato = ESTADO_CUENTA.id_contrato) + 100,
            fecha_limite = DATE_FORMAT(CONCAT(YEAR(fecha_sistema), '-', MONTH(fecha_sistema), '-30'), '%Y-%m-%d')
        WHERE estatus = 0;
    END IF;
END;
//
DELIMITER ;

--CREAR CUENTA DE CLIENTE
DELIMITER //
CREATE PROCEDURE CreateClientAccount(
    IN contractId INT,
    IN clientId INT,
    IN email VARCHAR(50),
    IN password VARCHAR(250)
)
BEGIN
    INSERT INTO CUENTAS_CLIENTE (id_contrato, id_cliente, correo, contraseña)
    VALUES (contractId, clientId, email, password);
END //
DELIMITER ;

--ACTUALIZAR CUENTA DE CLIENTE
DELIMITER //
CREATE PROCEDURE UpdateClientAccount(
    IN accountId INT,
    IN email VARCHAR(50),
    IN password VARCHAR(250)
)
BEGIN
    UPDATE CUENTAS_CLIENTE
    SET
        correo = email,
        contraseña = password
    WHERE id_cuenta = accountId;
END //
DELIMITER ;

--BORRAR CUENTA DE CLIENTE
DELIMITER //
CREATE PROCEDURE DeleteClientAccount(
    IN accountId INT
)
BEGIN
    DELETE FROM CUENTAS_CLIENTE
    WHERE id_cuenta = accountId;
END //
DELIMITER ;

--CREAR PROVEEDOR
DELIMITER //
CREATE PROCEDURE CreateProvider(
    IN providerName VARCHAR(100),
    IN street VARCHAR(50),
    IN streetNumber VARCHAR(50),
    IN intNumber VARCHAR(10),
    IN neighborhood VARCHAR(50),
    IN postalCode VARCHAR(50),
    IN city VARCHAR(50),
    IN state VARCHAR(50),
    IN phone VARCHAR(20),
    IN email VARCHAR(100),
    IN active BOOLEAN
)
BEGIN
    INSERT INTO PROVEEDORES (
        nombre, calle, num_ext, num_int, colonia,
        cp, municipio, estado, telefono, correo, activo
    ) VALUES (
        providerName, street, streetNumber, intNumber, neighborhood,
        postalCode, city, state, phone, email, active
    );
END //
DELIMITER ;

--ACTUALIZAR PROVEEDOR
DELIMITER //
CREATE PROCEDURE UpdateProvider(
    IN providerId INT,
    IN providerName VARCHAR(100),
    IN street VARCHAR(50),
    IN streetNumber VARCHAR(50),
    IN intNumber VARCHAR(10),
    IN neighborhood VARCHAR(50),
    IN postalCode VARCHAR(50),
    IN city VARCHAR(50),
    IN state VARCHAR(50),
    IN phone VARCHAR(20),
    IN email VARCHAR(100),
    IN active BOOLEAN
)
BEGIN
    UPDATE PROVEEDORES
    SET
        nombre = providerName,
        calle = street,
        num_ext = streetNumber,
        num_int = intNumber,
        colonia = neighborhood,
        cp = postalCode,
        municipio = city,
        estado = state,
        telefono = phone,
        correo = email,
        activo = active
    WHERE id_proveedor = providerId;
END //
DELIMITER ;

--BORRAR PROVEEDOR
DELIMITER //
CREATE PROCEDURE DeleteProvider(
    IN providerId INT
)
BEGIN
    DELETE FROM PROVEEDORES
    WHERE id_proveedor = providerId;
END //
DELIMITER ;

-- INSERTAR VEHCULO
DELIMITER //
CREATE PROCEDURE CreateVehicle(
    IN brand VARCHAR(100),
    IN model VARCHAR(100),
    IN licensePlate VARCHAR(20),
    IN year INT,
    IN color VARCHAR(50),
    IN fuelType VARCHAR(50),
    IN mileage INT,
    IN status BOOLEAN
)
BEGIN
    INSERT INTO AUTOMOVILES (
        marca, modelo, placa, anio, color,
        tipo_combustible, kilometraje, estatus
    ) VALUES (
        brand, model, licensePlate, year, color,
        fuelType, mileage, status
    );
END //
DELIMITER ;

-- ELIMINAR VEHCULO
DELIMITER //
CREATE PROCEDURE DeleteVehicle(
    IN vehicleId INT
)
BEGIN
    DELETE FROM AUTOMOVILES
    WHERE id_vehiculo = vehicleId;
END //
DELIMITER ;

-- ACTUALIZAR VEHCULO
DELIMITER //
CREATE PROCEDURE UpdateVehicle(
    IN vehicleId INT,
    IN brand VARCHAR(100),
    IN model VARCHAR(100),
    IN licensePlate VARCHAR(20),
    IN year INT,
    IN color VARCHAR(50),
    IN fuelType VARCHAR(50),
    IN mileage INT,
    IN status BOOLEAN
)
BEGIN
    UPDATE AUTOMOVILES
    SET
        marca = brand,
        modelo = model,
        placa = licensePlate,
        anio = year,
        color = color,
        tipo_combustible = fuelType,
        kilometraje = mileage,
        estatus = status
    WHERE id_vehiculo = vehicleId;
END //
DELIMITER ;

--ASIGNAR VEHICULO
DELIMITER //
CREATE PROCEDURE CreateVehicleAssignment(
    IN employeeId INT,
    IN vehicleId INT,
    IN assignmentDate DATE,
    IN observations TEXT
)
BEGIN
    INSERT INTO ASIGNACIONES_AUTOS (id_empleado, id_vehiculo, fecha_asignacion, observaciones)
    VALUES (employeeId, vehicleId, assignmentDate, observations);
END //
DELIMITER ;

--AGREGAR MATERIAL
DELIMITER //
CREATE PROCEDURE CreateMaterial(
    IN materialName VARCHAR(100),
    IN materialDescription VARCHAR(255),
    IN stock INT,
    IN materialType VARCHAR(50),
    IN providerId INT
)
BEGIN
    INSERT INTO MATERIALES (nombre, descripcion, stock, tipo, id_proveedor)
    VALUES (materialName, materialDescription, stock, materialType, providerId);
END //
DELIMITER ;

--ACTUALIZAR MATERIAL
DELIMITER //
CREATE PROCEDURE UpdateMaterial(
    IN materialId INT,
    IN materialName VARCHAR(100),
    IN materialDescription VARCHAR(255),
    IN stock INT,
    IN materialType VARCHAR(50),
    IN providerId INT
)
BEGIN
    UPDATE MATERIALES
    SET
        nombre = materialName,
        descripcion = materialDescription,
        stock = stock,
        tipo = materialType,
        id_proveedor = providerId
    WHERE id_material = materialId;
END //
DELIMITER ;

--BORRAR MATERIAL
DELIMITER //
CREATE PROCEDURE DeleteMaterial(
    IN materialId INT
)
BEGIN
    DELETE FROM MATERIALES
    WHERE id_material = materialId;
END //
DELIMITER ;

--CREAR CLIENTE POTENCIAL
DELIMITER //
CREATE PROCEDURE CreatePotentialClient(
    IN potentialClientName VARCHAR(100),
    IN phone VARCHAR(20),
    IN email VARCHAR(100),
    IN desiredService VARCHAR(100),
    IN comment VARCHAR(255)
)
BEGIN
    INSERT INTO CLIENTES_POTENCIALES (nombre, telefono, correo, servicio_deseado, comentario)
    VALUES (potentialClientName, phone, email, desiredService, comment);
END //
DELIMITER ;

--ACTUALIZAR CLIENTE POTENCIAL
DELIMITER //
CREATE PROCEDURE UpdatePotentialClient(
    IN potentialClientId INT,
    IN potentialClientName VARCHAR(100),
    IN phone VARCHAR(20),
    IN email VARCHAR(100),
    IN desiredService VARCHAR(100),
    IN comment VARCHAR(255)
)
BEGIN
    UPDATE CLIENTES_POTENCIALES
    SET
        nombre = potentialClientName,
        telefono = phone,
        correo = email,
        servicio_deseado = desiredService,
        comentario = comment
    WHERE id_cliente_potencial = potentialClientId;
END //
DELIMITER ;

--BORRAR CLIENTE POTENCIAL
DELIMITER //
CREATE PROCEDURE DeletePotentialClient(
    IN potentialClientId INT
)
BEGIN
    DELETE FROM CLIENTES_POTENCIALES
    WHERE id_cliente_potencial = potentialClientId;
END //
DELIMITER ;

--CREAR ASISTENCIA
DELIMITER //
CREATE PROCEDURE CreateAttendance(
    IN employeeId INT,
    IN typeId INT,
    IN entryTime TIME,
    IN exitTime TIME,
    IN attendanceDate DATE,
    IN workedHours INT
)
BEGIN
    INSERT INTO ASISTENCIAS (id_empleado, id_tipo, hora_entrada, hora_salida, fecha_asistencia, horas_trabajadas)
    VALUES (employeeId, typeId, entryTime, exitTime, attendanceDate, workedHours);
END //
DELIMITER ;

--ACTUALIZAR ASISTENCIA
DELIMITER //
CREATE PROCEDURE UpdateAttendance(
    IN attendanceId INT,
    IN employeeId INT,
    IN typeId INT,
    IN entryTime TIME,
    IN exitTime TIME,
    IN attendanceDate DATE,
    IN workedHours INT
)
BEGIN
    UPDATE ASISTENCIAS
    SET
        id_empleado = employeeId,
        id_tipo = typeId,
        hora_entrada = entryTime,
        hora_salida = exitTime,
        fecha_asistencia = attendanceDate,
        horas_trabajadas = workedHours
    WHERE id_asistencia = attendanceId;
END //
DELIMITER ;

--AGREGAR TIPO ASISTENCIA
DELIMITER //
CREATE PROCEDURE CreateAttendanceType(
    IN typeName VARCHAR(100),
    IN state BOOLEAN
)
BEGIN
    INSERT INTO TIPO_ASISTENCIAS (nombre, estado)
    VALUES (typeName, state);
END //
DELIMITER ;

--ACTUALIZAR TIPO ASISTENCIA
DELIMITER //
CREATE PROCEDURE UpdateAttendanceType(
    IN typeId INT,
    IN typeName VARCHAR(100),
    IN state BOOLEAN
)
BEGIN
    UPDATE TIPO_ASISTENCIAS
    SET
        nombre = typeName,
        estado = state
    WHERE id_tipo = typeId;
END //
DELIMITER ;

--BORRAR TIPO ASISTENCIA
DELIMITER //
CREATE PROCEDURE DeleteAttendanceType(
    IN typeId INT
)
BEGIN
    DELETE FROM TIPO_ASISTENCIAS
    WHERE id_tipo = typeId;
END //
DELIMITER ;

--CREAR TICKET
DELIMITER //
CREATE PROCEDURE CreateTicket(
    IN employeeId INT,
    IN clientId INT,
    IN title VARCHAR(100),
    IN description TEXT,
    IN state ENUM('Pendiente', 'En Progreso', 'Completada', 'Cancelada')
)
BEGIN
    INSERT INTO TICKETS (id_empleado, id_cliente, titulo, descripcion, estado)
    VALUES (employeeId, clientId, title, description, state);
END //
DELIMITER ;

--ACTUALIZAR TICKET
DELIMITER //
CREATE PROCEDURE UpdateTicket(
    IN ticketId INT,
    IN employeeId INT,
    IN clientId INT,
    IN title VARCHAR(100),
    IN description TEXT,
    IN state ENUM('Pendiente', 'En Progreso', 'Completada', 'Cancelada')
)
BEGIN
    UPDATE TICKETS
    SET
        id_empleado = employeeId,
        id_cliente = clientId,
        titulo = title,
        descripcion = description,
        estado = state
    WHERE id_ticket = ticketId;
END //
DELIMITER ;

--ELIMINAR TICKET
DELIMITER //
CREATE PROCEDURE DeleteTicket(
    IN ticketId INT
)
BEGIN
    DELETE FROM TICKETS
    WHERE id_ticket = ticketId;
END //
DELIMITER ;

--CREAR EVENTO EN CALENDARIO
DELIMITER //
CREATE PROCEDURE CreateCalendarEvent(
    IN employeeId INT,
    IN title VARCHAR(100),
    IN description TEXT,
    IN eventDate DATE
)
BEGIN
    INSERT INTO CALENDARIO (id_empleado, titulo, descripcion, fecha)
    VALUES (employeeId, title, description, eventDate);
END //
DELIMITER ;

--ACTUALIZAR EVENTO EN CALENDARIO
DELIMITER //
CREATE PROCEDURE UpdateCalendarEvent(
    IN eventId INT,
    IN employeeId INT,
    IN title VARCHAR(100),
    IN description TEXT,
    IN eventDate DATE
)
BEGIN
    UPDATE CALENDARIO
    SET
        id_empleado = employeeId,
        titulo = title,
        descripcion = description,
        fecha = eventDate
    WHERE id_calendario = eventId;
END //
DELIMITER ;

--BORRAR EVENTO EN CALENDARIO
DELIMITER //
CREATE PROCEDURE DeleteCalendarEvent(
    IN eventId INT
)
BEGIN
    DELETE FROM CALENDARIO
    WHERE id_calendario = eventId;
END //
DELIMITER ;
