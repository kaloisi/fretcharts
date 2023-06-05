(this.webpackJsonpfretcharts=this.webpackJsonpfretcharts||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},16:function(t,e,n){},18:function(t,e,n){"use strict";n.r(e);var r=n(3),s=n.n(r),i=n(9),a=n.n(i),o=(n(14),n(15),n(1)),c=n(2),l=n(5),u=n(4),h=(n(16),n(7)),b=n(0),p=50,f=50,d=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).state={toneState:t.value},r.select=r.select.bind(Object(h.a)(r)),r}return Object(c.a)(n,[{key:"select",value:function(t){t.stopPropagation(),t.preventDefault(),this.props.onClick(this.props.value)}},{key:"cacluatePointOnCircle",value:function(t,e){var n=t*(Math.PI/180);return{x:Math.cos(n)*e,y:Math.sin(n)*e}}},{key:"createLinesAlongCurve",value:function(t,e,n){for(var r="M "+p+" "+(this.props.scales.length>1?f:f-n)+" \n",s=t;s<e+5;s+=5){var i=Math.min(s,e),a=this.cacluatePointOnCircle(i,n);r+=" L "+(p+a.x)+" "+(f+a.y)+" \n"}return r+" z"}},{key:"createPath",value:function(){}},{key:"render",value:function(){var t=this,e=this.props.scales.length,n=this.props.isInKey?"black":"#ccc",r=e>0?360/e:0,s=this.state.toneState.usedIn.size>0,i=0;return Object(b.jsx)("div",{id:this.props.id,onClick:this.select,className:"note",children:Object(b.jsxs)("svg",{children:[this.props.scales.map((function(e){i+=1;var n=t.state.toneState.isUsedInScale(e);if(s&&n){var a=t.state.toneState.getIntervalLabel(e),o=(i-1)*r-90,c=i*r-90,l=t.cacluatePointOnCircle((c+o)/2,30);return Object(b.jsxs)("g",{children:[Object(b.jsx)("path",{fill:e.color,opacity:e.enabled?1:.25,stroke:"black",d:t.createLinesAlongCurve(o,c,40)}),Object(b.jsx)("text",{x:p+l.x,y:f+l.y,fontSize:"16",stroke:e.enabled?"white":"black",dominantBaseline:"central",textAnchor:"middle",children:a})]},t.props.id+"."+i)}return"<path />"})),Object(b.jsx)("circle",{cx:p,cy:f,r:40/3,stroke:"black",strokeWidth:"1",fill:"#ccc"},this.props.id+"circle"),Object(b.jsx)("text",{x:p,y:f,fill:n,fontSize:"20",dominantBaseline:"central",textAnchor:"middle",children:this.props.value.name},this.props.id+"text")]})},this.props.id)}}]),n}(s.a.Component),g=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).state={stringState:t.value},r}return Object(c.a)(n,[{key:"render",value:function(){for(var t=this,e=[],n=function(){var n=t.state.stringState.tones[r],s=t.props.musicKey.tones.find((function(t){return t===n.name}));e.push(Object(b.jsx)(d,{onClick:t.props.onClick,isInKey:s,scales:t.props.scales,value:n},n.uid))},r=0;r<this.state.stringState.tones.length;r++)n();return Object(b.jsx)("div",{className:"string",children:e})}}]),n}(s.a.Component),v=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).state={value:t.value},r}return Object(c.a)(n,[{key:"selectOption",value:function(t){var e=this.props.options.find((function(e){return e.name===t.target.value}));this.setState({value:e}),this.props.onChange(e)}},{key:"render",value:function(){var t=this,e=[];return this.props.options.forEach((function(t){e.push(Object(b.jsx)("option",{children:t.name},t.name))})),Object(b.jsxs)("div",{className:"selectBox",children:[Object(b.jsx)("select",{onChange:function(e){return t.selectOption(e)},defaultValue:this.state.value.name,children:e}),Object(b.jsx)("div",{className:"selectBoxLabel",children:this.props.label})]})}}]),n}(s.a.Component),O=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],m=[0,2,4,5,7,9,11],j=[0,2,3,5,7,8,10],S=function(t,e,n){var r=[];return n.forEach((function(t){r.push(O[(e+t)%O.length])})),{name:t,startingSemitone:e,semitones:n,tones:r}},N={TONES:O,COLORS:{red:{r:255,g:0,b:0},blue:{r:0,g:0,b:255},green:{r:0,g:255,b:0}},KEYS:{C_MAJOR:S("C-Major",0,m),C_MINOR:S("C-Minor",0,j),D_MAJOR:S("D-Major",2,m),D_MINOR:S("D-Minor",2,j),E_MAJOR:S("E-Major",4,m),E_MINOR:S("E-Minor",4,j),F_MAJOR:S("F-Major",5,m),F_MINOR:S("F-Minor",5,j),G_MAJOR:S("G-Major",7,m),G_MINOR:S("G-Minor",7,j),A_MAJOR:S("A-Major",9,m),A_MINOR:S("A-Minor",9,j),B_MAJOR:S("B-Major",11,m),B_MINOR:S("B-Minor",11,j)},POSITIONS:{FIRST:{rootStringNumber:4,positionName:"1st",name:"1st - Scale",abr:"",fretOffsets:[[-3,-2,0],[-3,-2,0],[-3,-1],[-3,-1,0],[-3,-1,0],[-3,-2,0]],intervals:[["3","4","5"],["7","1","2"],["5","6"],["2","3","4"],["6","7","1"],["3","4","5"]]},FIRST_MAJOR_ARPPEGIO:{rootStringNumber:4,name:"1st - Major Triad Arpeggio",positionName:"1st",abr:"m",fretOffsets:[[-3,0],[-2],[-3],[-1],[0],[-3,0]],intervals:[["3","5"],["1"],["5"],["3"],["1"],["3","5"]]},FIRST_MAJOR_7_ARPPEGIO:{rootStringNumber:4,name:"1st - Major 7 Arpeggio",positionName:"1st",abr:"m7",fretOffsets:[[-3,0],[-3,-2],[-3],[-1],[-1,0],[-3,0]],intervals:[["3","5"],["7","1"],["5"],["3"],["7","1"],["3","5"]]},FIRST_DOM_7_ARPPEGIO:{rootStringNumber:4,positionName:"1st",name:"1st - Dom 7 Arpeggio",abr:"7",fretOffsets:[[-3,0],[-2],[-3,0],[-1],[-2,0],[-3,0]],intervals:[["3","5"],["1"],["5","b7"],["3"],["b7","1"],["3","5"]]},FIRST_MINOR_ARPPEGIO:{rootStringNumber:4,positionName:"1st",name:"1st - Minor Triad Arpeggio",abr:"-7",fretOffsets:[[0],[-2,1],[-3],[-2],[0],[0]],intervals:[["5"],["1","b3"],["5"],["b3"],["1"],["5"]]},FIRST_MINOR_7_ARPPEGIO:{rootStringNumber:4,positionName:"1st",name:"1st - Minor 7 Arpeggio",abr:"-7",fretOffsets:[[0],[-2,1],[-3,0],[-2],[-2,0],[0]],intervals:[["5"],["1","b3"],["5","b7"],["b3"],["b7","1"],["5"]]},FIRST_MAJOR_PENTA:{rootStringNumber:4,positionName:"1st",name:"1st - Pentatonic (Major)",abr:"m",fretOffsets:[[-3,0],[-2,0],[-3,-1],[-3,-1],[-3,0],[-3,0]],intervals:[["3","5"],["1","2"],["5","6"],["2","3"],["6","1"],["3","5"]]},FIRST_MINOR_PENTA:{rootStringNumber:4,positionName:"1st",name:"1st - Pentatonic (Minor)",abr:"-",fretOffsets:[[-2,0],[-2,1],[-3,0],[-2,0],[-2,0],[-2,0]],intervals:[["4","5"],["1","b3"],["5","b7"],["b3","4"],["b7","1"],["4","5"]]},SECOND:{rootStringNumber:4,positionName:"2nd",name:"2nd - Scale",abr:"",fretOffsets:[[0,2,4],[0,2,3],[-1,1,2],[-1,0,2],[-1,0,2],[0,2]],intervals:[["5","6","7"],["2","3","4"],["6","7","1"],["3","4","5"],["7","1","2"],["5","6"]]},SECOND_MAJOR_TRIAD_ARPEGGIO:{default:!1,rootStringNumber:4,positionName:"2nd",name:"2nd - Major Triad Arpeggio",abr:"m",fretOffsets:[[0],[2],[2],[-1,2],[0],[0]],intervals:[["5"],["3"],["1"],["3","5"],["1"],["5"]]},SECOND_MAJOR_7_ARPEGGIO:{default:!0,rootStringNumber:4,positionName:"2nd",name:"2nd - Major 7 Arpeggio",abr:"m7",fretOffsets:[[0,4],[2],[1,2],[-1,2],[-1,0],[0]],intervals:[["5","7"],["3"],["7","1"],["3","5"],["7","1"],["5"]]},SECOND_DOM_7_ARPEGGIO:{rootStringNumber:4,positionName:"2nd",name:"2nd - Dom 7 Arpeggio",abr:"7",fretOffsets:[[0,3],[2],[0,2],[-1,2],[0],[0,3]],intervals:[["5","b7"],["3"],["b7","1"],["3","5"],["1"],["5","b7"]]},SECOND_MINOR_TRIAD_ARPEGGIO:{rootStringNumber:4,positionName:"2nd",name:"2nd - Minor Triad Arpeggio",abr:"-",fretOffsets:[[0],[1],[2],[2],[0,3],[0]],intervals:[["5"],["b3"],["1"],["5"],["1","b3"],["5"]]},SECOND_MINOR_7_ARPEGGIO:{rootStringNumber:4,positionName:"2nd",name:"2nd - Minor 7 Arpeggio",abr:"-7",fretOffsets:[[0,3],[1],[0,2],[2],[0,3],[0,3]],intervals:[["5","b7"],["b3"],["b7","1"],["5"],["1","b3"],["5","b7"]]},SECOND_MINOR_7_B5_ARPEGGIO:{rootStringNumber:4,positionName:"2nd",name:"2nd - Minor 7 b5 Arpeggio",abr:"-7b5",fretOffsets:[[-1,3],[1],[0,2],[1],[0,3],[-1,3]],intervals:[["b5","b7"],["b3"],["b7","1"],["b5"],["1","b3"],["b5","b7"]]},SECOND_MAJOR_PENTA:{rootStringNumber:4,positionName:"2nd",name:"2nd - Pentatonic (Major)",abr:"m",fretOffsets:[[0,2],[0,2],[-1,2],[-1,2],[0,2],[0,2]],intervals:[["2","6"],["3","3"],["6","1"],["3","5"],["1","2"],["5","6"]]},SECOND_MINOR_PENTA:{rootStringNumber:4,positionName:"2nd",name:"2nd - Pentatonic (Minor)",abr:"-",fretOffsets:[[0,3],[1,3],[0,2],[0,2],[0,3],[0,3]],intervals:[["5","b7"],["b3","4"],["b7","1"],["4","5"],["1","b3"],["5","b7"]]},THIRD:{rootStringNumber:5,positionName:"3rd",name:"3rd - Scale",abr:"",fretOffsets:[[-3,-1,0],[-3,-2,0],[-4,-3,-1],[-3,-1],[-3,-1,0],[-3,-1,0]],intervals:[["6","7","1"],["3","4","5"],["7","1","2"],["5","6"],["2","3","4"],["6","7","1"]]},THIRD_MAJOR_7_ARPEGGIO:{rootStringNumber:5,positionName:"3rd",name:"3rd - Major 7 Arpeggio",abr:"m7",fretOffsets:[[-1,0],[-3,0],[-4,-3],[-3],[-1],[-1,0]],intervals:[["7","1"],["3","5"],["7","1"],["5"],["3"],["7","1"]]},THIRD_DOM_7_ARPEGGIO:{rootStringNumber:5,positionName:"3rd",name:"3rd - Dom 7 Arpeggio",abr:"7",fretOffsets:[[-2,0],[-3,0],[-3],[-3,0],[-1],[-2,0]],intervals:[["b7","1"],["3","5"],["1"],["5","b7"],["3"],["b7","1"]]},THIRD_MINOR_7_ARPEGGIO:{rootStringNumber:5,positionName:"3rd",name:"3rd - Minor 7 Arpeggio",abr:"-7",fretOffsets:[[-2,0],[0],[-3,0],[-3,0],[-2],[-2,0]],intervals:[["b7","1"],["5"],["1","b3"],["5","b7"],["b3"],["b7","1"]]},THRID_MAJOR_PENTA:{rootStringNumber:5,positionName:"3rd",name:"3rd - Pentatonic (Major)",abr:"m",fretOffsets:[[-3,0],[-3,0],[-3,-1],[-3,-1],[-3,-1],[-3,0]],intervals:[["6","1"],["3","5"],["1","2"],["5","6"],["2","3"],["4","1"]]},THIRD_MINOR_PENTA:{rootStringNumber:5,positionName:"3rd",name:"3rd - Pentatonic (Minor)",abr:"-",fretOffsets:[[-2,0],[-2,0],[-3,0],[-3,0],[-2,0],[-2,0]],intervals:[["b7","1"],["4","5"],["1","3"],["5","b7"],["b3","4"],["b7","1"]]},FORTH:{rootStringNumber:5,positionName:"4th",name:"4th - Scale",abr:"",fretOffsets:[[-1,0,2],[0,2],[-1,1,2],[-1,1,2],[-1,0,2],[-1,0,2]],intervals:[["7","1","2"],["5","6"],["2","3","4"],["6","7","1"],["3","4","5"],["7","1","2"]]},FORTH_MAJOR_7_ARPEGGIO:{default:!0,rootStringNumber:5,positionName:"4th",name:"4th - Major 7 Arpeggio",abr:"m7",fretOffsets:[[-1,0],[0],[1],[1,2],[-1,2],[-1,0]],intervals:[["7","1"],["5"],["3"],["7","1"],["3","5"],["7","1"]]},FORTH_DOM_7_ARPEGGIO:{rootStringNumber:5,positionName:"4th",name:"4th - Dom 7 Arpeggio",abr:"7",fretOffsets:[[0],[0,3],[1],[0,2],[-1,2],[0]],intervals:[["1"],["5","b7"],["3"],["b7","1"],["3","5"],["1"]]},FORTH_MINOR_7_ARPEGGIO:{rootStringNumber:5,positionName:"4th",name:"4th - Minor 7 Arpeggio",abr:"-7",fretOffsets:[[0,3],[0,3],[0],[0,2],[2],[0,3]],intervals:[["1","b3"],["5","b7"],["b3"],["b7","1"],["5"],["1","b3"]]},FORTH_MINOR_PENTA:{rootStringNumber:5,positionName:"4th",name:"4th - Pentatonic (Minor)",abr:"-",fretOffsets:[[0,3],[0,3],[0,2],[0,2],[0,2],[0,3]],intervals:[["1","b3"],["5","b7"],["b3","4"],["b7","1"],["4","5"],["1","b3"]]},FIFTH_MAJOR_7_SCALE:{rootStringNumber:3,positionName:"5th",name:"5th - Major 7 Scale",abr:"m7",fretOffsets:[[0,2,3],[0,2,3],[-1,0,2],[-1,0,2],[0,2],[0,2,3]],intervals:[["2","3","4"],["6","7","1"],["3","4","5"],["7","1","2"],["5","6"],["2","3","4"]]},FIFTH_MAJOR_7_ARPEGGIO:{default:!0,rootStringNumber:3,positionName:"5th",name:"5th - Major 7 Arpeggio",abr:"m7",fretOffsets:[[2],[2,3],[-1,2],[-1,0],[0],[2]],intervals:[["3"],["7","1"],["3","5"],["7","1"],["5"],["3"]]},FIFTH_DOM_7_ARPEGGIO:{rootStringNumber:3,positionName:"5th",name:"5th - Dom 7 Arpeggio",abr:"7",fretOffsets:[[2],[1,3],[-1,2],[0],[0,3],[2]],intervals:[["3"],["b7","1"],["3","5"],["1"],["5","b7"],["3"]]},FIFTH_MINOR_7_ARPEGGIO:{rootStringNumber:3,positionName:"5th",name:"5th - Minor 7 Arpeggio",abr:"-7",fretOffsets:[[1],[1,3],[2],[0,3],[0,3],[2]],intervals:[["b3"],["b7","1"],["5"],["1","b3"],["5","b7"],["b3"]]},FIFTH_MAJOR_PENTA:{rootStringNumber:3,positionName:"5th",name:"5th - Pentatonic (Major)",abr:"m",fretOffsets:[[0,2],[0,3],[-1,2],[0,2],[0,2],[0,2]],intervals:[["2","3"],["6","1"],["3","5"],["1","2"],["5","6"],["2","3"]]},FIFTH_MINOR_PENTA:{rootStringNumber:3,positionName:"5th",name:"5th - Pentatonic (Minor)",abr:"-",fretOffsets:[[1,3],[1,3],[0,2],[0,3],[0,3],[1,3]],intervals:[["b3","4"],["b7","1"],["4","5"],["1","b3"],["5","b7"],["b3","4"]]}},resolveNotesForScale:function(t,e,n){for(var r=new Map,s=n.fretOffsets,i=n.intervals,a=0;a<s.length;a+=1)for(var o=s[a],c=0;c<o.length;c+=1){var l=t.getNoteAt(a,e+o[c]);l&&r.set(l,i?i[a][c]:"?")}return r},getPositionsForString:function(t){return Object.values(this.POSITIONS).filter((function(e){return e.rootStringNumber===t}))},getDefaultPositionForString:function(t){var e=this.getPositionsForString(t);return void 0===e||e.length<1?[]:e.find((function(t){return!0===t.default}))}},A=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"delete",value:function(){this.props.onDelete&&this.props.onDelete(this.props.value)}},{key:"select",value:function(t){this.props.onChange&&this.props.onChange(this.props.value,t)}},{key:"onCheck",value:function(t){this.props.onCheck&&this.props.onCheck(this.props.value)}},{key:"addToProgression",value:function(){this.props.addToProgression&&this.props.addToProgression(this.props.value)}},{key:"render",value:function(){var t=this,e="https://onlineguitarbooks.com/"+this.props.value.name+"-chord/",n={backgroundColor:this.props.value.color},r=N.getPositionsForString(this.props.value.toneState.stringNumber);return Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{style:n}),Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{type:"checkbox",checked:this.props.value.enabled,onChange:function(e){return t.onCheck(e)}}),Object(b.jsxs)("a",{href:e,target:"_blank",rel:"noreferrer",children:[this.props.value.name," (",this.props.value.toneState.stringNumber+1,", ",this.props.value.toneState.fret,")"]})]}),Object(b.jsx)("div",{children:Object(b.jsx)(v,{value:this.props.value.position,options:r,onChange:function(e){return t.select(e)}})}),Object(b.jsxs)("div",{children:[Object(b.jsx)("button",{onClick:function(e){return t.delete()},children:"delete"}),Object(b.jsx)("button",{onClick:function(e){return t.addToProgression()},children:"add to chord progression"})]})]})}}]),n}(s.a.Component),M=A,_=["#4E79A5","#F18F3B","#E0585B","#77B7B2","#5AA155","#EDC958","#AF7AA0","#FE9EA8","#9C7561","#BAB0AC"],k=function(){function t(e,n,r,s){Object(o.a)(this,t),this.uid=e,this.name=n,this.stringNumber=r,this.fret=s,this.usedIn=new Map,this.position=0===s?"Open "+n:n+" "+(r+1)+" @ "+s}return Object(c.a)(t,[{key:"add",value:function(t,e){this.usedIn.set(t.uid,e)}},{key:"remove",value:function(t){this.usedIn.delete(t.uid)}},{key:"isUsedInScale",value:function(t){return this.usedIn.has(t.uid)}},{key:"getIntervalLabel",value:function(t){return this.usedIn.get(t.uid)}}]),t}(),I=function(){function t(e,n){Object(o.a)(this,t),this.name=N.TONES[e],this.uid="string-"+this.name+"-"+n,this.intervalOffset=e,this.tones=[];for(var r=0;r<17;r++){var s=e+r,i=N.TONES[s%N.TONES.length];this.tones.push(new k(this.uid+"."+r,i,n,r))}}return Object(c.a)(t,[{key:"getNoteAt",value:function(t){return t>=0&&t<this.tones.length?this.tones[t]:void 0}}]),t}(),P=function(){function t(e,n,r,s,i,a){Object(o.a)(this,t),this.guitarState=e,this.uid="scale."+r+"."+s+"."+i,this.name=n.name,this.fret=n.fret,this.fretNum=s,this.toneState=n,this.scale=N.KEYS.C_MAJOR,this.color=a,this.enabled=!0,this.setPosition(N.getDefaultPositionForString(r))}return Object(c.a)(t,[{key:"setPosition",value:function(t){var e=this;if(this.toneStates&&this.toneStates.length>0)for(var n=0;n<this.toneStates.length;n+=1){this.toneStates[n].remove(this)}if(this.position=t,t){var r=N.resolveNotesForScale(this.guitarState,this.fretNum,this.position);this.toneStates=[],r.forEach((function(t,n){n.add(e,t),e.toneStates.push(n)}))}}}]),t}(),R=function(){function t(){Object(o.a)(this,t),this.strings=[],this.strings.push(new I(4,0)),this.strings.push(new I(11,1)),this.strings.push(new I(7,2)),this.strings.push(new I(2,3)),this.strings.push(new I(9,4)),this.strings.push(new I(4,5)),this.scalePatterns=[]}return Object(c.a)(t,[{key:"setActiveScale",value:function(t){for(var e=0;e<this.scalePatterns.length;e+=1){var n=this.scalePatterns[e];n.enabled=!t||n===t}}},{key:"deleteScalePattern",value:function(t){t.setPosition(void 0),this.scalePatterns=this.scalePatterns.filter((function(e){return e!==t}))}},{key:"createScalePatternAt",value:function(t,e){var n=this.getNoteAt(t,e);if(n){var r=this.scalePatterns.length,s=new P(this,n,t,e,r,_[r%_.length]);return this.scalePatterns.push(s),s}}},{key:"getNoteAt",value:function(t,e){var n=this.strings[t];return n?n.getNoteAt(e):void 0}},{key:"getRowNumberForScale",value:function(t){return this.scalePatterns.indexOf(t)}}]),t}(),y=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(){return Object(o.a)(this,n),e.apply(this,arguments)}return Object(c.a)(n,[{key:"renderProgression",value:function(){for(var t=this,e=[],n=this.props.scales,r=this.props.progression,s=Math.floor(this.props.count/this.props.bpb)%n.length,i=0;i<r.length;i+=1){var a=n[r[i]];e[e.length]=a}return e.map((function(e,n){var r=n===s,i={backgroundColor:e.color,opacity:r?1:.25},a="";if(r)for(var o=t.props.count%t.props.bpb+1,c=0;c<o;c+=1)a+=".";return Object(b.jsxs)("div",{className:"pill",style:i,children:[e.name+e.position.abr," ",a]},"c"+n)}))}},{key:"render",value:function(){return Object(b.jsx)("div",{className:"progressions",children:this.renderProgression()},"progression")}}]),n}(s.a.Component),x=y,C=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var r;return Object(o.a)(this,n),(r=e.call(this,t)).state={bpm:r.props.bpm,bpb:r.props.bpb,playing:!1,interval:null,count:0,mediaLoading:!1,clickFx:void 0,audioCtx:void 0},r}return Object(c.a)(n,[{key:"beep",value:function(){try{var t=this.state.audioCtx,e=this.state.clickFx,n=this.state.mediaLoading;if(void 0===t&&(t=new(window.AudioContext||window.webkitAudioContext)),e){var r=t.createBufferSource();r.buffer=e,r.connect(t.destination),r.start();var s=this.state.count+1;if(this.props.onBeatChange){var i=Math.floor(s%this.state.bpb)+1,a=Math.floor(s/this.props.bpb)%this.props.scales.length+1;this.props.onBeatChange(i,a)}this.setState({count:s})}else{if(n)return void console.log("media loading");n=!0,console.log("Loading Audio Files");var o=this,c=new XMLHttpRequest;c.open("GET","/fretcharts/mp3/snare.mp3",!0),c.responseType="arraybuffer",c.onload=function(){try{if(200===c.status){var e=c.response;console.log("Media Loaded: ",c),t.decodeAudioData(e,(function(t){console.log("Buffer Loaded",t,o),o.setState({clickFx:t})}),(function(t){console.log("Error",t)}))}else console.log("Media Load Failed "+this.response.status)}catch(n){console.log("Error",n)}},c.send()}this.setState({mediaLoading:n,audioCtx:t})}catch(l){console.log("Error",l)}}},{key:"doneLoading",value:function(){console.log("Done Loading")}},{key:"updateInterval",value:function(t){var e=this,n=this.state.interval;if(n&&(clearInterval(n),n=null),t){var r=6e4/this.state.bpm;console.log("Running at "+r),n=setInterval((function(){return e.beep()}),r)}return n}},{key:"startStop",value:function(){var t=!this.state.playing;!t&&this.props.onStop&&this.props.onStop();var e=this.updateInterval(t);this.setState({count:0,playing:t,interval:e})}},{key:"setBpm",value:function(t){var e=t.target.value;this.setState({bpm:e}),console.log("BPM = "+e)}},{key:"setBpb",value:function(t){this.setState({bpb:t.target.value})}},{key:"render",value:function(){var t=this;return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"metronome",children:[Object(b.jsx)("input",{type:"number",min:2,max:8,size:6,maxLength:6,defaultValue:this.state.bpb,onChange:function(e){return t.setBpb(e)}}),Object(b.jsx)("div",{className:"label",children:"Beats per bar"}),Object(b.jsx)("input",{type:"number",min:1,max:200,size:6,maxLength:6,defaultValue:this.state.bpm,onChange:function(e){return t.setBpm(e)}}),Object(b.jsx)("div",{className:"label",children:"Beats per minute"}),Object(b.jsx)("button",{onClick:function(e){return t.startStop()},children:this.state.playing?"Stop":"Play"})]}),Object(b.jsx)(x,{scales:this.props.scales,progression:this.props.progression,count:this.state.count,bpb:this.state.bpb,bpm:this.state.bpm})]})}}]),n}(s.a.Component),E=function(){function t(){Object(o.a)(this,t);var e={},n=document.location.search;if(n&&n.length>1){"?"===n.charAt(0)&&(n=n.substring(1));for(var r=n.split("&"),s=0;s<r.length;s++){var i=r[s].split("=");if(i&&2===i.length){var a=i[0],c=i[1],l=e[a];void 0===l?e[a]=[c]:l[l.length]=c}}}this.values=e}return Object(c.a)(t,[{key:"getValues",value:function(t,e){return this.values[t]?this.values[t]:e}},{key:"getValue",value:function(t,e){var n=this.getValues(t);return n&&n.length>0?n[0]:e}},{key:"getValueAsInt",value:function(t){var e=this.getValue(t);return e?Number.parseInt(e):void 0}},{key:"getValuesAsInts",value:function(t,e){var n=this.getValues(t);return n?n.map((function(t){return Number.parseInt(t)})):e}}]),t}(),T=function(t){Object(l.a)(n,t);var e=Object(u.a)(n);function n(t){var r;Object(o.a)(this,n),r=e.call(this,t);var s=new R,i=new E,a=i.getValue("key"),c=a&&N.KEYS[a]?N.KEYS[a]:N.KEYS.C_MAJOR,l=i.getValues("s");if(l&&l.length>0)for(var u=0;u<l.length;u+=1)if(l[u]){var h=l[u].split(".");if(3===h.length){var b=Number.parseInt(h[0]),p=Number.parseInt(h[1]),f=Number.parseInt(h[2]),d=s.createScalePatternAt(b,p),g=N.getPositionsForString(b);f<g.length&&d.setPosition(g[f]),console.log("Loading Scale ",d)}}var v=i.getValuesAsInts("p",[]);return r.state={key:c,scales:s.scales,guitarState:s,progression:v,bpm:i.getValue("bpm",60),bpb:i.getValue("bpb",4)},r}return Object(c.a)(n,[{key:"onBeatStop",value:function(){this.state.guitarState.setActiveScale(void 0),this.reloadGuitarState()}},{key:"onBeatChange",value:function(t,e){var n=this.state.guitarState.scalePatterns,r=e-1;r<n.length&&(this.state.guitarState.setActiveScale(n[r]),this.reloadGuitarState())}},{key:"reloadGuitarState",value:function(){this.setState({guitarState:this.state.guitarState})}},{key:"updateKey",value:function(t){this.setState({key:t})}},{key:"deleteScale",value:function(t){this.state.guitarState.deleteScalePattern(t),this.reloadGuitarState()}},{key:"updatePosition",value:function(t,e){console.log("Swap Position",e,t),t.setPosition(e),this.reloadGuitarState()}},{key:"addToProgression",value:function(t){var e=this.state.guitarState.getRowNumberForScale(t);if(e>=0){var n=this.state.progression;n[n.length]=e,this.setState({progression:n})}}},{key:"onNoteClick",value:function(t){var e=this.state.guitarState.createScalePatternAt(t.stringNumber,t.fret);console.log("Scale Added",e),this.reloadGuitarState()}},{key:"onCheck",value:function(t){t.enabled=!t.enabled,this.setState({scales:this.state.scales})}},{key:"render",value:function(){for(var t=this,e=this.state.guitarState.strings[0].tones.length,n=Object.values(N.KEYS),r=[],s=0;s<e;s++){var i="";3===s||5===s||7===s||9===s||15===s||17===s||19===s||21===s?i+="\u25cf":12===s&&(i+="\u25cf\u25cf"),r.push(Object(b.jsx)("div",{className:"fret-marker",children:i},"fretMarker"+s))}var a=this.state.guitarState.scalePatterns;return Object(b.jsxs)("div",{children:[Object(b.jsxs)("div",{className:"keySelector",children:[Object(b.jsx)(v,{label:"Key",onChange:function(e){return t.updateKey(e)},options:n,value:this.state.key},"keySelector"),Object(b.jsx)(C,{scales:a,bpb:this.state.bpb,bpm:this.state.bpm,progression:this.state.progression,onBeatChange:function(e,n){return t.onBeatChange(e,n)},onStop:function(){return t.onBeatStop()}})]}),Object(b.jsxs)("div",{className:"fret-board",children:[this.state.guitarState.strings.map((function(e){return Object(b.jsx)(g,{musicKey:t.state.key,value:e,onClick:function(e,n,r){return t.onNoteClick(e,n,r)},scales:a},e.uid)})),Object(b.jsx)("div",{className:"fret-markers",children:r})]}),Object(b.jsxs)("div",{className:"scaleTable",children:[Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{children:"Color"}),Object(b.jsx)("div",{children:"Root"}),Object(b.jsx)("div",{children:"Position"}),Object(b.jsx)("div",{children:"..."})]}),a.map((function(e){return Object(b.jsx)(M,{onDelete:function(e){return t.deleteScale(e)},onChange:function(e,n){return t.updatePosition(e,n)},onCheck:function(e){return t.onCheck(e)},addToProgression:function(e){return t.addToProgression(e)},value:e},e.uid)}))]})]})}}]),n}(s.a.Component);var F=function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)(T,{},"fretboard")})};a.a.render(Object(b.jsx)(s.a.StrictMode,{children:Object(b.jsx)(F,{})}),document.getElementById("root"))}},[[18,1,2]]]);
//# sourceMappingURL=main.5c2e7dfe.chunk.js.map