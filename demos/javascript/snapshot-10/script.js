// ============================================================
// Snapshot 10 — async/await + fetch + JSON + localStorage + try/catch
//
// THE FINALE. The todo app is now a real app:
//   • First load → fetch seed data from a real API (JSONPlaceholder)
//   • Every change → saved to localStorage
//   • Reloading the page → reads from localStorage, no fetch needed
//   • Reset button → clears storage and re-fetches from the API
//
// New ideas:
//   1. async / await — write asynchronous code that READS like sync
//   2. fetch() — make HTTP requests from the browser
//   3. response.json() — parse JSON body into JS objects
//   4. try / catch — handle errors that happen during async work
//   5. JSON.stringify / JSON.parse — convert objects ↔ strings
//   6. localStorage — tiny key/value store, persists across reloads
//
// The TodoList class is STILL the same (with one tiny addition:
// a static fromPlain() helper for rehydrating from storage).
// ============================================================


// ------------------------------------------------------------
// Classes — Todo unchanged. TodoList gets one helper.
// ------------------------------------------------------------

class Todo {
  constructor(id, text, priority = 3, minutes = 0, done = false) {
    this.id = id;
    this.text = text;
    this.priority = priority;
    this.done = done;
    this.minutes = minutes;
  }
  toggle() {
    this.done = !this.done;
  }
}

class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }
  add(text, priority = 3, minutes = 0) {
    const todo = new Todo(this.nextId, text, priority, minutes);
    this.todos.push(todo);
    this.nextId += 1;
    return todo;
  }
  remove(id) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
  toggle(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.toggle();
  }
  remainingMinutes() {
    return this.todos
      .filter((t) => !t.done)
      .reduce((sum, t) => sum + t.minutes, 0);
  }
  // Rebuild a TodoList from raw saved data (e.g. parsed JSON).
  static fromPlain(plain) {
    const list = new TodoList();
    list.todos = plain.todos.map(
      (t) => new Todo(t.id, t.text, t.priority, t.minutes, t.done)
    );
    list.nextId = plain.nextId;
    return list;
  }
}


// ------------------------------------------------------------
// Constants.
// ------------------------------------------------------------

const STORAGE_KEY = "snapshot10.todos";
const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";


// ------------------------------------------------------------
// localStorage — key/value strings, persists across reloads.
//
//   localStorage.setItem(key, stringValue)
//   localStorage.getItem(key)   → string or null
//   localStorage.removeItem(key)
//
// It only stores STRINGS, so we use JSON.stringify / JSON.parse
// to round-trip objects.
// ------------------------------------------------------------

function saveList(list) {
  const data = { todos: list.todos, nextId: list.nextId };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log(`Saved ${list.todos.length} todos to localStorage.`);
}

function loadList() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) return null;
  try {
    const data = JSON.parse(raw);
    return TodoList.fromPlain(data);
  } catch (err) {
    console.error("Couldn't parse saved data — ignoring it.", err);
    return null;
  }
}


// ------------------------------------------------------------
// fetch + async/await
//
// `fetch(url)` returns a PROMISE that resolves to a Response.
// `await` pauses the async function until the promise resolves.
// Then `response.json()` returns another promise — the body parsed
// as JSON.
//
// JSONPlaceholder returns todos shaped like:
//   { userId, id, title, completed }
// We map them into OUR shape: { id, text, priority, done, minutes }.
// ------------------------------------------------------------

async function fetchSeedTodos() {
  console.log(`Fetching seed todos from ${API_URL}...`);
  const response = await fetch(API_URL);

  // fetch only rejects on network errors. HTTP errors (404, 500)
  // come back as a normal response with response.ok === false.
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const raw = await response.json();
  console.log("Got raw API data:", raw);

  // Convert API shape → our shape.
  const list = new TodoList();
  for (const item of raw) {
    list.add(item.title, 2, 15);                  // default priority MED, 15 min
    // The API gives us a `completed` flag too — respect it.
    const justAdded = list.todos[list.todos.length - 1];
    justAdded.done = item.completed;
  }
  return list;
}


