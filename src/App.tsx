import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'complited' | 'active';

type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

function App() {

    const removeTask = (id: string, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let filteredTasks = tasks.filter(t => t.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj});
    }

    const changeFilter = (value: FilterValuesType, todolistId: string) => {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodoLists([...todolists])
        }
    }

    const addTask = (title: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task: TaskType = {id: v1(), title: title, check: false}
        let newTask = [task, ...tasks];
        tasksObj[todolistId] = newTask
        setTasksObj({...tasksObj});
    }

    const changeStatus = (taskID: string, check: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId];
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.check = check;
            setTasksObj({...tasksObj})
        }

    }

    const removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(t => t.id !== todolistId);
        setTodoLists(filteredTodolist);

        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    }

    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, setTodoLists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'active'},
        {id: todolistId2, title: 'What to buy', filter: 'complited'}
    ])
    let [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML+CSS', check: true},
            {id: v1(), title: 'JS', check: true},
            {id: v1(), title: 'React', check: false},
            {id: v1(), title: 'Redux', check: false},
            {id: v1(), title: 'GraphQL', check: false},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Milk', check: true},
            {id: v1(), title: 'Book', check: false}
        ]
    });


    return (
        <div className="App">
            {
                todolists.map((tl) => {
                    let taskForTodoList = tasksObj[tl.id];
                    if (tl.filter === 'complited') {
                        taskForTodoList = taskForTodoList.filter(t => t.check === true)
                    }
                    if (tl.filter === 'active') {
                        taskForTodoList = taskForTodoList.filter(t => t.check === false)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={taskForTodoList}
                        filter={tl.filter}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        changeStatus={changeStatus}
                        removeTodolist={removeTodolist}/>
                })
            }


        </div>
    );
}

export default App;
