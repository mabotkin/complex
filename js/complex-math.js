/**
 * @overview Describes an object analogous to the built-in Math object but over
 * the complex numbers
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

import Complex from './complex.js';

/**
 * A common method to convert between various number-like objects to {Complex}
 * @param  {*} u     An object to convert to a {Complex}
 * @return {Complex}
 */
const toComplex = u => {
   if (u instanceof Complex) {
      return u;
   } else if (u instanceof Number) {
      return new Complex(u.valueOf);
   } else if (typeof u === 'number') {
      return new Complex(u);
   } else if ((typeof u === 'object') &&
      (u.hasOwnProperty('real') && (typeof u.real === 'number')) &&
      (u.hasOwnProperty('imaginary') && (typeof u.imaginary === 'number'))) {
      return new Complex(u.real, u.imaginary);
   }

   throw new TypeError('Expected numeric type');
};

/**
 * Euler's constant
 * @type {Complex}
 */
export const E = new Complex(Math.E);

/**
 * The imaginary unit
 * @type {Complex}
 */
export const I = new Complex(0, 1);

/**
 * Natural logarithm of 10
 * @type {Complex}
 */
export const LN10 = new Complex(Math.LN10);

/**
 * Natural logarithm of 2
 * @type {Complex}
 */
export const LN2 = new Complex(Math.LN2);

/**
 * Base 2 logarithm of E
 * @type {Complex}
 */
export const LOG2E = new Complex(Math.LOG2E);

/**
 * Base 10 logarithm of E
 * @type {Complex}
 */
export const LOG10E = new Complex(Math.LOG10E);

/**
 * Ratio of the circumference of a circle to its diameter
 * @type {Complex}
 */
export const PI = new Complex(Math.PI);

/**
 * Square root of 1/2
 * @type {Complex}
 */
export const SQRT1_2 = new Complex(Math.SQRT1_2);

/**
 * Square root of 2
 * @type {Complex}
 */
export const SQRT2 = new Complex(Math.SQRT2);

/**
 * The real part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The real part of the number
 */
export const real = u => new Complex(toComplex(u).real);

/**
 * The imaginary part of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The imaginary part of the number
 */
export const imaginary = u => new Complex(toComplex(u).imaginary);

/**
 * Adds two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The sum of u and v
 */
export const add = (u, v) =>
   new Complex(
      real(u).real + real(v).real,
      imaginary(u).real + imaginary(v).real);

/**
 * Subtracts two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u subtracting v
 */
export const subtract = (u, v) =>
   new Complex(
      real(u).real - real(v).real,
      imaginary(u).real - imaginary(v).real);

/**
 * Multiplies two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The product of u and v
 */
export const multiply = (u, v) => {
   const complexU = toComplex(u);
   const complexV = toComplex(v);

   return new Complex(
      complexU.real * complexV.real - complexU.imaginary * complexV.imaginary,
      complexU.real * complexV.imaginary + complexU.imaginary * complexV.real);
};

/**
 * Negates a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The negation of u
 */
export const negate = u => {
   const complexU = toComplex(u);
   return new Complex(-complexU.real, -complexU.imaginary);
};

/**
 * The argument or phase of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The argument of u
 */
export const arg = u =>
   new Complex(Math.atan2(imaginary(u).real, real(u).real));

/**
 * The smallest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The ceiling of u
 */
export const ceil = u =>
   new Complex(Math.ceil(real(u).real), Math.ceil(imaginary(u).real));

/**
 * The complex conjugate of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The conjugate of u
 */
export const conj = u => new Complex(real(u).real, -(imaginary(u).real));

/**
 * Eular's constant raised to the power of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} Euler's constant raised to the power of u
 */
export const exp = u => {
   const complexU = toComplex(u);
   const newAbs = Math.exp(complexU.real);
   const newArg = complexU.imaginary;
   return new Complex(newAbs * Math.cos(newArg), newAbs * Math.sin(newArg));
};

