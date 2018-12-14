import React, {Component} from 'react';
import $ from 'jquery';


export class CheckInCount extends Component {

    componentDidMount(props){



        $.fn.animateNumbers = function(stop, commas, duration, ease) {
            return this.each(function() {
                var $this = $(this);
                var isInput = $this.is('input');
                var counterCurrentValue = 0;
                var start = parseInt(isInput ? $this.val().replace(/,/g, "") : $this.text().replace(/,/g, ""));
                var regex = /(\d)(?=(\d\d\d)+(?!\d))/g;
                commas = commas === undefined ? true : commas;

                // number inputs can't have commas or it blanks out
                if (isInput && $this[0].type === 'number') {
                    commas = false;
                }

                $({value: start}).animate({value: stop}, {
                    duration: duration === undefined ? 1000 : duration,
                    easing: ease === undefined ? "swing" : ease,
                    step: function() {

                        counterCurrentValue = Math.floor(this.value);
                        isInput ? $this.val(counterCurrentValue) : $this.text(counterCurrentValue);
                        if (commas) {
                            isInput ? $this.val($this.val().replace(regex, "$1,")) : $this.text($this.text().replace(regex, "$1,"));
                        }
                    },
                    progress : function () {
                        // if(counterCurrentValue >= animationCounters[index]){
                        //     console.log(animationCounters[index], isInput, $this);
                        //     // clearTimeout(timeoutVariable);
                        //     index = index + 1;
                        // }
                    },
                    complete: function() {
                        if (parseInt($this.text()) !== stop || parseInt($this.val()) !== stop) {
                            isInput ? $this.val(stop) : $this.text(stop);
                            if (commas) {
                                isInput ? $this.val($this.val().replace(regex, "$1,")) : $this.text($this.text().replace(regex, "$1,"));
                            }
                        }
                    }
                });
            });
        };

        var height = $(window).height();
        var timeoutVariable;
        $('#checkInContainer').css('max-height', height);
        $('body').css("background-color", "#000000");
        $('section').css("background-color", "#000000");
        var animationTime = 5000;
        var index = 0;
        var animationCounters = [ 10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000, 80000000, 90000000, 100000000 ];
        var totalCheckIns = 0;
        // var vid = document.getElementById("minions");
        var heroImage = $("#hero-bg");
        function fetchLatestCount(){
            $.get( "https://operator.api.getmyparking.com/api/v1/ParkingEvents/checkInCount", function( data ) {

                if((totalCheckIns + data.checkInCount) >= animationCounters[index]){

                    $( "#count" ).animateNumbers(animationCounters[index], false, animationTime, "linear");
                    $( "#todays-count" ).animateNumbers(data.checkInCount, false, animationTime, "linear");
                    setTimeout(function () {

                        $("#notification-video").removeClass("hidden");
                        heroImage.removeClass('hero-image');
                        $("#notification-video").show();

                        setTimeout(function () {
                            $("#notification-video").hide();
                            heroImage.addClass('hero-image');
                            timeoutVariable = setTimeout(fetchLatestCount, 0);
                        }, 6000);
                    }, animationTime);


                    index++;
                }else {

                    setTimeout(function () {
                        $("#notification-video").hide();
                        heroImage.addClass('hero-image');
                    }, 6000);

                    animationTime = 60000;

                    $( "#count" ).animateNumbers(totalCheckIns + data.checkInCount, false, animationTime, "linear");
                    $( "#todays-count" ).animateNumbers(data.checkInCount, false, animationTime, "linear");

                    timeoutVariable = setTimeout(fetchLatestCount, animationTime);
                }
            });

        }

        function getOverAllCount() {
            $.get('https://operator.api.getmyparking.com/api/v1/ParkingEvents/checkInCountAll', function (data) {
                totalCheckIns = totalCheckIns + data.checkInCount;
                fetchLatestCount();
            });
        }

        getOverAllCount();

        /**
         * Determine the mobile operating system.
         * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
         *
         * @returns {String}
         */
        function getMobileOperatingSystem() {

            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

            // Windows Phone must come first because its UA also contains "Android"
            if (/windows phone/i.test(userAgent)) {
                return true;
            }

            if (/android/i.test(userAgent)) {
                return true;
            }

            // iOS detection from: http://stackoverflow.com/a/9039885/177710
            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
                return true;
            }

            return false;

        }

        // alert(getMobileOperatingSystem());
    }

    render() {
        return (

                <div id="checkInContainer" className="container-fluid" style={{color: "white",textAlign: "center"}}>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-block">
                                    <h1 className="card-title">Total Check-Ins Today</h1>
                                    <div id="todays-count" style={{fontSize: 150+"px", margin: 0+"px"}}>0</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <div className="card">
                                <div className="card-block">
                                    <h1 className="card-title">Total Check-Ins Till Date</h1>
                                    <div id="count" style={{fontSize: 150+"px", margin: 0+"px"}}>0</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="notification-video" className="fullscreen-bg" style={{display : "none"}} >

                    </div>
                </div>


        );
    }
}