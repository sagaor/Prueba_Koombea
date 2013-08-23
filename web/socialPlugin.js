
window.fbAsyncInit = function() {
    FB.init({
        appId: '154410214759596', // App ID
        channelUrl: '//http://localhost:8080/Prueba_Koombea/', // Channel File
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse XFBML
        oauth: true
    });

    FB.Event.subscribe('auth.authResponseChange', function(response) {
        if (response.status === 'connected') {
            saveData();
        } else if (response.status === 'not_authorized') {
            FB.login();
        }else if (response.status === 'unknown') {
            document.getElementById("tabla").innerHTML = "";
        }
    });
};

// Load the SDK asynchronously
(function(d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement('script');
    js.id = id;
    js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
}(document));


function saveData() {
    FB.api('/me', function(response) {
        var name = response.first_name;
        var id = response.id;
        var gender = response.gender;
        var parametros = 'name=' + name + '&id=' + id + '&gender=' + gender;
        llamarAjax(parametros);
        console.log('parametros: ' + parametros + '.');
    });
}
