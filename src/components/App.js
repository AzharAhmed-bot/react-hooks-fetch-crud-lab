import React, { useState ,useEffect} from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  
  function fetching(){
    fetch("http://localhost:4000/questions")
    .then(resp=>resp.json())
    .then(data=>{
      setQuestions(data);
      console.log(data);
    })    
  }
 // console.log(questions);
  
  useEffect(()=>{fetching()},[])

  function addQuestion(questionObj){
    fetch("http://localhost:4000/questions",{
      method:"POST",
      headers:{"Content-Type":"Application/json"},
      body:JSON.stringify(questionObj)
    })
    .then(resp=>resp.json())
    .then(data=>{
      fetching();
    })
  }

  function deleteQuestion(id){
    fetch(`http://localhost:4000/questions/${id}`,{
      method:"DELETE",
      headers:{"Content-Type":"Application/json"}
    })
    .then(resp=>resp.json())
    .then(data=>{
      setQuestions(questions.filter(q => q.id !== id));
      console.log(data);
    })
    .catch(error=>console.log(error))
  }

  
  return (
    <main>
      <AdminNavBar onChangePage={setPage}  />
      {page === "Form" ? <QuestionForm  addQuestion={addQuestion}/> : <QuestionList lists={questions} deleteQuestion={deleteQuestion} fetching={fetching}/>}
    </main>
  );
}

export default App;
