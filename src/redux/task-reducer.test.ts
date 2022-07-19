import {v1} from 'uuid';
import {TasksType} from '../App';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './task-reducer';

test('removed tasks', () => {
    let startState: TasksType = {
        ['todolistID1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        ['todolistID2']: [
            {id: "1", title: 'HTML&CSS2', isDone: true},
            {id: "2", title: 'JS2', isDone: true},
            {id: "3", title: 'ReactJS2', isDone: false},
            {id: "4", title: 'Rest API2', isDone: false},
            {id: "5", title: 'GraphQL2', isDone: false},
        ]
    }

    const action = RemoveTaskAC('todolistID2','2')

    const endState = tasksReducer(startState,action)

    expect(endState['todolistID2'].length).toBe(4)
    expect(endState['todolistID1'].length).toBe(5)
})

test('added tasks', () => {

    let startState: TasksType = {
        ['todolistID1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        ['todolistID2']: [
            {id: "1", title: 'HTML&CSS2', isDone: true},
            {id: "2", title: 'JS2', isDone: true},
            {id: "3", title: 'ReactJS2', isDone: false},
            {id: "4", title: 'Rest API2', isDone: false},
            {id: "5", title: 'GraphQL2', isDone: false},
        ]
    }

    const action = AddTaskAC('todolistID2','new_task')

    const endState = tasksReducer(startState,action)

    expect(endState['todolistID2'].length).toBe(6)
    expect(endState['todolistID2'][0].title).toBe('new_task')
    expect(endState['todolistID1'].length).toBe(5)
})

test('changed task status', () => {

    let startState: TasksType = {
        ['todolistID1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        ['todolistID2']: [
            {id: "1", title: 'HTML&CSS2', isDone: true},
            {id: "2", title: 'JS2', isDone: true},
            {id: "3", title: 'ReactJS2', isDone: false},
            {id: "4", title: 'Rest API2', isDone: false},
            {id: "5", title: 'GraphQL2', isDone: false},
        ]
    }

    const action = ChangeTaskStatusAC('todolistID2','3',true)

    const endState = tasksReducer(startState,action)

    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID2'][2].isDone).toBeTruthy();
    expect(endState['todolistID1'].length).toBe(5)
})

test('changed task title', () => {

    let startState: TasksType = {
        ['todolistID1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        ['todolistID2']: [
            {id: "1", title: 'HTML&CSS2', isDone: true},
            {id: "2", title: 'JS2', isDone: true},
            {id: "3", title: 'ReactJS2', isDone: false},
            {id: "4", title: 'Rest API2', isDone: false},
            {id: "5", title: 'GraphQL2', isDone: false},
        ]
    }

    const action = ChangeTaskTitleAC('todolistID2','1','hello!newValue')

    const endState = tasksReducer(startState,action)

    expect(endState['todolistID2'].length).toBe(5)
    expect(endState['todolistID2'][0].title).toBe('hello!newValue');
    expect(endState['todolistID1'].length).toBe(5)
})