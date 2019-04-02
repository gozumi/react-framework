/**
 * Concatenates an array of strings into a single string seperating each
 * source string with a space. If any of the source strings are undefined,
 * an empty string is concatenated in its place.
 * @param sArray The array of strings to be concatenated
 */
export function concatIfDefined (sArray: string[]): string {
  if (sArray.length > 0) {
    return (sArray[0] || '')
      .concat(' ', concatIfDefined(sArray.filter((_e, i) => i !== 0)))
      .trim()
  } else {
    return ''
  }
}
