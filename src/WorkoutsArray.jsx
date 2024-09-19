import Workout from './WorkoutClass.jsx';

class WorkoutArray{
    constructor(){
        this.workouts = [];
    }

    addWorkout(workout){
        if(workout instanceof Workout){
            this.workouts.push(workout);
        } else {
            throw new Error('You can only add Workout objects to the array');
        }
    }

    removeWorkout(workout){
        if(workout instanceof Workout){
            this.workouts = this.workouts.filter(w => w !== workout);
        } else {
            throw new Error('You can only remove Workout objects from the array');
        }
    }

    getWorkouts(){
        return this.workouts;
    }

    getWorkoutByName(name){
        return this.workouts.find(w => w.name === name);
    }
}