import React,{ useEffect, useRef } from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { selectUsersWithMinInfo, selectAuthedUser, groupQuestionById } from "../selectors";
import { handleFetchQuestions } from "../actions/questions";

function Card(props) {
  const { questions } = props;
  const users = useSelector(selectUsersWithMinInfo);

  return (
    <>
      { questions.map(question => (
        <div className="w-4/5 bg-white rounded-xl shadow-md overflow-hidden mx-auto  mb-5" key={question.id}>
          <div className="bg-gray-200 text-left p-3">{`${users[question.author].name} asks:`}</div>
          <div className="flex py-3">
            <div className="w-1/2 flex-col my-auto">
              <img className="w-20 mx-auto rounded-full bg-gray-100" src={ users[question.author].avatarURL } />
            </div>
            <div className="w-1/2 flex flex-col border-l-2 text-center p-3">
              <h4 className="font-bold pb-2">Would you rather</h4>
              <p className="font-thin pb-2 max-w-md">&#8230; {question.optionOne.text} &#8230;</p>
              <Link to={ `/questions/${question.id}` } className="w-full py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-green-500 hover:bg-green-700">View Poll</Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

Card.propTypes={
  questions: PropTypes.array,
};
function Home({ dispatch }) {
  const tabRef = useRef(null);
  const authedUser = useSelector(selectAuthedUser);
  const {unansweredQuestions, answeredQuestions} = useSelector(groupQuestionById(authedUser.id));
  useEffect(() => {
    dispatch(handleFetchQuestions());
    tabRef.current.focus();
  }, []);

  const openTab = (evt, tabName) => {
    evt.preventDefault();
    let i, tabcontent;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    document.getElementById(tabName).style.display = "block";
  };

  return (
    <div className="w-1/2 flex flex-col mx-auto border-gray-100 border-2">
      <div className="overflow-hidden border-red-100 bg-blue-100">
        <button ref={ tabRef } className="w-1/2 h-16 tablinks border-none outline-none cursor-pointer bg-gray-400 hover:bg-gray-600 focus:bg-green-600" onClick={ event => openTab(event, "unanswered_questions") }>Unanswered Question</button>
        <button className="w-1/2 h-16 tablinks border-none outline-none cursor-pointer bg-gray-400 hover:bg-gray-600 focus:bg-green-600" onClick={ event => openTab(event, "answered_questions") }>Answered Question</button>
      </div>
      <div id="unanswered_questions" className="tabcontent text-center px-12 py-6 border-red-300 border-t-0">
        <Card questions={ unansweredQuestions } />
      </div>

      <div id="answered_questions" className="tabcontent text-center px-12 py-6 border-red-300 border-t-0 hidden">
        <Card questions={ answeredQuestions } />
      </div>
    </div>
  );
}

Home.propTypes = {
  dispatch: PropTypes.func,
};

export default connect()(Home);
