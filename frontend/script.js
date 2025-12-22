document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "https://taskmanager-abpl.onrender.com/api/tasks";

cargarTarea();

const form = document.getElementById("frmFormulario");
const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");
const btnModificar = document.getElementById("btnModificar");

const btnAgregar = document.getElementById("btnAgregar");

const divListado = document.getElementById("divListado");
const divListadoCompletadas = document.getElementById("divListadoCompletadas");
let idActualizar = null;

btnAgregar.addEventListener("click", agregarTarea);
btnModificar.addEventListener("click", (e) => {
    e.preventDefault();
    modificarTarea(idActualizar)
});






async function cargarTarea() {
    try {
      const res = await fetch(BASE_URL);
      
      if (!res.ok) throw new Error(`Error ${res.status} al obtener tarea`);
        const data = await res.json();

        const pendientes = data.filter(t => t.completed === false);
        const completadas = data.filter(t => t.completed === true);

        cargarTabla(pendientes);
        cargarTablaCompletadas(completadas);
    
    } catch (err) {
      console.log("No se puede obtener el listado de tareas\n" + err);
      mostrarAlert("No se pudo obtener el listado de tareas", "error");;
    }
  }

function cargarTabla(tareas) {
    divListado.innerHTML = "";

    const tabla = document.createElement("table");
    tabla.className = "table table-warning table-striped table-hover";

    const thead = document.createElement("thead");
    thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>TITULO</th>
                <th>DESCRIPCION</th>
                <th>ACCIONES</th>
            </tr>
        `;

    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    tareas.forEach((t) => {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
        tdId.textContent = t.id ?? "";
        tr.appendChild(tdId);

      const tdTitulo = document.createElement("td");
      tdTitulo.textContent = t.title ?? "";
      tr.appendChild(tdTitulo);

      const tdDescripcion = document.createElement("td");
      tdDescripcion.textContent = t.description ?? "";
      tr.appendChild(tdDescripcion);


      const tdAcciones = document.createElement("td");
      tr.appendChild(tdAcciones);

      const iconEliminar = document.createElement("i");
      iconEliminar.className = "bi bi-trash";

      const btnEliminar = document.createElement("button");
      btnEliminar.className = " me-2 btn btn-danger"
    
       btnEliminar.appendChild(iconEliminar);
       tdAcciones.appendChild(btnEliminar);

      btnEliminar.addEventListener("click", async() => {
        const respuesta = window.confirm(`Desea eliminar la tarea con id: ${t.id} y titulo: ${t.title}?`);
        if(respuesta){
            await eliminarTarea(t.id);
            await cargarTarea();
          mostrarAlert("Tarea eliminada correctamente", "success");
        }else{
            mostrarAlert("Operacion cancelada", "error");
        }
      } )

      const btnCompletado = document.createElement("button");
      btnCompletado.className = "btn btn-success"
      btnCompletado.addEventListener("click", async() => {
        await marcarCompletada(t.id);
        await cargarTarea();
      });

        const iconCompletar = document.createElement("i");
        iconCompletar.className = "bi bi-patch-check-fill";

        btnCompletado.appendChild(iconCompletar);
        tdAcciones.appendChild(btnCompletado);
      
      const btnEditar = document.createElement("button");
        btnEditar.className = "ms-2 btn btn-warning";

        const iconEditar = document.createElement("i");
        iconEditar.className = "bi bi-pencil-square";

        btnEditar.appendChild(iconEditar);
        tdAcciones.appendChild(btnEditar);

        btnEditar.addEventListener("click", async() => {
            cargarFormulario(t);
            btnModificar.hidden = false;
            idActualizar = t.id;
        });

   
      tbody.appendChild(tr);
      
    })
    
    tabla.appendChild(tbody);
    divListado.appendChild(tabla);
  
}//fin cargar tabla

function cargarTablaCompletadas(tareas) {
    divListadoCompletadas.innerHTML = "";

    const tabla = document.createElement("table");
    tabla.className = "table table-success table-striped table-hover";

    const thead = document.createElement("thead");
    thead.innerHTML = `
            <tr>
                <th>ID</th>
                <th>TITULO</th>
                <th>DESCRIPCION</th>
                <th>ACCIONES</th>
            </tr>
        `;

    tabla.appendChild(thead);

    const tbody = document.createElement("tbody");

    tareas.forEach((t) => {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
        tdId.textContent = t.id ?? "";
        tr.appendChild(tdId);

      const tdTitulo = document.createElement("td");
      tdTitulo.textContent = t.title ?? "";
      tr.appendChild(tdTitulo);

      const tdDescripcion = document.createElement("td");
      tdDescripcion.textContent = t.description ?? "";
      tr.appendChild(tdDescripcion);


      const tdAcciones = document.createElement("td");
      tr.appendChild(tdAcciones);

      const iconEliminar = document.createElement("i");
      iconEliminar.className = "bi bi-trash";

      const btnEliminar = document.createElement("button");
      btnEliminar.className = " me-2 btn btn-danger"
    
       btnEliminar.appendChild(iconEliminar);
       tdAcciones.appendChild(btnEliminar);

      btnEliminar.addEventListener("click", async() => {
        const respuesta = window.confirm(`Desea eliminar la tarea con id: ${t.id} y titulo: ${t.title}?`);
        if(respuesta){
            await eliminarTarea(t.id);
            await cargarTarea();
            mostrarAlert("Tarea eliminada correctamente", "success");
        }else{
            mostrarAlert("operacion cancelada", "error");
        }
      } )

      const btnCompletado = document.createElement("button");
      btnCompletado.className = "btn btn-primary";

      btnCompletado.addEventListener("click", async() => {
        await desmarcarCompletada(t.id);
        await cargarTarea();
      });

        const iconCompletar = document.createElement("i");
        iconCompletar.className = "bi bi-patch-check-fill";

        btnCompletado.appendChild(iconCompletar);
        tdAcciones.appendChild(btnCompletado);
      
      const btnEditar = document.createElement("button");
        btnEditar.className = "ms-2 btn btn-warning";

        const iconEditar = document.createElement("i");
        iconEditar.className = "bi bi-pencil-square";

        btnEditar.appendChild(iconEditar);
        tdAcciones.appendChild(btnEditar);

        btnEditar.addEventListener("click", async() => {
            cargarFormulario(t);
            btnModificar.hidden = false;
            idActualizar = t.id;
        });






      tbody.appendChild(tr);
    
    })
    
    tabla.appendChild(tbody);
    divListadoCompletadas.appendChild(tabla);
}//
async function agregarTarea(e) {
    e.preventDefault();
    let ahora = new Date();

    const payload = {
      title: inputTitulo.value.trim(),
      description: inputDescripcion.value.trim(),
      completed: false,
      createdAt: ahora,
      updatedAt: ''
    };
     console.log(payload);

    if (validarCampos(payload) === false) {
      console.log("No se agrego la tarea");
    } else {
      try {
        const res = await fetch(BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(`Error ${res.status}: ${errorText}`);
        }

        await cargarTarea();
        form.reset();
        vaciarFormulario();
        mostrarAlert("Tarea agregada correctamente", "success");
      } catch (err) {
        console.log("Error al agregar tarea\n" + err);
        mostrarAlert("Error al agregar tarea", "error");
      }
    }
  } //fin agregar tarea

async function eliminarTarea(id){

// console.log(id);

    try{
        const response = await fetch(`${BASE_URL}/${id}`,{method: "DELETE"})
        await cargarTarea()
    }catch(error){
        console.log("No se pudo eliminar la tarea", error);
    }
}// fin eliminar tarea

async function marcarCompletada(id){
  
const respuesta = window.confirm(`Estas seguro de que queres completar la tarea con id ${id}?`)
    
     if(respuesta){

     try{

        const response = await fetch(`${BASE_URL}/${id}`, 
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({completed:true})
        })
       
        if (!response.ok) {
            // Muestra un error si el backend devuelve status != 2xx
            const errorText = await response.text();
            console.error("Error al actualizar la tarea:", errorText || response.status);
            return;
        }

        // Evita romper si la respuesta está vacía
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        console.log("La tarea fue modificada de manera exitosa", data)
        vaciarFormulario();

    }catch(error){
        console.log(error)
    }
    }else{
        console.log("No se pudo actualizar la tarea");
    }    
}

async function desmarcarCompletada(id){
  
const respuesta = window.confirm(`Estas seguro de que queres desmarcar como completa la tarea con id ${id}?`)
    
     if(respuesta){

     try{

        const response = await fetch(`${BASE_URL}/${id}`, 
            {
                method: "PUT",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify({completed:false})
        })
       
        if (!response.ok) {
            // Muestra un error si el backend devuelve status != 2xx
            const errorText = await response.text();
            console.error("Error al actualizar la tarea:", errorText || response.status);
            return;
        }

        // Evita romper si la respuesta está vacía
        const text = await response.text();
        const data = text ? JSON.parse(text) : null;

        console.log("La tarea fue modificada de manera exitosa", data)
        vaciarFormulario();

    }catch(error){
        console.log(error)
    }
    }else{
        console.log("No se pudo actualizar la tarea");
    }    
}




function vaciarFormulario(){
    inputTitulo.value = ""
    inputDescripcion.value = "";
    
    [inputTitulo, inputDescripcion].forEach(input => { /// se borran las clases
        input.classList.remove("is-invalid");
        input.classList.remove("is-valid");

    });
}// fin vaciar formulario

function validarCampos(payload) {
   
    let esValido = true;

    if (!payload.title.trim()) {
        inputTitulo.classList.add("is-invalid");
        esValido = false;
    }else{
        inputTitulo.classList.add("is-valid");
    }

    if (!payload.description.trim()) {
        inputDescripcion.classList.add("is-invalid");
        esValido = false;
    }else{
        inputDescripcion.classList.add("is-valid");
    }
    return esValido;
    }//fin validar campos



async function modificarTarea(id) {
    let ahora = new Date();
    const payload = {
      title: inputTitulo.value.trim(),
      description: inputDescripcion.value.trim(),
      updatedAt: ahora
    };

    if (validarCampos(payload) === false) {
        console.log("No se modifico la tarea");
        } else {

            try {
                const res = await fetch(`${BASE_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                });

                if (!res.ok) {
                const errorText = await res.text();
                throw new Error(`Error ${res.status}: ${errorText}`);
                }

                // Evita romper si la respuesta está vacía
                const text = await res.text();
                const data = text ? JSON.parse(text) : null;

                await cargarTarea();
                form.reset();
                mostrarAlert("Tarea modificada correctamente", "success");
                vaciarFormulario();
                btnModificar.hidden = true;
                idActualizar = null;
            } catch (err) {
              console.log(err);  
            }
        }

}


function cargarFormulario(tarea){
    inputTitulo.value = tarea.title;
    inputDescripcion.value = tarea.description;
}


function mostrarAlert(mensaje, tipo = "success") {
  const alerta = document.getElementById("alerta");

  alerta.className = "alert alert-custom"; // reset
  alerta.textContent = mensaje;

  if (tipo === "success") {
    alerta.classList.add("alert-success-custom");
  } else {
    alerta.classList.add("alert-error-custom");
  }

  alerta.classList.remove("d-none");

  setTimeout(() => {
    alerta.classList.add("d-none");
  }, 3000);
}

});
