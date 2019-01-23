/*
  FSID 2.0
  2018/08/15
  Christian Corti
  NEOART Costa Rica
*/
(function() {
"use strict"

  const FSid = {
    "locateFile": function() {
      return "fsid.wasm";
    },
    "onRuntimeInitialized": function() {
      fsid   = new FSid.Player();
      config = fsid.getConfig();
      mixer  = new Mixer();
      player = new Player();

      Object.defineProperty(window.neoart, "FSid", {value:player, enumarable:true});

      document.addEventListener("visibilitychange", (e) => {
        if (document.hidden) {
          mixer.context.suspend();
        } else {
          mixer.context.resume();
        }
      });

      dispatch("fsidReady");
    }
  };

  class Player {
    constructor() {
      return Object.freeze(this);
    };

    get currentSong() {
      return current;
    };

    set currentSong(number) {
      if (number != current) {
        current = fsid.setSong(number);

        if (playing) {
          mixer.stop();
          fsid.run(8192);

          playing = mixer.context.currentTime;
          mixer.play();
        }
      }
    };

    get playing() {
      return playing != 0;
    }

    get time() {
      return mixer.context.currentTime - playing;
    }

    enableFilter(value, index = 0) {
      fsid.filterEnabled(index, value);
    };

    volume(value, index = 0) {
      if (value == Number(0)) {
        value = 0.00001;
      }

      master = value;

      if (playing) {
        mixer.main.gain.setValueAtTime(value, mixer.context.currentTime);
      }
    };

    load(buffer) {
      if (playing) {
        this.stop();
      }

      if (buffer && buffer.constructor === ArrayBuffer) {
        if (fsid.load(buffer)) {
          fsid.setSong(current);
          return true;
        }
      }

      return false;
    };

    play(fadein = true) {
      if (!playing) {
        if (fsid.setConfig(config, false)) {
          stream = fsid.getBuffer(0);
          fsid.run(4096);

          dispatch("fsidPlay");
          playing = mixer.context.currentTime;
        } else {
          return;
        }

        mixer.play(fadein);
      }
    };

    run(size = 1024) {
      fsid.run(size);
    };

    stop() {
      if (playing) {
        mixer.stop();
        playing = 0;
        dispatch("fsidStop");
      }
    };
  }

  class Mixer {
    constructor() {
      this.context = window.neoart.audioContext;

      this.main = null;
      this.java = null;

      this.mix = (e) => {
        const chan = e.outputBuffer.getChannelData(0);
        const buff = stream;

        for (let i = 0; i < 8192; i++) {
          chan[i] = buff[i] * 0.000030517578125;
        }

        fsid.updateBuffers();
      }
    }

    play(fadein = true) {
      this.java = this.context.createScriptProcessor(8192, 1, 1);
      this.main = this.context.createGain();

      if (fadein) {
        this.main.gain.setValueAtTime(0.00001, this.context.currentTime);
        this.main.gain.exponentialRampToValueAtTime(master, this.context.currentTime + 0.5);
      } else {
        this.main.gain.setValueAtTime(master, this.context.currentTime);
      }

      this.java.connect(this.main);
      this.java.onaudioprocess = this.mix;

      this.main.connect(this.context.destination);
    };

    stop() {
      this.main.disconnect();

      this.java.disconnect();
      this.java.onaudioprocess = null;

      this.java = null;
      this.main = null;

      stream.fill(0);
    };
  }

  function dispatch(name) {
    document.dispatchEvent(new Event(name, {bubbles:false, cancelable:false}));
  }

  if (!window.neoart) {
    window.neoart = Object.create(null);
  }

  window.neoart.audioContext = new (AudioContext || webkitAudioContext);

  if (!window.neoart.audioContext) {
    throw new Error("Your browser does not support the Web Audio API.");
  }

  let fsid;
  let config;
  let mixer;
  let player;

  let stream  = null;
  let master  = 1.0;
  let current = 0;
  let playing = 0;

  const d=FSid;var n={},r;for(r in d)d.hasOwnProperty(r)&&(n[r]=d[r]);d.arguments=[];d.thisProgram="./this.program";d.quit=function(a,b){throw b;};d.preRun=[];d.postRun=[];d.read=function(a){var b=new XMLHttpRequest;b.open("GET",a,!1);b.send(null);return b.responseText};d.readAsync=function(a,b,c){var e=new XMLHttpRequest;e.open("GET",a,!0);e.responseType="arraybuffer";e.onload=function(){200==e.status||0==e.status&&e.response?b(e.response):c()};e.onerror=c;e.send(null)};d.setWindowTitle=function(a){document.title=a};var aa=d.print||("undefined"!==typeof console?console.log.bind(console):"undefined"!==typeof print?print:null),u=d.printErr||("undefined"!==typeof printErr?printErr:"undefined"!==typeof console&&console.warn.bind(console)||aa);for(r in n)n.hasOwnProperty(r)&&(d[r]=n[r]);n=void 0;function ba(a){var b;b||(b=16);return Math.ceil(a/b)*b}var ca={"f64-rem":function(a,b){return a%b},"debugger":function(){debugger}},da=0,ea="undefined"!==typeof TextDecoder?new TextDecoder("utf8"):void 0;"undefined"!==typeof TextDecoder&&new TextDecoder("utf-16le");var buffer,fa,v,ha,ia,w,x,ka,la;function ma(){d.HEAP8=fa=new Int8Array(buffer);d.HEAP16=ha=new Int16Array(buffer);d.HEAP32=w=new Int32Array(buffer);d.HEAPU8=v=new Uint8Array(buffer);d.HEAPU16=ia=new Uint16Array(buffer);d.HEAPU32=x=new Uint32Array(buffer);d.HEAPF32=ka=new Float32Array(buffer);d.HEAPF64=la=new Float64Array(buffer)}var na,y,oa,pa,qa,ra,sa;na=y=oa=pa=qa=ra=sa=0;function ta(){z("Cannot enlarge memory arrays. Either (1) compile with -s TOTAL_MEMORY=X with X higher than the current value "+A+", (2) compile with -s ALLOW_MEMORY_GROWTH=1 which allows increasing the size at runtime, or (3) if you want malloc to return NULL (0) instead of this abort, compile with -s ABORTING_MALLOC=0 ")}var ua=d.TOTAL_STACK||5242880,A=d.TOTAL_MEMORY||33554432;A<ua&&u("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+A+"! (TOTAL_STACK="+ua+")");d.buffer?buffer=d.buffer:("object"===typeof WebAssembly&&"function"===typeof WebAssembly.Memory?(d.wasmMemory=new WebAssembly.Memory({initial:A/65536,maximum:A/65536}),buffer=d.wasmMemory.buffer):buffer=new ArrayBuffer(A),d.buffer=buffer);ma();function va(a){for(;0<a.length;){var b=a.shift();if("function"==typeof b)b();else{var c=b.L;"number"===typeof c?void 0===b.F?d.dynCall_v(c):d.dynCall_vi(c,b.F):c(void 0===b.F?null:b.F)}}}var wa=[],xa=[],ya=[],za=[],Aa=!1;function Ba(){var a=d.preRun.shift();wa.unshift(a)}var B=0,Ca=null,C=null;d.preloadedImages={};d.preloadedAudios={};function Da(a){return String.prototype.startsWith?a.startsWith("data:application/octet-stream;base64,"):0===a.indexOf("data:application/octet-stream;base64,")} (function(){function a(){try{if(d.wasmBinary)return new Uint8Array(d.wasmBinary);if(d.readBinary)return d.readBinary(f);throw"on the web, we need the wasm binary to be preloaded and set on Module['wasmBinary']. emcc.py will do that for you when generating HTML (but not JS)";}catch(g){z(g)}}function b(){return d.wasmBinary||"function"!==typeof fetch?new Promise(function(b){b(a())}):fetch(f,{credentials:"same-origin"}).then(function(a){if(!a.ok)throw"failed to load wasm binary file at '"+f+"'";return a.arrayBuffer()}).catch(function(){return a()})} function c(a){function c(a){m=a.exports;if(m.memory){a=m.memory;var b=d.buffer;a.byteLength<b.byteLength&&u("the new buffer in mergeMemory is smaller than the previous one. in native wasm, we should grow memory here");b=new Int8Array(b);(new Int8Array(a)).set(b);d.buffer=buffer=a;ma()}d.asm=m;d.usingWasm=!0;B--;d.monitorRunDependencies&&d.monitorRunDependencies(B);0==B&&(null!==Ca&&(clearInterval(Ca),Ca=null),C&&(a=C,C=null,a()))}function e(a){c(a.instance)}function g(a){b().then(function(a){return WebAssembly.instantiate(a, k)}).then(a).catch(function(a){u("failed to asynchronously prepare wasm: "+a);z(a)})}if("object"!==typeof WebAssembly)return u("no native wasm support detected"),!1;if(!(d.wasmMemory instanceof WebAssembly.Memory))return u("no native wasm Memory in use"),!1;a.memory=d.wasmMemory;k.global={NaN:NaN,Infinity:Infinity};k["global.Math"]=Math;k.env=a;B++;d.monitorRunDependencies&&d.monitorRunDependencies(B);if(d.instantiateWasm)try{return d.instantiateWasm(k,c)}catch(ja){return u("Module.instantiateWasm callback failed with error: "+ ja),!1}d.wasmBinary||"function"!==typeof WebAssembly.instantiateStreaming||Da(f)||"function"!==typeof fetch?g(e):WebAssembly.instantiateStreaming(fetch(f,{credentials:"same-origin"}),k).then(e).catch(function(a){u("wasm streaming compile failed: "+a);u("falling back to ArrayBuffer instantiation");g(e)});return{}}var e="FSid.wast",f="FSid.wasm",l="FSid.temp.asm.js";"function"===typeof d.locateFile&&(Da(e)||(e=d.locateFile(e)),Da(f)||(f=d.locateFile(f)),Da(l)||(l=d.locateFile(l)));var k={global:null, env:null,asm2wasm:ca,parent:d},m=null;d.asmPreload=d.asm;var h=d.reallocBuffer;d.reallocBuffer=function(a){if("asmjs"===p)var b=h(a);else a:{var c=d.usingWasm?65536:16777216;0<a%c&&(a+=c-a%c);c=d.buffer.byteLength;if(d.usingWasm)try{b=-1!==d.wasmMemory.grow((a-c)/65536)?d.buffer=d.wasmMemory.buffer:null;break a}catch(t){b=null;break a}b=void 0}return b};var p="";d.asm=function(a,b){if(!b.table){a=d.wasmTableSize;void 0===a&&(a=1024);var e=d.wasmMaxTableSize;b.table="object"===typeof WebAssembly&& "function"===typeof WebAssembly.Table?void 0!==e?new WebAssembly.Table({initial:a,maximum:e,element:"anyfunc"}):new WebAssembly.Table({initial:a,element:"anyfunc"}):Array(a);d.wasmTable=b.table}b.memoryBase||(b.memoryBase=d.STATIC_BASE);b.tableBase||(b.tableBase=0);(b=c(b))||z("Assertion failed: no binaryen method succeeded.");return b}})();na=1024;y=na+176464;xa.push({L:function(){Ea()}},{L:function(){Fa()}});d.STATIC_BASE=na;d.STATIC_BUMP=176464;y+=16;function Ga(){return!!Ga.m}var E=0;function F(){E+=4;return w[E-4>>2]}var Ha={};function G(a,b){E=b;try{var c=F(),e=F(),f=F();a=0;G.m||(G.m=[null,[],[]],G.P=function(a,b){var c=G.m[a];c||z("Assertion failed: undefined");if(0===b||10===b){a:{for(var e=b=0;c[e];)++e;if(16<e-b&&c.subarray&&ea)b=ea.decode(c.subarray(b,e));else for(e="";;){var f=c[b++];if(!f){b=e;break a}if(f&128){var m=c[b++]&63;if(192==(f&224))e+=String.fromCharCode((f&31)<<6|m);else{var l=c[b++]&63;if(224==(f&240))f=(f&15)<<12|m<<6|l;else{var k=c[b++]&63;if(240==(f&248))f=(f&7)<<18|m<<12|l<<6|k;else{var h=c[b++]& 63;if(248==(f&252))f=(f&3)<<24|m<<18|l<<12|k<<6|h;else{var p=c[b++]&63;f=(f&1)<<30|m<<24|l<<18|k<<12|h<<6|p}}}65536>f?e+=String.fromCharCode(f):(f-=65536,e+=String.fromCharCode(55296|f>>10,56320|f&1023))}}else e+=String.fromCharCode(f)}}(1===a?aa:u)(b);c.length=0}else c.push(b)});for(b=0;b<f;b++){for(var l=w[e+8*b>>2],k=w[e+(8*b+4)>>2],m=0;m<k;m++)G.P(c,v[l+m]);a+=k}return a}catch(h){return"undefined"!==typeof FS&&h instanceof FS.I||z(h),-h.K}} function Ia(a){switch(a){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+a);}}var Ja=void 0;function H(a){for(var b="";v[a];)b+=Ja[v[a++]];return b}var I={},J={},Ka={};function La(a){if(void 0===a)return"_unknown";a=a.replace(/[^a-zA-Z0-9_]/g,"$");var b=a.charCodeAt(0);return 48<=b&&57>=b?"_"+a:a} function Ma(a,b){a=La(a);return(new Function("body","return function "+a+'() {\n"use strict";\nreturn body.apply(this, arguments);\n};\n'))(b)}function Na(a){var b=Error,c=Ma(a,function(b){this.name=a;this.message=b;b=Error(b).stack;void 0!==b&&(this.stack=this.toString()+"\n"+b.replace(/^Error(:[^\n]*)?\n/,""))});c.prototype=Object.create(b.prototype);c.prototype.constructor=c;c.prototype.toString=function(){return void 0===this.message?this.name:this.name+": "+this.message};return c} var K=void 0;function L(a){throw new K(a);}var Oa=void 0;function Pa(a){throw new Oa(a);}function M(a,b,c){function e(b){b=c(b);b.length!==a.length&&Pa("Mismatched type converter count");for(var e=0;e<a.length;++e)O(a[e],b[e])}a.forEach(function(a){Ka[a]=b});var f=Array(b.length),l=[],k=0;b.forEach(function(a,b){J.hasOwnProperty(a)?f[b]=J[a]:(l.push(a),I.hasOwnProperty(a)||(I[a]=[]),I[a].push(function(){f[b]=J[a];++k;k===l.length&&e(f)}))});0===l.length&&e(f)} function O(a,b,c){c=c||{};if(!("argPackAdvance"in b))throw new TypeError("registerType registeredInstance requires argPackAdvance");var e=b.name;a||L('type "'+e+'" must have a positive integer typeid pointer');if(J.hasOwnProperty(a)){if(c.X)return;L("Cannot register type '"+e+"' twice")}J[a]=b;delete Ka[a];I.hasOwnProperty(a)&&(b=I[a],delete I[a],b.forEach(function(a){a()}))}function Qa(a){L(a.a.f.b.name+" instance already deleted")}var P=void 0,Q=[];function Ra(){for(;Q.length;){var a=Q.pop();a.a.v=!1;a["delete"]()}}function R(){}var Sa={};function Ta(a,b,c){if(void 0===a[b].l){var e=a[b];a[b]=function(){a[b].l.hasOwnProperty(arguments.length)||L("Function '"+c+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+a[b].l+")!");return a[b].l[arguments.length].apply(this,arguments)};a[b].l=[];a[b].l[e.B]=e}} function Ua(a,b){d.hasOwnProperty(a)?(L("Cannot register public name '"+a+"' twice"),Ta(d,a,a),d.hasOwnProperty(void 0)&&L("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"),d[a].l[void 0]=b):d[a]=b}function Va(a,b,c,e,f,l,k,m){this.name=a;this.constructor=b;this.o=c;this.u=e;this.i=f;this.T=l;this.A=k;this.S=m;this.Z=[]} function Wa(a,b,c){for(;b!==c;)b.A||L("Expected null or instance of "+c.name+", got an instance of "+b.name),a=b.A(a),b=b.i;return a}function Xa(a,b){if(null===b)return this.G&&L("null is not a valid "+this.name),0;b.a||L('Cannot pass "'+T(b)+'" as a '+this.name);b.a.c||L("Cannot pass deleted object as a pointer of type "+this.name);return Wa(b.a.c,b.a.f.b,this.b)} function Ya(a,b){if(null===b){this.G&&L("null is not a valid "+this.name);if(this.D){var c=this.$();null!==a&&a.push(this.u,c);return c}return 0}b.a||L('Cannot pass "'+T(b)+'" as a '+this.name);b.a.c||L("Cannot pass deleted object as a pointer of type "+this.name);!this.C&&b.a.f.C&&L("Cannot convert argument of type "+(b.a.h?b.a.h.name:b.a.f.name)+" to parameter type "+this.name);c=Wa(b.a.c,b.a.f.b,this.b);if(this.D)switch(void 0===b.a.g&&L("Passing raw pointer to smart pointer is illegal"),this.ba){case 0:b.a.h=== this?c=b.a.g:L("Cannot convert argument of type "+(b.a.h?b.a.h.name:b.a.f.name)+" to parameter type "+this.name);break;case 1:c=b.a.g;break;case 2:if(b.a.h===this)c=b.a.g;else{var e=b.clone();c=this.aa(c,Za(function(){e["delete"]()}));null!==a&&a.push(this.u,c)}break;default:L("Unsupporting sharing policy")}return c} function $a(a,b){if(null===b)return this.G&&L("null is not a valid "+this.name),0;b.a||L('Cannot pass "'+T(b)+'" as a '+this.name);b.a.c||L("Cannot pass deleted object as a pointer of type "+this.name);b.a.f.C&&L("Cannot convert argument of type "+b.a.f.name+" to parameter type "+this.name);return Wa(b.a.c,b.a.f.b,this.b)}function ab(a){return this.fromWireType(x[a>>2])}function bb(a,b,c){if(b===c)return a;if(void 0===c.i)return null;a=bb(a,b,c.i);return null===a?null:c.S(a)}var U={};function cb(a,b){for(void 0===b&&L("ptr should not be undefined");a.i;)b=a.A(b),a=a.i;return U[b]}function db(a,b){b.f&&b.c||Pa("makeClassHandle requires ptr and ptrType");!!b.h!==!!b.g&&Pa("Both smartPtrType and smartPtr must be specified");b.count={value:1};return Object.create(a,{a:{value:b}})} function V(a,b,c,e,f,l,k,m,h,p,g){this.name=a;this.b=b;this.G=c;this.C=e;this.D=f;this.Y=l;this.ba=k;this.M=m;this.$=h;this.aa=p;this.u=g;f||void 0!==b.i?this.toWireType=Ya:(this.toWireType=e?Xa:$a,this.j=null)}function eb(a,b){d.hasOwnProperty(a)||Pa("Replacing nonexistant public symbol");d[a]=b;d[a].B=void 0} function W(a,b){a=H(a);if(void 0!==d["FUNCTION_TABLE_"+a])var c=d["FUNCTION_TABLE_"+a][b];else if("undefined"!==typeof FUNCTION_TABLE)c=FUNCTION_TABLE[b];else{c=d.asm["dynCall_"+a];void 0===c&&(c=d.asm["dynCall_"+a.replace(/f/g,"d")],void 0===c&&L("No dynCall invoker for signature: "+a));for(var e=[],f=1;f<a.length;++f)e.push("a"+f);f="return function "+("dynCall_"+a+"_"+b)+"("+e.join(", ")+") {\n";f+=" return dynCall(rawFunction"+(e.length?", ":"")+e.join(", ")+");\n";c=(new Function("dynCall", "rawFunction",f+"};\n"))(c,b)}"function"!==typeof c&&L("unknown function pointer with signature "+a+": "+b);return c}var fb=void 0;function gb(a){a=hb(a);var b=H(a);X(a);return b}function Y(a,b){function c(a){f[a]||J[a]||(Ka[a]?Ka[a].forEach(c):(e.push(a),f[a]=!0))}var e=[],f={};b.forEach(c);throw new fb(a+": "+e.map(gb).join([", "]));}function ib(a,b){for(var c=[],e=0;e<a;e++)c.push(w[(b>>2)+e]);return c}function kb(a){for(;a.length;){var b=a.pop();a.pop()(b)}} function lb(a){var b=Function;if(!(b instanceof Function))throw new TypeError("new_ called with constructor type "+typeof b+" which is not a function");var c=Ma(b.name||"unknownFunctionName",function(){});c.prototype=b.prototype;c=new c;a=b.apply(c,a);return a instanceof Object?a:c} function mb(a,b,c){a instanceof Object||L(c+' with invalid "this": '+a);a instanceof b.b.constructor||L(c+' incompatible with "this" of type '+a.constructor.name);a.a.c||L("cannot call emscripten binding method "+c+" on deleted object");return Wa(a.a.c,a.a.f.b,b.b)}var nb=[],Z=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function ob(a){4<a&&0===--Z[a].H&&(Z[a]=void 0,nb.push(a))} function Za(a){switch(a){case void 0:return 1;case null:return 2;case !0:return 3;case !1:return 4;default:var b=nb.length?nb.pop():Z.length;Z[b]={H:1,value:a};return b}}function pb(a,b,c){switch(b){case 0:return function(a){return this.fromWireType((c?fa:v)[a])};case 1:return function(a){return this.fromWireType((c?ha:ia)[a>>1])};case 2:return function(a){return this.fromWireType((c?w:x)[a>>2])};default:throw new TypeError("Unknown integer type: "+a);}} function qb(a,b){var c=J[a];void 0===c&&L(b+" has unknown type "+gb(a));return c}function T(a){if(null===a)return"null";var b=typeof a;return"object"===b||"array"===b||"function"===b?a.toString():""+a}function rb(a,b){switch(b){case 2:return function(a){return this.fromWireType(ka[a>>2])};case 3:return function(a){return this.fromWireType(la[a>>3])};default:throw new TypeError("Unknown float type: "+a);}} function sb(a,b,c){switch(b){case 0:return c?function(a){return fa[a]}:function(a){return v[a]};case 1:return c?function(a){return ha[a>>1]}:function(a){return ia[a>>1]};case 2:return c?function(a){return w[a>>2]}:function(a){return x[a>>2]};default:throw new TypeError("Unknown integer type: "+a);}}var tb={},ub=1;function vb(a,b){vb.m||(vb.m={});a in vb.m||(d.dynCall_v(b),vb.m[a]=1)}for(var wb=Array(256),xb=0;256>xb;++xb)wb[xb]=String.fromCharCode(xb);Ja=wb;K=d.BindingError=Na("BindingError");Oa=d.InternalError=Na("InternalError");R.prototype.isAliasOf=function(a){if(!(this instanceof R&&a instanceof R))return!1;var b=this.a.f.b,c=this.a.c,e=a.a.f.b;for(a=a.a.c;b.i;)c=b.A(c),b=b.i;for(;e.i;)a=e.A(a),e=e.i;return b===e&&c===a};R.prototype.clone=function(){this.a.c||Qa(this);if(this.a.w)return this.a.count.value+=1,this;var a=this.a;a=Object.create(Object.getPrototypeOf(this),{a:{value:{count:a.count,v:a.v,w:a.w,c:a.c,f:a.f,g:a.g,h:a.h}}});a.a.count.value+=1;a.a.v=!1;return a};R.prototype["delete"]=function(){this.a.c||Qa(this);this.a.v&&!this.a.w&&L("Object already scheduled for deletion");--this.a.count.value;if(0===this.a.count.value){var a=this.a;a.g?a.h.u(a.g):a.f.b.u(a.c)}this.a.w||(this.a.g=void 0,this.a.c=void 0)};R.prototype.isDeleted=function(){return!this.a.c};R.prototype.deleteLater=function(){this.a.c||Qa(this);this.a.v&&!this.a.w&&L("Object already scheduled for deletion");Q.push(this);1===Q.length&&P&&P(Ra);this.a.v=!0;return this};V.prototype.U=function(a){this.M&&(a=this.M(a));return a};V.prototype.J=function(a){this.u&&this.u(a)};V.prototype.argPackAdvance=8;V.prototype.readValueFromPointer=ab;V.prototype.deleteObject=function(a){if(null!==a)a["delete"]()};V.prototype.fromWireType=function(a){function b(){return this.D?db(this.b.o,{f:this.Y,c:c,h:this,g:a}):db(this.b.o,{f:this,c:a})}var c=this.U(a);if(!c)return this.J(a),null;var e=cb(this.b,c);if(void 0!==e){if(0===e.a.count.value)return e.a.c=c,e.a.g=a,e.clone();e=e.clone();this.J(a);return e}e=this.b.T(c);e=Sa[e];if(!e)return b.call(this);e=this.C?e.R:e.pointerType;var f=bb(c,this.b,e.b);return null===f?b.call(this):this.D?db(e.b.o,{f:e,c:f,h:this,g:a}):db(e.b.o,{f:e,c:f})};d.getInheritedInstanceCount=function(){return Object.keys(U).length};d.getLiveInheritedInstances=function(){var a=[],b;for(b in U)U.hasOwnProperty(b)&&a.push(U[b]);return a};d.flushPendingDeletes=Ra;d.setDelayFunction=function(a){P=a;Q.length&&P&&P(Ra)};fb=d.UnboundTypeError=Na("UnboundTypeError");d.count_emval_handles=function(){for(var a=0,b=5;b<Z.length;++b)void 0!==Z[b]&&++a;return a};d.get_first_emval=function(){for(var a=5;a<Z.length;++a)if(void 0!==Z[a])return Z[a];return null};var yb=y;y=y+4+15&-16;sa=yb;oa=pa=ba(y);qa=oa+ua;ra=ba(qa);w[sa>>2]=ra;d.wasmTableSize=490;d.wasmMaxTableSize=490;d.N={};d.O={abort:z,enlargeMemory:function(){ta()},getTotalMemory:function(){return A},abortOnCannotGrowMemory:ta,___cxa_allocate_exception:function(a){return zb(a)},___cxa_pure_virtual:function(){da=!0;throw"Pure virtual function called!";},___cxa_throw:function(a){"uncaught_exception"in Ga?Ga.m++:Ga.m=1;throw a+" - Exception catching is disabled, this exception cannot be caught. Compile with -s DISABLE_EXCEPTION_CATCHING=0 or DISABLE_EXCEPTION_CATCHING=2 to catch.";},___setErrNo:function(a){d.___errno_location&& (w[d.___errno_location()>>2]=a);return a},___syscall140:function(a,b){E=b;try{var c=Ha.V();F();var e=F(),f=F(),l=F();FS.ea(c,e,l);w[f>>2]=c.position;c.W&&0===e&&0===l&&(c.W=null);return 0}catch(k){return"undefined"!==typeof FS&&k instanceof FS.I||z(k),-k.K}},___syscall146:G,___syscall6:function(a,b){E=b;try{var c=Ha.V();FS.close(c);return 0}catch(e){return"undefined"!==typeof FS&&e instanceof FS.I||z(e),-e.K}},__embind_register_bool:function(a,b,c,e,f){var l=Ia(c);b=H(b);O(a,{name:b,fromWireType:function(a){return!!a}, toWireType:function(a,b){return b?e:f},argPackAdvance:8,readValueFromPointer:function(a){if(1===c)var e=fa;else if(2===c)e=ha;else if(4===c)e=w;else throw new TypeError("Unknown boolean type size: "+b);return this.fromWireType(e[a>>l])},j:null})},__embind_register_class:function(a,b,c,e,f,l,k,m,h,p,g,q,D){g=H(g);l=W(f,l);m&&(m=W(k,m));p&&(p=W(h,p));D=W(q,D);var t=La(g);Ua(t,function(){Y("Cannot construct "+g+" due to unbound types",[e])});M([a,b,c],e?[e]:[],function(b){b=b[0];if(e){var c=b.b;var f= c.o}else f=R.prototype;b=Ma(t,function(){if(Object.getPrototypeOf(this)!==k)throw new K("Use 'new' to construct "+g);if(void 0===h.s)throw new K(g+" has no accessible constructor");var a=h.s[arguments.length];if(void 0===a)throw new K("Tried to invoke ctor of "+g+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(h.s).toString()+") parameters instead!");return a.apply(this,arguments)});var k=Object.create(f,{constructor:{value:b}});b.prototype=k;var h=new Va(g,b, k,D,c,l,m,p);c=new V(g,h,!0,!1,!1);f=new V(g+"*",h,!1,!1,!1);var q=new V(g+" const*",h,!1,!0,!1);Sa[a]={pointerType:f,R:q};eb(t,b);return[c,f,q]})},__embind_register_class_constructor:function(a,b,c,e,f,l){var k=ib(b,c);f=W(e,f);M([],[a],function(a){a=a[0];var c="constructor "+a.name;void 0===a.b.s&&(a.b.s=[]);if(void 0!==a.b.s[b-1])throw new K("Cannot register multiple constructors with identical number of parameters ("+(b-1)+") for class '"+a.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");a.b.s[b-1]=function(){Y("Cannot construct "+a.name+" due to unbound types",k)};M([],k,function(e){a.b.s[b-1]=function(){arguments.length!==b-1&&L(c+" called with "+arguments.length+" arguments, expected "+(b-1));var a=[],k=Array(b);k[0]=l;for(var h=1;h<b;++h)k[h]=e[h].toWireType(a,arguments[h-1]);k=f.apply(null,k);kb(a);return e[0].fromWireType(k)};return[]});return[]})},__embind_register_class_function:function(a,b,c,e,f,l,k,m){var h=ib(c,e);b=H(b);l=W(f,l);M([],[a],function(a){function e(){Y("Cannot call "+ f+" due to unbound types",h)}a=a[0];var f=a.name+"."+b;m&&a.b.Z.push(b);var p=a.b.o,t=p[b];void 0===t||void 0===t.l&&t.className!==a.name&&t.B===c-2?(e.B=c-2,e.className=a.name,p[b]=e):(Ta(p,b,f),p[b].l[c-2]=e);M([],h,function(e){var h=f,g=a,m=l,q=e.length;2>q&&L("argTypes array size mismatch! Must at least get return value and 'this' types!");var t=null!==e[1]&&null!==g,D=!1;for(g=1;g<e.length;++g)if(null!==e[g]&&void 0===e[g].j){D=!0;break}var ja="void"!==e[0].name,N="",S="";for(g=0;g<q-2;++g)N+= (0!==g?", ":"")+"arg"+g,S+=(0!==g?", ":"")+"arg"+g+"Wired";h="return function "+La(h)+"("+N+") {\nif (arguments.length !== "+(q-2)+") {\nthrowBindingError('function "+h+" called with ' + arguments.length + ' arguments, expected "+(q-2)+" args!');\n}\n";D&&(h+="var destructors = [];\n");var jb=D?"destructors":"null";N="throwBindingError invoker fn runDestructors retType classParam".split(" ");m=[L,m,k,kb,e[0],e[1]];t&&(h+="var thisWired = classParam.toWireType("+jb+", this);\n");for(g=0;g<q-2;++g)h+= "var arg"+g+"Wired = argType"+g+".toWireType("+jb+", arg"+g+"); // "+e[g+2].name+"\n",N.push("argType"+g),m.push(e[g+2]);t&&(S="thisWired"+(0<S.length?", ":"")+S);h+=(ja?"var rv = ":"")+"invoker(fn"+(0<S.length?", ":"")+S+");\n";if(D)h+="runDestructors(destructors);\n";else for(g=t?1:2;g<e.length;++g)q=1===g?"thisWired":"arg"+(g-2)+"Wired",null!==e[g].j&&(h+=q+"_dtor("+q+"); // "+e[g].name+"\n",N.push(q+"_dtor"),m.push(e[g].j));ja&&(h+="var ret = retType.fromWireType(rv);\nreturn ret;\n");N.push(h+ "}\n");e=lb(N).apply(null,m);void 0===p[b].l?(e.B=c-2,p[b]=e):p[b].l[c-2]=e;return[]});return[]})},__embind_register_class_property:function(a,b,c,e,f,l,k,m,h,p){b=H(b);f=W(e,f);M([],[a],function(a){a=a[0];var e=a.name+"."+b,g={get:function(){Y("Cannot access "+e+" due to unbound types",[c,k])},enumerable:!0,configurable:!0};h?g.set=function(){Y("Cannot access "+e+" due to unbound types",[c,k])}:g.set=function(){L(e+" is a read-only property")};Object.defineProperty(a.b.o,b,g);M([],h?[c,k]:[c],function(c){var g= c[0],k={get:function(){var b=mb(this,a,e+" getter");return g.fromWireType(f(l,b))},enumerable:!0};if(h){h=W(m,h);var q=c[1];k.set=function(b){var c=mb(this,a,e+" setter"),f=[];h(p,c,q.toWireType(f,b));kb(f)}}Object.defineProperty(a.b.o,b,k);return[]});return[]})},__embind_register_emval:function(a,b){b=H(b);O(a,{name:b,fromWireType:function(a){var b=Z[a].value;ob(a);return b},toWireType:function(a,b){return Za(b)},argPackAdvance:8,readValueFromPointer:ab,j:null})},__embind_register_enum:function(a, b,c,e){function f(){}c=Ia(c);b=H(b);f.values={};O(a,{name:b,constructor:f,fromWireType:function(a){return this.constructor.values[a]},toWireType:function(a,b){return b.value},argPackAdvance:8,readValueFromPointer:pb(b,c,e),j:null});Ua(b,f)},__embind_register_enum_value:function(a,b,c){var e=qb(a,"enum");b=H(b);a=e.constructor;e=Object.create(e.constructor.prototype,{value:{value:c},constructor:{value:Ma(e.name+"_"+b,function(){})}});a.values[c]=e;a[b]=e},__embind_register_float:function(a,b,c){c= Ia(c);b=H(b);O(a,{name:b,fromWireType:function(a){return a},toWireType:function(a,b){if("number"!==typeof b&&"boolean"!==typeof b)throw new TypeError('Cannot convert "'+T(b)+'" to '+this.name);return b},argPackAdvance:8,readValueFromPointer:rb(b,c),j:null})},__embind_register_integer:function(a,b,c,e,f){function l(a){return a}b=H(b);-1===f&&(f=4294967295);var k=Ia(c);if(0===e){var m=32-8*c;l=function(a){return a<<m>>>m}}var h=-1!=b.indexOf("unsigned");O(a,{name:b,fromWireType:l,toWireType:function(a, c){if("number"!==typeof c&&"boolean"!==typeof c)throw new TypeError('Cannot convert "'+T(c)+'" to '+this.name);if(c<e||c>f)throw new TypeError('Passing a number "'+T(c)+'" from JS side to C/C++ side to an argument of type "'+b+'", which is outside the valid range ['+e+", "+f+"]!");return h?c>>>0:c|0},argPackAdvance:8,readValueFromPointer:sb(b,k,0!==e),j:null})},__embind_register_memory_view:function(a,b,c){function e(a){a>>=2;var b=x;return new f(b.buffer,b[a+1],b[a])}var f=[Int8Array,Uint8Array, Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][b];c=H(c);O(a,{name:c,fromWireType:e,argPackAdvance:8,readValueFromPointer:e},{X:!0})},__embind_register_std_string:function(a,b){b=H(b);O(a,{name:b,fromWireType:function(a){for(var b=x[a>>2],c=Array(b),l=0;l<b;++l)c[l]=String.fromCharCode(v[a+4+l]);X(a);return c.join("")},toWireType:function(a,b){function c(a,b){return a[b]}function e(a,b){return a.charCodeAt(b)}b instanceof ArrayBuffer&&(b=new Uint8Array(b));var k;b instanceof Uint8Array?k=c:b instanceof Uint8ClampedArray?k=c:b instanceof Int8Array?k=c:"string"===typeof b?k=e:L("Cannot pass non-string to std::string");var m=b.length,h=zb(4+m);x[h>>2]=m;for(var p=0;p<m;++p){var g=k(b,p);255<g&&(X(h),L("String has UTF-16 code units that do not fit in 8 bits"));v[h+4+p]=g}null!==a&&a.push(X,h);return h},argPackAdvance:8,readValueFromPointer:ab,j:function(a){X(a)}})},__embind_register_std_wstring:function(a,b,c){c=H(c);if(2===b){var e=function(){return ia};var f=1}else 4=== b&&(e=function(){return x},f=2);O(a,{name:c,fromWireType:function(a){for(var b=e(),c=x[a>>2],h=Array(c),l=a+4>>f,g=0;g<c;++g)h[g]=String.fromCharCode(b[l+g]);X(a);return h.join("")},toWireType:function(a,c){var k=e(),h=c.length,l=zb(4+h*b);x[l>>2]=h;for(var g=l+4>>f,q=0;q<h;++q)k[g+q]=c.charCodeAt(q);null!==a&&a.push(X,l);return l},argPackAdvance:8,readValueFromPointer:ab,j:function(a){X(a)}})},__embind_register_void:function(a,b){b=H(b);O(a,{da:!0,name:b,argPackAdvance:0,fromWireType:function(){}, toWireType:function(){}})},__emval_decref:ob,__emval_incref:function(a){4<a&&(Z[a].H+=1)},__emval_take_value:function(a,b){a=qb(a,"_emval_take_value");a=a.readValueFromPointer(b);return Za(a)},_abort:function(){d.abort()},_emscripten_memcpy_big:function(a,b,c){v.set(v.subarray(b,b+c),a);return a},_llvm_trap:function(){z("trap!")},_pthread_getspecific:function(a){return tb[a]||0},_pthread_key_create:function(a){if(0==a)return 22;w[a>>2]=ub;tb[ub]=0;ub++;return 0},_pthread_once:vb,_pthread_setspecific:function(a, b){if(!(a in tb))return 22;tb[a]=b;return 0},DYNAMICTOP_PTR:sa,STACKTOP:pa};var Ab=d.asm(d.N,d.O,buffer);d.asm=Ab;var Ea=d.__GLOBAL__sub_I_PlayerFastSID_cpp=function(){return d.asm.__GLOBAL__sub_I_PlayerFastSID_cpp.apply(null,arguments)},Fa=d.__GLOBAL__sub_I_bind_cpp=function(){return d.asm.__GLOBAL__sub_I_bind_cpp.apply(null,arguments)},hb=d.___getTypeName=function(){return d.asm.___getTypeName.apply(null,arguments)},X=d._free=function(){return d.asm._free.apply(null,arguments)},zb=d._malloc=function(){return d.asm._malloc.apply(null,arguments)};d.dynCall_i=function(){return d.asm.dynCall_i.apply(null,arguments)};d.dynCall_ii=function(){return d.asm.dynCall_ii.apply(null,arguments)};d.dynCall_iii=function(){return d.asm.dynCall_iii.apply(null,arguments)};d.dynCall_iiii=function(){return d.asm.dynCall_iiii.apply(null,arguments)};d.dynCall_iiiii=function(){return d.asm.dynCall_iiiii.apply(null,arguments)};d.dynCall_v=function(){return d.asm.dynCall_v.apply(null,arguments)};d.dynCall_vi=function(){return d.asm.dynCall_vi.apply(null,arguments)};d.dynCall_viffffffff=function(){return d.asm.dynCall_viffffffff.apply(null,arguments)};d.dynCall_vifiii=function(){return d.asm.dynCall_vifiii.apply(null,arguments)};d.dynCall_vii=function(){return d.asm.dynCall_vii.apply(null,arguments)};d.dynCall_viiffffffff=function(){return d.asm.dynCall_viiffffffff.apply(null,arguments)};d.dynCall_viii=function(){return d.asm.dynCall_viii.apply(null,arguments)};d.dynCall_viiiffffffff=function(){return d.asm.dynCall_viiiffffffff.apply(null,arguments)};d.dynCall_viiii=function(){return d.asm.dynCall_viiii.apply(null,arguments)};d.dynCall_viiiii=function(){return d.asm.dynCall_viiiii.apply(null,arguments)};d.dynCall_viiiiii=function(){return d.asm.dynCall_viiiiii.apply(null,arguments)};d.asm=Ab;C=function Bb(){d.calledRun||Cb();d.calledRun||(C=Bb)};function Cb(){function a(){if(!d.calledRun&&(d.calledRun=!0,!da)){Aa||(Aa=!0,va(xa));va(ya);if(d.onRuntimeInitialized)d.onRuntimeInitialized();if(d.postRun)for("function"==typeof d.postRun&&(d.postRun=[d.postRun]);d.postRun.length;){var a=d.postRun.shift();za.unshift(a)}va(za)}}if(!(0<B)){if(d.preRun)for("function"==typeof d.preRun&&(d.preRun=[d.preRun]);d.preRun.length;)Ba();va(wa);0<B||d.calledRun||(d.setStatus?(d.setStatus("Running..."),setTimeout(function(){setTimeout(function(){d.setStatus("")}, 1);a()},1)):a())}}d.run=Cb;function z(a){if(d.onAbort)d.onAbort(a);void 0!==a?(aa(a),u(a),a=JSON.stringify(a)):a="";da=!0;throw"abort("+a+"). Build with -s ASSERTIONS=1 for more info.";}d.abort=z;if(d.preInit)for("function"==typeof d.preInit&&(d.preInit=[d.preInit]);0<d.preInit.length;)d.preInit.pop()();d.noExitRuntime=!0;Cb();
})();