require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"complex-math":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.gamma = exports.atanh = exports.atan = exports.asinh = exports.asin = exports.asech = exports.asec = exports.acsch = exports.acsc = exports.acoth = exports.acot = exports.acosh = exports.acos = exports.coth = exports.cot = exports.tanh = exports.tan = exports.sqrt = exports.csch = exports.csc = exports.sinh = exports.sin = exports.sech = exports.sec = exports.pow = exports.log10 = exports.log2 = exports.log = exports.mod = exports.divide = exports.abs = exports.norm = exports.nint = exports.ln = exports.frac = exports.floor = exports.cosh = exports.cos = exports.exp = exports.conj = exports.ceil = exports.arg = exports.negate = exports.multiply = exports.subtract = exports.add = exports.imaginary = exports.real = exports.SQRT2 = exports.SQRT1_2 = exports.PI = exports.LOG10E = exports.LOG2E = exports.LN2 = exports.LN10 = exports.I = exports.E = undefined;

var _complex = require('./complex.js');

var _complex2 = _interopRequireDefault(_complex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; } /**
                                                                                                                              * @overview Describes an object analogous to the built-in Math object but over
                                                                                                                              * the complex numbers
                                                                                                                              * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
                                                                                                                              */

/**
 * A common method to convert between various number-like objects to {Complex}
 * @param  {*} u     An object to convert to a {Complex}
 * @return {Complex}
 */
var toComplex = function toComplex(u) {
   if (u instanceof _complex2.default) {
      return u;
   } else if (u instanceof Number) {
      return new _complex2.default(u.valueOf);
   } else if (typeof u === 'number') {
      return new _complex2.default(u);
   } else if ((typeof u === 'undefined' ? 'undefined' : _typeof(u)) === 'object' && u.hasOwnProperty('real') && typeof u.real === 'number' && u.hasOwnProperty('imaginary') && typeof u.imaginary === 'number') {
      return new _complex2.default(u.real, u.imaginary);
   }

   throw new TypeError('Expected numeric type');
};

/**
 * Euler's constant
 * @type {Complex}
 */
var E = exports.E = new _complex2.default(Math.E);

/**
 * The imaginary unit
 * @type {Complex}
 */
var I = exports.I = new _complex2.default(0, 1);

/**
 * Natural logarithm of 10
 * @type {Complex}
 */
var LN10 = exports.LN10 = new _complex2.default(Math.LN10);

/**
 * Natural logarithm of 2
 * @type {Complex}
 */
var LN2 = exports.LN2 = new _complex2.default(Math.LN2);

/**
 * Base 2 logarithm of E
 * @type {Complex}
 */
var LOG2E = exports.LOG2E = new _complex2.default(Math.LOG2E);

/**
 * Base 10 logarithm of E
 * @type {Complex}
 */
var LOG10E = exports.LOG10E = new _complex2.default(Math.LOG10E);

/**
 * Ratio of the circumference of a circle to its diameter
 * @type {Complex}
 */
var PI = exports.PI = new _complex2.default(Math.PI);

/**
 * Square root of 1/2
 * @type {Complex}
 */
var SQRT1_2 = exports.SQRT1_2 = new _complex2.default(Math.SQRT1_2);

/**
 * Square root of 2
 * @type {Complex}
 */
var SQRT2 = exports.SQRT2 = new _complex2.default(Math.SQRT2);

/**
 * The real part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The real part of the number
 */
var real = exports.real = function real(u) {
   return new _complex2.default(toComplex(u).real);
};

/**
 * The imaginary part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The imaginary part of the number
 */
var imaginary = exports.imaginary = function imaginary(u) {
   return new _complex2.default(toComplex(u).imaginary);
};

/**
 * Adds two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The sum of u and v
 */
var add = exports.add = function add(u, v) {
   return new _complex2.default(real(u).real + real(v).real, imaginary(u).real + imaginary(v).real);
};

/**
 * Subtracts two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u subtracting v
 */
var subtract = exports.subtract = function subtract(u, v) {
   return new _complex2.default(real(u).real - real(v).real, imaginary(u).real - imaginary(v).real);
};

/**
 * Multiplies two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The product of u and v
 */
var multiply = exports.multiply = function multiply(u, v) {
   var complexU = toComplex(u);
   var complexV = toComplex(v);

   return new _complex2.default(complexU.real * complexV.real - complexU.imaginary * complexV.imaginary, complexU.real * complexV.imaginary + complexU.imaginary * complexV.real);
};

/**
 * Negates a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The negation of u
 */
var negate = exports.negate = function negate(u) {
   var complexU = toComplex(u);
   return new _complex2.default(-complexU.real, -complexU.imaginary);
};

/**
 * The argument or phase of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The argument of u
 */
var arg = exports.arg = function arg(u) {
   return new _complex2.default(Math.atan2(imaginary(u).real, real(u).real));
};

/**
 * The smallest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The ceiling of u
 */
var ceil = exports.ceil = function ceil(u) {
   return new _complex2.default(Math.ceil(real(u).real), Math.ceil(imaginary(u).real));
};

/**
 * The complex conjugate of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The conjugate of u
 */
var conj = exports.conj = function conj(u) {
   return new _complex2.default(real(u).real, -imaginary(u).real);
};

/**
 * Eular's constant raised to the power of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} Euler's constant raised to the power of u
 */
var exp = exports.exp = function exp(u) {
   var complexU = toComplex(u);
   var newAbs = Math.exp(complexU.real);
   var newArg = complexU.imaginary;
   return new _complex2.default(newAbs * Math.cos(newArg), newAbs * Math.sin(newArg));
};

/**
 * The cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosine of u
 */
var cos = exports.cos = function cos(u) {
   var iu = multiply(I, u);
   return divide(add(exp(iu), exp(negate(iu))), 2);
};

/**
 * The hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosine of u
 */
var cosh = exports.cosh = function cosh(u) {
   return divide(add(exp(u), exp(negate(u))), 2);
};

/**
 * The largest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The floor of u
 */
var floor = exports.floor = function floor(u) {
   return new _complex2.default(Math.floor(real(u).real), Math.floor(imaginary(u).real));
};

/**
 * The fractional part of a real number
 * @param  {Number} n The number
 * @return {Number}   The fractional part of the number
 */
var realFrac = function realFrac(n) {
   return n >= 0 ? n - Math.floor(n) : n - Math.ceil(n);
};

/**
 * The fractional part of a complex number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The fractional part of u
 */
var frac = exports.frac = function frac(u) {
   var complexU = toComplex(u);
   return new _complex2.default(realFrac(complexU.real), realFrac(complexU.imaginary));
};

/**
 * The natural log (logarithm base e) of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The natural log of u
 */
var ln = exports.ln = function ln(u) {
   return new _complex2.default(Math.log(abs(u).real), arg(u).real);
};

/**
 * The nearest Gaussian Integer to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The nearest Gaussian Integer to u
 */
var nint = exports.nint = function nint(u) {
   return floor(add(u, new _complex2.default(0.5, 0.5)));
};

/**
 * The norm of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The norm of u
 */
