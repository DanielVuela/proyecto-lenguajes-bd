 create or replace PACKAGE pk1_proyecto AS

    --- TIPOS PERSONALIZADOS
      type ingredient_cost is record (ingredient_id    number,ingredient_name  varchar2(255),total_quantity   number,measurement_unit varchar2(50),total_cost       number);
      type ingredient_cost_info is record (ingredient_id    number,ingredient_name  varchar2(50),total_quantity   number,measurement_unit varchar2(50),total_cost       number);
      type recipequantity is record (recipe_id number,quantity  number);
      type recipequantitylist is table of recipequantity;
      type ingredient_cost_table is table of ingredient_cost;
      type numberlist is table of number;
    
      ---FUNCIONES
      function create_session (p_email in varchar2, p_pass  in varchar2) return varchar2;
      function get_ingredients_by_user_id (p_user_id number) return sys_refcursor;
      FUNCTION get_recipes_by_user_id(p_user_id NUMBER) RETURN SYS_REFCURSOR;
      FUNCTION CALCULATE_INGREDIENT_COSTS(p_shopping_list_id NUMBER) RETURN INGREDIENT_COST_TABLE PIPELINED;
      
      -----PROCEDIMIENTOS
      procedure end_session (p_token in varchar2);
      procedure sp_creacion_ingredientes (name in varchar2,measurement_unit in varchar2,price number,quantity number,client_id in number);
      PROCEDURE SP_actualizar_ingredientes (id IN NUMBER,name IN VARCHAR2, measurement_unit IN VARCHAR2,price NUMBER,quantity IN NUMBER);
      procedure sp_eliminar_ingredientes (ingredientid in number);
      PROCEDURE create_recipe_with_ingredients (p_recipe_name IN VARCHAR2,p_description IN VARCHAR2,p_client_id IN NUMBER,p_ingredient_ids IN NumberList);
      procedure update_recipe_with_ingredients (p_recipe_id      in number,p_recipe_name    in varchar2,p_description    in varchar2,p_ingredient_ids in NumberList);
      procedure delete_recipe_with_ingredients (p_recipe_id in number);
      PROCEDURE create_shopping_list(p_list_name IN VARCHAR2,p_client_id IN NUMBER,p_recipes IN RecipeQuantityList,p_shopping_list_id OUT NUMBER);
END;

-----------------------


create or replace PACKAGE BODY pk1_proyecto AS
    ---FUNCIONES
---------------------------------create_session; ----------------------------------------
    FUNCTION create_session(
    p_email IN VARCHAR2,
    p_pass IN VARCHAR2
) RETURN VARCHAR2 IS
    v_user_id NUMBER(10);
    v_token VARCHAR2(50);
    v_token_id NUMBER(10);
    v_expiry_date DATE;
BEGIN
    SELECT id
    INTO v_user_id
    FROM Users
    WHERE email = p_email AND PASS = p_pass;

    IF v_user_id IS NOT NULL THEN
        SELECT ora_hash('TOKEN_' || p_email ||  p_pass) INTO v_token FROM DUAL;
        v_expiry_date := SYSDATE + INTERVAL '1' HOUR; -- El token expira en 1 hora

        INSERT INTO Token (id_user, expires_at, token, scope)
        VALUES (v_user_id, v_expiry_date, v_token, 'session_scope')
        RETURNING id INTO v_token_id;
        commit;
        RETURN v_token;
    ELSE
        RETURN NULL;
    END IF;
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN NULL;
    WHEN OTHERS THEN
        RETURN NULL;
END create_session;
------------------------------ create_session; -------------------------------------------------------   
--------------------------------------get_ingredients_by_user_id---------------------------------------------------        

FUNCTION get_ingredients_by_user_id(p_user_id NUMBER)
    RETURN SYS_REFCURSOR
IS
    ingredients_cursor SYS_REFCURSOR;
BEGIN
    OPEN ingredients_cursor FOR
        SELECT id, name, measurement_unit, price, quantity, client_id, last_update
        FROM Ingredients
        WHERE client_id = p_user_id;

    RETURN ingredients_cursor;
END get_ingredients_by_user_id;
--------------------------------------get_ingredients_by_user_id---------------------------------------------------        
   
--------------------------------------get_recipes_by_user_id---------------------------------------------------        
FUNCTION get_recipes_by_user_id(p_user_id NUMBER)
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
--------------------------------------get_recipes_by_user_id---------------------------------------------------

--------------------------------------CALCULATE_INGREDIENT_COSTS---------------------------------------------------

 FUNCTION CALCULATE_INGREDIENT_COSTS(
    p_shopping_list_id NUMBER
) RETURN INGREDIENT_COST_TABLE PIPELINED IS
    v_row INGREDIENT_COST; 
