function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function() { 
    var cluster = readCookie("cluster")
    var carbon_endpoint = "carbon"
    if (cluster){
        carbon_endpoint += "." + cluster
    }
    var endpoint = "YOUR-UID.carbon.hostedgraphite.com";
    $("span:contains('"+ endpoint + "'), pre:contains('"+ endpoint + "')").each(function() {
        var str = $(this).text();
        str = str.replace(endpoint, carbon_endpoint + '.hostedgraphite.com');
        $(this).text(str);
    });
});

// uid-based subdomains are not currently working. 
// This updated script is a quick fix instead of editing all the links
// If we decide to reenable uid subdomains, the original script is under uid_prefix_old.js