var norm = exports.norm = function norm(u) {
   return new _complex2.default(real(u).real * real(u).real + imaginary(u).real * imaginary(u).real);
};

/**
 * The absolute value, or magnitude, of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The absolute value of u
 */
var abs = exports.abs = function abs(u) {
   return new _complex2.default(Math.sqrt(norm(u).real));
};

/**
 * Divides two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of dividing u by v
 */
var divide = exports.divide = function divide(u, v) {
   var complexU = toComplex(u);
   var complexV = toComplex(v);
   var normV = norm(v).real;

   return new _complex2.default((complexU.real * complexV.real + complexU.imaginary * complexV.imaginary) / normV, (complexU.imaginary * complexV.real - complexU.real * complexV.imaginary) / normV);
};

/**
 * The complex modulus of a number
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u mod v
 */
var mod = exports.mod = function mod(u, v) {
   return subtract(u, multiply(v, floor(divide(u, v))));
};

/**
 * The logarithm of a number to a given base
 * @param  {*} base  A number or complex number-like object that is the base of
 * the logarithm
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base base of u
 */
var log = exports.log = function log(base, u) {
   return divide(ln(u), ln(base));
};

/**
 * The logarithm base 2 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 2 of u
 */
var log2 = exports.log2 = function log2(u) {
   return divide(ln(u), Math.LN2);
};

/**
 * The logarithm base 10 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 10 of u
 */
var log10 = exports.log10 = function log10(u) {
   return divide(ln(u), Math.LN10);
};

/**
 * The exponent of a base raised to a power
 * @param  {*} base  A number or complex number-like object that is the base of
 * the exponent
 * @param  {*} power A number or complex number-like object that is the power of
 * the exponent
 * @return {Complex} The exponent of base raised to power
 */
var pow = exports.pow = function pow(base, power) {
   return exp(multiply(power, ln(base)));
};

/**
 * The secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The secant of u
 */
var sec = exports.sec = function sec(u) {
   return divide(1, cos(u));
};

/**
 * The hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic secant of u
 */
var sech = exports.sech = function sech(u) {
   return divide(1, cosh(u));
};

/**
 * The sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The sine of u
 */
var sin = exports.sin = function sin(u) {
   var iu = multiply(I, u);
   return divide(subtract(exp(iu), exp(negate(iu))), new _complex2.default(0, 2));
};

/**
 * The hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic sine of u
 */
var sinh = exports.sinh = function sinh(u) {
   return divide(subtract(exp(u), exp(negate(u))), 2);
};

/**
 * The cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosecant of u
 */
var csc = exports.csc = function csc(u) {
   return divide(1, sin(u));
};

/**
 * The hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosecant of u
 */
var csch = exports.csch = function csch(u) {
   return divide(1, sinh(u));
};

/**
 * The square root of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The square root of u
 */
var sqrt = exports.sqrt = function sqrt(u) {
   var complexU = toComplex(u);
   var absU = abs(u).real;

   return new _complex2.default(Math.sqrt((complexU.real + absU) / 2), Math.sign(complexU.imaginary) * Math.sqrt((-complexU.real + absU) / 2));
};

/**
 * The tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The tangent of u
 */
var tan = exports.tan = function tan(u) {
   var exp_2iu = exp(multiply(new _complex2.default(0, 2), u));
   return divide(subtract(exp_2iu, 1), multiply(I, add(exp_2iu, 1)));
};

/**
 * The hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic tangent of u
 */
var tanh = exports.tanh = function tanh(u) {
   var exp_u = exp(u);
   var exp_negate_u = exp(negate(u));
   return divide(subtract(exp_u, exp_negate_u), add(exp_u, exp_negate_u));
};

/**
 * The cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cotangent of u
 */
var cot = exports.cot = function cot(u) {
   return divide(1, tan(u));
};

/**
 * The hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cotangent of u
 */
var coth = exports.coth = function coth(u) {
   return divide(1, tanh(u));
};

/**
 * The inverse cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosine of u
 */
var acos = exports.acos = function acos(u) {
   return add(Math.PI / 2, multiply(I, ln(add(multiply(I, u), sqrt(subtract(1, multiply(u, u)))))));
};

/**
 * The inverse hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosine of u
 */
var acosh = exports.acosh = function acosh(u) {
   return ln(add(u, multiply(sqrt(add(u, 1)), sqrt(subtract(u, 1)))));
};

/**
 * The inverse cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cotangent of u
 */
var acot = exports.acot = function acot(u) {
   return multiply(divide(I, 2), subtract(ln(divide(subtract(u, I), u)), ln(divide(add(u, I), u))));
};

/**
 * The inverse hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cotangent of u
 */
var acoth = exports.acoth = function acoth(u) {
   var reciprocal = divide(1, u);
   return divide(subtract(ln(add(1, reciprocal)), ln(subtract(1, reciprocal))), 2);
};

/**
 * The inverse cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosecant of u
 */
var acsc = exports.acsc = function acsc(u) {
   return multiply(new _complex2.default(0, -1), ln(add(sqrt(subtract(1, divide(1, multiply(u, u)))), divide(I, u))));
};

/**
 * The inverse hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosecant of u
 */
var acsch = exports.acsch = function acsch(u) {
   return add(new _complex2.default(0, -Math.PI / 2), multiply(I, acos(divide(I, u))));
};

/**
 * The inverse secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse secant of u
 */
var asec = exports.asec = function asec(u) {
   return add(new _complex2.default(Math.PI / 2), multiply(I, ln(add(sqrt(subtract(1, divide(1, multiply(u, u)))), divide(I, u)))));
};

/**
 * The inverse hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic secant of u
 */
var asech = exports.asech = function asech(u) {
   var reciprocal = divide(1, u);
   return ln(add(multiply(sqrt(subtract(reciprocal, 1)), sqrt(add(reciprocal, 1))), reciprocal));
};

/**
 * The inverse sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse sine of u
 */
var asin = exports.asin = function asin(u) {
   return multiply(new _complex2.default(0, -1), ln(add(multiply(I, u), sqrt(subtract(1, multiply(u, u))))));
};

/**
 * The inverse hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic sine of u
 */
var asinh = exports.asinh = function asinh(u) {
   return ln(add(u, sqrt(add(multiply(u, u), 1))));
};

/**
 * The inverse tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse tangent of u
 */
var atan = exports.atan = function atan(u) {
   var iu = multiply(I, u);
   return multiply(divide(I, 2), subtract(ln(subtract(1, iu)), ln(add(1, iu))));
};

/**
 * The inverse hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic tangent of u
 */
var atanh = exports.atanh = function atanh(u) {
   return divide(subtract(ln(add(1, u)), ln(subtract(1, u))), 2);
};

/**
 * The values of some integer factorials.
 * @type {Number[]}
 */
var factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368000, 20922789888000, 355687428096000, 6402373705728000, 121645100408832000, 0.243290200817664e19, 0.5109094217170944e20, 0.112400072777760768e22, 0.2585201673888497664e23, 0.62044840173323943936e24, 0.15511210043330985984e26, 0.403291461126605635584e27, 0.10888869450418352160768e29, 0.304888344611713860501504e30, 0.8841761993739701954543616e31, 0.26525285981219105863630848e33, 0.822283865417792281772556288e34, 0.26313083693369353016721801216e36, 0.868331761881188649551819440128e37, 0.29523279903960414084761860964352e39, 0.103331479663861449296666513375232e41, 0.3719933267899012174679994481508352e42, 0.137637530912263450463159795815809024e44, 0.5230226174666011117600072241000742912e45, 0.203978820811974433586402817399028973568e47, 0.815915283247897734345611269596115894272e48, 0.3345252661316380710817006205344075166515e50, 0.1405006117752879898543142606244511569936e52, 0.6041526306337383563735513206851399750726e53, 0.265827157478844876804362581101461589032e55, 0.1196222208654801945619631614956577150644e57, 0.5502622159812088949850305428800254892962e58, 0.2586232415111681806429643551536119799692e60, 0.1241391559253607267086228904737337503852e62, 0.6082818640342675608722521633212953768876e63, 0.3041409320171337804361260816606476884438e65, 0.1551118753287382280224243016469303211063e67, 0.8065817517094387857166063685640376697529e68, 0.427488328406002556429801375338939964969e70, 0.2308436973392413804720927426830275810833e72, 0.1269640335365827592596510084756651695958e74, 0.7109985878048634518540456474637249497365e75, 0.4052691950487721675568060190543232213498e77, 0.2350561331282878571829474910515074683829e79, 0.1386831185456898357379390197203894063459e81, 0.8320987112741390144276341183223364380754e82, 0.507580213877224798800856812176625227226e84, 0.3146997326038793752565312235495076408801e86, 0.1982608315404440064116146708361898137545e88, 0.1268869321858841641034333893351614808029e90, 0.8247650592082470666723170306785496252186e91, 0.5443449390774430640037292402478427526443e93, 0.3647111091818868528824985909660546442717e95, 0.2480035542436830599600990418569171581047e97, 0.1711224524281413113724683388812728390923e99, 0.1197857166996989179607278372168909873646e101, 0.8504785885678623175211676442399260102886e102, 0.6123445837688608686152407038527467274078e104, 0.4470115461512684340891257138125051110077e106, 0.3307885441519386412259530282212537821457e108, 0.2480914081139539809194647711659403366093e110, 0.188549470166605025498793226086114655823e112, 0.1451830920282858696340707840863082849837e114, 0.1132428117820629783145752115873204622873e116, 0.8946182130782975286851441715398316520698e117, 0.7156945704626380229481153372318653216558e119, 0.5797126020747367985879734231578109105412e121, 0.4753643337012841748421382069894049466438e123, 0.3945523969720658651189747118012061057144e125, 0.3314240134565353266999387579130131288001e127, 0.2817104114380550276949479442260611594801e129, 0.2422709538367273238176552320344125971528e131, 0.210775729837952771721360051869938959523e133, 0.1854826422573984391147968456455462843802e135, 0.1650795516090846108121691926245361930984e137, 0.1485715964481761497309522733620825737886e139, 0.1352001527678402962551665687594951421476e141, 0.1243841405464130725547532432587355307758e143, 0.1156772507081641574759205162306240436215e145, 0.1087366156656743080273652852567866010042e147, 0.103299784882390592625997020993947270954e149, 0.9916779348709496892095714015418938011582e150, 0.9619275968248211985332842594956369871234e152, 0.942689044888324774562618574305724247381e154, 0.9332621544394415268169923885626670049072e156, 0.9332621544394415268169923885626670049072e158, 0.9425947759838359420851623124482936749562e160, 0.9614466715035126609268655586972595484554e162, 0.990290071648618040754671525458177334909e164, 0.1029901674514562762384858386476504428305e167, 0.1081396758240290900504101305800329649721e169, 0.1146280563734708354534347384148349428704e171, 0.1226520203196137939351751701038733888713e173, 0.132464181945182897449989183712183259981e175, 0.1443859583202493582204882102462797533793e177, 0.1588245541522742940425370312709077287172e179, 0.1762952551090244663872161047107075788761e181, 0.1974506857221074023536820372759924883413e183, 0.2231192748659813646596607021218715118256e185, 0.2543559733472187557120132004189335234812e187, 0.2925093693493015690688151804817735520034e189, 0.339310868445189820119825609358857320324e191, 0.396993716080872089540195962949863064779e193, 0.4684525849754290656574312362808384164393e195, 0.5574585761207605881323431711741977155627e197, 0.6689502913449127057588118054090372586753e199, 0.8094298525273443739681622845449350829971e201, 0.9875044200833601362411579871448208012564e203, 0.1214630436702532967576624324188129585545e206, 0.1506141741511140879795014161993280686076e208, 0.1882677176888926099743767702491600857595e210, 0.237217324288004688567714730513941708057e212, 0.3012660018457659544809977077527059692324e214, 0.3856204823625804217356770659234636406175e216, 0.4974504222477287440390234150412680963966e218, 0.6466855489220473672507304395536485253155e220, 0.8471580690878820510984568758152795681634e222, 0.1118248651196004307449963076076169029976e225, 0.1487270706090685728908450891181304809868e227, 0.1992942746161518876737324194182948445223e229, 0.269047270731805048359538766214698040105e231, 0.3659042881952548657689727220519893345429e233, 0.5012888748274991661034926292112253883237e235, 0.6917786472619488492228198283114910358867e237, 0.9615723196941089004197195613529725398826e239, 0.1346201247571752460587607385894161555836e242, 0.1898143759076170969428526414110767793728e244, 0.2695364137888162776588507508037290267094e246, 0.3854370717180072770521565736493325081944e248, 0.5550293832739304789551054660550388118e250, 0.80479260574719919448490292577980627711e252, 0.1174997204390910823947958271638517164581e255, 0.1727245890454638911203498659308620231933e257, 0.2556323917872865588581178015776757943262e259, 0.380892263763056972698595524350736933546e261, 0.571338395644585459047893286526105400319e263, 0.8627209774233240431623188626544191544816e265, 0.1311335885683452545606724671234717114812e268, 0.2006343905095682394778288746989117185662e270, 0.308976961384735088795856467036324046592e272, 0.4789142901463393876335775239063022722176e274, 0.7471062926282894447083809372938315446595e276, 0.1172956879426414428192158071551315525115e279, 0.1853271869493734796543609753051078529682e281, 0.2946702272495038326504339507351214862195e283, 0.4714723635992061322406943211761943779512e285, 0.7590705053947218729075178570936729485014e287, 0.1229694218739449434110178928491750176572e290, 0.2004401576545302577599591653441552787813e292, 0.3287218585534296227263330311644146572013e294, 0.5423910666131588774984495014212841843822e296, 0.9003691705778437366474261723593317460744e298, 0.1503616514864999040201201707840084015944e301, 0.2526075744973198387538018869171341146786e303, 0.4269068009004705274939251888899566538069e305, 0.7257415615307998967396728211129263114717e307];

