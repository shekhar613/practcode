// expand the sections
document.getElementById('side-navigation-options_BrowseCourse_id').classList.add('active-option')
const expandcourseSection =(id,btnID)=>{
    console.log(btnID)
    if(document.getElementById(id).classList.contains('active-section')){
        document.getElementById(id).classList.remove('active-section');
        document.getElementById(btnID).className="fa-solid fa-chevron-down"
    }else{
        document.getElementById(id).classList.add('active-section');
        document.getElementById(btnID).className="fa-solid fa-chevron-up"
    }
}
//selections
const selections = (e)=>{
    const boxes = document.querySelectorAll('.sidepanel-options');
    boxes.forEach(box => {
    box.style.color = 'black';
    });

    e.style.color="gold";
   
    // change the other containt
}