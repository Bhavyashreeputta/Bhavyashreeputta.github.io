$(function() {
    $(function() {
        $("#event-name").focus();
    });

    $("#event-start-date").datetimepicker();
    $("#event-end-date").datetimepicker();
    $("#all-day-event-date").datetimepicker({
      timepicker: false,
      onChangeDateTime: function (dp, $input) {
        var datetime = $input.val();
        var date = datetime.split(" ")[0];
        $input.val(date);
      },
    });
    $("#recurrent-event-end-date").datetimepicker();
  
    $("#event-location").on("LocationLog", function (e) {
      console.log(e);
    });
    $("#all-day-event-checkbox").on("AllDayCheck", function (e) {
      console.log(e);
    });
    $("#all-day-event-date").on("StartDateCheck", function (e) {
      console.log(e);
    });
  
    $("#event-end-date").on("EnddateCheck", function (e) {
      console.log(e);
    });
    $("#recurrent-event-type-selector").on("RepeatEndDate", function (e) {
      console.log(e);
    });
    $("#recurrent-event-end-date").on("RecselectRecenddate", function (e) {
      console.log(e);
    });
    $("#event-start-date").on("StartdateError", function (e) {
      console.log(e);
    });
    $("#event-end-date").on("EndDateError", function (e) {
      console.log(e);
    });
    $("#recurrent-event-end-date").on("RepeatDateError", function (e) {
      console.log(e);
    });
    $("#all-day-event-date").on("AlldayError", function (e) {
      console.log(e);
    });
  
    $("#event-name").on("change", function (e) {
      if ($("#event-name").val()) {
        $("#event-location").focus();
  
        var event = new CustomEvent("LocationLog", {
          detail: {
            which: true,
            pageX: true,
            pageY: true,
          },
        });
        $("#event-location").trigger("log", ["LocationLog"]);
      }
    });
    $("#event-location").on("change", function (e) {
      if ($("#event-location").val()) {
        $("#all-day-event-checkbox").focus();
        var event = new CustomEvent("AllDayCheck", {
          detail: {
            which: true,
            pageX: true,
            pageY: true,
          },
        });
        $("#all-day-event-checkbox").trigger("log", ["AllDayCheck"]);
      }
    });
  
    
    $("#all-day-event-checkbox").change(function () {
      if (this.checked) {
        showAllDayEventOptions();
        var event = new CustomEvent("StartDateCheck", {
          detail: {
            getelement: true,
          },
        });
        $("#all-day-event-date").trigger("log", ["StartDateCheck"]);
      } else {
        hideAllDayEventOptions();
      }
    });
  
    $("#all-day-event-date").on("change", function (e) {
      if (Date.parse($("#all-day-event-date").val())) {
        $("#recurrent-event-type-selector").focus();
        var event = new CustomEvent("EnddateCheck", {
          detail: {
            getelement: true,
          },
        });
        $("#recurrent-event-type-selector").trigger("log", [
          "StartDateCheck",
        ]);
      } else {
        console.log("not a valid date");
        DateErrorHandling("all-day-event-date");
        var event = new CustomEvent("AlldayError", {
          detail: {
            getelement: true,
          },
        });
        $("#all-day-event-date").trigger("log", ["AlldayError"]);
      }
    });
  
    $("#event-start-date").on("change", function (e) {
      if (Date.parse($("#event-start-date").val())) {
        $("#event-end-date").focus(function () {
          $("#event-end-date").datepicker("show");
        });
        $("#event-end-date").focus();
  
        var event = new CustomEvent("EnddateCheck", {
          detail: {
            getelement: true,
          },
        });
        $("#event-end-date").trigger("log", ["EnddateCheck"]);
      } else {
        console.log("not a valid date");
        DateErrorHandling("event-start-date");
        var event = new CustomEvent("StartdateError", {
          detail: {
            getelement: true,
          },
        });
        $("#event-start-date").trigger("log", ["StartdateError"]);
      }
    });
  
    $("#event-end-date").on("change", function (e) {
      if (Date.parse($("#event-end-date").val())) {
        $("#recurrent-event-type-selector").focus();
        var event = new CustomEvent("RepeatEndDate", {
          detail: {
            getelement: true,
          },
        });
        $("#recurrent-event-type-selector").trigger("log", ["RepeatEndDate"]);
      } else {
        console.log("not a valid date");
        DateErrorHandling("event-end-date");
        var event = new CustomEvent("EndDateError", {
          detail: {
            getelement: true,
          },
        });
        $("#event-end-date").trigger("log", ["EndDateError"]);
      }
    });
  
    $("#recurrent-event-type-selector").change(function (e) {
      var val = $("#recurrent-event-type-selector option:selected").val();
      hideRecurrentEventOptions();
      hideRecurrentEventDetails();
  
      if (val == "custom") {
        showRecurrentEventOptions();
      } else {
        resetAllRecurrentEventDetails();
      }
  
      if (val == "none") {
        hideRecurrentEventEndDetails();
      } else {
        showRecurrentEventEndDetails();
      }
    });
  
    $("#recurrent-event-type-selector").on("change", function (e) {
      console.log($("#recurrent-event-type-selector").val());
      if ($("#recurrent-event-type-selector").val() != "none") {
        $("#recurrent-event-end-date").focus(function () {
          $("#recurrent-event-end-date").datepicker("show");
  
          var event = new CustomEvent("RecselectRecenddate", {
            detail: {
              getelement: true,
            },
          });
          $("#recurrent-event-end-date").trigger("log", ["RecselectRecenddate"]);
        });
        $("#recurrent-event-end-date").focus();
      }
    });
  
    $("#recurrent-event-end-date").on("change", function (e) {
      // if (
      //   $("#recurrent-event-end-date").val() != "" &&
      //   $("#recurrent-event-type-selector").val() == "custom"
      // ) {
      //   console.log("enterd");
      //   $("#recurrent-event-time-selector").focus();
      // }
      if (Date.parse($("#recurrent-event-end-date").val())) {
        if ($("#recurrent-event-type-selector").val() == "custom") {
          $("#recurrent-event-time-selector").focus();
        } else {
          $("#create-event-button").focus();
        }
      } else {
        console.log("not a valid date");
        DateErrorHandling("recurrent-event-end-date");
        var event = new CustomEvent("RepeatDateError", {
          detail: {
            getelement: true,
          },
        });
        $("#recurrent-event-end-date").trigger("log", ["RepeatDateError"]);
      }
    });
  
    $("#recurrent-event-time-selector").change(function (e) {
      var val = $("#recurrent-event-time-selector option:selected").val();
      hideRecurrentEventDetails();
  
      if (val == "daily") {
        $("#daily-recurrent-details").show();
      } else if (val == "weekly") {
        $("#weekly-recurrent-details").show();
      } else if (val == "monthly") {
        $("#monthly-recurrent-details").show();
      } else if (val == "yearly") {
        $("#yearly-recurrent-details").show();
      }
      $("#daily-recurrent-freq").focus();
    });
  
    $("#daily-recurrent-freq").change(function (e) {
      if (
        !$.isNumeric($("#daily-recurrent-freq").val()) ||
        $("#daily-recurrent-freq").val() < 1
      ) {
        $("#errormessage").css({ display: "block", color: "tomato" });
        $("#daily-recurrent-freq").focus();
      } else {
        $("#errormessage").css("display", "none");
        $("#create-event-button").focus();
      }
    });
  
    $("input[type=text]").focus(function () {
      $(this).select();
    });
  });


