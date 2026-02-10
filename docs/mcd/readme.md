<h1>Notefy Database Schema</h1>

<h2>Notes Table :</h2>
- id : unique id for each note<br>
- name : name of the note VARCHAR(25) NOT NULL<br>
- content_id : content_id of the note VARCHAR(10) NULL unique<br>
- slug : slug of the note VARCHAR(10) NOT NULL unique<br>
- is_private : boolean to check if the note is private or not BOOLEAN NOT NULL<br>
- linkshare : boolean to check if the note is shared or not BOOLEAN NOT NULL<br>
- password : password of the note VARCHAR(255) NULL<br>
- created_at : date and time when th e note was created TIMESTAMP NOT NULL<br>
- updated_at : date and time when the note was last updated TIMESTAMP NOT NULL<br>

<h2>Content Table :</h2>
- id : unique id for each content<br>
- note_id : id of the note TEXT NOT NULL<br>
- content : content of the note TEXT NOT NULL<br>
- created_at : date and time when th e note was created TIMESTAMP NOT NULL<br>
- updated_at : date and time when the note was last updated TIMESTAMP NOT NULL<br>