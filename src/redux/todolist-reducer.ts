import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';


export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID:string
}


type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

type ChangeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST'
    id: string
    value: string
}

type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodolistFilterAT | ChangeTodoListTitleAT


export const todolistsReducer = (todolists: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.todolistID, title: action.title, filter: 'all'}, ...todolists]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.value} : tl)

        default:
            return todolists
    }
}


export const RemoveTodolistAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id})
export const AddTodoListAC = (title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title,todolistID:v1()})
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterAT => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
})
export const ChangeTodolistTitleAC = (id: string, value: string): ChangeTodoListTitleAT => ({
    type: 'CHANGE-TODOLIST',
    id,
    value
})