// fetch the data after window gets loaded
var courseLists_div = document.getElementById('courseLists_divID');

window.addEventListener('load', function () {
    $.ajax({
        type: 'GET',
        url:'/practcode-admin-controls/fetch-all/view_courses',
        success: function (data) {
        //    after submission
        for (let index = 0; index < data.length; index++) {
            console.log(data[index]['id'])
            console.log(data[index]['title'])
            console.log(data[index]['category'])
            console.log(data[index]['level'])

            courseLists_div.innerHTML+=`
                <div class="listView">
                    <p><a href="/course/${data[index]['id']}"><i class="fa-solid fa-arrow-up-right-from-square"></i></a>  ${data[index]['id']}</p>
                    <p>${data[index]['title']}</p>
                    <p>${data[index]['category']}</p>
                </div>
            
            `
            
        }
        }
    })        
})




var sections_counter = 1;
const formData = new FormData()
var dict={'section_data':{}}
var file_obj;
const addSection = () =>{
    console.log("called");
    sections_counter++;
    document.getElementById('addsections_dev_id').innerHTML+=
    `
    <br>
    <h3 class="section_heading_h3">Section ${sections_counter}</h3>
    <div class="addsections_dev" >
                <div class="section-title">
                    <input id="Section_title_id_${sections_counter}" type="text" placeholder=" Section title">
                </div>
    
                <div class="section-title">
                    <textarea name="" id="Section_details_id_${sections_counter}"   rows="10" placeholder="Section details"></textarea>
                </div>
                
                <div class="section-title">
                    <textarea name="" id="Section_description_id_${sections_counter}"   rows="4" placeholder="*Any Note ? (optional)"></textarea>
                </div>
    
                
            </div>
    
    `
}
const getSectiondata=()=>{
    for(let i =1;i<=sections_counter;i++){
       
        dict['section_data'][$(`#Section_title_id_${i}`).val()] = {'details':$(`#Section_details_id_${i}`).val(),'note':$(`#Section_description_id_${i}`).val()}
       
    }
}



$(document).on('click', '#upload_btn_id', function (e) {
    e.preventDefault();
    getSectiondata();
    let overview = [$('#courseTile_id').val(),$('#Category_id').val(),$('#Level_id').val(),$('#Duration_id').val(),$('#Price_id').val(),$('#description_id').val(),sections_counter]
    dict['overview']= overview;

   
    
    // ;
    $.ajax({
      type: 'POST',
      url:'/practcode-admin-controls/add-course/',
      data: JSON.stringify(dict),
      contentType: 'application/json',
      success: function (data) {
      //    after submission
        console.log(data['error'])
        if (data['error']==false){
            courseLists_div.innerHTML+=`
                <div class="listView">
                    <p><a href=""><i class="fa-solid fa-rotate-right"></i></a> Refresh</p>
                    <p>${$('#courseTile_id').val()}</p>
                    <p>${$('#Category_id').val()}</p>
                </div>
            
            `
        }  


      }
  })
    
    
})

