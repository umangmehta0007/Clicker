-- Account

create table if not exists account(

    username varchar(255) not null unique,
    password varchar(255) not null
    );

-- company
create table if not exists company(
    name varchar(255) not null unique,
    totalgifts integer not null,
    account varchar(255) not null,
    foreign key (account) references account(username)
    on delete cascade
    -- when my account is deleted,
    -- delete me too.
    );


-- Choosing each class and giving it a table as we have limited subclasses. (4 only)

create table if not exists addition(

    id serial not null unique,
    price integer not null,
    clicks integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name) on delete cascade
    );

create table if not exists multiplier(

    id serial not null unique,
    price integer not null,
    clicks integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name)
    on delete cascade
    );

create table if not exists santa(

    id serial not null unique,
    price integer not null,
    cps integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name)
    on delete cascade

    );

create table if not exists amazon(

    id serial not null unique,
    price integer not null,
    cps integer not null,
    company varchar(255) not null,
    foreign key (company) references company(name)
    on delete cascade

    );

create table if not exists inventory(

    id serial unique not null,
    types varchar(255) not null,
    price integer not null,
    productionvalue integer not null
);

-- INSERT INTO inventory (price, productionvalue, types)
-- VALUES
--     (100,5,'AMAZON'),
--     (500,10,'SANTA'),
--     (100,5,'ADDITION'),
--     (500,5,'MULTIPLIER');

insert into inventory (price, productionvalue, types) values
--Buildings (new 5 added total 7)
(100, 5, 'SANTA'),
(300, 15, 'SANTA'),
(800, 40, 'SANTA'),
(1200, 60, 'SANTA'),
(2500, 120, 'SANTA'),

(200, 10, 'AMAZON'),
(600, 30, 'AMAZON'),

--Upgrades ( new 5 added 7 total)
(50, 1, 'ADDITION'),
(150, 3, 'ADDITION'),
(400, 5, 'ADDITION'),
(800, 10, 'ADDITION'),

(100, 2, 'MULTIPLIER'),
(500, 4, 'MULTIPLIER'),
(1200, 6, 'MULTIPLIER');



