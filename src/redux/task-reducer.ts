import {FilterValuesType, TasksType, TodolistsType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT} from './todolist-reducer';

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>
export type AddTaskAT = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>


type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | changeTaskTitleAT | AddTodoListAT


export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(el => el.id !== action.taskID)
            }
        case 'ADD-TASK':
            let newTask = {id: v1(), title: 'juce', isDone: false}
            return {
                ...state,
                [action.todolistID]: [newTask, ...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]:[...state[action.todolistID]].map(t=>t.id === action.taskId ? {...t,isDone:action.isDone}: t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]:[...state[action.todolistID].map(t=>t.id === action.taskId ? {...t,title:action.title}:t)]
            }
        case 'ADD-TODOLIST':
            return{
                ...state,
                [action.todolistID]:[]
            }
        default:
            return state
    }
}


export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', taskID, todolistID} as const
}


export const addTaskAC = (title: string, todolistID: string) => {
    return {type: 'ADD-TASK', title, todolistID} as const
}

export const changeTaskStatusAC = (taskId: string, isDone:boolean, todolistID: string) => {
    return {type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistID} as const
}

export const changeTaskTitleAC = (taskId: string, title:string, todolistID: string) => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistID} as const
}