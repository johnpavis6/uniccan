drop table users;
create table users(
    id integer AUTO_INCREMENT primary key not null,
    name text not null,
    email varchar(100) unique not null,
    password text not null,
    gender varchar(6) not null,
    mobile_no varchar(10) unique not null,
    dob text not null,
    education text,
    hobbies text,
    extra_curricular_activities text,
    involvements text,
    skills text,
    last_seen text,
    knowledges text,
    college_name text,
    work_experiences text,
    degrees text,
    forgot_password varchar(50)
);

drop table messages;
create table messages(
    id integer AUTO_INCREMENT primary key not null,
    _from varchar(100) not null,
    _to varchar(100) not null,
    message text not null,
    datetime text not null,
    seenstatus int(1) not null,
    foreign key(_from) references users(email),
    foreign key(_to) references users(email)
);

drop table socket_mapping;
create table socket_mapping(
    id integer AUTO_INCREMENT primary key not null,
    email varchar(100),
    socketID varchar(100),
    talking_with varchar(100),
    unique(email,talking_with),
    foreign key(email) references users(email),
    foreign key(talking_with) references users(email)
);