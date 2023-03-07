$(document).ready(function() {
  // --- our code goes here ---
  $("#tweet-text").on('input', function() {
  let count = $(this).val().length;
    let counter = 140 - count;
    //went for sibling node to other sibling node down to child node that we want to change
    let number =  $(this).siblings('.tweet-bottom').children('.child-node').children('.counter').text(counter);
    if(counter < 0){
      $(this).siblings('.tweet-bottom').children('.child-node').children('.counter').css({"color": "red"})
    }else{
      $(this).siblings('.tweet-bottom').children('.child-node').children('.counter').css({"color": "#545149"})
      
    }
    
  });

  

});