var currentQuestion = 1;
var answersDict ={}
var quiz;
window.addEventListener('load', function () {
    var right_container = document.getElementById("right_container_UIID")
    var quiz_options = document.getElementById('quiz_options')
   
    $.ajax({
        type: 'GET',
        url:'/practcode-dashboard/quiz/getquizes',
        success: function (data) {
            quiz = data;
            for(let i = 1;i<=Object.keys(data['quizes']).length;i++){
                var li = document.createElement('li');
                li.id=i;
                li.innerHTML=`<div class="circle_div">
                #${i}
            </div>
            <p class="question_title">${data["quizes"][i][0][0].slice(0,45)}...</p>`
                
                right_container.appendChild(li)
            }
            // adding first question and active class to li element 
            document.getElementById(1).classList.add('active_que');
            document.getElementById('quiz_question_ID').innerText=`#1 ${data["quizes"][1][0][0]}`
            if(data["quizes"][1][0][1]==""){
                document.getElementById('preCodeID').style.display="none"
            }else{
                document.getElementById('preCodeID').style.display="block"
                document.getElementById('quiz_question_code_ID').innerText=data["quizes"][1][0][1]
            }
           
            for(let i=0;i<4;i++){
                var li = document.createElement('li')
                li.innerHTML=`<input name="group" id="radio${i+1}" type="radio" value="${data["quizes"][1][1][i]}">
                <label for="radio${i+1}">${data["quizes"][1][1][i]}</label>`
                quiz_options.appendChild(li)
            }
            selection_();
        }
        
        
    })
   
 
    
})

function selection_(){
const radioInputs = document.querySelectorAll('input[name="group"]');

    // Add a change event listener to the radio inputs
    radioInputs.forEach((radioInput) => {
        radioInput.addEventListener('change', () => {
            // Check if the radio input is checked
            if (radioInput.checked) {
                answersDict[currentQuestion]=radioInput.value;
                document.getElementById("next_submit_btnID").classList.add('active')
                if(currentQuestion==5){
                    document.getElementById("next_submit_btnID").innerText='Submit'
                }
            }
        });

    }); 
}  
function submitQuiz(){
    
    if((currentQuestion in answersDict) && (currentQuestion!==5)){
        currentQuestion++;
        
        document.getElementById("next_submit_btnID").classList.remove('active')
        document.getElementById(currentQuestion).classList.add('active_que');
        document.getElementById('quiz_question_ID').innerText=`#${currentQuestion} ${quiz["quizes"][currentQuestion][0][0]}`
        if(quiz["quizes"][currentQuestion][0][1]==""){
            document.getElementById('preCodeID').style.display="none"
        }else{
            document.getElementById('preCodeID').style.display="block"
            document.getElementById('quiz_question_code_ID').innerText=quiz["quizes"][currentQuestion][0][1]
        
        }
        
        document.getElementById("quiz_options").innerHTML=""
        for(let i=0;i<4;i++){
            var li = document.createElement('li')
            li.innerHTML=`<input name="group" id="radio${i+1}" type="radio" value="${quiz["quizes"][currentQuestion][1][i]}">
            <label for="radio${i+1}">${quiz["quizes"][currentQuestion][1][i]}</label>`
            quiz_options.appendChild(li)
        }
        selection_();

    }else{
        if(currentQuestion==5){
            document.getElementById('question_area_id').style.display='none'
            document.getElementById('result_area_id').style.display='block'
            $.ajax({
                type: 'POST',
                url:'/practcode-dashboard/quiz/checktest/',
                data:answersDict,
                success: function (data) {
                //    after submission
                console.log(data)
                showResult(data['percent'])
               
            }
            
            })
        
              
        }
        
        else{
            // 
        }
    }
}
const showResult=(progressEndValue)=>{
    // result
    let progressBar = document.querySelector(".circular-progress");
    let valueContainer = document.querySelector(".value-container");
    // default color #4d5bf9
    let progressValue = 0;
    let color = '#4d5bf9'
    let speed = 10;

    let progress = setInterval(() => {
    progressValue++;
    valueContainer.textContent = `${progressValue}%`;
    progressBar.style.background = `conic-gradient(
        ${color} ${progressValue * 3.6}deg,
        #cadcff ${progressValue * 3.6}deg    
    )`;
    if (progressValue == progressEndValue) {
        clearInterval(progress);
    }
    }, speed);
    document.getElementById('result_text').innerText=`You score ${progressEndValue} % `

}
showResult(88);
