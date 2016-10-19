var apiKey = "2460cc02978a77547f9d317287f144bc";


function getForecast() {
    $.ajax({
        "method": "GET",
        "url": "https://api.darksky.net/forecast/" + apiKey + "/" + latitude + "," + longitude,
        "dataType": "jsonp",
        "success": function(magic) {
            console.log(magic);
            var icon = magic.currently.icon,
                sunrise = magic.daily.data[0].sunriseTime,
                sunset = magic.daily.data[0].sunsetTime,
                currentTemp = Math.round(magic.currently.apparentTemperature),
                now = magic.currently.summary,
                description = magic.daily.summary;

            $('#temp').append(currentTemp + '\u00B0' + 'F');
            $('.forecast').append('<font color="black"><b>Conditions:</b></font> ' + now + "</br>");
            $('.forecast').append('<font color="black"><b>Look Ahead:</b></font> ' + description + "</br>");
            $('#glycon').append('<canvas class="' + icon + '" width="180" height="180"></canvas>');


            var icons = new Skycons({
                    "color": "#ff5722"
                }),
                i,
                list = [
                    "clear-day", "clear-night", "partly-cloudy-day",
                    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                    "fog"
                ];

            for (i = list.length; i--;) {
                var weatherType = list[i],
                    elements = document.getElementsByClassName(weatherType);
                for (e = elements.length; e--;) {
                    icons.set(elements[e], weatherType);
                }
            }
            icons.play();

            //get 12hr time with suffix from provided timestamp. This took a while...
            function createTime(input) {
                var bigNum = new Date(input * 1000),
                    hour = bigNum.getHours(),
                    min = bigNum.getMinutes(),
                    // My first terinarys!! if hour is >= 12, the suffix is pm, else its am
                    suffix = (hour >= 12) ? 'pm' : 'am';
                // convert 24 to 12
                hours = (hour > 12) ? hour - 12 : hour;
                //if it's 12am.
                hours = (hour == '00') ? 12 : hours;
                return hours + ":" + min + "" + suffix;
            }

            //Decides whether to show sunrise or sunset.
            function riseSet() {
                var today = new Date();
                var time = today.getHours();
                if (time < 5) {
                    $('.forecast').append("<font color='black'><b>Sunrise:</b></font> " + createTime(sunrise) + "</br>");
                } else if (time > 21) {
                    $('.forecast').append("<font color='black'><b>Sunrise:</b></font> " + createTime(sunrise) + "</br>");
                } else {
                    $('.forecast').append("<font color='black'><b>Sunset:</b></font> " + createTime(sunset) + "</br>");
                }
            }
            riseSet();

        }
    });
}

