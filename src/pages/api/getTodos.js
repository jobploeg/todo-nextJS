import React from 'react';

function GetTodos({ todos }) {
    return (
        <ul>
            {todos.map((todo) => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </ul>
    );
};

export async function getStaticProps() {
    const res = await fetch('http://localhost:8000/api/todos');

    const todos = await res.json();

    return {
        props: {
            todos,
        },
    };
}


export default GetTodos;