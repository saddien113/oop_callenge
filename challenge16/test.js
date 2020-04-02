class mobil {
    constructor(type, ban, kursi, pintu, tahun, garansi) {
      this.ban = jenis.ban;
      this.kursi = jenis.kursi + ' penumpang ';
      this.pintu = pintu;
      this.type = type;
      this.mesin = mobil.noMesin();
      this.tahun = tahun;
      this.garansi = garansi;
    }static noMesin (){
      return 'AxxYxxxx-xxxx-4xxx-Yxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (x) {
        var r = Math.random() * 12 | 0,
          v = x == 'x' ? r : (r & 0x0 | 0x9 );
        return v.toString(12).toUpperCase();
      });
    }
  }
  // function noMesin() {
  //   return 'AxxYxxxx-xxxx-4xxx-Yxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (x) {
  //     var r = Math.random() * 12 | 0,
  //       v = x == 'x' ? r : (r & 0x0 | 0x9 );
  //     return v.toString(12).toUpperCase();
  //   });
  // }
  
  class ban {
    constructor(brand, size) {
      this.merek = brand
      this.ukuran = size
      // console.log(mobil.noMesin())
    }
  }
  
  class jenis extends mobil {
      constructor(type, ban, kursi, pintu, tahun, garansi){}
      static Ertiga() {
      return 'Ertiga', new ban('MICHELIN', '185/65R15 88H'), 7, 5, tahun, '4 tahun'
      
    }
    // constructor(baleno) {
    //     super('baleno', new ban('MICHELIN', '185/65R15 88H'), 7, 5, tahun, '4 tahun');
    //     // console.log(mobil.noMesin())
    //   }
  }
  class rakit {
    constructor() {
      this.cars = [];
    }
    static getRandomInt() {
      return Math.floor(Math.random() * 9 |1);
    }
    produksi(year) {
      for (let i = 0; i <= rakit.getRandomInt(); i++) {
        this.cars.push(new mobil(mobil.Ertiga));
      }
    }
    result() {
      console.log(`Hasil Produksi : \n`)
      this.cars.forEach((item, i) => {
        console.log(`
  ${i + 1}.No Mesin : ${item.mesin}
  Type : ${item.type}
  Pintu : ${item.pintu}
  Kursi : ${item.kursi} 
  Ban : ${item.ban} | Ban Depan/Belakang : ${item.ban}
        `)
      })
      console.log(rakit.getRandomInt())
    }
    
  }
  
  let suzuki = new rakit();
  suzuki.produksi(2011)
  suzuki.result();
  