const scc = require('prompt-sync')();
let fecha = new Date();

const tareas = [];

let nombre, opc=0, opc1=0, control=0, control1=0, bandera=1, identificador=0, contador=0, tareasSimilares=0; 
let opc2 = 0;
let opc3 = " ";
let opc4 = 0;
let opc5 = 0;
let opc6 = 0;
let id, titulo, descripcion, estado, creacion, vencimiento, dificultad;

let pendiente = "❗ Pendiente";
let enCurso = "🛠 En curso";
let terminada = "✔ Terminada";
let unaEstrella = "⭐";
let dosEstrellas = "⭐⭐";
let tresEstrellas = "⭐⭐⭐";


function tarea(id, titulo,descripcion,dificultad,creacion,vencimiento,estado){

    return {
        id: id,
        titulo: titulo,
        descripcion: descripcion,
        estado: estado,
        creacion: creacion,
        vencimiento: vencimiento,
        dificultad: dificultad
    };



}

function tareaEspecifica(){
    console.log("Desea ver alguna en especifico?");
    console.log("Ingrese el número de la tarea o [0] para volver.");
    identificador = scc('');
    identificador = parseInt(identificador);

    if(identificador == 0){
        return 0;
    }

    while( (identificador < 0) || (identificador > (tareas.length + 1)) ){
        console.log("Ingrese una tarea valida.");
        pausa();
        console.clear();
        console.log("Sus tareas son:");
        for(i=0; i<tareas.length; i++){

            console.log(`[${i+1}] ${tareas[i].titulo}`);
    }
        console.log("Desea ver alguna en especifico?");
        console.log("Ingrese el número de la tarea o [0] para volver.");
        identificador = scc('');
        identificador = parseInt(identificador);
    }

    return identificador;
    
}

function tareaDetallada(identificador){
    i = identificador;
    console.log("-----------------------------------");
    console.log(`📚 Título: ${tareas[i-1].titulo}`);   
    console.log(`📝 Descripción: ${tareas[i-1].descripcion}`);
    console.log(`🔴 Estado: ${tareas[i-1].estado}`);
    console.log(`📅 Creación: ${tareas[i-1].creacion}`);
    console.log(`📅 Vencimiento: ${tareas[i-1].vencimiento}`);
    console.log(`🧩 Dificultad: ${tareas[i-1].dificultad}`);
    console.log("-----------------------------------");
    verificadorModificador();
    modificarTarea(opc2, identificador);
}

function modificarTarea(opc, identificador){
    

    if(opc == 1){
        console.log(`Usted esta editando la tarea:  ${tareas[identificador-1].titulo}`);
        console.log("Si desea dejar un valor en blanco , escribe un '-' .");
        
        console.log("¿Qué desea modificar?");
        console.log("[1] Título.");
        console.log("[2] Descripción.");
        console.log("[3] Estado.");
        console.log("[4] Vencimiento.");
        console.log("[5] Dificultad.");
        console.log("[0] Salir.");
        opc1 = scc('');
        opc1 = parseInt(opc1);

        switch(opc1){
            case 1:
                titulo = getTitulo();
                tareas[identificador-1].titulo = titulo;
                console.log("Título modificado con éxito.");
                pausa();
                console.clear();
                break;

            case 2:
                descripcion = getDescripcion();
                tareas[identificador-1].descripcion = descripcion;
                console.log("Descripción modificada con éxito.");
                pausa();
                console.clear();
                break;

            case 3:
                estado = getEstado();
                tareas[identificador-1].estado = estado;
                console.log("Estado modificado con éxito.");
                pausa();
                console.clear();
                break;

            case 4:
                vencimiento = getVencimiento();
                tareas[identificador-1].vencimiento = vencimiento;
                console.log("Vencimiento modificado con éxito.");
                pausa();
                console.clear();
                break;

            case 5:
                dificultad = getDificultad();
                dificultad = TraducirDificultad(dificultad);
                tareas[identificador-1].dificultad = dificultad;
                console.log("Dificultad modificada con éxito.");
                pausa();
                console.clear();
                break;
                
                
        }
        seguirModificando();
        
    }
}

