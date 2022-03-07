const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");

searchEl.addEventListener("click", function() {
    searchInputEl.focus();
});

searchInputEl.addEventListener("focus", function() {
    searchEl.classList.add("focused");
    searchInputEl.setAttribute("placeholder", "통합검색");
});

// focused 라는 클래스 없애주기
searchInputEl.addEventListener("blur", function() {
    searchEl.classList.remove("focused");
    searchInputEl.setAttribute("placeholder", "");
});

const badgeEl = document.querySelector('header .badges');

window.addEventListener('scroll', _.throttle(function() {
    console.log(window.scrollY);
    if (window.scrollY > 500) {
        //배지 숨기기
        // gsap.to(요소, 지속시간, 옵션);
        gsap.to(badgeEl, .6, {
            opacity: 0,
            display: 'none'
        });
    } else {
        //배지 보이기
        gsap.to(badgeEl, .6, {
            opacity: 1,
            display: 'block'
        });
    }
}, 300));
// _.throttle(함수, 시간)

const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
    // gsap.to(요소, 지속시간, 옵션);
    gsap.to(fadeEl, 1, {
        delay: (index + 1) * .7, // 0,7, 1.4, 2.1, 2.8초 뒤에 동작할 수 있는 구조
        opacity: 1
    });
});

// new Swiper(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
    direction: 'vertical',
    autoplay: true,
    loop: true
});

new Swiper('.promotion .swiper-container', {
    slidesPerView: 3, // 한번에 보여줄 슬라이드 개수
    spaceBetween: 10, // 슬라이드 사이 여백
    centeredSlides: true, // 1번 슬라이드가 가운데 보이기
    loop: true,
    // autoplay: {
    //     delay: 4000
    // },
    pagination: {
        el: '.promotion .swiper-pagination', // 페이지 번호 요소 선택자
        clickable: true // 사용자의 페이지 번호 요소 제어 가능 여부
    },
    navigation: {
        prevEl: '.promotion .swiper-prev',
        nextEl: '.promotion .swiper-next'
    }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function() {
    isHidePromotion = !isHidePromotion
    if (isHidePromotion) {
        // 숨김처리
        promotionEl.classList.add('hide');
    } else {
        // 보임처리
        promotionEl.classList.remove('hide');
    }
});

// 범위 랜던 함수(소수점 2자리까지)
function random(min, max) {
    // toFixed()를 통해 반환된 문자 데이터를,
    // parseFloat()를 통해 소수점을 가지는 숫자 데이터로 변환
    return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
    // gsap.to(요소, 시간, 옵션)
    gsap.to(selector, random(1.5, 2.5), {
        y: size,
        repeat: -1,  // 무한 반복
        yoyo: true, // 아래로 내려왔다가 다시 위로 올라가는 기능
        ease: Power1.easeInOut,
        delay: random(0, delay)// 처음에 몇 초간 멈췄다가 애니메이션 실행됨
    });
}

floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl) {
    // ScrollMagic : 자바스크립트 라이브러리
    // Scene() : 특정한 요소를 감시하는 옵션을 지정해주는 메소드
    // setClassToggle() : html class를 넣었다 뺐다 지정해주는 역할
    new ScrollMagic
        .Scene({
            triggerElement: spyEl, // 보여짐 여부를 감시할 요소들
            triggerHook: .8 // viewport에서 0.8지점에 오면 발동한다
        })
        .setClassToggle(spyEl, 'show') // spyEl을 감지하여 show class를 넣었다가 빼는 작업
        .addTo(new ScrollMagic.Controller());
});