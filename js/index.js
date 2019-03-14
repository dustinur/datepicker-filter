$( ".card" ).hide();

var checkedItems = [];
var dateSelect;
var dateSelectCard;
var filterUnchecked;
var genreSelect;
var genreSelectCard;

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



// datepicker
$('.datepicker').datepicker({clearBtn: true}).on('changeDate', function(e){
  dateSelect = e.date.getFullYear() + '-' + ("0" + (e.date.getMonth() + 1)).slice(-2) + '-' + ("0" + (e.date.getDate())).slice(-2);
  dateSelectCard = $(".card*[data-eventdate*="+ dateSelect + "]");

    $( ".card" ).hide();
  
    if ( checkedItems.length === 0 ) {
        dateSelectCard.show();
    } else {
        $("input:checkbox[class=form-check-input]:checked").each(function(){
            $(".card*[data-eventdate*="+ dateSelect + "]*[data-eventgenre*="+ $(this).attr("id") + "]").show();
            hideOld();
        })
    }

  $( "p:first" ).html( dateSelect );
  
}).on('clearDate', function(e){
  showAllDates();
  dateSelect = undefined;
  $( "p:first" ).html( "No Date Selected" );
});



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
  
  if ( dateSelect === undefined ) {
    $("input:checkbox[class=form-check-input]:checked").each(function(){
      $(".card*[data-eventgenre*="+ $(this).attr("id") + "]").show();
      hideOld();
      console.log(dateSelect)
    })
  } else {
    $("input:checkbox[class=form-check-input]:checked").each(function(){
      $(".card*[data-eventdate*="+ dateSelect + "]*[data-eventgenre*="+ $(this).attr("id") + "]").show();
      hideOld();
    })
  }

  if ( checkedItems.length === 0 || checkedItems.length === undefined ) {
    if ( dateSelect == undefined ){
      showAllDates();
      console.log("No genre or date selected - All events shown")
    } else {
      dateSelectCard.show();
      console.log("No genre selected - All selected date events shown")
    }
  }
  
  console.log(checkedItems)

})


console.log(checkedItems)