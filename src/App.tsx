import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import {TodoList} from "./components/TodoList";
import {log} from "node:util";
import {AddItemForm} from "./components/AddItemFormPropsType";

export type FilterType = 'all' | 'active' | 'completed';

type TodolistType = {
    id: string
    title: string
}

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
}


type TasksKeyType = {
    data: TaskType[];
    filter: FilterType;
}

export type TasksStateType = {
    [key: string]: TasksKeyType
}

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()
    let todolistID3 = v1()

    let [todoLists, setTodoLists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn'},
        {id: todolistID2, title: 'What to know'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: {
            data: [
                {id: v1(), title: 'HTML', isDone: true},
                {id: v1(), title: 'CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: true},
                {id: v1(), title: 'Redux', isDone: false},
            ],
            filter: 'all'
        },
        [todolistID2]: {
            data: [
                {id: v1(), title: 'Rest API', isDone: false},
                {id: v1(), title: 'GraphQL', isDone: false},
                {id: v1(), title: 'SQL', isDone: false},
            ],
            filter: 'all'
        },
    })
    const addTask = (todoId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoId]: {
                ...tasks[todoId],
                data: [{id: v1(), title, isDone: false}, ...tasks[todoId].data]
            }
        })
    }

    const removeTask = (todoId: string, id: string) => {
        setTasks({
            ...tasks,
            [todoId]: {
                ...tasks[todoId],
                data: tasks[todoId].data.filter(todo => todo.id !== id)
            }
        })
    }

    const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoId]: {
                ...tasks[todoId],
                data: tasks[todoId].data.map(todo => todo.id === taskId ? {...todo, isDone} : todo)
            }
        })
    }

    const changeTodoListsFilter = (todoId: string, filter: FilterType) => {
        setTasks({
            ...tasks,
            [todoId]: {
                ...tasks[todoId],
                filter
            }
        })
    }

    const removeTodoList = (todoId: string) => {
        setTodoLists(todoLists.filter(todo => todo.id !== todoId))
        delete tasks[todoId]
    }

    const addTodoList = (title: string) => {
        setTodoLists([
            {id: todolistID3, title},
            ...todoLists
        ])

        setTasks({[todolistID3]: {data: [], filter: 'all'}, ...tasks})
    }

    const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoId]: {
                ...tasks[todoId],
                data: tasks[todoId].data.map(todo => todo.id === taskId ? {...todo, title} : todo)
            }
        })
    }

    const changeTodoTitle = (todoId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoId ? {...tl, title} : tl))
    }

    const createTodoList = todoLists.map(todo => {

        let filteredTasks = tasks[todo.id]?.data

        switch (tasks[todo.id].filter) {
            case 'active':
                filteredTasks = filteredTasks.filter(task => task.isDone)
                break
            case 'completed':
                filteredTasks = filteredTasks.filter(task => !task.isDone)
                break
        }

        return (
            <TodoList
                key={todo.id}
                todoId={todo.id}
                title={todo.title}
                tasks={filteredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeTodoListsFilter={changeTodoListsFilter}
                changeTaskStatus={changeTaskStatus}
                filter={tasks[todo.id].filter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoTitle={changeTodoTitle}
            />
        )
    })


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
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