Sádico Tímido
sadicotimido
En línea
Yter, Chisco

Sádico Tímido ha añadido a Yter al grupo. — hoy a las 14:50
Sádico Tímido ha iniciado una llamada. — hoy a las 14:50
[15:14]Chisco:


-------- 
-- Session
--------
Expandir
sps-wip1.sql
7 KB
﻿


-------- 
-- Session
--------

-- CReate

create or replace FUNCTION create_session(
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


-- delete

CREATE OR REPLACE PROCEDURE END_SESSION(
    p_token IN VARCHAR2
) AS
    v_sql VARCHAR2(1000);
BEGIN
    v_sql := 'DELETE FROM TOKEN WHERE id_user = (SELECT id_user FROM TOKEN WHERE token = :p_user_id)';

    EXECUTE IMMEDIATE v_sql USING p_token;
    
END END_SESSION;



-------- 
-- ingredientes
--------
----------------------------------------------------------------------

--------------------CREATE -----------------------------------
 
CREATE OR REPLACE PROCEDURE SP_creacion_ingredientes (name IN VARCHAR2, measurement_unit IN VARCHAR2,price NUMBER,client_id IN NUMBER) AS 
BEGIN
    INSERT INTO Ingredients(name,measurement_unit,price,client_id,last_update)
    VALUES (name,measurement_unit,price,client_id,sysdate);
    DBMS_OUTPUT.PUT_LINE('Ingrediente creado con Ã©xito: ' || name);

EXCEPTION
WHEN VALUE_ERROR THEN
        DBMS_OUTPUT.PUT_LINE('** ERROR: Hay un problema con el tipo de datos proporcionados.');
WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('** ERROR inesperado: ' || SQLERRM);       
END SP_creacion_ingredientes;


--------------------------- READ ------------------------

CREATE OR REPLACE FUNCTION get_ingredients_by_user_id(p_user_id NUMBER)
    RETURN SYS_REFCURSOR
IS
    ingredients_cursor SYS_REFCURSOR;
BEGIN
    OPEN ingredients_cursor FOR
        SELECT id, name, measurement_unit, price, client_id, last_update
        FROM Ingredients
        WHERE client_id = p_user_id;

    RETURN ingredients_cursor;
END get_ingredients_by_user_id;


-----------------UPDATE ----------------------

CREATE OR REPLACE PROCEDURE SP_actualizar_ingredientes (id IN NUMBER,name IN VARCHAR2, measurement_unit IN VARCHAR2,price NUMBER) AS 
BEGIN
     UPDATE Ingredients
     SET name = SP_actualizar_ingredientes.name, measurement_unit = SP_actualizar_ingredientes.measurement_unit,price = SP_actualizar_ingredientes.price ,last_update = sysdate
     WHERE id = id;
    DBMS_OUTPUT.PUT_LINE('Ingrediente se ha actualizado');

EXCEPTION
WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: No se encontrÃ³ el ingrediente con ID ' || id || '.');
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error al intentar actualizar el ingrediente: ' || SQLERRM);
END SP_actualizar_ingredientes;

--------------- REMOVE ------------------

CREATE OR REPLACE PROCEDURE SP_eliminar_ingredientes (id in number) AS 
BEGIN
    delete Ingredients
    where id = SP_eliminar_ingredientes.id;
    DBMS_OUTPUT.PUT_LINE('Ingrediente se ha eliminado');

EXCEPTION
    WHEN NO_DATA_FOUND THEN
        DBMS_OUTPUT.PUT_LINE('Error: No se encontrÃ³ el ingrediente con ID ' || id || '.');
 
    WHEN OTHERS THEN
        DBMS_OUTPUT.PUT_LINE('Error al intentar eliminar el ingrediente: ' || SQLERRM);
 
END SP_eliminar_ingredientes; 




-------------
 -- recetas 
 ----------
 -------------------------  


--------------------CREATE -----------------------------------
CREATE OR REPLACE PROCEDURE create_recipe_with_ingredients (
  p_recipe_id IN NUMBER,
  p_recipe_name IN VARCHAR2,
  p_description IN VARCHAR2,
  p_client_id IN NUMBER,
  p_ingredient_ids IN SYS.ODCINUMBERLIST -- tipo de tabla de Oracle para el arreglo de números
) IS
BEGIN
 
  INSERT INTO Recipe (id, name, description, client_id)
  VALUES (p_recipe_id, p_recipe_name, p_description, p_client_id);
 
 
  FOR i IN 1 .. p_ingredient_ids.COUNT LOOP
    INSERT INTO Recipe_ingredient (recipe_id, ingredient_id)
    VALUES (p_recipe_id, p_ingredient_ids(i));
  END LOOP;
EXCEPTION 
 WHEN DUP_VAL_ON_INDEX THEN 
      DBMS_OUTPUT.PUT_LINE('Error: La receta con ID ' || p_recipe_id || ' ya existe.');
WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Error al insertar la receta: ' || SQLERRM);
  COMMIT; -- Confirmar los cambios
END create_recipe_with_ingredients;



--------------------------- READ ------------------------

CREATE OR REPLACE FUNCTION get_recipes_by_user_id(p_user_id NUMBER)
    RETURN SYS_REFCURSOR
IS
    recipes_cursor SYS_REFCURSOR;
BEGIN
    OPEN recipes_cursor FOR
        SELECT r.id, r.name,r.description,i.name,i.measurement_unit
        FROM Ingredients i
        JOIN Recipe_ingredient ri
          ON i.id = ri.ingredient_id
        JOIN Recipe r
          ON ri.recipe_id = r.id
        WHERE r.client_id = p_user_id;


    RETURN recipes_cursor;
END get_recipes_by_user_id;


-------------------- update -----------------------------------
CREATE OR REPLACE PROCEDURE update_recipe_with_ingredients (
  p_recipe_id IN NUMBER,
  p_recipe_name IN VARCHAR2,
  p_description IN VARCHAR2,
  p_ingredient_ids IN SYS.ODCINUMBERLIST -- tipo de tabla de Oracle para el arreglo de números
) IS
BEGIN
    
    
  UPDATE RECIPE 
  SET name = p_recipe_name, description = p_description
  WHERE id = p_recipe_id;
  
   DELETE FROM Recipe_ingredient
   WHERE recipe_id = p_recipe_id;
 
   FOR i IN 1 .. p_ingredient_ids.COUNT LOOP
    INSERT INTO Recipe_ingredient (recipe_id, ingredient_id)
    VALUES (p_recipe_id, p_ingredient_ids(i));
  END LOOP;
EXCEPTION 
 WHEN DUP_VAL_ON_INDEX THEN 
      DBMS_OUTPUT.PUT_LINE('Error: La receta con ID ' || p_recipe_id || ' ya existe.');
WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Error al insertar la receta: ' || SQLERRM);
  COMMIT; -- Confirmar los cambios
END update_recipe_with_ingredients;


-------------------- delete -----------------------------------

CREATE OR REPLACE PROCEDURE delete_recipe_with_ingredients(
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

-------------
 -- Shopping List 
 ----------
 -------------------------  





