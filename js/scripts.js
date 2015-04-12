/*global blueimp, $ */
function loadPage(url, onleave, onenter) {

    // If onleave function specified
    if (onleave) {
        onleave();
    }

    var xmlhttp = new XMLHttpRequest();

    // Callback function when XMLHttpRequest is ready
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                document.getElementById('container').innerHTML = xmlhttp.responseText;

                // If onenter function specified
                if (onenter) {
                    onenter();
                }
            }
            else {
                document.getElementById('container').innerHTML = "Error loading page " + url;
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function init() {

    $(".page").hide();
    $("#index").show();
}
function changepage(pageid, nav) {
    $(".page").hide();
    currentpage = "#" + pageid;
    $(pageid).show();
    $("#nav1").removeClass("current");
    $("#nav2").removeClass("current");
    $("#nav3").removeClass("current");
    $("#nav4").removeClass("current");
    $("#nav5").removeClass("current");
    $(nav).addClass("current");
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function trim(str) {
    return str.trim();
}


function process_contact() {

    errors = 0;
    errormsg = "";
    if (trim(document.getElementById('f_yourname').value) == '') {
        errormsg = errormsg + 'Please provide your name<br/>';
        errors = 1;
    }
    if (trim(document.getElementById('f_email').value) == '') {
        errormsg = errormsg + 'Please provide your email<br/>';
        errors = 1;
    }
    if ((validateEmail(document.getElementById('f_email').value) == false)) {
        errormsg = errormsg + 'Please provide a valid email<br/>';
        errors = 1;
    }
    if (trim(document.getElementById('f_msg').value) == '') {
        errormsg = errormsg + 'Please enter a message<br/>';
        errors = 1;
    }
    if (errors == 0) {
        f_yourname = document.getElementById('f_yourname').value;
        f_email = document.getElementById('f_email').value;
        f_msg = document.getElementById('f_msg').value;

        $.ajax({
            type: 'POST',
            url: 'http://www.pacificwizard.com.au/mobileapps/fullclipradio-webservices/sendmessage.php?f_yourname=' + f_yourname + '&f_email=' + f_email + '&f_msg=' + f_msg,
            crossDomain: true,
            data: '',
            success: function (data) {
                output = '<p class="bg-success">Thank you, message sent successfully</p>';
                $('#contactform input').val('');
                $('#contactform textarea').val('');
                document.getElementById('inline').innerHTML = output;

            },
            error: function (data) {
                output = '<p class="bg-warning">Server Error, Message not sent</p>';
            }
        });


    }
    else {
        alert('We have errors');
        output = '<p class="bg-danger">' + errormsg + '</p>';
        document.getElementById('inline').innerHTML = output;

    }


}
function process_shoutout() {

    errors = 0;
    errormsg = "";
    if (trim(document.getElementById('s_song').value) == '') {
        errormsg = errormsg + 'Please provide a song<br/>';
        errors = 1;
    }
    if (trim(document.getElementById('s_artist').value) == '') {
        errormsg = errormsg + 'Please provide the artist<br/>';
        errors = 1;
    }

    if (trim(document.getElementById('s_msg').value) == '') {
        errormsg = errormsg + 'Please enter a shout out messagee<br/>';
        errors = 1;
    }
    if (errors == 0) {
        s_song = document.getElementById('s_song').value;
        s_artist = document.getElementById('s_artist').value;
        s_msg = document.getElementById('s_msg').value;

        $.ajax({
            type: 'POST',
            url: 'http://www.pacificwizard.com.au/mobileapps/fullclipradio-webservices/sendshout.php?s_song=' + s_song + '&s_artist=' + s_artist + '&s_msg=' + s_msg,
            crossDomain: true,
            data: '',
            success: function (data) {
                output = '<p class="bg-success">Thank you, shoutout sent successfully</p>';
                $('#contactform input').val('');
                $('#contactform textarea').val('');
                document.getElementById('inline2').innerHTML = output;

            },
            error: function (data) {
                output = '<p class="bg-danger">Server Error, Message not sent</p>';
                document.getElementById('inline2').innerHTML = output;
            }
        });


    }
    else {

        output = '<p class="bg-danger">' + errormsg + '</p>';
        document.getElementById('inline2').innerHTML = output;

    }


}