// Functions to reset recurrent event interface
function hideRecurrentEventDetails() {
    $('#daily-recurrent-details').hide();
    $('#weekly-recurrent-details').hide();
    $('#monthly-recurrent-details').hide();
    $('#yearly-recurrent-details').hide();
}
function hideRecurrentEventOptions() {
    $('#recurrent-event-details-line').hide();
    $('#recurrent-event-details').hide();
}
function showRecurrentEventOptions() {
    $('#recurrent-event-details-line').show();
    $('#recurrent-event-details').show();
    $('#daily-recurrent-details').show();
}
function resetAllRecurrentEventDetails() {
    $('#recurrent-event-time-selector').val('daily');
    $('.weekday-checkbox').prop('checked', false);
    $('.day-checkbox').prop('checked', false);
    $('.month-checkbox').prop('checked', false);
}
function showAllDayEventOptions() {
    $('#start-time-row').hide();
    $('#end-time-row').hide();
    $('#all-day-event-row').show();
}
function hideAllDayEventOptions() {
    $('#all-day-event-row').hide();
    $('#start-time-row').show();
    $('#end-time-row').show();
    $('#all-day-event-date').val('');
}
function showRecurrentEventEndDetails() {
    $('#recurrent-event-end-date-row').show();
}
function hideRecurrentEventEndDetails() {
    $('#recurrent-event-end-date-row').hide();
    $('#recurrent-event-end-date').val('');
}

// hacky way to get the button to accommodate size of hidden divs in Safari
function hideAndShowCreateEventButtom() {
    $('#create-event-button').hide();
    $('#create-event-button').show();
}

  // This function clears all input fields
  function clearInputs() {
      document.getElementById('event-name').value = '';
      document.getElementById('event-location').value = '';
      document.getElementById('event-start-date').value = '';
      document.getElementById('event-end-date').value = '';
      document.getElementById('all-day-event-checkbox').checked = false;
      document.getElementById('recurrent-event-type-selector').value = 'none';
      document.getElementById('recurrent-event-end-date-row').value = '';
      document.getElementById('all-day-event-date').value = '';
      // document.getElementById('recurrent-event-end-date-row').classList.add('hidden');
  }