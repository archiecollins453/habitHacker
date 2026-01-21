import CalendarHeatmap from "../components/calendarHeatMap.jsx";
import "../css/dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1>Habit Dashboard</h1>

      <div className="stats-row">
        <div className="stat-card">
          <h3>Total Habits</h3>
          <p>12</p>
        </div>
        <div className="stat-card">
          <h3>Current Streak</h3>
          <p>5 days</p>
        </div>
      </div>

      <CalendarHeatmap />
    </div>
  );
}

export default Dashboard;
