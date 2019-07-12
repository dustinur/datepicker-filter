$(".eventItem").hide();

var checkedItems = [];
var boxesChecked;
var dateSelect;
var dateSelectCard;
var filterUnchecked;
var $filteredResults;
var genreSelect;
var genreSelectCard;


var d = new Date();
var month = d.getMonth() + 1;
var day = d.getDate();

var todaysDate = d.getFullYear() + "-" + (month < 10 ? "0" : "") + month + "-" + (day < 10 ? "0" : "") + day;

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

  // $('.eventItem').removeClass('hidden');

  $(".eventItem").hide();
  console.log(boxesChecked)

  if (boxesChecked === 0 || boxesChecked === undefined) {
    dateSelectCard.show();
  } else {
    dateSelectCard.hide().filter($filteredResults).show();
  }

  $("p:first").html(dateSelect);
  // console.log('Checked items: ' + checkedItems + ', Date selected: ' + dateSelect);
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

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
          currentFilterValues = $(this).data('eventgenre').split(' ');

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  //   $('.eventItem').hide().filter($filteredResults).show();
  //   hideOld();


  if (dateSelect === undefined) {
      $('.eventItem').hide().filter($filteredResults).show();
  } else {
    $(".eventItem*[data-eventdate*=" + dateSelect + "]").hide().filter($filteredResults).show();
  }


  boxesChecked = Object.values(selectedFilters).length;

  if (boxesChecked === 0 || boxesChecked === undefined) {
    if (dateSelect == undefined) {
      showAllDates();
    } else {
      dateSelectCard.show();
    }
  }
  
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

// console.log('Checked items: ' + checkedItems + ', Date selected: ' + dateSelect);



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