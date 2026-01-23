import React, { useState } from "react";
import "../css/addHabitModal.css";

const colors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0", "#f44336"];

function AddHabitModal({ onClose, onAddHabit }) {
  const [habitName, setHabitName] = useState("");
  const [habitColor, setHabitColor] = useState(colors[0]);
  const [habitList, setHabitList] = useState([]);

  const addToList = () => {
    if (!habitName.trim()) return;
    setHabitList([...habitList, { name: habitName.trim(), color: habitColor }]);
    setHabitName("");
    setHabitColor(colors[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (habitName.trim()) addToList(); 
    habitList.forEach(habit => onAddHabit(habit.name, habit.color));
    setHabitList([]);
    setHabitName("");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Add New Habit(s)</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Habit name"
            value={habitName}
            onChange={e => setHabitName(e.target.value)}
          />
          <div className="color-picker">
            {colors.map(color => (
              <span
                key={color}
                className={`color-circle ${habitColor === color ? "selected" : ""}`}
                style={{ backgroundColor: color }}
                onClick={() => setHabitColor(color)}
              />
            ))}
          </div>
          <button type="button" onClick={addToList}>Add to List</button>

          {habitList.length > 0 && (
            <ul className="habit-preview">
              {habitList.map((habit, index) => (
                <li key={index} style={{ color: habit.color }}>{habit.name}</li>
              ))}
            </ul>
          )}

          <div className="modal-buttons">
            <button type="submit">Submit All</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddHabitModal;
