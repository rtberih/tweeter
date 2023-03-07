
$(document).ready(function() {
  //This method is best suited if the tweet element was created as a string literal (not a jQuery object).
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  // Test / driver code (temporary). Eventually will get this from the server.
  const createTweetElement = function(data){
    return ` <article class="tweets">
    <div class="tweetHeader">
      <span class="avatar"><img src=${escape(data.user.avatars)}><span class="avatarname">${escape(data.user.name)}</span></span>
      <span class="username">${escape(data.user.handle)}</span>
    </div>
    <p class="tweetInput">${escape(data.content.text)}</p>
    <hr class="divider">
    <div class="tweetFooter">
      <span class="timestamp">${escape(timeago.format(data.created_at))}</span>
      <div class="icons"><i class="fas fa-book"></i><i class="fas fa-retweet"></i><i class="fas fa-heart"></i></div>
    </div>
  </article>`
  }

  const renderTweets = function(tweet) {
    // loops through tweets
    for (let val of tweet){ 
    let new_tweet = createTweetElement(val);
      $('.tweet-Container').append(new_tweet);
    }
  }
  //renderTweets(tweetData);

  //  Form Submission using JQuery and AJAX
  $( "#tweetForm" ).submit(function( event ) {

    event.preventDefault();
    // this var gets the character that enter in text area 
    let inputElement = $("#tweet-text");
    let char = inputElement.val().length;
    if(char === 0){
      $("#errorID").slideDown().text("Error: you need to type something to tweet");
      return 
    }else if (char > 140) {
      $("#errorID").slideDown().text("Error: Your tweet is too long PLZ shorten");
      return
    }
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: $( this ).serialize(),
    }).then((result)=>{
      inputElement.val("");
      $('#tweet-text').siblings('.tweet-bottom').children('.child-node').children('.counter').text(140);
      loadTweets(result); 
    });
  });

  const loadTweets = function(){
    $.ajax({
      url: "/tweets", //calling the route or API to get the information
      method: "GET" // POST  or GET  GET means to get the information from Route And POST to submit information to route
      
    }).then((data)=>{ //.then is the promise which means, when the Ajax Call is completed
      console.log("Data from AJAX",data);
      // //sort my tweet to post the news tweet at the top
      // let sort =data.sort((a,b)=>b.created_at - a.created_at);
      $(".tweet-Container").empty();
      renderTweets(data.reverse());
    })
  }
  loadTweets();
});