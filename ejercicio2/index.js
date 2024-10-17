const scc = require('prompt-sync')();

let arr = [];

let nombre, opc=0,control=0, control1=0, bandera=1; 
let id, titulo, descripcion, estado, creacion, vencimiento, dificultad;

const agenda = {
    id: 'null',
    titulo: 'null',
    descripcion: 'null',
    estado: 'null',
    creacion: 'null',
    vencimiento: 'null',
    dificultad: 'null',
}


function agend(){

    id = id + 1;

    console.log("¿Qué titulo desea colocarle a su tarea?")
    titulo = scc('');

    console.log("¿Qué descripción desea colocarle a su tarea?")
    descripcion = scc('');

    estado = "Pendiente";

    console.log("¿Qué vencimiento desea colocarle a su tarea?")
    vencimiento = scc('');

    console.log("¿Qué dificultad desea colocarle?");
    console.log("[1] Facil.");
    console.log("[2] Medio.");
    console.log("[3] Dificil.");
    dificultad = scc('');
    dificultad = parseInt(dificultad);

}


function mostrar(){
    for(i=0; i<arr.length; i++){


        console.log(`ID: ${agenda[i]}`);

        /*
        agenda[i].id;
        agenda[i].titulo;
        agenda[i].descripcion;
        agenda[i].estado;
        agenda[i].creacion;
        agenda[i].vencimiento;
        agenda[i].dificultad;
        */

    }
}





//MAIN

console.log("Bienvenid@ ¿Cual es tu nombre?")
nombre = scc('');
console.clear();


do{
    console.log(`Bienvenid@ ${nombre}`);
    console.log("¿Qué deseas hacer?");
    console.log("[1] Ver mis tareas.");
    console.log("[2] Buscar una tarea.");
    console.log("[3] Agregar una tarea.");
    console.log("[0] Salir.");
    opc = scc('');
    opc = parseInt(opc);
    console.clear();


    switch(opc){

        case 1:
            if (control1 == 1){


                do{

                    console.log("¿Qué tareas deseas ver?");
                    console.log("[1] Todas.");
                    console.log("[2] Pendientes.");
                    console.log("[3] En curso");
                    console.log("[4] Terminadas");
                    console.log("[0] Salir.");
                    opc = scc('');
                    opc = parseInt(opc);
                    console.clear();



                    switch (opc){

                        case 1:
                            mostrar();
                            break;

                        case 2:
                            break;

                        case 3:
                            break;

                        case 4:
                            break;

                        case 0:
                            console.clear();
                            break;

                        default:
                            console.log("Ingrese una opción valida.");
                            break;


                    }


                }while (opc != 0);

            }
            else{
                console.log("Usted no tiene tareas ingresadas. Ingrese una y vuelva.");
            }



            break;

        case 2:
            break;

        case 3:
            control1= 1;

            while(bandera == 1){
                agend();
                arr.push(agenda);

                console.log("¿Desea seguir cargando tareas?");
                console.log("[1] Si.");
                console.log("[2] No.");
                control = scc('');
                control = parseInt(control);
                console.clear();

                if(control ==1 ){
                    bandera = 1;
                }
                else{
                    bandera = 0;
                }

            }


            break;

        case 0:
            console.log("Gracias por usar el sistema.");
            break;

        default:
            console.log("Ingrese una opción valida.");
            break;


    }




} while(opc != 0);

