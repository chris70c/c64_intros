/*
  Big Game Fishing Crack
  Seven Eleven (1991)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 320;
    buf1c.height = 8;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 568;
    buf2c.height = 8;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 568;
    buf3c.height = 8;
    buf3x.imageSmoothingEnabled = false;

    buf4c.width  = 320;
    buf4c.height = 16;
    buf4x.imageSmoothingEnabled = false;
    buf4x.fillStyle = c64[12];
    buf4x.fillRect(0,0,320,16);

    buf5c.width  = 320;
    buf5c.height = 1;
    buf5x.imageSmoothingEnabled = false;

    print(buf1x, text1);
    buf1x.globalCompositeOperation = "source-atop";

    print(buf2x, text2);
    buf2x.globalCompositeOperation = "source-atop";

    print(buf3x, text3);
    buf3x.globalCompositeOperation = "source-atop";

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function print(canvas, text) {
    let dx = 0;

    for (let i = 0, len = text.length; i < len; i++) {
      let cx = text.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      canvas.drawImage(font1, cx,0,8,8, dx,0,8,8);
      dx += 8;
    }
  }

  function draw() {
    canvx.drawImage(screen, 0,0);

    /* line1 scrolling colors */
    for (let i = 0; i < 40; i++) {
      let c = line1[i];
      buf5x.fillStyle = c64[c];
      buf5x.fillRect(i * 8,0,8,1);
    }

    let p = line1.shift();
    line1.push(p);

    buf1x.drawImage(buf5c, 0,0,320,1, 0,0,320,8);
    canvx.drawImage(buf1c, 8,0,304,8, 40,130,304,8);

    /* line2 scrolling text */
    p = xdata[line2pos];
    let s = (p & 7) ^ 7;
    let o = 7 - s;
    let x = ((p >> 3) * 8) + 8;

    buf2x.drawImage(raster, 0,0,320,1, x,0,320,8);
    canvx.drawImage(buf2c, x + o,0,304,8, 40,146,304,8);

    if (++line2pos == 128) {
      line2pos = 0;
    }

    /* line3 scrolling text */
    p = xdata[line3pos];
    s = (p & 7) ^ 7;
    o = 7 - s;
    x = ((p >> 3) * 8) + 8;

    buf3x.drawImage(raster, 0,0,320,1, x,0,320,8);
    canvx.drawImage(buf3c, x + o,0,304,8, 40,162,304,8);

    if (++line3pos == 128) {
      line3pos = 0;
    }

    /* bottom scrolltext */
    sc_xpos -= 2;

    if (sc_xpos < 0) {
      sc_xpos = 7;

      buf4x.drawImage(buf4c, 8,0,312,16, 0,0,312,16);

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }
      cx *= 8;

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf4x.drawImage(font2, cx,0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf4c, 7 - sc_xpos,0,304,16, 40,187,304,16);

    player.run();

    requestAnimationFrame(draw);
  }

  const screen = new Image();
  const font1  = new Image();
  const font2  = new Image();
  const raster = new Image();

  screen.src = "data:image/png;base64,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";
  font1.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAOlJREFUKM+tkbGNAzEMBBl+xAoUfBkMjA8dfhEu4HH46IKFalUFG19ACF7KZxjOvTqQK4CYW4j2MQ19r0vJdrvIBwEkzFLlXV3HDKnTd0bnYPncwdLcrH19C8BBMqqbOQJg4oBoN7uqUtL/GM4xuW5ccgEAASZncmukpht3d823Ql5xc7OZg8fBGS5DpvCujg4BegpQWgAvXOAyMwGl/7X/9kwgIHlad2LSx5ngBaDFxhiugUZfCUKARPYBkQkSozMdQeb5BvbHUsQCDGCmJxqUTW9gZv7YgZdz1WqrPrfwQ7AWUOVNm7YQd8780/FLAmyqAAAAAElFTkSuQmCC";
  font2.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAQAQMAAABa/1ULAAAABlBMVEWEhIS2trXOXBSgAAABVElEQVQ4y62TMW7DMAxFdQIhBzByDg5BTxQUnoIMhI/YE3TglKEIPjp6EIR+UnITOVOBfpuiCX0+0IaVNmW/R72l1RNi+/jdbS/SwksVWmEorYKrSpIDg4CPlEUaQEWVtqoaNVd0CWAVz2KzMNKZgGMHTLiCRlBRc/XSzCCZD6GeJzZrA3ymaZ6SBEDgxqkDpmfAvTXezfM5ANUB1W0dIPQRYARIB9RiWFdUyas3FqzqWRZ5vIJ0QHXkdFq0iC4BkG0C9AlY3HNMkOc9oLYJOEL2FxECRwAaAAHAC4ArUwfMyF4PADTAbQPYAzA/A+YADBMMgC9GAOAAjr0HWANw2/UKuA8ApaOmSwPwNvoc4A3SAS5750bIIrQOP9ItJbd3AHLYfr9BWcpiC1SxAGoXhtJVqgMOe4BqLbko8wawRJkni7w/TF1+mE5p0DX9VTKWc/oP/QAhTYGKopSHnQAAAABJRU5ErkJggg==";
  raster.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAABBAMAAABdzWrkAAAAElBMVEX///83OcRwfOZi2MywP7am+p6ICb3PAAAAI0lEQVQI12MQhAIXIFACAmMgCAUCBjoCkH0ge0H2g9whiAQAvqkIxYVK7xgAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");
  const buf4c = document.createElement("canvas");
  const buf4x = buf4c.getContext("2d", {alpha:false});
  const buf5c = document.createElement("canvas");
  const buf5x = buf5c.getContext("2d", {alpha:false});

  const sc_text = "             ... on your knees !   seven eleven is back with yet another nice grafix release !  big game fishing  by  simulmondo ! cracked and 100 percent fixed by count zero ! thanx a lot to dr.hector of faces for the original !   intro-credz: code, logo and char by jam design of seven eleven ! music zakked by devilock of seven eleven !  see ya in another fine release by us ...      count zero is otta range ...                               ";
  const sc_len  = sc_text.length;

  const text1 = "       \x1e right here to kick ! \x1f         ";
  const text2 = "              big game fishing by simulmondo from italy                ";
  const text3 = "              \x1ein hell and in heaven it is seven eleven\x1f             ";

  const c64   = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];
  const line1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,9,8,10,15,7,1,1,1,1,1,1,1,1,1,1,1,1,7,15,10,8,9];
  const xdata = [247,249,251,252,253,254,254,254,254,254,253,252,251,249,247,245,242,239,236,233,229,225,221,217,212,208,203,197,192,187,181,175,170,164,158,151,145,139,133,127,120,114,108,102,96,90,84,78,72,67,61,56,51,46,41,37,33,29,25,21,18,15,12,10,8,6,4,3,2,1,1,1,1,1,2,3,5,6,8,11,13,16,19,23,26,30,34,39,43,48,53,58,64,69,75,80,86,92,98,104,111,117,123,129,136,142,148,154,160,166,172,178,184,189,194,200,205,210,214,219,223,227,231,234,238,240,243,246];

  let sc_pos  = 0;
  let sc_xpos = 5;

  let line2pos = 28;
  let line3pos = 7;

  setTimeout(initialize, 100);
}