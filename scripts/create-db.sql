create table users (
   id           number(10) primary key,
   email        varchar2(50) not null,
   pass         varchar2(15) not null,
   token_id     number(10),
   created_date date default sysdate
);

create table token (
   id         number(10) primary key,
   id_user    number(10) not null,
   expires_at date,
   issued_at  date default sysdate,
   token      varchar2(50) not null,
   scope      varchar2(50),
   constraint fk_token_user foreign key ( id_user )
      references users ( id )
);

create table session_audit (
   id          number(10) primary key,
   descripcion varchar2(255),
   author      varchar2(50),
   created_at  date default sysdate
);

create table ingredients (
   id               number(10) primary key,
   name             varchar2(50) not null,
   measurement_unit varchar2(50),
   price            number(4,2),
   client_id        number(4),
   last_update      date default sysdate,
   constraint fk_ingredients_client foreign key ( client_id )
      references users ( id )
);

create table shopping_list (
   id          number(10) primary key,
   user_id     number(10),
   name        varchar2(50),
   created     date default sysdate,
   last_update date,
   constraint fk_shopping_list_user foreign key ( user_id )
      references users ( id )
);

create table recipe (
   id          number(10) primary key,
   name        varchar2(25) not null,
   description varchar2(200),
   client_id   number(4),
   created_at  date default sysdate,
   last_update date default sysdate,
   constraint fk_recipe_client foreign key ( client_id )
      references users ( id )
);


create table recipe_ingredient (
   id            number(10) primary key,
   ingredient_id number(10) not null,
   recipe_id     number(10) not null,
   constraint fk_recipe_ingredient foreign key ( ingredient_id )
      references ingredients ( id ),
   constraint fk_recipe foreign key ( recipe_id )
      references recipe ( id )
);

create table shopping_list_recipe (
   id               number(10) primary key,
   shopping_list_id number(10) not null,
   recipe_id        number(10) not null,
   constraint fk_shopping_list foreign key ( shopping_list_id )
      references shopping_list ( id ),
   constraint fk_shopping_list_recipe foreign key ( recipe_id )
      references recipe ( id )
);

-- sequence Users
create sequence seq_users start with 1 increment by 1 nocache;

create or replace trigger trg_users_id before
   insert on users
   for each row
begin
   :new.id := seq_users.nextval;
end;

-- sequence Token
create sequence seq_token start with 1 increment by 1 nocache;

create or replace trigger trg_token_id before
   insert on token
   for each row
begin
   :new.id := seq_token.nextval;
end;

--  sequence Session_audit
create sequence seq_session_audit start with 1 increment by 1 nocache;

create or replace trigger trg_session_audit_id before
   insert on session_audit
   for each row
begin
   :new.id := seq_session_audit.nextval;
end;

--  sequence Ingredients
create sequence seq_ingredients start with 1 increment by 1 nocache;

create or replace trigger trg_ingredients_id before
   insert on ingredients
   for each row
begin
   :new.id := seq_ingredients.nextval;
end;


-- sequence Shopping_list
create sequence seq_shopping_list start with 1 increment by 1 nocache;

create or replace trigger trg_shopping_list_id before
   insert on shopping_list
   for each row
begin
   :new.id := seq_shopping_list.nextval;
end;


--  sequence  tabla Recipe
create sequence seq_recipe start with 1 increment by 1 nocache;

create or replace trigger trg_recipe_id before
   insert on recipe
   for each row
begin
   :new.id := seq_recipe.nextval;
end;


--  sequence tabla Recipe_ingredient
create sequence seq_recipe_ingredient start with 1 increment by 1 nocache;

create or replace trigger trg_recipe_ingredient_id before
   insert on recipe_ingredient
   for each row
begin
   :new.id := seq_recipe_ingredient.nextval;
end;


-- sequence tabla shopping_list_recipe
create sequence seq_shopping_list_recipe start with 1 increment by 1 nocache;

create or replace trigger trg_shopping_list_recipe_id before
   insert on shopping_list_recipe
   for each row
begin
   :new.id := seq_shopping_list_recipe.nextval;
end;

commit;