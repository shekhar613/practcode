// // on logindata submite
var isOTPSended = false
var isOTPVarified = false
var userEmail =""
function _validatePswd(newpswd,newconfpswd){
    if (newpswd.length <8 || newpswd.length >15){
        console.log("Invalid length of password")
        $("#recoveryMessageid").text(`Password must be at least 8 characters long`)
        $("#accountRecoveryInfoId").addClass("InvalidRed")
        $("#accountRecoveryInfo_tickId").removeClass('fa-circle-check')
        $("#accountRecoveryInfo_tickId").addClass('fa-circle-xmark')
        return false
       
    }
    if(newpswd!==newconfpswd){
        console.log("Confirm password not matching")
        $("#recoveryMessageid").text(`Confirm password not matching`)
        $("#accountRecoveryInfoId").addClass("InvalidRed")
        $("#accountRecoveryInfo_tickId").removeClass('fa-circle-check')
        $("#accountRecoveryInfo_tickId").addClass('fa-circle-xmark')
        return false
    }

    return true
}

function Accountrecovery(){
    event.preventDefault()
    // $("#varificationBTNId").
    $("#verificationLoaderId").css({"display":"inline-block"})
    if(isOTPVarified){
        // when OTP Varified
        var newpswd = $('#passwordId').val()
        var newconfpswd = $('#ConfirmpasswordId').val()
        if(_validatePswd(newpswd,newconfpswd)){
            // password is validated

            // send new password to server
            $.ajax({
                type: 'POST',
                url:'/Email-check/recovery/',
                data: {
                    action:"Reset Newpswd",
                    Newpswd: newpswd,
                    email:userEmail,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
                success: function (data) {
                    console.log(data)
                }
            })

            $('#passwordId').val("")
            $('#ConfirmpasswordId').val("")
            $("#recoveryMessageid").text(`Password is updated successfully`)
            $("#accountRecoveryInfo_tickId").addClass('fa-circle-check')
            $("#accountRecoveryInfo_tickId").removeClass('fa-circle-xmark')
            $("#accountRecoveryInfoId").removeClass("InvalidRed")
            setTimeout(()=>{window.location.replace("/login")},1000)
        }else{
            // password is not validated
        }
        
    }
    else{
        // OTP NOT varified
        if(isOTPSended){
            $.ajax({
                type: 'POST',
                url:'/Email-check/recovery/',
                data: {
                    action:"OTP Varify",
                    OTP: $('#recoveryOptid').val(),
                    email:userEmail,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                },
                success: function (data) {
                    console.log(data)
                    $("#verificationLoaderId").css({"display":"none"})
                    if(data['OTP']){
                        $("#RecoveryOTPInputs").css({"display":"none"})
                        $("#newPasswordConsfirmationId").css({"display":"block"})
                        $("#newPasswordId").css({"display":"block"})
                        $("#recoveryMessageid").text(`Reset Your new password`)
                        $("#varificationBTNId").text(`Reset Password`)
                        $("#varificationBTNId").css({"background":"#00a50e"})

                        $("#accountRecoveryInfo_tickId").addClass('fa-circle-check')
                        $("#accountRecoveryInfo_tickId").removeClass('fa-circle-xmark')
                        $("#accountRecoveryInfoId").removeClass("InvalidRed")

                        isOTPVarified = true
                    }else{
                        $("#recoveryMessageid").text(`Invalid OTP ! \nPlease Enter valid OTP`)
                        $("#accountRecoveryInfoId").addClass("InvalidRed")
                        $("#accountRecoveryInfo_tickId").removeClass('fa-circle-check')
                        $("#accountRecoveryInfo_tickId").addClass('fa-circle-xmark')
                    }
                    console.log(data)

                
                }
            })
           
            
            
        }
        else{
            // varifiying email
            email = document.getElementById('recoveryemailid').value
            $.ajax({
                        type: 'POST',
                        url:'/Email-check/recovery/',
                        data: {
                            action:"Email Varify",
                            email: $('#recoveryemailid').val(),
                            csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
                        },
                        success: function (data) {
                            $("#verificationLoaderId").css({"display":"none"})
                            console.log(data)
                            if(data['isValid']){
                                // true - valid email id
                                userEmail = data['email'];
                                $("#RecoveryOTPInputs").css({"display":"block"})
                                $("#RecoveryEmailInputs").css({"display":"none"})
                                $("#recoveryMessageid").text(`Please enter the One-Time Password (OTP) that has been sent to your registered Email ${data['email']}`)
                            
                                $("#accountRecoveryInfo_tickId").addClass('fa-circle-check')
                                $("#accountRecoveryInfo_tickId").removeClass('fa-circle-xmark')
                                $("#accountRecoveryInfoId").removeClass("InvalidRed")
                                isOTPSended = true
                            }else{
                                // false - invalid email id 
                                $("#recoveryMessageid").text(`Invalid Email " ${data['email']} " \nPlease Enter valid registered email`)
                                $("#accountRecoveryInfoId").addClass("InvalidRed")
                                $("#accountRecoveryInfo_tickId").removeClass('fa-circle-check')
                                $("#accountRecoveryInfo_tickId").addClass('fa-circle-xmark')
                                
                            }
                        }
                    })
                   
        }
    }    
}






// console.log("login js linked...")
// $(document).on('submit', '#post-recoverAcoount_form', function (e) {
//     e.preventDefault();
    
//     // Downloader_section.innerHTML=containt_text;

//     
// })