/**
 * The cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosine of u
 */
export const cos = u => {
   const iu = multiply(I, u);
   return divide(add(exp(iu), exp(negate(iu))), 2);
};

/**
 * The hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosine of u
 */
export const cosh = u =>
   divide(add(exp(u), exp(negate(u))), 2);

/**
 * The largest Gaussian Integer less than or equal to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The floor of u
 */
export const floor = u =>
   new Complex(Math.floor(real(u).real), Math.floor(imaginary(u).real));

/**
 * The fractional part of a real number
 * @param  {Number} n The number
 * @return {Number}   The fractional part of the number
 */
const realFrac = n => (n >= 0) ? (n - Math.floor(n)) : (n - Math.ceil(n));

/**
 * The fractional part of a complex number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The fractional part of u
 */
export const frac = u => {
   const complexU = toComplex(u);
   return new Complex(realFrac(complexU.real), realFrac(complexU.imaginary));
};

/**
 * The natural log (logarithm base e) of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The natural log of u
 */
export const ln = u =>
   new Complex(Math.log(abs(u).real), arg(u).real);

/**
 * The nearest Gaussian Integer to a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The nearest Gaussian Integer to u
 */
export const nint = u => floor(add(u, new Complex(0.5, 0.5)));

/**
 * The norm of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The norm of u
 */
export const norm = u =>
   new Complex(
      real(u).real * real(u).real +
      imaginary(u).real * imaginary(u).real);

/**
 * The absolute value, or magnitude, of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The absolute value of u
 */
export const abs = u => new Complex(Math.sqrt(norm(u).real));

/**
 * Divides two numbers
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of dividing u by v
 */
export const divide = (u, v) => {
   const complexU = toComplex(u);
   const complexV = toComplex(v);
   const normV = norm(v).real;

   return new Complex(
      (complexU.real * complexV.real + complexU.imaginary * complexV.imaginary) / normV,
      (complexU.imaginary * complexV.real - complexU.real * complexV.imaginary) / normV);
};

/**
 * The complex modulus of a number
 * @param  {*} u     A number or complex number-like object
 * @param  {*} v     A number or complex number-like object
 * @return {Complex} The result of u mod v
 */
export const mod = (u, v) => subtract(u, multiply(v, floor(divide(u, v))));

/**
 * The logarithm of a number to a given base
 * @param  {*} base  A number or complex number-like object that is the base of
 * the logarithm
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base base of u
 */
export const log = (base, u) => divide(ln(u), ln(base));

/**
 * The logarithm base 2 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 2 of u
 */
export const log2 = u => divide(ln(u), Math.LN2);

/**
 * The logarithm base 10 of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The logarithm base 10 of u
 */
export const log10 = u => divide(ln(u), Math.LN10);

/**
 * The exponent of a base raised to a power
 * @param  {*} base  A number or complex number-like object that is the base of
 * the exponent
 * @param  {*} power A number or complex number-like object that is the power of
 * the exponent
 * @return {Complex} The exponent of base raised to power
 */
export const pow = (base, power) => exp(multiply(power, ln(base)));

/**
 * The secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The secant of u
 */
export const sec = u => divide(1, cos(u));

/**
 * The hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic secant of u
 */
export const sech = u => divide(1, cosh(u));

/**
 * The sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The sine of u
 */
export const sin = u => {
   const iu = multiply(I, u);
   return divide(subtract(exp(iu), exp(negate(iu))), new Complex(0, 2));
};

/**
 * The hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic sine of u
 */
export const sinh = u =>
   divide(subtract(exp(u), exp(negate(u))), 2);

/**
 * The cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cosecant of u
 */
export const csc = u => divide(1, sin(u));

/**
 * The hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cosecant of u
 */
export const csch = u => divide(1, sinh(u));

/**
 * The square root of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The square root of u
 */
