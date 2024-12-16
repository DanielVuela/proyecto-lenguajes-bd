-------- 
-- Session
--------

-- Create

create or replace function create_session (
   p_email in varchar2,
   p_pass  in varchar2
) return varchar2 is
   v_user_id     number(10);
   v_token       varchar2(50);
   v_token_id    number(10);
   v_expiry_date date;
begin
   select id
     into v_user_id
     from users
    where email = p_email
      and pass = p_pass;

   if v_user_id is not null then
      select ora_hash('TOKEN_'
                      || p_email
                      || p_pass)
        into v_token
        from dual;
      v_expiry_date := sysdate + interval '1' hour; -- El token expira en 1 hora

      insert into token (
         id_user,
         expires_at,
         token,
         scope
      ) values ( v_user_id,
                 v_expiry_date,
                 v_token,
                 'session_scope' ) returning id into v_token_id;
      commit;
      return v_token;
   else
      return null;
   end if;
exception
   when no_data_found then
      return null;
   when others then
      return null;
end create_session;


-- delete

create or replace procedure end_session (
   p_token in varchar2
) as
   v_sql varchar2(1000);
begin
   v_sql := 'DELETE FROM TOKEN WHERE id_user = (SELECT Distinct(id_user) FROM TOKEN WHERE token = :p_user_id)';
   execute immediate v_sql
      using p_token;
   commit;
end end_session;



-- ingredientes
--------
----------------------------------------------------------------------

--------------------CREATE -----------------------------------

create or replace procedure sp_creacion_ingredientes (
   name             in varchar2,
   measurement_unit in varchar2,
   price            number,
   quantity         number,
   client_id        in number
) as
begin
   insert into ingredients (
      name,
      measurement_unit,
      price,
      quantity,
      client_id,
      last_update
   ) values ( name,
              measurement_unit,
              price,
              quantity,
              client_id,
              sysdate );
   dbms_output.put_line('Ingrediente creado con éxito: ' || name);
   commit;
exception
   when value_error then
      dbms_output.put_line('** ERROR: Hay un problema con el tipo de datos proporcionados.');
   when others then
      dbms_output.put_line('** ERROR inesperado: ' || sqlerrm);
end sp_creacion_ingredientes;


--------------------------- READ ------------------------
create or replace function get_ingredients_by_user_id (
   p_user_id number
) return sys_refcursor is
   ingredients_cursor sys_refcursor;
begin
   open ingredients_cursor for select id,
                                      name,
                                      measurement_unit,
                                      price,
                                      quantity,
                                      client_id,
                                      last_update
                                                             from ingredients
                                where client_id = p_user_id;

   return ingredients_cursor;
end get_ingredients_by_user_id;
-----------------UPDATE ----------------------

CREATE OR REPLACE PROCEDURE SP_actualizar_ingredientes (id IN NUMBER,name IN VARCHAR2, measurement_unit IN VARCHAR2,price NUMBER,quantity IN NUMBER) AS 
BEGIN
     UPDATE Ingredients
     SET name = SP_actualizar_ingredientes.name, measurement_unit = SP_actualizar_ingredientes.measurement_unit,price = SP_actualizar_ingredientes.price ,last_update = sysdate,quantity = SP_actualizar_ingredientes.quantity 
     WHERE id = SP_actualizar_ingredientes.id;
    DBMS_OUTPUT.PUT_LINE('Ingrediente se ha actualizado');
    Commit;
EXCEPTION
WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: No se encontrÃ³ el ingrediente con ID ' || id || '.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error al intentar actualizar el ingrediente: ' || SQLERRM);
END SP_actualizar_ingredientes;

--------------- REMOVE ------------------

create or replace procedure sp_eliminar_ingredientes (
   ingredientid in number
) as
begin
   delete ingredients
    where id = ingredientid;
   commit;
   dbms_output.put_line('Ingrediente se ha eliminado');
exception
   when no_data_found then
      dbms_output.put_line('Error: No se encontrÃ³ el ingrediente con ID '
                           || ingredientid
                           || '.');
   when others then
      dbms_output.put_line('Error al intentar eliminar el ingrediente: ' || sqlerrm);
end sp_eliminar_ingredientes; 


-------------
 -- recetas 
 ----------
 -------------------------  


--------------------CREATE -----------------------------------
create or replace TYPE NUMBERLIST AS TABLE OF NUMBER;

create or replace PROCEDURE create_recipe_with_ingredients (
  p_recipe_name IN VARCHAR2,
  p_description IN VARCHAR2,
  p_client_id IN NUMBER,
  p_ingredient_ids IN NumberList
) IS
v_recipe_id Recipe.id%TYPE;
BEGIN
  INSERT INTO Recipe (name, description, client_id)
  VALUES (p_recipe_name, p_description, p_client_id)
  RETURNING id INTO v_recipe_id;

  FOR i IN 1 .. p_ingredient_ids.COUNT LOOP
    INSERT INTO Recipe_ingredient (recipe_id, ingredient_id)
    VALUES (v_recipe_id, p_ingredient_ids(i));
  END LOOP;
EXCEPTION
  WHEN OTHERS THEN
    DBMS_OUTPUT.PUT_LINE('Error al crear la receta: ' || SQLERRM);
END;


--------------------------- READ ------------------------

