var toggleFlag = true;
const toggle_takeCourse_bar = (e) => {
 
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

// user topic selection
course_topics_ulID;
var listItems = document.querySelectorAll("#course_topics_ulID li");

// Add a click event listener to each list item
listItems.forEach(function (item) {
  item.addEventListener("click", function () {
    // Retrieve the value of the clicked list item
    var topicName = item.getAttribute("value");
    $.ajax({
      type: "POST",
      url: "/get-course-cotent/",
      data: { key: topicName },
      success: function (data) {
        //    after submission
        // clear screen
        document.getElementById("course-text-ID").innerHTML=""
        document.getElementById("sub-topicID").innerText=topicName
        jsonToHtml(data);
        
      },
    });
  });
});




const wait = (cb, time) => new Promise( (res, rej)=> setTimeout( function () { cb(); res(); }, time ) );

const type = async (ele, text, i, cb) => {
	if ( i < text.length+1 ) {
		ele.innerHTML = text.substring(0, i++);
		// generate a random Number to emulate Typing on the Keyboard.
		var rndTyping = 11- Math.random() * 100;
    await wait( function () { 
			type(ele, text, i++, cb)
		}, rndTyping )
		/* setTimeout( function () { 
		  typeWriter(text, i++)
		},rndTyping); */
	} else if (i === text.length+1) {
		
    cb()
	}
}

async function typeWriter(ele, text, i) { return new Promise( res => type(ele, text, i, res) )};

async function jsonToHtml(json) {

  let result = '';
  let level = 0;

  async function convertNode(node, level) {
    
    const indentation = ' '.repeat(level * 2);
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
    value = node.subHeading.value;
    Node = node.subHeading
      result += `${indentation}<h${4 + level}>${node.subHeading.value}</h${4 + level}>\n`;
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
      /* node.children.forEach(child => {
        convertNode(child, level + 1);
      }); */
    }
  }

  for(let i of json){
    await convertNode(i, level);
  }
}

const contentSection = document.getElementById("course-text-ID");

// jsonToHtml(a);