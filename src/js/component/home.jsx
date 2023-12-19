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
        if (e.keyCode === 13) {
            setList(list.concat(newTask));        
        }
    };




    function eliminar(tarea) {
        console.log(tarea);
        //filtra todos los elementos menos al que le hacen click
       
    }

    function obtenerPersonajes() {
        //url de api ToDo => https://playground.4geeks.com/apis/fake/todos/user/<lisandromariano>
        fetch('https://playground.4geeks.com/apis/fake/todos/user/<lisandromariano>') //==> buscar
        .then((response)=> response.json()) //yo te prometo que la respuesta la transformo en un json
        .then((data) => setCharacters(data.results)) //yo te prometo que la info transformada la guardo en un espacio de memoria.
        .catch((error) =>console.log(error))
    }


    //Aca debajo en el Return empieza lo que es la parte del HTML, seria la estructura de lo que queres mostrar y el diseño.
     //Pones el estado con el que queres que empiece,
    //que lo declaramos arriba, al principio, en los espacios de memoria, Task y NewTask
    return (
        <div className="Container">
       
        <div className="input-group flex-nowrap">
          <input type="text" className="form-control" onChange={(e)=>setNewTask(e.target.value)} onKeyDown={agregarElemento} placeholder="What needs to be done?" aria-label="Username" aria-describedby="addon-wrapping"/>
        </div>


        <div className="Otros elementos de la lista">
        <ul>
            {list.map((item) => <li>{item} <span onClick={()=>eliminar(item)}>X</span></li>)}
        </ul>
        </div>
        </div>
        )
        }


export default Home;


