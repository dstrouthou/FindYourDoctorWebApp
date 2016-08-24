
$(document).ready(function() {


    var userid=$('#userid').val();

    var calendar1=$('#calendar1').fullCalendar({

        defaultView:'agendaWeek',
        theme: false,
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        // defaultDate: '2016-06-12',
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        selectable:true,
        select:function (start, end, allDay, event, resourseId) {





        },

        eventClick:  function(event, jsEvent, view) {

        },

        events: {


        },

        eventColor: '#00000'

    });



});

