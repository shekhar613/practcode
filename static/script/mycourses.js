var SideNavToggle = true
var MycoursesSideNav = document.getElementById("MycoursesSideNav")
var MycoursesBody = document.getElementById("MycoursesBody")


const toggleSidenav = () =>{
    if(SideNavToggle){
        MycoursesSideNav.classList.remove('activeSidenav')
        MycoursesBody.classList.remove('activeSidenav')
        
        SideNavToggle = false
    }else{
        MycoursesSideNav.classList.add('activeSidenav')
        MycoursesBody.classList.add('activeSidenav')

        SideNavToggle = true
    }
}

// individual topic toggleEffects
const toggleTopic = (id)=>{
    
    var topic = document.getElementById(`courseTopic${id}`)
    var subTopics = document.getElementById(`courseSubTopicId${id}`)
    var topicArrowIcon = document.getElementById(`topicArrowIcon${id}`)
    
    if(topic.classList[1]=="topicexpanded"){
        topic.classList.remove('topicexpanded');
        subTopics.style.display="none"
        topicArrowIcon.classList = "fa-solid fa-caret-right"

    }else{
        topic.classList.add('topicexpanded');
        subTopics.style.display="block"
        topicArrowIcon.classList = "fa-solid fa-caret-down"
    }
}

// individual subtopic selection
// typewritter Function for course contant

const writeTopic = (id)=>{
    var printingEffect = document.getElementById("printingEffect")
    const txt = `Python is a computer programming language often used to build websites and software, automate tasks, and conduct data analysis. Python is a general-purpose language, meaning it can be used to create a variety of different programs and isn't specialized for any specific problems.`
    let i = 0;
    const intervalID = setInterval(function(){
        printingEffect.innerHTML += txt[i]
        i++;
        if(i === txt.length){
            clearInterval(intervalID);
        }

    },50);
}

const selectSubTopic = (id,totalSubtopics)=>{
    var subTopics = document.getElementById(`subTopic${id}`)
    subTopics.children[0].classList="fa-solid fa-circle topicTick"
    subTopics.style.background="#084c76"
    for(let i=1;i<=totalSubtopics;i++){
        if(i!==id){
            document.getElementById(`subTopic${i}`).children[0].classList="fa-regular fa-circle topicTick"
            document.getElementById(`subTopic${i}`).style.background="#05263b"
        }
    }
    writeTopic(14);
}