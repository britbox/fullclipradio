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