/*
  Flying G*P Demo
  Genesis Project (2013);
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
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 328;
    buf2c.heigth = 32;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 328;
    buf3c.heigth = 16;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 432;
    buf4c.heigth = 21;
    buf4x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,39,272);
    canvx.fillRect(343,0,41,272);

    canvx.fillStyle = c64[9];
    canvx.fillRect(39,0,304,272);

    canvx.fillStyle = c64[1];
    canvx.fillRect(39,219,304,53);

    buf2x.drawImage(combo, 196, 0,320,32, 0,0,320,32);
    buf3x.drawImage(combo, 196,32,320,16, 0,0,320,16);
    buf4x.drawImage(combo,  0,104,384,21, 0,0,384,21);

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);
      canvx.drawImage(combo, 196,48,320,7, 32,35,320,7);

      player.stop();
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    if (++sc_off > 7) {
      sc_off = 0;

      buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf1x.drawImage(font, (cx * 8),0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf1c, sc_off,0,304,16, 39,43,304,16);

    canvx.drawImage(combo, 0,0,196,104, 88,(81 + lo_sine[lo_pos]),196,104);

    if (--lo_ctr < 0) {
      lo_ctr = 4;

      if (++lo_pos == 14) {
        lo_pos = 0;
      }
    }

    if (cl1_ena) {
      cl1_off -= 1;

      if (cl1_off < 0) {
        cl1_off &= 7;

        buf2x.drawImage(buf2c, 0,0,320,32, 8,0,320,32);
        buf2x.drawImage(buf2c, 320,0,8,32, 0,0,8,32);
      }

      canvx.drawImage(buf2c, cl1_off,0,304,32, 39,187,304,32);
    }

    cl1_ena = !cl1_ena;

    cl2_off -= 1;

    if (cl2_off < 0) {
      cl2_off &= 7;

      buf3x.drawImage(buf3c, 0,0,320,16, 8,0,320,16);
      buf3x.drawImage(buf3c, 320,0,8,16, 0,0,8,16);
    }

    canvx.drawImage(buf3c, cl2_off,0,304,16, 39,219,304,16);

    cl3_off -= 2;

    if (cl3_off < 0) {
      cl3_off &= 47;

      buf4x.drawImage(buf4c, 0,0,384,21, 48,0,384,21);
      buf4x.drawImage(buf4c, 384,0,48,21, 0,0,48,21);
    }

    canvx.drawImage(buf4c, cl3_off,0,304,21, 39,237,304,21);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font  = new Image();
  const combo = new Image();

  font.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAQAgMAAAAdXy/bAAAADFBMVEVoOAjk7U62WRz///8SE7pZAAACe0lEQVRIx7RTQYqFMAyNBaG4mgHduyw5hUfoQu9T5iRhViGnnKS/tVXGgRmYhPDfjzV576nw10CC/48EzyHccKATAfj11zLoYb3/SeSHr2i6Elg9OLjEi5F/lOFYyEpYeGIOEyHxiomC4iQpFwtrIIXkkxfpCeAp2iVt0gRTs84wiU6AIOxsg867EbDhVpZYCTAmZglIQrlOApYi/SPAtozMONc5Ah7JkWhC2YKEdCOw7MeuVXKfx7jE41i20mlX9mOJs/4o1rsilFgqyL1hG7ZxG2trPvYx2t1Dt6URiIaFuywOiGASviYzhs/wwv1XgJdXyiVNmGora5aqvkyyM+W0FmRWdwf2bxxoPqnS97dTJJyoOKAzoxboP5uk1dRb5jPZr3EzAl+lUkGKwzAMVHFzC/iS/KMPCNhPyILzXz1JsFdDdkY267Jp2UMnSNgTS8zIXspyCPoLPwpA2d4F8B8DR4eAqY3/fwGoOtBP/AIKmFshRu3EhPbgkPORuXYBuQkoS/FYMwVM7mfdqTvf5QLwXcDUmbUZQmUp6L9zumsZL8bPnfW0KnU79VTkGi3YaUnBV+4bF7UiY6VRk4rYJi8RNOBv7Dv2jYaP3ViNCFUcyaThKOMKuPYJwPPX4i+f2sFgmG0CWPHd3/P1CiZy+dZZxo6+cJ3ZUdDpxjm2NzBAhwme4V8S/PoEzlRt+wZPjv/pIWgFuILT3/o/o7DYWYYKKi2hXhDJgrKXT8kRuwAc8guQ6AKS1UoBViM57jQqC8FtTcCs8hqPWQhmIqoLUPEeQWkF9BAAXLzgyOOJMO6aZu19378BmVsp8huEFlcM1WEQo9eT4yHlc/wAsiuNSGTcn/IAAAAASUVORK5CYII=";
  combo.src = "data:image/png;base64,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";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");
  const buf4x = buf4c.getContext("2d");

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "                                  zyron + redcrab present a brand new intro for genesis project called \"flying g*p\"...   code and music by zyron, all graphics by redcrab...     released on 2013-03-26       now over to the greetings list...   in our cracks we always limit it to the cracking groups but here you'll hopefully get the complete list, in a-z order: abnormal, albion, ancients, arise, arkanix labs, armageddon, arsenic, artline designs, ate bit, booze design, c64.com, camelot, cascade, censor design, chorus, cosine, covert bitops, crest, dekadence, desire, digital sounds system, extend, fairlight, glance, hack n trade, hitmen, hoaxers, hokuto force, ian coog, judas, lft, mahoney, maniacs of noise, mason, mayday!, multistyle labs, noice, nostalgia, nuance, offence, onslaught, oxsid planetary, oxyron, panda design, prosonix, senex, resource, rgcd, samar, scs+trc, shape, singular, software of sweden, the dreams, tlr, triad, trsi, underground domain inc, up rough, viruz, vision, warriors of the wasteland and wrath designs...                                           ";
  const sc_len  = sc_text.length;

  const lo_sine = [3,3,3,2,2,1,1,0,0,0,1,1,2,2];

  let sc_off = 0;
  let sc_pos = 0;

  let lo_ctr = 4;
  let lo_pos = 0;

  let cl1_ena = true;
  let cl1_off = 0;
  let cl2_off = 0;
  let cl3_off = 31;

  let afid = 0;

  setTimeout(initialize, 100);
}