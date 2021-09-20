import React, { useState, useEffect } from "react";
import { PropTypes } from "prop-types";
import { useParams, Redirect } from "react-router-dom";
import { useSelector, connect } from "react-redux";
import { handleAddAnswer } from "../actions/users";
import { voteQuestion } from "../actions/questions";
import { selectQuestionById, selectAuthedUser, selectOptionsForQuestion,selectUserById } from "../selectors";


function ViewPoll({ dispatch }) {
  const { id } = useParams();
  const question = useSelector(selectQuestionById(id));
  if (!question) return <Redirect to="/404" />;
  const askedBy = useSelector(selectUserById(question.author));
  const {options, totalVoteCount } = useSelector(selectOptionsForQuestion(id));
  const author = useSelector(selectAuthedUser);
  const [currentRadioValue, setCurrentValue] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const allVotes = options.reduce((acc, cur) => {
    return acc.concat(cur.votes);
  }, []);

  useEffect(() => {
    if(allVotes.includes(author.id)){
      setIsAnswered(true);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(handleAddAnswer({ authedUser: author.id, qid: question.id, answer: currentRadioValue }));
    dispatch(voteQuestion({ qid: id, authedUser: author.id, answer: currentRadioValue}));
  };

  return (
    <div className="w-2/4 bg-white rounded-xl shadow-md overflow-hidden mx-auto  mb-5">
      <div className="bg-gray-200 text-left p-3">{!isAnswered ? `${ askedBy.name } asks:` : `Asked by ${ askedBy.name }`}</div>
      <div className="flex py-3">
        <div className="w-1/2 flex-col my-auto">
          <img className="w-40 mx-auto rounded-full bg-gray-100" src={ author.avatarURL } />
        </div>
        {
          !isAnswered ?
            <div className="w-1/2 border-l-2 text-left p-3">
              <h2 className="font-bold pb-2 text-xl">Would you rather &#8230;</h2>
              <form onSubmit={ handleSubmit }>
                <label className="block my-5 cursor-pointer">
                  <input
                    name="option"
                    value="optionOne"
                    type="radio"
                    onChange={e => setCurrentValue(e.target.value)}
                    defaultChecked={currentRadioValue === question.optionOne.text}
                  />
                  &nbsp;
                  { question.optionOne.text }
                </label>
                <label className="block my-5 cursor-pointer">
                  <input
                    name="option"
                    value="optionTwo"
                    type="radio"
                    onChange={e => setCurrentValue(e.target.value)}
                    defaultChecked={currentRadioValue === "optionTwo"}
                  />
                  &nbsp;
                  { question.optionTwo.text }
                </label>
                
                <button className="w-full py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">Submit</button>
              </form>
            </div>
            :
            <div className="w-1/2 flex-col mx-auto border-l-2 p-3">
              <h2 className="font-bold pb-2 text-xl">Results:</h2>
              {
                options.map((option, id) => {
                  const percentage = (option.votes.length/totalVoteCount * 100).toFixed(2);
                  return (
                    <div className="flex flex-col w-full border-2 border-gray-300 mb-5 p-5 hover:bg-green-200 rounded-md relative" key={`option${id}`}>
                      { option.votes.includes(author.id) && <span className=" flex items-center justify-center p-2 rounded-full w-10 h-10 text-center text-white text-sm bg-yellow-400  absolute bottom-24 right-0">Your vote</span> }
                      <p>Would you rather { option.text }?</p>
                      <div className="border-2 border-black">
                        <div className="bg-green-600 text-center" style={{ height: "24px", width: `${percentage}%` }}>{percentage}%</div>
                      </div>
                      <span>{option.votes.length} out of { totalVoteCount } votes</span>
                    </div>
                  );
                })
              }
            </div>
        }
      </div>
    </div>
  );
}

ViewPoll.propTypes = {
  dispatch: PropTypes.func,
};



export default connect()(ViewPoll);