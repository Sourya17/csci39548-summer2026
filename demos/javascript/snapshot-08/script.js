// ============================================================
// Snapshot 08 — DOM manipulation
//
// THE TODOS FINALLY SHOW UP ON THE PAGE.
//
// The TodoList class from snapshot 07 is IDENTICAL here. We just
// add a `render()` function that reads from the list and writes
// the matching HTML into the page. No interactivity yet — the
// page is still "read-only". Snapshot 09 wires up clicks and forms.
//
// New ideas:
//   1. document.querySelector / querySelectorAll — find elements
//   2. textContent — read/write the text inside an element
//   3. classList — add/remove/toggle CSS classes
//   4. createElement + appendChild — build elements from JS
//   5. innerHTML — fast but DANGEROUS for user input (briefly mentioned)
//   6. The render() pattern: clear + rebuild from state
// ============================================================


// ------------------------------------------------------------
// Classes carried over from snapshot 07. NOT CHANGED.
// (In a real project these would live in their own file.)
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
// 1. Finding elements — querySelector takes a CSS selector.
//
//   document.querySelector("#id")        — first match by id
//   document.querySelector(".class")     — first match by class
//   document.querySelector("ul")         — first <ul>
//   document.querySelectorAll(".todo")   — ALL matches (a NodeList)
// ------------------------------------------------------------

const listEl    = document.querySelector("#todo-list");
const summaryEl = document.querySelector("#summary");

console.log("listEl:   ", listEl);     // the <ul>
console.log("summaryEl:", summaryEl);  // the <p>


// ------------------------------------------------------------
// 2. textContent — read or write the text inside an element.
//
// element.textContent = "..."   sets the text (safely escapes HTML)
// ------------------------------------------------------------

summaryEl.textContent = "Building the list...";


// ------------------------------------------------------------
// 3. createElement + appendChild — build elements from JS.
//
//   const li = document.createElement("li");
//   li.textContent = "Hello";
//   parent.appendChild(li);
//
// 4. classList — add/remove/toggle CSS classes.
//
//   el.classList.add("done");
//   el.classList.remove("done");
//   el.classList.toggle("done");
//   el.classList.contains("done");
// ------------------------------------------------------------


// Build the DOM for ONE todo. Returns an <li> element.
function buildTodoEl(todo) {
  // <li class="todo priority-1 done">
  //   <span class="tier">HIGH</span>
  //   <span class="text">Submit grading</span>
  //   <span class="minutes">45 min</span>
  // </li>

  const li = document.createElement("li");
  li.classList.add("todo", `priority-${todo.priority}`);
  if (todo.done) li.classList.add("done");

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

  li.appendChild(tier);
  li.appendChild(text);
  li.appendChild(minutes);

  return li;
}


// ------------------------------------------------------------
// 5. innerHTML — a quick alternative, with a warning.
//
//   el.innerHTML = "<li>Hello <b>world</b></li>";
//
// Faster to type, but it PARSES the string as HTML. If any part
// of that string came from a user, an attacker can inject <script>.
// Rule of thumb: prefer createElement + textContent. Use innerHTML
// ONLY for trusted, static strings (or to wipe an element: el.innerHTML = "").
// ------------------------------------------------------------


// ------------------------------------------------------------
// 6. The render() pattern.
//
// Single source of truth: the TodoList. After ANY change to the
// data, call render() to rebuild the DOM from scratch. Clear the
// container, loop through the data, append fresh elements.
//
// Inefficient for huge lists, but dead simple and bug-free. This
// is the same idea React, Vue, etc. automate for you.
// ------------------------------------------------------------

function render(list) {
  // 1. Clear out whatever was there before.
  listEl.innerHTML = "";   // safe here — empty string, no user input

  // 2. Build one <li> per todo and append it.
  for (const todo of list.todos) {
    const li = buildTodoEl(todo);
    listEl.appendChild(li);
  }

  // 3. Update the summary line.
  const mins = list.remainingMinutes();
  const undone = list.todos.filter((t) => !t.done).length;
  summaryEl.textContent =
    `${undone} unfinished · ${mins} min remaining (${(mins / 60).toFixed(2)} h)`;
}


// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// Build the same list as snapshot 07, render it, then mutate
// + re-render a couple of times so you can watch the DOM update.
// (We're triggering these from JS directly; snapshot 09 wires
//  them to real buttons.)
// ------------------------------------------------------------

const list = new TodoList();
list.add("Submit grading", 1, 45);
list.add("Buy groceries", 2, 30);
list.add("Reorganize desk", 3, 15);
list.add("Reply to dean's email", 1, 10);

render(list);
console.log("Initial render done.");

// Mutate after 1.5 seconds so you can SEE the change in the browser.
setTimeout(() => {
  console.log("→ Marking 'Buy groceries' (id 2) as done...");
  list.toggle(2);
  render(list);
}, 1500);

setTimeout(() => {
  console.log("→ Removing 'Reorganize desk' (id 3)...");
  list.remove(3);
  render(list);
}, 3000);

setTimeout(() => {
  console.log("→ Adding a new todo...");
  list.add("Prep tomorrow's slides", 2, 25);
  render(list);
  console.log("End of snapshot 08.");
  console.log("Next snapshot: events + forms — make it interactive.");
}, 4500);
