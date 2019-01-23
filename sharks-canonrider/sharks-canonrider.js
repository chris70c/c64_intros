/*
  Canon Rider Crack
  The Sharks (1988)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    canvx.fillRect(0,0,384,272);
    canvx.fillStyle = "#fff";
    canvx.fillRect(38,268,2,4);
    canvx.fillStyle = "#62d8cc";
    canvx.fillRect(40,268,24,4);
    canvx.fillStyle = "#4ac64a";
    canvx.fillRect(64,268,3,4);
    canvx.fillStyle = "#000";

    buf1c.width  = 242;
    buf1c.height = 80;
    buf1x.imageSmoothingEnabled = false;

    buf1x.drawImage(logo1, 0,0);
    buf1x.globalCompositeOperation = "source-atop";

    buf2c.width  = 29;
    buf2c.height = 282;
    buf2x.imageSmoothingEnabled = false;

    buf2x.fillStyle = "#fff";
    buf2x.fillRect(0,0,2,282);
    buf2x.fillStyle = "#62d8cc";
    buf2x.fillRect(2,0,24,282);
    buf2x.fillStyle = "#4ac64a";
    buf2x.fillRect(26,0,3,282);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    canvx.fillRect(0,0,384,268);

    /* raster bars */
    if (b1dir < 0) { updateb1(); }
    if (b2dir < 0) { updateb2(); }
    if (b3dir < 0) { updateb3(); }

    if (b1dir > 0) { updateb1(); }
    if (b2dir > 0) { updateb2(); }
    if (b3dir > 0) { updateb3(); }

    if (b1dir > 0) {
      if (b3dir < 0) { canvx.drawImage(raster, 2,16,1,8, 0,b3pos,384,8); }
      if (b2dir < 0) { canvx.drawImage(raster, 2, 8,1,8, 0,b2pos,384,8); }
      if (b1dir < 0) { canvx.drawImage(raster, 2, 0,1,8, 0,b1pos,384,8); }
    } else {
      if (b1dir < 0) { canvx.drawImage(raster, 2, 0,1,8, 0,b1pos,384,8); }
      if (b2dir < 0) { canvx.drawImage(raster, 2, 8,1,8, 0,b2pos,384,8); }
      if (b3dir < 0) { canvx.drawImage(raster, 2,16,1,8, 0,b3pos,384,8); }
    }

    canvx.drawImage(raster, 0,0,1,46, 0,72,384,46);

    if (b1dir < 0) {
      if (b3dir > 0) { canvx.drawImage(raster, 2,16,1,8, 0,b3pos,384,8); }
      if (b2dir > 0) { canvx.drawImage(raster, 2, 8,1,8, 0,b2pos,384,8); }
      if (b1dir > 0) { canvx.drawImage(raster, 2, 0,1,8, 0,b1pos,384,8); }
    } else {
      if (b1dir > 0) { canvx.drawImage(raster, 2, 0,1,8, 0,b1pos,384,8); }
      if (b2dir > 0) { canvx.drawImage(raster, 2, 8,1,8, 0,b2pos,384,8); }
      if (b3dir > 0) { canvx.drawImage(raster, 2,16,1,8, 0,b3pos,384,8); }
    }

    buf1x.drawImage(canvc, 0,56,242,80, 0,0,242,80);

    /* inner logo raster bar */
    if (rs_slp == 0) {
      buf1x.drawImage(raster, 1,0,1,26, 0,rs_pos,242,26);

      if (--rs_pos == -26) {
        rs_pos = 80;
        rs_slp = 54;
      }
    } else {
      rs_slp--;
    }

    /* bouncing sprite */
    sp_idx = (sp_idx + sp_dir) & 255;

    if (sp_idx == 0) {
      sp_dir = 1;
    } else if (sp_idx == 48) {
      sp_dir = -1;
    }

    canvx.drawImage(sprite, 109,120 + coords[sp_idx]);

    /* scroll text */
    if (++sc_pos == 8) {
      sc_pos = 0;

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, 0,0,29,275, 0,8,29,275);
      buf2x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_idx);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      buf2x.fillStyle = "#fff";
      buf2x.fillRect(0,0,2,8);
      buf2x.fillStyle = "#62d8cc";
      buf2x.fillRect(2,0,24,8);
      buf2x.fillStyle = "#4ac64a";
      buf2x.fillRect(26,0,3,8);

      buf2x.globalCompositeOperation = "xor";
      buf2x.drawImage(font, cx,0,8,8, 10,0,8,8);

      if (++sc_idx == sc_len) {
        sc_idx = 0;
      }
    }

    canvx.drawImage(buf2c, 0,(7 - sc_pos) + 8,29,267, 38,1,29,267);

    /* overlay logo */
    canvx.drawImage(buf1c, 80,51);
    canvx.drawImage(logo2, 80,51);

    player.run();
    requestAnimationFrame(draw);
  }

  function updateb1() {
    b1idx = (b1idx + b1dir) & 255;

    if (b1idx == 0) {
      b1dir = 1;
    } else if (b1idx == 111) {
      b1dir = -1;
    }

    b1pos = coords[b1idx];
  }

  function updateb2() {
    b2idx = (b2idx + b2dir) & 255;

    if (b2idx == 0) {
      b2dir = 1;
    } else if (b2idx == 111) {
      b2dir = -1;
    }

    b2pos = coords[b2idx];
  }

  function updateb3() {
    b3idx = (b3idx + b3dir) & 255;

    if (b3idx == 0) {
      b3dir = 1;
    } else if (b3idx == 111) {
      b3dir = -1;
    }

    b3pos = coords[b3idx];
  }

  const logo1  = new Image();
  const logo2  = new Image();
  const font   = new Image();
  const raster = new Image();
  const sprite = new Image();

  logo1.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPIAAABQAQMAAAAZcroCAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAV9JREFUSMfd1kFqAzEMBVCDtwVdJQco6Oq+wVzF0K3Brb48Flb6SbbtLD6SHqWF/gkpr55Gw73TcB803CcP98YD3nnAxz6MvMLnPsy8urd9aGl17/vQ0+o+7PCBKa/waQfBlFf3ZoeGKa/wboeOKa/wYYeBKa/wWbTLT2A61r/gX/uA6VjN+z5gOla47oMiYoVjJgGvzKt7YV6WK3N1F+biXpnXu+Y67JDi7j/CDjmWN4vLDimi//5PShH9J373P3k0NfofHiWP/p/eQEf/D8dtQfn1r4KsfslN+efFvTKv7uXJ71d3uTJXd8l+v9riXtH6CHMLgD3e+ohRpoUBPsa99RHmaq7mvZDqP4qYD+af7pO5Lm/MDd54/wbz4T6Zz+UX88t9Mp//wZV79F+65Dj6X7vkOPpfuuQ4+l8e8hzRf2SK6D/x6D/xslyJAwhF2O+h8d5XHKXhLjTcK4+XzzfnEUgJpiYmggAAAABJRU5ErkJggg==";
  logo2.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQsAAABoAgMAAACbLD2BAAAADFBMVEUAAAC2trX///9KxkrqQotHAAAAAXRSTlMAQObYZgAAAb1JREFUWMPtlk1qAkEQhRtDNoOQa0hWAQ/gFXrjhVx6isJV6FPMAQa8iuBWMCXd+DRvmErNxAihi0Ee9fPVc0bsCSlJyOFViCalkQox1si5DW+HiUa6/WH+Mj+v9sfTaCNdF5TRfsyX440UxqpbfluwXkde2l9tMyMoAwvQhdxAte0Ob8dTq/cDq9CFnF3VABZdyJlVBLDaReupahjRLlpPVcOIdtF6qhpGtIvWU9Uwol20nqqGEe3i9XZVAw9OP7JCbrhaGY9kROpCzqjCAnUhZ1TBiNSFnFHNgZpHMSO6GfEfM1KSnFEVfqAwcfffUTKNClthovfoL12GMt5BcpehjHeQ3GWqfiMehmGkf/L18lihLCPM4JRhhAfYhmGEGZwxzhdWZIMmbAZnnsPge/okBqcMRuxTRUD1v8wOnirlK1zV3QR+KoOnSsyMq7qbgBHfqXIzASNOxu0EjPgYtxMw4mRg4hpuBiZgxMvABMLNwASMeBmYQLgZoTIqozKmM2xVGZXx54waNWrUeFQkKaKZwPh8TyVkLEMWv+JjI5drCkOkWei1245nSJBGTchURphtw0TGTNJMdhvjsXwB1dHngaiggRMAAAAASUVORK5CYII=";
  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAVVJREFUKM9t0bFqAkEQBuCRBW0kXGkh2EhyZcorBANpfADLEFJZiQgG0sgemi6PkKdZGNAmnEWagyn2IEXKHKQJ3LF/btW7NPkXFoaFj9kZAjVp1XeTcnB6Nspf9G+A2UyzuQebZ4VYL+OnhFyJfcZnIJtMUiYie6Q0rWbdJMkWmmgbBg8E4BOcWrDbqRj4cbGN4dxX/lED7s4DIxtQQBmowNjaHPBAlBPehFnS9x4wV9eGU04FqtNfD75PQEFumnK20eKBJSuRsQhEhpe7cP5aA9wDR6p3AoxSUTSQGpi4CuC9rNtBO2KIdEVsBVzNw93LH8DcqzswvoP80Hxhapn0RtadoN0/AwcRakXh1hBgq1OFO0B8rArjZ5DtG+DRWhpREbQCusCtlbKAQUEUhNsbQmy11bEGteEAXVUr47dA7IGSiCZD4zdQ+Bl0NCVcrrRZrOiYX1V//FB4nllGAAAAAElFTkSuQmCC";
  raster.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAuBAMAAAAfNL5kAAAALVBMVEUAAAD///9i2My2trWm+p6EhIRNTU1KxkpwfOY3OcTqdGzk7U6vKim2WRxoOAg8t33CAAAAAXRSTlMAQObYZgAAAGtJREFUCNc9iL0JgDAYBa+z/RQHsLNVcABHEHEAEcHWzjYjZITgBOlsUziBIziJ+QHhOO49Nk2mWCo2YZQQk2LUdDtTRdvTCbmEKP30p2M1vJZbeITTchkKRw0HKNAwwwANyO/IkByZkyMEf1J8F08CAPT3AAAAAElFTkSuQmCC";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAAAVAQMAAAAq4XPYAAAABlBMVEWEhIQAAAAGG9g/AAAAqUlEQVQoz7WQvQlDMQyEr/IMHuMNKDSbIHBVBsgYKV0cIpYD7ydFUuXDGMSHJPvwA3OZMFw++kVkgfR5XwULtN6inYSEKKHsHNmr3omsDk2hj1FLsDOIC0nmFHM5rx1GWgn5FH/AhhtdMEEGc5gdcdwzcT4LNvIRDZUJwQC5/zqeg1W7gdpHhTLGWyhBP0YxeY8lghvbRp7iqJ1E5rbOEcetnrt22NrxhRe6C54MZm417wAAAABJRU5ErkJggg==";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");

  const sc_text = " ...yeah here we are again on your screen...with another crappy game called 'canon rider' it was broken by the sharks(mcl) and shining 8 on 28th of may at 5.35 am (on our copy party)...hope it will be great.......ok now it's greetings time in a-z order to:2000 ad,7 up,acc,aek,a team,b art,bb,byterapers,cfr,ddl,destiny,devils,dexion,dominators,edt,fairlight,fusion,hotline,ikari,inxs,mad squad,mcg,mechanix,music,network,new age,omega,orion,papillons,pentacle,powerrun,promise,pulsar,razor express,science 451,tg 1541,tlc,tlf,tlg,transcom,triangle(uk.,triumph,tronix,tsk,twg,wod,wot,zenith....urgh...only a special hi to :shining(cool guys)!!!!...........ok now we will give you another chance to contact us write to:...tsa/sharks...plk 038940 b...6806 viernheim....west germany...only for the hotest c64 and amiga stuff.....laid'her......                                       ";
  const sc_len  = sc_text.length;

  const coords = [52,52,52,52,52,53,53,53,53,53,54,54,54,55,55,55,56,56,57,57,57,58,58,59,60,60,61,61,62,63,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,119,120,120,121,122,122,123,123,123,124,124,125,125,125,126,126,126,127,127,127,127,127,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,128,50,50];

  let b1idx = 0;
  let b2idx = 24;
  let b3idx = 48;

  let b1dir = 1;
  let b2dir = 1;
  let b3dir = 1;

  let b1pos = 0;
  let b2pos = 0;
  let b3pos = 0;

  let sc_idx = 0;
  let sc_pos = 1;

  let sp_idx = 2;
  let sp_dir = 1;

  let rs_pos = 80;
  let rs_slp = 142;

  setTimeout(initialize, 100);
}