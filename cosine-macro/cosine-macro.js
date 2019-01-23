/*
  Macro Sleep Demo
  Cosine (2014)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 8;
    buf1c.height = 288;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 312;
    buf2c.height = 128;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 304;
    buf3c.height = 221;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 320;
    buf4c.height = 15;
    buf4x.imageSmoothingEnabled = false;

    buf5c.width  = 304;
    buf5c.height = 63;
    buf5x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    print("$  macro  sleep  $", 0);
    print("for the csdb compo", 16);
    sprites();

    buf3x.globalCompositeOperation = "source-atop";

    buf4x.fillStyle = c64[11];
    buf4x.fillRect(0,0,320,16);

    buf5x.fillStyle = c64[11];
    buf5x.fillRect(0,0,304,63);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", intro);

    player.play();
  }

  function exit(e) {
    canvc.removeEventListener("click", exit);
    cancelAnimationFrame(afid);

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    afid = requestAnimationFrame(fade);
  }

  function print(text, y) {
    let l = text.length;
    let x = 0;

    for (let i = 0; i < l; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }

      let w = ch_size[cx] * 8;
      cx *= 16;

      buf3x.drawImage(font, cx,0,w,16, x,y,w,16);
      x += w;
    }
  }

  function sprites() {
    let cols = [4,4,7,14,10,15,3,3,10,13,7,8];

    let c = 0;
    let f = 0;

    for (let i = 0; i < 4; i++) {
      for (let x = 0; x < 304; x += 8) {
        buf2x.drawImage(sprite, f,0,8,63, x,0,8,63);
      }

      f += 8;

      buf2x.globalCompositeOperation = "source-atop";

      buf2x.fillStyle = c64[cols[c++]];
      buf2x.fillRect(0,0,304,63);
      buf3x.drawImage(buf2c, 0,0,304,63, 0,32,304,63);

      buf2x.fillStyle = c64[cols[c++]];
      buf2x.fillRect(0,0,304,63);
      buf3x.drawImage(buf2c, 0,0,304,63, 0,95,304,63);

      buf2x.fillStyle = c64[cols[c++]];
      buf2x.fillRect(0,0,304,63);
      buf3x.drawImage(buf2c, 0,0,304,63, 0,158,304,63);

      buf2x.globalCompositeOperation = "source-over";

      buf2x.clearRect(0,0,304,63);
    }
  }

  function board() {
    cb_col = (--cb_col) & 255;

    let c = cb_sine[cb_col];

    for (let i = 0; i < 128; i++) {
      buf2x.fillStyle = c64[cb_cols[++c]];
      buf2x.fillRect(0,i,312,1);
    }

    cb_pos = (cb_pos + 2) & 255;

    buf1x.fillStyle = c64[12];
    buf1x.fillRect(0,0,8,288);

    let p = cb_pos;
    let y = 0;

    for (let i = 0; i < 28; i++) {
      let s = cb_sine[p] - 32 + y;

      buf1x.clearRect(0,s,8,8);
      buf1x.drawImage(sprite, 24,64,8,8, 0,s,8,8);

      p = (p + 6) & 255;
      y += 9;
    }

    p = 8;
    y = 0;

    for (let x = 0; x < 312; x += 8) {
      buf2x.drawImage(buf1c, 0,y,8,128, x,0,8,128);
      if (x == 152) { p = -p; }
      y += p;
    }

    buf2x.drawImage(logo, 8,40);
  }

  function intro() {
    let delta = context.currentTime - player.playing;

    player.run();

    if (delta > 15.1) {
      canvx.fillStyle = c64[11];
      canvx.fillRect(39,0,304,272);

      canvx.fillStyle = c64[1];
      canvx.fillRect(39, 33,304,1);
      canvx.fillRect(39,163,304,1);
      canvx.fillRect(39,240,304,1);

      canvx.fillStyle = c64[0];
      canvx.fillRect(39, 34,304,1);
      canvx.fillRect(39,164,304,1);
      canvx.fillRect(39,241,304,1);

      canvc.addEventListener("click", exit);

      afid = requestAnimationFrame(draw);
      return;
    }

    afid = requestAnimationFrame(intro);
  }

  function fade() {
    volume -= 0.0078125;

    player.volume(volume);
    player.run();

    if (volume == 0.0) {
      player.stop();
      return;
    }

    afid = requestAnimationFrame(fade);
  }

  function draw() {
    // update chequerboard
    board();

    // update title background beat
    if (--bt_ctr == 0) {
      bt_ctr = 2;

      buf3x.fillStyle = c64[bt_cols[bt_pos]];
      buf3x.fillRect(0,0,240,16);

      buf5x.fillStyle = buf3x.fillStyle;
      buf5x.fillRect(0,0,304,16);

      if (++bt_pos == 6) {
        bt_pos = 0;
        bt_ctr = 47;
      }
    }

    // draw title line 1
    sp_pos = (++sp_pos & 255);

    let p = sp_pos;
    let x = 66 + cb_sine[cb_pos] + cb_sine[cb_col];
    let y = cb_sine[p];

    if (y >= 48) { y -= 48; }
    buf5x.drawImage(buf3c,  0,(32 + y),240,15, 33,0,240,15);
    buf5x.drawImage(sprite, 0,66, 24,15,  x,0, 24,15);
    buf5x.drawImage(buf3c,  0, 0,240,15, 33,0,240,15);

    // draw title line 2
    p = (sp_pos - 36) & 255;
    y = cb_sine[p];

    if (y >= 48) { y -= 48; }
    buf5x.drawImage(buf3c, 4,(95 + y),264,15, 21,24,264,15);
    buf5x.drawImage(buf3c, 0,16,264,15, 21,24,264,15);

    // scroll text background
    p = (sp_pos - 72) & 255;
    y = cb_sine[p];

    if (y >= 48) { y -= 48; }
    buf5x.drawImage(buf3c, 0,(158 + y),304,15, 0,48,304,15);

    // scroll text
    sc_off += 2;

    if (sc_off == 8) {
      sc_off = 0;

      buf4x.globalCompositeOperation = "copy";
      buf4x.drawImage(buf4c, 8,0,312,15, 0,0,312,15);
      buf4x.globalCompositeOperation = "source-over";

      if (++sc_ctr == ch_step) {
        sc_ctr = 0;

        let cx = sc_text.charCodeAt(sc_pos);
        if (cx >= 96) { cx -= 96; }
        sc_org = cx * 16;

        ch_step = ch_size[cx];

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }
      }

      buf4x.drawImage(font, sc_org,0,8,15, 312,0,8,15);
      sc_org += 8;
    }

    buf5x.drawImage(buf4c, sc_off,0,304,15, 0,48,304,15);

    // update screen
    canvx.drawImage(buf2c, 4,0,304,128, 39,35,304,128);
    canvx.drawImage(buf5c, 39,171);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font   = new Image();
  const logo   = new Image();
  const sprite = new Image();

  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAABNTU2Qn6s5AAAAAXRSTlMAQObYZgAAAkxJREFUSMfFlUGqFDEQhlOkISD6oohLyQG8gZtZuHDtEcQTeAJfMwOzEZ7XEFfeYB72QeINspxFIP5VSTFJj/Zz97pIOl1FVb5UKmlTSgomSGOhiagY9K4EYk30kYyP3oSJVAyV7uEP03T3ojnvLtYUfpfkU8hkCFGII3ZWD4DFTU4aC8LbMgnADbHmYA802YOdHLQqA4BFe/tzJ7pZNP0Ui7svi11chheiEEfsrBYAUFtpLB0AHFQn9i2AN997gOW92jj6jAb/BsDjzroGOBYGyAJgSB1ZtgGetAzsa9h3/RRUDlTjKERnJQD0gd0AMA2yCfDDyLrurgC4ptbee4CqVQFUdAusU71sC1qTuiVrADMU5tOPOmLLXJC9FkMq4W8ArnBzRQHMCICtyQ3gFt/5CoDwXDTPOoAJANmy9xHx1wCZAUybjgrx1BXAKQCOIL6iV4CTixT9GsDOdr5oXn3gPjkFiD5ZOYT+bG9t7FDP9sEMCLXN9pKBjLVsZ+Dz63oYFYDzB0Ghny22gTMwAqgogNa8AvC39HKMMpK4XQPPX4w10HYfAMlVANesyf0LgFYAJL0zdTQA0FUGvr0ca6D5QxTAjwB6D7iCN1n0WvfQKQDXvx8A9LkC+PoJl3J3EXGcGiV6jAbv/wSAG9oSdC3bNfDrWO/EuQeQa20NkLwA6L/AFbzJSr8IAHQKgHHc3TwIoOW3bwCLAwB8K8ApYHQNoH9DVxLWSNInAWBdltRljNOXIABmowj1b3jXAFKYYU0hI0b0J8yyBnjk5w81LTtg3lXf1wAAAABJRU5ErkJggg==";
  logo.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASgAAAAwBAMAAABQ2/poAAAAElBMVEUAAACEhIRoOAjk7U5i2MwAAADa5XZdAAAAAXRSTlMAQObYZgAAAxhJREFUWMOlmIFxpDAMRdPCb0EtuAW34P5budj4eCCNxIYVM4mlJ30LhQU2P9PMNA9J87eNH+wVM/z3+r/OYjsOeMnwv9DX+DVbP+YBeMmE/0IDYGeUbl8z4f9Rw2AiSrdfMOG/1zdidPsFE/6fNOxgnNnFAI5RlNQRZwOf96hBtxggMCFY1sloyufZJxpqrWmQiMFum0lW19FUpqEnjRlnAjVrR08DNlwdebMu0ZDkWBCQyQTIGDdFjZN5QfJWV4mGoQFzZ8XtPWf40z6r0yg0YEsP4+wFSBn++LyOdcFGdVY1w7fP61gX7MtJTWNSVtfJUo3HSYnOU4a/IvujXU1qZRYaAyaLAgcBFKzJ+2aSmtoyXfNmaa0B2wq6T0OuW89osm2fzelJxBdQqQHbCqKHI4cABsv9w3ZrxPEzDRgal6Z2/AeLDH8e16bOYamFPNUam6Ghd5PyE2l09DCpilEfzgpLGdcOnKMRx880YBzXpugSCwzBq78fZPO4NaUjs9SAaT9tbk35SaWsCZ8H9PkJkttYtQZMh5CbVEsmBWOzOleurtSARTGuh5rxZ3EGk1xdqQHD6BxQsedcNZEX1ymLYgIUjDt1zIVJrq7QgFXXQs14R3e54d2buloDhoX7Rs4QXObzYLJbHWtzGiEvjl0UVaylTcF8nRKNcm+RVDLuS04kMupqDVjcWPdvs7333X1g3RREAmM9gkbNsDbjAuyehmfZ62v9pSK+NsPQTyYlmuKVN7L0ywIsrHMN9L01OqcpJpW+9GORSWjIa+T6WDvIoAgfRsPJpGB+3XMN9GNTYVL74isZFlkXddf13Uc/udBFUdf678wDw2CabK+7JCaFBizox8cDRepTezwxLLJjX5lfOx/99Hro/42kihGDMQ2tY6+XeRb0MZ2AUKepgqER2d43mRQM/ZvZ2T1HFy3ljHhk5+TICyzRh+3IwSko2YzkTMfkyAss0Ycthx9MqmDLr5ncOrCov9hu6ko6Z1GxWZ2y7ZMXWdSP1xTGW0DKiJfM/Dr3UTl1+hmIryaREYfA/nBHj/rb/gE3jFkZEbL3JgAAAABJRU5ErkJggg==";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABUAgMAAACep92wAAAACVBMVEUAAAD///9oOAgsRi0gAAAAAXRSTlMAQObYZgAAAHdJREFUKM/NkLESgDAIQ3Fw6c7/1MGdgfykXymR89Cru2XhNbkGDgEk66ZSor+korLKmzlpsKrTGvLmT/n9ygssdaXBB4Au1sIRNcJq2JygOxwXKFwJ0G7aA0KXtbdD3AkiX4CE/EXIHAKTCTkrKqezuE9t+Nj5BApBQklWFdqfAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");
  const buf4x = buf4c.getContext("2d");
  const buf5c = document.createElement("canvas");
  const buf5x = buf5c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "# macro sleep #    an entry for the csdb intro creation competition from the cosine factories in 2014        coding and graphics by t.m.r with music by sack        everybody remembers ''micro sleep'' by xakk, right...?    i've been meaning to do a version of the effect in that first part for years, so the i.c.c. looked like a good excuse to get it coded - thanks to didi for organising the compo! *        there isn't much space for waffle this time so let's get the greetings out there...   $%64 ever%$%arkanix labs%$%artstate%$%ate bit%$%booze design%$%camelot%$%chorus%$%chrome%$%cncd%$%cpu%$%crescent%$%crest%$%covert bitops%$%defence force%$%dekadence%$%dac%$%dmagic%$%dual crew%$%fairlight%$%fire%$%focus%$%fta%$%funkscientist%$%gheymaid inc.%$%hitmen%$%hokuto force%$%genesis project%$%k2%$%laxity%$%level 64%$%m and m%$%meanteam%$%metalvotze%$%noname%$%nostalgia%$%nuance%$%onslaught%$%oxyron%$%padua%$%plush%$%raww arse%$%resource%$%retro64%$%secure%$%shape%$%side b%$%slash design%$%success and trc%$%style%$%suicyco industries%$%taquart%$%tempest%$%tek%$%triad%$%trsi%$%viruz%$%vision%$%warriors of the wasteland%$%wrath designs%$%xenon%$%and, as always, everybody we forgot! *        don't forget to visit the cosine website at %$%cosine.org.uk%$% for more goodies!        the magic roundabout # of cosine - wandering off and wrapping on 2014-11-16... .. .  .   .                ";
  const sc_len  = sc_text.length;

  const ch_size = [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,1,2,2,2,2,1,2,1,2,2,1,2,2,2,2,2,2,2,2,1,1,2,2,2,2];

  const bt_cols = [1,13,3,14,4,11];
  const cb_cols = [14,14,3,14,3,3,3,13,3,13,13,13,1,13,1,1,1,7,1,7,7,7,3,7,3,3,3,10,3,10,10,10,4,10,4,4,4,2,4,2,2,2,9,2,9,9,9,2,9,2,2,2,8,2,8,8,8,10,8,10,10,10,15,10,15,15,15,7,15,7,7,7,1,7,1,1,1,13,1,13,13,13,15,13,15,15,15,14,15,14,14,14,8,14,8,8,8,11,8,11,11,11,6,11,6,6,6,11,6,11,11,11,4,11,4,4,4,14,4,14,14,14,3,14,3,3,3,13,3,13,13,13,1,13,1,1,1,7,1,7,7,7,3,7,3,3,3,10,3,10,10,10,4,10,4,4,4,2,4,2,2,2,9,2,9,9,9,2,9,2,2,2,8,2,8,8,8,10,8,10,10,10,15,10,15,15,15,7,15,7,7,7,1,7,1,1,1,13,1,13,13,13,15,13,15,15,15,14,15,14,14,14,8,14,8,8,8,11,8,11,11,11,6,11];
  const cb_sine = [95,95,95,95,95,95,95,95,95,94,94,94,93,93,93,92,92,91,91,90,90,89,89,88,87,87,86,85,85,84,83,82,81,81,80,79,78,77,76,75,74,73,72,71,70,69,68,67,66,65,64,62,61,60,59,58,57,56,54,53,52,51,50,49,47,46,45,44,43,42,40,39,38,37,36,35,33,32,31,30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,13,12,11,10,10,9,8,8,7,6,6,5,5,4,4,3,3,2,2,2,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,2,2,2,3,3,4,4,5,5,6,6,7,8,8,9,10,11,11,12,13,14,15,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,33,34,35,36,37,38,40,41,42,43,44,45,47,48,49,50,51,52,54,55,56,57,58,59,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,82,83,84,85,86,86,87,88,88,89,89,90,91,91,92,92,92,93,93,94,94,94,94,95,95,95,95,95,95,95,95];

  let cb_col = 60;
  let cb_pos = 0;

  let bt_ctr = 1;
  let bt_pos = 0;
  let sp_pos = 136;

  let sc_off = 2;
  let sc_ctr = 1;
  let sc_pos = 0;
  let sc_org = 0;

  let ch_step = 2;

  let context = window.neoart.audioContext;
  let volume  = 1.0;

  let afid = 0;

  setTimeout(initialize, 100);
}