/**
 * The value of g used in the Lanczos approximation. This value is taken from
 * the research computed by Boost. See
 * http://www.boost.org/doc/libs/1_59_0/libs/math/doc/html/math_toolkit/lanczos.html
 * @type {Number}
 */
var lanczosG = 6.024680040776729583740234375;

/**
 * Lanczos g less one half.
 * @type {Number}
 */
var lanczosGMinusHalf = 5.524680040776729583740234375;

/**
 * The numerator coefficients used in the Lancsoz polynomial. These values are
 * dependent on g and are taken from Boost's calculations of g.
 * @type {Number[]}
 */
var lanczosNumeratorCoefficients = [23531376880.41075968857200767445163675473, 42919803642.64909876895789904700198885093, 35711959237.35566804944018545154716670596, 17921034426.03720969991975575445893111267, 6039542586.35202800506429164430729792107, 1439720407.311721673663223072794912393972, 248874557.8620541565114603864132294232163, 31426415.58540019438061423162831820536287, 2876370.628935372441225409051620849613599, 186056.2653952234950402949897160456992822, 8071.672002365816210638002902272250613822, 210.8242777515793458725097339207133627117, 2.506628274631000270164908177133837338626];

/**
 * The denominator coefficients used in the Lancsoz polynomial. These values
 * are dependent on g and are taken from Boost's calculations of g.
 * @type {Number[]}
 */
var lanczosDenominatorCoefficients = [0, 39916800, 120543840, 150917976, 105258076, 45995730, 13339535, 2637558, 357423, 32670, 1925, 66, 1];

/**
 * Evaluates the Lanczos sum as a rational polynomail at u. This method is
 * derived from Boost.
 * @param {Complex} u   A number or complex number-like object
 * @param {Complex}     The rational function evaluated at u
 */
var lanczosSum = function lanczosSum(u) {
   var num = 0;
   var denom = 0;

   var n = lanczosNumeratorCoefficients.length;

   if (u.real < 5) {
      for (var i = n; --i >= 0;) {
         num = add(lanczosNumeratorCoefficients[i], multiply(num, u));
         denom = add(lanczosDenominatorCoefficients[i], multiply(denom, u));
      }
   } else {
      for (var i = 0; i < n; ++i) {
         num = add(lanczosNumeratorCoefficients[i], divide(num, u));
         denom = add(lanczosDenominatorCoefficients[i], divide(denom, u));
      }
   }

   return divide(num, denom);
};

/**
 * The gamma function of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The gamma of u
 */
var gamma = exports.gamma = function gamma(u) {
   var complexU = toComplex(u);
   var realPart = complexU.real;

   // The number is a real integer whose factorial we have precalculated.
   if (complexU.imaginary === 0 && realPart === Math.floor(realPart)) {
      if (realPart < 0) {
         // Gamma is not defined at negative integers
         return new _complex2.default(NaN);
      } else if (realPart === 0) {
         // Gamma is infinite at 0
         return new _complex2.default(Number.POSITIVE_INFINITY);
      } else if (realPart < factorials.length - 1) {
         return new _complex2.default(factorials[realPart - 1]);
      } else {
         return new _complex2.default(Number.POSITIVE_INFINITY);
      }
   }

   if (realPart < 0) {
      // Use the reflection formula to extend Lanczos' approximation to the
      // left complex plane.
      var sinPiu = sin(multiply(PI, u));
      return divide(PI, multiply(sinPiu, gamma(subtract(1, u))));
   }

   var y = add(complexU, lanczosGMinusHalf);

   return divide(multiply(pow(y, subtract(complexU, 0.5)), lanczosSum(complexU)), exp(y));
};
},{"./complex.js":"complex"}],"complex":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @overview Describes a complex number
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

/**
 * A complex number
 */

var _class =
/**
 * Constructs a complex number from real and imaginary parts
 * @param  {Number=0} real      The real part of the complex number
 * @param  {Number=0} imaginary The imaginary part of the complex number
 * @return {Complex}
 */
function _class() {
  var real = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
  var imaginary = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

  _classCallCheck(this, _class);

  this.real = real;
  this.imaginary = imaginary;
};

exports.default = _class;
},{}],"expression":[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _KnownUnaryFunctions;

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _complex = require('./complex.js');

var _complex2 = _interopRequireDefault(_complex);

var _complexMath = require('./complex-math.js');

var ComplexMath = _interopRequireWildcard(_complexMath);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } } /**
                                                                                                                                                           * @overview Describes an expression parser and evaluator over the complex
                                                                                                                                                           * numbers
                                                                                                                                                           * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
                                                                                                                                                           */

/**
 * Enumeration for known characters
 * @readonly
 * @enum string
 */
var KnownCharacters = {
   openParenthesis: '(',
   closeParenthesis: ')',
   openFloor: '⌊',
   closeFloor: '⌋',
   openCeiling: '⌈',
   closeCeiling: '⌉',
   openBracket: '[',
   closeBracket: ']',
   blackLetterCapitalI: 'ℑ',
   blackLetterCapitalR: 'ℜ',
   comma: ',',
   invisibleSeparator: '⁣',
   plus: '+',
   invisiblePlus: '⁤',
   minus: '-',
   minusSign: '−',
   times: '*',
   dotOperator: '⋅',
   multiplicationSign: '×',
   invisibleTimes: '⁢',
   divide: '/',
   divisionSign: '÷',
   fractionSlash: '⁄',
   divisionSlash: '∕',
   greekCapitalLetterGamma: 'Γ'
};

/**
 * Determines whether two types of parentheses match
 * @param  {string} openTerminal  The terminal of the opening parenthesis
 * @param  {string} closeTerminal The terminal of the closing parenthesis
 * @return {boolean}              Whether the closing terminal is a valid match
 * for the opening terminal
 */
var doParenthesesMatch = function doParenthesesMatch(openTerminal, closeTerminal) {
   return openTerminal === KnownCharacters.openParenthesis && closeTerminal === KnownCharacters.closeParenthesis || openTerminal === KnownCharacters.openFloor && closeTerminal === KnownCharacters.closeFloor || openTerminal === KnownCharacters.openCeiling && closeTerminal === KnownCharacters.closeCeiling || openTerminal === KnownCharacters.openBracket && closeTerminal === KnownCharacters.closeBracket;
};

/**
 * Enumeration for token types
 * @readonly
 * @enum {Number}
 */
var TokenType = {
   space: 1,
   symbol: 2,
   number: 3,
   openParenthesis: 4,
   closeParenthesis: 5,
   comma: 6,
   plus: 7,
   minus: 8,
   times: 9,
   invisibleTimes: 10,
   divide: 11,
   unaryFunction: 12,
   binaryFunction: 13
};

/**
 * Determines if a given token is an operator
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is an operator
 */
var isTokenOperator = function isTokenOperator(tokenType) {
   return tokenType === TokenType.plus || tokenType === TokenType.minus || tokenType === TokenType.times || tokenType === TokenType.invisibleTimes || tokenType === TokenType.divide;
};

