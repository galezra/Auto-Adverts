var today = new Date();
var index = 0;

var isAnyActiveMessage = 0;

// Start the web program
function start(screenId) {
    var socket = io();
    // Send screen id to server
    socket.emit('load messages', screenId);

    // get messages by id from server
    socket.on('load messages', function (data) {
        getMessages(data);
    });
}

function customStart(id,date,hour) {
    today = new Date(date);
    today.setHours(hour);
    var socket = io();
    // Send screen id to server
    socket.emit('load messages', id);

    // get messages by id from server
    socket.on('load messages', function (data) {
        getMessages(data);
    });

}
// var socket = io();
// socket.on('update message',function (data) {
//     console.log(data);
// });

// Get messages by socket
function getMessages(messages) {
    if (messages.length == 1) {
        if (checkIfToday(messages[0])) {
            showMessage(messages[0])
        }
        else {
            $(location).attr('href', './404.html');
            return 0;
        }
    }
    else {
        manageMessages(messages)
    }

}

// Manage messages
function manageMessages(messages) {

    for (index; index < messages.length; index++) {
        if (checkIfToday(messages[index])) {
            showMessage(messages[index]);
            setTimeoutForMessage(messages[index], messages);
            break;
        }
    }

    if (index >= messages.length) {
        if (!isAnyActiveMessage) {
            $(location).attr('href', './404.html');
            return 0;
        }
        index = 0;
        manageMessages(messages);
    }
}

// Check if the message can be show in correct time
function checkIfToday(message) {
    if (checkDate(message.date) && checkDay(message.days)) {
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
function checkDay(message) {
    var d = today.toLocaleString('en-us', {weekday: 'long'});
        for (var key in message) {
            var startHour = message[key][0];
            var endHour = message[key][1];
            if ((key == d) && (today.getHours() >= startHour && today.getHours() <= endHour)) {
                isAnyActiveMessage = 1;
                return 1;
            }
        }


    return 0;
}

// Set the json object on html tags
function showMessage(messageIn) {


    $("#myBody").load("./public/templates/" + messageIn.template, function () {
        $.each(messageIn.text, function (key, value) {
            $("ul#txt").append('<li>' + value + '</li>');

        });

        $.each(messageIn.images, function (key, value) {
            $("ul#images").append('<img width="250" height="200"  src="' + value + '"/>');

        })


    });
}

// Sync the messages by time
function setTimeoutForMessage(message, messages) {

    setTimeout(function () {
        index++;
        manageMessages(messages);
    }, message.showTime * 1000)
}

// Check if message can be display by id
function checkScreenId(messageId, id) {
    for (var x = 0; x < messageId.id.length; x++) {
        if (messageId.id[x] == id) {
            return 1;
            break;
        }

    }
}

