import './WorkoutResult.scss';

export default function WorkoutResult({ performance }) {
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
    <div className="workout-result">
      <div className="result-container result-container--today">
        <h2 className="heading heading--tertiary">Today's Performance</h2>
        {performance.map((el, i) => {
          return (
            <div key={`${el._id}-${i}`} className="result result--today">
              <h3 className="heading heading--tertiary">{el.exercise}</h3>
              <ul className="sets">
                <SetList id={el._id} reps={el.reps} weight={el.weight} />
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
