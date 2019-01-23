/*
  Time Out +5 Crack
  Acrise & Excess (1992)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.fillStyle = "#000";
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 24;
    buf1x.imageSmoothingEnabled = false;

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    if (++fl_count == 4) {
      let color = colors[fl_index];

      if (++fl_index == 24) {
        fl_index = 0;
      }

      if (color == 0) {
        canvx.fillStyle = "#000";
        fl_count = -64;
      } else {
        canvx.fillStyle = color;
        fl_count = 0;
      }
    }

    canvx.fillRect(32,40,320,187);
    canvx.drawImage(logo, 0,0);

    let idx1 = (spr1x++) & 0xff;
    let idx2 = (spr2x++) & 0xff;

    for (let i = 0; i < 8; i++) {
      if (idx1 < 0) { idx1 += 255; }
      if (idx2 < 0) { idx2 += 255; }

      canvx.drawImage(sprite, spritex[idx1],spritey[idx1]);
      canvx.drawImage(sprite, spritex[idx2],spritey[idx2] + 120);

      idx1 -= 4;
      idx2 -= 4;
    }

    if (++sc_pos == 71) {
      sc_pos = 0;
    }

    sc_xpos += scrollx[sc_pos];

    if (sc_xpos > 7) {
      sc_xpos -= 8;

      buf1x.drawImage(buf1c, 8,0,312,24, 0,0,312,24);

      if (tx_step == 0) {
        let chr = sc_text.charCodeAt(tx_pos);

        tx_xpos = (chr - 97) * 24;
        tx_step++;

        if (++tx_pos == sc_len) {
          tx_pos = 0;
        }

        if (chr == 0x20) {
          tx_xpos = 648;
        } else if (chr == 0x2e) {
          tx_xpos = 624;
          tx_step = 0;
        } else if (chr == 0x69) {
          tx_step = 0;
        }
      } else if (tx_step == 1) {
        tx_xpos += 8;
        tx_step++;
      } else if (tx_step == 2) {
        tx_xpos += 8;
        tx_step = 0;
      }

      buf1x.drawImage(font, tx_xpos,0,8,24, 312,0,8,24);
    }

    canvx.drawImage(buf1c, sc_xpos,0,304,24, 39,131,304,24);

    player.run();
    requestAnimationFrame(draw);
  }

  const logo   = new Image();
  const font   = new Image();
  const sprite = new Image();

  logo.src   = "data:image/png;base64,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";
  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAqAAAAAYAQMAAAAf9N23AAAABlBMVEW2trWEhISP2aORAAAEaklEQVQ4y4WUu87UMBCFT37DmmKJ6dgicngESiNMwoMgwSNEomAKs39ooIQ3oKKmRYLCEgUldHRgBBIFSAziZlC0YbzscpEQHK2O1onz+cxMFIga/NCRYr5YXX6ipXiDv0vhnyqcLaLYXMxuf2LiHn+X/j90n7iaI/rrfhfQ+n9Aj/2+OsAfakf6Ce+h5lR9XHgk7KHl7qVLp6uIjNqM4tW1hBn1CgucOg3nsDA4UOMSPfaaEFoUHGd8ivop61h7xSuIvEADsGImndQGto/i1Y2s5lg71Lg0IBBqFYXbYI77fqdlPoxgmCmomPSYzViTzh6ijoAMnPuaybC5MTaHSVzdnMzNVA9ottDhdF2lhYVTb9IOasYVzUlFtJbMOBi4FjaYH1Afagi3v3+PWrZV9HNxdXtjq2SSQJNDJrJISw9nru2hLdzXmaVXXpOBQBuBUjv9gMr+LNC+GZwck869YHHdTw3Omwj5T8gsK248Bl/tobL48DBbgFTucKnGspOq+4kgCuTBwLr3NJDs7McsrterMoURQvEVD5PF4Ag0qD3UYfiCUuxQiSeLRY91DrukWZIA3jZDIhIoiuuMdoMNQFVyFb941mCgAIbeD4qQNggB4IoDYoNFh4lyKEkFwWAg9PZ9DJJljeLSTTOnAISKG8Xvn3kQExgtdhrAE7wgEjJVAj1oqw3zD2j4KleFbe3lUfa4DsUlkJrzBRxklbxKLyXpmUQVY9pDM5JA8zZpVqNsbR9NXxPl7c0P26TZ2g8ILAVtXaaKg0mOJ8WNTi+fO5yNXmXFP5NWKcNyScqsESClPXgfyzEj6EsuSSdrP5eDfdi6gaiTRvGiQF/f9DI1rwcT91AGB3S7pHVpv579h7EkjchzAAG56z5LxlK75xM/oFZGmhdsTfzy+B562JZa7MU/k1bM5UhUk0CdQC+BNzK1bfnSol35LtgtVF4+rqkx8fVNhw5m4zz2ykqSWkHIW/aVsS0hfIGbSmd4akHVevJ+gmR3WcpfuRoiydvk5VC345Wb9wSqJqJfSfVA6EgQmg9HmATAfymVwqkkH4JwMlMnG4hBQXxJDUSTgeOlsy2+3LiHtYAc42CftB4kqVyk40m8HiBPHsIFYes06Hj1cAw+TMjClby0IAtAZfn0UEOmQ0k6AxDoYgcNnSC8tLI790q8dmjv5A28QNs2skqHk+zxQgzgz+CgTntAKpKPJK18HXDlxj31bgQ8ozmFrQ4n6p/4NqHPr8TrlUw/r+G9QOdR2tonWRAh95o/VKk/esuWx8rn3DsyGb3O5hEDq3yQBxQJy139RnqDlt+K62OoZl7DduWFxYB8CHSWTlfczun9o9huooeMRbbFlr1m9Ip7WaNZ3027WckN3/PBnEwKBzPrkiJ5NA2gJ5xGEERjaQCbeeR5NPPgsJ3nLN7oiE6lqdoAy3bGDqpj4+TOxY0enbgq54wrHDsGVIwT6ARxrD59CpckTSqvjj8BSHx4qHhMAU0Vh0I7oj9KiKLvltUzCL84hvoAAAAASUVORK5CYII=";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAVAgMAAAAhh8a1AAAADFBMVEUAAAA3OcRwfOZi2MyJHalqAAAAAXRSTlMAQObYZgAAAEpJREFUCNdVjbsNwEAIQ914Pzdp2O/q7JcqT06KO0sI/AFUhLK8aJN55DJmrOheteZq0KjAqGr+oySKWBvqCS8y7L/ZDxGslXPtBclHEpR1DjGhAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");

  const sc_text = "uup... i guess you are dreaming of a world where everything costs nothing... but hey you are really dreaming cos that is a nice image and nothing else... believe it or die... timeout was supplied by h bloxx and raped  shorted  cheat recovered  endsequence fixed  levelpacked  irq fast loader installed and finally plus five trained by vague in some days of march diz year... i hope you like this version of the game  i guess it is not the best one but i hope it is not too worth to spread... we want to send some bottles of warsteiner beer to avantgarde  success and the ruling company  aplpha flight  chromance  hitmen  laxity  fantastic four cracking group  onslaught  atlantis hardcore  reflex  plush  panic creations  agony design  oxyron  camelot  equinoxe  x rated  no name  neoplasia  nostalgia  no name  acsore  cream  and to the steady rest...   time to let you alone with the one            vague of acrise and excess is gone for now                                                                               ";
  const sc_len  = sc_text.length;

  const colors  = [0,0,0,"#3739c4","#b03fb6","#707ce6","#b6b6b5","#707ce6","#b03fb6","#3739c4",0,0,0,0,0,"#3739c4","#b03fb6","#707ce6","#b6b6b5","#707ce6","#b03fb6","#3739c4",0,0,0];

  const spritex = [181,177,174,170,166,163,159,156,152,149,145,141,138,134,131,128,124,121,117,115,111,108,105,102,99,96,93,90,87,85,82,79,76,74,71,69,67,64,62,60,58,56,54,52,50,49,48,46,45,43,42,41,39,39,38,37,36,35,35,34,34,34,34,34,34,34,34,34,34,35,35,35,37,37,38,39,40,41,42,43,45,46,48,49,51,53,54,57,59,61,63,65,67,70,72,75,77,80,82,85,88,91,94,97,100,102,106,109,112,115,119,122,125,128,132,135,139,142,146,149,153,156,160,164,167,171,175,178,181,185,189,192,196,199,203,207,210,213,217,220,224,227,231,234,238,241,244,248,250,254,257,260,263,266,269,272,275,278,280,283,285,288,290,293,295,297,300,301,304,305,307,309,311,312,314,315,317,318,319,320,322,323,323,324,325,326,326,327,327,327,327,327,327,327,327,327,327,326,326,325,324,324,323,322,321,320,319,317,316,315,313,311,309,308,306,304,302,300,298,296,293,291,289,286,283,281,278,275,272,270,267,264,261,258,255,252,248,245,242,238,235,232,228,225,222,218,215,211,207,204,200,197,193,189,186,182];
  const spritey = [59,58,56,54,52,51,49,48,46,45,44,43,42,41,40,40,39,39,39,39,39,39,39,40,40,41,42,42,43,44,46,47,48,49,50,51,53,54,55,56,57,58,59,60,61,61,62,63,63,63,64,64,64,64,64,64,63,63,63,62,62,61,60,60,59,59,58,58,57,57,56,56,56,55,55,55,55,55,55,56,56,57,57,58,59,60,60,61,62,63,65,66,67,68,69,71,72,73,74,75,76,77,78,79,79,80,80,80,81,81,80,80,80,79,79,78,77,76,75,73,72,71,69,67,66,64,62,61,59,57,55,54,52,50,49,47,46,45,44,42,42,41,40,39,39,39,39,39,39,39,39,40,40,41,42,43,44,45,46,47,48,49,51,52,53,54,55,56,57,58,59,60,61,62,62,63,63,63,64,64,64,64,64,63,63,63,62,62,61,61,60,60,60,59,58,58,57,57,56,56,56,55,55,55,55,55,55,56,56,57,57,58,58,59,60,61,62,63,64,66,67,68,69,70,72,73,74,75,76,77,78,78,79,80,80,80,80,81,80,80,80,79,79,78,77,76,75,74,72,71,69,68,66,64,63,61];

  const scrollx = [0,0,1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,5,5,5,5,5,5,5,4,4,4,4,4,3,3,3,3,3,2,2,2,2,2,1,1,1,1,1,0,0];

  let sc_pos  = 41;
  let sc_xpos = 2;
  let tx_pos  = 0;
  let tx_step = 0;
  let tx_xpos = 0;

  let fl_count = -3;
  let fl_index = 0;

  let spr1x = 139;
  let spr2x = 250;

  setTimeout(initialize, 100);
}