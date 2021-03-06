import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import React, {useState} from 'react';
import {Container, createTheme, Grid, Paper} from '@mui/material';
import {grey, red} from '@mui/material/colors';
import ButtonAppBar from './Components/ButtonAppBar';
import BasicSwitches from './Components/Switcher';
import {AddItemForm} from './Components/AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export const App = () => {

    let todolistID1 = v1();
    let todolistID2 = v1();
    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])
    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });

    // const removeTask = (todoListID: string, id: string) => {
    //     setTasks({...tasks, [todoListID]: tasks[todoListID].filter(t => t.id !== id)})
    // }
    // const addTask = (todoListID: string, title: string) => {
    //     let newTask = {id: v1(), title: title, isDone: false}
    //     setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
    // }
    // const changeTaskStatus = (todoListID: string, taskId: string, isDone: boolean) => {
    //     setTasks({...tasks, [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, isDone: isDone} : t)})
    // }
    const changeTaskTitle = (todoListID: string, taskId: string, newValue: string) => {
        setTasks({...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskId ? {...t, title: newValue} : t)})
    }

    // const changeTodolistFilter = (todoListID: string, value: FilterValuesType) => {
    //     setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl))
    // }
    // const deleteTodoList = (todoListID: string) => {
    //     setTodolists()
    // }
    // const addTodoList = (newTitle: string) => {
    //     let newTodoListID = v1();
    //     let newTodoList: TodolistsType = {id: newTodoListID, title: newTitle, filter: 'all'}
    //     setTodolists([newTodoList, ...todolists])
    //     setTasks({...tasks, [newTodoListID]: []})
    // // }
// const changeTodoListTitle = (todolistID: string, newValue: string) => {
//     setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newValue} : tl))
// }



    return (
        <div className="App">
            <ButtonAppBar/>
            <BasicSwitches/>
            <Container fixed>
                <Grid container style={{padding: '20px 10px'}}>
                {/*    <AddItemForm addItem={addTodoList}/>*/}
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let tasksForTodolist = tasks[tl.id];
                            if (tl.filter === 'active') {
                                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
                            }
                            if (tl.filter === 'completed') {
                                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
                            }

                            return <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todoListID={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        // changeFilter={changeTodolistFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={tl.filter}
                                        // deleteTodoList={deleteTodoList}
                                        changeTaskTitle={changeTaskTitle}
                                        // changeTodoListTitle={changeTodoListTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>

            </Container>

        </div>
// </ThemeProvider>
    )
}