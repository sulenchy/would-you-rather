import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector, connect } from "react-redux";
import { handleAddNew } from "../actions/questions";
import { _saveQuestion } from "../_DATA";
import { selectAuthedUser } from "../selectors";



function NewQuestion({dispatch}){
  const optionOneRef = useRef("");
  const optionTwoRef = useRef("");
  const authedUser = useSelector(selectAuthedUser);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const optionOneText = optionTwoRef.current.value;
    const optionTwoText = optionTwoRef.current.value;
    const newQuestion =  { optionOneText, optionTwoText, author: authedUser.id };
    dispatch(handleAddNew(newQuestion));
    optionTwoRef.current.value = "";
    optionOneRef.current.value = "";
  };

  return(
    <div className="w-1/3 bg-white rounded-xl shadow-md overflow-hidden mx-auto  mb-5">
      <div className="bg-gray-200 text-center text-xl font-bold p-3"><h2>Create New Question</h2></div>
      <div className="flex flex-col p-3 text-center">
        <form className="text-left" onSubmit={ handleSubmit }>
          <label>Complete the statement:</label>
          <h3  className="my-5 font-bold">Would you rather &#8230;</h3>
          <input ref={ optionOneRef } type="text" className="w-full h-12 p-5 rounded-lg border-gray-400 border-2" name="option1" placeholder="Enter option one text here" />
          <div className="flex my-auto items-center">
            <hr className="w-2/5 border-gray-400 border-1" /><span className="w-1/5 text-center">OR</span><hr className="w-2/5 border-gray-400 border-1" />
          </div>
          <input ref={ optionTwoRef } type="text" className="w-full h-12 p-5 rounded-lg border-gray-400 border-2" name="option2" placeholder="Enter option two text here" />
          <button type="submit" className="w-full py-2 px-4 mt-5 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">Submit</button>
        </form>
      </div>
    </div>
  );
}

NewQuestion.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(NewQuestion);
