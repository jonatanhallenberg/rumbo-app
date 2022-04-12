/*EXPORT SCRIPT FOR EMPLOYEES*/
COPY (
SELECT row_to_json(employees) FROM (SELECT email, firstname, lastname, fullname FROM employees) as employees
) TO '/tmp/employees.json' WITH (FORMAT text, HEADER false)
/*EXPORT SCRIPT FOR EMPLOYEES*/

/*EXPORT SCRIPT FOR PROJECTS*/
COPY (
SELECT row_to_json(projects) FROM (SELECT customer_name, project_name, agreement_ref, active, created_at as currentDate FROM projects) as projects
) TO '/tmp/projects.json' WITH (FORMAT text, HEADER false)
/*EXPORT SCRIPT FOR PROJECTS*/

/*EXPORT SCRIPT FOR TRANSACTIONS*/
COPY (
SELECT row_to_json(transactions) FROM (SELECT email, time, amount, description, status FROM transactions) as transactions
) TO '/tmp/transactions.json' WITH (FORMAT text, HEADER false)
/*EXPORT SCRIPT FOR TRANSACTIONS*/