BEGIN
    FOR ingredient_info IN (
        SELECT
    i.id AS ingredient_id,
    i.name AS ingredient_name,
    SUM(slr.quantity * i.quantity) AS total_quantity, 
    i.measurement_unit,
    SUM(i.price * slr.quantity * i.quantity) AS total_cost
    FROM 
        shopping_list_recipe slr
    JOIN 
    recipe r ON slr.recipe_id = r.id
    JOIN 
    recipe_ingredient ri ON r.id = ri.recipe_id
    JOIN 
        ingredients i ON ri.ingredient_id = i.id
    WHERE 
        slr.shopping_list_id = p_shopping_list_id
    GROUP BY 
        i.id, i.name, i.measurement_unit
    ) LOOP
        -- rellena la variable v_row
        v_row := INGREDIENT_COST(
            ingredient_info.ingredient_id,
            ingredient_info.ingredient_name,
            ingredient_info.total_quantity,
            ingredient_info.measurement_unit,
            ingredient_info.total_cost
        );
        --  emite el entry a INGREDIENT_COST_TABLE PIPELINED
        PIPE ROW(v_row);
    END LOOP;

    RETURN;
END CALCULATE_INGREDIENT_COSTS;
--------------------------------------CALCULATE_INGREDIENT_COSTS---------------------------------------------------
 
-----PROCEDIMIENTOS
------------------------------end_session--------------------------------------------
PROCEDURE END_SESSION(
    p_token IN VARCHAR2
) AS
    v_sql VARCHAR2(1000);
BEGIN
    v_sql := 'DELETE FROM TOKEN WHERE id_user = (SELECT Distinct(id_user) FROM TOKEN WHERE token = :p_user_id)';
    EXECUTE IMMEDIATE v_sql USING p_token;
    commit;

END END_SESSION;
------------------------------end_session--------------------------------------------
------------------------------ sp_creacion_ingredientes; -------------------------------------------------------   
 PROCEDURE SP_creacion_ingredientes (name IN VARCHAR2, measurement_unit IN VARCHAR2, price NUMBER, quantity NUMBER, client_id IN NUMBER) AS 
BEGIN
    INSERT INTO Ingredients(name, measurement_unit, price, quantity, client_id, last_update)
    VALUES (name, measurement_unit, price, quantity, client_id, sysdate);
    DBMS_OUTPUT.PUT_LINE('Ingrediente creado con éxito: ' || name);
    commit;
EXCEPTION
WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('** ERROR: Hay un problema con el tipo de datos proporcionados.');
WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('** ERROR inesperado: ' || SQLERRM);       
END SP_creacion_ingredientes;
--------------------------------------sp_creacion_ingredientes---------------------------------------------------

--------------------------------------SP_actualizar_ingredientes---------------------------------------------------
PROCEDURE SP_actualizar_ingredientes (id IN NUMBER,name IN VARCHAR2, measurement_unit IN VARCHAR2,price NUMBER,quantity IN NUMBER) AS 
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
--------------------------------------SP_actualizar_ingredientes---------------------------------------------------


--------------------------------------sp_eliminar_ingredientes---------------------------------------------------

procedure sp_eliminar_ingredientes (
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
--------------------------------------sp_eliminar_ingredientes---------------------------------------------------


--------------------------------------create_recipe_with_ingredients---------------------------------------------------

PROCEDURE create_recipe_with_ingredients (
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
END create_recipe_with_ingredients;
--------------------------------------create_recipe_with_ingredients---------------------------------------------------

--------------------------------------update_recipe_with_ingredients---------------------------------------------------

procedure update_recipe_with_ingredients (
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
--------------------------------------update_recipe_with_ingredients---------------------------------------------------


--------------------------------------delete_recipe_with_ingredients---------------------------------------------------
PROCEDURE delete_recipe_with_ingredients(
   p_recipe_id IN NUMBER
) AS
    v_sql VARCHAR2(1000);
BEGIN
    v_sql := 'DELETE FROM Recipe_ingredient WHERE RECIPE_ID = :p_recipe_id';
    EXECUTE IMMEDIATE v_sql USING p_recipe_id;

    v_sql := 'DELETE FROM RECIPE WHERE id = :p_recipe_id';
    EXECUTE IMMEDIATE v_sql USING p_recipe_id;
COMMIT;
END delete_recipe_with_ingredients;
--------------------------------------delete_recipe_with_ingredients---------------------------------------------------
--------------------------------------create_shopping_list---------------------------------------------------
PROCEDURE create_shopping_list(
    p_list_name IN VARCHAR2,
    p_client_id IN NUMBER,
    p_recipes IN RecipeQuantityList, -- Lista de tuplas (id, quantity)
    p_shopping_list_id OUT NUMBER
) AS
BEGIN
    INSERT INTO Shopping_List (name, user_id, created)
    VALUES (p_list_name, p_client_id, SYSDATE)
    RETURNING id INTO p_shopping_list_id;

    FOR i IN 1 .. p_recipes.COUNT LOOP
        INSERT INTO Shopping_List_Recipe (shopping_list_id, recipe_id, quantity)
        VALUES (p_shopping_list_id, p_recipes(i).recipe_id, p_recipes(i).quantity);
    END LOOP;
    COMMIT;
EXCEPTION
    WHEN DUP_VAL_ON_INDEX THEN
        DBMS_OUTPUT.PUT_LINE('Error: Ya existe una lista de compras con ese nombre.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error al crear la lista de compras: ' || SQLERRM);
END create_shopping_list;
--------------------------------------create_shopping_list---------------------------------------------------
END;
-----------------------------------------------------------------------------------------------------------
