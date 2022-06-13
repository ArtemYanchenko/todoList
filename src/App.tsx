import React, {useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'complited' | 'active';


function App() {
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML+CSS', check: true},
        {id: v1(), title: 'JS', check: true},
        {id: v1(), title: 'React', check: false},
        {id: v1(), title: 'Redux', check: false},
    ]);

    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        let filteredTasks = tasks.filter((t) => {
            return t.id !== id;
        })
        setTasks(filteredTasks);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            check: false
        }
        setTasks([newTask, ...tasks]);
    }

    function changeStatus () {

    }

    let taskForTodoList = tasks;
    if (filter === 'complited') {
        taskForTodoList = tasks.filter(t => t.check === true)
    }
    if (filter === 'active') {
        taskForTodoList = tasks.filter(t => t.check === false)
    }


    return (
        <div className="App">

            <Todolist title="What to learn"
                      tasks={taskForTodoList}
                      addTask={addTask}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
