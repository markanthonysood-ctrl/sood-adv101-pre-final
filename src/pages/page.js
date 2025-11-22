"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("todo"); // todo | completed
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
    setText("");
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text: editingText } : t))
    );
    setEditingId(null);
    setEditingText("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const filteredTodos = todos
    .filter((t) => t.text.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => (tab === "todo" ? !t.completed : t.completed));

  return (
    <div className="p-10 max-w-xl mx-auto">

      <h1 className="text-3xl font-bold mb-4">To-Do App</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a task..."
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* Search */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="border p-2 rounded w-full mb-4"
      />

      {/* Tabs */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setTab("todo")}
          className={`px-4 py-2 rounded ${
            tab === "todo" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          To Do
        </button>

        <button
          onClick={() => setTab("completed")}
          className={`px-4 py-2 rounded ${
            tab === "completed" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>

      {/* List */}
      <ul>
        {filteredTodos.map((t) => (
          <li key={t.id} className="border p-3 rounded mb-2 flex justify-between">

            {editingId === t.id ? (
              <input
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
                className="border p-1 rounded w-full mr-2"
              />
            ) : (
              <span
                className={`cursor-pointer ${
                  t.completed ? "line-through text-gray-500" : ""
                }`}
                onClick={() => toggleComplete(t.id)}
              >
                {t.text}
              </span>
            )}

            <div className="flex gap-2">
              {editingId === t.id ? (
                <>
                  <button
                    onClick={() => updateTodo(t.id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(t.id);
                      setEditingText(t.text);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(t.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}