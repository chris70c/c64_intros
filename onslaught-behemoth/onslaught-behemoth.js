/*
  Behemoth Preview Crack
  Onslaught (2015)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 8;
    buf1c.imageSmoothingEnabled = false;

    buf2c.width  = 640;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 312;
    buf3c.height = 88;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 312;
    buf4c.height = 88;
    buf4x.imageSmoothingEnabled = false;

    buf5c.width  = 336;
    buf5c.height = 69;
    buf5x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf1x.fillStyle = c64[0];
    buf1x.fillRect(0,0,304,8);

    buf3x.drawImage(bits, 0,0);
    buf3x.globalCompositeOperation = "source-atop";

    buf4x.drawImage(bits, 0,0);
    buf4x.globalCompositeOperation = "source-atop";

    spr_c.fill(0);

    printToBuffer("       . .. ...  onslaught presents behemoth preview !!!  ... ... .. .          ");

    p1e00.fill(0);
    p4400.fill(0);
    p4600.fill(0);
    p4800.fill(0);

    calc();
    doPlasma(440);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", begin);

    player.play();
  }

  function printToBuffer(text) {
    for (let i = 0, len = text.length; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      buf2x.drawImage(font, cx,0,8,8, (i * 8),0,8,8);
    }
  }

  function calc() {
    let carry = 0;

    let v02 = 0x1d;
    let vfb = 0xff;
    let vfc = 0x01;
    let vfd = 0x00;

    let p1 = 0;
    let p2 = 0;

    const adc = (a, b) => {
      let c = (a + b + carry) >>> 0;
      carry = (c > 255) ? 1 : 0;
      return c & 255;
    };

    const sbc = (a, b) => {
      let c = (a - b - carry) >>> 0;
      carry = (c < 256) ? 0 : 1;
      return c & 255;
    };

    for (let i = 0; i < 11; i++) {
      carry = 0;

      vfb = sbc(vfb, v02);
      vfc = sbc(vfc, 0);
      vfd = 0;

      let x = 0;
      let y = 0;

      do {
        plasma[p1 + x] = t6000[p2 + y];
        carry = 0;

        vfd = adc(vfd, vfb);

        y = adc(y, 0);
        y = adc(y, vfc);
      } while (++x < 0x28);

      p1 += 40;
      p2 += 80;
    }

    carry = 1;

    for (let x = 0; x < 0x50; x++) {
      p1 = 0;

      for (let i = 0; i < 11; i++) {
        let a = t4800[p4800[i] + x];

        a = adc(a, t4400[p4400[i] + x]);
        a = adc(a, t4600[p4600[i] + x]);
        a = adc(a, t1e00[p1e00[i] + x]);

        t6000[p1 + x] = t5e00[a];

        p1 += 0x50;
      }
    }

    carry = 0;
    p2 = adc(v5c9c, 0xff);
    v5c9c = p2;

    for (let i = 0; i < 11; i++) {
      p4800[i] = p2;
      p2 = adc(p2, 0x02);
    }

    carry = 0;
    p2 = adc(v5c9d, 0xfe);
    v5c9d = p2;

    for (let i = 0; i < 11; i++) {
      p4600[i] = p2;
      p2 = adc(p2, 0x02);
    }

    carry = 0;
    p2 = adc(v5c9e, 0xff);
    v5c9e = p2;

    for (let i = 0; i < 11; i++) {
      p4400[i] = p2;
      p2 = adc(p2, 0x01);
    }

    carry = 0;
    p2 = adc(v5c9f, 0x01);
    v5c9f = p2;

    for (let i = 0; i < 11; i++) {
      p1e00[i] = p2;
      p2 = adc(p2, 0xfe);
    }
  }

  function doPlasma(block = 88) {
    let len = pl_pos + block;

    for (let i = pl_pos; i < len; i++) {
      pl_buf.fillStyle = c64[plasma[i]];
      pl_buf.fillRect(pl_cx,pl_cy,8,8);
      pl_cx += 8;

      if (pl_cx > 312) {
        pl_cx = 0;
        pl_cy += 8;
      }
    }

    if (--pl_ctr == 0) {
      pl_ctr = 5;

      let buf = pl_buf;

      pl_buf = pl_rdy;
      pl_rdy = buf;

      pl_pos = 0;
      pl_cx = 0;
      pl_cy = 0;

      calc();
    } else {
      pl_pos += block;
    }

    if (pl_ctr & 1) {
      canvx.drawImage(pl_rdy.canvas, 0,0,304,80, 39,151,304,80);
    } else {
      canvx.drawImage(pl_rdy.canvas, 4,4,304,80, 39,151,304,80);
    }
  }

  function scroll() {
    buf5x.clearRect(0,0,336,69);

    let p = 0;

    for (let i = 0; i < 14; i++) {
      let x = spr_x[i] + sc_off;
      let y = spr_y[i];

      buf5x.drawImage(font, spr_c[p],0,8,8, x,(y + spr_o[p++]),8,8);
      x += 8;

      buf5x.drawImage(font, spr_c[p],0,8,8, x,(y + spr_o[p++]),8,8);
      x += 8;

      buf5x.drawImage(font, spr_c[p],0,8,8, x,(y + spr_o[p++]),8,8);
    }

    if (--sc_off < 0) {
      sc_off = 7;

      let v = spr_c.shift();
      spr_c.push(v);

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }
      spr_c[sc_idx] = cx * 8;

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }
    } else {
      for (let i = 0; i < 14; i++) {
        let x = spr_x[i];
        x += 8;

        if (x == 336) {
          x = 0;
        }

        spr_x[i] = x;
      }

      let v = spr_c.shift();
      spr_c.push(v);

      if (--sc_idx < 0) {
        sc_idx = 41;
      }
    }

    canvx.drawImage(buf5c, 24,0,304,69, 39,160,304,69);
  }

  function begin() {
    canvx.fillRect(39,125,320,21);

    lo_ena = false;

    if (--lo_ct1 < 0) {
      lo_ena = true;

      if (--lo_ct2 < 0) {
        func = draw;
      } else {
        lo_ct1 = lo_ct2;
      }
    }

    if (lo_ena) {
      canvx.drawImage(logo, 0,0,192,21, (20 + data1[lo_pos]),125,192,21);
      lo_pos = (lo_pos - 3) & 255;
    }

    if (tt_ctr < 20) {
      buf1x.fillStyle = c64[rast1[tt_ctr]];
      buf1x.fillRect((tt_ctr * 8),0,8,8);
      buf1x.fillRect(((39 - tt_ctr) * 8),0,8,8);

      tt_ctr++;
    }

    main();
    player.run();
    requestAnimationFrame(func);
  }

  function main() {
    if (--ba_ctr == 0) {
      canvx.drawImage(back, 0,ba_pos,192,88, 96,35,192,88);

      ba_ctr = 4;
      ba_pos += 88;

      if (ba_pos == 264) {
        ba_pos = 0;
      }
    }

    let v = data1[tt_pos];
    let x = (v << 1) & 7;
    let p = (v >> 2) << 3;

    tt_pos = (tt_pos + 2) & 255;

    buf2x.globalCompositeOperation = "source-atop";
    buf2x.drawImage(buf1c, x,0,304,8, (x + p),0,304,8);
    buf2x.globalCompositeOperation = "source-over";

    canvx.drawImage(buf2c, (x + p),0,304,8, 39,131,304,8);

    canvx.fillRect(39,160,304,69);
    doPlasma();
    scroll();
  }

  function draw() {
    canvx.fillRect(39,125,320,21);

    canvx.drawImage(logo, 0,0,192,21, (20 + data1[lo_pos]),125,192,21);
    lo_pos = (lo_pos - 3) & 255;

    main();
    player.run();
    requestAnimationFrame(draw);
  }

  const bits = new Image();
  const back = new Image();
  const font = new Image();
  const logo = new Image();

  bits.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAABYAQMAAABbMnnHAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAADBJREFUSMftziEBADAMwLB7un8HEzUwAxWQ4oK8aeXvt+rHx8fHx8fHx8fHx8fHdy1xdq2nkZFMMwAAAABJRU5ErkJggg==";
  back.src = "data:image/png;base64,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";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAATtJREFUKM+VkTFqAzEQRQcSBhciLKlUCAeW4MYphB0UYcZOkTYnCClEiu9GbAw2uymW9YVzAHfOCK8PkIeaz0hPMwwRJWJylKypKrpQ0X+Qk3twIZ6IFr52Lrog/nZSPy5ESLQ+AfQSGz9etyI8yKDVEeQQQspZnuC7EHJYQ2Z5D8CT0botAhhrYTXdQPNdgmI1F6bQeAA+Nu3uuAQQ/QG5a2GugnP51xspD7iJzNM+GYBGggr6fgM7+9nNi8C7HfLcIY4CAlEkb84DDWRaaxy4t7KhEShfz4wJ59Qt0TaeE/JxtUkXwYS0g60KpPSsg3g+Miz4OsK2bZrGAz4j7Lv8+7JDyLH7ZhRBAeVYW4auPGwCQwWgUbD+jKtYyXsf31x9HxN7cbGqaylbuI7wSmULnmySYRCWsguNyh/NplrxaTDCIgAAAABJRU5ErkJggg==";
  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAAAVAgMAAACI38xkAAAACVBMVEUAAABNTU2vKikGRaJzAAABuUlEQVQoz22STY6lMAyEHZRII1aMhPez5hRG6rd3S/F9WM4xWD5xyq5y4K3aQP74YhdF5BMNTxWTX6KwWXAxprGmQdwbOg6ewHx58FzerkOiS8Ed7uG51ZDSCrgIW9RF7cbn65pFE4/QrsaUgMpuEhgxBfFAdCafr0PxAjqsdXWKjRDlbdEtHCl0v/HrFOAgHbPmA+ewl52stcQt9sRPeXCqH9rbN5R5acCthCXeZcU1Ad/OgBgrvVYpD94cwksIbn6tucSNz6e+vpq1CJDE1YAB72Oz2qp9SXz7L9iipTeTiLAHN3GY9Z0S8isXlKGPMs1vlcji0OnwV6tCGnA0Gk4cWRJ/iyS+cyHoTC1R1VkGYohrQPuDHxO0g+RM6XvLbE2Im6wwsgtxtcz+Zz5XML0myezASZaeJ4YVn+zTdvyD71LgFr2IL2nEozhwHh7g9sFle0/XsWJisEGd5ItuE+eCJd4k8Txib2ESk0BPnIe4tPtPRdzZS+JyXeccQVzR/cUu7cD3EBYY/6I8RmZkLR/fjlbZWuzqWdOqJ6AfvIxZy/Er1+lVvkjl9cE/0UfnldKTHx1rDPwlP7byiGqKvVVMAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");
  const buf4x = buf4c.getContext("2d");
  const buf5c = document.createElement("canvas");
  const buf5x = buf5c.getContext("2d");

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = " here we go with behemoth preview from the walking circles    packed with menu selector by slator           original supply by jazzcat               this armalyte clone was made for a budget label such as codermasters but did not make it due to the crew moving to the amiga                   greetings to laxity  triad  nostalgia  atlantis  f4cg  mayday  hokuto force  gp  excess  alpha flight  avatar                we who do not deny the animal of our nature               we who yearn to preserve our liberation               we who face darkness in our hearts with a solemn fire               we who aspire to the truth and pursue its strength               are we not the undisputed prodigy of warfare               fearing all the mediocrity that they possess               should we not hunt the bastards down with our might               reinforce and claim the throne that is rightfully ours               consider the god we could be without the grace                 once and for all                                     ";
  const sc_len  = sc_text.length;

  const spr_x = [0,24,48,72,96,120,144,168,192,216,240,264,288,312];
  const spr_y = [48,43,34,23,12,4,0,0,2,9,19,30,40,47];
  const spr_o = [2,1,0,4,2,0,4,3,0,7,3,0,7,3,0,5,2,0,2,1,0,0,0,1,0,2,4,0,3,7,0,4,7,0,5,7,0,3,5,0,1,2];

  const spr_c = new Array(42);

  const data1 = [107,107,107,107,107,107,107,107,107,107,107,107,107,106,106,105,105,105,104,103,103,102,102,101,100,99,99,98,97,96,95,95,94,93,92,91,90,89,89,88,87,86,85,85,84,83,82,82,81,80,80,79,79,78,78,77,77,77,76,76,76,76,76,76,76,76,76,76,76,76,76,77,77,77,78,78,79,79,80,80,81,82,82,83,84,85,85,86,87,88,89,89,90,91,92,93,94,95,95,96,97,98,99,99,100,101,102,102,103,103,104,105,105,105,106,106,107,107,107,107,107,107,107,107,107,107,107,107,107,106,106,105,105,104,104,103,102,102,101,100,99,98,97,96,95,94,93,92,91,89,88,87,86,84,83,82,81,79,78,77,75,74,73,71,70,69,68,66,65,64,63,62,61,60,59,58,57,56,55,54,54,53,52,52,51,51,51,50,50,50,50,50,50,50,50,50,50,50,51,51,51,52,52,53,54,54,55,56,57,58,59,60,61,62,63,64,65,66,68,69,70,71,73,74,75,77,78,79,81,82,83,84,86,87,88,89,91,92,93,94,95,96,97,98,99,100,101,102,102,103,104,104,105,105,106,106];
  const rast1 = [6,6,4,14,3,13,13,1,1,1,1,7,7,10,10,8,8,2,2,9];

  const t1e00 = [15,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,12,12,12,12,12,12,12,11,11,11,11,11,11,11,10,10,10,10,10,10,9,9,9,9,9,8,8,8,8,8,8,7,7,7,7,7,6,6,6,6,6,6,5,5,5,5,5,4,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,5,6,6,6,6,6,6,7,7,7,7,7,8,8,8,8,8,8,9,9,9,9,9,10,10,10,10,10,10,11,11,11,11,11,11,11,12,12,12,12,12,12,12,13,13,13,13,13,13,13,13,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,15,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,13,13,13,13,13,13,13,13,13,12,12,12,12,12,12,12,11,11,11,11,11,11,11,10,10,10,10,10,10,9,9,9,9,9,8,8,8,8,8,8,7,7,7,7,7,6,6,6,6,6,6,5,5,5,5,5,4,4];
  const t4400 = [128,112,112,112,112,96,96,96,80,80,64,64,48,48,48,32,32,16,16,0,0,0,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,0,0,0,0,0,16,16,16,16,16,16,16,16,0,0,0,240,240,224,208,208,192,176,160,144,128,112,96,80,64,48,32,16,0,240,224,208,192,176,176,160,160,144,144,144,144,144,144,160,160,176,192,208,224,240,0,16,48,64,80,112,128,160,176,208,224,240,16,32,48,64,80,80,96,96,96,96,96,96,96,80,64,48,32,16,240,224,192,160,144,112,240,112,144,160,192,224,240,16,32,48,64,80,96,96,96,96,96,96,96,80,80,64,48,32,16,240,224,208,176,160,128,112,80,64,48,16,0,240,224,208,192,176,160,160,144,144,144,144,144,144,160,160,176,176,192,208,224,240,0,16,32,48,64,80,96,112,128,144,160,176,192,208,208,224,240,240,0,0,0,16,16,16,16,16,16,16,16,0,0,0,0,0,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,0,0,0,16,16,32,32,48,48,48,64,64,80,80,96,96,96,112,112,112,112,128,112,112,112,112,96,96,96,80,80,64,64,48,48,48,32,32,16,16,0,0,0,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,0,0,0,0,0,16,16,16,16,16,16,16,16,0,0,0,240,240,224,208,208,192,176,160,144,128,112,96,80,64,48,32,16,0,240,224,208,192,176,176,160,160,144];
  const t4600 = [0,0,0,0,0,1,1,1,1,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,10,10,11,11,11,12,12,12,12,13,13,13,13,13,13,13,13,12,12,12,12,11,11,10,10,9,9,8,7,7,6,6,5,4,4,3,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,4,4,5,6,6,6,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,3,4,4,5,6,6,7,7,8,9,9,10,10,11,11,12,12,12,12,13,13,13,13,13,13,13,13,12,12,12,12,11,11,11,10,10,9,9,8,8,8,7,7,7,6,6,6,5,5,5,5,5,5,4,4,4,4,4,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,5,5,5,5,5,4,4,4,4,3,3,3,3,2,2,2,1,1,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,5,5,5,5,5,6,6,5,5,5,5,5,5,5,5,5,5,5,5,5,4,4,4,4,4,4,4,5,5,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,10,10,11,11,11,12,12,12,12,13,13,13];
  const t4800 = [240,240,240,240,240,240,240,240,240,240,224,224,224,224,224,208,208,208,192,192,192,192,176,176,160,160,160,144,144,144,128,128,112,112,112,96,96,96,80,80,64,64,64,48,48,48,32,32,32,32,16,16,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,16,16,32,32,32,32,48,48,48,64,64,64,80,80,96,96,96,112,112,112,128,128,144,144,144,160,160,160,176,176,192,192,192,192,208,208,208,224,224,224,224,224,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,224,224,224,224,224,208,208,208,192,192,192,192,176,176,160,160,160,144,144,144,128,128,112,112,112,96,96,96,80,80,64,64,64,48,48,48,32,32,32,32,16,16,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,16,16,32,32,32,32,48,48,48,64,64,64,80,80,96,96,96,112,112,112,128,128,144,144,144,160,160,160,176,176,192,192,192,192,208,208,208,224,224,224,224,224,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,240,224,224,224,224,224,208,208,208,192,192,192,192,176,176,160,160,160,144,144,144,128,128,112,112,112,96,96,96,80,80,64,64,64,48,48,48,32,32,32,32,16,16,16,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,16,16,32];
  const t5e00 = [2,2,9,9,2,2,8,8,10,10,7,7,10,10,8,8,8,8,2,2,9,9,2,2,8,8,10,10,7,7,10,10,10,10,8,8,2,2,9,9,2,2,8,8,10,10,7,7,7,7,10,10,8,8,2,2,9,9,2,2,8,8,10,10,10,10,7,7,10,10,8,8,2,2,9,9,2,2,8,8,8,8,10,10,7,7,10,10,8,8,2,2,9,9,2,2,2,2,8,8,10,10,7,7,10,10,8,8,2,2,9,9,9,9,2,2,8,8,10,10,7,7,10,10,8,8,2,2,9,9,2,2,8,8,10,10,7,7,10,10,8,8,2,2,2,2,8,8,10,10,7,7,10,10,8,8,2,2,9,9,8,8,10,10,7,7,10,10,8,8,2,2,9,9,2,2,10,10,7,7,10,10,8,8,2,2,9,9,2,2,8,8,7,7,10,10,8,8,2,2,9,9,2,2,8,8,10,10,10,10,8,8,2,2,9,9,2,2,8,8,10,10,7,7,8,8,2,2,9,9,2,2,8,8,10,10,7,7,10,10,2,2,9,9,2,2,8,8,10,10,7,7,10,10,8,8];
  const t6000 = [8,2,8,10,10,8,2,2,2,9,9,9,9,9,9,2,8,10,7,2,2,9,2,2,9,9,8,10,8,7,7,10,8,2,9,2,2,2,8,8,8,2,2,2,9,2,2,2,2,8,10,10,7,8,7,10,8,2,2,8,8,10,8,2,9,2,2,8,10,10,10,10,8,10,10,10,10,8,10,10,8,10,7,8,2,2,9,9,9,9,9,9,9,2,8,10,7,8,2,9,8,8,2,9,8,2,8,7,10,10,8,2,9,9,2,2,8,8,2,2,2,2,2,2,8,2,2,8,8,10,10,10,7,8,2,9,2,8,10,10,8,8,9,2,9,2,8,8,10,8,8,10,10,10,8,8,8,8,8,2,10,7,8,2,9,9,9,9,9,9,9,9,2,8,10,10,8,2,9,8,8,2,9,9,2,8,8,10,8,8,2,2,9,2,2,8,2,2,2,2,9,2,8,2,2,9,2,8,7,7,10,10,8,2,9,2,8,10,10,10,8,2,9,9,2,8,8,8,2,2,10,10,8,8,8,2,8,8,2,9,10,8,9,9,9,9,9,9,9,9,2,2,8,8,7,8,2,9,2,10,2,8,9,2,9,8,8,8,8,8,2,9,2,2,2,2,2,2,9,9,8,8,2,2,9,2,10,10,7,7,10,8,2,9,8,10,7,7,10,8,2,9,9,2,8,2,2,2,2,8,2,8,8,2,2,2,2,9,9,2,2,9,9,9,9,2,9,9,2,2,2,2,10,7,8,2,2,8,10,10,8,9,2,9,2,8,8,8,8,2,9,2,9,2,2,2,9,9,2,8,8,2,2,9,8,8,10,10,7,10,8,2,2,8,10,7,7,10,8,2,9,9,2,2,9,2,2,2,2,2,2,2,2,2,2,9,2,8,2,2,9,9,9,2,2,2,8,2,2,2,8,10,10,8,8,9,8,8,10,8,8,2,2,2,2,2,8,8,2,9,9,9,2,2,9,9,2,8,8,8,2,2,2,2,8,10,10,10,8,2,9,2,8,10,7,7,7,10,8,9,9,9,9,9,2,2,9,2,2,2,2,2,2,9,9,8,8,8,10,8,9,2,2,2,8,8,8,10,8,8,8,7,10,2,9,2,10,10,7,8,8,2,9,9,2,8,2,2,2,9,9,2,9,9,2,8,8,8,8,2,9,9,2,8,10,10,10,8,2,9,2,8,10,7,10,7,10,8,2,8,2,9,9,2,9,9,2,2,2,2,2,9,9,2,8,8,10,10,10,10,2,2,8,8,10,10,10,8,10,10,10,8,2,2,8,10,7,7,10,8,8,2,9,2,9,2,2,2,9,9,9,9,2,8,8,8,8,8,9,2,9,2,8,8,10,10,8,2,9,8,10,7,10,10,7,10,8,8,8,2,9,9,9,9,9,9,9,9,2,9,9,2,2,8,10,10,10,7,10,8,10,8,10,7,10,10,7,10,10,7,8,8,9,8,8,7,10,10,10,10,2,9,2,9,9,2,2,9,2,9,2,8,8,8,8,8,2,2,2,9,2,2,8,10,10,8,2,2,8,10,7,10,10,7,10,10,8,8,2,9,2,2,9,2,9,9,9,2,2,2,2,2,10,10,10,7,10,8,8,8,10,7,7,10,10,7,7,7,7,8,2,9,2,8,7,10,7,7,10,2,2,2,2,9,2,2,2,2,2,8,8,8,8,8,2,8,2,2,9,9,2,8,8,10,8,9,2,8,10,7,10,10,7,7,10,8,8,2,2,2,2,2,2,9,9,2,2,8,8,8,8,10,10,7,7,7,10,8,2,2,10,10,10,10,10,10,7,7,8,2,9,8,8,7,10,10,7,10,8,2,8,2,9,2,2,2,8,8,8,8,8,8,8,8,8,2,2,2,9,2,8,8,10,2,9,2,8,10,7,10,10,10,10,7,10,8,8,2,2,2,2,2,9,2,2,8,8,8,10,10,7,7,7,7,7,10,8,8,2,9];

  const p1e00 = new Array(11);
  const p4400 = new Array(11);
  const p4600 = new Array(11);
  const p4800 = new Array(11);

  const plasma = new Array(440);

  let v5c9c = 0x78;
  let v5c9d = 0xf0;
  let v5c9e = 0x3c;
  let v5c9f = 0xb4;

  let ba_ctr = 1;
  let ba_pos = 0;

  let lo_ct1 = 16;
  let lo_ct2 = 15;
  let lo_ena = false;
  let lo_pos = 3;
  let tt_ctr = 0;
  let tt_pos = 0;

  let pl_ctr = 1;
  let pl_pos = 0;
  let pl_buf = buf3x;
  let pl_rdy = buf4x;
  let pl_cx  = 0;
  let pl_cy  = 0;

  let sc_pos = 0;
  let sc_off = 7;
  let sc_idx = 41;

  let func = begin;

  setTimeout(initialize, 100);
}