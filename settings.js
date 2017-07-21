
(function(){var n=/\s*[+-]\d*\.?\d+/,q=function(i,s){var r=Math.pow(10,parseInt(s)||0);return Math.round(i*r)/r},f=function(s,r,i){return Math.max(s,Math.min(r,i))},e=function(i){i._dec=parseInt(i._hex.substr(1),16)},l=function(i){var r=i._dec.toString(16);i._hex="#000000".substr(0,7-r.length)+r.toUpperCase()},d=function(i){i._rgb=[i._dec>>16,(i._dec>>8)&255,i._dec&255]},c=function(i){i._dec=i._rgb[0]<<16|(i._rgb[1]<<8)&65535|i._rgb[2]},m=function(u){var i=u._rgb[0]/255,x=u._rgb[1]/255,A=u._rgb[2]/255,v=Math.min(i,Math.min(x,A)),B=Math.max(i,Math.max(x,A)),y=B+v,z=B-v,t=y/2,C=t>0&&t<1?z/(t<0.5?y:(2-y)):0,w=z>0?B==i?(x-A)/z+(x<A?6:0):B==x?(A-i)/z+2:B==A?(i-x)/z+4:0:0;u._hsl=[q(w*60,2),q(C*100,2),q(t*100,2)]},b=function(s,r,i){i+=i<0?1:(i>1?-1:0);return Math.round((i*6<1?s+(r-s)*i*6:i*2<1?r:i*3<2?s+(r-s)*(2/3-i)*6:s)*255,2)},p=function(r){var u=r._hsl[0]/360,t=r._hsl[1]/100,i=r._hsl[2]/100;if(t==0){i=q(i*255);r._rgb=[i,i,i]}else{var v=i<0.5?i*(1+t):i+t-i*t,w=2*i-v;r._rgb=[b(w,v,u+1/3),b(w,v,u),b(w,v,u-1/3)]}},k=function(s,i){if(i==null){return false}switch(s){case"alpha":return f(0,parseInt(i),100);case"rgb":return f(0,parseInt(i),255);case"h":return((parseFloat(i)%360)+360)%360;case"sl":return f(0,parseFloat(i),100);case"hex":var r=i.match(/#([0-9a-f]{6}|[0-9a-f]{3})/i);if(r){r=r[1].toUpperCase();if(r.length==3){r=r.replace(/([0-9A-F])/g,"$1$1")}return"#"+r}}return false},g=function(i,r){switch(r){case"rgb":c(i);l(i);m(i);break;case"hsl":p(i);c(i);l(i);break;case"hex":e(i);d(i);m(i);break}if(i._fn){i._fn.call(i)}},j=["red","green","blue"],o=["hue","saturation","lightness"],a=function(i,r){this._rgb=[0,0,0];this._hsl=[0,0,0];this._hex="#000000";this._alpha=100;this._dec=0;if(typeof r=="function"){this._fn=r;this.hex(i)}else{this.hex(i,r)}};a.prototype.rgba=function(){return"rgba("+this._rgb.join(",")+","+(this._alpha/100)+")"};a.prototype.alpha=function(s,r){if(s==null){return this._alpha}var i=k("alpha",s);if(i===false){return this}if(this._alpha!=i){this._alpha=i;!r&&g(this,"alpha")}return this};a.prototype.rgb=function(s,v){if(s==null){return this._rgb}var u=k("rgb",s[0]),t=k("rgb",s[1]),i=k("rgb",s[2]);if(u===false||t===false||i===false){return this}if(this._rgb[0]!=u||this._rgb[1]!=t||this._rgb[2]!=i){this._rgb=[u,t,i];this.alpha(v,true);g(this,"rgb")}else{this.alpha(v)}return this};a.prototype.hsl=function(r,v){if(r==null){return this._hsl}var u=k("h",r[0]),t=k("sl",r[1]),i=k("sl",r[2]);if(u===false||t===false||i===false){return this}if(this._hsl[0]!=u||this._hsl[1]!=t||this._hsl[2]!=i){this._hsl=[u,t,i];this.alpha(v,true);g(this,"hsl")}else{this.alpha(v)}return this};a.prototype.hex=function(r,s){if(r==null){return this._hex}var i=k("hex",r);if(i===false){return this}if(this._hex!=i){this._hex=i;this.alpha(s,true);g(this,"hex")}else{this.alpha(s)}return this};for(var h=0;h<3;h++){a.prototype[j[h]]=(function(r){return function(i){if(i==null){return this._rgb[r]}var s=i;if(typeof i=="string"&&i.match(n)){s=this._rgb[r]+parseInt(i)}s=k("rgb",s);if(s!==false&&s!=this._rgb[r]){this._rgb[r]=s;g(this,"rgb")}return this}})(h);a.prototype[o[h]]=(function(r){return function(i){if(i==null){return this._hsl[r]}var s=i;if(typeof i=="string"&&i.match(n)){s=this._hsl[r]+parseFloat(i)}s=k(r==0?"h":"sl",s);if(s!==false&&this._hsl[r]!=s){this._hsl[r]=s;g(this,"hsl")}return this}})(h)}a.prototype.fn=function(){if(this._fn){return this._fn.apply(this,arguments)}return this};window.kt_Color=a})();(function(g){var c='<div class="farbtastic"><div class="color"/><div class="wheel"/><div class="overlay"/><div class="alpha"><div class="gradient"/></div><div class="h-marker marker"/><div class="sl-marker marker"/><div class="a-marker marker"/></div>',a=84,f=100,b=97,e=false,h=13,d=function(o,l){var t=g(o).html(c),A=g(document),q=t.children(),m=q.children(".wheel"),p=q.children(".h-marker"),x=q.children(".sl-marker"),i=q.children(".a-marker"),k=q.children(".color"),B=q.find(".gradient"),u="square",j,v=new kt_Color("#000000",function(){var E=this._hsl[0]*6.28/360;p.css({left:Math.round(Math.sin(E)*a)+b,top:Math.round(-Math.cos(E)*a)+b});x.css({left:b-Math.round(f*(this._hsl[1]/100-0.5)),top:b-Math.round(f*(this._hsl[2]/100-0.5))});i.css("top",h+a*(100-this._alpha)/50);y.hue(v._hsl[0]);var C=y._hex;k.css("backgroundColor",C);var D="linear-gradient(to bottom, "+C+" 0%, ";D+=y.rgba()+" 100%)";B.css("backgroundImage",D);l.call(this)}),y=new kt_Color("#FF0000",0),w=function(C){var D=m.offset();return{x:(C.pageX-D.left)-b,y:(C.pageY-D.top)-b}},r=function(C){if(C.which!=1){return false}if(!e){A.on(n);e=true}j=w(C);u="square";if(j.x>b+1){u="alpha"}else{if(Math.max(Math.abs(j.x),Math.abs(j.y))*2>f){u="hue"}}z(C);return false},z=function(C){j=w(C);switch(u){case"hue":v.hue(Math.atan2(j.x,-j.y)*360/6.28);break;case"square":v.hsl([v._hsl[0],-100*(j.x/f)+50,-100*(j.y/f)+50]);break;case"alpha":v.alpha(-50*(j.y/a)+50);break}},s=function(){A.off(n);e=false},n={mousemove:z,mouseup:s};q.on("mousedown",r);return v};window.kt_Color_Picker=d})(jQuery);(function(b,a){b(function(){var E=b(document),d=b("#kt_picker"),n=null,f=b(),w=kt_Color_Picker(d,function(){if(n){n.siblings(".hex").val(this._hex);n.siblings(".alpha").val(this._alpha);n.children(".rgb").css("backgroundColor",this._hex);n.find(".rgba span").css("backgroundColor",this.rgba())}}),t=function(){n=b(this).siblings(".color");var H=n.siblings(".hex")[0];var I=n.siblings(".alpha")[0];w.hex(H.value,I.value)},k=function(){return d.hasClass("hidden")},x=function(){d.attr("aria-hidden","true").addClass("hidden");E.off("mousedown",o)},o=function(H){if(!b(H.target).closest(n).length){x()}},u=function(H){if(H.which==1){if(k()){E.on("mousedown",o);n=b(this);d.attr("aria-hidden","false").removeClass("hidden").position({of:this,at:"left bottom",my:"left top-2px"})}else{x()}}},B=function(H){if(b(H.target).is(".picker")){if(H.type=="focusin"){f=b(this).attr("aria-grabbed","true").addClass("grabbed").on("keydown",y)}else{f.attr("aria-grabbed","false").removeClass("grabbed").off("keydown",y)}}},G=function(I,H){return(I&&I.type=="click")?b(H).closest(".picker"):f},l=function(I){var H=G(I,this);if(H.prev().length){H.after(H.prev());return false}},s=function(I){var H=G(I,this);if(H.next().length){H.before(H.next());return false}},m=function(){if(f.next().length){f=f.next().trigger("focus");return false}},j=function(){if(f.prev().length){f=f.prev().trigger("focus");return false}},y=function(H){switch(H.which){case 33:return l();case 34:return s()}if(q(H)){switch(H.which){case 37:case 38:return l();case 39:case 40:return s()}}switch(H.which){case 13:f.children(".color").trigger("focus");return false;case 37:case 38:return j();case 39:case 40:return m();case 35:f.appendTo(c).trigger("focus");return false;case 36:f.prependTo(c).trigger("focus");return false;case 8:case 46:h();break;case 27:f.trigger("blur");break}},h=function(){var H=f.next();if(!H.length){H=f.prev()}f.remove();H.trigger("focus")},e=function(J){if(J.type=="focusin"){n=b(this).on("keydown",A);var H=n.siblings(".hex").val();var I=n.siblings(".alpha").val();w.hex(H,I).fn()}else{x();n.off("keydown",A);n=null}},A=function(J){var H=q(J)?5:2.5,I="+"+H,K="-"+H;switch(J.which){case 109:case 189:w.hue(K);return false;case 107:case 187:w.hue(I);return false;case 38:w.lightness(I);return false;case 40:w.lightness(K);return false;case 37:w.saturation(I);return false;case 39:w.saturation(K);return false;case 27:return D(n)}},D=function(H){if(k()){H.parent().trigger("focus")}else{x()}return false},g=function(H){return/^#?([0-9A-F]{6}|[0-9A-F]{3})$/i.test(H)},i=function(J){if(J.type=="focusin"){var I=b(this);if(g(this.value)){I.data("lastValue",this.value)}var H=I.data("autoFill");if(H){clearTimeout(H);I.removeData("autoFill")}}else{if(!g(this.value)){x();var I=b(this);I.data("autoFill",setTimeout(function(){I.val(I.data("lastValue"))},5000))}}},r=function(H){switch(H.which){case 27:b(this).parent().trigger("focus");break;case 13:H.preventDefault();break}},q=function(H){return H.ctrlKey||H.shiftKey||H.metaKey};var p=b("#kt_visual, #kt_customizer"),v=b('input[name="kt_type"]'),z=b("#kt_type_palette"),F=b("#kt_visual"),c=b("#kt_colors"),C=b(a.replace(/%1\$s/g,"#000000").replace(/%2\$s/g,"").replace(/%3\$s/g,"x"));p.on("change",function(){if(this.id=="kt_visual"&&!this.checked&&z.is(":checked")){b("#kt_type_default").prop("checked",true).trigger("change")}});v.on("change",function(){if(this.value=="palette"){F.prop("checked",true)}b("#kt_customizer").trigger("change")});b("#kt_clamp, #kt_clamps").on("mousedown",function(){b("#kt_spread_odd").prop("checked",true)});b("#kt_import").on("change",function(){b("#kt_action_import").trigger("click")});b("#kt_add").on("click",function(H){H.preventDefault();C.clone().appendTo(c).children(".hex").prop({selectionStart:1,selectionEnd:7}).trigger("focus")});c.on("click",".remove",function(H){f=b(this).parent();h();H.preventDefault()}).on("mousedown",".picker",function(H){if(b(H.target).is(".picker")){b(this).trigger("focus")}}).on("focus blur",".picker",B).on("click",".color",u).on("focus blur",".color",e).on("change",".hex, .alpha",t).on("focus blur",".hex",i).on("click",".sort-up",l).on("click",".sort-down",s).on("keydown","input",r).sortable({placeholder:"picker-placeholder",items:".picker",delay:b(document.body).hasClass("mobile")?200:0,distance:2,revert:130,stop:function(I,H){H.item.css("zIndex","").trigger("focus")}})})})(jQuery,kt_TinyMCE_color_picker);