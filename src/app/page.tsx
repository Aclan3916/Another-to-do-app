'use client'

import {useState, useEffect} from 'react'
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import {Todo} from '@/types/Todo'
import { useToggle } from '@/hooks/useToggle'

export default function Home() {

  const[todos, setTodos] = useState<Todo[]>([])
  const[editingId, setEditingId] = useState<number | null>(null);
  const[showQuote, toggleQuote] = useToggle();


  useEffect(() => {

    const fetchData = async () =>
    {
      const res = await fetch('api/todos');
      const data = await res.json();
      setTodos(data);
    }

    fetchData();

  }, [])

  //load from local storage on mount 
  //useEffect(() => {
  //   const stored = localStorage.getItem('todos');
  //   if(stored)
  //   {
  //     setTodos(JSON.parse(stored))
  //   }
  // }, [])

  // //save to local storage when todos change
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos))
  // }, [todos])

  
  const addTodo = async (todo : Todo) =>
  {
      const res = await fetch('api/todos',

        {
          method: 'POST',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify(todo)
        }
      )

      if(res.ok)
      {
        const newTodo = await res.json();
        setTodos((prev) => [...prev, newTodo])
      }
  }

  const deleteTodo = async (id: number) =>
  {
    const res = await fetch(`api/todos?id=${id}`,

      {
        method: 'DELETE'
      }
    )
    if(res.ok)
    {

    setTodos(todos.filter((x) => x.id !== id))
  }

  }


  const startingEdit = (id : number) =>
  {
      setEditingId(id);
  }

  const updateTodo = async (todo: Todo) => {

    const res = await fetch('api/todos',
      {
        method: 'PATCH',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(todo)
      }
    )
    if(res.ok)
    {
      const updatedTodo = await res.json();
      setTodos((prev) => prev.map((x) => x.id === updatedTodo.id ? updatedTodo : x) )
    }

    setEditingId(null);
  }

  const toggleTodo = async (id: number) => {
    setTodos((prev) => prev.map((todo) => todo.id === id ? {...todo, isCompleted: !todo. isCompleted} : todo))
  }
  
  return (
    <>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="my-4">
        <button onClick={toggleQuote} className='border px-4 py-2 rounded text-white'>{showQuote ? "Hide Inspo" : "Need Inspo"}</button>
    </div>
    {showQuote && (
      <div className="mt-2 text-sm italic text-gray-400"> 
       The best time to plant a tree was 20 years ago. The second best time is now. 🌱
        </div>
    )}
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"><span className="text-green-600 dark:text-green-400">Another</span> To Do App</h1>
      <p>Basic? Yes. Perfect for learning? Also Yes.</p>
    <TodoForm onAdd={addTodo} onUpdate={updateTodo} editingId={todos.find((x)=> x.id === editingId) ?? null}/>
    <TodoList todos={todos} onDelete={deleteTodo} onUpdate={startingEdit} onToggle={(toggleTodo)}/>
    </main>
    </div>
    </>
  );
}
