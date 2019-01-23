/*
  Firefly ++ Crack
  The Papillons Inc. (1988)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 300;
    buf1c.height = 56;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 224;
    buf2c.height = 12;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 320;
    buf3c.height = 6;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 320;
    buf4c.height = 40;
    buf4x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf1x.drawImage(logo1, 0,0);
    buf1x.globalCompositeOperation = "source-atop";

    buf3x.fillStyle = c64[0];
    buf3x.fillRect(0,0,320,6);

    buf4x.fillStyle = c64[0];
    buf4x.fillRect(0,0,320,40);

    print("pride of denmark", 128,99,126,6);
    print("presents", 160,131,62,6);
    print("press 't' for trainer", 112,227,166,6);

    fl1_val.fill(0);

    printToBuffer(".......firefly ++.......", 0);
    printToBuffer("trained in denmark: 21.02.88", 6);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", begin);

    player.play();
  }

  function print(text, x ,y, width, height) {
    canvx.fillStyle = c64[1];
    canvx.fillRect(x,y,width,height);

    for (let i = 0, len = text.length; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      canvx.drawImage(font1, cx,0,8,6, x + (i * 8),y,8,6);
    }
  }

  function printToBuffer(text, y) {
    for (let i = 0, len = text.length; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      buf2x.drawImage(font1, cx,0,8,6, (i * 8),y,8,6);
    }
  }

  function scroll() {
    let v = rs3.pop();
    rs3.unshift(v);

    for (let i = 0; i < 40; i++) {
      canvx.fillStyle = c64[rs3[i]];
      canvx.fillRect(32,180 + i,320,1);
    }

    if (--sc2_ctr == 0) {
      let cx = sc2_text.charCodeAt(sc2_pos);
      if (cx >= 96) { cx -= 96; }

      sc2_ctr = 7;
      sc2_org = cx * 56;

      if (++sc2_pos == sc2_len) {
        sc2_pos = 0;
      }
    }

    buf4x.globalCompositeOperation = "copy";
    buf4x.drawImage(buf4c, 8,0,312,40, 0,0,312,40);
    buf4x.globalCompositeOperation = "source-over";

    buf4x.drawImage(font2, sc2_org,0,8,40, 312,0,8,40);
    sc2_org += 8;

    canvx.drawImage(buf4c, 0,0,320,40, 32,180,320,40);
  }

  function begin() {
    canvx.drawImage(rast1, 0,rs1_pos,1,56, 38,35,300,56);
    canvx.drawImage(logo2, 38,35);

    if (--rs1_pos < 0) {
      rs1_pos = 95;
    }

    if (--rs2_ctr == 0) {
      rs2_ctr = 4;
      buf1x.drawImage(rast2, 0,0,1,rs2_h, 0,(55 - rs2_h),300,rs2_h);

      if (++rs2_h == 56) {
        rs2_ctr = -1;
      }
    }

    canvx.drawImage(buf1c, 38,35);

    main();

    if (--sc2_int < 0) {
      func = draw;
    }

    player.run();
    requestAnimationFrame(func);
  }

  function draw() {
    canvx.drawImage(rast1, 0,rs1_pos,1,56, 38,35,300,56);
    canvx.drawImage(logo2, 38,35);

    if (--rs1_pos < 0) {
      rs1_pos = 95;
    }

    main();
    scroll();

    player.run();
    requestAnimationFrame(draw);
  }

  function main() {
    // top scroll
    if (--sc1_off < 0) {
      sc1_off = 7;

      buf3x.globalCompositeOperation = "copy";
      buf3x.drawImage(buf3c, 8,0,312,6, 0,0,312,6);
      buf3x.globalCompositeOperation = "source-over";

      let cx = sc1_text.charCodeAt(sc1_pos);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      if (++sc1_pos == sc1_len) {
        sc1_pos = 0;
      }

      buf3x.drawImage(font1, cx,0,8,6, 312,0,8,6);
    }

    if (--sc1_ctr == 0) {
      if (++sc1_col > 5) {
        sc1_col = 0;
      }

      sc1_ctr = sc1_col != 2 ? 4 : 8;
    }

    canvx.fillStyle = c64[fl3[sc1_col]];
    canvx.fillRect(39,115,304,6);
    canvx.drawImage(buf3c, 7 - sc1_off,0,304,6, 39,115,304,6);

    // firefly text flash
    if (--fl1_ctr == 0) {
      fl1_ctr = 4;
      fl1_val.unshift(fl1[fl1_pos]);
      fl1_val.pop();

      if (--fl1_pos < 0) {
        fl1_pos = 13;
      }

      for (let i = 0; i < 12; i++) {
        let x = i * 8;
        canvx.fillStyle = c64[fl1_val[i]];
        canvx.fillRect(192 + x,147,8,6);
        canvx.fillRect(184 - x,147,8,6);
      }

      canvx.drawImage(buf2c, 0,0,192,6, 96,147,192,6);
    }

    // trained in text flash
    if (--fl2_ctr == 0) {
      canvx.fillStyle = c64[fl2[fl2_pos]];
      canvx.fillRect(80,163,222,6);

      canvx.drawImage(buf2c, 0,6,222,6, 80,163,222,6);

      fl2_col = fl2[fl2_pos];
      fl2_ctr = 4;

      if (++fl2_pos > 5) {
        fl2_ctr = 8;
        fl2_pos = 0;
      }
    }
  }

  const logo1 = new Image();
  const logo2 = new Image();
  const font1 = new Image();
  const font2 = new Image();
  const rast1 = new Image();
  const rast2 = new Image();

  logo1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA4AQMAAAB9g1cPAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAALhJREFUSMft0u2JAzEMhOEBF7AluXWVpAIE7x26izYmJniTkA+IGQZ7eH5aqwf8rLp1+61xxtQg9io2zOtsA/YqNsyvYj0atpeUbJglqbuwqmLDvM5yrTqxYf4w1u0jGfVmxvwQa8XalEUyIMvydsk2sDXmayyOsCgWE9aAI8yL+YTpxKyYzVhPZlKNmjE1bIXpsax/2dOZ6y8U4w4WyjSufqSNyMD/DOhNWCMyRLG4nYnI4MVci+cHu+xmpidQJ70AAAAASUVORK5CYII=";
  logo2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAA4BAMAAAC1Y9h/AAAAIVBMVEUAAAAAAADk7U7///+2WRxoOAjqdGxi2Mym+p6vKilKxkrw4xKyAAAAAXRSTlMAQObYZgAAAhFJREFUaN7tl9FNJEEQQ53CpEAKpEAKl8KlcCmQwqVwUV5v0duPptiiSqqPAY1/MG7L8nil2V4dA1o4DFntztF2Xs4GN+VpYfqSmiYV0saL2cCe9fkdzJfVNJlwbbyajSqKUj+jZdYqZ7MWCr6UlqlVz6bW7w1mS2qaRMu082I2uNaqraVFtHxZ7dDA8bhWNXthBP+9wXIWTWqGJcjzajaQmHLRrGYI1qpmA332pF9qybVK2cdxylraa/0amNKdJ7WJx2e17B+/lga61uqrxd/+Wi8DU7rzgubO4MWca61KzveotV3NH19UIh9nAQ+zEf1aRuMnQupdy4hfy/C0rzCBhq9/LdKp5W+dXvS+tlqEc13V846biobofIkfZPDYu4frlGsN5ZRrmWsqSHEtlMZavpfi30eoztf4IfpPUW6/cC2EvrWgfi02iNfC17QWHIjXKa+y4HWKr73Wsb2q+fIBya/Tri8fH/nCGiB8StC5FtA513rTzlvLXVizF9u2S7PPvNaqrHXeWv8GPhyhwSOf92dygsxrrcpa5631OvDhCA2OBjjj8HMOJcdl4utai0N5Do3WQmpcy9jAI/4ariUDvpZaRibkOVCQvfukPwNmA2jw0GfEIM+Bguzdd61VWKupFsFyHCjKBqbwowigwUOfMYMcBwqyd1/HWlD7z3P+Ta3FG8NsAA2e8BkcX4izd99/bA9KQdneIuQAAAAASUVORK5CYII=";
  font1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAGAQMAAACPcLSNAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAN5JREFUGNOVkKFxxEAMRW9GQPBKCAgwMDjwQYCByrkCAgIDDARdwpZwZQSqBAMDQwMV8KO9ywWF5M1qRrOzevtHJ7q6qs4QgWn1s1YHXCFOX1fGcOM7g7zX7qEKmcWdneVEwGBmiBxsRMcCmBZsjfvSSqDcfwWBJTeYJRAsrieKGM7nV4k8d0FPEMDYPEqgWmO3qo5Q2RDuovrlMzvxTAAEBpsAy0sGfLzESwnWRvaxx+MqQ9iWiYa8W1sJ+g7MIXUAt3yT8PCPeO6gEkwPwcHjs/+f6s2dP4J/cPxx9w3kaPGZbBntagAAAABJRU5ErkJggg==";
  font2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAADgAAAAAwAQMAAABXScL6AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAAatJREFUeNrtmtFuwzAIRSfl/7+5G8uVcbj1vGUvRT1XajCGEKdH4gHl4yEdXzqvR/GKkY1lGHllUyXXNWXleRUz57U8VjWl4WlLRtJTZeegAnOmy2Ou8WLphIbxwxdvun2vMxGAAAQgAAEIQAACsDdA1FMAbC4B9LYVMk8mY+krM/fV+LSzN6Pqs1gs51isculNTGsPqWyoBP/fQi8HzAfkcf3/lOZY1vlZ34kABCAAAQhAAAIQgM0BoqYCYHNlCw3JWAuNRRq1g/RDmblpoetR2rKFjkFamVQ9b6FZc90Yo2KN7ZXnTK8UqT2wjBHtpZVzyfz9aQAIQAACEIAABCAAuwNETQXA5ro3StOmd73cHxEvLcmT78XUVLIRz1V9HJV+JprWzW+vdep6xHjptyVNmaX15p37owAQgAAEIAABCEAAtgeImgqAzXVtoZtP65W6+Ey8bsrzjiiNWBmlKbN4sRybNz+t91FaRv4yvvLa+m2GZ6HJm9/51qf1AAQgAAEIQAACEIDtAaKmAmBzAfCejseLCIAAfEsBsLkA2FwAbC4ANhcAm+tlAH4CtfbgMctOysYAAAAASUVORK5CYII=";
  rast1.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAABgBAMAAAAukwVFAAAAD1BMVEUAAAC2trWEhIRNTU3////hyNgOAAAAJElEQVQI12MYDMAAhIFQAYSBUACEgdABhCEkiA+VUYCohOgCAHjABAElInKaAAAAAElFTkSuQmCC";
  rast2.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA4BAMAAADOTo/fAAAAG1BMVEXk7U7///+2WRxoOAhi2Mym+p7qdGxKxkqvKilJuUXWAAAAN0lEQVQI1xXKQREAIAzEwJNQCUioBCQgAQlIQHqTZvbTuVQC74q+qEVLFLkWRX5FLXqiI9qi0gAujgqBHCtTTQAAAABJRU5ErkJggg==";

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

  const sc1_text = '    allright here we present a super trainer of "firefly".     buy the latest software from us!  write to: tpi - poste restante - 2900 heellerup 1 - denmark      note: original broken by fusion.    press \'t\' for unlimited energi and "something else"       ';
  const sc2_text = '     top 10 rankings 8th week : fusion - fairlight - beastie boys - ace - detonator - tlc - sharks - triad - c64cg - madsquad          us ranking : fbr - rad - twb - atc - nfi       danish ranking : dominators - new life - danelaw - triton t - tg 1541     ';
  const sc1_len  = sc1_text.length;
  const sc2_len  = sc2_text.length;

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const fl1 = [15,1,1,15,12,11,12,15,1,1,15,12,11,12];
  const fl2 = [10,7,1,7,10,2];
  const fl3 = [8,7,1,7,8,9];
  const rs3 = [9,5,9,5,5,13,5,13,13,1,13,1,1,13,1,13,13,5,13,5,5,9,5,9,2,10,2,10,10,7,10,7,7,1,7,1,1,7,1,7,7,10,7,10,10,2,10,2,6,14,6,14,14,3,14,3,3,1,3,1,1,3,1,3,3,14,3,14,14,6,14,6];

  let rs1_pos = 95;
  let rs2_ctr = 7;
  let rs2_h   = 1;

  let fl1_ctr = 3;
  let fl1_pos = 0;
  let fl1_val = new Array(12);
  let fl2_ctr = 2;
  let fl2_pos = 0;
  let fl2_col = 0;

  let sc1_ctr = 3;
  let sc1_pos = 0;
  let sc1_off = 6;
  let sc1_col = 2;
  let sc2_ctr = 1;
  let sc2_pos = 0;
  let sc2_org = 0;
  let sc2_int = 214;

  let func = begin;

  setTimeout(initialize, 100);
}