import {FilterValuesType, TasksType, TodolistsType} from '../App';
import {v1} from 'uuid';


type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todolistID:string
    id: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    todolistID:string
    title: string
}

type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todolistID:string
    taskId:string
    isDone: boolean
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todolistID:string
    taskId:string
    newValue: string
}



type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT


export const tasksReducer = (state: TasksType, action: ActionType): TasksType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.id)};
        case 'ADD-TASK':
            const newTask = {id:v1(),title:action.title,isDone:false}
            return {...state,[action.todolistID]:[newTask, ...state[action.todolistID]]}
        case 'CHANGE-TASK-STATUS':
            return {...state,[action.todolistID]: state[action.todolistID].map(t=>t.id === action.taskId
                    ? {...t, isDone:action.isDone} : t)}
        case 'CHANGE-TASK-TITLE':
            return {...state,[action.todolistID]:state[action.todolistID].map(t=>t.id === action.taskId
                    ? {...t, title:action.newValue} : t )}
        default:
            return state
    }
}


export const RemoveTaskAC = (todolistID:string,id: string): RemoveTaskAT => ({type: 'REMOVE-TASK', todolistID,id})
export const AddTaskAC = (todolistID:string,title: string): AddTaskAT => ({type: 'ADD-TASK', todolistID,title})
export const ChangeTaskStatusAC = (todolistID:string,taskId: string, isDone:boolean): ChangeTaskStatusAT => ({type: 'CHANGE-TASK-STATUS', todolistID,taskId, isDone})
export const ChangeTaskTitleAC = (todolistID:string,taskId: string, newValue:string): ChangeTaskTitleAT => ({type: 'CHANGE-TASK-TITLE', todolistID,taskId, newValue})
