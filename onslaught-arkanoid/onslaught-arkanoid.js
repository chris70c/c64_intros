/*
  Arkanoid V1 +2 Crack
  Onslaught (1998)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    canvx.fillStyle = "#000";
    canvx.fillRect(0,0,384,272);

    buf1c.width  = 320;
    buf1c.height = 64;
    buf1x.imageSmoothingEnabled = false;

    print();

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", fx);

    player.play();
  }

  function fx() {
    if (--fl_ctr == 0) {
      if (fl_col == 6) {
        fl_val = -1;
      }

      fl_ctr = 3;
      fl_col += fl_val;

      if (fl_col < 1) {
        fl_col = 1;
        fl_ctr = -1;
      }

      canvx.fillStyle = colors[fl_col];
      canvx.fillRect(0,0,32,272);
      canvx.fillRect(352,0,32,272);
    }

    canvx.fillStyle = "#000";
    canvx.fillRect(104,66,171,169);

    if (lo_pos) {
      canvx.drawImage(logo, 0,0,lo_pos,64, 48,40,lo_pos,64);
      canvx.drawImage(logo, 288-lo_pos,0,lo_pos,64, 336-lo_pos,176,lo_pos,64);
    }

    if (--lo_ctr == 0) {
      canvx.drawImage(logo, lo_pos,0,32,64, 48+lo_pos,40,32,64);
      canvx.drawImage(logo, 256-lo_pos,0,32,64, 304-lo_pos,176,32,64);

      lo_ctr = 36;
      lo_pos += 32;

      if (lo_pos >= 288) {
        func = draw;
      }
    }

    print();
    sprites();

    player.run();
    requestAnimationFrame(func);
  }

  function print() {
    if (--sc_ctr == 0) {
      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      sc_ctr = sc_size[cx];
      sc_org = sc_xpos[cx];

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }
    }

    buf1x.drawImage(buf1c, 8,0,312,64, 0,0,312,64);
    buf1x.drawImage(font, sc_org,0,8,64, 312,0,8,64);
    sc_org += 8;

    canvx.drawImage(buf1c, 0,0,320,64, 32,99,320,64);
  }

  function sprites() {
    let p = sp_ctr + 14;
    sp_ctr = (++sp_ctr) & 255;

    let y = sp_pos[210 + p];
    let x = sp_pos[10 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[180 + p];
    x = sp_pos[20 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[150 + p];
    x = sp_pos[30 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[120 + p];
    x = sp_pos[40 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[90 + p];
    x = sp_pos[50 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[60 + p];
    x = sp_pos[60 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[30 + p];
    x = sp_pos[70 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
    p -= 2;

    y = sp_pos[p];
    x = sp_pos[80 + p];
    canvx.drawImage(sprite, 0,0,22,20, 104+x,66+y,22,20);
  }

  function draw() {
    canvx.fillStyle = "#000";
    canvx.fillRect(104,66,171,169);

    canvx.drawImage(logo, 56,26,171,38, 104,66,171,38);
    canvx.drawImage(logo, 56,0,171,59, 104,176,171,59);

    print();
    sprites();

    player.run();
    requestAnimationFrame(draw);
  }

  const logo   = new Image();
  const font   = new Image();
  const sprite = new Image();

  logo.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASAAAABABAMAAABILrddAAAAIVBMVEUAAABwfOawP7Zi2Mzk7U6m+p7///83OcS2trWEhIRNTU1bEB9+AAAD8UlEQVRo3syX0ZEjIQxESYFYlAIpkAKxkAIpOMqjUc/IPpXqoIqPa++ueBI9bqj9sNP/qg9+VKWPMbpxNKfIfr5KP/VTY+gv1MsYxuGcMvZ+BDr0U8+JNHEZ3TicU8bOj9KP/dyPBjq6wTieU+DIj3rsh5iw98dgHM8pcOzv/djP/WUOcMdrwxfHcwoc+3s/9UMdYmFiYzT8/K8rj/yjoNFP/BATsiBxNw7nlLH3o5770yiTkRB1zEH75nhOgWN/P/fDUDRhWY32w/GcAsf+cuxnQjR4kk1W/ctfzv2pte8TbTN13Y/GXLRZwWWbqdt+JtQrQ2ebqdt+NGopKyFK2Wbqvj/VpouyOttM3fcjYdOEeG0zdd+fap3B0Gio20zd96NhCVvIlGPqjp+B5qLOCm4hU46pW34m1itDJ2TKMXXPn6q0tk6E0kKmHFP3/EmqLtrqhEw5pu75kbjqifDyLGTqmTtF/nroTyJzgQegVM+ZnGnk/Fc58rv9ZFgofnDlfruBilI9J7LwCUI2IXTsJ1PG8iQa+h3R3k9mMJm1Qp7zw3wC5795Yn/MT6KPBuIcSXWBv1I9p5fxBJubsjj/Fku2QDa3G1gdzymTld65SZx/i/1TtCNZk1VB9YytZMm235TF+feYV/TBBdk85YyRvq2IY+x4Odt+k/Pv8/tflGyODWshguoYyi9nm0McOv8253VDf9oto5vKYSCK0oJbmBZSnFvYFrYFqlwmPvZkORLGQvwgLkjPJ/cazzghz/l/P/19R6n20Q5dX9yh179/3u3QuJlX8iUemtzKrx3S/M9z/R18Oh5bmFfESH5d1/wj5qGG2aHR+ZUSI7gtHyl/xm0+1PDcofsZaVmhGMlHyp9yfpdlQcUtquJ2iZF8pPwxv4zv1uJob4N1K8RIPlL+mBE8Omyj4vwRI/lI+WNmh4oj2qy4tSZG8pHyx8x5qDhiDNp9RYzkI+WPmfNQccTbMPLepr6Pk+zX8QMegciK+Yy+4dj7ZhZ0fqq4PyuOb2MWlM+bejEdBJ89O9hwbH3zKkB53tTFWXGMiuMO9r7h2PrmVYDzHD+Ke8QIJt8TNhx73zwXdJ7jB8xgbCHBvuHY+2Y+nV8q7kEnFPjk+I+Vlx/4zrOg8jxBxZm4B5FXEl+iuMPl58B+Mb7zLOg8BYU77uZ+4G/yLOg8b2o4RQdzfnJtLYy/8vZhfOVZ0HnOQ8Vz6rO+6qAYIm8fxneeBZ1HT573tKx563sxPnn7ML7zt+08O1S8Ek/q1cGTqxn7ML7yLKi8nqGh0dGa36uDYnzy9mF851nQ+VftUGbyt+q5+RaMP2W/OOU8CzpPQYt/9aufpn94FdIOu83r0QAAAABJRU5ErkJggg==";
  font.src   = "data:image/png;base64,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";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUAgMAAAD0EiWjAAAADFBMVEUAAAA3OcRwfOZi2MyJHalqAAAAAXRSTlMAQObYZgAAAFNJREFUCNc9zSEORUEIQ9Ga2R+mpqv7BoNhf5j55YnBkBNuAgAGPIfcJWUsuria+Vndne50ZwKnbq3ulAL0KWPD4tPRiE4qk0/I9snSJzp8b03jD9bCLWVRZg+dAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});

  const sc_text = "bouncing balls and things that go ding...          onslaught dress as santa yet again and give you arkanoid version 1. trained for your pleasure by enthusi with original supply by jazzcat.      not as good as the final arkanoid... that ball is too damn fast...                    santa sends reindeers and blue lightning bolts out his ass to these pirates...       remember, triad, hokuto force, laxity, chromance, wow, neophytes, success and trc...                  until the next one, have a safe holiday...                                   ";
  const sc_len  = sc_text.length;
  const sc_size = [5,8,7,7,7,7,7,7,7,4,4,7,4,8,7,7,7,7,5,7,5,7,8,8,7,7,7,5,5,5,7,7,5,3,7,8,7,7,7,4,4,4,8,7,4,7,3,8,7,5,7,7,7,7,7,7,7,7,3,4,5,6,5,7];
  const sc_xpos = [0,40,104,160,216,272,328,384,440,496,528,560,616,648,712,768,824,880,936,976,1032,1072,1128,1192,1256,1312,1368,1424,1464,1504,1544,1600,1656,1696,1720,1776,1840,1896,1952,2008,2040,2072,2104,2168,2224,2256,2312,2336,2400,2456,2496,2552,2608,2664,2720,2776,2832,2888,2944,2968,3000,3040,3088,3128];

  const sp_pos = [113,110,106,102,98,95,91,88,85,82,80,78,76,74,73,72,72,71,72,72,73,74,76,77,79,82,84,87,90,93,96,99,102,105,108,111,114,117,119,122,124,125,127,128,129,129,129,129,128,127,126,124,122,119,116,113,110,106,102,98,93,89,84,79,74,70,65,60,56,51,47,43,39,36,33,30,27,25,23,22,21,20,20,20,20,21,22,24,25,27,30,32,35,38,41,44,47,50,53,56,59,62,65,67,70,72,73,75,76,77,77,78,77,77,76,75,73,71,69,67,64,61,58,54,51,47,43,39,36,32,28,24,21,18,14,12,9,6,4,3,1,0,0,0,0,0,1,3,4,6,9,12,15,18,22,26,30,34,38,43,47,51,56,60,65,69,73,77,80,84,87,90,92,94,96,97,99,99,100,100,99,98,97,96,94,93,90,88,86,83,80,77,74,72,69,66,63,61,59,56,55,53,52,51,50,49,49,50,50,52,53,55,57,59,62,65,69,72,76,80,84,89,93,98,102,106,111,115,119,123,127,131,134,137,140,143,145,146,148,149,149,149,149,149,148,146,145,143,140,137,135,131,128,125,121,117,113,110,106,102,98,95,91,88,85,82,80,78,76,74,73,72,72,71,72,72,73,74,76,77,79,82,84,87,90,93,96,99,102,105,108,111,114,117,119,122,124,125,127,128,129,129,129,129,128,127,126,124,122,119,116,113,110,106,102,98,93,89,84,79,74,70,65,60,56,51,47,43,39,36,33,30,27,25,23,22,21,20,20,20,20,21,22,24,25,27,30,32,35,38,41,44,47,50,53,56,59,62,65,67,70,72,73,75,76,77,77,78,77,77,76,75,73,71,69,67,64,61,58,54,51,47,43,39,36,32,28,24,21,18,14,12,9,6,4,3,1,0,0,0,0,0,1,3,4,6,9,12,15,18,22,26,30,34,38,43,47,51,56,60,65,69,73,77,80,84,87,90,92,94,96,97,99,99,100,100,99,98,97,96,94,93,90,88,86,83,80,77,74,72,69,66,63,61,59,56,55,53,52,51,50,49,49,50,50,52,53,55,57,59,62,65,69,72,76,80,84,89,93,98,102,106,111,115,119,123,127,131,134,137,140,143,145,146,148,149,149,149,149,149,148,146,145,143,140,137,135,131,128,125,121,117];
  const colors = ["#683808","#4d4d4d","#848484","#b6b6b5","#a6fa9e","#e4ed4e","#fff"];

  let fl_ctr = 5;
  let fl_col = 0;
  let fl_val = 1;

  let lo_ctr = 37;
  let lo_pos = 0;

  let sc_ctr = 1;
  let sc_pos = 0;
  let sc_org = 0;

  let sp_ctr = 0;

  let func = fx;

  setTimeout(initialize, 100);
}