export function searchRegExp(search) {
  const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
  const escapedSearch = search.replace(matchOperatorsRe, '\\$&');
  return new RegExp(`${escapedSearch}`, 'gi');
};
