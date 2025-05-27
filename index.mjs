import { input } from './utils.mjs'
import { Sequelize, QueryTypes } from 'sequelize'

const conexion = new Sequelize(
    "controlstock",
    'root',
    '41185943',
    {
        dialect: 'mysql',
        logging: false
    }
)


const nombre = await input()




while (true) {

    console.clear() // LIMPIA LA CONSOLA
    console.log(`
        Programa de stock

        Seleccione opción:
        1 - Categoria
        2 - Productos
        3 - Servicios
        4 - Salir
        
        `)

    const opcion = await input(': ')
    if (opcion === '4') {
        console.log('Saliendo....')
        break
    }

    if (opcion === '1') {
        while (true) {
            console.clear()
            console.log(`
                Sección categorias
                Seleccion una opción:
                1 - Ver todas
                2 - Nueva Categoria
                3 - Actualizar Categoria
                4 - Eliminar Categoria
                5 - Volver
                `)
            const opcion_categoria = await input(": ")
            if (opcion_categoria === "5") {
                break
            }
            if (opcion_categoria === '1') {
                const categorias = await conexion.query(
                    `SELECT * FROM tipo_p_s`,
                    { type: QueryTypes.SELECT }
                );
                console.log('\nCategorías:');
                categorias.forEach(c => console.log(`${c.id} - ${c.descripcion}`));
                await input('\nPresione Enter para continuar...');
                break;

            }

            if (opcion_categoria === '2') {
               const nuevaCat = await input('Ingrese la nueva categoría: ');
                await conexion.query(
                    `INSERT INTO tipo_p_s (descripcion) VALUES (?)`,
                    {
                        replacements: [nuevaCat],
                        type: QueryTypes.INSERT
                    }
                );
                console.log('Categoría agregada correctamente.');
                await input('\nPresione Enter para continuar...');
                break;
            }
            

            if (opcion_categoria === '3') {

                const categorias = await conexion.query(
                 `SELECT id, descripcion FROM tipo_p_s`,
                 {
                  type: QueryTypes.SELECT
                  }
               );      
                 console.log('\nCategorías disponibles:');
                categorias.forEach(cat => {
                console.log(`ID: ${cat.id} - Descripción: ${cat.descripcion}`);
                 });
               const idEditar = await input('ID de la categoría a editar: ');
                const nuevaDesc = await input('Nueva descripción: ');
                await conexion.query(
                    `UPDATE tipo_p_s SET descripcion = ? WHERE id = ?`,
                    {
                        replacements: [nuevaDesc, idEditar],
                        type: QueryTypes.UPDATE
                    }
                );
                console.log('Categoría actualizada.');
                await input('\nPresione Enter para continuar...');
                break;
            }


            if (opcion_categoria === '4') {
                
                const categorias = await conexion.query(
                 `SELECT id, descripcion FROM tipo_p_s`,
                 {
                  type: QueryTypes.SELECT
                  }
               );      
                 console.log('\nCategorías disponibles:');
                const catID=[]
                categorias.forEach(cat => {
                console.log(`ID: ${cat.id} - Descripción: ${cat.descripcion}`)
                catID.push(cat.id);
                 });
                 const idBorrar = await input('ID de la categoría a eliminar: ');
                 if (idBorrar === ''){
                    console.log("No ha seleccionado nada")
                    await input('')
                    continue
                 }
                 if (!catID.includes(Number(idBorrar))){
                    console.log("Opcion seleccionada no existe")
                    await input('')
                    continue
                 }
                await conexion.query(
                    `DELETE FROM tipo_p_s WHERE id =${idBorrar}`,
                    {
                        replacements: [idBorrar],
                        type: QueryTypes.DELETE
                    }
                );
                console.log('Categoría eliminada.');
                await input('\nPresione Enter para continuar...');
                break;

                
            }

            
        }
        
    }

    if (opcion === '2'){
    while (true) {
            console.clear()
            console.log(`
                Sección productos
                Seleccion una opción:
                1 - Ver todos los productos
                2 - Ingresar nuevo producto
                3 - Actualizar producto
                4 - Eliminar producto
                5 - Volver
                `)
                const opcion_productos = await input(": ")
            if (opcion_productos === "5") {
                break

             }
            if(opcion_productos === '1') {
                 const productos = await conexion.query(
                 `SELECT id, tipo_id, nombre, precio, categoria FROM producto_servicio WHERE categoria="producto"`,
                 {
                  type: QueryTypes.SELECT
                  }
               );      
                 console.log('\nProductos disponibles:');
                productos.forEach(prod => {
                console.log(`Id: ${prod.id} | Tipo ID: ${prod.tipo_id} | Nombre: ${prod.nombre} | Precio: ${prod.precio} | Categoría: ${prod.categoria} |`);
                 });
                 await input('\nPresione Enter para continuar...');
            }
            if (opcion_productos === '2') {
                const tipos = await conexion.query(
                 `SELECT id, descripcion FROM tipo_p_s`,
                 { type: QueryTypes.SELECT }
                );
                console.log('\nTipos de Producto Disponibles:');
                tipos.forEach(tipo => {
                console.log(`ID: ${tipo.id} - Nombre: ${tipo.descripcion}`);
                });
                
               const tipoId = await input('Ingrese el ID del tipo de producto: ');
               const nombre = await input('Ingrese el nombre del producto: ');
               const precio = await input('Ingrese el precio: ');
               
                await conexion.query(
                    `INSERT INTO producto_servicio (tipo_id, nombre, precio, categoria) VALUES (?, ?, ?, "producto")`,
                    {
                        replacements: [tipoId, nombre, precio],
                        type: QueryTypes.INSERT
                    }
                );
                console.log('Producto agregado correctamente.');
                await input('\nPresione Enter para continuar...');
                break;
            }
            if (opcion_productos === '3'){
                const productos = await conexion.query(
                 `SELECT id, nombre, precio FROM producto_servicio WHERE categoria="producto"`,
                 {
                  type: QueryTypes.SELECT
                  }
               );      
                 console.log('\nProductos disponibles:');
                productos.forEach(prod => {
                console.log(`Id: ${prod.id} | Nombre: ${prod.nombre} | Precio: ${prod.precio} |`);
                 });

                const idEditar = await input('ID del producto a editar: ');
                console.log('\n¿Qué desea actualizar?');
                console.log('1. Nombre');
                console.log('2. Precio');
                console.log('3. Categoría');
                const opcionUpdate = await input('Seleccione una opción: ');

                switch (opcionUpdate) {
                case '1':
                const nuevoNombre = await input('Ingrese el nuevo nombre: ');
                await conexion.query(
                `UPDATE producto_servicio SET nombre = ? WHERE id = ?`,
                {
                    replacements: [nuevoNombre, idEditar],
                    type: QueryTypes.UPDATE
                }
                );
                console.log('Nombre actualizado correctamente.');
                break;

                 case '2':
                const nuevoPrecio = await input('Ingrese el nuevo precio: ');
                await conexion.query(
                `UPDATE producto_servicio SET precio = ? WHERE id = ?`,
                {
                    replacements: [nuevoPrecio, idEditar],
                    type: QueryTypes.UPDATE
                }
                );
                console.log('Precio actualizado correctamente.');
                break;

                case '3':
                
                await conexion.query(
                `UPDATE producto_servicio SET categoria = "servicio" WHERE id = ?`,
                {
                    replacements: [nuevaCategoria, idEditar],
                    type: QueryTypes.UPDATE
                }
                );
                console.log('Categoría cambiada a "servicio".');
                break;

                default:
                console.log('Opción inválida.');
                break;
                }

                
            }
            if (opcion_productos === '4'){
                 const categorias = await conexion.query(
                 `SELECT id, nombre, precio FROM producto_servicio WHERE categoria="producto"`,
                 {
                  type: QueryTypes.SELECT
                  }
               );      
                 console.log('\nProductos disponibles:');
                const prodID=[]
                categorias.forEach(prod => {
                console.log(`ID: ${prod.id} | Nombre: ${prod.nombre} | Precio: ${prod.precio}`)
                prodID.push(prod.id);
                 });
                 const idBorrar = await input('ID del producto a eliminar: ');
                 if (idBorrar === ''){
                    console.log("No ha seleccionado nada")
                    await input('')
                    continue
                 }
                 if (!prodID.includes(Number(idBorrar))){
                    console.log("Opcion seleccionada no existe")
                    await input('')
                    continue
                 }
                await conexion.query(
                    `DELETE FROM producto_servicio WHERE id =${idBorrar}`,
                    {
                        replacements: [idBorrar],
                        type: QueryTypes.DELETE
                    }
                );
                console.log('Producto eliminado.');
                await input('\nPresione Enter para continuar...');
                break;
            }
        }
    }


    if (opcion === '3'){
        while (true) {
            console.clear()
            console.log(`
                Sección Servicios
                Seleccion una opción:
                1 - Ver todos los servicios
                2 - Ingresar nuevo servicio
                3 - Actualizar servicio
                4 - Eliminar servicio
                5 - Volver
                `)
                const opcion_servicios = await input(": ")
                if (opcion_servicios === '5'){
                    break
                }

                if (opcion_servicios === '1') {
                 const productos = await conexion.query(
                 `SELECT id, tipo_id, nombre, precio, categoria FROM producto_servicio WHERE categoria="servicio"`,
                 {
                  type: QueryTypes.SELECT
                  }
               );      
                 console.log('\nServicios disponibles:');
                productos.forEach(prod => {
                console.log(`Id: ${prod.id} | Tipo ID: ${prod.tipo_id} | Nombre: ${prod.nombre} | Precio: ${prod.precio} |`);
                 });
                 await input('\nPresione Enter para continuar...');
                }

                if (opcion_servicios === '2') {
                const tipos = await conexion.query(
                 `SELECT id, descripcion FROM tipo_p_s`,
                 { type: QueryTypes.SELECT }
                );
                console.log('\nTipos de Servicio Disponibles:');
                tipos.forEach(tipo => {
                console.log(`ID: ${tipo.id} - Nombre: ${tipo.descripcion}`);
                });
                
               const tipoId = await input('Ingrese el ID del tipo de servicio: ');
               const nombre = await input('Ingrese el nombre del servicio: ');
               const precio = await input('Ingrese el precio: ');
               
                await conexion.query(
                    `INSERT INTO producto_servicio (tipo_id, nombre, precio, categoria) VALUES (?, ?, ?, "servicio")`,
                    {
                        replacements: [tipoId, nombre, precio],
                        type: QueryTypes.INSERT
                    }
                );
                console.log('Servicio agregado correctamente.');
                await input('\nPresione Enter para continuar...');
                break;
                }

                if (opcion_servicios === '3') {
                const productos = await conexion.query(
                 `SELECT id, nombre, precio FROM producto_servicio WHERE categoria="servicio"`,
                 {
                  type: QueryTypes.SELECT
                  }
                );      
                 console.log('\nServicios disponibles:');
                productos.forEach(prod => {
                console.log(`Id: ${prod.id} | Nombre: ${prod.nombre} | Precio: ${prod.precio} |`);
                 });

                const idEditar = await input('ID del servicio a editar: ');
                console.log('\n¿Qué desea actualizar?');
                console.log('1. Nombre');
                console.log('2. Precio');
                console.log('3. Categoría');
                const opcionUpdate = await input('Seleccione una opción: ');

                switch (opcionUpdate) {
                case '1':
                const nuevoNombre = await input('Ingrese el nuevo nombre: ');
                await conexion.query(
                `UPDATE producto_servicio SET nombre = ? WHERE id = ?`,
                {
                    replacements: [nuevoNombre, idEditar],
                    type: QueryTypes.UPDATE
                }
                );
                console.log('Nombre actualizado correctamente.');
                break;

                 case '2':
                const nuevoPrecio = await input('Ingrese el nuevo precio: ');
                await conexion.query(
                `UPDATE producto_servicio SET precio = ? WHERE id = ?`,
                {
                    replacements: [nuevoPrecio, idEditar],
                    type: QueryTypes.UPDATE
                }
                );
                console.log('Precio actualizado correctamente.');
                break;

                case '3':
                await conexion.query(
                `UPDATE producto_servicio SET categoria = "producto" WHERE id = ?`,
                {
                    replacements: [nuevaCategoria, idEditar],
                    type: QueryTypes.UPDATE
                }
                );
                console.log('Categoría cambiada a "producto".');
                break;

                default:
                console.log('Opción inválida.');
                break;
                }

                
                }

                if (opcion_servicios === '4') {
                 const categorias = await conexion.query(
                 `SELECT id, nombre, precio FROM producto_servicio WHERE categoria="servicio"`,
                 {
                  type: QueryTypes.SELECT
                  }
                );      
                 console.log('\nServicios disponibles:');
                const prodID=[]
                categorias.forEach(prod => {
                console.log(`ID: ${prod.id} | Nombre: ${prod.nombre} | Precio: ${prod.precio}`)
                prodID.push(prod.id);
                 });
                 const idBorrar = await input('ID del producto a eliminar: ');
                 if (idBorrar === ''){
                    console.log("No ha seleccionado nada")
                    await input('')
                    continue
                 }
                 if (!prodID.includes(Number(idBorrar))){
                    console.log("Opcion seleccionada no existe")
                    await input('')
                    continue
                 }
                await conexion.query(
                    `DELETE FROM producto_servicio WHERE id =${idBorrar}`,
                    {
                        replacements: [idBorrar],
                        type: QueryTypes.DELETE
                    }
                );
                console.log('Servicio eliminado.');
                await input('\nPresione Enter para continuar...');
                break;
                }

            }
        }
    
        






    


}



