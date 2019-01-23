/*
  Mad Doctor +6D Crack
  Hokuto Force (2005);
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 184;
    buf1c.height = 8;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 320;
    buf3c.height = 8;
    buf3x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    canvx.drawImage(logo, 32,35);
    canvx.drawImage(text, 320,0,1,7, 0,200,384,7);
    canvx.drawImage(text, 320,0,1,7, 0,224,384,7);

    canvx.fillStyle = c64[11];
    canvx.fillRect(0,0,384,27);
    canvx.fillRect(0,239,384,33);

    print();

    canvx.fillStyle = c64[1];
    canvx.fillRect(96,187,184,8);
    canvx.drawImage(buf1c, 0,0,184,8, 96,187,184,8);

    buf2x.fillStyle = c64[0];
    buf2x.fillRect(0,0,320,16);

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);
      canvx.drawImage(text, 0,0,320,15, 32,35,320,15);

      player.stop();
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function print() {
    let txt = "presents  mad doctor+6d";
    let len = txt.length;

    for (let i = 0; i < len; i++) {
      let cx = txt.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      buf1x.drawImage(font, (cx * 8),0,8,8, (i * 8),0,8,8);
    }
  }

  function draw() {
    // flash title
    if (--tt_ctr == 0) {
      tt_ctr = 6;

      if (++tt_pos == 6) {
        tt_pos = 0;
      }

      canvx.fillStyle = c64[tt_cols[tt_pos]];
      canvx.fillRect(96,187,184,8);

      canvx.drawImage(buf1c, 0,0,184,8, 96,187,184,8);
    }

    // scroll text
    if (++sc_off > 7) {
      sc_off = 0;

      buf2x.globalCompositeOperation = "copy";
      buf2x.drawImage(buf2c, 8,0,312,8, 0,0,312,8);
      buf2x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf2x.drawImage(font, (cx * 8),0,8,8, 312,0,8,8);
    }

    // update scroll colors
    for (let i = 0; i < 40; i++) {
      buf3x.fillStyle = c64[sc_cols[sc_idx]];
      buf3x.fillRect((i * 8),0,8,8);

      if (++sc_idx == 16) {
        sc_idx = 0;
      }
    }

    canvx.drawImage(buf3c, sc_off,0,304,8, 39,211,304,8);
    canvx.drawImage(buf2c, sc_off,0,304,8, 39,211,304,8);

    player.run();
    afid = requestAnimationFrame(draw);
  }

  const font = new Image();
  const logo = new Image();
  const text = new Image();

  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAWxJREFUKM+NkLFq3EAQhjVs4TJMILk0xzbuUucRXKUMISQiuEpljKtDhRBimQdwcWXKFCG4DleEcFxhhpDaCCOMii2NMYsRKo7j90h2a/C3sMMsOx8/k0FccCEEVmLPIs564hECwPtQXgYgxlNWAFvZOMcUSERhSAbmVzyfe9bE/mHSH0wlwTDBgl4AqjpN3HFK9tEnHn0EzkBuznt7TMrO25hjJ+dWJchjgmopQKPKBEKkJBtybiMBEcCPMYFnPzMhT8yIk7LY7b8ADIP+AZ0JDuI7/W/vYwY7U4K1CcYdzAKrMDGLD+xUzJbozT7EEmDpAMRTOY+FtpLIJSdJkkYcIWbI3//KLw9/f2xW5bd88f3wIv/QnDX51/7z6wLtMQb8KQBsb88aLYZu1R+/7T+1/c++UZS4zlCe3JRt/XfRDXVR1uv6qmyHdVdWu+plja4ywbaeBOuus2bYnRzt6u1uNQwdatxmeJoKz+Aebtg1Q3TqtUYAAAAASUVORK5CYII=";
  logo.src = "data:image/png;base64,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";
  text.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUEAAAAPBAMAAACIBWCqAAAAD1BMVEUAAAC2trWEhIRNTU3////hyNgOAAABmUlEQVRIx9WV2XVDIQxEcQdMBy4hJaT/qvKEuJ4oPMg5/jMyBm0w1oLba0jt0S+SYg4+BnysOfu0bcMAn9znOcwY2IcyfHxPRz/Oxgc9sL7g8gTFV3ySuBUuJzc8FHhsadvqr1RIcb6mbw85evxig55f/xyeRihb4bEgnCQJbkXoG1nxmSte5WzuCz15jeBKC0Ii7SzkOtRQBIHs9z8ICwLODJ9bhLUSRNUMbN81hh2EsTjLyYMAakqfc5ZBiM/6C7yznWNoJDUj+rV3rbDntouOCDlrRXisw4L+ufQyVsQW77teRgfC0G96Gbs3evlzRs1qc5ykUtnsY0Vf8+BefNWqHBvHVshr7FgZcGhB6LqBV63XlKWUgRxZ6Gv1JPGOLiTbGZvrDdoh1A1CiXdsRYg+yX5YmriP1w5MufIeks2KsGu+gwUhHYOeYeSYdqqk1Q4UWUZmhAAA2zmGkszLCG13zjKvi1KI1v8dliWtMUzdHuFF5vcIUW0Q+k2kdurbarqrQwYWZHvtZSM89TL2Rpjknq3d+G8v/wCAaDsMZ4mCOgAAAABJRU5ErkJggg==";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "      reanimate the dead corpses is the dream of my life... it doesn't matter if i must slay innocent people to achieve my purposes .. today you call me psycopath, tomorrow you'll hail me as a genius!   mad doctor was cracked, trained and packed by ian coog, supplied and dox'ed by the overkiller. a walkthrough by kindar spirit has been added aswell.  new gothic intro by freedom/hf. visit our monastery at www.hokutoforce.c64.org for more releases. greets 2: remember, onslaught+antiques, pol, nos, excess, civitas, surprise!productions, k2 ,tnd, role, oxyron, noname, chronic, angels, viruz, gb64 ,dohi, mayhem uk, sokratekk and you !!!   the overkiller                  ";
  const sc_len  = sc_text.length;

  const tt_cols = [11,12,15,1,15,12];
  const sc_cols = [12,12,12,15,15,15,1,1,1,15,15,15,12,12,12];

  let tt_ctr = 4;
  let tt_pos = 0;

  let sc_off = 7;
  let sc_pos = 0;
  let sc_idx = 0;

  let afid = 0;

  setTimeout(initialize, 100);
}