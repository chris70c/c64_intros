/*
  Graeme Souness International Soccer Crack
  Chromance (1992);
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

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    canvx.drawImage(combo, 0,0,300,73, 42,40,300,73);
    canvx.drawImage(combo, 279,73,1,66, 0,121,384,66);
    canvx.drawImage(combo, 280,73,1,30, 0,203,384,30);

    buf1x.fillStyle = c64[1];
    buf1x.fillRect(0,0,320,16);

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      player.stop();

      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);
      canvx.drawImage(combo, 0,120,133,7, 39,35,133,7);
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    // title flash
    if (++tt_ctr == 4) {
      tt_ctr = 0;
      tt_pos++;

      switch (tt_pos) {
        case 1:
          tt_col = 0;
          break;
        case 2:
          tt_col = 11;
          break;
        case 3:
          tt_col = 12;
          break;
        case 4:
          tt_col = 15;
          break;
        case 5:
          tt_col = 12;
          break;
        case 6:
          tt_col = 11;
          tt_pos = 0;
          break;
      }
    }

    canvx.fillStyle = c64[tt_col];
    canvx.fillRect(56,131,279,47);

    canvx.drawImage(combo, 0,73,279,47, 56,131,279,47);

    // scroll text
    sc_off += 2;

    if (sc_off > 7) {
      sc_off &= 7;

      buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf1x.drawImage(font, (cx * 8),0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf1c, sc_off,0,304,16, 39,211,304,16);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font  = new Image();
  const combo = new Image();

  font.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAQAQMAAABa/1ULAAAABlBMVEX///+EhIQGxHpUAAABYElEQVQ4y9XSMU4zQQwF4CchUf2y/gNEKRAHSOkCUXMMqlQUKSmsLTgZFSVHQD6BRUkxesH2aiGwiJ6XieWRvJ92RgvYsEGOoIQ/PNfOGBUSBKB3QEC396iIvZk5c8h6n5VzGniK7r8B+wKubQb4Rjorvc9as+4RmkDMj2pXcUgBl3tssTsIKtvQHpcIYAONrwBPgY3/b+DmmJNIQJHP5JxEA4od/jXgCfgJ4F8B7FfA8AZucS4Ah8cYL1TJJoK5KcCorgugDRCEhk5GDjECj9PZZgWMGFMDpn78ERg2CcWmBHB21Uf4vMSovxQQelje4IjDxxEOoS4ikb88wnSuJ5cYC1AtC1juYAXExyWugbllAj4DSOC1gcprqMcMAJs2gxlnMFdEd0pLZfmQEgjg2qpVZ0Z6NagJ1KfsFrQCzKcwNX06AS4K2N7PgJEmVmsBHKjiXbx7VFWsssM6vwF/JO9OipXZ44spKQAAAABJRU5ErkJggg==";
  combo.src = "data:image/png;base64,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";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "     hello and welcome to another fast release!  this time we bring you 'graeme souness international soccer' (c) zeppelin, england.  they have already released a game with a very similar title some months ago...  didn't they?  anyway,greets to everybody who loves |chromance|.  more is on the way, so let me go now!  peace, love, unity!  (c) mr.wax 1992          ";
  const sc_len  = sc_text.length;

  let tt_ctr =-2;
  let tt_pos = 0;
  let tt_col = 0;

  let sc_off = 0;
  let sc_pos = 0;

  let afid = 0;

  setTimeout(initialize, 100);
}