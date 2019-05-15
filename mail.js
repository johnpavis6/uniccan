var mail=require("./nodemailer");
setTimeout(function(){
    console.log("start");
    mail.sendmail("johnpavis6@gmail.com","Check",`
    <div>
        <a src="https://uniccan.com">
            <img src="https://uniccan.com/images/logo.png">
        </a>
        <div>You have 4 new messages from Name</div>
        <a href="https://uniccan.com/chat/id">Click here to chat</a>
    </div>
    `);
},2000);