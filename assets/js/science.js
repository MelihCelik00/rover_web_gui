mapboxgl.accessToken = 'pk.eyJ1IjoiZGVrc3ByaW1lIiwiYSI6ImNqOGsxb3dyYzA4b2wyeHBsdGx0aXdzeHYifQ.4vYgxeGhICEGWbC1552LsQ';

var ros_server_url = document.location.hostname + ":9090";
var ros = new ROSLIB.Ros();
var rosConnected = false;

var bio_data;

var ec_data;

var ph_data;
var down = "";
var doubledown = "";
var up = "";
var doubleup = "";

var sledge;
var x;
var a;
var science = new String;
var science_publisher;

var data_bio = [60, 45]
var data_ec = [80, 46]
var data_ph = [40, 90]

var dps_bio = [];
var dps_ec = [];
var dps_ph = [];

window.gamepad = new Gamepad();
var focused = false;
var monument = [-110.791941, 38.406320];
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v9',
    center: [-110.791941, 38.406320],
    zoom: 18
});
map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
map.doubleClickZoom.disable();

ros.on("connection", function () {
    console.debug("Connected to ROS server");
    rosConnected = true;
    initSubscribers();
    initPublishers();
    chart.render();
});

ros.on("close", function () {
    console.debug("Disconnected from ROS server");
    rosConnected = false;
});

// Create connection
ros.connect("ws://" + ros_server_url);

function initPublishers() {
    joystick_publisher1 = new ROSLIB.Topic({
        ros: ros,
        name: 'rover_joy/cmd_vel',
        messageType: '/sledge'
    });
    science_publisher.publish(science);
}

function initSubscribers() {

    ////Define subscribers

    var bio_listener = new ROSLIB.Topic({
        ros: ros,
        name: 'bio_data', //dinlenecek topic adı
        messageType: 'std_msgs/Int32MultiArray' //topicin mesaj tipi
    });

    var ec_listener = new ROSLIB.Topic({
        ros: ros,
        name: 'ec_data',
        messageType: 'std_msgs/Int32MultiArray'
    });

    var ph_listener = new ROSLIB.Topic({
        ros: ros,
        name: 'ph_data',
        messageType: 'std_msgs/Int32MultiArray'
    });

    bio_listener.subscribe(function (msg) {
        data_bio = msg.data;
    });
    dust_ec.subscribe(function (msg) {
        data_ec = msg.data;
    });

    ph_listener.subscribe(function (msg) {
        data_ph = msg.data;
    });

}

// Chart of EC and PH Sensors
window.onload = function() {
            var dps1 = [], 
                dps2 = []; 

            var chart = new CanvasJS.Chart("chartContainer", {
              title: {
                text: "Accepting DataPoints from User Input"
              },
              data: [{
                type: "spline",
                dataPoints: dps1
              },
              {
                type: "spline",
                axisYType: "secondary",
                dataPoints: dps2
              }]
            });

function addDataPointsAndRender() {
                xValue = Number(document.getElementById("xValue").value);
                yValue = Number(document.getElementById("yValue").value);
                dps1.push({
                    x: xValue,
                    y: yValue
                });
                chart.render();
            }
            var renderButton1 = document.getElementById("renderButton1");
            renderButton1.addEventListener("click", addDataPointsAndRender);
            
function addDataPointsAndRender2() {
                x2Value = Number(document.getElementById("x2Value").value);
                y2Value = Number(document.getElementById("y2Value").value);
                dps2.push({
                    x: x2Value,
                    y: y2Value
                });
                chart.render();
            }

            var renderButton2 = document.getElementById("renderButton2");
            renderButton2.addEventListener("click", addDataPointsAndRender2);  

}
//Bar function
function myFunction() {
    var x = document.getElementById("myInput").value;
    var y = new Number;
    var z;

    if (parseFloat(x) > 80) {
        y = 4;
        z = "up";
    } else if (parseFloat(x) > 60) {
        y = 3;
        z = "slowly up";
    } else if (parseFloat(x) > 40) {
        y = 2;
        z = "stop";
    } else if (parseFloat(x) > 20) {
        y = 1;
        z = "slowly down";
    } else if (parseFloat(x) > 0) {
        y = 0;
        z = "down";
    }

    if (rosConnected) {
        science.publish("s" + y + "f");

    }
    h = ("s" + y + "f");
    console.log(h);

    document.getElementById("demo").innerHTML = "You wrote: " + z;

}
