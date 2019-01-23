/*
  Rise of the Robots Crack
  Mayhem (1995);
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

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);
    canvx.drawImage(text, 33,35);

    buf1x.fillStyle = c64[0];
    buf1x.fillRect(0,0,320,8);

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", intro);

    player.play();
  }

  function print() {
    let txt = "* mayhem in 1995 *";
    let len = txt.length;

    let x = 120;

    canvx.fillStyle = c64[6];
    canvx.fillRect(x,228,142,7);

    for (let i = 0; i < len; i++) {
      let cx = txt.charCodeAt(i);
      if (cx >= 96) { cx -= 96; }

      canvx.drawImage(font, (cx * 8),0,8,8, x,227,8,8);
      x += 8;
    }
  }

  function intro() {
    if (--it_ctr == 0) {
      canvx.fillStyle = c64[0];
      canvx.fillRect(0,0,384,272);

      print();
      requestAnimationFrame(draw);
      return;
    }

    player.run();
    requestAnimationFrame(intro);
  }

  function draw() {
    // scanline fx
    if (--bc_ctr == 0) {
      bc_ctr = 5;

      canvx.drawImage(back, 0,bc_pos,1,157, 33,46,318,157);
      canvx.drawImage(logo, 32,45);

      bc_pos = (++bc_pos) & 1;
    }

    // scroll text
    sc_off += 2;

    if (sc_off > 7) {
      sc_off &= 7;

      buf1x.globalCompositeOperation = "copy";
      buf1x.drawImage(buf1c, 8,0,312,8, 0,0,312,8);
      buf1x.globalCompositeOperation = "source-over";

      let cx = sc_text.charCodeAt(sc_pos);
      if (cx >= 96) { cx -= 96; }

      if (++sc_pos == sc_len) {
        sc_pos = 0;
      }

      buf1x.drawImage(font, (cx * 8),0,8,8, 312,0,8,8);
    }

    // update scroll colors
    let c = sc_cols[39];
    sc_cols.copyWithin(1, 0);
    sc_cols[0] = c;

    for (let i = 0; i < 40; i++) {
      buf1x.fillStyle = c64[sc_cols[i]];
      buf1x.fillRect((i * 8),8,8,8);
    }

    canvx.drawImage(buf1c, sc_off,8,304,8, 39,211,304,8);
    canvx.drawImage(buf1c, sc_off,0,304,8, 39,211,304,8);

    player.run();
    requestAnimationFrame(draw);
  }

  const back = new Image();
  const font = new Image();
  const logo = new Image();
  const text = new Image();

  back.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAACgAQMAAAD3m5SBAAAABlBMVEU3OcRNTU3c/j+KAAAAD0lEQVQY02NoYGAYxeRjACq3KAEIXTbTAAAAAElFTkSuQmCC";
  font.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAAIAQMAAAC1etX9AAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAATlJREFUKM+F0bFqxDAMBuAIDa0mNxRKPZkbbwydbsrr9C2C0RA6hUL3e5RyZDCd8gwmg2dzQ8nQU+WEXqfS3yBLy4ewK5A/08lF/k0FjB7Ze8sn29bMqDNYTQMbMIjmOYz9VJozB8QGPDLrNAtWkJf2cGidTdm2cDgsdnFpBXKXCtBLp1cY5ikVwPY5N87lZrcCsYKTdda62oZ87/a2xAUtVGfdAH6AaZixAMmGGBvEDAocP5e5glc0dI8WQkZjiWqqORBZ9tw9XqCSoQDqjL0XLxONDD5S5t3X++3pLlTQkKEbQxQiaCUkjArsIZptA7kCZYMjjSbGSJG8Dm/LsAFmBUhraRV4AVIgKfC7wVOa5dxegbi+gVTiUY/xxEieiLXDwGNNuP7CBjyIjL1IUoA9YESOjCLyIcM3C3wkofNJzdIAAAAASUVORK5CYII=";
  logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAACfBAMAAAB6oR3XAAAAElBMVEUAAAD///9wfObk7U7qdGxi2Mwltq7IAAAAAXRSTlMAQObYZgAAA8BJREFUeNrtm0Fy6jAMQJUB9vEN/vQEmeECWeQA2fj+V/mWZFWqQ6EpaSNSqXGkWrL8sLFgGIDkXKCH/eXt7e1f26qrC8AA3FkUsEssH92f4O+xgqkvjKgC8PiAqUix+4LXkQ1yJ11kX8ByRzQG7MHe+QIIQG+AX6qD9XlXLjCAyQBiwM+uYGO3gHgk5JAIoDkqHXU6AMR9bAFLkD9AcA7Yvxhg6gNw1Sm2Z1lsunaqg7fl12DaVxDUARiA7gHvvDn1AXhH/h7gLXEHaFcvAAPwCxKAAXioOiir5vaV5BiA3a+Sdv1awD6lrvylon9UeA6c7WgruFL+2CFxXwdl1QIwAFdIAAbgoeqgrN7Dd9TX6xVO3IbrcBqwDzX2XbVPYsD2Vxuqf2hzPQWogolKwmJZQOzGJn0cc6Im/WRDHdPk2gZQEuEj5tTaRx0GsK6K+MTWB7XIteEWD7g9ZC8Br2hAjTlRk36EwDvnAbI112aAuFWStE52soCyhQ0g2cM7iEDZXFsDCgwnfwzYjLmVqxjcnj7FA7b3yQb6/wOg+G0/9S391BrA16uDdvUCMABXSAAG4CHfD7r8ZCEAA3CtBKA3QPd1cD1gripnuHCbUaPI/9U/Fw/7NN7qWWIhbw3IODNeOEVGA1hbNwKSj4Rt1jp2c8AsKzLjDHixLX06KQNanzQdqzk3A7zIrsw0A2/XLNtYJs9ZAWmb83u8+FHLWMm5PWDOBIEdhcMAggG8qK+CSZOxmwNm0NVSQLgDqL6bgJxzyzKjE5pTOcspbgHJt4yv/nycOuj+HXUABuBKCUB3gO7r4Et88ygAA3ClBKA7QJd1UFbtIeB5msZpmlCzPZ5HtLHPyqRx2jSOdPkbwQhl45jx24ATY46UjpKei+YmLtESh0piJhNgAAWa/Hh9H3BkKMBkjMmQowJKoMSJbePYbgDP1T89AziVVqciu9wIcqKJadsFkOPIIL+Nq9uvYxQangMUKBDAoglgsYISp4Aax/r8gURitgDk54/YrJeAEqeA8AVAGvvcKcZEqK1tTrECahy0cajbMRJTxr5eHQxAlQB0JwEYgA/kj32y8NqAO/wa4i6gq9+THGIFXYh7QPd1MAABAtCdBGAArpQAdCd+ALNzwAt+Ecg5YM6OATNcwDMgf/nH8RbjMzC7PiS4wbNnQPAPKFucvQLaeugcMGfHgFgPPQNyPXS8xVQPXR8SrYcGsEfGvnNCugTsUrm6BFBa2p9yucVd36euKwrv+wOqKCB/eFnuPgHBtbwAYHIu/wEmB8s+V/coKwAAAABJRU5ErkJggg==";
  text.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPQAAAAHAQMAAAAF5/IKAAAABlBMVEUAAAD///+l2Z/dAAAAeklEQVQI103OsQkEMQxE0SlpylN5ihxNvGywJRjj0IEwJ50PbhV99BAIzcJMUKyoFpjdYLkw5AyR6pDL0TJh6N7ATql8l8fLhSiPn1/HY66JiwxUX+Xr6638gXw69rl/fIMP59+VfjtGefUAxTuFaMbzv6K6/PxPWfoHONtuH3zjAs4AAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "       * mayhem * back once more to bring you joy...  the credits for this intro... code and font by - motion.. i hope you've noticed the new shade of colour up there!.. another day, another shade..... coolest vibes and basslines go out to the following crews..... accept,accuracy,airwolf team,alpha flight,amnesia,amplifier,arcade,asphyxia,atlantis,avantgarde,blaze,bronx,chromance,clique,cosine,crest,deadline,derbyshireram,dragon,dunex,elysium,enigma,entropy,epic,excess,extend,fatum,fun factory,f4cg,genesis*project (rip),genetix,genlog,gothic designs,hoaxers,image,intruders,jabole,jam,lithium,laser,maniax,motiv-8,oxyron,palace,panic designs,pleasuredome,rebels,reflex,regina,rexx,rsi,section 8,shazam,silicon ltd,spirit,style,success,sunrise,thunder,tide,trance,triad,tsr,varsity,vision,wow,x-rated... plus any we may of missed (oops!).. until next time doods";
  const sc_len  = sc_text.length;
  const sc_cols = new Uint8Array([2,6,6,6,4,4,14,14,14,3,3,3,15,13,13,13,13,1,1,1,1,13,13,13,13,7,7,7,10,8,8,8,9,9,2,2,2,4,4,4]);

  let it_ctr = 20;

  let bc_ctr = 1;
  let bc_pos = 0;

  let sc_off = 1;
  let sc_pos = 0;

  setTimeout(initialize, 100);
}