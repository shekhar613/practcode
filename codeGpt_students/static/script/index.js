var SideNavToggle = false
var PractcodeSideNav = document.getElementById("PractcodeSideNavid")
var PractcodeSidebar_userstatusid = document.getElementById("PractcodeSidebar_userOptionsid")
// var PractcodeSideNavDetails = document.getElementById("PractcodeSideNavDetailsId")

const logoutnow = ()=>{
  console.log("working")
  document.cookie = "authenticationuser=; max-age=0; path=/;";
  document.cookie = "username=; max-age=0; path=/;";
}

const PractcodetoggleSidenav = () =>{
    
    if(SideNavToggle){
        PractcodeSideNav.classList.remove('activeSidenav')
        PractcodeSidebar_userstatusid.classList.remove('activeuser')
        document.getElementById("PractcodeMainRootid").classList.remove('activeSidenav')
        // PractcodeSideNavDetails.style.display="none"
        SideNavToggle = false
    }else{
        PractcodeSideNav.classList.add('activeSidenav')
        PractcodeSidebar_userstatusid.classList.add('activeuser')
        document.getElementById("PractcodeMainRootid").classList.add('activeSidenav')
        // PractcodeSideNavDetails.style.display="flex"
        SideNavToggle = true
    }
}
// sidenav options selections

const sidenav_options_selections=()=>{
    // Get all list items with class "list-item"
    var listItems = document.querySelectorAll('.side-navigation-options');

    // Add click event listener to each list item
    listItems.forEach(function(item) {
      item.addEventListener('click', function() {
        // Remove "active" class from all list items
        listItems.forEach(function(li) {
          li.classList.remove('active-option');
        });

        // Add "active" class to the clicked list item
        this.classList.add('active-option');
        // Save the active item index to local storage
        var activeIndex = Array.from(listItems).indexOf(this);
        localStorage.setItem('activeIndex', activeIndex.toString());

      });
    });

    // Check if there's a stored active index in local storage
    var storedActiveIndex = localStorage.getItem('activeIndex');

    // If there is, add the "active" class to the corresponding list item
    if (storedActiveIndex !== null) {
      listItems[parseInt(storedActiveIndex)].classList.add('active');
    }
}
sidenav_options_selections();
// --------------------------


$(document).ready(function() {
    $('#dropdown-button').click(function() {
      $('#dropdown-content').slideToggle(100);
    });
  });

setTimeout(function() {
    document.getElementById('checkauth').click();
    console.log("checking....");
     // Simulate a button click after 5 seconds
}, 0);




// changemytheam
var currentTheam = 0;
var theamchangerbtnDIV = document.getElementById('theamchangerbtnDIV')
var theamchangericonID = document.getElementById('theamchangericonID')


var themhandlerForAllContent = document.querySelectorAll('.practcode-theamer')

const changemytheam = () =>{
  if (currentTheam==0){
    console.log("changed to dark");
    currentTheam = 1;
    theamchangerbtnDIV.style.alignItems="right"
    theamchangerbtnDIV.style.textAlign="right"
    theamchangericonID.classList="fa-solid fa-sun"
    document.body.innerHTML.style

    themhandlerForAllContent.forEach(container => {
      container.classList.remove('practcode-light-theam');
      container.classList.add('practcode-dark-theam');
    });

    
  }else{
    theamchangerbtnDIV.style.alignItems="left"
    theamchangerbtnDIV.style.textAlign="left"
    theamchangericonID.classList="fa-regular fa-sun"

    themhandlerForAllContent.forEach(container => {
      container.classList.remove('practcode-dark-theam');
      container.classList.add('practcode-light-theam');

    });


    console.log("changed to light ")
    currentTheam = 0
  }
}
