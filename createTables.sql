create table if not exists employee(
		id int AUTO_INCREMENT,
        first_name varchar(30),
        last_name varchar(30),
        role_id int,
        manager_id int,
        primary key (id),
        foreign key (role_id) references `role` (id),
		foreign key (manager_id) references employee (id)
) 