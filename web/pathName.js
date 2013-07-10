exports.pathName = function(hash, path){
  if (path) { hash[path] = []; }
  return hash;
};