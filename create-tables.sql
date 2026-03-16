-- Account

create table if not exists account(

    username varchar(255) not null unique,
    password varchar(255) not null
    );

-- company
create table if not exists company(
    name varchar(255) not null unique,
    totalGifts integer not null,
    account varchar(255) not null,
    foreign key (account) references account(username)
    on delete cascade
    -- when my account is deleted,
    -- delete me too.
    );


-- Choosing each class and giving it a table as we have limited subclasses. (4 only)

create table if not exists addition(
    name varchar(255) unique not null,
    price integer not null,
    clicks integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name) on delete cascade
    );

create table if not exists multiplier(
    name varchar(255) unique not null,
    price integer not null,
    clicks integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name)
    on delete cascade
    );

create table if not exists santa(
    name varchar(255) unique not null,
    price integer not null,
    cps integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name)
    on delete cascade

    );

create table if not exists amazon(

    name varchar(255) unique not null,
    price integer not null,
    cps integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name)
    on delete cascade

    );
