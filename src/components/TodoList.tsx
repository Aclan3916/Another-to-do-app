'use client'

import React, { useState } from 'react'
import {Todo} from '@/types/Todo'
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

type TodoListProps = {
    todos: Todo[];
    onDelete: (id: number) => void;
    onUpdate: (id: number) => void;
    onToggle: (id: number) => void;
}

const TodoList = ({todos, onDelete, onUpdate, onToggle} : TodoListProps) => {

  return (
    <div>
<h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{"Todos 🙂 :)"}</h2>
<ul className="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
{todos.map((todo) => 
    <li key={todo.id} className="flex items-center">
        {todo.isCompleted && 
        <svg onClick={() => onToggle(todo.id)} className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        } 
        {!todo.isCompleted &&
        <svg onClick={() => onToggle(todo.id)} className="w-3.5 h-3.5 me-2 text-gray-500 dark:text-gray-400 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
         </svg>
        }       
       <p>  {todo.todo}</p>
     <span className="m-3"></span>
       <p>{new Date(todo.date).toLocaleDateString()}</p>
    <span className="m-3"></span>
          <MdDeleteOutline onClick={() => onDelete(todo.id)}/>
          <FiEdit onClick={() => onUpdate(todo.id)} />
          
    </li>
        )}
      </ul>
    </div>
  )
}

export default TodoList
