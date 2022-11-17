function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function() { 
    var uid = readCookie("uid");
    var placeholder = "YOUR-USER-ID";
    if(uid){
        $("span:contains('"+ placeholder + "'), pre:contains('"+ placeholder + "'), a:contains('"+ placeholder + "')").each(function() {
            // Replace text
            var str = $(this).text();
            $(this).text(str.replace(placeholder, uid));
            // Replace link
            var link = $(this).attr("href");
            if(link) {
                $(this).attr("href", link.replace(placeholder, uid));
            }
        });
    }
    
    var cluster = readCookie("cluster");
    var pl_holder = "CLUSTER";
    if(cluster){
        $("span:contains('"+ pl_holder + "'), pre:contains('"+ pl_holder + "'), a:contains('"+ pl_holder + "')").each(function() {
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
