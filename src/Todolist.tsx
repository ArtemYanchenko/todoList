import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    check: boolean
}

export type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    addTask: (title: string, todolistId: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    changeStatus: (taskID: string, check: boolean, todolistId: string) => void
    removeTodolist:(todolistid:string)=>void
}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const addTask = () => {
        if (title.trim() === '') {
            setError(true)
            return
        }
        ;
        props.addTask(title.trim(), props.id)
        setTitle('');
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
        error && setError(false);
    }
    const onKeyUpHandler = (e: KeyboardEvent) => {
        e.key === 'Enter' && addTask();
        error && setError(true)
    }
    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onComplitedClickHandler = () => props.changeFilter('complited', props.id);


    return (
        <div>
            <h3>{props.title}
                <button onClick={ () => props.removeTodolist(props.id)}>X</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyUp={onKeyUpHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={() => addTask()}>+</button>
                {error && <div className={'errorMessage'}>Title is required !</div>}
            </div>
            <ul>
                {
                    props.tasks.length ? props.tasks.map((t) => {

                        const onRemoveHandler = () => props.removeTask(t.id, props.id);
                        const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeStatus(t.id, e.currentTarget.checked, props.id)
                        return (
                            <li key={t.id}><input
                                type="checkbox"
                                onChange={onChangeStatus}
                                checked={t.check}/>
                                <span className={t.check ? 'checked' : ''}>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    }) : <span className={'emptyError'}>Your todolist is empty</span>
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active' : ''}
                        onClick={onAllClickHandler}>All
                </button>
                <button className={props.filter === 'active' ? 'active' : ''}
                        onClick={onActiveClickHandler}>Active
                </button>
                <button className={props.filter === 'complited' ? 'active' : ''}
                        onClick={onComplitedClickHandler}>Completed
                </button>
            </div>
        </div>
    )
}

export default Todolist;