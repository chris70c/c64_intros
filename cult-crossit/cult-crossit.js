/*
  Cross It +2 Crack
  Cult (1992)
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

    buf2c.width  = 192;
    buf2c.height = 16;
    buf2x.imageSmoothingEnabled = false;

    canvx.fillStyle = "#000";
    canvx.fillRect(0,0,384,272);
    canvx.fillStyle = "#4d4d4d";

    canvx.fillRect(306,0, 24,242);
    canvx.drawImage(caps, 4,0,24,4, 306,242,24,4);

    canvx.fillRect(0,203, 348,21);
    canvx.drawImage(caps, 0,0,4,21, 348,203,4,21);

    canvx.fillStyle = "#000";
    canvx.fillRect(306,202,24,1);
    canvx.fillRect(306,224,24,1);

    canvx.drawImage(logo, 54,35);

    const text = "cross it";

    let len = text.length;

    for (let i = 0; i < len; i++) {
      let cx = text.charCodeAt(i);

      if (cx == 32) {
        cx = 0;
      } else {
        if (cx >= 96) { cx -= 96; }
        cx *= 24;
      }

      buf2x.drawImage(font, cx,0,24,16, (i * 24),0,24,16);
    }

    const pixels = buf2x.getImageData(0,0,192,16);
    const buffer = new Uint32Array(pixels.data.buffer);

    len = buffer.length;

    for (let i = 0; i < len; i++) {
      if (buffer[i] != 0xff000000) {
        buffer[i] = 0;
      }
    }

    buf2x.putImageData(pixels, 0,0);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    if (--fl_ctr < 0) {
      if (++fl_step == 3) {
        if (fl_col == 2) {
          fl_val = -1;
        }

        fl_step = 0;
        fl_col += fl_val;

        if (fl_col < 0) {
          fl_ctr  = 97;
          fl_val  = 1;
          fl_step = 2;

          canvx.fillStyle = "#000";
          canvx.fillRect(77,139,192,16);
        } else {
          canvx.fillStyle = flash[fl_col];
          canvx.fillRect(77,139,192,16);
          canvx.drawImage(buf2c, 0,0,192,16, 77,139,192,16);
        }
      }
    }

    sc_ctr -= 2;

    if (sc_ctr < 0) {
      sc_ctr += 8;

      buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);

      let cx = sc_text.charCodeAt(sc_pos);

      if (cx == 32) {
        cx = 0;
      } else {
        if (cx >= 96) { cx -= 96; }
        cx *= 24;
        cx += (sc_step * 8);
      }

      if (sc_step++ == 2) {
        sc_step = 0;

        if (cx == 0) { sc_wait = 15; }

        if (++sc_pos == sc_len) {
          sc_pos = 0;
        }
      }

      buf1x.drawImage(font, cx,0,8,16, 312,0,8,16);
    }

    canvx.drawImage(buf1c, (7 - sc_ctr),0,304,16, 39,179,304,16);

    if (--sc_wait == 0) {
      sc_pri = !sc_pri;
    }

    if (sc_pri == 0) {
      canvx.fillStyle = "#4d4d4d";
      canvx.fillRect(306,179,24,16);
    } else {
      const pixels = canvx.getImageData(306,179,24,16);
      const buffer = new Uint32Array(pixels.data.buffer);

      for (let i = 0; i < 384; i++) {
        if (buffer[i] == 0xff000000) {
          buffer[i] = 0xff4d4d4d;
        }
      }

      canvx.putImageData(pixels, 306,179);
    }

    player.run();
    requestAnimationFrame(draw);
  }

  const logo = new Image();
  const font = new Image();
  const caps = new Image();

  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAO4AAABXBAMAAADxBWSsAAAAJ1BMVEUAAADqdGym+p7k7U6vKili2MywP7b///+2WRxKxkpoOAhwfOY3OcRukGWwAAAEAElEQVRo3u2Z7XGcQBBEL4VJgRQ2hU2BFJwCKWwKpEAKpEBQZj6Yvr1Z1nWuM1zZ7pbko6nS80Mr6Yce6QhpqxRtSNaG/NCeZNNKHg5FAUVrKFpD0TYU6Bt9H9fnP7eZv4k7CfeHBbewTBbcw5JSmtIe3QdL7+pruBS45NwUuOmEO4IUr77CdxIKiR0FX9opSewS7mHhF8y2zz2K09i7uts3wZeLyLX6asHFoi/ga9UvJq5k4AZfR5J/JPdNL75YWBe+QnNM+8q50ZcUS/b1Tfowz3wTfA+rcTRYbQzf9eAaSirMA7v72iGC79Nix2p68hWwYmA5+pVxoy/+fd93NF+DoB1f1H25ODvgYtEXwTc8ZrxW7grfUJzn3/ANbfu6H7rHfVPwTSe+I9zCf2A89314sBjkDd/Tq+irMW69JI1zsfhvCOdKjDSeX2093/d/Xo38MK/x1Tj3fV8KvtT5+ib3nSrfsTKMV/AdbvUlsQMXS/x5hUW5qeKyV+fqNl///h0u5UbfUnMrCgUuxe9fxEkruIj6Dk1f5A3fwJX0uUV8S5NLYkfBl3busHeahiZ3Fd/1a31Lx5c6vsOZr7bvWzq+FHzJfYeO7/onfOkTvnasmr6MYFBrsWPV9LVj9Ulf+qRv6fhyn7nHItCO7/p53/Qh39LxpdqX9rjv0PFdv9aXQyVyYUetZdjDzk3fPez8ledZ0/a1tJZB0/a19H1Lx5eCL7nv0PFdv9aXmdThpsBNzp063PGUO97ueyWX4Lt0uDlwk3PnDnfr+I63+i7iuzS5WXxz/RtKl2EW37nJ3cR3a33KG32Vu2hxi+257KutuLKY7wxfXmZZzHc78TUuQzgVV0am5JZvVt/ZfZ0rI/tul/oOb/jasYKvLgsvdqzgq0vmxY7Vk+8svrzYsfpaXy5uYRFE5YtFEMGXy75aAb1wL/KNXPguwXdx3xx8s/vOwXd23+19XywCqX0zfOeO7+a+6cyXI4ZejXH1/NIB1CjXzu9wADXCZbByp54vWvAavoZ0OHwd6XD49rkLUvQdvuomdNIX8FW3waTdFr6/4AoMD7ocePj6R32rfe2jvb36Zv5LwP6ec46+SPRFoi/y6rtpur6AiTXwxiVDEvDCBUx8gTfuaty0V9lTxxeBLxJ9keAL7nQHl/Zm/kwpJ+WuB/chFA8WBgjFg4UBQvFgYSS4eX8X8+Bbc6Mv7kVf3Gv7ZiHrq8qXC2y1ZC6w1TJzga2WjavYRxYyEcF3vcBXjaUp+HIRLNmKYJmtCJbNqiF71rn2DQ8aSw4PGsscHjSWDQ9auVr4Xhv4Xh8q/57vHdzCvsimbeSH9jVZ20rRxpD0UUOtAYoGqDRA0QCVgnut708RS15JCegrJwAAAABJRU5ErkJggg==";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAwAAAAAQAQMAAACbcYrLAAAABlBMVEUAAABwfOY7daAoAAACfUlEQVQ4y42UMW7bQBBFvyAj6qSUKQwmR0ipALKlzp18FScpLCBEKCC9j5BLpE2hzp2OEBCwDXaz7OyC2MmfWa5kQTbg0cdgyP27j1yuBoxKO9UuZc31AicsgJMFxgugRVGizE6X1yVOXCX91FwjBjUYhS2LT7BQjceqMWYGxjVOOeMJ5xEv2CLGLvNTlSqGGzBmsOlXDuCACzkj1XDVmPKyw88AccM75tadHJWkNGT+EUZrMFY2egC4t2J5AKiiA1a8jIjNWmi4d4ALNLwAmMCifQZoNN5pFFtUtAZVf4xBBVVHU9AZ1woDudsIDVLZbnCKakdDD3gvehs1xLkqCvQxz1sUNDba9YAWVD03AIdLA/wmoPm1fagdoB0BwT6yzRfWBEylCh1lN2dIQTy+eSGcDyQAPoOqp2OBASInD7cE3N3eSOsA3z3xD5AAj+tCSrP7DGCVAby4fvUNJAHs9QdCwENYymoPCPoELJPhx2Ym0d4A4k/8mAHX1Kvf4BkABuASMtsD+EDIhrN6RbyGCLEFB+EQsDtFCZCP0BGgFCkywPzFDlC0LTeQNxNg+C8DKurtgKnIZNkD5ubfASZfax6BoJIAo78ZcO7aAYJ2jR4AqhZBtyw4xIMoo5tGHVDZ81ZqAK47+rPhIe4BGicrHMYeEMMesKRdDWCkRiMzj1NIgO9b+rUHbIe36wgaEkCLFjiFxQcqA5IktwqvZVekLAORtJNfJPkJYB4EayQO4I3RWZ13ZuZi5H9mDJY7GryL7dqZeDYFK9B0uRVewXJMrdB+lWq1OQKwzV56+73QjhMWAOvUnHNhmbqwApfRmnPqxpbLvplzObbrCgdb9B+Pe6XeoOEBpQAAAABJRU5ErkJggg==";
  caps.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAVAQMAAABvzBwfAAAABlBMVEUAAABNTU2Qn6s5AAAAJUlEQVQI12Ng////AcNxEPH4//8DDA/+/2dg+MDAQAXiAYSAAgCPkRvqSqso/wAAAABJRU5ErkJggg==";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d", {alpha:false});
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");

  const sc_text = "     yuhuuuuu   the cult present a nice game by amok entertainment called  cross it plus two            trained by odie original supplied by darkman of extacy            golden greetings goes to   death   nausea   and all our contacts                       muzak by unknown zacker  logo by montana  charset by galland  intro by odie                 zmackni mizernik  teda mezernik frajere    ";
  const sc_len  = sc_text.length;

  const flash = ["#3739c4","#e4ed4e","#fff"];

  let fl_ctr  = 101;
  let fl_col  =-1;
  let fl_val  = 1;
  let fl_step = 2;

  let sc_ctr  = 6;
  let sc_pos  = 0;
  let sc_pri  = false;
  let sc_step = 0;
  let sc_wait =-1;

  setTimeout(initialize, 100);
}