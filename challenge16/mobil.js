class mobil {
  constructor(type, ban,transmisi, kursi, pintu, tahun, garansi) {
    this.ban = ban;
    this.kursi = kursi ;
    this.pintu = pintu;
    this.type = type;
    this.transmisi = transmisi;
    this.tahun = tahun;
    this.garansi = garansi 
    this.noMesin = noMesin;
  }
}
function noMesin() {
  return 'AxxYxxxx-xxxx-4xxx-Yxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (x) {
    var r = Math.random() * 12 | 0,
      v = x == 'x' ? r : (r & 0x0 | 0x9 );
    return v.toString(12).toUpperCase();
  });
}

class ban {
  constructor(brand, size) {
    this.merek = brand
    this.ukuran = size
  }
}

class Ertiga extends mobil {
  constructor(tahun) {
    super('Ertiga', new ban('MICHELIN', '185/65R15 88H'),'Manual', 7, 5, tahun, 4 );
    // console.log(mobil.noMesin()) //memangil static noMesin() didalam class mobil
  }
}
class Baleno extends mobil {
  constructor(tahun) {
    super('Baleno', new ban('MICHELIN', '185/65R15 88H'),'Auto', 5, 5, tahun, 3 );
    // console.log(mobil.noMesin()) //memangil static noMesin() didalam class mobil
  }
}


class rakit {
  constructor() {
    this.cars = [];
  }
  static getRandomInt() {
    return Math.floor(Math.random() * 9 |1);
  }
  produksi(tahun) {
    for (let i = 0; i <= rakit.getRandomInt(); i++) { //looping untuk produksi mobil secara random
      this.cars.push(new Ertiga(tahun));
    }

    for (let i = 0; i <= rakit.getRandomInt(); i++) { //looping untuk produksi mobil secara random
      this.cars.push(new Baleno(tahun));
    }
  }
  thngaransi(thngaransi) {
    console.log(`Status Garansi : \n`)
    this.cars.forEach((item, i) => {
      console.log(`
${i + 1}.
NoMesin: ${item.mobil.NoMesin}
Transmisi: ${item.transmisi}
Type : ${item.type}
Pintu : ${item.pintu}
Kursi : ${item.kursi}  penumpang
Ban : ${item.ban.merek} | Ban Depan/Belakang : ${item.ban.ukuran}
Tahun : ${item.tahun}
Garansi : ${item.garansi} tahun
status Garansi : ${(thngaransi - item.tahun) > item.garansi ? 'expired' : 'active' }
      `)
    })
  }
}



let suzuki = new rakit();
suzuki.produksi(2011)
suzuki.produksi(2013)
suzuki.thngaransi(2015);
