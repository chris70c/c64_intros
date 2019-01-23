/*
  Klepkomania+ Crack
  Alpha Flight (1995);
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 200;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 32;
    buf2c.height = 5;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 538;
    buf3c.height = 106;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 384;
    buf4c.height = 272;
    buf4x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf1x.drawImage(back, 0,0);
    buf1x.fillStyle = c64[2];
    buf1x.fillRect(96,72,128,16);
    buf1x.drawImage(title, 96,72);

    buf2x.drawImage(font, 0,0,8,5, 24,0,8,5);

    const i = buf2x.getImageData(0,0,32,5);
    sc_buf = new Uint32Array(i.data.buffer);

    buf3x.drawImage(grid, 0,0);
    buf3x.globalCompositeOperation = "source-atop";

    buf4x.fillStyle = c64[0];
    buf4x.fillRect(0,0,384,272);
    buf4x.clearRect(32,35,320,200);
    buf4x.globalCompositeOperation = "source-atop";

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      player.stop();

      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);
      canvx.drawImage(text, 32,35);

      afid = requestAnimationFrame(odd);

      setTimeout(() => {
        cancelAnimationFrame(afid);
        canvx.fillRect(0,0,384,272);
      }, 5000);
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function odd() {
    buf4x.fillStyle = c64[15];

    let x = dc_pos;
    let y = 0;

    do {
      buf4x.fillRect(x,y,48,1);
      x += 48;

      if (x > 504) {
        x -= 504;
        y++;

        buf4x.fillRect(0,y,x,1);
      }

      x += 256;

      if (x > 504) {
        x -= 504;
        y++;
      }
    } while (y < 272);

    if (++dc_ctr == 3) {
      dc_ctr = 0;

      dc_rand[0] = (dc_rand[0] - 16) & 511;
      dc_rand[1] = (dc_rand[1] - 32) & 511;
      dc_rand[2] = (dc_rand[2] - 64) & 511;
      dc_rand[2] = (dc_rand[2] - 96) & 511;
    }

    dc_pos = dc_rand[dc_ctr];

    canvx.drawImage(buf4c, 0,0);

    afid = requestAnimationFrame(even);
  }

  function even() {
    buf4x.fillStyle = c64[0];
    buf4x.fillRect(0,0,384,272);

    afid = requestAnimationFrame(odd);
  }

  function draw() {
    if (++sc_off > 7) {
      sc_off = 0;

      buf2x.drawImage(buf2c, 8,0,24,5, 0,0,24,5);

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf2x.drawImage(font, (cx * 8),0,8,5, 24,0,8,5);

      const i = buf2x.getImageData(0,0,32,5);
      sc_buf = new Uint32Array(i.data.buffer);
    }

    for (let c = 0; c < 22; c++) {
      let b = blocks[c];
      let p = sc_off + c;

      for (let r = 0, l = b.length; r < l; r += 6) {
        let v = sc_buf[p];
        let i = 0;

        if (v == 4280048054) {
          i = 8;
        } else if (v == 4278728808) {
          i = 9;
        } else if (v == 4285297898) {
          i = 10;
        } else if (v == 4290098870) {
          i = 15;
        }

        let sx = b[r];
        let sy = b[r + 1];
        let sw = b[r + 2];
        let sh = b[r + 3];

        buf3x.fillStyle = c64[i];
        buf3x.fillRect(sx,sy,sw,sh);

        buf1x.drawImage(buf3c, sx,sy,sw,sh, b[r + 4],b[r + 5],sw,sh);

        p += 32;
      }
    }

    if (--fl_ctr < 0) {
      let x = 96;
      let t = fl_col1[26];

      fl_col1.copyWithin(1,0);
      fl_col1[0] = t;

      t = fl_col2[0];

      fl_col2.copyWithin(0,1);
      fl_col2[26] = t;

      for (let i = 0; i < 16; i++) {
        buf1x.fillStyle = c64[fl_col1[i]];
        buf1x.fillRect(x,73,8,6);

        buf1x.fillStyle = c64[fl_col2[i]];
        buf1x.fillRect(x,81,8,6);

        x += 8;
      }

      if (++fl_pos == 27) {
        fl_ctr = 79;
        fl_pos = 0;
      }

      buf1x.drawImage(title, 96,72);
    }

    canvx.drawImage(buf1c, 32,35);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const back  = new Image();
  const font  = new Image();
  const grid  = new Image();
  const title = new Image();
  const text  = new Image();

  back.src  = "data:image/png;base64,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";
  font.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAFBAMAAADBBElTAAAAD1BMVEUAAAC2trXqdGy2WRxoOAh890YeAAABTUlEQVQ4y3VUiW2EQAwc5xrwUAHoGoiiFICU/nvKjvHae+JuYTT22AbvA8BBfxzE30Cy4MJDDPPSZAM4Adld1+xixW4YMSOuIcMcINP3cesijAxLWoAZNxuM2zASoIOD2bbbQDKEHixSrwDpP7BAA2iYXzUdC/bKb+SD228gprg0Qd4WgGra1rhC0/c3C0BdborNdzDaFUJjQveEkcFzF/bjAg5gwIbtCBihWC5A58ya1CZbNi0/td1K93ydnNBcyD6TQq8F6ZD0QO96BmnmNakBWp2Gtc57zRaDFG/fxNcrMm/6YNutb+XLHgCWXOPW9bkrn05AqWpUEyr5fgJSEKccC9A7TiX2rgd/PAEafJ7E4ySfsAEKoSH8iG2/bWe+IC3z6hnYLh/c4YD0sFX38g9Ym7C9TgDJ9WO5/wOIWSO5JkPS2XbpYvm9+20L/3CHM6KVbud9AAAAAElFTkSuQmCC";
  grid.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhoAAABqAgMAAACHahBdAAAADFBMVEUAAAD//wD/AP////9gkrYUAAAAAXRSTlMAQObYZgAAB3lJREFUaN6s2TsC2yAMBmAtLCxcjYW5V2P20quxdFYTPfyDcN04LUNb2wG+GCEgJR5EjUj+plSJKHd6lTKIju73CtPrkogqvcsgIq1G+ZAPy7XUlkdSw0qls2RCkedoh5lTa7UwM1FrjeiQ7gszHcdh95h55Pdls0pS/92x3C08cN3NwaqVKl7sIdqwdqSH1lpld1RpWO7Lv1J0NNJL/bQ7mKdrdSjEbrsDED6h6f0B5pHebRdr2Roq6uiUXEvHx45DHN5RmiD20KEMBxUJAXWkVtXsL8AaL7PDv2t64GgVDgycQnRgWvXIPANVxTxetTB64zMHvvLqaBaoApkcY3a8iBZNYu1k4ZYawnlID6q6dqTdwTcOYkjfDq2pDokInbIWo3WeqodWsa9PF4721MHm8EGTL6Nt6CAgNlTg+SHVfeIaDI41DtVxGyDVZ9PZRqcyO1SVp0jxdITMdXjWOh09OmKgxgDxp4gxIqlvUxaOQ8dfHd6SvWyJq24pK3/hSPa0SxNa5Yc8PFNHiY4xd+VteOOJKEuQIVPBcR0gcDRVW0hZRj7kMjpw2bUhzzmvUgZZQUfjs0CligWgmNxTmn09to47NXPw5NBsXNXBI65nfic6+uQYwYGIz33KGuXagVTV4GB2h0YvSsJiBwfBYVqLGiyZUlENxRy2HN07mAiBsEIqIOpwCBwVk7mZuCFSiu8yUnCUK8dLa44AEUckLo4q6VLvVJsN0rrOHIx4mh1O3x2WVfx7480DQoDEx4WHdIf1rNgMdmsZZA6EKUu/+dKB0dsga7cBolKdDL77Eda5OVTIuXV0R3wfLTp4G5wZssaRx5CsupZqbQywvAnkbK987GBE6w6ZL/AyLdKKbZYzVjxrj9Fe4aGP6MZRANGVwnP4XpY9jDYkFbvPMjg62hOov5zooOBAZsWW+dZhgcZs65mveFXak+p6bVHCTNLHpaPDEbcAGZDokE61D8+bsljAMYRFTR3nrKGGgPyrAwmmXzr0IQ4KbGNiDmI/PPTTcXR3ND+z7A76kyNkOiTVaeuHPqlVY5bgkI7MYZBrxxqozbu6hCT8OTtc2Ox0CYc1ZA6HqAOJ7N6xQ+xaWxMHUkerPimKvgNpzTJ3OR3VIs87yrcOh/bg6EgjjINC97mRNHjUobboOCMPHc2OAUf7m8NjVN6wTi1PJ1rRd+Pp2uGQZe2PE+beoZ/Cap/9bnObGtRBq2MaqJ+DUPK1w5x/c2Ap82ERmzp881l9jKKDF4h088Ahl0jffrAkatFB+OHFtyFjcfDA/NvP9jcOlHSmbyz3ydOaxn/CrsHGv0QHszQVIbQFKhyxyLDgaCAVgsNT+DT+5jhmB7UAeeBA6lCHpg6qajunLKnLXs257uXgiJABiD3ZHRsd5/3CpA5yRztPLnMGJIJjiCNABgFS7x2ogfRdeFA4xVRz2BJNfqIMDoPE3J0+ddDi0GaZtUV1FHXgbK5dB4dBjg2CALlxIBUmTGPdzebVIR1lX+wKUY4OgeYdEhz3kGn346PbbbvFglsdCo0OvblDvJd7h/aJQwy28DcOyShwJDguIBUJ94OiXSI07FuWPzoow4FxwZY5bLw+KzhI+lSp+Glid/xazs5w0DFtVSfHE4g4hjlEYLnNHRWOYe3eOhiORxCbkjhQ+BmKOUWHBV+5cwCSHjpKcJCfoCZHUQcgWEkWh3i/dBDT6kieIjcHIMERzrrfOYqFfBOHJU5Z3aIDEAoTFw5AnjmQ+MzB4nBIpdXRMmql3VEA+cZBs8NXY2/qbZrzPGqtjg7HEOYXjjw7Bo5i/rNemRx9gdT/6qAjHHzVgf9YnBwzJDroewdOANFR5k02HCukXgUq49ljCHavnM0xb8zLmPJ8Dwva/3KgUTj6+b+liiQ45Dix1IwOGL8qq0Pbwy9DcAhyg1AI1H9x8OLA//leOEaE9P/moM0xyDonSsGxQvLpwMD8N4fP1t/t2jtyxCAQBNBOSEjmaiQkPh2xEl9NN5BdQKkZhsBVyydxZ5uIJwlarHa/fj/61Dl6SHZgkkPedQvtqAUTQYeBTHTwB6l6iV1x8LVZ63jMaJwgn6bsz4YOaEeFRKhMctSFMHY4OjheHELwcbLDDx1w1XEph4bIJAfyNR07EGEcbgjBrBjHN3KGDjtX77mOu3HUQyvHkx09ZKoDvaMe2xuHhUx1SO94kNM5EEs6CKaEl7dxEDJyBH0OmAq54VrHLQBbjgvXOCBg5nQaHeX8uWM1Do/5YacphwuvceC4sCZy1xKlIxqHaxwJa1L/VuMbRyBEOWLdDK2LC6CDE5IFUsLd4bp4OtgUQ8eFpfGvgxDRjgBc6yF0sCukLzK/HuKLA6rEx46ElSmOWzlQC4QLZj1EjIONa99RMVscYIEccQTVdAcdPoFhs29wQDs41uhl+8pI64AebKcDnSMZyCaHKIeGODVRsTaiHXqKbHTgdUSY8bJuk0PosAW+/knHKEcZ8AGzzYHX4flFFyfi6MjJj9wT6RxJTkLogDwn70xQjjMQ4zh0Z1zrSHhOQgJex9n8O6zj7x3+A1nBKwYKcQX6AAAAAElFTkSuQmCC";
  title.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAAAQAgMAAACjNp8bAAAACVBMVEUAAAAAAAD///+D3c/SAAAAAXRSTlMAQObYZgAAAJ1JREFUKM+NkDsOBDEIQ9244XRpaOZ0rjnlAvlJ28w4SoDoiRDDX4Rg0CgF5ZJ712uFjNBVA52xlwwiAsENWHVYPev2yYgkj0YCXXNIBWSEvFpZdVLAvevMTAUEAAcGB8HM6d51ZrnRt/6ib4Akn3Nb7u3AH7B/E30aasQDBJV7OxJz/owbuO4dPe3jBZI2TUfuQ+M+gdRYjuDo4zd/hyK19U1M6mMAAAAASUVORK5CYII=";
  text.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPYAAAAXAQMAAAACxCCsAAAABlBMVEUAAAC2trVtIHVQAAAA+0lEQVQoz5WQMYpCQRBEJzLyAB6jjuQx6ngdGb1YfvCPIDLhBI3sOH/3y4iwWEnRPOjuqmLXLF2ReRFF0VDJsMnyFCwxeMTFHBzgPgg0eEDol8ORAJ48XrwOr/WaPmW0zFJDa+78b/8DiQh47d/ua+N3dH7n+//Z/0dBDp724P/LTWlKaa0VQ/NbB+BQ58ABgNvUwZbfevIjBnLuYG1ZpbH/hNzIuQMqIZdSaxVWZZ07YOm8+7IsZ9ACcweGMKUwXJjvOrhgu7saOSffdAfR3dxiTr7pQSj6ABlz8k1XrOievYcp+X7/ODh1jSn5zlEfRg/nT9zb/0B+SP4DEkJSFFl1alQAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d", {alpha:false});
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");
  const buf4x = buf4c.getContext("2d");

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const blocks = [[0,0,12,5,0,81,0,5,6,3,0,85],[12,0,14,5,8,83,12,5,16,7,0,86,12,12,8,6,0,90],[28,0,16,6,18,85,28,6,18,7,12,88,28,13,24,7,0,92,28,20,14,8,0,96,28,28,6,6,0,102],[52,0,14,6,32,87,52,6,16,5,24,91,52,11,18,7,16,96,52,18,16,9,8,99,52,27,16,10,0,104],[70,0,14,7,42,89,70,7,18,7,32,93,70,14,22,7,24,98,70,21,18,8,20,104,70,29,18,11,10,108],[92,0,16,6,50,91,92,6,16,7,48,96,92,13,16,8,40,100,92,21,16,10,32,105,92,31,18,12,22,111],[110,0,14,6,64,93,110,6,16,8,56,98,110,14,16,8,48,104,110,22,16,11,42,109,110,33,18,13,32,115],[128,0,16,8,72,95,128,8,14,9,66,100,128,17,16,9,60,106,128,26,22,11,50,112,128,37,20,13,44,120],[150,0,16,8,84,97,150,8,14,10,80,102,150,18,16,12,72,108,150,30,18,12,64,116,150,42,18,14,56,124],[168,0,16,8,96,99,168,8,18,10,90,105,168,18,20,11,82,112,168,29,20,13,76,120,168,42,18,17,70,128],[188,0,12,9,112,101,188,9,16,13,104,106,188,22,18,12,98,115,188,34,22,15,90,123,188,49,20,18,84,133],[210,0,16,9,122,103,210,9,16,11,120,110,210,20,20,13,112,119,210,33,24,15,104,128,210,48,22,19,102,139],[234,0,16,10,136,106,234,10,24,13,128,113,234,23,22,13,128,123,234,36,22,18,124,132,234,54,24,23,120,144],[258,0,14,11,152,109,258,11,16,12,148,117,258,23,18,13,146,128,258,36,18,19,144,137,258,55,20,23,140,151],[278,0,14,10,166,111,278,10,18,14,162,120,278,24,20,15,162,131,278,39,20,17,160,144,278,56,20,27,160,156],[298,0,18,12,178,114,298,12,20,16,180,123,298,28,24,16,176,136,298,44,24,23,178,146,298,67,24,29,180,163],[322,0,22,15,194,116,322,15,20,16,198,127,322,31,22,19,200,140,322,50,26,24,200,153,322,74,32,29,202,171],[354,0,24,14,212,120,354,14,28,19,216,131,354,33,32,23,218,144,354,56,36,30,224,160,354,86,38,20,228,180],[392,0,30,17,232,123,392,17,34,21,238,136,392,38,40,24,244,152,392,62,46,32,252,168,392,94,26,8,262,192],[438,0,34,19,254,127,438,19,40,24,264,141,438,43,46,30,274,158,438,73,34,22,286,178],[484,0,40,21,280,132,484,21,30,22,290,146,484,43,14,19,306,166],[524,0,14,14,306,137]];

  const sc_text = "   klepkomania was brought to you by curlin! all work on this one was done by myself, like trainer installing and fixing. original was provided by styx of alpha flight.                       ?";
  const sc_len  = sc_text.length;

  const fl_col1 = new Uint8Array([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,4,2,7,1,1,7,3,5,4,2]);
  const fl_col2 = new Uint8Array([2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,4,5,3,7,1,1,7,2,4,3]);

  const dc_rand = [182,96,278,8];

  let sc_off = 0;;
  let sc_pos = 0;
  let sc_buf = null;

  let fl_ctr = 102;
  let fl_pos = 0;

  let dc_pos = 0;
  let dc_ctr = 0;

  let afid = 0;

  setTimeout(initialize, 100);
}