/*
  Rollin +2DGH Crack
  Hokuto Force (2017)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 192;
    buf1c.height = 16;
    buf1c.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 16;
    buf2x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf2x.fillStyle = c64[0];
    buf2x.fillRect(0,0,320,16);

    canvx.drawImage(text1, 0,0,271,7, 56,147,271,7);
    canvx.drawImage(text2, 0,0,255,7, 64,187,255,7);

    printToBuffer();

    lo_tab1.fill(0);
    lo_tab2.fill(0);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function printToBuffer() {
    let text = "rollin +2dgh";

    for (let i = 0, len = text.length; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 16;
      buf1x.drawImage(font, cx,0,16,16, (i * 16),0,16,16);
    }
  }

  function draw() {
    canvx.fillStyle = c64[0];
    canvx.fillRect(32,43,320,87);

    // logo sine
    canvx.drawImage(rast, 0,0,1,7, 32,57,320,7);
    canvx.drawImage(rast, 0,0,1,7, 32,105,320,7);

    for (let i = 0; i < 39; i++) {
      canvx.drawImage(logo1, 0,i,238,1, ( 40 + lo_tab1[i]),(43 + i),238,1);
      canvx.drawImage(logo2, 0,i,198,1, (136 + lo_tab2[38-i]),(91 + i),198,1);
    }

    lo_tab1.shift();
    lo_tab1.push(lo_sine[lo_pos]);

    lo_tab2.shift();
    lo_tab2.push(lo_sine[lo_pos]);

    if (++lo_pos == 61) {
      lo_pos = 0;
    }

    // title raster
    if (--tt_ctr == 0) {
      tt_ctr = 3;

      for (let i = 0; i < 16; i++) {
        canvx.fillStyle = c64[tt_cols[i]];
        canvx.fillRect(96,(163 + i),192,1);
      }

      canvx.drawImage(buf1c, 96,163);

      let col1 = tt_cols[0];
      let col2 = tt_cols[15];

      tt_cols.copyWithin(0, 1, 8);
      tt_cols.copyWithin(9, 8);
      tt_cols[7] = col1;
      tt_cols[8] = col2;
    }

    // sprite raster
    canvx.drawImage(sprite, 2,sp_pos,46,16, 39,211,46,16);
    canvx.drawImage(sprite, 0,sp_pos,48,16, 85,211,48,16);
    canvx.drawImage(sprite, 0,sp_pos,48,16, 133,211,48,16);
    canvx.drawImage(sprite, 0,sp_pos,48,16, 181,211,48,16);
    canvx.drawImage(sprite, 0,sp_pos,48,16, 229,211,48,16);
    canvx.drawImage(sprite, 0,sp_pos,48,16, 277,211,48,16);
    canvx.drawImage(sprite, 0,sp_pos,18,16, 325,211,18,16);

    sp_pos += 21;

    if (sp_pos == 252) {
      sp_pos = 0;
    }

    // scroll text
    sc_ctr -= 2;

    if (sc_ctr < 0) {
      sc_ctr = 7;

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, 8,0,312,16, 0,0,312,16);
      buf2x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }
      cx = (cx * 16) + (sc_step * 8);

      if (++sc_step == 2) {
        sc_step = 0;

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }
      }

      buf2x.drawImage(font, cx,0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf2c, (7 - sc_ctr),0,304,16, 39,211,304,16);

    player.run();
    requestAnimationFrame(draw);
  }

  const font   = new Image();
  const logo1  = new Image();
  const logo2  = new Image();
  const rast   = new Image();
  const text1  = new Image();
  const text2  = new Image();
  const sprite = new Image();

  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAuBJREFUSMed1cGO0zAQBmDPjpDFAVk8wYgHQXm02OSQI6/kKgeOnLml4sBxveISpNDhH3tbubtltRArrj1Ox1+aaetUi7ihCOG1UPGciuzEnvXHV0TEBVtfvSMmTkwBLXvtjn08hu9fbFRkG05htdhg8xZbx+zLwMnJKtljHvRyZO9qF7K4MUum3AGWOXussa3HC2DmmTP3gG04A9awjVtYhx6Q/TpELsEAUSKvIXbvjgxAYvZJnSS1xmkbNAGAzhpTW99wD9PEaZmXWZfbgIMvWsZdekDibZgn9UiF7PN08KkDzBMASIsr7sKkaB0g8oSDk61zBYCSjuEYdO4BRR4+R7LRMj9o0VMPQHYAvM4GYJ39gtE+XgAeAK7b2WmtAe4CqyNOaOjPn8ChPqAiGq4Bv742wH34qauesGrzFrN8iPhUASfwE10AmAPgyAUsTs47z+TIAE5Y75IBHOMMURrA0m3DLteA3/ePRfhRbwJ2ySGSEyc7+LED7NIA/hnAIg0QGLPVG+AYKgCtB9isAfK324BtQCmS5QcFI9UrgFUaW6+1bzXAZ0B9RWeAFQD7qpXxGnDeLL1rgL4GONXrrQInRj0kjPr3NkB6BpiuAKhOAxS5w6eA+9Hr34EzYJpuA1bY0BZetgHX1CK8BhApkwGoAYgTVQBRiykeDFERR8uMu9Dr4/wI6ADAuBtANhDsJKpgMgIly6IEwOUAgJKj1khxJmwDAE6MLdZmFoUXGhvdrgH3AYCwXgBFEKPsI3Jr3WUT9B2gyCsAfOwBRE8BRS6A968DqD4FMC5h2yw2AHOKFRCZ9NP7Boi8jy8D4lvMwio9INpPObKr7cIbsjj+R0B6CwA3AL0MePO/AJ/JeQPkBvCccgVkT3p40wDZn5TTS4CM1I9/RnJ6BGRfAR4AjDbBzD8HSCEnBigNIJwKcR0jNgEQihQ5qT8Q/b0IC+KPf8eyj22lSAUIAMiwiWXvAX8A8gqHO88lck0AAAAASUVORK5CYII=";
  logo1.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAAAnAgMAAAB1Z5zNAAAADFBMVEUAAACvKinqdGz////2pGg4AAAAAXRSTlMAQObYZgAAAh1JREFUSMeNlLFyKzEIRWlo3OTXaGi2ya+5UaNGv+bGjRq9y1XGkBdlHCY+y56FhbEzkn5dboSIuPOS7jsQ13XPOumtOYH8amG3OwHRumWddHyMkFu8VL26ih1a6qSr6gZp+GNygBjCLetkxssIeYg6Bli6gu6GatdaJ0NMNz7uO/N0Bc0cNDDrZCoUcfvKPF2BxMvRJZJ1MtR144PZGWx6cPNSJyt+xPeIyc/9gxa3tIl9g9pPx7UfF9fOOrynu32D5W2CkzsnZx3S6RY4ZoloHs1EylMZYzTCTllC5DYnGmqHzLHu9h6xdl9T0VzcwPzPgCVeTtJhMtbG5HSczGiRbRwdJo81TaS6vguxBLIWYMYwSYfJg2tX19eOp0UGMGNMkXRsXi7VvSY3ZAWMe3Fs5trp6uSKr9HpcnJxYHPgYRXbLUm3m1Wkuuta7Td0y1sRbYNrF9d0ub1HTLbPZ6xd3CWi9gfgcxeJ5uKaqv4GsbyNyQhci3Mxtd+QT2My76U6V1zfg83Ow6A4UI3QV3ZyuzkmF+fa9D/YyfFbMlyq0zjJCH9lB8eufQAWZ3EYEd5784CdXKzbm6K5OI3jbKPvaEfHLk4uzsZoGzp2tKND023y37O6a5oR2iejHR27uHZ1cS5sfC6GHR3itnh6FmdRQ6Q8OUz82ayoIZDSPc8OcfEkqY7fOYGnHWEnxx6knJzOEUbsm7Njcxhc0/0DpOWi9pOT4HsAAAAASUVORK5CYII=";
  logo2.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAAAnAgMAAAAp7d/pAAAADFBMVEUAAACvKin////qdGxn4NY8AAAAAXRSTlMAQObYZgAAAdRJREFUOMt1lbFuwzAMRLlw6dJf48Kli36tSxYv+jUvWrSwFI8R48I+JJfnOzICAtghl2prZiAV/7DWQJVd59pQHXYGobcxNKiyy9y3m0uT2MGIkiqrOe/Zpcwg8VcAqLKPOfolFvVXkBqRUKekyj7nvk5hciVNEnVLQlYEfTOTFHVmJTcQsqL8blb+oHkxZEXQ0ZpK0ZOhzRUeJEVuLDeE9n2KqRS5idxQtHulA0HLngkrc85RFCY3BIP6PE4pujVlybnQ9ANbm/MMkm0/y5ANUa65+O7XMOvnorEtlJehmiND/ZJFQ9zOZaHMyFVzjseul9tKM+toY6XmajtobAuduLycgu0XK4sESRrUkZGr5oBOGiu/8rahay8yrNQctYajQVcz+ddCgw+VojtrrRna3CZiKbozHWZo36cwF92a+hsEKQlL0ZOhzRX2i6IH42hrhYG8SK+2s2j3yuCiMAHdGMT7MaCL+Go7i7Y168dJ0kxyxWzoMlkZbGdobc4uxPsxwAYNZLDKAGtY9j3NExok2yorImpd3qf00EAWVllSDO/7jn6OUGawykArk5uVyORxhb0hiPO+iwxWWdLK4lclqJlLMgurDBQZ/kdTYGRhlQVF9gf9bdRr91Pm/gAAAABJRU5ErkJggg==";
  rast.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAHAgMAAAC0Is8HAAAADFBMVEVwfOZi2Mw3OcT///8/aIi1AAAAFElEQVQI12NoYGBgcGA4AMQMDA0AD84CQeaX6YYAAAAASUVORK5CYII=";
  text1.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQ8AAAAHBAMAAADkJdXUAAAAD1BMVEUAAABNTU2m+p5Kxkr////tOd3UAAAA2ElEQVQoz3VTyQ3DMAyjGw9gb1B0ggJZIA/vP1NDVZcFJAghiaSZy8GcU9BY0YbMgPQAsj6aVuWoO08Oui5nmcczQhsl6/gSJ+E9ID2Pwp3G6WG8cZazcTlHQbpkvd7Eh/AeYL/rAGGaqe4l2Jes6nH9PrestdYf6FcA6GtdSDrHrpWeLip8pge6jnNw4YHy4qEcWXG3O4DyNM49vREC7gmEJ3P1jaRvHMj7IPRaDzZlvRAlyz11H97nljXTTidsF7Mi6fmv4Yy7mk4+/2WcMydr6jXamDnrB3viOhmGLngtAAAAAElFTkSuQmCC";
  text2.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP8AAAAHBAMAAAA154aNAAAAD1BMVEUAAABNTU22trWEhIT///9tMsi5AAAA30lEQVQoz22T6xGDIBCEz2gB2EHGCpyxAX/Qf03Z9fwGwTC3HPuAPMSY1jVWYbqhuagXax74cPVCXtFLJ5+BYu5uuzzPuNf4qR0x7yEcHTys44Mc5FNqeZq9rOEMr4e9scXnG8LWQUPdMxqc2ZprzKe22bt2d2fcgeZrqmq11qhLPbV2Fz+lL6do6lrDPZM3sd7yGcBD6va3vXb4diNSj7sDfifcNeYvbUtP4usfsIQv8ExG8NyaD5+PprnG/KXt7zvQzgv8JNx8499bgAcPeWiqVz645e4OPD6Dtwg/VD/1BjLxtzY11QAAAABJRU5ErkJggg==";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAD8AgMAAABMRs/bAAAADFBMVEVwbet1zsj///83OcQsB4sfAAAAbklEQVRIx92QsQ0AIAzD8mSf5ElYzcJANm9RCFblZO9kZq2ZO4d9kNk/H9iHm3Af/g05IfPn0J/bWrTCAfc12uCAf1u0wgE5NVrhAMwWrXCA3KMNDphbtMIB+xptcMBNi1Y4YK7RCgfILVrhgP0B73STpcyi/q4AAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "         hokuto force and wolf are in co-op again for fun...      this time we provide you: rollin +2dgh 101 percent...      supplied,cracked,trained,bugfixed and hs saver installed by wolf...      dox by the overkiller and additional gfx by grass...      no space for the usual long greetings list but feel free to consider  yourself greeted by us :)      visit our monastery at hokutoforce.c64.org for more releases to dowload...      later...                                                                   ";
  const sc_len  = sc_text.length;

  const lo_sine = [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,2,2,3,3,3,4,4,4,5,5,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,6,6,6,5,5,5,4,4,3,3,3,2,2,1,1,1,1];
  const lo_tab1 = new Array(39);
  const lo_tab2 = new Array(39);

  const tt_cols = new Uint8Array([2,8,7,5,14,6,4,10,2,8,7,5,14,6,4,10]);

  let lo_pos = 0;
  let tt_ctr = 1;

  let sc_ctr  = 7;
  let sc_step = 0;
  let sc_pos  = 0;
  let sp_pos  = 63;

  setTimeout(initialize, 100);
}