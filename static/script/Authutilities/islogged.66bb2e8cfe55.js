function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const jwtToken = getCookie('authenticationuser');
console.log(jwtToken);  // This will log the JWT token value


$(document).on('click', '#checkauth', function (e) {
    e.preventDefault();
    $.ajax({
        type: 'GET',
        url:'/user/',
        headers: {
            Authorization: `Bearer ${jwtToken}`,  // Attach the JWT token in the Authorization header
        },
        data: {},
        success: function (data) {
            console.log(data)
        },
        statusCode: {
            404: function() {
                console.log('Resource not found');
            },
            500: function() {
                console.log('Internal server error');
            },
            401: function() {
                $('#sessionstatusdiv').css('display','flex')
                setTimeout(()=> {
                    window.location.href="/login"
                }, 1);
            },
            200:function() {
                $('#sessionstatusdiv').css('display','none')
                $('#navsignin_signupBTNs').css('display','none')
            },
            
        }
       

    })
})