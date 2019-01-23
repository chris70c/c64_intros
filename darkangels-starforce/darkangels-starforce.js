/*
  Starforce +2 Crack
  Dark Angels (1990)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 21;
    buf1x.imageSmoothingEnabled = false;

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", intro);

    player.play();
  }

  function exit(e) {
    canvc.removeEventListener("click", exit);
    cancelAnimationFrame(afid);

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    canvx.drawImage(text, 70,35);

    player.stop();
  }

  function intro() {
    player.run();

    if (player.time > 11.9) {
      canvc.addEventListener("click", exit);
      func = draw;
    }

    afid = requestAnimationFrame(func);
  }

  function draw() {
    canvx.fillStyle = c64[0];
    canvx.fillRect(0,35,384,200);

    // draw logo and raster bars
    canvx.drawImage(sprite, 120,0,1,9, 0,41,384,9);
    canvx.drawImage(sprite, 120,0,1,9, 0,145,384,9);
    canvx.drawImage(logo, 62,35);

    // sprites animation
    if (--sp_ctr == 0) {
      sp_ctr = 10;
      spr_curr.copyWithin(0, 1);

      let addr = spr_addr[sp_ptr++];

      if (addr == 256) {
        addr = 0;
        sp_ptr = 0;
      }

      spr_curr[7] = addr;
    }

    let p1 = sp_pos1;
    let p2 = sp_pos2;
    let p3 = sp_pos3;
    let p4 = sp_pos4;

    for (let i = 0; i < 7; i++) {
      let y = spr_sine[256 + p1] + spr_sine[256 + p2] + 53;
      let x = spr_sine[p3] + spr_sine[p4] + 20;
      x *= 2;

      if (i > 1) {
        canvx.drawImage(sprite, spr_curr[i],0,24,21, x,y,24,21);
      }

      p1 = (p1 + 21) & 255;
      p2 = (p1 + 26) & 255;
      p3 = (p3 + 13) & 255;
      p4 = (p4 + 30) & 255;
    }

    sp_pos1 = (sp_pos1 + 4) & 255;
    sp_pos2 = (sp_pos2 + 6) & 255;
    sp_pos3 = (sp_pos3 + 1) & 255;
    sp_pos4 = (sp_pos4 + 3) & 255;

    // scroll raster bars
    let a = rst_size[rst_pos];
    rs1_size = a;

    rs1_col1 = (a +  67) & 255;
    rs1_col2 = (a +   3) & 255;
    rs1_col3 = (a + 195) & 255;

    rs2_col1 = (a +  17) & 255;
    rs2_col2 = (a +  81) & 255;
    rs2_col3 = (a + 138) & 255;

    rst_pos = (rst_pos + 130) & 127;

    let x = 136;
    let y = 178;

    for (let i = 0; i < rs1_size; i++) {
      canvx.fillStyle = c64[rst_cols[rs1_col1 + i]];
      canvx.fillRect(x,y,64,1);
      x += 64;

      canvx.fillStyle = c64[rst_cols[rs1_col2 + i]];
      canvx.fillRect(x,y,64,1);
      x += 64;

      canvx.fillStyle = c64[rst_cols[rs1_col3 + i]];
      canvx.fillRect(x,y,79,1);
      x += 79;

      canvx.fillStyle = c64[rst_cols[rs1_col2 + i]];
      canvx.fillRect(x,y,41,1);
      x = 0;
      y++;

      canvx.fillStyle = c64[rst_cols[rs1_col3 + i]];
      canvx.fillRect(x,y,136,1);
      x += 136;
    }

    let len = 22 - rs1_size;
    let scy = y + 7;

    x = 136;
    y += 35;

    for (let i = 0; i < len; i++) {
      canvx.fillStyle = c64[rst_cols[rs2_col1 + i]];
      canvx.fillRect(x,y,64,1 );
      x += 64;

      canvx.fillStyle = c64[rst_cols[rs2_col2 + i]];
      canvx.fillRect(x,y,64,1 );
      x += 64;

      canvx.fillStyle = c64[rst_cols[rs2_col3 + i]];
      canvx.fillRect(x,y,120,1 );
      x = 0;
      y++;

      canvx.fillStyle = c64[rst_cols[rs2_col1 + i]];
      canvx.fillRect(x,y,39,1 );
      x += 39;

      canvx.fillStyle = c64[rst_cols[rs2_col3 + i]];
      canvx.fillRect(x,y,97,1 );
      x += 97;
    }

    // scroll text
    if (--sc_stp == 0) {
      sc_stp = 1;
      sc_off -= sc_spd;

      if (sc_off < 0) {
        sc_off &= 7;

        buf1x.drawImage(buf1c, 8,0,312,21, 0,0,312,21);

        if (--ch_ctr == 0) {
          ch_ctr = 3;

          do {
            let cx = sc_text.charCodeAt(sc_pos++);
            if (cx >= 96) { cx -= 96; }

            if (cx == 30) {
              sc_stp = 128;
            } else if (cx == 49) {
              sc_spd = 2;
            } else if (cx == 50) {
              sc_spd = 4;
            } else {
              if (cx == 32) {
                cx = 0;
              } else if (cx == 9) {
                ch_ctr--;
              }

              ch_pos = cx * 24;
              break;
            }
          } while (true);

          if (sc_pos == sc_len) {
            sc_pos = 0;
          }
        }

        buf1x.drawImage(font, ch_pos,0,8,21, 312,0,8,21);
        ch_pos += 8;
      }
    }

    canvx.drawImage(buf1c, (7 - sc_off),0,304,21, 39,scy,304,21);

    player.run();
    afid = requestAnimationFrame(func);
  }

  const font   = new Image();
  const logo   = new Image();
  const sprite = new Image();
  const text   = new Image();

  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAogAAAAVAgMAAAC4QPedAAAADFBMVEUAAAA3OcS2trVi2Mw0sQT1AAACUElEQVRIx7VXu27DMAzUwv/jwqVLvs6Ll36dly7piQ+zF6MKjKIEe6ZP5OlgpI4yMsR0DDMgalyzthmJxSOjPfkzEaDFxhOzrMl1a66yeio+9m0CMC4BwKiBxXvKruNcrURkDfqiedF3XGT1ZMhuu4IFot7MsgaaBYIHkkXcoyaL0NliljS5jueHy9qi67dFUJBwzCdUDCJQHNviDFKk56qsyTXCJdYWUz/iukY14dritnu9zBsWZb9afNy3yFP2bxYPbDPRDiAxCEfi5VNr8Dr1HhEuQbwXxGC9LT4M20xUAxKDcCReDq3B69R7RLgE8V4Qg/Vdy6IJtnEUIDGIQjFLXlRrEAmKpl5RiRHvdAnio5hi6uhv4udpUcVUgGgEBhNpOgoxF4xfaxCpPNVZmlTLmGoucW0GnT2o/aaiZgC82eiERTXvZIs8RVmrVLuD3yzmarYa4N5THHbcfYo9e+oPx/VTRM8UNNW2yB8gBNWFjy15kfh2wS19FlnnqlZtOlyC+CgE9dT2XT6Ptsj/dMQgTvzYkpeHugq9B2pqodZtLkG8F/Qa6bcigl9dxCCa2ZKXL3UVepvW1EKt21yC+Ciqxxm3eOsLEMknneP67cJJPN2GBHfa68iuf7JIzN8s1iFjf2vx7UkHTFskhqzQxjXLbeoWg8+jGp0gETnLFhfnxT5TtkViurMyV3u2ePS5uwDUdeDlntqdLP5+6p5sCLVFZqqzs1dHavIukEgF1kHy7hlmyMVvl/59079dmME1ispeHaXJu7wi/qR6nj92/wbTjRW2FIlwMAAAAABJRU5ErkJggg==";
  logo.src   = "data:image/png;base64,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";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAAVBAMAAACQ4lxbAAAAFVBMVEUAAACEhIT///+2trVNTU0AAADk7U7AS0csAAAAAXRSTlMAQObYZgAAAFlJREFUOMtjoAQ4UKQ7YADtFiBTnyCYTCBJBwIYQ+wmRQcG24EEHUrobESYY9chqCSIj42wG1kGwVQCcjDYgsZAtjGIQ5HdDBT5m4H8MEcAck0iO62NggECADRzCQmE890wAAAAAElFTkSuQmCC";
  text.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPwAAAAPAQMAAAD6YzCTAAAABlBMVEUAAAC2trVtIHVQAAAA3klEQVQY042PsWlEQQxEp4Ar4MpQeSpP0UUvNhv8wAUcRqECYby6D77vzMsiEPM0w+jRbrp5W7WX902F0vYwvGNrX4HrjjkBxF2g5Sz5kwhM33vKwhggwgYAUnTE7B95tOTWlVSkVC66PtV95EQ8AqSbkbF/SIxJpjiIuEkngLGCxQks1pqcSZ8WTMReHW+pTAmIvU3D/73pTJdwj6ZV1Z2X4+lsBJoZT9PErytAX4A+Ad5AqzfQWS8gN1CVuYF+Oxwv6XQ4TOQ0vEYw0pLb6c2KWH+BLTUy90lT8dviB/dq5p+p9OSXAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "2dark angels ~~~~~~                1     2 starforce  copyright by double density   illuminated and circulated by dark angels   this could have been given out in the end of july but some guys called x ample forced us not to do   i cant imagine why they did this to us   anyway  handshakes go to the following doodes   triad  warriors of time  level ninetynine  paragon  vision  united artists  paramount and alphaflight  tropic  dualis  genesis project  action  atg  poison  lazer  tera  cross  crazy  pioneers and guardian angels  crime  knickers  dunex  role  the voice  century  impulse  bonzai  matrix  full force  and the rest   no tears for the creatures of the night           1 dark angels ~ 2 another violent breed                    ";
  const sc_len  = sc_text.length;

  const spr_sine = [34,33,32,31,30,30,29,28,27,26,25,25,24,23,22,22,21,20,19,18,18,17,16,16,15,14,14,13,12,12,11,10,10,9,9,8,8,7,7,6,6,5,5,5,4,4,3,3,3,3,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,3,3,3,4,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,12,12,13,13,14,15,15,16,17,18,18,19,20,21,21,22,23,24,24,25,26,27,28,29,29,30,31,32,33,33,34,35,36,37,38,38,39,40,41,42,43,43,44,45,46,47,47,48,49,50,50,51,52,52,53,54,55,55,56,57,57,58,58,59,60,60,61,61,62,62,63,63,64,64,64,65,65,65,66,66,66,67,67,67,67,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,68,67,67,67,67,66,66,66,65,65,65,64,64,63,63,62,62,62,61,60,60,59,59,58,58,57,56,56,55,54,54,53,52,52,51,50,49,49,48,47,46,46,45,44,43,42,42,41,40,39,38,37,37,36,35,17,17,16,16,15,15,15,14,14,13,13,13,12,12,11,11,11,10,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,5,4,4,4,4,3,3,3,3,3,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,11,11,11,12,12,12,13,13,14,14,15,15,15,16,16,17,17,17,18,18,19,19,19,20,20,21,21,22,22,22,23,23,24,24,24,25,25,25,26,26,26,27,27,28,28,28,29,29,29,29,30,30,30,31,31,31,31,32,32,32,32,32,33,33,33,33,33,33,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,34,33,33,33,33,33,33,32,32,32,32,31,31,31,31,30,30,30,30,29,29,29,28,28,28,27,27,27,26,26,26,25,25,25,24,24,23,23,23,22,22,21,21,21,20,20,19,19,19,18,18];
  const spr_addr = [24,48,72,96,96,72,48,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,256];
  const spr_curr = new Uint8Array(8);

  const rst_cols = [9,0,9,2,0,9,2,8,0,9,2,8,10,0,9,2,8,10,15,0,9,2,8,10,15,7,0,9,2,8,10,15,7,15,10,8,2,9,0,7,15,10,8,2,9,0,15,10,8,2,9,0,10,8,2,9,0,8,2,9,0,2,9,0,9,0,9,11,0,9,11,8,0,9,11,8,12,0,9,11,8,12,15,0,9,11,8,12,15,7,0,9,11,8,12,15,7,15,12,8,11,9,0,7,15,12,8,11,9,0,15,12,8,11,9,0,12,8,11,9,0,8,11,9,0,11,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,11,0,11,12,15,7,1,7,15,12,11,0,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0,6,14,15,7,1,7,15,14,6,0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  const rst_size = [10,10,9,9,9,8,8,8,7,7,7,6,6,6,5,5,5,5,4,4,4,4,4,4,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,5,5,5,5,6,6,6,7,7,7,8,8,8,9,9,9,10,10,10,11,11,12,12,12,13,13,13,14,14,14,15,15,15,15,16,16,16,16,17,17,17,17,17,18,18,18,18,18,18,18,18,18,18,18,18,18,18,18,17,17,17,17,17,17,16,16,16,16,15,15,15,14,14,14,13,13,13,12,12,12,11,11,11];

  let sp_ctr  = 256;
  let sp_ptr  = 0;

  let sp_pos1 = 0;
  let sp_pos2 = 32;
  let sp_pos3 = 128;
  let sp_pos4 = 192;

  let rst_pos  = 0;

  let rs1_size = 16;
  let rs1_col1 = 64;
  let rs1_col2 = 0;
  let rs1_col3 = 192;

  let rs2_col1 = 0;
  let rs2_col2 = 64;
  let rs2_col3 = 128;

  let sc_stp = 1;
  let sc_off = 7;
  let sc_spd = 4;
  let sc_pos = 0;

  let ch_pos = 0;
  let ch_ctr = 1;

  let func = intro;
  let afid = 0;

  setTimeout(initialize, 100);
}