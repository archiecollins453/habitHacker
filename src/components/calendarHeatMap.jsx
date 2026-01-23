import { useMemo } from "react";
import "../css/calendarHeatmap.css";

function CalendarHeatmap() {
  const today = new Date();

  // Mock data: YYYY-MM-DD → habits completed
  const habitData = {
    "2026-01-02": 1,
    "2026-01-03": 3,
    "2026-01-05": 2,
    "2026-01-07": 4,
    "2026-01-10": 1
  };

  const daysInMonth = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: lastDay }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return date.toISOString().split("T")[0];
    });
  }, [today]);

  return (
    <div className="heatmap-container">
      <h2>This Month</h2>

      <div className="heatmap-grid">
        {daysInMonth.map((date) => {
          const count = habitData[date] || 0;

          return (
            <div
              key={date}
              className={`heatmap-cell level-${count}`}
              title={`${date}: ${count} habits`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CalendarHeatmap;