// ------------------------------------------------------------
// DOM references.
// ------------------------------------------------------------

const listEl    = document.querySelector("#todo-list");
const summaryEl = document.querySelector("#summary");
const formEl    = document.querySelector("#add-form");
const textInput = document.querySelector("#input-text");
const prioInput = document.querySelector("#input-priority");
const minsInput = document.querySelector("#input-minutes");
const resetBtn  = document.querySelector("#reset-btn");


// ------------------------------------------------------------
// Build one <li>, with checkbox + delete listeners.
// (Same as snapshot 09 — each handler now ALSO calls saveList.)
// ------------------------------------------------------------

function buildTodoEl(todo) {
  const li = document.createElement("li");
  li.classList.add("todo", `priority-${todo.priority}`);
  if (todo.done) li.classList.add("done");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => {
    list.toggle(todo.id);
    saveList(list);
    render();
  });

  const tier = document.createElement("span");
  tier.classList.add("tier");
  tier.textContent =
    todo.priority === 1 ? "HIGH" : todo.priority === 2 ? "MED" : "LOW";

  const text = document.createElement("span");
  text.classList.add("text");
  text.textContent = todo.text;

  const minutes = document.createElement("span");
  minutes.classList.add("minutes");
  minutes.textContent = `${todo.minutes} min`;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "×";
  deleteBtn.setAttribute("aria-label", "Delete todo");
  deleteBtn.addEventListener("click", () => {
    list.remove(todo.id);
    saveList(list);
    render();
  });

  li.appendChild(checkbox);
  li.appendChild(tier);
  li.appendChild(text);
  li.appendChild(minutes);
  li.appendChild(deleteBtn);

  return li;
}

function render() {
  listEl.innerHTML = "";
  for (const todo of list.todos) {
    listEl.appendChild(buildTodoEl(todo));
  }
  const mins = list.remainingMinutes();
  const undone = list.todos.filter((t) => !t.done).length;
  summaryEl.textContent =
    `${undone} unfinished · ${mins} min remaining (${(mins / 60).toFixed(2)} h)`;
}


// ------------------------------------------------------------
// Form submit — same as snapshot 09, plus saveList().
// ------------------------------------------------------------

formEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = textInput.value.trim();
  const priority = Number(prioInput.value);
  const minutes = Number(minsInput.value);

  if (text === "") return;

  list.add(text, priority, minutes);
  saveList(list);
  render();

  textInput.value = "";
  minsInput.value = 15;
  textInput.focus();
});


// ------------------------------------------------------------
// Reset button — wipe storage, re-fetch from API.
// ------------------------------------------------------------

resetBtn.addEventListener("click", async () => {
  console.log("Reset clicked. Clearing storage + re-fetching...");
  localStorage.removeItem(STORAGE_KEY);
  await bootstrap();   // re-run the load-from-API path
});


// ------------------------------------------------------------
// BOOTSTRAP — runs once on page load.
//
// Logic:
//   1. Try to load from localStorage. If found, use it.
//   2. Otherwise, fetch seed data from the API.
//   3. On ANY fetch error, fall back to an empty list and tell
//      the user via the summary line.
//
// `try / catch` catches errors thrown inside the try block —
// including errors thrown by `await`ed promises.
// ------------------------------------------------------------

let list;   // declared up here so all handlers can see it

async function bootstrap() {
  summaryEl.textContent = "Loading...";

  const saved = loadList();
  if (saved !== null) {
    console.log("Restored from localStorage. Skipping fetch.");
    list = saved;
    render();
    return;
  }

  try {
    list = await fetchSeedTodos();
    saveList(list);
    render();
  } catch (err) {
    console.error("Fetch failed:", err);
    summaryEl.textContent = "Couldn't load seed data. Add todos manually.";
    list = new TodoList();
    render();
  }
}

bootstrap();

console.log("Snapshot 10: try toggling, adding, then reloading the page.");
console.log("Your changes survive because they're saved to localStorage.");
console.log("Click Reset to wipe storage and re-fetch from the API.");
console.log("---");
console.log("This is the end of the JS demo. Tomorrow: TypeScript / React.");
