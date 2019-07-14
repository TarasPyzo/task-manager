const asyncFunction = (callback) => {
  setTimeout(() => {
    //callback('Error');
    callback(null, [1, 2, 3]);
    callback('Error');
  }, 2000);
};

asyncFunction((error, result) => {
  if(error) return console.log(error);

  console.log(result);
});