export const sqrt = u => {
   const complexU = toComplex(u);
   const absU = abs(u).real;

   return new Complex(
      Math.sqrt((complexU.real + absU) / 2),
      Math.sign(complexU.imaginary) * Math.sqrt((-complexU.real + absU) / 2));
};

/**
 * The tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The tangent of u
 */
export const tan = u => {
   const exp_2iu = exp(multiply(new Complex(0, 2), u));
   return divide(subtract(exp_2iu, 1), multiply(I, add(exp_2iu, 1)));
};

/**
 * The hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic tangent of u
 */
export const tanh = u => {
   const exp_u = exp(u);
   const exp_negate_u = exp(negate(u));
   return divide(subtract(exp_u, exp_negate_u), add(exp_u, exp_negate_u));
};

/**
 * The cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The cotangent of u
 */
export const cot = u => divide(1, tan(u));

/**
 * The hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The hyperbolic cotangent of u
 */
export const coth = u => divide(1, tanh(u));

/**
 * The inverse cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosine of u
 */
export const acos = u =>
   add(
      Math.PI / 2,
      multiply(
         I,
         ln(
            add(
               multiply(I, u),
               sqrt(
                  subtract(
                     1,
                     multiply(u, u)))))));

/**
 * The inverse hyperbolic cosine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosine of u
 */
export const acosh = u =>
   ln(
      add(
         u,
         multiply(
            sqrt(add(u, 1)),
            sqrt(subtract(u, 1)))));

/**
 * The inverse cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cotangent of u
 */
export const acot = u =>
   multiply(
      divide(I, 2),
      subtract(
         ln(
            divide(subtract(u, I), u)),
         ln(
            divide(add(u, I), u))));

/**
 * The inverse hyperbolic cotangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cotangent of u
 */
export const acoth = u => {
   const reciprocal = divide(1, u);
   return divide(
      subtract(
         ln(add(1, reciprocal)),
         ln(subtract(1, reciprocal))),
      2);
};

/**
 * The inverse cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse cosecant of u
 */
export const acsc = u =>
   multiply(
      new Complex(0, -1),
      ln(
         add(
            sqrt(
               subtract(
                  1,
                  divide(1, multiply(u, u)))),
            divide(I, u))));

/**
 * The inverse hyperbolic cosecant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic cosecant of u
 */
export const acsch = u =>
   add(
      new Complex(0, -Math.PI / 2),
      multiply(I, acos(divide(I, u))));

/**
 * The inverse secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse secant of u
 */
export const asec = u =>
   add(
      new Complex(Math.PI / 2),
      multiply(
         I,
         ln(
            add(
               sqrt(
                  subtract(
                     1,
                     divide(1, multiply(u, u)))),
               divide(I, u)))));

/**
 * The inverse hyperbolic secant of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic secant of u
 */
export const asech = u => {
   const reciprocal = divide(1, u);
   return ln(
      add(
         multiply(
            sqrt(subtract(reciprocal, 1)),
            sqrt(add(reciprocal, 1))),
         reciprocal));
};

/**
 * The inverse sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse sine of u
 */
export const asin = u =>
   multiply(
      new Complex(0, -1),
      ln(
         add(
            multiply(I, u),
            sqrt(
               subtract(
                  1,
                  multiply(u, u))))));

/**
 * The inverse hyperbolic sine of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic sine of u
 */
export const asinh = u =>
   ln(
      add(
         u,
         sqrt(add(multiply(u, u), 1))));

/**
 * The inverse tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse tangent of u
 */
export const atan = u => {
   const iu = multiply(I, u);
   return multiply(
      divide(I, 2),
      subtract(
         ln(subtract(1, iu)),
         ln(add(1, iu))));
};

/**
 * The inverse hyperbolic tangent of a number
 * @param  {*} u     A number or complex number-like object
 * @return {Complex} The inverse hyperbolic tangent of u
 */
