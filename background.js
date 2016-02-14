'use strict'
// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.

// console.log('hello');s

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });


var toggle = true;
var startTime ;
var startTimeDefined = false;
var startPage ;
var storageArea =  chrome.storage.sync;

var whiteList;
var blacList;

var token = null;
var isSync= false;

storageArea.clear(function (){

  console.log('new db');
  //test is it is clean
  storageArea.get(null,function(result){
    console.log('db is supposed to be null:')
    console.log(result);
  });
});

function syncAfterLogin(){
  if (token==null) {
    alert('token error');
  }
// TODO: when you have the fb, sync with previous local data to server.
  storageArea.get(null,function(result){
    console.log(result);


    for(var key in result){
      // console.log(key);
      // console.log(result[key]);
      var data= result[key];
      // storageArea.get(key,function(data){
      //   console.log(data);
        if(data['user_token']==null){
          //update the local data
          data['user_token']=token;
          var obj ={};
          obj[data['timestamp']] = data;
          storageArea.set(obj, function() {
            // Notify that we saved.
            // alert('data saved'+obj);
          });

          //send to server
          sendDataToServer(data);
        }
      //
      // });

    }



  });

}

function sendDataToServer(data){
  console.log("sending data to server");
  console.log(data);
  console.log(data.user_token);
  console.log(data.url);
  console.log(data.timestamp);
  console.log(data.duration);
  $.post('http://procrastinationation.mybluemix.net/event',data, function(  data,  textStatus,  jqXHR ){
    console.log(data);

  });

}


function saveChanges(timeStamp,uurl,diffMilliTime) {

        var data = {};
        data['timestamp']=timeStamp;
        data['url'] = uurl;
        data ['duration']= diffMilliTime;

        if (token != null ) {
          //send it to the server
          data['user_token']= token;
          sendDataToServer(data);
          if(isSync==false){
            // TODO:
            //send the local data to the server
            syncAfterLogin();
            isSync = true;
          }


        }else{
          //save it locally
          data['user_token']=null;

          var obj ={};
          obj[timeStamp] = data;
          console.log('data:'+data);
          console.log('obj:'+obj);
          // Save it using the Chrome extension storage API.
          storageArea.set(obj, function() {
            // Notify that we saved.
            // alert('data saved'+obj);
          });
          storageArea.get(null,function(result){
            console.log(result);

            //console output = myVariableKeyName {myTestVar:'my test var'}
          });
        }







        return true;
  }

chrome.tabs.onUpdated.addListener(function( tabId,  changeInfo,  tab) {
  // console.log(tab.url);
  if (tab.url.includes('https://www.facebook.com/connect/login_success.html?access_token=')) {
    var strArray= tab.url.split('=');
    token = strArray[1];
    console.log('token success='+token);
    //close this tab
    chrome.tabs.remove(tabId, function (){
      console.log('close token url');
    });
  }


});

function isValidWebsite(url){
  console.log(url);
  console.log(url.match(/\//g) || []);
  if((url.match(/\//g) || []).length<3){
    console.log('is not valid');
    return false;
  }else{
    console.log('is valid');
    return true;
  }

}

chrome.tabs.onActivated.addListener(function(activeInfo){
  console.log(activeInfo);
  console.log(toggle);


  if(toggle == true){
    chrome.tabs.get(activeInfo.tabId, function (tab){
      if(startTimeDefined){

        var endTime = new Date();
        var diffMilliTime = -startTime.getTime()+endTime.getTime();
        // console.log(startPage+diffTime);


        var uurl = parse(startPage)
        var timeStamp =  endTime.getTime();
        console.log(uurl);
        console.log(diffMilliTime);
        // alert(tab.url,diffTime);

        if(isValidWebsite(tab.url)){

          startPage = tab.url;
          startTime = new Date();
          startTimeDefined = true;
        }else{
          startPage = null;
          startTime = null;
          startTimeDefined = false;
        }

        // TODO: saving timeStamp,uurl,diffTime
        if (!saveChanges(timeStamp,uurl,diffMilliTime)){
          alert('saveChanges fail');
        }

      }else{

        if(isValidWebsite(tab.url)){
          startTime = new Date();
          startTimeDefined = true;
          startPage = tab.url;
        }else{
          // do nothing

        }
      }
    });



  }else {
    //do nothing

  }


})


function parse(startPage){
  console.log(startPage);
  var stringArray = startPage.split('/');
  // console.log(stringArray);

  return  stringArray[2];


}

chrome.browserAction.onClicked.addListener(function(tab) {
  toggle = !toggle;
  console.log(toggle);

  if(toggle){
    // chrome.browserAction.setIcon({path: "on.png", tabId:tab.id});
    chrome.tabs.getSelected(null, function(tab) {
        // tab = tab.id;
        var tabUrl = tab.url;
        console.log(tab.url);
        // alert(tab.url);
        if(isValidWebsite(tabUrl)){

                    startPage = tab.url;
                    startTime = new Date();
                    startTimeDefined = true;
        }
    });

  }
  else{
    // chrome.browserAction.setIcon({path: "off.png", tabId:tab.id});
    chrome.tabs.executeScript(tab.id, {code:"alert('u just turn off the alert')"});
  }
});