CREATE OR REPLACE FUNCTION get_recipes_by_user_id(p_user_id NUMBER)
    RETURN SYS_REFCURSOR
IS
    recipes_cursor SYS_REFCURSOR;
BEGIN
    OPEN recipes_cursor FOR
        SELECT r.id, r.name,r.description,i.name,i.measurement_unit,i.id
        FROM Ingredients i
        JOIN Recipe_ingredient ri
          ON i.id = ri.ingredient_id
        JOIN Recipe r
          ON ri.recipe_id = r.id
        WHERE r.client_id = p_user_id;


    RETURN recipes_cursor;
END get_recipes_by_user_id;



-------------------- update -----------------------------------
create or replace procedure update_recipe_with_ingredients (
   p_recipe_id      in number,
   p_recipe_name    in varchar2,
   p_description    in varchar2,
   p_ingredient_ids in NumberList
) is
begin
   update recipe
      set name = p_recipe_name,
          description = p_description
    where id = p_recipe_id;

   delete from recipe_ingredient
    where recipe_id = p_recipe_id;

   for i in 1..p_ingredient_ids.count loop
      insert into recipe_ingredient (
         recipe_id,
         ingredient_id
      ) values ( p_recipe_id,
                 p_ingredient_ids(i) );
   end loop;
exception
   when dup_val_on_index then
      dbms_output.put_line('Error: La receta con ID '
                           || p_recipe_id
                           || ' ya existe.');
   when others then
      dbms_output.put_line('Error al insertar la receta: ' || sqlerrm);
      commit; 
end update_recipe_with_ingredients;


-------------------- delete -----------------------------------

create or replace procedure delete_recipe_with_ingredients (
   p_recipe_id in number
) as
   v_sql varchar2(1000);
begin
   v_sql := 'DELETE FROM Recipe_ingredient WHERE RECIPE_ID = :p_recipe_id';
   execute immediate v_sql
      using p_recipe_id;
   v_sql := 'DELETE FROM RECIPE WHERE id = :p_recipe_id';
   execute immediate v_sql
      using p_recipe_id;
   commit;
end delete_recipe_with_ingredients;

-------------
 -- Shopping List 
 ----------
 -------------------------  

 --- CREATE
create or replace type RECIPEQUANTITY as object (
      recipe_id number,
      quantity  number
);

create or replace type RECIPEQUANTITYLIST as
   table of RECIPEQUANTITY;

CREATE OR REPLACE PROCEDURE create_shopping_list(
    p_list_name IN VARCHAR2,
    p_client_id IN NUMBER,
    p_recipes IN RecipeQuantityList -- Lista de tuplas (id, quantity)
) AS
    v_shopping_list_id NUMBER;
BEGIN
    INSERT INTO Shopping_List (name, user_id, created)
    VALUES (p_list_name, p_client_id, SYSDATE)
    RETURNING id INTO v_shopping_list_id;

    FOR i IN 1 .. p_recipes.COUNT LOOP
        INSERT INTO Shopping_List_Recipe (shopping_list_id, recipe_id, quantity)
        VALUES (v_shopping_list_id, p_recipes(i).recipe_id, p_recipes(i).quantity);
    END LOOP;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Error: Ya existe una lista de compras con ese nombre.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error al crear la lista de compras: ' || SQLERRM);
END create_shopping_list;

---- READ (CALCULATIONS of ingredient price)
CREATE OR REPLACE TYPE INGREDIENT_COST AS OBJECT (
    ingredient_id       NUMBER,
    ingredient_name     VARCHAR2(255),
    total_quantity      NUMBER,
    measurement_unit    VARCHAR2(50),
    total_cost          NUMBER
);

CREATE OR REPLACE TYPE INGREDIENT_COST_TABLE AS TABLE OF INGREDIENT_COST;

CREATE OR REPLACE FUNCTION CALCULATE_INGREDIENT_COSTS(
    p_shopping_list_id NUMBER
) RETURN INGREDIENT_COST_TABLE PIPELINED IS
    v_row INGREDIENT_COST; -- Variable para almacenar una fila del resultado
BEGIN
    -- Consulta que calcula los costos por ingrediente
    FOR ingredient_info IN (
        SELECT
    i.id AS ingredient_id,
    i.name AS ingredient_name,
    SUM(slr.quantity * i.quantity) AS total_quantity, -- Cantidad total derivada de shopping_list_recipe
    i.measurement_unit,
    SUM(i.price * slr.quantity * i.quantity) AS total_cost -- Cálculo del costo total
    FROM 
        shopping_list_recipe slr
    JOIN 
    recipe r ON slr.recipe_id = r.id
    JOIN 
    recipe_ingredient ri ON r.id = ri.recipe_id
    JOIN 
        ingredients i ON ri.ingredient_id = i.id
    WHERE 
        slr.shopping_list_id = 11
    GROUP BY 
        i.id, i.name, i.measurement_unit
    ) LOOP
        -- Rellenar la variable v_row con los datos de la fila
        v_row := INGREDIENT_COST(
            ingredient_info.ingredient_id,
            ingredient_info.ingredient_name,
            ingredient_info.total_quantity,
            ingredient_info.measurement_unit,
            ingredient_info.total_cost
        );
        -- Emitir la fila al conjunto de resultados
        PIPE ROW(v_row);
    END LOOP;

    RETURN;
END;
/