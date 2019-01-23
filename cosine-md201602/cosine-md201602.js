/*
  MD201602 Demo
  Cosine (2016)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 15;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 312;
    buf2c.height = 40;
    buf2x.imageSmoothingEnabled = false;

    canvx.drawImage(back, 0,0);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    canvx.drawImage(back, 39,115,304,40, 39,115,304,40);

    lo1_pos = (lo1_pos + 3) & 255;
    lo2_pos = (lo2_pos + 3) & 255;

    let x1 = lo_sine[lo1_pos] + 17;
    let x2 = lo_sine[lo2_pos] + 8;

    canvx.drawImage(back, 17,35,318,72, x1,35,318,72);
    canvx.drawImage(back, 7,163,335,72, x2,163,335,72);

    scx_off += 2;

    if (scx_off == 8) {
      scx_off = 0;

      buf1x.globalCompositeOperation = "copy";
      buf1x.drawImage(buf1c, 8,0,312,15, 0,0,312,15);
      buf1x.globalCompositeOperation = "source-over";

      let cx = sc1_txt.charCodeAt(sc1_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc1_pos == sc1_len) {
        sc1_pos = 0;
      }

      buf1x.drawImage(font, (cx * 8),0,8,5, 312,0,8,5);
      sc1_idx = (sc1_idx + 12) & 255;

      cx = sc2_txt.charCodeAt(sc2_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc2_pos == sc2_len) {
        sc2_pos = 0;
      }

      buf1x.drawImage(font, (cx * 8),0,8,5, 312,5,8,5);
      sc2_idx = (sc2_idx + 12) & 255;

      cx = sc3_txt.charCodeAt(sc3_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc3_pos == sc3_len) {
        sc3_pos = 0;
      }

      buf1x.drawImage(font, (cx * 8),0,8,5, 312,10,8,5);
      sc3_idx = (sc3_idx + 12) & 255;
    }

    let p1 = sc1_idx;
    let p2 = sc2_idx;
    let p3 = sc3_idx;

    sc1_idx = (sc1_idx + 3) & 255;
    sc2_idx = (sc2_idx + 3) & 255;
    sc3_idx = (sc3_idx + 3) & 255;

    buf2x.clearRect(0,0,312,40);

    for (let x = 0; x < 312; x += 8) {
      let y = sc_sine[p1];
      buf2x.drawImage(buf1c, x,0,8,5, x,y,8,5);

      y = sc_sine[p2];
      buf2x.drawImage(buf1c, x,5,8,5, x,y,8,5);

      y = sc_sine[p3];
      buf2x.drawImage(buf1c, x,10,8,5, x,y,8,5);

      if (p2 < 128) {
        buf2x.clearRect(x,16,8,8);
      }

      p1 = (p1 + 12) & 255;
      p2 = (p2 + 12) & 255;
      p3 = (p3 + 12) & 255;
    }

    canvx.drawImage(buf2c, scx_off,0,304,40, 39,115,304,40);

    player.run();
    requestAnimationFrame(draw);
  }

  const back = new Image();
  const font = new Image();

  back.src = "data:image/png;base64,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";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAFAQMAAAAJ5MYjAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAALlJREFUGNNVULEJAzEM9ACP6hQaIqWKjJI6dcoUh2fTAOEmMCYTPD+AMZH9/5CcQeLw6SQuJTS0nEHr9EogeOdATxPXdVRV2ykUTUICTNpSYsDdadH6OplxQP4MTHfKmwhDTl6WGA9RLc5te1eT4mtnYYGxrPdsh8Fj1MX02KfQjqbI8/d2XkDOtZVeKMZXp3zSL4bBEp3qIkKjzAsCHBk4aGAm4ZnNcK3EmcHeRgaXeNA+MnhCgoTvF+qJfj2IuDXyAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");

  const sc1_txt = "another month and another little emission from cosine, this time replicating the dycp scroll wrapping around some vertical splits from the end part of spirit's demo \"spirited\"... now with extra dycp.   cosine - giving you more dycp for your money and delivering on time - just!        yeah, this one is being released quite close to the wire again but in my defence february is a short month!        i do love a good dycp...   this one doesn't go anywhere near the existing records of course, but i don't remember doing a traditional six characters (or to be strictly accurate, five characters for \"design\" reasons) high routine on the c64;  there is one in radiant on the plus/4, but this is a more optimal routine as well.        there isn't much point in writing a huge text for this scroller (and let's face it, i'd struggle with that anyway) because having three going at once makes them hard to read, but the source code at github contains the text if anyone wants to read it at their leisure...        and with that in mind, i might was well wrap up here  -  this was t.m.r of cosine on the 29th of february 2016, bye until next time ladles and jellyspoons!        ";
  const sc1_len = sc1_txt.length;
  const sc2_txt = "                    cosine-powered waves ripple out towards:          abyss connection         arkanix labs         artstate         ate bit         atlantis and f4cg         booze design         camelot         chorus         chrome         cncd         cpu         crescent         crest         covert bitops         defence force         dekadence         desire         dac         dmagic         dualcrew         exclusive on         fairlight         fire         focus         french touch         funkscientist productions         genesis project         gheymaid inc.         hitmen         hokuto force         level64         maniacs of noise         mayday         meanteam         metalvotze         noname         nostalgia         nuance         offence         onslaught         orb         oxyron         padua         plush         psytronik         reptilia         resource         rgcd         secure         shape         side b         slash         slipstream         success and trc         style         suicyco industries         taquart         tempest         tek         triad         trsi         viruz         vision         wow         wrath         xenon         and everybody we may have forgot - let us know if that's the case!          ";
  const sc2_len = sc2_txt.length;
  const sc3_txt = "                                      cosine's monthly demo - february 2016      programming and graphics by t.m.r          music by sack, called \"here comes your man\"";
  const sc3_len = sc3_txt.length;

  const sc_sine = [35,35,35,35,35,35,35,35,35,35,35,35,35,35,34,34,34,34,34,34,33,33,33,33,32,32,32,32,31,31,31,31,30,30,30,29,29,29,28,28,27,27,27,26,26,26,25,25,24,24,24,23,23,22,22,21,21,21,20,20,19,19,18,18,17,17,17,16,16,15,15,14,14,14,13,13,12,12,11,11,11,10,10,9,9,9,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,5,5,5,5,6,6,6,7,7,8,8,8,9,9,9,10,10,11,11,12,12,12,13,13,14,14,15,15,15,16,16,17,17,18,18,18,19,19,20,20,21,21,22,22,22,23,23,24,24,24,25,25,26,26,26,27,27,28,28,28,29,29,29,30,30,30,31,31,31,31,32,32,32,33,33,33,33,33,34,34,34,34,34,34,35,35,35,35,35,35,35,35,35,35,35,35,35];
  const lo_sine = [31,31,31,31,31,31,31,31,31,31,31,31,31,31,31,30,30,30,30,30,30,29,29,29,29,29,28,28,28,28,27,27,27,27,26,26,26,25,25,25,24,24,24,23,23,23,22,22,22,21,21,20,20,20,19,19,19,18,18,17,17,17,16,16,15,15,15,14,14,14,13,13,12,12,12,11,11,10,10,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,4,4,4,4,3,3,3,3,2,2,2,2,2,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,2,2,2,2,2,3,3,3,3,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,11,11,11,12,12,12,13,13,14,14,14,15,15,16,16,16,17,17,18,18,18,19,19,19,20,20,21,21,21,22,22,22,23,23,23,24,24,24,25,25,25,26,26,26,27,27,27,27,28,28,28,28,29,29,29,29,29,30,30,30,30,30,30,31,31,31,31,31,31,31,31,31,31,31,31,31,31];

  let scx_off = 6;
  let sc1_pos = 0;
  let sc1_idx = 244;
  let sc2_pos = 0;
  let sc2_idx = 28;
  let sc3_pos = 0;
  let sc3_idx = 68;

  let lo1_pos = 128;
  let lo2_pos = 0;

  setTimeout(initialize, 100);
}