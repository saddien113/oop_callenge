// const fs = require('fs');
const readline = require('readline');
const sqlite3 = require('sqlite3').verbose();
const Table = require('cli-table');
const dblogin = "./db/login.db";
// const dbmahasiswa ="./db/mahasiswa.db";
const dbmahasiswa = __dirname + "/db/mahasiswa.db";




let db = new sqlite3.Database(dblogin, sqlite3, (err) => {
    if (err) {
        return console.error(err.message);
    }
});
let db1 = new sqlite3.Database(dbmahasiswa, sqlite3, (err) => {
    if (err) {
        return console.error(err.message);
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

main()
login()

function login() {
    console.log(`
=====================================================================
                Welcome to Database Mahasiswa
                    Universitas  Indonesia
   
=====================================================================`);
    rl.question('username: ', (user) => {
        rl.question('password: ', (password) => {
            console.log('==============================================================');
            db.serialize(() => {
                let sql = `SELECT * FROM login WHERE login.user='${user}' AND login.password='${password}'`;
                db.get(sql, (err, row) => {
                    if (err) {
                        throw err;
                    }
                    if (row) {
                        console.log(`Welcome, '${row.user}'. Your access level is: '${row.access} '`);
                        main()
                    } else {
                        console.log('Maaf Username dan Password Anda Salah, coba lagi !');
                        login();
                    }
                })
            })
        })
    })
}
function main() {
    console.log(`=====================================================================
Silahkan pilih opsi dibawah ini:
[1] Mahasiswa
[2] Dosen
[3] Mata Kuliah
[4] Kontrak
[5] Jurusan
[6] Keluar
=====================================================================
 `);

    rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
        switch (number) {
            case '1':
                menuMahasiswa();
                break;
            case '2':
                menuDosen();
                break;
            case '3':
                  menuMatakuliah();
                break;
            case '4':
                  menuKontrak();
                break;
            case '5':
                //   menuJurusan();
                break;
            case '6':
                console.log('=====================================================================')
                login()
                break;
            default:
                console.log('Selection not selected');
                main();
                break;
        }
    });
}

function menuMahasiswa() {
    console.log(`
  =====================================================================
  silahkan pilih opsi di bawah ini :
  [1] Daftar Murid
  [2] Cari murid
  [3] Tambah Murid
  [4] Hapus Murid
  [5] Kembali
    `)
    rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
        switch (number) {
            case '1':
                DaftarMahasiswa();
                break;
            case '2':
                CariMahasiswa();
                break;
            case '3':
                TambahMahasiswa();
                break;
            case '4':
                HapusMahasiswa();
                break;
            case '5':
                console.log('=====================================================================')
                console.log('anda telah kembali')
                main()
                break;
            default:
                main();
                break;
        }
    });
}
function DaftarMahasiswa() {
    db1.serialize(() => {
        let sql = `SELECT * FROM Mahasiswa NATURAL JOIN Jurusan WHERE Jurusan.id_jurusan = Mahasiswa.id_jurusan ORDER BY nim ASC;`;
        db1.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['Nim', 'Nama', 'Alamat', 'Jurusan'],
                    colWidths: [10, 20, 30, 20]
                });
                row.forEach(row => {
                    table.push(
                        [`${row.nim}`, `${row.nama}`, `${row.alamat}`, `${row.nama_jurusan}`]
                    );
                })
                console.log(table.toString());
                menuMahasiswa();
            } else {
                console.log("Tidak ada data/hasil");
            }
        });
    })
}
function CariMahasiswa() {
    rl.question('Masukan NIM: ', (nim) => {
        db1.serialize(() => {
            let sql = `SELECT * FROM Mahasiswa NATURAL JOIN Jurusan WHERE mahasiswa.nim ='${nim}' `;
            db1.get(sql, (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`Mahasiswa Detail `);
                    console.log(`
  id      : ${row.nim},
  nama    : ${row.nama},
  Alamat  : ${row.alamat},
  Jurusan : ${row.nama_jurusan}`);
                    menuMahasiswa()
                } else {
                    console.log('Maaf NIM yang anda masukan salah, coba lagi !');
                    CariMahasiswa();
                }
            })
        })
    })
}
function TambahMahasiswa() {
    console.log('lengkapi data di bawah ini :')
    rl.question('NIM: ', (nim) => {
        rl.question('Nama: ', (nama) => {
            rl.question('Jurusan: ', (id_jurusan) => {
                rl.question('Alamat: ', (alamat) => {
                    rl.question('umur: ', (umur) => {
                        let sql = `INSERT into Mahasiswa(nim,nama,alamat,id_jurusan,umur)VALUES ('${nim}', '${nama}','${alamat}','${id_jurusan}','${umur}')`;
                        db1.run(sql, (err) => {
                            if (err) throw err;
                            DaftarMahasiswa()
                        })
                    })
                })
            })
        })
    });
}
function HapusMahasiswa() {
    const sql = 'DELETE FROM Mahasiswa WHERE nim = ?';
    rl.question('Enter NIM to delete:', nim => {
        db1.run(sql, [nim], (err, row) => {
            if (err) throw err;
            DaftarMurid()
            console.log('Maaf NIM yang anda masukan salah, coba lagi !');
        })
    })
};
function menuDosen() {
    console.log(`
  =====================================================================
  silahkan pilih opsi di bawah ini :
  [1] Daftar Dosen
  [2] Cari Dosen
  [3] Tambah Dosen
  [4] Hapus Dosen
  [5] Kembali
    `)
    rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
        switch (number) {
            case '1':
                DaftarDosen();
                break;
            case '2':
                CariDosen();
                break;
            case '3':
                TambahDosen();
                break;
            case '4':
                HapusDosen();
                break;
            case '5':
                console.log('=====================================================================')
                console.log('anda telah kembali')
                main()
                break;
            default:
                main();
                break;
        }
    });
}
function DaftarDosen() {
    db1.serialize(() => {
        let sql = `SELECT * FROM Dosen ORDER BY id_dosen ASC;`;
        db1.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['Id_dosen', 'NamaDosen'],
                    colWidths: [10, 20]
                });
                row.forEach(row => {
                    table.push(
                        [`${row.id_dosen}`, `${row.nama_dosen}`]
                    );
                })
                console.log(table.toString());
                menuDosen();
            } else {
                console.log("Tidak ada data/hasil");
            }
        });
    })
}
function CariDosen() {
    rl.question('Masukan ID_Dosen: ', (id_dosen) => {
        db1.serialize(() => {
            let sql = `SELECT * FROM Dosen where id_dosen = '${id_dosen}'`;
            db1.get(sql, (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`Dosen Detail `);
                    console.log(`
  id         : ${row.id_dosen},
  nama       : ${row.nama_dosen},`);
                    menuDosen()
                } else {
                    console.log('Maaf ID_Dosen yang anda masukan salah, coba lagi !');
                    CariDosen();
                }
            })
        })
    })
}
function TambahDosen() {
    console.log('lengkapi data di bawah ini :')
    rl.question('ID_Dosen: ', (id_dosen) => {
        rl.question('Nama_Dosen: ', (nama_dosen) => {
         
                let sql = `INSERT into Dosen(id_dosen,nama_dosen,id_mk)VALUES ('${id_dosen}','${nama_dosen}')`;
                db1.run(sql, (err) => {
                    if (err) throw err;
                    DaftarDosen()
                })
            })
     
    })
}
function HapusDosen() {
    const sql = 'DELETE FROM Dosen WHERE id_dosen = ?';
    rl.question('Enter ID_Dosen to delete:', id_dosen => {
        db1.run(sql, [id_dosen], (err, row) => {
            if (err) throw err;
            //   console.log('data dosen di Delete');
            DaftarDosen()
            console.log('Maaf ID Dosen yang anda masukan salah, coba lagi !');
        })
    })
};
function menuMatakuliah() {
    console.log(`
  =====================================================================
  silahkan pilih opsi di bawah ini :
  [1] Daftar MataKuliah
  [2] Cari MataKuliah
  [3] Tambah MataKuliah
  [4] Hapus MataKuliah
  [5] Kembali
    `)
    rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
        switch (number) {
            case '1':
                DaftarMataKuliah();
                break;
            case '2':
                CariMataKuliah();
                break;
            case '3':
                TambahMataKuliah();
                break;
            case '4':
                HapusMataKuliah();
                break;
            case '5':
                console.log('=====================================================================')
                console.log('anda telah kembali')
                main()
                break;
            default:
                main();
                break;
        }
    });
}
function DaftarMataKuliah() {
    db1.serialize(() => {
        let sql = `SELECT * FROM Mata_Kuliah ORDER BY id_mk ASC;`;
        db1.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['Id_MataKuliah', 'MataKuliah', 'SKS'],
                    colWidths: [20, 20, 10,]
                });
                row.forEach(row => {
                    table.push(
                        [`${row.id_mk}`, `${row.nama_kuliah}`, `${row.sks}`]
                    );
                })
                console.log(table.toString());
                menuMatakuliah();
            } else {
                console.log("Tidak ada data/hasil");
            }
        });
    })
}
function CariMataKuliah() {
    rl.question('Masukan ID_MataKuliah: ', (nim) => {
        db1.serialize(() => {
            let sql = `SELECT * FROM Mata_Kuliah`;
            db1.get(sql, (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`Dosen Detail `);
                    console.log(`
  ID MataKuliah  : ${row.id_mk},
  MataKuliah     : ${row.nama_kuliah},
  SKS            : ${row.sks}`);
                    menuMatakuliah()
                } else {
                    console.log('Maaf ID_MataKuliah yang anda masukan salah, coba lagi !');
                    CariMataKuliah();
                }
            })
        })
    })
}
function TambahMataKuliah() {
    console.log('lengkapi data di bawah ini :')
    rl.question('ID_MataKuliah: ', (id_mk) => {
        rl.question('MataKuliah: ', (nama_kuliah) => {
            rl.question('SKS : ', (sks) => {
                let sql = `INSERT into Mata_Kuliah(id_mk, nama_kuliah,sks)VALUES ('${id_mk}','${nama_kuliah}','${sks}')`;
                db1.run(sql, (err) => {
                    if (err) throw err;
                    DaftarMataKuliah()
                })
            })
        })
    })
}
function HapusMataKuliah() {
    const sql = 'DELETE FROM Mata_Kuliah WHERE id_mk = ?';
    rl.question('Enter ID MataKuliah to delete:', id_mk => {
        db1.run(sql, [id_mk], (err, row) => {
            if (err) throw err;
            DaftarMataKuliah()
            console.log('Maaf ID Mata Kuliah yang anda masukan salah, coba lagi !');
        })
    })
};

