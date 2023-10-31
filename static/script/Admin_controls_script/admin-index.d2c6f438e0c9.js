// fetch the data after window gets loaded
var courseLists_div = document.getElementById('courseLists_divID');

window.addEventListener('load', function () {
    $.ajax({
        type: 'GET',
        url:'/admin-access/fetch-all/view_courses',
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
// change the navigation actions tabs
// var activeTab = 1;
const toggle_tabs=(id)=>{
    switch (id) {
        case 1:
            document.getElementById('status-barID').innerText='Overview' 
            break;
        case 2:
            document.getElementById('status-barID').innerText='Add Course' 
            break;

        case 3:
            document.getElementById('status-barID').innerText='Add Question' 
            
            
            
            
            
            
            
            break;
    
        case 4:
            document.getElementById('status-barID').innerText='Add Quize' 
            break;
    
        
            default:
                document.getElementById('status-barID').innerText='Overview' 
            break;
    }
  
}


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
    dict['csrfmiddlewaretoken'] = $('input[name=csrfmiddlewaretoken]').val(),
    dict['mode']='addCourse';
    
    // ;
    $.ajax({
      type: 'POST',
      url:'/add-course/',
      data: JSON.stringify(dict),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
      //    after submission
        console.log(data)
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

$(document).on('click', '#upload_Quetionbtn_id', function (e) {
    e.preventDefault();
    var dict={};
    getSectiondata();
    let overview = [$('#language_id').val(),$('#category_id').val(),$('#questionLevel_id').val(),$('#question_id').val(),$('#testcases_id').val(),$('#expected_id').val(),$('#example_id').val(),$('#exp_inputs_id').val(),$('#exp_outputs_id').val(),$('#constraint_id').val(),]
    dict['overview']= overview;
    dict['csrfmiddlewaretoken'] = $('input[name=csrfmiddlewaretoken]').val(),
    dict['mode']='addQuestion';
    
    // ;
    $.ajax({
      type: 'POST',
      url:'/practcode-dashboard/addQuestion/45/',
      data: JSON.stringify(dict),
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
      //    after submission
        console.log(data)
        if (data['error']==false){
           
        }  


      }
  })
    
    
})