export const atanh = u =>
   divide(
      subtract(
         ln(add(1, u)),
         ln(subtract(1, u))),
      2);

/**
 * The values of some integer factorials.
 * @type {Number[]}
 */
const factorials = [
   1,
   1,
   2,
   6,
   24,
   120,
   720,
   5040,
   40320,
   362880,
   3628800,
   39916800,
   479001600,
   6227020800,
   87178291200,
   1307674368000,
   20922789888000,
   355687428096000,
   6402373705728000,
   121645100408832000,
   0.243290200817664e19,
   0.5109094217170944e20,
   0.112400072777760768e22,
   0.2585201673888497664e23,
   0.62044840173323943936e24,
   0.15511210043330985984e26,
   0.403291461126605635584e27,
   0.10888869450418352160768e29,
   0.304888344611713860501504e30,
   0.8841761993739701954543616e31,
   0.26525285981219105863630848e33,
   0.822283865417792281772556288e34,
   0.26313083693369353016721801216e36,
   0.868331761881188649551819440128e37,
   0.29523279903960414084761860964352e39,
   0.103331479663861449296666513375232e41,
   0.3719933267899012174679994481508352e42,
   0.137637530912263450463159795815809024e44,
   0.5230226174666011117600072241000742912e45,
   0.203978820811974433586402817399028973568e47,
   0.815915283247897734345611269596115894272e48,
   0.3345252661316380710817006205344075166515e50,
   0.1405006117752879898543142606244511569936e52,
   0.6041526306337383563735513206851399750726e53,
   0.265827157478844876804362581101461589032e55,
   0.1196222208654801945619631614956577150644e57,
   0.5502622159812088949850305428800254892962e58,
   0.2586232415111681806429643551536119799692e60,
   0.1241391559253607267086228904737337503852e62,
   0.6082818640342675608722521633212953768876e63,
   0.3041409320171337804361260816606476884438e65,
   0.1551118753287382280224243016469303211063e67,
   0.8065817517094387857166063685640376697529e68,
   0.427488328406002556429801375338939964969e70,
   0.2308436973392413804720927426830275810833e72,
   0.1269640335365827592596510084756651695958e74,
   0.7109985878048634518540456474637249497365e75,
   0.4052691950487721675568060190543232213498e77,
   0.2350561331282878571829474910515074683829e79,
   0.1386831185456898357379390197203894063459e81,
   0.8320987112741390144276341183223364380754e82,
   0.507580213877224798800856812176625227226e84,
   0.3146997326038793752565312235495076408801e86,
   0.1982608315404440064116146708361898137545e88,
   0.1268869321858841641034333893351614808029e90,
   0.8247650592082470666723170306785496252186e91,
   0.5443449390774430640037292402478427526443e93,
   0.3647111091818868528824985909660546442717e95,
   0.2480035542436830599600990418569171581047e97,
   0.1711224524281413113724683388812728390923e99,
   0.1197857166996989179607278372168909873646e101,
   0.8504785885678623175211676442399260102886e102,
   0.6123445837688608686152407038527467274078e104,
   0.4470115461512684340891257138125051110077e106,
   0.3307885441519386412259530282212537821457e108,
   0.2480914081139539809194647711659403366093e110,
   0.188549470166605025498793226086114655823e112,
   0.1451830920282858696340707840863082849837e114,
   0.1132428117820629783145752115873204622873e116,
   0.8946182130782975286851441715398316520698e117,
   0.7156945704626380229481153372318653216558e119,
   0.5797126020747367985879734231578109105412e121,
   0.4753643337012841748421382069894049466438e123,
   0.3945523969720658651189747118012061057144e125,
   0.3314240134565353266999387579130131288001e127,
   0.2817104114380550276949479442260611594801e129,
   0.2422709538367273238176552320344125971528e131,
   0.210775729837952771721360051869938959523e133,
   0.1854826422573984391147968456455462843802e135,
   0.1650795516090846108121691926245361930984e137,
   0.1485715964481761497309522733620825737886e139,
   0.1352001527678402962551665687594951421476e141,
   0.1243841405464130725547532432587355307758e143,
   0.1156772507081641574759205162306240436215e145,
   0.1087366156656743080273652852567866010042e147,
   0.103299784882390592625997020993947270954e149,
   0.9916779348709496892095714015418938011582e150,
   0.9619275968248211985332842594956369871234e152,
   0.942689044888324774562618574305724247381e154,
   0.9332621544394415268169923885626670049072e156,
   0.9332621544394415268169923885626670049072e158,
   0.9425947759838359420851623124482936749562e160,
   0.9614466715035126609268655586972595484554e162,
   0.990290071648618040754671525458177334909e164,
   0.1029901674514562762384858386476504428305e167,
   0.1081396758240290900504101305800329649721e169,
   0.1146280563734708354534347384148349428704e171,
   0.1226520203196137939351751701038733888713e173,
   0.132464181945182897449989183712183259981e175,
   0.1443859583202493582204882102462797533793e177,
   0.1588245541522742940425370312709077287172e179,
   0.1762952551090244663872161047107075788761e181,
   0.1974506857221074023536820372759924883413e183,
   0.2231192748659813646596607021218715118256e185,
   0.2543559733472187557120132004189335234812e187,
   0.2925093693493015690688151804817735520034e189,
   0.339310868445189820119825609358857320324e191,
   0.396993716080872089540195962949863064779e193,
   0.4684525849754290656574312362808384164393e195,
   0.5574585761207605881323431711741977155627e197,
   0.6689502913449127057588118054090372586753e199,
   0.8094298525273443739681622845449350829971e201,
   0.9875044200833601362411579871448208012564e203,
   0.1214630436702532967576624324188129585545e206,
   0.1506141741511140879795014161993280686076e208,
   0.1882677176888926099743767702491600857595e210,
   0.237217324288004688567714730513941708057e212,
   0.3012660018457659544809977077527059692324e214,
   0.3856204823625804217356770659234636406175e216,
   0.4974504222477287440390234150412680963966e218,
   0.6466855489220473672507304395536485253155e220,
   0.8471580690878820510984568758152795681634e222,
   0.1118248651196004307449963076076169029976e225,
   0.1487270706090685728908450891181304809868e227,
   0.1992942746161518876737324194182948445223e229,
   0.269047270731805048359538766214698040105e231,
   0.3659042881952548657689727220519893345429e233,
   0.5012888748274991661034926292112253883237e235,
   0.6917786472619488492228198283114910358867e237,
   0.9615723196941089004197195613529725398826e239,
   0.1346201247571752460587607385894161555836e242,
   0.1898143759076170969428526414110767793728e244,
   0.2695364137888162776588507508037290267094e246,
   0.3854370717180072770521565736493325081944e248,
   0.5550293832739304789551054660550388118e250,
   0.80479260574719919448490292577980627711e252,
   0.1174997204390910823947958271638517164581e255,
   0.1727245890454638911203498659308620231933e257,
   0.2556323917872865588581178015776757943262e259,
   0.380892263763056972698595524350736933546e261,
   0.571338395644585459047893286526105400319e263,
   0.8627209774233240431623188626544191544816e265,
   0.1311335885683452545606724671234717114812e268,
   0.2006343905095682394778288746989117185662e270,
   0.308976961384735088795856467036324046592e272,
   0.4789142901463393876335775239063022722176e274,
   0.7471062926282894447083809372938315446595e276,
   0.1172956879426414428192158071551315525115e279,
   0.1853271869493734796543609753051078529682e281,
   0.2946702272495038326504339507351214862195e283,
   0.4714723635992061322406943211761943779512e285,
   0.7590705053947218729075178570936729485014e287,
   0.1229694218739449434110178928491750176572e290,
   0.2004401576545302577599591653441552787813e292,
   0.3287218585534296227263330311644146572013e294,
   0.5423910666131588774984495014212841843822e296,
   0.9003691705778437366474261723593317460744e298,
   0.1503616514864999040201201707840084015944e301,
   0.2526075744973198387538018869171341146786e303,
   0.4269068009004705274939251888899566538069e305,
   0.7257415615307998967396728211129263114717e307
];