function seguirModificando(){
    console.log("-----------------------------------");
        console.log("¿Desea seguir modificando?");
        console.log("[1] Si.");
        console.log("[2] No.");
        opc = scc('');
        opc = parseInt(opc);
        console.clear();

        while (opc < 1 || opc > 2){
            console.log("Ingrese una opción valida.");
            pausa();
            console.clear();
            console.log("-----------------------------------");
            console.log("¿Desea modificar otra tarea?");
            console.log("[1] Si.");
            console.log("[2] No.");
            opc = scc('');
            opc = parseInt(opc);
        }

        if(opc == 1){
            modificarTarea(opc, identificador);
        }
        else{
            console.clear();
        }
}

function mostrarTareas(){
    console.log("Sus tareas son:");
    for(i=0; i<tareas.length; i++){

        console.log(`[${i+1}] ${tareas[i].titulo}`);
    }
    tareaEspecifica();
    if (identificador != 0){
        tareaDetallada(identificador);
    }
}

function mostrarTareasPendientes(){
    contador = 0;
    console.log("Tareas Pendientes: ");
    for (i=0; i<tareas.length; i++){
        if (tareas[i].estado == pendiente){
            console.log(`[${i+1}] ${tareas[i].titulo}`);
            console.log("");
            contador= contador + 1;
        }

    }
    return contador;
}

function mostrarTareasEnCurso(){
    contador = 0;
    console.log("Tareas En Curso: ");
    for (i=0; i<tareas.length; i++){
        if (tareas[i].estado == enCurso){
            console.log(`[${i+1}] ${tareas[i].titulo}`);
            console.log("");
            contador = contador + 1;
        }
    }
    return contador;
}

function mostrarTareasTerminadas(){
    contador = 0;
    console.log("Tareas Terminadas: ");
    for (i=0; i<tareas.length; i++){
        if (tareas[i].estado == terminada){
            console.log(`[${i+1}] ${tareas[i].titulo}`);
            console.log("");
            contador = contador + 1;
        }
    }
    return contador;
}

function verificadorModificador(){
    console.log("Si desea modificar la tarea presione [1], de lo contrario [0]");
    opc2 = scc('');
    opc2 = parseInt(opc2);
    console.clear();
    return opc2;
}
function pausa(){
    console.log("Presione enter para continuar...");
    scc('');
}


function getTitulo(){
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué titulo desea colocarle a su tarea?")
    console.log("-----------------------------------");
    titulo = scc('');

    while (titulo == " " || titulo == ""){
        console.log("El titulo no puede estar vacio.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Qué titulo desea colocarle a su tarea?")
        console.log("-----------------------------------");
        titulo = scc('');
    }

    return titulo;
}





function getDescripcion(){
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué descripción desea colocarle a su tarea?")
    console.log("-----------------------------------");
    descripcion = scc('');

    return descripcion;
}

function getEstado(){
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué estado desea colocarle a su tarea?");
    console.log("[1] Pendiente.");
    console.log("[2] En curso.");
    console.log("[3] Terminada.");
    console.log("-----------------------------------");
    estado = scc('');
    

    while ((estado < "1") || (estado > "3") || (estado == " ")){
        console.log("Ingrese un estado valido.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Qué estado desea colocarle a su tarea?");
        console.log("[1] Pendiente.");
        console.log("[2] En curso.");
        console.log("[3] Terminada.");
        console.log("-----------------------------------");
    }

    estado = parseInt(estado);

    if(estado == 1){
        estado = pendiente;
    }
    else if(estado == 2){
        estado = enCurso;
    }
    else if(estado == 3){
        estado = terminada;
    }
    return estado;
}

function getCreacion(){
    creacion = fecha;
    return creacion;
}

function getDia(){
    console.log("Ingrese el día");
    dia = scc('');
    console.clear();

    while (dia == " " || dia == ""){
        console.log("El día no puede estar vacio.");
        pausa();
        console.log("Ingrese el día");
        dia = scc('');
        console.clear();
    }
    dia = parseInt(dia);
    return dia;
}

function controlarDia(dia){
    while ( (dia < 1) || (dia > 31)){
        console.log("Ingrese un día valido.");
        pausa();
        console.clear();
        dia = getDia();
    }
    
    return dia;
}