/**
 * Determines if a given token is a function
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is a function
 */
var isTokenFunction = function isTokenFunction(tokenType) {
   return tokenType === TokenType.unaryFunction || tokenType === TokenType.binaryFunction;
};

/**
 * Determines if a given token is a value
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token is a value
 */
var isTokenValue = function isTokenValue(tokenType) {
   return tokenType === TokenType.symbol || tokenType === TokenType.number;
};

/**
 * Determines if a given token ends the current scope
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token ends the current scope
 */
var isTokenScopeEnding = function isTokenScopeEnding(tokenType) {
   return tokenType === TokenType.closeParenthesis || tokenType === TokenType.comma;
};

/**
 * Determines if a given token forces a subexpression to be an unary function
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token forces the subexpression to
 * be an unary function
 */
var isTokenUnaryForcing = function isTokenUnaryForcing(tokenType) {
   return tokenType === TokenType.openParenthesis || tokenType === TokenType.comma ||

   // Plus and minus are unary operators at the start of a subexpression or
   // after an infix operator
   tokenType === TokenType.plus || tokenType === TokenType.minus || tokenType === TokenType.times || tokenType === TokenType.divide;
};

/**
 * Determines whether this token implies that a multiplication has taken place
 * @param  {TokenType} tokenType The type of the token
 * @return {boolean}             Whether the token implies that a multiplication
 * has taken place
 */
var tokenImpliesMultiplication = function tokenImpliesMultiplication(tokenType) {
   return tokenType === TokenType.openParenthesis || tokenType === TokenType.number || tokenType === TokenType.symbol || tokenType === TokenType.unaryFunction || tokenType === TokenType.binaryFunction;
};

/**
 * A token in an expression
 */

var Token =
/**
 * Constructs a token given a token type and terminal
 * @param  {TokenType}  tokenType The type of the token
 * @param  {string}     terminal  The terminal string of the token
 * @return {Token}
 */
function Token(tokenType, terminal) {
   _classCallCheck(this, Token);

   this.tokenType = tokenType;
   this.terminal = terminal;
};

/**
 * Determines if the left token is of lower or equal precedence to the right
 * token for the purpose of the Shunting-Yard Algorithm
 * @param  {TokenType} leftToken  The type of the left token
 * @param  {TokenType} rightToken The type of the right token
 * @return {boolean}              Whether the left token is of lower or equal
 * precedence to the right token
 */

var isLeftTokenLowerOrEqualPrecedence = function isLeftTokenLowerOrEqualPrecedence(leftToken, rightToken) {
   return(
      // Invisible Times has the highest precedence of the operators since it is
      // elided in order to imply a strong coupling between terms
      rightToken === TokenType.invisibleTimes ||

      // Non-operators all have the same precedence
      !isTokenOperator(leftToken) && !isTokenOperator(rightToken) ||

      // Operators, except for invisible times, have lower precedence than
      // non-operators
      isTokenOperator(leftToken) && leftToken !== TokenType.invisibleTimes && !isTokenOperator(rightToken) ||

      // Times and divide have the second highest precedence amongst operators
      rightToken === TokenType.times || rightToken === TokenType.divide ||

      // The right token must be plus or minus so verify that the left token is
      // also plus or minus
      leftToken === TokenType.plus || leftToken === TokenType.minus
   );
};

/**
 * Converts an infix operator into a binary function
 * @param  {Token} token The operator token
 * @return {Token}       A binary function token
 */
var operatorToBinaryFunction = function operatorToBinaryFunction(token) {
   if (!isTokenOperator(token.tokenType)) {
      throw new Error('Assertion failed: expected operator token');
   }

   return new Token(TokenType.binaryFunction, token.terminal);
};

/**
 * An exception thrown when a syntactically-malformed expression is encountered
 */

var ExpressionSyntaxError = (function (_Error) {
   _inherits(ExpressionSyntaxError, _Error);

   /**
    * Constructs an ExpressionSyntaxError
    * @param  {string}                message The exception message
    * @return {ExpressionSyntaxError}
    */

   function ExpressionSyntaxError(message) {
      _classCallCheck(this, ExpressionSyntaxError);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ExpressionSyntaxError).call(this, message));

      _this.message = message;
      return _this;
   }

   return ExpressionSyntaxError;
})(Error);

/**
 * Coverts an expression from infix notation to reverse polish notation using
 * the Shunting-Yard Algorithm
 * @param  {Token[]} tokens An array of tokens in infix-notation
 * @return {Token[]}        An array of tokens in reverse polish notation
 */

var convertToReversePolishNotation = function convertToReversePolishNotation(tokens) {
   // The current stack of operators. This uses shift/unshift so that the first
   // element is the top of the stack.
   var ops = [];

   // The tokens in reverse polish notation
   var rpn = [];

   tokens.forEach(function (token, index) {
      if (isTokenValue(token.tokenType)) {
         rpn.push(token);
      } else if (token.tokenType === TokenType.openParenthesis) {
         ops.unshift(token);
      } else if (isTokenScopeEnding(token.tokenType)) {
         while (ops.length !== 0 && ops[0].tokenType !== TokenType.openParenthesis) {
            if (isTokenOperator(ops[0].tokenType)) {
               rpn.push(operatorToBinaryFunction(ops[0]));
            } else {
               rpn.push(ops[0]);
            }

            ops.shift();
         }

         if (ops.length === 0 || ops[0].tokenType !== TokenType.openParenthesis) {
            if (token.tokenType === TokenType.comma) {
               throw new ExpressionSyntaxError('Misplaced comma');
            } else if (token.terminal === KnownCharacters.closeParenthesis) {
               throw new ExpressionSyntaxError('Too many close parentheses');
            } else {
               throw new ExpressionSyntaxError('Mismatched circumfix operator');
            }
         }

         if (ops.length !== 0 && token.tokenType === TokenType.closeParenthesis) {
            if (!doParenthesesMatch(ops[0].terminal, token.terminal)) {
               throw new ExpressionSyntaxError('Mismatched circumfix operator');
            }

            // Pop open parenthesis
            ops.shift();

            if (ops.length !== 0 && isTokenFunction(ops[0].tokenType)) {
               rpn.push(ops[0]);
               ops.shift();
            }
         }
      } else if (isTokenOperator(token.tokenType)) {
         // Check for a right hand operand. This is required because a syntax
         // error elsewhere in the expression may create an opporunity for an
         // operand to appear - for example "real(2, 3) +"
         var nextIndex = index + 1;
         if (nextIndex >= tokens.length) {
            throw new ExpressionSyntaxError('Missing right hand operand');
         }

         while (ops.length !== 0 && isLeftTokenLowerOrEqualPrecedence(token.tokenType, ops[0].tokenType)) {
            if (isTokenOperator(ops[0].tokenType)) {
               rpn.push(operatorToBinaryFunction(ops[0]));
            } else if (isTokenFunction(ops[0].tokenType)) {
               rpn.push(ops[0]);
            } else {
               break;
            }

            ops.shift();
         }

         ops.unshift(token);
      } else if (token.tokenType === TokenType.unaryFunction) {
         ops.unshift(token);
      } else if (token.tokenType === TokenType.binaryFunction) {
         var nextIndex = index + 1;
         if (nextIndex >= tokens.length || tokens[nextIndex].tokenType !== TokenType.openParenthesis) {
            throw new ExpressionSyntaxError('Binary functions must use parentheses');
         }

         ops.unshift(token);
      } else {
         throw new Error('Assertion failed: unknown token type');
      }
   });

   while (ops.length !== 0) {
      if (ops[0].tokenType === TokenType.openParenthesis) {
         if (ops[0].terminal === KnownCharacters.openParenthesis) {
            throw new ExpressionSyntaxError('Too many open parentheses');
         } else {
            throw new ExpressionSyntaxError('Mismatched circumfix operator');
         }
      }

      if (isTokenOperator(ops[0].tokenType)) {
         rpn.push(operatorToBinaryFunction(ops[0]));
      } else {
         rpn.push(ops[0]);
      }

      ops.shift();
   }

   if (rpn.length === 0) {
      throw new ExpressionSyntaxError('Empty expression');
   }

   return rpn;
};

