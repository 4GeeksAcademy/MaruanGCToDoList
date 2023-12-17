import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";

let initialArray = [
  { id: 0, task: "Bañar al perro", done: false },
  { id: 1, task: "Hacer las compras", done: false },
  { id: 2, task: "Preparar almuerzo", done: false },
  { id: 3, task: "Reparar PC", done: false },
];
let nextId = initialArray.length;

const Home = () => {
  const [toDo, setTodo] = useState({ id: 0, task: "", done: false });
  const [editable, setEditable] = useState({ id: 0, task: "", done: false });
  const [tasks, setTasks] = useState(initialArray);

  const handleSubmit = (e) => {
    e.preventDefault(); //Previene que cargue nuevamente la pagina cuando el submit
    if (toDo.task.trim() === "") {
      alert("No puede ingresar valores en blanco");
      cancelar();
      return;
    }
    if (tasks.find((item) => toDo.task === item.task)) {
      alert("Valor duplicado");
      return;
    }
    if (editable.task !== "") {
      //Si clic edit editable.task tiene el valor de la tarea
      editTasks();
      cancelar();
      return;
    }
    const updatedTasks = [
      ...tasks,
      { id: nextId++, task: toDo.task, done: false },
    ];
    cancelar();
    return setTasks(updatedTasks);
  };

  const editTasks = () => {
    //Editar
    const editedTasks = tasks.map((item) => {
      if (item.id === toDo.id) {
        return toDo;
      } else return item;
    });
    return setTasks(editedTasks);
  };

  const removeTask = (e) => {
    //Remover
    const updatedTasks = tasks.filter((task) => e.id !== task.id);
    setTasks(updatedTasks);
  };
  const cancelar = () => {
    //Cancelar
    setEditable({ id: 0, task: "", done: false });
    setTodo({ id: 0, task: "", done: false });
  };
  const edit = (e) => {
    //Preparar Editar
    setEditable(e);
    setTodo(e);
  };
  return (
    <>
      <div className="container bg-primary mt-3 pb-1">
        <div className="d-flex justify-content-center">
          <form onSubmit={handleSubmit}>
            <label className="text-light">
              {editable.task == "" ? "Task" : "Edit Task"}
              <input
                className={`mt-3 mb-3 ${
                  editable.task == "" ? "bg-light" : "bg-warning"
                }`}
                name="myInput"
                value={toDo.task}
                onChange={(e) =>
                  editable.task === ""
                    ? setTodo({
                        id: nextId++,
                        task: e.target.value,
                        done: false,
                      })
                    : setTodo({
                        id: toDo.id,
                        task: e.target.value,
                        done: false,
                      })
                }
              />
            </label>
            <button type="submit">+</button>
          </form>
          {editable.task == "" ? (
            ""
          ) : (
            <button className="mt-3 mb-3" onClick={cancelar}>
              Cancelar
            </button>
          )}
        </div>
        {tasks.map((task) => {
          return (
            <div
              task
              key={task.id}
              className="d-flex justify-content-start text-light tasks"
            >
              <div className="Botones">
                <button className="" onClick={() => edit(task)}>
                  edit
                </button>
                <button
                  className=""
                  // btn btn-light my-1 ms-1
                  onClick={() => removeTask(task)}
                >
                  x
                </button>
              </div>
              <div className="ms-2">{task.task}</div>
            </div>
          );
        })}
        <p className="text-start text-info bg-sucess mb-3">
          #Tasks: {tasks.length}
        </p>
      </div>
    </>
  );
};

export default Home;