function getMes(){
    console.log("Ingrese el mes");
    mes = scc('');
    console.clear();

    while (mes == " " || mes == ""){
        console.log("El mes no puede estar vacio.");
        pausa();
        console.clear();
        console.log("Ingrese el mes");
        mes = scc('');
        console.clear();
    }
    mes = parseInt(mes);
    return mes;
}

function controlarMes(mes){
    while ( (mes < 1) || (mes > 12) ){
        console.log("Ingrese un mes valido.");
        pausa();
        console.clear();
        mes = getMes();
    }
    
    return mes;
}

function getAño(){
    console.log("Ingrese el año");
    año = scc('');
    console.clear();

    while (año == " " || año == ""){
        console.log("El año no puede estar vacio.");
        pausa();
        console.clear();
        console.log("Ingrese el año");
        año = scc('');
        console.clear();
    }
    año = parseInt(año);
    return año;
}

function controlarAño(año){
    while ( (año < 2024)) {
        console.log("Ingrese un año valido.");
        pausa();
        console.clear();
        año = getAño();
    }
    return año;
}

function getVencimiento(){
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué fecha de vencimiento desea colocarle a su tarea?");
    console.log("(Recuerde que la fecha de vencimiento no puede ser anterior a la fecha de creación.)");
    console.log("-----------------------------------");
    pausa();
    console.clear();

    console.log("Desea cargar la fecha de vencimiento?");
    console.log("Presione [1] si desea cargar la fecha de vencimiento, de lo contrario presione [0].");
    opc4 = scc('');
    opc4 = parseInt(opc4);
    console.clear();

    while (opc4 < 0 || opc4 > 1){
        console.log("Ingrese una opción valida.");
        pausa();
        console.clear();
        console.log("Desea cargar la fecha de vencimiento?");
        console.log("Presione [1] si desea cargar la fecha de vencimiento, de lo contrario presione [0].");
        opc4 = scc('');
        opc4 = parseInt(opc4);
        console.clear();
    }

    if (opc4 == 1){ 

        dia = getDia();
        dia = controlarDia(dia);

        mes = getMes();
        mes = controlarMes(mes);

        año = getAño();
        año = controlarAño(año);
    
        vencimiento = new Date(año, mes - 1, dia);
        vencimiento = controlarFecha(vencimiento);
        return vencimiento;

    }
    else{
        vencimiento = "Sin Vencimiento. ";
        return vencimiento;
    }
    
}

function controlarFecha(vencimiento){
    while(vencimiento < creacion){
        console.log("-----------------------------------");
        console.log("La fecha de vencimiento no puede ser anterior a la fecha de creación.");
        console.log("-----------------------------------");
        pausa();
        console.clear();
        vencimiento = getVencimiento();
    }
    return vencimiento;
}

function getDificultad(){
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué dificultad desea colocarle?");
    console.log("[1] ⭐.");
    console.log("[2] ⭐⭐.");
    console.log("[3] ⭐⭐⭐.");
    console.log("-----------------------------------");
    dificultad = scc('');


    while ( (dificultad < "0") || (dificultad > "3") || (dificultad == " ") ){
        console.log("Ingrese una dificultad valida.");
        pausa();
        console.clear();
        console.log("-----------------------------------");
        console.log("¿Qué dificultad desea colocarle?");
        console.log("[1] ⭐.");
        console.log("[2] ⭐⭐.");
        console.log("[3] ⭐⭐⭐.");
        console.log("-----------------------------------");
        dificultad = scc('');
    }
    dificultad = parseInt(dificultad);
    console.clear();
    return dificultad;
}


function TraducirDificultad(dificultad){
    if(dificultad == 1){
        return unaEstrella;
    }
    else if(dificultad == 2){
        return dosEstrellas;
    }
    else if(dificultad == 3){
        return tresEstrellas;
    }
}

function controlTareas(){
    console.log("¿Desea seguir cargando tareas?");
    console.log("[1] Si.");
    console.log("[2] No.");
    control = scc('');
    control = parseInt(control);
    while ( (control < "1") || (control > "2") || (control == " ") ){
        console.log("Ingrese una opción valida.");
        pausa();
        console.clear();
        console.log("¿Desea seguir cargando tareas?");
        console.log("[1] Si.");
        console.log("[2] No.");
    }
    return control;
}

