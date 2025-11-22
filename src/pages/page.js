"use client";
import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("todo"); // "todo" | "completed"
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTodo = () => {
    if (!text.trim()) return;
    setTodos([
      ...todos,
      { id: Date.now(), text, completed: false }
    ]);
    setText("");
  };

  const updateTodo = (id) => {
    setTodos(
      todos.map((t) =>
        t.id === id ? { ...t, text: editingText } : t
      )
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
    .filter((t) =>
      t.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((t) => (tab === "todo" ? !t.completed : t.completed));

  return (
    <div style={{ margin: "40px auto", maxWidth: "450px" }}>
      <h1>To-Do App</h1>

      {/* CREATE */}
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task..."
      />
      <button onClick={addTodo}>Add</button>

      {/* SEARCH */}
      <input
        style={{ marginTop: "10px", width: "100%" }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      {/* TABS */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setTab("todo")} disabled={tab === "todo"}>
          To Do
        </button>
        <button
          onClick={() => setTab("completed")}
          disabled={tab === "completed"}
        >
          Completed
        </button>
      </div>

      <ul style={{ marginTop: "20px" }}>
        {filteredTodos.map((t) => (
          <li key={t.id} style={{ marginBottom: "10px" }}>
            {/* UPDATE MODE */}
            {editingId === t.id ? (
              <>
                <input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => updateTodo(t.id)}>Save</button>
                <button onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: t.completed ? "line-through" : "none",
                    marginRight: "10px",
                    cursor: "pointer"
                  }}
                  onClick={() => toggleComplete(t.id)}
                >
                  {t.text}
                </span>

                {/* UPDATE BUTTON */}
                <button
                  onClick={() => {
                    setEditingId(t.id);
                    setEditingText(t.text);
                  }}
                >
                  Edit
                </button>

                {/* DELETE BUTTON */}
                <button
                  style={{ marginLeft: "5px" }}
                  onClick={() => deleteTodo(t.id)}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}