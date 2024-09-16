import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList";
import {log} from "node:util";

export type FilterType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to know', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
            {id: v1(), title: 'SQL', isDone: false},
        ],
    })


    const addTask = (todoId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoId]: [{id: v1(), title, isDone: false}, ...tasks[todoId]]
        })
    }

    const removeTask = (todoId: string, id: string) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].filter(task => task.id !== id)
        })
    }

    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, isDone} : task)
        })
    }

    const changeTodoListsFilter = (todoId: string, filter: FilterType) => {
        setTodoLists(todoLists.map(todo => todo.id === todoId ? {...todo, filter} : todo))
    }

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId))
        delete tasks[todoId]
    }


    const createTodoList = todoLists.map(({filter, id, title}) => {

        let filteredTasks = tasks[id]

        switch (filter) {
            case 'active':
                filteredTasks = filteredTasks.filter(task => task.isDone)
                break
            case 'completed':
                filteredTasks = filteredTasks.filter(task => !task.isDone)
                break
        }

        return (
            <TodoList
                key={id}
                todoId={id}
                title={title}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListsFilter={changeTodoListsFilter}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
                removeTodoList={removeTodoList}
            />
        )
    })


    return (
        <div className="App">
            {createTodoList}
        </div>
    );
}

export default App;


// const tasks2: TaskType[] = [
//     {id: v1(), title: 'Hello world', isDone: true},
//     {id: v1(), title: 'I am Happy', isDone: false},
//     {id: v1(), title: 'Yo', isDone: false},
//     {id: v1(), title: 'Redux', isDone: false},
// ]

// let [todolists, setTodolists] = useState<TodolistType[]>([
//     { id: v1(), title: 'What to learn', filter: 'all' },
//     { id: v1(), title: 'What to buy', filter: 'all' },
// ])

// const tasksList: TaskType[] = [
//     {id: v1(), title: 'HTML', isDone: true},
//     {id: v1(), title: 'CSS', isDone: true},
//     {id: v1(), title: 'JS', isDone: true},
//     {id: v1(), title: 'React', isDone: true},
//     {id: v1(), title: 'Redux', isDone: false},
// ]

// const [tasks, setTasks] = useState<TaskType[]>(tasksList)