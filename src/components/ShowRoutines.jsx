import Routine from '../components/Routine';
import { deleteUserRoutine } from '../utils/index';
import Swal from 'sweetalert2';

export default function ShowRoutines({ state, dispatch, userId, handleSave }) {
  function editRoutine(event, id) {
    event.preventDefault();
    const newRoutine = state.routines.find((routine) => routine._id === id);
    dispatch({ type: 'setEditingRoutine', payload: newRoutine });
  }

  function deleteRoutine(event, id) {
    event.preventDefault();
    deleteUserRoutine(userId, id);
    Swal.fire({
      icon: 'success',
      title: 'Successfully Deleted!',
    });
  }

  return (
    state.routines.length > 0 && (
      <>
        <div className="form__container form__container--routines">
          {state.routines.map((routine) => (
            <Routine
              key={routine._id}
              routine={routine}
              editingRoutineId={state.editingRoutineId}
              editRoutine={editRoutine}
              deleteRoutine={deleteRoutine}
              handleSave={handleSave}
            />
          ))}
        </div>
      </>
    )
  );
}
