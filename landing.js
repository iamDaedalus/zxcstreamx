function landingFunction() {
  const showlist = [
    { id: "950396", media_type: "movie" },
    { id: "774370", media_type: "movie" },
    { id: "170", media_type: "movie" },
    { id: "945961", media_type: "movie" },
    { id: "744857", media_type: "movie" },
    { id: "913290", media_type: "movie" },
    { id: "1184918", media_type: "movie" },
    { id: "94605", media_type: "tv" },
    { id: "1100782", media_type: "movie" },
  ];
  const landingWrapper = document.querySelector(".landingWrapper");

  showlist.forEach(async (meow) => {
    const logo = await fetchImages(meow.id, meow.media_type, "englishLogo");
    const data = await fetchShow(meow.id, meow.media_type);

    const landingSlide = document.createElement("div");
    landingSlide.className = "swiper-slide landingSlide";
    landingSlide.innerHTML = `
    <div class="landingInfo">
    <img class="landingLogo lazy" data-src="${logo}"/>
    <i class="landingTagline">${data.tagline}</i>
    <h1 class="landingTitle">${data.title}</h1>

    <div class="landingWidgets">
    <span><i class='bx bx-volume-full' ></i></span>&#8226;
    <span><i class='bx bx-video' ></i></span>
   &#8226;
    <span><i class='bx bx-hide'></i></span>
    </div>
    </div>
    <img class="landingBackdrop  lazy" data-src="${data.backdrop}" />
    `;

    landingWrapper.appendChild(landingSlide);
   lazy()
  });

  const backdropSwiper = new Swiper(".backdropLanding", {
    slidesPerView: "auto",
    loop: false,
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}

function initSwipers() {
  // Initialize the poster swiper
  const posterSwiper = new Swiper(".posterContainer", {
    slidesPerView: "auto",
    loop: false,
    spaceBetween: 20,
    centeredSlides: "true",
    loopedSlides: 3,

    controller: {
      control: backdropSwiper,
    },
  });

  backdropSwiper.controller.control = posterSwiper;
}
