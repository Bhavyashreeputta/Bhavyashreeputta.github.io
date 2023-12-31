// For simplicity this calendar has no backend.
// An event is displayed as a sentence below the event creation dialogue
// with the details of the event in readable English.


/////////////////////////////////////////////////////////////////////////////
// New Event Creation
/////////////////////////////////////////////////////////////////////////////

$(function() {
	$('#create-event-button').click(function() {
		if (checkInputs()) {
			
			writeEventToScreen(getEventText());
		}
		$('#start-time-row, #end-time-row').show();
		$('#all-day-event-checkbox').change(function() {
			if ($(this).is(':checked')) {
				$('#all-day-event-row').show();
				$('#start-time-row').hide();
				$('#end-time-row').hide();
			} else {
				$('#all-day-event-row').hide();
				$('#start-time-row').show();
				$('#end-time-row').show();
			}
		});
		clearInputs();
	});
   
});

// End time must come after start time
function isValidEndTime() {
	var startTime = $('#event-start-date').datetimepicker('getValue');
	var endTime = $('#event-end-date').datetimepicker('getValue');
    return !(endTime < startTime);
}
function checkInputs() 
{
	if (!$("#event-name").val()) {
		writeEventToScreen("Please enter event name");
		
		$("#event-name").addClass("error");
		$("#event-name").focus();
		return false;
	  }
	  if (!$("#event-location").val()) {
		writeEventToScreen("Please enter a location");
		$("#event-location").addClass("error");
		$("#event-location").focus();
		return false;
	  }
	
	  if ($("#all-day-event-checkbox").is(":checked")) {
		if (!$("#all-day-event-date").val()) {
		  writeEventToScreen("Please enter the date for an all day event");
		  $("#all-day-event-date").addClass("error");
		  $("#all-day-event-date").focus(function () {
			$("#all-day-event-date").datepicker("show");
		  });
		  $("#all-day-event-date").focus();
		  return false;
		} else if (
		  !$("#recurrent-event-end-date").val() &&
		  $("#recurrent-event-type-selector").val() != "none"
		) {
		  writeEventToScreen("Please enter the repeat end date");
		  $("#recurrent-event-end-date").addClass("error");
		  $("#recurrent-event-end-date").focus(function () {
			$("#recurrent-event-end-date").datepicker("show");
		  });
		  $("#recurrent-event-end-date").focus();
		  return false;
		} else if (
		  !$.isNumeric($("#daily-recurrent-freq").val()) ||
		  $("#daily-recurrent-freq").val() < 1
		) {
		  writeEventToScreen("Please enter a valid numeric value above 0");
		  $("#daily-recurrent-freq").focus();
		  return false;
		} else {
		  return true;
		}
	  }
	  if (!$("#event-start-date").val() && !$("#event-end-date").val()) {
		writeEventToScreen("Please enter the start date and end date.");
		$("#event-start-date").addClass("error");
		$("#event-end-date").addClass("error");
		$("#event-start-date").focus(function () {
		  $("#event-start-date").datepicker("show");
		});
		$("#event-start-date").focus();
		return false;
	  }
	
	  if (!$("#event-start-date").val()) {
		writeEventToScreen("Please enter a start date.");
		$("#event-start-date").focus(function () {
		  $("#event-start-date").datepicker("show");
		});
		$("#event-start-date").focus();
		return false;
	  }
	  if (!$("#event-end-date").val()) {
		writeEventToScreen("Please enter a end date.");
		$("#event-end-date").focus(function () {
		  $("#event-end-date").datepicker("show");
		});
		$("#event-end-date").focus();
		return false;
	  }

	if (!isValidEndTime()) {
		writeEventToScreen('End date must come after start date.');
		return false;
	}

	var frequency = $('#' + $('#recurrent-event-time-selector').val() + '-recurrent-freq').val();
	console.log(frequency);
	if (!$.isNumeric(frequency)) {
		writeEventToScreen('Frequency must be a numeric value.');
		return false;
	}

	return true;
}

