function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function() { 
    var cluster = readCookie("cluster");
    var endpoint = "api.hostedgraphite.com";
    if(cluster){
        $("span:contains('"+ endpoint + "'), pre:contains('"+ endpoint + "')").each(function() {
            var str = $(this).text();
            str = str.replace(endpoint, cluster + '.hostedgraphite.com');
            $(this).text(str)
        });
    }
});