$(function () {
    var containerLength = (clientWidth < clientHeight ? clientWidth : clientHeight) * 0.8;
    var $container = $(".container");
    $container.width(containerLength);
    $container.height(containerLength);
    $("#subpage").height(containerLength + 20);
});