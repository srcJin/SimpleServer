CREATE USER 'beelee'@'localhost' IDENTIFIED WITH mysql_native_password BY 'beelee';

CREATE DATABASE test;

GRANT ALL PRIVILEGES ON test.* TO 'beelee'@'localhost';

-- alter user
ALTER USER 'beelee'@'localhost' IDENTIFIED WITH mysql_native_password BY 'beelee';

-- delete all users
delete from users