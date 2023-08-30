import { useEffect, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import RoutineForm from '../components/RoutineForm';
import ShowRoutines from '../components/ShowRoutines';
import './Routines.scss';
import {
  fetchUserInfoById,
  addUserRoutine,
  updateUserRoutine,
} from '../utils/index';
import { resetInput } from '../utils/routines';
import useFocusInput from '../customHook/useFocusInput';
import RoutineReducer from '../reducer/RoutineReducer';

export default function Routines() {
  const { userId } = useParams();
  const [state, dispatch] = useReducer(
    RoutineReducer().reducer,
    RoutineReducer().initialState
  );
  const inputRef = useFocusInput();

  useEffect(() => {
    fetchUserInfoById(userId).then((res) => {
      dispatch({ type: 'setRoutines', payload: res.routines });
    });

    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        inputRef.current.click();
      }
    }
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [userId, state.routines, state.exercises, state.editingRoutine, inputRef]);

  function addNewRoutine() {
    const newRoutine = {
      routineName: state.routineName,
      exercises: state.exercises,
      prevPerformance: [],
    };
    addUserRoutine(userId, [...state.routines, newRoutine]);
    dispatch({ type: 'setIsValid', payload: true });
  }

  async function updateRoutine() {
    try {
      const newRoutine = {
        routineName: state.routineName,
        exercises: state.exercises,
        prevPerformance: state.editingRoutine.prevPerformance,
      };
      await updateUserRoutine(userId, state.editingRoutine._id, newRoutine);
      resetInput(dispatch);
    } catch (error) {
      console.log(error.message);
    }
  }

  function addExercise(event) {
    event.preventDefault();
    if (
      (!state.exercise || state.exercise.length < 3) &&
      (!state.suggestion || state.suggestion.length < 3)
    ) {
      dispatch({ type: 'setIsValid', payload: false });
      return;
    } else if (state.exercise && !state.suggestion) {
      dispatch({ type: 'addExercises', payload: state.exercise });
    } else if (!state.exercise && state.suggestion) {
      dispatch({ type: 'addExercises', payload: state.suggestion });
      dispatch({ type: 'setSuggestion', payload: '' });
    }
    dispatch({ type: 'setIsValid', payload: true });
    dispatch({ type: 'setExercise', payload: '' });
  }

  function handleSave(event) {
    event.preventDefault();
    if (
      state.routines.some(
        (routine) => routine.routineName === state.routineName
      )
    ) {
      if (state.isEditing) {
        updateRoutine();
        resetInput(dispatch);
        return;
      }
      dispatch({ type: 'setIsDuplicated', payload: true });
      return;
    }
    if (state.routineName && state.exercises.length > 0) {
      addNewRoutine();
      resetInput(dispatch);
    } else {
      console.log('error');
    }
  }

  return (
    <div className="routines">
      <div className="landing-img landing-img--routines"></div>
      <form className="form form-Routine">
        <RoutineForm
          state={state}
          dispatch={dispatch}
          addExercise={addExercise}
        />

        <div className="form__container form__container--btns form__container--btns--routines">
          <button
            type="button"
            ref={inputRef}
            onClick={(e) => addExercise(e)}
            className="btn btn-add"
          >
            Add
          </button>
          <button
            type="button"
            onClick={(e) => handleSave(e)}
            className="btn btn-signup"
          >
            save
          </button>
          <Link to={`/profile/${userId}`} className="btn btn-signup">
            Go Back to Main
          </Link>
        </div>

        <ShowRoutines
          state={state}
          dispatch={dispatch}
          userId={userId}
          handleSave={handleSave}
        />
      </form>
    </div>
  );
}
