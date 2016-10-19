/**
 * @overview Describes a complex number
 * @author Colin Jeanne <colinjeanne@hotmail.com> (http://www.colinjeanne.net)
 */

/**
 * A complex number
 */
export default class {
   /**
    * Constructs a complex number from real and imaginary parts
    * @param  {Number=0} real      The real part of the complex number
    * @param  {Number=0} imaginary The imaginary part of the complex number
    * @return {Complex}
    */
   constructor(real = 0, imaginary = 0) {
      this.real = real;
      this.imaginary = imaginary;
   }
}
