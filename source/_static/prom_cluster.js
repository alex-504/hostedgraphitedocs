function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function () {
    var cluster = readCookie("cluster");
    if (!cluster)
        cluster = 'prod';
    cluster += "."

    var write_endpoint = "promlts.metricfire.com/write";
    $("span:contains('" + write_endpoint + "'), pre:contains('" + write_endpoint + "')").each(function () {
        var str = $(this).text();
        str = str.replace(write_endpoint, cluster + 'promlts.metricfire.com/write');
        $(this).text(str)
    });


    var read_endpoint = "promlts.metricfire.com/read";
    $("span:contains('" + read_endpoint + "'), pre:contains('" + read_endpoint + "')").each(function () {
        var str = $(this).text();
        str = str.replace(read_endpoint, cluster + 'promlts.metricfire.com/read');
        $(this).text(str)
    });
    
    var cluster = readCookie("cluster");
    var pl_holder = "CLUSTER";
    if(cluster){
        $("href:contains('"+ pl_holder + "')").each(function() {
            // Replace text
            var str = $(this).text();
            $(this).text(str.replace(pl_holder, cluster));
            // Replace link
            var link = $(this).attr("href");
            if(link) {
                $(this).attr("href", link.replace(pl_holder, cluster));
            }
        });
    }

});

// uid-based subdomains are not currently working. 
// This updated script is a quick fix instead of editing all the links
// If we decide to reenable uid subdomains, the original script is under uid_prefix_old.js