/**
 * The value of g used in the Lanczos approximation. This value is taken from
 * the research computed by Boost. See
 * http://www.boost.org/doc/libs/1_59_0/libs/math/doc/html/math_toolkit/lanczos.html
 * @type {Number}
 */
const lanczosG = 6.024680040776729583740234375;

/**
 * Lanczos g less one half.
 * @type {Number}
 */
const lanczosGMinusHalf = 5.524680040776729583740234375;

/**
 * The numerator coefficients used in the Lancsoz polynomial. These values are
 * dependent on g and are taken from Boost's calculations of g.
 * @type {Number[]}
 */
const lanczosNumeratorCoefficients = [
   23531376880.41075968857200767445163675473,
   42919803642.64909876895789904700198885093,
   35711959237.35566804944018545154716670596,
   17921034426.03720969991975575445893111267,
   6039542586.35202800506429164430729792107,
   1439720407.311721673663223072794912393972,
   248874557.8620541565114603864132294232163,
   31426415.58540019438061423162831820536287,
   2876370.628935372441225409051620849613599,
   186056.2653952234950402949897160456992822,
   8071.672002365816210638002902272250613822,
   210.8242777515793458725097339207133627117,
   2.506628274631000270164908177133837338626
];

/**
 * The denominator coefficients used in the Lancsoz polynomial. These values
 * are dependent on g and are taken from Boost's calculations of g.
 * @type {Number[]}
 */
