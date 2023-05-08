import { useState } from 'react';
import { weight_training_exercises } from '../utils/workouts.json';

export default function SearchBar({state, dispatch, addExercise}) {
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  
  async function handleInputChange(event) {
    dispatch({ type: 'setExercise', payload: event.target.value});
    fetchSuggestions(event.target.value);
  }

  function fetchSuggestions(query) {
    let filteredExercises = weight_training_exercises
    .filter((item) => {
      const searchTerm = query.toLowerCase();
      const name = item.toLowerCase();
      return (
        searchTerm && name.startsWith(searchTerm) && name !== searchTerm
      );
    })

    setSuggestions([...filteredExercises]);
  }

function handleKeyDown(event) {
  if (event.keyCode === 38) { // up arrow
    event.preventDefault();
    if (selectedSuggestionIndex > -1) {
      setSelectedSuggestionIndex(prevIndex => prevIndex - 1);
    }
  } else if (event.keyCode === 40) { // down arrow
    event.preventDefault();
    if (selectedSuggestionIndex < suggestions.length - 1) {
      setSelectedSuggestionIndex(prevIndex => prevIndex + 1);
    }
  }
  dispatch({type: 'setSuggestion', payload: suggestions[selectedSuggestionIndex]});
}

function handleKeyUp(event) {
  if (event.keyCode === 13) { // enter
    if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
      dispatch({ type: 'setExercise', payload: suggestions[selectedSuggestionIndex]});
      addExercise(event);
      setSuggestions([]);
      setSelectedSuggestionIndex(-1);
    }
  }
}

  return (
    <>
      <input
        type="text"
        className="form__input"
        value={state.exercise}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
        placeholder='ex) Deadlift, Squat...'
      />  
      <ul className="search-dropdown">

        {suggestions && suggestions.map((suggestion, index) => (
          <li
            key={index}
            onClick={(suggestion) => {
              dispatch({ type: 'setExercise', payload: suggestion.target.outerText});
              setSuggestions([]);
            }}
            className={index === selectedSuggestionIndex ? 'search-row selected' : 'search-row'}
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </>
  );
}