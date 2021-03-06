
$(document).ready(function() {
var userid=$('#userid').val();

    var calendar=$('#calendar').fullCalendar({


        theme: false,
        minTime:'07:00:00',
        maxTime:'22:00:00',
        timezone:'local',
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
            $('#Options').modal();
            $('#appdate').datepicker("setDate",moment(start).format('MM/DD/yyyy'));
            $('#appdatefrom').timepicker("setTime",moment(start).format('07:00:00 a'));
            $('#appdateto').timepicker("setTime",moment(end).format('07:30:00 a'));

            //private
            $('#pdate').datepicker("setDate",moment(start).format('MM/DD/yyyy'));
            $('#pdatefrom').timepicker("setTime",moment(start).format('07:00:00 a'));
            $('#pdateto').timepicker("setTime",moment(end).format('07:30:00 a'));



            $('#submitbtn').button();

            $('#privatesubmit').button();
            $('#privatesubmit').click(function() {

                var start = $('#pdate').datepicker('getDate');
                var starttime = $('#pdatefrom').val();
                var endtime = $('#pdateto').val();

                var atitle=$('#pptitle').val();
                var aname=$('#ppname').val();
                var asurname=$('#ppsurname').val();

                start=moment(start).format();
                var aend2=moment(start).format();

                var tstarttime=start;
                var t2starttime=start;

                var fstart=tstarttime.substr(0, 11) + starttime + t2starttime.substr(19,start.length);

                var tend=aend2;
                var t2end=aend2;

                var fend=tend.substr(0, 11) + endtime + t2end.substr(19,start.length);

                alert("Congratulations... Your appointment has been placed!!");

                $.ajax({
                    url: '/calendar/add_app_private',
                    type: 'post',
                    data: {

                        appdate: fstart,
                        appdatefrom: fend,
                        apptitle:atitle,
                        appname:aname,
                        appsurname:asurname,
                        userid:userid

                    },
                    dataType: "json",
                    async: true,

                    // mongod is expecting the parameter name to be called "jsonp"

                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('error',errorThrown,textStatus);
                    },

                    success: function (data) {
                        // title:data.title + data.start;

                        console.log("closing",data);
                        calendar.fullCalendar('unselect');

                        $('#PersonalCal').modal('hide');//close the modal
                        $("#privatesubmit").button('reset');

                    },
                });
                $('#calendar').fullCalendar('refetchEvents');

                calendar.fullCalendar('unselect');
                location.reload();
                return false;


            });





            $('#submitbtn').click(function() {
                var start = $('#appdate').datepicker('getDate');
                var starttime = $('#appdatefrom').val();
                var endtime = $('#appdateto').val();

                var atitle=$('#title').val();
                var aname=$('#pname').val();
                var asurname=$('#psurname').val();
                var description=$('#description').val();
                var drid=$('#drname').val();
                var drname=$('#drname option:selected').text();




                // start = moment.utc(start).format();
                // starttime=moment(starttime).format('HH:mm');
                // endtime=moment(endtime).format('HH:mm');


                start=moment(start).format();
                var aend2=moment(start).format();

                var tstarttime=start;
                var t2starttime=start;

                var fstart=tstarttime.substr(0, 11) + starttime + t2starttime.substr(19,start.length);

                var tend=aend2;
                var t2end=aend2;

                var fend=tend.substr(0, 11) + endtime + t2end.substr(19,start.length);


                alert("Congratulations... Your appointment has been placed!!");

                $.ajax({
                    url: '/calendar/add_app',
                    type: 'post',
                    data: {

                        appdate: fstart,
                        appdatefrom: fend,
                        apptitle:atitle,
                        appname:aname,
                        appsurname:asurname,
                        userid:userid,
                        description:description,
                        drname:drname,
                        drID:drid

                    },
                    dataType: "json",
                    async: true,

                    // mongod is expecting the parameter name to be called "jsonp"

                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('error',errorThrown,textStatus);
                    },

                    success: function (data) {
                        // title:data.title + data.start;

                        console.log("closing",data);
                        calendar.fullCalendar('unselect');

                        $('#fullCalModal').modal('hide');//close the modal
                        $("#submitbtn").button('reset');

                    },
                });
                $('#calendar').fullCalendar('refetchEvents');

                calendar.fullCalendar('unselect');
                location.reload();
                return false;

            });





        },

        eventClick:  function(event, jsEvent, view) {
            console.log('tell me the customerid',event.customerId);

            $('#fullCalModal2').modal();
            $('#appdate1').datepicker("setDate",moment(event.start).format('MM/DD/yyyy'));
            $('#appdatefrom1').timepicker("setTime",moment(event.start).format('HH:mm:ss a'));
            $('#appdateto1').timepicker("setTime",moment(event.end).format('HH:mm:ss a'));
            $('#npname').val(event.name);
            $('#npsurname').val(event.surname);
            $('#ndrname').val(event.drname);
            $('#doctornote').val(event.description);

            $('#editdate').datepicker("setDate",moment().format('MM/DD/yyyy'));
            $('#editfrom').timepicker("setTime",moment().format('HH:mm:ss'));
            $('#editto').timepicker("setTime",moment().format('HH:mm:ss'));






            $("#eventsave_add").off('click').on('click', function( event3 ) {
                var cust2 = {};
                var start = $('#appdate').datepicker('getDate');
                var starttime = $('#appdatefrom').val();
                var endtime = $('#appdateto').val();



            })


            $('#editsubmit').button();

            $('#editsubmit').click(function() {
                var start = $('#editdate').datepicker('getDate');
                var starttime = $('#editfrom').val();
                var endtime = $('#editto').val();

                var aname=$('#editname').val();
                var asurname=$('#editsurname').val();
                var description=$('#editnote').val();
                var drname=$('#editdrname').val();



                // start = moment.utc(start).format();
                // starttime=moment(starttime).format('HH:mm');
                // endtime=moment(endtime).format('HH:mm');


                start=moment(start).format();
                var aend2=moment(start).format();

                var tstarttime=start;
                var t2starttime=start;

                var fstart=tstarttime.substr(0, 11) + starttime + t2starttime.substr(19,start.length);

                var tend=aend2;
                var t2end=aend2;

                var fend=tend.substr(0, 11) + endtime + t2end.substr(19,start.length);


                alert("Congratulations... Your appointment has been updated!!");

                $.ajax({
                    url: '/calendar/update_app',
                    type: 'post',
                    data: {

                        appdate: fstart,
                        appdatefrom: fend,
                        appname:aname,
                        appsurname:asurname,
                        userid:userid,
                        description:description,
                        drname:drname,
                        AppID:event.AppID

                    },
                    dataType: "json",
                    async: true,

                    // mongod is expecting the parameter name to be called "jsonp"

                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        console.log('error',errorThrown,textStatus);
                    },

                    success: function (data) {
                        // title:data.title + data.start;

                        console.log("closing",data);
                        calendar.fullCalendar('unselect');

                        $('#fullCalModal2').modal('hide');//close the modal
                        $("#editsubmit").button('reset');
                        $('#calendar').fullCalendar('refetchEvents');

                    },
                });

                calendar.fullCalendar('unselect');
                location.reload();
                return false;

            });

        },

        events: {
            url: '/calendar/get_appointments',
            type: 'post',
            data: {userid:userid,AppID:event.AppID},
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

