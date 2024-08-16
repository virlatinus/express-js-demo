$(document).on("click", ".pixgrid", (e) => {
  let centerImage = (theImage) => {
    let myDifX = (window.document.body.clientWidth - theImage.prop("width")) / 2,
      myDifY = (window.innerHeight - theImage.prop("height")) / 2;
    theImage.css({ top: myDifY + "px", left: myDifX + "px" });
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

    largeImage.on("load", (t) => {
      let that = $(t.target);

      if (that.prop("height") > window.innerHeight) {
        let ratio = window.innerHeight / that.prop("height");
        that.prop("height", that.prop("height") * ratio);
        that.prop("width", that.prop("width") * ratio);
      }

      if (that.prop("width") > window.document.body.clientWidth) {
        let ratio = window.document.body.clientWidth / that.prop("width");
        that.prop("height", that.prop("height") * ratio);
        that.prop("width", that.prop("width") * ratio);
      }
      centerImage(that);
      myOverlay.append(largeImage);
    });

    largeImage.on("click", () => {
      myOverlay && ($(window).off("resize scroll"), myOverlay.remove());
    });

    $(window).on("scroll", () => {
      myOverlay &&
        myOverlay.css({
          top: window.scrollY + "px",
          left: window.scrollX + "px",
        });
    });

    $(window).on("resize", () => {
      myOverlay &&
        (myOverlay.css({
          width: window.document.body.clientWidth + "px",
          height: window.innerHeight + "px",
          top: window.scrollY + "px",
          left: window.scrollX + "px",
        }),
        centerImage(largeImage));
    });
  }
});
