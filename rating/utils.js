export function parseQuery(query) {
  let params = {};
  query.split('&').forEach(function(p) {
    let pair = p.split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  });
  return params;
}