// Functions for building the event string
function getWeeklyRepeatingDays() {
	var days = [];

	var weekdayIds = ['#weekday-sun', '#weekday-mon', '#weekday-tue', '#weekday-wed', '#weekday-thu', '#weekday-fri', 
		'#weekday-sat'];
	var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	for (i = 0; i < weekdayIds.length; i++) {
		if ($(weekdayIds[i]).is(':checked')) {
			days.push(weekdays[i]);
		}
	}

	return days;
}
function getMonthlyRepeatingDays() {
	var days = [];

	var monthdayIds = ['#month-1', '#month-2', '#month-3', '#month-4', '#month-5', '#month-6', '#month-7', '#month-8',
		'#month-9', '#month-10', '#month-11', '#month-12', '#month-13', '#month-14', '#month-15', '#month-16',
		'#month-17', '#month-18', '#month-19', '#month-20', '#month-21', '#month-22', '#month-23', '#month-24',
		'#month-25', '#month-26', '#month-27', '#month-28', '#month-29', '#month-30', '#month-31'];
	for (i = 0; i < monthdayIds.length; i++) {
		if ($(monthdayIds[i]).is(':checked')) {
			days.push(i+1);
		}
	}

	return days;
}
function getYearlyRepeatingMonths() {
	var months = [];

	var monthIds = ['#year-jan', '#year-feb', '#year-mar', '#year-apr', '#year-may', '#year-jun', '#year-jul', 
		'#year-aug', '#year-sept', '#year-oct', '#year-nov', '#year-dec'];
	var monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
	for (i = 0; i < monthIds.length; i++) {
		if ($(monthIds[i]).is(':checked')) {
			months.push(monthsNames[i]);
		}
	}

	return months;
}

function getWeeklyRepeatingString(arr) {
	var eventString = 'on every ';
	for (i = 0; i < arr.length-1; i++) {
		eventString += arr[i] + ', ';
	}
	if (arr.length > 1) {
		eventString += 'and ';
	}
	eventString += arr[arr.length-1] + ' of the week ';
	return eventString;
}
function getMonthlyRepeatingString(arr) {
	var eventString = 'on the ';
	for (i = 0; i < arr.length-1; i++) {
		eventString += arr[i] + ', ';
	}
	if (arr.length > 1) {
		eventString += 'and ';
	}
	eventString += arr[arr.length-1] + ' of the month ';
	return eventString;
}
function getYearlyRepeatingString(arr) {
	var eventString = 'in ';
	for (i = 0; i < arr.length-1; i++) {
		eventString += arr[i] + ', ';
	}
	if (arr.length > 1) {
		eventString += 'and ';
	}
	eventString += arr[arr.length-1] + ' on the corresponding day of the month(s) ';
	return eventString;
}



function getEventText() {
	var eventName = $('#event-name').val();
	var eventLocation = $('#event-location').val();

	var eventString = 'Event created: ' + eventName + ' at ' + eventLocation + ', ';

	var allDayEvent = $('#all-day-event-checkbox').is(':checked');
	if (allDayEvent) {
		var eventDate = $('#all-day-event-date').datetimepicker('getValue');
		eventString += 'an all day event on ' + eventDate;
	} else {
		var startTime = $('#event-start-date').datetimepicker('getValue');
		var endTime = $('#event-end-date').datetimepicker('getValue');
		eventString += 'starting at ' + startTime + ' and ending at ' + endTime;
	}

	var repeatOption = $('#recurrent-event-type-selector').val();
	if (repeatOption == 'none') {
		eventString += '.';
		return eventString;
	} else if (repeatOption == 'day') {
		eventString += ', repeating every day ';
	} else if (repeatOption == 'week') {
		eventString += ', repeating every week ';
	} else if (repeatOption == 'month') {
		eventString += ', repeating every month ';
	} else if (repeatOption == 'year') {
		eventString += ', repeating every year ';
	} else { // custom
		var frequencyOption = $('#recurrent-event-time-selector').val();
		var frequency = 1;
		var repeatingUnits = [];
		if (frequencyOption == 'daily') {
			frequency = $('#daily-recurrent-freq').val();
			eventString += ', ' + 'repeating every ' + frequency + ' day(s) ';
		} else if (frequencyOption == 'weekly') {
			frequency = $('#weekly-recurrent-freq').val();
			repeatingUnits = getWeeklyRepeatingDays();
			eventString += ', ' + 'repeating every ' + frequency + ' week(s) ' + getWeeklyRepeatingString(repeatingUnits);
		} else if (frequencyOption == 'monthly') {
			frequency = $('#monthly-recurrent-freq').val();
			repeatingUnits = getMonthlyRepeatingDays();
			eventString += ', ' + 'repeating every ' + frequency + ' month(s) ' + getMonthlyRepeatingString(repeatingUnits);
		} else { // yearly
			frequency = $('#yearly-recurrent-freq').val();
			repeatingUnits = getYearlyRepeatingMonths();
			eventString += ', ' + 'repeating every ' + frequency + ' year(s) ' + getYearlyRepeatingString(repeatingUnits);
		}
	}

	var endDate = $('#recurrent-event-end-date').datetimepicker('getValue');
	eventString += 'until ' + endDate + '.';
	return eventString;
}

function writeEventToScreen(eventString) {
	$('#new-event-text').text(eventString);
}