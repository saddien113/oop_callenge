CREATE TABLE login
(
  user VARCHAR(14) PRIMARY KEY NOT NULL,
  password VARCHAR(14) NOT NULL,
  access VARCHAR(5) NOT NULL
);

INSERT into login(user,password,access)VALUES ("addie",'djoker1',"Admin");