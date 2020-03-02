export const querystring = function getQueryString(field, url) {
    var href = url ? url : window.location.href;
    var reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
    var string = reg.exec(href);
    return string ? string[1] : null;
}

export const qargsToQstring = (query_args={}) => {
    let query_string = '';
    let idx =0;
    for (var key in query_args) {
      if (idx == 0){
        query_string += "?"+key+"="+query_args[key];
      }
      else{
        query_string += "&"+key+"="+query_args[key];
      }
      idx++;
    }
    return query_string;
  }