var toggleFlag=true;
const toggle_takeCourse_bar = (e) =>{
    console.log(e);
    document.getElementById('course-content-areaID').classList.add('responsive')
    if(toggleFlag){
        
        // closing
        document.getElementById('course-status-bar-toggle-iconID').className='fa-solid fa-angles-right'
       
        document.getElementById('course-status-barID').style.display='none';
        document.getElementById('course-content-areaID').classList.add('full-width')
        
        toggleFlag=false;
    }else{
        // opening
       
        document.getElementById('course-status-bar-toggle-iconID').className='fa-solid fa-angles-left'
        document.getElementById('course-status-barID').style.display='block';
        document.getElementById('course-content-areaID').classList.remove('full-width')
       
        toggleFlag=true;
    }
}