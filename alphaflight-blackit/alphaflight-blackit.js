/*
  Black It +3 Crack
  Alpha Flight (1995)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 16;
    buf1c.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 16;
    buf2c.imageSmoothingEnabled = false;

    canvx.fillStyle = "#000";
    canvx.fillRect(0,0,384,272);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", intro);

    player.play();
  }

  function intro() {
    let delta = context.currentTime - player.playing;

    if (delta > 20.7) {
      canvx.fillStyle = "#4d4d4d";
      canvx.fillRect(0,0,384,35);
      canvx.fillRect(0,227,384,45);

      canvx.fillStyle = "#000";

      func = draw;
    }

    player.run();
    requestAnimationFrame(func);
  }

  function draw() {
    //draw top logo
    if (lo_step[lo1_pos]) {
      canvx.drawImage(logo, 32,35);
    } else {
      canvx.fillRect(32,35,320,64);
    }

    lo1_pos = (++lo1_pos) & 255;

    //draw bottom logo
    if (lo_step[lo2_pos]) {
      canvx.drawImage(logo, 32,163);
    } else {
      canvx.fillRect(32,163,320,64);
    }

    lo2_pos = (++lo2_pos) & 255;

    /* first row scrolltext */
    sc1_off -= 3;

    if (sc1_off < 0) {
      sc1_off &= 7;

      buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);

      let cx = sc1_txt.charCodeAt(sc1_pos);
      if (cx >= 96) { cx -= 96; }
      cx *= 16;

      if (sc1_ctr++ == 1) {
        sc1_ctr = 0;
        cx += 8;

        if (++sc1_pos == sc1_len) {
          sc1_pos = 0;
        }
      }

      buf1x.drawImage(font, cx,0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf1c, (7 - sc1_off),0,304,16, 39,115,304,16);

    /* second row scrolltext */
    sc2_off -= 4;

    if (sc2_off < 0) {
      sc2_off = 4;

      buf2x.drawImage(buf2c, 8,0,312,16, 0,0,312,16);

      let cx = sc2_txt.charCodeAt(sc2_pos);
      if (cx >= 96) { cx -= 96; }
      cx *= 16;

      if (sc2_ctr++ == 1) {
        sc2_ctr = 0;
        cx += 8;

        if (++sc2_pos == sc2_len) {
          sc2_pos = 0;
        }
      }

      buf2x.drawImage(font, cx,0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf2c, (7 - sc2_off),0,304,16, 39,139,304,16);

    //draw sprites
    canvx.drawImage(sprite, 39,113);
    canvx.drawImage(sprite, 39,137);

    canvx.drawImage(sprite, 319,113);
    canvx.drawImage(sprite, 319,137);

    player.run();
    requestAnimationFrame(draw);
  }

  const font   = new Image();
  const logo   = new Image();
  const sprite = new Image();

  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAAD///+l2Z/dAAACe0lEQVRIx6WVQWrcQBBFvzF4NsbaemVdIcsshtFVcoyBdEpziKxzgDmDCXOS0CuvtWzIV3Wqeno0FpJtgqv40qdKXf1EC4RFSJFw0WDJc+dYIh+P5jcnCjyKx0PEWnC12gxA/AzAzwng5lABduk/AFp7WJuY41mNeUpPCIV4mOo5tZqtc8mclgCtVoAQ5u8YN6c82FzkslM7dHrtPn5F86tLOXXR1Wn3CsDrVew1p1cAXAL0Z4AD9tszSI0uNafMJjmA79LTn5xij+ZFSApcnhRbLAxE73VmE5XwBzxDWALAYjwfAZB2MwBhe4KCFpAyRXVz8n6X7OAG3KuNDAEuzwpA4vszg/VoEgLhDCBUQXoLAEuA4PMQfGKoU64AtxH3T6OOJChjstSsviAnYhTWHNlH1LfvUq83cQnQx9cAXSqyyGL91EnWHPMA+cEsmOL2hPu7twDq9srdyDadAUYDaHVzuAD0E0Cb1gFGm3cbHaBPmQ7QTwBl7faubAOXX69HcPng+IcKOsAu/f0t5p5wrHmNG64fAQ2gPUB8OINPMe9RAREKgKIIegZQBkWpa06qFASY71LWEKBhDeB5HUANoAd8eFBZAeATZdReXYTJT4sUd37NsRevwXw7lD6zTgDTZlnnAF512QRPgn6HuEr3spa7dwFoNVYANtH9xwAeEwA/ANiLA3TqIkwOkCju7JpqjTC/Oe2S+bQKwAqw384A/Nh8ogGwJ8Q0B/jiAGzURTQsAJHSFIAmWu3FagPM3x7uv5mP/RrAUAFCmAE0sQBEAxham2KaA2BLEJipunlNTBe/9hEeqqk/o+aAtRAsuo+fAlhG/R03eBdgKvwDBIAZyoX0IxoAAAAASUVORK5CYII=";
  logo.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAABABAMAAACZybMtAAAAIVBMVEW2trUAAABNTU3k7U7qdGyEhISwP7a2WRw3OcRoOAj///8/H7VZAAAEcElEQVRo3u1agXHbMAzkClxBK2gFruAVuIJX4ApaQVP2CRiASEim7OgaJy101OcBkHi/WzVNHOaduO3Ed/V9usAp7GXjTty+pW+KEBhcTDsRwnf03f4L/DcFRon2QMufG+zPGZynfChwudPlBEr+rMCS6ToQaHXXPxIIFXfocAIlf1YgpuVcjhy0uusfOggZi3uLLX/ewVzK4Vtsddc/dhA6nEDLn3cQ8w4FWr3t/xUOko7WxG0e/yqdEsjz9k3c1nGe7x87SLHnoBM4chBx7KCcZ/xA4BI17vQw2SQWOtDy00bgpo0GF+OZHhqWoH5fl/Pa/k7gEuFPomuJ9QaomCiDIno4jzbiLLDZx+NLTinXK2LViUDKWJ2uwnXQmsRxygGlE7jUMRT1TWR9QFUIhgMe+oRDYLsP80keBQSkhyMiyOqsYasHCpUj0wuMNBchzhniRn/0Qug5BLb7wGlezliliIOKVrd87aXmEIyX3kGYRWOx2DlGzRENPQ9Tt28q4DQ9s3Mt7td5gQbjoK3AuCRyBoudM3zkq2U9D1O3DwZhBjvIDjW4X2deLVTuHYwpVVewcCNbDDmP8ZoXHqZuX+Vl6xDNMixcL1iWr0FyiZuDCBXIo3H3DgIpj/vCPCrv9umIWCi8g/FRT1sHI3GSz30cjcC4sBL5G9si50F7jitN232x0ARVCJayYa1Ptd7mmYNqX71agfdAE1KgSbFFzoP2fOn3xRx4AgX1Vy6o9TbPHNT6OEwgTV7uEfdDBDje7eMJJcfpRhHBiAuiLtwhQLgTiLtzziHA8W6fTJD/83oHhXc4cJAeH+zEE4Sinrt9GQgHVGBgrpiNe8xFuRcYQiInniEEdNzty0BxkB5ezBWzcY8lC3ffzaBQHYETT3FxvNtHPOes3z4F5opJ+C4W5V7gyEFWMOBAczA4B4f4xEHkAwZeg+ag8FexFXijnyDRhItQBwh/EeUFImAfCeTz0zWYkwgU/io2An+Kg4EcuATNQeGv4JGDc51wDZqDwl9FL5DyKV2FIvDN/T/UwRnSL0NW+Na5oaKECVzRAbYSolHQ58d1cAxige+eN88rhJpA3bcCUwBn9PlBXc5PJBD8nfNWCiQ6B3FDuFfk8oM68ZDEwTfPwwqNg+C8+JUw+vygrlwc/Np5jYMIVQ5u6POGfp99jTjXfzyvEWjKQwBnXH3eo9XRb18jhv2+3jqIp409By0SOEBekc8barXrZwcP+6lP8g7tPBPY5FMUxDnr7POGEr4/Io7650ff6DwTeBQrn+Tyg/6r+lQgRVNABevhyAwOwjEJap+G9UsPounrzh2ddxsL5JPOCbT+gUDtOynwegdF3GUOuggcOAjBDp74jaX1I67oQ8xjgXgkDQX2/Ygr+sYC6ZjTDlo/Ytx3iYMzxVBg34+4om8sUOKswE18pe+GfJF1LFC6EUOBfvpX+mJIRddnCiypPNYvcPBvfxLEOzh9zOe0pA8C7YLAT/mclvbFAmGywvQxHySzvgiJsv4AiPVyE9I9zNIAAAAASUVORK5CYII=";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVAQMAAABmJ7xlAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAFJJREFUCNcdzLEJgDAQQNGfJlUGSOEQEUUcRxBTBWxTCoKVQ6W6mezOI8VrH6zg9MKXjSCJKJHxDt3kXnb3kBFUlcJhMpXFzCSGrlpy8tHU0/A/PogUDXVzDUwAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d", {alpha:false});

  const sc1_txt = "   ...alpha flight is back on track with yet another release for everyone who still believe in this little but great 8 bit machine! black it from cp verlag was supplied by marc and raped+fixed by skn! time is running by as fast as usually so we will be back any minute with another one... skinhead+marc are outta schnapz!                               ";
  const sc2_txt = "    greetings to: empire - demonix - ultimate hacker - avantgarde - f4cg - scs+trc - onslaught+hardcore - triad - flt - amnesia - motiv 8 and whoever else feels like being greeted!  call hic at: 510-689-8893 or escapade at: +49-5341-395697!              ";
  const sc1_len = sc1_txt.length;
  const sc2_len = sc2_txt.length;

  const lo_step = [1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

  let lo1_pos = 235;
  let lo2_pos = 107;

  let sc1_pos = 0;
  let sc1_off = 7;
  let sc1_ctr = 0;

  let sc2_pos = 0;
  let sc2_off = 0;
  let sc2_ctr = 0;

  let func = intro;

  let context = window.neoart.audioContext;

  setTimeout(initialize, 100);
}