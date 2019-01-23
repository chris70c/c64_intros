/*
  The Real Ghostbuster +3 Crack
  Seven Eleven (1989)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 128;
    buf1c.height = 8;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 160;
    buf3c.height = 8;
    buf3x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    canvx.fillStyle = c64[12];
    canvx.fillRect(0,132,384,1);

    buf3x.fillStyle = c64[0];
    buf3x.fillRect(0,0,160,8);

    printToBuffer("real ghostbuster");

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);

      // clear scroll text
      canvx.fillStyle = c64[0];
      canvx.fillRect(39,115,144,8);
      canvx.fillRect(201,115,144,8);
      canvx.fillRect(39,219,144,8);
      canvx.fillRect(201,219,144,8);

      lo_ctr = 4;
      lo_pos = 40;

      cancelAnimationFrame(afid);
      func = fade;
      requestAnimationFrame(func);
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", begin);

    player.play();
  }

  function printToBuffer(text) {
    for (let i = 0, len = text.length; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      buf1x.drawImage(font, cx,0,8,8, (i * 8),0,8,8);
    }
  }

  function title() {
    if (--fl_ctr == 0) {
      fl_ctr = 8;

      if (++fl_col > 5) {
        fl_col = 0;
      }
    }

    canvx.fillStyle = c64[fls[fl_col]];
    canvx.fillRect(48,91,128,8);
    canvx.drawImage(buf1c, 0,0,128,8, 48,91,128,8);

    canvx.fillRect(208,91,128,8);
    canvx.drawImage(buf1c, 0,0,128,8, 208,91,128,8);

    canvx.fillRect(48,195,128,8);
    canvx.drawImage(buf1c, 0,0,128,8, 48,195,128,8);

    canvx.fillRect(208,195,128,8);
    canvx.drawImage(buf1c, 0,0,128,8, 208,195,128,8);
  }

  function begin() {
    if (--lo_ctr == 0) {
      canvx.drawImage(logo, 0,lo_pos,160,40, 32,40,160,40);
      canvx.drawImage(logo, 0,lo_pos,160,40, 32,144,160,40);
      canvx.drawImage(logo, 0,lo_pos,160,40, 192,40,160,40);
      canvx.drawImage(logo, 0,lo_pos,160,40, 192,144,160,40);

      lo_pos -= 40;
      lo_ctr = lo_pos < 0 ? -1 : 4;
    }

    if (--lo_stp == 0) {
      func = draw;
    }

    player.run();
    afid = requestAnimationFrame(func);
  }

  function fade() {
    if (fo_ctr < 20) {
      // real ghostbuster text flash
      title();

    } else if (fo_ctr == 20) {
      // clear real ghostbuster text flash
      canvx.fillStyle = c64[0];
      canvx.fillRect(48,91,128,8);
      canvx.fillRect(208,91,128,8);
      canvx.fillRect(48,195,128,8);
      canvx.fillRect(208,195,128,8);

    } else if (fo_ctr == 40) {
      // clear bars
      canvx.fillRect(191,7,2,265);
      canvx.fillRect(0,132,384,1);

      // redraw logo
      canvx.drawImage(logo, 0,0,160,40, 32,40,160,40);
      canvx.drawImage(logo, 0,0,160,40, 32,144,160,40);
      canvx.drawImage(logo, 0,0,160,40, 192,40,160,40);
      canvx.drawImage(logo, 0,0,160,40, 192,144,160,40);

    } else if (fo_ctr > 40) {
      // fade logo
      if (--lo_ctr == 0) {
        canvx.drawImage(logo, 0,lo_pos,160,40, 32,40,160,40);
        canvx.drawImage(logo, 0,lo_pos,160,40, 32,144,160,40);
        canvx.drawImage(logo, 0,lo_pos,160,40, 192,40,160,40);
        canvx.drawImage(logo, 0,lo_pos,160,40, 192,144,160,40);

        lo_pos += 40;
        lo_ctr = 8;

        if (lo_pos > 120) {
          canvx.fillRect(32,40,160,40);
          canvx.fillRect(32,144,160,40);
          canvx.fillRect(192,40,160,40);
          canvx.fillRect(192,144,160,40);

          func = fadesid;
        }
      }
    }

    fo_ctr++;

    player.run();
    afid = requestAnimationFrame(func);
  }

  function fadesid() {
    volume -= 0.0078125;

    player.volume(volume);
    player.run();

    if (volume == 0.0) {
      player.stop();
    } else {
      afid = requestAnimationFrame(func);
    }
  }

  function draw() {
    // real ghostbuster text flash
    title();

    // scroll text
    if (--sc_off < 0) {
      sc_off = 7;

      buf3x.globalCompositeOperation = "copy";
      buf3x.drawImage(buf3c, 8,0,152,8, 0,0,152,8);
      buf3x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf3x.drawImage(font, cx,0,8,8, 152,0,8,8);
    }

    let pos = lf_idx;

    for (let i = 152; i >= 0; i -= 8) {
      buf2x.fillStyle = c64[fls[pos]];
      buf2x.fillRect(i,0,8,8);

      if (++pos > 29) {
        pos = 6;
      }
    }

    if (++lf_idx > 29) {
      lf_idx = 6;
    }

    pos = rt_idx;

    for (let i = 160; i < 320; i += 8) {
      buf2x.fillStyle = c64[fls[pos]];
      buf2x.fillRect(i,0,8,8);

      if (++pos > 29) {
        pos = 6;
      }
    }

    if (++rt_idx > 29) {
      rt_idx = 6;
    }

    pos = 7 - sc_off;

    canvx.drawImage(buf2c, pos + 8,0,144,8, 39,115,144,8);
    canvx.drawImage(buf2c, pos + 9,0,144,8, 39,219,144,8);
    canvx.drawImage(buf2c, pos + 160,0,144,8, 201,115,144,8);
    canvx.drawImage(buf2c, pos + 161,0,144,8, 201,219,144,8);

    canvx.drawImage(buf3c, pos + 8,0,144,8, 39,115,144,8);
    canvx.drawImage(buf3c, pos,0,144,8, 201,115,144,8);
    canvx.drawImage(buf3c, pos + 9,0,144,8, 39,219,144,8);
    canvx.drawImage(buf3c, pos + 1,0,144,8, 201,219,144,8);

    // draw vertical bar
    canvx.fillStyle = c64[12];
    canvx.fillRect(191,7,2,265);

    player.run();
    afid = requestAnimationFrame(func);
  }

  const logo = new Image();
  const font = new Image();

  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAAB4AgMAAAAIzBH8AAAADFBMVEUAAAA3OcRi2MxwfOaDWbvTAAAD9klEQVRYw9WVu9KcMAyF1aih4dXUnCaNX81NGhpejYaGhugCkc1lM8lMbvr5NeD99vgIrUf0V2OkKihln6d53gtEiPJZIMK0KMa8rZUZ675t07avK5ioeWYwl1kkFOmjJEzRNAk/CBL6qWBLMw5Ps5A6slwmzR6t4nxaNARs+UuC1IIhGIpwcHZQruA8acyOIMBN80hES8P58r7vCLC4x1Akqg25mHWgQBxcXXEPcOReccoySigGOF48ypQvBruDq4F8Qc2gIeOhdepWotJUs3gXTZEc2b47tUiunnZPcPYMzS8xl+hJKAbI+c4H/rq45pRdNlDvc9c0Ua0ihGK+KhpacBxJ2HZG0+VQt5C7RWE0HumtmGWWpstxoUdEQhHfuwxxkEluxbDtll1mLVltgtta9n3lbS3zau6weyPZbr6sVOZNuxug/2A3ZWdzFy+xLKZbZNdVQL4rbrvuVDZ1Z5ebsI5jxFLW3Bso0zoWLq4Cd8deu27Nsu+J8i4rL2y/QZAbFPNbBLyMkKxmwSiivqzq3XvCZhZM0m5NKLQy69ZYbevsuBCzQLqthYSdas41ABFW+DsnYMszYFSe61FXC415bKJVXgPyXDto2DjuJ4lo9qS+2myI/mkQPZzFzAw+ogcZQJf/nagCEapTreR31D9z+OeBKzOYhmEayO+of2apIqFIHyVB9DvnTMXhqQqpI89TfZgz9bDkCBz/kiC1YAiGIhysDsoVrJNGdQQBDg+KvkxECDA81gOsvaKqQdB6pAPkXnFypK2anouZEkFQbCBfQf1PhPJL17Khkchw2kignzMnWD0jwbvTqDcUUe9zJjxP2eXjbT6q2XV2OT0OF0zYWGSXo+r47MkiGo/5wu9g02W73uZMxfcuH9/gh33Zdssus+V+zpyHViqbOyjvIFRaFWvW7T/YQdnq7qa23aSrQO4/2LoM6s4uCY+mDpJmc0Am1pUwiPDo6r7aerQFJg5rnsX8RjFoUZBIdOPIbGYVE+EWE2IN8f4iz/XDnLF3LkE15/p1zlRAqf5c34rR7DWgO9e3gOc6qa8uZzycxcz/45yJIZB3+dzNGWJNiKe4uzyzkMiPJP/AnCE0TRfxTHSbM3nvCPgC0g3kQJBgwr2iI8APFRGgfAYBwZNHvoKJfFZMBHHPlvmOJtJ+6WnOJJI2+kj9jv3UY+EEESBT8syh2dcL+aAIfvOYezonuFf9jDcgLL8fsq7wtzlDAHeVvM0ZgvtK5GnOGMiHNTiIR0UYm9aycDZDHZ1lpMeHOeMDJFikx9c5k9ZC8WXOhKnIofg6Z/wTZMff5kxQzbl+nTMEOHuCr3PGPODzuUa+zy6/RyK/OGe+AcWhWxHbINQKAAAAAElFTkSuQmCC";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdgAAAAIAQMAAABgXnxBAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAOhJREFUGNONkbGKwzAQRHPkx72oyLkUdpEBw37HdTFThKv8ES72A1QtBPY2KhyOS3EjVmIWHjuSTvEP2fv2KW5nnkUIGaALzqmbAAvwcYBrMNrW3YPGsssqZLLq7hHPavo5ekrTzdVfQzUQZt15vcOpCsBOgaIoRcX8ooMgRQPmO9rBMtf2tBKtXto+ldKInCtQqFbY16RzRUFxA4adr1t6oLMpG81cHIY1WaRUActjzqoTDFxH2w62RO2ZLWzLPhpg8J6ZRZQQXmUBlVca7Rs2HJkt1nyrzipF2Ehjib9/5PFGj75vv5s/tX+JCvJdUiUAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const sc_text = "    -the real ghostbusters- from -activison- cracked, trained and repaired by mr.lee...     press the arrow to the top during the game for level cheat...   this is a 101 percent version, cause if you played through all 10 levels and start a new quest the game always load the end piccy and not the first level...   i have fixed this little bug !!!    the hunted ghosts are:  boys without brains (send soon the tapes !!!!), dominators, x-ray, elite (if walter loves nic, i must love you, norman !!!), usa from the states (hope you like this version, pulsar, light, cosmos, fairlight, oneway, byterapers, bros, unic, dcs, beyond force, fbi, druids, crazy, ikari...    use the cop-shocker from digital marketing, guy !!!             end...                          ";
  const sc_len  = sc_text.length;

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const fls = [11,12,15,1,15,12,15,15,15,3,3,3,14,14,14,6,6,6,14,14,14,3,3,3,15,15,15,15,15,15];

  let lo_ctr = 1;
  let lo_pos = 80;
  let lo_stp = 12;

  let fl_ctr = 3;
  let fl_col = 0;

  let sc_pos = 0;
  let sc_off = 1;
  let lf_idx = 20;
  let rt_idx = 18;

  let fo_ctr = 0;

  let volume = 1.0;

  let afid = 0;
  let func = begin;

  setTimeout(initialize, 100);
}