document.addEventListener("DOMContentLoaded", () => {

const BASE_URL = "http://localhost:3000/api/tasks";

cargarTarea();

const form = document.getElementById("frmFormulario");
const inputTitulo = document.getElementById("titulo");
const inputDescripcion = document.getElementById("descripcion");

const btnAgregar = document.getElementById("btnAgregar");

const divListado = document.getElementById("divListado");
const divListadoCompletadas = document.getElementById("divListadoCompletadas");

btnAgregar.addEventListener("click", agregarTarea);


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
      alert("No se puede obtener el listado de tareas\n");
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
            alert("Eliminada exitosamente");
        }else{
            alert("Operacion cancelada");
        }
      } )

      const btnCompletado = document.createElement("button");
      btnCompletado.className = "btn btn-success"
            
            const iconSelect = document.createElement("i");
            iconSelect.className = "bi bi-patch-check-fill";

            btnCompletado.appendChild(iconSelect);
            tdAcciones.appendChild(btnCompletado);
      
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
            alert("Eliminada exitosamente");
        }else{
            alert("Operacion cancelada");
        }
      } )

      tbody.appendChild(tr);
    
    })
    
    tabla.appendChild(tbody);
    divListadoCompletadas.appendChild(tabla);
}//
async function agregarTarea(e) {
    e.preventDefault();
    let ahora = new Date();
    // payload
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
        alert("Tarea agregada");
        vaciarFormulario();
      } catch (err) {
        console.log("Error al agregar tarea\n" + err);
        alert("Error al agregar tarea");
      }
    }
  } //fin agregar tarea

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

    async function eliminarTarea(id){

    console.log(id);

        try{
        
            const response = await fetch(`${BASE_URL}/${id}`,{method: "DELETE"})
            let data = null;
            const text = await response.text();
            if (text) {
            data = JSON.parse(text);
            }

            console.log("La tarea fue eliminada exitosamente", data || "(sin respuesta)");
            

        }catch(error){
            console.log(error)
        }
    }// fin eliminar tarea

    function vaciarFormulario(){
        inputTitulo.value = ""
        inputDescripcion.value = "";
        
        [inputTitulo, inputDescripcion].forEach(input => { /// se borran las clases
            input.classList.remove("is-invalid");
            input.classList.remove("is-valid");

        });
    }// fin vaciar formulario


});
