import React, { useState } from "react";


//include images into your bundle


//create your first component
const Home = () => {
    const [list, setList] = useState([]); //Array. Lista de items o coleccion de datos.
    const [newTask, setNewTask] = useState(""); //String. Es una secuencia de caracteres.
    //Estos son los estados iniciales.


    //Despues pones la funcion que queres que se haga cuando haces click. Se puede poner despues del evento,
    //pero es mejor que quede aca arriba asi se ve mas comodo. Es como que se usa abajo, pero se escribe arriba.
    function agregarElemento(e) {      
        if (e.keyCode === 13) {  //agrego un condicional para que cada vez que presione la tecla enter (codigo 13) el elemento nuevo se agregue a la lista.
            setList(list.concat(newTask));
            setNewTask("") //hago que la funcion  setNewTask se actualice a 0 cada vez que apreto la tecla enter.      
        }
    };




    function eliminar(tarea) {
       let nuevoArray = list.filter((item) => item !== tarea) //creo un nuevo array con una condicion (!== tarea)  
        setList(nuevoArray); //llamo a la funcion nuevoArray generado para actualizar a list.
        /* console.log(tarea); */
        //filtra todos los elementos menos al que le hacen click
       
    }

    fetch('https://playground.4geeks.com/apis/fake/todos/user/<lisandromariano>', {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        console.log(resp.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(resp.status); // el código de estado = 200 o código = 400 etc.
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.log(error);
    });




    //Aca debajo en el Return empieza lo que es la parte del HTML, seria la estructura de lo que queres mostrar y el diseño.
     //Pones el estado con el que queres que empiece,
    //que lo declaramos arriba, al principio, en los espacios de memoria, Task y NewTask
    return (
        <div className="Container">
       
        <div className="input-group flex-nowrap">
          <input type="text" className="form-control" onChange={(e)=>setNewTask(e.target.value)} onKeyDown={agregarElemento} value={newTask} placeholder="What needs to be done?" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>


        <div className="Otros elementos de la lista">
        <ul>
            {list.map((item, index) => <li key={index}>{item} <span onClick={()=>eliminar(item)}>X</span></li>)}
        </ul>
        </div>
        </div>
        )
        }


export default Home;



