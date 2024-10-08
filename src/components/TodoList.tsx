import {FilterType, TaskType} from "../App";
import {MyButton} from "./Button";
import {ChangeEvent, useState} from "react";
import {AddItemForm} from "./AddItemFormPropsType";
import {EditableSpan} from "./EditableSpan";
import * as buffer from "node:buffer";

type TodoListProps = {
    todoId: string;
    title: string;
    tasks: TaskType[];
    removeTask: (todoId: string, id: string) => void;
    changeTodoListsFilter: (todoId: string, filter: FilterType) => void;
    addTask: (todoId: string, value: string) => void;
    changeTaskStatus: (todoId: string, id: string, isDone: boolean) => void;
    filter: string;
    removeTodoList: (todoId: string) => void;
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodoTitle: (todolistId: string, title: string) => void
};


export const TodoList = (props: TodoListProps) => {
    const {
        todoId,
        title,
        tasks,
        removeTask,
        changeTodoListsFilter,
        addTask,
        removeTodoList,
        changeTaskStatus,
        filter,
        changeTaskTitle,
        changeTodoTitle
    } = props;

    const removeTodoHandler = () => {
        removeTodoList(todoId)
    }

    const tasksList = tasks.map(task => {

        const onClickDeleteHandler = () => {
            removeTask(todoId, task.id);
        }

        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todoId, task.id, e.currentTarget.checked)
        }

        const changeTaskTitleHandler = (title: string) => {
            changeTaskTitle(todoId, task.id, title)
        }

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <label>
                    <input
                        type="checkbox"
                        checked={task.isDone}
                        onChange={onChangeTaskStatusHandler}
                    />
                    <EditableSpan
                        value={task.title}
                        onChange={changeTaskTitleHandler}
                    ></EditableSpan>
                </label>
                <MyButton onClick={onClickDeleteHandler}>Delete</MyButton>
            </li>
        )
    })

    const addTaskHandler = (value: string) => {
        addTask(todoId, value)
    }

    const changeTodoTitleHandler = (title: string) => {
        changeTodoTitle(todoId, title)
    }

    return (
        <div>
            <div className={'task-title'}>
                <h3>
                    <EditableSpan
                        value={title}
                        onChange={changeTodoTitleHandler}
                    ></EditableSpan>
               </h3>
                <MyButton
                    onClick={removeTodoHandler}
                >
                    Delete
                </MyButton>
            </div>
            <AddItemForm addItem={addTaskHandler}/>
            <ul>
                {!tasksList.length ? <h3>Тасок нет</h3> : tasksList}
            </ul>
            <div>
                <MyButton
                    onClick={() => changeTodoListsFilter(todoId, 'all')}
                    className={filter === 'all' ? 'active-filter' : ''}
                >All</MyButton>
                <MyButton
                    onClick={() => changeTodoListsFilter(todoId, 'active')}
                    className={filter === 'active' ? 'active-filter' : ''}
                >Active</MyButton>
                <MyButton
                    onClick={() => changeTodoListsFilter(todoId, 'completed')}
                    className={filter === 'completed' ? 'active-filter' : ''}
                >Completed</MyButton>
            </div>
        </div>
    );
};


// const [inputValue, setInputValue] = useState("");
// const [inputError, setInputError] = useState<boolean>(false);

// const getInputValue = (e: ChangeEvent<HTMLInputElement>) => {
//     const value = e.currentTarget.value
//     if (value) setInputError(false)
//     setInputValue(value.trimStart())
//
// }
//
// const addTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
//     e.preventDefault();
//     if (!inputValue) {
//         setInputError(true);
//     }
//     addTask(todoId, inputValue);
//     setInputValue('')
// }

{/*<form>*/
}
{/*    <input*/
}
{/*        value={inputValue}*/
}
{/*        onChange={getInputValue}*/
}
{/*        className={inputError ? 'error' : ''}*/
}
{/*    />*/
}
{/*    <MyButton*/
}
{/*        onClick={addTaskHandler}*/
}
{/*    >Add</MyButton>*/
}
{/*    {inputError ? <div className={'errorMessage'}>Add task</div> : null}*/
}
{/*</form>*/
}