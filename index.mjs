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
            }4
            

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
                const opcion_categoria = await input(": ")
            if (opcion_categoria === "5") {
                break

    }


}
}
}



