const data = {
  "tasks": {
    "one": {
      "task": "Learning Javascript",
      "state": true,
      "end": "2020/10/21"
    },
    "two": {
      "task": "Reader Book Clean Code",
      "state": false,
      "end": "2023/12/31"
    },
    "three": {
      "task": "Running",
      "state": false,
      "end": "2023/06/25"
    },
    "four": {
      "task": "Pass the Evaluation",
      "state": false,
      "end": "2023/11/09"
    },
    "five": {
      "task": "Go to Karaoke",
      "state": true,
      "end": "2022/08/25"
    },
    "six": {
      "task": "Finish watching the serie",
      "state": false,
      "end": "2023/12/31"
    },
    "seven": {
      "task": "Controll Weight",
      "state": false,
      "end": "2020/11/22"
    }
  }
};

const bodeyTabla = document.getElementById('bodyTabla');
const actividadCumplidaSinFecha = document.getElementById('checkActividadesCumplidas');
const checkNoCumplicasVigentes = document.getElementById('checkNoCumplicasVigentes');
const checkCumplicasNoVigentes = document.getElementById('checkCumplicasNoVigentes');
const checkTodasLasActividades = document.getElementById('checkTodasLasActividades');
const fecha = new Date().toISOString().split('T')[0];
const inputActividad = document.getElementById('inputActividad');
const checkActivo = document.getElementById('checkActivo');
const fechaFin = document.getElementById('fechaFin');
const botonAgregar = document.getElementById('Agregar');

const informacionTabala = (tasks) => {
  bodeyTabla.innerHTML = '';
  tasks.forEach(element => {
    bodeyTabla.innerHTML += `
      <tr>
        <td>${element.task}</td>
        <td>${element.state}</td>
        <td>${element.end}</td>
        <td><button onclick="cambiarEstado('${element.task}')">cambiar State</button></td>
      </tr>
    `;
  });
}

const aplicarFiltros = () => {
  let tasks = Object.values(data.tasks);

  if (actividadCumplidaSinFecha.checked) {
    tasks = tasks.filter(element => element.state === true);
  }

  if (checkNoCumplicasVigentes.checked) {
    tasks = tasks.filter(element => !element.state && new Date(element.end) >= new Date(fecha));
  }

  if (checkCumplicasNoVigentes.checked) {
    tasks = tasks.filter(element => element.state && new Date(element.end) < new Date(fecha));
  }

  informacionTabala(tasks);
}



actividadCumplidaSinFecha.addEventListener('change', aplicarFiltros);
checkNoCumplicasVigentes.addEventListener('change', aplicarFiltros);
checkCumplicasNoVigentes.addEventListener('change', aplicarFiltros);
checkTodasLasActividades.addEventListener('change', () => informacionTabala(Object.values(data.tasks)));

function cambiarEstado(taskName) {
  const tarea = data.tasks[taskName];
  tarea.state = !tarea.state;
  
  aplicarFiltros();
}

aplicarFiltros();

botonAgregar.addEventListener('click', () => {
  console.log("Botón Agregar clickeado.");

  const nuevaTarea = {
    task: inputActividad.value,
    state: checkActivo.checked.value,
    end: fechaFin.value
  };


  const tasks = data.tasks;

 
  const nuevaClave = `task${Object.keys(tasks).length + 1}`;


  data.tasks[nuevaClave] = nuevaTarea;

  console.log("Nueva tarea agregada:", data);


  aplicarFiltros();
});


