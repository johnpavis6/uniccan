var email = $('meta[name="user-email"]').attr('content');
var receiver_detail = $('meta[for="receiver-detail"]'),
    receiver = {};
for (var i = 0; i < receiver_detail.length; i++) {
    receiver[$(receiver_detail[i]).attr('name')] = $(receiver_detail[i]).attr('content');
}
console.info(receiver);
addMessage = function (data) {
    console.log(data);
    var date = new Date(data.datetime);
    var h = date.getHours(),
        m = date.getMinutes(),
        mm = 'am';
    if (h > 12) {
        h -= 12;
        mm = 'pm';
    }
    if (m < 10) {
        m = '0' + m;
    }
    var last = $('.date:last'),
        now = date.toDateString();;
    var html = '';
    if (!last.length) {
        html += `<div class="message-box d-flex justify-content-center date">
                    <div class="input-group-text bg-secondary text-white">
                        ${now}</div></div>`
    } else if (last.children('div').text().trim() != now) {
        html += `<div class="message-box d-flex justify-content-center date">
                    <div class="input-group-text bg-secondary text-white">
                        ${now}</div></div>`
    }
    $('#messages').append(html);
    html = `<div class="message-box d-flex ${(data._from==email)?'justify-content-end':''}">
                <div class="input-group-text text-left">
                    ${data.message}
                    <br>
                    <div class="text-muted small">${h}:${m} ${mm}</div>
                </div>
            </div>`;
    $('#messages').append(html);
}
function scrollDown(time = 0) {
    $("#messages").animate({
        scrollTop: $('#messages').prop("scrollHeight")
    }, time);
}

function sendMessage() {
    var message = $('#message');
    var text = message.val();
    message.val('');
    $.ajax({
        url: '/message',
        type: 'POST',
        data: {
            _to: receiver.email,
            message: text,
        }
    }).done(function (res) {
        addMessage(res);
        scrollDown(1000);
    }).fail(function (res) {
        message.val(text);
    });
}

getMessages = function () {
    $.ajax({
        url: '/get-messages',
        type: 'get',
        data: {
            _from: receiver.email,
        }
    }).done(function (messages) {
        messages.forEach(message => {
            addMessage(message);
        });
        scrollDown();
    })
}, getMessages();
var socket = io()
socket.on('connect', () => {
    $.ajax({
        url: '/set-socket-id',
        type: 'POST',
        data: {
            email: email,
            socketID: socket.id,
            talking_with: receiver.email,
        },
    }).done(function (res) {
        console.log(res);
    })
})
socket.on('messages', (data) => {
    data = JSON.parse(data);
    addMessage(data);
})
socket.on('disconnect', (err) => {
    location.reload();
})