function buscarTarea(){
    let arrayTareasSimilares = [];
    contador = 0;
    
    console.clear();
    console.log("-----------------------------------");
    console.log("¿Qué tarea desea buscar?");
    console.log("-----------------------------------");
    titulo = scc('');
    
    for (i=0; i<tareas.length; i++){
        if (tareas[i].titulo.toLowerCase().includes(titulo.toLowerCase())){
            arrayTareasSimilares.push(tareas[i]);
            contador = contador + 1;
        }
    }

    if (contador == 0){
        console.log("No se encontraron tareas similares.");
    }
    else{
        mostrarTareasSimilares(arrayTareasSimilares, contador);
    }
}

function mostrarTareasSimilares(arrayTareasSimilares, contador){
    console.clear();
    console.log("-----------------------------------");
    console.log(`Se encontraron ${contador} tareas similares.`);
    for (i=0; i<arrayTareasSimilares.length; i++){
        console.log(`[${i+1}] ${arrayTareasSimilares[i].titulo}`);
    }
    console.log("-----------------------------------");
    pausa();
    console.clear();
}


function menuPrincipal(){
    console.log("-----------------------------------");
    console.log("Bienvenid@");
    console.log("¿Qué deseas hacer?");
    console.log("[1] Ver mis tareas.");
    console.log("[2] Buscar una tarea.");
    console.log("[3] Agregar una tarea.");
    console.log("[0] Salir.");
    console.log("-----------------------------------");
    opc = scc('');
    opc = parseInt(opc);
    console.clear();
    return opc;
}

function menuTareas(){
    console.log("-----------------------------------");
    console.log("¿Qué tareas deseas ver?");
    console.log("[1] Todas.");
    console.log("[2] Pendientes.");
    console.log("[3] En curso");
    console.log("[4] Terminadas");
    console.log("[0] Salir.");
    console.log("-----------------------------------");
    opc1 = scc('');
    opc1 = parseInt(opc1);
    console.clear();
}

//MAIN

do{
    
    opc = menuPrincipal();

    switch(opc){

        case 1:
            if (control1 == 1){


                do{
                    
                    menuTareas();
                    switch (opc1){

                        case 1:
                            console.clear();
                            mostrarTareas();
                            pausa();
                            console.clear();
                            break;

                        case 2:
                            console.clear();
                            mostrarTareasPendientes();

                            if ((contador > 0) && (contador <= (tareas.length + 1))){
                                tareaEspecifica();
                                if (identificador != 0){
                                    tareaDetallada(identificador);
                                }
                            }
                            else if (contador == 0){
                                console.log("No hay tareas pendientes.");
                            }
                            pausa();
                            console.clear();
                            break;

                        case 3:
                            console.clear();
                            mostrarTareasEnCurso();
                            if ((contador > 0) && (contador <= (tareas.length + 1))){
                                tareaEspecifica();
                                if (identificador != 0){
                                    tareaDetallada(identificador);
                                }
                            }
                            else if (contador == 0){
                                console.log("No hay tareas en curso.");
                            }
                            pausa();
                            console.clear();
                            break;

                        case 4:
                            console.clear();
                            mostrarTareasTerminadas();
                            if ((contador > 0) && (contador <= (tareas.length + 1))){
                                tareaEspecifica();
                                if (identificador != 0){
                                    tareaDetallada(identificador);
                                }
                            }
                            else if (contador == 0){
                                console.log("No hay tareas terminadas.");
                            }
                            pausa();
                            console.clear();
                            break;

                        case 0:
                            console.clear();
                            break;

                        default:
                            console.log("Ingrese una opción valida.");
                            break;


                    }


                }while (opc1 != 0);

            }
            else{
                console.log("Usted no tiene tareas ingresadas. Ingrese una y vuelva.");
                pausa();
                console.clear();
            }



            break;

        case 2:
            buscarTarea();
            break;

        case 3:
            control1= 1;
            bandera = 1;

            while(bandera == 1){
                id = tareas.length + 1;
                titulo = getTitulo();
                descripcion = getDescripcion();
                estado = pendiente;
                creacion = getCreacion();
                vencimiento = getVencimiento();
                dificultad = getDificultad();
                dificultad = TraducirDificultad(dificultad);

                tareas.push(tarea(id,titulo,descripcion,dificultad,creacion,vencimiento,estado));

                control = controlTareas();
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