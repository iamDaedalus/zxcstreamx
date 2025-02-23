function lazy() {
  const lazyImg = document.querySelectorAll("img.lazy");
  const lazyIframe = document.querySelectorAll("iframe.lazy");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Load image or iframe when in viewport
          const target = entry.target;
          if (target.tagName === "IMG") {
            target.src = target.dataset.src;
          } else if (target.tagName === "IFRAME") {
            target.src = target.dataset.src;
          }
        } else {
          // Remove iframe src when out of viewport
          if (entry.target.tagName === "IFRAME") {
            entry.target.src = "";
          }
        }
      });
    },
    { threshold: 0.1 }
  );

  lazyImg.forEach((img) => observer.observe(img));
  lazyIframe.forEach((iframe) => observer.observe(iframe));
}
