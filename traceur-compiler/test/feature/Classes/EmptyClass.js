class Empty {}

class EmptyB : Empty {
}

// ----------------------------------------------------------------------------

var e = new Empty();
assertNotNull(e);

for (var element in e) {
  fail('Empty contains :' + element);
}

for (var element in Empty) {
  fail('Empty contains static member : ' + element);
}

// Instances should be different.
var e2 = new Empty();
assertNotEquals(e, e2);

assertTrue(e instanceof Empty);
assertFalse(e instanceof EmptyB);

var b = new EmptyB();

assertTrue(b instanceof Empty);
assertTrue(b instanceof EmptyB);
