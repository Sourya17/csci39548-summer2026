// ============================================================
// Snapshot 07 — `as` casting + `!` non-null assertion
//
// Compile:  tsc dom.ts
// Open:     index.html via Live Server. See the input wire up.
//
// This is the snapshot that BRIDGES TS to React. Every React
// student hits these two operators in their first hour:
//
//   1. `as` — "trust me, treat this value as type T."
//   2. `!`  — "trust me, this is NOT null/undefined."
//
// They're escape hatches. Useful, but use them carefully.
// ============================================================
// ------------------------------------------------------------
// The setup: `document.querySelector` returns `Element | null`.
//
// TS forces you to handle the "element might not exist" case.
// That sounds annoying, but it catches the very real bug of
// querying for an id that doesn't exist anymore after a refactor.
// ------------------------------------------------------------
const headingMaybe = document.querySelector("#greeting");
// headingMaybe.textContent = "Hi!";   // ❌ Object is possibly 'null'.
// ------------------------------------------------------------
// Approach 1 — handle the null PROPERLY (the right answer 95% of the time).
// ------------------------------------------------------------
if (headingMaybe !== null) {
    headingMaybe.textContent = "Hello from snapshot 07";
}
// ------------------------------------------------------------
// Approach 2 — the `!` NON-NULL ASSERTION operator.
//
// `something!` tells TS: "I know this isn't null/undefined. Trust me."
// TS believes you. If you're wrong, you get a runtime crash.
//
// Reasonable when:
//   - The element is in your own HTML, right above the script
//   - The check would just be noise
//
// Dangerous when:
//   - The element might genuinely not exist
//   - The HTML can change without you noticing
// ------------------------------------------------------------
const heading = document.querySelector("#greeting");
// heading is now `Element` (no null). Use it directly.
// ------------------------------------------------------------
// Approach 3 — the `as` TYPE ASSERTION operator.
//
// `value as Type` tells TS: "treat this value as the more specific
// type Type." TS doesn't verify; it just believes you.
//
// `querySelector` returns the general `Element` type. To get
// input-specific properties like `.value`, narrow it down with `as`.
// ------------------------------------------------------------
const nameInput = document.querySelector("#name-input");
const goBtn = document.querySelector("#go-btn");
// Now TS knows nameInput has `.value`, .placeholder, .focus(), etc.
goBtn.addEventListener("click", () => {
    const typed = nameInput.value.trim();
    if (typed === "")
        return;
    heading.textContent = `Hello, ${typed}!`;
    console.log("Greeted:", typed);
});
// ------------------------------------------------------------
// `as` PITFALL — the compiler will believe almost anything.
//
// `as` is a CAST, not a check. If you lie, TS won't stop you.
// Only the values you actually have at runtime matter.
// ------------------------------------------------------------
// const num = "hello" as unknown as number;
// console.log(num * 2);   // compiles fine, prints NaN at runtime
// Rule of thumb:
//   - Use `as` for legitimate narrowing the compiler can't do
//     (querySelector → input, JSON.parse → specific type)
//   - DON'T use `as` to "shut up the error" — fix the actual mismatch
// ------------------------------------------------------------
// Bonus — `as const` (briefly).
//
// `as const` freezes a value into the most specific literal type.
// Useful for config objects you want to lock down.
// ------------------------------------------------------------
const config = {
    level: "high",
    retries: 3,
};
// Without `as const`: config.level is `string`.
// With `as const`:    config.level is `"high"` (literal). Can't be reassigned.
console.log("config:", config);
// ------------------------------------------------------------
// PUTTING IT TOGETHER
//
// A typed event handler. The form input + button are wired up
// safely thanks to `as HTMLInputElement` / `as HTMLButtonElement`,
// and the heading is `!`-asserted because it's literally in
// our own HTML above this script.
//
// When you reach React, the JSX equivalent is:
//
//   <input ref={inputRef} />          // TS knows inputRef.current is HTMLInputElement | null
//   inputRef.current?.focus()         // optional chaining — handles null
//
// Same idea, more elegant syntax. The `as` / `!` hacks largely
// go away in React land — but you'll still see them when
// integrating with non-React libraries or older code.
// ============================================================
nameInput.focus(); // jump-start the user
console.log("Snapshot 07 ready. Type a name, click Go.");
export {};
