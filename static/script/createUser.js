// userVarification 
var usereMail = ""
var isUserCreated = false
// on create user data submite
const formerrorBOX = document.getElementById('formerrorBOX');
const formerrorP = document.getElementById('Formerror');

const ShowFormError = (error, element) => {
    formerrorBOX.style.display = "block";
    formerrorP.innerText = error + "calling from function";
    element.style.color = 'red';

}
const setCook = (data) => {
    // To set the JWT cookie
    document.cookie = `jwtToken=${data['token']['access']};path=/`;
    // To set the username cookie
    document.cookie = `username=${data['token']['username']};path=/`;
}
const ValidatedData = () => {
    // To validate the form data
    function isNumber(string) {
        return Number(string) === Number(string);
    }

    var username = document.forms["createuserForm"]["username"].value.trim();
    var name = document.forms["createuserForm"]["name"].value;
    var email = document.forms["createuserForm"]["email"].value;
    var contact = document.forms["createuserForm"]["contact"].value.trim();
    var college = document.forms["createuserForm"]["college"].value;
    var course = document.forms["createuserForm"]["course"].value;
    var year = document.forms["createuserForm"]["year"].value;
    var password = document.forms["createuserForm"]["password"].value;
    var restrictedNames = ["abc", "xyz", "random", "practcode", "code", "username", "myname", "google", "user", "   ", "  "]; // Add more restricted names here


    // Validating name field
    if (restrictedNames.includes(username.toLowerCase())) {
        document.getElementById("usernameformerrorP").innerHTML = "Enter valid username,this username is not allowed"
        document.getElementById("usernameformerrorP").style.color = "red";
        return false;
    } else {
        document.getElementById("usernameformerrorP").innerHTML = "Username:"
        document.getElementById("usernameformerrorP").style.color = "#b3b3b3"
    }


    if (username.length <= 2 || username.length > 15) {
        document.getElementById("usernameformerrorP").innerHTML = "Enter username with valid length less than 15 characters"
        document.getElementById("usernameformerrorP").style.color = "red";
        return false;
    } else {
        document.getElementById("usernameformerrorP").innerHTML = "Username:"
        document.getElementById("usernameformerrorP").style.color = "#b3b3b3"
    }

    if (name.length > 20) {
        document.getElementById("nameformerrorP").innerHTML = "Enter name with valid length"
        document.getElementById("nameformerrorP").style.color = "red";
        return false;
    } else {
        document.getElementById("nameformerrorP").innerHTML = "Name:"
        document.getElementById("nameformerrorP").style.color = "#b3b3b3"
    }

    if (isNumber(contact) === false || contact.length > 10 || contact.length < 10) {
        document.getElementById("contactformerrorP").innerHTML = "Enter valid 10 digit contact number"
        document.getElementById("contactformerrorP").style.color = "red";
        return false;
    } else {
        document.getElementById("contactformerrorP").innerHTML = "Contact:"
        document.getElementById("contactformerrorP").style.color = "#b3b3b3"
    }

    // Password length check
    if (password.length < 8 || password.length > 15) {
        document.getElementById("passwordformerrorP").innerHTML = "Password must be at least 8 characters long"
        document.getElementById("passwordformerrorP").style.color = "red";

        return false;
    } else {
        document.getElementById("passwordformerrorP").innerHTML = "Password:"
        document.getElementById("passwordformerrorP").style.color = "#b3b3b3"
    }


    return true;
}

const reSetFeilds = () =>{
    document.getElementById(`emailformerrorP`).innerHTML = 'Email:'
    document.getElementById(`emailformerrorP`).style.color = "#b3b3b3";

    document.getElementById(`nameformerrorP`).innerHTML = 'Name:'
    document.getElementById(`nameformerrorP`).style.color = "#b3b3b3"

    document.getElementById(`usernameformerrorP`).innerHTML = 'Username:'
    document.getElementById(`usernameformerrorP`).style.color = "#b3b3b3"

    document.getElementById(`contactformerrorP`).innerHTML = 'Contact:'
    document.getElementById(`contactformerrorP`).style.color = "#b3b3b3"

    document.getElementById(`passwordformerrorP`).innerHTML = 'Password:'
    document.getElementById(`passwordformerrorP`).style.color = "#b3b3b3"

    document.getElementById(`collegeformerrorP`).innerHTML = 'College:'
    document.getElementById(`collegeformerrorP`).style.color = "#b3b3b3"

    document.getElementById(`courseformerrorP`).innerHTML = 'Course:'
    document.getElementById(`courseformerrorP`).style.color = "#b3b3b3"

    document.getElementById(`yearformerrorP`).innerHTML = 'Year:'
    document.getElementById(`yearformerrorP`).style.color = "#b3b3b3"


}

