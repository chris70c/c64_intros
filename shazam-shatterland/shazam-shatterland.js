/*
  Shatter Lands Preview Crack
  Shazam (1993)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    buf1c.width  = 320;
    buf1c.height = 16;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 320;
    buf2c.height = 16;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 320;
    buf3c.height = 16;
    buf3x.imageSmoothingEnabled = false;

    for (let i = 0; i < 40; i++) {
      let cx = st_text.charCodeAt(i);

      if (cx >= 96) { cx -= 96; }
      cx *= 16;

      buf1x.drawImage(font, cx,0,16,16, i * 16,0,16,16);
    }

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    let dy = ypos[index];

    canvx.fillRect(32,41,320,191);
    canvx.drawImage(logo, 32,dy);

    dy += 80;

    let p1 = pal1pos;
    let p2 = pal2pos;

    for (let i = 0; i < 40; i++) {
      let x = i * 8;

      buf2x.fillStyle = c64[colors[p2++]];
      buf2x.fillRect(x,0,8,8);

      buf2x.fillStyle = c64[colors[p1++]];
      buf2x.fillRect(x,8,8,8);
    }

    if (--pal1pos < 0) { pal1pos = 51; }
    if (--pal2pos < 0) { pal2pos = 51; }

    let xpos = 0;

    if (wait > 255) {
      sc_ctr -= 2;

      if (sc_ctr < 0) {
        sc_ctr += 8;

        buf1x.globalCompositeOperation = "copy";
        buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);
        buf1x.globalCompositeOperation = "source-over";

        let cx = sc_text.charCodeAt(sc_pos);
        if (cx >= 96) { cx -= 96; }
        cx *= 16;

        if (sc_step++ == 1) {
          cx += 8;
          sc_step = 0;

          if (++sc_pos == sc_len) {
            sc_pos = 0;
          }
        }

        buf1x.drawImage(font, cx,0,8,16, 312,0,8,16);
      }

      xpos = 7 - sc_ctr;
    } else {
      wait++;
    }

    buf3x.globalCompositeOperation = "copy";
    buf3x.drawImage(buf1c, 0,0);
    buf3x.globalCompositeOperation = "source-atop";
    buf3x.drawImage(buf2c, 0,0);
    buf3x.globalCompositeOperation = "source-over";

    canvx.drawImage(buf3c, xpos,0,304,16, 39,dy,304,16);

    if (++index == ylen) {
      index = 0;
    }

    player.run();
    requestAnimationFrame(draw);
  }

  const logo = new Image();
  const font = new Image();

  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATgAAABBBAMAAAC3C6XkAAAAIVBMVEUAAACwP7a2trXqdGw3OcTk7U5NTU3///+m+p5i2MxwfOZuFcqbAAADs0lEQVRo3u1VgZEaMQx0C26BFq4Ft5AW3AItuAW3cFXGEhIyrGKfL/FMMhORH5TVLlot8B/GlVPKKeys+/tyJu5Wd/f3Zblkrz3cF9LKJTFsLUwuXiBHZu+NDvddM0fcnLa/r7gvpKuX7HeG+9LKJftrvi9rvS/pyuFRk0A75RkN92Fyjhe+JOYvDHnxtfUOL2R3X/Jjo1SpIVJmMmDIS9Te5Pn7nOTEtV1Az4ABj/vbPH8fViQ8C1leCzDkcX+b5+9Db4cwrN+JDedQDadU+34nNpljcjrQfic2nmNy3SBT9Zj1Dqb8AQ+w2RzdHV+T+MJCSkl7F0PNVDucY+XYlfjlmOk/SXsX6/UvbEWLc9fd8WnPLrHew6RVd+1nSYvzUeXjaBxOjrjUWQ8Y94ZxLWlxjnVQwefm2vWGyev8fnJwaZt1vYdFFwuIzbTDOVTD366P/OqPR4c9BlivjStafw71UNfW78Qmcyt1T8b59472+kw1xO5r/bmf3NG6pH2HhSF2X+vPoZxL7mCbkmP86Pud2HCO5tS19TuxyRzN0azvt2P+/B9JLlKlmMIPc639Tmw2P1sFckaP8KCJkLXfj+HczNVAztJfmVzl5Kg4OR1ovxObzc/KyXFxcm3GA+13YrN581Y1uSSuHzTQfic2mVtykZNrA3Gt/W4M5wcXJ1e/kuPPIx0ivWJE1h54N7BA5fVSZo6taXJS0+ulFrF5clx+cvyQf8QnjJ+ppEeej81fD/seK7UWS47k/MPFH03GhKw98nxs/nrY91jzVkOKZs5KyXaJ9sjzsfnrYd9jtVhyYE4vVfK7/6AID7TIw9fDvscKJydFvwm/KviX9gzhOVqPt5Zc6ZL7y6qQufTf3B1zzxLiX+queXuGdMnc8w+vjl2f/I2UXBq5K2/qc2jTERePWHsB9mfvTZOziinGeNbzrKVW+jYzSaq1heAznufZeN0GldKonpVlJjVlFaXVp7JfKp+5wA+qT1ojgrfTNkSJG6Xmq1MWU15cGt60YEe0Qm9P2VB5A+9gaUCpCCfK+dJg5wc4wmjue/NraWHpihKXWnJU/hGT+30pu1tT4lJLjsjuRxM2wP2OtEh2C8p5ckKzI6bvqi8Vb4tKTE5o/RGnHTF/V1GKyaFyvtSSu/t98KWsFfmq0lSWHBOH34fi3e9L7X1dVhZMjvMdHCEb/PuTm5y6K75yvtTMcQ2PkA3wN0i8YXKsV2+oxKV+cnKCRewmV2xH5XencT/KpFLizlNeXPoTyfqOtZDGIjcAAAAASUVORK5CYII=";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAA7dJREFUSMfN1bHO0zAQAOCLIpEtWRnC+RlYUJGO5FVgZ/glFgOm9oMgnoMBIU+w8QQIWUJi5dAvoZOwHM5uS2l5Aexe3CZ1/cU+p/AflD5u0dRoVcDEXsqugN9NMIHnFtG6+qmg7JkiXJTHDyPaPjxFADhe6hIcCtbDlEwEt8kNAJk4pXPXgeshbuJlk1Wrl7xrAFKAM2x4yzX0ejE35qYgO17KcgFIFeClAro4sIl/Awbu0qr9u7IJw1C8jnHuukrzcZbM2WrlzDSFjh05WLMRIxlr5PyxoEXrkCXhVuBcdLBHcSvbO7fU2ZzYpL8AyyRD2u85D++VDr5wzrkLXYBWHB0AWKugQG0n7W7Jwr3PJpssY4209N+QkAhtusGv/wB8uX23IwUEEwfW9gQg/Y2k/REdLwyECfW3Yh8B7E5D0YDMyHNDAM8XADLkxhrJ9ekAeJ6ef054mUNzRPr6GmwDQKeAZ6dptob0BkdAclK/gFYJXewUoCcU1AC3dWj8UX4EhiPAWZjnOuS+RYIGmCtgzXANSAoIwIesq60/zREj6d2OPd5YSTYBrXjim3RMUrK3UgfWdfwDeJ6tomv1rganrgEWXKPZwUUSDgHAzLcXgPXTCWAUsGAv/KKmOpAX/gKtTOEP4Ac3AGxwywfAS/kDYI2kWRyRCJHWALbP14Dps3/bxzOgnruxdXbMuz763PFWfPYZ6Dnr8VxIwxNTBWjArWxYd4EPDhas9VVY3rySNdf7qAB1yyrXgDXrN0JLewA5nPNFAdq7bnMgnxf8ieCY1r8BoqHTjRZawMvPvmhnflQICFuFR1/IjtQHQlrm2URQ3jVgW4as7eGW7BH1qbb0ZQiSAIFh5BEs40jH/Nwdt6slHXzWUMLz188bgArdOQEUQ4CDAhbSnZE6Frgu37F/M8EFILZ1BtorACqAjwCgvl11cgQw2kNdLGi0JXDoxjb84oCyI1mGSAvae59JniS+epTrQO9+vR8fnAF97BpgPACWGwXIKArQd3i4atJpGdBmlzWKA21xivd5j/vFoVYFuL0e3RDdgpoLZF+mMl4Dhnc+zw3g2uvwqOniDG6ZQnY2d7zXAmIzYBcaOhz/O+ziNa1qEKziZpNW3nArBfPis4Avsl9lSD5P7J24NVw/iitAe7fN6dnkBgj1SKC9Yv2f6aQmKuRVAGtynvuCJR+m4IOJs6rcXZNMUgAXlGVlgfWD2CH1yuqj3zEN4OVfQB94Bi0rGzkDWD97vTldVpnSlCBP4W8ApN8KqG+dmC1LxwAAAABJRU5ErkJggg==";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d", {alpha:false});
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const st_text = " shatter lands prv! ";
  const sc_text = ". .. ...back in your face with another ware for your pleasure. shatter lands prv, supplied and packed by thrain/shazam. greets go out to tsm,demonix,scs*trc,legend,chromance,avt,afl,f4cg,talent,trsi+dytec,camelot,oxyron and the rest. anyways back sooner than you think..   thrain/shazam          ";
  const sc_len  = sc_text.length;

  const c64    = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const colors = [1,15,7,13,3,14,6,11,4,6,14,3,13,7,15,1,15,7,13,10,8,2,11,9,12,9,11,2,8,10,13,7,15,1,15,7,3,13,15,12,8,11,9,11,8,12,15,13,3,7,1,15,7,13,3,14,6,11,4,6,14,3,13,7,15,1,15,7,13,10,8,2,11,9,12,9,11,2,8,10,13,7,15,1,15,3,13,15,12,8,11,9,11,8,12,15];
  const ypos   = [41,41,42,43,44,46,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120,124,128,130,132,133,134,135,135,134,133,132,130,128,124,120,116,112,108,104,100,96,92,88,84,80,76,72,68,64,60,56,52,48,46,44,43,42];
  const ylen   = ypos.length;

  let wait  = 0;
  let index = 0;

  let pal1pos = 0;
  let pal2pos = 1;

  let sc_ctr  = 6;
  let sc_pos  = 0;
  let sc_step = 0;

  setTimeout(initialize, 100);
}