/**
 * The set of known constants
 * @readonly
 * @enum {Complex}
 */
var KnownConstants = {
   e: ComplexMath.E,
   i: ComplexMath.I,
   pi: ComplexMath.PI
};

/**
 * Whether a terminal is a known constant
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known constant
 */
var isKnownConstant = function isKnownConstant(terminal) {
   return KnownConstants.hasOwnProperty(terminal);
};

/**
 * Converts a terminal into either the value of a known constant or a complex
 * number
 * @param  {string} terminal The terminal
 * @return {Complex}         The complex value of the terminal
 */
var numberFromTerminal = function numberFromTerminal(terminal) {
   if (isKnownConstant(terminal)) {
      return KnownConstants[terminal];
   }

   return new _complex2.default(Number.parseFloat(terminal));
};

/**
 * The known unary functions
 * @readonly
 * @enum {callback}
 */
var KnownUnaryFunctions = (_KnownUnaryFunctions = {
   abs: ComplexMath.abs,
   arccos: ComplexMath.acos,
   arccosh: ComplexMath.acosh,
   arccot: ComplexMath.acot,
   arccoth: ComplexMath.acoth,
   arccsc: ComplexMath.acsc,
   arccsch: ComplexMath.acsch,
   arcsec: ComplexMath.asec,
   arcsech: ComplexMath.asech,
   arcsin: ComplexMath.asin,
   arcsinh: ComplexMath.asinh,
   arctan: ComplexMath.atan,
   arctanh: ComplexMath.atanh,
   arg: ComplexMath.arg,
   ceil: ComplexMath.ceil,
   conj: ComplexMath.conj,
   cos: ComplexMath.cos,
   cosh: ComplexMath.cosh,
   cot: ComplexMath.cot,
   coth: ComplexMath.coth,
   csc: ComplexMath.csc,
   csch: ComplexMath.csch,
   exp: ComplexMath.exp,
   floor: ComplexMath.floor,
   frac: ComplexMath.frac,
   gamma: ComplexMath.gamma
}, _defineProperty(_KnownUnaryFunctions, KnownConstants.greekCapitalLetterGamma, ComplexMath.gamma), _defineProperty(_KnownUnaryFunctions, 'imag', ComplexMath.imag), _defineProperty(_KnownUnaryFunctions, KnownConstants.blackLetterCapitalI, ComplexMath.imag), _defineProperty(_KnownUnaryFunctions, 'log10', ComplexMath.log10), _defineProperty(_KnownUnaryFunctions, 'lg', ComplexMath.log2), _defineProperty(_KnownUnaryFunctions, 'ln', ComplexMath.ln), _defineProperty(_KnownUnaryFunctions, '-', ComplexMath.negate), _defineProperty(_KnownUnaryFunctions, 'nint', ComplexMath.nint), _defineProperty(_KnownUnaryFunctions, 'norm', ComplexMath.norm), _defineProperty(_KnownUnaryFunctions, 'real', ComplexMath.real), _defineProperty(_KnownUnaryFunctions, KnownConstants.blackLetterCapitalR, ComplexMath.real), _defineProperty(_KnownUnaryFunctions, 'sec', ComplexMath.sec), _defineProperty(_KnownUnaryFunctions, 'sech', ComplexMath.sech), _defineProperty(_KnownUnaryFunctions, 'sin', ComplexMath.sin), _defineProperty(_KnownUnaryFunctions, 'sinh', ComplexMath.sinh), _defineProperty(_KnownUnaryFunctions, 'sqrt', ComplexMath.sqrt), _defineProperty(_KnownUnaryFunctions, 'tan', ComplexMath.tan), _defineProperty(_KnownUnaryFunctions, 'tanh', ComplexMath.tanh), _KnownUnaryFunctions);

/**
 * Whether a terminal is a known unary function
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known unary function
 */
var isKnownUnaryFunction = function isKnownUnaryFunction(terminal) {
   return KnownUnaryFunctions.hasOwnProperty(terminal);
};

/**
 * Converts a terminal into an unary function
 * @param  {string}   terminal The terminal
 * @return {callback}          The function implementing the unary function
 */
var unaryFunctionFromTerminal = function unaryFunctionFromTerminal(terminal) {
   if (isKnownUnaryFunction(terminal)) {
      return KnownUnaryFunctions[terminal];
   }

   throw new Error('Assertion failed: attempting to create unknown unary function');
};

/**
 * The known binary functions
 * @readonly
 * @enum {callback}
 */
var KnownBinaryFunctions = {
   log: ComplexMath.log,
   mod: ComplexMath.mod,
   pow: ComplexMath.pow,
   '+': ComplexMath.add,
   '-': ComplexMath.subtract,
   '*': ComplexMath.multiply,
   '/': ComplexMath.divide
};

/**
 * Whether a terminal is a known binary function
 * @param  {string} terminal The terminal
 * @return {boolean}         Whether the terminal is a known binary function
 */
var isKnownBinaryFunction = function isKnownBinaryFunction(terminal) {
   return KnownBinaryFunctions.hasOwnProperty(terminal);
};

/**
 * Converts a terminal into an binary function
 * @param  {string}   terminal The terminal
 * @return {callback}          The function implementing the binary function
 */
var binaryFunctionFromTerminal = function binaryFunctionFromTerminal(terminal) {
   if (isKnownBinaryFunction(terminal)) {
      return KnownBinaryFunctions[terminal];
   }

   throw new Error('Assertion failed: attempting to create unknown binary function');
};

/**
 * Processes a set of tokens to add implied elements such as invisible times or
 * to differentiate between elements which are ambiguous at tokenization time
 * such as unary vs. binary plus and minus.
 * @param  {Token[]} tokens An array of tokens
 * @return {Token[]}        An array of tokens in which implied and ambiguous
 * elements are resolved
 */
