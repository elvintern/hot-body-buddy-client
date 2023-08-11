import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchRoutineById,
  updateUserPerformance,
  updateTotalCount,
} from '../utils/index.js';
import Exercise from '../components/Exercise.jsx';
import WorkoutResult from '../components/WorkoutResult.jsx';
import './Workout.scss';

export default function Workout() {
  const { userId, workoutId } = useParams();
  const [routine, setRoutine] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [isFinished, setisFinished] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getRoutine() {
      try {
        const res = await fetchRoutineById(userId, workoutId);
        setRoutine(res);
        console.log(routine.prevPerformance);
      } catch (err) {
        console.error(err);
      }
    }
    getRoutine();
  }, [workoutId]);

  const finishWorkout = () => {
    setisFinished(true);
  };

  const finishReview = () => {
    updateUserPerformance(userId, routine._id, performance);
    updateTotalCount(userId);
    navigate(`/profile/${userId}`);
  };

  const SetList = ({ id, reps, weight }) => {
    return reps
      .filter((el) => el > 0)
      .map((rep, i) => (
        <li className="set" key={`${id}-${i}`}>
          {i + 1} set {rep} reps {weight[i]} kgs
        </li>
      ));
  };

  return (
    <div className="workout">
      <div className="workout-result">
        {routine ? (
          routine.prevPerformance.length > 0 && (
            <div className="result-container result-container--previous">
              <h2 className="heading heading--secondary">
                Previous Performance
              </h2>
              {routine.prevPerformance.map((el, i) => {
                return (
                  <div key={`${el._id}-${i}`} className="result result--prev">
                    <h3 className="heading heading--tertiary">{el.exercise}</h3>
                    <ul className="sets">
                      <SetList id={el._id} reps={el.reps} weight={el.weight} />
                    </ul>
                  </div>
                );
              })}
            </div>
          )
        ) : (
          <p>Loading</p>
        )}
      </div>
      <div className="workout__container">
        {isFinished ? (
          <>
            <WorkoutResult routine={routine} performance={performance} />
            <button onClick={finishReview} className="btn">
              End Review
            </button>
          </>
        ) : (
          routine && (
            <>
              <h2 className="heading heading--secondary">
                {routine.routineName}
              </h2>
              {routine.exercises.map((exercise, index) => {
                return (
                  <div key={index} className="workout-form">
                    <ul className="exercises">
                      <Exercise
                        exercise={exercise}
                        performance={performance}
                        setPerformance={setPerformance}
                      />
                    </ul>
                  </div>
                );
              })}

              <button onClick={finishWorkout} className="btn btn--workout">
                Finish Workout
              </button>
            </>
          )
        )}
      </div>
    </div>
  );
}
