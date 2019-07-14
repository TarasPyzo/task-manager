/*const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(a < 0 || b < 0) reject('error');

      resolve(a + b);
    }, 2000);
  });
}

const f = async () => {
  //throw new Error('some text');

  try {
    const sum1 = await add(1, -2);
    const sum2 = await add(sum1, 5);
    console.log(sum2);
    // return sum2;
  } catch(error) {
    console.log(error);
  }
};

console.log('1');
f();
  //.then(result => console.log(result))
  //.catch(error => console.log(error));
console.log('2');
*/

require('../db/mongoose');
const User = require('../db/models/user');

const updateUserAndGetListByAge = async (id, age) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { age },
      { useFindAndModify: false }
    );
    console.log(user);

    const count = await User.countDocuments({ age });
    console.log(count);

    return count;
  } catch(error) {
    console.log(error);
  }
}

updateUserAndGetListByAge('5d24b2ca39c38164b4e7a9a5', 59);

/*const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
}

//add(1, 2)
  //.then(result => {
    //console.log(result);

    //add(result, 5)
      //.then(result => console.log(result))
      //.catch(error => console.log(error))
  //})
  //.catch(error => console.log(error));
let sum1 = null;

add(1, 2)
  .then(result => {
    //console.log(`sum1: ${result}`);
    sum1 = result;

    return add(sum1, 5);
  })
  .then(sum2 => {
    console.log(`sum2: ${sum2}`);
    console.log(`sum1: ${sum1}`);
  })
  .catch(error => console.log(error));
*/
