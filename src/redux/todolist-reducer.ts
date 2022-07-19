import {FilterValuesType, TodolistsType} from '../App';
import {v1} from 'uuid';


type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
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
            return [{id: action.id, title: action.title, filter: 'all'}, ...todolists]
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST':
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.value} : tl)
        default:
            return todolists
    }
}


export const RemoveTodolistAC = (id: string): RemoveTodoListAT => ({type: 'REMOVE-TODOLIST', id})
export const AddTodoListAC = (id: string, title: string): AddTodoListAT => ({type: 'ADD-TODOLIST', title, id:v1()})
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