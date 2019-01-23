/*
  Find It! Preview Crack
  Fantastic 4 Cracking Group (1999) [F4CG]
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 496;
    buf1c.height = 54;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 312;
    buf2c.heigth = 14;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 320;
    buf3c.height = 200;
    buf3x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf1x.fillStyle = c64[0];
    buf1x.fillRect(0,0,496,30);

    buf1x.drawImage(line, 64,0,1,14,   128,2,176,14);
    print("* presents *", 128,2);

    buf1x.drawImage(line, 65,0,1,14, 96,16,216,14);
    print("find it ! preview", 96,16);

    for (let x = 0; x < 320; x += 64) {
      buf1x.drawImage(line, 0,0,64,24, x,30,64,24);
    }

    lo_curr.fill(2);

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);

      canvx.drawImage(text, 64,35);

      player.stop();
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function print(text, x, y) {
    let l = text.length;
    let w = 0;

    for (let i = 0; i < l; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }

      switch (cx) {
        case 9: case 32: case 33: case 39: case 49:
          w = 8;
          break;
        default:
          w = 16;
          break;
      }

      cx *= 16;

      buf1x.drawImage(font, cx,0,w,14, x,y,w,14);
      x += w;
    }
  }

  function line1() {
    let x = 96;

    for (let i = 0; i < 40; i++) {
      buf1x.fillStyle = c64[ln_cols[ln1_pos1 + i]];
      buf1x.fillRect(x,0,8,1);
      x += 8;
    }

    if (--ln1_ctr1 == 0) {
      ln1_ctr1 = 2;

      if (ln1_pos1++ == 55) {
        ln1_ctr1 = 3;
        ln1_pos1 = 0;
      }
    }

    x = ln1_pos2 * 8;

    for (let i = 0; i < 10; i++) {
      buf1x.fillStyle = c64[ln_cols[96 + i]];
      buf1x.fillRect(x,0,8,1);

      x += 8;
      if (x == 496) { x = 0; }
    }

    buf3x.drawImage(buf1c, 96,0,320,1, 0,0,320,24);

    if (--ln1_ctr2 == 0) {
      if (ln1_pos2 == 52) {
        ln1_ctr2 = 6;
        ln1_pos2 = 0;
      } else {
        ln1_ctr2 = 5;
        ln1_pos2++;
      }
    }

    buf3x.drawImage(buf1c, 0,30,320,24, 0,0,320,24);
  }

  function line2() {
    let x = 96;

    for (let i = 0; i < 40; i++) {
      buf1x.fillStyle = c64[ln_cols[ln2_pos1 + i]];
      buf1x.fillRect(x,1,8,1);
      x += 8;
    }

    if (--ln2_ctr1 == 0) {
      ln2_ctr1 = 4;

      if (ln2_pos1++ == 183) {
        ln2_pos1 = 128;
      }
    }

    x = ln2_pos2 * 8;

    for (let i = 0; i < 10; i++) {
      buf1x.fillStyle = c64[ln_cols[224 + i]];
      buf1x.fillRect(x,1,8,1);

      x += 8;
      if (x == 496) { x = 0; }
    }

    buf3x.drawImage(buf1c, 96,1,320,1, 0,176,320,24);

    if (--ln2_ctr2 == 0) {
      ln2_ctr2 = 5;

      if (ln2_pos2 == 52) {
        ln2_pos2 = 0;
      } else {
        ln2_pos2++;
      }
    }

    buf3x.drawImage(buf1c, 0,30,320,24, 0,176,320,24);
  }

  function draw() {
    buf3x.fillStyle = c64[0];
    buf3x.fillRect(0,0,320,200);

    // draw top line
    line1();

    // draw logo
    for (let i = 0; i < 80; i++) {
      buf3x.drawImage(logo, 0,i,292,1, (10 + lo_curr[i]),(32 + i),292,1);
    }

    lo_curr.copyWithin(0,1);
    lo_curr[79] = lo_sine[lo_pos];

    if (++lo_pos == 1384) {
      lo_pos = 0;
    }

    // title line 1
    buf3x.drawImage(buf1c, tt_off[tt_pos1],2,304,14, 7,120,304,14);

    if (++tt_pos1 == 154) {
      tt_pos1 = 0;
    }

    // title line 2
    buf3x.drawImage(buf1c, tt_off[tt_pos2],16,304,14, 7,152,304,14);

    if (++tt_pos2 == 154) {
      tt_pos2 = 0;
    }

    // scroll text
    if (++sc_off == 8) {
      sc_off = 0;

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, 8,0,304,14, 0,0,304,14);
      buf2x.globalCompositeOperation = "source-over";

      if (++sc_ctr == ch_step) {
        sc_ctr = 0;

        let cx = sc_text.charCodeAt(sc_pos);
        if (cx >= 96) { cx -= 96; }
        sc_crx = cx * 16;

        switch (cx) {
          case 9: case 32: case 33: case 39: case 49:
            ch_step = 1;
            break;
          default:
            ch_step = 2;
        }

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }
      }

      buf2x.drawImage(line, 66,0,1,14, 304,0,8,14);
      buf2x.drawImage(font, sc_crx,0,8,14, 304,0,8,14);
      sc_crx += 8;
    }

    buf3x.drawImage(buf2c, sc_off,0,304,14, 7,136,304,14);

    // draw bottom line
    line2();

    // update screen
    canvx.drawImage(buf3c, 32,35);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font = new Image();
  const logo = new Image();
  const line = new Image();
  const text = new Image();

  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAA6VJREFUSMfFlbHO0zAQx6kYEFNnpjwAT8CUkZGJETHwCEwVIGdAYiNCDAgJYSQGEAx9AAbDABESwktRxcBnPlXCA0MbLJQeSfznziFtP3gALrrWdZzLz7+z1FNAVEXeTYu8mBaTbqrJA6S1hukNdTnf49zwPU3jVUyKDNhOogKHx6oCKruZAjWQdziMLvd4febrFHUxlSrbbJthF1/PJACt65UuNTQX+AOQa8ir6lKXkhWv2gOAHDjaLt8D3NfVMwbgdYx1EHXpoYP1eKPByyhYXr0LG04Jo849aS8A/g/AXaXBbybvtZfUOwAbbGBAcNCwF4/gGSB/fJGn/gHgx2Xa45zUx4q0DYkeHE5TAigyy5QFq/5wvpjIA7ehcef4Dr9OB8kE0PJFq4p3EAYDm2mTALwl/U49vsH10QE59pFboQubaTdLAOVmqhNA+rAMkBpuBUAW2H4wcI/H99/f3wHsW5B6WBlw9FH5BCA1Ory7CSABRF59AqDCqqYEkLNPAgQVMh8SgGPFjhwcdOuo4anPPP788DO/0KXcZEgGHBuA2maDgaiknU06TIQfV0aAX2YEEOwGjEwVFVmRRcUtpE516u3lbfbiKeQQBpd2nwj1HwOPePzowqP9saui4nv945kNUa0wGigmo4GQxYsjQMeIAGcC8LJbKk6jclUENzEBFC+32adJvCoA1tHfBo6Uw9HsaKZ7FyQRBgNfLvCY740GBKBJAN8uxesjwCY7AOgbOIYFIWiGN7SdgOP1ZeD56QgG8I1hAEMGhg0YWgNkciMzFzSZIAmKEAOvHhoerUcDqQXr1IKPlzDbGxhb0EFzvTXD8sWtjHCE4QwIILdTANay+5SwyYDjrqSZh65xXhItlG1tu3zv6NCAx2hAZ7H99wx0cM1ggK/WtGADaKUFQQBsMmAbEyxMEAOWxIBpjU0G3tvWlB9umNL1Eba3zfyYDYgpcFBUDYZghXC3RoAo32r4ZVvxZdiA66WKCyYBJFoHAXj90nnfOy/78smA7DkZOPbNIvcPFrmw+5Zd1ScN4CAGA1H07wAIXgxwRfQmGVh7HmP/JANw38v2uynFQH0sBr7PTUgG6nZu0JZPsFxG1D9rZ+ikAXB4DNEsDwH4kyHY91wMrOdolxwRP+33Od8ZoZUAtIu8v7rIFxOH7qwY6JUj/kWOeIT+2tHkl4HqXnYGvRhYnPwzGosZALs/o26wwLUaLCY/FfpfRqpE0++9JYD/HP8d4Dd9/uh5xvs6FQAAAABJRU5ErkJggg==";
  logo.src = "data:image/png;base64,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";
  line.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEMAAAAYBAMAAABTrV10AAAAMFBMVEUAAAAAAAD///+2trWm+p7k7U5NTU2EhIRwfOZi2Mw3OcSwP7bqdGyvKim2WRxoOAgSeSLyAAAAAXRSTlMAQObYZgAAAJlJREFUKM9jEAQDBiAQxAqWfYBIMMAJTCUXYJI41aSDlQjAuIzYlDxgQJYRwKJkO1AJSAKPMZsPMIDF8RjTDFQCFMZnTKsBA0gUnzFTCSuZEsAAFMRrk0sAA1AMrzFOChghiq5FCVMJusVYlKA7n4GBHCVoQYlNCVqEYFOCGq1YlaAmDlxKEEkMpxJEQsWlBJHccShBZBoYCwB9Iz5upHbkYwAAAABJRU5ErkJggg==";
  text.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAHAQMAAADdzgEpAAAABlBMVEUAAABwfOY7daAoAAAAiUlEQVQI1yWPsQkDUQxDVV2VATRGBvAwhgM1+aRMXBhn9Jz9r5TeQyAApkqDZbEqkEIV7OTUbCzwQwmSG31BwuHQ17oQGxtYI/hk1wgPh/+0i8b/EbKFjGIIaWDAXmUVycad3wM87gURT8dx6pAHGgsUV4M1whrBHToldYL2C8rmizgveL/QLoALx6E80udN93oAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "    we can't stop acting like this ! * f 4 c g * presents you find it ! preview...supplied by b.a. and crunched down a bit by mr.alpha ! greetings to # scs+trc # chromance # onslaught # hitmen # laxity # nostalgia # remember and happy birthday to myself. /mr.alpha 24.01.99.                                               ";
  const sc_len  = sc_text.length;

  const ln_cols = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,13,3,14,14,4,11,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,9,2,8,10,10,15,7,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,13,13,5,5,8,8,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,11,12,12,15,15,7,7,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  const lo_sine = [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,6,7,6,7,6,7,6,7,5,7,5,7,5,7,5,7,4,7,4,7,4,7,4,7,3,7,3,7,3,7,3,7,2,7,2,7,2,7,2,7,1,7,1,7,1,7,1,7,0,7,0,7,0,7,0,7,0,6,0,6,0,6,0,6,0,5,0,5,0,5,0,5,0,4,0,4,0,4,0,4,0,3,0,3,0,3,0,3,0,2,0,2,0,2,0,2,0,1,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,2,0,2,0,2,0,2,0,3,0,3,0,3,0,3,0,4,0,4,0,4,0,4,0,5,0,5,0,5,0,5,0,6,0,6,0,6,0,6,0,7,0,7,0,7,0,7,1,7,1,7,1,7,1,7,2,7,2,7,2,7,2,7,3,7,3,7,3,7,3,7,4,7,4,7,4,7,4,7,5,7,5,7,5,7,5,7,6,7,6,7,6,7,6,7,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,5,5,4,3,2,2,1,1,1,0,0,0,0,0,1,1,1,2,2,3,4,5,5,6,6,6,7,7,7,7,7,6,6,6,5,5,4,3,2,2,1,1,1,0,0,0,0,0,1,1,1,2,2,3,4,5,5,6,6,6,7,7,7,7,7,6,6,6,5,5,4,3,2,2,1,1,1,0,0,0,0,0,1,1,1,2,2,3,4,5,5,6,6,6,7,7,7,7,7,6,6,6,5,5,4,3,2,2,1,1,1,0,0,0,0,0,1,1,1,2,2,3,4,5,5,6,6,6,7,7,7,7,7,6,6,6,5,5,4,3,5,2,5,2,6,1,6,1,6,1,7,0,7,0,7,0,7,0,7,0,6,1,6,1,6,1,5,2,5,2,4,3,3,4,2,5,2,5,1,6,1,6,1,6,0,7,0,7,0,7,0,7,0,7,1,6,1,6,1,6,2,5,2,5,3,4,4,3,5,2,5,2,6,1,6,1,6,1,7,0,7,0,7,0,7,0,7,0,6,1,6,1,6,1,5,2,5,2,4,3,3,4,2,5,2,5,1,6,1,6,1,6,0,7,0,7,0,7,0,7,0,7,1,6,1,6,1,6,2,5,2,5,3,4,4,3,5,2,5,2,6,1,6,1,6,1,6,0,7,0,7,0,7,0,7,0,6,1,6,1,6,1,5,2,5,2,4,3,3,4,3,5,5,2,2,6,6,1,1,7,7,0,0,6,6,1,1,5,5,2,2,4,4,3,3,3,3,4,4,2,2,5,5,1,1,6,6,0,0,7,7,1,1,6,6,2,2,5,5,3,3,4,4,4,4,3,3,5,5,2,2,6,6,1,1,7,7,0,0,6,6,1,1,5,5,2,2,4,4,3,3,3,3,4,4,2,2,5,5,1,1,6,6,0,0,7,7,1,1,6,6,2,2,5,5,3,3,4,4,4,4,3,3,5,5,2,2,6,6,1,1,7,7,0,0,6,6,1,1,5,5,2,2,4,4,3,3,3,3,4,4,2,2,5,5,1,1,6,6,0,0,7,7,1,1,6,6,2,2,5,5,3,3,4,4,4,4,3,3,5,5,2,2,6,6,1,1,7,7,0,0,6,6,1,1,5,5,2,2,4,4,3,3,3,3,4,4,2,2,5,5,1,1,6,6,0,0,7,7,1,1,6,6,2,2,5,5,3,3,4,4,4,4,3,3,5,5,2,2,6,6,1,1,7,7,0,0,6,6,1,1,5,5,2,2,4,4,3,3,3,3,4,4,2,2,5,5,1,1,6,6,0,0,7,7,1,1,6,6,2,2,5,5,3,3,4,4,4,4,3,3,5,5,2,2,6,6,1,1,7,7,0,0,6,6,1,1,5,5,2,2,4,4,3,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,2,1,0,1,2,3,4,5,6,7,6,5,4,3,3,4,2,5,1,6,0,7,1,6,2,5,3,4,4,3,5,2,6,1,7,0,6,1,5,2,4,3,3,4,2,5,1,6,0,7,1,6,2,5,3,4,4,3,5,2,6,1,7,0,6,1,5,2,4,3,3,4,2,5,1,6,0,7,1,6,2,5,3,4,4,3,5,2,6,1,7,0,6,1,5,2,4,3,3,4,2,5,1,6,0,7,1,6,2,5,3,3,3,3,2,2,2,2,1,1,1,1,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,6,7,7,7,7,6,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1,0,0,0,0,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2];
  const lo_curr = new Uint8Array(80);

  const tt_off = [119,119,119,119,119,118,118,118,117,117,116,115,114,113,112,111,109,107,105,103,101,99,97,95,93,91,89,87,85,83,81,79,77,75,73,71,69,67,65,63,61,59,57,55,53,51,49,47,45,43,41,39,37,35,33,31,29,27,25,23,21,19,17,15,13,11,9,7,6,5,4,3,2,2,1,1,1,0,0,0,0,0,1,1,1,2,2,3,4,5,6,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99,101,103,105,107,109,111,112,113,114,115,116,117,117,118,118,118];

  let ln1_ctr1 = 2;
  let ln1_pos1 = 0;
  let ln1_ctr2 = 6;
  let ln1_pos2 = 0;

  let lo_pos = 0;

  let tt_pos1 = 0;
  let tt_pos2 = 54;

  let sc_off = 7;
  let sc_ctr = 1;
  let sc_pos = 0;
  let sc_crx = 0;

  let ch_step = 2;

  let ln2_ctr1 = 6;
  let ln2_pos1 = 128;
  let ln2_ctr2 = 3;
  let ln2_pos2 = 36;

  let afid = 0;

  setTimeout(initialize, 100);
}