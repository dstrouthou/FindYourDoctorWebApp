
$(document).ready(function() {


    $('#DrMarkSpencerModal').on('shown.bs.modal', function () {
        $("#calendarMarks").fullCalendar('render');
    });

    $('#DrMelanieYouModal').on('shown.bs.modal', function () {
        $("#calendarMelanie").fullCalendar('render');
    });

    $('#DrJessicaJamesModal').on('shown.bs.modal', function () {
        $("#calendarJessica").fullCalendar('render');
    });

    $('#DrMariaGameModal').on('shown.bs.modal', function () {
        $("#calendarMaria").fullCalendar('render');
    });

    $('#DrDanielEightModal').on('shown.bs.modal', function () {
        $("#calendarDaniel").fullCalendar('render');
    });

    $('#DrDavidSharpModal').on('shown.bs.modal', function () {
        $("#calendarDavid").fullCalendar('render');
    });

    $('#DrBryanDierModal').on('shown.bs.modal', function () {
        $("#calendarBryan").fullCalendar('render');
    });

    $('#DrDrakeBrownModal').on('shown.bs.modal', function () {
        $("#calendarDrake").fullCalendar('render');
    });

    $('#DrEmilyDookeModal').on('shown.bs.modal', function () {
        $("#calendarEmily").fullCalendar('render');
    });

    var userid=$('#userid').val();

    var calendar1=$('#calendarMarks').fullCalendar({

        defaultView:'month',
        timezone:'local',
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
            url: '/settings/get_appointments_Marks',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });


    var calendar2=$('#calendarMelanie').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Melanie',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

    var calendar3=$('#calendarJessica').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Jessica',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

    var calendar4=$('#calendarMaria').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Maria',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });


    var calendar5=$('#calendarDaniel').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Daniel',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

    var calendar6=$('#calendarDavid').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_David',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

    var calendar7=$('#calendarBryan').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Bryan',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

    var calendar8=$('#calendarDrake').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Drake',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

    var calendar9=$('#calendarEmily').fullCalendar({

        defaultView:'month',
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
            url: '/settings/get_appointments_Emily',
            type: 'post',
            data: {},
            success: function (data) {
                // title:data.title + data.start;

            },

            error: function() {
                alert('there was an error while fetching events!');
            },

            // color: '#5CC4C2',   // a non-ajax option
            textColor: 'black',
            // 'backgroundColor' : '#FF6666',
            editable:false,
            // a non-ajax option

        },

        eventColor: '#00000'

    });

});