var processHiddenElements = function processHiddenElements(tokens) {
   var processedTokens = [];
   tokens.forEach(function (token, index) {
      var nextIndex = index + 1;
      var isLastToken = nextIndex === tokens.length;

      switch (token.tokenType) {
         case TokenType.space:
            // Spaces are no longer needed for correct processing
            break;

         case TokenType.closeParenthesis:
         case TokenType.number:
         case TokenType.symbol:
            processedTokens.push(token);

            if (!isLastToken && tokenImpliesMultiplication(tokens[nextIndex].tokenType)) {
               processedTokens.push(new Token(TokenType.invisibleTimes, '*'));
            }
            break;

         case TokenType.comma:
            if (processedTokens.length === 0 || processedTokens[processedTokens.length - 1].tokenType === TokenType.openParenthesis || !isLastToken && tokens[nextIndex].tokenType === TokenType.closeParenthesis) {
               throw new ExpressionSyntaxError("Misplaced comma");
            }

            processedTokens.push(token);
            break;

         case TokenType.plus:
         case TokenType.minus:
            if (processedTokens.length === 0 || isTokenUnaryForcing(processedTokens[processedTokens.length - 1].tokenType)) {
               if (token.tokenType === TokenType.minus) {
                  // Unary plus is the identity function, so ignore it
                  // altogether
                  processedTokens.push(new Token(TokenType.unaryFunction, token.terminal));
               }
            } else {
               processedTokens.push(token);
            }

            break;

         case TokenType.openParenthesis:
         case TokenType.times:
         case TokenType.invisibleTimes:
         case TokenType.divide:
         case TokenType.unaryFunction:
         case TokenType.binaryFunction:
            processedTokens.push(token);
            break;
      }
   });

   return processedTokens;
};

/**
 * Determines whether a character is alphabetic
 * @param  {string} c The character
 * @return {boolean}  Whether the character is alphabetic
 */
var isAlphabeticCharacter = function isAlphabeticCharacter(c) {
   return (/[A-Za-z]/.test(c)
   );
};

/**
 * Determines whether a character is a digit
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a digit
 */
var isDigitCharacter = function isDigitCharacter(c) {
   return (/\d/.test(c)
   );
};

/**
 * Determines whether a character is a numeric
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a numeric
 */
var isNumericCharacter = function isNumericCharacter(c) {
   return (/\d|\./.test(c)
   );
};

/**
 * Determines whether a character is a space
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a space
 */
var isSpaceCharacter = function isSpaceCharacter(c) {
   return (/\s/.test(c)
   );
};

/**
 * Determines whether a character is a high surrogate
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a high surrogate
 */
var isHighSurrogateCharacter = function isHighSurrogateCharacter(c) {
   return c.charCodeAt(0) >= 0xD800 && c.charCodeAt(0) <= 0xDBFF;
};

/**
 * Determines whether a character is a loe surrogate
 * @param  {string} c The character
 * @return {boolean}  Whether the character is a low surrogate
 */
var isLowSurrogateCharacter = function isLowSurrogateCharacter(c) {
   return c.charCodeAt(0) >= 0xDC00 && c.charCodeAt(0) <= 0xDFFF;
};

/**
 * Finds the ending index of a symbol
 * @param  {number}   startIndex The starting index of the symbol
 * @param  {string}   expression The expression
 * points
 * @return {number}              The ending index of the symbol
 */
var findSymbolEndIndex = function findSymbolEndIndex(startIndex, expression) {
   var startCharacter = expression[startIndex];

   var endIndex = undefined;
   if (isLowSurrogateCharacter(startCharacter)) {
      throw new ExpressionSyntaxError('Encountered low surrogate without a corresponding high surrogate');
   } else if (isHighSurrogateCharacter(startCharacter)) {
      endIndex = startIndex + 2;
      if (endIndex > expression.length || !isLowSurrogateCharacter(expression[startIndex + 1])) {
         throw new ExpressionSyntaxError('Encountered high surrogate without a corresponding low surrogate');
      }
   } else if (isAlphabeticCharacter(startCharacter)) {
      var substring = expression.substring(startIndex);

      var relativeEndIndex = substring.search(/[^A-Za-z]|$/);
      if (relativeEndIndex !== -1 && isDigitCharacter(expression[relativeEndIndex])) {
         // Some symbols can have digits directly after, such as log10
         substring = substring.substring(relativeEndIndex);
         relativeEndIndex += substring.search(/\D/);
      }

      if (relativeEndIndex !== -1) {
         endIndex = relativeEndIndex + startIndex;
      } else {
         endIndex = startIndex + 1;
      }
   } else {
      // Single character Unicode symbol
      endIndex = startIndex + 1;
   }

   return endIndex;
};

/**
 * Tokenizes an expression
 * @param  {string} expression The expression to tokenize
 * @return {Token}             The set of tokens
 */
var tokenize = function tokenize(expression) {
   // This method explicitly does not support using | to mean absolute since
   // allowing this notation as well as invisible times leads to ambiguous
   // expressions such as |x|x|x|
   var tokens = [];
   var startIndex = 0;
   while (startIndex !== expression.length) {
      var character = expression[startIndex];

      if (character === '\u0000') {
         // Reached the end of the string, explicitly not supporting embedded
         // nulls
         break;
      } else if (isSpaceCharacter(character)) {
         tokens.push(new Token(TokenType.space, ' '));
         ++startIndex;
      } else if (character === KnownCharacters.openParenthesis) {
         tokens.push(new Token(TokenType.openParenthesis, '('));
         ++startIndex;
      } else if (character === KnownCharacters.openFloor) {
         tokens.push(new Token(TokenType.unaryFunction, 'floor'));
         tokens.push(new Token(TokenType.openParenthesis, KnownCharacters.openFloor));
         ++startIndex;
      } else if (character === KnownCharacters.openCeiling) {
         tokens.push(new Token(TokenType.unaryFunction, 'ceil'));
         tokens.push(new Token(TokenType.openParenthesis, KnownCharacters.openCeiling));
         ++startIndex;
      } else if (character === KnownCharacters.openBracket) {
         tokens.push(new Token(TokenType.unaryFunction, 'nint'));
         tokens.push(new Token(TokenType.openParenthesis, KnownCharacters.openBracket));
         ++startIndex;
      } else if (character === KnownCharacters.closeParenthesis || character === KnownCharacters.closeFloor || character === KnownCharacters.closeCeiling || character === KnownCharacters.closeBracket) {
         tokens.push(new Token(TokenType.closeParenthesis, character));
         ++startIndex;
      } else if (character === KnownCharacters.comma || character === KnownCharacters.invisibleSeparator) {
         tokens.push(new Token(TokenType.comma, ','));
         ++startIndex;
      } else if (isNumericCharacter(character)) {
         // Tokenize number
         var substring = expression.substring(startIndex);
         var terminal = substring.match(/^\d+(?:\.\d+)?/);
         tokens.push(new Token(TokenType.number, terminal[0]));

         startIndex += terminal[0].length;
      } else if (character === KnownCharacters.plus || character === KnownCharacters.invisiblePlus) {
         tokens.push(new Token(TokenType.plus, '+'));
         ++startIndex;
      } else if (character === KnownCharacters.minus || character === KnownCharacters.minusSign) {
         tokens.push(new Token(TokenType.minus, '-'));
         ++startIndex;
      } else if (character === KnownCharacters.times || character === KnownCharacters.dotOperator || character === KnownCharacters.multiplicationSign) {
         tokens.push(new Token(TokenType.times, '*'));
         ++startIndex;
      } else if (character === KnownCharacters.invisibleTimes) {
         tokens.push(new Token(TokenType.invisibleTimes, '*'));
         ++startIndex;
      } else if (character === KnownCharacters.divide || character === KnownCharacters.divisionSign || character === KnownCharacters.fractionSlash || character === KnownCharacters.divisionSlash) {
         tokens.push(new Token(TokenType.divide, '/'));
         ++startIndex;
      } else {
         var endIndex = findSymbolEndIndex(startIndex, expression);
         var terminal = expression.substring(startIndex, endIndex);

         var tokenType = undefined;
         if (isKnownConstant(terminal)) {
            tokenType = TokenType.number;
         } else if (isKnownUnaryFunction(terminal)) {
            tokenType = TokenType.unaryFunction;
         } else if (isKnownBinaryFunction(terminal)) {
            tokenType = TokenType.binaryFunction;
         } else {
            tokenType = TokenType.symbol;
         }

         tokens.push(new Token(tokenType, terminal));
         startIndex = endIndex;
      }
   }

   return tokens;
};

