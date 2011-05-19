class ChainA {
  function foo() {
    return 'A';
  }
}

class ChainB : ChainA {
  function foo() {
    return super.foo() + ' B';
  }
}

class ChainC : ChainB {
  function foo() {
    return super.foo() + ' C';
  }
}

class ChainD : ChainC {
  function foo() {
    return super.foo() + ' D';
  }
}

// ----------------------------------------------------------------------------

var d = new ChainD();
assertEquals('A B C D', d.foo());