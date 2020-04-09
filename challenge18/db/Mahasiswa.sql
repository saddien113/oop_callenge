CREATE TABLE Jurusan
(
  id_jurusan VARCHAR(14) PRIMARY KEY NOT NULL,
  nama_jurusan CHAR(25) NOT NULL
);
CREATE TABLE Mahasiswa
(
  nim VARCHAR(14) PRIMARY KEY NOT NULL,
  nama CHAR(15) NOT NULL,
  alamat VARCHAR(25) NOT NULL,
  umur SMALLINT(4) NOT NULL,
  id_jurusan VARCHAR(14) NOT NULL,
  FOREIGN KEY (id_jurusan) REFERENCES Jurusan(id_jurusan)
);


CREATE TABLE Mata_Kuliah
(
  id_mk VARCHAR (14) PRIMARY KEY  NOT NULL,
  nama_kuliah CHAR(25) NOT NULL,
  sks INT NOT NULL
);

CREATE TABLE Dosen
(
  id_dosen VARCHAR(14) PRIMARY KEY NOT NULL,
  nama_dosen CHAR(25) NOT NULL,
  id_mk VARCHAR (14) NOT NULL,
  FOREIGN KEY (id_mk) REFERENCES Mata_Kuliah(id_mk)
);

CREATE TABLE Dosen
(
  id_dosen VARCHAR(14) PRIMARY KEY NOT NULL,
  nama_dosen CHAR(25) NOT NULL
);

CREATE TABLE kontrak
( 
  id_kontrak VARCHAR(14) PRIMARY KEY NOT NULL,
  nim VARCHAR(14) NOT NULL,
  id_mk VARCHAR(14) NOT NULL,
  id_dosen VARCHAR(14) NOT NULL,
  nilai VARCHAR(14) NOT NULL,
  FOREIGN KEY (nim) REFERENCES Mahasiswa(nim),
  FOREIGN KEY (id_mk) REFERENCES Mata_Kuliah(id_mk),
  FOREIGN KEY (id_dosen) REFERENCES Dosen(id_dosen)
);

SELECT * FROM Dosen NATURAL JOIN Mata_Kuliah WHERE Dosen.id_dosen ='d51'

INSERT into Mata_Kuliah(id_mk,nama_kuliah,sks)VALUES ( "mk001",'algoritma program',3);
INSERT into Mata_Kuliah(id_mk,nama_kuliah,sks)VALUES ( "mk002",'robotic',4);
INSERT into Mata_Kuliah(id_mk,nama_kuliah,sks)VALUES ( "mk003",'photoshop',4);
INSERT into Mata_Kuliah(id_mk,nama_kuliah,sks)VALUES ( "mk004",'data mining',3);
INSERT into Mata_Kuliah(id_mk,nama_kuliah,sks)VALUES ( "mk005",'matrix',3);

INSERT into Jurusan(id_jurusan,nama_jurusan)VALUES ("j01","IT");
INSERT into Jurusan(id_jurusan,nama_jurusan)VALUES ("j02",'TI');
INSERT into Jurusan(id_jurusan,nama_jurusan)VALUES ("j03",'disgn');

INSERT into Dosen(id_dosen,nama_dosen,id_mk)VALUES ("d52",'Joko',"mk005");
INSERT into Dosen(id_dosen,nama_dosen,id_mk)VALUES ("d51",'Rubi',"mk004");

INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ("n01",'adi','jakarta','j02',21);
INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ("n02",'bayu','bogor','j01',19);
INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ("n03",'budi','bekasi','j01',19);

INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(01,"n01","mk004","d51","A");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(02,"n01","mk001","d52","B");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(03,"n02","mk004","d51","C");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(04,"n03","mk002","d51","B");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(05,"n03","mk005","d52","C");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(06,"n03","mk004","d52","C");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(07,"n01","mk002","d51","A");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(08,"n01","mk005","d51","A");
INSERT into Jurusan(id_jurusan,nama_jurusan)VALUES ("j02",'TI');
INSERT into Jurusan(id_jurusan,nama_jurusan)VALUES ("j03",'disgn');

INSERT into Dosen(id_dosen,nama_dosen)VALUES ("d52",'Joko');
INSERT into Dosen(id_dosen,nama_dosen)VALUES ("d51",'Rubi');

INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ("n01",'adi','jakarta','j02',21);
INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ("n02",'bayu','bogor','j01',19);
INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ("n03",'budi','bekasi','j01',19);

INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(01,"n01","mk004","d51","A");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(02,"n01","mk001","d52","B");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(03,"n02","mk004","d51","C");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(04,"n03","mk002","d51","B");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(05,"n03","mk005","d52","C");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(06,"n03","mk004","d52","C");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(07,"n01","mk002","d51","A");
INSERT into kontrak(id_kontrak,nim,id_mk,id_dosen,nilai)VALUES(08,"n01","mk005","d51","A");
--1)
  SELECT * FROM Mahasiswa NATURAL JOIN Jurusan WHERE Jurusan.id_jurusan = Mahasiswa.id_jurusan ORDER BY nim asc;
--2)
  SELECT nama,umur FROM Mahasiswa WHERE umur < 20;
--3)
  SELECT * FROM kontrak NATURAL JOIN Mahasiswa WHERE nilai <= "B";
--4)
  SELECT nama,sum(sks) FROM kontrak NATURAL JOIN Mata_Kuliah NATURAL JOIN Mahasiswa group by nim HAVING sum(sks) > 10;
--5)
  SELECT nama,umur,nilai,nama_kuliah,nama_dosen FROM kontrak NATURAL JOIN Mahasiswa NATURAL JOIN Mata_Kuliah NATURAL JOIN Dosen WHERE nama_kuliah = "data mining"; 
--6)
   SELECT nama_dosen,count(DISTINCT nama)total_mahasiswa FROM kontrak NATURAL JOIN Dosen NATURAL JOIN mahasiswa GROUP BY id_dosen;
--8)
  SELECT id_kontrak,nim,nama,nilai,alamat,umur,nama_dosen,nama_kuliah,sks,nama_jurusan FROM kontrak NATURAL JOIN Mahasiswa NATURAL JOIN Dosen JOIN Mata_Kuliah NATURAL JOIN Jurusan WHERE nilai > "B";