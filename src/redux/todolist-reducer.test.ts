import {
    AddTodoListAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from './todolist-reducer';
import {v1} from 'uuid';
import {TodolistsType} from '../App';



test('correct reducer should be removed', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

  const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]


    const endState = todolistsReducer(startState, RemoveTodolistAC(todolistID2))

    expect(endState.length).toBe(1)
    expect(endState[0].title).toBe('What to learn')
})


test('correct reducer should be add todolist', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]


    const endState = todolistsReducer(startState, AddTodoListAC("New Todo", v1()))

    expect(endState.length).toBe(3)
    expect(endState[1].title).toBe('What to learn')
})


test('correct reducer should be change filter on todolist', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]


    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistID2, 'completed'))

    expect(endState[1].filter).toBe('completed')
    // expect(endState[1].title).toBe('What to learn')

})

test('correct reducer should be change title on todolist', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState:Array<TodolistsType> = [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ]


    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistID2, 'new string'))

    expect(endState[1].title).toBe('new string')
    // expect(endState[1].title).toBe('What to learn')
})