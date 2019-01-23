/*
  Hyper Aggressive Crack
  Section 8 (1992)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 16;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 480;
    buf2c.height = 16;
    buf2x.imageSmoothingEnabled = false;
    buf2x.drawImage(line1, 104,0);
    buf2x.globalCompositeOperation = "source-atop";

    buf2x.fillStyle = c64[0];
    buf2x.fillRect(104,0,264,16);

    buf3c.width  = 488;
    buf3c.height = 16;
    buf3x.imageSmoothingEnabled = false;
    buf3x.drawImage(line2, 112,0);
    buf3x.globalCompositeOperation = "source-atop";

    buf3x.fillStyle = c64[0];
    buf3x.fillRect(112,0,256,16);

    canvc.addEventListener("click", exit);

    function exit(e) {
      canvc.removeEventListener("click", exit);
      cancelAnimationFrame(afid);

      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);

      canvx.drawImage(text, 34,35);

      player.stop();
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    canvx.drawImage(screen, 0,0);

    if (sc_wait) {
      sc_wait--;
    } else {
      /* scroll text */
      sc_ctr = (sc_ctr - 3) & 255;

      if (sc_ctr & 8) {
        sc_ctr += 8;

        buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);

        let cx = sc_text.charCodeAt(sc_pos);
        if (cx >= 96) { cx -= 96; }
        cx *= 16;

        if (tx_step++ == 1) {
          tx_step = 0;
          cx += 8;

          if (++sc_pos == sc_len) {
            sc_pos = 0;
          }
        }

        buf1x.drawImage(font, cx,0,8,16, 312,0,8,16);
      }

      sc_xpos = 7 - (sc_ctr & 7);
      canvx.drawImage(buf1c, sc_xpos,0,304,16, 40,35,304,16);

      /* first line flash color */
      if (col_counter1++ ==1) {
        col_counter1 = 0;

        if (col_flash1 == 22) {
          col_flash1 = 0;
        }

        buf2x.fillStyle = c64[colors1[col_flash1++]];
      }

      buf2x.fillRect(104,0,264,16);

      /* second line flash color */
      if (col_counter2++ == 1) {
        col_counter2 = 0;

        if (col_flash2 == 22) {
          col_flash2 = 0;
        } else {
          buf3x.fillStyle = c64[colors2[col_flash2++]];
        }
      }

      buf3x.fillRect(112,0,256,16);
    }

    /* first line scroll */
    canvx.drawImage(buf2c, lines[line1pos],0,304,16, 40,59,304,16);
    line1pos = (line1pos + 2) & 255;

    /* second line scroll */
    canvx.drawImage(buf3c, lines[line2pos],0,304,16, 40,83,304,16);
    line2pos = (line2pos + 2) & 255;

    /* sprites */
    if (spr_counter1++ == 2) {
      spr_counter1 = 0;

      let f = spr_frames[spr_pos1];

      if (f == 4) {
        spr_pos1 = 0;

        if (++spr_number1 > 7) {
          spr_number1 = 0;
        }
      } else {
        spr_pos1++;
        spr_current[spr_number1] = f * 10;
      }
    }

    if (spr_counter2++ == 3) {
      spr_counter2 = 0;

      let f = spr_frames[spr_pos2];

      if (f == 4) {
        spr_pos2 = 0;

        if (spr_number2 == spr_number1) {
          spr_number2++;
        }

        if (spr_number2 == 7) {
          spr_number2 = 0;
        } else {
          spr_number2++;
        }
      } else {
        spr_pos2++;
        spr_current[spr_number2] = f * 10;
      }
    }

    for (let i = 0; i < 8; i++) {
      canvx.drawImage(sprite, spr_current[i],0,10,5, spritex[i],spritey[i],10,5);
    }

    player.run(1250);
    afid = requestAnimationFrame(draw);
  }

  const screen = new Image();
  const font   = new Image();
  const line1  = new Image();
  const line2  = new Image();
  const sprite = new Image();
  const text   = new Image();

  screen.src = "data:image/png;base64,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";
  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQBAMAAAB6qhA4AAAAElBMVEUAAAD///+EhIRNTU22trWm+p5QOS0hAAADAklEQVRo3u2YS24iQQyGu2nYww0QJ0DKBWbRB5hN7n+Vof3Ih23oyJOAoohfqnb58dvlohZOhhdeUExvF5yHNxXoZrANcvqwy5KPANWXQDlnzzeRF5366ApNgyQfdlke30eXNBVCH/QpB0DP18vvEH6XHN+vC04CF+huuCdtyUeAasuNx2Wdct6kYw52zxlzb5Z82K95fXRJm0LoI5xXvukeUl/HdF85vl8XzLMsE+jsNQ4ZFg7UxJu38/zHfOYiBntKybaeZ0u+yrsNIVWjklrYFkIfq33mJUBhS3y/Lnh/l2UCnb3GIcPCgRp5gr/mMxcx2FNKtvU8O/JlXoYE+0GqU0kNQPgKVvvMS4DClnjrs1EXHA6yTNiHvelFJkLgjIf9VZxgv6jUOVAXu6+YDj8BY84H4wocYBHjcgqcQMwdjFRpozRXL5A2a29sc/9yKY3iL7ygmHzaZqoUu4+ik7qRGus8i1QwlfqsrPIsU/uZqR2+6BP1XSqTc3AeIXjgAM/yqXOBalLorKq3NgDiFPC/C9QF9OV9Xt8n/SDD9I6Ov/mLl6nwWrp9+TB1InUpLFKBHevJpnbPp6rHHRc95NukvPCQx0u+jfFVwpdiVJZiYmD4ZQQmDgj/oaBq7DMclL6C5J5j/73KdMhEHiT2qNd4PLrzoZ94n9rT1I//ssgHhy/xnt/ybYmXZZiZ+kXMspkXDBUw4T8e4f744kuS+Nt6szLwiTxI7Emv8Xh0J2sXeDa1p6kfP7wBTvyGvALPF+omqME9u4U1PA9y2rsI98cXX5bE39b/E0zkK5K4Gv/hEfUmz6d2pn78lec6X7WP4ttfloB8iZ8hxTnJEzGu1av3x32wv90fOv7f/wCWjYux8QDSQ6jg+h71AKj/0AdAfvB5vyQSrEqNR6eBakfnAVT7Ci/n9b/j5XvI+ZB9COsRWH0Atc/aB/q6/RsfwH4YVbqefzD88QFgX38AxJGPOPzkjfq9fD/xAYwrD6D2pcAuNvRP7J0H8Po30JNw+UF+Lv4Blul4vtSpsBwAAAAASUVORK5CYII=";
  line1.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAAQAQMAAADQynP+AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAK1JREFUKM+N0bEJAzEMhWFBipQeIYs8uMUOnNE8SkZQqeKB8uQYAklxtjDYH39hsF2vHgcfkWw6ZfSwI/J1sDjFguShqSJZY7q4tnCBAwbcRjOnw+vijskuduwUBs1/YauwjULv99Puoz2dAT29s6h24D5ygtPaaMNPQpCRosloo9OMtFWAGl2IxSpsp/B5/Cm+7DtFsqaKJJGcxQerEPT5PVX0IHqsQjwLweV6A9r3CyBPmvGmAAAAAElFTkSuQmCC";
  line2.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAAQAQMAAADDHTMKAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAKNJREFUKM+VissJw0AMRNXBluBGBNuYQSnNpbiEOeowoIzlSw4hG2sQ8+HZ8tyBmZN12paXrM7JyMhh8MkboACYTLKCmvQBuLsBJruT3uEC1J4CpqUB6V8gWBkMVCrukqmrVY5XesCKQVUUFXWXFULrOOgFo5tGtrvUZhoaoP0G9gbwBQAhYM8FMNFACdB7x2KbJGA7u0beQMfIBq4wjnEIWN0bDPP6KCiux9QAAAAASUVORK5CYII=";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAFAgMAAABKokYWAAAADFBMVEUAAAA3OcRwfOZi2MyJHalqAAAAG0lEQVQI12OAAVYYI4CBCyrAupR1/VI0UagUAETZAsdU6FqnAAAAAElFTkSuQmCC";
  text.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALUAAAAIAQMAAACFySxBAAAABlBMVEUAAAD///+l2Z/dAAAAcklEQVQI11WOsRHDQAgEoQuV4dDu5r8T6AK6kzs4MpT53m8FPoadYecCBLKjRvC6MziUX39oLPMc5KwLUA+1wqFeARYLMmNmaIV6RhNpZ78zlmc5l3fC08aYl/189Pa5vZtUvAyKh3ZZCxcYKLu/POU/H+TKRGPH/AfoAAAAAElFTkSuQmCC";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const sc_text = "what we do with games ??? see, crack and play... hyper aggressive by the x-ample architectures was brought to you in early december by nit1 of section 8... original provided by sph/section 8 - we greet our crime-partners in  : talent - rsi - legend - f4cg - success - dominators - triad - illusion - empire - tsm - havok - nei and the rest...                        ";
  const sc_len  = sc_text.length;

  const c64     = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const colors1 = [6,4,14,3,13,1,1,1,1,1,1,1,1,1,1,1,13,3,14,4,6,0];
  const colors2 = [1,1,1,1,1,1,7,10,8,2,9,0,9,2,8,10,7,1,1,1,1,1];
  const lines   = [80,77,75,73,71,69,67,65,63,61,59,57,55,54,52,50,48,46,45,43,41,39,38,36,35,33,31,30,28,27,25,24,23,21,20,19,18,16,15,14,13,12,11,10,9,8,7,7,6,5,5,4,3,3,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,3,3,4,4,5,6,6,7,8,9,10,11,12,13,14,15,16,17,18,20,21,22,24,25,27,28,29,31,33,34,36,37,39,41,42,44,46,48,50,51,53,55,57,59,61,63,64,66,68,70,72,74,76,78,80,82,84,86,88,90,92,94,96,98,99,101,103,105,107,109,111,112,114,116,118,119,121,123,124,126,128,129,131,132,134,135,137,138,139,141,142,143,144,146,147,148,149,150,151,152,153,153,154,155,156,156,157,157,158,158,159,159,160,160,160,160,160,160,160,160,160,160,160,160,160,159,159,159,158,158,157,157,156,155,155,154,153,152,151,150,150,149,147,146,145,144,143,142,140,139,138,136,135,133,132,130,129,127,126,124,122,121,119,117,115,114,112,110,108,106,105,103,101,99,97,95,93,91,89,87,85,83,81];

  const spritex     = [56,263,263,144,93,248,296,328];
  const spritey     = [101,76,54,77,53,75,76,100];
  const spr_frames  = [0,1,2,3,2,1,0,4];
  const spr_current = [0,0,0,0,0,0,0,0];

  let sc_ctr  = 0;
  let sc_pos  = 0;
  let sc_xpos = 0;
  let sc_wait = 393;
  let tx_step = 0;

  let line1pos     = 110;
  let line2pos     = 78;
  let col_counter1 = 0;
  let col_counter2 = 0;
  let col_flash1   = 8;
  let col_flash2   = 19;

  let spr_counter1 = 0;
  let spr_counter2 = 0;
  let spr_pos1     = 4;
  let spr_pos2     = 7;
  let spr_number1  = 6;
  let spr_number2  = 7;

  let afid = 0;

  setTimeout(initialize, 100);
}