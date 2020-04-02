// class Car {

//     constructor(type, color) {
//         this.type = type
//         this.color = color
//         this.engineStatus = 'off'
//     }

//     engineStart() {

//         this.engineStatus = 'on'
//         console.log('engine start')
//     }

//     engingeStop() {
//         this.engineStatus = 'off'
//         console.log('engine start')
//     }

//     static isEngineOn(car) {
//         if (car.engineStatus === 'on') {
//             console.log('Engine On')
//         } else {
//             console.log('Engine off')
//         }
//     }
// }

// const car = new Car('suv', 'red')
// Car.isEngineOn(car) // Engine Off
// car.engingeStop()
// Car.isEngineOn(car) // Engine On

function makeid() {
    return 'AxxYxxxx-xxxx-4xxx-Yxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
      var r = Math.random() * 12 | 0,
        v = c == 'x' ? r : (r & 0x0 | 0x9 );
      return v.toString(12).toUpperCase();
    });
  }

  // static noMesin (){
  //   return 'AxxYxxxx-xxxx-4xxx-Yxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (x) {
  //     var r = Math.random() * 12 | 0,
  //       v = x == 'x' ? r : (r & 0x0 | 0x9 );
  //     return v.toString(12).toUpperCase();
  //   });
  // }
// function makeid(length) {
//     var result           = '';
//     var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
//     var charactersLength = characters.length;
//     for ( var i = 0; i < length; i++ ) {
//        result += characters.charAt(Math.floor(Math.random() * charactersLength));
//     }
//     return result;
//  }
 
 console.log(makeid(5));