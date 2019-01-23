/*
  Fire King Crack
  The Sharks (1989)
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

    buf2c.width  = 320;
    buf2c.height = 16;
    buf2x.imageSmoothingEnabled = false;

    buf3c.width  = 304;
    buf3c.height = 16;
    buf3x.imageSmoothingEnabled = false;

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function draw() {
    canvx.drawImage(screen, 0,0);

    let loop = 0;

    do {
      let ctr = sc1_ctr;
      sc1_ctr--;

      if (ctr == 0) {
        sc1_ctr = 7;

        buf1x.globalCompositeOperation = "copy";
        buf1x.drawImage(buf1c, 8,0,312,16, 0,0,312,16);
        buf1x.globalCompositeOperation = "source-over";

        let cx = sc1_text.charCodeAt(sc1_pos);
        if (cx >= 96) { cx -= 96; }
        cx *= 16;

        if (sc1_step++ == 1) {
          cx += 8;
          sc1_step = 0;

          if (++sc1_pos == sc1_len) {
            sc1_pos = 0;
          }
        }

        buf1x.drawImage(font, cx,0,8,16, 312,0,8,16);
      }
    } while (++loop != 2);

    buf3x.drawImage(sprite, 0,0,304,16, 0,0,304,16);
    buf3x.globalCompositeOperation = "destination-atop";
    buf3x.drawImage(buf1c, 11 - sc1_ctr,0,304,16, 0,0,304,16);
    buf3x.globalCompositeOperation = "source-over";
    canvx.drawImage(buf3c, 0,0,304,16, 39,115,304,16);

    loop = 0;

    do {
      let ctr = sc2_ctr;
      sc2_ctr--;

      if (ctr == 0) {
        sc2_ctr = 7;

        buf2x.globalCompositeOperation = "copy";
        buf2x.drawImage(buf2c, 8,0,312,16, 0,0,312,16);
        buf2x.globalCompositeOperation = "source-over";

        let cx = sc2_text.charCodeAt(sc2_pos);
        if (cx >= 96) { cx -= 96; }
        cx *= 16;

        if (sc2_step++ == 1) {
          cx += 8;
          sc2_step = 0;

          if (++sc2_pos == sc2_len) {
            sc2_pos = 0;
          }
        }

        buf2x.drawImage(font, cx,0,8,16, 312,0,8,16);
      }
    } while (++loop != 3);

    buf3x.drawImage(sprite, 0,0,304,16, 0,0,304,16);
    buf3x.globalCompositeOperation = "destination-atop";
    buf3x.drawImage(buf2c, 9 - sc2_ctr,0,304,16, 0,0,304,16);
    buf3x.globalCompositeOperation = "source-over";
    canvx.drawImage(buf3c, 0,0,304,16, 39,139,304,16);

    player.run();
    requestAnimationFrame(draw);
  }

  const screen = new Image();
  const font   = new Image();
  const sprite = new Image();

  screen.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYAAAAEQAgMAAADEz0tvAAAADFBMVEUAAABwfOY3OcS2trXa47udAAAE6UlEQVR42uyYvZqeIBCFaWym8dZsaGjm1mhoaHJrNDZpzJnhkRGCbpp0nGTVw895gc9d8XNLS0tLS0tLS0tLS0tLS/9J11MFvqBwtwIzxdpL6VAEzeIp+6fQITEOdBc8DWtCkivpqe2fETzLT/5pNwFsjPLDVT3N5oWQ8MN6ru0tYgZI6DsCcDRAb3zpAWwRcwC6TgCOrWI0I2CoHJVir1S0DJmBbnVmK9pHAXLuImYA6qUzkBMdBu0MAAoFtTW3oYyikHvpDORkNWZULPVZAVLVRUwAPvVSAITMJg9jYq0XgFZ1EbMZDPICkJiuX2dqvWucDj4q+VGlFiLTJMZUtN65djJNAOeoUguZ2NQZAFAvyeL6iAngGqQAnJFphWqshdRL8t3a9AI42wwHwKlFZvwTQK21RcwAOLT77O6y35k5o/suZheTeQqwiF9/AwoyolNZl1gBDoa4RJgj1pqyV8BuAIuYKZH3wf4uXdemt6kO2mU1FHamEITmKMRdACWySw6tLOINgNEYIOwl6V0UHQadvRo4Jn8qjXyIAqAAQMbULOINwIZH90j1gRMyU/BXNRyYmJVGfIYNg0gnAB5Ts4g3wJmzATiksw7aMyFfzZlOmKQ08nwiHjypx6VFvAFQtZU2g5P99aWTkvyiAcrEHpcW8SL9+LlUQwHj8186HGGOiQMx+YxLi3gDuAN8virgwGh+EvlSb4LgCACLeAHcz/KiAIpy+iakIsNg6clDxBwQ5ey5CMDio6v6u9dWsCiHAbqIGeDYu83J1urgKgv/GnkTgLMZDBGjkIkFtc0Jfji4QdFgouA0+3C74zFiBkDfOjZWozPY9TjOxAAkAE0cIqaA2O9+aBw8xmfNKwB47wxgEfMPYcd/Xdu2QXSdju5qiy5xULMDMERMAbVjEcA+i43OVAFtBDxGfGwdbQa7urPdpxEMAwYkkgGGiM/NL0tLmn60497VXB/xtX0nBTy1TwncA4aIlxeQw2bwKsvsAEOEmyqnowE2/yEdrQEgHiLcXJTkwBQAyB860DJwBxgi3BsB/MTks6vPZH8/MtsDOgVdm8QnAHlYI4twb0o5MxP7rJkhPx76HGACnzByYgAwkBzrypQu4gPg/WmP4ege25Z0ZibUAo1TSL6kCwMJ9TWzdBEfgOsKtip723jBEHtu24EQKZWEZtcZtRd3EZ8ziG1VbG8qBgPmtqGJe9lKyiCwF7TnLuLzM9htVTrARZ7blmyXwuSyPPFl8XIqXcTbtwi/D+dsVQZAyXxvKomlKl0u4zKx3NZXF/H6hnN1mYNxzSjg9Ci6iqybmFsf7wfQJ8BM/1YS9mvQ9ysUYpi9ZL4a8ta80AHXawIYX/U089WQNxVUjZoAQpOvL6ulFs4NWfMNgDBoBngo0v2eDPHUAHRrK+YsYnL/NwkAx1ILeWK69jz5HmIGoKYt0hGjZsLxxHTtFUC9tgkgNgX7+gSOJ6Zrz+YsYrZraQLgsIc6T43tICpuSPsEbPFHgHXocRbxAdiC+ycA+QnAIt5/0QLoP/+iQdmr2LpbxASQb0klZajUwl8T03Wxa4tYWlpaWlpaWlpaWlpaWlpa+tO+HQgBAAAwEPK3HsHuBcojAAAAgofj4Xg4Ho6H4+F4OB6Oh+PheDgejofj4Xg4Ho6H4+F4OB6Oh+PheDgAAABwDEW5CjH0GJZPAAAAAElFTkSuQmCC";
  font.src   = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAAQAQMAAACySp9IAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAApBJREFUSMeN1U2u4yAMAGBHWbD0ehZTn2TClWZJFfTIDXql3KBX4AbJ7iENwmO7qko00x9QHMcU+NRSBQC4cEGWyBI5IFsMUFDK5datdpKqdWbo2rg+8iGPOy3d4InrkG02JCa5U6VuNhcNjZtniewPgEoVpWr9Q4Dkbqf1AGjjDRCSre+b7wFNg7TEFg+A5pvm1h6ASK8AbsGdcjc4Mbs7wNaX2AMsJ6CoESRCQNBIAVJKKFXrVjPANOknngEQcBl7QASPWSEh6INcFPsZZFtK1wjWUYYxTAHEerExG0cBRMkoCqA8ARhh6AElJMpSjFEEatDVuhl4A1AHIAWkZoDrHRANMGG4YIk47J8Chj3wTwUUz6nOVUBHAMk189wUkHLKZ57ZADXAvM2b4eRKRQGE56vbE4/5EwAKc8zn7UcGgkic2tyG3bf+DAC/AJyvZ5aqXDP7pgC8zJvbPbv1U4Bb5+uQqQkhAAUa8/FfMDQ7cN1PYF+QxEnyS1BAO29zQ1aAuybGIvnyKQCXdBmyrwZAAayRiB8zxtIfwh5wsjwJoITvWRZQwLglpghI8OkZIEg45ChlA9jagB0gPwPcKt7uc5gAFTBw4kny6Q3gUZ3gSwDhOWB9DSC7/wp0AwAnHyWPcGzPARHifwBHvG0UIZAComzpVo3RMJJBPOkkXMIE6Ys0D68Ay9gBiqxoADuE0c6A5MempzxZD5Ds3HuLCrDaFpAZOTXwEQUg1Rc/wU4GcIuO7LLirUPQOK4aD3MN0Lwsr5v5pptSuwN8k9q3AJrjVIGCewe4v4wcGEBWNEATQPNtXOW5/QsoyKkoAItu7codgEVqfwRQBk474O/xHaB7HRuAqgGqACrVcZXn2s/9C9ulONRIhT9qAAAAAElFTkSuQmCC";
  sprite.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAATAAAAAQAgMAAADsTsviAAAADFBMVEUAAAA3OcRwfOb///8Zw1G6AAAAAXRSTlMAQObYZgAAAGNJREFUOMtjYAwBQdYA0qCoAzbIEEJF0xhCqQgYVoaBYdRS0mDWVCyQIQxiGolmRU3FZhrDKioChtX/wPDXetLgq/1YIMN/KgLqGvYP4s/1JPpzPzZ/UjUCBnE6o2Z2GrylBgCyRncjoFiN+gAAAABJRU5ErkJggg==";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d");
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d");
  const buf3c = document.createElement("canvas");
  const buf3x = buf3c.getContext("2d");

  const sc1_text = "       ... fire king ... another cool aussie game cracked  by rock of the sharks and colwyn of the force.. this is a cool role playing game...  coming soon....  'oztracked' no.1  ... outta wordz (c) rock/sharks....                                 ";
  const sc1_len  = sc1_text.length;
  const sc2_text = "   the sharks are : zap , darkforce , lcs , deadeye , epidemic ,  ifx , the paradroid and rock..   personal greetings go to : contex , censor , success , galaxy , paramount , tracer (ex-oneway) , light , genesis project , wwe , cheyens , unicess , nukebusters , tec , shit , leaders , illusion , the force and all forgotten...    end of text (c) rock of the mighty sharks 1989....                        ";
  const sc2_len  = sc2_text.length;

  let sc1_ctr  = 1;
  let sc1_pos  = 0;
  let sc1_step = 0;
  let sc2_ctr  = 4;
  let sc2_pos  = 0;
  let sc2_step = 0;

  setTimeout(initialize, 100);
}