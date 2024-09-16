import { useState } from 'react'
import './App.css'

const workouts = {
  upperBody: ['Chest', 'Back', 'Shoulders', 'Bicep', 'Tricep', 'Forarms'],
  other: ['Cardio', 'Mobility', 'Core', 'Legs']
};

function App() {
  // Track workout history
  const [workoutHistory, setWorkoutHistory] = useState([]);
  
  // Calculate the next workout
  const getNextWorkout = () => {
    const lastWorkout = workoutHistory[workoutHistory.length - 1];

    // Determine the last category worked on (upperBody or other)
    const lastCategory = lastWorkout ? lastWorkout.category : null;

    // Alternate between upperBody and others
    let nextCategory;
    if (lastCategory === 'upperBody') {
      nextCategory = 'other';
    } else {
      nextCategory = 'upperBody';
    }
      
    // Filter out workouts from the chosen category that have already been done
    const remainingWorkouts = workouts[nextCategory].filter(
      workout => !workoutHistory.some(history => history.name === workout)
    );
      
    // If all workouts in the category have been completed, reset the cycle for that category
    const nextWorkout = remainingWorkouts.length > 0 
      ? remainingWorkouts[0] 
      : workouts[nextCategory][0];
      
    // Recommend the next body part that hasn't been worked out yet
    return { name: nextWorkout, category: nextCategory };
  };
 
  // Log the next workout and add it to the history
  const logWorkout = () => {
    const nextWorkout = getNextWorkout();
    setWorkoutHistory([...workoutHistory, nextWorkout]);
  };
 
  // Reset workout history
  const resetWorkouts = () => {
    setWorkoutHistory([]);
  };
 
  return (
    <div className="App">
      <h1>Workout Assistant</h1>
      <p>Last workout: {workoutHistory[workoutHistory.length - 1]?.name || 'None'}</p>
      <p>Next workout: {getNextWorkout().name}</p>
 
      <button onClick={logWorkout}>Log Next Workout</button>
      <button onClick={resetWorkouts}>Reset Workouts</button>
 
      <h2>Workout History:</h2>
      <ul>
        {workoutHistory.map((workout, index) => (
          <li key={index}>{workout.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App
