// ============================================================
// Snapshot 09 — Events + forms
//
// The app is now INTERACTIVE.
//   • Type in the form + click Add → adds a todo
//   • Click a checkbox → toggles done
//   • Click the × button → removes a todo
//
// New ideas:
//   1. addEventListener — wire a function to an event
//   2. The `event` object — what was clicked, what was typed
//   3. event.preventDefault() — stop the browser's default behavior
//   4. Reading form values via input.value
//   5. Per-element listeners — attach one when you build the <li>
//   6. Event delegation — one listener on the parent (mentioned, not used)
//
// The TodoList class from snapshot 08 is UNCHANGED. The render
// function gains two listeners per <li>. That's it.
// ============================================================


// ------------------------------------------------------------
// Classes carried over from snapshot 07/08. NOT CHANGED.
// ------------------------------------------------------------

class Todo {
  constructor(id, text, priority = 3, minutes = 0) {
    this.id = id;
    this.text = text;
    this.priority = priority;
    this.done = false;
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
}


// ------------------------------------------------------------
// Grab references to all the elements we'll touch.
// ------------------------------------------------------------

const listEl     = document.querySelector("#todo-list");
const summaryEl  = document.querySelector("#summary");
const formEl     = document.querySelector("#add-form");
const textInput  = document.querySelector("#input-text");
const prioInput  = document.querySelector("#input-priority");
const minsInput  = document.querySelector("#input-minutes");


// ------------------------------------------------------------
// Build one <li> for one todo, AND attach per-todo listeners.
// ------------------------------------------------------------

function buildTodoEl(todo) {
  const li = document.createElement("li");
  li.classList.add("todo", `priority-${todo.priority}`);
  if (todo.done) li.classList.add("done");

  // CHECKBOX — toggles done.
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.done;
  checkbox.addEventListener("change", () => {
    console.log(`Checkbox changed for todo ${todo.id}`);
    list.toggle(todo.id);
    render(list);
  });

  // Priority badge.
  const tier = document.createElement("span");
  tier.classList.add("tier");
  tier.textContent =
    todo.priority === 1 ? "HIGH" : todo.priority === 2 ? "MED" : "LOW";

  // Text.
  const text = document.createElement("span");
  text.classList.add("text");
  text.textContent = todo.text;

  // Minutes.
  const minutes = document.createElement("span");
  minutes.classList.add("minutes");
  minutes.textContent = `${todo.minutes} min`;

  // DELETE BUTTON — removes the todo.
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "×";
  deleteBtn.setAttribute("aria-label", "Delete todo");
  deleteBtn.addEventListener("click", () => {
    console.log(`Delete clicked for todo ${todo.id}`);
    list.remove(todo.id);
    render(list);
  });

  li.appendChild(checkbox);
  li.appendChild(tier);
  li.appendChild(text);
  li.appendChild(minutes);
  li.appendChild(deleteBtn);

  return li;
}


// ------------------------------------------------------------
// Render — same pattern as snapshot 08.
// Clear, rebuild, update summary.
// ------------------------------------------------------------

function render(list) {
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
// FORM submission — add a new todo.
//
// `submit` fires when the user clicks Add OR presses Enter in a field.
// The browser's DEFAULT is to send the form data to the server and
// reload the page. We don't want that — we want to handle it in JS.
// → event.preventDefault() stops that default.
//
// `event` (the argument) is an object describing what happened.
// We can also reach the inputs through it: event.target is the <form>.
// ------------------------------------------------------------

formEl.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the page reload

  // Read the form values. Inputs always come back as STRINGS.
  const text = textInput.value.trim();
  const priority = Number(prioInput.value);
  const minutes = Number(minsInput.value);

  if (text === "") return;   // ignore empty submissions

  console.log(`Form submitted: "${text}" (priority ${priority}, ${minutes} min)`);

  list.add(text, priority, minutes);
  render(list);

  // Reset the form for the next entry.
  textInput.value = "";
  minsInput.value = 15;
  textInput.focus();
});


// ------------------------------------------------------------
// Event delegation — the alternative we DIDN'T use here.
//
// Instead of attaching a listener to EVERY checkbox and EVERY delete
// button (which we rebuild on every render), you could attach ONE
// listener to the <ul> and check event.target inside it. Faster and
// more memory-efficient for huge lists.
//
// Example sketch (not active):
//
//   listEl.addEventListener("click", (event) => {
//     const li = event.target.closest(".todo");
//     if (!li) return;
//     const id = Number(li.dataset.id);
//     if (event.target.classList.contains("delete-btn")) {
//       list.remove(id); render(list);
//     }
//   });
//
// For a small list, per-element listeners are simpler. Use whichever
// reads better.
// ------------------------------------------------------------


// ------------------------------------------------------------
// SEED the list with the same demo data, then render once.
// From here on, the page is driven entirely by user events.
// ------------------------------------------------------------

const list = new TodoList();
list.add("Submit grading", 1, 45);
list.add("Buy groceries", 2, 30);
list.add("Reorganize desk", 3, 15);
list.add("Reply to dean's email", 1, 10);

render(list);

console.log("Snapshot 09 ready. Try the form and the checkboxes.");
console.log("Next snapshot: fetch + JSON + localStorage — load seed data and persist changes.");
