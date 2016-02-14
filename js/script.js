'use strict'

document.getElementById('loginButton').addEventListener("click", function(){
  window.open("https://www.facebook.com/dialog/oauth?client_id=523614004477797&redirect_uri=http://procrastinationation.org/facebook&scope=public_profile,user_friends,email","demo","width=550,height=300,left=150,top=200,toolbar=0,status=0,")
});

chrome.runtime.sendMessage({greeting: "isFbLogined?"}, function(response) {
  console.log(response.farewell);
  if (response.farewell == "no") {



  }else{
      //do nothing
      var token = response.farewell;
      console.log(token);
      document.getElementById('loginButton').disabled=true;

  }
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if (request.msg == "I get the token"){
        document.getElementById('loginButton').disabled=true;

    }

  });
