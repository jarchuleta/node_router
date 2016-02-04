var fs = require('fs');
var handlebars = require('handlebars')
var config = require('./config');

exports.write = function (path, response) {

  fs.readFile(path, function (err, data) {
    if (err) {
       console.log("Can't read file " + path + " error:" + err);
       // HTTP Status: 404 : NOT FOUND
       // Content Type: text/plain
       response.writeHead(404, {'Content-Type': 'text/html'});
       response.end();
    }else{
      console.log("writing file " + path);
       //Page found
       // HTTP Status: 200 : OK
       // Content Type: text/plain
       response.writeHead(200, {'Content-Type': 'text/html'});

       // Write the content of the file to response body
       response.write(data.toString());
       response.end();
    }
  });
}


exports.renderPartial = function (path, data){


  try{
    var body = fs.readFileSync(path, 'utf-8');
    var template = handlebars.compile(body);
    var html = template(data);

    return html.toString();
  }
  catch (error)
  {

       console.log("Can't read file " + path + " error:" + err);

  }
}

exports.render = function (path, data){
  var html = "";
  try{


    var body_file = fs.readFileSync(path, 'utf-8');
    var template = handlebars.compile(body_file);
    var body = template(data);


    var template_data = {
      "config": config.template,
      "body": body
    };


    if (config.template.location != undefined){
      console.log(config.template.location);
      // read the config file template location

      var templateFile = fs.readFileSync(config.template.location, 'utf-8');
      var options = {
        noEscape:true
      };
      var template_full = handlebars.compile(templateFile,options);

      var html = template_full(template_data)

      return html.toString();
    }else {
      return exports.renderPartial(path,data);
    }

  }
  catch (error)
  {

       console.log("Can't read file " + path + " error:" + error);

  }

  return html;
}
