var mb=Object.defineProperty,hb=Object.defineProperties;var gb=Object.getOwnPropertyDescriptors;var af=Object.getOwnPropertySymbols;var vb=Object.prototype.hasOwnProperty,bb=Object.prototype.propertyIsEnumerable;var sf=(e,n,t)=>n in e?mb(e,n,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[n]=t,F=(e,n)=>{for(var t in n||={})vb.call(n,t)&&sf(e,t,n[t]);if(af)for(var t of af(n))bb.call(n,t)&&sf(e,t,n[t]);return e},we=(e,n)=>hb(e,gb(n));var Ae=null,To=!1,sc=1,yb=null,Te=Symbol("SIGNAL");function M(e){let n=Ae;return Ae=e,n}function Ao(){return Ae}var _i={version:0,lastCleanEpoch:0,dirty:!1,producers:void 0,producersTail:void 0,consumers:void 0,consumersTail:void 0,recomputing:!1,consumerAllowSignalWrites:!1,consumerIsAlwaysLive:!1,kind:"unknown",producerMustRecompute:()=>!1,producerRecomputeValue:()=>{},consumerMarkedDirty:()=>{},consumerOnSignalRead:()=>{}};function br(e){if(To)throw new Error("");if(Ae===null)return;Ae.consumerOnSignalRead(e);let n=Ae.producersTail;if(n!==void 0&&n.producer===e)return;let t,i=Ae.recomputing;if(i&&(t=n!==void 0?n.nextProducer:Ae.producers,t!==void 0&&t.producer===e)){Ae.producersTail=t,t.lastReadVersion=e.version;return}let r=e.consumersTail;if(r!==void 0&&r.consumer===Ae&&(!i||Db(r,Ae)))return;let o=wi(Ae),a={producer:e,consumer:Ae,nextProducer:t,prevConsumer:r,lastReadVersion:e.version,nextConsumer:void 0};Ae.producersTail=a,n!==void 0?n.nextProducer=a:Ae.producers=a,o&&uf(e,a)}function cf(){sc++}function cc(e){if(!(wi(e)&&!e.dirty)&&!(!e.dirty&&e.lastCleanEpoch===sc)){if(!e.producerMustRecompute(e)&&!_r(e)){ac(e);return}e.producerRecomputeValue(e),ac(e)}}function lc(e){if(e.consumers===void 0)return;let n=To;To=!0;try{for(let t=e.consumers;t!==void 0;t=t.nextConsumer){let i=t.consumer;i.dirty||_b(i)}}finally{To=n}}function dc(){return Ae?.consumerAllowSignalWrites!==!1}function _b(e){e.dirty=!0,lc(e),e.consumerMarkedDirty?.(e)}function ac(e){e.dirty=!1,e.lastCleanEpoch=sc}function Di(e){return e&&lf(e),M(e)}function lf(e){e.producersTail=void 0,e.recomputing=!0}function yr(e,n){M(n),e&&df(e)}function df(e){e.recomputing=!1;let n=e.producersTail,t=n!==void 0?n.nextProducer:e.producers;if(t!==void 0){if(wi(e))do t=uc(t);while(t!==void 0);n!==void 0?n.nextProducer=void 0:e.producers=void 0}}function _r(e){for(let n=e.producers;n!==void 0;n=n.nextProducer){let t=n.producer,i=n.lastReadVersion;if(i!==t.version||(cc(t),i!==t.version))return!0}return!1}function Fn(e){if(wi(e)){let n=e.producers;for(;n!==void 0;)n=uc(n)}e.producers=void 0,e.producersTail=void 0,e.consumers=void 0,e.consumersTail=void 0}function uf(e,n){let t=e.consumersTail,i=wi(e);if(t!==void 0?(n.nextConsumer=t.nextConsumer,t.nextConsumer=n):(n.nextConsumer=void 0,e.consumers=n),n.prevConsumer=t,e.consumersTail=n,!i)for(let r=e.producers;r!==void 0;r=r.nextProducer)uf(r.producer,r)}function uc(e){let n=e.producer,t=e.nextProducer,i=e.nextConsumer,r=e.prevConsumer;if(e.nextConsumer=void 0,e.prevConsumer=void 0,i!==void 0?i.prevConsumer=r:n.consumersTail=r,r!==void 0)r.nextConsumer=i;else if(n.consumers=i,!wi(n)){let o=n.producers;for(;o!==void 0;)o=uc(o)}return t}function wi(e){return e.consumerIsAlwaysLive||e.consumers!==void 0}function fc(e){yb?.(e)}function Db(e,n){let t=n.producersTail;if(t!==void 0){let i=n.producers;do{if(i===e)return!0;if(i===t)break;i=i.nextProducer}while(i!==void 0)}return!1}function pc(e,n){return Object.is(e,n)}function Dr(e,n){let t=Object.create(wb);t.computation=e,n!==void 0&&(t.equal=n);let i=()=>{if(cc(t),br(t),t.value===So)throw t.error;return t.value};return i[Te]=t,fc(t),i}var rc=Symbol("UNSET"),oc=Symbol("COMPUTING"),So=Symbol("ERRORED"),wb=we(F({},_i),{value:rc,dirty:!0,error:null,equal:pc,kind:"computed",producerMustRecompute(e){return e.value===rc||e.value===oc},producerRecomputeValue(e){if(e.value===oc)throw new Error("");let n=e.value;e.value=oc;let t=Di(e),i,r=!1;try{i=e.computation(),M(null),r=n!==rc&&n!==So&&i!==So&&e.equal(n,i)}catch(o){i=So,e.error=o}finally{yr(e,t)}if(r){e.value=n;return}e.value=i,e.version++}});function Cb(){throw new Error}var ff=Cb;function pf(e){ff(e)}function mc(e){ff=e}var Eb=null;function hc(e,n){let t=Object.create(ko);t.value=e,n!==void 0&&(t.equal=n);let i=()=>mf(t);return i[Te]=t,fc(t),[i,a=>wr(t,a),a=>hf(t,a)]}function mf(e){return br(e),e.value}function wr(e,n){dc()||pf(e),e.equal(e.value,n)||(e.value=n,Ib(e))}function hf(e,n){dc()||pf(e),wr(e,n(e.value))}var ko=we(F({},_i),{equal:pc,value:void 0,kind:"signal"});function Ib(e){e.version++,cf(),lc(e),Eb?.(e)}var gc=we(F({},_i),{consumerIsAlwaysLive:!0,consumerAllowSignalWrites:!0,dirty:!0,kind:"effect"});function vc(e){if(e.dirty=!1,e.version>0&&!_r(e))return;e.version++;let n=Di(e);try{e.cleanup(),e.fn()}finally{yr(e,n)}}function L(e){return typeof e=="function"}function Ci(e){let t=e(i=>{Error.call(i),i.stack=new Error().stack});return t.prototype=Object.create(Error.prototype),t.prototype.constructor=t,t}var No=Ci(e=>function(t){e(this),this.message=t?`${t.length} errors occurred during unsubscription:
${t.map((i,r)=>`${r+1}) ${i.toString()}`).join(`
  `)}`:"",this.name="UnsubscriptionError",this.errors=t});function Pn(e,n){if(e){let t=e.indexOf(n);0<=t&&e.splice(t,1)}}var te=class e{constructor(n){this.initialTeardown=n,this.closed=!1,this._parentage=null,this._finalizers=null}unsubscribe(){let n;if(!this.closed){this.closed=!0;let{_parentage:t}=this;if(t)if(this._parentage=null,Array.isArray(t))for(let o of t)o.remove(this);else t.remove(this);let{initialTeardown:i}=this;if(L(i))try{i()}catch(o){n=o instanceof No?o.errors:[o]}let{_finalizers:r}=this;if(r){this._finalizers=null;for(let o of r)try{gf(o)}catch(a){n=n??[],a instanceof No?n=[...n,...a.errors]:n.push(a)}}if(n)throw new No(n)}}add(n){var t;if(n&&n!==this)if(this.closed)gf(n);else{if(n instanceof e){if(n.closed||n._hasParent(this))return;n._addParent(this)}(this._finalizers=(t=this._finalizers)!==null&&t!==void 0?t:[]).push(n)}}_hasParent(n){let{_parentage:t}=this;return t===n||Array.isArray(t)&&t.includes(n)}_addParent(n){let{_parentage:t}=this;this._parentage=Array.isArray(t)?(t.push(n),t):t?[t,n]:n}_removeParent(n){let{_parentage:t}=this;t===n?this._parentage=null:Array.isArray(t)&&Pn(t,n)}remove(n){let{_finalizers:t}=this;t&&Pn(t,n),n instanceof e&&n._removeParent(this)}};te.EMPTY=(()=>{let e=new te;return e.closed=!0,e})();var bc=te.EMPTY;function Ro(e){return e instanceof te||e&&"closed"in e&&L(e.remove)&&L(e.add)&&L(e.unsubscribe)}function gf(e){L(e)?e():e.unsubscribe()}var pt={onUnhandledError:null,onStoppedNotification:null,Promise:void 0,useDeprecatedSynchronousErrorHandling:!1,useDeprecatedNextContext:!1};var Ei={setTimeout(e,n,...t){let{delegate:i}=Ei;return i?.setTimeout?i.setTimeout(e,n,...t):setTimeout(e,n,...t)},clearTimeout(e){let{delegate:n}=Ei;return(n?.clearTimeout||clearTimeout)(e)},delegate:void 0};function Oo(e){Ei.setTimeout(()=>{let{onUnhandledError:n}=pt;if(n)n(e);else throw e})}function Ln(){}var vf=yc("C",void 0,void 0);function bf(e){return yc("E",void 0,e)}function yf(e){return yc("N",e,void 0)}function yc(e,n,t){return{kind:e,value:n,error:t}}var Vn=null;function Ii(e){if(pt.useDeprecatedSynchronousErrorHandling){let n=!Vn;if(n&&(Vn={errorThrown:!1,error:null}),e(),n){let{errorThrown:t,error:i}=Vn;if(Vn=null,t)throw i}}else e()}function _f(e){pt.useDeprecatedSynchronousErrorHandling&&Vn&&(Vn.errorThrown=!0,Vn.error=e)}var jn=class extends te{constructor(n){super(),this.isStopped=!1,n?(this.destination=n,Ro(n)&&n.add(this)):this.destination=Tb}static create(n,t,i){return new mt(n,t,i)}next(n){this.isStopped?Dc(yf(n),this):this._next(n)}error(n){this.isStopped?Dc(bf(n),this):(this.isStopped=!0,this._error(n))}complete(){this.isStopped?Dc(vf,this):(this.isStopped=!0,this._complete())}unsubscribe(){this.closed||(this.isStopped=!0,super.unsubscribe(),this.destination=null)}_next(n){this.destination.next(n)}_error(n){try{this.destination.error(n)}finally{this.unsubscribe()}}_complete(){try{this.destination.complete()}finally{this.unsubscribe()}}},Mb=Function.prototype.bind;function _c(e,n){return Mb.call(e,n)}var wc=class{constructor(n){this.partialObserver=n}next(n){let{partialObserver:t}=this;if(t.next)try{t.next(n)}catch(i){Fo(i)}}error(n){let{partialObserver:t}=this;if(t.error)try{t.error(n)}catch(i){Fo(i)}else Fo(n)}complete(){let{partialObserver:n}=this;if(n.complete)try{n.complete()}catch(t){Fo(t)}}},mt=class extends jn{constructor(n,t,i){super();let r;if(L(n)||!n)r={next:n??void 0,error:t??void 0,complete:i??void 0};else{let o;this&&pt.useDeprecatedNextContext?(o=Object.create(n),o.unsubscribe=()=>this.unsubscribe(),r={next:n.next&&_c(n.next,o),error:n.error&&_c(n.error,o),complete:n.complete&&_c(n.complete,o)}):r=n}this.destination=new wc(r)}};function Fo(e){pt.useDeprecatedSynchronousErrorHandling?_f(e):Oo(e)}function xb(e){throw e}function Dc(e,n){let{onStoppedNotification:t}=pt;t&&Ei.setTimeout(()=>t(e,n))}var Tb={closed:!0,next:Ln,error:xb,complete:Ln};var Mi=typeof Symbol=="function"&&Symbol.observable||"@@observable";function mn(e){return e}function Df(e){return e.length===0?mn:e.length===1?e[0]:function(t){return e.reduce((i,r)=>r(i),t)}}var A=(()=>{class e{constructor(t){t&&(this._subscribe=t)}lift(t){let i=new e;return i.source=this,i.operator=t,i}subscribe(t,i,r){let o=Ab(t)?t:new mt(t,i,r);return Ii(()=>{let{operator:a,source:s}=this;o.add(a?a.call(o,s):s?this._subscribe(o):this._trySubscribe(o))}),o}_trySubscribe(t){try{return this._subscribe(t)}catch(i){t.error(i)}}forEach(t,i){return i=wf(i),new i((r,o)=>{let a=new mt({next:s=>{try{t(s)}catch(c){o(c),a.unsubscribe()}},error:o,complete:r});this.subscribe(a)})}_subscribe(t){var i;return(i=this.source)===null||i===void 0?void 0:i.subscribe(t)}[Mi](){return this}pipe(...t){return Df(t)(this)}toPromise(t){return t=wf(t),new t((i,r)=>{let o;this.subscribe(a=>o=a,a=>r(a),()=>i(o))})}}return e.create=n=>new e(n),e})();function wf(e){var n;return(n=e??pt.Promise)!==null&&n!==void 0?n:Promise}function Sb(e){return e&&L(e.next)&&L(e.error)&&L(e.complete)}function Ab(e){return e&&e instanceof jn||Sb(e)&&Ro(e)}function kb(e){return L(e?.lift)}function K(e){return n=>{if(kb(n))return n.lift(function(t){try{return e(t,this)}catch(i){this.error(i)}});throw new TypeError("Unable to lift unknown Observable type")}}function ne(e,n,t,i,r){return new Cc(e,n,t,i,r)}var Cc=class extends jn{constructor(n,t,i,r,o,a){super(n),this.onFinalize=o,this.shouldUnsubscribe=a,this._next=t?function(s){try{t(s)}catch(c){n.error(c)}}:super._next,this._error=r?function(s){try{r(s)}catch(c){n.error(c)}finally{this.unsubscribe()}}:super._error,this._complete=i?function(){try{i()}catch(s){n.error(s)}finally{this.unsubscribe()}}:super._complete}unsubscribe(){var n;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){let{closed:t}=this;super.unsubscribe(),!t&&((n=this.onFinalize)===null||n===void 0||n.call(this))}}};var Cf=Ci(e=>function(){e(this),this.name="ObjectUnsubscribedError",this.message="object unsubscribed"});var V=(()=>{class e extends A{constructor(){super(),this.closed=!1,this.currentObservers=null,this.observers=[],this.isStopped=!1,this.hasError=!1,this.thrownError=null}lift(t){let i=new Po(this,this);return i.operator=t,i}_throwIfClosed(){if(this.closed)throw new Cf}next(t){Ii(()=>{if(this._throwIfClosed(),!this.isStopped){this.currentObservers||(this.currentObservers=Array.from(this.observers));for(let i of this.currentObservers)i.next(t)}})}error(t){Ii(()=>{if(this._throwIfClosed(),!this.isStopped){this.hasError=this.isStopped=!0,this.thrownError=t;let{observers:i}=this;for(;i.length;)i.shift().error(t)}})}complete(){Ii(()=>{if(this._throwIfClosed(),!this.isStopped){this.isStopped=!0;let{observers:t}=this;for(;t.length;)t.shift().complete()}})}unsubscribe(){this.isStopped=this.closed=!0,this.observers=this.currentObservers=null}get observed(){var t;return((t=this.observers)===null||t===void 0?void 0:t.length)>0}_trySubscribe(t){return this._throwIfClosed(),super._trySubscribe(t)}_subscribe(t){return this._throwIfClosed(),this._checkFinalizedStatuses(t),this._innerSubscribe(t)}_innerSubscribe(t){let{hasError:i,isStopped:r,observers:o}=this;return i||r?bc:(this.currentObservers=null,o.push(t),new te(()=>{this.currentObservers=null,Pn(o,t)}))}_checkFinalizedStatuses(t){let{hasError:i,thrownError:r,isStopped:o}=this;i?t.error(r):o&&t.complete()}asObservable(){let t=new A;return t.source=this,t}}return e.create=(n,t)=>new Po(n,t),e})(),Po=class extends V{constructor(n,t){super(),this.destination=n,this.source=t}next(n){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.next)===null||i===void 0||i.call(t,n)}error(n){var t,i;(i=(t=this.destination)===null||t===void 0?void 0:t.error)===null||i===void 0||i.call(t,n)}complete(){var n,t;(t=(n=this.destination)===null||n===void 0?void 0:n.complete)===null||t===void 0||t.call(n)}_subscribe(n){var t,i;return(i=(t=this.source)===null||t===void 0?void 0:t.subscribe(n))!==null&&i!==void 0?i:bc}};var hn=class extends V{constructor(n){super(),this._value=n}get value(){return this.getValue()}_subscribe(n){let t=super._subscribe(n);return!t.closed&&n.next(this._value),t}getValue(){let{hasError:n,thrownError:t,_value:i}=this;if(n)throw t;return this._throwIfClosed(),i}next(n){super.next(this._value=n)}};var Cr={now(){return(Cr.delegate||Date).now()},delegate:void 0};var Lo=class extends V{constructor(n=1/0,t=1/0,i=Cr){super(),this._bufferSize=n,this._windowTime=t,this._timestampProvider=i,this._buffer=[],this._infiniteTimeWindow=!0,this._infiniteTimeWindow=t===1/0,this._bufferSize=Math.max(1,n),this._windowTime=Math.max(1,t)}next(n){let{isStopped:t,_buffer:i,_infiniteTimeWindow:r,_timestampProvider:o,_windowTime:a}=this;t||(i.push(n),!r&&i.push(o.now()+a)),this._trimBuffer(),super.next(n)}_subscribe(n){this._throwIfClosed(),this._trimBuffer();let t=this._innerSubscribe(n),{_infiniteTimeWindow:i,_buffer:r}=this,o=r.slice();for(let a=0;a<o.length&&!n.closed;a+=i?1:2)n.next(o[a]);return this._checkFinalizedStatuses(n),t}_trimBuffer(){let{_bufferSize:n,_timestampProvider:t,_buffer:i,_infiniteTimeWindow:r}=this,o=(r?1:2)*n;if(n<1/0&&o<i.length&&i.splice(0,i.length-o),!r){let a=t.now(),s=0;for(let c=1;c<i.length&&i[c]<=a;c+=2)s=c;s&&i.splice(0,s+1)}}};var Vo=class extends te{constructor(n,t){super()}schedule(n,t=0){return this}};var Er={setInterval(e,n,...t){let{delegate:i}=Er;return i?.setInterval?i.setInterval(e,n,...t):setInterval(e,n,...t)},clearInterval(e){let{delegate:n}=Er;return(n?.clearInterval||clearInterval)(e)},delegate:void 0};var jo=class extends Vo{constructor(n,t){super(n,t),this.scheduler=n,this.work=t,this.pending=!1}schedule(n,t=0){var i;if(this.closed)return this;this.state=n;let r=this.id,o=this.scheduler;return r!=null&&(this.id=this.recycleAsyncId(o,r,t)),this.pending=!0,this.delay=t,this.id=(i=this.id)!==null&&i!==void 0?i:this.requestAsyncId(o,this.id,t),this}requestAsyncId(n,t,i=0){return Er.setInterval(n.flush.bind(n,this),i)}recycleAsyncId(n,t,i=0){if(i!=null&&this.delay===i&&this.pending===!1)return t;t!=null&&Er.clearInterval(t)}execute(n,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;let i=this._execute(n,t);if(i)return i;this.pending===!1&&this.id!=null&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(n,t){let i=!1,r;try{this.work(n)}catch(o){i=!0,r=o||new Error("Scheduled action threw falsy error")}if(i)return this.unsubscribe(),r}unsubscribe(){if(!this.closed){let{id:n,scheduler:t}=this,{actions:i}=t;this.work=this.state=this.scheduler=null,this.pending=!1,Pn(i,this),n!=null&&(this.id=this.recycleAsyncId(t,n,null)),this.delay=null,super.unsubscribe()}}};var xi=class e{constructor(n,t=e.now){this.schedulerActionCtor=n,this.now=t}schedule(n,t=0,i){return new this.schedulerActionCtor(this,n).schedule(i,t)}};xi.now=Cr.now;var Bo=class extends xi{constructor(n,t=xi.now){super(n,t),this.actions=[],this._active=!1}flush(n){let{actions:t}=this;if(this._active){t.push(n);return}let i;this._active=!0;do if(i=n.execute(n.state,n.delay))break;while(n=t.shift());if(this._active=!1,i){for(;n=t.shift();)n.unsubscribe();throw i}}};var Ir=new Bo(jo),Ef=Ir;var Bn=new A(e=>e.complete());function Ho(e){return e&&L(e.schedule)}function Ec(e){return e[e.length-1]}function If(e){return L(Ec(e))?e.pop():void 0}function gn(e){return Ho(Ec(e))?e.pop():void 0}function Mf(e,n){return typeof Ec(e)=="number"?e.pop():n}function Tf(e,n,t,i){function r(o){return o instanceof t?o:new t(function(a){a(o)})}return new(t||(t=Promise))(function(o,a){function s(d){try{l(i.next(d))}catch(f){a(f)}}function c(d){try{l(i.throw(d))}catch(f){a(f)}}function l(d){d.done?o(d.value):r(d.value).then(s,c)}l((i=i.apply(e,n||[])).next())})}function xf(e){var n=typeof Symbol=="function"&&Symbol.iterator,t=n&&e[n],i=0;if(t)return t.call(e);if(e&&typeof e.length=="number")return{next:function(){return e&&i>=e.length&&(e=void 0),{value:e&&e[i++],done:!e}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}function Hn(e){return this instanceof Hn?(this.v=e,this):new Hn(e)}function Sf(e,n,t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var i=t.apply(e,n||[]),r,o=[];return r=Object.create((typeof AsyncIterator=="function"?AsyncIterator:Object).prototype),s("next"),s("throw"),s("return",a),r[Symbol.asyncIterator]=function(){return this},r;function a(p){return function(h){return Promise.resolve(h).then(p,f)}}function s(p,h){i[p]&&(r[p]=function(D){return new Promise(function(w,C){o.push([p,D,w,C])>1||c(p,D)})},h&&(r[p]=h(r[p])))}function c(p,h){try{l(i[p](h))}catch(D){m(o[0][3],D)}}function l(p){p.value instanceof Hn?Promise.resolve(p.value.v).then(d,f):m(o[0][2],p)}function d(p){c("next",p)}function f(p){c("throw",p)}function m(p,h){p(h),o.shift(),o.length&&c(o[0][0],o[0][1])}}function Af(e){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var n=e[Symbol.asyncIterator],t;return n?n.call(e):(e=typeof xf=="function"?xf(e):e[Symbol.iterator](),t={},i("next"),i("throw"),i("return"),t[Symbol.asyncIterator]=function(){return this},t);function i(o){t[o]=e[o]&&function(a){return new Promise(function(s,c){a=e[o](a),r(s,c,a.done,a.value)})}}function r(o,a,s,c){Promise.resolve(c).then(function(l){o({value:l,done:s})},a)}}var Uo=e=>e&&typeof e.length=="number"&&typeof e!="function";function $o(e){return L(e?.then)}function zo(e){return L(e[Mi])}function Go(e){return Symbol.asyncIterator&&L(e?.[Symbol.asyncIterator])}function Wo(e){return new TypeError(`You provided ${e!==null&&typeof e=="object"?"an invalid object":`'${e}'`} where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`)}function Nb(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var qo=Nb();function Zo(e){return L(e?.[qo])}function Ko(e){return Sf(this,arguments,function*(){let t=e.getReader();try{for(;;){let{value:i,done:r}=yield Hn(t.read());if(r)return yield Hn(void 0);yield yield Hn(i)}}finally{t.releaseLock()}})}function Qo(e){return L(e?.getReader)}function ce(e){if(e instanceof A)return e;if(e!=null){if(zo(e))return Rb(e);if(Uo(e))return Ob(e);if($o(e))return Fb(e);if(Go(e))return kf(e);if(Zo(e))return Pb(e);if(Qo(e))return Lb(e)}throw Wo(e)}function Rb(e){return new A(n=>{let t=e[Mi]();if(L(t.subscribe))return t.subscribe(n);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function Ob(e){return new A(n=>{for(let t=0;t<e.length&&!n.closed;t++)n.next(e[t]);n.complete()})}function Fb(e){return new A(n=>{e.then(t=>{n.closed||(n.next(t),n.complete())},t=>n.error(t)).then(null,Oo)})}function Pb(e){return new A(n=>{for(let t of e)if(n.next(t),n.closed)return;n.complete()})}function kf(e){return new A(n=>{Vb(e,n).catch(t=>n.error(t))})}function Lb(e){return kf(Ko(e))}function Vb(e,n){var t,i,r,o;return Tf(this,void 0,void 0,function*(){try{for(t=Af(e);i=yield t.next(),!i.done;){let a=i.value;if(n.next(a),n.closed)return}}catch(a){r={error:a}}finally{try{i&&!i.done&&(o=t.return)&&(yield o.call(t))}finally{if(r)throw r.error}}n.complete()})}function tt(e,n,t,i=0,r=!1){let o=n.schedule(function(){t(),r?e.add(this.schedule(null,i)):this.unsubscribe()},i);if(e.add(o),!r)return o}function Yo(e,n=0){return K((t,i)=>{t.subscribe(ne(i,r=>tt(i,e,()=>i.next(r),n),()=>tt(i,e,()=>i.complete(),n),r=>tt(i,e,()=>i.error(r),n)))})}function Xo(e,n=0){return K((t,i)=>{i.add(e.schedule(()=>t.subscribe(i),n))})}function Nf(e,n){return ce(e).pipe(Xo(n),Yo(n))}function Rf(e,n){return ce(e).pipe(Xo(n),Yo(n))}function Of(e,n){return new A(t=>{let i=0;return n.schedule(function(){i===e.length?t.complete():(t.next(e[i++]),t.closed||this.schedule())})})}function Ff(e,n){return new A(t=>{let i;return tt(t,n,()=>{i=e[qo](),tt(t,n,()=>{let r,o;try{({value:r,done:o}=i.next())}catch(a){t.error(a);return}o?t.complete():t.next(r)},0,!0)}),()=>L(i?.return)&&i.return()})}function Jo(e,n){if(!e)throw new Error("Iterable cannot be null");return new A(t=>{tt(t,n,()=>{let i=e[Symbol.asyncIterator]();tt(t,n,()=>{i.next().then(r=>{r.done?t.complete():t.next(r.value)})},0,!0)})})}function Pf(e,n){return Jo(Ko(e),n)}function Lf(e,n){if(e!=null){if(zo(e))return Nf(e,n);if(Uo(e))return Of(e,n);if($o(e))return Rf(e,n);if(Go(e))return Jo(e,n);if(Zo(e))return Ff(e,n);if(Qo(e))return Pf(e,n)}throw Wo(e)}function Ti(e,n){return n?Lf(e,n):ce(e)}function ke(...e){let n=gn(e);return Ti(e,n)}function Ic(e,n){let t=L(e)?e:()=>e,i=r=>r.error(t());return new A(n?r=>n.schedule(i,0,r):i)}var Vf=Ci(e=>function(){e(this),this.name="EmptyError",this.message="no elements in sequence"});function Mc(e,n){let t=typeof n=="object";return new Promise((i,r)=>{let o=new mt({next:a=>{i(a),o.unsubscribe()},error:r,complete:()=>{t?i(n.defaultValue):r(new Vf)}});e.subscribe(o)})}function jf(e){return e instanceof Date&&!isNaN(e)}function ie(e,n){return K((t,i)=>{let r=0;t.subscribe(ne(i,o=>{i.next(e.call(n,o,r++))}))})}var{isArray:jb}=Array;function Bb(e,n){return jb(n)?e(...n):e(n)}function Bf(e){return ie(n=>Bb(e,n))}var{isArray:Hb}=Array,{getPrototypeOf:Ub,prototype:$b,keys:zb}=Object;function Hf(e){if(e.length===1){let n=e[0];if(Hb(n))return{args:n,keys:null};if(Gb(n)){let t=zb(n);return{args:t.map(i=>n[i]),keys:t}}}return{args:e,keys:null}}function Gb(e){return e&&typeof e=="object"&&Ub(e)===$b}function Uf(e,n){return e.reduce((t,i,r)=>(t[i]=n[r],t),{})}function $f(e,n,t,i,r,o,a,s){let c=[],l=0,d=0,f=!1,m=()=>{f&&!c.length&&!l&&n.complete()},p=D=>l<i?h(D):c.push(D),h=D=>{o&&n.next(D),l++;let w=!1;ce(t(D,d++)).subscribe(ne(n,C=>{r?.(C),o?p(C):n.next(C)},()=>{w=!0},void 0,()=>{if(w)try{for(l--;c.length&&l<i;){let C=c.shift();a?tt(n,a,()=>h(C)):h(C)}m()}catch(C){n.error(C)}}))};return e.subscribe(ne(n,p,()=>{f=!0,m()})),()=>{s?.()}}function Si(e,n,t=1/0){return L(n)?Si((i,r)=>ie((o,a)=>n(i,o,r,a))(ce(e(i,r))),t):(typeof n=="number"&&(t=n),K((i,r)=>$f(i,r,e,t)))}function ea(e=1/0){return Si(mn,e)}function zf(){return ea(1)}function xc(...e){return zf()(Ti(e,gn(e)))}function Tc(...e){let n=If(e),{args:t,keys:i}=Hf(e),r=new A(o=>{let{length:a}=t;if(!a){o.complete();return}let s=new Array(a),c=a,l=a;for(let d=0;d<a;d++){let f=!1;ce(t[d]).subscribe(ne(o,m=>{f||(f=!0,l--),s[d]=m},()=>c--,void 0,()=>{(!c||!f)&&(l||o.next(i?Uf(i,s):s),o.complete())}))}});return n?r.pipe(Bf(n)):r}function Mr(e=0,n,t=Ef){let i=-1;return n!=null&&(Ho(n)?t=n:i=n),new A(r=>{let o=jf(e)?+e-t.now():e;o<0&&(o=0);let a=0;return t.schedule(function(){r.closed||(r.next(a++),0<=i?this.schedule(void 0,i):r.complete())},o)})}function xr(...e){let n=gn(e),t=Mf(e,1/0),i=e;return i.length?i.length===1?ce(i[0]):ea(t)(Ti(i,n)):Bn}var Zt=new A(Ln);function Ee(e,n){return K((t,i)=>{let r=0;t.subscribe(ne(i,o=>e.call(n,o,r++)&&i.next(o)))})}function Gf(e){return K((n,t)=>{let i=!1,r=null,o=null,a=!1,s=()=>{if(o?.unsubscribe(),o=null,i){i=!1;let l=r;r=null,t.next(l)}a&&t.complete()},c=()=>{o=null,a&&t.complete()};n.subscribe(ne(t,l=>{i=!0,r=l,o||ce(e(l)).subscribe(o=ne(t,s,c))},()=>{a=!0,(!i||!o||o.closed)&&t.complete()}))})}function ta(e,n=Ir){return Gf(()=>Mr(e,n))}function na(e){return K((n,t)=>{let i=null,r=!1,o;i=n.subscribe(ne(t,void 0,void 0,a=>{o=ce(e(a,na(e)(n))),i?(i.unsubscribe(),i=null,o.subscribe(t)):r=!0})),r&&(i.unsubscribe(),i=null,o.subscribe(t))})}function Sc(e,n){return L(n)?Si(e,n,1):Si(e,1)}function Un(e,n=Ir){return K((t,i)=>{let r=null,o=null,a=null,s=()=>{if(r){r.unsubscribe(),r=null;let l=o;o=null,i.next(l)}};function c(){let l=a+e,d=n.now();if(d<l){r=this.schedule(void 0,l-d),i.add(r);return}s()}t.subscribe(ne(i,l=>{o=l,a=n.now(),r||(r=n.schedule(c,e),i.add(r))},()=>{s(),i.complete()},void 0,()=>{o=r=null}))})}function Kt(e){return e<=0?()=>Bn:K((n,t)=>{let i=0;n.subscribe(ne(t,r=>{++i<=e&&(t.next(r),e<=i&&t.complete())}))})}function ia(e,n=mn){return e=e??Wb,K((t,i)=>{let r,o=!0;t.subscribe(ne(i,a=>{let s=n(a);(o||!e(r,s))&&(o=!1,r=s,i.next(a))}))})}function Wb(e,n){return e===n}function Tr(e){return K((n,t)=>{try{n.subscribe(t)}finally{t.add(e)}})}function Sr(e={}){let{connector:n=()=>new V,resetOnError:t=!0,resetOnComplete:i=!0,resetOnRefCountZero:r=!0}=e;return o=>{let a,s,c,l=0,d=!1,f=!1,m=()=>{s?.unsubscribe(),s=void 0},p=()=>{m(),a=c=void 0,d=f=!1},h=()=>{let D=a;p(),D?.unsubscribe()};return K((D,w)=>{l++,!f&&!d&&m();let C=c=c??n();w.add(()=>{l--,l===0&&!f&&!d&&(s=Ac(h,r))}),C.subscribe(w),!a&&l>0&&(a=new mt({next:ee=>C.next(ee),error:ee=>{f=!0,m(),s=Ac(p,t,ee),C.error(ee)},complete:()=>{d=!0,m(),s=Ac(p,i),C.complete()}}),ce(D).subscribe(a))})(o)}}function Ac(e,n,...t){if(n===!0){e();return}if(n===!1)return;let i=new mt({next:()=>{i.unsubscribe(),e()}});return ce(n(...t)).subscribe(i)}function ra(e,n,t){let i,r=!1;return e&&typeof e=="object"?{bufferSize:i=1/0,windowTime:n=1/0,refCount:r=!1,scheduler:t}=e:i=e??1/0,Sr({connector:()=>new Lo(i,n,t),resetOnError:!0,resetOnComplete:!1,resetOnRefCountZero:r})}function Ar(e){return Ee((n,t)=>e<=t)}function Ai(...e){let n=gn(e);return K((t,i)=>{(n?xc(e,t,n):xc(e,t)).subscribe(i)})}function ht(e,n){return K((t,i)=>{let r=null,o=0,a=!1,s=()=>a&&!r&&i.complete();t.subscribe(ne(i,c=>{r?.unsubscribe();let l=0,d=o++;ce(e(c,d)).subscribe(r=ne(i,f=>i.next(n?n(c,f,d,l++):f),()=>{r=null,s()}))},()=>{a=!0,s()}))})}function gt(e){return K((n,t)=>{ce(e).subscribe(ne(t,()=>t.complete(),Ln)),!t.closed&&n.subscribe(t)})}function $n(e,n,t){let i=L(e)||n||t?{next:e,error:n,complete:t}:e;return i?K((r,o)=>{var a;(a=i.subscribe)===null||a===void 0||a.call(i);let s=!0;r.subscribe(ne(o,c=>{var l;(l=i.next)===null||l===void 0||l.call(i,c),o.next(c)},()=>{var c;s=!1,(c=i.complete)===null||c===void 0||c.call(i),o.complete()},c=>{var l;s=!1,(l=i.error)===null||l===void 0||l.call(i,c),o.error(c)},()=>{var c,l;s&&((c=i.unsubscribe)===null||c===void 0||c.call(i)),(l=i.finalize)===null||l===void 0||l.call(i)}))}):mn}var kc;function oa(){return kc}function Rt(e){let n=kc;return kc=e,n}var Wf=Symbol("NotFound");function ki(e){return e===Wf||e?.name==="\u0275NotFound"}var fa="https://angular.dev/best-practices/security#preventing-cross-site-scripting-xss",E=class extends Error{code;constructor(n,t){super(Kn(n,t)),this.code=n}};function qb(e){return`NG0${Math.abs(e)}`}function Kn(e,n){return`${qb(e)}${n?": "+n:""}`}var Ri=globalThis;function re(e){for(let n in e)if(e[n]===re)return n;throw Error("")}function Yf(e,n){for(let t in n)n.hasOwnProperty(t)&&!e.hasOwnProperty(t)&&(e[t]=n[t])}function pa(e){if(typeof e=="string")return e;if(Array.isArray(e))return`[${e.map(pa).join(", ")}]`;if(e==null)return""+e;let n=e.overriddenName||e.name;if(n)return`${n}`;let t=e.toString();if(t==null)return""+t;let i=t.indexOf(`
`);return i>=0?t.slice(0,i):t}function ma(e,n){return e?n?`${e} ${n}`:e:n||""}var Zb=re({__forward_ref__:re});function Xt(e){return e.__forward_ref__=Xt,e}function Se(e){return zc(e)?e():e}function zc(e){return typeof e=="function"&&e.hasOwnProperty(Zb)&&e.__forward_ref__===Xt}function b(e){return{token:e.token,providedIn:e.providedIn||null,factory:e.factory,value:void 0}}function H(e){return{providers:e.providers||[],imports:e.imports||[]}}function ha(e){return Kb(e,ga)}function Kb(e,n){return e.hasOwnProperty(n)&&e[n]||null}function Qb(e){let n=e?.[ga]??null;return n||null}function Rc(e){return e&&e.hasOwnProperty(sa)?e[sa]:null}var ga=re({\u0275prov:re}),sa=re({\u0275inj:re}),v=class{_desc;ngMetadataName="InjectionToken";\u0275prov;constructor(n,t){this._desc=n,this.\u0275prov=void 0,typeof t=="number"?this.__NG_ELEMENT_ID__=t:t!==void 0&&(this.\u0275prov=b({token:this,providedIn:t.providedIn||"root",factory:t.factory}))}get multi(){return this}toString(){return`InjectionToken ${this._desc}`}};function Gc(e){return e&&!!e.\u0275providers}var Wc=re({\u0275cmp:re}),qc=re({\u0275dir:re}),Zc=re({\u0275pipe:re});var Nr=re({\u0275fac:re}),Qn=re({__NG_ELEMENT_ID__:re}),qf=re({__NG_ENV_ID__:re});function yn(e){return Qc(e,"@Component"),e[Wc]||null}function Kc(e){return Qc(e,"@Directive"),e[qc]||null}function Xf(e){return Qc(e,"@Pipe"),e[Zc]||null}function Qc(e,n){if(e==null)throw new E(-919,!1)}function Oi(e){return typeof e=="string"?e:e==null?"":String(e)}var Jf=re({ngErrorCode:re}),Yb=re({ngErrorMessage:re}),Xb=re({ngTokenPath:re});function Yc(e,n){return ep("",-200,n)}function va(e,n){throw new E(-201,!1)}function ep(e,n,t){let i=new E(n,e);return i[Jf]=n,i[Yb]=e,t&&(i[Xb]=t),i}function Jb(e){return e[Jf]}var Oc;function tp(){return Oc}function qe(e){let n=Oc;return Oc=e,n}function Xc(e,n,t){let i=ha(e);if(i&&i.providedIn=="root")return i.value===void 0?i.value=i.factory():i.value;if(t&8)return null;if(n!==void 0)return n;va(e,"")}var ey={},zn=ey,ty="__NG_DI_FLAG__",Fc=class{injector;constructor(n){this.injector=n}retrieve(n,t){let i=Gn(t)||0;try{return this.injector.get(n,i&8?null:zn,i)}catch(r){if(ki(r))return r;throw r}}};function ny(e,n=0){let t=oa();if(t===void 0)throw new E(-203,!1);if(t===null)return Xc(e,void 0,n);{let i=iy(n),r=t.retrieve(e,i);if(ki(r)){if(i.optional)return null;throw r}return r}}function T(e,n=0){return(tp()||ny)(Se(e),n)}function u(e,n){return T(e,Gn(n))}function Gn(e){return typeof e>"u"||typeof e=="number"?e:0|(e.optional&&8)|(e.host&&1)|(e.self&&2)|(e.skipSelf&&4)}function iy(e){return{optional:!!(e&8),host:!!(e&1),self:!!(e&2),skipSelf:!!(e&4)}}function Pc(e){let n=[];for(let t=0;t<e.length;t++){let i=Se(e[t]);if(Array.isArray(i)){if(i.length===0)throw new E(900,!1);let r,o=0;for(let a=0;a<i.length;a++){let s=i[a],c=ry(s);typeof c=="number"?c===-1?r=s.token:o|=c:r=s}n.push(T(r,o))}else n.push(T(i))}return n}function ry(e){return e[ty]}function Wn(e,n){let t=e.hasOwnProperty(Nr);return t?e[Nr]:null}function np(e,n,t){if(e.length!==n.length)return!1;for(let i=0;i<e.length;i++){let r=e[i],o=n[i];if(t&&(r=t(r),o=t(o)),o!==r)return!1}return!0}function ip(e){return e.flat(Number.POSITIVE_INFINITY)}function ba(e,n){e.forEach(t=>Array.isArray(t)?ba(t,n):n(t))}function Jc(e,n,t){n>=e.length?e.push(t):e.splice(n,0,t)}function Lr(e,n){return n>=e.length-1?e.pop():e.splice(n,1)[0]}function rp(e,n){let t=[];for(let i=0;i<e;i++)t.push(n);return t}function op(e,n,t,i){let r=e.length;if(r==n)e.push(t,i);else if(r===1)e.push(i,e[0]),e[0]=t;else{for(r--,e.push(e[r-1],e[r]);r>n;){let o=r-2;e[r]=e[o],r--}e[n]=t,e[n+1]=i}}function ya(e,n,t){let i=Fi(e,n);return i>=0?e[i|1]=t:(i=~i,op(e,i,n,t)),i}function _a(e,n){let t=Fi(e,n);if(t>=0)return e[t|1]}function Fi(e,n){return oy(e,n,1)}function oy(e,n,t){let i=0,r=e.length>>t;for(;r!==i;){let o=i+(r-i>>1),a=e[o<<t];if(n===a)return o<<t;a>n?r=o:i=o+1}return~(r<<t)}var _n={},Ne=[],Yn=new v(""),el=new v("",-1),tl=new v(""),Rr=class{get(n,t=zn){if(t===zn){let r=ep("",-201);throw r.name="\u0275NotFound",r}return t}};function vt(e){return{\u0275providers:e}}function ap(e){return vt([{provide:Yn,multi:!0,useValue:e}])}function sp(...e){return{\u0275providers:nl(!0,e),\u0275fromNgModule:!0}}function nl(e,...n){let t=[],i=new Set,r,o=a=>{t.push(a)};return ba(n,a=>{let s=a;ca(s,o,[],i)&&(r||=[],r.push(s))}),r!==void 0&&cp(r,o),t}function cp(e,n){for(let t=0;t<e.length;t++){let{ngModule:i,providers:r}=e[t];il(r,o=>{n(o,i)})}}function ca(e,n,t,i){if(e=Se(e),!e)return!1;let r=null,o=Rc(e),a=!o&&yn(e);if(!o&&!a){let c=e.ngModule;if(o=Rc(c),o)r=c;else return!1}else{if(a&&!a.standalone)return!1;r=e}let s=i.has(r);if(a){if(s)return!1;if(i.add(r),a.dependencies){let c=typeof a.dependencies=="function"?a.dependencies():a.dependencies;for(let l of c)ca(l,n,t,i)}}else if(o){if(o.imports!=null&&!s){i.add(r);let l;ba(o.imports,d=>{ca(d,n,t,i)&&(l||=[],l.push(d))}),l!==void 0&&cp(l,n)}if(!s){let l=Wn(r)||(()=>new r);n({provide:r,useFactory:l,deps:Ne},r),n({provide:tl,useValue:r,multi:!0},r),n({provide:Yn,useValue:()=>T(r),multi:!0},r)}let c=o.providers;if(c!=null&&!s){let l=e;il(c,d=>{n(d,l)})}}else return!1;return r!==e&&e.providers!==void 0}function il(e,n){for(let t of e)Gc(t)&&(t=t.\u0275providers),Array.isArray(t)?il(t,n):n(t)}var ay=re({provide:String,useValue:re});function lp(e){return e!==null&&typeof e=="object"&&ay in e}function sy(e){return!!(e&&e.useExisting)}function cy(e){return!!(e&&e.useFactory)}function qn(e){return typeof e=="function"}function dp(e){return!!e.useClass}var Vr=new v(""),aa={},Zf={},Nc;function Pi(){return Nc===void 0&&(Nc=new Rr),Nc}var Ie=class{},Zn=class extends Ie{parent;source;scopes;records=new Map;_ngOnDestroyHooks=new Set;_onDestroyHooks=[];get destroyed(){return this._destroyed}_destroyed=!1;injectorDefTypes;constructor(n,t,i,r){super(),this.parent=t,this.source=i,this.scopes=r,Vc(n,a=>this.processProvider(a)),this.records.set(el,Ni(void 0,this)),r.has("environment")&&this.records.set(Ie,Ni(void 0,this));let o=this.records.get(Vr);o!=null&&typeof o.value=="string"&&this.scopes.add(o.value),this.injectorDefTypes=new Set(this.get(tl,Ne,{self:!0}))}retrieve(n,t){let i=Gn(t)||0;try{return this.get(n,zn,i)}catch(r){if(ki(r))return r;throw r}}destroy(){kr(this),this._destroyed=!0;let n=M(null);try{for(let i of this._ngOnDestroyHooks)i.ngOnDestroy();let t=this._onDestroyHooks;this._onDestroyHooks=[];for(let i of t)i()}finally{this.records.clear(),this._ngOnDestroyHooks.clear(),this.injectorDefTypes.clear(),M(n)}}onDestroy(n){return kr(this),this._onDestroyHooks.push(n),()=>this.removeOnDestroy(n)}runInContext(n){kr(this);let t=Rt(this),i=qe(void 0),r;try{return n()}finally{Rt(t),qe(i)}}get(n,t=zn,i){if(kr(this),n.hasOwnProperty(qf))return n[qf](this);let r=Gn(i),o,a=Rt(this),s=qe(void 0);try{if(!(r&4)){let l=this.records.get(n);if(l===void 0){let d=py(n)&&ha(n);d&&this.injectableDefInScope(d)?l=Ni(Lc(n),aa):l=null,this.records.set(n,l)}if(l!=null)return this.hydrate(n,l,r)}let c=r&2?Pi():this.parent;return t=r&8&&t===zn?null:t,c.get(n,t)}catch(c){let l=Jb(c);throw l===-200||l===-201?new E(l,null):c}finally{qe(s),Rt(a)}}resolveInjectorInitializers(){let n=M(null),t=Rt(this),i=qe(void 0),r;try{let o=this.get(Yn,Ne,{self:!0});for(let a of o)a()}finally{Rt(t),qe(i),M(n)}}toString(){return"R3Injector[...]"}processProvider(n){n=Se(n);let t=qn(n)?n:Se(n&&n.provide),i=dy(n);if(!qn(n)&&n.multi===!0){let r=this.records.get(t);r||(r=Ni(void 0,aa,!0),r.factory=()=>Pc(r.multi),this.records.set(t,r)),t=n,r.multi.push(n)}this.records.set(t,i)}hydrate(n,t,i){let r=M(null);try{if(t.value===Zf)throw Yc("");return t.value===aa&&(t.value=Zf,t.value=t.factory(void 0,i)),typeof t.value=="object"&&t.value&&fy(t.value)&&this._ngOnDestroyHooks.add(t.value),t.value}finally{M(r)}}injectableDefInScope(n){if(!n.providedIn)return!1;let t=Se(n.providedIn);return typeof t=="string"?t==="any"||this.scopes.has(t):this.injectorDefTypes.has(t)}removeOnDestroy(n){let t=this._onDestroyHooks.indexOf(n);t!==-1&&this._onDestroyHooks.splice(t,1)}};function Lc(e){let n=ha(e),t=n!==null?n.factory:Wn(e);if(t!==null)return t;if(e instanceof v)throw new E(-204,!1);if(e instanceof Function)return ly(e);throw new E(-204,!1)}function ly(e){if(e.length>0)throw new E(-204,!1);let t=Qb(e);return t!==null?()=>t.factory(e):()=>new e}function dy(e){if(lp(e))return Ni(void 0,e.useValue);{let n=rl(e);return Ni(n,aa)}}function rl(e,n,t){let i;if(qn(e)){let r=Se(e);return Wn(r)||Lc(r)}else if(lp(e))i=()=>Se(e.useValue);else if(cy(e))i=()=>e.useFactory(...Pc(e.deps||[]));else if(sy(e))i=(r,o)=>T(Se(e.useExisting),o!==void 0&&o&8?8:void 0);else{let r=Se(e&&(e.useClass||e.provide));if(uy(e))i=()=>new r(...Pc(e.deps));else return Wn(r)||Lc(r)}return i}function kr(e){if(e.destroyed)throw new E(-205,!1)}function Ni(e,n,t=!1){return{factory:e,value:n,multi:t?[]:void 0}}function uy(e){return!!e.deps}function fy(e){return e!==null&&typeof e=="object"&&typeof e.ngOnDestroy=="function"}function py(e){return typeof e=="function"||typeof e=="object"&&e.ngMetadataName==="InjectionToken"}function Vc(e,n){for(let t of e)Array.isArray(t)?Vc(t,n):t&&Gc(t)?Vc(t.\u0275providers,n):n(t)}function Li(e,n){let t;e instanceof Zn?(kr(e),t=e):t=new Fc(e);let i,r=Rt(t),o=qe(void 0);try{return n()}finally{Rt(r),qe(o)}}function up(){return tp()!==void 0||oa()!=null}var bt=0,I=1,S=2,Ce=3,nt=4,Le=5,Xn=6,Vi=7,ye=8,Jt=9,yt=10,le=11,ji=12,ol=13,Jn=14,Ve=15,Dn=16,ei=17,Ot=18,en=19,al=20,Qt=21,Da=22,vn=23,Ze=24,ti=25,wn=26,_e=27,fp=1,sl=6,Cn=7,jr=8,ni=9,he=10;function tn(e){return Array.isArray(e)&&typeof e[fp]=="object"}function _t(e){return Array.isArray(e)&&e[fp]===!0}function cl(e){return(e.flags&4)!==0}function Ft(e){return e.componentOffset>-1}function Br(e){return(e.flags&1)===1}function Pt(e){return!!e.template}function Bi(e){return(e[S]&512)!==0}function ii(e){return(e[S]&256)===256}var ll="svg",pp="math";function it(e){for(;Array.isArray(e);)e=e[bt];return e}function dl(e,n){return it(n[e])}function rt(e,n){return it(n[e.index])}function wa(e,n){return e.data[n]}function mp(e,n){return e[n]}function ot(e,n){let t=n[e];return tn(t)?t:t[bt]}function hp(e){return(e[S]&4)===4}function Ca(e){return(e[S]&128)===128}function gp(e){return _t(e[Ce])}function Ke(e,n){return n==null?null:e[n]}function ul(e){e[ei]=0}function fl(e){e[S]&1024||(e[S]|=1024,Ca(e)&&ri(e))}function vp(e,n){for(;e>0;)n=n[Jn],e--;return n}function Hr(e){return!!(e[S]&9216||e[Ze]?.dirty)}function Ea(e){e[yt].changeDetectionScheduler?.notify(8),e[S]&64&&(e[S]|=1024),Hr(e)&&ri(e)}function ri(e){e[yt].changeDetectionScheduler?.notify(0);let n=bn(e);for(;n!==null&&!(n[S]&8192||(n[S]|=8192,!Ca(n)));)n=bn(n)}function pl(e,n){if(ii(e))throw new E(911,!1);e[Qt]===null&&(e[Qt]=[]),e[Qt].push(n)}function bp(e,n){if(e[Qt]===null)return;let t=e[Qt].indexOf(n);t!==-1&&e[Qt].splice(t,1)}function bn(e){let n=e[Ce];return _t(n)?n[Ce]:n}function ml(e){return e[Vi]??=[]}function hl(e){return e.cleanup??=[]}function yp(e,n,t,i){let r=ml(n);r.push(t),e.firstCreatePass&&hl(e).push(i,r.length-1)}var j={lFrame:kp(null),bindingsEnabled:!0,skipHydrationRootTNode:null};var jc=!1;function _p(){return j.lFrame.elementDepthCount}function Dp(){j.lFrame.elementDepthCount++}function gl(){j.lFrame.elementDepthCount--}function vl(){return j.bindingsEnabled}function bl(){return j.skipHydrationRootTNode!==null}function yl(e){return j.skipHydrationRootTNode===e}function _l(){j.skipHydrationRootTNode=null}function k(){return j.lFrame.lView}function ge(){return j.lFrame.tView}function Qe(e){return j.lFrame.contextLView=e,e[ye]}function Ye(e){return j.lFrame.contextLView=null,e}function Re(){let e=Dl();for(;e!==null&&e.type===64;)e=e.parent;return e}function Dl(){return j.lFrame.currentTNode}function wp(){let e=j.lFrame,n=e.currentTNode;return e.isParent?n:n.parent}function Hi(e,n){let t=j.lFrame;t.currentTNode=e,t.isParent=n}function wl(){return j.lFrame.isParent}function Cl(){j.lFrame.isParent=!1}function Cp(){return j.lFrame.contextLView}function El(){return jc}function Or(e){let n=jc;return jc=e,n}function Ep(){return j.lFrame.bindingIndex}function Ip(e){return j.lFrame.bindingIndex=e}function En(){return j.lFrame.bindingIndex++}function Ia(e){let n=j.lFrame,t=n.bindingIndex;return n.bindingIndex=n.bindingIndex+e,t}function Mp(){return j.lFrame.inI18n}function xp(e,n){let t=j.lFrame;t.bindingIndex=t.bindingRootIndex=e,Ma(n)}function Tp(){return j.lFrame.currentDirectiveIndex}function Ma(e){j.lFrame.currentDirectiveIndex=e}function Sp(e){let n=j.lFrame.currentDirectiveIndex;return n===-1?null:e[n]}function xa(){return j.lFrame.currentQueryIndex}function Ur(e){j.lFrame.currentQueryIndex=e}function my(e){let n=e[I];return n.type===2?n.declTNode:n.type===1?e[Le]:null}function Il(e,n,t){if(t&4){let r=n,o=e;for(;r=r.parent,r===null&&!(t&1);)if(r=my(o),r===null||(o=o[Jn],r.type&10))break;if(r===null)return!1;n=r,e=o}let i=j.lFrame=Ap();return i.currentTNode=n,i.lView=e,!0}function Ta(e){let n=Ap(),t=e[I];j.lFrame=n,n.currentTNode=t.firstChild,n.lView=e,n.tView=t,n.contextLView=e,n.bindingIndex=t.bindingStartIndex,n.inI18n=!1}function Ap(){let e=j.lFrame,n=e===null?null:e.child;return n===null?kp(e):n}function kp(e){let n={currentTNode:null,isParent:!0,lView:null,tView:null,selectedIndex:-1,contextLView:null,elementDepthCount:0,currentNamespace:null,currentDirectiveIndex:-1,bindingRootIndex:-1,bindingIndex:-1,currentQueryIndex:0,parent:e,child:null,inI18n:!1};return e!==null&&(e.child=n),n}function Np(){let e=j.lFrame;return j.lFrame=e.parent,e.currentTNode=null,e.lView=null,e}var Ml=Np;function Sa(){let e=Np();e.isParent=!0,e.tView=null,e.selectedIndex=-1,e.contextLView=null,e.elementDepthCount=0,e.currentDirectiveIndex=-1,e.currentNamespace=null,e.bindingRootIndex=-1,e.bindingIndex=-1,e.currentQueryIndex=0}function Rp(e){return(j.lFrame.contextLView=vp(e,j.lFrame.contextLView))[ye]}function Lt(){return j.lFrame.selectedIndex}function In(e){j.lFrame.selectedIndex=e}function $r(){let e=j.lFrame;return wa(e.tView,e.selectedIndex)}function Ui(){j.lFrame.currentNamespace=ll}function Op(){return j.lFrame.currentNamespace}var Fp=!0;function Aa(){return Fp}function ka(e){Fp=e}function Bc(e,n=null,t=null,i){let r=Pp(e,n,t,i);return r.resolveInjectorInitializers(),r}function Pp(e,n=null,t=null,i,r=new Set){let o=[t||Ne,sp(e)],a;return new Zn(o,n||Pi(),a||null,r)}var ae=class e{static THROW_IF_NOT_FOUND=zn;static NULL=new Rr;static create(n,t){if(Array.isArray(n))return Bc({name:""},t,n,"");{let i=n.name??"";return Bc({name:i},n.parent,n.providers,i)}}static \u0275prov=b({token:e,providedIn:"any",factory:()=>T(el)});static __NG_ELEMENT_ID__=-1},z=new v(""),Dt=(()=>{class e{static __NG_ELEMENT_ID__=hy;static __NG_ENV_ID__=t=>t}return e})(),la=class extends Dt{_lView;constructor(n){super(),this._lView=n}get destroyed(){return ii(this._lView)}onDestroy(n){let t=this._lView;return pl(t,n),()=>bp(t,n)}};function hy(){return new la(k())}var Lp=!1,Vp=new v(""),oi=(()=>{class e{taskId=0;pendingTasks=new Set;destroyed=!1;pendingTask=new hn(!1);debugTaskTracker=u(Vp,{optional:!0});get hasPendingTasks(){return this.destroyed?!1:this.pendingTask.value}get hasPendingTasksObservable(){return this.destroyed?new A(t=>{t.next(!1),t.complete()}):this.pendingTask}add(){!this.hasPendingTasks&&!this.destroyed&&this.pendingTask.next(!0);let t=this.taskId++;return this.pendingTasks.add(t),this.debugTaskTracker?.add(t),t}has(t){return this.pendingTasks.has(t)}remove(t){this.pendingTasks.delete(t),this.debugTaskTracker?.remove(t),this.pendingTasks.size===0&&this.hasPendingTasks&&this.pendingTask.next(!1)}ngOnDestroy(){this.pendingTasks.clear(),this.hasPendingTasks&&this.pendingTask.next(!1),this.destroyed=!0,this.pendingTask.unsubscribe()}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})(),Hc=class extends V{__isAsync;destroyRef=void 0;pendingTasks=void 0;constructor(n=!1){super(),this.__isAsync=n,up()&&(this.destroyRef=u(Dt,{optional:!0})??void 0,this.pendingTasks=u(oi,{optional:!0})??void 0)}emit(n){let t=M(null);try{super.next(n)}finally{M(t)}}subscribe(n,t,i){let r=n,o=t||(()=>null),a=i;if(n&&typeof n=="object"){let c=n;r=c.next?.bind(c),o=c.error?.bind(c),a=c.complete?.bind(c)}this.__isAsync&&(o=this.wrapInTimeout(o),r&&(r=this.wrapInTimeout(r)),a&&(a=this.wrapInTimeout(a)));let s=super.subscribe({next:r,error:o,complete:a});return n instanceof te&&n.add(s),s}wrapInTimeout(n){return t=>{let i=this.pendingTasks?.add();setTimeout(()=>{try{n(t)}finally{i!==void 0&&this.pendingTasks?.remove(i)}})}}},$=Hc;function da(...e){}function xl(e){let n,t;function i(){e=da;try{t!==void 0&&typeof cancelAnimationFrame=="function"&&cancelAnimationFrame(t),n!==void 0&&clearTimeout(n)}catch{}}return n=setTimeout(()=>{e(),i()}),typeof requestAnimationFrame=="function"&&(t=requestAnimationFrame(()=>{e(),i()})),()=>i()}function jp(e){return queueMicrotask(()=>e()),()=>{e=da}}var Tl="isAngularZone",Fr=Tl+"_ID",gy=0,R=class e{hasPendingMacrotasks=!1;hasPendingMicrotasks=!1;isStable=!0;onUnstable=new $(!1);onMicrotaskEmpty=new $(!1);onStable=new $(!1);onError=new $(!1);constructor(n){let{enableLongStackTrace:t=!1,shouldCoalesceEventChangeDetection:i=!1,shouldCoalesceRunChangeDetection:r=!1,scheduleInRootZone:o=Lp}=n;if(typeof Zone>"u")throw new E(908,!1);Zone.assertZonePatched();let a=this;a._nesting=0,a._outer=a._inner=Zone.current,Zone.TaskTrackingZoneSpec&&(a._inner=a._inner.fork(new Zone.TaskTrackingZoneSpec)),t&&Zone.longStackTraceZoneSpec&&(a._inner=a._inner.fork(Zone.longStackTraceZoneSpec)),a.shouldCoalesceEventChangeDetection=!r&&i,a.shouldCoalesceRunChangeDetection=r,a.callbackScheduled=!1,a.scheduleInRootZone=o,yy(a)}static isInAngularZone(){return typeof Zone<"u"&&Zone.current.get(Tl)===!0}static assertInAngularZone(){if(!e.isInAngularZone())throw new E(909,!1)}static assertNotInAngularZone(){if(e.isInAngularZone())throw new E(909,!1)}run(n,t,i){return this._inner.run(n,t,i)}runTask(n,t,i,r){let o=this._inner,a=o.scheduleEventTask("NgZoneEvent: "+r,n,vy,da,da);try{return o.runTask(a,t,i)}finally{o.cancelTask(a)}}runGuarded(n,t,i){return this._inner.runGuarded(n,t,i)}runOutsideAngular(n){return this._outer.run(n)}},vy={};function Sl(e){if(e._nesting==0&&!e.hasPendingMicrotasks&&!e.isStable)try{e._nesting++,e.onMicrotaskEmpty.emit(null)}finally{if(e._nesting--,!e.hasPendingMicrotasks)try{e.runOutsideAngular(()=>e.onStable.emit(null))}finally{e.isStable=!0}}}function by(e){if(e.isCheckStableRunning||e.callbackScheduled)return;e.callbackScheduled=!0;function n(){xl(()=>{e.callbackScheduled=!1,Uc(e),e.isCheckStableRunning=!0,Sl(e),e.isCheckStableRunning=!1})}e.scheduleInRootZone?Zone.root.run(()=>{n()}):e._outer.run(()=>{n()}),Uc(e)}function yy(e){let n=()=>{by(e)},t=gy++;e._inner=e._inner.fork({name:"angular",properties:{[Tl]:!0,[Fr]:t,[Fr+t]:!0},onInvokeTask:(i,r,o,a,s,c)=>{if(_y(c))return i.invokeTask(o,a,s,c);try{return Kf(e),i.invokeTask(o,a,s,c)}finally{(e.shouldCoalesceEventChangeDetection&&a.type==="eventTask"||e.shouldCoalesceRunChangeDetection)&&n(),Qf(e)}},onInvoke:(i,r,o,a,s,c,l)=>{try{return Kf(e),i.invoke(o,a,s,c,l)}finally{e.shouldCoalesceRunChangeDetection&&!e.callbackScheduled&&!Dy(c)&&n(),Qf(e)}},onHasTask:(i,r,o,a)=>{i.hasTask(o,a),r===o&&(a.change=="microTask"?(e._hasPendingMicrotasks=a.microTask,Uc(e),Sl(e)):a.change=="macroTask"&&(e.hasPendingMacrotasks=a.macroTask))},onHandleError:(i,r,o,a)=>(i.handleError(o,a),e.runOutsideAngular(()=>e.onError.emit(a)),!1)})}function Uc(e){e._hasPendingMicrotasks||(e.shouldCoalesceEventChangeDetection||e.shouldCoalesceRunChangeDetection)&&e.callbackScheduled===!0?e.hasPendingMicrotasks=!0:e.hasPendingMicrotasks=!1}function Kf(e){e._nesting++,e.isStable&&(e.isStable=!1,e.onUnstable.emit(null))}function Qf(e){e._nesting--,Sl(e)}var Pr=class{hasPendingMicrotasks=!1;hasPendingMacrotasks=!1;isStable=!0;onUnstable=new $;onMicrotaskEmpty=new $;onStable=new $;onError=new $;run(n,t,i){return n.apply(t,i)}runGuarded(n,t,i){return n.apply(t,i)}runOutsideAngular(n){return n()}runTask(n,t,i,r){return n.apply(t,i)}};function _y(e){return Bp(e,"__ignore_ng_zone__")}function Dy(e){return Bp(e,"__scheduler_tick__")}function Bp(e,n){return!Array.isArray(e)||e.length!==1?!1:e[0]?.data?.[n]===!0}var He=class{_console=console;handleError(n){this._console.error("ERROR",n)}},Mn=new v("",{factory:()=>{let e=u(R),n=u(Ie),t;return i=>{e.runOutsideAngular(()=>{n.destroyed&&!t?setTimeout(()=>{throw i}):(t??=n.get(He),t.handleError(i))})}}}),Hp={provide:Yn,useValue:()=>{let e=u(He,{optional:!0})},multi:!0},wy=new v("",{factory:()=>{let e=u(z).defaultView;if(!e)return;let n=u(Mn),t=o=>{n(o.reason),o.preventDefault()},i=o=>{o.error?n(o.error):n(new Error(o.message,{cause:o})),o.preventDefault()},r=()=>{e.addEventListener("unhandledrejection",t),e.addEventListener("error",i)};typeof Zone<"u"?Zone.root.run(r):r(),u(Dt).onDestroy(()=>{e.removeEventListener("error",i),e.removeEventListener("unhandledrejection",t)})}});function Al(){return vt([ap(()=>{u(wy)})])}function ue(e,n){let[t,i,r]=hc(e,n?.equal),o=t,a=o[Te];return o.set=i,o.update=r,o.asReadonly=Up.bind(o),o}function Up(){let e=this[Te];if(e.readonlyFn===void 0){let n=()=>this();n[Te]=e,e.readonlyFn=n}return e.readonlyFn}var zr=(()=>{class e{view;node;constructor(t,i){this.view=t,this.node=i}static __NG_ELEMENT_ID__=Cy}return e})();function Cy(){return new zr(k(),Re())}var Yt=class{},Gr=new v("",{factory:()=>!0});var kl=new v(""),Na=(()=>{class e{internalPendingTasks=u(oi);scheduler=u(Yt);errorHandler=u(Mn);add(){let t=this.internalPendingTasks.add();return()=>{this.internalPendingTasks.has(t)&&(this.scheduler.notify(11),this.internalPendingTasks.remove(t))}}run(t){let i=this.add();t().catch(this.errorHandler).finally(i)}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})(),Ra=(()=>{class e{static \u0275prov=b({token:e,providedIn:"root",factory:()=>new $c})}return e})(),$c=class{dirtyEffectCount=0;queues=new Map;add(n){this.enqueue(n),this.schedule(n)}schedule(n){n.dirty&&this.dirtyEffectCount++}remove(n){let t=n.zone,i=this.queues.get(t);i.has(n)&&(i.delete(n),n.dirty&&this.dirtyEffectCount--)}enqueue(n){let t=n.zone;this.queues.has(t)||this.queues.set(t,new Set);let i=this.queues.get(t);i.has(n)||i.add(n)}flush(){for(;this.dirtyEffectCount>0;){let n=!1;for(let[t,i]of this.queues)t===null?n||=this.flushQueue(i):n||=t.run(()=>this.flushQueue(i));n||(this.dirtyEffectCount=0)}}flushQueue(n){let t=!1;for(let i of n)i.dirty&&(this.dirtyEffectCount--,t=!0,i.run());return t}},ua=class{[Te];constructor(n){this[Te]=n}destroy(){this[Te].destroy()}};function $i(e,n){let t=n?.injector??u(ae),i=n?.manualCleanup!==!0?t.get(Dt):null,r,o=t.get(zr,null,{optional:!0}),a=t.get(Yt);return o!==null?(r=My(o.view,a,e),i instanceof la&&i._lView===o.view&&(i=null)):r=xy(e,t.get(Ra),a),r.injector=t,i!==null&&(r.onDestroyFns=[i.onDestroy(()=>r.destroy())]),new ua(r)}var $p=we(F({},gc),{cleanupFns:void 0,zone:null,onDestroyFns:null,run(){let e=Or(!1);try{vc(this)}finally{Or(e)}},cleanup(){if(!this.cleanupFns?.length)return;let e=M(null);try{for(;this.cleanupFns.length;)this.cleanupFns.pop()()}finally{this.cleanupFns=[],M(e)}}}),Ey=we(F({},$p),{consumerMarkedDirty(){this.scheduler.schedule(this),this.notifier.notify(12)},destroy(){if(Fn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.scheduler.remove(this)}}),Iy=we(F({},$p),{consumerMarkedDirty(){this.view[S]|=8192,ri(this.view),this.notifier.notify(13)},destroy(){if(Fn(this),this.onDestroyFns!==null)for(let e of this.onDestroyFns)e();this.cleanup(),this.view[vn]?.delete(this)}});function My(e,n,t){let i=Object.create(Iy);return i.view=e,i.zone=typeof Zone<"u"?Zone.current:null,i.notifier=n,i.fn=zp(i,t),e[vn]??=new Set,e[vn].add(i),i.consumerMarkedDirty(i),i}function xy(e,n,t){let i=Object.create(Ey);return i.fn=zp(i,e),i.scheduler=n,i.notifier=t,i.zone=typeof Zone<"u"?Zone.current:null,i.scheduler.add(i),i.notifier.notify(12),i}function zp(e,n){return()=>{n(t=>(e.cleanupFns??=[]).push(t))}}function eo(e){return{toString:e}.toString()}function Vy(e){return typeof e=="function"}function Cm(e,n,t,i){n!==null?n.applyValueToInputSignal(n,i):e[t]=i}var Ha=class{previousValue;currentValue;firstChange;constructor(n,t,i){this.previousValue=n,this.currentValue=t,this.firstChange=i}isFirstChange(){return this.firstChange}},Mt=(()=>{let e=()=>Em;return e.ngInherit=!0,e})();function Em(e){return e.type.prototype.ngOnChanges&&(e.setInput=By),jy}function jy(){let e=Mm(this),n=e?.current;if(n){let t=e.previous;if(t===_n)e.previous=n;else for(let i in n)t[i]=n[i];e.current=null,this.ngOnChanges(n)}}function By(e,n,t,i,r){let o=this.declaredInputs[i],a=Mm(e)||Hy(e,{previous:_n,current:null}),s=a.current||(a.current={}),c=a.previous,l=c[o];s[o]=new Ha(l&&l.currentValue,t,c===_n),Cm(e,n,r,t)}var Im="__ngSimpleChanges__";function Mm(e){return e[Im]||null}function Hy(e,n){return e[Im]=n}var Gp=[];var X=function(e,n=null,t){for(let i=0;i<Gp.length;i++){let r=Gp[i];r(e,n,t)}},W=(function(e){return e[e.TemplateCreateStart=0]="TemplateCreateStart",e[e.TemplateCreateEnd=1]="TemplateCreateEnd",e[e.TemplateUpdateStart=2]="TemplateUpdateStart",e[e.TemplateUpdateEnd=3]="TemplateUpdateEnd",e[e.LifecycleHookStart=4]="LifecycleHookStart",e[e.LifecycleHookEnd=5]="LifecycleHookEnd",e[e.OutputStart=6]="OutputStart",e[e.OutputEnd=7]="OutputEnd",e[e.BootstrapApplicationStart=8]="BootstrapApplicationStart",e[e.BootstrapApplicationEnd=9]="BootstrapApplicationEnd",e[e.BootstrapComponentStart=10]="BootstrapComponentStart",e[e.BootstrapComponentEnd=11]="BootstrapComponentEnd",e[e.ChangeDetectionStart=12]="ChangeDetectionStart",e[e.ChangeDetectionEnd=13]="ChangeDetectionEnd",e[e.ChangeDetectionSyncStart=14]="ChangeDetectionSyncStart",e[e.ChangeDetectionSyncEnd=15]="ChangeDetectionSyncEnd",e[e.AfterRenderHooksStart=16]="AfterRenderHooksStart",e[e.AfterRenderHooksEnd=17]="AfterRenderHooksEnd",e[e.ComponentStart=18]="ComponentStart",e[e.ComponentEnd=19]="ComponentEnd",e[e.DeferBlockStateStart=20]="DeferBlockStateStart",e[e.DeferBlockStateEnd=21]="DeferBlockStateEnd",e[e.DynamicComponentStart=22]="DynamicComponentStart",e[e.DynamicComponentEnd=23]="DynamicComponentEnd",e[e.HostBindingsUpdateStart=24]="HostBindingsUpdateStart",e[e.HostBindingsUpdateEnd=25]="HostBindingsUpdateEnd",e})(W||{});function Uy(e,n,t){let{ngOnChanges:i,ngOnInit:r,ngDoCheck:o}=n.type.prototype;if(i){let a=Em(n);(t.preOrderHooks??=[]).push(e,a),(t.preOrderCheckHooks??=[]).push(e,a)}r&&(t.preOrderHooks??=[]).push(0-e,r),o&&((t.preOrderHooks??=[]).push(e,o),(t.preOrderCheckHooks??=[]).push(e,o))}function xm(e,n){for(let t=n.directiveStart,i=n.directiveEnd;t<i;t++){let o=e.data[t].type.prototype,{ngAfterContentInit:a,ngAfterContentChecked:s,ngAfterViewInit:c,ngAfterViewChecked:l,ngOnDestroy:d}=o;a&&(e.contentHooks??=[]).push(-t,a),s&&((e.contentHooks??=[]).push(t,s),(e.contentCheckHooks??=[]).push(t,s)),c&&(e.viewHooks??=[]).push(-t,c),l&&((e.viewHooks??=[]).push(t,l),(e.viewCheckHooks??=[]).push(t,l)),d!=null&&(e.destroyHooks??=[]).push(t,d)}}function La(e,n,t){Tm(e,n,3,t)}function Va(e,n,t,i){(e[S]&3)===t&&Tm(e,n,t,i)}function Nl(e,n){let t=e[S];(t&3)===n&&(t&=16383,t+=1,e[S]=t)}function Tm(e,n,t,i){let r=i!==void 0?e[ei]&65535:0,o=i??-1,a=n.length-1,s=0;for(let c=r;c<a;c++)if(typeof n[c+1]=="number"){if(s=n[c],i!=null&&s>=i)break}else n[c]<0&&(e[ei]+=65536),(s<o||o==-1)&&($y(e,t,n,c),e[ei]=(e[ei]&4294901760)+c+2),c++}function Wp(e,n){X(W.LifecycleHookStart,e,n);let t=M(null);try{n.call(e)}finally{M(t),X(W.LifecycleHookEnd,e,n)}}function $y(e,n,t,i){let r=t[i]<0,o=t[i+1],a=r?-t[i]:t[i],s=e[a];r?e[S]>>14<e[ei]>>16&&(e[S]&3)===n&&(e[S]+=16384,Wp(s,o)):Wp(s,o)}var Gi=-1,si=class{factory;name;injectImpl;resolving=!1;canSeeViewProviders;multi;componentProviders;index;providerFactory;constructor(n,t,i,r){this.factory=n,this.name=r,this.canSeeViewProviders=t,this.injectImpl=i}};function zy(e){return(e.flags&8)!==0}function Gy(e){return(e.flags&16)!==0}function Wy(e,n,t){let i=0;for(;i<t.length;){let r=t[i];if(typeof r=="number"){if(r!==0)break;i++;let o=t[i++],a=t[i++],s=t[i++];e.setAttribute(n,a,s,o)}else{let o=r,a=t[++i];qy(o)?e.setProperty(n,o,a):e.setAttribute(n,o,a),i++}}return i}function Sm(e){return e===3||e===4||e===6}function qy(e){return e.charCodeAt(0)===64}function Wi(e,n){if(!(n===null||n.length===0))if(e===null||e.length===0)e=n.slice();else{let t=-1;for(let i=0;i<n.length;i++){let r=n[i];typeof r=="number"?t=r:t===0||(t===-1||t===2?qp(e,t,r,null,n[++i]):qp(e,t,r,null,null))}}return e}function qp(e,n,t,i,r){let o=0,a=e.length;if(n===-1)a=-1;else for(;o<e.length;){let s=e[o++];if(typeof s=="number"){if(s===n){a=-1;break}else if(s>n){a=o-1;break}}}for(;o<e.length;){let s=e[o];if(typeof s=="number")break;if(s===t){r!==null&&(e[o+1]=r);return}o++,r!==null&&o++}a!==-1&&(e.splice(a,0,n),o=a+1),e.splice(o++,0,t),r!==null&&e.splice(o++,0,r)}function Am(e){return e!==Gi}function Ua(e){return e&32767}function Zy(e){return e>>16}function $a(e,n){let t=Zy(e),i=n;for(;t>0;)i=i[Jn],t--;return i}var $l=!0;function Zp(e){let n=$l;return $l=e,n}var Ky=256,km=Ky-1,Nm=5,Qy=0,Vt={};function Yy(e,n,t){let i;typeof t=="string"?i=t.charCodeAt(0)||0:t.hasOwnProperty(Qn)&&(i=t[Qn]),i==null&&(i=t[Qn]=Qy++);let r=i&km,o=1<<r;n.data[e+(r>>Nm)]|=o}function za(e,n){let t=Rm(e,n);if(t!==-1)return t;let i=n[I];i.firstCreatePass&&(e.injectorIndex=n.length,Rl(i.data,e),Rl(n,null),Rl(i.blueprint,null));let r=Md(e,n),o=e.injectorIndex;if(Am(r)){let a=Ua(r),s=$a(r,n),c=s[I].data;for(let l=0;l<8;l++)n[o+l]=s[a+l]|c[a+l]}return n[o+8]=r,o}function Rl(e,n){e.push(0,0,0,0,0,0,0,0,n)}function Rm(e,n){return e.injectorIndex===-1||e.parent&&e.parent.injectorIndex===e.injectorIndex||n[e.injectorIndex+8]===null?-1:e.injectorIndex}function Md(e,n){if(e.parent&&e.parent.injectorIndex!==-1)return e.parent.injectorIndex;let t=0,i=null,r=n;for(;r!==null;){if(i=Vm(r),i===null)return Gi;if(t++,r=r[Jn],i.injectorIndex!==-1)return i.injectorIndex|t<<16}return Gi}function zl(e,n,t){Yy(e,n,t)}function Xy(e,n){if(n==="class")return e.classes;if(n==="style")return e.styles;let t=e.attrs;if(t){let i=t.length,r=0;for(;r<i;){let o=t[r];if(Sm(o))break;if(o===0)r=r+2;else if(typeof o=="number")for(r++;r<i&&typeof t[r]=="string";)r++;else{if(o===n)return t[r+1];r=r+2}}}return null}function Om(e,n,t){if(t&8||e!==void 0)return e;va(n,"NodeInjector")}function Fm(e,n,t,i){if(t&8&&i===void 0&&(i=null),(t&3)===0){let r=e[Jt],o=qe(void 0);try{return r?r.get(n,i,t&8):Xc(n,i,t&8)}finally{qe(o)}}return Om(i,n,t)}function Pm(e,n,t,i=0,r){if(e!==null){if(n[S]&2048&&!(i&2)){let a=n_(e,n,t,i,Vt);if(a!==Vt)return a}let o=Lm(e,n,t,i,Vt);if(o!==Vt)return o}return Fm(n,t,i,r)}function Lm(e,n,t,i,r){let o=e_(t);if(typeof o=="function"){if(!Il(n,e,i))return i&1?Om(r,t,i):Fm(n,t,i,r);try{let a;if(a=o(i),a==null&&!(i&8))va(t);else return a}finally{Ml()}}else if(typeof o=="number"){let a=null,s=Rm(e,n),c=Gi,l=i&1?n[Ve][Le]:null;for((s===-1||i&4)&&(c=s===-1?Md(e,n):n[s+8],c===Gi||!Qp(i,!1)?s=-1:(a=n[I],s=Ua(c),n=$a(c,n)));s!==-1;){let d=n[I];if(Kp(o,s,d.data)){let f=Jy(s,n,t,a,i,l);if(f!==Vt)return f}c=n[s+8],c!==Gi&&Qp(i,n[I].data[s+8]===l)&&Kp(o,s,n)?(a=d,s=Ua(c),n=$a(c,n)):s=-1}}return r}function Jy(e,n,t,i,r,o){let a=n[I],s=a.data[e+8],c=i==null?Ft(s)&&$l:i!=a&&(s.type&3)!==0,l=r&1&&o===s,d=ja(s,a,t,c,l);return d!==null?Kr(n,a,d,s,r):Vt}function ja(e,n,t,i,r){let o=e.providerIndexes,a=n.data,s=o&1048575,c=e.directiveStart,l=e.directiveEnd,d=o>>20,f=i?s:s+d,m=r?s+d:l;for(let p=f;p<m;p++){let h=a[p];if(p<c&&t===h||p>=c&&h.type===t)return p}if(r){let p=a[c];if(p&&Pt(p)&&p.type===t)return c}return null}function Kr(e,n,t,i,r){let o=e[t],a=n.data;if(o instanceof si){let s=o;if(s.resolving)throw Yc("");let c=Zp(s.canSeeViewProviders);s.resolving=!0;let l=a[t].type||a[t],d,f=s.injectImpl?qe(s.injectImpl):null,m=Il(e,i,0);try{o=e[t]=s.factory(void 0,r,a,e,i),n.firstCreatePass&&t>=i.directiveStart&&Uy(t,a[t],n)}finally{f!==null&&qe(f),Zp(c),s.resolving=!1,Ml()}}return o}function e_(e){if(typeof e=="string")return e.charCodeAt(0)||0;let n=e.hasOwnProperty(Qn)?e[Qn]:void 0;return typeof n=="number"?n>=0?n&km:t_:n}function Kp(e,n,t){let i=1<<e;return!!(t[n+(e>>Nm)]&i)}function Qp(e,n){return!(e&2)&&!(e&1&&n)}var ai=class{_tNode;_lView;constructor(n,t){this._tNode=n,this._lView=t}get(n,t,i){return Pm(this._tNode,this._lView,n,Gn(i),t)}};function t_(){return new ai(Re(),k())}function Tn(e){return eo(()=>{let n=e.prototype.constructor,t=n[Nr]||Gl(n),i=Object.prototype,r=Object.getPrototypeOf(e.prototype).constructor;for(;r&&r!==i;){let o=r[Nr]||Gl(r);if(o&&o!==t)return o;r=Object.getPrototypeOf(r)}return o=>new o})}function Gl(e){return zc(e)?()=>{let n=Gl(Se(e));return n&&n()}:Wn(e)}function n_(e,n,t,i,r){let o=e,a=n;for(;o!==null&&a!==null&&a[S]&2048&&!Bi(a);){let s=Lm(o,a,t,i|2,Vt);if(s!==Vt)return s;let c=o.parent;if(!c){let l=a[al];if(l){let d=l.get(t,Vt,i&-5);if(d!==Vt)return d}c=Vm(a),a=a[Jn]}o=c}return r}function Vm(e){let n=e[I],t=n.type;return t===2?n.declTNode:t===1?e[Le]:null}function xd(e){return Xy(Re(),e)}function i_(){return Ji(Re(),k())}function Ji(e,n){return new G(rt(e,n))}var G=(()=>{class e{nativeElement;constructor(t){this.nativeElement=t}static __NG_ELEMENT_ID__=i_}return e})();function jm(e){return e instanceof G?e.nativeElement:e}function r_(){return this._results[Symbol.iterator]()}var jt=class{_emitDistinctChangesOnly;dirty=!0;_onDirty=void 0;_results=[];_changesDetected=!1;_changes=void 0;length=0;first=void 0;last=void 0;get changes(){return this._changes??=new V}constructor(n=!1){this._emitDistinctChangesOnly=n}get(n){return this._results[n]}map(n){return this._results.map(n)}filter(n){return this._results.filter(n)}find(n){return this._results.find(n)}reduce(n,t){return this._results.reduce(n,t)}forEach(n){this._results.forEach(n)}some(n){return this._results.some(n)}toArray(){return this._results.slice()}toString(){return this._results.toString()}reset(n,t){this.dirty=!1;let i=ip(n);(this._changesDetected=!np(this._results,i,t))&&(this._results=i,this.length=i.length,this.last=i[this.length-1],this.first=i[0])}notifyOnChanges(){this._changes!==void 0&&(this._changesDetected||!this._emitDistinctChangesOnly)&&this._changes.next(this)}onDirty(n){this._onDirty=n}setDirty(){this.dirty=!0,this._onDirty?.()}destroy(){this._changes!==void 0&&(this._changes.complete(),this._changes.unsubscribe())}[Symbol.iterator]=r_};function Bm(e){return(e.flags&128)===128}var Td=(function(e){return e[e.OnPush=0]="OnPush",e[e.Eager=1]="Eager",e[e.Default=1]="Default",e})(Td||{}),Hm=new Map,o_=0;function a_(){return o_++}function s_(e){Hm.set(e[en],e)}function Wl(e){Hm.delete(e[en])}var Yp="__ngContext__";function qi(e,n){tn(n)?(e[Yp]=n[en],s_(n)):e[Yp]=n}function Um(e){return zm(e[ji])}function $m(e){return zm(e[nt])}function zm(e){for(;e!==null&&!_t(e);)e=e[nt];return e}var c_;function Sd(e){c_=e}var er=new v("",{factory:()=>l_}),l_="ng";var es=new v(""),di=new v("",{providedIn:"platform",factory:()=>"unknown"}),Ad=new v(""),ui=new v("",{factory:()=>u(z).body?.querySelector("[ngCspNonce]")?.getAttribute("ngCspNonce")||null});var Gm="r";var Wm="di";var qm=!1,Zm=new v("",{factory:()=>qm});var Xp=new WeakMap;function d_(e,n){if(e==null||typeof e!="object")return;let t=Xp.get(e);t||(t=new WeakSet,Xp.set(e,t)),t.add(n)}var u_=(e,n,t,i)=>{};function f_(e,n,t,i){u_(e,n,t,i)}function ts(e){return(e.flags&32)===32}var p_=()=>null;function Km(e,n,t=!1){return p_(e,n,t)}function Qm(e,n){let t=e.contentQueries;if(t!==null){let i=M(null);try{for(let r=0;r<t.length;r+=2){let o=t[r],a=t[r+1];if(a!==-1){let s=e.data[a];Ur(o),s.contentQueries(2,n[a],a)}}}finally{M(i)}}}function ql(e,n,t){Ur(0);let i=M(null);try{n(e,t)}finally{M(i)}}function Ym(e,n,t){if(cl(n)){let i=M(null);try{let r=n.directiveStart,o=n.directiveEnd;for(let a=r;a<o;a++){let s=e.data[a];if(s.contentQueries){let c=t[a];s.contentQueries(1,c,a)}}}finally{M(i)}}}var Et=(function(e){return e[e.Emulated=0]="Emulated",e[e.None=2]="None",e[e.ShadowDom=3]="ShadowDom",e[e.ExperimentalIsolatedShadowDom=4]="ExperimentalIsolatedShadowDom",e})(Et||{});var Oa;function m_(){if(Oa===void 0&&(Oa=null,Ri.trustedTypes))try{Oa=Ri.trustedTypes.createPolicy("angular",{createHTML:e=>e,createScript:e=>e,createScriptURL:e=>e})}catch{}return Oa}function ns(e){return m_()?.createHTML(e)||e}var nn=class{changingThisBreaksApplicationSecurity;constructor(n){this.changingThisBreaksApplicationSecurity=n}toString(){return`SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${fa})`}},Zl=class extends nn{getTypeName(){return"HTML"}},Kl=class extends nn{getTypeName(){return"Style"}},Ql=class extends nn{getTypeName(){return"Script"}},Yl=class extends nn{getTypeName(){return"URL"}},Xl=class extends nn{getTypeName(){return"ResourceURL"}};function Bt(e){return e instanceof nn?e.changingThisBreaksApplicationSecurity:e}function Sn(e,n){let t=Xm(e);if(t!=null&&t!==n){if(t==="ResourceURL"&&n==="URL")return!0;throw new Error(`Required a safe ${n}, got a ${t} (see ${fa})`)}return t===n}function Xm(e){return e instanceof nn&&e.getTypeName()||null}function kd(e){return new Zl(e)}function Nd(e){return new Kl(e)}function Rd(e){return new Ql(e)}function Od(e){return new Yl(e)}function Fd(e){return new Xl(e)}function h_(e){let n=new ed(e);return g_()?new Jl(n):n}var Jl=class{inertDocumentHelper;constructor(n){this.inertDocumentHelper=n}getInertBodyElement(n){n="<body><remove></remove>"+n;try{let t=new window.DOMParser().parseFromString(ns(n),"text/html").body;return t===null?this.inertDocumentHelper.getInertBodyElement(n):(t.firstChild?.remove(),t)}catch{return null}}},ed=class{defaultDoc;inertDocument;constructor(n){this.defaultDoc=n,this.inertDocument=this.defaultDoc.implementation.createHTMLDocument("sanitization-inert")}getInertBodyElement(n){let t=this.inertDocument.createElement("template");return t.innerHTML=ns(n),t}};function g_(){try{return!!new window.DOMParser().parseFromString(ns(""),"text/html")}catch{return!1}}var v_=/^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;function to(e){return e=String(e),e.match(v_)?e:"unsafe:"+e}function on(e){let n={};for(let t of e.split(","))n[t]=!0;return n}function no(...e){let n={};for(let t of e)for(let i in t)t.hasOwnProperty(i)&&(n[i]=!0);return n}var Jm=on("area,br,col,hr,img,wbr"),eh=on("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),th=on("rp,rt"),b_=no(th,eh),y_=no(eh,on("address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul")),__=no(th,on("a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video")),Jp=no(Jm,y_,__,b_),nh=on("background,cite,href,itemtype,longdesc,poster,src,xlink:href"),D_=on("abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width"),w_=on("aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext"),C_=no(nh,D_,w_),E_=on("script,style,template");var td=class{sanitizedSomething=!1;buf=[];sanitizeChildren(n){let t=n.firstChild,i=!0,r=[];for(;t;){if(t.nodeType===Node.ELEMENT_NODE?i=this.startElement(t):t.nodeType===Node.TEXT_NODE?this.chars(t.nodeValue):this.sanitizedSomething=!0,i&&t.firstChild){r.push(t),t=x_(t);continue}for(;t;){t.nodeType===Node.ELEMENT_NODE&&this.endElement(t);let o=M_(t);if(o){t=o;break}t=r.pop()}}return this.buf.join("")}startElement(n){let t=em(n).toLowerCase();if(!Jp.hasOwnProperty(t))return this.sanitizedSomething=!0,!E_.hasOwnProperty(t);this.buf.push("<"),this.buf.push(t);let i=n.attributes;for(let r=0;r<i.length;r++){let o=i.item(r),a=o.name,s=a.toLowerCase();if(!C_.hasOwnProperty(s)){this.sanitizedSomething=!0;continue}let c=o.value;nh[s]&&(c=to(c)),this.buf.push(" ",a,'="',tm(c),'"')}return this.buf.push(">"),!0}endElement(n){let t=em(n).toLowerCase();Jp.hasOwnProperty(t)&&!Jm.hasOwnProperty(t)&&(this.buf.push("</"),this.buf.push(t),this.buf.push(">"))}chars(n){this.buf.push(tm(n))}};function I_(e,n){return(e.compareDocumentPosition(n)&Node.DOCUMENT_POSITION_CONTAINED_BY)!==Node.DOCUMENT_POSITION_CONTAINED_BY}function M_(e){let n=e.nextSibling;if(n&&e!==n.previousSibling)throw ih(n);return n}function x_(e){let n=e.firstChild;if(n&&I_(e,n))throw ih(n);return n}function em(e){let n=e.nodeName;return typeof n=="string"?n:"FORM"}function ih(e){return new Error(`Failed to sanitize html because the element is clobbered: ${e.outerHTML}`)}var T_=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,S_=/([^\#-~ |!])/g;function tm(e){return e.replace(/&/g,"&amp;").replace(T_,function(n){let t=n.charCodeAt(0),i=n.charCodeAt(1);return"&#"+((t-55296)*1024+(i-56320)+65536)+";"}).replace(S_,function(n){return"&#"+n.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}var Fa;function Pd(e,n){let t=null;try{Fa=Fa||h_(e);let i=n?String(n):"";t=Fa.getInertBodyElement(i);let r=5,o=i;do{if(r===0)throw new Error("Failed to sanitize html because the input is unstable");r--,i=o,o=t.innerHTML,t=Fa.getInertBodyElement(i)}while(i!==o);let s=new td().sanitizeChildren(nm(t)||t);return ns(s)}finally{if(t){let i=nm(t)||t;for(;i.firstChild;)i.firstChild.remove()}}}function nm(e){return"content"in e&&A_(e)?e.content:null}function A_(e){return e.nodeType===Node.ELEMENT_NODE&&e.nodeName==="TEMPLATE"}function k_(e,n){return e.createText(n)}function N_(e,n,t){e.setValue(n,t)}function rh(e,n,t){return e.createElement(n,t)}function Ga(e,n,t,i,r){e.insertBefore(n,t,i,r)}function oh(e,n,t){e.appendChild(n,t)}function im(e,n,t,i,r){i!==null?Ga(e,n,t,i,r):oh(e,n,t)}function ah(e,n,t,i){e.removeChild(null,n,t,i)}function R_(e,n,t){e.setAttribute(n,"style",t)}function O_(e,n,t){t===""?e.removeAttribute(n,"class"):e.setAttribute(n,"class",t)}function sh(e,n,t){let{mergedAttrs:i,classes:r,styles:o}=t;i!==null&&Wy(e,n,i),r!==null&&O_(e,n,r),o!==null&&R_(e,n,o)}var Oe=(function(e){return e[e.NONE=0]="NONE",e[e.HTML=1]="HTML",e[e.STYLE=2]="STYLE",e[e.SCRIPT=3]="SCRIPT",e[e.URL=4]="URL",e[e.RESOURCE_URL=5]="RESOURCE_URL",e})(Oe||{});function is(e){let n=F_();return n?n.sanitize(Oe.URL,e)||"":Sn(e,"URL")?Bt(e):to(Oi(e))}function F_(){let e=k();return e&&e[yt].sanitizer}function P_(e,n,t){let i=e.length;for(;;){let r=e.indexOf(n,t);if(r===-1)return r;if(r===0||e.charCodeAt(r-1)<=32){let o=n.length;if(r+o===i||e.charCodeAt(r+o)<=32)return r}t=r+1}}var ch="ng-template";function L_(e,n,t,i){let r=0;if(i){for(;r<n.length&&typeof n[r]=="string";r+=2)if(n[r]==="class"&&P_(n[r+1].toLowerCase(),t,0)!==-1)return!0}else if(Ld(e))return!1;if(r=n.indexOf(1,r),r>-1){let o;for(;++r<n.length&&typeof(o=n[r])=="string";)if(o.toLowerCase()===t)return!0}return!1}function Ld(e){return e.type===4&&e.value!==ch}function V_(e,n,t){let i=e.type===4&&!t?ch:e.value;return n===i}function j_(e,n,t){let i=4,r=e.attrs,o=r!==null?U_(r):0,a=!1;for(let s=0;s<n.length;s++){let c=n[s];if(typeof c=="number"){if(!a&&!wt(i)&&!wt(c))return!1;if(a&&wt(c))continue;a=!1,i=c|i&1;continue}if(!a)if(i&4){if(i=2|i&1,c!==""&&!V_(e,c,t)||c===""&&n.length===1){if(wt(i))return!1;a=!0}}else if(i&8){if(r===null||!L_(e,r,c,t)){if(wt(i))return!1;a=!0}}else{let l=n[++s],d=B_(c,r,Ld(e),t);if(d===-1){if(wt(i))return!1;a=!0;continue}if(l!==""){let f;if(d>o?f="":f=r[d+1].toLowerCase(),i&2&&l!==f){if(wt(i))return!1;a=!0}}}}return wt(i)||a}function wt(e){return(e&1)===0}function B_(e,n,t,i){if(n===null)return-1;let r=0;if(i||!t){let o=!1;for(;r<n.length;){let a=n[r];if(a===e)return r;if(a===3||a===6)o=!0;else if(a===1||a===2){let s=n[++r];for(;typeof s=="string";)s=n[++r];continue}else{if(a===4)break;if(a===0){r+=4;continue}}r+=o?1:2}return-1}else return $_(n,e)}function lh(e,n,t=!1){for(let i=0;i<n.length;i++)if(j_(e,n[i],t))return!0;return!1}function H_(e){let n=e.attrs;if(n!=null){let t=n.indexOf(5);if((t&1)===0)return n[t+1]}return null}function U_(e){for(let n=0;n<e.length;n++){let t=e[n];if(Sm(t))return n}return e.length}function $_(e,n){let t=e.indexOf(4);if(t>-1)for(t++;t<e.length;){let i=e[t];if(typeof i=="number")return-1;if(i===n)return t;t++}return-1}function z_(e,n){e:for(let t=0;t<n.length;t++){let i=n[t];if(e.length===i.length){for(let r=0;r<e.length;r++)if(e[r]!==i[r])continue e;return!0}}return!1}function rm(e,n){return e?":not("+n.trim()+")":n}function G_(e){let n=e[0],t=1,i=2,r="",o=!1;for(;t<e.length;){let a=e[t];if(typeof a=="string")if(i&2){let s=e[++t];r+="["+a+(s.length>0?'="'+s+'"':"")+"]"}else i&8?r+="."+a:i&4&&(r+=" "+a);else r!==""&&!wt(a)&&(n+=rm(o,r),r=""),i=a,o=o||!wt(i);t++}return r!==""&&(n+=rm(o,r)),n}function W_(e){return e.map(G_).join(",")}function q_(e){let n=[],t=[],i=1,r=2;for(;i<e.length;){let o=e[i];if(typeof o=="string")r===2?o!==""&&n.push(o,e[++i]):r===8&&t.push(o);else{if(!wt(r))break;r=o}i++}return t.length&&n.push(1,...t),n}var Je={};function Vd(e,n,t,i,r,o,a,s,c,l,d){let f=_e+i,m=f+r,p=Z_(f,m),h=typeof l=="function"?l():l;return p[I]={type:e,blueprint:p,template:t,queries:null,viewQuery:s,declTNode:n,data:p.slice().fill(null,f),bindingStartIndex:f,expandoStartIndex:m,hostBindingOpCodes:null,firstCreatePass:!0,firstUpdatePass:!0,staticViewQueries:!1,staticContentQueries:!1,preOrderHooks:null,preOrderCheckHooks:null,contentHooks:null,contentCheckHooks:null,viewHooks:null,viewCheckHooks:null,destroyHooks:null,cleanup:null,contentQueries:null,components:null,directiveRegistry:typeof o=="function"?o():o,pipeRegistry:typeof a=="function"?a():a,firstChild:null,schemas:c,consts:h,incompleteFirstPass:!1,ssrId:d}}function Z_(e,n){let t=[];for(let i=0;i<n;i++)t.push(i<e?null:Je);return t}function K_(e){let n=e.tView;return n===null||n.incompleteFirstPass?e.tView=Vd(1,null,e.template,e.decls,e.vars,e.directiveDefs,e.pipeDefs,e.viewQuery,e.schemas,e.consts,e.id):n}function jd(e,n,t,i,r,o,a,s,c,l,d){let f=n.blueprint.slice();return f[bt]=r,f[S]=i|4|128|8|64|1024,(l!==null||e&&e[S]&2048)&&(f[S]|=2048),ul(f),f[Ce]=f[Jn]=e,f[ye]=t,f[yt]=a||e&&e[yt],f[le]=s||e&&e[le],f[Jt]=c||e&&e[Jt]||null,f[Le]=o,f[en]=a_(),f[Xn]=d,f[al]=l,f[Ve]=n.type==2?e[Ve]:f,f}function Q_(e,n,t){let i=rt(n,e),r=K_(t),o=e[yt].rendererFactory,a=Bd(e,jd(e,r,null,dh(t),i,n,null,o.createRenderer(i,t),null,null,null));return e[n.index]=a}function dh(e){let n=16;return e.signals?n=4096:e.onPush&&(n=64),n}function uh(e,n,t,i){if(t===0)return-1;let r=n.length;for(let o=0;o<t;o++)n.push(i),e.blueprint.push(i),e.data.push(null);return r}function Bd(e,n){return e[ji]?e[ol][nt]=n:e[ji]=n,e[ol]=n,n}function _(e=1){fh(ge(),k(),Lt()+e,!1)}function fh(e,n,t,i){if(!i)if((n[S]&3)===3){let o=e.preOrderCheckHooks;o!==null&&La(n,o,t)}else{let o=e.preOrderHooks;o!==null&&Va(n,o,0,t)}In(t)}var rs=(function(e){return e[e.None=0]="None",e[e.SignalBased=1]="SignalBased",e[e.HasDecoratorInputTransform=2]="HasDecoratorInputTransform",e})(rs||{});function nd(e,n,t,i){let r=M(null);try{let[o,a,s]=e.inputs[t],c=null;(a&rs.SignalBased)!==0&&(c=n[o][Te]),c!==null&&c.transformFn!==void 0?i=c.transformFn(i):s!==null&&(i=s.call(n,i)),e.setInput!==null?e.setInput(n,c,i,t,o):Cm(n,c,o,i)}finally{M(r)}}var rn=(function(e){return e[e.Important=1]="Important",e[e.DashCase=2]="DashCase",e})(rn||{}),Y_;function Hd(e,n){return Y_(e,n)}var lR=typeof document<"u"&&typeof document?.documentElement?.getAnimations=="function";var id=new WeakMap,Wr=new WeakSet;function X_(e,n){let t=id.get(e);if(!t||t.length===0)return;let i=n.parentNode,r=n.previousSibling;for(let o=t.length-1;o>=0;o--){let a=t[o],s=a.parentNode;a===n?(t.splice(o,1),Wr.add(a),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}}))):(r&&a===r||s&&i&&s!==i)&&(t.splice(o,1),a.dispatchEvent(new CustomEvent("animationend",{detail:{cancel:!0}})),a.parentNode?.removeChild(a))}}function J_(e,n){let t=id.get(e);t?t.includes(n)||t.push(n):id.set(e,[n])}var ci=new Set,os=(function(e){return e[e.CHANGE_DETECTION=0]="CHANGE_DETECTION",e[e.AFTER_NEXT_RENDER=1]="AFTER_NEXT_RENDER",e})(os||{}),Ht=new v(""),om=new Set;function An(e){om.has(e)||(om.add(e),performance?.mark?.("mark_feature_usage",{detail:{feature:e}}))}var Ud=(()=>{class e{impl=null;execute(){this.impl?.execute()}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})(),ph=[0,1,2,3],mh=(()=>{class e{ngZone=u(R);scheduler=u(Yt);errorHandler=u(He,{optional:!0});sequences=new Set;deferredRegistrations=new Set;executing=!1;constructor(){u(Ht,{optional:!0})}execute(){let t=this.sequences.size>0;t&&X(W.AfterRenderHooksStart),this.executing=!0;for(let i of ph)for(let r of this.sequences)if(!(r.erroredOrDestroyed||!r.hooks[i]))try{r.pipelinedValue=this.ngZone.runOutsideAngular(()=>this.maybeTrace(()=>{let o=r.hooks[i];return o(r.pipelinedValue)},r.snapshot))}catch(o){r.erroredOrDestroyed=!0,this.errorHandler?.handleError(o)}this.executing=!1;for(let i of this.sequences)i.afterRun(),i.once&&(this.sequences.delete(i),i.destroy());for(let i of this.deferredRegistrations)this.sequences.add(i);this.deferredRegistrations.size>0&&this.scheduler.notify(7),this.deferredRegistrations.clear(),t&&X(W.AfterRenderHooksEnd)}register(t){let{view:i}=t;i!==void 0?((i[ti]??=[]).push(t),ri(i),i[S]|=8192):this.executing?this.deferredRegistrations.add(t):this.addSequence(t)}addSequence(t){this.sequences.add(t),this.scheduler.notify(7)}unregister(t){this.executing&&this.sequences.has(t)?(t.erroredOrDestroyed=!0,t.pipelinedValue=void 0,t.once=!0):(this.sequences.delete(t),this.deferredRegistrations.delete(t))}maybeTrace(t,i){return i?i.run(os.AFTER_NEXT_RENDER,t):t()}static \u0275prov=b({token:e,providedIn:"root",factory:()=>new e})}return e})(),Wa=class{impl;hooks;view;once;snapshot;erroredOrDestroyed=!1;pipelinedValue=void 0;unregisterOnDestroy;constructor(n,t,i,r,o,a=null){this.impl=n,this.hooks=t,this.view=i,this.once=r,this.snapshot=a,this.unregisterOnDestroy=o?.onDestroy(()=>this.destroy())}afterRun(){this.erroredOrDestroyed=!1,this.pipelinedValue=void 0,this.snapshot?.dispose(),this.snapshot=null}destroy(){this.impl.unregister(this),this.unregisterOnDestroy?.();let n=this.view?.[ti];n&&(this.view[ti]=n.filter(t=>t!==this))}};function kn(e,n){let t=n?.injector??u(ae);return An("NgAfterNextRender"),t0(e,t,n,!0)}function e0(e){return e instanceof Function?[void 0,void 0,e,void 0]:[e.earlyRead,e.write,e.mixedReadWrite,e.read]}function t0(e,n,t,i){let r=n.get(Ud);r.impl??=n.get(mh);let o=n.get(Ht,null,{optional:!0}),a=t?.manualCleanup!==!0?n.get(Dt):null,s=n.get(zr,null,{optional:!0}),c=new Wa(r.impl,e0(e),s?.view,i,a,o?.snapshot(null));return r.impl.register(c),c}var hh=new v("",{factory:()=>({queue:new Set,isScheduled:!1,scheduler:null,injector:u(Ie)})});function gh(e,n,t){let i=e.get(hh);if(Array.isArray(n))for(let r of n)i.queue.add(r),t?.detachedLeaveAnimationFns?.push(r);else i.queue.add(n),t?.detachedLeaveAnimationFns?.push(n);i.scheduler&&i.scheduler(e)}function n0(e,n){let t=e.get(hh);if(n.detachedLeaveAnimationFns){for(let i of n.detachedLeaveAnimationFns)t.queue.delete(i);n.detachedLeaveAnimationFns=void 0}}function i0(e,n){for(let[t,i]of n)gh(e,i.animateFns)}function am(e,n,t,i){let r=e?.[wn]?.enter;n!==null&&r&&r.has(t.index)&&i0(i,r)}function zi(e,n,t,i,r,o,a,s){if(r!=null){let c,l=!1;_t(r)?c=r:tn(r)&&(l=!0,r=r[bt]);let d=it(r);e===0&&i!==null?(am(s,i,o,t),a==null?oh(n,i,d):Ga(n,i,d,a||null,!0)):e===1&&i!==null?(am(s,i,o,t),Ga(n,i,d,a||null,!0),X_(o,d)):e===2?(s?.[wn]?.leave?.has(o.index)&&J_(o,d),Wr.delete(d),sm(s,o,t,f=>{if(Wr.has(d)){Wr.delete(d);return}ah(n,d,l,f)})):e===3&&(Wr.delete(d),sm(s,o,t,()=>{n.destroyNode(d)})),c!=null&&m0(n,e,t,c,o,i,a)}}function r0(e,n){vh(e,n),n[bt]=null,n[Le]=null}function o0(e,n,t,i,r,o){i[bt]=r,i[Le]=n,ss(e,i,t,1,r,o)}function vh(e,n){n[yt].changeDetectionScheduler?.notify(9),ss(e,n,n[le],2,null,null)}function a0(e){let n=e[ji];if(!n)return Ol(e[I],e);for(;n;){let t=null;if(tn(n))t=n[ji];else{let i=n[he];i&&(t=i)}if(!t){for(;n&&!n[nt]&&n!==e;)tn(n)&&Ol(n[I],n),n=n[Ce];n===null&&(n=e),tn(n)&&Ol(n[I],n),t=n&&n[nt]}n=t}}function $d(e,n){let t=e[ni],i=t.indexOf(n);t.splice(i,1)}function as(e,n){if(ii(n))return;let t=n[le];t.destroyNode&&ss(e,n,t,3,null,null),a0(n)}function Ol(e,n){if(ii(n))return;let t=M(null);try{n[S]&=-129,n[S]|=256,n[Ze]&&Fn(n[Ze]),l0(e,n),c0(e,n),n[I].type===1&&n[le].destroy();let i=n[Dn];if(i!==null&&_t(n[Ce])){i!==n[Ce]&&$d(i,n);let r=n[Ot];r!==null&&r.detachView(e)}Wl(n)}finally{M(t)}}function sm(e,n,t,i){let r=e?.[wn];if(r==null||r.leave==null||!r.leave.has(n.index))return i(!1);e&&ci.add(e[en]),gh(t,()=>{if(r.leave&&r.leave.has(n.index)){let a=r.leave.get(n.index),s=[];if(a){for(let c=0;c<a.animateFns.length;c++){let l=a.animateFns[c],{promise:d}=l();s.push(d)}r.detachedLeaveAnimationFns=void 0}r.running=Promise.allSettled(s),s0(e,i)}else e&&ci.delete(e[en]),i(!1)},r)}function s0(e,n){let t=e[wn]?.running;if(t){t.then(()=>{e[wn].running=void 0,ci.delete(e[en]),n(!0)});return}n(!1)}function c0(e,n){let t=e.cleanup,i=n[Vi];if(t!==null)for(let a=0;a<t.length-1;a+=2)if(typeof t[a]=="string"){let s=t[a+3];s>=0?i[s]():i[-s].unsubscribe(),a+=2}else{let s=i[t[a+1]];t[a].call(s)}i!==null&&(n[Vi]=null);let r=n[Qt];if(r!==null){n[Qt]=null;for(let a=0;a<r.length;a++){let s=r[a];s()}}let o=n[vn];if(o!==null){n[vn]=null;for(let a of o)a.destroy()}}function l0(e,n){let t;if(e!=null&&(t=e.destroyHooks)!=null)for(let i=0;i<t.length;i+=2){let r=n[t[i]];if(!(r instanceof si)){let o=t[i+1];if(Array.isArray(o))for(let a=0;a<o.length;a+=2){let s=r[o[a]],c=o[a+1];X(W.LifecycleHookStart,s,c);try{c.call(s)}finally{X(W.LifecycleHookEnd,s,c)}}else{X(W.LifecycleHookStart,r,o);try{o.call(r)}finally{X(W.LifecycleHookEnd,r,o)}}}}}function bh(e,n,t){return d0(e,n.parent,t)}function d0(e,n,t){let i=n;for(;i!==null&&i.type&168;)n=i,i=n.parent;if(i===null)return t[bt];if(Ft(i)){let{encapsulation:r}=e.data[i.directiveStart+i.componentOffset];if(r===Et.None||r===Et.Emulated)return null}return rt(i,t)}function yh(e,n,t){return f0(e,n,t)}function u0(e,n,t){return e.type&40?rt(e,t):null}var f0=u0,cm;function zd(e,n,t,i){let r=bh(e,i,n),o=n[le],a=i.parent||n[Le],s=yh(a,i,n);if(r!=null)if(Array.isArray(t))for(let c=0;c<t.length;c++)im(o,r,t[c],s,!1);else im(o,r,t,s,!1);cm!==void 0&&cm(o,i,n,t,r)}function qr(e,n){if(n!==null){let t=n.type;if(t&3)return rt(n,e);if(t&4)return rd(-1,e[n.index]);if(t&8){let i=n.child;if(i!==null)return qr(e,i);{let r=e[n.index];return _t(r)?rd(-1,r):it(r)}}else{if(t&128)return qr(e,n.next);if(t&32)return Hd(n,e)()||it(e[n.index]);{let i=_h(e,n);if(i!==null){if(Array.isArray(i))return i[0];let r=bn(e[Ve]);return qr(r,i)}else return qr(e,n.next)}}}return null}function _h(e,n){if(n!==null){let i=e[Ve][Le],r=n.projection;return i.projection[r]}return null}function rd(e,n){let t=he+e+1;if(t<n.length){let i=n[t],r=i[I].firstChild;if(r!==null)return qr(i,r)}return n[Cn]}function Gd(e,n,t,i,r,o,a){for(;t!=null;){let s=i[Jt];if(t.type===128){t=t.next;continue}let c=i[t.index],l=t.type;if(a&&n===0&&(c&&qi(it(c),i),t.flags|=2),!ts(t))if(l&8)Gd(e,n,t.child,i,r,o,!1),zi(n,e,s,r,c,t,o,i);else if(l&32){let d=Hd(t,i),f;for(;f=d();)zi(n,e,s,r,f,t,o,i);zi(n,e,s,r,c,t,o,i)}else l&16?Dh(e,n,i,t,r,o):zi(n,e,s,r,c,t,o,i);t=a?t.projectionNext:t.next}}function ss(e,n,t,i,r,o){Gd(t,i,e.firstChild,n,r,o,!1)}function p0(e,n,t){let i=n[le],r=bh(e,t,n),o=t.parent||n[Le],a=yh(o,t,n);Dh(i,0,n,t,r,a)}function Dh(e,n,t,i,r,o){let a=t[Ve],c=a[Le].projection[i.projection];if(Array.isArray(c))for(let l=0;l<c.length;l++){let d=c[l];zi(n,e,t[Jt],r,d,i,o,t)}else{let l=c,d=a[Ce];Bm(i)&&(l.flags|=128),Gd(e,n,l,d,r,o,!0)}}function m0(e,n,t,i,r,o,a){let s=i[Cn],c=it(i);s!==c&&zi(n,e,t,o,s,r,a);for(let l=he;l<i.length;l++){let d=i[l];ss(d[I],d,e,n,o,s)}}function h0(e,n,t,i,r){if(n)r?e.addClass(t,i):e.removeClass(t,i);else{let o=i.indexOf("-")===-1?void 0:rn.DashCase;r==null?e.removeStyle(t,i,o):(typeof r=="string"&&r.endsWith("!important")&&(r=r.slice(0,-10),o|=rn.Important),e.setStyle(t,i,r,o))}}function wh(e,n,t,i,r){let o=Lt(),a=i&2;try{In(-1),a&&n.length>_e&&fh(e,n,_e,!1);let s=a?W.TemplateUpdateStart:W.TemplateCreateStart;X(s,r,t),t(i,r)}finally{In(o);let s=a?W.TemplateUpdateEnd:W.TemplateCreateEnd;X(s,r,t)}}function Wd(e,n,t){D0(e,n,t),(t.flags&64)===64&&w0(e,n,t)}function cs(e,n,t=rt){let i=n.localNames;if(i!==null){let r=n.index+1;for(let o=0;o<i.length;o+=2){let a=i[o+1],s=a===-1?t(n,e):e[a];e[r++]=s}}}function g0(e,n,t,i){let o=i.get(Zm,qm)||t===Et.ShadowDom||t===Et.ExperimentalIsolatedShadowDom,a=e.selectRootElement(n,o);return v0(a),a}function v0(e){b0(e)}var b0=()=>null;function y0(e){return e==="class"?"className":e==="for"?"htmlFor":e==="formaction"?"formAction":e==="innerHtml"?"innerHTML":e==="readonly"?"readOnly":e==="tabindex"?"tabIndex":e}function _0(e,n,t,i,r,o){let a=n[I];if(ls(e,a,n,t,i)){Ft(e)&&Eh(n,e.index);return}e.type&3&&(t=y0(t)),Ch(e,n,t,i,r,o)}function Ch(e,n,t,i,r,o){if(e.type&3){let a=rt(e,n);i=o!=null?o(i,e.value||"",t):i,r.setProperty(a,t,i)}else e.type&12}function Eh(e,n){let t=ot(n,e);t[S]&16||(t[S]|=64)}function D0(e,n,t){let i=t.directiveStart,r=t.directiveEnd;Ft(t)&&Q_(n,t,e.data[i+t.componentOffset]),e.firstCreatePass||za(t,n);let o=t.initialInputs;for(let a=i;a<r;a++){let s=e.data[a],c=Kr(n,e,a,t);if(qi(c,n),o!==null&&I0(n,a-i,c,s,t,o),Pt(s)){let l=ot(t.index,n);l[ye]=Kr(n,e,a,t)}}}function w0(e,n,t){let i=t.directiveStart,r=t.directiveEnd,o=t.index,a=Tp();try{In(o);for(let s=i;s<r;s++){let c=e.data[s],l=n[s];Ma(s),(c.hostBindings!==null||c.hostVars!==0||c.hostAttrs!==null)&&C0(c,l)}}finally{In(-1),Ma(a)}}function C0(e,n){e.hostBindings!==null&&e.hostBindings(1,n)}function Ih(e,n){let t=e.directiveRegistry,i=null;if(t)for(let r=0;r<t.length;r++){let o=t[r];lh(n,o.selectors,!1)&&(i??=[],Pt(o)?i.unshift(o):i.push(o))}return i}function E0(e,n,t,i,r,o){let a=rt(e,n);Mh(n[le],a,o,e.value,t,i,r)}function Mh(e,n,t,i,r,o,a){if(o==null)e.removeAttribute(n,r,t);else{let s=a==null?Oi(o):a(o,i||"",r);e.setAttribute(n,r,s,t)}}function I0(e,n,t,i,r,o){let a=o[n];if(a!==null)for(let s=0;s<a.length;s+=2){let c=a[s],l=a[s+1];nd(i,t,c,l)}}function xh(e,n,t,i,r){let o=_e+t,a=n[I],s=r(a,n,e,i,t);n[o]=s,Hi(e,!0);let c=e.type===2;return c?(sh(n[le],s,e),(_p()===0||Br(e))&&qi(s,n),Dp()):qi(s,n),Aa()&&(!c||!ts(e))&&zd(a,n,s,e),e}function Th(e){let n=e;return wl()?Cl():(n=n.parent,Hi(n,!1)),n}function M0(e,n){let t=e[Jt];if(!t)return;let i;try{i=t.get(Mn,null)}catch{i=null}i?.(n)}function ls(e,n,t,i,r){let o=e.inputs?.[i],a=e.hostDirectiveInputs?.[i],s=!1;if(a)for(let c=0;c<a.length;c+=2){let l=a[c],d=a[c+1],f=n.data[l];nd(f,t[l],d,r),s=!0}if(o)for(let c of o){let l=t[c],d=n.data[c];nd(d,l,i,r),s=!0}return s}function x0(e,n){let t=ot(n,e),i=t[I];T0(i,t);let r=t[bt];r!==null&&t[Xn]===null&&(t[Xn]=Km(r,t[Jt])),X(W.ComponentStart);try{qd(i,t,t[ye])}finally{X(W.ComponentEnd,t[ye])}}function T0(e,n){for(let t=n.length;t<e.blueprint.length;t++)n.push(e.blueprint[t])}function qd(e,n,t){Ta(n);try{let i=e.viewQuery;i!==null&&ql(1,i,t);let r=e.template;r!==null&&wh(e,n,r,1,t),e.firstCreatePass&&(e.firstCreatePass=!1),n[Ot]?.finishViewCreation(e),e.staticContentQueries&&Qm(e,n),e.staticViewQueries&&ql(2,e.viewQuery,t);let o=e.components;o!==null&&S0(n,o)}catch(i){throw e.firstCreatePass&&(e.incompleteFirstPass=!0,e.firstCreatePass=!1),i}finally{n[S]&=-5,Sa()}}function S0(e,n){for(let t=0;t<n.length;t++)x0(e,n[t])}function io(e,n,t,i){let r=M(null);try{let o=n.tView,s=e[S]&4096?4096:16,c=jd(e,o,t,s,null,n,null,null,i?.injector??null,i?.embeddedViewInjector??null,i?.dehydratedView??null),l=e[n.index];c[Dn]=l;let d=e[Ot];return d!==null&&(c[Ot]=d.createEmbeddedView(o)),qd(o,c,t),c}finally{M(r)}}function Zi(e,n){return!n||n.firstChild===null||Bm(e)}function Qr(e,n,t,i,r=!1){for(;t!==null;){if(t.type===128){t=r?t.projectionNext:t.next;continue}let o=n[t.index];o!==null&&i.push(it(o)),_t(o)&&Sh(o,i);let a=t.type;if(a&8)Qr(e,n,t.child,i);else if(a&32){let s=Hd(t,n),c;for(;c=s();)i.push(c)}else if(a&16){let s=_h(n,t);if(Array.isArray(s))i.push(...s);else{let c=bn(n[Ve]);Qr(c[I],c,s,i,!0)}}t=r?t.projectionNext:t.next}return i}function Sh(e,n){for(let t=he;t<e.length;t++){let i=e[t],r=i[I].firstChild;r!==null&&Qr(i[I],i,r,n)}e[Cn]!==e[bt]&&n.push(e[Cn])}function Ah(e){if(e[ti]!==null){for(let n of e[ti])n.impl.addSequence(n);e[ti].length=0}}var kh=[];function A0(e){return e[Ze]??k0(e)}function k0(e){let n=kh.pop()??Object.create(R0);return n.lView=e,n}function N0(e){e.lView[Ze]!==e&&(e.lView=null,kh.push(e))}var R0=we(F({},_i),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{ri(e.lView)},consumerOnSignalRead(){this.lView[Ze]=this}});function O0(e){let n=e[Ze]??Object.create(F0);return n.lView=e,n}var F0=we(F({},_i),{consumerIsAlwaysLive:!0,kind:"template",consumerMarkedDirty:e=>{let n=bn(e.lView);for(;n&&!Nh(n[I]);)n=bn(n);n&&fl(n)},consumerOnSignalRead(){this.lView[Ze]=this}});function Nh(e){return e.type!==2}function Rh(e){if(e[vn]===null)return;let n=!0;for(;n;){let t=!1;for(let i of e[vn])i.dirty&&(t=!0,i.zone===null||Zone.current===i.zone?i.run():i.zone.run(()=>i.run()));n=t&&!!(e[S]&8192)}}var P0=100;function Oh(e,n=0){let i=e[yt].rendererFactory,r=!1;r||i.begin?.();try{L0(e,n)}finally{r||i.end?.()}}function L0(e,n){let t=El();try{Or(!0),od(e,n);let i=0;for(;Hr(e);){if(i===P0)throw new E(103,!1);i++,od(e,1)}}finally{Or(t)}}function V0(e,n,t,i){if(ii(n))return;let r=n[S],o=!1,a=!1;Ta(n);let s=!0,c=null,l=null;o||(Nh(e)?(l=A0(n),c=Di(l)):Ao()===null?(s=!1,l=O0(n),c=Di(l)):n[Ze]&&(Fn(n[Ze]),n[Ze]=null));try{ul(n),Ip(e.bindingStartIndex),t!==null&&wh(e,n,t,2,i);let d=(r&3)===3;if(!o)if(d){let p=e.preOrderCheckHooks;p!==null&&La(n,p,null)}else{let p=e.preOrderHooks;p!==null&&Va(n,p,0,null),Nl(n,0)}if(a||j0(n),Rh(n),Fh(n,0),e.contentQueries!==null&&Qm(e,n),!o)if(d){let p=e.contentCheckHooks;p!==null&&La(n,p)}else{let p=e.contentHooks;p!==null&&Va(n,p,1),Nl(n,1)}H0(e,n);let f=e.components;f!==null&&Lh(n,f,0);let m=e.viewQuery;if(m!==null&&ql(2,m,i),!o)if(d){let p=e.viewCheckHooks;p!==null&&La(n,p)}else{let p=e.viewHooks;p!==null&&Va(n,p,2),Nl(n,2)}if(e.firstUpdatePass===!0&&(e.firstUpdatePass=!1),n[Da]){for(let p of n[Da])p();n[Da]=null}o||(Ah(n),n[S]&=-73)}catch(d){throw o||ri(n),d}finally{l!==null&&(yr(l,c),s&&N0(l)),Sa()}}function Fh(e,n){for(let t=Um(e);t!==null;t=$m(t))for(let i=he;i<t.length;i++){let r=t[i];Ph(r,n)}}function j0(e){for(let n=Um(e);n!==null;n=$m(n)){if(!(n[S]&2))continue;let t=n[ni];for(let i=0;i<t.length;i++){let r=t[i];fl(r)}}}function B0(e,n,t){X(W.ComponentStart);let i=ot(n,e);try{Ph(i,t)}finally{X(W.ComponentEnd,i[ye])}}function Ph(e,n){Ca(e)&&od(e,n)}function od(e,n){let i=e[I],r=e[S],o=e[Ze],a=!!(n===0&&r&16);if(a||=!!(r&64&&n===0),a||=!!(r&1024),a||=!!(o?.dirty&&_r(o)),a||=!1,o&&(o.dirty=!1),e[S]&=-9217,a)V0(i,e,i.template,e[ye]);else if(r&8192){let s=M(null);try{Rh(e),Fh(e,1);let c=i.components;c!==null&&Lh(e,c,1),Ah(e)}finally{M(s)}}}function Lh(e,n,t){for(let i=0;i<n.length;i++)B0(e,n[i],t)}function H0(e,n){let t=e.hostBindingOpCodes;if(t!==null)try{for(let i=0;i<t.length;i++){let r=t[i];if(r<0)In(~r);else{let o=r,a=t[++i],s=t[++i];xp(a,o);let c=n[o];X(W.HostBindingsUpdateStart,c);try{s(2,c)}finally{X(W.HostBindingsUpdateEnd,c)}}}}finally{In(-1)}}function Zd(e,n){let t=El()?64:1088;for(e[yt].changeDetectionScheduler?.notify(n);e;){e[S]|=t;let i=bn(e);if(Bi(e)&&!i)return e;e=i}return null}function Vh(e,n,t,i){return[e,!0,0,n,null,i,null,t,null,null]}function jh(e,n){let t=he+n;if(t<e.length)return e[t]}function ro(e,n,t,i=!0){let r=n[I];if(U0(r,n,e,t),i){let a=rd(t,e),s=n[le],c=s.parentNode(e[Cn]);c!==null&&o0(r,e[Le],s,n,c,a)}let o=n[Xn];o!==null&&o.firstChild!==null&&(o.firstChild=null)}function Bh(e,n){let t=Yr(e,n);return t!==void 0&&as(t[I],t),t}function Yr(e,n){if(e.length<=he)return;let t=he+n,i=e[t];if(i){let r=i[Dn];r!==null&&r!==e&&$d(r,i),n>0&&(e[t-1][nt]=i[nt]);let o=Lr(e,he+n);r0(i[I],i);let a=o[Ot];a!==null&&a.detachView(o[I]),i[Ce]=null,i[nt]=null,i[S]&=-129}return i}function U0(e,n,t,i){let r=he+i,o=t.length;i>0&&(t[r-1][nt]=n),i<o-he?(n[nt]=t[r],Jc(t,he+i,n)):(t.push(n),n[nt]=null),n[Ce]=t;let a=n[Dn];a!==null&&t!==a&&Hh(a,n);let s=n[Ot];s!==null&&s.insertView(e),Ea(n),n[S]|=128}function Hh(e,n){let t=e[ni],i=n[Ce];if(tn(i))e[S]|=2;else{let r=i[Ce][Ve];n[Ve]!==r&&(e[S]|=2)}t===null?e[ni]=[n]:t.push(n)}var xn=class{_lView;_cdRefInjectingView;_appRef=null;_attachedToViewContainer=!1;exhaustive;get rootNodes(){let n=this._lView,t=n[I];return Qr(t,n,t.firstChild,[])}constructor(n,t){this._lView=n,this._cdRefInjectingView=t}get context(){return this._lView[ye]}set context(n){this._lView[ye]=n}get destroyed(){return ii(this._lView)}destroy(){if(this._appRef)this._appRef.detachView(this);else if(this._attachedToViewContainer){let n=this._lView[Ce];if(_t(n)){let t=n[jr],i=t?t.indexOf(this):-1;i>-1&&(Yr(n,i),Lr(t,i))}this._attachedToViewContainer=!1}as(this._lView[I],this._lView)}onDestroy(n){pl(this._lView,n)}markForCheck(){Zd(this._cdRefInjectingView||this._lView,4)}detach(){this._lView[S]&=-129}reattach(){Ea(this._lView),this._lView[S]|=128}detectChanges(){this._lView[S]|=1024,Oh(this._lView)}checkNoChanges(){}attachToViewContainerRef(){if(this._appRef)throw new E(902,!1);this._attachedToViewContainer=!0}detachFromAppRef(){this._appRef=null;let n=Bi(this._lView),t=this._lView[Dn];t!==null&&!n&&$d(t,this._lView),vh(this._lView[I],this._lView)}attachToAppRef(n){if(this._attachedToViewContainer)throw new E(902,!1);this._appRef=n;let t=Bi(this._lView),i=this._lView[Dn];i!==null&&!t&&Hh(i,this._lView),Ea(this._lView)}};var Xe=(()=>{class e{_declarationLView;_declarationTContainer;elementRef;static __NG_ELEMENT_ID__=$0;constructor(t,i,r){this._declarationLView=t,this._declarationTContainer=i,this.elementRef=r}get ssrId(){return this._declarationTContainer.tView?.ssrId||null}createEmbeddedView(t,i){return this.createEmbeddedViewImpl(t,i)}createEmbeddedViewImpl(t,i,r){let o=io(this._declarationLView,this._declarationTContainer,t,{embeddedViewInjector:i,dehydratedView:r});return new xn(o)}}return e})();function $0(){return Kd(Re(),k())}function Kd(e,n){return e.type&4?new Xe(n,e,Ji(e,n)):null}function tr(e,n,t,i,r){let o=e.data[n];if(o===null)o=z0(e,n,t,i,r),Mp()&&(o.flags|=32);else if(o.type&64){o.type=t,o.value=i,o.attrs=r;let a=wp();o.injectorIndex=a===null?-1:a.injectorIndex}return Hi(o,!0),o}function z0(e,n,t,i,r){let o=Dl(),a=wl(),s=a?o:o&&o.parent,c=e.data[n]=W0(e,s,t,n,i,r);return G0(e,c,o,a),c}function G0(e,n,t,i){e.firstChild===null&&(e.firstChild=n),t!==null&&(i?t.child==null&&n.parent!==null&&(t.child=n):t.next===null&&(t.next=n,n.prev=t))}function W0(e,n,t,i,r,o){let a=n?n.injectorIndex:-1,s=0;return bl()&&(s|=128),{type:t,index:i,insertBeforeIndex:null,injectorIndex:a,directiveStart:-1,directiveEnd:-1,directiveStylingLast:-1,componentOffset:-1,controlDirectiveIndex:-1,customControlIndex:-1,propertyBindings:null,flags:s,providerIndexes:0,value:r,attrs:o,mergedAttrs:null,localNames:null,initialInputs:null,inputs:null,hostDirectiveInputs:null,outputs:null,hostDirectiveOutputs:null,directiveToIndex:null,tView:null,next:null,prev:null,projectionNext:null,child:null,parent:n,projection:null,styles:null,stylesWithoutHost:null,residualStyles:void 0,classes:null,classesWithoutHost:null,residualClasses:void 0,classBindings:0,styleBindings:0}}function q0(e){let n=e[sl]??[],i=e[Ce][le],r=[];for(let o of n)o.data[Wm]!==void 0?r.push(o):Z0(o,i);e[sl]=r}function Z0(e,n){let t=0,i=e.firstChild;if(i){let r=e.data[Gm];for(;t<r;){let o=i.nextSibling;ah(n,i,!1),i=o,t++}}}var K0=()=>null,Q0=()=>null;function qa(e,n){return K0(e,n)}function Uh(e,n,t){return Q0(e,n,t)}var $h=class{},ds=class{},ad=class{resolveComponentFactory(n){throw new E(917,!1)}},us=class{static NULL=new ad},Ue=class{},et=(()=>{class e{destroyNode=null;static __NG_ELEMENT_ID__=()=>Y0()}return e})();function Y0(){let e=k(),n=Re(),t=ot(n.index,e);return(tn(t)?t:e)[le]}var zh=(()=>{class e{static \u0275prov=b({token:e,providedIn:"root",factory:()=>null})}return e})();var Ba={},sd=class{injector;parentInjector;constructor(n,t){this.injector=n,this.parentInjector=t}get(n,t,i){let r=this.injector.get(n,Ba,i);return r!==Ba||t===Ba?r:this.parentInjector.get(n,t,i)}};function Za(e,n,t){let i=t?e.styles:null,r=t?e.classes:null,o=0;if(n!==null)for(let a=0;a<n.length;a++){let s=n[a];if(typeof s=="number")o=s;else if(o==1)r=ma(r,s);else if(o==2){let c=s,l=n[++a];i=ma(i,c+": "+l+";")}}t?e.styles=i:e.stylesWithoutHost=i,t?e.classes=r:e.classesWithoutHost=r}function nr(e,n=0){let t=k();if(t===null)return T(e,n);let i=Re();return Pm(i,t,Se(e),n)}function Gh(e,n,t,i,r){let o=i===null?null:{"":-1},a=r(e,t);if(a!==null){let s=a,c=null,l=null;for(let d of a)if(d.resolveHostDirectives!==null){[s,c,l]=d.resolveHostDirectives(a);break}eD(e,n,t,s,o,c,l)}o!==null&&i!==null&&X0(t,i,o)}function X0(e,n,t){let i=e.localNames=[];for(let r=0;r<n.length;r+=2){let o=t[n[r+1]];if(o==null)throw new E(-301,!1);i.push(n[r],o)}}function J0(e,n,t){n.componentOffset=t,(e.components??=[]).push(n.index)}function eD(e,n,t,i,r,o,a){let s=i.length,c=null;for(let m=0;m<s;m++){let p=i[m];c===null&&Pt(p)&&(c=p,J0(e,t,m)),zl(za(t,n),e,p.type)}aD(t,e.data.length,s),c?.viewProvidersResolver&&c.viewProvidersResolver(c);for(let m=0;m<s;m++){let p=i[m];p.providersResolver&&p.providersResolver(p)}let l=!1,d=!1,f=uh(e,n,s,null);s>0&&(t.directiveToIndex=new Map);for(let m=0;m<s;m++){let p=i[m];if(t.mergedAttrs=Wi(t.mergedAttrs,p.hostAttrs),nD(e,t,n,f,p),oD(f,p,r),a!==null&&a.has(p)){let[D,w]=a.get(p);t.directiveToIndex.set(p.type,[f,D+t.directiveStart,w+t.directiveStart])}else(o===null||!o.has(p))&&t.directiveToIndex.set(p.type,f);p.contentQueries!==null&&(t.flags|=4),(p.hostBindings!==null||p.hostAttrs!==null||p.hostVars!==0)&&(t.flags|=64);let h=p.type.prototype;!l&&(h.ngOnChanges||h.ngOnInit||h.ngDoCheck)&&((e.preOrderHooks??=[]).push(t.index),l=!0),!d&&(h.ngOnChanges||h.ngDoCheck)&&((e.preOrderCheckHooks??=[]).push(t.index),d=!0),f++}tD(e,t,o)}function tD(e,n,t){for(let i=n.directiveStart;i<n.directiveEnd;i++){let r=e.data[i];if(t===null||!t.has(r))lm(0,n,r,i),lm(1,n,r,i),um(n,i,!1);else{let o=t.get(r);dm(0,n,o,i),dm(1,n,o,i),um(n,i,!0)}}}function lm(e,n,t,i){let r=e===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a;e===0?a=n.inputs??={}:a=n.outputs??={},a[o]??=[],a[o].push(i),Wh(n,o)}}function dm(e,n,t,i){let r=e===0?t.inputs:t.outputs;for(let o in r)if(r.hasOwnProperty(o)){let a=r[o],s;e===0?s=n.hostDirectiveInputs??={}:s=n.hostDirectiveOutputs??={},s[a]??=[],s[a].push(i,o),Wh(n,a)}}function Wh(e,n){n==="class"?e.flags|=8:n==="style"&&(e.flags|=16)}function um(e,n,t){let{attrs:i,inputs:r,hostDirectiveInputs:o}=e;if(i===null||!t&&r===null||t&&o===null||Ld(e)){e.initialInputs??=[],e.initialInputs.push(null);return}let a=null,s=0;for(;s<i.length;){let c=i[s];if(c===0){s+=4;continue}else if(c===5){s+=2;continue}else if(typeof c=="number")break;if(!t&&r.hasOwnProperty(c)){let l=r[c];for(let d of l)if(d===n){a??=[],a.push(c,i[s+1]);break}}else if(t&&o.hasOwnProperty(c)){let l=o[c];for(let d=0;d<l.length;d+=2)if(l[d]===n){a??=[],a.push(l[d+1],i[s+1]);break}}s+=2}e.initialInputs??=[],e.initialInputs.push(a)}function nD(e,n,t,i,r){e.data[i]=r;let o=r.factory||(r.factory=Wn(r.type,!0)),a=new si(o,Pt(r),nr,null);e.blueprint[i]=a,t[i]=a,iD(e,n,i,uh(e,t,r.hostVars,Je),r)}function iD(e,n,t,i,r){let o=r.hostBindings;if(o){let a=e.hostBindingOpCodes;a===null&&(a=e.hostBindingOpCodes=[]);let s=~n.index;rD(a)!=s&&a.push(s),a.push(t,i,o)}}function rD(e){let n=e.length;for(;n>0;){let t=e[--n];if(typeof t=="number"&&t<0)return t}return 0}function oD(e,n,t){if(t){if(n.exportAs)for(let i=0;i<n.exportAs.length;i++)t[n.exportAs[i]]=e;Pt(n)&&(t[""]=e)}}function aD(e,n,t){e.flags|=1,e.directiveStart=n,e.directiveEnd=n+t,e.providerIndexes=n}function qh(e,n,t,i,r,o,a,s){let c=n[I],l=c.consts,d=Ke(l,a),f=tr(c,e,t,i,d);return o&&Gh(c,n,f,Ke(l,s),r),f.mergedAttrs=Wi(f.mergedAttrs,f.attrs),f.attrs!==null&&Za(f,f.attrs,!1),f.mergedAttrs!==null&&Za(f,f.mergedAttrs,!0),c.queries!==null&&c.queries.elementStart(c,f),f}function Zh(e,n){xm(e,n),cl(n)&&e.queries.elementEnd(n)}function sD(e,n,t,i,r,o){let a=n.consts,s=Ke(a,r),c=tr(n,e,t,i,s);if(c.mergedAttrs=Wi(c.mergedAttrs,c.attrs),o!=null){let l=Ke(a,o);c.localNames=[];for(let d=0;d<l.length;d+=2)c.localNames.push(l[d],-1)}return c.attrs!==null&&Za(c,c.attrs,!1),c.mergedAttrs!==null&&Za(c,c.mergedAttrs,!0),n.queries!==null&&n.queries.elementStart(n,c),c}function It(e,n,t){if(t===Je)return!1;let i=e[n];return Object.is(i,t)?!1:(e[n]=t,!0)}function cD(e,n,t,i){let r=It(e,n,t);return It(e,n+1,i)||r}function Fl(e,n,t){return function i(r){let o=i.__ngNativeEl__;o!==void 0&&d_(r,o);let a=Ft(e)?ot(e.index,n):n;Zd(a,5);let s=n[ye],c=fm(n,s,t,r),l=i.__ngNextListenerFn__;for(;l;)c=fm(n,s,l,r)&&c,l=l.__ngNextListenerFn__;return c}}function fm(e,n,t,i){let r=M(null);try{return X(W.OutputStart,n,t),t(i)!==!1}catch(o){return M0(e,o),!1}finally{X(W.OutputEnd,n,t),M(r)}}function lD(e,n,t,i,r,o,a,s){let c=Br(e),l=!1,d=null;if(!i&&c&&(d=uD(n,t,o,e.index)),d!==null){let f=d.__ngLastListenerFn__||d;f.__ngNextListenerFn__=a,d.__ngLastListenerFn__=a,l=!0}else{let f=rt(e,t),m=i?i(f):f;f_(t,m,o,s),i||(s.__ngNativeEl__=f);let p=r.listen(m,o,s);if(!dD(o)){let h=i?D=>i(it(D[e.index])):e.index;Kh(h,n,t,o,s,p,!1)}}return l}function dD(e){return e.startsWith("animation")||e.startsWith("transition")}function uD(e,n,t,i){let r=e.cleanup;if(r!=null)for(let o=0;o<r.length-1;o+=2){let a=r[o];if(a===t&&r[o+1]===i){let s=n[Vi],c=r[o+2];return s&&s.length>c?s[c]:null}typeof a=="string"&&(o+=2)}return null}function Kh(e,n,t,i,r,o,a){let s=n.firstCreatePass?hl(n):null,c=ml(t),l=c.length;c.push(r,o),s&&s.push(i,e,l,(l+1)*(a?-1:1))}function pm(e,n,t,i,r,o){let a=n[t],s=n[I],l=s.data[t].outputs[i],f=a[l].subscribe(o);Kh(e.index,s,n,r,o,f,!0)}var cd=Symbol("BINDING");function Qh(e){return e.debugInfo?.className||e.type.name||null}var ld=class extends us{ngModule;constructor(n){super(),this.ngModule=n}resolveComponentFactory(n){let t=yn(n);return new Ki(t,this.ngModule)}};function fD(e){return Object.keys(e).map(n=>{let[t,i,r]=e[n],o={propName:t,templateName:n,isSignal:(i&rs.SignalBased)!==0};return r&&(o.transform=r),o})}function pD(e){return Object.keys(e).map(n=>({propName:e[n],templateName:n}))}function mD(e,n,t){let i=n instanceof Ie?n:n?.injector;return i&&e.getStandaloneInjector!==null&&(i=e.getStandaloneInjector(i)||i),i?new sd(t,i):t}function hD(e){let n=e.get(Ue,null);if(n===null)throw new E(407,!1);let t=e.get(zh,null),i=e.get(Yt,null),r=e.get(Ht,null,{optional:!0});return{rendererFactory:n,sanitizer:t,changeDetectionScheduler:i,ngReflect:!1,tracingService:r}}function gD(e,n){let t=Yh(e);return rh(n,t,t==="svg"?ll:t==="math"?pp:null)}function Yh(e){return(e.selectors[0][0]||"div").toLowerCase()}var Ki=class extends ds{componentDef;ngModule;selector;componentType;ngContentSelectors;isBoundToModule;cachedInputs=null;cachedOutputs=null;get inputs(){return this.cachedInputs??=fD(this.componentDef.inputs),this.cachedInputs}get outputs(){return this.cachedOutputs??=pD(this.componentDef.outputs),this.cachedOutputs}constructor(n,t){super(),this.componentDef=n,this.ngModule=t,this.componentType=n.type,this.selector=W_(n.selectors),this.ngContentSelectors=n.ngContentSelectors??[],this.isBoundToModule=!!t}create(n,t,i,r,o,a){X(W.DynamicComponentStart);let s=M(null);try{let c=this.componentDef,l=mD(c,r||this.ngModule,n),d=hD(l),f=d.tracingService;return f&&f.componentCreate?f.componentCreate(Qh(c),()=>this.createComponentRef(d,l,t,i,o,a)):this.createComponentRef(d,l,t,i,o,a)}finally{M(s)}}createComponentRef(n,t,i,r,o,a){let s=this.componentDef,c=vD(r,s,a,o),l=n.rendererFactory.createRenderer(null,s),d=r?g0(l,r,s.encapsulation,t):gD(s,l),f=a?.some(mm)||o?.some(h=>typeof h!="function"&&h.bindings.some(mm)),m=jd(null,c,null,512|dh(s),null,null,n,l,t,null,Km(d,t,!0));m[_e]=d,Ta(m);let p=null;try{let h=qh(_e,m,2,"#host",()=>c.directiveRegistry,!0,0);sh(l,d,h),qi(d,m),Wd(c,m,h),Ym(c,h,m),Zh(c,h),i!==void 0&&yD(h,this.ngContentSelectors,i),p=ot(h.index,m),m[ye]=p[ye],qd(c,m,null)}catch(h){throw p!==null&&Wl(p),Wl(m),h}finally{X(W.DynamicComponentEnd),Sa()}return new Ka(this.componentType,m,!!f)}};function vD(e,n,t,i){let r=e?["ng-version","21.2.11"]:q_(n.selectors[0]),o=null,a=null,s=0;if(t)for(let d of t)s+=d[cd].requiredVars,d.create&&(d.targetIdx=0,(o??=[]).push(d)),d.update&&(d.targetIdx=0,(a??=[]).push(d));if(i)for(let d=0;d<i.length;d++){let f=i[d];if(typeof f!="function")for(let m of f.bindings){s+=m[cd].requiredVars;let p=d+1;m.create&&(m.targetIdx=p,(o??=[]).push(m)),m.update&&(m.targetIdx=p,(a??=[]).push(m))}}let c=[n];if(i)for(let d of i){let f=typeof d=="function"?d:d.type,m=Kc(f);c.push(m)}return Vd(0,null,bD(o,a),1,s,c,null,null,null,[r],null)}function bD(e,n){return!e&&!n?null:t=>{if(t&1&&e)for(let i of e)i.create();if(t&2&&n)for(let i of n)i.update()}}function mm(e){let n=e[cd].kind;return n==="input"||n==="twoWay"}var Ka=class extends $h{_rootLView;_hasInputBindings;instance;hostView;changeDetectorRef;componentType;location;previousInputValues=null;_tNode;constructor(n,t,i){super(),this._rootLView=t,this._hasInputBindings=i,this._tNode=wa(t[I],_e),this.location=Ji(this._tNode,t),this.instance=ot(this._tNode.index,t)[ye],this.hostView=this.changeDetectorRef=new xn(t,void 0),this.componentType=n}setInput(n,t){this._hasInputBindings;let i=this._tNode;if(this.previousInputValues??=new Map,this.previousInputValues.has(n)&&Object.is(this.previousInputValues.get(n),t))return;let r=this._rootLView,o=ls(i,r[I],r,n,t);this.previousInputValues.set(n,t);let a=ot(i.index,r);Zd(a,1)}get injector(){return new ai(this._tNode,this._rootLView)}destroy(){this.hostView.destroy()}onDestroy(n){this.hostView.onDestroy(n)}};function yD(e,n,t){let i=e.projection=[];for(let r=0;r<n.length;r++){let o=t[r];i.push(o!=null&&o.length?Array.from(o):null)}}var xt=(()=>{class e{static __NG_ELEMENT_ID__=_D}return e})();function _D(){let e=Re();return Xh(e,k())}var dd=class e extends xt{_lContainer;_hostTNode;_hostLView;constructor(n,t,i){super(),this._lContainer=n,this._hostTNode=t,this._hostLView=i}get element(){return Ji(this._hostTNode,this._hostLView)}get injector(){return new ai(this._hostTNode,this._hostLView)}get parentInjector(){let n=Md(this._hostTNode,this._hostLView);if(Am(n)){let t=$a(n,this._hostLView),i=Ua(n),r=t[I].data[i+8];return new ai(r,t)}else return new ai(null,this._hostLView)}clear(){for(;this.length>0;)this.remove(this.length-1)}get(n){let t=hm(this._lContainer);return t!==null&&t[n]||null}get length(){return this._lContainer.length-he}createEmbeddedView(n,t,i){let r,o;typeof i=="number"?r=i:i!=null&&(r=i.index,o=i.injector);let a=qa(this._lContainer,n.ssrId),s=n.createEmbeddedViewImpl(t||{},o,a);return this.insertImpl(s,r,Zi(this._hostTNode,a)),s}createComponent(n,t,i,r,o,a,s){let c=n&&!Vy(n),l;if(c)l=t;else{let w=t||{};l=w.index,i=w.injector,r=w.projectableNodes,o=w.environmentInjector||w.ngModuleRef,a=w.directives,s=w.bindings}let d=c?n:new Ki(yn(n)),f=i||this.parentInjector;if(!o&&d.ngModule==null){let C=(c?f:this.parentInjector).get(Ie,null);C&&(o=C)}let m=yn(d.componentType??{}),p=qa(this._lContainer,m?.id??null),h=p?.firstChild??null,D=d.create(f,r,h,o,a,s);return this.insertImpl(D.hostView,l,Zi(this._hostTNode,p)),D}insert(n,t){return this.insertImpl(n,t,!0)}insertImpl(n,t,i){let r=n._lView;if(gp(r)){let s=this.indexOf(n);if(s!==-1)this.detach(s);else{let c=r[Ce],l=new e(c,c[Le],c[Ce]);l.detach(l.indexOf(n))}}let o=this._adjustIndex(t),a=this._lContainer;return ro(a,r,o,i),n.attachToViewContainerRef(),Jc(Pl(a),o,n),n}move(n,t){return this.insert(n,t)}indexOf(n){let t=hm(this._lContainer);return t!==null?t.indexOf(n):-1}remove(n){let t=this._adjustIndex(n,-1),i=Yr(this._lContainer,t);i&&(Lr(Pl(this._lContainer),t),as(i[I],i))}detach(n){let t=this._adjustIndex(n,-1),i=Yr(this._lContainer,t);return i&&Lr(Pl(this._lContainer),t)!=null?new xn(i):null}_adjustIndex(n,t=0){return n??this.length+t}};function hm(e){return e[jr]}function Pl(e){return e[jr]||(e[jr]=[])}function Xh(e,n){let t,i=n[e.index];return _t(i)?t=i:(t=Vh(i,n,null,e),n[e.index]=t,Bd(n,t)),wD(t,n,e,i),new dd(t,e,n)}function DD(e,n){let t=e[le],i=t.createComment(""),r=rt(n,e),o=t.parentNode(r);return Ga(t,o,i,t.nextSibling(r),!1),i}var wD=ID,CD=()=>!1;function ED(e,n,t){return CD(e,n,t)}function ID(e,n,t,i){if(e[Cn])return;let r;t.type&8?r=it(i):r=DD(n,t),e[Cn]=r}var ud=class e{queryList;matches=null;constructor(n){this.queryList=n}clone(){return new e(this.queryList)}setDirty(){this.queryList.setDirty()}},fd=class e{queries;constructor(n=[]){this.queries=n}createEmbeddedView(n){let t=n.queries;if(t!==null){let i=n.contentQueries!==null?n.contentQueries[0]:t.length,r=[];for(let o=0;o<i;o++){let a=t.getByIndex(o),s=this.queries[a.indexInDeclarationView];r.push(s.clone())}return new e(r)}return null}insertView(n){this.dirtyQueriesWithMatches(n)}detachView(n){this.dirtyQueriesWithMatches(n)}finishViewCreation(n){this.dirtyQueriesWithMatches(n)}dirtyQueriesWithMatches(n){for(let t=0;t<this.queries.length;t++)Yd(n,t).matches!==null&&this.queries[t].setDirty()}},Qa=class{flags;read;predicate;constructor(n,t,i=null){this.flags=t,this.read=i,typeof n=="string"?this.predicate=kD(n):this.predicate=n}},pd=class e{queries;constructor(n=[]){this.queries=n}elementStart(n,t){for(let i=0;i<this.queries.length;i++)this.queries[i].elementStart(n,t)}elementEnd(n){for(let t=0;t<this.queries.length;t++)this.queries[t].elementEnd(n)}embeddedTView(n){let t=null;for(let i=0;i<this.length;i++){let r=t!==null?t.length:0,o=this.getByIndex(i).embeddedTView(n,r);o&&(o.indexInDeclarationView=i,t!==null?t.push(o):t=[o])}return t!==null?new e(t):null}template(n,t){for(let i=0;i<this.queries.length;i++)this.queries[i].template(n,t)}getByIndex(n){return this.queries[n]}get length(){return this.queries.length}track(n){this.queries.push(n)}},md=class e{metadata;matches=null;indexInDeclarationView=-1;crossesNgTemplate=!1;_declarationNodeIndex;_appliesToNextNode=!0;constructor(n,t=-1){this.metadata=n,this._declarationNodeIndex=t}elementStart(n,t){this.isApplyingToNode(t)&&this.matchTNode(n,t)}elementEnd(n){this._declarationNodeIndex===n.index&&(this._appliesToNextNode=!1)}template(n,t){this.elementStart(n,t)}embeddedTView(n,t){return this.isApplyingToNode(n)?(this.crossesNgTemplate=!0,this.addMatch(-n.index,t),new e(this.metadata)):null}isApplyingToNode(n){if(this._appliesToNextNode&&(this.metadata.flags&1)!==1){let t=this._declarationNodeIndex,i=n.parent;for(;i!==null&&i.type&8&&i.index!==t;)i=i.parent;return t===(i!==null?i.index:-1)}return this._appliesToNextNode}matchTNode(n,t){let i=this.metadata.predicate;if(Array.isArray(i))for(let r=0;r<i.length;r++){let o=i[r];this.matchTNodeWithReadOption(n,t,MD(t,o)),this.matchTNodeWithReadOption(n,t,ja(t,n,o,!1,!1))}else i===Xe?t.type&4&&this.matchTNodeWithReadOption(n,t,-1):this.matchTNodeWithReadOption(n,t,ja(t,n,i,!1,!1))}matchTNodeWithReadOption(n,t,i){if(i!==null){let r=this.metadata.read;if(r!==null)if(r===G||r===xt||r===Xe&&t.type&4)this.addMatch(t.index,-2);else{let o=ja(t,n,r,!1,!1);o!==null&&this.addMatch(t.index,o)}else this.addMatch(t.index,i)}}addMatch(n,t){this.matches===null?this.matches=[n,t]:this.matches.push(n,t)}};function MD(e,n){let t=e.localNames;if(t!==null){for(let i=0;i<t.length;i+=2)if(t[i]===n)return t[i+1]}return null}function xD(e,n){return e.type&11?Ji(e,n):e.type&4?Kd(e,n):null}function TD(e,n,t,i){return t===-1?xD(n,e):t===-2?SD(e,n,i):Kr(e,e[I],t,n)}function SD(e,n,t){if(t===G)return Ji(n,e);if(t===Xe)return Kd(n,e);if(t===xt)return Xh(n,e)}function Jh(e,n,t,i){let r=n[Ot].queries[i];if(r.matches===null){let o=e.data,a=t.matches,s=[];for(let c=0;a!==null&&c<a.length;c+=2){let l=a[c];if(l<0)s.push(null);else{let d=o[l];s.push(TD(n,d,a[c+1],t.metadata.read))}}r.matches=s}return r.matches}function hd(e,n,t,i){let r=e.queries.getByIndex(t),o=r.matches;if(o!==null){let a=Jh(e,n,r,t);for(let s=0;s<o.length;s+=2){let c=o[s];if(c>0)i.push(a[s/2]);else{let l=o[s+1],d=n[-c];for(let f=he;f<d.length;f++){let m=d[f];m[Dn]===m[Ce]&&hd(m[I],m,l,i)}if(d[ni]!==null){let f=d[ni];for(let m=0;m<f.length;m++){let p=f[m];hd(p[I],p,l,i)}}}}}return i}function Qd(e,n){return e[Ot].queries[n].queryList}function eg(e,n,t){let i=new jt((t&4)===4);return yp(e,n,i,i.destroy),(n[Ot]??=new fd).queries.push(new ud(i))-1}function tg(e,n,t){let i=ge();return i.firstCreatePass&&(ng(i,new Qa(e,n,t),-1),(n&2)===2&&(i.staticViewQueries=!0)),eg(i,k(),n)}function AD(e,n,t,i){let r=ge();if(r.firstCreatePass){let o=Re();ng(r,new Qa(n,t,i),o.index),ND(r,e),(t&2)===2&&(r.staticContentQueries=!0)}return eg(r,k(),t)}function kD(e){return e.split(",").map(n=>n.trim())}function ng(e,n,t){e.queries===null&&(e.queries=new pd),e.queries.track(new md(n,t))}function ND(e,n){let t=e.contentQueries||(e.contentQueries=[]),i=t.length?t[t.length-1]:-1;n!==i&&t.push(e.queries.length-1,n)}function Yd(e,n){return e.queries.getByIndex(n)}function ig(e,n){let t=e[I],i=Yd(t,n);return i.crossesNgTemplate?hd(t,e,n,[]):Jh(t,e,i,n)}function rg(e,n,t){let i,r=Dr(()=>{i._dirtyCounter();let o=OD(i,e);if(n&&o===void 0)throw new E(-951,!1);return o});return i=r[Te],i._dirtyCounter=ue(0),i._flatValue=void 0,r}function og(e){return rg(!0,!1,e)}function ag(e){return rg(!0,!0,e)}function RD(e,n){let t=e[Te];t._lView=k(),t._queryIndex=n,t._queryList=Qd(t._lView,n),t._queryList.onDirty(()=>t._dirtyCounter.update(i=>i+1))}function OD(e,n){let t=e._lView,i=e._queryIndex;if(t===void 0||i===void 0||t[S]&4)return n?void 0:Ne;let r=Qd(t,i),o=ig(t,i);return r.reset(o,jm),n?r.first:r._changesDetected||e._flatValue===void 0?e._flatValue=r.toArray():e._flatValue}var Qi=class{};var Xr=class extends Qi{injector;componentFactoryResolver=new ld(this);instance=null;constructor(n){super();let t=new Zn([...n.providers,{provide:Qi,useValue:this},{provide:us,useValue:this.componentFactoryResolver}],n.parent||Pi(),n.debugName,new Set(["environment"]));this.injector=t,n.runEnvironmentInitializers&&t.resolveInjectorInitializers()}destroy(){this.injector.destroy()}onDestroy(n){this.injector.onDestroy(n)}};function sg(e,n,t=null){return new Xr({providers:e,parent:n,debugName:t,runEnvironmentInitializers:!0}).injector}var FD=(()=>{class e{_injector;cachedInjectors=new Map;constructor(t){this._injector=t}getOrCreateStandaloneInjector(t){if(!t.standalone)return null;if(!this.cachedInjectors.has(t)){let i=nl(!1,t.type),r=i.length>0?sg([i],this._injector,""):null;this.cachedInjectors.set(t,r)}return this.cachedInjectors.get(t)}ngOnDestroy(){try{for(let t of this.cachedInjectors.values())t!==null&&t.destroy()}finally{this.cachedInjectors.clear()}}static \u0275prov=b({token:e,providedIn:"environment",factory:()=>new e(T(Ie))})}return e})();function B(e){return eo(()=>{let n=cg(e),t=we(F({},n),{decls:e.decls,vars:e.vars,template:e.template,consts:e.consts||null,ngContentSelectors:e.ngContentSelectors,onPush:e.changeDetection===Td.OnPush,directiveDefs:null,pipeDefs:null,dependencies:n.standalone&&e.dependencies||null,getStandaloneInjector:n.standalone?r=>r.get(FD).getOrCreateStandaloneInjector(t):null,getExternalStyles:null,signals:e.signals??!1,data:e.data||{},encapsulation:e.encapsulation||Et.Emulated,styles:e.styles||Ne,_:null,schemas:e.schemas||null,tView:null,id:""});n.standalone&&An("NgStandalone"),lg(t);let i=e.dependencies;return t.directiveDefs=gm(i,PD),t.pipeDefs=gm(i,Xf),t.id=jD(t),t})}function PD(e){return yn(e)||Kc(e)}function U(e){return eo(()=>({type:e.type,bootstrap:e.bootstrap||Ne,declarations:e.declarations||Ne,imports:e.imports||Ne,exports:e.exports||Ne,transitiveCompileScopes:null,schemas:e.schemas||null,id:e.id||null}))}function LD(e,n){if(e==null)return _n;let t={};for(let i in e)if(e.hasOwnProperty(i)){let r=e[i],o,a,s,c;Array.isArray(r)?(s=r[0],o=r[1],a=r[2]??o,c=r[3]||null):(o=r,a=r,s=rs.None,c=null),t[o]=[i,s,c],n[o]=a}return t}function VD(e){if(e==null)return _n;let n={};for(let t in e)e.hasOwnProperty(t)&&(n[e[t]]=t);return n}function J(e){return eo(()=>{let n=cg(e);return lg(n),n})}function cg(e){let n={};return{type:e.type,providersResolver:null,viewProvidersResolver:null,factory:null,hostBindings:e.hostBindings||null,hostVars:e.hostVars||0,hostAttrs:e.hostAttrs||null,contentQueries:e.contentQueries||null,declaredInputs:n,inputConfig:e.inputs||_n,exportAs:e.exportAs||null,standalone:e.standalone??!0,signals:e.signals===!0,selectors:e.selectors||Ne,viewQuery:e.viewQuery||null,features:e.features||null,setInput:null,resolveHostDirectives:null,hostDirectives:null,controlDef:null,inputs:LD(e.inputs,n),outputs:VD(e.outputs),debugInfo:null}}function lg(e){e.features?.forEach(n=>n(e))}function gm(e,n){return e?()=>{let t=typeof e=="function"?e():e,i=[];for(let r of t){let o=n(r);o!==null&&i.push(o)}return i}:null}function jD(e){let n=0,t=typeof e.consts=="function"?"":e.consts,i=[e.selectors,e.ngContentSelectors,e.hostVars,e.hostAttrs,t,e.vars,e.decls,e.encapsulation,e.standalone,e.signals,e.exportAs,JSON.stringify(e.inputs),JSON.stringify(e.outputs),Object.getOwnPropertyNames(e.type.prototype),!!e.contentQueries,!!e.viewQuery];for(let o of i.join("|"))n=Math.imul(31,n)+o.charCodeAt(0)<<0;return n+=2147483648,"c"+n}function BD(e){return Object.getPrototypeOf(e.prototype).constructor}function Me(e){let n=BD(e.type),t=!0,i=[e];for(;n;){let r;if(Pt(e))r=n.\u0275cmp||n.\u0275dir;else{if(n.\u0275cmp)throw new E(903,!1);r=n.\u0275dir}if(r){if(t){i.push(r);let a=e;a.inputs=Ll(e.inputs),a.declaredInputs=Ll(e.declaredInputs),a.outputs=Ll(e.outputs);let s=r.hostBindings;s&&GD(e,s);let c=r.viewQuery,l=r.contentQueries;if(c&&$D(e,c),l&&zD(e,l),HD(e,r),Yf(e.outputs,r.outputs),Pt(r)&&r.data.animation){let d=e.data;d.animation=(d.animation||[]).concat(r.data.animation)}}let o=r.features;if(o)for(let a=0;a<o.length;a++){let s=o[a];s&&s.ngInherit&&s(e),s===Me&&(t=!1)}}n=Object.getPrototypeOf(n)}UD(i)}function HD(e,n){for(let t in n.inputs){if(!n.inputs.hasOwnProperty(t)||e.inputs.hasOwnProperty(t))continue;let i=n.inputs[t];i!==void 0&&(e.inputs[t]=i,e.declaredInputs[t]=n.declaredInputs[t])}}function UD(e){let n=0,t=null;for(let i=e.length-1;i>=0;i--){let r=e[i];r.hostVars=n+=r.hostVars,r.hostAttrs=Wi(r.hostAttrs,t=Wi(t,r.hostAttrs))}}function Ll(e){return e===_n?{}:e===Ne?[]:e}function $D(e,n){let t=e.viewQuery;t?e.viewQuery=(i,r)=>{n(i,r),t(i,r)}:e.viewQuery=n}function zD(e,n){let t=e.contentQueries;t?e.contentQueries=(i,r,o)=>{n(i,r,o),t(i,r,o)}:e.contentQueries=n}function GD(e,n){let t=e.hostBindings;t?e.hostBindings=(i,r)=>{n(i,r),t(i,r)}:e.hostBindings=n}function dg(e,n,t,i,r,o,a,s){if(t.firstCreatePass){e.mergedAttrs=Wi(e.mergedAttrs,e.attrs);let d=e.tView=Vd(2,e,r,o,a,t.directiveRegistry,t.pipeRegistry,null,t.schemas,t.consts,null);t.queries!==null&&(t.queries.template(t,e),d.queries=t.queries.embeddedTView(e))}s&&(e.flags|=s),Hi(e,!1);let c=qD(t,n,e,i);Aa()&&zd(t,n,c,e),qi(c,n);let l=Vh(c,n,c,e);n[i+_e]=l,Bd(n,l),ED(l,e,n)}function WD(e,n,t,i,r,o,a,s,c,l,d){let f=t+_e,m;return n.firstCreatePass?(m=tr(n,f,4,a||null,s||null),vl()&&Gh(n,e,m,Ke(n.consts,l),Ih),xm(n,m)):m=n.data[f],dg(m,e,n,t,i,r,o,c),Br(m)&&Wd(n,e,m),l!=null&&cs(e,m,d),m}function Yi(e,n,t,i,r,o,a,s,c,l,d){let f=t+_e,m;if(n.firstCreatePass){if(m=tr(n,f,4,a||null,s||null),l!=null){let p=Ke(n.consts,l);m.localNames=[];for(let h=0;h<p.length;h+=2)m.localNames.push(p[h],-1)}}else m=n.data[f];return dg(m,e,n,t,i,r,o,c),l!=null&&cs(e,m,d),m}function Nn(e,n,t,i,r,o,a,s){let c=k(),l=ge(),d=Ke(l.consts,o);return WD(c,l,e,n,t,i,r,d,void 0,a,s),Nn}function fs(e,n,t,i,r,o,a,s){let c=k(),l=ge(),d=Ke(l.consts,o);return Yi(c,l,e,n,t,i,r,d,void 0,a,s),fs}var qD=ZD;function ZD(e,n,t,i){return ka(!0),n[le].createComment("")}function ps(e){return typeof e=="function"&&e[Te]!==void 0}var Xd=new v("");function ms(e){return!!e&&typeof e.then=="function"}function ug(e){return!!e&&typeof e.subscribe=="function"}var Jd=new v("");function eu(e){return vt([{provide:Jd,multi:!0,useValue:e}])}var tu=(()=>{class e{resolve;reject;initialized=!1;done=!1;donePromise=new Promise((t,i)=>{this.resolve=t,this.reject=i});appInits=u(Jd,{optional:!0})??[];injector=u(ae);constructor(){}runInitializers(){if(this.initialized)return;let t=[];for(let r of this.appInits){let o=Li(this.injector,r);if(ms(o))t.push(o);else if(ug(o)){let a=new Promise((s,c)=>{o.subscribe({complete:s,error:c})});t.push(a)}}let i=()=>{this.done=!0,this.resolve()};Promise.all(t).then(()=>{i()}).catch(r=>{this.reject(r)}),t.length===0&&i(),this.initialized=!0}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),fg=new v("");function pg(){mc(()=>{let e="";throw new E(600,e)})}function mg(e){return e.isBoundToModule}var KD=10;var at=(()=>{class e{_runningTick=!1;_destroyed=!1;_destroyListeners=[];_views=[];internalErrorHandler=u(Mn);afterRenderManager=u(Ud);zonelessEnabled=u(Gr);rootEffectScheduler=u(Ra);dirtyFlags=0;tracingSnapshot=null;allTestViews=new Set;autoDetectTestViews=new Set;includeAllTestViews=!1;afterTick=new V;get allViews(){return[...(this.includeAllTestViews?this.allTestViews:this.autoDetectTestViews).keys(),...this._views]}get destroyed(){return this._destroyed}componentTypes=[];components=[];internalPendingTask=u(oi);get isStable(){return this.internalPendingTask.hasPendingTasksObservable.pipe(ie(t=>!t))}constructor(){u(Ht,{optional:!0})}whenStable(){let t;return new Promise(i=>{t=this.isStable.subscribe({next:r=>{r&&i()}})}).finally(()=>{t.unsubscribe()})}_injector=u(Ie);_rendererFactory=null;get injector(){return this._injector}bootstrap(t,i){return this.bootstrapImpl(t,i)}bootstrapImpl(t,i,r=ae.NULL){return this._injector.get(R).run(()=>{X(W.BootstrapComponentStart);let a=t instanceof ds;if(!this._injector.get(tu).done){let h="";throw new E(405,h)}let c;a?c=t:c=this._injector.get(us).resolveComponentFactory(t),this.componentTypes.push(c.componentType);let l=mg(c)?void 0:this._injector.get(Qi),d=i||c.selector,f=c.create(r,[],d,l),m=f.location.nativeElement,p=f.injector.get(Xd,null);return p?.registerApplication(m),f.onDestroy(()=>{this.detachView(f.hostView),Zr(this.components,f),p?.unregisterApplication(m)}),this._loadComponent(f),X(W.BootstrapComponentEnd,f),f})}tick(){this.zonelessEnabled||(this.dirtyFlags|=1),this._tick()}_tick(){X(W.ChangeDetectionStart),this.tracingSnapshot!==null?this.tracingSnapshot.run(os.CHANGE_DETECTION,this.tickImpl):this.tickImpl()}tickImpl=()=>{if(this._runningTick)throw X(W.ChangeDetectionEnd),new E(101,!1);let t=M(null);try{this._runningTick=!0,this.synchronize()}finally{this._runningTick=!1,this.tracingSnapshot?.dispose(),this.tracingSnapshot=null,M(t),this.afterTick.next(),X(W.ChangeDetectionEnd)}};synchronize(){this._rendererFactory===null&&!this._injector.destroyed&&(this._rendererFactory=this._injector.get(Ue,null,{optional:!0}));let t=0;for(;this.dirtyFlags!==0&&t++<KD;){X(W.ChangeDetectionSyncStart);try{this.synchronizeOnce()}finally{X(W.ChangeDetectionSyncEnd)}}}synchronizeOnce(){this.dirtyFlags&16&&(this.dirtyFlags&=-17,this.rootEffectScheduler.flush());let t=!1;if(this.dirtyFlags&7){let i=!!(this.dirtyFlags&1);this.dirtyFlags&=-8,this.dirtyFlags|=8;for(let{_lView:r}of this.allViews){if(!i&&!Hr(r))continue;let o=i&&!this.zonelessEnabled?0:1;Oh(r,o),t=!0}if(this.dirtyFlags&=-5,this.syncDirtyFlagsWithViews(),this.dirtyFlags&23)return}t||(this._rendererFactory?.begin?.(),this._rendererFactory?.end?.()),this.dirtyFlags&8&&(this.dirtyFlags&=-9,this.afterRenderManager.execute()),this.syncDirtyFlagsWithViews()}syncDirtyFlagsWithViews(){if(this.allViews.some(({_lView:t})=>Hr(t))){this.dirtyFlags|=2;return}else this.dirtyFlags&=-8}attachView(t){let i=t;this._views.push(i),i.attachToAppRef(this)}detachView(t){let i=t;Zr(this._views,i),i.detachFromAppRef()}_loadComponent(t){this.attachView(t.hostView);try{this.tick()}catch(r){this.internalErrorHandler(r)}this.components.push(t),this._injector.get(fg,[]).forEach(r=>r(t))}ngOnDestroy(){if(!this._destroyed)try{this._destroyListeners.forEach(t=>t()),this._views.slice().forEach(t=>t.destroy())}finally{this._destroyed=!0,this._views=[],this._destroyListeners=[]}}onDestroy(t){return this._destroyListeners.push(t),()=>Zr(this._destroyListeners,t)}destroy(){if(this._destroyed)throw new E(406,!1);let t=this._injector;t.destroy&&!t.destroyed&&t.destroy()}get viewCount(){return this._views.length}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Zr(e,n){let t=e.indexOf(n);t>-1&&e.splice(t,1)}function hs(e,n){let t=k(),i=En();if(It(t,i,n)){let r=ge(),o=$r();if(ls(o,r,t,e,n))Ft(o)&&Eh(t,o.index);else{let s=rt(o,t);Mh(t[le],s,null,o.value,e,n,null)}}return hs}function se(e,n,t,i){let r=k(),o=En();if(It(r,o,n)){let a=ge(),s=$r();E0(s,r,e,n,t,i)}return se}var gd=class{destroy(n){}updateValue(n,t){}swap(n,t){let i=Math.min(n,t),r=Math.max(n,t),o=this.detach(r);if(r-i>1){let a=this.detach(i);this.attach(i,o),this.attach(r,a)}else this.attach(i,o)}move(n,t){this.attach(t,this.detach(n))}};function Vl(e,n,t,i,r){return e===t&&Object.is(n,i)?1:Object.is(r(e,n),r(t,i))?-1:0}function QD(e,n,t,i){let r,o,a=0,s=e.length-1,c=void 0;if(Array.isArray(n)){M(i);let l=n.length-1;for(M(null);a<=s&&a<=l;){let d=e.at(a),f=n[a],m=Vl(a,d,a,f,t);if(m!==0){m<0&&e.updateValue(a,f),a++;continue}let p=e.at(s),h=n[l],D=Vl(s,p,l,h,t);if(D!==0){D<0&&e.updateValue(s,h),s--,l--;continue}let w=t(a,d),C=t(s,p),ee=t(a,f);if(Object.is(ee,C)){let Pe=t(l,h);Object.is(Pe,w)?(e.swap(a,s),e.updateValue(s,h),l--,s--):e.move(s,a),e.updateValue(a,f),a++;continue}if(r??=new Ya,o??=bm(e,a,s,t),vd(e,r,a,ee))e.updateValue(a,f),a++,s++;else if(o.has(ee))r.set(w,e.detach(a)),s--;else{let Pe=e.create(a,n[a]);e.attach(a,Pe),a++,s++}}for(;a<=l;)vm(e,r,t,a,n[a]),a++}else if(n!=null){M(i);let l=n[Symbol.iterator]();M(null);let d=l.next();for(;!d.done&&a<=s;){let f=e.at(a),m=d.value,p=Vl(a,f,a,m,t);if(p!==0)p<0&&e.updateValue(a,m),a++,d=l.next();else{r??=new Ya,o??=bm(e,a,s,t);let h=t(a,m);if(vd(e,r,a,h))e.updateValue(a,m),a++,s++,d=l.next();else if(!o.has(h))e.attach(a,e.create(a,m)),a++,s++,d=l.next();else{let D=t(a,f);r.set(D,e.detach(a)),s--}}}for(;!d.done;)vm(e,r,t,e.length,d.value),d=l.next()}for(;a<=s;)e.destroy(e.detach(s--));r?.forEach(l=>{e.destroy(l)})}function vd(e,n,t,i){return n!==void 0&&n.has(i)?(e.attach(t,n.get(i)),n.delete(i),!0):!1}function vm(e,n,t,i,r){if(vd(e,n,i,t(i,r)))e.updateValue(i,r);else{let o=e.create(i,r);e.attach(i,o)}}function bm(e,n,t,i){let r=new Set;for(let o=n;o<=t;o++)r.add(i(o,e.at(o)));return r}var Ya=class{kvMap=new Map;_vMap=void 0;has(n){return this.kvMap.has(n)}delete(n){if(!this.has(n))return!1;let t=this.kvMap.get(n);return this._vMap!==void 0&&this._vMap.has(t)?(this.kvMap.set(n,this._vMap.get(t)),this._vMap.delete(t)):this.kvMap.delete(n),!0}get(n){return this.kvMap.get(n)}set(n,t){if(this.kvMap.has(n)){let i=this.kvMap.get(n);this._vMap===void 0&&(this._vMap=new Map);let r=this._vMap;for(;r.has(i);)i=r.get(i);r.set(i,t)}else this.kvMap.set(n,t)}forEach(n){for(let[t,i]of this.kvMap)if(n(i,t),this._vMap!==void 0){let r=this._vMap;for(;r.has(i);)i=r.get(i),n(i,t)}}};function q(e,n,t,i,r,o,a,s){An("NgControlFlow");let c=k(),l=ge(),d=Ke(l.consts,o);return Yi(c,l,e,n,t,i,r,d,256,a,s),nu}function nu(e,n,t,i,r,o,a,s){An("NgControlFlow");let c=k(),l=ge(),d=Ke(l.consts,o);return Yi(c,l,e,n,t,i,r,d,512,a,s),nu}function Z(e,n){An("NgControlFlow");let t=k(),i=En(),r=t[i]!==Je?t[i]:-1,o=r!==-1?Xa(t,_e+r):void 0,a=0;if(It(t,i,e)){let s=M(null);try{if(o!==void 0&&Bh(o,a),e!==-1){let c=_e+e,l=Xa(t,c),d=Dd(t[I],c),f=Uh(l,d,t),m=io(t,d,n,{dehydratedView:f});ro(l,m,a,Zi(d,f))}}finally{M(s)}}else if(o!==void 0){let s=jh(o,a);s!==void 0&&(s[ye]=n)}}var bd=class{lContainer;$implicit;$index;constructor(n,t,i){this.lContainer=n,this.$implicit=t,this.$index=i}get $count(){return this.lContainer.length-he}};function ir(e,n){return n}var yd=class{hasEmptyBlock;trackByFn;liveCollection;constructor(n,t,i){this.hasEmptyBlock=n,this.trackByFn=t,this.liveCollection=i}};function Ut(e,n,t,i,r,o,a,s,c,l,d,f,m){An("NgControlFlow");let p=k(),h=ge(),D=c!==void 0,w=k(),C=s?a.bind(w[Ve][ye]):a,ee=new yd(D,C);w[_e+e]=ee,Yi(p,h,e+1,n,t,i,r,Ke(h.consts,o),256),D&&Yi(p,h,e+2,c,l,d,f,Ke(h.consts,m),512)}var _d=class extends gd{lContainer;hostLView;templateTNode;operationsCounter=void 0;needsIndexUpdate=!1;constructor(n,t,i){super(),this.lContainer=n,this.hostLView=t,this.templateTNode=i}get length(){return this.lContainer.length-he}at(n){return this.getLView(n)[ye].$implicit}attach(n,t){let i=t[Xn];this.needsIndexUpdate||=n!==this.length,ro(this.lContainer,t,n,Zi(this.templateTNode,i)),YD(this.lContainer,n)}detach(n){return this.needsIndexUpdate||=n!==this.length-1,XD(this.lContainer,n),JD(this.lContainer,n)}create(n,t){let i=qa(this.lContainer,this.templateTNode.tView.ssrId);return io(this.hostLView,this.templateTNode,new bd(this.lContainer,t,n),{dehydratedView:i})}destroy(n){as(n[I],n)}updateValue(n,t){this.getLView(n)[ye].$implicit=t}reset(){this.needsIndexUpdate=!1}updateIndexes(){if(this.needsIndexUpdate)for(let n=0;n<this.length;n++)this.getLView(n)[ye].$index=n}getLView(n){return ew(this.lContainer,n)}};function $t(e){let n=M(null),t=Lt();try{let i=k(),r=i[I],o=i[t],a=t+1,s=Xa(i,a);if(o.liveCollection===void 0){let l=Dd(r,a);o.liveCollection=new _d(s,i,l)}else o.liveCollection.reset();let c=o.liveCollection;if(QD(c,e,o.trackByFn,n),c.updateIndexes(),o.hasEmptyBlock){let l=En(),d=c.length===0;if(It(i,l,d)){let f=t+2,m=Xa(i,f);if(d){let p=Dd(r,f),h=Uh(m,p,i),D=io(i,p,void 0,{dehydratedView:h});ro(m,D,0,Zi(p,h))}else r.firstUpdatePass&&q0(m),Bh(m,0)}}}finally{M(n)}}function Xa(e,n){return e[n]}function YD(e,n){if(e.length<=he)return;let t=he+n,i=e[t],r=i?i[wn]:void 0;if(i&&r&&r.detachedLeaveAnimationFns&&r.detachedLeaveAnimationFns.length>0){let o=i[Jt];n0(o,r),ci.delete(i[en]),r.detachedLeaveAnimationFns=void 0}}function XD(e,n){if(e.length<=he)return;let t=he+n,i=e[t],r=i?i[wn]:void 0;r&&r.leave&&r.leave.size>0&&(r.detachedLeaveAnimationFns=[])}function JD(e,n){return Yr(e,n)}function ew(e,n){return jh(e,n)}function Dd(e,n){return wa(e,n)}function Q(e,n,t){let i=k(),r=En();if(It(i,r,n)){let o=ge(),a=$r();_0(a,i,e,n,i[le],t)}return Q}function wd(e,n,t,i,r){ls(n,e,t,r?"class":"style",i)}function g(e,n,t,i){let r=k(),o=r[I],a=e+_e,s=o.firstCreatePass?qh(a,r,2,n,Ih,vl(),t,i):o.data[a];if(Ft(s)){let c=r[yt].tracingService;if(c&&c.componentCreate){let l=o.data[s.directiveStart+s.componentOffset];return c.componentCreate(Qh(l),()=>(ym(e,n,r,s,i),g))}}return ym(e,n,r,s,i),g}function ym(e,n,t,i,r){if(xh(i,t,e,n,hg),Br(i)){let o=t[I];Wd(o,t,i),Ym(o,i,t)}r!=null&&cs(t,i)}function y(){let e=ge(),n=Re(),t=Th(n);return e.firstCreatePass&&Zh(e,t),yl(t)&&_l(),gl(),t.classesWithoutHost!=null&&zy(t)&&wd(e,t,k(),t.classesWithoutHost,!0),t.stylesWithoutHost!=null&&Gy(t)&&wd(e,t,k(),t.stylesWithoutHost,!1),y}function fe(e,n,t,i){return g(e,n,t,i),y(),fe}function $e(e,n,t,i){let r=k(),o=r[I],a=e+_e,s=o.firstCreatePass?sD(a,o,2,n,t,i):o.data[a];return xh(s,r,e,n,hg),i!=null&&cs(r,s),$e}function ze(){let e=Re(),n=Th(e);return yl(n)&&_l(),gl(),ze}function je(e,n,t,i){return $e(e,n,t,i),ze(),je}var hg=(e,n,t,i,r)=>(ka(!0),rh(n[le],i,Op()));function an(){return k()}function oo(e,n,t){let i=k(),r=En();if(It(i,r,n)){let o=ge(),a=$r();Ch(a,i,e,n,i[le],t)}return oo}var ao="en-US";var tw=ao;function gg(e){typeof e=="string"&&(tw=e.toLowerCase().replace(/_/g,"-"))}function oe(e,n,t){let i=k(),r=ge(),o=Re();return nw(r,i,i[le],o,e,n,t),oe}function nw(e,n,t,i,r,o,a){let s=!0,c=null;if((i.type&3||a)&&(c??=Fl(i,n,o),lD(i,e,n,a,t,r,o,c)&&(s=!1)),s){let l=i.outputs?.[r],d=i.hostDirectiveOutputs?.[r];if(d&&d.length)for(let f=0;f<d.length;f+=2){let m=d[f],p=d[f+1];c??=Fl(i,n,o),pm(i,n,m,p,r,c)}if(l&&l.length)for(let f of l)c??=Fl(i,n,o),pm(i,n,f,r,r,c)}}function P(e=1){return Rp(e)}function iw(e,n){let t=null,i=H_(e);for(let r=0;r<n.length;r++){let o=n[r];if(o==="*"){t=r;continue}if(i===null?lh(e,o,!0):z_(i,o))return r}return t}function De(e){let n=k()[Ve][Le];if(!n.projection){let t=e?e.length:1,i=n.projection=rp(t,null),r=i.slice(),o=n.child;for(;o!==null;){if(o.type!==128){let a=e?iw(o,e):0;a!==null&&(r[a]?r[a].projectionNext=o:i[a]=o,r[a]=o)}o=o.next}}}function de(e,n=0,t,i,r,o){let a=k(),s=ge(),c=i?e+1:null;c!==null&&Yi(a,s,c,i,r,o,null,t);let l=tr(s,_e+e,16,null,t||null);l.projection===null&&(l.projection=n),Cl();let f=!a[Xn]||bl();a[Ve][Le].projection[l.projection]===null&&c!==null?rw(a,s,c):f&&!ts(l)&&p0(s,a,l)}function rw(e,n,t){let i=_e+t,r=n.data[i],o=e[i],a=qa(o,r.tView.ssrId),s=io(e,r,void 0,{dehydratedView:a});ro(o,s,0,Zi(r,a))}function Rn(e,n,t,i){return AD(e,n,t,i),Rn}function st(e,n,t){return tg(e,n,t),st}function ve(e){let n=k(),t=ge(),i=xa();Ur(i+1);let r=Yd(t,i);if(e.dirty&&hp(n)===((r.metadata.flags&2)===2)){if(r.matches===null)e.reset([]);else{let o=ig(n,i);e.reset(o,jm),e.notifyOnChanges()}return!0}return!1}function be(){return Qd(k(),xa())}function gs(e,n,t,i){return RD(e,tg(n,t,i)),gs}function iu(e=1){Ur(xa()+e)}function rr(e){let n=Cp();return mp(n,_e+e)}function Pa(e,n){return e<<17|n<<2}function li(e){return e>>17&32767}function ow(e){return(e&2)==2}function aw(e,n){return e&131071|n<<17}function Cd(e){return e|2}function Xi(e){return(e&131068)>>2}function jl(e,n){return e&-131069|n<<2}function sw(e){return(e&1)===1}function Ed(e){return e|1}function cw(e,n,t,i,r,o){let a=o?n.classBindings:n.styleBindings,s=li(a),c=Xi(a);e[i]=t;let l=!1,d;if(Array.isArray(t)){let f=t;d=f[1],(d===null||Fi(f,d)>0)&&(l=!0)}else d=t;if(r)if(c!==0){let m=li(e[s+1]);e[i+1]=Pa(m,s),m!==0&&(e[m+1]=jl(e[m+1],i)),e[s+1]=aw(e[s+1],i)}else e[i+1]=Pa(s,0),s!==0&&(e[s+1]=jl(e[s+1],i)),s=i;else e[i+1]=Pa(c,0),s===0?s=i:e[c+1]=jl(e[c+1],i),c=i;l&&(e[i+1]=Cd(e[i+1])),_m(e,d,i,!0),_m(e,d,i,!1),lw(n,d,e,i,o),a=Pa(s,c),o?n.classBindings=a:n.styleBindings=a}function lw(e,n,t,i,r){let o=r?e.residualClasses:e.residualStyles;o!=null&&typeof n=="string"&&Fi(o,n)>=0&&(t[i+1]=Ed(t[i+1]))}function _m(e,n,t,i){let r=e[t+1],o=n===null,a=i?li(r):Xi(r),s=!1;for(;a!==0&&(s===!1||o);){let c=e[a],l=e[a+1];dw(c,n)&&(s=!0,e[a+1]=i?Ed(l):Cd(l)),a=i?li(l):Xi(l)}s&&(e[t+1]=i?Cd(r):Ed(r))}function dw(e,n){return e===null||n==null||(Array.isArray(e)?e[1]:e)===n?!0:Array.isArray(e)&&typeof n=="string"?Fi(e,n)>=0:!1}var Ct={textEnd:0,key:0,keyEnd:0,value:0,valueEnd:0};function uw(e){return e.substring(Ct.key,Ct.keyEnd)}function fw(e){return pw(e),vg(e,bg(e,0,Ct.textEnd))}function vg(e,n){let t=Ct.textEnd;return t===n?-1:(n=Ct.keyEnd=mw(e,Ct.key=n,t),bg(e,n,t))}function pw(e){Ct.key=0,Ct.keyEnd=0,Ct.value=0,Ct.valueEnd=0,Ct.textEnd=e.length}function bg(e,n,t){for(;n<t&&e.charCodeAt(n)<=32;)n++;return n}function mw(e,n,t){for(;n<t&&e.charCodeAt(n)>32;)n++;return n}function Tt(e,n,t){return yg(e,n,t,!1),Tt}function O(e,n){return yg(e,n,null,!0),O}function Ge(e){gw(ww,hw,e,!0)}function hw(e,n){for(let t=fw(n);t>=0;t=vg(n,t))ya(e,uw(n),!0)}function yg(e,n,t,i){let r=k(),o=ge(),a=Ia(2);if(o.firstUpdatePass&&Dg(o,e,a,i),n!==Je&&It(r,a,n)){let s=o.data[Lt()];wg(o,s,r,r[le],e,r[a+1]=Ew(n,t),i,a)}}function gw(e,n,t,i){let r=ge(),o=Ia(2);r.firstUpdatePass&&Dg(r,null,o,i);let a=k();if(t!==Je&&It(a,o,t)){let s=r.data[Lt()];if(Cg(s,i)&&!_g(r,o)){let c=i?s.classesWithoutHost:s.stylesWithoutHost;c!==null&&(t=ma(c,t||"")),wd(r,s,a,t,i)}else Cw(r,s,a,a[le],a[o+1],a[o+1]=Dw(e,n,t),i,o)}}function _g(e,n){return n>=e.expandoStartIndex}function Dg(e,n,t,i){let r=e.data;if(r[t+1]===null){let o=r[Lt()],a=_g(e,t);Cg(o,i)&&n===null&&!a&&(n=!1),n=vw(r,o,n,i),cw(r,o,n,t,a,i)}}function vw(e,n,t,i){let r=Sp(e),o=i?n.residualClasses:n.residualStyles;if(r===null)(i?n.classBindings:n.styleBindings)===0&&(t=Bl(null,e,n,t,i),t=Jr(t,n.attrs,i),o=null);else{let a=n.directiveStylingLast;if(a===-1||e[a]!==r)if(t=Bl(r,e,n,t,i),o===null){let c=bw(e,n,i);c!==void 0&&Array.isArray(c)&&(c=Bl(null,e,n,c[1],i),c=Jr(c,n.attrs,i),yw(e,n,i,c))}else o=_w(e,n,i)}return o!==void 0&&(i?n.residualClasses=o:n.residualStyles=o),t}function bw(e,n,t){let i=t?n.classBindings:n.styleBindings;if(Xi(i)!==0)return e[li(i)]}function yw(e,n,t,i){let r=t?n.classBindings:n.styleBindings;e[li(r)]=i}function _w(e,n,t){let i,r=n.directiveEnd;for(let o=1+n.directiveStylingLast;o<r;o++){let a=e[o].hostAttrs;i=Jr(i,a,t)}return Jr(i,n.attrs,t)}function Bl(e,n,t,i,r){let o=null,a=t.directiveEnd,s=t.directiveStylingLast;for(s===-1?s=t.directiveStart:s++;s<a&&(o=n[s],i=Jr(i,o.hostAttrs,r),o!==e);)s++;return e!==null&&(t.directiveStylingLast=s),i}function Jr(e,n,t){let i=t?1:2,r=-1;if(n!==null)for(let o=0;o<n.length;o++){let a=n[o];typeof a=="number"?r=a:r===i&&(Array.isArray(e)||(e=e===void 0?[]:["",e]),ya(e,a,t?!0:n[++o]))}return e===void 0?null:e}function Dw(e,n,t){if(t==null||t==="")return Ne;let i=[],r=Bt(t);if(Array.isArray(r))for(let o=0;o<r.length;o++)e(i,r[o],!0);else if(r instanceof Set)for(let o of r)e(i,o,!0);else if(typeof r=="object")for(let o in r)r.hasOwnProperty(o)&&e(i,o,r[o]);else typeof r=="string"&&n(i,r);return i}function ww(e,n,t){let i=String(n);i!==""&&!i.includes(" ")&&ya(e,i,t)}function Cw(e,n,t,i,r,o,a,s){r===Je&&(r=Ne);let c=0,l=0,d=0<r.length?r[0]:null,f=0<o.length?o[0]:null;for(;d!==null||f!==null;){let m=c<r.length?r[c+1]:void 0,p=l<o.length?o[l+1]:void 0,h=null,D;d===f?(c+=2,l+=2,m!==p&&(h=f,D=p)):f===null||d!==null&&d<f?(c+=2,h=d):(l+=2,h=f,D=p),h!==null&&wg(e,n,t,i,h,D,a,s),d=c<r.length?r[c]:null,f=l<o.length?o[l]:null}}function wg(e,n,t,i,r,o,a,s){if(!(n.type&3))return;let c=e.data,l=c[s+1],d=sw(l)?Dm(c,n,t,r,Xi(l),a):void 0;if(!Ja(d)){Ja(o)||ow(l)&&(o=Dm(c,null,t,r,s,a));let f=dl(Lt(),t);h0(i,a,f,r,o)}}function Dm(e,n,t,i,r,o){let a=n===null,s;for(;r>0;){let c=e[r],l=Array.isArray(c),d=l?c[1]:c,f=d===null,m=t[r+1];m===Je&&(m=f?Ne:void 0);let p=f?_a(m,i):d===i?m:void 0;if(l&&!Ja(p)&&(p=_a(c,i)),Ja(p)&&(s=p,a))return s;let h=e[r+1];r=a?li(h):Xi(h)}if(n!==null){let c=o?n.residualClasses:n.residualStyles;c!=null&&(s=_a(c,i))}return s}function Ja(e){return e!==void 0}function Ew(e,n){return e==null||e===""||(typeof n=="string"?e=e+n:typeof e=="object"&&(e=pa(Bt(e)))),e}function Cg(e,n){return(e.flags&(n?8:16))!==0}function x(e,n=""){let t=k(),i=ge(),r=e+_e,o=i.firstCreatePass?tr(i,r,1,n,null):i.data[r],a=Iw(i,t,o,n);t[r]=a,Aa()&&zd(i,t,a,o),Hi(o,!1)}var Iw=(e,n,t,i)=>(ka(!0),k_(n[le],i));function Mw(e,n,t,i=""){return It(e,En(),t)?n+Oi(t)+i:Je}function xw(e,n,t,i,r,o=""){let a=Ep(),s=cD(e,a,t,r);return Ia(2),s?n+Oi(t)+i+Oi(r)+o:Je}function Be(e){return St("",e),Be}function St(e,n,t){let i=k(),r=Mw(i,e,n,t);return r!==Je&&Eg(i,Lt(),r),St}function vs(e,n,t,i,r){let o=k(),a=xw(o,e,n,t,i,r);return a!==Je&&Eg(o,Lt(),a),vs}function Eg(e,n,t){let i=dl(n,e);N_(e[le],i,t)}function wm(e,n,t){let i=ge();i.firstCreatePass&&Ig(n,i.data,i.blueprint,Pt(e),t)}function Ig(e,n,t,i,r){if(e=Se(e),Array.isArray(e))for(let o=0;o<e.length;o++)Ig(e[o],n,t,i,r);else{let o=ge(),a=k(),s=Re(),c=qn(e)?e:Se(e.provide),l=rl(e),d=s.providerIndexes&1048575,f=s.directiveStart,m=s.providerIndexes>>20;if(qn(e)||!e.multi){let p=new si(l,r,nr,null),h=Ul(c,n,r?d:d+m,f);h===-1?(zl(za(s,a),o,c),Hl(o,e,n.length),n.push(c),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),t.push(p),a.push(p)):(t[h]=p,a[h]=p)}else{let p=Ul(c,n,d+m,f),h=Ul(c,n,d,d+m),D=p>=0&&t[p],w=h>=0&&t[h];if(r&&!w||!r&&!D){zl(za(s,a),o,c);let C=Aw(r?Sw:Tw,t.length,r,i,l,e);!r&&w&&(t[h].providerFactory=C),Hl(o,e,n.length,0),n.push(c),s.directiveStart++,s.directiveEnd++,r&&(s.providerIndexes+=1048576),t.push(C),a.push(C)}else{let C=Mg(t[r?h:p],l,!r&&i);Hl(o,e,p>-1?p:h,C)}!r&&i&&w&&t[h].componentProviders++}}}function Hl(e,n,t,i){let r=qn(n),o=dp(n);if(r||o){let c=(o?Se(n.useClass):n).prototype.ngOnDestroy;if(c){let l=e.destroyHooks||(e.destroyHooks=[]);if(!r&&n.multi){let d=l.indexOf(t);d===-1?l.push(t,[i,c]):l[d+1].push(i,c)}else l.push(t,c)}}}function Mg(e,n,t){return t&&e.componentProviders++,e.multi.push(n)-1}function Ul(e,n,t,i){for(let r=t;r<i;r++)if(n[r]===e)return r;return-1}function Tw(e,n,t,i,r){return Id(this.multi,[])}function Sw(e,n,t,i,r){let o=this.multi,a;if(this.providerFactory){let s=this.providerFactory.componentProviders,c=Kr(i,i[I],this.providerFactory.index,r);a=c.slice(0,s),Id(o,a);for(let l=s;l<c.length;l++)a.push(c[l])}else a=[],Id(o,a);return a}function Id(e,n){for(let t=0;t<e.length;t++){let i=e[t];n.push(i())}return n}function Aw(e,n,t,i,r,o){let a=new si(e,t,nr,null);return a.multi=[],a.index=n,a.componentProviders=0,Mg(a,r,i&&!t),a}function We(e,n){return t=>{t.providersResolver=(i,r)=>wm(i,r?r(e):e,!1),n&&(t.viewProvidersResolver=(i,r)=>wm(i,r?r(n):n,!0))}}var xg=(()=>{class e{applicationErrorHandler=u(Mn);appRef=u(at);taskService=u(oi);ngZone=u(R);zonelessEnabled=u(Gr);tracing=u(Ht,{optional:!0});zoneIsDefined=typeof Zone<"u"&&!!Zone.root.run;schedulerTickApplyArgs=[{data:{__scheduler_tick__:!0}}];subscriptions=new te;angularZoneId=this.zoneIsDefined?this.ngZone._inner?.get(Fr):null;scheduleInRootZone=!this.zonelessEnabled&&this.zoneIsDefined&&(u(kl,{optional:!0})??!1);cancelScheduledCallback=null;useMicrotaskScheduler=!1;runningTick=!1;pendingRenderTaskId=null;constructor(){this.subscriptions.add(this.appRef.afterTick.subscribe(()=>{let t=this.taskService.add();if(!this.runningTick&&(this.cleanup(),!this.zonelessEnabled||this.appRef.includeAllTestViews)){this.taskService.remove(t);return}this.switchToMicrotaskScheduler(),this.taskService.remove(t)})),this.subscriptions.add(this.ngZone.onUnstable.subscribe(()=>{this.runningTick||this.cleanup()}))}switchToMicrotaskScheduler(){this.ngZone.runOutsideAngular(()=>{let t=this.taskService.add();this.useMicrotaskScheduler=!0,queueMicrotask(()=>{this.useMicrotaskScheduler=!1,this.taskService.remove(t)})})}notify(t){if(!this.zonelessEnabled&&t===5)return;switch(t){case 0:{this.appRef.dirtyFlags|=2;break}case 3:case 2:case 4:case 5:case 1:{this.appRef.dirtyFlags|=4;break}case 6:{this.appRef.dirtyFlags|=2;break}case 12:{this.appRef.dirtyFlags|=16;break}case 13:{this.appRef.dirtyFlags|=2;break}case 11:break;default:this.appRef.dirtyFlags|=8}if(this.appRef.tracingSnapshot=this.tracing?.snapshot(this.appRef.tracingSnapshot)??null,!this.shouldScheduleTick())return;let i=this.useMicrotaskScheduler?jp:xl;this.pendingRenderTaskId=this.taskService.add(),this.scheduleInRootZone?this.cancelScheduledCallback=Zone.root.run(()=>i(()=>this.tick())):this.cancelScheduledCallback=this.ngZone.runOutsideAngular(()=>i(()=>this.tick()))}shouldScheduleTick(){return!(this.appRef.destroyed||this.pendingRenderTaskId!==null||this.runningTick||this.appRef._runningTick||!this.zonelessEnabled&&this.zoneIsDefined&&Zone.current.get(Fr+this.angularZoneId))}tick(){if(this.runningTick||this.appRef.destroyed)return;if(this.appRef.dirtyFlags===0){this.cleanup();return}!this.zonelessEnabled&&this.appRef.dirtyFlags&7&&(this.appRef.dirtyFlags|=1);let t=this.taskService.add();try{this.ngZone.run(()=>{this.runningTick=!0,this.appRef._tick()},void 0,this.schedulerTickApplyArgs)}catch(i){this.applicationErrorHandler(i)}finally{this.taskService.remove(t),this.cleanup()}}ngOnDestroy(){this.subscriptions.unsubscribe(),this.cleanup()}cleanup(){if(this.runningTick=!1,this.cancelScheduledCallback?.(),this.cancelScheduledCallback=null,this.pendingRenderTaskId!==null){let t=this.pendingRenderTaskId;this.pendingRenderTaskId=null,this.taskService.remove(t)}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function ru(){return An("NgZoneless"),vt([...ou(),[]])}function ou(){return[{provide:Yt,useExisting:xg},{provide:R,useClass:Pr},{provide:Gr,useValue:!0}]}function kw(){return typeof $localize<"u"&&$localize.locale||ao}var au=new v("",{factory:()=>u(au,{optional:!0,skipSelf:!0})||kw()});function pe(e,n){return Dr(e,n?.equal)}var kg=Symbol("InputSignalNode#UNSET"),Bw=we(F({},ko),{transformFn:void 0,applyValueToInputSignal(e,n){wr(e,n)}});function Ng(e,n){let t=Object.create(Bw);t.value=e,t.transformFn=n?.transform;function i(){if(br(t),t.value===kg){let r=null;throw new E(-950,r)}return t.value}return i[Te]=t,i}var fi=class{attributeName;constructor(n){this.attributeName=n}__NG_ELEMENT_ID__=()=>xd(this.attributeName);toString(){return`HostAttributeToken ${this.attributeName}`}};function Tg(e,n){return Ng(e,n)}function Hw(e){return Ng(kg,e)}var At=(Tg.required=Hw,Tg);function Sg(e,n){return og(n)}function Uw(e,n){return ag(n)}var Rg=(Sg.required=Uw,Sg);var su=new v(""),$w=new v("");function so(e){return!e.moduleRef}function zw(e){let n=so(e)?e.r3Injector:e.moduleRef.injector,t=n.get(R);return t.run(()=>{so(e)?e.r3Injector.resolveInjectorInitializers():e.moduleRef.resolveInjectorInitializers();let i=n.get(Mn),r;if(t.runOutsideAngular(()=>{r=t.onError.subscribe({next:i})}),so(e)){let o=()=>n.destroy(),a=e.platformInjector.get(su);a.add(o),n.onDestroy(()=>{r.unsubscribe(),a.delete(o)})}else{let o=()=>e.moduleRef.destroy(),a=e.platformInjector.get(su);a.add(o),e.moduleRef.onDestroy(()=>{Zr(e.allPlatformModules,e.moduleRef),r.unsubscribe(),a.delete(o)})}return Ww(i,t,()=>{let o=n.get(oi),a=o.add(),s=n.get(tu);return s.runInitializers(),s.donePromise.then(()=>{let c=n.get(au,ao);if(gg(c||ao),!n.get($w,!0))return so(e)?n.get(at):(e.allPlatformModules.push(e.moduleRef),e.moduleRef);if(so(e)){let d=n.get(at);return e.rootComponent!==void 0&&d.bootstrap(e.rootComponent),d}else return Gw?.(e.moduleRef,e.allPlatformModules),e.moduleRef}).finally(()=>{o.remove(a)})})})}var Gw;function Ww(e,n,t){try{let i=t();return ms(i)?i.catch(r=>{throw n.runOutsideAngular(()=>e(r)),r}):i}catch(i){throw n.runOutsideAngular(()=>e(i)),i}}var bs=null;function qw(e=[],n){return ae.create({name:n,providers:[{provide:Vr,useValue:"platform"},{provide:su,useValue:new Set([()=>bs=null])},...e]})}function Zw(e=[]){if(bs)return bs;let n=qw(e);return bs=n,pg(),Kw(n),n}function Kw(e){let n=e.get(es,null);Li(e,()=>{n?.forEach(t=>t())})}function Og(){return!1}var Qw=1e4;var M2=Qw-1e3;var ct=(()=>{class e{static __NG_ELEMENT_ID__=Yw}return e})();function Yw(e){return Xw(Re(),k(),(e&16)===16)}function Xw(e,n,t){if(Ft(e)&&!t){let i=ot(e.index,n);return new xn(i,i)}else if(e.type&175){let i=n[Ve];return new xn(i,n)}return null}function Fg(e){let{rootComponent:n,appProviders:t,platformProviders:i,platformRef:r}=e;X(W.BootstrapApplicationStart);try{let o=r?.injector??Zw(i),a=[ou(),Hp,...t||[]],s=new Xr({providers:a,parent:o,debugName:"",runEnvironmentInitializers:!1});return zw({r3Injector:s.injector,platformInjector:o,rootComponent:n})}catch(o){return Promise.reject(o)}finally{X(W.BootstrapApplicationEnd)}}function Y(e){return typeof e=="boolean"?e:e!=null&&e!=="false"}function lt(e,n=NaN){return!isNaN(parseFloat(e))&&!isNaN(Number(e))?Number(e):n}function cu(e,n){let t=yn(e),i=n.elementInjector||Pi();return new Ki(t).create(i,n.projectableNodes,n.hostElement,n.environmentInjector,n.directives,n.bindings)}var Pg=null;function sn(){return Pg}function lu(e){Pg??=e}var lo=class{},ys=(()=>{class e{historyGo(t){throw new Error("")}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:()=>u(Lg),providedIn:"platform"})}return e})();var Lg=(()=>{class e extends ys{_location;_history;_doc=u(z);constructor(){super(),this._location=window.location,this._history=window.history}getBaseHrefFromDOM(){return sn().getBaseHref(this._doc)}onPopState(t){let i=sn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("popstate",t,!1),()=>i.removeEventListener("popstate",t)}onHashChange(t){let i=sn().getGlobalEventTarget(this._doc,"window");return i.addEventListener("hashchange",t,!1),()=>i.removeEventListener("hashchange",t)}get href(){return this._location.href}get protocol(){return this._location.protocol}get hostname(){return this._location.hostname}get port(){return this._location.port}get pathname(){return this._location.pathname}get search(){return this._location.search}get hash(){return this._location.hash}set pathname(t){this._location.pathname=t}pushState(t,i,r){this._history.pushState(t,i,r)}replaceState(t,i,r){this._history.replaceState(t,i,r)}forward(){this._history.forward()}back(){this._history.back()}historyGo(t=0){this._history.go(t)}getState(){return this._history.state}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:()=>new e,providedIn:"platform"})}return e})();var _s=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({})}return e})();function uo(e,n){n=encodeURIComponent(n);for(let t of e.split(";")){let i=t.indexOf("="),[r,o]=i==-1?[t,""]:[t.slice(0,i),t.slice(i+1)];if(r.trim()===n)return decodeURIComponent(o)}return null}var pi=class{};var du="browser";function Vg(e){return e===du}var fo=class{_doc;constructor(n){this._doc=n}manager},Ds=(()=>{class e extends fo{constructor(t){super(t)}supports(t){return!0}addEventListener(t,i,r,o){return t.addEventListener(i,r,o),()=>this.removeEventListener(t,i,r,o)}removeEventListener(t,i,r,o){return t.removeEventListener(i,r,o)}static \u0275fac=function(i){return new(i||e)(T(z))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),Es=new v(""),mu=(()=>{class e{_zone;_plugins;_eventNameToPlugin=new Map;constructor(t,i){this._zone=i,t.forEach(a=>{a.manager=this});let r=t.filter(a=>!(a instanceof Ds));this._plugins=r.slice().reverse();let o=t.find(a=>a instanceof Ds);o&&this._plugins.push(o)}addEventListener(t,i,r,o){return this._findPluginFor(i).addEventListener(t,i,r,o)}getZone(){return this._zone}_findPluginFor(t){let i=this._eventNameToPlugin.get(t);if(i)return i;if(i=this._plugins.find(o=>o.supports(t)),!i)throw new E(5101,!1);return this._eventNameToPlugin.set(t,i),i}static \u0275fac=function(i){return new(i||e)(T(Es),T(R))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),uu="ng-app-id";function jg(e){for(let n of e)n.remove()}function Bg(e,n){let t=n.createElement("style");return t.textContent=e,t}function tC(e,n,t,i){let r=e.head?.querySelectorAll(`style[${uu}="${n}"],link[${uu}="${n}"]`);if(r)for(let o of r)o.removeAttribute(uu),o instanceof HTMLLinkElement?i.set(o.href.slice(o.href.lastIndexOf("/")+1),{usage:0,elements:[o]}):o.textContent&&t.set(o.textContent,{usage:0,elements:[o]})}function pu(e,n){let t=n.createElement("link");return t.setAttribute("rel","stylesheet"),t.setAttribute("href",e),t}var hu=(()=>{class e{doc;appId;nonce;inline=new Map;external=new Map;hosts=new Set;constructor(t,i,r,o={}){this.doc=t,this.appId=i,this.nonce=r,tC(t,i,this.inline,this.external),this.hosts.add(t.head)}addStyles(t,i){for(let r of t)this.addUsage(r,this.inline,Bg);i?.forEach(r=>this.addUsage(r,this.external,pu))}removeStyles(t,i){for(let r of t)this.removeUsage(r,this.inline);i?.forEach(r=>this.removeUsage(r,this.external))}addUsage(t,i,r){let o=i.get(t);o?o.usage++:i.set(t,{usage:1,elements:[...this.hosts].map(a=>this.addElement(a,r(t,this.doc)))})}removeUsage(t,i){let r=i.get(t);r&&(r.usage--,r.usage<=0&&(jg(r.elements),i.delete(t)))}ngOnDestroy(){for(let[,{elements:t}]of[...this.inline,...this.external])jg(t);this.hosts.clear()}addHost(t){this.hosts.add(t);for(let[i,{elements:r}]of this.inline)r.push(this.addElement(t,Bg(i,this.doc)));for(let[i,{elements:r}]of this.external)r.push(this.addElement(t,pu(i,this.doc)))}removeHost(t){this.hosts.delete(t)}addElement(t,i){return this.nonce&&i.setAttribute("nonce",this.nonce),t.appendChild(i)}static \u0275fac=function(i){return new(i||e)(T(z),T(er),T(ui,8),T(di))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),fu={svg:"http://www.w3.org/2000/svg",xhtml:"http://www.w3.org/1999/xhtml",xlink:"http://www.w3.org/1999/xlink",xml:"http://www.w3.org/XML/1998/namespace",xmlns:"http://www.w3.org/2000/xmlns/",math:"http://www.w3.org/1998/Math/MathML"},gu=/%COMP%/g;var Ug="%COMP%",nC=`_nghost-${Ug}`,iC=`_ngcontent-${Ug}`,rC=!0,oC=new v("",{factory:()=>rC});function aC(e){return iC.replace(gu,e)}function sC(e){return nC.replace(gu,e)}function $g(e,n){return n.map(t=>t.replace(gu,e))}var vu=(()=>{class e{eventManager;sharedStylesHost;appId;removeStylesOnCompDestroy;doc;ngZone;nonce;tracingService;rendererByCompId=new Map;defaultRenderer;constructor(t,i,r,o,a,s,c=null,l=null){this.eventManager=t,this.sharedStylesHost=i,this.appId=r,this.removeStylesOnCompDestroy=o,this.doc=a,this.ngZone=s,this.nonce=c,this.tracingService=l,this.defaultRenderer=new po(t,a,s,this.tracingService)}createRenderer(t,i){if(!t||!i)return this.defaultRenderer;let r=this.getOrCreateRenderer(t,i);return r instanceof Cs?r.applyToHost(t):r instanceof mo&&r.applyStyles(),r}getOrCreateRenderer(t,i){let r=this.rendererByCompId,o=r.get(i.id);if(!o){let a=this.doc,s=this.ngZone,c=this.eventManager,l=this.sharedStylesHost,d=this.removeStylesOnCompDestroy,f=this.tracingService;switch(i.encapsulation){case Et.Emulated:o=new Cs(c,l,i,this.appId,d,a,s,f);break;case Et.ShadowDom:return new ws(c,t,i,a,s,this.nonce,f,l);case Et.ExperimentalIsolatedShadowDom:return new ws(c,t,i,a,s,this.nonce,f);default:o=new mo(c,l,i,d,a,s,f);break}r.set(i.id,o)}return o}ngOnDestroy(){this.rendererByCompId.clear()}componentReplaced(t){this.rendererByCompId.delete(t)}static \u0275fac=function(i){return new(i||e)(T(mu),T(hu),T(er),T(oC),T(z),T(R),T(ui),T(Ht,8))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),po=class{eventManager;doc;ngZone;tracingService;data=Object.create(null);throwOnSyntheticProps=!0;constructor(n,t,i,r){this.eventManager=n,this.doc=t,this.ngZone=i,this.tracingService=r}destroy(){}destroyNode=null;createElement(n,t){return t?this.doc.createElementNS(fu[t]||t,n):this.doc.createElement(n)}createComment(n){return this.doc.createComment(n)}createText(n){return this.doc.createTextNode(n)}appendChild(n,t){(Hg(n)?n.content:n).appendChild(t)}insertBefore(n,t,i){n&&(Hg(n)?n.content:n).insertBefore(t,i)}removeChild(n,t){t.remove()}selectRootElement(n,t){let i=typeof n=="string"?this.doc.querySelector(n):n;if(!i)throw new E(-5104,!1);return t||(i.textContent=""),i}parentNode(n){return n.parentNode}nextSibling(n){return n.nextSibling}setAttribute(n,t,i,r){if(r){t=r+":"+t;let o=fu[r];o?n.setAttributeNS(o,t,i):n.setAttribute(t,i)}else n.setAttribute(t,i)}removeAttribute(n,t,i){if(i){let r=fu[i];r?n.removeAttributeNS(r,t):n.removeAttribute(`${i}:${t}`)}else n.removeAttribute(t)}addClass(n,t){n.classList.add(t)}removeClass(n,t){n.classList.remove(t)}setStyle(n,t,i,r){r&(rn.DashCase|rn.Important)?n.style.setProperty(t,i,r&rn.Important?"important":""):n.style[t]=i}removeStyle(n,t,i){i&rn.DashCase?n.style.removeProperty(t):n.style[t]=""}setProperty(n,t,i){n!=null&&(n[t]=i)}setValue(n,t){n.nodeValue=t}listen(n,t,i,r){if(typeof n=="string"&&(n=sn().getGlobalEventTarget(this.doc,n),!n))throw new E(5102,!1);let o=this.decoratePreventDefault(i);return this.tracingService?.wrapEventListener&&(o=this.tracingService.wrapEventListener(n,t,o)),this.eventManager.addEventListener(n,t,o,r)}decoratePreventDefault(n){return t=>{if(t==="__ngUnwrap__")return n;n(t)===!1&&t.preventDefault()}}};function Hg(e){return e.tagName==="TEMPLATE"&&e.content!==void 0}var ws=class extends po{hostEl;sharedStylesHost;shadowRoot;constructor(n,t,i,r,o,a,s,c){super(n,r,o,s),this.hostEl=t,this.sharedStylesHost=c,this.shadowRoot=t.attachShadow({mode:"open"}),this.sharedStylesHost&&this.sharedStylesHost.addHost(this.shadowRoot);let l=i.styles;l=$g(i.id,l);for(let f of l){let m=document.createElement("style");a&&m.setAttribute("nonce",a),m.textContent=f,this.shadowRoot.appendChild(m)}let d=i.getExternalStyles?.();if(d)for(let f of d){let m=pu(f,r);a&&m.setAttribute("nonce",a),this.shadowRoot.appendChild(m)}}nodeOrShadowRoot(n){return n===this.hostEl?this.shadowRoot:n}appendChild(n,t){return super.appendChild(this.nodeOrShadowRoot(n),t)}insertBefore(n,t,i){return super.insertBefore(this.nodeOrShadowRoot(n),t,i)}removeChild(n,t){return super.removeChild(null,t)}parentNode(n){return this.nodeOrShadowRoot(super.parentNode(this.nodeOrShadowRoot(n)))}destroy(){this.sharedStylesHost&&this.sharedStylesHost.removeHost(this.shadowRoot)}},mo=class extends po{sharedStylesHost;removeStylesOnCompDestroy;styles;styleUrls;constructor(n,t,i,r,o,a,s,c){super(n,o,a,s),this.sharedStylesHost=t,this.removeStylesOnCompDestroy=r;let l=i.styles;this.styles=c?$g(c,l):l,this.styleUrls=i.getExternalStyles?.(c)}applyStyles(){this.sharedStylesHost.addStyles(this.styles,this.styleUrls)}destroy(){this.removeStylesOnCompDestroy&&ci.size===0&&this.sharedStylesHost.removeStyles(this.styles,this.styleUrls)}},Cs=class extends mo{contentAttr;hostAttr;constructor(n,t,i,r,o,a,s,c){let l=r+"-"+i.id;super(n,t,i,o,a,s,c,l),this.contentAttr=aC(l),this.hostAttr=sC(l)}applyToHost(n){this.applyStyles(),this.setAttribute(n,this.hostAttr,"")}createElement(n,t){let i=super.createElement(n,t);return super.setAttribute(i,this.contentAttr,""),i}};var Is=class e extends lo{supportsDOMEvents=!0;static makeCurrent(){lu(new e)}onAndCancel(n,t,i,r){return n.addEventListener(t,i,r),()=>{n.removeEventListener(t,i,r)}}dispatchEvent(n,t){n.dispatchEvent(t)}remove(n){n.remove()}createElement(n,t){return t=t||this.getDefaultDocument(),t.createElement(n)}createHtmlDocument(){return document.implementation.createHTMLDocument("fakeTitle")}getDefaultDocument(){return document}isElementNode(n){return n.nodeType===Node.ELEMENT_NODE}isShadowRoot(n){return n instanceof DocumentFragment}getGlobalEventTarget(n,t){return t==="window"?window:t==="document"?n:t==="body"?n.body:null}getBaseHref(n){let t=cC();return t==null?null:lC(t)}resetBaseElement(){ho=null}getUserAgent(){return window.navigator.userAgent}getCookie(n){return uo(document.cookie,n)}},ho=null;function cC(){return ho=ho||document.head.querySelector("base"),ho?ho.getAttribute("href"):null}function lC(e){return new URL(e,document.baseURI).pathname}var dC=(()=>{class e{build(){return new XMLHttpRequest}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),zg=["alt","control","meta","shift"],uC={"\b":"Backspace","	":"Tab","\x7F":"Delete","\x1B":"Escape",Del:"Delete",Esc:"Escape",Left:"ArrowLeft",Right:"ArrowRight",Up:"ArrowUp",Down:"ArrowDown",Menu:"ContextMenu",Scroll:"ScrollLock",Win:"OS"},fC={alt:e=>e.altKey,control:e=>e.ctrlKey,meta:e=>e.metaKey,shift:e=>e.shiftKey},Gg=(()=>{class e extends fo{constructor(t){super(t)}supports(t){return e.parseEventName(t)!=null}addEventListener(t,i,r,o){let a=e.parseEventName(i),s=e.eventCallback(a.fullKey,r,this.manager.getZone());return this.manager.getZone().runOutsideAngular(()=>sn().onAndCancel(t,a.domEventName,s,o))}static parseEventName(t){let i=t.toLowerCase().split("."),r=i.shift();if(i.length===0||!(r==="keydown"||r==="keyup"))return null;let o=e._normalizeKey(i.pop()),a="",s=i.indexOf("code");if(s>-1&&(i.splice(s,1),a="code."),zg.forEach(l=>{let d=i.indexOf(l);d>-1&&(i.splice(d,1),a+=l+".")}),a+=o,i.length!=0||o.length===0)return null;let c={};return c.domEventName=r,c.fullKey=a,c}static matchEventFullKeyCode(t,i){let r=uC[t.key]||t.key,o="";return i.indexOf("code.")>-1&&(r=t.code,o="code."),r==null||!r?!1:(r=r.toLowerCase(),r===" "?r="space":r==="."&&(r="dot"),zg.forEach(a=>{if(a!==r){let s=fC[a];s(t)&&(o+=a+".")}}),o+=r,o===i)}static eventCallback(t,i,r){return o=>{e.matchEventFullKeyCode(o,t)&&r.runGuarded(()=>i(o))}}static _normalizeKey(t){return t==="esc"?"escape":t}static \u0275fac=function(i){return new(i||e)(T(z))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})();async function bu(e,n,t){let i=F({rootComponent:e},pC(n,t));return Fg(i)}function pC(e,n){return{platformRef:n?.platformRef,appProviders:[...bC,...e?.providers??[]],platformProviders:vC}}function mC(){Is.makeCurrent()}function hC(){return new He}function gC(){return Sd(document),document}var vC=[{provide:di,useValue:du},{provide:es,useValue:mC,multi:!0},{provide:z,useFactory:gC}];var bC=[{provide:Vr,useValue:"root"},{provide:He,useFactory:hC},{provide:Es,useClass:Ds,multi:!0},{provide:Es,useClass:Gg,multi:!0},vu,hu,mu,{provide:Ue,useExisting:vu},{provide:pi,useClass:dC},[]];var Gt=class e{headers;normalizedNames=new Map;lazyInit;lazyUpdate=null;constructor(n){n?typeof n=="string"?this.lazyInit=()=>{this.headers=new Map,n.split(`
`).forEach(t=>{let i=t.indexOf(":");if(i>0){let r=t.slice(0,i),o=t.slice(i+1).trim();this.addHeaderEntry(r,o)}})}:typeof Headers<"u"&&n instanceof Headers?(this.headers=new Map,n.forEach((t,i)=>{this.addHeaderEntry(i,t)})):this.lazyInit=()=>{this.headers=new Map,Object.entries(n).forEach(([t,i])=>{this.setHeaderEntries(t,i)})}:this.headers=new Map}has(n){return this.init(),this.headers.has(n.toLowerCase())}get(n){this.init();let t=this.headers.get(n.toLowerCase());return t&&t.length>0?t[0]:null}keys(){return this.init(),Array.from(this.normalizedNames.values())}getAll(n){return this.init(),this.headers.get(n.toLowerCase())||null}append(n,t){return this.clone({name:n,value:t,op:"a"})}set(n,t){return this.clone({name:n,value:t,op:"s"})}delete(n,t){return this.clone({name:n,value:t,op:"d"})}maybeSetNormalizedName(n,t){this.normalizedNames.has(t)||this.normalizedNames.set(t,n)}init(){this.lazyInit&&(this.lazyInit instanceof e?this.copyFrom(this.lazyInit):this.lazyInit(),this.lazyInit=null,this.lazyUpdate&&(this.lazyUpdate.forEach(n=>this.applyUpdate(n)),this.lazyUpdate=null))}copyFrom(n){n.init(),Array.from(n.headers.keys()).forEach(t=>{this.headers.set(t,n.headers.get(t)),this.normalizedNames.set(t,n.normalizedNames.get(t))})}clone(n){let t=new e;return t.lazyInit=this.lazyInit&&this.lazyInit instanceof e?this.lazyInit:this,t.lazyUpdate=(this.lazyUpdate||[]).concat([n]),t}applyUpdate(n){let t=n.name.toLowerCase();switch(n.op){case"a":case"s":let i=n.value;if(typeof i=="string"&&(i=[i]),i.length===0)return;this.maybeSetNormalizedName(n.name,t);let r=(n.op==="a"?this.headers.get(t):void 0)||[];r.push(...i),this.headers.set(t,r);break;case"d":let o=n.value;if(!o)this.headers.delete(t),this.normalizedNames.delete(t);else{let a=this.headers.get(t);if(!a)return;a=a.filter(s=>o.indexOf(s)===-1),a.length===0?(this.headers.delete(t),this.normalizedNames.delete(t)):this.headers.set(t,a)}break}}addHeaderEntry(n,t){let i=n.toLowerCase();this.maybeSetNormalizedName(n,i),this.headers.has(i)?this.headers.get(i).push(t):this.headers.set(i,[t])}setHeaderEntries(n,t){let i=(Array.isArray(t)?t:[t]).map(o=>o.toString()),r=n.toLowerCase();this.headers.set(r,i),this.maybeSetNormalizedName(n,r)}forEach(n){this.init(),Array.from(this.normalizedNames.keys()).forEach(t=>n(this.normalizedNames.get(t),this.headers.get(t)))}};var Ts=class{map=new Map;set(n,t){return this.map.set(n,t),this}get(n){return this.map.has(n)||this.map.set(n,n.defaultValue()),this.map.get(n)}delete(n){return this.map.delete(n),this}has(n){return this.map.has(n)}keys(){return this.map.keys()}},Ss=class{encodeKey(n){return Wg(n)}encodeValue(n){return Wg(n)}decodeKey(n){return decodeURIComponent(n)}decodeValue(n){return decodeURIComponent(n)}};function yC(e,n){let t=new Map;return e.length>0&&e.replace(/^\?/,"").split("&").forEach(r=>{let o=r.indexOf("="),[a,s]=o==-1?[n.decodeKey(r),""]:[n.decodeKey(r.slice(0,o)),n.decodeValue(r.slice(o+1))],c=t.get(a)||[];c.push(s),t.set(a,c)}),t}var _C=/%(\d[a-f0-9])/gi,DC={40:"@","3A":":",24:"$","2C":",","3B":";","3D":"=","3F":"?","2F":"/"};function Wg(e){return encodeURIComponent(e).replace(_C,(n,t)=>DC[t]??n)}function Ms(e){return`${e}`}var cn=class e{map;encoder;updates=null;cloneFrom=null;constructor(n={}){if(this.encoder=n.encoder||new Ss,n.fromString){if(n.fromObject)throw new E(2805,!1);this.map=yC(n.fromString,this.encoder)}else n.fromObject?(this.map=new Map,Object.keys(n.fromObject).forEach(t=>{let i=n.fromObject[t],r=Array.isArray(i)?i.map(Ms):[Ms(i)];this.map.set(t,r)})):this.map=null}has(n){return this.init(),this.map.has(n)}get(n){this.init();let t=this.map.get(n);return t?t[0]:null}getAll(n){return this.init(),this.map.get(n)||null}keys(){return this.init(),Array.from(this.map.keys())}append(n,t){return this.clone({param:n,value:t,op:"a"})}appendAll(n){let t=[];return Object.keys(n).forEach(i=>{let r=n[i];Array.isArray(r)?r.forEach(o=>{t.push({param:i,value:o,op:"a"})}):t.push({param:i,value:r,op:"a"})}),this.clone(t)}set(n,t){return this.clone({param:n,value:t,op:"s"})}delete(n,t){return this.clone({param:n,value:t,op:"d"})}toString(){return this.init(),this.keys().map(n=>{let t=this.encoder.encodeKey(n);return this.map.get(n).map(i=>t+"="+this.encoder.encodeValue(i)).join("&")}).filter(n=>n!=="").join("&")}clone(n){let t=new e({encoder:this.encoder});return t.cloneFrom=this.cloneFrom||this,t.updates=(this.updates||[]).concat(n),t}init(){this.map===null&&(this.map=new Map),this.cloneFrom!==null&&(this.cloneFrom.init(),this.cloneFrom.keys().forEach(n=>this.map.set(n,this.cloneFrom.map.get(n))),this.updates.forEach(n=>{switch(n.op){case"a":case"s":let t=(n.op==="a"?this.map.get(n.param):void 0)||[];t.push(Ms(n.value)),this.map.set(n.param,t);break;case"d":if(n.value!==void 0){let i=this.map.get(n.param)||[],r=i.indexOf(Ms(n.value));r!==-1&&i.splice(r,1),i.length>0?this.map.set(n.param,i):this.map.delete(n.param)}else{this.map.delete(n.param);break}}}),this.cloneFrom=this.updates=null)}};function wC(e){switch(e){case"DELETE":case"GET":case"HEAD":case"OPTIONS":case"JSONP":return!1;default:return!0}}function qg(e){return typeof ArrayBuffer<"u"&&e instanceof ArrayBuffer}function Zg(e){return typeof Blob<"u"&&e instanceof Blob}function Kg(e){return typeof FormData<"u"&&e instanceof FormData}function CC(e){return typeof URLSearchParams<"u"&&e instanceof URLSearchParams}var go="Content-Type",As="Accept",Qg="text/plain",Yg="application/json",Xg=`${Yg}, ${Qg}, */*`,or=class e{url;body=null;headers;context;reportProgress=!1;withCredentials=!1;credentials;keepalive=!1;cache;priority;mode;redirect;referrer;integrity;referrerPolicy;responseType="json";method;params;urlWithParams;transferCache;timeout;constructor(n,t,i,r){this.url=t,this.method=n.toUpperCase();let o;if(wC(this.method)||r?(this.body=i!==void 0?i:null,o=r):o=i,o){if(this.reportProgress=!!o.reportProgress,this.withCredentials=!!o.withCredentials,this.keepalive=!!o.keepalive,o.responseType&&(this.responseType=o.responseType),o.headers&&(this.headers=o.headers),o.context&&(this.context=o.context),o.params&&(this.params=o.params),o.priority&&(this.priority=o.priority),o.cache&&(this.cache=o.cache),o.credentials&&(this.credentials=o.credentials),typeof o.timeout=="number"){if(o.timeout<1||!Number.isInteger(o.timeout))throw new E(2822,"");this.timeout=o.timeout}o.mode&&(this.mode=o.mode),o.redirect&&(this.redirect=o.redirect),o.integrity&&(this.integrity=o.integrity),o.referrer&&(this.referrer=o.referrer),o.referrerPolicy&&(this.referrerPolicy=o.referrerPolicy),this.transferCache=o.transferCache}if(this.headers??=new Gt,this.context??=new Ts,!this.params)this.params=new cn,this.urlWithParams=t;else{let a=this.params.toString();if(a.length===0)this.urlWithParams=t;else{let s=t.indexOf("?"),c=s===-1?"?":s<t.length-1?"&":"";this.urlWithParams=t+c+a}}}serializeBody(){return this.body===null?null:typeof this.body=="string"||qg(this.body)||Zg(this.body)||Kg(this.body)||CC(this.body)?this.body:this.body instanceof cn?this.body.toString():typeof this.body=="object"||typeof this.body=="boolean"||Array.isArray(this.body)?JSON.stringify(this.body):this.body.toString()}detectContentTypeHeader(){return this.body===null||Kg(this.body)?null:Zg(this.body)?this.body.type||null:qg(this.body)?null:typeof this.body=="string"?Qg:this.body instanceof cn?"application/x-www-form-urlencoded;charset=UTF-8":typeof this.body=="object"||typeof this.body=="number"||typeof this.body=="boolean"?Yg:null}clone(n={}){let t=n.method||this.method,i=n.url||this.url,r=n.responseType||this.responseType,o=n.keepalive??this.keepalive,a=n.priority||this.priority,s=n.cache||this.cache,c=n.mode||this.mode,l=n.redirect||this.redirect,d=n.credentials||this.credentials,f=n.referrer||this.referrer,m=n.integrity||this.integrity,p=n.referrerPolicy||this.referrerPolicy,h=n.transferCache??this.transferCache,D=n.timeout??this.timeout,w=n.body!==void 0?n.body:this.body,C=n.withCredentials??this.withCredentials,ee=n.reportProgress??this.reportProgress,Pe=n.headers||this.headers,me=n.params||this.params,fn=n.context??this.context;return n.setHeaders!==void 0&&(Pe=Object.keys(n.setHeaders).reduce((pn,qt)=>pn.set(qt,n.setHeaders[qt]),Pe)),n.setParams&&(me=Object.keys(n.setParams).reduce((pn,qt)=>pn.set(qt,n.setParams[qt]),me)),new e(t,i,w,{params:me,headers:Pe,context:fn,reportProgress:ee,responseType:r,withCredentials:C,transferCache:h,keepalive:o,cache:s,priority:a,timeout:D,mode:c,redirect:l,credentials:d,referrer:f,integrity:m,referrerPolicy:p})}},ln=(function(e){return e[e.Sent=0]="Sent",e[e.UploadProgress=1]="UploadProgress",e[e.ResponseHeader=2]="ResponseHeader",e[e.DownloadProgress=3]="DownloadProgress",e[e.Response=4]="Response",e[e.User=5]="User",e})(ln||{}),ar=class{headers;status;statusText;url;ok;type;redirected;responseType;constructor(n,t=200,i="OK"){this.headers=n.headers||new Gt,this.status=n.status!==void 0?n.status:t,this.statusText=n.statusText||i,this.url=n.url||null,this.redirected=n.redirected,this.responseType=n.responseType,this.ok=this.status>=200&&this.status<300}},vo=class e extends ar{constructor(n={}){super(n)}type=ln.ResponseHeader;clone(n={}){return new e({headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0})}},sr=class e extends ar{body;constructor(n={}){super(n),this.body=n.body!==void 0?n.body:null}type=ln.Response;clone(n={}){return new e({body:n.body!==void 0?n.body:this.body,headers:n.headers||this.headers,status:n.status!==void 0?n.status:this.status,statusText:n.statusText||this.statusText,url:n.url||this.url||void 0,redirected:n.redirected??this.redirected,responseType:n.responseType??this.responseType})}},zt=class extends ar{name="HttpErrorResponse";message;error;ok=!1;constructor(n){super(n,0,"Unknown Error"),this.status>=200&&this.status<300?this.message=`Http failure during parsing for ${n.url||"(unknown url)"}`:this.message=`Http failure response for ${n.url||"(unknown url)"}: ${n.status} ${n.statusText}`,this.error=n.error||null}},Jg=200,EC=204;var IC=/^\)\]\}',?\n/,ev=new v(""),xs=(()=>{class e{fetchImpl=u(_u,{optional:!0})?.fetch??((...t)=>globalThis.fetch(...t));ngZone=u(R);destroyRef=u(Dt);handle(t){return new A(i=>{let r=new AbortController;this.doRequest(t,r.signal,i).then(Du,a=>i.error(new zt({error:a})));let o;return t.timeout&&(o=this.ngZone.runOutsideAngular(()=>setTimeout(()=>{r.signal.aborted||r.abort(new DOMException("signal timed out","TimeoutError"))},t.timeout))),()=>{o!==void 0&&clearTimeout(o),r.abort()}})}async doRequest(t,i,r){let o=this.createRequestInit(t),a;try{let D=this.ngZone.runOutsideAngular(()=>this.fetchImpl(t.urlWithParams,F({signal:i},o)));MC(D),r.next({type:ln.Sent}),a=await D}catch(D){r.error(new zt({error:D,status:D.status??0,statusText:D.statusText,url:t.urlWithParams,headers:D.headers}));return}let s=new Gt(a.headers),c=a.statusText,l=a.url||t.urlWithParams,d=a.status,f=null;if(t.reportProgress&&r.next(new vo({headers:s,status:d,statusText:c,url:l})),a.body){let D=a.headers.get("content-length"),w=[],C=a.body.getReader(),ee=0,Pe,me,fn=typeof Zone<"u"&&Zone.current,pn=!1;if(await this.ngZone.runOutsideAngular(async()=>{for(;;){if(this.destroyRef.destroyed){await C.cancel(),pn=!0;break}let{done:vr,value:ic}=await C.read();if(vr)break;if(w.push(ic),ee+=ic.length,t.reportProgress){me=t.responseType==="text"?(me??"")+(Pe??=new TextDecoder).decode(ic,{stream:!0}):void 0;let of=()=>r.next({type:ln.DownloadProgress,total:D?+D:void 0,loaded:ee,partialText:me});fn?fn.run(of):of()}}}),pn){r.complete();return}let qt=this.concatChunks(w,ee);try{let vr=a.headers.get(go)??"";f=this.parseBody(t,qt,vr,d)}catch(vr){r.error(new zt({error:vr,headers:new Gt(a.headers),status:a.status,statusText:a.statusText,url:a.url||t.urlWithParams}));return}}d===0&&(d=f?Jg:0);let m=d>=200&&d<300,p=a.redirected,h=a.type;m?(r.next(new sr({body:f,headers:s,status:d,statusText:c,url:l,redirected:p,responseType:h})),r.complete()):r.error(new zt({error:f,headers:s,status:d,statusText:c,url:l,redirected:p,responseType:h}))}parseBody(t,i,r,o){switch(t.responseType){case"json":let a=new TextDecoder().decode(i).replace(IC,"");if(a==="")return null;try{return JSON.parse(a)}catch(s){if(o<200||o>=300)return a;throw s}case"text":return new TextDecoder().decode(i);case"blob":return new Blob([i],{type:r});case"arraybuffer":return i.buffer}}createRequestInit(t){let i={},r;if(r=t.credentials,t.withCredentials&&(r="include"),t.headers.forEach((o,a)=>i[o]=a.join(",")),t.headers.has(As)||(i[As]=Xg),!t.headers.has(go)){let o=t.detectContentTypeHeader();o!==null&&(i[go]=o)}return{body:t.serializeBody(),method:t.method,headers:i,credentials:r,keepalive:t.keepalive,cache:t.cache,priority:t.priority,mode:t.mode,redirect:t.redirect,referrer:t.referrer,integrity:t.integrity,referrerPolicy:t.referrerPolicy}}concatChunks(t,i){let r=new Uint8Array(i),o=0;for(let a of t)r.set(a,o),o+=a.length;return r}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),_u=class{};function Du(){}function MC(e){e.then(Du,Du)}var xC=/^\)\]\}',?\n/;var wu=(()=>{class e{xhrFactory;tracingService=u(Ht,{optional:!0});constructor(t){this.xhrFactory=t}maybePropagateTrace(t){return this.tracingService?.propagate?this.tracingService.propagate(t):t}handle(t){if(t.method==="JSONP")throw new E(-2800,!1);let i=this.xhrFactory;return ke(null).pipe(ht(()=>new A(o=>{let a=i.build();if(a.open(t.method,t.urlWithParams),t.withCredentials&&(a.withCredentials=!0),t.headers.forEach((w,C)=>a.setRequestHeader(w,C.join(","))),t.headers.has(As)||a.setRequestHeader(As,Xg),!t.headers.has(go)){let w=t.detectContentTypeHeader();w!==null&&a.setRequestHeader(go,w)}if(t.timeout&&(a.timeout=t.timeout),t.responseType){let w=t.responseType.toLowerCase();a.responseType=w!=="json"?w:"text"}let s=t.serializeBody(),c=null,l=()=>{if(c!==null)return c;let w=a.statusText||"OK",C=new Gt(a.getAllResponseHeaders()),ee=a.responseURL||t.url;return c=new vo({headers:C,status:a.status,statusText:w,url:ee}),c},d=this.maybePropagateTrace(()=>{let{headers:w,status:C,statusText:ee,url:Pe}=l(),me=null;C!==EC&&(me=typeof a.response>"u"?a.responseText:a.response),C===0&&(C=me?Jg:0);let fn=C>=200&&C<300;if(t.responseType==="json"&&typeof me=="string"){let pn=me;me=me.replace(xC,"");try{me=me!==""?JSON.parse(me):null}catch(qt){me=pn,fn&&(fn=!1,me={error:qt,text:me})}}fn?(o.next(new sr({body:me,headers:w,status:C,statusText:ee,url:Pe||void 0})),o.complete()):o.error(new zt({error:me,headers:w,status:C,statusText:ee,url:Pe||void 0}))}),f=this.maybePropagateTrace(w=>{let{url:C}=l(),ee=new zt({error:w,status:a.status||0,statusText:a.statusText||"Unknown Error",url:C||void 0});o.error(ee)}),m=f;t.timeout&&(m=this.maybePropagateTrace(w=>{let{url:C}=l(),ee=new zt({error:new DOMException("Request timed out","TimeoutError"),status:a.status||0,statusText:a.statusText||"Request timeout",url:C||void 0});o.error(ee)}));let p=!1,h=this.maybePropagateTrace(w=>{p||(o.next(l()),p=!0);let C={type:ln.DownloadProgress,loaded:w.loaded};w.lengthComputable&&(C.total=w.total),t.responseType==="text"&&a.responseText&&(C.partialText=a.responseText),o.next(C)}),D=this.maybePropagateTrace(w=>{let C={type:ln.UploadProgress,loaded:w.loaded};w.lengthComputable&&(C.total=w.total),o.next(C)});return a.addEventListener("load",d),a.addEventListener("error",f),a.addEventListener("timeout",m),a.addEventListener("abort",f),t.reportProgress&&(a.addEventListener("progress",h),s!==null&&a.upload&&a.upload.addEventListener("progress",D)),a.send(s),o.next({type:ln.Sent}),()=>{a.removeEventListener("error",f),a.removeEventListener("abort",f),a.removeEventListener("load",d),a.removeEventListener("timeout",m),t.reportProgress&&(a.removeEventListener("progress",h),s!==null&&a.upload&&a.upload.removeEventListener("progress",D)),a.readyState!==a.DONE&&a.abort()}})))}static \u0275fac=function(i){return new(i||e)(T(pi))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function TC(e,n){return n(e)}function SC(e,n,t){return(i,r)=>Li(t,()=>n(i,o=>e(o,r)))}var tv=new v("",{factory:()=>[]}),nv=new v(""),iv=new v("",{factory:()=>!0});var Ns=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=T(wu),r},providedIn:"root"})}return e})();var ks=(()=>{class e{backend;injector;chain=null;pendingTasks=u(Na);contributeToStability=u(iv);constructor(t,i){this.backend=t,this.injector=i}handle(t){if(this.chain===null){let i=Array.from(new Set([...this.injector.get(tv),...this.injector.get(nv,[])]));this.chain=i.reduceRight((r,o)=>SC(r,o,this.injector),TC)}if(this.contributeToStability){let i=this.pendingTasks.add();return this.chain(t,r=>this.backend.handle(r)).pipe(Tr(i))}else return this.chain(t,i=>this.backend.handle(i))}static \u0275fac=function(i){return new(i||e)(T(Ns),T(Ie))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Cu=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=T(ks),r},providedIn:"root"})}return e})();function yu(e,n){return{body:n,headers:e.headers,context:e.context,observe:e.observe,params:e.params,reportProgress:e.reportProgress,responseType:e.responseType,withCredentials:e.withCredentials,credentials:e.credentials,transferCache:e.transferCache,timeout:e.timeout,keepalive:e.keepalive,priority:e.priority,cache:e.cache,mode:e.mode,redirect:e.redirect,integrity:e.integrity,referrer:e.referrer,referrerPolicy:e.referrerPolicy}}var cr=(()=>{class e{handler;constructor(t){this.handler=t}request(t,i,r={}){let o;if(t instanceof or)o=t;else{let c;r.headers instanceof Gt?c=r.headers:c=new Gt(r.headers);let l;r.params&&(r.params instanceof cn?l=r.params:l=new cn({fromObject:r.params})),o=new or(t,i,r.body!==void 0?r.body:null,{headers:c,context:r.context,params:l,reportProgress:r.reportProgress,responseType:r.responseType||"json",withCredentials:r.withCredentials,transferCache:r.transferCache,keepalive:r.keepalive,priority:r.priority,cache:r.cache,mode:r.mode,redirect:r.redirect,credentials:r.credentials,referrer:r.referrer,referrerPolicy:r.referrerPolicy,integrity:r.integrity,timeout:r.timeout})}let a=ke(o).pipe(Sc(c=>this.handler.handle(c)));if(t instanceof or||r.observe==="events")return a;let s=a.pipe(Ee(c=>c instanceof sr));switch(r.observe||"body"){case"body":switch(o.responseType){case"arraybuffer":return s.pipe(ie(c=>{if(c.body!==null&&!(c.body instanceof ArrayBuffer))throw new E(2806,!1);return c.body}));case"blob":return s.pipe(ie(c=>{if(c.body!==null&&!(c.body instanceof Blob))throw new E(2807,!1);return c.body}));case"text":return s.pipe(ie(c=>{if(c.body!==null&&typeof c.body!="string")throw new E(2808,!1);return c.body}));default:return s.pipe(ie(c=>c.body))}case"response":return s;default:throw new E(2809,!1)}}delete(t,i={}){return this.request("DELETE",t,i)}get(t,i={}){return this.request("GET",t,i)}head(t,i={}){return this.request("HEAD",t,i)}jsonp(t,i){return this.request("JSONP",t,{params:new cn().append(i,"JSONP_CALLBACK"),observe:"body",responseType:"json"})}options(t,i={}){return this.request("OPTIONS",t,i)}patch(t,i,r={}){return this.request("PATCH",t,yu(r,i))}post(t,i,r={}){return this.request("POST",t,yu(r,i))}put(t,i,r={}){return this.request("PUT",t,yu(r,i))}static \u0275fac=function(i){return new(i||e)(T(Cu))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var AC=new v("",{factory:()=>!0}),kC="XSRF-TOKEN",NC=new v("",{factory:()=>kC}),RC="X-XSRF-TOKEN",OC=new v("",{factory:()=>RC}),FC=(()=>{class e{cookieName=u(NC);doc=u(z);lastCookieString="";lastToken=null;parseCount=0;getToken(){let t=this.doc.cookie||"";return t!==this.lastCookieString&&(this.parseCount++,this.lastToken=uo(t,this.cookieName),this.lastCookieString=t),this.lastToken}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),rv=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=T(FC),r},providedIn:"root"})}return e})();function PC(e,n){if(!u(AC)||e.method==="GET"||e.method==="HEAD")return n(e);try{let r=u(ys).href,{origin:o}=new URL(r),{origin:a}=new URL(e.url,o);if(o!==a)return n(e)}catch{return n(e)}let t=u(rv).getToken(),i=u(OC);return t!=null&&!e.headers.has(i)&&(e=e.clone({headers:e.headers.set(i,t)})),n(e)}var Eu=(function(e){return e[e.Interceptors=0]="Interceptors",e[e.LegacyInterceptors=1]="LegacyInterceptors",e[e.CustomXsrfConfiguration=2]="CustomXsrfConfiguration",e[e.NoXsrfProtection=3]="NoXsrfProtection",e[e.JsonpSupport=4]="JsonpSupport",e[e.RequestsMadeViaParent=5]="RequestsMadeViaParent",e[e.Fetch=6]="Fetch",e})(Eu||{});function LC(e,n){return{\u0275kind:e,\u0275providers:n}}function Iu(...e){let n=[cr,ks,{provide:Cu,useExisting:ks},{provide:Ns,useFactory:()=>u(ev,{optional:!0})??u(wu)},{provide:tv,useValue:PC,multi:!0}];for(let t of e)n.push(...t.\u0275providers);return vt(n)}function Mu(){return LC(Eu.Fetch,[xs,{provide:ev,useExisting:xs},{provide:Ns,useExisting:xs}])}var xu=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:function(i){let r=null;return i?r=new(i||e):r=T(jC),r},providedIn:"root"})}return e})(),jC=(()=>{class e extends xu{_doc;constructor(t){super(),this._doc=t}sanitize(t,i){if(i==null)return null;switch(t){case Oe.NONE:return i;case Oe.HTML:return Sn(i,"HTML")?Bt(i):Pd(this._doc,String(i)).toString();case Oe.STYLE:return Sn(i,"Style")?Bt(i):i;case Oe.SCRIPT:if(Sn(i,"Script"))return Bt(i);throw new E(5200,!1);case Oe.URL:return Sn(i,"URL")?Bt(i):to(String(i));case Oe.RESOURCE_URL:if(Sn(i,"ResourceURL"))return Bt(i);throw new E(5201,!1);default:throw new E(5202,!1)}}bypassSecurityTrustHtml(t){return kd(t)}bypassSecurityTrustStyle(t){return Nd(t)}bypassSecurityTrustScript(t){return Rd(t)}bypassSecurityTrustUrl(t){return Od(t)}bypassSecurityTrustResourceUrl(t){return Fd(t)}static \u0275fac=function(i){return new(i||e)(T(z))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Tu="Service workers are disabled or not supported by this browser",lr=class{serviceWorker;worker;registration;events;constructor(n,t){if(this.serviceWorker=n,!n)this.worker=this.events=this.registration=new A(i=>i.error(new E(5601,!1)));else{let i=null,r=new V;this.worker=new A(l=>(i!==null&&l.next(i),r.subscribe(d=>l.next(d))));let o=()=>{let{controller:l}=n;l!==null&&(i=l,r.next(i))};n.addEventListener("controllerchange",o),o(),this.registration=this.worker.pipe(ht(()=>n.getRegistration().then(l=>{if(!l)throw new E(5601,!1);return l})));let a=new V;this.events=a.asObservable();let s=l=>{let{data:d}=l;d?.type&&a.next(d)};n.addEventListener("message",s),t?.get(at,null,{optional:!0})?.onDestroy(()=>{n.removeEventListener("controllerchange",o),n.removeEventListener("message",s)})}}postMessage(n,t){return new Promise(i=>{this.worker.pipe(Kt(1)).subscribe(r=>{r.postMessage(F({action:n},t)),i()})})}postMessageWithOperation(n,t,i){let r=this.waitForOperationCompleted(i),o=this.postMessage(n,t);return Promise.all([o,r]).then(([,a])=>a)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(n){let t;return typeof n=="string"?t=i=>i.type===n:t=i=>n.includes(i.type),this.events.pipe(Ee(t))}nextEventOfType(n){return this.eventsOfType(n).pipe(Kt(1))}waitForOperationCompleted(n){return new Promise((t,i)=>{this.eventsOfType("OPERATION_COMPLETED").pipe(Ee(r=>r.nonce===n),Kt(1),ie(r=>{if(r.result!==void 0)return r.result;throw new Error(r.error)})).subscribe({next:t,error:i})})}get isEnabled(){return!!this.serviceWorker}},HC=(()=>{class e{sw;messages;notificationClicks;notificationCloses;pushSubscriptionChanges;subscription;get isEnabled(){return this.sw.isEnabled}pushManager=null;subscriptionChanges=new V;constructor(t){if(this.sw=t,!t.isEnabled){this.messages=Zt,this.notificationClicks=Zt,this.notificationCloses=Zt,this.pushSubscriptionChanges=Zt,this.subscription=Zt;return}this.messages=this.sw.eventsOfType("PUSH").pipe(ie(r=>r.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(ie(r=>r.data)),this.notificationCloses=this.sw.eventsOfType("NOTIFICATION_CLOSE").pipe(ie(r=>r.data)),this.pushSubscriptionChanges=this.sw.eventsOfType("PUSH_SUBSCRIPTION_CHANGE").pipe(ie(r=>r.data)),this.pushManager=this.sw.registration.pipe(ie(r=>r.pushManager));let i=this.pushManager.pipe(ht(r=>r.getSubscription()));this.subscription=new A(r=>{let o=i.subscribe(r),a=this.subscriptionChanges.subscribe(r);return()=>{o.unsubscribe(),a.unsubscribe()}})}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(Tu));let i={userVisibleOnly:!0},r=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),o=new Uint8Array(new ArrayBuffer(r.length));for(let a=0;a<r.length;a++)o[a]=r.charCodeAt(a);return i.applicationServerKey=o,new Promise((a,s)=>{this.pushManager.pipe(ht(c=>c.subscribe(i)),Kt(1)).subscribe({next:c=>{this.subscriptionChanges.next(c),a(c)},error:s})})}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(Tu));let t=i=>{if(i===null)throw new E(5602,!1);return i.unsubscribe().then(r=>{if(!r)throw new E(5603,!1);this.subscriptionChanges.next(null)})};return new Promise((i,r)=>{this.subscription.pipe(Kt(1),ht(t)).subscribe({next:i,error:r})})}decodeBase64(t){return atob(t)}static \u0275fac=function(i){return new(i||e)(T(lr))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),UC=(()=>{class e{sw;versionUpdates;unrecoverable;get isEnabled(){return this.sw.isEnabled}ongoingCheckForUpdate=null;constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=Zt,this.unrecoverable=Zt;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(Tu));if(this.ongoingCheckForUpdate)return this.ongoingCheckForUpdate;let t=this.sw.generateNonce();return this.ongoingCheckForUpdate=this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t).finally(()=>{this.ongoingCheckForUpdate=null}),this.ongoingCheckForUpdate}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new E(5601,!1));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}static \u0275fac=function(i){return new(i||e)(T(lr))};static \u0275prov=b({token:e,factory:e.\u0275fac})}return e})(),av=new v("");function $C(){let e=u(bo);if(!("serviceWorker"in navigator&&e.enabled!==!1))return;let n=u(av),t=u(R),i=u(at);t.runOutsideAngular(()=>{let r=navigator.serviceWorker,o=()=>r.controller?.postMessage({action:"INITIALIZE"});r.addEventListener("controllerchange",o),i.onDestroy(()=>{r.removeEventListener("controllerchange",o)})}),t.runOutsideAngular(()=>{let r,{registrationStrategy:o}=e;if(typeof o=="function")r=new Promise(a=>o().subscribe(()=>a()));else{let[a,...s]=(o||"registerWhenStable:30000").split(":");switch(a){case"registerImmediately":r=Promise.resolve();break;case"registerWithDelay":r=ov(+s[0]||0);break;case"registerWhenStable":r=Promise.race([i.whenStable(),ov(+s[0])]);break;default:throw new E(5600,!1)}}r.then(()=>{i.destroyed||navigator.serviceWorker.register(n,{scope:e.scope,updateViaCache:e.updateViaCache,type:e.type}).catch(a=>console.error(Kn(5604,!1)))})})}function ov(e){return new Promise(n=>setTimeout(n,e))}function zC(){let e=u(bo),n=u(ae),t=!0;return new lr(t&&e.enabled!==!1?navigator.serviceWorker:void 0,n)}var bo=class{enabled;updateViaCache;type;scope;registrationStrategy};function sv(e,n={}){return vt([HC,UC,{provide:av,useValue:e},{provide:bo,useValue:n},{provide:lr,useFactory:zC},eu($C)])}var cv={providers:[Al(),ru(),Iu(Mu()),sv("ngsw-worker.js",{enabled:!Og(),registrationStrategy:"registerWhenStable:30000"})]};function yo(e){return e.buttons===0||e.detail===0}function _o(e){let n=e.touches&&e.touches[0]||e.changedTouches&&e.changedTouches[0];return!!n&&n.identifier===-1&&(n.radiusX==null||n.radiusX===1)&&(n.radiusY==null||n.radiusY===1)}var Su;function lv(){if(Su==null){let e=typeof document<"u"?document.head:null;Su=!!(e&&(e.createShadowRoot||e.attachShadow))}return Su}function Au(e){if(lv()){let n=e.getRootNode?e.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&n instanceof ShadowRoot)return n}return null}function kt(e){return e.composedPath?e.composedPath()[0]:e.target}var ku;try{ku=typeof Intl<"u"&&Intl.v8BreakIterator}catch{ku=!1}var Fe=(()=>{class e{_platformId=u(di);isBrowser=this._platformId?Vg(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||ku)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Do;function dv(){if(Do==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>Do=!0}))}finally{Do=Do||!1}return Do}function dr(e){return dv()?e:!!e.capture}function Rs(e,n=0){return uv(e)?Number(e):arguments.length===2?n:0}function uv(e){return!isNaN(parseFloat(e))&&!isNaN(Number(e))}function dt(e){return e instanceof G?e.nativeElement:e}var fv=new v("cdk-input-modality-detector-options"),pv={ignoreKeys:[18,17,224,91,16]},mv=650,Nu={passive:!0,capture:!0},hv=(()=>{class e{_platform=u(Fe);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new hn(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(i=>i===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=kt(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<mv||(this._modality.next(yo(t)?"keyboard":"mouse"),this._mostRecentTarget=kt(t))};_onTouchstart=t=>{if(_o(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=kt(t)};constructor(){let t=u(R),i=u(z),r=u(fv,{optional:!0});if(this._options=F(F({},pv),r),this.modalityDetected=this._modality.pipe(Ar(1)),this.modalityChanged=this.modalityDetected.pipe(ia()),this._platform.isBrowser){let o=u(Ue).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[o.listen(i,"keydown",this._onKeydown,Nu),o.listen(i,"mousedown",this._onMousedown,Nu),o.listen(i,"touchstart",this._onTouchstart,Nu)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),wo=(function(e){return e[e.IMMEDIATE=0]="IMMEDIATE",e[e.EVENTUAL=1]="EVENTUAL",e})(wo||{}),gv=new v("cdk-focus-monitor-default-options"),Os=dr({passive:!0,capture:!0}),mi=(()=>{class e{_ngZone=u(R);_platform=u(Fe);_inputModalityDetector=u(hv);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=u(z);_stopInputModalityDetector=new V;constructor(){let t=u(gv,{optional:!0});this._detectionMode=t?.detectionMode||wo.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let i=kt(t);for(let r=i;r;r=r.parentElement)t.type==="focus"?this._onFocus(t,r):this._onBlur(t,r)};monitor(t,i=!1){let r=dt(t);if(!this._platform.isBrowser||r.nodeType!==1)return ke();let o=Au(r)||this._document,a=this._elementInfo.get(r);if(a)return i&&(a.checkChildren=!0),a.subject;let s={checkChildren:i,subject:new V,rootNode:o};return this._elementInfo.set(r,s),this._registerGlobalListeners(s),s.subject}stopMonitoring(t){let i=dt(t),r=this._elementInfo.get(i);r&&(r.subject.complete(),this._setClasses(i),this._elementInfo.delete(i),this._removeGlobalListeners(r))}focusVia(t,i,r){let o=dt(t),a=this._document.activeElement;o===a?this._getClosestElementsInfo(o).forEach(([s,c])=>this._originChanged(s,i,c)):(this._setOrigin(i),typeof o.focus=="function"&&o.focus(r))}ngOnDestroy(){this._elementInfo.forEach((t,i)=>this.stopMonitoring(i))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===wo.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,i){t.classList.toggle("cdk-focused",!!i),t.classList.toggle("cdk-touch-focused",i==="touch"),t.classList.toggle("cdk-keyboard-focused",i==="keyboard"),t.classList.toggle("cdk-mouse-focused",i==="mouse"),t.classList.toggle("cdk-program-focused",i==="program")}_setOrigin(t,i=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&i,this._detectionMode===wo.IMMEDIATE){clearTimeout(this._originTimeoutId);let r=this._originFromTouchInteraction?mv:1;this._originTimeoutId=setTimeout(()=>this._origin=null,r)}})}_onFocus(t,i){let r=this._elementInfo.get(i),o=kt(t);!r||!r.checkChildren&&i!==o||this._originChanged(i,this._getFocusOrigin(o),r)}_onBlur(t,i){let r=this._elementInfo.get(i);!r||r.checkChildren&&t.relatedTarget instanceof Node&&i.contains(t.relatedTarget)||(this._setClasses(i),this._emitOrigin(r,null))}_emitOrigin(t,i){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(i))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let i=t.rootNode,r=this._rootNodeFocusListenerCount.get(i)||0;r||this._ngZone.runOutsideAngular(()=>{i.addEventListener("focus",this._rootNodeFocusAndBlurListener,Os),i.addEventListener("blur",this._rootNodeFocusAndBlurListener,Os)}),this._rootNodeFocusListenerCount.set(i,r+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(gt(this._stopInputModalityDetector)).subscribe(o=>{this._setOrigin(o,!0)}))}_removeGlobalListeners(t){let i=t.rootNode;if(this._rootNodeFocusListenerCount.has(i)){let r=this._rootNodeFocusListenerCount.get(i);r>1?this._rootNodeFocusListenerCount.set(i,r-1):(i.removeEventListener("focus",this._rootNodeFocusAndBlurListener,Os),i.removeEventListener("blur",this._rootNodeFocusAndBlurListener,Os),this._rootNodeFocusListenerCount.delete(i))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,i,r){this._setClasses(t,i),this._emitOrigin(r,i),this._lastFocusOrigin=i}_getClosestElementsInfo(t){let i=[];return this._elementInfo.forEach((r,o)=>{(o===t||r.checkChildren&&o.contains(t))&&i.push([o,r])}),i}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:i,mostRecentModality:r}=this._inputModalityDetector;if(r!=="mouse"||!i||i===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let o=t.labels;if(o){for(let a=0;a<o.length;a++)if(o[a].contains(i))return!0}return!1}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Ru=(()=>{class e{_elementRef=u(G);_focusMonitor=u(mi);_monitorSubscription;_focusOrigin=null;cdkFocusChange=new $;constructor(){}get focusOrigin(){return this._focusOrigin}ngAfterViewInit(){let t=this._elementRef.nativeElement;this._monitorSubscription=this._focusMonitor.monitor(t,t.nodeType===1&&t.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(i=>{this._focusOrigin=i,this.cdkFocusChange.emit(i)})}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef),this._monitorSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","cdkMonitorElementFocus",""],["","cdkMonitorSubtreeFocus",""]],outputs:{cdkFocusChange:"cdkFocusChange"},exportAs:["cdkMonitorFocus"]})}return e})();var Fs=new WeakMap,dn=(()=>{class e{_appRef;_injector=u(ae);_environmentInjector=u(Ie);load(t){let i=this._appRef=this._appRef||this._injector.get(at),r=Fs.get(i);r||(r={loaders:new Set,refs:[]},Fs.set(i,r),i.onDestroy(()=>{Fs.get(i)?.refs.forEach(o=>o.destroy()),Fs.delete(i)})),r.loaders.has(t)||(r.loaders.add(t),r.refs.push(cu(t,{environmentInjector:this._environmentInjector})))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ps;function GC(){if(Ps===void 0&&(Ps=null,typeof window<"u")){let e=window;e.trustedTypes!==void 0&&(Ps=e.trustedTypes.createPolicy("angular#components",{createHTML:n=>n}))}return Ps}function ur(e){return GC()?.createHTML(e)||e}var vv=new Set,hi,Ou=(()=>{class e{_platform=u(Fe);_nonce=u(ui,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):qC}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&WC(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function WC(e,n){if(!vv.has(e))try{hi||(hi=document.createElement("style"),n&&hi.setAttribute("nonce",n),hi.setAttribute("type","text/css"),document.head.appendChild(hi)),hi.sheet&&(hi.sheet.insertRule(`@media ${e} {body{ }}`,0),vv.add(e))}catch(t){console.error(t)}}function qC(e){return{matches:e==="all"||e==="",media:e,addListener:()=>{},removeListener:()=>{}}}function ZC(e){if(e.type==="characterData"&&e.target instanceof Comment)return!0;if(e.type==="childList"){for(let n=0;n<e.addedNodes.length;n++)if(!(e.addedNodes[n]instanceof Comment))return!1;for(let n=0;n<e.removedNodes.length;n++)if(!(e.removedNodes[n]instanceof Comment))return!1;return!0}return!1}var KC=(()=>{class e{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),QC=(()=>{class e{_mutationObserverFactory=u(KC);_observedElements=new Map;_ngZone=u(R);constructor(){}ngOnDestroy(){this._observedElements.forEach((t,i)=>this._cleanupObserver(i))}observe(t){let i=dt(t);return new A(r=>{let a=this._observeElement(i).pipe(ie(s=>s.filter(c=>!ZC(c))),Ee(s=>!!s.length)).subscribe(s=>{this._ngZone.run(()=>{r.next(s)})});return()=>{a.unsubscribe(),this._unobserveElement(i)}})}_observeElement(t){return this._ngZone.runOutsideAngular(()=>{if(this._observedElements.has(t))this._observedElements.get(t).count++;else{let i=new V,r=this._mutationObserverFactory.create(o=>i.next(o));r&&r.observe(t,{characterData:!0,childList:!0,subtree:!0}),this._observedElements.set(t,{observer:r,stream:i,count:1})}return this._observedElements.get(t).stream})}_unobserveElement(t){this._observedElements.has(t)&&(this._observedElements.get(t).count--,this._observedElements.get(t).count||this._cleanupObserver(t))}_cleanupObserver(t){if(this._observedElements.has(t)){let{observer:i,stream:r}=this._observedElements.get(t);i&&i.disconnect(),r.complete(),this._observedElements.delete(t)}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),bv=(()=>{class e{_contentObserver=u(QC);_elementRef=u(G);event=new $;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._disabled?this._unsubscribe():this._subscribe()}_disabled=!1;get debounce(){return this._debounce}set debounce(t){this._debounce=Rs(t),this._subscribe()}_debounce;_currentSubscription=null;constructor(){}ngAfterContentInit(){!this._currentSubscription&&!this.disabled&&this._subscribe()}ngOnDestroy(){this._unsubscribe()}_subscribe(){this._unsubscribe();let t=this._contentObserver.observe(this._elementRef);this._currentSubscription=(this.debounce?t.pipe(Un(this.debounce)):t).subscribe(this.event)}_unsubscribe(){this._currentSubscription?.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","cdkObserveContent",""]],inputs:{disabled:[2,"cdkObserveContentDisabled","disabled",Y],debounce:"debounce"},outputs:{event:"cdkObserveContent"},exportAs:["cdkObserveContent"]})}return e})();var YC=200,Ls=class{_letterKeyStream=new V;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new V;selectedItem=this._selectedItem;constructor(n,t){let i=typeof t?.debounceInterval=="number"?t.debounceInterval:YC;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(n),this._setupKeyHandler(i)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(n){this._selectedItemIndex=n}setItems(n){this._items=n}handleKey(n){let t=n.keyCode;n.key&&n.key.length===1?this._letterKeyStream.next(n.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(n){this._letterKeyStream.pipe($n(t=>this._pressedLetters.push(t)),Un(n),Ee(()=>this._pressedLetters.length>0),ie(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(t=>{for(let i=1;i<this._items.length+1;i++){let r=(this._selectedItemIndex+i)%this._items.length,o=this._items[r];if(!this._skipPredicateFn?.(o)&&o.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(o);break}}this._pressedLetters=[]})}};function Vs(e,...n){return n.length?n.some(t=>e[t]):e.altKey||e.shiftKey||e.ctrlKey||e.metaKey}var js=class{_items;_activeItemIndex=ue(-1);_activeItem=ue(null);_wrap=!1;_typeaheadSubscription=te.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=n=>n.disabled;constructor(n,t){this._items=n,n instanceof jt?this._itemChangesSubscription=n.changes.subscribe(i=>this._itemsChanged(i.toArray())):ps(n)&&(this._effectRef=$i(()=>this._itemsChanged(n()),{injector:t}))}tabOut=new V;change=new V;skipPredicate(n){return this._skipPredicateFn=n,this}withWrap(n=!0){return this._wrap=n,this}withVerticalOrientation(n=!0){return this._vertical=n,this}withHorizontalOrientation(n){return this._horizontal=n,this}withAllowedModifierKeys(n){return this._allowedModifierKeys=n,this}withTypeAhead(n=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new Ls(t,{debounceInterval:typeof n=="number"?n:void 0,skipPredicate:i=>this._skipPredicateFn(i)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(i=>{this.setActiveItem(i)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(n=!0){return this._homeAndEnd=n,this}withPageUpDown(n=!0,t=10){return this._pageUpAndDown={enabled:n,delta:t},this}setActiveItem(n){let t=this._activeItem();this.updateActiveItem(n),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(n){let t=n.keyCode,r=["altKey","ctrlKey","metaKey","shiftKey"].every(o=>!n[o]||this._allowedModifierKeys.indexOf(o)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&r){this.setNextItemActive();break}else return;case 38:if(this._vertical&&r){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&r){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&r){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&r){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&r){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(o>0?o:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&r){let o=this._activeItemIndex()+this._pageUpAndDown.delta,a=this._getItemsArray().length;this._setActiveItemByIndex(o<a?o:a-1,-1);break}else return;default:(r||Vs(n,"shiftKey"))&&this._typeahead?.handleKey(n);return}this._typeahead?.reset(),n.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(n){let t=this._getItemsArray(),i=typeof n=="number"?n:t.indexOf(n),r=t[i];this._activeItem.set(r??null),this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(n){this._wrap?this._setActiveInWrapMode(n):this._setActiveInDefaultMode(n)}_setActiveInWrapMode(n){let t=this._getItemsArray();for(let i=1;i<=t.length;i++){let r=(this._activeItemIndex()+n*i+t.length)%t.length,o=t[r];if(!this._skipPredicateFn(o)){this.setActiveItem(r);return}}}_setActiveInDefaultMode(n){this._setActiveItemByIndex(this._activeItemIndex()+n,n)}_setActiveItemByIndex(n,t){let i=this._getItemsArray();if(i[n]){for(;this._skipPredicateFn(i[n]);)if(n+=t,!i[n])return;this.setActiveItem(n)}}_getItemsArray(){return ps(this._items)?this._items():this._items instanceof jt?this._items.toArray():this._items}_itemsChanged(n){this._typeahead?.setItems(n);let t=this._activeItem();if(t){let i=n.indexOf(t);i>-1&&i!==this._activeItemIndex()&&(this._activeItemIndex.set(i),this._typeahead?.setCurrentSelectedItemIndex(i))}}};var Co=class extends js{_origin="program";setFocusOrigin(n){return this._origin=n,this}setActiveItem(n){super.setActiveItem(n),this.activeItem&&this.activeItem.focus(this._origin)}};var Fu={},gi=class e{_appId=u(er);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(n,t=!1){return this._appId!=="ng"&&(n+=this._appId),Fu.hasOwnProperty(n)||(Fu[n]=0),`${n}${t?e._infix+"-":""}${Fu[n]++}`}static \u0275fac=function(t){return new(t||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};var Nt=(function(e){return e[e.NORMAL=0]="NORMAL",e[e.NEGATED=1]="NEGATED",e[e.INVERTED=2]="INVERTED",e})(Nt||{}),Bs,vi;function yv(){if(vi==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return vi=!1,vi;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)vi=!0;else{let e=Element.prototype.scrollTo;e?vi=!/\{\s*\[native code\]\s*\}/.test(e.toString()):vi=!1}}return vi}function fr(){if(typeof document!="object"||!document)return Nt.NORMAL;if(Bs==null){let e=document.createElement("div"),n=e.style;e.dir="rtl",n.width="1px",n.overflow="auto",n.visibility="hidden",n.pointerEvents="none",n.position="absolute";let t=document.createElement("div"),i=t.style;i.width="2px",i.height="1px",e.appendChild(t),document.body.appendChild(e),Bs=Nt.NORMAL,e.scrollLeft===0&&(e.scrollLeft=1,Bs=e.scrollLeft===0?Nt.NEGATED:Nt.INVERTED),e.remove()}return Bs}var XC=new v("MATERIAL_ANIMATIONS"),_v=null;function Pu(){return u(XC,{optional:!0})?.animationsDisabled||u(Ad,{optional:!0})==="NoopAnimations"?"di-disabled":(_v??=u(Ou).matchMedia("(prefers-reduced-motion)").matches,_v?"reduced-motion":"enabled")}function ut(){return Pu()!=="enabled"}var ft=(function(e){return e[e.FADING_IN=0]="FADING_IN",e[e.VISIBLE=1]="VISIBLE",e[e.FADING_OUT=2]="FADING_OUT",e[e.HIDDEN=3]="HIDDEN",e})(ft||{}),Lu=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=ft.HIDDEN;constructor(n,t,i,r=!1){this._renderer=n,this.element=t,this.config=i,this._animationForciblyDisabledThroughCss=r}fadeOut(){this._renderer.fadeOutRipple(this)}},Dv=dr({passive:!0,capture:!0}),Vu=class{_events=new Map;addHandler(n,t,i,r){let o=this._events.get(t);if(o){let a=o.get(i);a?a.add(r):o.set(i,new Set([r]))}else this._events.set(t,new Map([[i,new Set([r])]])),n.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,Dv)})}removeHandler(n,t,i){let r=this._events.get(n);if(!r)return;let o=r.get(t);o&&(o.delete(i),o.size===0&&r.delete(t),r.size===0&&(this._events.delete(n),document.removeEventListener(n,this._delegateEventHandler,Dv)))}_delegateEventHandler=n=>{let t=kt(n);t&&this._events.get(n.type)?.forEach((i,r)=>{(r===t||r.contains(t))&&i.forEach(o=>o.handleEvent(n))})}},Eo={enterDuration:225,exitDuration:150},JC=800,wv=dr({passive:!0,capture:!0}),Cv=["mousedown","touchstart"],Ev=["mouseup","mouseleave","touchend","touchcancel"],eE=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(i,r){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return e})(),Io=class e{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Vu;constructor(n,t,i,r,o){this._target=n,this._ngZone=t,this._platform=r,r.isBrowser&&(this._containerElement=dt(i)),o&&o.get(dn).load(eE)}fadeInRipple(n,t,i={}){let r=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),o=F(F({},Eo),i.animation);i.centered&&(n=r.left+r.width/2,t=r.top+r.height/2);let a=i.radius||tE(n,t,r),s=n-r.left,c=t-r.top,l=o.enterDuration,d=document.createElement("div");d.classList.add("mat-ripple-element"),d.style.left=`${s-a}px`,d.style.top=`${c-a}px`,d.style.height=`${a*2}px`,d.style.width=`${a*2}px`,i.color!=null&&(d.style.backgroundColor=i.color),d.style.transitionDuration=`${l}ms`,this._containerElement.appendChild(d);let f=window.getComputedStyle(d),m=f.transitionProperty,p=f.transitionDuration,h=m==="none"||p==="0s"||p==="0s, 0s"||r.width===0&&r.height===0,D=new Lu(this,d,i,h);d.style.transform="scale3d(1, 1, 1)",D.state=ft.FADING_IN,i.persistent||(this._mostRecentTransientRipple=D);let w=null;return!h&&(l||o.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let C=()=>{w&&(w.fallbackTimer=null),clearTimeout(Pe),this._finishRippleTransition(D)},ee=()=>this._destroyRipple(D),Pe=setTimeout(ee,l+100);d.addEventListener("transitionend",C),d.addEventListener("transitioncancel",ee),w={onTransitionEnd:C,onTransitionCancel:ee,fallbackTimer:Pe}}),this._activeRipples.set(D,w),(h||!l)&&this._finishRippleTransition(D),D}fadeOutRipple(n){if(n.state===ft.FADING_OUT||n.state===ft.HIDDEN)return;let t=n.element,i=F(F({},Eo),n.config.animation);t.style.transitionDuration=`${i.exitDuration}ms`,t.style.opacity="0",n.state=ft.FADING_OUT,(n._animationForciblyDisabledThroughCss||!i.exitDuration)&&this._finishRippleTransition(n)}fadeOutAll(){this._getActiveRipples().forEach(n=>n.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(n=>{n.config.persistent||n.fadeOut()})}setupTriggerEvents(n){let t=dt(n);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,Cv.forEach(i=>{e._eventManager.addHandler(this._ngZone,i,t,this)}))}handleEvent(n){n.type==="mousedown"?this._onMousedown(n):n.type==="touchstart"?this._onTouchStart(n):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Ev.forEach(t=>{this._triggerElement.addEventListener(t,this,wv)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(n){n.state===ft.FADING_IN?this._startFadeOutTransition(n):n.state===ft.FADING_OUT&&this._destroyRipple(n)}_startFadeOutTransition(n){let t=n===this._mostRecentTransientRipple,{persistent:i}=n.config;n.state=ft.VISIBLE,!i&&(!t||!this._isPointerDown)&&n.fadeOut()}_destroyRipple(n){let t=this._activeRipples.get(n)??null;this._activeRipples.delete(n),this._activeRipples.size||(this._containerRect=null),n===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),n.state=ft.HIDDEN,t!==null&&(n.element.removeEventListener("transitionend",t.onTransitionEnd),n.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),n.element.remove()}_onMousedown(n){let t=yo(n),i=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+JC;!this._target.rippleDisabled&&!t&&!i&&(this._isPointerDown=!0,this.fadeInRipple(n.clientX,n.clientY,this._target.rippleConfig))}_onTouchStart(n){if(!this._target.rippleDisabled&&!_o(n)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=n.changedTouches;if(t)for(let i=0;i<t.length;i++)this.fadeInRipple(t[i].clientX,t[i].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(n=>{let t=n.state===ft.VISIBLE||n.config.terminateOnPointerUp&&n.state===ft.FADING_IN;!n.config.persistent&&t&&n.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let n=this._triggerElement;n&&(Cv.forEach(t=>e._eventManager.removeHandler(t,n,this)),this._pointerUpEventsRegistered&&(Ev.forEach(t=>n.removeEventListener(t,this,wv)),this._pointerUpEventsRegistered=!1))}};function tE(e,n,t){let i=Math.max(Math.abs(e-t.left),Math.abs(e-t.right)),r=Math.max(Math.abs(n-t.top),Math.abs(n-t.bottom));return Math.sqrt(i*i+r*r)}var Hs=new v("mat-ripple-global-options"),Mo=(()=>{class e{_elementRef=u(G);_animationsDisabled=ut();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=u(R),i=u(Fe),r=u(Hs,{optional:!0}),o=u(ae);this._globalOptions=r||{},this._rippleRenderer=new Io(this,t,this._elementRef,i,o)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:F(F(F({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,i=0,r){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,i,F(F({},this.rippleConfig),r)):this._rippleRenderer.fadeInRipple(0,0,F(F({},this.rippleConfig),t))}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(i,r){i&2&&O("mat-ripple-unbounded",r.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return e})();var nE={capture:!0},iE=["focus","mousedown","mouseenter","touchstart"],ju="mat-ripple-loader-uninitialized",Bu="mat-ripple-loader-class-name",Iv="mat-ripple-loader-centered",Us="mat-ripple-loader-disabled",Mv=(()=>{class e{_document=u(z);_animationsDisabled=ut();_globalRippleOptions=u(Hs,{optional:!0});_platform=u(Fe);_ngZone=u(R);_injector=u(ae);_eventCleanups;_hosts=new Map;constructor(){let t=u(Ue).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>iE.map(i=>t.listen(this._document,i,this._onInteraction,nE)))}ngOnDestroy(){let t=this._hosts.keys();for(let i of t)this.destroyRipple(i);this._eventCleanups.forEach(i=>i())}configureRipple(t,i){t.setAttribute(ju,this._globalRippleOptions?.namespace??""),(i.className||!t.hasAttribute(Bu))&&t.setAttribute(Bu,i.className||""),i.centered&&t.setAttribute(Iv,""),i.disabled&&t.setAttribute(Us,"")}setDisabled(t,i){let r=this._hosts.get(t);r?(r.target.rippleDisabled=i,!i&&!r.hasSetUpEvents&&(r.hasSetUpEvents=!0,r.renderer.setupTriggerEvents(t))):i?t.setAttribute(Us,""):t.removeAttribute(Us)}_onInteraction=t=>{let i=kt(t);if(i instanceof HTMLElement){let r=i.closest(`[${ju}="${this._globalRippleOptions?.namespace??""}"]`);r&&this._createRipple(r)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let i=this._document.createElement("span");i.classList.add("mat-ripple",t.getAttribute(Bu)),t.append(i);let r=this._globalRippleOptions,o=this._animationsDisabled?0:r?.animation?.enterDuration??Eo.enterDuration,a=this._animationsDisabled?0:r?.animation?.exitDuration??Eo.exitDuration,s={rippleDisabled:this._animationsDisabled||r?.disabled||t.hasAttribute(Us),rippleConfig:{centered:t.hasAttribute(Iv),terminateOnPointerUp:r?.terminateOnPointerUp,animation:{enterDuration:o,exitDuration:a}}},c=new Io(s,this._ngZone,i,this._platform,this._injector),l=!s.rippleDisabled;l&&c.setupTriggerEvents(t),this._hosts.set(t,{target:s,renderer:c,hasSetUpEvents:l}),t.removeAttribute(ju)}destroyRipple(t){let i=this._hosts.get(t);i&&(i.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var pr=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["structural-styles"]],decls:0,vars:0,template:function(i,r){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return e})();var rE=["mat-icon-button",""],oE=["*"],aE=new v("MAT_BUTTON_CONFIG");function xv(e){return e==null?void 0:lt(e)}var Hu=(()=>{class e{_elementRef=u(G);_ngZone=u(R);_animationsDisabled=ut();_config=u(aE,{optional:!0});_focusMonitor=u(mi);_cleanupClick;_renderer=u(et);_rippleLoader=u(Mv);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}constructor(){u(dn).load(pr);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",i){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,i):this._elementRef.nativeElement.focus(i)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(i,r){i&2&&(se("disabled",r._getDisabledAttribute())("aria-disabled",r._getAriaDisabled())("tabindex",r._getTabIndex()),Ge(r.color?"mat-"+r.color:""),O("mat-mdc-button-disabled",r.disabled)("mat-mdc-button-disabled-interactive",r.disabledInteractive)("mat-unthemed",!r.color)("_mat-animation-noopable",r._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",Y],disabled:[2,"disabled","disabled",Y],ariaDisabled:[2,"aria-disabled","ariaDisabled",Y],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y],tabIndex:[2,"tabIndex","tabIndex",xv],_tabindex:[2,"tabindex","_tabindex",xv]}})}return e})(),Uu=(()=>{class e extends Hu{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[Me],attrs:rE,ngContentSelectors:oE,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(De(),je(0,"span",0),de(1),je(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return e})();var sE=new v("cdk-dir-doc",{providedIn:"root",factory:()=>u(z)}),cE=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;function Tv(e){let n=e?.toLowerCase()||"";return n==="auto"&&typeof navigator<"u"&&navigator?.language?cE.test(navigator.language)?"rtl":"ltr":n==="rtl"?"rtl":"ltr"}var bi=(()=>{class e{get value(){return this.valueSignal()}valueSignal=ue("ltr");change=new $;constructor(){let t=u(sE,{optional:!0});if(t){let i=t.body?t.body.dir:null,r=t.documentElement?t.documentElement.dir:null;this.valueSignal.set(Tv(i||r||"ltr"))}}ngOnDestroy(){this.change.complete()}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var xe=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({})}return e})();var $s=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[xe]})}return e})();var lE=["matButton",""],dE=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],uE=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];var Sv=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),zs=(()=>{class e extends Hu{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=fE(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let i=this._elementRef.nativeElement.classList,r=this._appearance?Sv.get(this._appearance):null,o=Sv.get(t);r&&i.remove(...r),i.add(...o),this._appearance=t}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[Me],attrs:lE,ngContentSelectors:uE,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(i,r){i&1&&(De(dE),je(0,"span",0),de(1),$e(2,"span",1),de(3,1),ze(),de(4,2),je(5,"span",2)(6,"span",3)),i&2&&O("mdc-button__ripple",!r._isFab)("mdc-fab__ripple",r._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return e})();function fE(e){return e.hasAttribute("mat-raised-button")?"elevated":e.hasAttribute("mat-stroked-button")?"outlined":e.hasAttribute("mat-flat-button")?"filled":e.hasAttribute("mat-button")?"text":null}var mr=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[$s,xe]})}return e})();function kv(e){return Error(`Unable to find icon with the name "${e}"`)}function pE(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}function Nv(e){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${e}".`)}function Rv(e){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${e}".`)}var un=class{url;svgText;options;svgElement=null;constructor(n,t,i){this.url=n,this.svgText=t,this.options=i}},Fv=(()=>{class e{_httpClient;_sanitizer;_errorHandler;_document;_svgIconConfigs=new Map;_iconSetConfigs=new Map;_cachedIconsByUrl=new Map;_inProgressUrlFetches=new Map;_fontCssClassesByAlias=new Map;_resolvers=[];_defaultFontSetClass=["material-icons","mat-ligature-font"];constructor(t,i,r,o){this._httpClient=t,this._sanitizer=i,this._errorHandler=o,this._document=r}addSvgIcon(t,i,r){return this.addSvgIconInNamespace("",t,i,r)}addSvgIconLiteral(t,i,r){return this.addSvgIconLiteralInNamespace("",t,i,r)}addSvgIconInNamespace(t,i,r,o){return this._addSvgIconConfig(t,i,new un(r,null,o))}addSvgIconResolver(t){return this._resolvers.push(t),this}addSvgIconLiteralInNamespace(t,i,r,o){let a=this._sanitizer.sanitize(Oe.HTML,r);if(!a)throw Rv(r);let s=ur(a);return this._addSvgIconConfig(t,i,new un("",s,o))}addSvgIconSet(t,i){return this.addSvgIconSetInNamespace("",t,i)}addSvgIconSetLiteral(t,i){return this.addSvgIconSetLiteralInNamespace("",t,i)}addSvgIconSetInNamespace(t,i,r){return this._addSvgIconSetConfig(t,new un(i,null,r))}addSvgIconSetLiteralInNamespace(t,i,r){let o=this._sanitizer.sanitize(Oe.HTML,i);if(!o)throw Rv(i);let a=ur(o);return this._addSvgIconSetConfig(t,new un("",a,r))}registerFontClassAlias(t,i=t){return this._fontCssClassesByAlias.set(t,i),this}classNameForFontAlias(t){return this._fontCssClassesByAlias.get(t)||t}setDefaultFontSetClass(...t){return this._defaultFontSetClass=t,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(t){let i=this._sanitizer.sanitize(Oe.RESOURCE_URL,t);if(!i)throw Nv(t);let r=this._cachedIconsByUrl.get(i);return r?ke(Gs(r)):this._loadSvgIconFromConfig(new un(t,null)).pipe($n(o=>this._cachedIconsByUrl.set(i,o)),ie(o=>Gs(o)))}getNamedSvgIcon(t,i=""){let r=Ov(i,t),o=this._svgIconConfigs.get(r);if(o)return this._getSvgFromConfig(o);if(o=this._getIconConfigFromResolvers(i,t),o)return this._svgIconConfigs.set(r,o),this._getSvgFromConfig(o);let a=this._iconSetConfigs.get(i);return a?this._getSvgFromIconSetConfigs(t,a):Ic(kv(r))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(t){return t.svgText?ke(Gs(this._svgElementFromConfig(t))):this._loadSvgIconFromConfig(t).pipe(ie(i=>Gs(i)))}_getSvgFromIconSetConfigs(t,i){let r=this._extractIconWithNameFromAnySet(t,i);if(r)return ke(r);let o=i.filter(a=>!a.svgText).map(a=>this._loadSvgIconSetFromConfig(a).pipe(na(s=>{let l=`Loading icon set URL: ${this._sanitizer.sanitize(Oe.RESOURCE_URL,a.url)} failed: ${s.message}`;return this._errorHandler.handleError(new Error(l)),ke(null)})));return Tc(o).pipe(ie(()=>{let a=this._extractIconWithNameFromAnySet(t,i);if(!a)throw kv(t);return a}))}_extractIconWithNameFromAnySet(t,i){for(let r=i.length-1;r>=0;r--){let o=i[r];if(o.svgText&&o.svgText.toString().indexOf(t)>-1){let a=this._svgElementFromConfig(o),s=this._extractSvgIconFromSet(a,t,o.options);if(s)return s}}return null}_loadSvgIconFromConfig(t){return this._fetchIcon(t).pipe($n(i=>t.svgText=i),ie(()=>this._svgElementFromConfig(t)))}_loadSvgIconSetFromConfig(t){return t.svgText?ke(null):this._fetchIcon(t).pipe($n(i=>t.svgText=i))}_extractSvgIconFromSet(t,i,r){let o=t.querySelector(`[id="${i}"]`);if(!o)return null;let a=o.cloneNode(!0);if(a.removeAttribute("id"),a.nodeName.toLowerCase()==="svg")return this._setSvgAttributes(a,r);if(a.nodeName.toLowerCase()==="symbol")return this._setSvgAttributes(this._toSvgElement(a),r);let s=this._svgElementFromString(ur("<svg></svg>"));return s.appendChild(a),this._setSvgAttributes(s,r)}_svgElementFromString(t){let i=this._document.createElement("DIV");i.innerHTML=t;let r=i.querySelector("svg");if(!r)throw Error("<svg> tag not found");return r}_toSvgElement(t){let i=this._svgElementFromString(ur("<svg></svg>")),r=t.attributes;for(let o=0;o<r.length;o++){let{name:a,value:s}=r[o];a!=="id"&&i.setAttribute(a,s)}for(let o=0;o<t.childNodes.length;o++)t.childNodes[o].nodeType===this._document.ELEMENT_NODE&&i.appendChild(t.childNodes[o].cloneNode(!0));return i}_setSvgAttributes(t,i){return t.setAttribute("fit",""),t.setAttribute("height","100%"),t.setAttribute("width","100%"),t.setAttribute("preserveAspectRatio","xMidYMid meet"),t.setAttribute("focusable","false"),i&&i.viewBox&&t.setAttribute("viewBox",i.viewBox),t}_fetchIcon(t){let{url:i,options:r}=t,o=r?.withCredentials??!1;if(!this._httpClient)throw pE();if(i==null)throw Error(`Cannot fetch icon from URL "${i}".`);let a=this._sanitizer.sanitize(Oe.RESOURCE_URL,i);if(!a)throw Nv(i);let s=this._inProgressUrlFetches.get(a);if(s)return s;let c=this._httpClient.get(a,{responseType:"text",withCredentials:o}).pipe(ie(l=>ur(l)),Tr(()=>this._inProgressUrlFetches.delete(a)),Sr());return this._inProgressUrlFetches.set(a,c),c}_addSvgIconConfig(t,i,r){return this._svgIconConfigs.set(Ov(t,i),r),this}_addSvgIconSetConfig(t,i){let r=this._iconSetConfigs.get(t);return r?r.push(i):this._iconSetConfigs.set(t,[i]),this}_svgElementFromConfig(t){if(!t.svgElement){let i=this._svgElementFromString(t.svgText);this._setSvgAttributes(i,t.options),t.svgElement=i}return t.svgElement}_getIconConfigFromResolvers(t,i){for(let r=0;r<this._resolvers.length;r++){let o=this._resolvers[r](i,t);if(o)return mE(o)?new un(o.url,null,o.options):new un(o,null)}}static \u0275fac=function(i){return new(i||e)(T(cr,8),T(xu),T(z,8),T(He))};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();function Gs(e){return e.cloneNode(!0)}function Ov(e,n){return e+":"+n}function mE(e){return!!(e.url&&e.options)}var hE=["*"],gE=new v("MAT_ICON_DEFAULT_OPTIONS"),vE=new v("mat-icon-location",{providedIn:"root",factory:()=>{let e=u(z),n=e?e.location:null;return{getPathname:()=>n?n.pathname+n.search:""}}}),Pv=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],bE=Pv.map(e=>`[${e}]`).join(", "),yE=/^url\(['"]?#(.*?)['"]?\)$/,hr=(()=>{class e{_elementRef=u(G);_iconRegistry=u(Fv);_location=u(vE);_errorHandler=u(He);_defaultColor;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;inline=!1;get svgIcon(){return this._svgIcon}set svgIcon(t){t!==this._svgIcon&&(t?this._updateSvgIcon(t):this._svgIcon&&this._clearSvgElement(),this._svgIcon=t)}_svgIcon;get fontSet(){return this._fontSet}set fontSet(t){let i=this._cleanupFontValue(t);i!==this._fontSet&&(this._fontSet=i,this._updateFontIconClasses())}_fontSet;get fontIcon(){return this._fontIcon}set fontIcon(t){let i=this._cleanupFontValue(t);i!==this._fontIcon&&(this._fontIcon=i,this._updateFontIconClasses())}_fontIcon;_previousFontSetClass=[];_previousFontIconClass;_svgName=null;_svgNamespace=null;_previousPath;_elementsWithExternalReferences;_currentIconFetch=te.EMPTY;constructor(){let t=u(new fi("aria-hidden"),{optional:!0}),i=u(gE,{optional:!0});i&&(i.color&&(this.color=this._defaultColor=i.color),i.fontSet&&(this.fontSet=i.fontSet)),t||this._elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(t){if(!t)return["",""];let i=t.split(":");switch(i.length){case 1:return["",i[0]];case 2:return i;default:throw Error(`Invalid icon name: "${t}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){let t=this._elementsWithExternalReferences;if(t&&t.size){let i=this._location.getPathname();i!==this._previousPath&&(this._previousPath=i,this._prependPathToReferences(i))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(t){this._clearSvgElement();let i=this._location.getPathname();this._previousPath=i,this._cacheChildrenWithExternalReferences(t),this._prependPathToReferences(i),this._elementRef.nativeElement.appendChild(t)}_clearSvgElement(){let t=this._elementRef.nativeElement,i=t.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();i--;){let r=t.childNodes[i];(r.nodeType!==1||r.nodeName.toLowerCase()==="svg")&&r.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;let t=this._elementRef.nativeElement,i=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter(r=>r.length>0);this._previousFontSetClass.forEach(r=>t.classList.remove(r)),i.forEach(r=>t.classList.add(r)),this._previousFontSetClass=i,this.fontIcon!==this._previousFontIconClass&&!i.includes("mat-ligature-font")&&(this._previousFontIconClass&&t.classList.remove(this._previousFontIconClass),this.fontIcon&&t.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(t){return typeof t=="string"?t.trim().split(" ")[0]:t}_prependPathToReferences(t){let i=this._elementsWithExternalReferences;i&&i.forEach((r,o)=>{r.forEach(a=>{o.setAttribute(a.name,`url('${t}#${a.value}')`)})})}_cacheChildrenWithExternalReferences(t){let i=t.querySelectorAll(bE),r=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let o=0;o<i.length;o++)Pv.forEach(a=>{let s=i[o],c=s.getAttribute(a),l=c?c.match(yE):null;if(l){let d=r.get(s);d||(d=[],r.set(s,d)),d.push({name:a,value:l[1]})}})}_updateSvgIcon(t){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),t){let[i,r]=this._splitIconName(t);i&&(this._svgNamespace=i),r&&(this._svgName=r),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(r,i).pipe(Kt(1)).subscribe(o=>this._setSvgElement(o),o=>{let a=`Error retrieving icon ${i}:${r}! ${o.message}`;this._errorHandler.handleError(new Error(a))})}}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function(i,r){i&2&&(se("data-mat-icon-type",r._usingFontIcon()?"font":"svg")("data-mat-icon-name",r._svgName||r.fontIcon)("data-mat-icon-namespace",r._svgNamespace||r.fontSet)("fontIcon",r._usingFontIcon()?r.fontIcon:null),Ge(r.color?"mat-"+r.color:""),O("mat-icon-inline",r.inline)("mat-icon-no-color",r.color!=="primary"&&r.color!=="accent"&&r.color!=="warn"))},inputs:{color:"color",inline:[2,"inline","inline",Y],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],ngContentSelectors:hE,decls:1,vars:0,template:function(i,r){i&1&&(De(),de(0))},styles:[`mat-icon, mat-icon.mat-primary, mat-icon.mat-accent, mat-icon.mat-warn {
  color: var(--mat-icon-color, inherit);
}

.mat-icon {
  -webkit-user-select: none;
  user-select: none;
  background-repeat: no-repeat;
  display: inline-block;
  fill: currentColor;
  height: 24px;
  width: 24px;
  overflow: hidden;
}
.mat-icon.mat-icon-inline {
  font-size: inherit;
  height: inherit;
  line-height: inherit;
  width: inherit;
}
.mat-icon.mat-ligature-font[fontIcon]::before {
  content: attr(fontIcon);
}

[dir=rtl] .mat-icon-rtl-mirror {
  transform: scale(-1, 1);
}

.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon {
  display: block;
}
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,
.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon {
  margin: auto;
}
`],encapsulation:2,changeDetection:0})}return e})(),gr=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[xe]})}return e})();var xo=class{_attachedHost=null;attach(n){return this._attachedHost=n,n.attach(this)}detach(){let n=this._attachedHost;n!=null&&(this._attachedHost=null,n.detach())}get isAttached(){return this._attachedHost!=null}setAttachedHost(n){this._attachedHost=n}},zu=class extends xo{component;viewContainerRef;injector;projectableNodes;bindings;constructor(n,t,i,r,o){super(),this.component=n,this.viewContainerRef=t,this.injector=i,this.projectableNodes=r,this.bindings=o||null}},yi=class extends xo{templateRef;viewContainerRef;context;injector;constructor(n,t,i,r){super(),this.templateRef=n,this.viewContainerRef=t,this.context=i,this.injector=r}get origin(){return this.templateRef.elementRef}attach(n,t=this.context){return this.context=t,super.attach(n)}detach(){return this.context=void 0,super.detach()}},Gu=class extends xo{element;constructor(n){super(),this.element=n instanceof G?n.nativeElement:n}},Wu=class{_attachedPortal=null;_disposeFn=null;_isDisposed=!1;hasAttached(){return!!this._attachedPortal}attach(n){if(n instanceof zu)return this._attachedPortal=n,this.attachComponentPortal(n);if(n instanceof yi)return this._attachedPortal=n,this.attachTemplatePortal(n);if(this.attachDomPortal&&n instanceof Gu)return this._attachedPortal=n,this.attachDomPortal(n)}attachDomPortal=null;detach(){this._attachedPortal&&(this._attachedPortal.setAttachedHost(null),this._attachedPortal=null),this._invokeDisposeFn()}dispose(){this.hasAttached()&&this.detach(),this._invokeDisposeFn(),this._isDisposed=!0}setDisposeFn(n){this._disposeFn=n}_invokeDisposeFn(){this._disposeFn&&(this._disposeFn(),this._disposeFn=null)}};var Lv=(()=>{class e extends yi{constructor(){let t=u(Xe),i=u(xt);super(t,i)}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","cdkPortal",""]],exportAs:["cdkPortal"],features:[Me]})}return e})(),Ws=(()=>{class e extends Wu{_moduleRef=u(Qi,{optional:!0});_document=u(z);_viewContainerRef=u(xt);_isInitialized=!1;_attachedRef=null;constructor(){super()}get portal(){return this._attachedPortal}set portal(t){this.hasAttached()&&!t&&!this._isInitialized||(this.hasAttached()&&super.detach(),t&&super.attach(t),this._attachedPortal=t||null)}attached=new $;get attachedRef(){return this._attachedRef}ngOnInit(){this._isInitialized=!0}ngOnDestroy(){super.dispose(),this._attachedRef=this._attachedPortal=null}attachComponentPortal(t){t.setAttachedHost(this);let i=t.viewContainerRef!=null?t.viewContainerRef:this._viewContainerRef,r=i.createComponent(t.component,{index:i.length,injector:t.injector||i.injector,projectableNodes:t.projectableNodes||void 0,ngModuleRef:this._moduleRef||void 0,bindings:t.bindings||void 0});return i!==this._viewContainerRef&&this._getRootNode().appendChild(r.hostView.rootNodes[0]),super.setDisposeFn(()=>r.destroy()),this._attachedPortal=t,this._attachedRef=r,this.attached.emit(r),r}attachTemplatePortal(t){t.setAttachedHost(this);let i=this._viewContainerRef.createEmbeddedView(t.templateRef,t.context,{injector:t.injector});return super.setDisposeFn(()=>this._viewContainerRef.clear()),this._attachedPortal=t,this._attachedRef=i,this.attached.emit(i),i}attachDomPortal=t=>{let i=t.element;i.parentNode;let r=this._document.createComment("dom-portal");t.setAttachedHost(this),i.parentNode.insertBefore(r,i),this._getRootNode().appendChild(i),this._attachedPortal=t,super.setDisposeFn(()=>{r.parentNode&&r.parentNode.replaceChild(i,r)})};_getRootNode(){let t=this._viewContainerRef.element.nativeElement;return t.nodeType===t.ELEMENT_NODE?t:t.parentNode}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","cdkPortalOutlet",""]],inputs:{portal:[0,"cdkPortalOutlet","portal"]},outputs:{attached:"attached"},exportAs:["cdkPortalOutlet"],features:[Me]})}return e})(),Vv=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({})}return e})();var qu=class{_box;_destroyed=new V;_resizeSubject=new V;_resizeObserver;_elementObservables=new Map;constructor(n){this._box=n,typeof ResizeObserver<"u"&&(this._resizeObserver=new ResizeObserver(t=>this._resizeSubject.next(t)))}observe(n){return this._elementObservables.has(n)||this._elementObservables.set(n,new A(t=>{let i=this._resizeSubject.subscribe(t);return this._resizeObserver?.observe(n,{box:this._box}),()=>{this._resizeObserver?.unobserve(n),i.unsubscribe(),this._elementObservables.delete(n)}}).pipe(Ee(t=>t.some(i=>i.target===n)),ra({bufferSize:1,refCount:!0}),gt(this._destroyed))),this._elementObservables.get(n)}destroy(){this._destroyed.next(),this._destroyed.complete(),this._resizeSubject.complete(),this._elementObservables.clear()}},jv=(()=>{class e{_cleanupErrorListener;_observers=new Map;_ngZone=u(R);constructor(){typeof ResizeObserver<"u"}ngOnDestroy(){for(let[,t]of this._observers)t.destroy();this._observers.clear(),this._cleanupErrorListener?.()}observe(t,i){let r=i?.box||"content-box";return this._observers.has(r)||this._observers.set(r,new qu(r)),this._observers.get(r).observe(t)}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var DE=20,wE=(()=>{class e{_ngZone=u(R);_platform=u(Fe);_renderer=u(Ue).createRenderer(null,null);_cleanupGlobalListener;constructor(){}_scrolled=new V;_scrolledCount=0;scrollContainers=new Map;register(t){this.scrollContainers.has(t)||this.scrollContainers.set(t,t.elementScrolled().subscribe(()=>this._scrolled.next(t)))}deregister(t){let i=this.scrollContainers.get(t);i&&(i.unsubscribe(),this.scrollContainers.delete(t))}scrolled(t=DE){return this._platform.isBrowser?new A(i=>{this._cleanupGlobalListener||(this._cleanupGlobalListener=this._ngZone.runOutsideAngular(()=>this._renderer.listen("document","scroll",()=>this._scrolled.next())));let r=t>0?this._scrolled.pipe(ta(t)).subscribe(i):this._scrolled.subscribe(i);return this._scrolledCount++,()=>{r.unsubscribe(),this._scrolledCount--,this._scrolledCount||(this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0)}}):ke()}ngOnDestroy(){this._cleanupGlobalListener?.(),this._cleanupGlobalListener=void 0,this.scrollContainers.forEach((t,i)=>this.deregister(i)),this._scrolled.complete()}ancestorScrolled(t,i){let r=this.getAncestorScrollContainers(t);return this.scrolled(i).pipe(Ee(o=>!o||r.indexOf(o)>-1))}getAncestorScrollContainers(t){let i=[];return this.scrollContainers.forEach((r,o)=>{this._scrollableContainsElement(o,t)&&i.push(o)}),i}_scrollableContainsElement(t,i){let r=dt(i),o=t.getElementRef().nativeElement;do if(r==o)return!0;while(r=r.parentElement);return!1}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})(),Bv=(()=>{class e{elementRef=u(G);scrollDispatcher=u(wE);ngZone=u(R);dir=u(bi,{optional:!0});_scrollElement=this.elementRef.nativeElement;_destroyed=new V;_renderer=u(et);_cleanupScroll;_elementScrolled=new V;constructor(){}ngOnInit(){this._cleanupScroll=this.ngZone.runOutsideAngular(()=>this._renderer.listen(this._scrollElement,"scroll",t=>this._elementScrolled.next(t))),this.scrollDispatcher.register(this)}ngOnDestroy(){this._cleanupScroll?.(),this._elementScrolled.complete(),this.scrollDispatcher.deregister(this),this._destroyed.next(),this._destroyed.complete()}elementScrolled(){return this._elementScrolled}getElementRef(){return this.elementRef}scrollTo(t){let i=this.elementRef.nativeElement,r=this.dir&&this.dir.value=="rtl";t.left==null&&(t.left=r?t.end:t.start),t.right==null&&(t.right=r?t.start:t.end),t.bottom!=null&&(t.top=i.scrollHeight-i.clientHeight-t.bottom),r&&fr()!=Nt.NORMAL?(t.left!=null&&(t.right=i.scrollWidth-i.clientWidth-t.left),fr()==Nt.INVERTED?t.left=t.right:fr()==Nt.NEGATED&&(t.left=t.right?-t.right:t.right)):t.right!=null&&(t.left=i.scrollWidth-i.clientWidth-t.right),this._applyScrollToOptions(t)}_applyScrollToOptions(t){let i=this.elementRef.nativeElement;yv()?i.scrollTo(t):(t.top!=null&&(i.scrollTop=t.top),t.left!=null&&(i.scrollLeft=t.left))}measureScrollOffset(t){let i="left",r="right",o=this.elementRef.nativeElement;if(t=="top")return o.scrollTop;if(t=="bottom")return o.scrollHeight-o.clientHeight-o.scrollTop;let a=this.dir&&this.dir.value=="rtl";return t=="start"?t=a?r:i:t=="end"&&(t=a?i:r),a&&fr()==Nt.INVERTED?t==i?o.scrollWidth-o.clientWidth-o.scrollLeft:o.scrollLeft:a&&fr()==Nt.NEGATED?t==i?o.scrollLeft+o.scrollWidth-o.clientWidth:-o.scrollLeft:t==i?o.scrollLeft:o.scrollWidth-o.clientWidth-o.scrollLeft}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","cdk-scrollable",""],["","cdkScrollable",""]]})}return e})(),CE=20,Hv=(()=>{class e{_platform=u(Fe);_listeners;_viewportSize=null;_change=new V;_document=u(z);constructor(){let t=u(R),i=u(Ue).createRenderer(null,null);t.runOutsideAngular(()=>{if(this._platform.isBrowser){let r=o=>this._change.next(o);this._listeners=[i.listen("window","resize",r),i.listen("window","orientationchange",r)]}this.change().subscribe(()=>this._viewportSize=null)})}ngOnDestroy(){this._listeners?.forEach(t=>t()),this._change.complete()}getViewportSize(){this._viewportSize||this._updateViewportSize();let t={width:this._viewportSize.width,height:this._viewportSize.height};return this._platform.isBrowser||(this._viewportSize=null),t}getViewportRect(){let t=this.getViewportScrollPosition(),{width:i,height:r}=this.getViewportSize();return{top:t.top,left:t.left,bottom:t.top+r,right:t.left+i,height:r,width:i}}getViewportScrollPosition(){if(!this._platform.isBrowser)return{top:0,left:0};let t=this._document,i=this._getWindow(),r=t.documentElement,o=r.getBoundingClientRect(),a=-o.top||t.body?.scrollTop||i.scrollY||r.scrollTop||0,s=-o.left||t.body?.scrollLeft||i.scrollX||r.scrollLeft||0;return{top:a,left:s}}change(t=CE){return t>0?this._change.pipe(ta(t)):this._change}_getWindow(){return this._document.defaultView||window}_updateViewportSize(){let t=this._getWindow();this._viewportSize=this._platform.isBrowser?{width:t.innerWidth,height:t.innerHeight}:{width:0,height:0}}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var Ju=["*"];function IE(e,n){e&1&&de(0)}var ME=["tabListContainer"],xE=["tabList"],TE=["tabListInner"],SE=["nextPaginator"],AE=["previousPaginator"],kE=["content"];function NE(e,n){}var RE=["tabBodyWrapper"],OE=["tabHeader"];function FE(e,n){}function PE(e,n){if(e&1&&Nn(0,FE,0,0,"ng-template",12),e&2){let t=P().$implicit;Q("cdkPortalOutlet",t.templateLabel)}}function LE(e,n){if(e&1&&x(0),e&2){let t=P().$implicit;Be(t.textLabel)}}function VE(e,n){if(e&1){let t=an();g(0,"div",7,2),oe("click",function(){let r=Qe(t),o=r.$implicit,a=r.$index,s=P(),c=rr(1);return Ye(s._handleClick(o,c,a))})("cdkFocusChange",function(r){let o=Qe(t).$index,a=P();return Ye(a._tabFocusChanged(r,o))}),fe(2,"span",8)(3,"div",9),g(4,"span",10)(5,"span",11),q(6,PE,1,1,null,12)(7,LE,1,1),y()()()}if(e&2){let t=n.$implicit,i=n.$index,r=rr(1),o=P();Ge(t.labelClass),O("mdc-tab--active",o.selectedIndex===i),Q("id",o._getTabLabelId(t,i))("disabled",t.disabled)("fitInkBarToContent",o.fitInkBarToContent),se("tabIndex",o._getTabIndex(i))("aria-posinset",i+1)("aria-setsize",o._tabs.length)("aria-controls",o._getTabContentId(i))("aria-selected",o.selectedIndex===i)("aria-label",t.ariaLabel||null)("aria-labelledby",!t.ariaLabel&&t.ariaLabelledby?t.ariaLabelledby:null),_(3),Q("matRippleTrigger",r)("matRippleDisabled",t.disabled||o.disableRipple),_(3),Z(t.templateLabel?6:7)}}function jE(e,n){e&1&&de(0)}function BE(e,n){if(e&1){let t=an();g(0,"mat-tab-body",13),oe("_onCentered",function(){Qe(t);let r=P();return Ye(r._removeTabBodyWrapperHeight())})("_onCentering",function(r){Qe(t);let o=P();return Ye(o._setTabBodyWrapperHeight(r))})("_beforeCentering",function(r){Qe(t);let o=P();return Ye(o._bodyCentered(r))}),y()}if(e&2){let t=n.$implicit,i=n.$index,r=P();Ge(t.bodyClass),Q("id",r._getTabContentId(i))("content",t.content)("position",t.position)("animationDuration",r.animationDuration)("preserveContent",r.preserveContent),se("tabindex",r.contentTabIndex!=null&&r.selectedIndex===i?r.contentTabIndex:null)("aria-labelledby",r._getTabLabelId(t,i))("aria-hidden",r.selectedIndex!==i)}}var HE=new v("MatTabContent"),ef=(()=>{class e{template=u(Xe);constructor(){}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","matTabContent",""]],features:[We([{provide:HE,useExisting:e}])]})}return e})(),UE=new v("MatTabLabel"),Gv=new v("MAT_TAB"),$E=(()=>{class e extends Lv{_closestTab=u(Gv,{optional:!0});static \u0275fac=(()=>{let t;return function(r){return(t||(t=Tn(e)))(r||e)}})();static \u0275dir=J({type:e,selectors:[["","mat-tab-label",""],["","matTabLabel",""]],features:[We([{provide:UE,useExisting:e}]),Me]})}return e})(),Wv=new v("MAT_TAB_GROUP"),tf=(()=>{class e{_viewContainerRef=u(xt);_closestTabGroup=u(Wv,{optional:!0});disabled=!1;get templateLabel(){return this._templateLabel}set templateLabel(t){this._setTemplateLabelInput(t)}_templateLabel;_explicitContent=void 0;_implicitContent;textLabel="";ariaLabel;ariaLabelledby;labelClass;bodyClass;id=null;_contentPortal=null;get content(){return this._contentPortal}_stateChanges=new V;position=null;origin=null;isActive=!1;constructor(){u(dn).load(pr)}ngOnChanges(t){(t.hasOwnProperty("textLabel")||t.hasOwnProperty("disabled"))&&this._stateChanges.next()}ngOnDestroy(){this._stateChanges.complete()}ngOnInit(){this._contentPortal=new yi(this._explicitContent||this._implicitContent,this._viewContainerRef)}_setTemplateLabelInput(t){t&&t._closestTab===this&&(this._templateLabel=t)}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-tab"]],contentQueries:function(i,r,o){if(i&1&&Rn(o,$E,5)(o,ef,7,Xe),i&2){let a;ve(a=be())&&(r.templateLabel=a.first),ve(a=be())&&(r._explicitContent=a.first)}},viewQuery:function(i,r){if(i&1&&st(Xe,7),i&2){let o;ve(o=be())&&(r._implicitContent=o.first)}},hostAttrs:["hidden",""],hostVars:1,hostBindings:function(i,r){i&2&&se("id",null)},inputs:{disabled:[2,"disabled","disabled",Y],textLabel:[0,"label","textLabel"],ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],labelClass:"labelClass",bodyClass:"bodyClass",id:"id"},exportAs:["matTab"],features:[We([{provide:Gv,useExisting:e}]),Mt],ngContentSelectors:Ju,decls:1,vars:0,template:function(i,r){i&1&&(De(),fs(0,IE,1,0,"ng-template"))},encapsulation:2})}return e})(),Zu="mdc-tab-indicator--active",Uv="mdc-tab-indicator--no-transition",Ku=class{_items;_currentItem;constructor(n){this._items=n}hide(){this._items.forEach(n=>n.deactivateInkBar()),this._currentItem=void 0}alignToElement(n){let t=this._items.find(r=>r.elementRef.nativeElement===n),i=this._currentItem;if(t!==i&&(i?.deactivateInkBar(),t)){let r=i?.elementRef.nativeElement.getBoundingClientRect?.();t.activateInkBar(r),this._currentItem=t}}},zE=(()=>{class e{_elementRef=u(G);_inkBarElement=null;_inkBarContentElement=null;_fitToContent=!1;get fitInkBarToContent(){return this._fitToContent}set fitInkBarToContent(t){this._fitToContent!==t&&(this._fitToContent=t,this._inkBarElement&&this._appendInkBarElement())}activateInkBar(t){let i=this._elementRef.nativeElement;if(!t||!i.getBoundingClientRect||!this._inkBarContentElement){i.classList.add(Zu);return}let r=i.getBoundingClientRect(),o=t.width/r.width,a=t.left-r.left;i.classList.add(Uv),this._inkBarContentElement.style.setProperty("transform",`translateX(${a}px) scaleX(${o})`),i.getBoundingClientRect(),i.classList.remove(Uv),i.classList.add(Zu),this._inkBarContentElement.style.setProperty("transform","")}deactivateInkBar(){this._elementRef.nativeElement.classList.remove(Zu)}ngOnInit(){this._createInkBarElement()}ngOnDestroy(){this._inkBarElement?.remove(),this._inkBarElement=this._inkBarContentElement=null}_createInkBarElement(){let t=this._elementRef.nativeElement.ownerDocument||document,i=this._inkBarElement=t.createElement("span"),r=this._inkBarContentElement=t.createElement("span");i.className="mdc-tab-indicator",r.className="mdc-tab-indicator__content mdc-tab-indicator__content--underline",i.appendChild(this._inkBarContentElement),this._appendInkBarElement()}_appendInkBarElement(){this._inkBarElement;let t=this._fitToContent?this._elementRef.nativeElement.querySelector(".mdc-tab__content"):this._elementRef.nativeElement;t.appendChild(this._inkBarElement)}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,inputs:{fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",Y]}})}return e})();var qv=(()=>{class e extends zE{elementRef=u(G);disabled=!1;focus(){this.elementRef.nativeElement.focus()}getOffsetLeft(){return this.elementRef.nativeElement.offsetLeft}getOffsetWidth(){return this.elementRef.nativeElement.offsetWidth}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Tn(e)))(r||e)}})();static \u0275dir=J({type:e,selectors:[["","matTabLabelWrapper",""]],hostVars:3,hostBindings:function(i,r){i&2&&(se("aria-disabled",!!r.disabled),O("mat-mdc-tab-disabled",r.disabled))},inputs:{disabled:[2,"disabled","disabled",Y]},features:[Me]})}return e})(),$v={passive:!0},GE=650,WE=100,qE=(()=>{class e{_elementRef=u(G);_changeDetectorRef=u(ct);_viewportRuler=u(Hv);_dir=u(bi,{optional:!0});_ngZone=u(R);_platform=u(Fe);_sharedResizeObserver=u(jv);_injector=u(ae);_renderer=u(et);_animationsDisabled=ut();_eventCleanups;_scrollDistance=0;_selectedIndexChanged=!1;_destroyed=new V;_showPaginationControls=!1;_disableScrollAfter=!0;_disableScrollBefore=!0;_tabLabelCount;_scrollDistanceChanged=!1;_keyManager;_currentTextContent;_stopScrolling=new V;disablePagination=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){let i=isNaN(t)?0:t;this._selectedIndex!=i&&(this._selectedIndexChanged=!0,this._selectedIndex=i,this._keyManager&&this._keyManager.updateActiveItem(i))}_selectedIndex=0;selectFocusedIndex=new $;indexFocused=new $;constructor(){this._eventCleanups=this._ngZone.runOutsideAngular(()=>[this._renderer.listen(this._elementRef.nativeElement,"mouseleave",()=>this._stopInterval())])}ngAfterViewInit(){this._eventCleanups.push(this._renderer.listen(this._previousPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("before"),$v),this._renderer.listen(this._nextPaginator.nativeElement,"touchstart",()=>this._handlePaginatorPress("after"),$v))}ngAfterContentInit(){let t=this._dir?this._dir.change:ke("ltr"),i=this._sharedResizeObserver.observe(this._elementRef.nativeElement).pipe(Un(32),gt(this._destroyed)),r=this._viewportRuler.change(150).pipe(gt(this._destroyed)),o=()=>{this.updatePagination(),this._alignInkBarToSelectedTab()};this._keyManager=new Co(this._items).withHorizontalOrientation(this._getLayoutDirection()).withHomeAndEnd().withWrap().skipPredicate(()=>!1),this._keyManager.updateActiveItem(Math.max(this._selectedIndex,0)),kn(o,{injector:this._injector}),xr(t,r,i,this._items.changes,this._itemsResized()).pipe(gt(this._destroyed)).subscribe(()=>{this._ngZone.run(()=>{Promise.resolve().then(()=>{this._scrollDistance=Math.max(0,Math.min(this._getMaxScrollDistance(),this._scrollDistance)),o()})}),this._keyManager?.withHorizontalOrientation(this._getLayoutDirection())}),this._keyManager.change.subscribe(a=>{this.indexFocused.emit(a),this._setTabFocus(a)})}_itemsResized(){return typeof ResizeObserver!="function"?Bn:this._items.changes.pipe(Ai(this._items),ht(t=>new A(i=>this._ngZone.runOutsideAngular(()=>{let r=new ResizeObserver(o=>i.next(o));return t.forEach(o=>r.observe(o.elementRef.nativeElement)),()=>{r.disconnect()}}))),Ar(1),Ee(t=>t.some(i=>i.contentRect.width>0&&i.contentRect.height>0)))}ngAfterContentChecked(){this._tabLabelCount!=this._items.length&&(this.updatePagination(),this._tabLabelCount=this._items.length,this._changeDetectorRef.markForCheck()),this._selectedIndexChanged&&(this._scrollToLabel(this._selectedIndex),this._checkScrollingControls(),this._alignInkBarToSelectedTab(),this._selectedIndexChanged=!1,this._changeDetectorRef.markForCheck()),this._scrollDistanceChanged&&(this._updateTabScrollPosition(),this._scrollDistanceChanged=!1,this._changeDetectorRef.markForCheck())}ngOnDestroy(){this._eventCleanups.forEach(t=>t()),this._keyManager?.destroy(),this._destroyed.next(),this._destroyed.complete(),this._stopScrolling.complete()}_handleKeydown(t){if(!Vs(t))switch(t.keyCode){case 13:case 32:if(this.focusIndex!==this.selectedIndex){let i=this._items.get(this.focusIndex);i&&!i.disabled&&(this.selectFocusedIndex.emit(this.focusIndex),this._itemSelected(t))}break;default:this._keyManager?.onKeydown(t)}}_onContentChanges(){let t=this._elementRef.nativeElement.textContent;t!==this._currentTextContent&&(this._currentTextContent=t||"",this._ngZone.run(()=>{this.updatePagination(),this._alignInkBarToSelectedTab(),this._changeDetectorRef.markForCheck()}))}updatePagination(){this._checkPaginationEnabled(),this._checkScrollingControls(),this._updateTabScrollPosition()}get focusIndex(){return this._keyManager?this._keyManager.activeItemIndex:0}set focusIndex(t){!this._isValidIndex(t)||this.focusIndex===t||!this._keyManager||this._keyManager.setActiveItem(t)}_isValidIndex(t){return this._items?!!this._items.toArray()[t]:!0}_setTabFocus(t){if(this._showPaginationControls&&this._scrollToLabel(t),this._items&&this._items.length){this._items.toArray()[t].focus();let i=this._tabListContainer.nativeElement;this._getLayoutDirection()=="ltr"?i.scrollLeft=0:i.scrollLeft=i.scrollWidth-i.offsetWidth}}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_updateTabScrollPosition(){if(this.disablePagination)return;let t=this.scrollDistance,i=this._getLayoutDirection()==="ltr"?-t:t;this._tabList.nativeElement.style.transform=`translateX(${Math.round(i)}px)`,(this._platform.TRIDENT||this._platform.EDGE)&&(this._tabListContainer.nativeElement.scrollLeft=0)}get scrollDistance(){return this._scrollDistance}set scrollDistance(t){this._scrollTo(t)}_scrollHeader(t){let i=this._tabListContainer.nativeElement.offsetWidth,r=(t=="before"?-1:1)*i/3;return this._scrollTo(this._scrollDistance+r)}_handlePaginatorClick(t){this._stopInterval(),this._scrollHeader(t)}_scrollToLabel(t){if(this.disablePagination)return;let i=this._items?this._items.toArray()[t]:null;if(!i)return;let r=this._tabListContainer.nativeElement.offsetWidth,{offsetLeft:o,offsetWidth:a}=i.elementRef.nativeElement,s,c;this._getLayoutDirection()=="ltr"?(s=o,c=s+a):(c=this._tabListInner.nativeElement.offsetWidth-o,s=c-a);let l=this.scrollDistance,d=this.scrollDistance+r;s<l?this.scrollDistance-=l-s:c>d&&(this.scrollDistance+=Math.min(c-d,s-l))}_checkPaginationEnabled(){if(this.disablePagination)this._showPaginationControls=!1;else{let t=this._tabListInner.nativeElement.scrollWidth,i=this._elementRef.nativeElement.offsetWidth,r=t-i>=5;r||(this.scrollDistance=0),r!==this._showPaginationControls&&(this._showPaginationControls=r,this._changeDetectorRef.markForCheck())}}_checkScrollingControls(){this.disablePagination?this._disableScrollAfter=this._disableScrollBefore=!0:(this._disableScrollBefore=this.scrollDistance==0,this._disableScrollAfter=this.scrollDistance==this._getMaxScrollDistance(),this._changeDetectorRef.markForCheck())}_getMaxScrollDistance(){let t=this._tabListInner.nativeElement.scrollWidth,i=this._tabListContainer.nativeElement.offsetWidth;return t-i||0}_alignInkBarToSelectedTab(){let t=this._items&&this._items.length?this._items.toArray()[this.selectedIndex]:null,i=t?t.elementRef.nativeElement:null;i?this._inkBar.alignToElement(i):this._inkBar.hide()}_stopInterval(){this._stopScrolling.next()}_handlePaginatorPress(t,i){i&&i.button!=null&&i.button!==0||(this._stopInterval(),Mr(GE,WE).pipe(gt(xr(this._stopScrolling,this._destroyed))).subscribe(()=>{let{maxScrollDistance:r,distance:o}=this._scrollHeader(t);(o===0||o>=r)&&this._stopInterval()}))}_scrollTo(t){if(this.disablePagination)return{maxScrollDistance:0,distance:0};let i=this._getMaxScrollDistance();return this._scrollDistance=Math.max(0,Math.min(i,t)),this._scrollDistanceChanged=!0,this._checkScrollingControls(),{maxScrollDistance:i,distance:this._scrollDistance}}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,inputs:{disablePagination:[2,"disablePagination","disablePagination",Y],selectedIndex:[2,"selectedIndex","selectedIndex",lt]},outputs:{selectFocusedIndex:"selectFocusedIndex",indexFocused:"indexFocused"}})}return e})(),ZE=(()=>{class e extends qE{_items;_tabListContainer;_tabList;_tabListInner;_nextPaginator;_previousPaginator;_inkBar;ariaLabel;ariaLabelledby;disableRipple=!1;ngAfterContentInit(){this._inkBar=new Ku(this._items),super.ngAfterContentInit()}_itemSelected(t){t.preventDefault()}static \u0275fac=(()=>{let t;return function(r){return(t||(t=Tn(e)))(r||e)}})();static \u0275cmp=B({type:e,selectors:[["mat-tab-header"]],contentQueries:function(i,r,o){if(i&1&&Rn(o,qv,4),i&2){let a;ve(a=be())&&(r._items=a)}},viewQuery:function(i,r){if(i&1&&st(ME,7)(xE,7)(TE,7)(SE,5)(AE,5),i&2){let o;ve(o=be())&&(r._tabListContainer=o.first),ve(o=be())&&(r._tabList=o.first),ve(o=be())&&(r._tabListInner=o.first),ve(o=be())&&(r._nextPaginator=o.first),ve(o=be())&&(r._previousPaginator=o.first)}},hostAttrs:[1,"mat-mdc-tab-header"],hostVars:4,hostBindings:function(i,r){i&2&&O("mat-mdc-tab-header-pagination-controls-enabled",r._showPaginationControls)("mat-mdc-tab-header-rtl",r._getLayoutDirection()=="rtl")},inputs:{ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],disableRipple:[2,"disableRipple","disableRipple",Y]},features:[Me],ngContentSelectors:Ju,decls:13,vars:10,consts:[["previousPaginator",""],["tabListContainer",""],["tabList",""],["tabListInner",""],["nextPaginator",""],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-before",3,"click","mousedown","touchend","matRippleDisabled"],[1,"mat-mdc-tab-header-pagination-chevron"],[1,"mat-mdc-tab-label-container",3,"keydown"],["role","tablist",1,"mat-mdc-tab-list",3,"cdkObserveContent"],[1,"mat-mdc-tab-labels"],["mat-ripple","",1,"mat-mdc-tab-header-pagination","mat-mdc-tab-header-pagination-after",3,"mousedown","click","touchend","matRippleDisabled"]],template:function(i,r){i&1&&(De(),g(0,"div",5,0),oe("click",function(){return r._handlePaginatorClick("before")})("mousedown",function(a){return r._handlePaginatorPress("before",a)})("touchend",function(){return r._stopInterval()}),fe(2,"div",6),y(),g(3,"div",7,1),oe("keydown",function(a){return r._handleKeydown(a)}),g(5,"div",8,2),oe("cdkObserveContent",function(){return r._onContentChanges()}),g(7,"div",9,3),de(9),y()()(),g(10,"div",10,4),oe("mousedown",function(a){return r._handlePaginatorPress("after",a)})("click",function(){return r._handlePaginatorClick("after")})("touchend",function(){return r._stopInterval()}),fe(12,"div",6),y()),i&2&&(O("mat-mdc-tab-header-pagination-disabled",r._disableScrollBefore),Q("matRippleDisabled",r._disableScrollBefore||r.disableRipple),_(3),O("_mat-animation-noopable",r._animationsDisabled),_(2),se("aria-label",r.ariaLabel||null)("aria-labelledby",r.ariaLabelledby||null),_(5),O("mat-mdc-tab-header-pagination-disabled",r._disableScrollAfter),Q("matRippleDisabled",r._disableScrollAfter||r.disableRipple))},dependencies:[Mo,bv],styles:[`.mat-mdc-tab-header {
  display: flex;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.mdc-tab-indicator .mdc-tab-indicator__content {
  transition-duration: var(--mat-tab-animation-duration, 250ms);
}

.mat-mdc-tab-header-pagination {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: none;
  justify-content: center;
  align-items: center;
  min-width: 32px;
  cursor: pointer;
  z-index: 2;
  -webkit-tap-highlight-color: transparent;
  touch-action: none;
  box-sizing: content-box;
  outline: 0;
}
.mat-mdc-tab-header-pagination::-moz-focus-inner {
  border: 0;
}
.mat-mdc-tab-header-pagination .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-header-pagination-controls-enabled .mat-mdc-tab-header-pagination {
  display: flex;
}

.mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after {
  padding-left: 4px;
}
.mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(-135deg);
}

.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before,
.mat-mdc-tab-header-pagination-after {
  padding-right: 4px;
}
.mat-mdc-tab-header-rtl .mat-mdc-tab-header-pagination-before .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-header-pagination-after .mat-mdc-tab-header-pagination-chevron {
  transform: rotate(45deg);
}

.mat-mdc-tab-header-pagination-chevron {
  border-style: solid;
  border-width: 2px 2px 0 0;
  height: 8px;
  width: 8px;
  border-color: var(--mat-tab-pagination-icon-color, var(--mat-sys-on-surface));
}

.mat-mdc-tab-header-pagination-disabled {
  box-shadow: none;
  cursor: default;
  pointer-events: none;
}
.mat-mdc-tab-header-pagination-disabled .mat-mdc-tab-header-pagination-chevron {
  opacity: 0.4;
}

.mat-mdc-tab-list {
  flex-grow: 1;
  position: relative;
  transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
._mat-animation-noopable .mat-mdc-tab-list {
  transition: none;
}

.mat-mdc-tab-label-container {
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  z-index: 1;
  border-bottom-style: solid;
  border-bottom-width: var(--mat-tab-divider-height, 1px);
  border-bottom-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}
.mat-mdc-tab-group-inverted-header .mat-mdc-tab-label-container {
  border-bottom: none;
  border-top-style: solid;
  border-top-width: var(--mat-tab-divider-height, 1px);
  border-top-color: var(--mat-tab-divider-color, var(--mat-sys-surface-variant));
}

.mat-mdc-tab-labels {
  display: flex;
  flex: 1 0 auto;
}
[mat-align-tabs=center] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: center;
}
[mat-align-tabs=end] > .mat-mdc-tab-header .mat-mdc-tab-labels {
  justify-content: flex-end;
}
.cdk-drop-list .mat-mdc-tab-labels, .mat-mdc-tab-labels.cdk-drop-list {
  min-height: var(--mat-tab-container-height, 48px);
}

.mat-mdc-tab::before {
  margin: 5px;
}
@media (forced-colors: active) {
  .mat-mdc-tab[aria-disabled=true] {
    color: GrayText;
  }
}
`],encapsulation:2})}return e})(),KE=new v("MAT_TABS_CONFIG"),zv=(()=>{class e extends Ws{_host=u(Qu);_ngZone=u(R);_centeringSub=te.EMPTY;_leavingSub=te.EMPTY;constructor(){super()}ngOnInit(){super.ngOnInit(),this._centeringSub=this._host._beforeCentering.pipe(Ai(this._host._isCenterPosition())).subscribe(t=>{this._host._content&&t&&!this.hasAttached()&&this._ngZone.run(()=>{Promise.resolve().then(),this.attach(this._host._content)})}),this._leavingSub=this._host._afterLeavingCenter.subscribe(()=>{this._host.preserveContent||this._ngZone.run(()=>this.detach())})}ngOnDestroy(){super.ngOnDestroy(),this._centeringSub.unsubscribe(),this._leavingSub.unsubscribe()}static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["","matTabBodyHost",""]],features:[Me]})}return e})(),Qu=(()=>{class e{_elementRef=u(G);_dir=u(bi,{optional:!0});_ngZone=u(R);_injector=u(ae);_renderer=u(et);_diAnimationsDisabled=ut();_eventCleanups;_initialized=!1;_fallbackTimer;_positionIndex;_dirChangeSubscription=te.EMPTY;_position;_previousPosition;_onCentering=new $;_beforeCentering=new $;_afterLeavingCenter=new $;_onCentered=new $(!0);_portalHost;_contentElement;_content;animationDuration="500ms";preserveContent=!1;set position(t){this._positionIndex=t,this._computePositionAnimationState()}constructor(){if(this._dir){let t=u(ct);this._dirChangeSubscription=this._dir.change.subscribe(i=>{this._computePositionAnimationState(i),t.markForCheck()})}}ngOnInit(){this._bindTransitionEvents(),this._position==="center"&&(this._setActiveClass(!0),kn(()=>this._onCentering.emit(this._elementRef.nativeElement.clientHeight),{injector:this._injector})),this._initialized=!0}ngOnDestroy(){clearTimeout(this._fallbackTimer),this._eventCleanups?.forEach(t=>t()),this._dirChangeSubscription.unsubscribe()}_bindTransitionEvents(){this._ngZone.runOutsideAngular(()=>{let t=this._elementRef.nativeElement,i=r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.remove("mat-tab-body-animating"),r.type==="transitionend"&&this._transitionDone())};this._eventCleanups=[this._renderer.listen(t,"transitionstart",r=>{r.target===this._contentElement?.nativeElement&&(this._elementRef.nativeElement.classList.add("mat-tab-body-animating"),this._transitionStarted())}),this._renderer.listen(t,"transitionend",i),this._renderer.listen(t,"transitioncancel",i)]})}_transitionStarted(){clearTimeout(this._fallbackTimer);let t=this._position==="center";this._beforeCentering.emit(t),t&&this._onCentering.emit(this._elementRef.nativeElement.clientHeight)}_transitionDone(){this._position==="center"?this._onCentered.emit():this._previousPosition==="center"&&this._afterLeavingCenter.emit()}_setActiveClass(t){this._elementRef.nativeElement.classList.toggle("mat-mdc-tab-body-active",t)}_getLayoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_isCenterPosition(){return this._positionIndex===0}_computePositionAnimationState(t=this._getLayoutDirection()){this._previousPosition=this._position,this._positionIndex<0?this._position=t=="ltr"?"left":"right":this._positionIndex>0?this._position=t=="ltr"?"right":"left":this._position="center",this._animationsDisabled()?this._simulateTransitionEvents():this._initialized&&(this._position==="center"||this._previousPosition==="center")&&(clearTimeout(this._fallbackTimer),this._fallbackTimer=this._ngZone.runOutsideAngular(()=>setTimeout(()=>this._simulateTransitionEvents(),100)))}_simulateTransitionEvents(){this._transitionStarted(),kn(()=>this._transitionDone(),{injector:this._injector})}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0ms"||this.animationDuration==="0s"}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-tab-body"]],viewQuery:function(i,r){if(i&1&&st(zv,5)(kE,5),i&2){let o;ve(o=be())&&(r._portalHost=o.first),ve(o=be())&&(r._contentElement=o.first)}},hostAttrs:[1,"mat-mdc-tab-body"],hostVars:1,hostBindings:function(i,r){i&2&&se("inert",r._position==="center"?null:"")},inputs:{_content:[0,"content","_content"],animationDuration:"animationDuration",preserveContent:"preserveContent",position:"position"},outputs:{_onCentering:"_onCentering",_beforeCentering:"_beforeCentering",_onCentered:"_onCentered"},decls:3,vars:6,consts:[["content",""],["cdkScrollable","",1,"mat-mdc-tab-body-content"],["matTabBodyHost",""]],template:function(i,r){i&1&&(g(0,"div",1,0),Nn(2,NE,0,0,"ng-template",2),y()),i&2&&O("mat-tab-body-content-left",r._position==="left")("mat-tab-body-content-right",r._position==="right")("mat-tab-body-content-can-animate",r._position==="center"||r._previousPosition==="center")},dependencies:[zv,Bv],styles:[`.mat-mdc-tab-body {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  display: block;
  overflow: hidden;
  outline: 0;
  flex-basis: 100%;
}
.mat-mdc-tab-body.mat-mdc-tab-body-active {
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1;
  flex-grow: 1;
}
.mat-mdc-tab-group.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body.mat-mdc-tab-body-active {
  overflow-y: hidden;
}

.mat-mdc-tab-body-content {
  height: 100%;
  overflow: auto;
  transform: none;
  visibility: hidden;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content, .mat-mdc-tab-body-active > .mat-mdc-tab-body-content {
  visibility: visible;
}
.mat-tab-body-animating > .mat-mdc-tab-body-content {
  min-height: 1px;
}
.mat-mdc-tab-group-dynamic-height .mat-mdc-tab-body-content {
  overflow: hidden;
}

.mat-tab-body-content-can-animate {
  transition: transform var(--mat-tab-animation-duration) 1ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable .mat-tab-body-content-can-animate {
  transition: none;
}

.mat-tab-body-content-left {
  transform: translate3d(-100%, 0, 0);
}

.mat-tab-body-content-right {
  transform: translate3d(100%, 0, 0);
}
`],encapsulation:2})}return e})(),Zv=(()=>{class e{_elementRef=u(G);_changeDetectorRef=u(ct);_ngZone=u(R);_tabsSubscription=te.EMPTY;_tabLabelSubscription=te.EMPTY;_tabBodySubscription=te.EMPTY;_diAnimationsDisabled=ut();_allTabs;_tabBodies;_tabBodyWrapper;_tabHeader;_tabs=new jt;_indexToSelect=0;_lastFocusedTabIndex=null;_tabBodyWrapperHeight=0;color;get fitInkBarToContent(){return this._fitInkBarToContent}set fitInkBarToContent(t){this._fitInkBarToContent=t,this._changeDetectorRef.markForCheck()}_fitInkBarToContent=!1;stretchTabs=!0;alignTabs=null;dynamicHeight=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(t){this._indexToSelect=isNaN(t)?null:t}_selectedIndex=null;headerPosition="above";get animationDuration(){return this._animationDuration}set animationDuration(t){let i=t+"";this._animationDuration=/^\d+$/.test(i)?t+"ms":i}_animationDuration;get contentTabIndex(){return this._contentTabIndex}set contentTabIndex(t){this._contentTabIndex=isNaN(t)?null:t}_contentTabIndex=null;disablePagination=!1;disableRipple=!1;preserveContent=!1;get backgroundColor(){return this._backgroundColor}set backgroundColor(t){let i=this._elementRef.nativeElement.classList;i.remove("mat-tabs-with-background",`mat-background-${this.backgroundColor}`),t&&i.add("mat-tabs-with-background",`mat-background-${t}`),this._backgroundColor=t}_backgroundColor;ariaLabel;ariaLabelledby;selectedIndexChange=new $;focusChange=new $;animationDone=new $;selectedTabChange=new $(!0);_groupId;_isServer=!u(Fe).isBrowser;constructor(){let t=u(KE,{optional:!0});this._groupId=u(gi).getId("mat-tab-group-"),this.animationDuration=t&&t.animationDuration?t.animationDuration:"500ms",this.disablePagination=t&&t.disablePagination!=null?t.disablePagination:!1,this.dynamicHeight=t&&t.dynamicHeight!=null?t.dynamicHeight:!1,t?.contentTabIndex!=null&&(this.contentTabIndex=t.contentTabIndex),this.preserveContent=!!t?.preserveContent,this.fitInkBarToContent=t&&t.fitInkBarToContent!=null?t.fitInkBarToContent:!1,this.stretchTabs=t&&t.stretchTabs!=null?t.stretchTabs:!0,this.alignTabs=t&&t.alignTabs!=null?t.alignTabs:null}ngAfterContentChecked(){let t=this._indexToSelect=this._clampTabIndex(this._indexToSelect);if(this._selectedIndex!=t){let i=this._selectedIndex==null;if(!i){this.selectedTabChange.emit(this._createChangeEvent(t));let r=this._tabBodyWrapper.nativeElement;r.style.minHeight=r.clientHeight+"px"}Promise.resolve().then(()=>{this._tabs.forEach((r,o)=>r.isActive=o===t),i||(this.selectedIndexChange.emit(t),this._tabBodyWrapper.nativeElement.style.minHeight="")})}this._tabs.forEach((i,r)=>{i.position=r-t,this._selectedIndex!=null&&i.position==0&&!i.origin&&(i.origin=t-this._selectedIndex)}),this._selectedIndex!==t&&(this._selectedIndex=t,this._lastFocusedTabIndex=null,this._changeDetectorRef.markForCheck())}ngAfterContentInit(){this._subscribeToAllTabChanges(),this._subscribeToTabLabels(),this._tabsSubscription=this._tabs.changes.subscribe(()=>{let t=this._clampTabIndex(this._indexToSelect);if(t===this._selectedIndex){let i=this._tabs.toArray(),r;for(let o=0;o<i.length;o++)if(i[o].isActive){this._indexToSelect=this._selectedIndex=o,this._lastFocusedTabIndex=null,r=i[o];break}!r&&i[t]&&Promise.resolve().then(()=>{i[t].isActive=!0,this.selectedTabChange.emit(this._createChangeEvent(t))})}this._changeDetectorRef.markForCheck()})}ngAfterViewInit(){this._tabBodySubscription=this._tabBodies.changes.subscribe(()=>this._bodyCentered(!0))}_subscribeToAllTabChanges(){this._allTabs.changes.pipe(Ai(this._allTabs)).subscribe(t=>{this._tabs.reset(t.filter(i=>i._closestTabGroup===this||!i._closestTabGroup)),this._tabs.notifyOnChanges()})}ngOnDestroy(){this._tabs.destroy(),this._tabsSubscription.unsubscribe(),this._tabLabelSubscription.unsubscribe(),this._tabBodySubscription.unsubscribe()}realignInkBar(){this._tabHeader&&this._tabHeader._alignInkBarToSelectedTab()}updatePagination(){this._tabHeader&&this._tabHeader.updatePagination()}focusTab(t){let i=this._tabHeader;i&&(i.focusIndex=t)}_focusChanged(t){this._lastFocusedTabIndex=t,this.focusChange.emit(this._createChangeEvent(t))}_createChangeEvent(t){let i=new Yu;return i.index=t,this._tabs&&this._tabs.length&&(i.tab=this._tabs.toArray()[t]),i}_subscribeToTabLabels(){this._tabLabelSubscription&&this._tabLabelSubscription.unsubscribe(),this._tabLabelSubscription=xr(...this._tabs.map(t=>t._stateChanges)).subscribe(()=>this._changeDetectorRef.markForCheck())}_clampTabIndex(t){return Math.min(this._tabs.length-1,Math.max(t||0,0))}_getTabLabelId(t,i){return t.id||`${this._groupId}-label-${i}`}_getTabContentId(t){return`${this._groupId}-content-${t}`}_setTabBodyWrapperHeight(t){if(!this.dynamicHeight||!this._tabBodyWrapperHeight){this._tabBodyWrapperHeight=t;return}let i=this._tabBodyWrapper.nativeElement;i.style.height=this._tabBodyWrapperHeight+"px",this._tabBodyWrapper.nativeElement.offsetHeight&&(i.style.height=t+"px")}_removeTabBodyWrapperHeight(){let t=this._tabBodyWrapper.nativeElement;this._tabBodyWrapperHeight=t.clientHeight,t.style.height="",this._ngZone.run(()=>this.animationDone.emit())}_handleClick(t,i,r){i.focusIndex=r,t.disabled||(this.selectedIndex=r)}_getTabIndex(t){let i=this._lastFocusedTabIndex??this.selectedIndex;return t===i?0:-1}_tabFocusChanged(t,i){t&&t!=="mouse"&&t!=="touch"&&(this._tabHeader.focusIndex=i)}_bodyCentered(t){t&&this._tabBodies?.forEach((i,r)=>i._setActiveClass(r===this._selectedIndex))}_animationsDisabled(){return this._diAnimationsDisabled||this.animationDuration==="0"||this.animationDuration==="0ms"}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-tab-group"]],contentQueries:function(i,r,o){if(i&1&&Rn(o,tf,5),i&2){let a;ve(a=be())&&(r._allTabs=a)}},viewQuery:function(i,r){if(i&1&&st(RE,5)(OE,5)(Qu,5),i&2){let o;ve(o=be())&&(r._tabBodyWrapper=o.first),ve(o=be())&&(r._tabHeader=o.first),ve(o=be())&&(r._tabBodies=o)}},hostAttrs:[1,"mat-mdc-tab-group"],hostVars:11,hostBindings:function(i,r){i&2&&(se("mat-align-tabs",r.alignTabs),Ge("mat-"+(r.color||"primary")),Tt("--mat-tab-animation-duration",r.animationDuration),O("mat-mdc-tab-group-dynamic-height",r.dynamicHeight)("mat-mdc-tab-group-inverted-header",r.headerPosition==="below")("mat-mdc-tab-group-stretch-tabs",r.stretchTabs))},inputs:{color:"color",fitInkBarToContent:[2,"fitInkBarToContent","fitInkBarToContent",Y],stretchTabs:[2,"mat-stretch-tabs","stretchTabs",Y],alignTabs:[0,"mat-align-tabs","alignTabs"],dynamicHeight:[2,"dynamicHeight","dynamicHeight",Y],selectedIndex:[2,"selectedIndex","selectedIndex",lt],headerPosition:"headerPosition",animationDuration:"animationDuration",contentTabIndex:[2,"contentTabIndex","contentTabIndex",lt],disablePagination:[2,"disablePagination","disablePagination",Y],disableRipple:[2,"disableRipple","disableRipple",Y],preserveContent:[2,"preserveContent","preserveContent",Y],backgroundColor:"backgroundColor",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"]},outputs:{selectedIndexChange:"selectedIndexChange",focusChange:"focusChange",animationDone:"animationDone",selectedTabChange:"selectedTabChange"},exportAs:["matTabGroup"],features:[We([{provide:Wv,useExisting:e}])],ngContentSelectors:Ju,decls:9,vars:8,consts:[["tabHeader",""],["tabBodyWrapper",""],["tabNode",""],[3,"indexFocused","selectFocusedIndex","selectedIndex","disableRipple","disablePagination","aria-label","aria-labelledby"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"id","mdc-tab--active","class","disabled","fitInkBarToContent"],[1,"mat-mdc-tab-body-wrapper"],["role","tabpanel",3,"id","class","content","position","animationDuration","preserveContent"],["role","tab","matTabLabelWrapper","","cdkMonitorElementFocus","",1,"mdc-tab","mat-mdc-tab","mat-focus-indicator",3,"click","cdkFocusChange","id","disabled","fitInkBarToContent"],[1,"mdc-tab__ripple"],["mat-ripple","",1,"mat-mdc-tab-ripple",3,"matRippleTrigger","matRippleDisabled"],[1,"mdc-tab__content"],[1,"mdc-tab__text-label"],[3,"cdkPortalOutlet"],["role","tabpanel",3,"_onCentered","_onCentering","_beforeCentering","id","content","position","animationDuration","preserveContent"]],template:function(i,r){i&1&&(De(),g(0,"mat-tab-header",3,0),oe("indexFocused",function(a){return r._focusChanged(a)})("selectFocusedIndex",function(a){return r.selectedIndex=a}),Ut(2,VE,8,17,"div",4,ir),y(),q(4,jE,1,0),g(5,"div",5,1),Ut(7,BE,1,10,"mat-tab-body",6,ir),y()),i&2&&(Q("selectedIndex",r.selectedIndex||0)("disableRipple",r.disableRipple)("disablePagination",r.disablePagination),hs("aria-label",r.ariaLabel)("aria-labelledby",r.ariaLabelledby),_(2),$t(r._tabs),_(2),Z(r._isServer?4:-1),_(),O("_mat-animation-noopable",r._animationsDisabled()),_(2),$t(r._tabs))},dependencies:[ZE,qv,Ru,Mo,Ws,Qu],styles:[`.mdc-tab {
  min-width: 90px;
  padding: 0 24px;
  display: flex;
  flex: 1 0 auto;
  justify-content: center;
  box-sizing: border-box;
  border: none;
  outline: none;
  text-align: center;
  white-space: nowrap;
  cursor: pointer;
  z-index: 1;
  touch-action: manipulation;
}

.mdc-tab__content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: inherit;
  pointer-events: none;
}

.mdc-tab__text-label {
  transition: 150ms color linear;
  display: inline-block;
  line-height: 1;
  z-index: 2;
}

.mdc-tab--active .mdc-tab__text-label {
  transition-delay: 100ms;
}

._mat-animation-noopable .mdc-tab__text-label {
  transition: none;
}

.mdc-tab-indicator {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.mdc-tab-indicator__content {
  transition: var(--mat-tab-animation-duration, 250ms) transform cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: left;
  opacity: 0;
}

.mdc-tab-indicator__content--underline {
  align-self: flex-end;
  box-sizing: border-box;
  width: 100%;
  border-top-style: solid;
}

.mdc-tab-indicator--active .mdc-tab-indicator__content {
  opacity: 1;
}

._mat-animation-noopable .mdc-tab-indicator__content, .mdc-tab-indicator--no-transition .mdc-tab-indicator__content {
  transition: none;
}

.mat-mdc-tab-ripple.mat-mdc-tab-ripple {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}

.mat-mdc-tab {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  background: none;
  height: var(--mat-tab-container-height, 48px);
  font-family: var(--mat-tab-label-text-font, var(--mat-sys-title-small-font));
  font-size: var(--mat-tab-label-text-size, var(--mat-sys-title-small-size));
  letter-spacing: var(--mat-tab-label-text-tracking, var(--mat-sys-title-small-tracking));
  line-height: var(--mat-tab-label-text-line-height, var(--mat-sys-title-small-line-height));
  font-weight: var(--mat-tab-label-text-weight, var(--mat-sys-title-small-weight));
}
.mat-mdc-tab.mdc-tab {
  flex-grow: 0;
}
.mat-mdc-tab .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-tab-active-indicator-height, 2px);
  border-radius: var(--mat-tab-active-indicator-shape, 0);
}
.mat-mdc-tab:hover .mdc-tab__text-label {
  color: var(--mat-tab-inactive-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab:focus .mdc-tab__text-label {
  color: var(--mat-tab-inactive-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {
  color: var(--mat-tab-active-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active .mdc-tab__ripple::before,
.mat-mdc-tab.mdc-tab--active .mat-ripple-element {
  background-color: var(--mat-tab-active-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab__text-label {
  color: var(--mat-tab-active-hover-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:hover .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-hover-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab__text-label {
  color: var(--mat-tab-active-focus-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab.mdc-tab--active:focus .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-active-focus-indicator-color, var(--mat-sys-primary));
}
.mat-mdc-tab.mat-mdc-tab-disabled {
  opacity: 0.4;
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__content {
  pointer-events: none;
}
.mat-mdc-tab.mat-mdc-tab-disabled .mdc-tab__ripple::before,
.mat-mdc-tab.mat-mdc-tab-disabled .mat-ripple-element {
  background-color: var(--mat-tab-disabled-ripple-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-tab .mdc-tab__ripple::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  pointer-events: none;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-inactive-label-text-color, var(--mat-sys-on-surface));
  display: inline-flex;
  align-items: center;
}
.mat-mdc-tab .mdc-tab__content {
  position: relative;
  pointer-events: auto;
}
.mat-mdc-tab:hover .mdc-tab__ripple::before {
  opacity: 0.04;
}
.mat-mdc-tab.cdk-program-focused .mdc-tab__ripple::before, .mat-mdc-tab.cdk-keyboard-focused .mdc-tab__ripple::before {
  opacity: 0.12;
}
.mat-mdc-tab .mat-ripple-element {
  opacity: 0.12;
  background-color: var(--mat-tab-inactive-ripple-color, var(--mat-sys-on-surface));
}
.mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs > .mat-mdc-tab-header .mat-mdc-tab {
  flex-grow: 1;
}

.mat-mdc-tab-group {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination {
  background-color: var(--mat-tab-background-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mat-mdc-tab .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background.mat-primary > .mat-mdc-tab-header .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab__text-label {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background:not(.mat-primary) > .mat-mdc-tab-header .mat-mdc-tab:not(.mdc-tab--active) .mdc-tab-indicator__content--underline {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-focus-indicator::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron,
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-focus-indicator::before {
  border-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mdc-tab__ripple::before, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-ripple-element, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mdc-tab__ripple::before {
  background-color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header .mat-mdc-tab-header-pagination-chevron, .mat-mdc-tab-group.mat-tabs-with-background > .mat-mdc-tab-header-pagination .mat-mdc-tab-header-pagination-chevron {
  color: var(--mat-tab-foreground-color);
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header {
  flex-direction: column-reverse;
}
.mat-mdc-tab-group.mat-mdc-tab-group-inverted-header .mdc-tab-indicator__content--underline {
  align-self: flex-start;
}

.mat-mdc-tab-body-wrapper {
  position: relative;
  overflow: hidden;
  display: flex;
  transition: height 500ms cubic-bezier(0.35, 0, 0.25, 1);
}
.mat-mdc-tab-body-wrapper._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
`],encapsulation:2})}return e})(),Yu=class{index;tab};var Kv=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[xe]})}return e})();var Qv=new v("");var Yv=new v("");var YE=new v("",{factory:()=>Xv}),Xv="always";var XE=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({})}return e})();var Jv=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:YE,useValue:t.callSetDisabledState??Xv}]}}static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[XE]})}return e})();var JE=["mat-internal-form-field",""],eI=["*"],eb=(()=>{class e{labelPosition="after";static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["div","mat-internal-form-field",""]],hostAttrs:[1,"mdc-form-field","mat-internal-form-field"],hostVars:2,hostBindings:function(i,r){i&2&&O("mdc-form-field--align-end",r.labelPosition==="before")},inputs:{labelPosition:"labelPosition"},attrs:JE,ngContentSelectors:eI,decls:1,vars:0,template:function(i,r){i&1&&(De(),de(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2,changeDetection:0})}return e})();var tI=["switch"],nI=["*"];function iI(e,n){e&1&&(g(0,"span",11),Ui(),g(1,"svg",13),fe(2,"path",14),y(),g(3,"svg",15),fe(4,"path",16),y()())}var rI=new v("mat-slide-toggle-default-options",{providedIn:"root",factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})}),qs=class{source;checked;constructor(n,t){this.source=n,this.checked=t}},oI=(()=>{class e{_elementRef=u(G);_focusMonitor=u(mi);_changeDetectorRef=u(ct);defaults=u(rI);_onChange=t=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(t){return new qs(this,t)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=ut();_focused=!1;name=null;id;labelPosition="after";ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(t){this._checked=t,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new $;toggleChange=new $;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){u(dn).load(pr);let t=u(new fi("tabindex"),{optional:!0}),i=this.defaults;this.tabIndex=t==null?0:parseInt(t)||0,this.color=i.color||"accent",this.id=this._uniqueId=u(gi).getId("mat-mdc-slide-toggle-"),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+"-label"}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(t=>{t==="keyboard"||t==="program"?(this._focused=!0,this._changeDetectorRef.markForCheck()):t||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(t){t.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(t){this.checked=!!t}registerOnChange(t){this._onChange=t}registerOnTouched(t){this._onTouched=t}validate(t){return this.required&&t.value!==!0?{required:!0}:null}registerOnValidatorChange(t){this._validatorOnChange=t}setDisabledState(t){this.disabled=t,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new qs(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-slide-toggle"]],viewQuery:function(i,r){if(i&1&&st(tI,5),i&2){let o;ve(o=be())&&(r._switchElement=o.first)}},hostAttrs:[1,"mat-mdc-slide-toggle"],hostVars:13,hostBindings:function(i,r){i&2&&(oo("id",r.id),se("tabindex",null)("aria-label",null)("name",null)("aria-labelledby",null),Ge(r.color?"mat-"+r.color:""),O("mat-mdc-slide-toggle-focused",r._focused)("mat-mdc-slide-toggle-checked",r.checked)("_mat-animation-noopable",r._noopAnimations))},inputs:{name:"name",id:"id",labelPosition:"labelPosition",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],ariaDescribedby:[0,"aria-describedby","ariaDescribedby"],required:[2,"required","required",Y],color:"color",disabled:[2,"disabled","disabled",Y],disableRipple:[2,"disableRipple","disableRipple",Y],tabIndex:[2,"tabIndex","tabIndex",t=>t==null?0:lt(t)],checked:[2,"checked","checked",Y],hideIcon:[2,"hideIcon","hideIcon",Y],disabledInteractive:[2,"disabledInteractive","disabledInteractive",Y]},outputs:{change:"change",toggleChange:"toggleChange"},exportAs:["matSlideToggle"],features:[We([{provide:Qv,useExisting:Xt(()=>e),multi:!0},{provide:Yv,useExisting:e,multi:!0}]),Mt],ngContentSelectors:nI,decls:14,vars:27,consts:[["switch",""],["mat-internal-form-field","",3,"labelPosition"],["role","switch","type","button",1,"mdc-switch",3,"click","tabIndex","disabled"],[1,"mat-mdc-slide-toggle-touch-target"],[1,"mdc-switch__track"],[1,"mdc-switch__handle-track"],[1,"mdc-switch__handle"],[1,"mdc-switch__shadow"],[1,"mdc-elevation-overlay"],[1,"mdc-switch__ripple"],["mat-ripple","",1,"mat-mdc-slide-toggle-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled","matRippleCentered"],[1,"mdc-switch__icons"],[1,"mdc-label",3,"click","for"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--on"],["d","M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z"],["viewBox","0 0 24 24","aria-hidden","true",1,"mdc-switch__icon","mdc-switch__icon--off"],["d","M20 13H4v-2h16v2z"]],template:function(i,r){if(i&1&&(De(),g(0,"div",1)(1,"button",2,0),oe("click",function(){return r._handleClick()}),fe(3,"div",3)(4,"span",4),g(5,"span",5)(6,"span",6)(7,"span",7),fe(8,"span",8),y(),g(9,"span",9),fe(10,"span",10),y(),q(11,iI,5,0,"span",11),y()()(),g(12,"label",12),oe("click",function(a){return a.stopPropagation()}),de(13),y()()),i&2){let o=rr(2);Q("labelPosition",r.labelPosition),_(),O("mdc-switch--selected",r.checked)("mdc-switch--unselected",!r.checked)("mdc-switch--checked",r.checked)("mdc-switch--disabled",r.disabled)("mat-mdc-slide-toggle-disabled-interactive",r.disabledInteractive),Q("tabIndex",r.disabled&&!r.disabledInteractive?-1:r.tabIndex)("disabled",r.disabled&&!r.disabledInteractive),se("id",r.buttonId)("name",r.name)("aria-label",r.ariaLabel)("aria-labelledby",r._getAriaLabelledBy())("aria-describedby",r.ariaDescribedby)("aria-required",r.required||null)("aria-checked",r.checked)("aria-disabled",r.disabled&&r.disabledInteractive?"true":null),_(9),Q("matRippleTrigger",o)("matRippleDisabled",r.disableRipple||r.disabled)("matRippleCentered",!0),_(),Z(r.hideIcon?-1:11),_(),Q("for",r.buttonId),se("id",r._labelId)}},dependencies:[Mo,eb],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--mat-slide-toggle-track-height, 32px);
  border-radius: var(--mat-slide-toggle-track-shape, var(--mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-track-outline-color, var(--mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--mat-slide-toggle-disabled-unselected-track-outline-color, var(--mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--mat-slide-toggle-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-hover-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-focus-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--mat-slide-toggle-unselected-pressed-track-color, var(--mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--mat-slide-toggle-disabled-unselected-track-color, var(--mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--mat-slide-toggle-selected-track-color, var(--mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-hover-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-focus-track-color, var(--mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--mat-slide-toggle-selected-pressed-track-color, var(--mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--mat-slide-toggle-disabled-selected-track-color, var(--mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--mat-slide-toggle-handle-width);
  height: var(--mat-slide-toggle-handle-height);
  border-radius: var(--mat-slide-toggle-handle-shape, var(--mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--mat-slide-toggle-selected-handle-size, 24px);
  height: var(--mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--selected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-handle-color, var(--mat-sys-on-primary));
}
.mdc-switch--selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-hover-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-focus-handle-color, var(--mat-sys-primary-container));
}
.mdc-switch--selected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-selected-pressed-handle-color, var(--mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-selected-handle-color, var(--mat-sys-surface));
}
.mdc-switch--unselected:enabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-handle-color, var(--mat-sys-outline));
}
.mdc-switch--unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-hover-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-focus-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected:enabled:active .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-unselected-pressed-handle-color, var(--mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--mat-slide-toggle-disabled-unselected-handle-color, var(--mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--mat-slide-toggle-state-layer-size, 40px);
  height: var(--mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-hover-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-focus-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-unselected-pressed-state-layer-color, var(--mat-sys-on-surface));
  opacity: var(--mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-hover-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mdc-switch--selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-focus-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mdc-switch--selected:enabled:active .mdc-switch__ripple::after {
  background: var(--mat-slide-toggle-selected-pressed-state-layer-color, var(--mat-sys-primary));
  opacity: var(--mat-slide-toggle-selected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--mat-slide-toggle-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-unselected-icon-color, var(--mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--mat-slide-toggle-selected-icon-size, 16px);
  height: var(--mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--mat-slide-toggle-selected-icon-color, var(--mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--mat-slide-toggle-disabled-selected-icon-color, var(--mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--mat-slide-toggle-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-slide-toggle-label-text-font, var(--mat-sys-body-medium-font));
  line-height: var(--mat-slide-toggle-label-text-line-height, var(--mat-sys-body-medium-line-height));
  font-size: var(--mat-slide-toggle-label-text-size, var(--mat-sys-body-medium-size));
  letter-spacing: var(--mat-slide-toggle-label-text-tracking, var(--mat-sys-body-medium-tracking));
  font-weight: var(--mat-slide-toggle-label-text-weight, var(--mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--mat-slide-toggle-disabled-label-text-color, var(--mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2,changeDetection:0})}return e})(),tb=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[oI,xe]})}return e})();function aI(e,n){e&1&&je(0,"div",2)}var sI=new v("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");var ib=(()=>{class e{_elementRef=u(G);_ngZone=u(R);_changeDetectorRef=u(ct);_renderer=u(et);_cleanupTransitionEnd;constructor(){let t=Pu(),i=u(sI,{optional:!0});this._isNoopAnimation=t==="di-disabled",t==="reduced-motion"&&this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion"),i&&(i.color&&(this.color=this._defaultColor=i.color),this.mode=i.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;_defaultColor="primary";get value(){return this._value}set value(t){this._value=nb(t||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(t){this._bufferValue=nb(t||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new $;get mode(){return this._mode}set mode(t){this._mode=t,this._changeDetectorRef.markForCheck()}_mode="determinate";ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode==="buffer"?this.bufferValue:100}%`}_isIndeterminate(){return this.mode==="indeterminate"||this.mode==="query"}_transitionendHandler=t=>{this.animationEnd.observers.length===0||!t.target||!t.target.classList.contains("mdc-linear-progress__primary-bar")||(this.mode==="determinate"||this.mode==="buffer")&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-progress-bar"]],hostAttrs:["role","progressbar","aria-valuemin","0","aria-valuemax","100","tabindex","-1",1,"mat-mdc-progress-bar","mdc-linear-progress"],hostVars:10,hostBindings:function(i,r){i&2&&(se("aria-valuenow",r._isIndeterminate()?null:r.value)("mode",r.mode),Ge("mat-"+r.color),O("_mat-animation-noopable",r._isNoopAnimation)("mdc-linear-progress--animation-ready",!r._isNoopAnimation)("mdc-linear-progress--indeterminate",r._isIndeterminate()))},inputs:{color:"color",value:[2,"value","value",lt],bufferValue:[2,"bufferValue","bufferValue",lt],mode:"mode"},outputs:{animationEnd:"animationEnd"},exportAs:["matProgressBar"],decls:7,vars:5,consts:[["aria-hidden","true",1,"mdc-linear-progress__buffer"],[1,"mdc-linear-progress__buffer-bar"],[1,"mdc-linear-progress__buffer-dots"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__primary-bar"],[1,"mdc-linear-progress__bar-inner"],["aria-hidden","true",1,"mdc-linear-progress__bar","mdc-linear-progress__secondary-bar"]],template:function(i,r){i&1&&($e(0,"div",0),je(1,"div",1),q(2,aI,1,0,"div",2),ze(),$e(3,"div",3),je(4,"span",4),ze(),$e(5,"div",5),je(6,"span",4),ze()),i&2&&(_(),Tt("flex-basis",r._getBufferBarFlexBasis()),_(),Z(r.mode==="buffer"?2:-1),_(),Tt("transform",r._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--mat-progress-bar-track-height, 4px), var(--mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));
  border-top-width: var(--mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--mat-progress-bar-track-height, 4px);
  border-radius: var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2,changeDetection:0})}return e})();function nb(e,n=0,t=100){return Math.max(n,Math.min(t,e))}var rb=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[xe]})}return e})();var lI=["*"];var dI=[[["","mat-card-avatar",""],["","matCardAvatar",""]],[["mat-card-title"],["mat-card-subtitle"],["","mat-card-title",""],["","mat-card-subtitle",""],["","matCardTitle",""],["","matCardSubtitle",""]],"*"],uI=["[mat-card-avatar], [matCardAvatar]",`mat-card-title, mat-card-subtitle,
      [mat-card-title], [mat-card-subtitle],
      [matCardTitle], [matCardSubtitle]`,"*"],fI=new v("MAT_CARD_CONFIG"),Zs=(()=>{class e{appearance;constructor(){let t=u(fI,{optional:!0});this.appearance=t?.appearance||"raised"}static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-card"]],hostAttrs:[1,"mat-mdc-card","mdc-card"],hostVars:8,hostBindings:function(i,r){i&2&&O("mat-mdc-card-outlined",r.appearance==="outlined")("mdc-card--outlined",r.appearance==="outlined")("mat-mdc-card-filled",r.appearance==="filled")("mdc-card--filled",r.appearance==="filled")},inputs:{appearance:"appearance"},exportAs:["matCard"],ngContentSelectors:lI,decls:1,vars:0,template:function(i,r){i&1&&(De(),de(0))},styles:[`.mat-mdc-card {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  position: relative;
  border-style: solid;
  border-width: 0;
  background-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-color: var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-elevated-container-elevation, var(--mat-sys-level1));
}
.mat-mdc-card::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: solid 1px transparent;
  content: "";
  display: block;
  pointer-events: none;
  box-sizing: border-box;
  border-radius: var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));
}

.mat-mdc-card-outlined {
  background-color: var(--mat-card-outlined-container-color, var(--mat-sys-surface));
  border-radius: var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));
  border-width: var(--mat-card-outlined-outline-width, 1px);
  border-color: var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));
  box-shadow: var(--mat-card-outlined-container-elevation, var(--mat-sys-level0));
}
.mat-mdc-card-outlined::after {
  border: none;
}

.mat-mdc-card-filled {
  background-color: var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));
  border-radius: var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));
  box-shadow: var(--mat-card-filled-container-elevation, var(--mat-sys-level0));
}

.mdc-card__media {
  position: relative;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.mdc-card__media::before {
  display: block;
  content: "";
}
.mdc-card__media:first-child {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
}
.mdc-card__media:last-child {
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;
}

.mat-mdc-card-actions {
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  min-height: 52px;
  padding: 8px;
}

.mat-mdc-card-title {
  font-family: var(--mat-card-title-text-font, var(--mat-sys-title-large-font));
  line-height: var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));
  font-size: var(--mat-card-title-text-size, var(--mat-sys-title-large-size));
  letter-spacing: var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));
  font-weight: var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight));
}

.mat-mdc-card-subtitle {
  color: var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));
  line-height: var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));
  font-size: var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));
  letter-spacing: var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));
  font-weight: var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight));
}

.mat-mdc-card-title,
.mat-mdc-card-subtitle {
  display: block;
  margin: 0;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle {
  padding: 16px 16px 0;
}

.mat-mdc-card-header {
  display: flex;
  padding: 16px 16px 0;
}

.mat-mdc-card-content {
  display: block;
  padding: 0 16px;
}
.mat-mdc-card-content:first-child {
  padding-top: 16px;
}
.mat-mdc-card-content:last-child {
  padding-bottom: 16px;
}

.mat-mdc-card-title-group {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.mat-mdc-card-avatar {
  height: 40px;
  width: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-bottom: 16px;
  object-fit: cover;
}
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-avatar ~ .mat-mdc-card-header-text .mat-mdc-card-title {
  line-height: normal;
}

.mat-mdc-card-sm-image {
  width: 80px;
  height: 80px;
}

.mat-mdc-card-md-image {
  width: 112px;
  height: 112px;
}

.mat-mdc-card-lg-image {
  width: 152px;
  height: 152px;
}

.mat-mdc-card-xl-image {
  width: 240px;
  height: 240px;
}

.mat-mdc-card-subtitle ~ .mat-mdc-card-title,
.mat-mdc-card-title ~ .mat-mdc-card-subtitle,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,
.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,
.mat-mdc-card-title-group .mat-mdc-card-title,
.mat-mdc-card-title-group .mat-mdc-card-subtitle {
  padding-top: 0;
}

.mat-mdc-card-content > :last-child:not(.mat-mdc-card-footer) {
  margin-bottom: 0;
}

.mat-mdc-card-actions-align-end {
  justify-content: flex-end;
}
`],encapsulation:2,changeDetection:0})}return e})(),ob=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["mat-card-title"],["","mat-card-title",""],["","matCardTitle",""]],hostAttrs:[1,"mat-mdc-card-title"]})}return e})();var Ks=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275dir=J({type:e,selectors:[["mat-card-content"]],hostAttrs:[1,"mat-mdc-card-content"]})}return e})();var ab=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275cmp=B({type:e,selectors:[["mat-card-header"]],hostAttrs:[1,"mat-mdc-card-header"],ngContentSelectors:uI,decls:4,vars:0,consts:[[1,"mat-mdc-card-header-text"]],template:function(i,r){i&1&&(De(dI),de(0),$e(1,"div",0),de(2,1),ze(),de(3,2))},encapsulation:2,changeDetection:0})}return e})();var Qs=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[xe]})}return e})();var Ys=class e{locationMap={"\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u043F\u0430\u043B\u0430\u0442\u043A\u0430":"loc_1","\u041F\u0430\u0432\u0438\u043B\u044C\u043E\u043D \u0440\u044F\u0434\u043E\u043C \u0441 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u043F\u0430\u043B\u0430\u0442\u043A\u043E\u0439":"loc_1a","\u041F\u0440\u043E\u0441\u0432\u0435\u0442\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u043F\u0430\u043B\u0430\u0442\u043A\u0430":"loc_2","\u041F\u0430\u043B\u0430\u0442\u043A\u0430 \u0420\u0443\u0431\u0438\u043A\u0443\u0441":"loc_3","\u0420\u0443\u043A\u043E\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u0430\u043B\u0430\u0442\u043A\u0430":"loc_4","\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u043B\u044F\u043D\u0430":"loc_7","\u0417\u0435\u043B\u0435\u043D\u044B\u0435 \u0441\u043A\u0430\u043C\u0435\u0439\u043A\u0438":"loc_8","\u0414\u0430\u043B\u044C\u043D\u044F\u044F \u043F\u043E\u043B\u044F\u043D\u0430":"loc_10","\u0424\u0443\u0442\u0431\u043E\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435":"loc_11",\u0422\u0430\u043D\u0446\u043F\u043B\u043E\u0449\u0430\u0434\u043A\u0430:"loc_11"};convert(n){let t={},i=new Set;for(let r of n)for(let o of r.blocks){if(!o.start||!o.end)continue;let a=new Date(o.start),s=new Date(o.end);if(isNaN(a.getTime())||isNaN(s.getTime()))continue;let c=o.start.split("T")[0],l=p=>p.getHours().toString().padStart(2,"0")+":"+p.getMinutes().toString().padStart(2,"0"),d=l(a),f=l(s);if(i.add(c),!t[c]){let h=["\u0432\u043E\u0441\u043A\u0440\u0435\u0441\u0435\u043D\u044C\u0435","\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A","\u0432\u0442\u043E\u0440\u043D\u0438\u043A","\u0441\u0440\u0435\u0434\u0430","\u0447\u0435\u0442\u0432\u0435\u0440\u0433","\u043F\u044F\u0442\u043D\u0438\u0446\u0430","\u0441\u0443\u0431\u0431\u043E\u0442\u0430"][a.getUTCDay()];t[c]={dayLabel_ru:h,fullDayDescription_ru:`${h}, ${c.split("-").reverse().join(".")}`,events:[]}}let m=this.mapLocation(o.place);t[c].events.push({dateKey:c,eventId:r.ID,title_ru:r.name,eventType:"workshop",description_ru:r.description,host:o.leader||r.leader||"",category:r.category||"",nickName:r.nickName||"",wsId:o.WSID||r.ID||"",blockId:o.blockID||"",url:o.link||r.link||"",locationId:m,startTime:d,endTime:f})}for(let r of Object.keys(t))t[r].events.sort((o,a)=>o.startTime.localeCompare(a.startTime));return{eventInfo:{eventName:"Hameln",startDate:"2026-05-13",endDate:"2026-05-17",mainLanguage:"ru"},locations:[],schedule:t}}mapLocation(n){if(!n)return null;if(this.locationMap[n])return this.locationMap[n];for(let[t,i]of Object.entries(this.locationMap))if(n.includes(t)||t.includes(n))return i;return null}static \u0275fac=function(t){return new(t||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};var pI="https://script.google.com/macros/s/AKfycbzLvPkIFQFL-j_VGj4CdJdKWSxagfoB6WVlIhRuOnqDUm9kSOy7lFyrqzjO7ViZikYSlA/exec",cb="cachedTimetableData",lb="cachedTimetableTimestamp",mI=1800*1e3,nf=[{locationId:"loc_1",name_ru:"\u0413\u043B\u0430\u0432\u043D\u0430\u044F \u043F\u0430\u043B\u0430\u0442\u043A\u0430 (1)",name_de:"Hauptzelt (1)"},{locationId:"loc_1a",name_ru:"\u041F\u0430\u0432\u0438\u043B\u044C\u043E\u043D \u0440\u044F\u0434\u043E\u043C \u0441 \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u043F\u0430\u043B\u0430\u0442\u043A\u043E\u0439",name_de:"Pavillon neben dem Hauptzelt (1a)"},{locationId:"loc_2",name_ru:"\u041F\u0440\u043E\u0441\u0432\u0435\u0442\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u043F\u0430\u043B\u0430\u0442\u043A\u0430",name_de:"Informationszelt (2)"},{locationId:"loc_3",name_ru:"\u041F\u0430\u043B\u0430\u0442\u043A\u0430 \u0420\u0443\u0431\u0438\u043A\u0443\u0441",name_de:"Rubikus Zelt (3)"},{locationId:"loc_4",name_ru:"\u0420\u0443\u043A\u043E\u0434\u0435\u043B\u044C\u043D\u0430\u044F \u043F\u0430\u043B\u0430\u0442\u043A\u0430",name_de:"Bastelzelt (4)"},{locationId:"loc_7",name_ru:"\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u043E\u043B\u044F\u043D\u0430",name_de:"Zentrale Lichtung (7)"},{locationId:"loc_8",name_ru:"\u0417\u0435\u043B\u0435\u043D\u044B\u0435 \u0441\u043A\u0430\u043C\u0435\u0439\u043A\u0438",name_de:"Gr\xFCne B\xE4nke (8)"},{locationId:"loc_10",name_ru:"\u0414\u0430\u043B\u044C\u043D\u044F\u044F \u043F\u043E\u043B\u044F\u043D\u0430",name_de:"Entfernte Lichtung (10)"},{locationId:"loc_11",name_ru:"\u0424\u0443\u0442\u0431\u043E\u043B\u044C\u043D\u043E\u0435 \u043F\u043E\u043B\u0435",name_de:"Fu\xDFballfeld (11)"}],Wt=class e{http=u(cr);jsonConverter=u(Ys);_data=ue(null);_isLoading=ue(!1);isLoading=this._isLoading.asReadonly();schedule=pe(()=>this._data()?.schedule??{});locations=pe(()=>this._data()?.locations??nf);dateKeys=pe(()=>Object.keys(this.schedule()).sort());showDisclaimer=ue(!1);constructor(){this.loadFromCache()}loadFromCache(){try{let n=localStorage.getItem(cb);if(n){let t=JSON.parse(n);this._data.set({eventInfo:{eventName:"Hameln",startDate:"2026-05-13",endDate:"2026-05-17",mainLanguage:"ru"},locations:nf,schedule:t})}}catch{console.warn("Fehler beim Laden des Caches")}}saveToCache(n){try{localStorage.setItem(cb,JSON.stringify(n)),localStorage.setItem(lb,new Date().getTime().toString())}catch{console.warn("Fehler beim Speichern des Caches")}}isCacheValid(){let n=localStorage.getItem(lb);return n?new Date().getTime()-parseInt(n,10)<mI:!1}async fetchFromGoogleSheets(n=!1){if(!n&&this.isCacheValid()&&this._data())return!0;this._isLoading.set(!0);try{let t=new Date().getTime(),i=await Mc(this.http.get(`${pI}?_t=${t}`)),r=this.jsonConverter.convert(i);if(r?.schedule&&Object.keys(r.schedule).length>0)return this._data.set(we(F({},r),{locations:nf})),this.saveToCache(r.schedule),!0}catch(t){console.error("Fehler beim Laden der Workshop-Daten:",t)}finally{this._isLoading.set(!1)}return!1}getLocationName(n){return n?this.locations().find(i=>i.locationId===n)?.name_ru??"":""}static \u0275fac=function(t){return new(t||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};var rf="workshopFavorites",On=class e{_favorites=ue(new Set(JSON.parse(localStorage.getItem(rf)??"[]")));favorites=this._favorites.asReadonly();count=pe(()=>this._favorites().size);isFavorite(n){return this._favorites().has(n)}toggle(n){this._favorites.update(t=>{let i=new Set(t);return i.has(n)?i.delete(n):i.add(n),localStorage.setItem(rf,JSON.stringify([...i])),i})}migrateToBlockIds(n){localStorage.getItem("favoritesMigrated_v4")||this._favorites.update(i=>{let r=new Set(i),o=new Set,a=!1;return n.forEach(s=>{let c=`${s.eventId??s.title_ru}|${s.dateKey}`;r.has(c)&&s.blockId&&(r.add(s.blockId),o.add(c),a=!0)}),o.forEach(s=>{r.delete(s),a=!0}),a&&localStorage.setItem(rf,JSON.stringify([...r])),localStorage.setItem("favoritesMigrated_v4","true"),r})}static \u0275fac=function(t){return new(t||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})};var db=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({})}return e})();var ub=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({imports:[db,Vv,xe]})}return e})();var fb=(()=>{class e{isErrorState(t,i){return!!(t&&t.invalid&&(t.touched||i&&i.submitted))}static \u0275fac=function(i){return new(i||e)};static \u0275prov=b({token:e,factory:e.\u0275fac,providedIn:"root"})}return e})();var hI=new v("mat-chips-default-options",{providedIn:"root",factory:()=>({separatorKeyCodes:[13]})});var pb=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=U({type:e});static \u0275inj=H({providers:[fb,{provide:hI,useValue:{separatorKeyCodes:[13]}}],imports:[$s,xe]})}return e})();var gI=["descriptionContent"];function vI(e,n){if(e&1&&(g(0,"span",3),x(1),y()),e&2){let t=P(3);_(),St(" \u2013 ",t.locationName())}}function bI(e,n){if(e&1&&(g(0,"div",1)(1,"mat-icon"),x(2,"restaurant"),y(),g(3,"span"),x(4),y(),q(5,vI,2,1,"span",3),y()),e&2){let t=P(2);_(4),Be(t.event().title_ru),_(),Z(t.locationName()?5:-1)}}function yI(e,n){if(e&1&&(g(0,"span",12),x(1),y()),e&2){let t=P(3);Tt("background-color",t.categoryColor()),_(),St(" ",t.event().category," ")}}function _I(e,n){if(e&1&&(g(0,"a",14),x(1),y()),e&2){let t=P(4);Q("href","https://hameln.rubikus.de/u/"+t.event().nickName,is),_(),St(" ",t.event().host," ")}}function DI(e,n){if(e&1&&x(0),e&2){let t=P(4);St(" ",t.event().host," ")}}function wI(e,n){if(e&1&&(g(0,"div",9)(1,"mat-icon",13),x(2,"person"),y(),q(3,_I,2,2,"a",14)(4,DI,1,1),y()),e&2){let t=P(3);_(3),Z(t.event().nickName?3:4)}}function CI(e,n){if(e&1&&(g(0,"div",9)(1,"mat-icon",15),x(2,"schedule"),y(),g(3,"span"),x(4),y()()),e&2){let t=P(3);_(4),vs("",t.event().startTime," \u2013 ",t.event().endTime)}}function EI(e,n){if(e&1&&(g(0,"div",10)(1,"mat-icon",16),x(2,"place"),y(),g(3,"span",17),x(4),y()()),e&2){let t=P(3);_(4),Be(t.locationName())}}function II(e,n){if(e&1){let t=an();g(0,"button",21),oe("click",function(){Qe(t);let r=P(4);return Ye(r.toggleExpand())}),x(1),g(2,"mat-icon"),x(3),y()()}if(e&2){let t=P(4);_(),St(" ",t.isExpanded()?"\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C":"\u0427\u0438\u0442\u0430\u0442\u044C \u0434\u0430\u043B\u0435\u0435"," "),_(2),Be(t.isExpanded()?"expand_less":"expand_more")}}function MI(e,n){if(e&1&&(g(0,"div",18)(1,"p",19,0),x(3),y()(),q(4,II,4,2,"button",20)),e&2){let t=P(3);O("expanded",t.isExpanded()),_(3),Be(t.event().description_ru),_(),Z(t.hasOverflow()||t.isExpanded()?4:-1)}}function xI(e,n){if(e&1&&(g(0,"div",11)(1,"a",22),x(2," \u041F\u043E\u0441\u0442 \u043D\u0430 \u0444\u043E\u0440\u0443\u043C\u0435 "),g(3,"mat-icon"),x(4,"open_in_new"),y()()()),e&2){let t=P(3);_(),Q("href",t.event().url,is)}}function TI(e,n){if(e&1){let t=an();g(0,"mat-card",2)(1,"mat-card-header")(2,"mat-card-title",4),x(3),y(),g(4,"div",5),q(5,yI,2,3,"span",6),g(6,"button",7),oe("click",function(r){Qe(t);let o=P(2);return Ye(o.toggleFavorite(r))}),g(7,"mat-icon"),x(8),y()()()(),g(9,"mat-card-content")(10,"div",8),q(11,wI,5,1,"div",9),q(12,CI,5,2,"div",9),q(13,EI,5,1,"div",10),y(),q(14,MI,5,4),q(15,xI,5,1,"div",11),y()()}if(e&2){let t=P(2);_(3),Be(t.event().title_ru),_(2),Z(t.event().category?5:-1),_(),O("favorited",t.isFav()),se("aria-label",t.isFav()?"\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0438\u0437 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E":"\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435"),_(2),Be(t.isFav()?"star":"star_border"),_(3),Z(t.event().host?11:-1),_(),Z(t.event().startTime&&t.event().endTime?12:-1),_(),Z(t.locationName()?13:-1),_(),Z(t.event().description_ru?14:-1),_(),Z(t.event().url?15:-1)}}function SI(e,n){if(e&1&&q(0,bI,6,2,"div",1)(1,TI,16,11,"mat-card",2),e&2){let t=P();Z(t.event().eventType==="meal"?0:1)}}var Xs=class e{event=At.required();viewMode=At.required();isExpanded=ue(!1);hasOverflow=ue(!1);descriptionContent=Rg("descriptionContent");favoritesService=u(On);timetableService=u(Wt);ngAfterViewInit(){setTimeout(()=>this.checkOverflow(),0),window.addEventListener("resize",()=>this.checkOverflow())}checkOverflow(){let n=this.descriptionContent()?.nativeElement;n&&this.hasOverflow.set(n.scrollHeight>n.clientHeight)}toggleExpand(){this.isExpanded.set(!this.isExpanded()),this.isExpanded()||setTimeout(()=>this.checkOverflow(),0)}favoriteKey=pe(()=>{let n=this.event();return n.blockId?n.blockId:`${n.eventId??n.title_ru}|${n.dateKey}`});isFav=pe(()=>this.favoritesService.isFavorite(this.favoriteKey()));locationName=pe(()=>this.timetableService.getLocationName(this.event().locationId));categoryColor=pe(()=>{let n=this.event().category?.toLowerCase()||"";return n.includes("\u043F\u0440\u043E\u0441\u0432\u0435\u0449\u0435\u043D\u0438\u0435")?"#FFD54F":n.includes("\u0440\u0443\u043A\u043E\u0434\u0435\u043B\u0438\u0435")?"#A5D6A7":n.includes("\u0441\u043F\u043E\u0440\u0442")?"#81D4FA":n.includes("\u043C\u0443\u0437\u044B\u043A\u0430")||n.includes("\u0442\u0430\u043D\u0446\u044B")?"#CE93D8":n.includes("\u0438\u0433\u0440\u044B")?"#FFAB91":n.includes("\u043F\u0441\u0438\u0445\u043E\u043B\u043E\u0433\u0438\u044F")?"#F48FB1":n.includes("\u0436\u0438\u0437\u043D\u0435\u043E\u0431\u0435\u0441\u043F\u0435\u0447\u0435\u043D\u0438\u0435")?"#FFD54F":"#E0E0E0"});isVisible=pe(()=>{let n=this.event();return this.viewMode()==="all"||n.eventType==="meal"?!0:this.favoritesService.isFavorite(this.favoriteKey())});toggleFavorite(n){n.stopPropagation(),this.favoritesService.toggle(this.favoriteKey())}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=B({type:e,selectors:[["app-event-card"]],viewQuery:function(t,i){t&1&&gs(i.descriptionContent,gI,5),t&2&&iu()},inputs:{event:[1,"event"],viewMode:[1,"viewMode"]},decls:1,vars:1,consts:[["descriptionContent",""],[1,"meal-item"],[1,"event-card"],[1,"meal-location"],[1,"event-title"],[1,"header-actions-container"],[1,"category-tag",3,"backgroundColor"],["mat-icon-button","",1,"favorite-btn-inline",3,"click"],[1,"event-meta-grid"],[1,"meta-item"],[1,"meta-item","location-item"],[1,"event-url"],[1,"category-tag"],[1,"meta-icon","host-icon"],["target","_blank",1,"host-link",3,"href"],[1,"meta-icon","time-icon"],[1,"meta-icon","location-icon"],[1,"location-text"],[1,"description-container"],[1,"event-description"],["mat-button","",1,"expand-toggle-btn"],["mat-button","",1,"expand-toggle-btn",3,"click"],["target","_blank","rel","noopener noreferrer","mat-button","","color","primary",3,"href"]],template:function(t,i){t&1&&q(0,SI,2,1),t&2&&Z(i.isVisible()?0:-1)},dependencies:[_s,Qs,Zs,Ks,ab,ob,gr,hr,mr,zs,Uu,ub,pb],styles:[".event-card[_ngcontent-%COMP%]{margin-bottom:.75rem;position:relative;border-radius:20px!important;overflow:hidden;border:1px solid rgba(0,0,0,.04)!important;border-left:5px solid #4FC3F7!important;box-shadow:0 4px 16px #0000000a!important;transition:transform .3s cubic-bezier(.175,.885,.32,1.275),box-shadow .3s ease!important}.event-card[_ngcontent-%COMP%]:hover{transform:translateY(-3px) scale(1.005);box-shadow:0 10px 28px #00000014!important}mat-card-header[_ngcontent-%COMP%]{padding:1rem 3.5rem .5rem 1rem!important;display:flex;flex-direction:column;align-items:flex-start;position:relative}.event-title[_ngcontent-%COMP%]{font-family:Comfortaa,cursive;font-size:1.1rem;font-weight:700;color:#2d3748;width:100%;line-height:1.3;margin:0 0 .5rem}.header-actions-container[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem}.favorite-btn-inline[_ngcontent-%COMP%]{position:absolute!important;top:.5rem;right:1rem;z-index:10;color:#ffb300;background:transparent;width:32px;height:32px}.favorite-btn-inline[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.5rem;width:1.5rem;height:1.5rem}.favorite-btn-inline.favorited[_ngcontent-%COMP%]{color:#ffb300}@media(max-width:480px){.event-title[_ngcontent-%COMP%]{font-size:1rem}}.category-tag[_ngcontent-%COMP%]{color:#000;padding:.3rem .8rem;border-radius:50px;font-size:.8rem;font-weight:600;white-space:nowrap;border:none}mat-card-content[_ngcontent-%COMP%]{padding:0 1rem 1rem!important}.event-meta-grid[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:1rem;margin:.5rem 0;font-size:.95rem;color:#333}.meta-item[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.4rem}.meta-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem;flex-shrink:0}.host-icon[_ngcontent-%COMP%]{color:#ffd54f}.time-icon[_ngcontent-%COMP%]{color:#8bc34a}.location-icon[_ngcontent-%COMP%]{color:#ff7043}.location-item[_ngcontent-%COMP%]{flex:1;min-width:200px}.location-text[_ngcontent-%COMP%]{line-height:1.3}.host-link[_ngcontent-%COMP%]{color:inherit;text-decoration:none;border-bottom:1px dashed rgba(0,0,0,.2)}.host-link[_ngcontent-%COMP%]:hover{color:#ef6c00;border-bottom-color:#ef6c00}.event-location[_ngcontent-%COMP%]{font-style:normal;color:#7cb342;font-size:.85rem;font-weight:600;margin:.5rem 0;display:flex;align-items:center;gap:.4rem;background:#7cb34214;padding:.3rem .85rem;border-radius:50px;width:fit-content}.inline-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem;color:inherit;opacity:.7}.description-container[_ngcontent-%COMP%]{margin-top:1rem;transition:all .3s ease}.event-description[_ngcontent-%COMP%]{font-size:.9rem;color:#334155;line-height:1.5;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;transition:all .3s ease}.description-container.expanded[_ngcontent-%COMP%]   .event-description[_ngcontent-%COMP%]{-webkit-line-clamp:unset}.expand-toggle-btn[_ngcontent-%COMP%]{color:#ef6c00!important;font-size:.8rem!important;padding:0!important;height:32px!important;line-height:32px!important;min-width:unset!important;margin-top:.25rem!important}.expand-toggle-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.1rem;width:1.1rem;height:1.1rem;margin-left:-4px}.event-url[_ngcontent-%COMP%]{text-align:right;margin-top:.5rem}.meal-item[_ngcontent-%COMP%]{background:linear-gradient(135deg,#ffb30014,#ffb30008);color:#9a6700;padding:1rem 1.25rem;border-radius:20px;margin-bottom:1.25rem;font-weight:700;display:flex;align-items:center;gap:.75rem;border-left:5px solid #FFB300}.meal-location[_ngcontent-%COMP%]{font-weight:500;font-style:italic;opacity:.7}"]})};var AI=(e,n)=>n.blockId||(n.eventId??n.title_ru)+"|"+n.dateKey;function kI(e,n){if(e&1&&fe(0,"app-event-card",2),e&2){let t=n.$implicit,i=P(2);Q("event",t)("viewMode",i.viewMode())}}function NI(e,n){if(e&1&&(g(0,"div",0)(1,"h3",1),x(2),y(),Ut(3,kI,1,2,"app-event-card",2,AI),y()),e&2){let t=P();Q("id","slot-"+t.startTime()),_(2),St(" ",t.timeLabel()," "),_(),$t(t.visibleEvents())}}var Js=class e{startTime=At.required();endTime=At(null);events=At.required();viewMode=At.required();favoritesService=u(On);timeLabel=pe(()=>{let n=this.endTime(),t=this.startTime();return n&&n!==t?`${t} - ${n}`:t});visibleEvents=pe(()=>{let n=this.viewMode();return this.events().filter(t=>{if(n==="all"||t.eventType==="meal")return!0;let i=t.blockId||`${t.eventId??t.title_ru}|${t.dateKey}`;return this.favoritesService.isFavorite(i)})});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=B({type:e,selectors:[["app-timeslot-group"]],inputs:{startTime:[1,"startTime"],endTime:[1,"endTime"],events:[1,"events"],viewMode:[1,"viewMode"]},decls:1,vars:1,consts:[[1,"timeslot-group",3,"id"],[1,"timeslot-time-header"],[3,"event","viewMode"]],template:function(t,i){t&1&&q(0,NI,5,2,"div",0),t&2&&Z(i.visibleEvents().length>0?0:-1)},dependencies:[Xs],styles:[".timeslot-group[_ngcontent-%COMP%]{margin-bottom:1.25rem;padding:1rem;background:linear-gradient(180deg,rgba(124,179,66,.03),transparent);border-radius:20px}.timeslot-time-header[_ngcontent-%COMP%]{font-size:1.1rem;font-weight:700;color:#7cb342;margin:0 0 1rem;padding:.5rem 0;border-bottom:2px solid rgba(124,179,66,.2)}"]})};var RI=(e,n)=>n.startTime;function OI(e,n){e&1&&(g(0,"p",2),x(1,"\u041C\u0435\u0440\u043E\u043F\u0440\u0438\u044F\u0442\u0438\u0439 \u043D\u0430 \u044D\u0442\u043E\u0442 \u0434\u0435\u043D\u044C \u043D\u0435 \u0437\u0430\u043F\u043B\u0430\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043E."),y())}function FI(e,n){if(e&1&&fe(0,"app-timeslot-group",3),e&2){let t=n.$implicit,i=P(2);Q("startTime",t.startTime)("endTime",t.endTime)("events",t.events)("viewMode",i.viewMode())}}function PI(e,n){if(e&1&&Ut(0,FI,1,4,"app-timeslot-group",3,RI),e&2){let t=P();$t(t.timeslots())}}var ec=class e{dateKey=At.required();viewMode=At.required();timetableService=u(Wt);ngAfterViewInit(){setTimeout(()=>this.scrollToCurrentTime(),400)}scrollToCurrentTime(){let n=new Date,t=n.toISOString().split("T")[0];if(this.dateKey()!==t)return;let i=n.toLocaleTimeString("de-DE",{hour:"2-digit",minute:"2-digit"}),r=this.timeslots();if(r.length===0)return;let o=r[0];for(let a of r)if(a.startTime<=i)o=a;else break;if(o){let a=document.getElementById("slot-"+o.startTime);if(a){let c=window.innerWidth<=520?115:130,d=a.getBoundingClientRect().top+window.pageYOffset-c;window.scrollTo({top:d,behavior:"smooth"})}}}dayDescription=pe(()=>this.timetableService.schedule()[this.dateKey()]?.fullDayDescription_ru??"");timeslots=pe(()=>{let n=this.timetableService.schedule()[this.dateKey()];if(!n?.events)return[];let t=new Map;for(let i of n.events){let r=i.startTime;t.has(r)||t.set(r,[]),t.get(r).push(i)}return[...t.entries()].sort(([i],[r])=>i.localeCompare(r)).map(([i,r])=>{let o=[...new Set(r.map(s=>s.endTime))],a=o.length===1?o[0]:null;return{startTime:i,endTime:a,events:r}})});static \u0275fac=function(t){return new(t||e)};static \u0275cmp=B({type:e,selectors:[["app-day-schedule"]],inputs:{dateKey:[1,"dateKey"],viewMode:[1,"viewMode"]},decls:5,vars:2,consts:[[1,"day-schedule"],[1,"day-header"],[1,"no-events"],[3,"startTime","endTime","events","viewMode"]],template:function(t,i){t&1&&(g(0,"div",0)(1,"h2",1),x(2),y(),q(3,OI,2,0,"p",2)(4,PI,2,0),y()),t&2&&(_(2),Be(i.dayDescription()),_(),Z(i.timeslots().length===0?3:4))},dependencies:[Js],styles:[".day-schedule[_ngcontent-%COMP%]{padding:0 .5rem}.day-header[_ngcontent-%COMP%]{font-family:Comfortaa,cursive;font-size:1.4rem;font-weight:700;color:#2d3748;margin-top:.5rem;margin-bottom:.5rem;border-bottom:3px solid #4FC3F7}.no-events[_ngcontent-%COMP%]{text-align:center;color:#6b7280;margin-top:2rem}"]})};function LI(e,n){e&1&&fe(0,"mat-progress-bar",0)}function VI(e,n){e&1&&(g(0,"mat-card",5)(1,"mat-card-content")(2,"span")(3,"strong"),x(4,"\u0412\u0430\u0436\u043D\u043E\u0435 \u0437\u0430\u043C\u0435\u0447\u0430\u043D\u0438\u0435:"),y(),x(5," \u0423 \u043D\u0430\u0441 \u043D\u0435\u0442 \u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u044D\u0442\u043E\u0433\u043E \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u044F. \u0412 \u0441\u043B\u0443\u0447\u0430\u0435 \u0441\u043E\u043C\u043D\u0435\u043D\u0438\u0439 \u0432\u0441\u0435\u0433\u0434\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u0435\u0442 \u043E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u043E\u0435 \u0438 \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u0440\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0442 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0442\u043E\u0440\u043E\u0432. "),fe(6,"br"),x(7,"\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u043A\u0443 (\u2606), \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u0443\u044E \u0432 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435. "),y()()())}function jI(e,n){e&1&&(g(0,"mat-card",6)(1,"mat-card-content"),x(2," \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u0438\u0445 \u043D\u0435\u0442. \u041E\u0442\u043C\u0435\u0442\u044C\u0442\u0435 \u043C\u0430\u0441\u0442\u0435\u0440-\u043A\u043B\u0430\u0441\u0441\u044B \u0437\u0432\u0451\u0437\u0434\u043E\u0447\u043A\u043E\u0439 \u2606, \u0447\u0442\u043E\u0431\u044B \u043E\u043D\u0438 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u043B\u0438\u0441\u044C \u0437\u0434\u0435\u0441\u044C. "),y()())}function BI(e,n){if(e&1&&fe(0,"app-day-schedule",11),e&2){let t=P().$implicit,i=P(2);Q("dateKey",t)("viewMode",i.viewMode())}}function HI(e,n){if(e&1&&(g(0,"mat-tab",9),Nn(1,BI,1,2,"ng-template",10),y()),e&2){let t=n.$implicit,i=P(2);Q("label",i.tabLabel(t))}}function UI(e,n){if(e&1&&(g(0,"mat-tab-group",7),Ut(1,HI,2,1,"mat-tab",9,ir),y()),e&2){let t=P();Q("selectedIndex",t.selectedTabIndex()),_(),$t(t.timetableService.dateKeys())}}function $I(e,n){e&1&&(g(0,"div",8)(1,"mat-icon"),x(2,"event_busy"),y(),g(3,"p"),x(4,"\u0420\u0430\u0441\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043D\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043D\u043E. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435\xBB."),y()())}var tc=class e{timetableService=u(Wt);favoritesService=u(On);viewMode=ue(localStorage.getItem("workshopPlanView")??"all");selectedTabIndex=pe(()=>{let n=this.timetableService.dateKeys();if(n.length===0)return 0;let t=new Date,i=t.getFullYear(),r=String(t.getMonth()+1).padStart(2,"0"),o=String(t.getDate()).padStart(2,"0"),a=`${i}-${r}-${o}`,s=n.indexOf(a);return s!==-1?s:0});showOnlyFavorites=this.viewMode()==="favorites";constructor(){$i(()=>{let n=this.viewMode();localStorage.setItem("workshopPlanView",n),n==="favorites"&&this.runMigration()})}runMigration(){let n=Object.values(this.timetableService.schedule()).flatMap(t=>t.events);n.length>0&&this.favoritesService.migrateToBlockIds(n)}ngOnInit(){this.timetableService.fetchFromGoogleSheets()}tabLabel(n){return this.timetableService.schedule()[n]?.dayLabel_ru??n}onToggleChange(n){this.viewMode.set(n?"favorites":"all")}async onRefresh(){await this.timetableService.fetchFromGoogleSheets(!0)||console.warn("Daten konnten nicht aktualisiert werden.")}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=B({type:e,selectors:[["app-schedule"]],decls:19,vars:11,consts:[["mode","indeterminate",1,"loading-bar"],[1,"controls-container"],["mat-flat-button","",1,"refresh-btn",3,"click","disabled"],[1,"segmented-control"],[1,"segment-btn",3,"click"],[1,"note-card"],[1,"no-favorites-card"],["mat-stretch-tabs","false","animationDuration","200ms",3,"selectedIndex"],[1,"empty-state"],[3,"label"],["matTabContent",""],[3,"dateKey","viewMode"]],template:function(t,i){t&1&&(q(0,LI,1,0,"mat-progress-bar",0),g(1,"div",1)(2,"button",2),oe("click",function(){return i.onRefresh()}),g(3,"mat-icon"),x(4,"refresh"),y(),x(5," \u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C \u0434\u0430\u043D\u043D\u044B\u0435 "),y(),g(6,"div",3)(7,"button",4),oe("click",function(){return i.viewMode.set("all")}),g(8,"mat-icon"),x(9,"list"),y(),x(10," \u0412\u0441\u0435 "),y(),g(11,"button",4),oe("click",function(){return i.viewMode.set("favorites")}),g(12,"mat-icon"),x(13,"star"),y(),x(14," \u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435 "),y()()(),q(15,VI,8,0,"mat-card",5),q(16,jI,3,0,"mat-card",6),q(17,UI,3,1,"mat-tab-group",7)(18,$I,5,0,"div",8)),t&2&&(Z(i.timetableService.isLoading()?0:-1),_(2),Q("disabled",i.timetableService.isLoading()),_(),O("spinning",i.timetableService.isLoading()),_(4),O("active",i.viewMode()==="all"),_(4),O("active",i.viewMode()==="favorites"),_(4),Z(i.timetableService.showDisclaimer()?15:-1),_(),Z(i.viewMode()==="favorites"&&i.favoritesService.count()===0?16:-1),_(),Z(i.timetableService.dateKeys().length>0?17:i.timetableService.isLoading()?-1:18))},dependencies:[Kv,ef,tf,Zv,tb,mr,zs,gr,hr,rb,ib,Qs,Zs,Ks,Jv,ec],styles:["[_nghost-%COMP%]{display:block}.loading-bar[_ngcontent-%COMP%]{position:fixed;top:0;left:0;right:0;z-index:1000}.controls-container[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:.5rem}.refresh-btn[_ngcontent-%COMP%]{background-color:#ef6c00!important;color:#fff!important;border-radius:50px!important;padding:0 1.5rem!important;height:44px!important;font-weight:600;box-shadow:0 4px 12px #ff98004d!important;transition:transform .2s ease,box-shadow .2s ease!important}.refresh-btn[_ngcontent-%COMP%]:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 16px #ff980066!important}.refresh-btn[_ngcontent-%COMP%]:disabled{background-color:#fff3e0!important;color:#ffb74d!important}@media(max-width:480px){.refresh-btn[_ngcontent-%COMP%]{display:none}.segmented-control[_ngcontent-%COMP%]{width:100%}.segment-btn[_ngcontent-%COMP%]{flex:1;justify-content:center}}.spinning[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.segmented-control[_ngcontent-%COMP%]{display:flex;background:#0000000a;padding:4px;border-radius:50px;gap:4px}.segment-btn[_ngcontent-%COMP%]{border:none;background:transparent;padding:.5rem 1.25rem;border-radius:50px;cursor:pointer;display:flex;align-items:center;gap:.4rem;font-size:.9rem;font-weight:600;color:#888;transition:all .25s ease}.segment-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.1rem;width:1.1rem;height:1.1rem}.segment-btn.active[_ngcontent-%COMP%]{background:#fff;color:#ef6c00;box-shadow:0 2px 8px #0000001a}.segment-btn[_ngcontent-%COMP%]:hover:not(.active){background:#ffffff80}.note-card[_ngcontent-%COMP%]{background:linear-gradient(135deg,#7cb3420f,#7cb34205);border-left:4px solid #7CB342;border-radius:20px!important;margin-top:1rem;margin-bottom:1.5rem;width:100%}.note-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:.5rem;color:#4a6c2f;padding:.75rem}.no-favorites-card[_ngcontent-%COMP%]{text-align:center;margin-bottom:1.5rem;color:#4b5563;border-radius:20px!important}.no-favorites-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%]{padding:1rem}.empty-state[_ngcontent-%COMP%]{text-align:center;padding:3rem;color:#6b7280}.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:3rem;width:3rem;height:3rem}mat-tab-group[_ngcontent-%COMP%]{margin-top:.5rem}"]})};function zI(e,n){if(e&1){let t=an();g(0,"button",17),oe("click",function(){Qe(t);let r=P();return Ye(r.installPwa())}),g(1,"mat-icon"),x(2,"install_mobile"),y(),g(3,"span"),x(4,"\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C"),y()()}}var nc=class e{timetableService=u(Wt);showInstallBtn=ue(!1);deferredPrompt=null;ngOnInit(){window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),this.deferredPrompt=n,this.showInstallBtn.set(!0)}),window.addEventListener("appinstalled",()=>{this.showInstallBtn.set(!1),this.deferredPrompt=null})}async onRefresh(){await this.timetableService.fetchFromGoogleSheets(!0)}async installPwa(){if(!this.deferredPrompt)return;await this.deferredPrompt.prompt();let{outcome:n}=await this.deferredPrompt.userChoice;console.log(`PWA install: ${n}`),this.deferredPrompt=null,this.showInstallBtn.set(!1)}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=B({type:e,selectors:[["app-root"]],decls:26,vars:7,consts:[[1,"app-header"],[1,"header-inner"],[1,"header-brand"],[1,"logo-wrap"],["src","hameln.png","alt","Hameln Logo",1,"logo-img"],[1,"title-block"],[1,"app-title"],[1,"title-meta"],[1,"event-year"],[1,"title-divider"],[1,"event-date"],[1,"header-actions"],["aria-label","\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0430\u0436\u043D\u043E\u0435 \u0437\u0430\u043C\u0435\u0447\u0430\u043D\u0438\u0435",1,"header-action-btn","disclaimer-btn",3,"click"],["aria-label","Refresh data",1,"header-action-btn","mobile-refresh-btn",3,"click","disabled"],[1,"install-btn"],[1,"main-content"],[1,"container"],[1,"install-btn",3,"click"]],template:function(t,i){t&1&&(g(0,"header",0)(1,"div",1)(2,"div",2)(3,"div",3),fe(4,"img",4),y(),g(5,"div",5)(6,"h1",6),x(7,"\u0413\u0430\u043C\u0435\u043B\u044C\u043D"),y(),g(8,"div",7)(9,"span",8),x(10,"2026"),y(),g(11,"span",9),x(12,"\xB7"),y(),g(13,"span",10),x(14,"\u041C\u0430\u0439"),y()()()(),g(15,"div",11)(16,"button",12),oe("click",function(){return i.timetableService.showDisclaimer.set(!i.timetableService.showDisclaimer())}),g(17,"mat-icon"),x(18),y()(),g(19,"button",13),oe("click",function(){return i.onRefresh()}),g(20,"mat-icon"),x(21,"refresh"),y()(),q(22,zI,5,0,"button",14),y()()(),g(23,"main",15)(24,"div",16),fe(25,"app-schedule"),y()()),t&2&&(_(16),O("active",i.timetableService.showDisclaimer()),_(2),Be(i.timetableService.showDisclaimer()?"info":"warning"),_(),Q("disabled",i.timetableService.isLoading()),_(),O("spinning",i.timetableService.isLoading()),_(2),Z(i.showInstallBtn()?22:-1))},dependencies:[mr,gr,hr,tc],styles:[".app-header[_ngcontent-%COMP%]{position:sticky;top:0;z-index:2000;background:#fff;border-bottom:1px solid rgba(0,0,0,.05);box-shadow:0 2px 15px #00000008;height:var(--app-header-height)}.header-inner[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:.5rem 1.25rem;max-width:56rem;margin:0 auto}.header-brand[_ngcontent-%COMP%]{display:flex;align-items:center;gap:1rem}.logo-wrap[_ngcontent-%COMP%]{flex-shrink:0;width:64px;height:64px;display:flex;align-items:center;justify-content:center;transition:transform .3s cubic-bezier(.175,.885,.32,1.275)}.logo-wrap[_ngcontent-%COMP%]:hover{transform:scale(1.1) rotate(5deg)}.logo-img[_ngcontent-%COMP%]{width:100%;height:100%;object-fit:contain}.title-block[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:0}.app-title[_ngcontent-%COMP%]{margin:0;font-family:Comfortaa,cursive;font-size:1.8rem;font-weight:700;color:#ef6c00;letter-spacing:-.02em;line-height:1.1}.title-meta[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.4rem;margin-top:-2px}.event-year[_ngcontent-%COMP%]{font-family:Comfortaa,cursive;font-size:1.1rem;font-weight:700;color:#ffb300;letter-spacing:.05em}.title-divider[_ngcontent-%COMP%]{color:#ccc;font-size:1rem}.event-date[_ngcontent-%COMP%]{font-size:.9rem;color:#666;font-weight:500;text-transform:uppercase;letter-spacing:.1em}.header-actions[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.75rem}.header-action-btn[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;padding:0;border:2px solid #EF6C00;border-radius:50%;background:transparent;color:#ef6c00!important;width:40px;height:40px;cursor:pointer;transition:all .2s ease;line-height:0}.header-action-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:#ef6c00;color:#fff!important}.header-action-btn[_ngcontent-%COMP%]:disabled{opacity:.5;cursor:default}.header-action-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin:0;padding:0;display:block;font-size:1.25rem;width:1.25rem;height:1.25rem}.mobile-refresh-btn[_ngcontent-%COMP%]{display:none}.disclaimer-btn.active[_ngcontent-%COMP%]{background:#ef6c00;color:#fff!important}.spinning[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_spin 1s linear infinite}@keyframes _ngcontent-%COMP%_spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.install-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:.5rem;padding:.6rem 1rem;border:2px solid #EF6C00;border-radius:50px;background:transparent;color:#ef6c00;font-size:.85rem;font-weight:700;cursor:pointer;transition:all .2s ease}.install-btn[_ngcontent-%COMP%]:hover{background:#ef6c00;color:#fff}.install-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1.2rem;width:1.2rem;height:1.2rem}.main-content[_ngcontent-%COMP%]{padding:0}.container[_ngcontent-%COMP%]{max-width:56rem;margin:0 auto;padding:1.5rem 1rem}@media(max-width:520px){.app-header[_ngcontent-%COMP%]{height:64px}.container[_ngcontent-%COMP%]{padding:.5rem}.header-inner[_ngcontent-%COMP%]{padding:0 .5rem;height:64px}.header-brand[_ngcontent-%COMP%]{gap:.25rem}.logo-wrap[_ngcontent-%COMP%]{width:40px;height:40px}.app-title[_ngcontent-%COMP%]{font-size:1.25rem}.header-actions[_ngcontent-%COMP%]{gap:.25rem}.header-action-btn[_ngcontent-%COMP%]{width:34px;height:34px}.header-action-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:1rem;width:1rem;height:1rem}}@media(max-width:400px){.app-title[_ngcontent-%COMP%]{font-size:1.2rem}.logo-wrap[_ngcontent-%COMP%]{width:36px;height:36px}.title-meta[_ngcontent-%COMP%]{display:none}}@media(max-width:480px){.install-btn[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{display:none}.install-btn[_ngcontent-%COMP%]{padding:.5rem;border-radius:50%;width:36px;height:36px;min-width:auto}.mobile-refresh-btn[_ngcontent-%COMP%]{display:flex}}"]})};bu(nc,cv).catch(e=>console.error(e));
