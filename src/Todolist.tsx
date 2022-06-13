import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    check: boolean
}

export type PropsType = {
    title: string
    tasks: Array<TaskType>
    addTask: (title: string) => void
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
}

function Todolist(props: PropsType) {
    const [title, setTitle] = useState<string>('');
    const addTask = () => {
        props.addTask(title)
        setTitle('');
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onKeyUpHandler = (e: KeyboardEvent) => e.key === 'Enter' && addTask();
    const onAllClickHandler = () => props.changeFilter('all');
    const onActiveClickHandler = () => props.changeFilter('active');
    const onComplitedClickHandler = () => props.changeFilter('complited');


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetTitle}
                    onKeyUp={onKeyUpHandler}
                />
                <button onClick={() => addTask()}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map((t) => {

                        const onRemoveHandler = () => props.removeTask(t.id);

                        return (
                            <li key={t.id}><input type="checkbox" checked={t.check}/>
                                <span>{t.title}</span>
                                <button onClick={onRemoveHandler}>X</button>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onComplitedClickHandler}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;