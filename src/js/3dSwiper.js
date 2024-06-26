class Swiper {
    constructor(ele, config = {}) {
        let container = document.querySelector(ele),
            bannerWrap = container.querySelector('.swiper-wrap'),
            btnPrev = container.querySelector('.swiper-btn-prev'),
            btnNext = container.querySelector('.swiper-btn-next'),
            lis = container.querySelectorAll('.swiper-wrap  li'),
            delay = config.delay || 2000,
            autoPlay = config.autoPlay === undefined ? true : config.autoPlay,
            p1 = lis[0],
            p2 = lis[1],
            p3 = lis[2],
            p4 = lis[3],
            p5 = lis[4],
            p6 = lis[5],
            prev = null,
            next = null,
            maxNum = lis.length - 1,
            dots = {},
            timer = 0,
            dotIndex = 0,
            isAddDot = false,
            startP, disX, disY, index;

        if (lis.length < 3) {
            throw ("image number need 3+");
        }
        if (config.navigator) {
            if (config.navigator.prev) {
                prev = document.querySelector(config.navigator.prev);
            }
            if (config.navigator.next) {
                next = document.querySelector(config.navigator.next);
            }
        }
        if (lis.length > 6) {
            p5 = lis[lis.length - 2];
            p6 = lis[lis.length - 1];
            for (let i = 0; i < lis.length; i++) {
                lis[i].classList.add("p4");
            }
            p1.className = "p1";
            p2.className = "p2";
            p3.className = "p3";
            p5.className = "p5";
            p6.className = "p6";
            bannerWrap.classList.add("swiper-6");
        } else {
            for (let i = 0; i < lis.length; i++) {
                lis[i].classList.add(`p${i+1}`);
            }
            bannerWrap.classList.add(`swiper-${lis.length}`);
        }
        // 设置点
        if (config.pagination) {
            let p = container.querySelector(config.pagination);
            for (let i = 0, len = lis.length; i < len; i++) {
                let li = document.createElement("li");
                p.appendChild(li);
            }
            dots = p.querySelectorAll('li');
            dots[0].className = "active";
        }
        bannerWrap.classList.add("transition");
        // 图片移动,dire判断是否滑动过		
        function move(dire) {
            var arrCls = []; // 保存类名,用来赋值
            dire = dire || false;
            dotIndex++;

            // 得到所有类名
            for (var i = 0; i < lis.length; i++) {
                arrCls.push(lis[i].className);
            }

            // 循环赋值类名
            for (var i = 0; i < lis.length; i++) {
                if (dire) {
                    // 判断左滑
                    if (dire < 0) {
                        index = i - 1; // 得到最前面元素的上一个, 自己脑补过程
                        if (index < 0) {
                            index = maxNum;
                        }
                    } else if (dire > 0) { // 判断右滑
                        index = i + 1; // 下一个
                        if (index > maxNum) {
                            index = 0;
                        }
                        if (!isAddDot) { // 点导航下一个
                            dotIndex -= 2;
                            isAddDot = true;
                        }
                    }
                }

                // 如果没有参数,正常循环
                if (!dire) {
                    index = i - 1;
                    if (index < 0) {
                        index = maxNum;
                    }
                }

                lis[i].className = arrCls[index];
            }
            if (dotIndex > maxNum) {
                dotIndex = 0;
            } else if (dotIndex < 0) {
                dotIndex = maxNum;
            }

            isAddDot = false; // 判断是否加过
            setDotActive(dotIndex);

        }

        function setDotActive(index) {
            if (config.pagination) {
                for (var i = 0; i < dots.length; i++) {
                    dots[i].className = '';
                }
                dots[index].className = 'active';
            }
        }

        function setTimer() {
            if (autoPlay) {
                timer = setInterval(move, delay);
            }
        }

        function addTransition() {
            bannerWrap.classList.add('transition');
        }

        function removeTransition() {
            bannerWrap.classList.remove('transition');
        }

        function picTransform(x) {
            var p1 = container.querySelector('.p1'),
                p2 = container.querySelector('.p2'),
                p3 = container.querySelector('.p3'),
                p4 = container.querySelector('.p4'),
                p5 = container.querySelector('.p5'),
                p6 = container.querySelector('.p6');
            var percentV2 = Math.floor(p2.offsetWidth * 0.15), // p2 的百分比转px
                percentV3 = Math.floor(p3.offsetWidth * 0.26); // p3
            var number = lis.length > 6 ? 6 : lis.length;

            if (x < -7) {
                x = -7;
            } else if (x > 12) {
                x = 12
            }
            p1.style.transform = 'translate3d(' + x + 'px,0,100px) scale(.5)';
            p2.style.transform = 'translate3d(' + (percentV2 - x) + 'px,0,90px) scale(.4)';
            switch (number) {
                case 3:
                    p3.style.transform = 'translate3d(' + (-percentV2 - x) + 'px,0,90px) scale(.4)';
                    break;
                case 4:
                    p4.style.transform = 'translate3d(' + (-percentV2 - x) + 'px,0,90px) scale(.4)';
                    break;
                case 5:
                    p3.style.transform = 'translate3d(' + (percentV3 - (x * 2)) + 'px,0,80px) scale(.3)';
                    p4.style.transform = 'translate3d(' + (-percentV3 - (x * 4)) + 'px,0,80px) scale(.3)';
                    p5.style.transform = 'translate3d(' + (-percentV2 - (x * 2)) + 'px,0,90px) scale(.4)';
                    break;
                case 6:
                    p3.style.transform = 'translate3d(' + (percentV3 - (x * 2)) + 'px,0,80px) scale(.3)';
                    p4.style.transform = 'translate3d(' + x + 'px,0,80px) scale(.3)';
                    p5.style.transform = 'translate3d(' + (-percentV3 - (x * 4)) + 'px,0,80px) scale(.3)';
                    p6.style.transform = 'translate3d(' + (-percentV2 - (x * 2)) + 'px,0,90px) scale(.4)';
                    break;
            }
        }

        function disabledPrev(e) {
            e.preventDefault();
        }
        setTimer()

        bannerWrap.addEventListener('touchstart', function(e) {
            document.addEventListener("touchmove", disabledPrev(e), { passive: false }); // 禁止滑动后退
            removeTransition();
            startP = e.changedTouches[0].clientX;
            clearInterval(timer);
        }, false);
        bannerWrap.addEventListener('touchmove', function(e) {
            var movex = e.changedTouches[0].clientX;
            disX = movex - startP; // 得到滑动的距离

            picTransform(disX / 20); // 让图片缓慢滑动
        }, false);
        bannerWrap.addEventListener('touchend', function(e) {
            document.removeEventListener("touchmove", disabledPrev(e), { passive: false }); // 禁止滑动后退
            addTransition();
            var p1 = container.querySelector('.p1'),
                p2 = container.querySelector('.p2'),
                p3 = container.querySelector('.p3'),
                p4 = container.querySelector('.p4'),
                p5 = container.querySelector('.p5'),
                p6 = container.querySelector('.p6');
            // 清除行内样式，否则类名的样式不生效
            if (p1) { p1.style.cssText = ''; }
            if (p2) { p2.style.cssText = ''; }
            if (p3) { p3.style.cssText = ''; }
            if (p4) { p4.style.cssText = ''; }
            if (p5) { p5.style.cssText = ''; }
            if (p6) { p6.style.cssText = ''; }

            // 防止点击时也会触发
            if (disX) {
                move(disX);
                disX = false;
            }
            setTimer()
        }, false);
        bannerWrap.addEventListener("mouseenter", function() {
            clearInterval(timer);
        });
        btnPrev.addEventListener("mouseenter", function() {
            clearInterval(timer);
        });
        btnNext.addEventListener("mouseenter", function() {
            clearInterval(timer);
        });
        btnPrev.addEventListener("click", function() {
            clearInterval(timer);
        });
        btnNext.addEventListener("click", function() {
            clearInterval(timer);
        });
        bannerWrap.addEventListener("mouseleave", function() {
            setTimer()
        });
        btnPrev.addEventListener("mouseleave", function() {
            setTimer()
        });
        btnNext.addEventListener("mouseleave", function() {
            setTimer()
        });
        if (prev) {
            prev.onclick = function() {
                move(1);
            };
            prev.onmousedown = function() {
                clearInterval(timer);
            }
            prev.onmouseup = function() {
                setTimer()
            }
        }
        if (next) {
            next.onmousedown = function() {
                clearInterval(timer);
            }
            next.onmouseup = function() {
                setTimer()
            }
            next.onclick = function() {
                move(-1);
            };
        }
    }
}