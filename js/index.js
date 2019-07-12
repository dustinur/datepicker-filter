// Hide all event cards
$(".eventItem").hide();

var checkedItems = [];
var boxesChecked;
var dateSelect;
var dateSelectCard;
var filterUnchecked;
var $filteredResults;
var genreSelect;
var genreSelectCard;

// Convert date to data-eventdate format, ex. 2020-12-31
var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();
var todaysDate = d.getFullYear() + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;


// Show all events newer than current date
function showAllDates() {
  $("[data-eventdate]")
    .filter(function() {
    return $(this).attr("data-eventdate") >= todaysDate;
  })
    .show();
}

// Hide events older than current date
function hideOld() {
  $("[data-eventdate]")
    .filter(function() {
    return $(this).attr("data-eventdate") < todaysDate;
  })
    .hide();
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

  $('.eventItem').removeClass('hidden');

  $(".eventItem").hide();
  console.log(boxesChecked)

  if (boxesChecked === 0 || boxesChecked === undefined) {
    dateSelectCard.show();
  } else {
    dateSelectCard.hide().filter($filteredResults).show();
  }

  $("p:first").html(dateSelect);
})




// Genre Checklist
var $filterCheckboxes = $('input[type="checkbox"]');

$filterCheckboxes.on('change', function() {

  var selectedFilters = {};

  $filterCheckboxes.filter(':checked').each(function() {

    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);

  });

  // create a collection containing all of the filterable elements
  $filteredResults = $('.eventItem');

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .eventItem element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
          currentFilterValues = $(this).data('eventgenre').split(' ');

      // loop over each category value in the current .eventItem's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .eventItem element is returned
      return matched;
    });
  });

  // If day is selected with datepicker, only show eventItems for that date
  if (dateSelect === undefined) {
    $('.eventItem').hide().filter($filteredResults).show();
  } else {
    dateSelectCard.hide().filter($filteredResults).show();
  }

  // If all checkboxes are unchecked, show all eventItems for selected date only
  boxesChecked = Object.values(selectedFilters).length;

  if (boxesChecked === 0 || boxesChecked === undefined) {
    if (dateSelect == undefined) {
      showAllDates();
    } else {
      dateSelectCard.show();
    }
  }

  // Hide eventCards with event date older then current calendar day
  hideOld();

});


// Refresh search
$( ".clear" ).click(function() {
  location.reload(true);
});

// Uncheck genre checkbox
$(".eventItem").click(function(){
  boxesChecked === 0;
  $( ".form-check-input" ).prop( "checked", false );
  showAllDates();
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


// Lazy Load Images
document.addEventListener("DOMContentLoaded", function() {
  var lazyloadImages = document.querySelectorAll("img.lazy");    
  var lazyloadThrottleTimeout;

  function lazyload () {
    if(lazyloadThrottleTimeout) {
      clearTimeout(lazyloadThrottleTimeout);
    }    

    lazyloadThrottleTimeout = setTimeout(function() {
      var scrollTop = window.pageYOffset;
      lazyloadImages.forEach(function(img) {
        if(img.offsetTop < (window.innerHeight + scrollTop)) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      });
      if(lazyloadImages.length == 0) { 
        document.removeEventListener("scroll", lazyload);
        window.removeEventListener("resize", lazyload);
        window.removeEventListener("orientationChange", lazyload);
      }
    }, 20);
  }

  document.addEventListener("scroll", lazyload);
  window.addEventListener("resize", lazyload);
  window.addEventListener("orientationChange", lazyload);
});