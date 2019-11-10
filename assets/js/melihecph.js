
///////////////////
window.onload = function () {
    var dps = []; //dataPoints. 
    var dps2 = []; 
    var dps3 = []; 
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            text: "BIOSENSOR Datas"
        },
        data: [{
            type: "line",
            toolTipContent: "<span style=\"color:#f18992 \"><b>{name}</b></span><br/><b> Value:</b> {x} <br/><b> Time:</b></span> {y} h",
            dataPoints: dps
                }]
    });
     var chart2 = new CanvasJS.Chart("chartContainer2", {
        title: {
            text: "EC Datas"
        },
        data: [{
            type: "line",
            dataPoints: dps2
                }]
    });
    
    var chart3 = new CanvasJS.Chart("chartContainer3", {
        title: {
            text: "PH Datas"
        },
        data: [{
            type: "line",
            dataPoints: dps3
                }]
    });
    
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
    function addDataPointsAndRender() {
        xValue = Number(document.getElementById("xValue").value);
        yValue = Number(document.getElementById("yValue").value);
        dps.push({
            x: xValue,
            y: yValue
        });
        chart.render();
    };
    function addDataPointsAndRendertwo() {
        x2Value = Number(document.getElementById("x2Value").value);
        y2Value = Number(document.getElementById("y2Value").value);
        dps2.push({
            x: x2Value,
            y: y2Value
        });
        chart2.render();
    }
    function addDataPointsAndRenderthree() {
        x3Value = Number(document.getElementById("x3Value").value);
        y3Value = Number(document.getElementById("y3Value").value);
        dps3.push({
            x: x3Value,
            y: y3Value
        });
        chart3.render();
    }
    var renderButton = document.getElementById("renderButton");
    renderButton.addEventListener("click", addDataPointsAndRender);
    ///////////////////////////////////////////////////////////////   
    var renderButtontwo = document.getElementById("renderButton2");
    renderButtontwo.addEventListener("click", addDataPointsAndRendertwo);
    ///////////////////////////////////////////////////////////////
    var renderButtonthree = document.getElementById("renderButton3");
    renderButtonthree.addEventListener("click", addDataPointsAndRenderthree);
}
  ////// JPEG formatında da kaydetmeye çalışıyoruz. Kaydedebilirsek bilim ekibine büyük yardım sağlanıcak!!! \\\\\\

//    document.getElementById("exportChart").addEventListener("click",function(){
//    chart.exportChart({format: "jpg"});   
//    chart2.exportChart({format: "jpg"});