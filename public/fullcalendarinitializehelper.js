
$(document).ready(function() {


    var userid=$('#userid').val();
    var ddate=$('#helperdate').datepicker('getDate');

    var calendar1=$('#calendar1').fullCalendar({

        defaultView:'agendaDay',
        theme: false,
        minTime:'07:00:00',
        maxTime:'22:00:00',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'agendaDay'
        },
       // defaultDate: ddate,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        selectable:true,
        select:function (start, end, allDay, event, resourseId) {
            $('#fullCalModal').modal();
            $('#appdate').datepicker("setDate",moment(start).format('MM/DD/yyyy'));
            $('#appdatefrom').timepicker("setTime",moment(start).format('HH:mm:ss'));
            $('#appdateto').timepicker("setTime",moment(end).format('HH:mm:ss'));



            $('#submitbtn').button();

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
                        $('#calendar').fullCalendar('refetchEvents');

                    },
                });

                calendar.fullCalendar('unselect');
                location.reload();
                return false;

            });




        },

        eventClick:  function(event, jsEvent, view) {

        },

        events: {


        },

        eventColor: '#00000'

    });



});

