***REMOVED***
 * Created by YouHan on 2016/8/10.
***REMOVED***
(function () {
    var input = $('[name="file-input"]'),
        btn = $('[name="upload-button"]'),
        canvas = document.getElementById('image-canvas'),
        context = canvas.getContext('2d'),
        canvas2 = document.getElementById('photo-canvas'),
        context2 = canvas2.getContext('2d');
    btn.bind('click', function () {
        input.click();
    ***REMOVED***
    input.bind('change', function (e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var url = URL.createObjectURL(file);
        cururl = url;
        renderImage(url);
    ***REMOVED***

    $('[name="handle-button"]').bind('click', function () {
        grayScale();
        cutCircle(context, 0, 0, canvas.width / 5);
        loadPortrait();
    ***REMOVED***
    function cutCircle(context, x, y, radius) {
        context.globalCompositeOperation = 'destination-out'
        context.arc(x, y, radius, 0, Math.PI * 2, true);
        context.fill();
    }


    function loadPortrait() {
        var img = new Image();
        img.onload = function () {
            context2.drawImage(img, 0, 0, canvas2.width, canvas2.height);
            var url = canvas.toDataURL('image/png');
            var img2 = new Image();
            img2.onload = function () {
                context2.drawImage(img2, canvas2.width / 10, canvas2.height / 10, canvas2.width / 10 * 8, canvas2.height / 10 * 8);
            };
            img2.src = url;
        };
        img.src = './../images/portrait.jpg';
    }

    $(document).ready(function () {
        var width = $(canvas).parent().width();
        canvas.width = width;
        canvas.height = width;
        var width2 = $(canvas2).parent().width();
        canvas2.width = width2;
        canvas2.height = width2;
    ***REMOVED***

    var cururl,
        imgX = 0,
        imgY = 0,
        pos,
        imgScale = 1;
    var imageObj;

    function renderImage(url) {
        imageObj = new Image();
        imageObj.onload = function () {
            render();
        };
        imageObj.src = url;
    }

    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(imageObj, 0, 0, imageObj.width, imageObj.height, imgX, imgY, imageObj.width * imgScale, imageObj.height * imgScale);
    }

    var start = function (event) {
        if (!cururl) {
            return;
        }
        pos = windowToCanvas(canvas, event.touches[0].clientX, event.touches[0].clientY);
        canvas.addEventListener('touchmove', move, false);
        canvas.addEventListener('touchend', end, false);
    };

    var end = function () {
        canvas.removeEventListener('touchmove', move, false);
        canvas.removeEventListener('touchend', end, false);
        canvas.style.cursor = "default";
    };

    var move = function (event) {
        console.log('move');
        if (!cururl) {
            return;
        }
        canvas.style.cursor = "move";
        var pos1 = windowToCanvas(canvas, event.touches[0].clientX, event.touches[0].clientY);
        var x = pos1.x - pos.x;
        var y = pos1.y - pos.y;
        pos = pos1;
        imgX += x;
        imgY += y;
        render();
    };

    canvas.addEventListener('touchstart', start, false);

    canvas.onmousewheel = canvas.onwheel = function (event) {
        if (!cururl) {
            return;
        }
        var pos = windowToCanvas(canvas, event.clientX, event.clientY);
        event.wheelDelta = event.wheelDelta ? event.wheelDelta : (event.deltaY * (-40));
        if (event.wheelDelta > 0) {
            imgScale *= 2;
            imgX = imgX * 2 - pos.x;
            imgY = imgY * 2 - pos.y;
        } else {
            imgScale /= 2;
            imgX = imgX * 0.5 + pos.x * 0.5;
            imgY = imgY * 0.5 + pos.y * 0.5;
        }
        render();
    };

    function windowToCanvas(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left - (bbox.width - canvas.width) / 2,
            y: y - bbox.top - (bbox.height - canvas.height) / 2
        };
    }

    function grayScale() {
        var color = {
            r: $('#r').val(),
            g: $('#g').val(),
            b: $('#b').val(),
            a: $('#a').val()
        };
        var imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imgData.data;
        for (var i = 0, n = pixels.length; i < n; i += 4) {
            var grayscale = pixels[i] * (color.r || 10) / 100 + pixels[i + 1] * (color.g || 59) / 100 + pixels[i + 2] * (color.g || 11) / 100;
            pixels[i] = grayscale;        // red
            pixels[i + 1] = grayscale;        // green
            pixels[i + 2] = grayscale;        // blue
            pixels[i + 3] = color.a || 100;   //alpha
        }
        //redraw the image in black & white
        context.putImageData(imgData, 0, 0);
    }
})();