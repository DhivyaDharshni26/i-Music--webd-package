window.addEventListener("DOMContentLoaded",() => {
    let rageslider1 = new RageSlider({id: "rageslider1"});
  });
  
  class RageSlider {
    constructor(args) {
      let el = document.querySelector(`#${args.id}`),
        isMobile = "ontouchstart" in document.documentElement,
        clientDownEvent = isMobile ? "touchstart" : "mousedown",
        clientUpEvent = isMobile ? "touchend" : "mouseup";
  
      this.track = el.querySelector(".rage__input");
      this.flameArea = el.querySelector(".rage__flame-area");
      this.flameAreaContext = this.flameArea.getContext("2d");
      this.flameAreaScale = 2;
      this.face = el.querySelector(".rage__face");
      this.value = el.querySelector(".rage__value");
      this.kbdActiveClass = "rage__input--active";
  
      this.isBurning = false;
      this.maxParticles = 32;
      this.particle = () => ({
        x: this.randomX(),
        y: this.flameArea.height / this.flameAreaScale - this.getHandleHeight() / 2,
        rStart: this.getHandleHeight() / 3,
        speed: this.getHandleHeight() / 10
      });
      this.particles = [];
  
      // assign listeners
      window.addEventListener("resize",() => {
        this.adjustCanvas();
      });
      this.track.addEventListener(clientDownEvent,e => {
        if (e.which !== 3) {
          this.isBurning = true;
          this.startFlame();
        }
      });
      this.track.addEventListener(clientUpEvent,() => {
        this.isBurning = false;
      });
      this.track.addEventListener("keydown",e => {
        let kc = e.keyCode;
        if (kc >= 37 && kc <= 40) {
          this.isBurning = true;
          this.startFlame();
          this.track.classList.add(this.kbdActiveClass);
        }
      });
      this.track.addEventListener("keyup",() => {
        this.isBurning = false;
        this.track.classList.remove(this.kbdActiveClass);
      });
      this.track.addEventListener("input",() => {
        this.updateFacePos();
      });
  
      // initiate
      this.adjustCanvas();
      this.updateFacePos();
    }
    adjustCanvas() {
      let S = this.flameAreaScale,
        OW = this.flameArea.offsetWidth,
        OH = this.flameArea.offsetHeight;
      // use natural canvas dimensions affected by ems
      this.flameArea.width = OW * S;
      this.flameArea.height = OH * S;
      this.flameArea.style.width = OW + "px";
      this.flameArea.style.height = OH + "px";
      this.flameAreaContext.scale(S,S);
    }
    getHandleHeight() {
      let CS = window.getComputedStyle(this.face),
        height = CS.getPropertyValue("height"),
        heightNoPx = parseFloat(height.split("px")[0]);
  
      return heightNoPx;
    }
    getRangePercent() {
      let max = this.track.max,
        min = this.track.min,
        relativeValue = this.track.value - min,
        ticks = max - min,
        percent = relativeValue / ticks;
  
      return percent;
    }
    randomX() {
      let handleSize = this.getHandleHeight(),
        handleRad = handleSize/2,
        // get the current handle position
        xLimit = this.flameArea.width / this.flameAreaScale - handleSize,
        placeX = handleRad + (this.getRangePercent() * xLimit),
        // randomly adjust between the handle center and edge
        flip = Math.random() < 0.5 ? -1 : 1,
        displace = Math.random() * (handleRad - handleSize/3) * flip,
        x = placeX + displace;
  
      return x;
    }
    startFlame() {
      if (!this.particles.length)
        this.updateFlame();
    }
    updateFlame() {
      let c = this.flameAreaContext,
        S = this.flameAreaScale,
        W = this.flameArea.width / S,
        H = this.flameArea.height / S,
        faceCenter = H - this.getHandleHeight()/2;
  
      c.clearRect(0,0,W,H);
  
      // supply particles
      if (this.particles.length < this.maxParticles && this.isBurning)
        this.particles.push(this.particle());
  
      // particle ascension
      for (let p of this.particles) {
        let faceCenterToTopPct = p.y / faceCenter,
          pRadius = p.rStart * faceCenterToTopPct;
  
        p.y -= p.speed;
  
        if (p.y <= 0) {
          // particles shouldn’t regenerate if the user stops interacting
          if (this.isBurning) {
            p.x = this.randomX();
            p.y = faceCenter;
  
          } else {
            this.particles.shift();
          }
  
        } else {
          // draw the particle
          let hue = 50 * faceCenterToTopPct;
          c.fillStyle = `hsl(${hue},90%,50%)`;
          c.beginPath();
          c.arc(p.x,p.y,pRadius,0,2*Math.PI);
          c.fill();
          c.closePath();
        }
      }
  
      requestAnimationFrame(() => {
        if (this.particles.length)
          this.updateFlame();
      });
    }
    updateFacePos() {
      let percent = this.getRangePercent(),
        left = percent * 100,
        emAdjust = percent * 1.5;
  
      this.face.style.left = `calc(${left}% - ${emAdjust}em)`;
      this.value.innerHTML = this.track.value;
    }
  }