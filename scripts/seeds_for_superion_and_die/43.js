// Copyright 2016 the V8 project authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// Flags: --allow-natives-syntax
function foo() {
  var __es_v0 = /can't pass the string "foo" to argument 1 of ctypes\.FunctionType\(ctypes\.default_abi, ctypes\.voidptr_t, \[ctypes\.int32_t\]\)\.ptr\(ctypes\.UInt64\("[x0-9A-Fa-f]+"\)\)/.toString();

  return function (c) {
    Number.isFinite(0 ^ 1);
    var double_var = [3.0, 3.5][0];
    var literal = c ? [1, double_var] : [double_var, 3.5];

    var __es_v1 = /\u0042/iu.exec(double_var.toPrecision());

    return literal[0];
  };
}

var f1 = foo();
var f2 = foo(); // Both closures point to full code.

f1(false);
f2(false); // Optimize f1, but don't initialize the [1, double_var] literal.

f1(false); // Initialize the [1, double_var] literal, and transition the boilerplate to
// double.

f2(true); // Trick crankshaft into writing double_var at the wrong position.

var l = f1(true);
1;
l;