
var toggleFlag = true;
const toggle_takeCourse_bar = () => {
 
  document.getElementById("course-content-areaID").classList.add("responsive");
  if (toggleFlag) {
    // closing
    document.getElementById("course-status-bar-toggle-iconID").className =
      "fa-solid fa-angles-right";

    document.getElementById("course-status-barID").style.display = "none";
    document
      .getElementById("course-content-areaID")
      .classList.add("full-width");

    toggleFlag = false;
  } else {
    // opening

    document.getElementById("course-status-bar-toggle-iconID").className =
      "fa-solid fa-angles-left";
    document.getElementById("course-status-barID").style.display = "block";
    document
      .getElementById("course-content-areaID")
      .classList.remove("full-width");

    toggleFlag = true;
  }
};

const changeToggleForScreenSize = () => {
  checkScreenSize();
  addEventListener("resize", () => {
    checkScreenSize();
  });
};

const checkScreenSize = () => {
  if (innerWidth <= 950) {
    toggleFlag = false;
  } else {
    toggleFlag = true;
  }
};
// load progress_after reload or refresh the page
const _reloadTheProgress = () =>{
  if(window.localStorage.getItem('activeTopics')){
    var data = JSON.parse( window.localStorage.getItem('activeTopics'))
    getcourseData(data["topicName"],data["headingKey"]);
  }

}

const getcourseData=(topicName,headingKey)=>{
  $.ajax({
    type: "POST",
    url: "/get-course-cotent/",
    data: { key: topicName,heading:headingKey },
    success: function (data) {
      console.log(data)
      //    after submission
      // clear screen
      document.getElementById("course-text-ID").innerHTML=""
      document.getElementById("sub-topicID").innerText="👉 "+topicName
      // for phone view
      if (innerWidth<=950){
        toggle_takeCourse_bar();
      }
      if(data.includes("quize")){
        console.log("quize in content")
        addQuiz(data,topicName)
      }else{
        if(data.includes("question")){
          addQuestionSection(data,topicName);
        }else{
          jsonToHtml(data);
        }
        
      }
      
    },
  });
}

// user topic selection
course_topics_ulID;
var listItems = document.querySelectorAll("#course_topics_ulID li");

// Add a click event listener to each list item
listItems.forEach(function (item) {
  item.addEventListener("click", function () {
    // Retrieve the value of the clicked list item
    var topicName = item.getAttribute("value");
    var headingKey = item.className;
    var topics_save = JSON.stringify({"headingKey":headingKey,"topicName":topicName})
   
    window.localStorage.setItem('activeTopics',topics_save)
    getcourseData(topicName,headingKey)
    
  });
});

var topicdropdown_flag=true; 
const topicdropdown=(e)=>{  
  var div = document.getElementById(e.innerText)
  if(div.style.display=='block'){
    div.style.display='none'
    document.getElementById('dropdownarrowid-for-course-content-'+e.innerText).classList='fa-solid fa-square-caret-down'
    topicdropdown_flag=false;
  }else{
    div.style.display='block'
    document.getElementById('dropdownarrowid-for-course-content-'+e.innerText).classList='fa-solid fa-square-caret-up'
    topicdropdown_flag=true;
  }
}

const addQuiz = (data,key) =>{
  console.log(data[1][key]['question'])

  const options = data[1][key]['options']; // Assuming 'options' holds an array of option values

  let optionsHTML = ''; // Variable to store the HTML for options

  // Loop through options and create <li> elements
  options.forEach((option, index) => {
    optionsHTML += `
      <li>
          <input type="radio" name="option" id="radio${index + 1}" value="${option}">
          <label for="radio${index + 1}">${option}</label>
      </li>
    `;
  });


  // Inject the generated options into the HTML
  contentSection.innerHTML=` <div class="quize-div">
  <h2 class="quize-question">Quize time</h2>
  <p>${data[1][key]['question']}</p>
  <ul class="quize-options">
    ${optionsHTML}
  </ul>
  <button class="quize-submite-btn">Submit</button>
</div>
  `

}
const addQuestionSection=(data,key)=>{
  
  contentSection.innerHTML=`<div class="pacrtice-code-question-div">
  <div class="code-question">
      <h6>${data[1][key]['question']}</h6>
      <p class="question-explaination">${data[1][key]['explain']}</p>
  </div>
  <div class="editor-area">
      <div class="user-code">
          <h5>Editor</h5>
          <div style="padding: 10px;">
              <div id="editor"></div>
          </div>    
          
         
      </div>
      <div class="user-code-btnsection">
          <button class="coderunner-btn"  id="coderunner-btnID" onclick ="testcase()">Test code</button>
          <button class="submit-btn" >Submit</button>
          <div class="test-caese-btns">
              <button id="TestcaseID-1"><i class="fa-regular fa-circle-play"></i> Test case 1 </button>
              <button id="TestcaseID-2"><i class="fa-regular fa-circle-play"></i> Test case 2 </button>
              <button id="TestcaseID-3"><i class="fa-regular fa-circle-play"></i> Test case 3 </button>
          </div>
      </div>
      <div id="editor-box-id">
       
      </div>
  </div>
</div>
  `
  //  <div class="editor-error-box">Syntax Error</div>
  var editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.session.setMode("ace/mode/c_cpp");
    editor.setShowPrintMargin(false);
    editor.container.style.width = "100%";
    editor.container.style.height="400px";


    editor.setOptions({
      behavioursEnabled: true
    });
    //pastingandcopyremovehere
    document.getElementById("editor").addEventListener("keydown", function(event) {
      // Check if Ctrl key is pressed (event.ctrlKey for Windows/Linux, event.metaKey for Mac)
      if ((event.ctrlKey || event.metaKey) && (event.key === "c" || event.key === "C" || event.key === "v" || event.key === "V")) {
          // Prevent default behavior (disable copy and paste)
          event.preventDefault();
      }
    });
    
}