function menuKontrak() {
    console.log(`
  =====================================================================
  silahkan pilih opsi di bawah ini :
  [1] Daftar Kontrak
  [2] Cari Kontrak
  [3] Tambah Kontrak
  [4] Hapus Kontrak
  [5] Kembali
    `)
    rl.question('Masukan salah satu No. dari opsi diatas :', (number) => {
        switch (number) {
            case '1':
                DaftarKontrak();
                break;
            case '2':
                CariKontrak();
                break;
            case '3':
                TambahKontrak();
                break;
            case '4':
                HapusKontrak();
                break;
            case '5':
                console.log('=====================================================================')
                console.log('anda telah kembali')
                main()
                break;
            default:
                main();
                break;
        }
    });
}
function DaftarKontrak() {
    db1.serialize(() => {
        let sql = `SELECT * FROM kontrak NATURAL JOIN Mahasiswa NATURAL JOIN Mata_Kuliah NATURAL JOIN Dosen ORDER BY id_kontrak ASC`;
        db1.all(sql, (err, row) => {
            if (err) throw err;
            if (row) {
                var table = new Table({
                    head: ['ID Kontrak', 'NIM', 'Nama','Matakuliah','Dosen','Nilai'],
                    colWidths: [20, 20, 10,10,10,10]
                });
                row.forEach(row => {
                    table.push(
                        [`${row.id_kontrak}`, `${row.nim}`, `${row.nama}`, `${row.nama_kuliah}`,`${row.nama_dosen}`,`${row.nilai}`]
                    );
                })
                console.log(table.toString());
                menuKontrak();
            } else {
                console.log("Tidak ada data/hasil");
            }
        });
    })
}
function CariKontrak() {
    rl.question('Masukan ID Kontrak: ', (nim) => {
        db1.serialize(() => {
            let sql = `SELECT * FROM kontrak NATURAL JOIN Mahasiswa NATURAL JOIN Mata_Kuliah NATURAL JOIN Dosen`;
            db1.get(sql, (err, row) => {
                if (err) throw err;
                if (row) {
                    console.log(`Kontrak Detail `);
                    console.log(`
  ID Kontrak    : ${row.id_kontrak},
  NIM           : ${row.nim},
  Nama          : ${row.nama},
  Matakuliah    : ${row.nama_kuliah},
  SKS           : ${row.sks},
  Dosen         : ${row.nama_dosen},
  Nilai         : ${row.nilai}  `);
                    menuKontrak()
                } else {
                    console.log('Maaf ID Kontrak yang anda masukan salah, coba lagi !');
                    CariKontrak();
                }
            })
        })
    })
}
function TambahKontrak() {
    console.log('lengkapi data di bawah ini :')
    rl.question('ID_MataKuliah: ', (id_mk) => {
        rl.question('Nama_Dosen: ', (nama_kuliah) => {
            rl.question('ID_MataKuliah: ', (sks) => {
                let sql = `INSERT into Mata_Kuliah(ID Mata Kuliah, Mata Kuliah,SKS)VALUES ('${id_mk}','${nama_kuliah}','${sks}')`;
                db1.run(sql, (err) => {
                    if (err) throw err;
                    DaftarMataKuliah()
                })
            })
        })
    })
}
function HapusKontrak() {
    const sql = 'DELETE FROM Kontrak WHERE id_kontrak = ?';
    rl.question('Enter ID MataKuliah to delete:', id_kontrak => {
        db1.run(sql, [id_kontrak], (err, row) => {
            if (err) throw err;
            DaftarKontrak()
            console.log('Maaf ID Kontrak yang anda masukan salah, coba lagi !');
        })
    })
};

