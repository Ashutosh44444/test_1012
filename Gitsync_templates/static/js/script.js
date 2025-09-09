function locoScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });

    locoScroll.update();

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                top: 0,
                left: 0,
                width: window.innerWidth,
                height: window.innerHeight
            };
        },
        // pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
        pinType: "transform"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

    document.querySelectorAll('[data-scroll-to]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('data-scroll-to'));
            locoScroll.scrollTo(target);
        });
    });

    window.addEventListener("load", () => {
        document.fonts.ready.then(() => {
            setTimeout(() => {
                locoScroll.update();
                ScrollTrigger.refresh();
                console.log("ScrollHeight after everything loaded:", document.querySelector("#main").scrollHeight);
            }, 100);
        });
    });
}

function animateOnScroll() {
    gsap.from(".header-content", {
        scrollTrigger: {
            trigger: "#header",
            scroller: "#main",
            start: "top center"
        },
        opacity: 0,
        y: -50,
        duration: 1.2,
        ease: "expo.out"
    });
    gsap.utils.toArray('.feature-box, .tip-box').forEach((box, i) => {
        const delay = i * 0.15;
        const xMove = i % 2 === 0 ? -30 : 30;

        gsap.from(box, {
            scrollTrigger: {
                trigger: box,
                scroller: "#main",
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            opacity: 0,
            y: 40,
            x: xMove,
            rotateX: 10,
            rotateY: 15,
            scale: 0.9,
            duration: 1,
            ease: "power4.out",
            delay: delay
        });
    });
    gsap.from(".cta-button", {
        scrollTrigger: {
            trigger: "#header",
            scroller: "#main",
            start: "top center"
        },
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 1,
        delay: 1,
        ease: "expo.out"
    });
    
}

document.querySelector('.cta-button').addEventListener('click', () => {
    const particleContainer = document.getElementById('particle-container');

    for (let i = 0; i < 40; i++) {
        const star = document.createElement('div');
        star.classList.add('particle');

        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `-${Math.random() * 100}px`;

        const size = Math.random() * 10 + 8;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        particleContainer.appendChild(star);

        star.addEventListener('animationend', () => {
            star.remove();
        });
    }
});

locoScroll();
animateOnScroll();