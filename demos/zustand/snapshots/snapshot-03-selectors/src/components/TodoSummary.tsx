import { useTodoCounts } from "../store/selectors";

// No props. The summary subscribes to derived counts directly.
// useShallow inside useTodoCounts prevents re-render when an unrelated
// part of the store changes.
export default function TodoSummary() {
  const { activeCount, doneCount, totalMinutes, remainingMinutes } =
    useTodoCounts();

  return (
    <p style={{ color: "#666" }}>
      {activeCount} active · {doneCount} done · {remainingMinutes} of{" "}
      {totalMinutes} min remaining
    </p>
  );
}
