create table notes (
  id int unsigned primary key auto_increment not null,
  name varchar(25) not null,
  content_id varchar(10) unique,
  slug varchar(10) not null unique,
  is_private boolean not null default false,
  linkshare boolean not null default false,
  password varchar(255),
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp
);

create table content (
  id int unsigned primary key auto_increment not null,
  note_id int unsigned not null,
  content text not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp,
  foreign key(note_id) references notes(id) on delete cascade
);
