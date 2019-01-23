/*
  Alderan+Editor Crack
  Section 8 (1993)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 304;
    buf1c.height = 64;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 1480;
    buf2c.height = 48;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 176;
    buf3c.height = 40;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 320;
    buf4c.height = 48;
    buf4x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    canvx.fillStyle = c64[15];
    canvx.fillRect(0,30,384,1);
    canvx.fillRect(0,111,384,1);
    canvx.fillRect(0,185,384,1);
    canvx.fillRect(0,236,384,1);

    buf1x.drawImage(combo, 0,96,304,64, 0,0,304,64);

    buf2x.drawImage(combo, 0,0,744,48, 0,0,744,48);
    buf2x.drawImage(combo, 0,48,736,48, 744,0,736,48);

    buf3x.drawImage(combo, 328,96,176,40, 0,0,176,40);

    text_buf.fill(14);

    let cx = sc_text.charCodeAt(0);
    if (cx >= 96) { cx -= 96; }

    sc_ctr = tx_size[cx];
    sc_org = tx_grid[cx];

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);

      buf1x.fillStyle = c64[0];
      buf2x.fillStyle = c64[0];
      buf3x.fillStyle = c64[0];

      func = fade;
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function logo() {
    const x = logo_pos[lo_pos] - 72;
    lo_pos = (lo_pos + 5) & 255;

    canvx.drawImage(buf1c, x,0,304,64, 39,39,304,64);
    return x;
  }

  function title() {
    const col = text_col[tt_pos];

    text_buf[32] = col;
    text_buf.copyWithin(0, 1);

    for (let i = 0; i < 8; i++) {
      canvx.fillStyle = c64[text_buf[15 + i]];
      canvx.fillRect((159 + (i * 8)),124,8,8);
    }

    canvx.fillStyle = c64[col];
    canvx.fillRect(120,140,144,8);
    canvx.fillRect(104,156,176,8);

    if (++tt_pos == 48) {
      tt_pos = 0;
    }

    canvx.drawImage(buf3c, 104,124);
  }

  function scroll() {
    sc_off -= 4;

    if (sc_off < 0) {
      let ctr = sc_ctr + 1;
      let org = sc_org;
      let pos = sc_pos;

      sc_off = 6;

      for (let x = sc_spc; x < 320; x += 8) {
        if (--ctr == 0) {
          if (++pos == sc_len) {
            pos = 0;
          }

          let cx = sc_text.charCodeAt(pos);
          if (cx >= 96) { cx -= 96; }

          ctr = tx_size[cx];
          org = tx_grid[cx];
        }

        buf4x.drawImage(buf2c, org,0,8,48, x,0,8,48);
        org += 8;
      }

      if (sc_spc == 0) {
        sc_org += 8;

        if (--sc_ctr == 0) {
          if (++sc_pos == sc_len) {
            sc_pos = 0;
          }

          let cx = sc_text.charCodeAt(sc_pos);
          if (cx > 96) { cx -= 96; }

          sc_ctr = tx_size[cx];
          sc_org = tx_grid[cx];
        }
      } else {
        sc_spc -= 8;
      }
    }

    canvx.drawImage(buf4c, (7 - sc_off),0,304,48, 39,187,304,48);
  }

  function fade() {
    canvx.fillStyle = c64[0];
    canvx.fillRect(0,31,384,80);

    let pos = cl_pos;

    for (let i = 0; i < 6; i++) {
      let a = fade1[pos];
      let l = a.length;
      let b = (pos > 128) ? buf3x : buf1x;

      for (let j = 0; j < l;) {
        let x = a[j++];
        let y = a[j++] + cl_cur;
        b.fillRect(x,y,8,1);
      }

      pos += 32;
    }

    pos = cl_pos;

    for (let i = 0; i < 8; i++) {
      let a = fade2[pos];
      let l = a.length;

      for (let j = 0; j < l;) {
        let x = a[j++];
        let y = a[j++] + cl_cur;
        buf2x.fillRect(x,y,8,1);
      }

      pos += 32;
    }

    logo();
    title();
    scroll();

    player.run();

    if (++cl_cur == 8) {
      cl_cur = 0;

      if (++cl_pos == 32) {
        scroll();
        func = close;
      }
    }

    requestAnimationFrame(func);
  }

  function close() {
    canvx.fillStyle = c64[bars_col[br_pos]];
    canvx.fillRect(0,bars_pos[br_cur],384,1);

    player.run();

    if (++br_pos == 24) {
      br_pos = 0;

      if (++br_cur == 4) {
        canvx.drawImage(combo, 304,144,141,7, 34,35,141,7);
        func = fadesid;
      }
    }

    requestAnimationFrame(func);
  }

  function fadesid() {
    volume -= 0.015625;

    player.volume(volume);
    player.run();

    if (volume == 0.0) {
      player.stop();
    } else {
      requestAnimationFrame(func);
    }
  }

  function draw() {
    //logo background flash
    canvx.fillStyle = c64[back_col[tf_pos]];
    canvx.fillRect(0,31,384,80);

    tf_pos = (++tf_pos) & 255;

    //sprite animation
    let x = logo();
    let y = sprite_y[sp_pos++];

    if (y == 255) {
      y = 47;
      tf_pos = 0;
      sp_pos = 0;
    }

    canvx.drawImage(combo, 304,98,18,16, (198 - x),y,18,16);

    title();

    //scroll text background flash
    canvx.fillStyle = c64[back_col[bf_pos]];
    canvx.fillRect(0,186,384,50);

    scroll();

    player.run();
    requestAnimationFrame(func);
  }

  const combo  = new Image();

  combo.src = "data:image/png;base64,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";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");       //logo
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");       //font
  const buf2x = buf2c.getContext("2d", {alpha:false});
  const buf3c = document.createElement("canvas");       //title
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");       //scroll
  const buf4x = buf4c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "lord crucifier presents \"alderan\"... read the note for info about the editor and how to use your levels in the game. thanx to splatterhead for the original! we worship the damned of: (usa) demonix,empire,nei,tsm.. (euro) amnesia,chromance,dominators,enigma,excess,f4cg,fairlight,illusion,legend,red sector,success,talent,triad.. lcf crashing out,so long....                           ";
  const sc_len  = sc_text.length;
  const tx_size = [1,4,4,4,4,4,4,4,4,2,4,4,4,6,4,4,4,4,4,4,4,4,4,6,4,4,4,1,1,1,1,1,2,2,1,1,4,1,2,2,1,1,1,1,2,1,2,1,4,2,4,4,4,4,4,4,4,4,2,1,1,1,1,4];
  const tx_grid = [0,8,40,72,104,136,168,200,232,264,280,312,344,376,424,456,488,520,552,584,616,648,680,712,760,792,824,856,864,872,880,888,896,912,928,936,944,976,984,1000,1016,1024,1032,1040,1048,1064,1072,1088,1096,1128,1144,1176,1208,1240,1272,1304,1336,1368,1400,1416,1424,1432,1440,1448];

  const logo_pos = [70,67,65,64,62,60,59,57,55,54,52,50,49,47,45,44,42,41,39,38,36,35,33,32,30,29,28,26,25,24,22,21,20,19,18,16,15,14,13,12,11,11,10,9,8,7,7,6,5,5,4,4,3,3,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,3,3,3,4,5,5,6,6,7,8,9,9,10,11,12,13,14,15,16,17,18,20,21,22,23,25,26,27,29,30,31,33,34,36,37,39,40,42,43,45,47,48,50,51,53,55,56,58,60,62,63,65,67,68,70,72,74,75,77,79,80,82,84,85,87,89,90,92,94,95,97,98,100,102,103,105,106,108,109,110,112,113,115,116,117,118,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,134,135,136,136,137,137,138,138,139,139,139,140,140,140,140,140,140,140,140,140,140,140,140,140,140,139,139,139,138,138,137,137,136,135,135,134,133,133,132,131,130,129,128,127,126,125,124,123,122,120,119,118,117,115,114,113,111,110,109,107,106,104,103,101,100,98,96,95,93,92,90,88,87,85,83,82,80,78,76,75,73,71];
  const text_col = [9,0,9,9,2,9,2,2,8,2,8,8,10,8,10,10,15,10,15,15,7,15,7,7,15,7,15,15,10,15,10,10,8,10,8,8,2,8,2,2,9,2,9,9,0,9,0,0];
  const back_col = [1,13,13,7,7,15,15,14,14,4,4,6,6,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  const bars_col = [15,15,15,15,13,13,13,13,15,15,15,15,12,12,12,12,11,11,11,11,0,0,0];
  const bars_pos = [30,111,185,236];
  const sprite_y = [47,45,43,41,39,37,35,34,33,33,32,32,32,32,33,33,34,35,37,39,41,43,45,255,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,47,255];

  const text_buf = new Uint8Array(40);

  const fade1 = [[0,0,264,0],[8,0,272,0],[16,0,280,0],[24,0],[32,0],[120,0],[128,0],[136,0,136,8,136,16,136,24,136,32,256,32,256,40,256,48,256,56],[288,0],[296,0],[0,8,264,8],[8,8,272,8],[16,8],[24,8],[32,8],[112,8],[120,8],[128,8],[280,8],[288,8],[296,8],[0,16],[8,16,272,16,8,40,48,40,88,40,128,40,168,40,208,40,248,40,272,40],[16,16],[24,16],[32,16],[48,16,88,16,216,16],[56,16,96,16,104,16,160,16,168,16,192,16,224,16,232,16],[64,16,176,16,256,24],[112,16],[120,16],[128,16],[],[200,16,240,16],[264,16],[280,16],[288,16,24,40,64,40,184,40,224,40,288,40],[296,16],[0,24],[8,24],[16,24],[24,24,64,24],[32,24,72,24],[40,24,80,24],[48,24,88,24],[56,24,96,24],[104,24],[112,24],[120,24],[128,24],[160,24],[168,24],[176,24],[184,24],[192,24],[200,24,240,24],[208,24,248,24],[216,24],[224,24],[232,24],[264,24],[272,24],[280,24],[288,24],[296,24],[0,32],[8,32],[16,32,56,32,280,32],[24,32,64,32,184,32,224,32,288,32],[32,32,72,32,192,32,232,32],[40,32,80,32,120,32,160,32],[48,32,88,32,128,32,168,32,208,32,248,32,272,32],[96,32],[104,32],[112,32],[176,32,216,32],[200,32,240,32],[264,32],[296,32],[0,40,40,40,80,40,120,40,160,40,200,40,240,40,264,40],[16,40,56,40,176,40,216,40,280,40],[32,40,192,40,232,40,296,40],[72,40],[96,40],[104,40],[112,40],[136,40],[144,40],[152,40],[0,48,160,48,200,48,240,48],[8,48,88,48,128,48,168,48,248,48,272,48],[16,48,136,48,176,48,216,48,280,48],[24,48,144,48,224,48,288,48],[32,48,296,48],[40,48,80,48,120,48,264,48],[48,48],[56,48],[64,48],[72,48],[96,48],[104,48],[112,48],[152,48,192,48,232,48],[184,48],[208,48],[0,56,160,56,240,56],[8,56],[16,56],[24,56,288,56],[32,56,296,56],[40,56,80,56,120,56,264,56],[48,56,88,56,128,56,272,56],[56,56,64,56],[72,56],[96,56,136,56,280,56],[104,56,144,56,224,56],[112,56,152,56,232,56],[168,56,248,56],[176,56],[184,56],[192,56],[200,56],[208,56],[216,56],[],[],[],[],[],[32,16,72,16],[40,32],[104,32,128,32],[48,16,104,16,0,32,88,32],[72,0,88,0,56,16,96,16,24,32,160,32],[144,32],[],[],[112,16,136,32,152,32],[],[],[40,16,64,32],[],[96,0,80,16,16,32],[128,16,8,32,72,32],[56,0],[],[64,0,64,16,136,16,80,32,112,32,168,32],[80,0,112,0],[104,0,120,16],[120,32],[],[],[],[48,32],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[88,16],[],[16,16,152,16],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  const fade2 = [[40,0,120,0,232,0,312,0,344,0,952,0,424,8,488,8,648,8,744,8,760,8,776,8,792,8,808,8,1128,8,1208,8,1240,8,1224,16],[48,0,128,0,240,0,320,0,352,0,960,0,1008,0,656,8,688,8,720,8,752,8,768,8,784,8,800,8,816,8,1136,8,1216,8,1232,16,272,24],[168,0,72,8,136,8,200,8,456,8,520,8,584,8,944,8,1096,8,1272,8,1368,8,1448,8],[176,0,112,8,144,8,208,8,464,8,592,8,952,8,1280,8,1376,8,1456,8],[184,0,16,8,600,8,960,8,1256,8,1288,8],[192,0,272,8,304,8,576,8],[8,8,824,8],[24,8],[32,8,256,8,1120,8],[40,8,168,8,312,8,344,8,616,8,72,16,136,16,152,16,376,16,392,16,440,16,456,16,680,16,696,16,744,16,1160,16,1240,16,8,24,24,24,40,24,56,24,72,24,104,24,216,24,232,24,248,24,312,24,328,24,344,24,376,24,392,24,408,24,488,24,520,24,536,24,552,24,616,24,648,24,664,24,696,24,712,24,792,24,824,24,1096,24,1128,24,1192,24,1272,24,488,32],[48,8],[56,8],[64,8],[80,8],[88,8],[96,8],[104,8],[120,8],[128,8,176,8,320,8,352,8,624,8,64,16,80,16,128,16,144,16,160,16,384,16,432,16,448,16,464,16,672,16,688,16,736,16,752,16,1168,16,1216,16,16,24,32,24,48,24,64,24,80,24,224,24,240,24,256,24,320,24,336,24,352,24,384,24,400,24,528,24,544,24,560,24,624,24,656,24,672,24,688,24,1120,24,1136,24,224,32,544,32,816,32],[152,8,216,8,440,8,472,8,504,8,1352,8,1384,8,1464,8],[160,8,416,8,448,8,480,8,512,8,1168,8,1200,8,1360,8,1392,8,1472,8],[224,8],[232,8],[240,8],[248,8],[264,8,296,8,1304,8],[8,16],[16,16],[24,16],[32,16,256,16,920,16,1120,16],[40,16,344,16,648,16,1128,16],[48,16,352,16,656,16,1136,16],[],[56,16,664,16],[104,16,408,16,712,16],[112,16,416,16,720,16],[120,16,424,16,728,16,1208,16,680,24],[168,16,472,16],[176,16],[184,16],[200,16,504,16,808,16,912,24,40,32,168,32,232,32,248,32,264,32,312,32,328,32,344,32,376,32,408,32,424,32,552,32,776,32,824,32,1128,32,1144,32,488,40,536,40,952,40,1224,40],[208,16,512,16,816,16],[216,16,520,16],[224,16,528,16,1232,32],[232,16,536,16],[240,16,544,16,848,16],[248,16,552,16,912,16],[264,16],[272,16],[296,16],[304,16],[1400,16],[1408,16],[112,24,416,24,720,24],[120,24,424,24,728,24,1208,24],[128,24,432,24,736,24,1216,24],[136,24,440,24,744,24,1224,24],[144,24],[152,24],[160,24,848,24,1168,24,64,32,304,32,480,32,512,32,608,32,968,32,1120,32,1200,32,1264,32,1296,32,1360,32,1392,32,224,40,816,40],[168,24,472,24,776,24],[176,24,480,24,784,24,1264,24],[200,24,504,24,808,24,1288,24],[208,24,512,24,816,24,1296,24],[264,24],[296,24],[304,24,608,24,968,24,1392,24],[1400,24],[1408,24],[8,32,72,32,104,32,200,32,520,32,616,32,648,32,712,32,792,32,1096,32,1176,32,1208,32,1272,32,1336,32],[16,32,80,32,112,32,208,32,528,32,624,32,656,32,720,32,800,32,1184,32,1280,32,1344,32],[24,32,120,32,664,32,728,32],[920,24,32,32,176,32,240,32,256,32,272,32,320,32,336,32,384,32,416,32,560,32,672,32,784,32,1136,32,496,40,544,40,960,40,1232,40],[48,32,352,32,1152,32],[1160,24,56,32,296,32,472,32,504,32,600,32,960,32,1192,32,1256,32,1288,32,1352,32,1384,32,216,40,808,40],[88,32,152,32,288,32,360,32,592,32,632,32,840,32,952,32,1160,32,1248,32,1376,32,208,40,800,40],[96,32,368,32,640,32,848,32,920,32,1080,32,1168,32],[128,32,432,32],[136,32],[144,32],[160,32],[216,32,536,32,808,32],[1456,24,280,32,584,32,912,32,944,32,1048,32,1072,32,1240,32,1368,32,1456,32],[1400,32],[1408,32],[200,40],[328,8],[336,8,920,8],[376,8,680,8],[384,8],[392,8],[400,8],[408,8,1192,8],[432,8,496,8,1248,8],[528,8],[536,8,1320,8],[544,8,848,8,1328,8],[552,8,912,8],[560,8],[568,8],[608,8,968,8,1264,8,1296,8],[984,8],[992,8],[312,16,616,16,1096,16],[320,16],[328,16],[336,16],[400,16,704,16],[480,16],[488,16,792,16,1272,16],[496,16,800,16],[560,16],[568,16],[584,16,944,16,1368,16,1464,16,456,24,760,24],[592,16,952,16],[600,16,960,16],[608,16,968,16],[984,16],[992,16],[448,24,752,24,1232,24],[1376,16,1472,16,464,24,768,24],[496,24,800,24,1280,24],[584,24,944,24,1368,24,456,32],[592,24,952,24],[600,24,960,24],[984,24],[992,24],[392,32],[400,32],[440,32],[448,32,752,32],[464,32],[496,32],[984,32],[992,32],[616,0],[624,0],[664,8],[672,8],[696,8],[704,8],[712,8],[728,8],[736,8],[832,8,1312,8],[840,8],[624,16],[632,16],[760,16],[768,16],[776,16],[784,16],[824,16],[832,16],[840,16],[1448,16],[1152,16,1456,16],[704,24],[832,24],[840,24],[1464,24],[1472,24],[680,32],[688,32],[696,32],[704,32],[736,32],[744,32],[760,32],[768,32],[832,32],[1464,32],[1056,32],[792,40],[1048,40],[1056,40],[1000,0],[1104,8],[1112,8],[1144,8],[1152,8],[1160,8],[1176,8],[1184,8],[1336,8],[1344,8],[1000,8],[1008,8],[1104,16],[1112,16],[1144,16],[1176,16],[1184,16],[1192,16],[1200,16],[1248,16],[1256,16],[1264,16],[1280,16],[1288,16],[1296,16],[1312,16],[1320,16],[1328,16],[1336,16],[1344,16],[1352,16],[1360,16],[1384,16],[1392,16],[1104,24],[1112,24],[1144,24],[1152,24],[1176,24],[1184,24],[1200,24,1360,24],[1240,24],[1248,24],[1256,24],[1312,24],[1320,24],[1328,24],[1336,24],[1344,24],[1352,24],[1376,24],[1384,24],[1104,32],[1112,32],[1216,32],[1224,32],[1312,32],[1320,32],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];

  let lo_pos = 174;
  let sp_pos = 24;
  let tf_pos = 16;
  let tt_pos = 21;
  let bf_pos = 16;

  let sc_off = 6;
  let sc_ctr = 1;
  let sc_org = 0;
  let sc_pos = 0;
  let sc_spc = 312;

  let cl_pos = 0;
  let cl_cur = 0;
  let br_pos = 0;
  let br_cur = 0;

  let volume = 1.0;

  let func = draw;

  setTimeout(initialize, 100);
}