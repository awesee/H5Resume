~(function () {
    function getEle(ele) {
        if (ele) {
            return document.querySelector(ele);
        }
    }
    var winW = document.documentElement.clientWidth;
    var winH = document.documentElement.clientHeight;
    var desW = 640;
    var desH = 1008;
    var main = getEle("#main");
    var phoneId = getEle('#phone');
    var phoneBtn = getEle('#phoneBtn');
    var phoneKey = getEle('#phoneKey');
    var phoneText = getEle('.phoneHeadText');
    var bell = getEle('#bell');
    var say = getEle('#say');
    var music = getEle('#music');
    var phoneBtnTouch = getEle('.phoneBtnTouch');
    var phoneKeyTouch = getEle('.phoneKeyTouch');
    var message = getEle('#message');
    var messageUl = getEle('#messageList');
    var messageLis = messageUl.getElementsByTagName('li');
    var cubeBox = getEle('#cubeBox');
    var cubeLis = cubeBox.getElementsByTagName('li');
    var loading = getEle('#loading');
    var process = getEle('.loadingProcess');
    var processBar = getEle('.loadingProcessBar');
    var bell = getEle('#bell');
    //main.style.transform = 'scale(' + winH / desH + ')';
    if(desW/desH<winW/winH){
        main.style.webkitTransform = 'scale('+winW/desW+')';
    }else{
        main.style.webkitTransform = 'scale('+winH/desH+')';
    }
    phoneBtnTouch.addEventListener('touchstart', phone, false);
    showLoading();
    function showLoading() {
        var arr = ['phoneBg.jpg', 'cubeBg.jpg', 'cubeImg1.png', 'cubeImg2.png', 'cubeImg3.png', 'cubeImg4.png', 'cubeImg5.png', 'cubeImg6.png', 'phoneBtn.png', 'phoneKey.png', 'messageHead1.png', 'messageHead2.png', 'messageText.png']
        var objImg = new Image();
        if (!objImg.loaded)
            for (var i = 0; i < arr.length; i++) {
                objImg.src = "img/" + arr[i];
                objImg.index = i + 1;
                objImg.onload = function () {
                    processBar.style.width = this.index / arr.length * 100 + "%";
                    objImg.loaded = true;
                }
                objImg.onerror = function () {
                    console.log('error');
                }
            }
        processBar.addEventListener('transitionend', function () {
            this.parentNode.parentNode.remove();
            //bell.play();
        }, false)
    }

    function phone() {
        //bell.pause();
        phoneBtn.style.opacity = 0;
        phoneKey.style.transform = 'translate(0,0)';
        phoneText.innerHTML = '00:02';
        window.setTimeout(function () {
            //say.play();
        }, 1000)
        phoneKeyTouch.addEventListener('touchstart', closePhone, false);
    }
    function closePhone() {
        say.pause();
        phoneId.style.transform = 'translate(0,' + desH + 'px)';
        phoneId.addEventListener('transitionend', function () {
            this.remove();
            messageFn()
        }, false)

    }

    function messageFn() {
        //music.play();
        var index = 0;
        var h = 0;
        var timer = window.setInterval(function () {
            messageLis[index].style.opacity = 1;
            messageLis[index].style.transform = 'translate(0,0)';
            h -= messageLis[index].offsetHeight - 10;
            if (index >= 3) {
                messageUl.style.transform = 'translate(0,' + (h) + 'px)';
            }
            if (index == messageLis.length - 1) {
                window.clearInterval(timer);
                window.setTimeout(function () {
                    message.remove();
                    music.pause();
                    cubeFn();
                }, 2000)

            } else {
                index++;
            }

        }, 1000)
    }

    function cubeFn() {
        cubeBox.style.transform = 'scale(0.7) rotateX(-45deg) rotateY(45deg)'
        cubeBox.style.transition = "1s";
        cubeBox.addEventListener('transitionend', function () {
            this.style.transition = "";
            bind();
        }, false)
    }
    function bind() {
        var down = {x: 0, y: 0};
        var flag = true;
        /*true是点击,false是拖拽*/
        var startX = -45;
        var startY = 45;
        var x = 0;
        var y = 0;
        document.addEventListener('touchstart', function (e) {
            var touch = e.changedTouches[0];
            down.x = touch.pageX;
            down.y = touch.pageY;
        }, false);
        document.addEventListener('touchmove', function (e) {
            flag = false;
            var touch = e.changedTouches[0];
            x = down.y - touch.pageY;
            y = down.x - touch.pageX;
            if (startX + x > 70) {
                x = -startX + 70;
            } else if (startX + x < -70) {
                x = -startX - 70;
            }
            cubeBox.style.transform = ' scale(0.7) rotateX(' + (startX + x) + 'deg) rotateY(' + (startY + y) + 'deg)';
        }, false);
        document.addEventListener('touchend', function (e) {
            if (flag) {
//                      点击
            } else {
                startX += x;
                startY += y;
            }
        }, false)
    }

    document.addEventListener('touchstart', function (e) {
//       console.log(e.target.className);

    }, false)

})()
