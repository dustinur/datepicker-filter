$( ".card" ).hide();

var d = new Date();
var month = d.getMonth()+1;
var day = d.getDate();
var todaysDate = d.getFullYear() + '-' +
    (month<10 ? '0' : '') + month + '-' +
    (day<10 ? '0' : '') + day;

function showAllDates() { 
  $("[data-eventdate]").filter(function(){
  return $(this).attr("data-eventdate") >= todaysDate;
  }).show();
}
showAllDates();
$("#all").on("click", function () { showAllDates(); });


$('.datepicker').datepicker().on('changeDate', function(e){
  var dateSelect = e.date.getFullYear() + '-' + ("0" + (e.date.getMonth() + 1)).slice(-2) + '-' + ("0" + (e.date.getDate())).slice(-2);
  var dateSelectCard = $(".card*[data-eventdate*="+ dateSelect + "]");

  $( ".card" ).hide();    
  dateSelectCard.data('eventdate') >= todaysDate ? dateSelectCard.show() : dateSelectCard.hide(); 

  $( "p:first" ).html( dateSelect );
});


// Checklist filter
$('#music, #dance, #theatre').on('change', evt => {
  var genreSelect = evt.target.id;
  var genreSelectCard = $(".card*[data-eventgenre*="+ genreSelect + "]");

  var filterGenre = $("input:checkbox[class=form-check-input]:not(:checked)").each(function(){
    var notChecked = $(this).attr("id");
    var dateSelectCard = $(".card*[data-eventgenre*="+ notChecked + "]").hide();
  })

  var checkedItems = $("input:checkbox[class=form-check-input]:checked").map(function() {
    return $(this).val();
  }).get();

  if ( $(evt.target).is(':checked') ) genreSelectCard.show();  
  filterGenre;

  if (checkedItems === undefined || checkedItems.length == 0) {
    $("[data-eventdate]").filter(function(){
      return $(this).attr("data-eventdate") >= todaysDate;
    }).show();
    console.log('No genres selected')
  }
  // console.log(checkedItems)
})


