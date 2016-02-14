'use strict'

document.getElementById('loginButton').addEventListener("click", function(){
  window.open("https://www.facebook.com/dialog/oauth?client_id=523614004477797&redirect_uri=http://procrastinationation.mybluemix.net/facebook&scope=public_profile,user_friends,email","demo","width=550,height=300,left=150,top=200,toolbar=0,status=0,")
});
