require('../src/studio-expr.js');require('../src/consts.js');
let p=0,f=0;const t=(n,c)=>{if(c)p++;else{f++;console.log('FAIL',n)}};
const C=globalThis.CONSTS,MX=globalThis.MX;
t('27 constants',C.LIST.length===27);
t('golden ratio exact',Math.abs(C.PHI*C.PHI-C.PHI-1)<1e-15);
t('golden angle 137.5077640500',Math.abs(C.goldenAngle()*180/Math.PI-137.50776405)<1e-8);
t('1/alpha',Math.abs(1/C.BY.alpha.v-137.035999177)<1e-6);
C.checks().forEach((k)=>t('check '+k.name,k.ok));
t('Bohr n=2 radius 4a0',Math.abs(C.bohr(2).r/C.BY.bohrR.v-4)<1e-12);
t('ground speed = alpha c',Math.abs(C.bohr(1).v-C.BY.alpha.v*C.BY.cLight.v)<1e-6);
const ev=(s)=>MX.compile(s,['u']).fn([0]);
t('equations see constants',Math.abs(ev('phi')-C.PHI)<1e-15&&Math.abs(ev('alpha*cLight')-C.BY.alpha.v*299792458)<1e-6);
t('single-letter variables still variables',MX.compile('u+1',['u']).fn([2])===3);
t('unknown name still rejected',(()=>{try{MX.compile('zzz',['u']);return false}catch(e){return true}})());
console.log(p+' passed, '+f+' failed');process.exit(f?1:0)
