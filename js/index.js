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

function hideOld() { 
  $("[data-eventdate]").filter(function(){
    return $(this).attr("data-eventdate") < todaysDate;
  }).hide();
}

showAllDates();

var genreSelect;
var genreSelectCard;
var filterUnchecked;
var checkedItems;
var dateSelect;
var dateSelectCard;

// datepicker
$('.datepicker').datepicker({clearBtn: true}).on('changeDate', function(e){
  dateSelect = e.date.getFullYear() + '-' + ("0" + (e.date.getMonth() + 1)).slice(-2) + '-' + ("0" + (e.date.getDate())).slice(-2);
  dateSelectCard = $(".card*[data-eventdate*="+ dateSelect + "]");

  $( ".card" ).hide();    
  dateSelectCard.data('eventdate') >= todaysDate ? dateSelectCard.show() : dateSelectCard.hide(); 

  $( "p:first" ).html( dateSelect );
  console.log(dateSelect);
  
}).on('clearDate', function(e){
  showAllDates();
  dateSelect = undefined;
  $( "p:first" ).html( "No Date Selected" );
});

// $(".card*[data-eventdate*="+ dateSelect + "]*[data-eventgenre*="+ genreSelect + "]").show();


// genre checklist
$('#music, #dance, #theatre').on('change', evt => {
  genreSelect = evt.target.id;
  genreSelectCard = $(".card*[data-eventgenre*="+ genreSelect + "]");

  filterUnchecked = $("input:checkbox[class=form-check-input]:not(:checked)").each(function(){
    var notChecked = $(this).attr("id");
    var genreSelectCard = $(".card*[data-eventgenre*="+ notChecked + "]").hide();
  })

  checkedItems = $("input:checkbox[class=form-check-input]:checked").map(function() {
    return $(this).val();
  }).get();

  filterChecked = $("input:checkbox[class=form-check-input]:checked").each(function(){
    $(".card*[data-eventgenre*="+ $(this).attr("id") + "]").show();
    hideOld();
  })
  
  // if ( $(evt.target).is(':checked') ) genreSelectCard.show();  
  filterUnchecked;

  if (checkedItems.length == 0) {
    showAllDates();
    console.log(checkedItems)
  }
  console.log("genre selected: " + checkedItems + ", date selected: " + dateSelect)
})







// $("#all").on("click", function () { 
//   showAllDates();
// });

// if ( dateSelect === undefined ) showAllDates();

// $("#dateSelected").on("click", function () {
//   if ( !$( "td" ).hasClass( "active" ) ) { 
//     dateSelect= 0;
//     showAllDates(); 
//   };
//   console.log(dateSelect);
// });





