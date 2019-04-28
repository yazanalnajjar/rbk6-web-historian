var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var req = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list , 'utf8',(err, data) => {
    if (err) {throw err;}
    callback(data.split(/\n/));
  });
};

exports.isUrlInList = function(url, callback) {
  var x = false;
  fs.readFile(exports.paths.list , 'utf8',(err, data) => {
    // console.log(data.split(/\n/))
    var arr = data.split(/\n/);
    if (err) {throw err;}
    for(var i = 0 ;i < arr.length; i++){
      if(arr[i] === url){
        x = true;
      }
    }callback(x);  
  });  
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(exports.paths.list,url,(err) => {
    if (err) {throw err;}
    callback(true);
  });
};

exports.isUrlArchived = function(url, callback) {
  fs.readdir(exports.paths.archivedSites, (err, files) => {
    var x = false;
    if (err) {throw err;}
    for(var i=0 ;i < files.length; i++) {
    // console.log(files[i]);
      if(files[i] === url){
        x = true;
      }
    }callback(x);
  }) ;
};

exports.downloadUrls = function(urls) {
  console.log(urls);
};
