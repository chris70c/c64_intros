/*
  TEM+ Preview Crack
  Silicon Limited (1990)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 328;
    buf1c.height = 80;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 152;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 152;
    buf3c.height = 8;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 320;
    buf4c.height = 80;
    buf4x.imageSmoothingEnabled = false;

    buf5c.width  = 320;
    buf5c.height = 80;
    buf5x.imageSmoothingEnabled = false;

    buf6c.width  = 320;
    buf6c.height = 40;
    buf6x.imageSmoothingEnabled = false;

    setup();

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function setup() {
    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    // print title text;
    for (let i = 0, x = 0; i < 19; i++, x += 8) {
      let cx1 = text1.charCodeAt(i) + 52;
      let cx2 = text2.charCodeAt(i) + 52;

      if (cx1 >= 148) { cx1 -= 96; }
      if (cx2 >= 148) { cx2 -= 96; }

      cx1 *= 8;
      cx2 *= 8;

      buf2x.drawImage(font2, cx1,0,8,8, x,0,8,8);
      buf3x.drawImage(font2, cx2,0,8,8, x,0,8,8);
    }

    // create stars and title colors
    updateStars();
    updateColors();

    let y  = 0;
    let r1 = 0;
    let r2 = 2;
    let r3 = 4;
    let r4 = 1;
    let r5 = 3;

    for (let x = 0; x < 320; x += 8) {
      buf4x.fillStyle = c64[stars[r1++]];
      buf4x.fillRect(x,y,8,8);
      buf4x.fillRect(x,48 + y,8,8);
      y += 8;

      buf4x.fillStyle = c64[stars[r2++]];
      buf4x.fillRect(x,y,8,8);
      buf4x.fillRect(x,32 + y,8,8);
      buf4x.fillRect(x,48 + y,8,8);
      y += 8;

      buf4x.fillStyle = c64[stars[r3++]];
      buf4x.fillRect(x,y,8,8);
      buf4x.fillRect(x,48 + y,8,8);
      y += 8;

      buf4x.fillStyle = c64[stars[r4++]];
      buf4x.fillRect(x,y,8,8);
      buf4x.fillRect(x,48 + y,8,8);
      y += 8;

      buf4x.fillStyle = c64[stars[r5++]];
      buf4x.fillRect(x,y,8,8);
      y = 0;
    }

    canvx.drawImage(logo, 52,163);
  }

  function updateStars() {
    let carry = 0;
    let b;
    let i;

    const rol = (val) => {
      let c = val & 0x80;
      val = (val << 1) & 255;
      if (carry) { val |= 1; }
      carry = c;
      return val;
    }

    gfx[408] = gfx[0];

    for (i = 408; i >= 0; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[410] = gfx[2];

    for (i = 410; i >= 2; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[410] = gfx[2];

    for (i = 410; i >= 2; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[412] = gfx[4];

    for (i = 412; i >= 4; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[412] = gfx[4];

    for (i = 412; i >= 4; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[412] = gfx[4];

    for (i = 412; i >= 4; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[414] = gfx[6];

    for (i = 414; i >= 6; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[409] = gfx[1];

    for (i = 409; i >= 1; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[409] = gfx[1];

    for (i = 409; i >= 1; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }

    gfx[409] = gfx[1];

    for (i = 409; i >= 1; i -= 8) {
      b = gfx[i];
      gfx[i] = rol(b);
    }
  }

  function updateColors() {
    let y  = 0;
    let r1 = 0;
    let r2 = 24;
    let r3 = 8;
    let r4 = 48;
    let r5 = 72;

    buf1x.clearRect(0,0,320,80);
    buf1x.fillStyle = "#fff";

    for (let i = 0, x = 0; i < 40; i++, x += 8) {
      drawChar(r1, x,y);
      y += 8;
      drawChar(r2, x,y);
      y += 8;
      drawChar(r3, x,y);
      y += 8;
      drawChar(r4, x,y);
      y += 8;
      drawChar(r5, x,y);
      y = 0;

      r1 += 8;
      r2 += 8;
      r3 += 8;
      r4 += 8;
      r5 += 8;
    }

    buf1x.drawImage(buf1c, 0,0,320,40, 0,40,320,40);
    buf1x.clearRect(232,48,8,8);
    drawChar(128, 232,48);

    updateStars();
  }

  function drawChar(idx, dx, dy) {
    let y = dy;

    for (let i = 0; i < 8; i++) {
      let b = gfx[idx + i].toString(2).padStart(8, "0");

      for (let x = 0; x < 8; x++) {
        if (b.charAt(x) == "1") {
          buf1x.fillRect(dx + x, y, 1, 1);
        }
      }

      y++;
    }
  }

  function draw() {
    canvx.fillRect(32,35,320,128);
    canvx.fillRect(0,242,384,30);

    // draw starts/title
    buf5x.globalCompositeOperation = "copy";
    buf5x.drawImage(buf1c, 0,0);

    buf5x.globalCompositeOperation = "source-over";
    buf5x.clearRect(88,32,152,8);
    buf5x.clearRect(96,48,136,8);
    buf5x.clearRect(240,48,8,8);

    buf5x.drawImage(buf2c, 88,32);
    buf5x.drawImage(buf3c, 96,48);

    buf5x.globalCompositeOperation = "source-atop";
    buf5x.drawImage(buf4c, 0,0);

    canvx.drawImage(buf5c, 32,35);

    // update stars/title
    updateColors();

    if (--sf_wait == 0) {
      sf_wait = 2;

      if (++sf_pos2 == 14) {
        sf_pos2 = 0;
      }

      buf4x.drawImage(buf4c, 88,32,144,8, 96,32,144,8);
      buf4x.fillStyle = c64[title[sf_pos2]];
      buf4x.fillRect(88,32,8,8);

      if (--sf_pos3 == 0) {
        sf_pos3 = 14;
      }

      buf4x.drawImage(buf4c, 96,48,144,8, 88,48,144,8);
      buf4x.fillStyle = c64[title[sf_pos3]];
      buf4x.fillRect(224,48,8,8);
    }

    let v = spr_y.shift();
    spr_y[81] = spr_y[0];

    let x = spr_x[72 + spr_pos] + 41;
    let y = spr_y[60] + 47;
    canvx.drawImage(sprite, 0,0,24,17, x,y,24,17);

    x = spr_x[60 + spr_pos] + 45;
    y = spr_y[50] + 47;
    canvx.drawImage(sprite, 24,0,14,17, x,y,14,17);

    x = spr_x[48 + spr_pos] + 49;
    y = spr_y[40] + 47;
    canvx.drawImage(sprite, 48,0,24,17, x,y,24,17);

    x = spr_x[36 + spr_pos] + 53;
    y = spr_y[30] + 47;
    canvx.drawImage(sprite, 24,0,14,17, x,y,14,17);

    x = spr_x[24 + spr_pos] + 57;
    y = spr_y[20] + 47;
    canvx.drawImage(sprite, 72,0,24,17, x,y,24,17);

    x = spr_x[12 + spr_pos] + 61;
    y = spr_y[10] + 47;
    canvx.drawImage(sprite, 96,0,24,17, x,y,24,17);

    x = spr_x[spr_pos] + 65;
    y = spr_y[0] + 47;
    canvx.drawImage(sprite, 120,0,24,17, x,y,24,17);

    v = spr_y.shift();
    spr_y[81] = spr_y[0];

    spr_pos += 2;
    if (spr_pos == 254) { spr_pos = 0; }

    // scroll text
    sc_pos -= 3;

    if (sc_pos < 0) {
      sc_pos = 6;

      buf6x.drawImage(buf6c, 8,0,312,40, 0,0,312,40);

      let cx = sc_text.charCodeAt(sc_idx);
      if (cx >= 96) { cx -= 96; } else { cx -= 5; }
      cx *= 40;
      cx += (tx_step * 8);

      if (tx_step++ == 4) {
        tx_step = 0;

        if (++sc_idx == sc_len) {
          sc_idx = 0;
        }
      }

      buf6x.drawImage(font1, cx,0,8,40, 312,0,8,40);
    }

    canvx.drawImage(buf6c, (7-sc_pos),0,312,40, 29,115,312,40);

    // draw bottom sprites
    x = bot_x[bot_pos] + 8;
    canvx.drawImage(sprite, 0,0,24,17, x,242,24,17);

    x = bot_x[bot_pos] + 32;
    canvx.drawImage(sprite, 24,0,14,17, x,242,14,17);

    x = bot_x[bot_pos] + 46;
    canvx.drawImage(sprite, 48,0,24,17, x,242,24,17);

    x = bot_x[bot_pos] + 70;
    canvx.drawImage(sprite, 24,0,14,17, x,242,14,17);

    x = bot_x[bot_pos] + 84;
    canvx.drawImage(sprite, 72,0,24,17, x,242,24,17);

    x = bot_x[bot_pos] + 108;
    canvx.drawImage(sprite, 96,0,24,17, x,242,24,17);

    x = bot_x[bot_pos] + 132;
    canvx.drawImage(sprite, 120,0,24,17, x,242,24,17);

    bot_pos += 2;
    if (bot_pos >= 206) { bot_pos = 0; }

    player.run();
    requestAnimationFrame(draw);
  }

  const logo   = new Image();
  const font1  = new Image();
  const font2  = new Image();
  const sprite = new Image();

  logo.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAABIBAMAAAC+QdW+AAAAHlBMVEUAAAC2trVwfOY3OcTqdGxoOAjk7U62WRxi2Mz////YPipRAAACUUlEQVRo3u2YjU0FIRCEtwVauBZo4Vq4Fl4LtGALr1v3/cAMQbLcgbomzib6ObeLc4CaKE9tkeptwamYxH5vndM+pJ6g3t+DPGYS+711zvtI1Rbcplj2hJz28cqtartiEvu9dU76UPyqLhwiT1/2ve8WnrJOxzLWGfazPjq/CD46TOr2bNf99o3HGGJ/GWch6BhD7K9i4yAuHuI8Y+msOMQk9lex+0N0uVtuY+WKQ0xifw373y1EHWIS+6u4PogNm2kwif1FjN1SacZNPw4xif1ljIN4skYdYhL7yxhvXCz8EdjIr5nFvr3OEON+vDF/bv1lPTYjlmRlq/G/o8eaPaShxl/WY/N/rP9Y3x0rHZKLxP7CHpud79aBSq9ivy1oqseaTc2TlBwconqtKrtiaKrHnkVU1O8fIqKyfn+3JLk8RBH9MtWlj3sMTfXYs7gBvnaraEfsLpNmeuxZyN0h5jfLOrpMOt9j8x86RLe75TPWnnJ1mXS+x+a/tFsl9NFl0kyPPQsFPO8yaabHnoX2otRl0kyPNRsgCanErjkQF13osbnEQlIX7D1WruSCfe/WrURNkkmLOP0oS3yINnAnDuz/KEt8/nv+hh9mF6y7tUWNhaguWHOFKC52qLDrWPER6xZyuWCJKo9X/v2TmGt3wRpLS+7w7sTsn+6ZmNVYIYRHrK+kreDzPVdnX7Eed4ujcmhwmOkZmgWXK4+opMB2mOkZmWV+3S2XsbYtYq67WpjpsWfbu6UlqhDqoSD12ExP17dj6SDrZd1hzPSMzILLlf8EVYaHDwZcHfIAAAAASUVORK5CYII=";
  font1.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABSgAAAAoBAMAAAAPhwkcAAAAFVBMVEUAAAC2WRxoOAg3OcTqdGxwfOZi2Mw5zl1vAAAFeElEQVR42u1aiXEbMQy8Fq4FtsAW1AJbcP8lJDIjQNGCeGWONXPLibO3BLAgKfNmbB9L9AdeHlmTJrxxbk1nEuK5JDFlwhmhfanvH2vbGD+G4FgWQ7Tw+Q6en6GvRSBu6t44t9ZVJqH7cuMZsX2p7x9rGxj05wfsqblenFd9Ofd5TAU0VL1xfm0oTO/dYpghr6OT5tqX+v6hto/xcMO3p6ASNN2o2GGIp+mNU7TIEODNjWck9sWO+73DDcxxrfcJLt/R/8eUQEPRG+fXhsL05i2GGQxJc+5Lff9Q28HA1g/cU3u9UMH0/Rr9Pu6Y7J6GGscd/ZhfvHFubVAViSF41mKYwUPSvPtS3L/7F3sP3s+m33N/buCeQj1Yb4dXs+H7RS5eRkjEETL1EJWeB8Sxwtr72XIJ9LivA9BMxM/DUwWnJ7qbERJxhEw9RKXnjnEksfZ+tlwCPe7rADQTifOwq+D015jDzQiJOEKmHqLe8362XMK2/kRzJxLnAbB9H7PdzQiJOEKmHqLe8362XMK2/mRzG3ZG4tzk6X8YbkZIxBEy9RD1nvez5RK29Seb27Az4ue2NBljlnEyQiKOkKmHqPe8ny2XsK0/2dyGnRE/t5XJ6H3cp72MkIgjZOoh6j3vZ8slbOtPNHcicR4A2/f7vf53frgZIRFHyNRD1Hvez5ZL2NafbG7Dzoif29rkPj+IdVXrQm4Xcwmq1qU4sQMBlZ4LbBTixnIJP9vfMHbDieB52HEipt776A8ma50Y5kps0O+RZK1z5Qe0Xozu9XUoGcBgvZrH4YzDfcGG4DHODvIwtEl6Z80NzIB6kXOTIVRHbRyRPwOzPezc+J+u1Xu2Gdr74gYZ0wliQ/X+JgVf0ODz0Ct/uibWc5+biIYKaG3+g3jWnhkGoGbn4qyElu85w9DeFdeEJho0VO6Ps1nRNRa9wD2V67nPTcTZjpeB2vkUJ+WKjGNRs3NRE3Gme84zHs25jvPb+GUPGjRU7o84+U6nxvK0gXV4gXsq13OfW+CmBOnzbkqz5yRjtOZeB0fyc3v/TQnGTf+f11G7KbFe8aZsnnE+xXlzG30Lylp4CMj3XB8ttH/La4yFcn/kYHhQXPSaxFLreqw4q8RfZ2f8VUjQNT9DVHqusMT+0Vm0Rpr6+q4x3aPRYxBYSq5XfX2fbcLNCPG4mi+i0nOFvacD47HObI8wODeuuWbLr9F4XM0Xkeu5Pt7TgfFYH7ZHGPHzVauk7pp23ZTXTbn/pjzbHDJroLlzCbrmZfHu6752vUqG8VhntkcY8fM1qlw35XVTTtxyn0osBfVqNyUWFFlDzZ1L0DUvi3df97XrVTKMxzqzPcKIn69e5Xp9X6/vD3l9386JJrKGmjuXoGteFu++7mvXq2QYj3Vme4QRP1+9yvX6vl7fH/L6vm7KD78pb5tvSvjtJGr1m/J2ziGyhpo7l6BrXhbvvu5r16tk6I9OdgfMuj1+DN5zS9yUrT0kCrwx4LvVjDsYHJe4awjkK2XovTCzckmqrAN7hgOAenovhOBNKZ+RBJqNaeiBVfWr+vGRbQLjcQ981c5wHPcAcdABMoLkK2XovQCzco+3rIMHHADUM3uxfZ0e8o2Fs7bG4qo67EHwBfi8GH7Kx8m9xV+A6CtlRD0wFz3q61h+QKCe3Yvt6/dAcFpMQw+oyutQr+gTGGMWPVnIxXFzZpyaK/lKGUEPzEWP+jqgBglQz+7F9vV7IDgtrLEH6uCa+FDy7XuSTSwOmrbj1FzJV8qIemAueNTXwfXwRLGe3cvNXIft8f4PJXugzuswfxh6AqNHBmnxOA5R4lRGkHyljKgH5oJHdR3aYqCe3gs/aW5+DwSnxTSGpHPnFy78TvwBsFCr4ZhAky8AAAAASUVORK5CYII=";
  font2.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABGAAAAAIAQMAAACMKBvOAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAkdJREFUOMuVk89rE0EUx1/aMO1hmu7xoaVaUOxxjhUebamwB/HQo3iQYbc8Cw1rJNAUGiYJSq9eWxDF/0I8KYXm2LP0oEXoejOeFAyNbzZZUspa6Gd/MLMMzGe/8x6UYUgAnlWYhIvchgLKhP3lP+eOUpo/68Up9eVyadpIU0dAFkEzY0SqUoMMQiLlyBEBVKBGYI/7g9fd/uDr3+N8+9nRzgquRHTHtEFgYq5GETPqqm1ss+cJc8wcmkktMnPMy8wakacBYIqRuRKxAHADHjO8OJpp78fKfjnYgxErn/KRDC5SggxTGJHoJMwRb25akdmxLcdChCJDrM1NL4NrA6sJjTz+Z5MlFc43o0dij8bpEHaPFtoYq41SJ5cJtr/BJRD+T6kNOYlrWt7ZSRzqmt1y3OQmicwWyv4nXkYDEy6B0akDB3ob9RyrJtJyAPaO0pB0T9/d+q6apc55/W395Yfu7sdMRhValAsymc4Hyg6T4SyZOGExC5GTlrgMZRAGyjyDUTLIaMJWyMjhNEgyCBvd04P9OJN5uP6qfHfxQdDyMu1xARfiy+rykoh9zYgSVqtRzGypysjUYIwMaPBIWgyIHIiZke+smFFulJoBsEcLnf3hMdXfxJP3f9ThuYUrMFBYSB5KfTf1KKWlM9dIqVc5IyKUvnJ0QlkyjOEK+G6SSY2co1nyAEo3ocjMeBn7ubO3th603y+uBsbX7cSwo8dHlRuu5m9ZgXmRT2Tndh1M0fTXz/6AfvcHh4fHa0/TqYV7uzArO/8D2FLNiCzFOkEAAAAASUVORK5CYII=";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAAARAgMAAABPxM1WAAAADFBMVEUAAABi2MxNTU1wfOZ98BqvAAAAAXRSTlMAQObYZgAAALVJREFUKM+FkKEOxDAMQ01GRu7XQoLv10ZKSvprIyUjO6eusup00lnWkxUnBQWcsu4OQNRkEJPbTtlxFLaiJivxAmUHNgCiJit53Wo96x61qAnJh8UsSjIP0qi1uAeBb6axV8r+LV2U1auzEFsrYjpOlLLOgzSiuzutsDIdv3yPZKNw9+SdS6WHSMPM7U355DByZJhZq0kaxUOkIfPKsApbl/aHti6dP5c0p1FDwRPKDQ+JRn8AvMIK3BDPoY4AAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas"); //stars
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas"); //title row 1
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas"); //title row 2
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas"); //stars/title colors
  const buf4x = buf4c.getContext("2d");
  const buf5c = document.createElement("canvas"); //stars/title composite buffer
  const buf5x = buf5c.getContext("2d");
  const buf6c = document.createElement("canvas");
  const buf6x = buf6c.getContext("2d", {alpha:false});

  const sc_text = "silicon @   is very proud to present the preview of tem plus .... a game wich will be different in many ways ... for example quality ... for ordering or more details about the game contact ksh of scl ... write to .. ksh. scl    neptunushof thirtyfive ... one six two two bv.. hoorn .. the netherlands.... well no handshakez to day .. coz i gotta eat .. and if i don't go downstairs my mother will disconect the powersupply to my room ... and that means i have to write thiz all over again .... peace from ksh of the silicon syndicate ... and remember .... fuck megadeath .......             .                                                                                                                                                                                                                                                                                                                                                                                                                                               ";
  const sc_len  = sc_text.length;

  const gfx = [4,0,0,0,6,128,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,192,0,0,0,0,64,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,16,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,96,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,48,64,0,0,0,0,0,0,0,0,0,0,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,3,0,0,0,0,0,0,32,0,0,0,0,4,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,0,0,0,0,0,0,0,0,0,0,32,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,192,0,0,0,128,8,0,0,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,128,0,0,0,0,0,0,0,0,0,0,0,0,32,4,0,0,0,6,0,0,0];

  const c64   = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const stars = [11,12,15,1,15,12,11,11,12,15,1,15,12,11,11,12,15,1,15,12,11,11,12,15,1,15,12,11,11,12,15,1,15,12,11,11,12,15,1,15,12,11,12,15];
  const title = [6,11,4,14,3,13,1,1,13,3,14,4,11,6];

  const spr_x = [126,121,118,115,112,109,106,102,99,96,93,90,87,84,81,78,76,73,70,67,64,62,59,56,54,51,49,46,44,41,39,37,35,33,31,29,27,25,23,21,19,18,16,15,13,12,11,9,8,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,2,2,3,3,4,5,6,7,8,9,10,12,13,14,16,17,19,21,22,24,26,28,30,32,34,36,39,41,43,46,48,51,53,56,58,61,64,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,124,127,130,133,136,139,142,146,149,152,155,158,161,164,167,170,173,176,179,182,184,187,190,193,195,198,201,203,206,208,211,213,215,218,220,222,224,226,228,230,232,234,235,237,238,240,241,243,244,245,247,248,249,250,250,251,252,253,253,254,254,254,255,255,255,255,255,255,255,254,254,254,253,252,252,251,250,249,248,247,246,245,244,242,241,240,238,236,235,233,231,229,227,225,223,221,219,217,215,212,210,207,205,202,200,197,195,192,189,186,184,181,178,175,172,169,166,163,160,157,154,151,148,145,142,138,135,132,129,126,121,118,115,112,109,106,102,99,96,93,90,87,84,81,78,76,73,70,67,64,62,59,56,54,51,49,46,44,41,39,37,35,33,31,29,27,25,23,21,19,18,16,15,13,12,11,9,8,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,2,2,3,3,4,5,6,7,8,9,10,12,13,14,16,17,19,21,22,24,26,28,30,32,34,36,39,41,43,46,48,51,53,56,58,61,64,66,69,72,75,78,81,84,87,90,93,96,99,102,105,108,111,114,117,120,124,127,130,133,136,139,142,146,149,152,155,158,161,164,167,170,173,176,179,182,184,187,190,193,195,198,201,203,206,208,211,213,215,218,220,222,224,226,228,230,232,234,235,237,238,240,241,243,244,245,247,248,249,250,250,251,252,253,253,254,254,254,255,255,255,255,255,255,255,254,254,254,253,252,252,251,250,249,248,247,246,245,244,242,241,240,238,236,235,233,231,229,227,225,223,221,219,217,215,212,210,207,205,202,200,197,195,192,189,186,184,181,178,175,172,169,166,163,160,157,154,151,148,145,142,138,135,132,129,0,0,0,0];
  const spr_y = [20,22,24,25,27,28,29,31,32,33,35,36,37,38,38,39,40,40,41,41,41,41,41,41,40,40,39,39,38,37,36,35,34,32,31,30,28,27,25,24,22,21,17,16,14,13,11,10,9,7,6,5,4,3,3,1,1,0,0,0,0,0,0,1,1,2,2,3,4,5,6,7,9,10,11,13,14,16,17,19,20,20];

  const bot_x = [106,101,97,94,91,87,84,81,78,74,71,68,65,62,59,56,53,50,47,45,42,39,37,34,32,30,27,25,23,21,19,17,16,14,12,11,9,8,7,6,5,4,3,2,2,1,1,1,1,1,1,1,1,1,2,2,3,4,5,6,7,8,9,11,12,14,15,17,19,21,23,25,27,29,32,34,36,39,42,44,47,50,53,55,58,61,65,68,71,74,77,80,84,87,90,93,97,100,104,107,110,114,117,120,124,127,130,133,137,140,143,146,149,152,155,158,161,164,167,170,172,175,178,180,183,185,187,189,192,194,196,197,199,201,202,204,205,207,208,209,210,211,212,212,213,214,214,215,215,215,216,216,216,216,216,215,215,215,214,214,213,213,212,211,211,210,209,207,206,205,203,202,200,198,197,195,193,191,188,186,184,182,179,177,174,171,169,166,163,160,157,154,151,148,145,142,138,135,132,129,125,122,119,115,112,109];

  const text1 =  "proudly presents...";
  const text2 = "tem+ previeuw...  W";

  let sf_pos1 = 0;
  let sf_pos2 = 0;
  let sf_pos3 = 13;
  let sf_wait = 3;

  let spr_pos = 0;
  let bot_pos = 1;

  let sc_pos  = 51;
  let sc_idx  = 0;
  let tx_step = 0;

  setTimeout(initialize, 100);
}