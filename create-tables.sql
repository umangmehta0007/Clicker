-- Account

create new table if not exists account(

       username varchar(255) not null unique,
       passowrd varchar(255) not null,
);

-- company
create new table if not exists company(
       name varchar(255) not null unique,
       totalGifts integer not null,
       account varchar(255) not null,
       foreign key(account) references account(username)
       on delete cascade
    -- when my account is deleted,
    -- delete me too.
);


-- Choosing each class and giving it a table as we have limited subclasses. (4 only)
-- Synthetic keys giving as we permit same name for diff employees.

create new table if not exists employee(
       id serial not null unique,
       price integer not null,
       productionValue integer not null,
       company varchar(255) not null,
       foreign key company references company(name)
       on delete cascade
);

create new table if not exists van(
       id serial not null unique,
       price integer not null,
       productionValue integer not null,
       company varchar(255)not null,
       foreign key company references company(name)
        on delete cascade

);

create new table if not exists santa(
       id serial not null unique,
       price integer not null,
       productionValue integer not null,
       company varchar(255)not null,
       foreign key company references company(name)
       on delete cascade

);

create new table if not exists amazon(
       id serial not null unique,
       price integer not null,
       productionValue integer not null,
       company varchar(255)not null,
       foreign key company references company(name)
       on delete cascade

);

