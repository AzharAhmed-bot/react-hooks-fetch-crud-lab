import React, { useState } from "react";

function QuestionList({ lists, deleteQuestion, fetching }) {
  function handleClick(answerIndex, questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        correctIndex: answerIndex,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        fetching();
        console.log(data);
      });
  }

  const listDisplay =
    Array.isArray(lists) &&
    lists.map((list, index) => {
      return (
        <>
          <li key={list.id}>{list.prompt}</li>
         
          <h4>Choices:</h4>
          <li key={list.answers[0]}>(A){list.answers[0]}</li>
          <li key={list.answers[1]}>(B){list.answers[1]}</li>
          <li key={list.answers[2]}>(C){list.answers[2]}</li>
          <li key={list.answers[3]}>(D){list.answers[3]}</li>
          <button onClick={() => deleteQuestion(list.id)}>Delete Question</button>
          <label>Correct Answer</label>
          <select
            key={index}
            onChange={(event) => handleClick(event.target.selectedIndex, list.id)}
            value={list.correctIndex}
          >
            <option>{list.answers[0]}</option>
            <option>{list.answers[1]}</option>
            <option>{list.answers[2]}</option>
            <option>{list.answers[3]}</option>
          </select>

        </>
      );
    });

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{listDisplay} </ul>
    </section>
  );
}

export default QuestionList;
