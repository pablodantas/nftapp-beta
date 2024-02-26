function dividirString(str, divisor) {
    const posicaoDivisor = str.indexOf(divisor);
    if (posicaoDivisor >= 0) {
      const valorAntes = str.substring(0, posicaoDivisor);
      const valorDepois = str.substring(posicaoDivisor + 1);
      return [valorAntes, valorDepois];
    } else {
      return [str];
    }
  }export default dividirString;