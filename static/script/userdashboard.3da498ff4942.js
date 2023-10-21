var sideNav = true;
var sidebar =document.getElementById('sidebar')
var sidebarBtns = document.getElementsByClassName('sidebarBtns')
var ActivetoggleBtn = document.getElementById('ActivetoggleBtn')
var sidedartoggleIcon = document.getElementById('sidedartoggleIcon')


// dashboard sidebar toggle effect
const sideBarToggle=()=>{
    
    if (sideNav){
        sidebar.style.width='10px';
            for (let i = 0; i <=7; i++) {
                sidebarBtns[i].style.display='none';;
              } 
            ActivetoggleBtn.style.marginLeft='5px'
            sidedartoggleIcon.className='fa-solid fa-angles-right'
        
        
        sideNav = false;
    }else{
        for (let i = 0; i <=7; i++) {
            sidebarBtns[i].style.display='block';;
          } 
        sidebar.style.width='200px';
        ActivetoggleBtn.style.marginLeft='180px'
        sidedartoggleIcon.className='fa-solid fa-angles-left'
        
        
        
        sideNav = true;
    }
}

const toggleSideBarOpions=(e,id)=>{
    
    var sidebarBtns = document.getElementsByClassName('sidebarBtns')
        
        for (let i = 0; i <=7; i++) {
            if(i!==id){
                sidebarBtns[i].classList.remove('activeOption')
            }else{
                sidebarBtns[i].classList.add('activeOption')
                window.location.replace("/testcase");
                console.error("asdfasdf")
            }
            
          }
} 