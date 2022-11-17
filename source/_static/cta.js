function readCookie(name) {
    name += '=';
    for (var ca = document.cookie.split(/;\s*/), i = ca.length - 1; i >= 0; i--)
        if (!ca[i].indexOf(name))
            return ca[i].replace(name, '');
}

document.addEventListener('DOMContentLoaded', function() { 
	var uid = readCookie("uid");
	if(uid == null){
    	$("#index-0").append('<p><i>Welcome to our docs on Graphite + Grafana! Hosted Graphite is a fully-hosted version of Graphite + Grafana, supercharged with team accounts, long-term data storage, highly technical support, and more.<br><br>Not yet a user? <a href="https://hostedgraphite.com/signup"><b>Sign up for our free trial</b></a>, where you can use Grafana dashboards right in the platform, with no installation or setup.</i><br>___</p>');
    }
});
