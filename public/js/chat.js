var email = $('meta[name="user-email"]').attr('content');
var receiver_detail = $('meta[for="receiver-detail"]'),
    receiver = {};
for (var i = 0; i < receiver_detail.length; i++) {
    receiver[$(receiver_detail[i]).attr('name')] = $(receiver_detail[i]).attr('content');
}
console.info(receiver);
addMessage = function (data) {
    console.log(data);
    var html = `<div class="message-box d-flex ${(data._from==email)?'justify-content-end':''}">
<div class="input-group-text">${data.message}</div>
</div>`;
    $('#messages').append(html);
}

sendMessage = function () {
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
        console.log(res);
        addMessage({
            _from: email,
            message: text
        });
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
    })
}, getMessages();
var socket = io()
socket.on('connect', () => {
    $.ajax({
        url: '/set-socket-id',
        type: 'POST',
        data: {
            socketID: socket.id
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