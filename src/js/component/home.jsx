
import React, { useEffect, useState } from "react";

const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([])
    const apiUrl = "https://playground.4geeks.com/apis/fake/todos/user/lisandromariano"
    const createUser = async () => {
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify([])
            });
            if (response.ok) {
                const data = await response.json();
                console.log("usuario creado", data);
            }
            else { console.error("error al crear el usuario", response.status) }
        }
        catch (error) {
            console.error(error);
        }
    }

    const getAllTasks = async () => {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setTodos(data)
            }
            else {
                if (response.status === 404) {
                    console.log("Usuario no encontrado");
                    createUser();
                } else { console.error("error en la solicitus", response.status) }
            }
        }
        catch (error) { console.error }
    }

    const addTask = async (value) => {
        try {
            const newTask = {
                label: value, 
                done: false
            };
            const updatedTask = [...todos, newTask];
            console.log(updatedTask);
            const putOptions = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify(updatedTask), 
            };
            const putResponse = await fetch (apiUrl, putOptions);
            if (putResponse.ok){
                setInputValue("");
                getAllTasks();
            } else {
                console.error("Error al agregar la tarea")
            }
        }
        catch (error) {console.error("Error al agregar tarea", error)}
    }

    const deleteTask = async (id) => {
        const updatedList = todos.filter((task) => task.id !== id);
        setTodos (updatedList);
        if (updatedList.length === 0){
            const defaultTask = {
                id: 1, label: "Default Task", done: false, 
            }
            updatedList.push(defaultTask)
        }
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedList),
        };
        await fetch (apiUrl, options).then((response) => {
            if (!response.ok){
                console.error("Error al actualizar el API")
            }
        } )
    }

useEffect(()=> {
    getAllTasks()
},[])

    //Aca debajo en el Return empieza lo que es la parte del HTML, seria la estructura de lo que queres mostrar y el diseño.
    //Pones el estado con el que queres que empiece,
    //que lo declaramos arriba, al principio, en los espacios de memoria, Task y NewTask
    return (
        <div className="Container">

            <h1>My Todos</h1>
            <ul>
                <li>
                    <input 
                        type="text" 
                        onChange={(e) => setInputValue(e.target.value)} 
                        value={inputValue} 
                        onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            console.log(inputValue);
                            addTask (inputValue);
                        }
                    }}
                    placeholder="Agregar Tarea"></input>
                </li>
                {
                    todos.map((item) => {
                        return(
                            <li key={item.id}>
                                {`${item.label}`}
                                <i className="far fa-times-circle" onClick={() => {deleteTask(item.id)}}></i>
                            </li>
                        )
                    }
    
                    )
                }
            </ul>
        </div>
    )
}


export default Home;