$(document).on('submit', '#post-createuser_form', function (e) {
    e.preventDefault();
    reSetFeilds();
    if (!isUserCreated) {
        // create user
        if (ValidatedData()) {
     
            // $('#textContenPractcode').css({ "display": "block" })
            // typeText()
            $.ajax({
                beforeSend: function() {
                    // Show the loader before sending the request
                    $('#PractPageLoader').show();
                    typeText(`In progress, please wait, we're working on it.`)
                    $('#practcodeSignUpBTN').css({"pointer-events": "none"})
                },
                  complete: function() {
                    // Hide the loader when the request is complete
                    $('#PractPageLoader').hide();
                    $('#practcodeSignUpBTN').css({"pointer-events": "auto"})
                },
                type: 'POST',
                url: '/register/',
                data: JSON.stringify({
                    username: $('#username').val(),
                    name: $('#name').val(),
                    email: $('#email').val(),
                    contact: $('#contact').val(),
                    collegeName: $('#college').val(),
                    year: $('#year').val(),
                    courseName: $('#course').val(),
                    password: $('#password').val(),
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                    action: 'createUser'
                }),
                contentType: 'application/json',
                dataType: 'json',
                success: function (data) {

                    // check Response
                    console.log(data['error'])
                    
                    if ("error" in data) {
                        // $('#textContenPractcode').css({ "display": "none" })

                        if (data['key'] === "email") {
                            document.getElementById(`emailformerrorP`).innerHTML = data['error']
                            document.getElementById(`emailformerrorP`).style.color = "red";
                        } else {
                            console.log(`${data['key'][0]}`)
                            document.getElementById(`${data['key']}formerrorP`).innerHTML = data['error'][data['key']][0]
                            document.getElementById(`${data['key']}formerrorP`).style.color = "red";
                            console.log(data['error'][data['key']][0])
                        }
                    } else {
                        usereMail = $('#email').val()

                        // To set the JWT cookie
                        setCook(data);
                        isUserCreated = true
                        
                        $('#userVarificationCodeSec').css({ "display": "block" })
                        $('#userdata').css({ "display": "none" })
                        $("#FormuserLoginDirector").css({"display":"none"})
                        $('#signup_heading_P').text("")
                        $('#signup_heading_H2').text("")
                        $('#practcodeSignUpBTN').css({
                            'background':'green'
                        })
                        $('#practcodeSignUpBTN').text('Varify Account')


                       
                            
                   
                    }



                }
            })
        }
    }
    if (isUserCreated) {
        // varify the user
        $.ajax({
            type: 'POST',
            url: '/register/',
            data: JSON.stringify({
                email: usereMail,
                VarificationCode: $('#VarificationCode').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                action: 'userEmailVarification'
            }),
            contentType: 'application/json',
            dataType: 'json',
            success: function (data) {
                // varificationCodeformerrorP
                if (data['OTP']) {
                    $('#varificationCodeformerrorP').text("Varification completed Successfully")
                    $('#varificationCodeformerrorP').css({ "color": "green" })
                    setTimeout(() => { window.location.replace("/") }, 2000)
                } else {
                    $('#varificationCodeformerrorP').text("Invalid varification code")
                    $('#varificationCodeformerrorP').css({
                        "color": "red"
                    })
                }
                console.log(data)
            }

        })
        console.log("user is created and varified successfully")
    }
})

// Loader||

function typeText(_text) {
    $('#textContenPractcode').empty()
    const txt = _text;
    const outputDiv = document.getElementById('textContenPractcode');
    const splittedTxt = txt.split('<np>');
    let pElements = [];
    splittedTxt.forEach((item, index) => {
        const p = document.createElement('p');
        outputDiv.appendChild(p);
    });
    const allParas = outputDiv.querySelectorAll('p');
    let i = 0;
    let currentPara = 0;
    const timerId = setInterval(() => {
        allParas[currentPara].innerHTML += splittedTxt[currentPara].charAt(i);
        i++;
        if (i === splittedTxt[currentPara].length) {
            currentPara++;
            i = 0;
            if (currentPara === splittedTxt.length) {
                clearInterval(timerId);
            }
        }
    }, 50);
}

typeText(`Welcome to Practcode!<np>Take the first step towards coding excellence. Sign up and ignite your potential<np>Happy Coding 😉 !`)