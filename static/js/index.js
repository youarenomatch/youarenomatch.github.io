// var $window = $(window), gardenCtx, gardenCanvas, $garden, garden;
// var clientWidth = $(window).width();
// var clientHeight = $(window).height();
//
// $(function () {
//     // setup garden
// 	$loveHeart = $("#loveHeart");
//     $garden = $("#garden");
//
//     $loveHeart.css("height", clientHeight * 0.5 + "px");
//     $loveHeart.css("width", clientWidth * 0.9 + "px");
//     // $garden.css("width", clientWidth > 675 ? 675 + "px" : clientWidth + "px");
//
//     gardenCanvas = $garden[0];
// 	gardenCanvas.width = $loveHeart.width();
//     gardenCanvas.height = $loveHeart.height();
//     gardenCtx = gardenCanvas.getContext("2d");
//     gardenCtx.globalCompositeOperation = "lighter";
//     garden = new Garden(gardenCtx, gardenCanvas);
//
//     // var $content = $("#content");
//     // var $code = $("#code");
// 	// $content.css("width", $loveHeart.width() + $code.width());
// 	// $content.css("height", Math.max($loveHeart.height(), $code.height()));
// 	// $content.css("margin-top", Math.max(($window.height() - $content.height()) / 2, 10));
// 	// $content.css("margin-left", Math.max(($window.width() - $content.width()) / 2, 10));
//
//     // renderLoop
//     setInterval(function () {
//         garden.render();
//     }, Garden.options.growSpeed);
// });
//
// $(window).resize(function() {
//     var newWidth = $(window).width();
//     var newHeight = $(window).height();
//     if (newWidth !== clientWidth && newHeight !== clientHeight) {
//         location.replace(location);
//     }
//     var _html = document.getElementsByTagName('html')[0];
//     var length = newHeight > newWidth ? newWidth : newHeight;
//     var bi = newHeight > newWidth ? newHeight / newWidth : newWidth / newHeight;
//     _html.style.fontSize = length / 100 * bi + "px";
// });
//
// function getHeartPoint(angle) {
// 	var t = angle / Math.PI;
// 	var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
// 	var y = - 20 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
// 	return [offsetX + x, offsetY + y];
// }
//
// function startHeartAnimation() {
// 	var interval = 50;
// 	var angle = 10;//10
// 	var heart = [];
// 	var animationTimer = setInterval(function () {
// 		var bloom = getHeartPoint(angle);
// 		var draw = true;
// 		for (var i = 0; i < heart.length; i++) {
// 			var p = heart[i];
// 			var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
// 			if (distance < Garden.options.bloomRadius.max * 1.3) {
// 				draw = false;
// 				break;
// 			}
// 		}
// 		if (draw) {
// 			heart.push(bloom);
// 			garden.createRandomBloom(bloom[0], bloom[1]);
// 		}
// 		if (angle >= 30) {
// 			clearInterval(animationTimer);
// 			showMessages();
// 		} else {
// 			angle += 0.2;
// 		}
// 	}, interval);
// }

(function ($) {
    $.fn.typewriter = function () {
        this.each(function () {
            var $ele = $(this), str = $ele.html(), progress = 0;
            $ele.html('');
            var timer = setInterval(function () {
                var current = str.substr(progress, 1);
                if (current === '<') {
                    progress = str.indexOf('>', progress) + 1;
                } else {
                    progress++;
                }
                $ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
                if (progress >= str.length) {
                    clearInterval(timer);
                }
            }, 75);
        });
        return this;
    };
})(jQuery);

function timeElapse(date) {
    var current = Date();
    var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
    var days = Math.floor(seconds / (3600 * 24));
    // var c_days = days / 36500;
    seconds = seconds % (3600 * 24);
    var hours = Math.floor(seconds / 3600);
    // var c_hours = hours / 24;
    if (hours < 10) {
        hours = "0" + hours;
    }
    seconds = seconds % 3600;
    var minutes = Math.floor(seconds / 60);
    // var c_minutes = minutes / 60;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    seconds = seconds % 60;
    // var c_seconds = seconds / 60;
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    var result = "<span class=\"digit days\">" + days + "</span> days <span class=\"digit hours\">" + hours + "</span> hours <span class=\"digit minutes\">" + minutes + "</span> minutes <span class=\"digit seconds\">" + seconds + "</span> seconds";
    $("#elapseClock").html(result);
    //时间不同数字颜色不同
    // $(".digit .days").css("color", num2color(c_days));
    // $(".digit .hours").css("color", num2color(c_hours));
    // $(".digit .minutes").css("color", num2color(c_minutes));
    // $(".digit .seconds").css("color", num2color(c_seconds));
}
//不同数字对应不同颜色
function num2color(present) {
    var a = [17595, 40908, 56576, 56695, 56746, 56797, 4456652, 5570781, 6710886, 6741248, 7798971, 10083584, 10813644, 12648550, 13369344, 13369548, 14526976, 15089408, 15628032, 15658496];
    var diff = 15658496 - 17595;
    var val = present * diff;
    var index = maopao(a, val);
    var c = a[index];
    var s = c.toString(16);
    var s2 = s.length < 6 ? addZero(6 - s.length) : s;
    return "#" + s2;
}
//数字对应数组中不同下标
function maopao(a, key) {
    for (var i = 0; i < a.length - 2; i++) {
        if (a[i] > key && i === 0) {
            return i;
        } else if (a[i] < key && a[i + 1] > key) {
            return i + 1;
        } else if (a[i + 1] < key && (i + 1) === (a.length - 1)) {
            return i + 1;
        }
    }
    return 0
}
//补零
function addZero(num) {
    var s = "";
    for (var i = 0; i < num; i++) {
        s += 0;
    }
    return s;
}

// function showMessages() {
// 	adjustWordsPosition();
// 	$('#messages').fadeIn(5000, function() {
// 		showLoveU();
// 	});
// }

// function adjustWordsPosition() {
//     var $words = $('#words');
//     var $garden2 = $("#garden");
// 	$words.css("position", "absolute");
// 	$words.css("top", $garden2.position().top + 195);
// 	$words.css("left", $garden2.position().left + 70);
// }

// function adjustCodePosition() {
//     var $code = $("#code");
// 	$code.css("margin-top", $(window).height() * 0.05);
// }

// function showLoveU() {
// 	$('#loveu').fadeIn(3000);
// }

//生成圆线样式
// function s(n) {
//     for (var i = 1; i <= n ; i++) {
//         var d = i * 360 / n;
//         var t = '.heart3d [class$="' + i +'"] {-webkit-transform: rotateY(' + d +'deg) rotateZ(45deg) translateX(30px);transform: rotateY(' + d +'deg) rotateZ(45deg) translateX(30px);}';
//         console.log(t);
//     }
// }

//生成圆线
// function f(n) {
//     for (var i = 1; i <= n ; i++) {
//         var t = '<div class="rib'+i+'"></div>';
//         console.log(t);
//     }
// }