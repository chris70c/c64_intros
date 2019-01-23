/*
  Wonderland XI Notes Demo
  Censor Design (2012)
  Christian Corti
*/
function intro(player) {
"use strict";

  function initialize() {
    canvc.width  = 384;
    canvc.height = 272;
    canvx.imageSmoothingEnabled = false;

    buf1c.width  = 192;
    buf1c.height = 209;
    buf1x.imageSmoothingEnabled = false;

    buf2c.width  = 128;
    buf2c.height = 207;
    buf2x.imageSmoothingEnabled = false;

    canvx.fillStyle = c64[0];
    canvx.fillRect(0,0,384,272);

    canvx.drawImage(logo, 32,35);

    canvc.addEventListener("mousedown", (e) => {
      pause = true;
      canvc.addEventListener("mouseup", mouseUp);
    });

    document.addEventListener("keydown", (e) => {
      if (e.keyCode == 32) {
        pause = true;
        document.addEventListener("keyup", keyUp);
      }
    });

    document.getElementById("frame").appendChild(canvc);

    document.addEventListener("fsidPlay", draw);

    player.play();
  }

  function mouseUp(e) {
    pause = false;
    canvc.removeEventListener("mouseup", mouseUp);
  }

  function keyUp(e) {
    pause = false;
    document.removeEventListener("keyup", keyUp);
  }

  const adc = (a, b) => {
    let c = (a + b + carry) >>> 0;
    carry = (c > 255) ? 1 : 0;
    return c & 255;
  }

  function draw() {
    gl_ctr ^= 1;

    if (gl_ctr) {
      canvx.drawImage(logo, 116,0,68,200, 148,35,68,200);

      // plasma
      let cs = pl_d0;
      let s1 = pl_d0;
      let s2 = pl_d1;
      let s3 = 198;

      for (let y = 0; y < 200; y += 8) {
        for (let x = 120; x >= 0; x -= 8) {
          let p = pl_sine[512 + s1];
          p = adc(p, pl_sine[s2]);
          p = adc(p, pl_sine[s3 + s2]);

          buf2x.fillStyle = c64[pl_cols[p]];
          buf2x.fillRect(x,y,8,8);

          s1 = (++s1) & 255;
          s2 = (++s2) & 255;
        }

        s1 = (++cs) & 255;
        s2 = pl_d1;
        s3 -= 2;
      }

      pl_d0 = (++pl_d0) & 255;
      pl_d1 = (pl_d1 - 2) & 255;

      carry = 0;

      let c = pl_cols[0];
      pl_cols.copyWithin(0,1);
      pl_cols[255] = c;

      buf2x.drawImage(board, 0,0);
      canvx.drawImage(buf2c, 216,35);

      // scroll text
      if (!pause) {
        if (++sc_off == 10) {
          sc_off = 0;

          buf1x.globalCompositeOperation = "copy";
          buf1x.drawImage(buf1c, 0,10,192,199, 0,0,192,199);
          buf1x.globalCompositeOperation = "source-over";

          for (let x = 0; x < 192; x += 8) {
            let cx = sc_text.charCodeAt(sc_pos) - 32;

            buf1x.drawImage(font, (cx * 8),0,8,8, x,199,8,8);

            if (++sc_pos == sc_len) {
              sc_pos = 0;
            }
          }
        }
      }

      canvx.drawImage(buf1c, 0,sc_off,192,200, 148,35,192,200);
    }

    player.run();
    requestAnimationFrame(draw);
  }

  const font  = new Image();
  const logo  = new Image();
  const board = new Image();

  font.src  = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAtgAAAAIAQMAAAD5vBpAAAAABlBMVEUAAAD///+l2Z/dAAAAAXRSTlMAQObYZgAAAZBJREFUKM910qGOHDEMBmCrwKqq6DTQYLXowKooqBoQ0IfYB1i0aEAfwMoD9SmMfrQ6OFpUFR08LSqKco19sycdOIMZTyJ/cTIhkgN9pdeUMkWoqD702lVpG2jaelcUvhjgX/qKEedeqNBEZMS0JxuJbCXb2+3H3W9KIkcf+oIZ2JsxsM27Y2YQvtrLMzwEwHLmXBMd3+z8mV0PRLucZh/iYfCPsKe7bZt9s/4vVnJ7Pqdhl9n3VTWriZgsVVvdq8Cj+iKPZTxz6pUqJYimc2tJ3/tuhttghf/a+gcjonYq4naPtaFoRFfpPp2t+L7AYX8bxNa3rGIMhqBudo++EX3jCQ2NBVhnydF32D0DIjdZw1bBss6Yvbp+D/soabyeh90ZGfzhTBDnjWiSR21f5OT28W0+12FfBWGP+VmXatH3zhsWokSnE8TAcPvDvwQEl7CfPJ1fIDZsmqg2rTXzsC8CaKu5PdTpAO5ujzs43Ozp6aeWrqyaVe+230GrKIoO6MhUdAIk7uA9GtGvSIzfR/4DGkwQ9MALxLgAAAAASUVORK5CYII=";
  logo.src  = "data:image/png;base64,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";
  board.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAADIAQMAAAAa+3uJAAAABlBMVEUAAAAAAAClZ7nPAAAAAXRSTlMAQObYZgAAADRJREFUSMftzqENAEAIBMHvv60vDDwIEhzJnFxz86Ksh1+2CPMLBwcHBwcHBwcHBwfHFUcCFd/9F11eNnAAAAAASUVORK5CYII=";

  const canvc = document.createElement("canvas");
  const canvx = canvc.getContext("2d", {alpha:false});
  const buf1c = document.createElement("canvas");
  const buf1x = buf1c.getContext("2d");
  const buf2c = document.createElement("canvas");
  const buf2x = buf2c.getContext("2d", {alpha:false});

  const c64 = ["#000","#fff","#af2a29","#62d8cc","#b03fb6","#4ac64a","#3739c4","#e4ed4e","#b6591c","#683808","#ea746c","#4d4d4d","#848484","#a6fa9e","#707ce6","#b6b6b5"];

  const sc_text = "                                                                          HOLD SPACE TO PAUSE                                                   &&&&&&&&&&&&&&&&&&&&&&&&                                                       WONDERLAND                 (XI)                                                          &&&&&&&&&&&&&&&&&&&&&&&&                                                EMULATORS                                         THE DEMO WORKS WELL IN   EMULATORS THOUGH REAL   HARDWARE IS OF COURSE    BETTER. FOR THE LAST    PART YOU MUST CHANGE EMULATOR SOUND SETTINGS   FOR IT TO SOUND GOOD.                        VICE                      IN SID-SETTINGS CHANGE  SAMPLE METHOD TO \"FAST             RESAMPLING\"       ENABLE TRUE DRIVE               EMULATION                        CCS64                              ALT-S, SELECT    OVERSAMPLING X16 AND             PRESS ENTER                        OTHER                    VICE MIGHT STUTTER WHENEMULATING THE DISK DRIVE       CAUSING TEMPORARY              SLOWDOWNS.                                                &&&&&&&&&&&&&&&&&&&&&&&&                                                 THIS DEMO WAS CONCEIVED  DURING 3 MONTHS, WHERE  MOST WORK WAS DONE THE       LAST MONTH ALONE.                         ORIGINALLY THERE WAS NO  PLAN TO PARTICIPATE IN THE X DEMO COMPO BUT 45   DAYS BEFORE THE COMPO                BOB SAID                        -X HELL YEEES!!                                      WHERE CRT RESPONDED                        -FUCK NOOOO!!                                      ..AND A FEW HACKS WAS TURNED INTO A DEMO IN A        VERY SHORT TIME.                              UNFORTUNATELY MOST  CENSOR GRAPHICIANS ARE STILL INACTIVE BUT SOME               HELP FROM                        PROWLER/UP ROUGH                                           WAS A WELCOME           CONTRIBUTION.                                                &&&&&&&&&&&&&&&&&&&&&&&&                                                CREDITS FOR THESE NOTES                         PROJECT:                              VERTSKROLL                        CODE:                                    LAVAZZA                        IMAGE:                          PROWLER/UP ROUGH                        MUSIC:                                    MAGNAR                        TEXT:                           CRT, BOB, MAGNAR                                                &&&&&&&&&&&&&&&&&&&&&&&&                                                 CREDITS FOR WONDERLAND                                                 &&&&&&&&&&&&&&&&&&&&&&&&                                                SID MUSIC:                                MAGNAR                        SONG 1:                     WONDERLAND - WHIPEME                        SONG 2:                             WONDERLAND -        SMELLSLIKECENSOR                        SONG 3:                             WONDERLAND -           DOMINOFOREVER                        SONG 4:                             WONDERLAND -           GHOSTORGOBLIN                        STORY:                      MAGNAR JOINED CENSOR JUST WHEN THE IDEA OF X  PARTICIPATION HAD BEEN       MINTED. HE PULLED    SEVERAL ALL-NIGHTERSDURING BUSINESS DAYS AND  OPTIMIZED HIS SONGS TO  FIT MEMORY CONSTRAINTS            WITHOUT EVEN COMPLAINING... NOT EVEN               A LITTLE.                             THE SONGS HAD TO BE        HEAVILY VERSIONS  MODIFIED TO FIT TIMING   AFTER EACH LINKING AS    NEW DEMO PARTS WHERE   ADDED, OR AS CODE AND      OVERALL DEMO TEMPO  CHANGED CONSTANTLY THE         LAST FEW WEEKS.                            BUT THE REAL MUSICAL   CHALLENGE CAME ONLY 2  HOURS BEFORE THE COMPO DEADLINE, WHEN A CHANGE    DECISION WAS MADE TOSUBMIT THE DEMO ON A OLDC64 INSTEAD OF A NEW C64TO AVOID GREY VIC PIXELSIN A CERTAIN RASTERSPLITDEMO PART. THIS CRITICAL    CHANGE MENT THAT ALL  SONGS HAD TO BE REMADE     FROM ITS ORIGINALLY DESIGN FOR NEW 8580 SID CHIP TO INSTEAD FIT AND   BE PLAYED ON OLD 6581SIDS. CHANGES WHERE MADE    TO THE SONGS WITHOUT   ACTUAL TIME TO REVIEW      ALL FILTER CHANGES   BEFORE SUBMITTING THE ENTRY TO THE COMPO. ALL SONGS WILL THEREFORE BE  RELEASED SEPARATELY IN       ORIGINAL 8580 SID                 FORMAT.                        AS A COMEBACK STATEMENT,   THERE ARE TRACES FROM THE OLD 1990 ERA WITHIN  THE SONGS. THE TYPICAL1990ISH-SONG THAT POPPEDIN MIND FOR A SUMMARY OF   OUR 18 YEARS IN EXILE   WAS NIRVANA'S \"SMELLSLIKE TEEN SPIRIT\", WHICH SUITABLE IS ALSO PLAYED WHEN THE SCROLLER COMES AND ANNOUNCE WE'RE BACK         AFTER 18 YEARS.                        FURTHER, TO STRENGHTEN A      STRONG SYNTH THEME   THROUGHOUT THE SECOND   PART OF THE DEMO, PET       SHOP BOYS \"DOMINO  DANCING\" GAVE A STRONG  INFLUENCE AND EMBEDDED   INTO THE SID GROOVES.                          ANOTHER SIDENOTE WOULD  BE THAT THE \"GHOST AND GOBLIN\" INFLUENCED SONG  FOR THE FLIP-DISK PART       WAS ACTUALLY MADETHROUGH A HEADSET IN THE    CHIC AND BASIC HOTELLOBBY IN AMSTERDAM AFTER CHECKOUT AND WAITING ON THE TRAIN TO EINDHOVEN.    THIS WHILE THE WHOLE OFFENCE CREW WAS MOVING AROUND US LIKE VULTURES  TRYING TO GET A GLIMPSOF WHAT SECRETS WE WHERE             WORKING ON.                                  &&&&                                                                   PARTS                                                                    &&&&                                                                CLEAR SCREEN                              PROJECT:                                CLEARSCR                        CODE:                                        CRT                        STORY:                        ONCE THE INTRO WAS       DECIDED WE NEEDED SOMETHING TO REMOVE THELETTERS FROM THE SCREEN.    THIS WAS A FAST HACK  WITH MACROS GENERATING   MORE CODE THAN NEEDED   BUT IT DID THE TRICK.       MAGNAR COMPOSED A  SPECIAL TUNE THAT MADETHIS PART WORTH WATCHING    EVEN AFTER PULLING ALARGE DIRECTORY LISTING.                                                          &&&&                                                                   INTRO                                  PROJECT:                             DEFINER TWO                        CODE:                                        BOB                        SPRITE OVERLAYS:                             NIM                        IMAGE:                      CONVERTED BY BOB AND            FIXED BY NIM                        TOOLS:                               BOB AND CRT                        STORY:                   BOB STARTED TO GENERATE      PATTERNS AND CYCLE    COLORS TO CREATE HIS LEGENDARY EFFECTS USING    CRT'S PAINTER TOOLS.      THIS WAS CHOSEN TO BECOME THE INTRO IT WAS     FURTHER SHAPED FROMTHERE. EVEN THE ORIGINAL  BOB DEFINER TOOLS WERE USED FOR THE WONDERLAND       CAT COLOR FADING.PROWLER DID HIS OWN LOGO   IN THE INTRO CREDITS.                                                          &&&&                                                             FLIPPING SCROLLER                            PROJECT:                              FLIPSCROLL                        CODE AND CHARS:                              CRT                        IMAGE:                                       NIM                        STORY:                     CRT EXPERIMENTED WITHBITMAP/SPRITE ZOOMERS. A   FLIP WITH PERSPECTIVE MADE IT INTO THIS DEMO.                                                          &&&&                                                                   PLASMA                                 PROJECT:                             PLASMA FOUR                        CODE:                                    LAVAZZA                        SPRITES:                                     NIM                        STORY:                         LAVAZZA DEVELOPED   SEVERAL PLASMAS BUT A   COUPLE DID STAND OUT,          THE FOURTH ONE     ESPECIALLY. BEING A TRAINEE LAVAZZA MADE AN    IMPRESSION ON US ALL              WITH THIS.                                                          &&&&                                                              BORDER TWISTER:                             PROJECT:                          BOB EXPERIMENT                        CODE AND SPRITES:                            BOB                        IMAGE:                          PROWLER/UP ROUGH                        STORY:                      BOB DISCOVERED CROSSDEVELOPING AND WENT HOME  TO 1990 AND COMMANDED: ALL BORDERS TO BE GONE!-SO THEY WENT. BITMAP TO BE PRESENT! -SO IT WAS.   SPRITES TO TWIST! -SO          THEY OBEYED...                                                          &&&&                                                              3D RASTER SPLITS                            PROJECT:                                   RASTA                        CODE:                                        CRT                        STORY:                  ONE OF CRT'S FIRST HACKS   FOR THE DEMO. BEING A FAN OF THE OLD XAKK AND          PARAGON RASTERSCROLLERS, CRT WANTED TO  TAKE THIS CONCEPT INTO THE NEW SCHOOL DEMO ERA BY ADDING SOME 3D AND 4     CYCLE TIGHT SPLITS.DEATH TO ALL NEW C64 AND  C128 RUINING THIS PART             COMPLETELY!                                                          &&&&                                                              DIAGONAL RASTERS                            PROJECT:                             DEFINER ONE                        CODE:                                        BOB                        TOOLS:                                       CRT                        STORY:                   SO IT DIDN'T MAKE INTRO LIKE DEFINER TWO BUT IT  DID MAKE A NICE EFFECT                MIDWAYS.                                                          &&&&                                                              CENSOR SCROLLER                             PROJECT:                                 SQUARES                        CODE:                                        CRT                 LAVAZZA                        OVERLAY GRAPHICS:                            NIM                        STORY:                    UNLIKE DEFINER ONE AND TWO, THIS PART KEPT THE   PAINTER AND REAL TIME       CODE GENERATOR. 5   BITMAPS WITH CODE ARE    GENERATED DURING THE      PART UNFORTUNATELYMAKING THE MIDDLE SCREEN      A BIT TOO LENGHTY.      LAVAZZA PROVIDED A  LAVAPLAZZMA EFFECT FOR    THE GRID. A PAC MAN,    GHOST AND A CANADIAN  MAPLE LEAF DIDN'T MAKE      IT INTO THIS PART.                                                          &&&&                                                              EYE/BALL/PLANET                             PROJECT:                                  PLANET                        CODE:                                        BOB                        SPRITE OVERLAY:                              NIM                        IDEA:                                        BOB                  MAGNAR                        TOOLS:                                       CRT                        STORY:                    BOB WANTED TO BEAT ALL       OLD COLOR CYCLING   RECORDS, USE THE FULL   SCREEN, 4 ANIMATIONS,           CRT PULLED AN   ALL-NIGHTER WRITING A  CODE GENERATOR IN C++.  BOB USED HIS LEGENDARY      DESIGNER TOUCH ANDMULE-HEADED STUBBORNNESS AND PULLED OUT A PLANET            WITHIN DAYS.                                                          &&&&                                                                 FLIP DISK                                PROJECT:                               FLIP DISK                        CODE:                                        BOB                        GRAPHICS CONVERTED BY:                       BOB                        STORY:                        IN THE LAST MINUTE      SWALLOW DUMPED 250    BLOCKS UN-CRUNCHABLE SAMPLINGS UPON US. FLIP      DISK WAS BORN WITHDEFINER CODE USING BOB'S  ORIGINAL SECRET CENSOR    TOOLS FROM THE EARLY                   90'S.                                                          &&&&                                                                  SAMPLING                                PROJECT:                  15.6KHZ  8BIT SAMPLING                        CODE AND MUSIC:                          SWALLOW                        ADDITIONAL CODE:                             BOB                        IMAGE:                          PROWLER/UP ROUGH                        STORY:                    BEING THE UNCHALLENGED8-BIT SAMPLING MASTER OF THE C64 FOR MANY YEARS,   18 YEARS AGO! SWALLOW        WOULD NOT ACCEPT   MAHONEY'S CUBASE64 TO        STAND COMPLETELY    UNCHALLENGED, THOUGH IMPRESSIVE AND AWESOME.  SWALLOW BROUGHT IN THE   OSCILLOSCOPE, DID THE  CYCLE TIMING AND UPPEDTHE BETS TO 15.6KHZ OVER   BAD-LINES IN ONE FAST HACK THAT CAUSED CRT TO  PULL HIS GRAY HAIR DUE    TO THE TWO DISK SIDE   LINKING THE VERY LAST                   WEEK.                                                          &&&&                                                          AT LOCATION TESTING AND TECHNICAL SUPPORT                            NIM                  ADRIAN                ALFATECH                                                PASSIVE SUPPORT                           SENSEI                   TAITO                 EUZKERA                  PSYCHO                 SLAYGON                  GEGGIN                  DRAGON                                                          &&&&                                                          LINKING AND RASTER FADER                     CRT                                                          &&&&                                                          LOADER                               KRILL/PLUSH           -AWESOMENESS!                                                CRUNCHER                EXOMIZER 2.0.4 BY MAGNUS     LIND AND OTHERS WHO      CONTRIBUTED TO IT.                                                BIG THANKS                                           PANTALOON/FAIRLIGHTFOR TECHNICAL SUPPORT                                              EKOLIFOR TESTING                                     X-ORGANIZERS AND THE    PEOPLE WHO GAVE UP THEIRTIME AND THEIR HARDWARE AT LOCATION TO TEST AND TRANSFER OUR DEMO       BETWEEN VARIOUS FORMATS:                                 MASON / UNICESS                                  BERT / RAIDERS                                 MR. CURLY + THE        MYSTERIOUS ART /        ABYSS-CONNECTION                         FIESERWOLF / METALVOTZE (HAPPY VIEWER) WITH ALL   UUUHHHS AND WOWS ! :)                                                MORE BIG THANKS                                    DIM / THE BLACK LOTUS                 (AMIGA)FOR LETTING US SLEEP ON HIS COUCH                                       AND                                                THENOVUM AND DR.POLYPFOR PUTTING UP WITH US  ON IRC AND BEING GOOD   FRIENDS                                                                    FOR THIS DEMO WE USED OUR OWN CROSS-ASSEMBLER  \"C6510\" WRITTEN BI CRT                    IN C                                                 OTHER TOOLS USED DURING DEVELOPMENT WERE VISUAL      STUDIO, PHOTOSHOP,  PUCRUNCH, PROJECT ONE,  TIMANTHES, SPRITE PAD,CHAR PAD, VARIOUS CUSTOM      HACKS, SCRIPTS AND            GOATTRACKER.                                                CENSOR HIGHLIGHTS OF    X2012                                                                         IN THE LAST MOMENT MAGNAR SPENT 20 MINUTES      MAKING AN EXTENDED    VERSION OF THE CLEAR         SCREEN SONG AND     SUBMITTED IT TO THE     MUSIC COMPO. HE WASIMMEDIATELY DISQUALIFIED     FOR BEING TOO LATE.LATER IN THE EVENING HIS  SONG WAS PLAYED IN THE    COMPO AS \"SONGS THAT   DIDN'T MAKE IT TO THE    COMPO\". PEOPLE STILL   VOTED AND MAGNAR TOOK              3RD PLACE.                                                       NIM WAS VERY BUSY   RUNNING AROUND X WITH    FLOPPY'S OF THE DEMO  TESTING IT ON HARDWARE     WHEN NATURE CALLED.   STUFFING THE FLOPPY'S    UNDER ONE ARM HE HAD BOTH HANDS FREE FOR THE    IMPORTANT AIMING BUT THEN HE REACHED FOR THE          FLUSH BUTTON..   MINUTES LATER NIM AND      CRT WAS DISSECTING FLOPPIES TO DRY THEM ON     MAGNARS OVERHEATING    LAPTOP (DUE TO A RED   WINE ACCIDENT THE DAY     BEFORE TRAVELLING).                                                &&&&&&&&&&&&&&&&&&&&&&&&                                                GREETINGS GOES TO                                                             SUCCESS+TRC                                       OFFENCE                                        FAIRLIGHT                                        PROSONIX                                        ABNORMAL                                         FLASH                                          CAMELOT                                          OXYRON                                         MAHONEY                                          PADUA                                          ARSENIC                                          HITMEN                                          CREST                                        BOOZE DESIGN                                    PANDA DESIGN                                       PLUSH                                           TRIAD                                         DECADENCE                                        RESOURCE                                        SINGULAR                                       CHROMANCE                                    THE NOISY BUNCH                                      GLANCE                                         LEVEL 64                                         ARISE                                          HOAXERS                                     GENESIS PROJECT                                     UNICESS                                         RAIDERS                                     ABYSS-CONNECTION                                   METALVOTZE                                       SCOOPEX                                      LEGION DESIGN                                   MEGASTYLE INC.                                 \"THE CABLE GUY\"                                       AND           ALL THE NICE PEOPLE WE  MET AND TALKED TO, AND  EVERYONE WHO COMPETED INANY FORM AT X-2012.                                                     &&&&&&&&&&&&&&&&&&&&&&&&                                                                                                                                                                                                     SCROLL RESTART                                                                                                                                                     ";
  const sc_len  = sc_text.length;

  const pl_sine = [33,35,36,38,39,41,42,44,45,46,48,49,50,51,53,54,55,56,57,58,59,59,60,61,61,62,62,62,63,63,63,63,63,63,63,62,62,62,61,61,60,59,59,58,57,56,55,54,53,51,50,49,48,46,45,44,42,41,39,38,36,35,33,32,30,28,27,25,24,22,21,19,18,17,15,14,13,12,10,9,8,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,4,4,5,6,7,8,9,10,12,13,14,15,17,18,19,21,22,24,25,27,28,30,31,33,35,36,38,39,41,42,44,45,46,48,49,50,51,53,54,55,56,57,58,59,59,60,61,61,62,62,62,63,63,63,63,63,63,63,62,62,62,61,61,60,59,59,58,57,56,55,54,53,51,50,49,48,46,45,44,42,41,39,38,36,35,33,32,30,28,27,25,24,22,21,19,18,17,15,14,13,12,10,9,8,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,4,4,5,6,7,8,9,10,12,13,14,15,17,18,19,21,22,24,25,27,28,30,31,33,35,36,38,39,41,42,44,45,46,48,49,50,51,53,54,55,56,57,58,59,59,60,61,61,62,62,62,63,63,63,63,63,63,63,62,62,62,61,61,60,59,59,58,57,56,55,54,53,51,50,49,48,46,45,44,42,41,39,38,36,35,33,32,30,28,27,25,24,22,21,19,18,17,15,14,13,12,10,9,8,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,4,4,5,6,7,8,9,10,12,13,14,15,17,18,19,21,22,24,25,27,28,30,31,33,35,36,38,39,41,42,44,45,46,48,49,50,51,53,54,55,56,57,58,59,59,60,61,61,62,62,62,63,63,63,63,63,63,63,62,62,62,61,61,60,59,59,58,57,56,55,54,53,51,50,49,48,46,45,44,42,41,39,38,36,35,33,32,30,28,27,25,24,22,21,19,18,17,15,14,13,12,10,9,8,7,6,5,4,4,3,2,2,1,1,1,0,0,0,0,0,0,0,1,1,1,2,2,3,4,4,5,6,7,8,9,10,12,13,14,15,17,18,19,21,22,24,25,27,28,30,31,82,84,86,89,91,93,96,98,100,102,104,106,108,110,111,113,115,116,118,119,120,121,122,123,124,125,126,126,126,127,127,127,127,127,126,126,126,125,124,123,122,121,120,119,118,116,115,113,111,110,108,106,104,102,100,98,96,93,91,89,86,84,82,80,77,75,73,70,68,66,63,61,59,57,55,53,51,49,48,46,44,43,41,40,39,38,37,36,35,34,33,33,33,32,32,32,32,32,33,33,33,34,35,36,37,38,39,40,41,43,44,46,48,49,51,53,55,57,59,61,63,66,68,70,73,75,77,79,82,84,86,89,91,93,96,98,100,102,104,106,108,110,111,113,115,116,118,119,120,121,122,123,124,125,126,126,126,127,127,127,127,127,126,126,126,125,124,123,122,121,120,119,118,116,115,113,111,110,108,106,104,102,100,98,96,93,91,89,86,84,82,80,77,75,73,70,68,66,63,61,59,57,55,53,51,49,48,46,44,43,41,40,39,38,37,36,35,34,33,33,33,32,32,32,32,32,33,33,33,34,35,36,37,38,39,40,41,43,44,46,48,49,51,53,55,57,59,61,63,66,68,70,73,75,77,79];
  const pl_cols = new Uint8Array([0,0,5,5,0,0,5,5,13,13,0,0,5,5,13,13,7,7,0,0,1,1,15,15,1,15,12,12,15,12,11,11,0,12,11,11,0,11,11,11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,6,6,4,4,0,0,6,6,4,4,14,14,0,0,6,6,4,4,14,14,3,3,0,0,6,6,4,4,14,14,3,3,7,7,0,0,6,6,4,4,14,14,3,3,7,7,1,1,7,7,3,3,14,14,4,4,6,6,0,0,7,7,3,3,14,14,4,4,6,6,0,0,3,3,14,14,4,4,6,6,0,0,14,14,4,4,6,6,0,0,4,4,6,6,0,0,6,6,0,0]);

  let gl_ctr = 1;

  let pl_d0 = 64;
  let pl_d1 = 32;

  let sc_off = -16;
  let sc_pos = 0;

  let carry = 1;
  let pause = false;

  setTimeout(initialize, 100);
}