drop table  estudiantes;

create table  estudiantes (
UID serial primary key,
name varchar (50),
rut varchar (50),
curso varchar (30),
nivel int,	
edad int check (edad >0)

);


insert into  estudiantes (name,rut,curso,nivel, edad)
values('francisco','103210562', 'programacion', 2,19),
('luisa', '112139875','uxui',3, 22),
('samuel', '132518967','analisis', 5 ,25);

select *from  estudiantes
SELECT * FROM estudiantes WHERE RUT = '103210562'