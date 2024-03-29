import { useState, useEffect } from 'react';
import Set from './Set.jsx';
import ValidCheck from './ValidCheck.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDumbbell,
  faCheck,
  faWrench,
} from '@fortawesome/free-solid-svg-icons';
import './Exercise.scss';

export default function Exercise({ exercise, performance, setPerformance }) {
  const [workoutResult, setWorkoutResult] = useState({
    exercise: exercise,
    reps: [],
    weight: [],
  });
  const [records, setRecords] = useState([]);
  const [count, setCount] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const setProps = {
    setCount,
    records,
    setRecords,
    exercise: exercise,
  };

  const undo = () => {
    setIsDone(false);
  };

  const handleClick = () => {
    const sortedRecords = records.sort((a, b) => a.sets - b.sets);
    const reps = sortedRecords.map((record) => record.reps).slice(0, count);
    const weight = sortedRecords.map((record) => record.weight).slice(0, count);
    if (reps.every((el) => el !== null) && weight.every((el) => el !== null)) {
      setIsDone(true);

      setWorkoutResult(() => {
        return {
          exercise: sortedRecords[0].exercise,
          reps,
          weight,
        };
      });
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (isDone) {
      const selectedPerformance = performance.find(
        (el) => el.exercise === workoutResult.exercise
      );
      if (selectedPerformance) {
        const newPerformance = performance.filter(
          (el) => el !== selectedPerformance
        );
        setPerformance([...newPerformance, workoutResult]);
      } else {
        setPerformance((prev) => {
          return [...prev, workoutResult];
        });
      }
    }
  }, [workoutResult]);

  const renderComponents = () => {
    const sets = [];
    for (let i = 0; i < count; i++) {
      sets.push(<Set key={i} sets={i + 1} {...setProps} />);
    }
    return sets;
  };

  return (
    <div className="exercise">
      <h3 className="heading heading--tertiary">
        <FontAwesomeIcon className="exercise__icon" icon={faDumbbell} />
        {exercise}{' '}
        {isDone ? (
          <>
            <FontAwesomeIcon
              className="exercise__icon exercise__icon--check"
              icon={faCheck}
            />
            <FontAwesomeIcon
              className="exercise__icon exercise__icon--undo"
              icon={faWrench}
              onClick={undo}
            />
          </>
        ) : null}
      </h3>
      <div
        className="exercise__container"
        style={isDone ? { display: 'none' } : null}
      >
        {renderComponents()}
        <ValidCheck
          isValid={isValid}
          message={'Please type in your Reps and Weight :)'}
        />
        <button onClick={handleClick} className="btn btn--done">
          done
        </button>
      </div>
    </div>
  );
}
