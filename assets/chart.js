(function(root){'use strict';
function chartSVG(data,result,zoom,width=760,height=370,physical=null){
 const C=root.SolarCore,{lo,hi,col,kind}=result;
 const pad=Math.max((hi-lo)*.15,2),a=zoom?Math.max(280,lo-pad):280,b=zoom?Math.min(4000,hi+pad):4000;
 const visible=C.interval(data,a,b,col),band=C.interval(data,lo,hi,col);
 const dark=!physical&&root.matchMedia&&root.matchMedia('(prefers-color-scheme: dark)').matches;
 const color=dark?{text:'#c1c1ca',axis:'#777780',line:'#a0a6b0',fill:'#252930',band:'#224766',accent:'#70b7ed',bg:'#1c1c20'}:{text:'#333333',axis:'#626975',line:'#7d8694',fill:'#f3f5f8',band:'#b8d8f2',accent:'#0072b2',bg:'#ffffff'};
 const font=physical?7*96/72:12;
 const m={l:physical?53:59,r:physical?14:15,t:physical?57:20,b:physical?43:49};
 const pw=width-m.l-m.r,ph=height-m.t-m.b;
 const peak=Math.max(...visible.map(p=>p[1]));
 function niceStep(span,n){const raw=span/n,base=10**Math.floor(Math.log10(raw));const q=raw/base;return (q<=1?1:q<=2?2:q<=2.5?2.5:q<=5?5:10)*base;}
 const ystep=niceStep((peak||1)*1.08,4),ymax=Math.ceil((peak||1)*1.08/ystep)*ystep;
 const x=v=>m.l+(v-a)/(b-a)*pw,y=v=>m.t+(1-v/ymax)*ph;
 const f=v=>Number(v.toFixed(3));
 const label=(v,step)=>v===0?'0':Math.abs(v)<.001||Math.abs(v)>=1e5?v.toExponential(1):String(Number(v.toFixed(Math.max(0,Math.min(8,2-Math.floor(Math.log10(step)))))));
 const path=p=>p.map((q,i)=>(i?'L':'M')+f(x(q[0]))+','+f(y(q[1]))).join(' ');
 const text=(px,py,t,anchor='middle',extra='')=>'<text x="'+f(px)+'" y="'+f(py)+'" text-anchor="'+anchor+'" '+extra+'>'+t+'</text>';
 let s='<svg xmlns="http://www.w3.org/2000/svg" width="'+(physical?physical.wi+'in':width)+'" height="'+(physical?physical.hi+'in':height)+'" viewBox="0 0 '+width+' '+height+'" role="img" aria-label="'+kind+' spectrum, selected '+lo+' to '+hi+' nanometers"><title>'+kind+' spectral irradiance</title><desc>ASTM G173-03. Selected band '+lo+'–'+hi+' nm. Band irradiance '+result.band+' W m⁻²; energy fraction '+result.percent+'%. Original samples and linearly interpolated band edges.</desc><rect width="'+width+'" height="'+height+'" fill="'+color.bg+'"/><g font-family="Arial, Helvetica, sans-serif" font-size="'+font+'" fill="'+color.text+'">';
 if(physical){
 s+=text(m.l,13,kind+' · '+Number(lo.toPrecision(9))+'–'+Number(hi.toPrecision(9))+' nm','start');
 const ly=28,lx=m.l,second=width<300?m.l:m.l+112,sy=width<300?41:28;
 s+='<path d="M'+lx+','+(ly-3)+'h14" stroke="'+color.line+'" stroke-width="1"/>'+text(lx+19,ly,'Reference spectrum','start');
 s+='<rect x="'+second+'" y="'+(sy-8)+'" width="13" height="8" fill="'+color.band+'"/><path d="M'+second+','+(sy-8)+'h13" stroke="'+color.accent+'"/>'+text(second+19,sy,'Selected band','start');
 }
 if(!physical)s+='<path d="'+path(visible)+'L'+f(x(b))+','+(height-m.b)+'L'+m.l+','+(height-m.b)+'Z" fill="'+color.fill+'"/>';
 s+='<path d="'+path(band)+'L'+f(x(hi))+','+(height-m.b)+'L'+f(x(lo))+','+(height-m.b)+'Z" fill="'+color.band+'"/>';
 s+='<path d="'+path(visible)+'" fill="none" stroke="'+color.line+'" stroke-width="'+(physical?.8:1.1)+'" stroke-linejoin="round"/>';
 s+='<path d="'+path(band)+'" fill="none" stroke="'+color.accent+'" stroke-width="'+(physical?1:1.5)+'" stroke-linejoin="round"/>';
 for(const v of [lo,hi])s+='<path d="M'+f(x(v))+','+m.t+'V'+(height-m.b)+'" stroke="'+color.accent+'" stroke-width=".7" stroke-dasharray="3 3"/>';
 for(let v=0;v<=ymax+ystep*.01;v+=ystep)s+='<path d="M'+m.l+','+f(y(v))+'h-4" stroke="'+color.axis+'" stroke-width=".8"/>'+text(m.l-8,y(v)+font*.34,label(v,ystep),'end');
 const step=niceStep(b-a,Math.max(2,Math.floor(pw/(physical?65:75))));
 for(let i=Math.ceil(a/step);i*step<=b+step*1e-8;i++){let v=i*step;s+=text(x(v),height-m.b+font+9,label(v,step))+'<path d="M'+f(x(v))+','+(height-m.b)+'v4" stroke="'+color.axis+'" stroke-width=".8"/>';}
 s+='<path d="M'+m.l+','+m.t+'V'+(height-m.b)+'H'+(width-m.r)+'" fill="none" stroke="'+color.axis+'" stroke-width=".8"/>';
 s+=text(m.l+pw/2,height-5,'Wavelength (nm)')+'<text transform="translate('+(physical?12:14)+' '+(m.t+ph/2)+') rotate(-90)" text-anchor="middle">Spectral irradiance (W m⁻² nm⁻¹)</text></g></svg>';
 return s;
}
root.SolarChart={chartSVG};
})(window);