const lanczosDenominatorCoefficients = [
   0,
   39916800,
   120543840,
   150917976,
   105258076,
   45995730,
   13339535,
   2637558,
   357423,
   32670,
   1925,
   66,
   1
];

/**
 * Evaluates the Lanczos sum as a rational polynomail at u. This method is
 * derived from Boost.
 * @param {Complex} u   A number or complex number-like object
 * @param {Complex}     The rational function evaluated at u
 */
const lanczosSum = u => {
   let num = 0;
   let denom = 0;
   
   const n = lanczosNumeratorCoefficients.length;
   
   if (u.real < 5) {
      for (let i = n; --i >= 0;) {
         num = add(lanczosNumeratorCoefficients[i], multiply(num, u));
         denom = add(lanczosDenominatorCoefficients[i], multiply(denom, u));
      }
   } else {
      for (let i = 0; i < n; ++i) {
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
export const gamma = u => {
   let complexU = toComplex(u);
   const realPart = complexU.real;
   
   // The number is a real integer whose factorial we have precalculated.
   if ((complexU.imaginary === 0) &&
       (realPart === Math.floor(realPart))) {
       if (realPart < 0) {
          // Gamma is not defined at negative integers
          return new Complex(NaN);
       } else if (realPart === 0) {
          // Gamma is infinite at 0
          return new Complex(Number.POSITIVE_INFINITY);
       } else if (realPart < factorials.length - 1) {
          return new Complex(factorials[realPart - 1]);
       } else {
          return new Complex(Number.POSITIVE_INFINITY);
       }
   }
   
   if (realPart < 0) {
      // Use the reflection formula to extend Lanczos' approximation to the
      // left complex plane.
      const sinPiu = sin(multiply(PI, u));
      return divide(PI, multiply(sinPiu, gamma(subtract(1, u))));
   }
   
   const y = add(complexU, lanczosGMinusHalf);
   
   return divide(
      multiply(
         pow(y, subtract(complexU, 0.5)),
         lanczosSum(complexU)),
      exp(y));
};
