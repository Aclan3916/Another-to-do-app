import { NextResponse }  from 'next/server'

let todos = [
    {id: 1, todo: "Wash the dog", isCompleted: false, date: Date.now()},
    {id: 2, todo: "Workout", isCompleted: true, date: Date.now()}
]

export async function GET()
{
    return NextResponse.json(todos)
}

export async function POST(req:Request)
{
    //parses request into json so we can access submitted data 
    const body = await req.json();

    const newTodo = {
        id: Date.now(),
        todo: body.todo,
        isCompleted: false,
        date: body.date
    }

    todos.push(newTodo);
    
    return NextResponse.json(newTodo);
}

export async function DELETE(req: Request)
{
    //search params is a propert of the URL object which helps us grab things from the query string from our url
    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get(('id')) || ' ');

    if(isNaN(id))
    {
        return NextResponse.json({error: "This Id is not valid"})
    }

    todos = todos.filter((x) => x.id !== id);

    return NextResponse.json({success: 'Deleted Successfully'})
}

export async function PATCH(req: Request)
{
    const body = await req.json();
    const {id, todo, isCompleted, date} = body;

    
    const index = todos.findIndex((x) => x.id === id);

if(index === -1)
{
    return NextResponse.json({error: "Not valid"})
}

    todos[index] = {id, todo, isCompleted, date};

    return NextResponse.json(todos[index]);


}
