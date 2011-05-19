let result = []; 
for (let i = 1; i < 3; i ++) {
  for (let j = 9; j > 7; j --) {
    result.push(
      function() { return i + ':' + j; }
    );
  }
}

// ----------------------------------------------------------------------------

assertEquals('1:9', result[0]());
assertEquals('1:8', result[1]());
assertEquals('2:9', result[2]());
assertEquals('2:8', result[3]());
assertEquals(4, result.length);
