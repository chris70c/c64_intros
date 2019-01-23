/*
  The Cairo Connection Crack
  Motiv8 (1994);
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
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 144;
    buf3c.height = 1;
    buf3x.imageSmoothingEnabled = false;

    buf1x.fillStyle = c64[0];
    buf1x.fillRect(0,0,320,8);

    buf2x.fillStyle = c64[0];
    buf2x.fillRect(0,0,320,8);

    buf3x.drawImage(sprite, 0,0);
    buf3x.globalCompositeOperation = "source-atop";

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", intro);

    player.play();
  }

  function exit(e) {
    canvc.removeEventListener("click", exit);
    cancelAnimationFrame(afid);

    canvc.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);
    canvx.drawImage(sprite, 0,1,206,7, 33,35,206,7);

    player.stop();
  }

  function intro() {
    canvx.fillStyle = c64[fl_col[fl_idx]];
    canvx.fillRect(0,0,384,272);

    if (++fl_idx == 96) {
      fl_idx = 0;
    }

    player.run();

    if (--fl_ctr == 0) {
      canvc.addEventListener("click", exit);

      canvx.fillStyle = c64[6];
      canvx.fillRect(0,235,384,37);

      afid = requestAnimationFrame(draw);
      return;
    }

    afid = requestAnimationFrame(intro);
  }

  function sprites1(y, height) {
    let dx = 32;

    for (let i = 0; i < 7; i++) {
      let sx = sp_adr[sp_ptr[i]];
      let sw = i < 6 ? 24 : 16;

      buf3x.fillStyle = c64[sp_cur[i]];
      buf3x.fillRect(sx,0,24,1);

      canvx.drawImage(buf3c, sx,0,sw,1, dx,y,(sw * 2),height);
      dx += 48;
    }
  }

  function sprites2() {
    let sx = sp_adr[sp_ptr[1]];

    buf3x.fillStyle = c64[sp_cur[1]];
    buf3x.fillRect(sx,0,24,1);

    canvx.drawImage(buf3c, sx,0,24,1,  80,130,48,10);

    sx = sp_adr[sp_ptr[3]];

    buf3x.fillStyle = c64[sp_cur[3]];
    buf3x.fillRect(sx,0,24,1);

    canvx.drawImage(buf3c, sx,0,24,1, 176,130,48,10);

    sx = sp_adr[sp_ptr[5]];

    buf3x.fillStyle = c64[sp_cur[5]];
    buf3x.fillRect(sx,0,24,1);

    canvx.drawImage(buf3c, sx,0,24,1, 272,130,48,10);
  }

  function draw() {
    if (--bg_ctr == 0) {
      bg_ctr = 12;
      bg_col = bg_col ? 0 : 11;
    }

    canvx.fillStyle = c64[bg_col];
    canvx.fillRect(0,0,384,235);

    // update sprites colors
    sp_cur.copyWithin(0,1);
    sp_cur[7] = sc_col[sp_idx];

    if (++sp_idx == 64) {
      sp_idx = 0;
    }


    if (sp_pri) {
      canvx.drawImage(logo, 72,59);
      sprites1(35, 95);
    } else {
      sprites1(35, 95);
      canvx.drawImage(logo, 72,59);
    }

    if (sp_pri) {
      sprites1(130, 105);
      canvx.drawImage(logo, 72,171);
    } else {
      canvx.drawImage(logo, 72,171);
      sprites1(130, 105);
    }

    // scroll text
    sc_off -= 2;

    if (sc_off == 0) {
      sc_off = 8;

      buf1x.globalCompositeOperation = "copy";
      buf1x.drawImage(buf1c, 8,0,312,8, 0,0,312,8);
      buf1x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc_pos == sc_len) {
        sc_pos = 1;
      }

      buf1x.drawImage(font, (cx * 8),0,8,8, 312,0,8,8);
    }

    // update scroll colors
    sc_cur.copyWithin(1,0);
    sc_cur[0] = sc_col[sc_idx];

    if (++sc_idx == 64) {
      sc_idx = 0;
    }

    for (let i = 0; i < 40; i++) {
      buf2x.fillStyle = c64[sc_cur[i]];
      buf2x.fillRect((i * 8),0,8,8);
    }

    buf2x.drawImage(buf1c, 0,0);

    buf2x.globalCompositeOperation = "destination-out";
    buf2x.drawImage(buf1c, 0,0);
    buf2x.globalCompositeOperation = "source-over";

    let x = sc_off + 32;
    let w = 320 - sc_off;

    canvx.drawImage(buf2c, 0,0,w,8, x,131,w,8);

    // sprites over scroll text
    sprites2();

    // update sprites pointers
    for (let i = 0; i < 7; i++) {
      if (sp_ptr[i] == 47) {
        sp_ptr[i] = 1;
      } else {
        sp_ptr[i]++;
      }
    }

    if (--sp_ctr == 0) {
      sp_pri = !sp_pri;
      sp_ctr = sp_pri ? 24 : 72;
    }

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font   = new Image();
  const logo   = new Image();
  const sprite = new Image();

  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAQdJREFUKM910TFOxDAQBdBYU2wJv6SaM6A9ALfhHtEUW7pOxVVAKX6zEmdALlJPB9UHJwEWARNFlgs/fX8PCguzEmDCYdG/gj5Fd8v5LGJabubWqHWCFl6iREgvurJBgMPdV2A76VyX7MB9B56AxjZ14hWnTLgnIFHMQcUchwMK0xyAwaIDgabn5XgUj8NDC9acO5BgzMWsBag6tvaZANsV0P/cErADk6hp5kk1h6JRDfTMBDGKruQFgJ/AWPcONLzVa+0J+AWkeoI/AO9AFKRvHUhTAOodUKzfAMmuCzZa8QADBQgfYQwCVvYONC23j2pcS/NgsbRgmPjxChz0/2wdXEyVfm3fAW6xFupqpVv7AAAAAElFTkSuQmCC";
  logo.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPcAAAArAQMAAACevoxEAAAABlBMVEUAAAC2trVtIHVQAAAAAXRSTlMAQObYZgAAAi1JREFUOMt90kFrE0EYBuAvm7iJEN1AoBQRN00rHgQN9OBFOjEXr73pcfGgd8+FGWywCoEICuZkL4Lin+jSQHpREPwDGzdGxCIb0sMe4r7O7uyyscnmO87Dy8z3MoSVE5CgVaNleIOossztBuVIuw6HyPxbC/0wIIJ3Ap8BmHWr+Mam9KAPdD9S5BB5TA4R3A7dfB1UpV/sAu5u7I6BKQMMf8c4O+pjW3rVDDBR+X3PZ8aAf8EHjxcdpvwW85n/NfID/+6e+Ye/5M+kv+du5GvMM31b+cz02Sle8OMK2rXYy9wzZ1bshid9g9nSNdaP3TESDwyPOyix4wLEZre6kA+K3/kPmR9V8CYnlOvh/U7s920+RIONZT7X3Vcevt+OfbMlfZuNy3iVN9X9+XD/xFt65G4ZPZ0pz4X9UeyPWmqryNV+1AcOErf01Lkb5wO4Isnr/Pc5z8vOJiLNq/elrkf9pv4LLPYh7jB3ib/jiV+TrvpN/VT658hH6PDBgo9gI3GxxMd8io5ybqND63CMoJH6Twasx45l3sWsEfmYISjN+/MdS9973B95VnnS058+uXLjIc17W7d0a+sekSjbPa1Zr9RLJbqavq+tNbUmbVCNCqJETapQiag870TNLQpHCI3q8ug/F2RpJPNEBcrMk8pTMpeZY8T9C+kLo885LXXPXOVF0zMnItvV/8n2avj/drP9wgkwWJFfGwKXatl+05EdNLP97RnR0afIsXKCfyMF3t8w2ydvAAAAAElFTkSuQmCC";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAM4AAAAIAgMAAADMwCj+AAAACVBMVEUAAAAAAAD///+D3c/SAAAAAXRSTlMAQObYZgAAAKlJREFUGNNdUDEOBCEItN7/cYU/gNdsQ78NJvLKm8Eze5HEERwGkJZlF+GpoLWLbmt0EdA9zdw8JSNFJD2CmNHFgKFdIsC5SChfDBl2t4ANDxkkYIWQEOc0JwdX5wyU6mSfFpVK/BfVkURi4maQp4jUGsycyHEhkaEZUxD5x4dukd1Hpy7Aql2oq1MyWd9Ox59eUcl0c7pF/O1zbG+JEoq1vRr9V8DA1rm/wRrPDNvcD0EAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d", {alpha:false});
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "     ..back on track with anoza english budget-game! -the cairo connection- (c)1994 logyk software.. supplied and cracked by crossfire.. it'll be funny to hear certain losers whine about this release! i take it thier iq is to low to play it, and they're just pissed cause they got beat!..again!.. don't forget to call europe's absolute no.1 board -dominic- at +45-55776525!.. we salute the very little crowd worthy of our attention: - tsm! - psi - coderz - demonix in the states.. and.. regina - talent - alpha flight - chromance - genesis project and f4cg in europe.. noone is forgotten!.. we'll be back in a minute - stay tuned!  slatez..                       ";
  const sc_len  = sc_text.length;

  const fl_col = [9,9,2,2,8,8,10,10,15,15,3,3,13,13,7,7,1,1,7,7,13,13,3,3,15,15,10,10,8,8,2,2,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  const sc_col = [11,11,12,12,15,15,7,7,1,1,7,7,15,15,12,12,11,11,6,6,14,14,3,3,1,1,3,3,14,14,6,6,9,9,2,2,8,8,10,10,15,15,13,13,7,7,1,1,7,7,13,13,15,15,10,10,8,8,2,2,9,9,0,0];
  const sc_cur = new Uint8Array(40);

  const sp_ptr = [23,27,31,35,39,43,47];
  const sp_adr = [0,0,0,0,24,24,24,24,48,48,48,48,72,72,72,72,96,96,96,96,120,120,120,120,144,144,144,144,120,120,120,120,96,96,96,96,72,72,72,72,24,24,24,24,0,0,0,0];
  const sp_cur = new Uint8Array([1,2,3,4,5,6,7,12]);

  let bg_ctr = 12;
  let bg_col = 11;

  let fl_ctr = 768;
  let fl_idx = 0;

  let sp_ctr = 72;
  let sp_pri = false;
  let sp_idx = 25;

  let sc_off = 4;
  let sc_pos = 1;
  let sc_idx = 25;

  let afid = 0;

  setTimeout(initialize, 100);
}