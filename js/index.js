$(".eventItem").hide();

var checkedItems = [];
var dateSelect;
var dateSelectCard;
var filterUnchecked;
var genreSelect;
var genreSelectCard;

var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();

var todaysDate =
    d.getFullYear() +
    "-" +
    (month < 10 ? "0" : "") +
    month +
    "-" +
    (day < 10 ? "0" : "") +
    day;

function showAllDates() {
  $("[data-eventdate]")
    .filter(function() {
    return $(this).attr("data-eventdate") >= todaysDate;
  })
    .show();
}

function hideOld() {
  $("[data-eventdate]")
    .filter(function() {
    return $(this).attr("data-eventdate") < todaysDate;
  })
    .hide();
}

function showDateEventMatch() {
  $("input:checkbox[class=form-check-input]:checked").each(function() {
    $(
      ".eventItem*[data-eventdate*=" +
      dateSelect +
      "]*[data-eventgenre*=" +
      $(this).attr("id") +
      "]"
    ).show();
    hideOld();
  });
}

showAllDates();


// Datepicker
$(".datepicker")
  .datepicker({ clearBtn: true })
  .on("changeDate", function(e) {
  dateSelect =
    e.date.getFullYear() +
    "-" +
    ("0" + (e.date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + e.date.getDate()).slice(-2);
  dateSelectCard = $(".eventItem*[data-eventdate*=" + dateSelect + "]");

  $(".eventItem").hide();

  if (checkedItems.length === 0) {
    dateSelectCard.show();
  } else {
    showDateEventMatch();
  }

  $("p:first").html(dateSelect);
  console.log('Checked items: ' + checkedItems + ', Date selected: ' + dateSelect);

})
  .on("clearDate", function(e) {
  showAllDates();
  dateSelect = undefined;
  $("p:first").html("No Date Selected");
});


// Genre Checklist
$(".form-check-input").on("change", evt => {
  genreSelect = evt.target.id;
  genreSelectCard = $(".eventItem*[data-eventgenre*=" + genreSelect + "]");

  filterUnchecked = $(
    "input:checkbox[class=form-check-input]:not(:checked)"
  ).each(function() {
    $(".eventItem*[data-eventgenre*=" + $(this).attr("id") + "]").hide();
  });

  checkedItems = $("input:checkbox[class=form-check-input]:checked")
    .map(function() {
    return $(this).val();
  })
    .get();

  if (dateSelect === undefined) {
    $("input:checkbox[class=form-check-input]:checked").each(function() {
      $(".eventItem*[data-eventgenre*=" + $(this).attr("id") + "]").show();
      hideOld();
    });
  } else {
    showDateEventMatch();
  }

  if (checkedItems.length === 0 || checkedItems.length === undefined) {
    if (dateSelect == undefined) {
      showAllDates();
    } else {
      dateSelectCard.show();
    }
  }
  console.log('Checked items: ' + checkedItems + ', Date selected: ' + dateSelect);
});

$( ".clear" ).click(function() {
  $( ".form-check-input" ).prop( "checked", false );
  dateSelect = undefined;
  checkedItems = [];
  showAllDates();
  $("p:first").html("No Date Selected");
  console.log('Checked items: ' + checkedItems + ', Date selected: ' + dateSelect);
});


// Search

$('[data-search]').on('keyup', function() {
	var searchVal = $(this).val();
	var filterItems = $('.eventItem');

	if ( searchVal != '' ) {
		filterItems.addClass('hidden');
		$('.eventItem[data-eventartist*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
		$('.eventItem[title*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
	} else {
		filterItems.removeClass('hidden');
	}
});

console.log('Checked items: ' + checkedItems + ', Date selected: ' + dateSelect);