//Have to make 2 Ajax calls. One for local forecast. The other for searchbar forecasts. I know I'm repeating a lot.
function homeForecast() {
    $("#address").val(city + "," + " " + state);
    $.ajax({
        "method": "GET",
        "url": "https://api.darksky.net/forecast/" + apiKey + "/" + homeLatitude + "," + homeLongitude,
        "dataType": "jsonp",
        "success": function(magic) {
            console.log(magic);
            var icon = magic.currently.icon,
                sunrise = magic.daily.data[0].sunriseTime,
                sunset = magic.daily.data[0].sunsetTime,
                currentTemp = Math.round(magic.currently.apparentTemperature),
                now = magic.currently.summary,
                description = magic.daily.summary;

            $('#temp').append(currentTemp + '\u00B0' + 'F');
            $('.forecast').append('<font color="black"><b>Conditions:</b></font> ' + now + "</br>");
            $('.forecast').append('<font color="black"><b>Look Ahead:</b></font> ' + description + "</br>");

            $('#glycon').append('<canvas class="' + icon + '" width="180" height="180"></canvas>');


            var icons = new Skycons({
                    "color": "#ff5722"
                }),
                i,
                list = [
                    "clear-day", "clear-night", "partly-cloudy-day",
                    "partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind",
                    "fog"
                ];



            for (i = list.length; i--;) {
                var weatherType = list[i],
                    elements = document.getElementsByClassName(weatherType);
                for (e = elements.length; e--;) {
                    icons.set(elements[e], weatherType);
                }
            }
            icons.play();

            //get 12hr time with suffix from provided timestamp.
            function createTime(input) {
                var bigNum = new Date(input * 1000),
                    hour = bigNum.getHours(),
                    min = bigNum.getMinutes(),
                    //Terinarys!! if hour is >= 12, the suffix is pm, else its am
                    suffix = (hour >= 12) ? 'pm' : 'am';
                // convert 24 to 12
                hours = (hour > 12) ? hour - 12 : hour;
                //if it's 12am.
                hours = (hour == '00') ? 12 : hours;
                return hours + ":" + min + "" + suffix;
            }

            //Decides whether to show sunrise or sunset.
            function riseSet() {
                var today = new Date();
                var time = today.getHours();
                if (time < 5) {
                    $('.forecast').append("<font color='black'><b>Sunrise:</b></font> " + createTime(sunrise) + "</br>");
                } else if (time > 20) {
                    $('.forecast').append("<font color='black'><b>Sunrise:</b></font> " + createTime(sunrise) + "</br>");
                } else {
                    $('.forecast').append("<font color='black'><b>Sunset:</b></font> " + createTime(sunset) + "</br>");
                }
            }
            riseSet();


        }
    });
}

// Functions for the event listeners

function setSearch(link) {
    $('#address').val(link);
}


function unHideLink() {
    if ($('.new-link1').css('display') == 'none') {
        address1 = $('#address').val();
        $('.new-link1').show();
        $('.new-link1').text($('#address').val());
        console.log(address1);
    } else {
        $('.new-link2').show();
        $('.new-link2').text($('#address').val());
        address2 = $('#address').val();
        console.log(address2);
    }
}
// //Event listeners

$(".search-icon").on("click", function(event) {
    $("#temp").empty();
    $("#glycon").empty();
    $(".forecast").empty();
    codeAddress();
    unHideLink();

});

$(".home-link").on("click", function(event) {
    $("#temp").empty();
    $("#glycon").empty();
    $(".forecast").empty();
    homeForecast();
    $("#address").val(city + "," + " " + state);
    console.log(latitude);
});

$(".new-link1").on("click", function(event) {
    newAddress(address1);
    setSearch(address1);
});

$(".new-link2").on("click", function(event) {
    newAddress(address2);
    setSearch(address2);
});


var address1 = "",
 address2 = "",
 city = geoplugin_city(),
 state = geoplugin_region(),
 homeLongitude = geoplugin_longitude(),
 homeLatitude = geoplugin_latitude();


//Thanks Ariel from Stackoverflow. I hacked up their function and adapted to my needs. and did some converting from vanilla to jquery.
//Uses google geocoding to get lat and long from city and state.
function init() {
    var address = $("#address").val(city + "," + " " + state);
    autocomplete.setTypes(['geocode']);
    google.maps.event.addListener('place_changed', function() {
        var place = getPlace();
        if (!place.geometry) {
            return;
        }
        var address = '';
        if (place.address_components) {
            address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
        }
    });
}

function codeAddress() {
    geocoder = new google.maps.Geocoder();
    var address = $("#address").val();
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {

            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            getForecast();
        } else {
            alert("Look what you did. -> " + status);
        }
    });
}
// called for searchbar forecasts

function newAddress(address) {
    $("#temp").empty();
    $("#glycon").empty();
    $(".forecast").empty();
    geocoder = new google.maps.Geocoder();
    //  var address = $(".new-link1").text();
    geocoder.geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //console.log(address);
            latitude = results[0].geometry.location.lat();
            longitude = results[0].geometry.location.lng();
            getForecast();
        } else {
            alert("Sigh.... " + status);
        }
    });
}



homeForecast();
