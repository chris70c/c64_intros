/*
  3D World Boxing Crack
  Fantastic 4 Cracking Group (1992) [F4CG]
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

    buf2c.width  = 72;
    buf2c.heigth = 16;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 336;
    buf3c.heigth = 16;
    buf3x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    for (let i = 0, len = rs_cols1.length; i < len; i++) {
      canvx.fillStyle = c64[rs_cols1[i]];
      canvx.fillRect(32,(130 + i),320,1);
    }

    canvx.fillRect(336,147,16,16);
    canvx.drawImage(logo, 0,43);

    print("  proudly presents  ", 32,131);
    print("cracked by king f4cg", 32,163);

    buf1x.fillStyle = c64[0];
    buf1x.fillRect(0,0,320,16);

    buf2x.drawImage(sprite, 0,0);
    buf2x.globalCompositeOperation = "source-atop";

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      canvx.fillStyle = c64[14];
      canvx.fillRect(0,0,384,272);

      canvx.fillStyle = c64[6];
      canvx.fillRect(32,35,320,200);

      canvx.drawImage(text, 0,0,254,7, 65,35,254,7);

      player.stop();
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function print(text, x, y) {
    let len = text.length;

    for (let i = 0; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 16;

      canvx.drawImage(font, cx,0,16,16, x,y,16,16);
      x += 16;
    }
  }

  function draw() {
    // title raster colors;
    let pos = rs_table[rs_pos];

    if (++rs_pos == rs_len) {
      rs_pos = 0;
    }

    for (let i = 0; i < 15; i++) {
      canvx.fillStyle = c64[rs_cols2[pos + i]];
      canvx.fillRect(32,(148 + i),304,1);
    }

    // title dots animation
    canvx.drawImage(font, tt_pos,0,16,16,  32,147,16,16);
    canvx.drawImage(font, tt_pos,0,16,16, 320,147,16,16);

    if (--tt_ctr == 0) {
      tt_ctr = 3;
      tt_pos += tt_val;

      if (tt_pos > 496 || tt_pos < 432) {
        tt_pos -= (tt_val * 2);
        tt_val = -tt_val;
      }
    }

    print(tt_text, 48,147);

    // update scroll colors
    if (--sp_done == 0) {
      sp_done = spr_wait[sp_ctr];

      if (++sp_ctr > 8) {
        sp_ctr = 0;
      }

      buf3x.fillStyle = c64[spr_cols[sp_pos1]];
      buf3x.fillRect(0,0,48,16);
      buf2x.fillStyle = c64[spr_cols[sp_pos2]];
      buf2x.fillRect(0,0,24,16);
      buf2x.fillStyle = c64[spr_cols[sp_pos3]];
      buf2x.fillRect(24,0,24,16);
      buf2x.fillStyle = c64[spr_cols[sp_pos4]];
      buf2x.fillRect(48,0,24,16);

      if (++sp_pos1 == spr_len) {
        sp_pos1 = 3;
        sp_pos2 = 2;
        sp_pos3 = 1;
        sp_pos4 = 0;
      } else {
        sp_pos2++;
        sp_pos3++;
        sp_pos4++;
      }

      buf3x.drawImage(buf2c,  0,0,24,16, 0,0,48,16);
      buf3x.drawImage(buf2c, 24,0,24,16, 0,0,48,16);
      buf3x.drawImage(buf2c, 48,0,24,16, 0,0,48,16);

      buf3x.drawImage(buf3c, 0,0,48,16,  48,0,48,16);
      buf3x.drawImage(buf3c, 0,0,48,16,  96,0,48,16);
      buf3x.drawImage(buf3c, 0,0,48,16, 144,0,48,16);
      buf3x.drawImage(buf3c, 0,0,48,16, 192,0,48,16);
      buf3x.drawImage(buf3c, 0,0,48,16, 240,0,48,16);
      buf3x.drawImage(buf3c, 0,0,48,16, 288,0,48,16);
    }

    canvx.drawImage(buf3c, 0,0,304,16, 39,195,304,16);

    // scroll text
    sc_off += 3;

    if (sc_off > 7) {
      sc_off &= 7;

      buf1x.globalCompositeOperation = "copy";
      buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);
      buf1x.globalCompositeOperation = "source-over";

      if (++sc_ctr == 2) {
        sc_ctr = 0;

        let cx = sc_text.charCodeAt(sc_pos);
        if (cx >= 96) { cx -= 96; }
        sc_org = cx * 16;

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }
      }

      buf1x.drawImage(font, sc_org,0,8,16, 312,0,8,16);
      sc_org += 8;
    }

    canvx.drawImage(buf1c, sc_off,0,304,16, 39,195,304,16);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font   = new Image();
  const logo   = new Image();
  const sprite = new Image();
  const text   = new Image();

  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAftJREFUSMfFlE1uwyAQhYNYsHRvwFHSmwXkBdfpEUC5CHMDL72wQt+jbsGJm6SVqoKGnyHz5ovt4VD+uQFg0m6A6ayymrTIfCpBRIpMTkedYW6AqSBwTxiDU73EfGrrxV4niPpio44DojSyGK77UwBk5QxM5dobQM6uejEa2C8BnLpYKhCAmbjuTwEgkIQhJbp0AK9I5nkS8IOLbQBBvhIeHwGskWwFooHr/vQewOE+ANPPdgtw6QB4vg8A/w1AIQD7CnC+Aig9QJGa7DTbaQDAscu5C1CYuIZdA5RvAQxWL3sA5zOVmH45TkM2ALDcrU+gg8nmSYConE5llGiiST4q/KMxDqmkt1EC9iE51MhiRxklTdlgp5h+tg2gSfYAHEdZLDShwJqCMubuGSkA8Av3xYszznjvFAS9M/BMXpg8wBfh9YL+hjJSjwFa8zJbp2coMA+UEd9VEMuwCpdqdU0Ar1cAeIP3UvwK8OITTsvtK7gH4DGxU4fWAdjvANIuQHKHKlL6j3C/LfYxANsngPQATLkFCBUgjQTgvpXhcwABcjWOWr8HyMa9VoDtRWR/CoCo7Stw6qP7AkMARxgAVh9meqfBZa77q3gfoF1JjKwRvo23AJrFwWRREwDjCoAVypQzvLAP32OAdiVFTQAUoI/6c9wC/E3jlfRUewe1Gym7EXdhIQAAAABJRU5ErkJggg==";
  logo.src   = "data:image/png;base64,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";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAQAQMAAACP/queAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAEdJREFUCNdFjsENQDEIQl/SAboQwzdxITfo59sDHAxBQVh1hA6LTbeHIY1g9N08VBUa5jvuMCHbf9nGJ4dlG0dSkpxvaZBWH2XVI90xprnxAAAAAElFTkSuQmCC";
  text.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAAAHAQMAAAASxWLDAAAABlBMVEU3OcRwfOZ3FDSbAAAAhElEQVQI1zWPsQnEQBADVcAXs+WpPEWOJjYOXIO50MHy/Pkes4kGhkWSPVreyvSt2FYNbTzBt7sFR8RlCAogH7qgEFSiQCpf8hdCgSbWvFcY8t7ucU84UaMdV3TeNcb6oM/GhyxAoIlTYFSyOhQbkGMJxaGJ9YQpvCswjdq2mCv8BOPkB24Ah522ejSsAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const tt_text = " 3d world boxing ";
  const sc_text = "   (                                      $  hi boys and girls! f4cg is back on your screen witha new 1st release called: # 3d world boxing # from simulmondo! thiz one was cracked, packed and 1st released by king on october,31th 1992! fixed by the usa n.1 nei!      fast hellos to: nei! -- empire - legend - ils - dom - rsi - chromance - trc - enigma -and no more!   king's off...          ...gnik! ###              ";
  const sc_len  = sc_text.length;

  const rs_cols1 = [0,0,9,2,9,2,8,10,8,10,15,7,15,7,1,1,0,0,11,12,11,12,15,7,15,7,15,12,15,12,11,11,0,0,6,11,6,11,4,14,4,14,3,7,3,7,1,1,1,0];
  const rs_cols2 = [11,5,11,5,13,1,13,1,13,5,13,5,11,11,0,0,5,11,5,13,1,13,15,7,1,13,5,13,5,11,0,0,11,5,13,1,13,7,15,7,15,1,13,5,13,5,0,0,5,13,1,13,15,7,15,7,15,12,1,13,5,13,0,0,13,1,13,12,15,7,15,7,15,12,15,1,13,5,0,0,1,13,11,12,15,7,15,7,15,12,15,12,1,13,0,0,13,12,11,12,15,7,15,7,15,12,15,12,11,1,0,0,11,12,11,12,15,7,15,7,15,12,15,12,11,11];
  const rs_table = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,16,16,32,32,48,48,64,64,80,80,96,96,96,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,112,96,96,96,80,80,64,64,48,48,32,32,16,16];
  const rs_len   = rs_table.length;

  const spr_wait = [6,5,4,3,2,3,4,5,1];
  const spr_cols = [7,15,12,11,12,15,7,15,12,11,12,15,1,3,14,4,14,3,1,3,14,4,14,3,7,15,10,2,10,15,7,15,10,2,10,15,1,13,5,11,5,13,1,13,5,11,5];
  const spr_len  = spr_cols.length;

  let rs_pos = 0;
  let tt_ctr = 1;
  let tt_pos = 432;
  let tt_val = 16;

  let sp_ctr  = 8;
  let sp_done = 1;
  let sp_pos1 = 31;
  let sp_pos2 = 30;
  let sp_pos3 = 29;
  let sp_pos4 = 28;

  let sc_off = 0;
  let sc_pos = 0;
  let sc_ctr = 1;
  let sc_org = 0;

  let afid = 0;

  setTimeout(initialize, 100);
}