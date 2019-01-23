/*
  Coldiarus Crack
  Onslaught (1995)
  Christian Corti
*/
function intro(player) {"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 338;
    buf1c.height = 8;
    buf1c.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    canvx.fillStyle = "#000";
    canvx.fillRect(0,0,384,272);

    canvx.drawImage(logo, 32,35);
    canvx.drawImage(back, 32,107);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    if (--sc_off < 0) {
      sc_off = 8;

      buf1x.globalCompositeOperation = "copy";
      buf1x.drawImage(buf1c, 9,0,329,8, 0,0,329,8);
      buf1x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf1x.drawImage(font, cx,0,8,8, 329,0,8,8);
    }

    buf2x.clearRect(0,0,320,8);
    buf2x.drawImage(buf1c, (7 - sc_off),0,320,8, 0,0,320,8);

    buf2x.globalCompositeOperation = "source-in";
    buf2x.drawImage(canvc, 32,227,320,8, 0,0,320,8);
    buf2x.globalCompositeOperation = "source-over";

    canvx.drawImage(canvc, 32,187,320,8, 32,196,320,8);
    canvx.drawImage(buf2c, 32,196);

    player.run();
    requestAnimationFrame(draw);
  }

  const back = new Image();
  const font = new Image();
  const logo = new Image();

  back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAACgAQMAAABHbSffAAAABlBMVEUAAAD///+l2Z/dAAABNElEQVRYw+3RsWrDMBAG4DOCaClk1WsULTkIuVfplKkPkMEIgoY+Q6a8ygXDQSC0b1DIUs9ZSgQmrp2ucdwOBZveadHw8evuBHVb0FTPTeEfQGMLObOAsaYwEuadEP1GDrwE9LSlD/fUDS2K8ALQTovpp+tONL6FEzCeEr27SSckbKEAYXNendyBMa8ueQOzmInLh7hwhX1wNedzSBaLsgfykg/u5HHbC4XFHb8T++HeY/oRXCNi3zAhv1QBMcZyuAv/J/D3seXKwWxexNogrCoQYym9uBvwjR/ALTfbGjfAAkKeTtQJF7smcdfAXKaWjo+dcJJSjQm4uibu8c7TDURghmdCWuPNYYKDcB0mQmCYZZhhdMP5HoUKFSocPRx4ewoVKlSocOQQxtKoQoUKFSocI/wCHDNhn1gRmR8AAAAASUVORK5CYII=";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAS9JREFUKM+FkbFKQzEUhs+U6SKdyhmkzxAQJMOhvkpwyBQ6SoeQJ/CJOh0pnOlSnQouQhEcSye5Q7jx3KiDiPaf/gT+j48EKvwZB2BamcE/qaashzKuJS+ERajQQFmmLH0DYIxZHCKCBb0gR+STy0RtTlAvhHtmFjQ9H9+ChN6jzmMw/Hx4nADj0320tnMToAtoTPTehKDIBAHqorCcTrsRzcCbd50OpIC9WxK/Xk0GEBM6sF0qOsAV0mVOiWjZDDqo12quAs1g/yJFeqOATTSetwdpgLldwZeBvUNvOhMwmGaAUPM3oNOyE95plXhUFb9VQ804v+0VMLMI6MMnwIag4ylVSi4jJ8lrGUUSZ0mYnLbx5qFum0GRDIgAFpAp59Ql8kTtUfH3N5ofp7Pf+AHXVJ5DvhwljwAAAABJRU5ErkJggg==";
  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAA5BAMAAAC15O8kAAAAJ1BMVEUAAACwP7bqdGy2trXk7U5wfOY3OcT///9i2MxNTU2m+p6vKimEhISMbcV+AAADwklEQVRo3u1TUZXjMAw0BVEwBVEoBVMohVAwhVIohaNwoG4sZ5SuvXZfnrfv8rHjJppOJhPJbUKF3oCtrm2vVI4rq57tlEeDQ+k51iUUfekP4NmWK9T+h4cd3gi/66uiqCOP7ho905zttCd0sAvvFacOHXsO7aSHmiJeFf2CmKNRVBsFzRjRAM0IVpdDTyV223tP9yz0t5VvB7nNFL7yfsmhysu8NCaE9s/qc6x11I1Ee6LBCGAKBL9kQOqLZ5wzfBY+HrhvoHuCfY3hNiYaiP6ScgOpTAJ1fCm4hyP7JdRoXhI9o6hjLedQ4q3+Iq6goggsLYkkOvH4S7KYQ+I7SDMa1DoDiZJEJxNP1Iq4mHMEWsWiEhSktN4RcWXi4by6mOMKUIemsjg5J/7oDkZrvSPiysSjxGKOKzGWDzqjYo2i3khiTyYeg+JYyyHhDqJQCaocpiFCEicef0kWc9zjI1NBFfOSRBJxZeKJxGKOK6L1F3EPKso9aEeEJE48/qdezCE5dpBK0FinIokk4mTi4RbKYs4RaBWLSoggpfWOJFcmxF+StZzDA9ShqSxOzok/uoNirXckuTIhjrWcwyNSPuiMijWKqiTSk4nHEHGs5ZBwB1GoYBM4TEMSiUw8/pIs5rjHR6aCejcviZAkVyYeIRZzXEn1Rxb3oNbSkUQiE4//qRdzSHwHaYZJ6lQkQpKczDw74moOSRIMXU5UgoCU0pHsyjsiIGs5hwdIUkDlZyb/7A4Ga70j2ZU1kk95Uiof9EjFGi2FJI1JPHnpvJk7iEIliHCYhmSS9DEP0HoqJLm5VANJIsmdEn5eCe2zsv3IOEzhDGXdpRCOh5XDrsBcFQivHiutxxWUrx5xz50eoHlWs4OhhyQy3HSvJMnIE9zDeR2pUWxbmru+eVZOOaVyMoVRvuxjC8CkvJ7U1tQjo5xD4fK7QpcD5HQox2w1x8x7Oaby/nTmkVFOq4jvzrc5/Q7ezVTTyaSZSm3NPanPeZvcK2gup0OhjznjHVQcU4/IIKdTpjto1lw9hGTmWNm/PfkS5fREf+xw5GFGn9MpiXcNcjI9jgTdk/M+w5NXs/XHDgceKt/kdErmXZOcFF4hezJPRp5UcL+q4khYIw+VSU5672GOneX+fYd0PKk8yw4+sYChh8okh8r0WV1/hHAAT6hs30FbyNGhx9cwJ008nYL2fvGLX5zC1uLvI1wCGxa6CY+Hbo/Hox7g4SrY9oW2sDY743OxBn0HNxxXbDCEC+/gZg3yP3i9Bgv+lPUH9QXhIvgH4+xUapd6/bAAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");

  const sc_text = "  ...we in onslaught return with ...coldiarus...    a nice game by agony design...    (c) by cp-verlag in 1995...   original supplied by fatman of dytec...     the game itself was raped by dodger of onslaught...    sorry that i had to remove the lame menu-system, but anyway the game should have my obligatory crackstyle...    wet shakes may go to ...f4cg...avt...scs&trc...dytec...hardcore...mo...empire... and maybe some more, but i'm out of brain...    sorry...        dodger off...                           ";
  const sc_len  = sc_text.length;

  let sc_off = 0;
  let sc_pos = 0;

  setTimeout(initialize, 100);
}