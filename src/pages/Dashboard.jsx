import React, { useState, useEffect } from "react";
import AddHabitModal from "../components/AddHabitModal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { db, auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import CalendarHeatmap from "../components/CalendarHeatMap";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import "../css/dashboard.css";

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [allHabits, setAllHabits] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [journalEntry, setJournalEntry] = useState("");

  const habitsCollection = collection(db, "habits");
  const journalsCollection = collection(db, "journals");

  // Logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  // Fetch habits for a specific date
  const fetchHabits = async (date) => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      habitsCollection,
      where("uid", "==", user.uid),
      where("date", "==", date.toDateString())
    );

    const querySnapshot = await getDocs(q);
    const userHabits = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setHabits(userHabits);
  };

  // Fetch all habits for streak calculation
  const fetchAllHabits = async () => {
    const user = auth.currentUser;
    if (!user) return [];

    const q = query(habitsCollection, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    const userHabits = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAllHabits(userHabits);
    return userHabits;
  };

  // Calculate streak
  const calculateStreak = (allHabits) => {
    const doneDates = allHabits
      .filter((h) => h.done)
      .map((h) => new Date(h.date).toDateString());

    let streak = 0;
    let currentDate = new Date();
    while (doneDates.includes(currentDate.toDateString())) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }
    return streak;
  };

  // Add habit
  const addHabit = async (habitName, habitColor = "#4caf50") => {
    const user = auth.currentUser;
    if (!user) return;

    await addDoc(habitsCollection, {
      name: habitName,
      date: selectedDate.toDateString(),
      done: false,
      color: habitColor,
      uid: user.uid,
    });

    await fetchHabits(selectedDate);
    const all = await fetchAllHabits();
    setCurrentStreak(calculateStreak(all));
  };

  // Toggle done
  const toggleDone = async (habit) => {
    const habitRef = doc(db, "habits", habit.id);
    await updateDoc(habitRef, { done: !habit.done });
    await fetchHabits(selectedDate);
    const all = await fetchAllHabits();
    setCurrentStreak(calculateStreak(all));
  };

  // Delete habit
  const deleteHabit = async (habitId) => {
    await deleteDoc(doc(db, "habits", habitId));
    await fetchHabits(selectedDate);
    const all = await fetchAllHabits();
    setCurrentStreak(calculateStreak(all));
  };

  // Fetch journal
  const fetchJournal = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      journalsCollection,
      where("uid", "==", user.uid),
      where("date", "==", selectedDate.toDateString())
    );

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setJournalEntry(querySnapshot.docs[0].data().entry || "");
    } else {
      setJournalEntry("");
    }
  };

  // Save journal
  const saveJournal = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const dateStr = selectedDate.toDateString();

    const q = query(
      journalsCollection,
      where("uid", "==", user.uid),
      where("date", "==", dateStr)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const journalRef = doc(db, "journals", querySnapshot.docs[0].id);
      await updateDoc(journalRef, { entry: journalEntry });
    } else {
      await addDoc(journalsCollection, {
        uid: user.uid,
        date: dateStr,
        entry: journalEntry,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const all = await fetchAllHabits();
      setCurrentStreak(calculateStreak(all));
      await fetchHabits(selectedDate);
      await fetchJournal();
    };
    fetchData();
  }, [selectedDate]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Habit Hacker</h1>
        <div className="header-actions">
          <button className="add-habit-btn" onClick={() => setIsModalOpen(true)}>
            + Add Habit
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="datepicker-container">
        <label>Select Date: </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
        />
      </div>

      <section className="stats-row">
        <div className="stat-card">
          <h3>Total Habits</h3>
          <p>{habits.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Today</h3>
          <p>{habits.filter((h) => h.done).length}</p>
        </div>
        <div className="stat-card">
          <h3>Current Streak</h3>
          <p>{currentStreak} days</p>
        </div>
      </section>

      <section className="habits-list">
        <h3>Habits for {selectedDate.toDateString()}</h3>
        {habits.length === 0 ? (
          <p>No habits logged for this day.</p>
        ) : (
          <ul>
            {habits.map((habit) => (
              <li key={habit.id} className={habit.done ? "done" : ""}>
                <span>{habit.name}</span>
                <div className="habit-actions">
                  <button onClick={() => toggleDone(habit)}>
                    {habit.done ? "Undo" : "Done"}
                  </button>
                  <button onClick={() => deleteHabit(habit.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {isModalOpen && (
        <AddHabitModal
          onClose={() => setIsModalOpen(false)}
          onAddHabit={addHabit}
        />
      )}

      <section className="calendar-journal-container">
        <div className="calendar-section">
          <CalendarHeatmap
            habits={allHabits.filter((h) => h.uid === auth.currentUser.uid)}
            selectedDate={selectedDate}
          />
        </div>

        <div className="journal-section">
          <h3>Journal for {selectedDate.toDateString()}</h3>
          <textarea
            value={journalEntry}
            onChange={(e) => setJournalEntry(e.target.value)}
            placeholder="How are you feeling today?"
            rows={10}
          />
          <button onClick={saveJournal}>Save Journal</button>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
