const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
    smartphone: { smooth: true },
    tablet: { smooth: true }
});

gsap.registerPlugin(ScrollTrigger);

scroll.on("scroll", ScrollTrigger.update);

ScrollTrigger.scrollerProxy("[data-scroll-container]", {
    scrollTop(value) {
        return arguments.length
            ? scroll.scrollTo(value, 0, 0)
            : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    pinType: document.querySelector("[data-scroll-container]").style.transform
        ? "transform"
        : "fixed"
});

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();

gsap.from(".step-box", {
    scrollTrigger: {
        trigger: ".three-boxes",
        scroller: "[data-scroll-container]",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    stagger: 0.3
});

document.getElementById("project-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const popup = document.getElementById("success-popup");
    popup.style.display = "block";

    setTimeout(() => {
        popup.style.display = "none";
    }, 5000);

    for (let i = 0; i < 30; i++) {
        createStar();
    }

    this.reset();
});

function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `-${Math.random() * 20}px`;
    star.style.animationDuration = `${1.5 + Math.random()}s`;

    document.getElementById("star-container").appendChild(star);

    setTimeout(() => {
        star.remove();
    }, 2000);
}

document.getElementById("project-file").addEventListener("change", function () {
    const fileName = this.files[0]?.name || "No file selected";
    document.getElementById("file-name").textContent = fileName;
});