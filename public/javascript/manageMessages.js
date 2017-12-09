    var today = new Date();
    var index = 0;
    var url = $(location).attr('href');
    var screenId = url.charAt(url.length - 1);
    var isAnyActiveMessage = 0;
    /*
    var message1 = {
        name: "message1",
        id: [1, 2],
        text: ["Best service", "Good Quality", "Perfect Job", "Nice Place"],
        images: ["../images/msg1.png", "../images/msg1.2.gif"],
        template: "templateA",
        showTime: 4,
        time: [{date: ["01-01-2017", "12-30-2017"], days: [{Thursday:["6", "24"], Wednesday:["13", "20"]}]}]
    };
    var message2 = {
        name: "message2",
        id: [1, 3],
        text: ["Customize your ad title or text based on search queries", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Apply default text and character limits", "Automatically customize with text ad parameters.", "Change the destination URL based on search queries.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters.", "Automatically customize with text ad parameters."],
        images: ["../images/msg2.gif"],
        template: "templateB",
        showTime: 4,
        time: [{date: ["01-01-2017", "12-30-2017"], days: [{Monday:["10", "12"], Wednesday:["10", "10"]}]}]
    };
    var message3 = {
        name: "message3",
        id: [1, 3],
        text: [],
        images: [],
        template: "templateC",
        showTime: 5,
        time: [{date: ["03-1-2017", "04-30-2017"], days: [{Sunday:["8", "22"],Monday:["8", "22"],Tuesday:["8", "22"], Wednesday:["8", "22"], Thursday:["8", "22"], Friday:["8", "22"], Saturday:["8", "22"]}]}]
    };
    var message4 = {
        name: "message4",
        id: [1],
        text: ["text1", "text2"],
        images: [],
        template: "templateA",
        showTime: 4,
        time: [{date: ["03-29-2017", "04-15-2017"], days: [{Monday:["15", "19"]}]}]
    };
    var message5 = {
        name: "message5",
        id: [3],
        text: ["text1", "text2", "text3", "text4", "text5", "text6", "text7"],
        images: ["http://www.free.fr/freebox/im/logo_free.png", "http://www.free.fr/freebox/im/logo_free.png"],
        template: "templateC",
        showTime: 4,
        time: [{date: ["04-01-2017", "04-30-2017"], days: [{Monday:["1", "23"],Tuesday:["1", "23"], Wednesday:["1", "23"]}]}]
    };
    */

// Create arrays of the messages and start the program
var msgTest = new Array();

// Start the web program
    function start() {
        getMessages(screenId)
    }

// Get messages from database
    function getMessages(id){
        var parameters = { id: id };
        $.ajax({url: "/loadMessagesId",data:parameters, success: function(result){
              msgTest = result;
            console.log(msgTest)
            },complete: function () {
            if(msgTest.length == 1)
            {
                if(checkIfToday(msgTest[0].time[0])){
                    showMessage(msgTest[0])
                }
                else{
                $(location).attr('href', './404.html');
                return 0;
                 }
            }
            else{
                manageMessages(msgTest,screenId)
            }


            }});
    }

// Manage message
    function manageMessages(messages,id) {

        for (index; index < messages.length; index++) {
            if(checkScreenId(messages[index], id)){
                if (checkIfToday(messages[index].time[0])) {
                    showMessage(messages[index]);
                    setTimeoutForMessage(messages[index],id);
                    break;
                }
            }

        }

        if (index >= messages.length) {
            if(!isAnyActiveMessage){
                $(location).attr('href', './404.html');
                return 0;
            }
            index = 0;
            manageMessages(msgTest,id);
        }

    }

// Sync the messages by time
    function setTimeoutForMessage(message,id) {
        index++;
        setTimeout(function () {
            manageMessages(msgTest,id);
        }, message.showTime * 1000)
    }

// Set the json object on html tags
    function showMessage(messageIn) {


        $("#myBody").load("./public/templates/" + messageIn.template, function () {
            $.each(messageIn.text, function (key, value) {
                $("ul#txt").append('<li>'+value+'</li>');

            });

            $.each(messageIn.images, function (key, value) {
                $("ul#images").append('<img width="300"  src="' + value + '"/>');

            })


        });
    }

// Check if the message can be show in correct time
    function checkIfToday(message) {
        if(checkDate(message.date) && checkDay(message.days)){
        return 1;
        }
            return 0;
    }

// Check if  message can be display by the date.
    function checkDate(messageDate) {
        //Set the start and end date of message
        var startMessageDate = new Date(messageDate[0]);
        var endMessageDate = new Date(messageDate[1]);
        if (today > startMessageDate && today < endMessageDate) {
            return 1;
        }
        return 0;
    }

// Check if message can be display by day
   function checkDay(message){
        var d = today.toLocaleString('en-us', {  weekday: 'long' });
    for (var i=0;i<message.length;i++)
    {
        var days= message[i];
        for (var key in days)
        {
            var startHour = days[key][0];
            var endHour = days[key][1];
            if((key == d) && (today.getHours() >=startHour && today.getHours() <=endHour) )
            {
                isAnyActiveMessage = 1;
                return 1;
            }
        }

    }
    return 0;
   }

// Check if message can be display by id
    function checkScreenId(messageId, id) {
        for(var x=0;x<messageId.id.length;x++){
            if(messageId.id[x] == id){
                return 1;
                break;
            }

        }
    }



