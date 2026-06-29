// Vanilla JS frontend. No framework. Just fetch() + DOM.
// Shows the wire format students will use from React + TanStack Query later.

const API = "/api/todos";
const list = document.getElementById("list");
const form = document.getElementById("form");
const textInput = document.getElementById("text");
const minutesInput = document.getElementById("minutes");
const errorBox = document.getElementById("error");

async function fetchTodos() {
  const res = await fetch(API);
  if (!res.ok) throw new Error(`GET ${API} → ${res.status}`);
  return res.json();
}

async function createTodo(text, minutes) {
  const res = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, minutes }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? `POST ${API} → ${res.status}`);
  }
  return res.json();
}

async function toggleTodo(id, done) {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done }),
  });
  if (!res.ok) throw new Error(`PATCH ${API}/${id} → ${res.status}`);
  return res.json();
}

async function deleteTodo(id) {
  const res = await fetch(`${API}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`DELETE ${API}/${id} → ${res.status}`);
}

function render(todos) {
  list.innerHTML = "";
  for (const todo of todos) {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", async () => {
      await toggleTodo(todo.id, checkbox.checked);
      refresh();
    });

    const label = document.createElement("strong");
    label.textContent = todo.text;

    const minutes = document.createElement("span");
    minutes.textContent = ` — ${todo.minutes} min `;

    const del = document.createElement("button");
    del.textContent = "delete";
    del.addEventListener("click", async () => {
      await deleteTodo(todo.id);
      refresh();
    });

    li.append(checkbox, " ", label, minutes, del);
    list.append(li);
  }
}

async function refresh() {
  errorBox.textContent = "";
  try {
    render(await fetchTodos());
  } catch (err) {
    errorBox.textContent = err.message;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.textContent = "";
  try {
    await createTodo(textInput.value.trim(), Number(minutesInput.value));
    textInput.value = "";
    refresh();
  } catch (err) {
    errorBox.textContent = err.message;
  }
});

refresh();
