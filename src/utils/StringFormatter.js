export default class StringFormatter {
  static abbrevNumber(n) {
    if (n > 2000) {
      return n.toString()[0] + 'k'
    }
    return n.toString();
  }
}