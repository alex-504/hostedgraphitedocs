function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function() { 
	var uid = readCookie("uid");
	if (uid){
    	$("#index-0").append('<p>For further account traffic information check out the <a href="https://www.hostedgraphite.com/'+uid+'/grafana/dashboard/db/hg-traffic-dashboard">HG Traffic Dashboard </a>.</p>');
    }
});