/**
 * A phrase representing a number
 */

var NumberPhrase = (function () {
   /**
    * Constructs a NumberPhrase from a number
    * @param  {number|Complex} value The value of the number phrase
    * @return {NumberPhrase}
    */

   function NumberPhrase(value) {
      _classCallCheck(this, NumberPhrase);

      this.value = value;
   }

   /**
    * Evaluates the phrase
    * @return {number|Complex} The value of the phrase
    */

   _createClass(NumberPhrase, [{
      key: 'evaluate',
      value: function evaluate() {
         return this.value;
      }
   }]);

   return NumberPhrase;
})();

/**
 * An error raised when the expression is syntactically valid but cannot be
 * evaluated
 */

var ExpressionEvaluationError = (function (_Error2) {
   _inherits(ExpressionEvaluationError, _Error2);

   /**
    * Constructs an ExpressionEvaluationError
    * @param  {string}                    message The exception message
    * @return {ExpressionEvaluationError}
    */

   function ExpressionEvaluationError(message) {
      _classCallCheck(this, ExpressionEvaluationError);

      var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ExpressionEvaluationError).call(this, message));

      _this2.message = message;
      return _this2;
   }

   return ExpressionEvaluationError;
})(Error);

/**
 * A phrase representing a variable
 */

var VariablePhrase = (function () {
   /**
    * Constructs a VariablePhrase from a symbol
    * @param  {string}         symbol The symbol of the variable
    * @return {VariablePhrase}
    */

   function VariablePhrase(symbol) {
      _classCallCheck(this, VariablePhrase);

      this.symbol = symbol;
   }

   /**
    * Evaluates the phrase
    * @param  {Object.<string, number|Complex>=} symbols A dictionary of
    * symbols and their values
    * @return {number|Complex} The value of the phrase
    */

   _createClass(VariablePhrase, [{
      key: 'evaluate',
      value: function evaluate() {
         var symbols = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         if (!symbols.hasOwnProperty(this.symbol)) {
            throw new ExpressionEvaluationError('Variable ' + this.symbol + ' does not have a defined value');
         }

         return symbols[this.symbol];
      }
   }]);

   return VariablePhrase;
})();

/**
 * A phrase representing a function
 */

var FunctionPhrase = (function () {
   /**
    * Constructs a FunctionPhrase from a function
    * @param  {callback}                                         evalFunction The
    * function used to evaluate this phrase
    * @param  {NumberPhrase[]|VariablePhrase[]|FunctionPhrase[]} children The child
    * phrases of this phrase
    * @return {FunctionPhrase}
    */

   function FunctionPhrase(evalFunction, children) {
      _classCallCheck(this, FunctionPhrase);

      if (children.length !== evalFunction.length) {
         throw new ExpressionSyntaxError('Improper number of arguments');
      }

      this.evalFunction = evalFunction;
      this.children = children;
   }

   /**
    * Evaluates the phrase
    * @param  {Object.<string, number|Complex>=} symbols A dictionary of
    * symbols and their values
    * @return {number|Complex} The value of the phrase
    */

   _createClass(FunctionPhrase, [{
      key: 'evaluate',
      value: function evaluate() {
         var symbols = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         return this.evalFunction.apply(null, this.children.map(function (phrase) {
            return phrase.evaluate(symbols);
         }));
      }
   }]);

   return FunctionPhrase;
})();

/**
 * Builds a parse tree from a tokenized expression
 * @param  {Token[]} tokens A tokenized expression
 * @return {NumberPhrase|VariablePhrase|FunctionPhrase} The root of the parse
 * tree
 */

var buildParseTree = function buildParseTree(tokens) {
   var stack = [];

   tokens.forEach(function (token) {
      switch (token.tokenType) {
         case TokenType.number:
            stack.push(new NumberPhrase(numberFromTerminal(token.terminal)));
            break;

         case TokenType.symbol:
            stack.push(new VariablePhrase(token.terminal));
            break;

         case TokenType.unaryFunction:
            if (stack.length === 0) {
               throw new ExpressionSyntaxError('Too few arguments for function ' + token.terminal);
            }

            stack.push(new FunctionPhrase(unaryFunctionFromTerminal(token.terminal), [stack.pop()]));
            break;

         case TokenType.binaryFunction:
            if (stack.length < 2) {
               throw new ExpressionSyntaxError('Too few arguments for function ' + token.terminal);
            }

            var children = [stack.pop(), stack.pop()].reverse();
            stack.push(new FunctionPhrase(binaryFunctionFromTerminal(token.terminal), children));
            break;

         default:
            throw new Error('Assertion failed: unexpected token type');
      }
   });

   if (stack.length === 0) {
      throw new ExpressionSyntaxError('Empty expression');
   } else if (stack.length !== 1) {
      throw new ExpressionSyntaxError('Unexpected expression');
   }

   return stack[0];
};

/**
 * An expression
 */

var _class = (function () {
   /**
    * Constructs an expression from a string
    * @param  {string} expression The expression string
    * @return {Expression}
    */

   function _class(expression) {
      _classCallCheck(this, _class);

      this.phrase = buildParseTree(convertToReversePolishNotation(processHiddenElements(tokenize(expression))));
   }

   /**
    * Evaluates the expression
    * @param  {Object.<string, number|Complex>=} symbols A dictionary of
    * symbols and their values
    * @return {number|Complex} The value of the expression
    */

   _createClass(_class, [{
      key: 'evaluate',
      value: function evaluate() {
         var symbols = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

         return this.phrase.evaluate(symbols);
      }
   }]);

   return _class;
})();

exports.default = _class;
},{"./complex-math.js":"complex-math","./complex.js":"complex"}]},{},[]);
