import {TasksType, TodolistsType} from '../App';
import {AddTodoListAC, todolistsReducer} from './todolist-reducer';
import {tasksReducer} from './task-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: Array<TodolistsType> = [];

    const action = AddTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);
});
