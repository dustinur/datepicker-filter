$( ".card" ).hide();

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var todaysDate = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

$("[data-eventdate]").filter(function(){
  return $(this).attr("data-eventdate") >= todaysDate;
}).show();


$('.datepicker').datepicker().on('changeDate', function(e){
  var dateSelect = e.date.getFullYear() + '-' + ("0" + (e.date.getMonth() + 1)).slice(-2) + '-' + ("0" + (e.date.getDate())).slice(-2);
  var dateSelectCard = $(".card*[data-eventdate*="+ dateSelect + "]");

  $( ".card" ).hide();    
  dateSelectCard.data('eventdate') >= todaysDate ? dateSelectCard.show() : dateSelectCard.hide(); 

  $( "p:first" ).html( dateSelect );
});

$('#music, #dance, #theatre').on('change', evt => {
  var genreSelect = evt.target.id;
  var genreSelectCard = $(".card*[data-eventgenre*="+ genreSelect + "]");
  
  if ( $(evt.target).is(':checked') ) { 
    genreSelectCard.show(); 
  } else {
    genreSelectCard.hide();
  }  
 
  // $(evt.target).is(':checked') ? genreSelectCard.show() : genreSelectCard.hide();   
  // $(evt.target).is(':checked') ? console.log('checked') : console.log('not checked');
  console.log(genreSelect)
})

