import React from "react";
import "../css/calendarHeatmap.css";
import { auth } from "../services/firebase";

function CalendarHeatmap({ habits, selectedDate }) {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const user = auth.currentUser;
  const userHabits = habits.filter(h => h.uid === user.uid);

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const habitCountByDay = {};
  habits.forEach(h => {
    const hDate = new Date(h.date);
    if (
      hDate.getFullYear() === year &&
      hDate.getMonth() === month &&
      h.done
    ) {
      const day = hDate.getDate();
      habitCountByDay[day] = (habitCountByDay[day] || 0) + 1;
    }
  });

  const maxCount = Math.max(...Object.values(habitCountByDay), 1);

  const daysArray = Array.from({ length: daysInMonth }, (_, i) => {
    const dayNum = i + 1;
    const count = habitCountByDay[dayNum] || 0;
    const intensity = Math.min(count / maxCount, 1);
    const greenShade = `rgba(72, 187, 120, ${0.2 + intensity * 0.8})`;
    const isSelected = dayNum === selectedDate.getDate();

    return { dayNum, greenShade, isSelected };
  });

  const monthLabel = selectedDate.toLocaleString("default", { month: "short", year: "numeric" });

  return (
    <div className="calendar-month-container">
      <h3>{monthLabel}</h3>
      <div className="calendar-month">
        {daysArray.map(day => (
          <div
            key={day.dayNum}
            className={`calendar-day ${day.isSelected ? "selected" : ""}`}
            style={{ backgroundColor: day.greenShade }}
          >
            {day.dayNum}
          </div>
        ))}
      </div>
    </div>




  );
}

export default CalendarHeatmap;
