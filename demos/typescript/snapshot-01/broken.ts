// ============================================================
// Snapshot 01 — Watch tsc REFUSE to compile
//
// Run:  tsc broken.ts
//
// You'll see something like:
//
//   broken.ts:11:7 - error TS2322:
//     Type 'string' is not assignable to type 'number'.
//
//   11 const score: number = "ninety";
//            ~~~~~
//
// The compiler tells you the file, the line, the column, and the
// exact problem. Fix the bug → run `tsc broken.ts` again → no errors.
//
// ⚠️  By default, tsc STILL writes broken.js even when there are
// errors. The errors are warnings unless you use --noEmitOnError.
// In a real project (with tsconfig.json) you'd turn that on.
// ============================================================


const score: number = "ninety";   // ❌ string assigned to number

console.log(`Your score is ${score}`);
