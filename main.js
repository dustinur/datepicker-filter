$(".card").hide();
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

$(document).ready(function() {
  $(".datepicker")
    .datepicker()
    .on("changeDate", function(e) {
      var dayText = e.date.getDate();
      var monthText = ("0" + (e.date.getMonth() + 1)).slice(-2);
      var yearText = e.date.getFullYear();
      var selectDate = yearText + "-" + monthText + "-" + dayText;
      // var cardDate = $('.card').attr('data-eDate');

      $(".card").hide();

      if ($(".card*[data-eDate*=" + selectDate + "]") >= todaysDate) {
        $(".card*[data-eDate*=" + selectDate + "]").show();
        console.log("Too late");
      } else {
        console.log("Too late");
      }
      // $(".card*[data-eDate*="+ selectDate + "]").show();

      // console.log( todaysDate );
      $("p:first").html(selectDate);
    });
});
