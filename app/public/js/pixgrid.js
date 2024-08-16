$(document).on("click", ".pixgrid", (e) => {
  let centerImage = (img) => {
    let myDifX = (window.document.body.clientWidth - img.prop("width")) / 2,
      myDifY = (window.innerHeight - img.prop("height")) / 2;
    img.css({ top: myDifY + "px", left: myDifX + "px" });
  };

  if ("IMG" === e.target.tagName) {
    let myOverlay = $("<div>", {
      id: "overlay",
      css: {
        overflow: 'hidden',
        position: "absolute",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        cursor: "pointer",
        width: window.document.body.clientWidth + "px",
        height: window.innerHeight + "px",
        top: window.scrollY + "px",
        left: window.scrollX + "px",
      },
    });
    $("body").append(myOverlay);

    let imageSrc = e.target.src;
    let largeImage = $("<img>", {
      id: "largeImage",
      src: imageSrc.substr(0, imageSrc.length - 7) + ".jpg",
      css: { display: "block", position: "absolute" },
    });

    largeImage.on("load", (e) => {
      let img = $(e.target);

      if (img.prop("height") > window.innerHeight) {
        let ratio = window.innerHeight / img.prop("height");
        img.prop("height", img.prop("height") * ratio);
        img.prop("width", img.prop("width") * ratio);
      }

      if (img.prop("width") > window.document.body.clientWidth) {
        let ratio = window.document.body.clientWidth / img.prop("width");
        img.prop("height", img.prop("height") * ratio);
        img.prop("width", img.prop("width") * ratio);
      }
      centerImage(img);
      myOverlay.append(largeImage);
    });

    largeImage.on("click", () => {
      if (myOverlay) {
        $(window).off("resize scroll");
        myOverlay.remove();
      }
    });

    $(window).on("scroll", () => {
      if (myOverlay) {
        myOverlay.css({
          top: window.scrollY + "px",
          left: window.scrollX + "px",
        });
      }
    });

    $(window).on("resize", () => {
      if (myOverlay) {
        myOverlay.css({
          width: window.document.body.clientWidth + "px",
          height: window.innerHeight + "px",
          top: window.scrollY + "px",
          left: window.scrollX + "px",
        });
        centerImage(largeImage);
      }
    });
  }
});
