/*
  North Sea Inferno Crack
  Alpha Flight (1990)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;
    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf1c.width  = 320;
    buf1c.height = 16;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 41;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf2x.drawImage(sprite, 0,0);
    buf2x.globalCompositeOperation = "source-atop";
    buf2x.fillStyle = c64[0];
    buf2x.fillRect(0,0,41,8);

    buf3c.width  = 208;
    buf3c.height = 12;
    buf3x.imageSmoothingEnabled = false;

    buf3x.drawImage(title, 0,0);
    buf3x.globalCompositeOperation = "source-atop";

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", fx);

    player.play();
  }

  function fx() {
    let delta = context.currentTime - player.playing;

    player.run();

    if (delta > 6.6) {
      requestAnimationFrame(draw);
    } else {
      requestAnimationFrame(fx);
    }
  }

  function draw() {
    canvx.fillRect(0,0,384,272);
    canvx.drawImage(logo, 90,74);

    /* scroll bars */
    let v = bar_pos[tb_pos];
    let p = (v >> 3) * 8;
    tb_xpos = (v ^ 255) & 7;
    let x = (7 - tb_xpos) + p;

    canvx.drawImage(bar, x,0,304,32, 39,43,304,32);
    if (++tb_pos == 254) { tb_pos = 0; }

    v = bar_pos[bb_pos];
    p = (v >> 3) * 8;
    bb_xpos = (v ^ 255) & 7;
    x = (7 - bb_xpos) + p;

    canvx.drawImage(bar, x,0,304,32, 29,147,304,32);
    if (++bb_pos == 254) { bb_pos = 0; }

    /* sprite fade in/out */
    spr_pos = (++spr_pos) & 255;

    p = spr_loop[spr_pos];

    buf2x.fillStyle = c64[p];
    buf2x.fillRect(0,0,41,8);

    canvx.drawImage(buf2c, 40,35);

    /* title raster colors */
    p = 4;

    for (let i = 0; i < 12; i++) {
      let c = palette[p++];
      buf3x.fillStyle = c64[c];

      if (i != 6) {
        buf3x.fillRect(0,i,208,1);
      } else {
        buf3x.fillRect(0,i++,208,2);
      }
    }

    canvx.drawImage(buf3c, 88,197);

    if (pal1_pos < 32) {
      pal2_pos++;
    } else {
      pal2_pos--;
    }

    p = pal2_pos;

    for (let i = 2; i < 10; i++) {
      palette[i] = colors[p++];
    }

    if (++pal1_pos == 64) { pal1_pos = 0; }

    p = 0;

    for (let i = 18; i > 9; i--) {
      palette[i] = palette[p++];
    }

    palette[10] = palette[9];

    /* scroll text */
    print();
    canvx.drawImage(buf1c, (7 - sc_xpos),0,304,16, 39,219,304,16);

    player.run();
    requestAnimationFrame(draw);
  }

  function print() {
    let scr = 0;
    let chr = 0;

    do {
      sc_xseed = (--sc_xseed) & 255;
      sc_xpos = sc_xseed & 7;

      if (sc_xpos == 7) {
        buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);

        chr = sc_text.charCodeAt(sc_pos);

        let cx = 0;
        let cy = 0;

        if (chr >= 96) {
          cx = (chr - 96) * 8;
        } else {
          cx = (chr - 32) * 8;
          cy = 16;
        }

        buf1x.drawImage(font, cx,cy,8,16, 312,0,8,16);

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }
      }
    } while (++scr != sc_speed);

    if (chr > 0xb0) {
      sc_speed = chr & 15;
      buf1x.clearRect(312,0,8,16);
    }
  }

  const logo   = new Image();
  const font   = new Image();
  const bar    = new Image();
  const sprite = new Image();
  const title  = new Image();

  logo.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANoAAABEAgMAAACaH8N7AAAADFBMVEUAAAA3OcSwP7a2trUUjIi4AAADo0lEQVRIx82WPZbkIAyElZCQ+GokJCRzNRISEl3NSSckbJWE+2ef3W+80fKmxxjpU0nCuFuOscvJuDb+h1z4Zty2aw7Gb1w+po+/TF+DhiDJ3ZIcYFhcCNflpZTNGlLIh/SOulKej5QuC0w2DEvAkgm5zkbjFVdhoxsxkRxWDlWCcfWcYmhQRD0yBWIQW4u0XXBuA5XYjGDcRvkWbMQLzoxe5bo1PS/7Wo/xiViyPrGSXcyMV20x/8xkZekSJ+/zr9vA6CWl1uhYk4t94Rh2dbSkHEsB4kzx5RAuuMOPYughP6EYmAnmK8570OA3cguxsCmtoGJGSPlCjyoFTIGTdnjroBLuakFxHbZ0ymUgdIdnJzK1yU9/hDDUA1xwpZjCAIcJ4SZl+l366RQ8La/2ossL7hIUjPYVqY9y3lACZT45Ss3mCfvqT2u/4AbaQr0XhyafcTR/uulHIM/5jNM3rk/VOZrP12Kv59xwzhuKLGdPn3rjhHuZFzxmz5x+smccW64vbmT5i9NTrj9zPB6W3+i5+cMx+xb61h/GX3AplMn9sKUbnHdHXxyVT9tptOQXDAyFvhnDNZf7fHL6yekJ1w8O2BuHTL/prTV77oe6BMvT+doBx0+eMgmJHESMo3s5OMnnXIYGsMwz0OeTw8W5LPmdi0d5pSRgpf+gwKOh+nZoO0B5FagHF2oCphNcDn9zvSOJ/N5QrYtrTYhN1CnOPVp/P8UEw/PIb7uB0GrERl8ijJJ+iCxpVYBh2NGN+Bu7c/YWHK21oi6Cazk4BTdUO15N5DRWmbL0SKAluRV7Losip9dLIvfW+ZAn43RsVmC0LyGMkIQigT6Nk6BkZ5Jcch+NayhuaN/24yuMbtgLOISAllCXwRrvUpYcLRW6xn3b4zj0khCjhd1t3dZyQ5SSk4GIaBIyQU2pUhNFifG/62S48kqWuwYwFa7VLgpK+y47OcMYDyRE4CicMAp0DJRgJ6Buu9Y4K/N0bP22c9/nnFcHU93S1kdkol0EggsT5hxMDUzFqsNiYIx7DEiz6tq/LaSYjpORc0Qdfc9bDDkHfBYnP33IY1o/VVyFmM98X5pEqUzP1pdR97k9tAoTFResskYcUzubwlRy6xG3Zdlm1Tg2UCju9yPOgfgTgVRuYez80Kpjqzc4HZOp4hHD/t3gph1WjXOXeI+TsaNABXSHU1Qo0Bw13qovCg8r07zVT5LsR2RT73HPflS5OYy7P/QfufmZ4B9DRSUuI0AaLAAAAABJRU5ErkJggg==";
  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAgBAMAAAAPh7vXAAAAGFBMVEUAAAD////k7U7qdGy2WRy2trWvKiloOAj/NgOwAAACdElEQVRYw+1WMZKrMAwVCUna5QZ/OAEzXICCA9C4T0Wdjuv/J2H5YYyLbXciWdbTe9JsZjO7lnxN7bV9ZENYttgsrIbrEUPgPiJgLTjHbLP0NKV81dZ1rQccB7bj5xvoabg+Q09TyldtLhwceQB2tRPQDDQhLtwOnVMthJqNycUzA46TlPsANACNiNy97chw6g6hZiG5pMwIBgw9gjwWoIhLt7aSX8Kig1Xr+/4fjuAgIrboEVGQrIeOHs70Kmb6DfUt8lXruu4HId2PIOAACOcBIEjWQzd515q9yPRm5zEkdWO7CDN5AHaRZ010+gCcbzqpG39hIszktWBFxJoIh3rP+RvUqoXl7MqRFzvUit4Qit7HEsCTw6nbOMDHUwwimg3hOPZMLAeNvfdxBMznpWbzBJ9naRGzhTJitSEcx6q5G2d9baqV8DzLzhuecX3ta1XbcD7bx8vX5wWsHPAWQW7shKbzyBqA3CU8a1wZ+RXnvb5deL6fwMohoOl1afGdf67cKWp7wpWRn0XaqZ2ASIhyjnCXxh3hvANEBQKZ0pznG04b/SayNJSbBPcFrzl3B3YfLsbTzww5zbcbEm+k5dzHfeERNLhPxH7uBOW4zcDKt/qGmhLvntn7/LFRjGwaIu0Gt8jJhUFM73EudAhKvDtm70vPtUVnWnPYI4BF68oe8IsPUOnjB/AGbgiN63aX440T/Ar4DRRfQaUvvfe9N3BDAGeId/ENXFq2P4aFNxH74ntPjDt5YOX9tYXg/MdFDE0vtjJr13EHMCz5TkFe+3Pjpp4/1dk/jla1+VBPHAHLt3+O+4Ds2XcFx6WpJr+3Vf6Y/Qf5+CCgNcO1EgAAAABJRU5ErkJggg==";
  bar.src    = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAAgAgMAAAD/ICF3AAAADFBMVEUAAABDFr9+xVLB+qBnLpUqAAAA3UlEQVRYw+3UIY7EMAyF4UdMSno1E5OcbkiISU83pGT3JZ7M7ErV4rdSP2LrR1WUBv+HBblYwcd+ZmaYaxV8nPQETKy87Qc5FxcryxedIBMriDJP1OaqVADkdAyek1IZZ1mSvFalAuCYsrUWe+1KpX5nevbeH1vtSuV9B4OQRakA6EM6oRelAqANYWbYWlEq6x18OFkUpQLABgz2olQ4nGIGf1EqKJyLZhH7nN9F6MJdFE6hC3dROHWelKuCaT6Li4sV2oKwmFihbK39CK5Wzk7si4mVHDh1y+12+9M3M7G96SRcziwAAAAASUVORK5CYII=";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAIAQMAAABeXkQmAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAADZJREFUCNdjOPP58ZnzDAx/Z5vl3GwAUTw3GBjO/n7Gcx5IAXkHGxje3t7OdxdM5YGpzcf7GQAs1Bz8e7ELvgAAAABJRU5ErkJggg==";
  title.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANAAAAAMAQMAAAAplqFjAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAKBJREFUGNOFzbENQyEMBFBPkFkoGY0C/QkYigE8AgUDoKtdnFCOr69EqYLE6exX2CJY2FislaBbUUuNjFaM5zlp+iKqpbtq4937Sm7LXanJ0urdlx/qnakbb+qHqORDQzS+NJTDjREMZBoQeWvclhERgAku0SWi6HqIoon5msgvETJMXTQn/hJEeAg/tPeGrmAfUj+0gX2oalkN9VD9UH0DiBPWbemA6/0AAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const sc_text = "\xb2          hello everybody and welcome to another first release of alpha flight !!! north sean inferno from magic bytes was cracked by alpha flight on 28/02/90 ! greetings to exodus,inc,atc,nec...  cosmos,censor,crazy,light,illusion,ikari+talent,gp,byg,dom,f4cg,flt+nato,x-ray+success,legend (in no order) and all the rest ! buy our first release originals !!!    later on !!! alpha flight in 1970 !!!                                        ";
  const sc_len  = sc_text.length;

  const c64      = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const colors   = [6,14,4,10,8,7,1,7,8,10,4,14,6,0,0,0,9,2,8,10,15,7,1,7,15,10,8,2,9,0,0,0,0,0,0,0,0,0,0,0,0];
  const palette  = [0,0,8,2,9,0,0,0,0,0,0,0,0,0,9,2,8,0,0];
  const bar_pos  = [105,109,114,119,123,128,132,137,141,145,150,154,158,161,165,169,172,175,178,181,184,186,189,191,193,194,196,197,198,199,199,199,199,199,199,198,197,196,195,193,192,190,188,185,183,180,177,174,170,167,163,160,156,152,148,143,139,135,130,125,121,116,112,107,102,97,93,88,84,79,74,70,66,61,57,53,49,46,42,39,35,32,29,26,24,21,19,17,16,14,13,12,11,10,10,10,10,10,10,11,12,13,15,16,18,20,23,25,28,31,34,37,40,44,48,51,55,59,64,68,72,77,81,86,90,95,100,105,109,114,119,123,128,132,137,141,145,150,154,158,161,165,169,172,175,178,181,184,186,189,191,193,194,196,197,198,199,199,199,199,199,199,198,197,196,195,193,192,190,188,185,183,180,177,174,170,167,163,160,156,152,148,143,139,135,130,125,121,116,112,107,102,97,93,88,84,79,74,70,66,61,57,53,49,46,42,39,35,32,29,26,24,21,19,17,16,14,13,12,11,10,10,10,10,10,10,11,12,13,15,16,18,20,23,25,28,31,34,37,40,44,48,51,55,59,64,68,72,77,81,86,90,95,100,100,100];
  const spr_loop = [9,9,9,2,2,2,8,8,8,10,10,15,15,7,7,1,1,7,7,15,15,10,10,8,8,8,2,2,2,9,9,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  let sc_pos   = 0;
  let sc_speed = 2;
  let sc_xseed = 170;
  let sc_xpos  = 0;

  let tb_pos  = 16;
  let tb_xpos = 5;
  let bb_pos  = 0;
  let bb_xpos = 4;

  let spr_pos = 113;

  let pal1_pos = 0;
  let pal2_pos = 0;

  let context = window.neoart.audioContext;

  setTimeout(initialize, 100);
}