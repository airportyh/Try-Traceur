function testBlock() {
  // Test function expressions.
  {
    var x = function g() { return 'g'; } || function h() { return 'h'; };
    return x;
  }
}

// ----------------------------------------------------------------------------

var result = testBlock();
assertEquals('g', result());
assertEquals('g', result.name);
