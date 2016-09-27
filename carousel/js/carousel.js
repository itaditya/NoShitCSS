function elem(element) {
    return document.querySelector(element);
}

function SCarousel(prefs) {
    this.element = elem(prefs.element);
    this.sliderScroller = this.element.querySelector(".carousel-view");
    this.slider = this.element.querySelector(".carousel-images");
    this.cimgno = this.slider.children.length;
    this.cprev = this.element.querySelector("#cprev");
    this.cnext = this.element.querySelector("#cnext");
    this.cwidth = this.element.querySelector(".carousel-view").clientWidth;
    this.currentIndex = 0;
    this.anims = {
        simple: " .4s ease-in-out",
        elastic: ".4s cubic-bezier(0.6, -0.28, 0.74, 0.05)"
    }
    var toMove = 0,that = this;


    function init() {
        that.slider.style.width = (that.cwidth * that.cimgno) + "px";
        var anim = that.anims[prefs.animation];
        if (anim) {
            that.slider.style.transition = anim;
        }
        var arr = that.slider.children;
        var src = "";
        for (var i = arr.length - 1; i >= 0; i--) {
            arr[i].style.width = that.cwidth + "px";
            src = arr[i].dataset.src;
            if (src) {
                arr[i].style.background = 'url(' + src + ')';
            }
        }
    }
    this.next = function() {
        if (that.currentIndex < that.cimgno - 1) {
            that.currentIndex += 1;
            toMove += that.cwidth;
        } else {
            toMove = 0;
            that.currentIndex = 0;
        }
        that.slider.style.transform = "translateX(-" + toMove + "px)";
    }
    this.prev = function() {
        if (that.currentIndex != 0) {
            that.currentIndex -= 1;
            toMove -= that.cwidth;
        }
        that.slider.style.transform = "translateX(-" + toMove + "px)";
    }
    this.cnext.addEventListener("click", function() {
        that.next();
    });
    this.cprev.addEventListener("click", function() {
        that.prev();
    });
    //Sliding through arrow keys

    document.addEventListener('keydown', function() {
        var keyno = event.keyCode;
        if (keyno == 39) {
            // key = "Right";
            that.next();
        }
        if (keyno == 37) {
            // key = "Left";
            that.prev();
        }
    });
    init();
}
