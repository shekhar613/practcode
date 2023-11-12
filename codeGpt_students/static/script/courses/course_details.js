// expand the sections
// sidenav_options_selections();
// Check if there's a stored active index in local storage
var storedActiveIndex = localStorage.getItem('activeIndex');

// If there is, add the "active" class to the corresponding list item
if (storedActiveIndex !== null) {
    document.querySelectorAll('.side-navigation-options')[parseInt(storedActiveIndex)].classList.add('active');
}
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