const testcase=()=>{
  var data = JSON.parse( window.localStorage.getItem('activeTopics'))
  $.ajax({
    type: "POST",
    url: "/questiontestcase/",
    data: { key: data['topicName'],heading:data['headingKey'],code:ace.edit("editor").getValue() },
    success: function (data) {
     
      testcase_status=data['status']
      delete testcase_status.error;
     
      document.getElementById('editor-box-id').innerHTML=''
      if(data['status']=='Syntax Error !'){
        var error=document.createElement('div')
        error.className="editor-error-box"
        error.innerText=`Syntax Error 1`
        document.getElementById('editor-box-id').appendChild(error)
      
      }else{
        let i = 1;
        for(let key in testcase_status){

          
              if(data['status'][key]){
                var sucess=document.createElement('div')
                sucess.className="editor-sucess-box"
                sucess.innerText=`Test case ${i} Passed !`
                document.getElementById('editor-box-id').appendChild(sucess)

                document.getElementById('TestcaseID-'+i).style.color="green"
              }else{
                var error=document.createElement('div')
                error.className="editor-error-box"
                error.innerText=`Test case ${i} Failed !`
                document.getElementById('editor-box-id').appendChild(error)
                document.getElementById('TestcaseID-'+i).style.color="red"
              
              }
            
            i++;        
          }
        }
      // clear screen
    }})
}
const wait = (cb, time) => new Promise( (res, rej)=> setTimeout( function () { cb(); res(); }, time ) );

const type = async (ele, text, i, cb) => {
	if ( i < text.length+1 ) {
		ele.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 95- Math.random() * 100;
    await wait( function () { 
			type(ele, text, i++, cb)
		}, rndTyping )
		
	} else if (i === text.length+1) {
		
    cb()
	}
}

async function typeWriter(ele, text, i) { return new Promise( res => type(ele, text, i, res) )};

async function jsonToHtml(json) {

  let result = '';
  let level = 0;

  async function convertNode(node, level) {
    
    const indentation = '  '.repeat(level * 2);
    let tag;
    let value = "emptyy";
    let Node
    if (node.heading) {
      tag = document.createElement("h1");
      value = node.heading.value;
      Node = node.heading
      result += `${indentation}<h${1 + level}>${node.heading.value}</h${2 + level}>\n`;
    } else if (node.subHeading) {
    tag = document.createElement("h3");
    tag.classList.add('subtopic-h3-class')

    
   
    
    value = node.subHeading.value;
    console.log()
    Node = node.subHeading
      result += `${indentation}<h${4 + level}>${'@'+value}</h${4 + level}>\n`;
    } else if (node.paragraph) {
    tag = document.createElement("p");
    Node = node.paragraph
    value = node.paragraph.value;
      result += `${indentation}<p>${node.paragraph.value}</p>\n`;
    } else {
    	tag = document.createElement("div");
    }
    contentSection.appendChild(tag);
    await typeWriter(tag, value, 0)
    if (Node.children) {
      for(let i of Node.children){
    		await convertNode(i, level + 1);
  		}
      
    }
  }

  for(let i of json){
    await convertNode(i, level);
  }
}

const contentSection = document.getElementById("course-text-ID");

// testcase
_reloadTheProgress();
