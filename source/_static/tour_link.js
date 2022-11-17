function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function() { 
	var uid = readCookie("uid");
	if(uid){
    	$("#index-0").append('<p>This documentaion is also available as an interactive Grafana <a href="https://www.hostedgraphite.com/'+uid+'/grafana/playdata/?0">tour</a>.</p>');
    }
});