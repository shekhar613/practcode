// testcase question nav toggle
var sidenavtoggle = false;
var selectedActive_question =1;

function quenvatoggle(){
    if(sidenavtoggle){
       
        document.getElementById('questionsNavside').style.display='none';
        sidenavtoggle=false;
    }else{
       
        document.getElementById('questionsNavside').style.display='block';
        sidenavtoggle=true;
    }
}

// toggle questions
var avtivequestion = 1;

function questionToggle(id,totalQuestions,questionData){
    // console.log(questionData)
    
    id= Number(id) 
    var questionsBtns = document.getElementsByClassName('questionsBtns')
    var QuestionText = document.getElementById('QuestionText');
    var question_explaination = document.getElementById('question_explaination')
    var Example_inputs = document.getElementById('Example_inputs')
    var Example_outputs = document.getElementById('Example_outputs')
    var QuestionsConstraint = document.getElementById('QuestionsConstraint')

       for (let i = 0; i <totalQuestions; i++) {
        if(i!==id){
            questionsBtns[i].classList.remove('activequestion')
            questionsBtns[i].children[0].classList = "fa-regular fa-circle"
        }else{
            questionsBtns[i].classList.add('activequestion')
            questionsBtns[i].children[0].classList = "fa-regular fa-circle-dot activedot"
            testCaseQuestion_id =  questionsBtns[i].children[0].id
            window.selectedActive_question = testCaseQuestion_id
                   
            QuestionText.textContent = questionsBtns[i].textContent
            question_explaination.textContent = questionData[testCaseQuestion_id][0]
            Example_inputs.textContent = questionData[testCaseQuestion_id][1]
            Example_outputs.textContent = questionData[testCaseQuestion_id][2]
            if(questionData[testCaseQuestion_id][3].length !==0){
                QuestionsConstraint.textContent = questionData[testCaseQuestion_id][3]
            }else{QuestionsConstraint.style.display="none"
                 document.getElementById('Constraints_heading').style.display="none"
                }
        }
        
      }
}
