// To retrieve the JWT from cookies
const cookies = document.cookie.split('; ');
const jwtCookie = cookies.find(cookie => cookie.startsWith('jwtToken='));
const jwtToken = jwtCookie ? jwtCookie.split('=')[1] : null;


// To retrieve the user from cookies
const user = document.cookie.split('; ');
const username = user.find(cookie => cookie.startsWith('username='));
const usernameVal = username ? username.split('=')[1] : null;



if(jwtToken!==null && username !==null){
    console.log("having token")
}else{
    console.log("not having token")
}