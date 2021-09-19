import React from "react";
import { useSelector } from "react-redux";
import { selectFormattedUsers } from "../selectors";


function Leaderboard(props) {
  const users = useSelector(selectFormattedUsers());

  return (
    <div>
      {
        users.map(user => (
          <div key={ user.id } className="flex w-1/2 mx-auto shadow-lg border-2 p-5 m-2">
            <div className="w-1/4 p-5">
              <img className="rounded-full bg-gray-100" src={ user.avatarURL } />
            </div>
            <div className="w-2/4 flex-col border-l-2 border-r-2 p-5">
              <header className="text-2xl">{user.name}</header>
              <div className="flex justify-between">
                <span>Answered Questions</span>
                <span>{Object.keys(user.answers).length}</span>
              </div>
              <div className="flex justify-between">
                <span>Created Questions</span>
                <span>{user.questions.length}</span>
              </div>
            </div>
            <div className="w-1/4 m-5 border-2">
              <header className="flex justify-center items-center bg-gray-100 h-1/3 w-full m-0 border-b-2">Score</header>
              <div className="flex justify-center items-center m-0 w-full h-2/3">
                <span className="flex justify-center items-center text-white bg-green-600 rounded-full h-5 w-5 p-4 m-auto">{user.totalScore}</span>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default Leaderboard;
