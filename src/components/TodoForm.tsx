'use client'

import React, { useState, useEffect } from "react";
import { parseISO, isBefore } from 'date-fns';
import { Todo } from "@/types/Todo";
import PrimaryButton from "@/components/PrimaryButton";


type TodoFormProps = {
  onAdd: (todo: Todo) => void;
  onUpdate: (todo : Todo) => void;
  editingId: Todo | null
};

const TodoForm = ({ onAdd, onUpdate, editingId }: TodoFormProps) => {
    const [todo, setTodo] = useState("");
    const [date, setDate] = useState('');
    const [datevalid, setDateValidation] = useState(true);
    const [todoValid, setValidTodo] = useState(true);

  useEffect(() =>
{
    if(editingId)
    {
        setTodo(editingId.todo)
    }
}, [editingId])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo.trim() ) {
      alert("Todo is required");
      return;
    }

    if(todo.length < 4)
    {
        setValidTodo(false);
        return;
    }
    else
    {
        setValidTodo(true);
    }

    if(!date.trim())
    {
        alert("Date is required");
        return;
    }

    const selectedDate = parseISO(date);
    const today = new Date();
    today.setHours(0,0,0,0);

    if(isBefore(selectedDate, today))
    {
        // alert("Hey, sorry the data cannot be before today.")
        // return;
        setDateValidation(false);
        return;
    }
    else
    {
        setDateValidation(true);
    }

    const newTodo: Todo = {
      id: editingId ? editingId.id : Date.now(),
      todo: todo,
      isCompleted: false,
      date: selectedDate
    };

    if(editingId)
    {
        onUpdate(newTodo);
    }
    else
    {
        onAdd(newTodo);
    }
    //clear the input
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input className="mb-4 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add Todo"
          required
        ></input>
         {!todoValid && <p style={{color:'red'}}> ⚠️ Hey sorry, your todo is too short</p>}

         <div className="relative max-w-sm">
  <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
    </svg>
  </div>
        <input className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="date" value={date} onChange={(e) => setDate(e.target.value)} required ></input>
        </div>
        {!datevalid && <p style={{color:'red'}}> ⚠️ Hey sorry, date selection cannot be before today</p>}
        <PrimaryButton type="submit">{editingId ? "Update Todo" : "Add Todo"} </PrimaryButton>
      </div>
    </form>
  );
};

export default TodoForm;
