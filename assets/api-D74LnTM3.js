//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp$14 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp$14(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp$14(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/react/cjs/react.production.js
/**
* @license React
* react.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
	var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
	var REACT_CONSUMER_TYPE = Symbol.for("react.consumer");
	var REACT_CONTEXT_TYPE = Symbol.for("react.context");
	var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
	var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
	var REACT_MEMO_TYPE = Symbol.for("react.memo");
	var REACT_LAZY_TYPE = Symbol.for("react.lazy");
	var REACT_ACTIVITY_TYPE = Symbol.for("react.activity");
	var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
	function getIteratorFn(maybeIterable) {
		if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
		maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
		return "function" === typeof maybeIterable ? maybeIterable : null;
	}
	var ReactNoopUpdateQueue = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	};
	var assign = Object.assign;
	var emptyObject = {};
	function Component(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	Component.prototype.isReactComponent = {};
	Component.prototype.setState = function(partialState, callback) {
		if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, partialState, callback, "setState");
	};
	Component.prototype.forceUpdate = function(callback) {
		this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
	};
	function ComponentDummy() {}
	ComponentDummy.prototype = Component.prototype;
	function PureComponent(props, context, updater) {
		this.props = props;
		this.context = context;
		this.refs = emptyObject;
		this.updater = updater || ReactNoopUpdateQueue;
	}
	var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
	pureComponentPrototype.constructor = PureComponent;
	assign(pureComponentPrototype, Component.prototype);
	pureComponentPrototype.isPureReactComponent = !0;
	var isArrayImpl = Array.isArray;
	function noop() {}
	var ReactSharedInternals = {
		H: null,
		A: null,
		T: null,
		S: null
	};
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function ReactElement(type, key, props) {
		var refProp = props.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== refProp ? refProp : null,
			props
		};
	}
	function cloneAndReplaceKey(oldElement, newKey) {
		return ReactElement(oldElement.type, newKey, oldElement.props);
	}
	function isValidElement(object) {
		return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
	}
	function escape(key) {
		var escaperLookup = {
			"=": "=0",
			":": "=2"
		};
		return "$" + key.replace(/[=:]/g, function(match) {
			return escaperLookup[match];
		});
	}
	var userProvidedKeyEscapeRegex = /\/+/g;
	function getElementKey(element, index) {
		return "object" === typeof element && null !== element && null != element.key ? escape("" + element.key) : index.toString(36);
	}
	function resolveThenable(thenable) {
		switch (thenable.status) {
			case "fulfilled": return thenable.value;
			case "rejected": throw thenable.reason;
			default: switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
				"pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
			}, function(error) {
				"pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
			})), thenable.status) {
				case "fulfilled": return thenable.value;
				case "rejected": throw thenable.reason;
			}
		}
		throw thenable;
	}
	function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
		var type = typeof children;
		if ("undefined" === type || "boolean" === type) children = null;
		var invokeCallback = !1;
		if (null === children) invokeCallback = !0;
		else switch (type) {
			case "bigint":
			case "string":
			case "number":
				invokeCallback = !0;
				break;
			case "object": switch (children.$$typeof) {
				case REACT_ELEMENT_TYPE:
				case REACT_PORTAL_TYPE:
					invokeCallback = !0;
					break;
				case REACT_LAZY_TYPE: return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
			}
		}
		if (invokeCallback) return callback = callback(children), invokeCallback = "" === nameSoFar ? "." + getElementKey(children, 0) : nameSoFar, isArrayImpl(callback) ? (escapedPrefix = "", null != invokeCallback && (escapedPrefix = invokeCallback.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
			return c;
		})) : null != callback && (isValidElement(callback) && (callback = cloneAndReplaceKey(callback, escapedPrefix + (null == callback.key || children && children.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + invokeCallback)), array.push(callback)), 1;
		invokeCallback = 0;
		var nextNamePrefix = "" === nameSoFar ? "." : nameSoFar + ":";
		if (isArrayImpl(children)) for (var i = 0; i < children.length; i++) nameSoFar = children[i], type = nextNamePrefix + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if (i = getIteratorFn(children), "function" === typeof i) for (children = i.call(children), i = 0; !(nameSoFar = children.next()).done;) nameSoFar = nameSoFar.value, type = nextNamePrefix + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
		else if ("object" === type) {
			if ("function" === typeof children.then) return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
			array = String(children);
			throw Error("Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
		}
		return invokeCallback;
	}
	function mapChildren(children, func, context) {
		if (null == children) return children;
		var result = [], count = 0;
		mapIntoArray(children, result, "", "", function(child) {
			return func.call(context, child, count++);
		});
		return result;
	}
	function lazyInitializer(payload) {
		if (-1 === payload._status) {
			var ctor = payload._result;
			ctor = ctor();
			ctor.then(function(moduleObject) {
				if (0 === payload._status || -1 === payload._status) payload._status = 1, payload._result = moduleObject;
			}, function(error) {
				if (0 === payload._status || -1 === payload._status) payload._status = 2, payload._result = error;
			});
			-1 === payload._status && (payload._status = 0, payload._result = ctor);
		}
		if (1 === payload._status) return payload._result.default;
		throw payload._result;
	}
	var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
		if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
			var event = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
				error
			});
			if (!window.dispatchEvent(event)) return;
		} else if ("object" === typeof process && "function" === typeof process.emit) {
			process.emit("uncaughtException", error);
			return;
		}
		console.error(error);
	};
	var Children = {
		map: mapChildren,
		forEach: function(children, forEachFunc, forEachContext) {
			mapChildren(children, function() {
				forEachFunc.apply(this, arguments);
			}, forEachContext);
		},
		count: function(children) {
			var n = 0;
			mapChildren(children, function() {
				n++;
			});
			return n;
		},
		toArray: function(children) {
			return mapChildren(children, function(child) {
				return child;
			}) || [];
		},
		only: function(children) {
			if (!isValidElement(children)) throw Error("React.Children.only expected to receive a single React element child.");
			return children;
		}
	};
	exports.Activity = REACT_ACTIVITY_TYPE;
	exports.Children = Children;
	exports.Component = Component;
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.Profiler = REACT_PROFILER_TYPE;
	exports.PureComponent = PureComponent;
	exports.StrictMode = REACT_STRICT_MODE_TYPE;
	exports.Suspense = REACT_SUSPENSE_TYPE;
	exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
	exports.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(size) {
			return ReactSharedInternals.H.useMemoCache(size);
		}
	};
	exports.cache = function(fn) {
		return function() {
			return fn.apply(null, arguments);
		};
	};
	exports.cacheSignal = function() {
		return null;
	};
	exports.cloneElement = function(element, config, children) {
		if (null === element || void 0 === element) throw Error("The argument must be a React element, but you passed " + element + ".");
		var props = assign({}, element.props), key = element.key;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
		var propName = arguments.length - 2;
		if (1 === propName) props.children = children;
		else if (1 < propName) {
			for (var childArray = Array(propName), i = 0; i < propName; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		return ReactElement(element.type, key, props);
	};
	exports.createContext = function(defaultValue) {
		defaultValue = {
			$$typeof: REACT_CONTEXT_TYPE,
			_currentValue: defaultValue,
			_currentValue2: defaultValue,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		};
		defaultValue.Provider = defaultValue;
		defaultValue.Consumer = {
			$$typeof: REACT_CONSUMER_TYPE,
			_context: defaultValue
		};
		return defaultValue;
	};
	exports.createElement = function(type, config, children) {
		var propName, props = {}, key = null;
		if (null != config) for (propName in void 0 !== config.key && (key = "" + config.key), config) hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (props[propName] = config[propName]);
		var childrenLength = arguments.length - 2;
		if (1 === childrenLength) props.children = children;
		else if (1 < childrenLength) {
			for (var childArray = Array(childrenLength), i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 2];
			props.children = childArray;
		}
		if (type && type.defaultProps) for (propName in childrenLength = type.defaultProps, childrenLength) void 0 === props[propName] && (props[propName] = childrenLength[propName]);
		return ReactElement(type, key, props);
	};
	exports.createRef = function() {
		return { current: null };
	};
	exports.forwardRef = function(render) {
		return {
			$$typeof: REACT_FORWARD_REF_TYPE,
			render
		};
	};
	exports.isValidElement = isValidElement;
	exports.lazy = function(ctor) {
		return {
			$$typeof: REACT_LAZY_TYPE,
			_payload: {
				_status: -1,
				_result: ctor
			},
			_init: lazyInitializer
		};
	};
	exports.memo = function(type, compare) {
		return {
			$$typeof: REACT_MEMO_TYPE,
			type,
			compare: void 0 === compare ? null : compare
		};
	};
	exports.startTransition = function(scope) {
		var prevTransition = ReactSharedInternals.T, currentTransition = {};
		ReactSharedInternals.T = currentTransition;
		try {
			var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
			null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
			"object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && returnValue.then(noop, reportGlobalError);
		} catch (error) {
			reportGlobalError(error);
		} finally {
			null !== prevTransition && null !== currentTransition.types && (prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
		}
	};
	exports.unstable_useCacheRefresh = function() {
		return ReactSharedInternals.H.useCacheRefresh();
	};
	exports.use = function(usable) {
		return ReactSharedInternals.H.use(usable);
	};
	exports.useActionState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useActionState(action, initialState, permalink);
	};
	exports.useCallback = function(callback, deps) {
		return ReactSharedInternals.H.useCallback(callback, deps);
	};
	exports.useContext = function(Context) {
		return ReactSharedInternals.H.useContext(Context);
	};
	exports.useDebugValue = function() {};
	exports.useDeferredValue = function(value, initialValue) {
		return ReactSharedInternals.H.useDeferredValue(value, initialValue);
	};
	exports.useEffect = function(create, deps) {
		return ReactSharedInternals.H.useEffect(create, deps);
	};
	exports.useEffectEvent = function(callback) {
		return ReactSharedInternals.H.useEffectEvent(callback);
	};
	exports.useId = function() {
		return ReactSharedInternals.H.useId();
	};
	exports.useImperativeHandle = function(ref, create, deps) {
		return ReactSharedInternals.H.useImperativeHandle(ref, create, deps);
	};
	exports.useInsertionEffect = function(create, deps) {
		return ReactSharedInternals.H.useInsertionEffect(create, deps);
	};
	exports.useLayoutEffect = function(create, deps) {
		return ReactSharedInternals.H.useLayoutEffect(create, deps);
	};
	exports.useMemo = function(create, deps) {
		return ReactSharedInternals.H.useMemo(create, deps);
	};
	exports.useOptimistic = function(passthrough, reducer) {
		return ReactSharedInternals.H.useOptimistic(passthrough, reducer);
	};
	exports.useReducer = function(reducer, initialArg, init) {
		return ReactSharedInternals.H.useReducer(reducer, initialArg, init);
	};
	exports.useRef = function(initialValue) {
		return ReactSharedInternals.H.useRef(initialValue);
	};
	exports.useState = function(initialState) {
		return ReactSharedInternals.H.useState(initialState);
	};
	exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
		return ReactSharedInternals.H.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
	};
	exports.useTransition = function() {
		return ReactSharedInternals.H.useTransition();
	};
	exports.version = "19.2.7";
}));
//#endregion
//#region node_modules/react/index.js
var require_react = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_production();
}));
//#endregion
//#region node_modules/react-dom/cjs/react-dom.production.js
/**
* @license React
* react-dom.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_dom_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function formatProdErrorMessage(code) {
		var url = "https://react.dev/errors/" + code;
		if (1 < arguments.length) {
			url += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var i = 2; i < arguments.length; i++) url += "&args[]=" + encodeURIComponent(arguments[i]);
		}
		return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function noop() {}
	var Internals = {
		d: {
			f: noop,
			r: function() {
				throw Error(formatProdErrorMessage(522));
			},
			D: noop,
			C: noop,
			L: noop,
			m: noop,
			X: noop,
			S: noop,
			M: noop
		},
		p: 0,
		findDOMNode: null
	};
	var REACT_PORTAL_TYPE = Symbol.for("react.portal");
	function createPortal$1(children, containerInfo, implementation) {
		var key = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
		return {
			$$typeof: REACT_PORTAL_TYPE,
			key: null == key ? null : "" + key,
			children,
			containerInfo,
			implementation
		};
	}
	var ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function getCrossOriginStringAs(as, input) {
		if ("font" === as) return "";
		if ("string" === typeof input) return "use-credentials" === input ? input : "";
	}
	exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
	exports.createPortal = function(children, container) {
		var key = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
		if (!container || 1 !== container.nodeType && 9 !== container.nodeType && 11 !== container.nodeType) throw Error(formatProdErrorMessage(299));
		return createPortal$1(children, container, null, key);
	};
	exports.flushSync = function(fn) {
		var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
		try {
			if (ReactSharedInternals.T = null, Internals.p = 2, fn) return fn();
		} finally {
			ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f();
		}
	};
	exports.preconnect = function(href, options) {
		"string" === typeof href && (options ? (options = options.crossOrigin, options = "string" === typeof options ? "use-credentials" === options ? options : "" : void 0) : options = null, Internals.d.C(href, options));
	};
	exports.prefetchDNS = function(href) {
		"string" === typeof href && Internals.d.D(href);
	};
	exports.preinit = function(href, options) {
		if ("string" === typeof href && options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = "string" === typeof options.integrity ? options.integrity : void 0, fetchPriority = "string" === typeof options.fetchPriority ? options.fetchPriority : void 0;
			"style" === as ? Internals.d.S(href, "string" === typeof options.precedence ? options.precedence : void 0, {
				crossOrigin,
				integrity,
				fetchPriority
			}) : "script" === as && Internals.d.X(href, {
				crossOrigin,
				integrity,
				fetchPriority,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0
			});
		}
	};
	exports.preinitModule = function(href, options) {
		if ("string" === typeof href) if ("object" === typeof options && null !== options) {
			if (null == options.as || "script" === options.as) {
				var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
				Internals.d.M(href, {
					crossOrigin,
					integrity: "string" === typeof options.integrity ? options.integrity : void 0,
					nonce: "string" === typeof options.nonce ? options.nonce : void 0
				});
			}
		} else options ?? Internals.d.M(href);
	};
	exports.preload = function(href, options) {
		if ("string" === typeof href && "object" === typeof options && null !== options && "string" === typeof options.as) {
			var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin);
			Internals.d.L(href, as, {
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0,
				nonce: "string" === typeof options.nonce ? options.nonce : void 0,
				type: "string" === typeof options.type ? options.type : void 0,
				fetchPriority: "string" === typeof options.fetchPriority ? options.fetchPriority : void 0,
				referrerPolicy: "string" === typeof options.referrerPolicy ? options.referrerPolicy : void 0,
				imageSrcSet: "string" === typeof options.imageSrcSet ? options.imageSrcSet : void 0,
				imageSizes: "string" === typeof options.imageSizes ? options.imageSizes : void 0,
				media: "string" === typeof options.media ? options.media : void 0
			});
		}
	};
	exports.preloadModule = function(href, options) {
		if ("string" === typeof href) if (options) {
			var crossOrigin = getCrossOriginStringAs(options.as, options.crossOrigin);
			Internals.d.m(href, {
				as: "string" === typeof options.as && "script" !== options.as ? options.as : void 0,
				crossOrigin,
				integrity: "string" === typeof options.integrity ? options.integrity : void 0
			});
		} else Internals.d.m(href);
	};
	exports.requestFormReset = function(form) {
		Internals.d.r(form);
	};
	exports.unstable_batchedUpdates = function(fn, a) {
		return fn(a);
	};
	exports.useFormState = function(action, initialState, permalink) {
		return ReactSharedInternals.H.useFormState(action, initialState, permalink);
	};
	exports.useFormStatus = function() {
		return ReactSharedInternals.H.useHostTransitionStatus();
	};
	exports.version = "19.2.7";
}));
//#endregion
//#region node_modules/react-dom/index.js
var require_react_dom = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function checkDCE() {
		if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") return;
		try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
		} catch (err) {
			console.error(err);
		}
	}
	checkDCE();
	module.exports = require_react_dom_production();
}));
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/utils.js
/**
* Return the last element of an array.
* Intended for non-empty arrays used within router internals.
*/
function last(arr) {
	return arr[arr.length - 1];
}
function isFunction(d) {
	return typeof d === "function";
}
/**
* Apply a value-or-updater to a previous value.
* Accepts either a literal value or a function of the previous value.
*/
function functionalUpdate(updater, previous) {
	if (isFunction(updater)) return updater(previous);
	return updater;
}
var hasOwn = Object.prototype.hasOwnProperty;
var isEnumerable = Object.prototype.propertyIsEnumerable;
function hasKeys(obj) {
	for (const key in obj) if (hasOwn.call(obj, key)) return true;
	return false;
}
var createNull = () => Object.create(null);
var nullReplaceEqualDeep = (prev, next) => replaceEqualDeep(prev, next, createNull);
/**
* This function returns `prev` if `_next` is deeply equal.
* If not, it will replace any deeply equal children of `b` with those of `a`.
* This can be used for structural sharing between immutable JSON values for example.
* Do not use this with signals
*/
function replaceEqualDeep(prev, _next, _makeObj = () => ({}), _depth = 0) {
	if (prev === _next) return prev;
	if (_depth > 500) return _next;
	const next = _next;
	const array = isPlainArray(prev) && isPlainArray(next);
	if (!array && !(isPlainObject(prev) && isPlainObject(next))) return next;
	const prevItems = array ? prev : getEnumerableOwnKeys(prev);
	if (!prevItems) return next;
	const nextItems = array ? next : getEnumerableOwnKeys(next);
	if (!nextItems) return next;
	const prevSize = prevItems.length;
	const nextSize = nextItems.length;
	const copy = array ? new Array(nextSize) : _makeObj();
	let equalItems = 0;
	for (let i = 0; i < nextSize; i++) {
		const key = array ? i : nextItems[i];
		const p = prev[key];
		const n = next[key];
		if (p === n) {
			copy[key] = p;
			if (array ? i < prevSize : hasOwn.call(prev, key)) equalItems++;
			continue;
		}
		if (p === null || n === null || typeof p !== "object" || typeof n !== "object") {
			copy[key] = n;
			continue;
		}
		const v = replaceEqualDeep(p, n, _makeObj, _depth + 1);
		copy[key] = v;
		if (v === p) equalItems++;
	}
	return prevSize === nextSize && equalItems === prevSize ? prev : copy;
}
/**
* Equivalent to `Reflect.ownKeys`, but ensures that objects are "clone-friendly":
* will return false if object has any non-enumerable properties.
*
* Optimized for the common case where objects have no symbol properties.
*/
function getEnumerableOwnKeys(o) {
	const names = Object.getOwnPropertyNames(o);
	for (const name of names) if (!isEnumerable.call(o, name)) return false;
	const symbols = Object.getOwnPropertySymbols(o);
	if (symbols.length === 0) return names;
	const keys = names;
	for (const symbol of symbols) {
		if (!isEnumerable.call(o, symbol)) return false;
		keys.push(symbol);
	}
	return keys;
}
function isPlainObject(o) {
	if (!hasObjectPrototype(o)) return false;
	const ctor = o.constructor;
	if (typeof ctor === "undefined") return true;
	const prot = ctor.prototype;
	if (!hasObjectPrototype(prot)) return false;
	if (!prot.hasOwnProperty("isPrototypeOf")) return false;
	return true;
}
function hasObjectPrototype(o) {
	return Object.prototype.toString.call(o) === "[object Object]";
}
/**
* Check if a value is a "plain" array (no extra enumerable keys).
*/
function isPlainArray(value) {
	return Array.isArray(value) && value.length === Object.keys(value).length;
}
/**
* Perform a deep equality check with options for partial comparison and
* ignoring `undefined` values. Optimized for router state comparisons.
*/
function deepEqual(a, b, opts) {
	if (a === b) return true;
	if (typeof a !== typeof b) return false;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0, l = a.length; i < l; i++) if (!deepEqual(a[i], b[i], opts)) return false;
		return true;
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const ignoreUndefined = opts?.ignoreUndefined ?? true;
		if (opts?.partial) {
			for (const k in b) if (!ignoreUndefined || b[k] !== void 0) {
				if (!deepEqual(a[k], b[k], opts)) return false;
			}
			return true;
		}
		let aCount = 0;
		if (!ignoreUndefined) aCount = Object.keys(a).length;
		else for (const k in a) if (a[k] !== void 0) aCount++;
		let bCount = 0;
		for (const k in b) if (!ignoreUndefined || b[k] !== void 0) {
			bCount++;
			if (bCount > aCount || !deepEqual(a[k], b[k], opts)) return false;
		}
		return aCount === bCount;
	}
	return false;
}
/**
* Create a promise with exposed resolve/reject and status fields.
* Useful for coordinating async router lifecycle operations.
*/
function createControlledPromise(onResolve) {
	let resolveLoadPromise;
	let rejectLoadPromise;
	const controlledPromise = new Promise((resolve, reject) => {
		resolveLoadPromise = resolve;
		rejectLoadPromise = reject;
	});
	controlledPromise.status = "pending";
	controlledPromise.resolve = (value) => {
		controlledPromise.status = "resolved";
		controlledPromise.value = value;
		resolveLoadPromise(value);
		onResolve?.(value);
	};
	controlledPromise.reject = (e) => {
		controlledPromise.status = "rejected";
		rejectLoadPromise(e);
	};
	return controlledPromise;
}
/**
* Heuristically detect dynamic import "module not found" errors
* across major browsers for lazy route component handling.
*/
function isModuleNotFoundError(error) {
	if (typeof error?.message !== "string") return false;
	return error.message.startsWith("Failed to fetch dynamically imported module") || error.message.startsWith("error loading dynamically imported module") || error.message.startsWith("Importing a module script failed");
}
function isPromise(value) {
	return Boolean(value && typeof value === "object" && typeof value.then === "function");
}
/**
* Re-encode characters that are unsafe in URL paths.
* Includes ASCII control characters (0x00-0x1F, 0x7F) and a subset of the
* WHATWG URL "path percent-encode set" (", <, >, `, {, }).
*
* Space (0x20) is intentionally excluded — decodeURI decodes %20 to space
* and the router stores decoded spaces in location.pathname. The existing
* encodePathLikeUrl already handles re-encoding spaces for outgoing URLs.
*
* These characters are decoded by decodeURI but must remain percent-encoded
* in paths to match how upstream layers (CDNs, edge middleware, browsers)
* interpret the URL, preventing infinite redirect loops and path mismatches.
*/
var PATH_UNSAFE_RE = /[\x00-\x1f\x7f"<>`{}]/g;
function sanitizePathSegment(segment) {
	return segment.replace(PATH_UNSAFE_RE, (ch) => "%" + ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0"));
}
function decodeSegment(segment) {
	let decoded;
	try {
		decoded = decodeURI(segment);
	} catch {
		decoded = segment.replaceAll(/%[0-9A-F]{2}/gi, (match) => {
			try {
				return decodeURI(match);
			} catch {
				return match;
			}
		});
	}
	return sanitizePathSegment(decoded);
}
/**
* Default list of URL protocols to allow in links, redirects, and navigation.
* Any absolute URL protocol not in this list is treated as dangerous by default.
*/
var DEFAULT_PROTOCOL_ALLOWLIST = [
	"http:",
	"https:",
	"mailto:",
	"tel:"
];
/**
* Check if a URL string uses a protocol that is not in the allowlist.
* Returns true for blocked protocols like javascript:, blob:, data:, etc.
*
* The URL constructor correctly normalizes:
* - Mixed case (JavaScript: → javascript:)
* - Whitespace/control characters (java\nscript: → javascript:)
* - Leading whitespace
*
* For relative URLs (no protocol), returns false (safe).
*
* @param url - The URL string to check
* @param allowlist - Set of protocols to allow
* @returns true if the URL uses a protocol that is not allowed
*/
function isDangerousProtocol(url, allowlist) {
	if (!url) return false;
	try {
		const parsed = new URL(url);
		return !allowlist.has(parsed.protocol);
	} catch {
		return false;
	}
}
var HTML_ESCAPE_LOOKUP = {
	"&": "\\u0026",
	">": "\\u003e",
	"<": "\\u003c",
	"\u2028": "\\u2028",
	"\u2029": "\\u2029"
};
var HTML_ESCAPE_REGEX = /[&><\u2028\u2029]/g;
/**
* Escape HTML special characters in a string to prevent XSS attacks
* when embedding strings in script tags during SSR.
*
* This is essential for preventing XSS vulnerabilities when user-controlled
* content is embedded in inline scripts.
*/
function escapeHtml(str) {
	return str.replace(HTML_ESCAPE_REGEX, (match) => HTML_ESCAPE_LOOKUP[match]);
}
function decodePath(path) {
	if (!path) return {
		path,
		handledProtocolRelativeURL: false
	};
	if (!/[%\\\x00-\x1f\x7f]/.test(path) && !path.startsWith("//")) return {
		path,
		handledProtocolRelativeURL: false
	};
	const re = /%25|%5C/gi;
	let cursor = 0;
	let result = "";
	let match;
	while (null !== (match = re.exec(path))) {
		result += decodeSegment(path.slice(cursor, match.index)) + match[0];
		cursor = re.lastIndex;
	}
	result = result + decodeSegment(cursor ? path.slice(cursor) : path);
	let handledProtocolRelativeURL = false;
	if (result.startsWith("//")) {
		handledProtocolRelativeURL = true;
		result = "/" + result.replace(/^\/+/, "");
	}
	return {
		path: result,
		handledProtocolRelativeURL
	};
}
/**
* Encodes a path the same way `new URL()` would, but without the overhead of full URL parsing.
*
* This function encodes:
* - Whitespace characters (spaces → %20, tabs → %09, etc.)
* - Non-ASCII/Unicode characters (emojis, accented characters, etc.)
*
* It preserves:
* - Already percent-encoded sequences (won't double-encode %2F, %25, etc.)
* - ASCII special characters valid in URL paths (@, $, &, +, etc.)
* - Forward slashes as path separators
*
* Used to generate proper href values for SSR without constructing URL objects.
*
* @example
* encodePathLikeUrl('/path/file name.pdf') // '/path/file%20name.pdf'
* encodePathLikeUrl('/path/日本語') // '/path/%E6%97%A5%E6%9C%AC%E8%AA%9E'
* encodePathLikeUrl('/path/already%20encoded') // '/path/already%20encoded' (preserved)
*/
function encodePathLikeUrl(path) {
	if (!/\s|[^\u0000-\u007F]/.test(path)) return path;
	return path.replace(/\s|[^\u0000-\u007F]/gu, encodeURIComponent);
}
function arraysEqual(a, b) {
	if (a === b) return true;
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
	return true;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/invariant.js
function invariant() {
	throw new Error("Invariant failed");
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/lru-cache.js
function createLRUCache(max) {
	const cache = /* @__PURE__ */ new Map();
	let oldest;
	let newest;
	const touch = (entry) => {
		if (!entry.next) return;
		if (!entry.prev) {
			entry.next.prev = void 0;
			oldest = entry.next;
			entry.next = void 0;
			if (newest) {
				entry.prev = newest;
				newest.next = entry;
			}
		} else {
			entry.prev.next = entry.next;
			entry.next.prev = entry.prev;
			entry.next = void 0;
			if (newest) {
				newest.next = entry;
				entry.prev = newest;
			}
		}
		newest = entry;
	};
	return {
		get(key) {
			const entry = cache.get(key);
			if (!entry) return void 0;
			touch(entry);
			return entry.value;
		},
		set(key, value) {
			if (cache.size >= max && oldest) {
				const toDelete = oldest;
				cache.delete(toDelete.key);
				if (toDelete.next) {
					oldest = toDelete.next;
					toDelete.next.prev = void 0;
				}
				if (toDelete === newest) newest = void 0;
			}
			const existing = cache.get(key);
			if (existing) {
				existing.value = value;
				touch(existing);
			} else {
				const entry = {
					key,
					value,
					prev: newest
				};
				if (newest) newest.next = entry;
				newest = entry;
				if (!oldest) oldest = entry;
				cache.set(key, entry);
			}
		},
		clear() {
			cache.clear();
			oldest = void 0;
			newest = void 0;
		}
	};
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/new-process-route-tree.js
var SEGMENT_TYPE_INDEX = 4;
var SEGMENT_TYPE_PATHLESS = 5;
function getOpenAndCloseBraces(part) {
	const openBrace = part.indexOf("{");
	if (openBrace === -1) return null;
	const closeBrace = part.indexOf("}", openBrace);
	if (closeBrace === -1) return null;
	if (openBrace + 1 >= part.length) return null;
	return [openBrace, closeBrace];
}
/**
* Populates the `output` array with the parsed representation of the given `segment` string.
*
* Usage:
* ```ts
* let output
* let cursor = 0
* while (cursor < path.length) {
*   output = parseSegment(path, cursor, output)
*   const end = output[5]
*   cursor = end + 1
* ```
*
* `output` is stored outside to avoid allocations during repeated calls. It doesn't need to be typed
* or initialized, it will be done automatically.
*/
function parseSegment(path, start, output = /* @__PURE__ */ new Uint16Array(6)) {
	const next = path.indexOf("/", start);
	const end = next === -1 ? path.length : next;
	const part = path.substring(start, end);
	if (!part || !part.includes("$")) {
		output[0] = 0;
		output[1] = start;
		output[2] = start;
		output[3] = end;
		output[4] = end;
		output[5] = end;
		return output;
	}
	if (part === "$") {
		const total = path.length;
		output[0] = 2;
		output[1] = start;
		output[2] = start;
		output[3] = total;
		output[4] = total;
		output[5] = total;
		return output;
	}
	if (part.charCodeAt(0) === 36) {
		output[0] = 1;
		output[1] = start;
		output[2] = start + 1;
		output[3] = end;
		output[4] = end;
		output[5] = end;
		return output;
	}
	const braces = getOpenAndCloseBraces(part);
	if (braces) {
		const [openBrace, closeBrace] = braces;
		const firstChar = part.charCodeAt(openBrace + 1);
		if (firstChar === 45) {
			if (openBrace + 2 < part.length && part.charCodeAt(openBrace + 2) === 36) {
				const paramStart = openBrace + 3;
				const paramEnd = closeBrace;
				if (paramStart < paramEnd) {
					output[0] = 3;
					output[1] = start + openBrace;
					output[2] = start + paramStart;
					output[3] = start + paramEnd;
					output[4] = start + closeBrace + 1;
					output[5] = end;
					return output;
				}
			}
		} else if (firstChar === 36) {
			const dollarPos = openBrace + 1;
			const afterDollar = openBrace + 2;
			if (afterDollar === closeBrace) {
				output[0] = 2;
				output[1] = start + openBrace;
				output[2] = start + dollarPos;
				output[3] = start + afterDollar;
				output[4] = start + closeBrace + 1;
				output[5] = path.length;
				return output;
			}
			output[0] = 1;
			output[1] = start + openBrace;
			output[2] = start + afterDollar;
			output[3] = start + closeBrace;
			output[4] = start + closeBrace + 1;
			output[5] = end;
			return output;
		}
	}
	output[0] = 0;
	output[1] = start;
	output[2] = start;
	output[3] = end;
	output[4] = end;
	output[5] = end;
	return output;
}
/**
* Recursively parses the segments of the given route tree and populates a segment trie.
*
* @param data A reusable Uint16Array for parsing segments. (non important, we're just avoiding allocations)
* @param route The current route to parse.
* @param start The starting index for parsing within the route's full path.
* @param node The current segment node in the trie to populate.
* @param onRoute Callback invoked for each route processed.
*/
function parseSegments(defaultCaseSensitive, data, route, start, node, depth, onRoute) {
	onRoute?.(route);
	let cursor = start;
	{
		const path = route.fullPath ?? route.from;
		const length = path.length;
		const caseSensitive = route.options?.caseSensitive ?? defaultCaseSensitive;
		const parseParams = route.options?.params?.parse ?? route.options?.parseParams;
		while (cursor < length) {
			const segment = parseSegment(path, cursor, data);
			let nextNode;
			const start = cursor;
			const end = segment[5];
			cursor = end + 1;
			depth++;
			switch (segment[0]) {
				case 0: {
					const value = path.substring(segment[2], segment[3]);
					if (caseSensitive) {
						const existingNode = node.static?.get(value);
						if (existingNode) nextNode = existingNode;
						else {
							node.static ??= /* @__PURE__ */ new Map();
							const next = createStaticNode(route.fullPath ?? route.from);
							next.parent = node;
							next.depth = depth;
							nextNode = next;
							node.static.set(value, next);
						}
					} else {
						const name = value.toLowerCase();
						const existingNode = node.staticInsensitive?.get(name);
						if (existingNode) nextNode = existingNode;
						else {
							node.staticInsensitive ??= /* @__PURE__ */ new Map();
							const next = createStaticNode(route.fullPath ?? route.from);
							next.parent = node;
							next.depth = depth;
							nextNode = next;
							node.staticInsensitive.set(name, next);
						}
					}
					break;
				}
				case 1: {
					const prefix_raw = path.substring(start, segment[1]);
					const suffix_raw = path.substring(segment[4], end);
					const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
					const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
					const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
					const existingNode = !parseParams && node.dynamic?.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
					if (existingNode) nextNode = existingNode;
					else {
						const next = createDynamicNode(1, route.fullPath ?? route.from, actuallyCaseSensitive, prefix, suffix);
						nextNode = next;
						next.depth = depth;
						next.parent = node;
						node.dynamic ??= [];
						node.dynamic.push(next);
					}
					break;
				}
				case 3: {
					const prefix_raw = path.substring(start, segment[1]);
					const suffix_raw = path.substring(segment[4], end);
					const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
					const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
					const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
					const existingNode = !parseParams && node.optional?.find((s) => !s.parse && s.caseSensitive === actuallyCaseSensitive && s.prefix === prefix && s.suffix === suffix);
					if (existingNode) nextNode = existingNode;
					else {
						const next = createDynamicNode(3, route.fullPath ?? route.from, actuallyCaseSensitive, prefix, suffix);
						nextNode = next;
						next.parent = node;
						next.depth = depth;
						node.optional ??= [];
						node.optional.push(next);
					}
					break;
				}
				case 2: {
					const prefix_raw = path.substring(start, segment[1]);
					const suffix_raw = path.substring(segment[4], end);
					const actuallyCaseSensitive = caseSensitive && !!(prefix_raw || suffix_raw);
					const prefix = !prefix_raw ? void 0 : actuallyCaseSensitive ? prefix_raw : prefix_raw.toLowerCase();
					const suffix = !suffix_raw ? void 0 : actuallyCaseSensitive ? suffix_raw : suffix_raw.toLowerCase();
					const next = createDynamicNode(2, route.fullPath ?? route.from, actuallyCaseSensitive, prefix, suffix);
					nextNode = next;
					next.parent = node;
					next.depth = depth;
					node.wildcard ??= [];
					node.wildcard.push(next);
				}
			}
			node = nextNode;
		}
		if (parseParams && route.children && !route.isRoot && route.id && route.id.charCodeAt(route.id.lastIndexOf("/") + 1) === 95) {
			const pathlessNode = createStaticNode(route.fullPath ?? route.from);
			pathlessNode.kind = SEGMENT_TYPE_PATHLESS;
			pathlessNode.parent = node;
			depth++;
			pathlessNode.depth = depth;
			node.pathless ??= [];
			node.pathless.push(pathlessNode);
			node = pathlessNode;
		}
		const isLeaf = (route.path || !route.children) && !route.isRoot;
		if (isLeaf && path.endsWith("/")) {
			const indexNode = createStaticNode(route.fullPath ?? route.from);
			indexNode.kind = SEGMENT_TYPE_INDEX;
			indexNode.parent = node;
			depth++;
			indexNode.depth = depth;
			node.index = indexNode;
			node = indexNode;
		}
		node.parse = parseParams ?? null;
		node.priority = route.options?.params?.priority ?? 0;
		if (isLeaf && !node.route) {
			node.route = route;
			node.fullPath = route.fullPath ?? route.from;
		}
	}
	if (route.children) for (const child of route.children) parseSegments(defaultCaseSensitive, data, child, cursor, node, depth, onRoute);
}
function sortDynamic(a, b) {
	if (a.parse && !b.parse) return -1;
	if (!a.parse && b.parse) return 1;
	if (a.parse && b.parse && (a.priority || b.priority)) return b.priority - a.priority;
	if (a.prefix && b.prefix && a.prefix !== b.prefix) {
		if (a.prefix.startsWith(b.prefix)) return -1;
		if (b.prefix.startsWith(a.prefix)) return 1;
	}
	if (a.suffix && b.suffix && a.suffix !== b.suffix) {
		if (a.suffix.endsWith(b.suffix)) return -1;
		if (b.suffix.endsWith(a.suffix)) return 1;
	}
	if (a.prefix && !b.prefix) return -1;
	if (!a.prefix && b.prefix) return 1;
	if (a.suffix && !b.suffix) return -1;
	if (!a.suffix && b.suffix) return 1;
	if (a.caseSensitive && !b.caseSensitive) return -1;
	if (!a.caseSensitive && b.caseSensitive) return 1;
	return 0;
}
function sortTreeNodes(node) {
	if (node.pathless) for (const child of node.pathless) sortTreeNodes(child);
	if (node.static) for (const child of node.static.values()) sortTreeNodes(child);
	if (node.staticInsensitive) for (const child of node.staticInsensitive.values()) sortTreeNodes(child);
	if (node.dynamic?.length) {
		node.dynamic.sort(sortDynamic);
		for (const child of node.dynamic) sortTreeNodes(child);
	}
	if (node.optional?.length) {
		node.optional.sort(sortDynamic);
		for (const child of node.optional) sortTreeNodes(child);
	}
	if (node.wildcard?.length) {
		node.wildcard.sort(sortDynamic);
		for (const child of node.wildcard) sortTreeNodes(child);
	}
}
function createStaticNode(fullPath) {
	return {
		kind: 0,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath,
		parent: null,
		parse: null,
		priority: 0
	};
}
/**
* Keys must be declared in the same order as in `SegmentNode` type,
* to ensure they are represented as the same object class in the engine.
*/
function createDynamicNode(kind, fullPath, caseSensitive, prefix, suffix) {
	return {
		kind,
		depth: 0,
		pathless: null,
		index: null,
		static: null,
		staticInsensitive: null,
		dynamic: null,
		optional: null,
		wildcard: null,
		route: null,
		fullPath,
		parent: null,
		parse: null,
		priority: 0,
		caseSensitive,
		prefix,
		suffix
	};
}
function processRouteMasks(routeList, processedTree) {
	const segmentTree = createStaticNode("/");
	const data = /* @__PURE__ */ new Uint16Array(6);
	for (const route of routeList) parseSegments(false, data, route, 1, segmentTree, 0);
	sortTreeNodes(segmentTree);
	processedTree.masksTree = segmentTree;
	processedTree.flatCache = createLRUCache(1e3);
}
/**
* Take an arbitrary list of routes, create a tree from them (if it hasn't been created already), and match a path against it.
*/
function findFlatMatch(path, processedTree) {
	path ||= "/";
	const cached = processedTree.flatCache.get(path);
	if (cached) return cached;
	const result = findMatch(path, processedTree.masksTree);
	processedTree.flatCache.set(path, result);
	return result;
}
/**
* @deprecated keep until v2 so that `router.matchRoute` can keep not caring about the actual route tree
*/
function findSingleMatch(from, caseSensitive, fuzzy, path, processedTree) {
	from ||= "/";
	path ||= "/";
	const key = caseSensitive ? `case\0${from}` : from;
	let tree = processedTree.singleCache.get(key);
	if (!tree) {
		tree = createStaticNode("/");
		parseSegments(caseSensitive, /* @__PURE__ */ new Uint16Array(6), { from }, 1, tree, 0);
		processedTree.singleCache.set(key, tree);
	}
	return findMatch(path, tree, fuzzy);
}
function findRouteMatch(path, processedTree, fuzzy = false) {
	const key = fuzzy ? path : `nofuzz\0${path}`;
	const cached = processedTree.matchCache.get(key);
	if (cached !== void 0) return cached;
	path ||= "/";
	let result;
	try {
		result = findMatch(path, processedTree.segmentTree, fuzzy);
	} catch (err) {
		if (err instanceof URIError) result = null;
		else throw err;
	}
	if (result) result.branch = buildRouteBranch(result.route);
	processedTree.matchCache.set(key, result);
	return result;
}
/** Trim trailing slashes (except preserving root '/'). */
function trimPathRight$1(path) {
	return path === "/" ? path : path.replace(/\/{1,}$/, "");
}
/**
* Processes a route tree into a segment trie for efficient path matching.
* Also builds lookup maps for routes by ID and by trimmed full path.
*/
function processRouteTree(routeTree, caseSensitive = false, initRoute) {
	const segmentTree = createStaticNode(routeTree.fullPath);
	const data = /* @__PURE__ */ new Uint16Array(6);
	const routesById = {};
	const routesByPath = {};
	let index = 0;
	parseSegments(caseSensitive, data, routeTree, 1, segmentTree, 0, (route) => {
		initRoute?.(route, index);
		if (route.id in routesById) invariant();
		routesById[route.id] = route;
		if (index !== 0 && route.path) {
			const trimmedFullPath = trimPathRight$1(route.fullPath);
			if (!routesByPath[trimmedFullPath] || route.fullPath.endsWith("/")) routesByPath[trimmedFullPath] = route;
		}
		index++;
	});
	sortTreeNodes(segmentTree);
	return {
		processedTree: {
			segmentTree,
			singleCache: createLRUCache(1e3),
			matchCache: createLRUCache(1e3),
			flatCache: null,
			masksTree: null
		},
		routesById,
		routesByPath
	};
}
function findMatch(path, segmentTree, fuzzy = false) {
	const parts = path.split("/");
	const leaf = getNodeMatch(path, parts, segmentTree, fuzzy);
	if (!leaf) return null;
	const [rawParams] = extractParams(path, parts, leaf);
	return {
		route: leaf.node.route,
		rawParams
	};
}
/**
* This function is "resumable":
* - the `leaf` input can contain `extract` and `rawParams` properties from a previous `extractParams` call
* - the returned `state` can be passed back as `extract` in a future call to continue extracting params from where we left off
*
* Inputs are *not* mutated.
*/
function extractParams(path, parts, leaf) {
	const list = buildBranch(leaf.node);
	let nodeParts = null;
	const rawParams = Object.create(null);
	/** which segment of the path we're currently processing */
	let partIndex = leaf.extract?.part ?? 0;
	/** which node of the route tree branch we're currently processing */
	let nodeIndex = leaf.extract?.node ?? 0;
	/** index of the 1st character of the segment we're processing in the path string */
	let pathIndex = leaf.extract?.path ?? 0;
	/** which fullPath segment we're currently processing */
	let segmentCount = leaf.extract?.segment ?? 0;
	for (; nodeIndex < list.length; partIndex++, nodeIndex++, pathIndex++, segmentCount++) {
		const node = list[nodeIndex];
		if (node.kind === SEGMENT_TYPE_INDEX) break;
		if (node.kind === SEGMENT_TYPE_PATHLESS) {
			segmentCount--;
			partIndex--;
			pathIndex--;
			continue;
		}
		const part = parts[partIndex];
		const currentPathIndex = pathIndex;
		if (part) pathIndex += part.length;
		if (node.kind === 1) {
			nodeParts ??= leaf.node.fullPath.split("/");
			const nodePart = nodeParts[segmentCount];
			const preLength = node.prefix?.length ?? 0;
			if (nodePart.charCodeAt(preLength) === 123) {
				const sufLength = node.suffix?.length ?? 0;
				const name = nodePart.substring(preLength + 2, nodePart.length - sufLength - 1);
				const value = part.substring(preLength, part.length - sufLength);
				rawParams[name] = decodeURIComponent(value);
			} else {
				const name = nodePart.substring(1);
				rawParams[name] = decodeURIComponent(part);
			}
		} else if (node.kind === 3) {
			if (leaf.skipped & 1 << nodeIndex) {
				partIndex--;
				pathIndex = currentPathIndex - 1;
				continue;
			}
			nodeParts ??= leaf.node.fullPath.split("/");
			const nodePart = nodeParts[segmentCount];
			const preLength = node.prefix?.length ?? 0;
			const sufLength = node.suffix?.length ?? 0;
			const name = nodePart.substring(preLength + 3, nodePart.length - sufLength - 1);
			const value = node.suffix || node.prefix ? part.substring(preLength, part.length - sufLength) : part;
			if (value) rawParams[name] = decodeURIComponent(value);
		} else if (node.kind === 2) {
			const n = node;
			const value = path.substring(currentPathIndex + (n.prefix?.length ?? 0), path.length - (n.suffix?.length ?? 0));
			const splat = decodeURIComponent(value);
			rawParams["*"] = splat;
			rawParams._splat = splat;
			break;
		}
	}
	if (leaf.rawParams) Object.assign(rawParams, leaf.rawParams);
	return [rawParams, {
		part: partIndex,
		node: nodeIndex,
		path: pathIndex,
		segment: segmentCount
	}];
}
function buildRouteBranch(route) {
	const list = [route];
	while (route.parentRoute) {
		route = route.parentRoute;
		list.push(route);
	}
	list.reverse();
	return list;
}
function buildBranch(node) {
	const list = Array(node.depth + 1);
	do {
		list[node.depth] = node;
		node = node.parent;
	} while (node);
	return list;
}
function getNodeMatch(path, parts, segmentTree, fuzzy) {
	if (path === "/" && segmentTree.index) return {
		node: segmentTree.index,
		skipped: 0
	};
	const trailingSlash = !last(parts);
	const pathIsIndex = trailingSlash && path !== "/";
	const partsLength = parts.length - (trailingSlash ? 1 : 0);
	const stack = [{
		node: segmentTree,
		index: 1,
		skipped: 0,
		depth: 1,
		statics: 0,
		dynamics: 0,
		optionals: 0
	}];
	let bestFuzzy = null;
	let bestMatch = null;
	while (stack.length) {
		const frame = stack.pop();
		const { node, index, skipped, depth, statics, dynamics, optionals } = frame;
		let { extract, rawParams } = frame;
		if (node.kind === 2 && node.route && !isFrameMoreSpecific(bestMatch, frame)) continue;
		if (node.parse) {
			if (!validateParseParams(path, parts, frame)) continue;
			rawParams = frame.rawParams;
			extract = frame.extract;
		}
		if (fuzzy && node.route && node.kind !== SEGMENT_TYPE_INDEX && isFrameMoreSpecific(bestFuzzy, frame)) bestFuzzy = frame;
		const isBeyondPath = index === partsLength;
		if (isBeyondPath) {
			if (node.route && (!pathIsIndex || node.kind === SEGMENT_TYPE_INDEX || node.kind === 2) && isFrameMoreSpecific(bestMatch, frame)) bestMatch = frame;
			if (!node.optional && !node.wildcard && !node.index && !node.pathless) continue;
		}
		const part = isBeyondPath ? void 0 : parts[index];
		let lowerPart;
		if (isBeyondPath && node.index) {
			const indexFrame = {
				node: node.index,
				index,
				skipped,
				depth: depth + 1,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			};
			let indexValid = true;
			if (node.index.parse) {
				if (!validateParseParams(path, parts, indexFrame)) indexValid = false;
			}
			if (indexValid) {
				if (!dynamics && !optionals && !skipped && isPerfectStaticMatch(statics, partsLength)) return indexFrame;
				if (isFrameMoreSpecific(bestMatch, indexFrame)) bestMatch = indexFrame;
			}
		}
		if (node.wildcard) for (let i = node.wildcard.length - 1; i >= 0; i--) {
			const segment = node.wildcard[i];
			const { prefix, suffix } = segment;
			if (prefix) {
				if (isBeyondPath) continue;
				if (!(segment.caseSensitive ? part : lowerPart ??= part.toLowerCase()).startsWith(prefix)) continue;
			}
			if (suffix) {
				if (isBeyondPath) continue;
				const end = parts.slice(index).join("/").slice(-suffix.length);
				if ((segment.caseSensitive ? end : end.toLowerCase()) !== suffix) continue;
			}
			stack.push({
				node: segment,
				index: partsLength,
				skipped,
				depth: depth + 1,
				statics,
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (node.optional) {
			const nextSkipped = skipped | 1 << depth;
			const nextDepth = depth + 1;
			for (let i = node.optional.length - 1; i >= 0; i--) {
				const segment = node.optional[i];
				stack.push({
					node: segment,
					index,
					skipped: nextSkipped,
					depth: nextDepth,
					statics,
					dynamics,
					optionals,
					extract,
					rawParams
				});
			}
			if (!isBeyondPath) for (let i = node.optional.length - 1; i >= 0; i--) {
				const segment = node.optional[i];
				const { prefix, suffix } = segment;
				if (prefix || suffix) {
					const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
					if (prefix && !casePart.startsWith(prefix)) continue;
					if (suffix && !casePart.endsWith(suffix)) continue;
				}
				stack.push({
					node: segment,
					index: index + 1,
					skipped,
					depth: nextDepth,
					statics,
					dynamics,
					optionals: optionals + segmentScore(partsLength, index),
					extract,
					rawParams
				});
			}
		}
		if (!isBeyondPath && node.dynamic && part) for (let i = node.dynamic.length - 1; i >= 0; i--) {
			const segment = node.dynamic[i];
			const { prefix, suffix } = segment;
			if (prefix || suffix) {
				const casePart = segment.caseSensitive ? part : lowerPart ??= part.toLowerCase();
				if (prefix && !casePart.startsWith(prefix)) continue;
				if (suffix && !casePart.endsWith(suffix)) continue;
			}
			stack.push({
				node: segment,
				index: index + 1,
				skipped,
				depth: depth + 1,
				statics,
				dynamics: dynamics + segmentScore(partsLength, index),
				optionals,
				extract,
				rawParams
			});
		}
		if (!isBeyondPath && node.staticInsensitive) {
			const match = node.staticInsensitive.get(lowerPart ??= part.toLowerCase());
			if (match) stack.push({
				node: match,
				index: index + 1,
				skipped,
				depth: depth + 1,
				statics: statics + segmentScore(partsLength, index),
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (!isBeyondPath && node.static) {
			const match = node.static.get(part);
			if (match) stack.push({
				node: match,
				index: index + 1,
				skipped,
				depth: depth + 1,
				statics: statics + segmentScore(partsLength, index),
				dynamics,
				optionals,
				extract,
				rawParams
			});
		}
		if (node.pathless) {
			const nextDepth = depth + 1;
			for (let i = node.pathless.length - 1; i >= 0; i--) {
				const segment = node.pathless[i];
				stack.push({
					node: segment,
					index,
					skipped,
					depth: nextDepth,
					statics,
					dynamics,
					optionals,
					extract,
					rawParams
				});
			}
		}
	}
	if (bestMatch) return bestMatch;
	if (fuzzy && bestFuzzy) {
		let sliceIndex = bestFuzzy.index;
		for (let i = 0; i < bestFuzzy.index; i++) sliceIndex += parts[i].length;
		const splat = sliceIndex === path.length ? "/" : path.slice(sliceIndex);
		bestFuzzy.rawParams ??= Object.create(null);
		bestFuzzy.rawParams["**"] = decodeURIComponent(splat);
		return bestFuzzy;
	}
	return null;
}
function segmentScore(partsLength, index) {
	return 2 ** (partsLength - index - 1);
}
function isPerfectStaticMatch(statics, partsLength) {
	return statics === 2 ** (partsLength - 1) - 1;
}
function validateParseParams(path, parts, frame) {
	let rawParams;
	let state;
	try {
		[rawParams, state] = extractParams(path, parts, frame);
	} catch {
		return null;
	}
	frame.rawParams = rawParams;
	frame.extract = state;
	if (!frame.node.parse) return true;
	try {
		if (frame.node.parse(rawParams) === false) return null;
	} catch {}
	return true;
}
function isFrameMoreSpecific(prev, next) {
	if (!prev) return true;
	return next.statics > prev.statics || next.statics === prev.statics && (next.dynamics > prev.dynamics || next.dynamics === prev.dynamics && (next.optionals > prev.optionals || next.optionals === prev.optionals && ((next.node.kind === SEGMENT_TYPE_INDEX) > (prev.node.kind === SEGMENT_TYPE_INDEX) || next.node.kind === SEGMENT_TYPE_INDEX === (prev.node.kind === SEGMENT_TYPE_INDEX) && next.depth > prev.depth)));
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/path.js
/** Join path segments, cleaning duplicate slashes between parts. */
function joinPaths(paths) {
	return cleanPath(paths.filter((val) => {
		return val !== void 0;
	}).join("/"));
}
/** Remove repeated slashes from a path string. */
function cleanPath(path) {
	return path.replace(/\/{2,}/g, "/");
}
/** Trim leading slashes (except preserving root '/'). */
function trimPathLeft(path) {
	return path === "/" ? path : path.replace(/^\/{1,}/, "");
}
/** Trim trailing slashes (except preserving root '/'). */
function trimPathRight(path) {
	const len = path.length;
	return len > 1 && path[len - 1] === "/" ? path.replace(/\/{1,}$/, "") : path;
}
/** Trim both leading and trailing slashes. */
function trimPath(path) {
	return trimPathRight(trimPathLeft(path));
}
/** Remove a trailing slash from value when appropriate for comparisons. */
function removeTrailingSlash(value, basepath) {
	if (value?.endsWith("/") && value !== "/" && value !== `${basepath}/`) return value.slice(0, -1);
	return value;
}
/**
* Compare two pathnames for exact equality after normalizing trailing slashes
* relative to the provided `basepath`.
*/
function exactPathTest(pathName1, pathName2, basepath) {
	return removeTrailingSlash(pathName1, basepath) === removeTrailingSlash(pathName2, basepath);
}
/**
* Resolve a destination path against a base, honoring trailing-slash policy
* and supporting relative segments (`.`/`..`) and absolute `to` values.
*/
function resolvePath({ base, to, trailingSlash = "never", cache }) {
	const isAbsolute = to.startsWith("/");
	const isBase = !isAbsolute && to === ".";
	let key;
	if (cache) {
		key = isAbsolute ? to : isBase ? base : base + "\0" + to;
		const cached = cache.get(key);
		if (cached) return cached;
	}
	let baseSegments;
	if (isBase) baseSegments = base.split("/");
	else if (isAbsolute) baseSegments = to.split("/");
	else {
		baseSegments = base.split("/");
		while (baseSegments.length > 1 && last(baseSegments) === "") baseSegments.pop();
		const toSegments = to.split("/");
		for (let index = 0, length = toSegments.length; index < length; index++) {
			const value = toSegments[index];
			if (value === "") {
				if (!index) baseSegments = [value];
				else if (index === length - 1) baseSegments.push(value);
			} else if (value === "..") baseSegments.pop();
			else if (value === ".") {} else baseSegments.push(value);
		}
	}
	if (baseSegments.length > 1) {
		if (last(baseSegments) === "") {
			if (trailingSlash === "never") baseSegments.pop();
		} else if (trailingSlash === "always") baseSegments.push("");
	}
	const result = cleanPath(baseSegments.join("/")) || "/";
	if (key && cache) cache.set(key, result);
	return result;
}
/**
* Create a pre-compiled decode config from allowed characters.
* This should be called once at router initialization.
*/
function compileDecodeCharMap(pathParamsAllowedCharacters) {
	const charMap = new Map(pathParamsAllowedCharacters.map((char) => [encodeURIComponent(char), char]));
	const pattern = Array.from(charMap.keys()).map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
	const regex = new RegExp(pattern, "g");
	return (encoded) => encoded.replace(regex, (match) => charMap.get(match) ?? match);
}
function encodeParam(key, params, decoder) {
	const value = params[key];
	if (typeof value !== "string") return value;
	if (key === "_splat") {
		if (/^[a-zA-Z0-9\-._~!/]*$/.test(value)) return value;
		return value.split("/").map((segment) => encodePathParam(segment, decoder)).join("/");
	} else return encodePathParam(value, decoder);
}
/**
* Interpolate params and wildcards into a route path template.
*
* - Encodes params safely (configurable allowed characters)
* - Supports `{-$optional}` segments, `{prefix{$id}suffix}` and `{$}` wildcards
*/
function interpolatePath({ path, params, decoder, ...rest }) {
	let isMissingParams = false;
	const usedParams = Object.create(null);
	if (!path || path === "/") return {
		interpolatedPath: "/",
		usedParams,
		isMissingParams
	};
	if (!path.includes("$")) return {
		interpolatedPath: path,
		usedParams,
		isMissingParams
	};
	const length = path.length;
	let cursor = 0;
	let segment;
	let joined = "";
	while (cursor < length) {
		const start = cursor;
		segment = parseSegment(path, start, segment);
		const end = segment[5];
		cursor = end + 1;
		if (start === end) continue;
		const kind = segment[0];
		if (kind === 0) {
			joined += "/" + path.substring(start, end);
			continue;
		}
		if (kind === 2) {
			const splat = params._splat;
			usedParams._splat = splat;
			usedParams["*"] = splat;
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			if (!splat) {
				isMissingParams = true;
				if (prefix || suffix) joined += "/" + prefix + suffix;
				continue;
			}
			const value = encodeParam("_splat", params, decoder);
			joined += "/" + prefix + value + suffix;
			continue;
		}
		if (kind === 1) {
			const key = path.substring(segment[2], segment[3]);
			if (!isMissingParams && !(key in params)) isMissingParams = true;
			usedParams[key] = params[key];
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			const value = encodeParam(key, params, decoder) ?? "undefined";
			joined += "/" + prefix + value + suffix;
			continue;
		}
		if (kind === 3) {
			const key = path.substring(segment[2], segment[3]);
			const valueRaw = params[key];
			if (valueRaw == null) continue;
			usedParams[key] = valueRaw;
			const prefix = path.substring(start, segment[1]);
			const suffix = path.substring(segment[4], end);
			const value = encodeParam(key, params, decoder) ?? "";
			joined += "/" + prefix + value + suffix;
			continue;
		}
	}
	if (path.endsWith("/")) joined += "/";
	return {
		usedParams,
		interpolatedPath: joined || "/",
		isMissingParams
	};
}
function encodePathParam(value, decoder) {
	const encoded = encodeURIComponent(value);
	return decoder?.(encoded) ?? encoded;
}
//#endregion
//#region node_modules/@tanstack/router-core/dist/esm/link.js
var preloadWarning = "Error preloading route! ☝️";
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/utils.js
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* React.use if available (React 19+), undefined otherwise.
* Use dynamic lookup to avoid Webpack compilation errors with React 18.
*/
var reactUse = import_react.use;
var useLayoutEffect = typeof window !== "undefined" ? import_react.useLayoutEffect : import_react.useEffect;
/**
* Taken from https://www.developerway.com/posts/implementing-advanced-use-previous-hook#part3
*/
function usePrevious(value) {
	const ref = import_react.useRef({
		value,
		prev: null
	});
	const current = ref.current.value;
	if (value !== current) ref.current = {
		value,
		prev: current
	};
	return ref.current.prev;
}
/**
* React hook to wrap `IntersectionObserver`.
*
* This hook will create an `IntersectionObserver` and observe the ref passed to it.
*
* When the intersection changes, the callback will be called with the `IntersectionObserverEntry`.
*
* @param ref - The ref to observe
* @param intersectionObserverOptions - The options to pass to the IntersectionObserver
* @param options - The options to pass to the hook
* @param callback - The callback to call when the intersection changes
* @returns The IntersectionObserver instance
* @example
* ```tsx
* const MyComponent = () => {
* const ref = React.useRef<HTMLDivElement>(null)
* useIntersectionObserver(
*  ref,
*  (entry) => { doSomething(entry) },
*  { rootMargin: '10px' },
*  { disabled: false }
* )
* return <div ref={ref} />
* ```
*/
function useIntersectionObserver(ref, callback, intersectionObserverOptions = {}, options = {}) {
	import_react.useEffect(() => {
		if (!ref.current || options.disabled || typeof IntersectionObserver !== "function") return;
		const observer = new IntersectionObserver(([entry]) => {
			callback(entry);
		}, intersectionObserverOptions);
		observer.observe(ref.current);
		return () => {
			observer.disconnect();
		};
	}, [
		callback,
		intersectionObserverOptions,
		options.disabled,
		ref
	]);
}
/**
* React hook to take a `React.ForwardedRef` and returns a `ref` that can be used on a DOM element.
*
* @param ref - The forwarded ref
* @returns The inner ref returned by `useRef`
* @example
* ```tsx
* const MyComponent = React.forwardRef((props, ref) => {
*  const innerRef = useForwardedRef(ref)
*  return <div ref={innerRef} />
* })
* ```
*/
function useForwardedRef(ref) {
	const innerRef = import_react.useRef(null);
	import_react.useImperativeHandle(ref, () => innerRef.current, []);
	return innerRef;
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
/**
* @license React
* react-jsx-runtime.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element");
	var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
	function jsxProd(type, config, maybeKey) {
		var key = null;
		void 0 !== maybeKey && (key = "" + maybeKey);
		void 0 !== config.key && (key = "" + config.key);
		if ("key" in config) {
			maybeKey = {};
			for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
		} else maybeKey = config;
		config = maybeKey.ref;
		return {
			$$typeof: REACT_ELEMENT_TYPE,
			type,
			key,
			ref: void 0 !== config ? config : null,
			props: maybeKey
		};
	}
	exports.Fragment = REACT_FRAGMENT_TYPE;
	exports.jsx = jsxProd;
	exports.jsxs = jsxProd;
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_production();
}));
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/ClientOnly.js
var import_jsx_runtime = require_jsx_runtime();
/**
* Render the children only after the JS has loaded client-side. Use an optional
* fallback component if the JS is not yet loaded.
*
* @example
* Render a Chart component if JS loads, renders a simple FakeChart
* component server-side or if there is no JS. The FakeChart can have only the
* UI without the behavior or be a loading spinner or skeleton.
*
* ```tsx
* return (
*   <ClientOnly fallback={<FakeChart />}>
*     <Chart />
*   </ClientOnly>
* )
* ```
*/
function ClientOnly({ children, fallback = null }) {
	return useHydrated() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Fragment, { children: fallback });
}
/**
* Return a boolean indicating if the JS has been hydrated already.
* When doing Server-Side Rendering, the result will always be false.
* When doing Client-Side Rendering, the result will always be false on the
* first render and true from then on. Even if a new component renders it will
* always start with true.
*
* @example
* ```tsx
* // Disable a button that needs JS to work.
* let hydrated = useHydrated()
* return (
*   <button type="button" disabled={!hydrated} onClick={doSomethingCustom}>
*     Click me
*   </button>
* )
* ```
* @returns True if the JS has been hydrated already, false otherwise.
*/
function useHydrated() {
	return import_react.useSyncExternalStore(subscribe, () => true, () => false);
}
function subscribe() {
	return () => {};
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/routerContext.js
var routerContext = import_react.createContext(null);
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useRouter.js
/**
* Access the current TanStack Router instance from React context.
* Must be used within a `RouterProvider`.
*
* Options:
* - `warn`: Log a warning if no router context is found (default: true).
*
* @returns The registered router instance.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useRouterHook
*/
function useRouter(opts) {
	return import_react.useContext(routerContext);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/matchContext.js
var matchContext = import_react.createContext(void 0);
var dummyMatchContext = import_react.createContext(void 0);
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.production.js
/**
* @license React
* use-sync-external-store-shim.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_use_sync_external_store_shim_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useState = React.useState;
	var useEffect = React.useEffect;
	var useLayoutEffect = React.useLayoutEffect;
	var useDebugValue = React.useDebugValue;
	function useSyncExternalStore$2(subscribe, getSnapshot) {
		var value = getSnapshot(), _useState = useState({ inst: {
			value,
			getSnapshot
		} }), inst = _useState[0].inst, forceUpdate = _useState[1];
		useLayoutEffect(function() {
			inst.value = value;
			inst.getSnapshot = getSnapshot;
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
		}, [
			subscribe,
			value,
			getSnapshot
		]);
		useEffect(function() {
			checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			return subscribe(function() {
				checkIfSnapshotChanged(inst) && forceUpdate({ inst });
			});
		}, [subscribe]);
		useDebugValue(value);
		return value;
	}
	function checkIfSnapshotChanged(inst) {
		var latestGetSnapshot = inst.getSnapshot;
		inst = inst.value;
		try {
			var nextValue = latestGetSnapshot();
			return !objectIs(inst, nextValue);
		} catch (error) {
			return !0;
		}
	}
	function useSyncExternalStore$1(subscribe, getSnapshot) {
		return getSnapshot();
	}
	var shim = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1 : useSyncExternalStore$2;
	exports.useSyncExternalStore = void 0 !== React.useSyncExternalStore ? React.useSyncExternalStore : shim;
}));
//#endregion
//#region node_modules/use-sync-external-store/shim/index.js
var require_shim = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_use_sync_external_store_shim_production();
}));
//#endregion
//#region node_modules/use-sync-external-store/cjs/use-sync-external-store-shim/with-selector.production.js
/**
* @license React
* use-sync-external-store-shim/with-selector.production.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_with_selector_production = /* @__PURE__ */ __commonJSMin(((exports) => {
	var React = require_react();
	var shim = require_shim();
	function is(x, y) {
		return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
	}
	var objectIs = "function" === typeof Object.is ? Object.is : is;
	var useSyncExternalStore = shim.useSyncExternalStore;
	var useRef = React.useRef;
	var useEffect = React.useEffect;
	var useMemo = React.useMemo;
	var useDebugValue = React.useDebugValue;
	exports.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
		var instRef = useRef(null);
		if (null === instRef.current) {
			var inst = {
				hasValue: !1,
				value: null
			};
			instRef.current = inst;
		} else inst = instRef.current;
		instRef = useMemo(function() {
			function memoizedSelector(nextSnapshot) {
				if (!hasMemo) {
					hasMemo = !0;
					memoizedSnapshot = nextSnapshot;
					nextSnapshot = selector(nextSnapshot);
					if (void 0 !== isEqual && inst.hasValue) {
						var currentSelection = inst.value;
						if (isEqual(currentSelection, nextSnapshot)) return memoizedSelection = currentSelection;
					}
					return memoizedSelection = nextSnapshot;
				}
				currentSelection = memoizedSelection;
				if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
				var nextSelection = selector(nextSnapshot);
				if (void 0 !== isEqual && isEqual(currentSelection, nextSelection)) return memoizedSnapshot = nextSnapshot, currentSelection;
				memoizedSnapshot = nextSnapshot;
				return memoizedSelection = nextSelection;
			}
			var hasMemo = !1, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
			return [function() {
				return memoizedSelector(getSnapshot());
			}, null === maybeGetServerSnapshot ? void 0 : function() {
				return memoizedSelector(maybeGetServerSnapshot());
			}];
		}, [
			getSnapshot,
			getServerSnapshot,
			selector,
			isEqual
		]);
		var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
		useEffect(function() {
			inst.hasValue = !0;
			inst.value = value;
		}, [value]);
		useDebugValue(value);
		return value;
	};
}));
//#endregion
//#region node_modules/@tanstack/react-store/dist/esm/useStore.js
var import_with_selector = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_with_selector_production();
})))();
function defaultCompare(a, b) {
	return a === b;
}
function useStore(atom, selector, compare = defaultCompare) {
	const subscribe = (0, import_react.useCallback)((handleStoreChange) => {
		if (!atom) return () => {};
		const { unsubscribe } = atom.subscribe(handleStoreChange);
		return unsubscribe;
	}, [atom]);
	const boundGetSnapshot = (0, import_react.useCallback)(() => atom?.get(), [atom]);
	return (0, import_with_selector.useSyncExternalStoreWithSelector)(subscribe, boundGetSnapshot, boundGetSnapshot, selector, compare);
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/useMatch.js
var dummyStore = {
	get() {},
	subscribe() {
		return { unsubscribe() {} };
	}
};
function useStructuralSharing(opts, router) {
	const previousResult = import_react.useRef();
	return (slice) => {
		const selected = opts?.select ? opts.select(slice) : slice;
		if (opts?.structuralSharing ?? router.options.defaultStructuralSharing) return previousResult.current = replaceEqualDeep(previousResult.current, selected);
		return selected;
	};
}
/**
* Read and select the nearest or targeted route match.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useMatchHook
*/
function useMatch(opts) {
	const router = useRouter();
	const nearestMatchId = import_react.useContext(opts.from ? dummyMatchContext : matchContext);
	const matchStore = opts.from ? router.stores.getRouteMatchStore(opts.from) : router.stores.matchStores.get(nearestMatchId);
	const selector = useStructuralSharing(opts, router);
	const matchSelection = useStore(matchStore ?? dummyStore, (match) => match ? selector(match) : dummyStore);
	if (matchSelection !== dummyStore) return matchSelection;
	if (opts.shouldThrow ?? true) invariant();
}
//#endregion
//#region node_modules/@tanstack/react-router/dist/esm/link.js
var import_react_dom = /* @__PURE__ */ __toESM(require_react_dom(), 1);
/**
* Build anchor-like props for declarative navigation and preloading.
*
* Returns stable `href`, event handlers and accessibility props derived from
* router options and active state. Used internally by `Link` and custom links.
*
* Options cover `to`, `params`, `search`, `hash`, `state`, `preload`,
* `activeProps`, `inactiveProps`, and more.
*
* @returns React anchor props suitable for `<a>` or custom components.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/useLinkPropsHook
*/
function useLinkProps(options, forwardedRef) {
	const router = useRouter();
	const innerRef = useForwardedRef(forwardedRef);
	const { activeProps, inactiveProps, activeOptions, to, preload: userPreload, preloadDelay: userPreloadDelay, preloadIntentProximity: _preloadIntentProximity, hashScrollIntoView, replace, startTransition, resetScroll, viewTransition, children, target, disabled, style, className, onClick, onBlur, onFocus, onMouseEnter, onMouseLeave, onTouchStart, ignoreBlocker, params: _params, search: _search, hash: _hash, state: _state, mask: _mask, reloadDocument: _reloadDocument, unsafeRelative: _unsafeRelative, from: _from, _fromLocation, ...propsSafeToSpread } = options;
	const isHydrated = useHydrated();
	const _options = import_react.useMemo(() => options, [
		router,
		options.from,
		options._fromLocation,
		options.hash,
		options.to,
		options.search,
		options.params,
		options.state,
		options.mask,
		options.unsafeRelative
	]);
	const currentLocation = useStore(router.stores.location, (l) => l, (prev, next) => prev.href === next.href);
	const next = import_react.useMemo(() => {
		const opts = {
			_fromLocation: currentLocation,
			..._options
		};
		return router.buildLocation(opts);
	}, [
		router,
		currentLocation,
		_options
	]);
	const hrefOptionPublicHref = next.maskedLocation ? next.maskedLocation.publicHref : next.publicHref;
	const hrefOptionExternal = next.maskedLocation ? next.maskedLocation.external : next.external;
	const hrefOption = import_react.useMemo(() => getHrefOption(hrefOptionPublicHref, hrefOptionExternal, router.history, disabled), [
		disabled,
		hrefOptionExternal,
		hrefOptionPublicHref,
		router.history
	]);
	const externalLink = import_react.useMemo(() => {
		if (hrefOption?.external) {
			if (isDangerousProtocol(hrefOption.href, router.protocolAllowlist)) return;
			return hrefOption.href;
		}
		if (isSafeInternal(to)) return void 0;
		if (typeof to !== "string" || to.indexOf(":") === -1) return void 0;
		try {
			new URL(to);
			if (isDangerousProtocol(to, router.protocolAllowlist)) return;
			return to;
		} catch {}
	}, [
		to,
		hrefOption,
		router.protocolAllowlist
	]);
	const isActive = import_react.useMemo(() => {
		if (externalLink) return false;
		if (activeOptions?.exact) {
			if (!exactPathTest(currentLocation.pathname, next.pathname, router.basepath)) return false;
		} else {
			const currentPathSplit = removeTrailingSlash(currentLocation.pathname, router.basepath);
			const nextPathSplit = removeTrailingSlash(next.pathname, router.basepath);
			if (!(currentPathSplit.startsWith(nextPathSplit) && (currentPathSplit.length === nextPathSplit.length || currentPathSplit[nextPathSplit.length] === "/"))) return false;
		}
		if (activeOptions?.includeSearch ?? true) {
			if (!deepEqual(currentLocation.search, next.search, {
				partial: !activeOptions?.exact,
				ignoreUndefined: !activeOptions?.explicitUndefined
			})) return false;
		}
		if (activeOptions?.includeHash) return isHydrated && currentLocation.hash === next.hash;
		return true;
	}, [
		activeOptions?.exact,
		activeOptions?.explicitUndefined,
		activeOptions?.includeHash,
		activeOptions?.includeSearch,
		currentLocation,
		externalLink,
		isHydrated,
		next.hash,
		next.pathname,
		next.search,
		router.basepath
	]);
	const resolvedActiveProps = isActive ? functionalUpdate(activeProps, {}) ?? STATIC_ACTIVE_OBJECT : STATIC_EMPTY_OBJECT;
	const resolvedInactiveProps = isActive ? STATIC_EMPTY_OBJECT : functionalUpdate(inactiveProps, {}) ?? STATIC_EMPTY_OBJECT;
	const resolvedClassName = [
		className,
		resolvedActiveProps.className,
		resolvedInactiveProps.className
	].filter(Boolean).join(" ");
	const resolvedStyle = (style || resolvedActiveProps.style || resolvedInactiveProps.style) && {
		...style,
		...resolvedActiveProps.style,
		...resolvedInactiveProps.style
	};
	const [isTransitioning, setIsTransitioning] = import_react.useState(false);
	const hasRenderFetched = import_react.useRef(false);
	const preload = options.reloadDocument || externalLink ? false : userPreload ?? router.options.defaultPreload;
	const preloadDelay = userPreloadDelay ?? router.options.defaultPreloadDelay ?? 0;
	const doPreload = import_react.useCallback(() => {
		router.preloadRoute({
			..._options,
			_builtLocation: next
		}).catch((err) => {
			console.warn(err);
			console.warn(preloadWarning);
		});
	}, [
		router,
		_options,
		next
	]);
	useIntersectionObserver(innerRef, import_react.useCallback((entry) => {
		if (entry?.isIntersecting) doPreload();
	}, [doPreload]), intersectionObserverOptions, { disabled: !!disabled || !(preload === "viewport") });
	import_react.useEffect(() => {
		if (hasRenderFetched.current) return;
		if (!disabled && preload === "render") {
			doPreload();
			hasRenderFetched.current = true;
		}
	}, [
		disabled,
		doPreload,
		preload
	]);
	const handleClick = (e) => {
		const elementTarget = e.currentTarget.getAttribute("target");
		const effectiveTarget = target !== void 0 ? target : elementTarget;
		if (!disabled && !isCtrlEvent(e) && !e.defaultPrevented && (!effectiveTarget || effectiveTarget === "_self") && e.button === 0) {
			e.preventDefault();
			(0, import_react_dom.flushSync)(() => {
				setIsTransitioning(true);
			});
			const unsub = router.subscribe("onResolved", () => {
				unsub();
				setIsTransitioning(false);
			});
			router.navigate({
				..._options,
				replace,
				resetScroll,
				hashScrollIntoView,
				startTransition,
				viewTransition,
				ignoreBlocker
			});
		}
	};
	if (externalLink) return {
		...propsSafeToSpread,
		ref: innerRef,
		href: externalLink,
		...children && { children },
		...target && { target },
		...disabled && { disabled },
		...style && { style },
		...className && { className },
		...onClick && { onClick },
		...onBlur && { onBlur },
		...onFocus && { onFocus },
		...onMouseEnter && { onMouseEnter },
		...onMouseLeave && { onMouseLeave },
		...onTouchStart && { onTouchStart }
	};
	const enqueueIntentPreload = (e) => {
		if (disabled || preload !== "intent") return;
		if (!preloadDelay) {
			doPreload();
			return;
		}
		const eventTarget = e.currentTarget;
		if (timeoutMap.has(eventTarget)) return;
		const id = setTimeout(() => {
			timeoutMap.delete(eventTarget);
			doPreload();
		}, preloadDelay);
		timeoutMap.set(eventTarget, id);
	};
	const handleTouchStart = (_) => {
		if (disabled || preload !== "intent") return;
		doPreload();
	};
	const handleLeave = (e) => {
		if (disabled || !preload || !preloadDelay) return;
		const eventTarget = e.currentTarget;
		const id = timeoutMap.get(eventTarget);
		if (id) {
			clearTimeout(id);
			timeoutMap.delete(eventTarget);
		}
	};
	return {
		...propsSafeToSpread,
		...resolvedActiveProps,
		...resolvedInactiveProps,
		href: hrefOption?.href,
		ref: innerRef,
		onClick: composeHandlers([onClick, handleClick]),
		onBlur: composeHandlers([onBlur, handleLeave]),
		onFocus: composeHandlers([onFocus, enqueueIntentPreload]),
		onMouseEnter: composeHandlers([onMouseEnter, enqueueIntentPreload]),
		onMouseLeave: composeHandlers([onMouseLeave, handleLeave]),
		onTouchStart: composeHandlers([onTouchStart, handleTouchStart]),
		disabled: !!disabled,
		target,
		...resolvedStyle && { style: resolvedStyle },
		...resolvedClassName && { className: resolvedClassName },
		...disabled && STATIC_DISABLED_PROPS,
		...isActive && STATIC_ACTIVE_PROPS,
		...isHydrated && isTransitioning && STATIC_TRANSITIONING_PROPS
	};
}
var STATIC_EMPTY_OBJECT = {};
var STATIC_ACTIVE_OBJECT = { className: "active" };
var STATIC_DISABLED_PROPS = {
	role: "link",
	"aria-disabled": true
};
var STATIC_ACTIVE_PROPS = {
	"data-status": "active",
	"aria-current": "page"
};
var STATIC_TRANSITIONING_PROPS = { "data-transitioning": "transitioning" };
var timeoutMap = /* @__PURE__ */ new WeakMap();
var intersectionObserverOptions = { rootMargin: "100px" };
var composeHandlers = (handlers) => (e) => {
	for (const handler of handlers) {
		if (!handler) continue;
		if (e.defaultPrevented) return;
		handler(e);
	}
};
function getHrefOption(publicHref, external, history, disabled) {
	if (disabled) return void 0;
	if (external) return {
		href: publicHref,
		external: true
	};
	return {
		href: history.createHref(publicHref) || "/",
		external: false
	};
}
function isSafeInternal(to) {
	if (typeof to !== "string") return false;
	const zero = to.charCodeAt(0);
	if (zero === 47) return to.charCodeAt(1) !== 47;
	return zero === 46;
}
/**
* A strongly-typed anchor component for declarative navigation.
* Handles path, search, hash and state updates with optional route preloading
* and active-state styling.
*
* Props:
* - `preload`: Controls route preloading (eg. 'intent', 'render', 'viewport', true/false)
* - `preloadDelay`: Delay in ms before preloading on hover
* - `activeProps`/`inactiveProps`: Additional props merged when link is active/inactive
* - `resetScroll`/`hashScrollIntoView`: Control scroll behavior on navigation
* - `viewTransition`/`startTransition`: Use View Transitions/React transitions for navigation
* - `ignoreBlocker`: Bypass registered blockers
*
* @returns An anchor-like element that navigates without full page reloads.
* @link https://tanstack.com/router/latest/docs/framework/react/api/router/linkComponent
*/
var Link = import_react.forwardRef((props, ref) => {
	const { _asChild, ...rest } = props;
	const { type: _type, ...linkProps } = useLinkProps(rest, ref);
	const children = typeof rest.children === "function" ? rest.children({ isActive: linkProps["data-status"] === "active" }) : rest.children;
	if (!_asChild) {
		const { disabled: _, ...rest } = linkProps;
		return import_react.createElement("a", rest, children);
	}
	return import_react.createElement(_asChild, linkProps, children);
});
function isCtrlEvent(e) {
	return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
//#endregion
//#region node_modules/convex/dist/esm/index.js
var version = "1.42.2";
//#endregion
//#region node_modules/convex/dist/esm/values/base64.js
var lookup = [];
var revLookup = [];
var Arr = Uint8Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
	lookup[i] = code[i];
	revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
function getLens(b64) {
	var len = b64.length;
	if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
	var validLen = b64.indexOf("=");
	if (validLen === -1) validLen = len;
	var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
	return [validLen, placeHoldersLen];
}
function _byteLength(_b64, validLen, placeHoldersLen) {
	return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
	var tmp;
	var lens = getLens(b64);
	var validLen = lens[0];
	var placeHoldersLen = lens[1];
	var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
	var curByte = 0;
	var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
	var i;
	for (i = 0; i < len; i += 4) {
		tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
		arr[curByte++] = tmp >> 16 & 255;
		arr[curByte++] = tmp >> 8 & 255;
		arr[curByte++] = tmp & 255;
	}
	if (placeHoldersLen === 2) {
		tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
		arr[curByte++] = tmp & 255;
	}
	if (placeHoldersLen === 1) {
		tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
		arr[curByte++] = tmp >> 8 & 255;
		arr[curByte++] = tmp & 255;
	}
	return arr;
}
function tripletToBase64(num) {
	return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
	var tmp;
	var output = [];
	for (var i = start; i < end; i += 3) {
		tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
		output.push(tripletToBase64(tmp));
	}
	return output.join("");
}
function fromByteArray(uint8) {
	var tmp;
	var len = uint8.length;
	var extraBytes = len % 3;
	var parts = [];
	var maxChunkLength = 16383;
	for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
	if (extraBytes === 1) {
		tmp = uint8[len - 1];
		parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
	} else if (extraBytes === 2) {
		tmp = (uint8[len - 2] << 8) + uint8[len - 1];
		parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
	}
	return parts.join("");
}
//#endregion
//#region node_modules/convex/dist/esm/common/index.js
function parseArgs(args) {
	if (args === void 0) return {};
	if (!isSimpleObject(args)) throw new Error(`The arguments to a Convex function must be an object. Received: ${args}`);
	return args;
}
function validateDeploymentUrl(deploymentUrl) {
	if (typeof deploymentUrl === "undefined") throw new Error(`Client created with undefined deployment address. If you used an environment variable, check that it's set.`);
	if (typeof deploymentUrl !== "string") throw new Error(`Invalid deployment address: found ${deploymentUrl}".`);
	if (!(deploymentUrl.startsWith("http:") || deploymentUrl.startsWith("https:"))) throw new Error(`Invalid deployment address: Must start with "https://" or "http://". Found "${deploymentUrl}".`);
	try {
		new URL(deploymentUrl);
	} catch {
		throw new Error(`Invalid deployment address: "${deploymentUrl}" is not a valid URL. If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`);
	}
	if (deploymentUrl.endsWith(".convex.site")) throw new Error(`Invalid deployment address: "${deploymentUrl}" ends with .convex.site, which is used for HTTP Actions. Convex deployment URLs typically end with .convex.cloud? If you believe this URL is correct, use the \`skipConvexDeploymentUrlCheck\` option to bypass this.`);
}
function isSimpleObject(value) {
	const isObject = typeof value === "object";
	const prototype = Object.getPrototypeOf(value);
	const isSimple = prototype === null || prototype === Object.prototype || prototype?.constructor?.name === "Object";
	return isObject && isSimple;
}
//#endregion
//#region node_modules/convex/dist/esm/values/value.js
var LITTLE_ENDIAN = true;
var MIN_INT64 = BigInt("-9223372036854775808");
var MAX_INT64 = BigInt("9223372036854775807");
var ZERO = BigInt("0");
var EIGHT = BigInt("8");
var TWOFIFTYSIX = BigInt("256");
function isSpecial(n) {
	return Number.isNaN(n) || !Number.isFinite(n) || Object.is(n, -0);
}
function slowBigIntToBase64(value) {
	if (value < ZERO) value -= MIN_INT64 + MIN_INT64;
	let hex = value.toString(16);
	if (hex.length % 2 === 1) hex = "0" + hex;
	const bytes = new Uint8Array(/* @__PURE__ */ new ArrayBuffer(8));
	let i = 0;
	for (const hexByte of hex.match(/.{2}/g).reverse()) {
		bytes.set([parseInt(hexByte, 16)], i++);
		value >>= EIGHT;
	}
	return fromByteArray(bytes);
}
function slowBase64ToBigInt(encoded) {
	const integerBytes = toByteArray(encoded);
	if (integerBytes.byteLength !== 8) throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
	let value = ZERO;
	let power = ZERO;
	for (const byte of integerBytes) {
		value += BigInt(byte) * TWOFIFTYSIX ** power;
		power++;
	}
	if (value > MAX_INT64) value += MIN_INT64 + MIN_INT64;
	return value;
}
function modernBigIntToBase64(value) {
	if (value < MIN_INT64 || MAX_INT64 < value) throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
	const buffer = /* @__PURE__ */ new ArrayBuffer(8);
	new DataView(buffer).setBigInt64(0, value, true);
	return fromByteArray(new Uint8Array(buffer));
}
function modernBase64ToBigInt(encoded) {
	const integerBytes = toByteArray(encoded);
	if (integerBytes.byteLength !== 8) throw new Error(`Received ${integerBytes.byteLength} bytes, expected 8 for $integer`);
	return new DataView(integerBytes.buffer).getBigInt64(0, true);
}
var bigIntToBase64 = DataView.prototype.setBigInt64 ? modernBigIntToBase64 : slowBigIntToBase64;
var base64ToBigInt = DataView.prototype.getBigInt64 ? modernBase64ToBigInt : slowBase64ToBigInt;
var MAX_IDENTIFIER_LEN = 1024;
function validateObjectField(k) {
	if (k.length > MAX_IDENTIFIER_LEN) throw new Error(`Field name ${k} exceeds maximum field name length ${MAX_IDENTIFIER_LEN}.`);
	if (k.startsWith("$")) throw new Error(`Field name ${k} starts with a '$', which is reserved.`);
	for (let i = 0; i < k.length; i += 1) {
		const charCode = k.charCodeAt(i);
		if (charCode < 32 || charCode >= 127) throw new Error(`Field name ${k} has invalid character '${k[i]}': Field names can only contain non-control ASCII characters`);
	}
}
function jsonToConvex(value) {
	if (value === null) return value;
	if (typeof value === "boolean") return value;
	if (typeof value === "number") return value;
	if (typeof value === "string") return value;
	if (Array.isArray(value)) return value.map((value2) => jsonToConvex(value2));
	if (typeof value !== "object") throw new Error(`Unexpected type of ${value}`);
	const entries = Object.entries(value);
	if (entries.length === 1) {
		const key = entries[0][0];
		if (key === "$bytes") {
			if (typeof value.$bytes !== "string") throw new Error(`Malformed $bytes field on ${value}`);
			return toByteArray(value.$bytes).buffer;
		}
		if (key === "$integer") {
			if (typeof value.$integer !== "string") throw new Error(`Malformed $integer field on ${value}`);
			return base64ToBigInt(value.$integer);
		}
		if (key === "$float") {
			if (typeof value.$float !== "string") throw new Error(`Malformed $float field on ${value}`);
			const floatBytes = toByteArray(value.$float);
			if (floatBytes.byteLength !== 8) throw new Error(`Received ${floatBytes.byteLength} bytes, expected 8 for $float`);
			const float = new DataView(floatBytes.buffer).getFloat64(0, LITTLE_ENDIAN);
			if (!isSpecial(float)) throw new Error(`Float ${float} should be encoded as a number`);
			return float;
		}
		if (key === "$set") throw new Error(`Received a Set which is no longer supported as a Convex type.`);
		if (key === "$map") throw new Error(`Received a Map which is no longer supported as a Convex type.`);
	}
	const out = {};
	for (const [k, v] of Object.entries(value)) {
		validateObjectField(k);
		out[k] = jsonToConvex(v);
	}
	return out;
}
var MAX_VALUE_FOR_ERROR_LEN = 16384;
function stringifyValueForError(value) {
	const str = JSON.stringify(value, (_key, value2) => {
		if (value2 === void 0) return "undefined";
		if (typeof value2 === "bigint") return `${value2.toString()}n`;
		return value2;
	});
	if (str.length > MAX_VALUE_FOR_ERROR_LEN) {
		const rest = "[...truncated]";
		let truncateAt = MAX_VALUE_FOR_ERROR_LEN - 14;
		const codePoint = str.codePointAt(truncateAt - 1);
		if (codePoint !== void 0 && codePoint > 65535) truncateAt -= 1;
		return str.substring(0, truncateAt) + rest;
	}
	return str;
}
function convexToJsonInternal(value, originalValue, context, includeTopLevelUndefined) {
	if (value === void 0) {
		const contextText = context && ` (present at path ${context} in original object ${stringifyValueForError(originalValue)})`;
		throw new Error(`undefined is not a valid Convex value${contextText}. To learn about Convex's supported types, see https://docs.convex.dev/using/types.`);
	}
	if (value === null) return value;
	if (typeof value === "bigint") {
		if (value < MIN_INT64 || MAX_INT64 < value) throw new Error(`BigInt ${value} does not fit into a 64-bit signed integer.`);
		return { $integer: bigIntToBase64(value) };
	}
	if (typeof value === "number") if (isSpecial(value)) {
		const buffer = /* @__PURE__ */ new ArrayBuffer(8);
		new DataView(buffer).setFloat64(0, value, LITTLE_ENDIAN);
		return { $float: fromByteArray(new Uint8Array(buffer)) };
	} else return value;
	if (typeof value === "boolean") return value;
	if (typeof value === "string") return value;
	if (value instanceof ArrayBuffer) return { $bytes: fromByteArray(new Uint8Array(value)) };
	if (Array.isArray(value)) return value.map((value2, i) => convexToJsonInternal(value2, originalValue, context + `[${i}]`, false));
	if (value instanceof Set) throw new Error(errorMessageForUnsupportedType(context, "Set", [...value], originalValue));
	if (value instanceof Map) throw new Error(errorMessageForUnsupportedType(context, "Map", [...value], originalValue));
	if (!isSimpleObject(value)) {
		const theType = value?.constructor?.name;
		const typeName = theType ? `${theType} ` : "";
		throw new Error(errorMessageForUnsupportedType(context, typeName, value, originalValue));
	}
	const out = {};
	const entries = Object.entries(value);
	entries.sort(([k1, _v1], [k2, _v2]) => k1 === k2 ? 0 : k1 < k2 ? -1 : 1);
	for (const [k, v] of entries) if (v !== void 0) {
		validateObjectField(k);
		out[k] = convexToJsonInternal(v, originalValue, context + `.${k}`, false);
	} else if (includeTopLevelUndefined) {
		validateObjectField(k);
		out[k] = convexOrUndefinedToJsonInternal(v, originalValue, context + `.${k}`);
	}
	return out;
}
function errorMessageForUnsupportedType(context, typeName, value, originalValue) {
	if (context) return `${typeName}${stringifyValueForError(value)} is not a supported Convex type (present at path ${context} in original object ${stringifyValueForError(originalValue)}). To learn about Convex's supported types, see https://docs.convex.dev/using/types.`;
	else return `${typeName}${stringifyValueForError(value)} is not a supported Convex type.`;
}
function convexOrUndefinedToJsonInternal(value, originalValue, context) {
	if (value === void 0) return { $undefined: null };
	else {
		if (originalValue === void 0) throw new Error(`Programming error. Current value is ${stringifyValueForError(value)} but original value is undefined`);
		return convexToJsonInternal(value, originalValue, context, false);
	}
}
function convexToJson(value) {
	return convexToJsonInternal(value, value, "", false);
}
//#endregion
//#region node_modules/convex/dist/esm/values/errors.js
var __defProp$13 = Object.defineProperty;
var __defNormalProp$13 = (obj, key, value) => key in obj ? __defProp$13(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$13 = (obj, key, value) => __defNormalProp$13(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a;
var _b;
var IDENTIFYING_FIELD = Symbol.for("ConvexError");
var ConvexError = class extends (_b = Error, _a = IDENTIFYING_FIELD, _b) {
	constructor(data) {
		super(typeof data === "string" ? data : stringifyValueForError(data));
		__publicField$13(this, "name", "ConvexError");
		__publicField$13(this, "data");
		__publicField$13(this, _a, true);
		this.data = data;
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/logging.js
var __defProp$12 = Object.defineProperty;
var __defNormalProp$12 = (obj, key, value) => key in obj ? __defProp$12(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$12 = (obj, key, value) => __defNormalProp$12(obj, typeof key !== "symbol" ? key + "" : key, value);
var INFO_COLOR = "color:rgb(0, 145, 255)";
function prefix_for_source(source) {
	switch (source) {
		case "query": return "Q";
		case "mutation": return "M";
		case "action": return "A";
		case "any": return "?";
	}
}
var DefaultLogger = class {
	constructor(options) {
		__publicField$12(this, "_onLogLineFuncs");
		__publicField$12(this, "_verbose");
		this._onLogLineFuncs = {};
		this._verbose = options.verbose;
	}
	addLogLineListener(func) {
		let id = Math.random().toString(36).substring(2, 15);
		for (let i = 0; i < 10; i++) {
			if (this._onLogLineFuncs[id] === void 0) break;
			id = Math.random().toString(36).substring(2, 15);
		}
		this._onLogLineFuncs[id] = func;
		return () => {
			delete this._onLogLineFuncs[id];
		};
	}
	logVerbose(...args) {
		if (this._verbose) for (const func of Object.values(this._onLogLineFuncs)) func("debug", `${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
	}
	log(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("info", ...args);
	}
	warn(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("warn", ...args);
	}
	error(...args) {
		for (const func of Object.values(this._onLogLineFuncs)) func("error", ...args);
	}
};
function instantiateDefaultLogger(options) {
	const logger = new DefaultLogger(options);
	logger.addLogLineListener((level, ...args) => {
		switch (level) {
			case "debug":
				console.debug(...args);
				break;
			case "info":
				console.log(...args);
				break;
			case "warn":
				console.warn(...args);
				break;
			case "error":
				console.error(...args);
				break;
			default: console.log(...args);
		}
	});
	return logger;
}
function instantiateNoopLogger(options) {
	return new DefaultLogger(options);
}
function logForFunction(logger, type, source, udfPath, message) {
	const prefix = prefix_for_source(source);
	if (typeof message === "object") message = `ConvexError ${JSON.stringify(message.errorData, null, 2)}`;
	if (type === "info") {
		const match = message.match(/^\[.*?\] /);
		if (match === null) {
			logger.error(`[CONVEX ${prefix}(${udfPath})] Could not parse console.log`);
			return;
		}
		const level = message.slice(1, match[0].length - 2);
		const args = message.slice(match[0].length);
		logger.log(`%c[CONVEX ${prefix}(${udfPath})] [${level}]`, INFO_COLOR, args);
	} else logger.error(`[CONVEX ${prefix}(${udfPath})] ${message}`);
}
function logFatalError(logger, message) {
	const errorMessage = `[CONVEX FATAL ERROR] ${message}`;
	logger.error(errorMessage);
	return new Error(errorMessage);
}
function createHybridErrorStacktrace(source, udfPath, result) {
	return `[CONVEX ${prefix_for_source(source)}(${udfPath})] ${result.errorMessage}
  Called by client`;
}
function forwardData(result, error) {
	error.data = result.errorData;
	return error;
}
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/udf_path_utils.js
function canonicalizeUdfPath(udfPath) {
	const pieces = udfPath.split(":");
	let moduleName;
	let functionName;
	if (pieces.length === 1) {
		moduleName = pieces[0];
		functionName = "default";
	} else {
		moduleName = pieces.slice(0, pieces.length - 1).join(":");
		functionName = pieces[pieces.length - 1];
	}
	if (moduleName.endsWith(".js")) moduleName = moduleName.slice(0, -3);
	return `${moduleName}:${functionName}`;
}
function serializePathAndArgs(udfPath, args) {
	return JSON.stringify({
		udfPath: canonicalizeUdfPath(udfPath),
		args: convexToJson(args)
	});
}
function serializePaginatedPathAndArgs(udfPath, args, options) {
	const { initialNumItems, id } = options;
	return JSON.stringify({
		type: "paginated",
		udfPath: canonicalizeUdfPath(udfPath),
		args: convexToJson(args),
		options: convexToJson({
			initialNumItems,
			id
		})
	});
}
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/local_state.js
var __defProp$11 = Object.defineProperty;
var __defNormalProp$11 = (obj, key, value) => key in obj ? __defProp$11(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$11 = (obj, key, value) => __defNormalProp$11(obj, typeof key !== "symbol" ? key + "" : key, value);
var LocalSyncState = class {
	constructor() {
		__publicField$11(this, "nextQueryId");
		__publicField$11(this, "querySetVersion");
		__publicField$11(this, "querySet");
		__publicField$11(this, "queryIdToToken");
		__publicField$11(this, "identityVersion");
		__publicField$11(this, "auth");
		__publicField$11(this, "outstandingQueriesOlderThanRestart");
		__publicField$11(this, "outstandingAuthOlderThanRestart");
		__publicField$11(this, "paused");
		__publicField$11(this, "pendingQuerySetModifications");
		this.nextQueryId = 0;
		this.querySetVersion = 0;
		this.identityVersion = 0;
		this.querySet = /* @__PURE__ */ new Map();
		this.queryIdToToken = /* @__PURE__ */ new Map();
		this.outstandingQueriesOlderThanRestart = /* @__PURE__ */ new Set();
		this.outstandingAuthOlderThanRestart = false;
		this.paused = false;
		this.pendingQuerySetModifications = /* @__PURE__ */ new Map();
	}
	hasSyncedPastLastReconnect() {
		return this.outstandingQueriesOlderThanRestart.size === 0 && !this.outstandingAuthOlderThanRestart;
	}
	markAuthCompletion() {
		this.outstandingAuthOlderThanRestart = false;
	}
	subscribe(udfPath, args, journal, componentPath) {
		const canonicalizedUdfPath = canonicalizeUdfPath(udfPath);
		const queryToken = serializePathAndArgs(canonicalizedUdfPath, args);
		const existingEntry = this.querySet.get(queryToken);
		if (existingEntry !== void 0) {
			existingEntry.numSubscribers += 1;
			return {
				queryToken,
				modification: null,
				unsubscribe: () => this.removeSubscriber(queryToken)
			};
		} else {
			const queryId = this.nextQueryId++;
			const query = {
				id: queryId,
				canonicalizedUdfPath,
				args,
				numSubscribers: 1,
				journal,
				componentPath
			};
			this.querySet.set(queryToken, query);
			this.queryIdToToken.set(queryId, queryToken);
			const baseVersion = this.querySetVersion;
			const newVersion = this.querySetVersion + 1;
			const add = {
				type: "Add",
				queryId,
				udfPath: canonicalizedUdfPath,
				args: [convexToJson(args)],
				journal,
				componentPath
			};
			if (this.paused) this.pendingQuerySetModifications.set(queryId, add);
			else this.querySetVersion = newVersion;
			return {
				queryToken,
				modification: {
					type: "ModifyQuerySet",
					baseVersion,
					newVersion,
					modifications: [add]
				},
				unsubscribe: () => this.removeSubscriber(queryToken)
			};
		}
	}
	transition(transition) {
		for (const modification of transition.modifications) switch (modification.type) {
			case "QueryUpdated":
			case "QueryFailed": {
				this.outstandingQueriesOlderThanRestart.delete(modification.queryId);
				const journal = modification.journal;
				if (journal !== void 0) {
					const queryToken = this.queryIdToToken.get(modification.queryId);
					if (queryToken !== void 0) this.querySet.get(queryToken).journal = journal;
				}
				break;
			}
			case "QueryRemoved":
				this.outstandingQueriesOlderThanRestart.delete(modification.queryId);
				break;
			default: throw new Error(`Invalid modification ${modification.type}`);
		}
	}
	queryId(udfPath, args) {
		const queryToken = serializePathAndArgs(canonicalizeUdfPath(udfPath), args);
		const existingEntry = this.querySet.get(queryToken);
		if (existingEntry !== void 0) return existingEntry.id;
		return null;
	}
	isCurrentOrNewerAuthVersion(version) {
		return version >= this.identityVersion;
	}
	getAuth() {
		return this.auth;
	}
	setAuth(value) {
		this.auth = {
			tokenType: "User",
			value
		};
		const baseVersion = this.identityVersion;
		if (!this.paused) this.identityVersion = baseVersion + 1;
		return {
			type: "Authenticate",
			baseVersion,
			...this.auth
		};
	}
	setAdminAuth(value, actingAs) {
		const auth = {
			tokenType: "Admin",
			value,
			impersonating: actingAs
		};
		this.auth = auth;
		const baseVersion = this.identityVersion;
		if (!this.paused) this.identityVersion = baseVersion + 1;
		return {
			type: "Authenticate",
			baseVersion,
			...auth
		};
	}
	clearAuth() {
		this.auth = void 0;
		this.markAuthCompletion();
		const baseVersion = this.identityVersion;
		if (!this.paused) this.identityVersion = baseVersion + 1;
		return {
			type: "Authenticate",
			tokenType: "None",
			baseVersion
		};
	}
	hasAuth() {
		return !!this.auth;
	}
	isNewAuth(value) {
		return this.auth?.value !== value;
	}
	queryPath(queryId) {
		const pathAndArgs = this.queryIdToToken.get(queryId);
		if (pathAndArgs) return this.querySet.get(pathAndArgs).canonicalizedUdfPath;
		return null;
	}
	queryArgs(queryId) {
		const pathAndArgs = this.queryIdToToken.get(queryId);
		if (pathAndArgs) return this.querySet.get(pathAndArgs).args;
		return null;
	}
	queryToken(queryId) {
		return this.queryIdToToken.get(queryId) ?? null;
	}
	queryJournal(queryToken) {
		return this.querySet.get(queryToken)?.journal;
	}
	restart() {
		this.unpause();
		this.outstandingQueriesOlderThanRestart.clear();
		const modifications = [];
		for (const localQuery of this.querySet.values()) {
			const add = {
				type: "Add",
				queryId: localQuery.id,
				udfPath: localQuery.canonicalizedUdfPath,
				args: [convexToJson(localQuery.args)],
				journal: localQuery.journal,
				componentPath: localQuery.componentPath
			};
			modifications.push(add);
			this.outstandingQueriesOlderThanRestart.add(localQuery.id);
		}
		this.querySetVersion = 1;
		const querySet = {
			type: "ModifyQuerySet",
			baseVersion: 0,
			newVersion: 1,
			modifications
		};
		if (!this.auth) {
			this.identityVersion = 0;
			return [querySet, void 0];
		}
		this.outstandingAuthOlderThanRestart = true;
		const authenticate = {
			type: "Authenticate",
			baseVersion: 0,
			...this.auth
		};
		this.identityVersion = 1;
		return [querySet, authenticate];
	}
	pause() {
		this.paused = true;
	}
	resume() {
		const querySet = this.pendingQuerySetModifications.size > 0 ? {
			type: "ModifyQuerySet",
			baseVersion: this.querySetVersion,
			newVersion: ++this.querySetVersion,
			modifications: Array.from(this.pendingQuerySetModifications.values())
		} : void 0;
		const authenticate = this.auth !== void 0 ? {
			type: "Authenticate",
			baseVersion: this.identityVersion++,
			...this.auth
		} : void 0;
		this.unpause();
		return [querySet, authenticate];
	}
	unpause() {
		this.paused = false;
		this.pendingQuerySetModifications.clear();
	}
	removeSubscriber(queryToken) {
		const localQuery = this.querySet.get(queryToken);
		if (localQuery.numSubscribers > 1) {
			localQuery.numSubscribers -= 1;
			return null;
		} else {
			this.querySet.delete(queryToken);
			this.queryIdToToken.delete(localQuery.id);
			this.outstandingQueriesOlderThanRestart.delete(localQuery.id);
			const baseVersion = this.querySetVersion;
			const newVersion = this.querySetVersion + 1;
			const remove = {
				type: "Remove",
				queryId: localQuery.id
			};
			if (this.paused) if (this.pendingQuerySetModifications.has(localQuery.id)) this.pendingQuerySetModifications.delete(localQuery.id);
			else this.pendingQuerySetModifications.set(localQuery.id, remove);
			else this.querySetVersion = newVersion;
			return {
				type: "ModifyQuerySet",
				baseVersion,
				newVersion,
				modifications: [remove]
			};
		}
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/request_manager.js
var __defProp$10 = Object.defineProperty;
var __defNormalProp$10 = (obj, key, value) => key in obj ? __defProp$10(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$10 = (obj, key, value) => __defNormalProp$10(obj, typeof key !== "symbol" ? key + "" : key, value);
var RequestManager = class {
	constructor(logger, markConnectionStateDirty) {
		this.logger = logger;
		this.markConnectionStateDirty = markConnectionStateDirty;
		__publicField$10(this, "inflightRequests");
		__publicField$10(this, "requestsOlderThanRestart");
		__publicField$10(this, "inflightMutationsCount", 0);
		__publicField$10(this, "inflightActionsCount", 0);
		this.inflightRequests = /* @__PURE__ */ new Map();
		this.requestsOlderThanRestart = /* @__PURE__ */ new Set();
	}
	request(message, sent) {
		const result = new Promise((resolve) => {
			const status = sent ? "Requested" : "NotSent";
			this.inflightRequests.set(message.requestId, {
				message,
				status: {
					status,
					requestedAt: /* @__PURE__ */ new Date(),
					onResult: resolve
				}
			});
			if (message.type === "Mutation") this.inflightMutationsCount++;
			else if (message.type === "Action") this.inflightActionsCount++;
		});
		this.markConnectionStateDirty();
		return result;
	}
	/**
	* Update the state after receiving a response.
	*
	* @returns A RequestId if the request is complete and its optimistic update
	* can be dropped, null otherwise.
	*/
	onResponse(response) {
		const requestInfo = this.inflightRequests.get(response.requestId);
		if (requestInfo === void 0) return null;
		if (requestInfo.status.status === "Completed") return null;
		const udfType = requestInfo.message.type === "Mutation" ? "mutation" : "action";
		const udfPath = requestInfo.message.udfPath;
		for (const line of response.logLines) logForFunction(this.logger, "info", udfType, udfPath, line);
		const status = requestInfo.status;
		let result;
		let onResolve;
		if (response.success) {
			result = {
				success: true,
				logLines: response.logLines,
				value: jsonToConvex(response.result)
			};
			onResolve = () => status.onResult(result);
		} else {
			const errorMessage = response.result;
			const { errorData } = response;
			logForFunction(this.logger, "error", udfType, udfPath, errorMessage);
			result = {
				success: false,
				errorMessage,
				errorData: errorData !== void 0 ? jsonToConvex(errorData) : void 0,
				logLines: response.logLines
			};
			onResolve = () => status.onResult(result);
		}
		if (response.type === "ActionResponse" || !response.success) {
			onResolve();
			this.inflightRequests.delete(response.requestId);
			this.requestsOlderThanRestart.delete(response.requestId);
			if (requestInfo.message.type === "Action") this.inflightActionsCount--;
			else if (requestInfo.message.type === "Mutation") this.inflightMutationsCount--;
			this.markConnectionStateDirty();
			return {
				requestId: response.requestId,
				result
			};
		}
		requestInfo.status = {
			status: "Completed",
			result,
			ts: response.ts,
			onResolve
		};
		return null;
	}
	removeCompleted(ts) {
		const completeRequests = /* @__PURE__ */ new Map();
		for (const [requestId, requestInfo] of this.inflightRequests.entries()) {
			const status = requestInfo.status;
			if (status.status === "Completed" && status.ts.lessThanOrEqual(ts)) {
				status.onResolve();
				completeRequests.set(requestId, status.result);
				if (requestInfo.message.type === "Mutation") this.inflightMutationsCount--;
				else if (requestInfo.message.type === "Action") this.inflightActionsCount--;
				this.inflightRequests.delete(requestId);
				this.requestsOlderThanRestart.delete(requestId);
			}
		}
		if (completeRequests.size > 0) this.markConnectionStateDirty();
		return completeRequests;
	}
	restart() {
		this.requestsOlderThanRestart = new Set(this.inflightRequests.keys());
		const allMessages = [];
		for (const [requestId, value] of this.inflightRequests) {
			if (value.status.status === "NotSent") {
				value.status.status = "Requested";
				allMessages.push(value.message);
				continue;
			}
			if (value.message.type === "Mutation") allMessages.push(value.message);
			else if (value.message.type === "Action") {
				this.inflightRequests.delete(requestId);
				this.requestsOlderThanRestart.delete(requestId);
				this.inflightActionsCount--;
				if (value.status.status === "Completed") throw new Error("Action should never be in 'Completed' state");
				value.status.onResult({
					success: false,
					errorMessage: "Connection lost while action was in flight",
					logLines: []
				});
			}
		}
		this.markConnectionStateDirty();
		return allMessages;
	}
	resume() {
		const allMessages = [];
		for (const [, value] of this.inflightRequests) if (value.status.status === "NotSent") {
			value.status.status = "Requested";
			allMessages.push(value.message);
			continue;
		}
		return allMessages;
	}
	/**
	* @returns true if there are any requests that have been requested but have
	* not be completed yet.
	*/
	hasIncompleteRequests() {
		for (const requestInfo of this.inflightRequests.values()) if (requestInfo.status.status === "Requested") return true;
		return false;
	}
	/**
	* @returns true if there are any inflight requests, including ones that have
	* completed on the server, but have not been applied.
	*/
	hasInflightRequests() {
		return this.inflightRequests.size > 0;
	}
	/**
	* @returns true if there are any inflight requests, that have been hanging around
	* since prior to the most recent restart.
	*/
	hasSyncedPastLastReconnect() {
		return this.requestsOlderThanRestart.size === 0;
	}
	timeOfOldestInflightRequest() {
		if (this.inflightRequests.size === 0) return null;
		let oldestInflightRequest = Date.now();
		for (const request of this.inflightRequests.values()) if (request.status.status !== "Completed") {
			if (request.status.requestedAt.getTime() < oldestInflightRequest) oldestInflightRequest = request.status.requestedAt.getTime();
		}
		return new Date(oldestInflightRequest);
	}
	/**
	* @returns The number of mutations currently in flight.
	*/
	inflightMutations() {
		return this.inflightMutationsCount;
	}
	/**
	* @returns The number of actions currently in flight.
	*/
	inflightActions() {
		return this.inflightActionsCount;
	}
};
//#endregion
//#region node_modules/convex/dist/esm/server/functionName.js
var functionName = Symbol.for("functionName");
//#endregion
//#region node_modules/convex/dist/esm/server/components/paths.js
var toReferencePath = Symbol.for("toReferencePath");
function extractReferencePath(reference) {
	return reference[toReferencePath] ?? null;
}
function isFunctionHandle(s) {
	return s.startsWith("function://");
}
function getFunctionAddress(functionReference) {
	let functionAddress;
	if (typeof functionReference === "string") if (isFunctionHandle(functionReference)) functionAddress = { functionHandle: functionReference };
	else functionAddress = { name: functionReference };
	else if (functionReference[functionName]) functionAddress = { name: functionReference[functionName] };
	else {
		const referencePath = extractReferencePath(functionReference);
		if (!referencePath) throw new Error(`${functionReference} is not a functionReference`);
		functionAddress = { reference: referencePath };
	}
	return functionAddress;
}
//#endregion
//#region node_modules/convex/dist/esm/server/api.js
function getFunctionName(functionReference) {
	const address = getFunctionAddress(functionReference);
	if (address.name === void 0) {
		if (address.functionHandle !== void 0) throw new Error(`Expected function reference like "api.file.func" or "internal.file.func", but received function handle ${address.functionHandle}`);
		else if (address.reference !== void 0) throw new Error(`Expected function reference in the current component like "api.file.func" or "internal.file.func", but received reference ${address.reference}`);
		throw new Error(`Expected function reference like "api.file.func" or "internal.file.func", but received ${JSON.stringify(address)}`);
	}
	if (typeof functionReference === "string") return functionReference;
	const name = functionReference[functionName];
	if (!name) throw new Error(`${functionReference} is not a functionReference`);
	return name;
}
function makeFunctionReference(name) {
	return { [functionName]: name };
}
function createApi(pathParts = []) {
	return new Proxy({}, { get(_, prop) {
		if (typeof prop === "string") return createApi([...pathParts, prop]);
		else if (prop === functionName) {
			if (pathParts.length < 2) {
				const found = ["api", ...pathParts].join(".");
				throw new Error(`API path is expected to be of the form \`api.moduleName.functionName\`. Found: \`${found}\``);
			}
			const path = pathParts.slice(0, -1).join("/");
			const exportName = pathParts[pathParts.length - 1];
			if (exportName === "default") return path;
			else return path + ":" + exportName;
		} else if (prop === Symbol.toStringTag) return "FunctionReference";
		else return;
	} });
}
var anyApi = createApi();
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/optimistic_updates_impl.js
var __defProp$9 = Object.defineProperty;
var __defNormalProp$9 = (obj, key, value) => key in obj ? __defProp$9(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$9 = (obj, key, value) => __defNormalProp$9(obj, typeof key !== "symbol" ? key + "" : key, value);
var OptimisticLocalStoreImpl = class OptimisticLocalStoreImpl {
	constructor(queryResults) {
		__publicField$9(this, "queryResults");
		__publicField$9(this, "modifiedQueries");
		this.queryResults = queryResults;
		this.modifiedQueries = [];
	}
	getQuery(query, ...args) {
		const queryArgs = parseArgs(args[0]);
		const name = getFunctionName(query);
		const queryResult = this.queryResults.get(serializePathAndArgs(name, queryArgs));
		if (queryResult === void 0) return;
		return OptimisticLocalStoreImpl.queryValue(queryResult.result);
	}
	getAllQueries(query) {
		const queriesWithName = [];
		const name = getFunctionName(query);
		for (const queryResult of this.queryResults.values()) if (queryResult.udfPath === canonicalizeUdfPath(name)) queriesWithName.push({
			args: queryResult.args,
			value: OptimisticLocalStoreImpl.queryValue(queryResult.result)
		});
		return queriesWithName;
	}
	setQuery(queryReference, args, value) {
		const queryArgs = parseArgs(args);
		const name = getFunctionName(queryReference);
		const queryToken = serializePathAndArgs(name, queryArgs);
		let result;
		if (value === void 0) result = void 0;
		else result = {
			success: true,
			value,
			logLines: []
		};
		const query = {
			udfPath: name,
			args: queryArgs,
			result
		};
		this.queryResults.set(queryToken, query);
		this.modifiedQueries.push(queryToken);
	}
	static queryValue(result) {
		if (result === void 0) return;
		else if (result.success) return result.value;
		else return;
	}
};
var OptimisticQueryResults = class {
	constructor() {
		__publicField$9(this, "queryResults");
		__publicField$9(this, "optimisticUpdates");
		this.queryResults = /* @__PURE__ */ new Map();
		this.optimisticUpdates = [];
	}
	/**
	* Apply all optimistic updates on top of server query results
	*/
	ingestQueryResultsFromServer(serverQueryResults, optimisticUpdatesToDrop) {
		this.optimisticUpdates = this.optimisticUpdates.filter((updateAndId) => {
			return !optimisticUpdatesToDrop.has(updateAndId.mutationId);
		});
		const oldQueryResults = this.queryResults;
		this.queryResults = new Map(serverQueryResults);
		const localStore = new OptimisticLocalStoreImpl(this.queryResults);
		for (const updateAndId of this.optimisticUpdates) updateAndId.update(localStore);
		const changedQueries = [];
		for (const [queryToken, query] of this.queryResults) {
			const oldQuery = oldQueryResults.get(queryToken);
			if (oldQuery === void 0 || oldQuery.result !== query.result) changedQueries.push(queryToken);
		}
		return changedQueries;
	}
	applyOptimisticUpdate(update, mutationId) {
		this.optimisticUpdates.push({
			update,
			mutationId
		});
		const localStore = new OptimisticLocalStoreImpl(this.queryResults);
		update(localStore);
		return localStore.modifiedQueries;
	}
	/**
	* "Raw" with respect to errors vs values, but query results still have
	* optimistic updates applied.
	*
	* @internal
	*/
	rawQueryResult(queryToken) {
		const query = this.queryResults.get(queryToken);
		if (query === void 0) return;
		return query.result;
	}
	queryResult(queryToken) {
		const query = this.queryResults.get(queryToken);
		if (query === void 0) return;
		const result = query.result;
		if (result === void 0) return;
		else if (result.success) return result.value;
		else {
			if (result.errorData !== void 0) throw forwardData(result, new ConvexError(createHybridErrorStacktrace("query", query.udfPath, result)));
			throw new Error(createHybridErrorStacktrace("query", query.udfPath, result));
		}
	}
	hasQueryResult(queryToken) {
		return this.queryResults.get(queryToken) !== void 0;
	}
	/**
	* @internal
	*/
	queryLogs(queryToken) {
		return this.queryResults.get(queryToken)?.result?.logLines;
	}
};
//#endregion
//#region node_modules/convex/dist/esm/vendor/long.js
var __defProp$8 = Object.defineProperty;
var __defNormalProp$8 = (obj, key, value) => key in obj ? __defProp$8(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$8 = (obj, key, value) => __defNormalProp$8(obj, typeof key !== "symbol" ? key + "" : key, value);
var Long = class Long {
	constructor(low, high) {
		__publicField$8(this, "low");
		__publicField$8(this, "high");
		__publicField$8(this, "__isUnsignedLong__");
		this.low = low | 0;
		this.high = high | 0;
		this.__isUnsignedLong__ = true;
	}
	static isLong(obj) {
		return (obj && obj.__isUnsignedLong__) === true;
	}
	static fromBytesLE(bytes) {
		return new Long(bytes[0] | bytes[1] << 8 | bytes[2] << 16 | bytes[3] << 24, bytes[4] | bytes[5] << 8 | bytes[6] << 16 | bytes[7] << 24);
	}
	toBytesLE() {
		const hi = this.high;
		const lo = this.low;
		return [
			lo & 255,
			lo >>> 8 & 255,
			lo >>> 16 & 255,
			lo >>> 24,
			hi & 255,
			hi >>> 8 & 255,
			hi >>> 16 & 255,
			hi >>> 24
		];
	}
	static fromNumber(value) {
		if (isNaN(value)) return UZERO;
		if (value < 0) return UZERO;
		if (value >= TWO_PWR_64_DBL) return MAX_UNSIGNED_VALUE;
		return new Long(value % TWO_PWR_32_DBL | 0, value / TWO_PWR_32_DBL | 0);
	}
	toString() {
		return (BigInt(this.high) * BigInt(TWO_PWR_32_DBL) + BigInt(this.low)).toString();
	}
	equals(other) {
		if (!Long.isLong(other)) other = Long.fromValue(other);
		if (this.high >>> 31 === 1 && other.high >>> 31 === 1) return false;
		return this.high === other.high && this.low === other.low;
	}
	notEquals(other) {
		return !this.equals(other);
	}
	comp(other) {
		if (!Long.isLong(other)) other = Long.fromValue(other);
		if (this.equals(other)) return 0;
		return other.high >>> 0 > this.high >>> 0 || other.high === this.high && other.low >>> 0 > this.low >>> 0 ? -1 : 1;
	}
	lessThanOrEqual(other) {
		return this.comp(other) <= 0;
	}
	static fromValue(val) {
		if (typeof val === "number") return Long.fromNumber(val);
		return new Long(val.low, val.high);
	}
};
var UZERO = new Long(0, 0);
var TWO_PWR_16_DBL = 65536;
var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;
var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;
var MAX_UNSIGNED_VALUE = new Long(-1, -1);
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/remote_query_set.js
var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$7 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
var RemoteQuerySet = class {
	constructor(queryPath, logger) {
		__publicField$7(this, "version");
		__publicField$7(this, "remoteQuerySet");
		__publicField$7(this, "queryPath");
		__publicField$7(this, "logger");
		this.version = {
			querySet: 0,
			ts: Long.fromNumber(0),
			identity: 0
		};
		this.remoteQuerySet = /* @__PURE__ */ new Map();
		this.queryPath = queryPath;
		this.logger = logger;
	}
	transition(transition) {
		const start = transition.startVersion;
		if (this.version.querySet !== start.querySet || this.version.ts.notEquals(start.ts) || this.version.identity !== start.identity) throw new Error(`Invalid start version: ${start.ts.toString()}:${start.querySet}:${start.identity}, transitioning from ${this.version.ts.toString()}:${this.version.querySet}:${this.version.identity}`);
		for (const modification of transition.modifications) switch (modification.type) {
			case "QueryUpdated": {
				const queryPath = this.queryPath(modification.queryId);
				if (queryPath) for (const line of modification.logLines) logForFunction(this.logger, "info", "query", queryPath, line);
				const value = jsonToConvex(modification.value ?? null);
				this.remoteQuerySet.set(modification.queryId, {
					success: true,
					value,
					logLines: modification.logLines
				});
				break;
			}
			case "QueryFailed": {
				const queryPath = this.queryPath(modification.queryId);
				if (queryPath) for (const line of modification.logLines) logForFunction(this.logger, "info", "query", queryPath, line);
				const { errorData } = modification;
				this.remoteQuerySet.set(modification.queryId, {
					success: false,
					errorMessage: modification.errorMessage,
					errorData: errorData !== void 0 ? jsonToConvex(errorData) : void 0,
					logLines: modification.logLines
				});
				break;
			}
			case "QueryRemoved":
				this.remoteQuerySet.delete(modification.queryId);
				break;
			default: throw new Error(`Invalid modification ${modification.type}`);
		}
		this.version = transition.endVersion;
	}
	remoteQueryResults() {
		return this.remoteQuerySet;
	}
	timestamp() {
		return this.version.ts;
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/protocol.js
function u64ToLong(encoded) {
	const integerBytes = toByteArray(encoded);
	return Long.fromBytesLE(Array.from(integerBytes));
}
function longToU64(raw) {
	return fromByteArray(new Uint8Array(raw.toBytesLE()));
}
function parseServerMessage(encoded) {
	switch (encoded.type) {
		case "FatalError":
		case "AuthError":
		case "ActionResponse":
		case "TransitionChunk":
		case "Ping": return { ...encoded };
		case "MutationResponse": if (encoded.success) return {
			...encoded,
			ts: u64ToLong(encoded.ts)
		};
		else return { ...encoded };
		case "Transition": return {
			...encoded,
			startVersion: {
				...encoded.startVersion,
				ts: u64ToLong(encoded.startVersion.ts)
			},
			endVersion: {
				...encoded.endVersion,
				ts: u64ToLong(encoded.endVersion.ts)
			}
		};
		default:
	}
}
function encodeClientMessage(message) {
	switch (message.type) {
		case "Authenticate":
		case "ModifyQuerySet":
		case "Mutation":
		case "Action":
		case "Event": return { ...message };
		case "Connect": if (message.maxObservedTimestamp !== void 0) return {
			...message,
			maxObservedTimestamp: longToU64(message.maxObservedTimestamp)
		};
		else return {
			...message,
			maxObservedTimestamp: void 0
		};
		default:
	}
}
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/web_socket_manager.js
var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$6 = (obj, key, value) => __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
var CLOSE_NORMAL = 1e3;
var CLOSE_GOING_AWAY = 1001;
var CLOSE_NO_STATUS = 1005;
var CLOSE_NOT_FOUND = 4040;
var firstTime;
function monotonicMillis() {
	if (firstTime === void 0) firstTime = Date.now();
	if (typeof performance === "undefined" || !performance.now) return Date.now();
	return Math.round(firstTime + performance.now());
}
function prettyNow() {
	return `t=${Math.round((monotonicMillis() - firstTime) / 100) / 10}s`;
}
var serverDisconnectErrors = {
	InternalServerError: { timeout: 1e3 },
	SubscriptionsWorkerFullError: { timeout: 3e3 },
	TooManyConcurrentRequests: { timeout: 3e3 },
	CommitterFullError: { timeout: 3e3 },
	AwsTooManyRequestsException: { timeout: 3e3 },
	ExecuteFullError: { timeout: 3e3 },
	SystemTimeoutError: { timeout: 3e3 },
	ExpiredInQueue: { timeout: 3e3 },
	VectorIndexesUnavailable: { timeout: 1e3 },
	SearchIndexesUnavailable: { timeout: 1e3 },
	TableSummariesUnavailable: { timeout: 1e3 },
	VectorIndexTooLarge: { timeout: 3e3 },
	SearchIndexTooLarge: { timeout: 3e3 },
	TooManyWritesInTimePeriod: { timeout: 3e3 }
};
function classifyDisconnectError(s) {
	if (s === void 0) return "Unknown";
	for (const prefix of Object.keys(serverDisconnectErrors)) if (s.startsWith(prefix)) return prefix;
	return "Unknown";
}
var WebSocketManager = class {
	constructor(uri, callbacks, webSocketConstructor, logger, markConnectionStateDirty, debug) {
		this.markConnectionStateDirty = markConnectionStateDirty;
		this.debug = debug;
		__publicField$6(this, "socket");
		__publicField$6(this, "connectionCount");
		__publicField$6(this, "_hasEverConnected", false);
		__publicField$6(this, "lastCloseReason");
		__publicField$6(this, "transitionChunkBuffer", null);
		/** Upon HTTPS/WSS failure, the first jittered backoff duration, in ms. */
		__publicField$6(this, "defaultInitialBackoff");
		/** We backoff exponentially, but we need to cap that--this is the jittered max. */
		__publicField$6(this, "maxBackoff");
		/** How many times have we failed consecutively? */
		__publicField$6(this, "retries");
		/** How long before lack of server response causes us to initiate a reconnect,
		* in ms */
		__publicField$6(this, "serverInactivityThreshold");
		__publicField$6(this, "reconnectDueToServerInactivityTimeout");
		/** Scheduled reconnect state: timeout handle and timing info */
		__publicField$6(this, "scheduledReconnect", null);
		__publicField$6(this, "networkOnlineHandler", null);
		/** Pending event to send after reconnecting due to network recovery */
		__publicField$6(this, "pendingNetworkRecoveryInfo", null);
		__publicField$6(this, "uri");
		__publicField$6(this, "onOpen");
		__publicField$6(this, "onResume");
		__publicField$6(this, "onMessage");
		__publicField$6(this, "webSocketConstructor");
		__publicField$6(this, "logger");
		__publicField$6(this, "onServerDisconnectError");
		this.webSocketConstructor = webSocketConstructor;
		this.socket = { state: "disconnected" };
		this.connectionCount = 0;
		this.lastCloseReason = "InitialConnect";
		this.defaultInitialBackoff = 1e3;
		this.maxBackoff = 16e3;
		this.retries = 0;
		this.serverInactivityThreshold = 6e4;
		this.reconnectDueToServerInactivityTimeout = null;
		this.uri = uri;
		this.onOpen = callbacks.onOpen;
		this.onResume = callbacks.onResume;
		this.onMessage = callbacks.onMessage;
		this.onServerDisconnectError = callbacks.onServerDisconnectError;
		this.logger = logger;
		this.setupNetworkListener();
		this.connect();
	}
	setSocketState(state) {
		this.socket = state;
		this._logVerbose(`socket state changed: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}`);
		this.markConnectionStateDirty();
	}
	setupNetworkListener() {
		if (typeof window === "undefined" || typeof window.addEventListener !== "function") return;
		if (this.networkOnlineHandler !== null) return;
		this.networkOnlineHandler = () => {
			this._logVerbose("network online event detected");
			this.tryReconnectImmediately();
		};
		window.addEventListener("online", this.networkOnlineHandler);
		this._logVerbose("network online event listener registered");
	}
	cleanupNetworkListener() {
		if (this.networkOnlineHandler && typeof window !== "undefined" && typeof window.removeEventListener === "function") {
			window.removeEventListener("online", this.networkOnlineHandler);
			this.networkOnlineHandler = null;
			this._logVerbose("network online event listener removed");
		}
	}
	assembleTransition(chunk) {
		if (chunk.partNumber < 0 || chunk.partNumber >= chunk.totalParts || chunk.totalParts === 0 || this.transitionChunkBuffer && (this.transitionChunkBuffer.totalParts !== chunk.totalParts || this.transitionChunkBuffer.transitionId !== chunk.transitionId)) {
			this.transitionChunkBuffer = null;
			throw new Error("Invalid TransitionChunk");
		}
		if (this.transitionChunkBuffer === null) this.transitionChunkBuffer = {
			chunks: [],
			totalParts: chunk.totalParts,
			transitionId: chunk.transitionId
		};
		if (chunk.partNumber !== this.transitionChunkBuffer.chunks.length) {
			const expectedLength = this.transitionChunkBuffer.chunks.length;
			this.transitionChunkBuffer = null;
			throw new Error(`TransitionChunk received out of order: expected part ${expectedLength}, got ${chunk.partNumber}`);
		}
		this.transitionChunkBuffer.chunks.push(chunk.chunk);
		if (this.transitionChunkBuffer.chunks.length === chunk.totalParts) {
			const fullJson = this.transitionChunkBuffer.chunks.join("");
			this.transitionChunkBuffer = null;
			const transition = parseServerMessage(JSON.parse(fullJson));
			if (transition.type !== "Transition") throw new Error(`Expected Transition, got ${transition.type} after assembling chunks`);
			return transition;
		}
		return null;
	}
	connect() {
		if (this.socket.state === "terminated") return;
		if (this.socket.state !== "disconnected" && this.socket.state !== "stopped") throw new Error("Didn't start connection from disconnected state: " + this.socket.state);
		const ws = new this.webSocketConstructor(this.uri);
		this._logVerbose("constructed WebSocket");
		this.setSocketState({
			state: "connecting",
			ws,
			paused: "no"
		});
		this.resetServerInactivityTimeout();
		ws.onopen = () => {
			this.logger.logVerbose("begin ws.onopen");
			if (this.socket.state !== "connecting") throw new Error("onopen called with socket not in connecting state");
			this.setSocketState({
				state: "ready",
				ws,
				paused: this.socket.paused === "yes" ? "uninitialized" : "no"
			});
			this.resetServerInactivityTimeout();
			if (this.socket.paused === "no") {
				this._hasEverConnected = true;
				this.onOpen({
					connectionCount: this.connectionCount,
					lastCloseReason: this.lastCloseReason,
					clientTs: monotonicMillis()
				});
			}
			if (this.lastCloseReason !== "InitialConnect") if (this.lastCloseReason) this.logger.log("WebSocket reconnected at", prettyNow(), "after disconnect due to", this.lastCloseReason);
			else this.logger.log("WebSocket reconnected at", prettyNow());
			this.connectionCount += 1;
			this.lastCloseReason = null;
			if (this.pendingNetworkRecoveryInfo !== null) {
				const { timeSavedMs } = this.pendingNetworkRecoveryInfo;
				this.pendingNetworkRecoveryInfo = null;
				this.sendMessage({
					type: "Event",
					eventType: "NetworkRecoveryReconnect",
					event: { timeSavedMs }
				});
				this.logger.log(`Network recovery reconnect saved ~${Math.round(timeSavedMs / 1e3)}s of waiting`);
			}
		};
		ws.onerror = (error) => {
			this.transitionChunkBuffer = null;
			const message = error.message;
			if (message) this.logger.log(`WebSocket error message: ${message}`);
		};
		ws.onmessage = (message) => {
			this.resetServerInactivityTimeout();
			const messageLength = message.data.length;
			let serverMessage = parseServerMessage(JSON.parse(message.data));
			this._logVerbose(`received ws message with type ${serverMessage.type}`);
			if (serverMessage.type === "Ping") return;
			if (serverMessage.type === "TransitionChunk") {
				const transition = this.assembleTransition(serverMessage);
				if (!transition) return;
				serverMessage = transition;
				this._logVerbose(`assembled full ws message of type ${serverMessage.type}`);
			}
			if (this.transitionChunkBuffer !== null) {
				this.transitionChunkBuffer = null;
				this.logger.log(`Received unexpected ${serverMessage.type} while buffering TransitionChunks`);
			}
			if (serverMessage.type === "Transition") this.reportLargeTransition({
				messageLength,
				transition: serverMessage
			});
			if (this.onMessage(serverMessage).hasSyncedPastLastReconnect) {
				this.retries = 0;
				this.markConnectionStateDirty();
			}
		};
		ws.onclose = (event) => {
			this._logVerbose("begin ws.onclose");
			this.transitionChunkBuffer = null;
			if (this.lastCloseReason === null) this.lastCloseReason = event.reason || `closed with code ${event.code}`;
			if (event.code !== CLOSE_NORMAL && event.code !== CLOSE_GOING_AWAY && event.code !== CLOSE_NO_STATUS && event.code !== CLOSE_NOT_FOUND) {
				let msg = `WebSocket closed with code ${event.code}`;
				if (event.reason) msg += `: ${event.reason}`;
				this.logger.log(msg);
				if (this.onServerDisconnectError && event.reason) this.onServerDisconnectError(msg);
			}
			const reason = classifyDisconnectError(event.reason);
			this.scheduleReconnect(reason);
		};
	}
	/**
	* @returns The state of the {@link Socket}.
	*/
	socketState() {
		return this.socket.state;
	}
	/**
	* @param message - A ClientMessage to send.
	* @returns Whether the message (might have been) sent.
	*/
	sendMessage(message) {
		const messageForLog = {
			type: message.type,
			...message.type === "Authenticate" && message.tokenType === "User" ? { value: `...${message.value.slice(-7)}` } : {}
		};
		if (this.socket.state === "ready" && this.socket.paused === "no") {
			const encodedMessage = encodeClientMessage(message);
			const request = JSON.stringify(encodedMessage);
			let sent = false;
			try {
				this.socket.ws.send(request);
				sent = true;
			} catch (error) {
				this.logger.log(`Failed to send message on WebSocket, reconnecting: ${error}`);
				this.closeAndReconnect("FailedToSendMessage");
			}
			this._logVerbose(`${sent ? "sent" : "failed to send"} message with type ${message.type}: ${JSON.stringify(messageForLog)}`);
			return true;
		}
		this._logVerbose(`message not sent (socket state: ${this.socket.state}, paused: ${"paused" in this.socket ? this.socket.paused : void 0}): ${JSON.stringify(messageForLog)}`);
		return false;
	}
	resetServerInactivityTimeout() {
		if (this.socket.state === "terminated") return;
		if (this.reconnectDueToServerInactivityTimeout !== null) {
			clearTimeout(this.reconnectDueToServerInactivityTimeout);
			this.reconnectDueToServerInactivityTimeout = null;
		}
		this.reconnectDueToServerInactivityTimeout = setTimeout(() => {
			this.closeAndReconnect("InactiveServer");
		}, this.serverInactivityThreshold);
	}
	scheduleReconnect(reason) {
		if (this.scheduledReconnect) {
			clearTimeout(this.scheduledReconnect.timeout);
			this.scheduledReconnect = null;
		}
		this.socket = { state: "disconnected" };
		const backoff = this.nextBackoff(reason);
		this.markConnectionStateDirty();
		this.logger.log(`Attempting reconnect in ${Math.round(backoff)}ms`);
		const scheduledAt = monotonicMillis();
		const timeoutId = setTimeout(() => {
			if (this.scheduledReconnect?.timeout === timeoutId) {
				this.scheduledReconnect = null;
				this.connect();
			}
		}, backoff);
		this.scheduledReconnect = {
			timeout: timeoutId,
			scheduledAt,
			backoffMs: backoff
		};
	}
	/**
	* Close the WebSocket and schedule a reconnect.
	*
	* This should be used when we hit an error and would like to restart the session.
	*/
	closeAndReconnect(closeReason) {
		this._logVerbose(`begin closeAndReconnect with reason ${closeReason}`);
		switch (this.socket.state) {
			case "disconnected":
			case "terminated":
			case "stopped": return;
			case "connecting":
			case "ready":
				this.lastCloseReason = closeReason;
				this.close();
				this.scheduleReconnect("client");
				return;
			default: this.socket;
		}
	}
	/**
	* Close the WebSocket, being careful to clear the onclose handler to avoid re-entrant
	* calls. Use this instead of directly calling `ws.close()`
	*
	* It is the callers responsibility to update the state after this method is called so that the
	* closed socket is not accessible or used again after this method is called
	*/
	close() {
		this.transitionChunkBuffer = null;
		switch (this.socket.state) {
			case "disconnected":
			case "terminated":
			case "stopped": return Promise.resolve();
			case "connecting": {
				const ws = this.socket.ws;
				ws.onmessage = (_message) => {
					this._logVerbose("Ignoring message received after close");
				};
				return new Promise((r) => {
					ws.onclose = () => {
						this._logVerbose("Closed after connecting");
						r();
					};
					ws.onopen = () => {
						this._logVerbose("Opened after connecting");
						ws.close();
					};
				});
			}
			case "ready": {
				this._logVerbose("ws.close called");
				const ws = this.socket.ws;
				ws.onmessage = (_message) => {
					this._logVerbose("Ignoring message received after close");
				};
				const result = new Promise((r) => {
					ws.onclose = () => {
						r();
					};
				});
				ws.close();
				return result;
			}
			default:
				this.socket;
				return Promise.resolve();
		}
	}
	/**
	* Close the WebSocket and do not reconnect.
	* @returns A Promise that resolves when the WebSocket `onClose` callback is called.
	*/
	terminate() {
		if (this.reconnectDueToServerInactivityTimeout) clearTimeout(this.reconnectDueToServerInactivityTimeout);
		if (this.scheduledReconnect) {
			clearTimeout(this.scheduledReconnect.timeout);
			this.scheduledReconnect = null;
		}
		this.cleanupNetworkListener();
		switch (this.socket.state) {
			case "terminated":
			case "stopped":
			case "disconnected":
			case "connecting":
			case "ready": {
				const result = this.close();
				this.setSocketState({ state: "terminated" });
				return result;
			}
			default:
				this.socket;
				throw new Error(`Invalid websocket state: ${this.socket.state}`);
		}
	}
	stop() {
		switch (this.socket.state) {
			case "terminated": return Promise.resolve();
			case "connecting":
			case "stopped":
			case "disconnected":
			case "ready": {
				this.cleanupNetworkListener();
				const result = this.close();
				this.socket = { state: "stopped" };
				return result;
			}
			default:
				this.socket;
				return Promise.resolve();
		}
	}
	/**
	* Create a new WebSocket after a previous `stop()`, unless `terminate()` was
	* called before.
	*/
	tryRestart() {
		switch (this.socket.state) {
			case "stopped": break;
			case "terminated":
			case "connecting":
			case "ready":
			case "disconnected":
				this.logger.logVerbose("Restart called without stopping first");
				return;
			default: this.socket;
		}
		this.setupNetworkListener();
		this.connect();
	}
	pause() {
		switch (this.socket.state) {
			case "disconnected":
			case "stopped":
			case "terminated": return;
			case "connecting":
			case "ready":
				this.socket = {
					...this.socket,
					paused: "yes"
				};
				return;
			default:
				this.socket;
				return;
		}
	}
	/**
	* Try to reconnect immediately, canceling any scheduled reconnect.
	* This is useful when detecting network recovery.
	* Only takes action if we're in disconnected state (waiting to reconnect).
	*/
	tryReconnectImmediately() {
		this._logVerbose("tryReconnectImmediately called");
		if (this.socket.state !== "disconnected") {
			this._logVerbose(`tryReconnectImmediately called but socket state is ${this.socket.state}, no action taken`);
			return;
		}
		let timeSavedMs = null;
		if (this.scheduledReconnect) {
			const elapsed = monotonicMillis() - this.scheduledReconnect.scheduledAt;
			timeSavedMs = Math.max(0, this.scheduledReconnect.backoffMs - elapsed);
			this._logVerbose(`would have waited ${Math.round(timeSavedMs)}ms more (backoff was ${Math.round(this.scheduledReconnect.backoffMs)}ms, elapsed ${Math.round(elapsed)}ms)`);
			clearTimeout(this.scheduledReconnect.timeout);
			this.scheduledReconnect = null;
			this._logVerbose("canceled scheduled reconnect");
		}
		this.logger.log("Network recovery detected, reconnecting immediately");
		this.pendingNetworkRecoveryInfo = timeSavedMs !== null ? { timeSavedMs } : null;
		this.connect();
	}
	/**
	* Resume the state machine if previously paused.
	*/
	resume() {
		switch (this.socket.state) {
			case "connecting":
				this.socket = {
					...this.socket,
					paused: "no"
				};
				return;
			case "ready":
				if (this.socket.paused === "uninitialized") {
					this.socket = {
						...this.socket,
						paused: "no"
					};
					this._hasEverConnected = true;
					this.onOpen({
						connectionCount: this.connectionCount,
						lastCloseReason: this.lastCloseReason,
						clientTs: monotonicMillis()
					});
				} else if (this.socket.paused === "yes") {
					this.socket = {
						...this.socket,
						paused: "no"
					};
					this.onResume();
				}
				return;
			case "terminated":
			case "stopped":
			case "disconnected": return;
			default: this.socket;
		}
		this.connect();
	}
	connectionState() {
		return {
			isConnected: this.socket.state === "ready",
			hasEverConnected: this._hasEverConnected,
			connectionCount: this.connectionCount,
			connectionRetries: this.retries
		};
	}
	_logVerbose(message) {
		this.logger.logVerbose(message);
	}
	nextBackoff(reason) {
		const baseBackoff = (reason === "client" ? 100 : reason === "Unknown" ? this.defaultInitialBackoff : serverDisconnectErrors[reason].timeout) * Math.pow(2, this.retries);
		this.retries += 1;
		const actualBackoff = Math.min(baseBackoff, this.maxBackoff);
		return actualBackoff + actualBackoff * (Math.random() - .5);
	}
	reportLargeTransition({ transition, messageLength }) {
		if (transition.clientClockSkew === void 0 || transition.serverTs === void 0) return;
		const transitionTransitTime = monotonicMillis() - transition.clientClockSkew - transition.serverTs / 1e6;
		const prettyTransitionTime = `${Math.round(transitionTransitTime)}ms`;
		const prettyMessageMB = `${Math.round(messageLength / 1e4) / 100}MB`;
		const bytesPerSecond = messageLength / (transitionTransitTime / 1e3);
		const prettyBytesPerSecond = `${Math.round(bytesPerSecond / 1e4) / 100}MB per second`;
		this._logVerbose(`received ${prettyMessageMB} transition in ${prettyTransitionTime} at ${prettyBytesPerSecond}`);
		if (messageLength > 2e7) this.logger.log(`received query results totaling more that 20MB (${prettyMessageMB}) which will take a long time to download on slower connections`);
		else if (transitionTransitTime > 2e4) this.logger.log(`received query results totaling ${prettyMessageMB} which took more than 20s to arrive (${prettyTransitionTime})`);
		if (this.debug) this.sendMessage({
			type: "Event",
			eventType: "ClientReceivedTransition",
			event: {
				transitionTransitTime,
				messageLength
			}
		});
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/session.js
function newSessionId() {
	return uuidv4();
}
function uuidv4() {
	return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		const r = Math.random() * 16 | 0;
		return (c === "x" ? r : r & 3 | 8).toString(16);
	});
}
//#endregion
//#region node_modules/convex/dist/esm/vendor/jwt-decode/index.js
var InvalidTokenError = class extends Error {};
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
	return decodeURIComponent(atob(str).replace(/(.)/g, (_m, p) => {
		let code = p.charCodeAt(0).toString(16).toUpperCase();
		if (code.length < 2) code = "0" + code;
		return "%" + code;
	}));
}
function base64UrlDecode(str) {
	let output = str.replace(/-/g, "+").replace(/_/g, "/");
	switch (output.length % 4) {
		case 0: break;
		case 2:
			output += "==";
			break;
		case 3:
			output += "=";
			break;
		default: throw new Error("base64 string is not of the correct length");
	}
	try {
		return b64DecodeUnicode(output);
	} catch {
		return atob(output);
	}
}
function jwtDecode(token, options) {
	if (typeof token !== "string") throw new InvalidTokenError("Invalid token specified: must be a string");
	options || (options = {});
	const pos = options.header === true ? 0 : 1;
	const part = token.split(".")[pos];
	if (typeof part !== "string") throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
	let decoded;
	try {
		decoded = base64UrlDecode(part);
	} catch (e) {
		throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
	}
	try {
		return JSON.parse(decoded);
	} catch (e) {
		throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
	}
}
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/authentication_manager.js
var __defProp$5 = Object.defineProperty;
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$5 = (obj, key, value) => __defNormalProp$5(obj, typeof key !== "symbol" ? key + "" : key, value);
var MAXIMUM_REFRESH_DELAY = 480 * 60 * 60 * 1e3;
var MAX_TOKEN_CONFIRMATION_ATTEMPTS = 2;
var AuthenticationManager = class {
	constructor(syncState, callbacks, config) {
		__publicField$5(this, "authState", { state: "noAuth" });
		__publicField$5(this, "configVersion", 0);
		__publicField$5(this, "syncState");
		__publicField$5(this, "authenticate");
		__publicField$5(this, "stopSocket");
		__publicField$5(this, "tryRestartSocket");
		__publicField$5(this, "pauseSocket");
		__publicField$5(this, "resumeSocket");
		__publicField$5(this, "clearAuth");
		__publicField$5(this, "logger");
		__publicField$5(this, "refreshTokenLeewaySeconds");
		__publicField$5(this, "initialAuthTokenReuse");
		__publicField$5(this, "lastRefreshChange");
		__publicField$5(this, "tokenConfirmationAttempts", 0);
		this.syncState = syncState;
		this.authenticate = callbacks.authenticate;
		this.stopSocket = callbacks.stopSocket;
		this.tryRestartSocket = callbacks.tryRestartSocket;
		this.pauseSocket = callbacks.pauseSocket;
		this.resumeSocket = callbacks.resumeSocket;
		this.clearAuth = callbacks.clearAuth;
		this.logger = config.logger;
		this.refreshTokenLeewaySeconds = config.refreshTokenLeewaySeconds;
		this.initialAuthTokenReuse = config.initialAuthTokenReuse;
		this.lastRefreshChange = false;
	}
	notifyRefreshChange(isRefreshing) {
		if (this.authState.state !== "noAuth" && this.authState.state !== "initialRefetch" && this.authState.config.onRefreshChange && this.lastRefreshChange !== isRefreshing) {
			this.lastRefreshChange = isRefreshing;
			this.authState.config.onRefreshChange(isRefreshing);
		}
	}
	async setConfig(fetchToken, onChange, onRefreshChange) {
		this.resetAuthState();
		this._logVerbose("pausing WS for auth token fetch");
		this.pauseSocket();
		const token = await this.fetchTokenAndGuardAgainstRace(fetchToken, { forceRefreshToken: false });
		if (token.isFromOutdatedConfig) return;
		const config = {
			fetchToken,
			onAuthChange: onChange,
			onRefreshChange
		};
		if (token.value) {
			this.setAuthState({
				state: "waitingForServerConfirmationOfCachedToken",
				config,
				hasRetried: false
			});
			this.authenticate(token.value);
		} else {
			this.setAuthState({
				state: "initialRefetch",
				config
			});
			await this.refetchToken();
		}
		this._logVerbose("resuming WS after auth token fetch");
		this.resumeSocket();
	}
	onTransition(serverMessage) {
		if (!this.syncState.isCurrentOrNewerAuthVersion(serverMessage.endVersion.identity)) return;
		if (serverMessage.endVersion.identity <= serverMessage.startVersion.identity) return;
		this._logVerbose(`auth state is ${this.authState.state} when handling transition`);
		this.syncState.markAuthCompletion();
		if (this.authState.state === "waitingForServerConfirmationOfCachedToken") {
			this._logVerbose("server confirmed auth token is valid");
			const cachedToken = this.syncState.getAuth()?.value;
			if (this.initialAuthTokenReuse && cachedToken) this.scheduleTokenRefetch(cachedToken, serverMessage.clientClockSkew);
			else this.refetchToken();
			this.authState.config.onAuthChange(true);
			return;
		}
		if (this.authState.state === "waitingForServerConfirmationOfFreshToken") {
			this._logVerbose("server confirmed new auth token is valid");
			this.notifyRefreshChange(false);
			this.scheduleTokenRefetch(this.authState.token);
			this.tokenConfirmationAttempts = 0;
			if (!this.authState.hadAuth) this.authState.config.onAuthChange(true);
		}
	}
	onAuthError(serverMessage) {
		if (serverMessage.authUpdateAttempted === false && (this.authState.state === "waitingForServerConfirmationOfFreshToken" || this.authState.state === "waitingForServerConfirmationOfCachedToken")) {
			this._logVerbose("ignoring non-auth token expired error");
			return;
		}
		const { baseVersion } = serverMessage;
		if (!this.syncState.isCurrentOrNewerAuthVersion(baseVersion + 1)) {
			this._logVerbose("ignoring auth error for previous auth attempt");
			return;
		}
		this.tryToReauthenticate(serverMessage);
	}
	async tryToReauthenticate(serverMessage) {
		this._logVerbose(`attempting to reauthenticate: ${serverMessage.error}`);
		if (this.authState.state === "noAuth" || this.authState.state === "waitingForServerConfirmationOfFreshToken" && this.tokenConfirmationAttempts >= MAX_TOKEN_CONFIRMATION_ATTEMPTS) {
			this.logger.error(`Failed to authenticate: "${serverMessage.error}", check your server auth config`);
			if (this.syncState.hasAuth()) this.syncState.clearAuth();
			if (this.authState.state !== "noAuth") this.setAndReportAuthFailed(this.authState.config.onAuthChange);
			return;
		}
		if (this.authState.state === "waitingForServerConfirmationOfFreshToken") {
			this.tokenConfirmationAttempts++;
			this._logVerbose(`retrying reauthentication, ${MAX_TOKEN_CONFIRMATION_ATTEMPTS - this.tokenConfirmationAttempts} attempts remaining`);
		}
		this.notifyRefreshChange(true);
		await this.stopSocket();
		if (this.authState.state === "noAuth") return;
		const token = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, { forceRefreshToken: true });
		if (token.isFromOutdatedConfig) return;
		if (token.value && this.syncState.isNewAuth(token.value)) {
			this.authenticate(token.value);
			this.setAuthState({
				state: "waitingForServerConfirmationOfFreshToken",
				config: this.authState.config,
				token: token.value,
				hadAuth: this.authState.state === "notRefetching" || this.authState.state === "waitingForScheduledRefetch"
			});
		} else {
			this._logVerbose("reauthentication failed, could not fetch a new token");
			if (this.syncState.hasAuth()) this.syncState.clearAuth();
			this.setAndReportAuthFailed(this.authState.config.onAuthChange);
		}
		this.tryRestartSocket();
	}
	async refetchToken() {
		if (this.authState.state === "noAuth") return;
		this._logVerbose("refetching auth token");
		const token = await this.fetchTokenAndGuardAgainstRace(this.authState.config.fetchToken, { forceRefreshToken: true });
		if (token.isFromOutdatedConfig) return;
		if (token.value) if (this.syncState.isNewAuth(token.value)) {
			this.setAuthState({
				state: "waitingForServerConfirmationOfFreshToken",
				hadAuth: this.syncState.hasAuth(),
				token: token.value,
				config: this.authState.config
			});
			this.authenticate(token.value);
		} else this.setAuthState({
			state: "notRefetching",
			config: this.authState.config
		});
		else {
			this._logVerbose("refetching token failed");
			if (this.syncState.hasAuth()) this.clearAuth();
			this.setAndReportAuthFailed(this.authState.config.onAuthChange);
		}
		this._logVerbose("restarting WS after auth token fetch (if currently stopped)");
		this.tryRestartSocket();
	}
	scheduleTokenRefetch(token, clientClockSkewMs) {
		if (this.authState.state === "noAuth") return;
		const decodedToken = this.decodeToken(token);
		if (!decodedToken) {
			this.logger.error("Auth token is not a valid JWT, cannot refetch the token");
			return;
		}
		const { iat, exp } = decodedToken;
		if (!iat || !exp) {
			this.logger.error("Auth token does not have required fields, cannot refetch the token");
			return;
		}
		const fullLifetimeSeconds = exp - iat;
		if (fullLifetimeSeconds <= 2) {
			this.logger.error("Auth token does not live long enough, cannot refetch the token");
			return;
		}
		let tokenValiditySeconds;
		if (clientClockSkewMs !== void 0) {
			tokenValiditySeconds = exp - (Date.now() - clientClockSkewMs) / 1e3;
			if (tokenValiditySeconds <= 0) tokenValiditySeconds = 0;
		} else tokenValiditySeconds = fullLifetimeSeconds;
		let delay = Math.min(MAXIMUM_REFRESH_DELAY, (tokenValiditySeconds - this.refreshTokenLeewaySeconds) * 1e3);
		if (delay <= 0) {
			this.logger.warn(`Refetching auth token immediately, configured leeway ${this.refreshTokenLeewaySeconds}s is larger than the token's lifetime ${tokenValiditySeconds}s`);
			delay = 0;
		}
		const refetchTokenTimeoutId = setTimeout(() => {
			this._logVerbose("running scheduled token refetch");
			this.refetchToken();
		}, delay);
		this.setAuthState({
			state: "waitingForScheduledRefetch",
			refetchTokenTimeoutId,
			config: this.authState.config
		});
		this._logVerbose(`scheduled preemptive auth token refetching in ${delay}ms`);
	}
	async fetchTokenAndGuardAgainstRace(fetchToken, fetchArgs) {
		const originalConfigVersion = ++this.configVersion;
		this._logVerbose(`fetching token with config version ${originalConfigVersion}`);
		const token = await fetchToken(fetchArgs);
		if (this.configVersion !== originalConfigVersion) {
			this._logVerbose(`stale config version, expected ${originalConfigVersion}, got ${this.configVersion}`);
			return { isFromOutdatedConfig: true };
		}
		return {
			isFromOutdatedConfig: false,
			value: token
		};
	}
	stop() {
		this.resetAuthState();
		this.configVersion++;
		this._logVerbose(`config version bumped to ${this.configVersion}`);
	}
	setAndReportAuthFailed(onAuthChange) {
		onAuthChange(false);
		this.resetAuthState();
	}
	resetAuthState() {
		this.notifyRefreshChange(false);
		this.setAuthState({ state: "noAuth" });
	}
	setAuthState(newAuth) {
		const authStateForLog = newAuth.state === "waitingForServerConfirmationOfFreshToken" ? {
			hadAuth: newAuth.hadAuth,
			state: newAuth.state,
			token: `...${newAuth.token.slice(-7)}`
		} : { state: newAuth.state };
		this._logVerbose(`setting auth state to ${JSON.stringify(authStateForLog)}`);
		switch (newAuth.state) {
			case "waitingForScheduledRefetch":
			case "notRefetching":
			case "noAuth":
				this.tokenConfirmationAttempts = 0;
				break;
			case "waitingForServerConfirmationOfFreshToken":
			case "waitingForServerConfirmationOfCachedToken":
			case "initialRefetch": break;
			default:
		}
		if (this.authState.state === "waitingForScheduledRefetch") clearTimeout(this.authState.refetchTokenTimeoutId);
		this.authState = newAuth;
	}
	decodeToken(token) {
		try {
			return jwtDecode(token);
		} catch (e) {
			this._logVerbose(`Error decoding token: ${e instanceof Error ? e.message : "Unknown error"}`);
			return null;
		}
	}
	_logVerbose(message) {
		this.logger.logVerbose(`${message} [v${this.configVersion}]`);
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/metrics.js
var markNames = [
	"convexClientConstructed",
	"convexWebSocketOpen",
	"convexFirstMessageReceived"
];
function mark(name, sessionId) {
	const detail = { sessionId };
	if (typeof performance === "undefined" || !performance.mark) return;
	performance.mark(name, { detail });
}
function performanceMarkToJson(mark2) {
	let name = mark2.name.slice(6);
	name = name.charAt(0).toLowerCase() + name.slice(1);
	return {
		name,
		startTime: mark2.startTime
	};
}
function getMarksReport(sessionId) {
	if (typeof performance === "undefined" || !performance.getEntriesByName) return [];
	const allMarks = [];
	for (const name of markNames) {
		const marks = performance.getEntriesByName(name).filter((entry) => entry.entryType === "mark").filter((mark2) => mark2.detail.sessionId === sessionId);
		allMarks.push(...marks);
	}
	return allMarks.map(performanceMarkToJson);
}
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/client.js
var __defProp$4 = Object.defineProperty;
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
var BaseConvexClient = class {
	/**
	* @param address - The url of your Convex deployment, often provided
	* by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
	* @param onTransition - A callback receiving an array of query tokens
	* corresponding to query results that have changed -- additional handlers
	* can be added via `addOnTransitionHandler`.
	* @param options - See {@link BaseConvexClientOptions} for a full description.
	*/
	constructor(address, onTransition, options) {
		__publicField$4(this, "address");
		__publicField$4(this, "state");
		__publicField$4(this, "requestManager");
		__publicField$4(this, "webSocketManager");
		__publicField$4(this, "authenticationManager");
		__publicField$4(this, "remoteQuerySet");
		__publicField$4(this, "optimisticQueryResults");
		__publicField$4(this, "_transitionHandlerCounter", 0);
		__publicField$4(this, "_nextRequestId");
		__publicField$4(this, "_onTransitionFns", /* @__PURE__ */ new Map());
		__publicField$4(this, "_sessionId");
		__publicField$4(this, "firstMessageReceived", false);
		__publicField$4(this, "debug");
		__publicField$4(this, "logger");
		__publicField$4(this, "maxObservedTimestamp");
		__publicField$4(this, "connectionStateSubscribers", /* @__PURE__ */ new Map());
		__publicField$4(this, "nextConnectionStateSubscriberId", 0);
		__publicField$4(this, "_lastPublishedConnectionState");
		/**
		* Call this whenever the connection state may have changed in a way that could
		* require publishing it. Schedules a possibly update.
		*/
		__publicField$4(this, "markConnectionStateDirty", () => {
			Promise.resolve().then(() => {
				const curConnectionState = this.connectionState();
				if (JSON.stringify(curConnectionState) !== JSON.stringify(this._lastPublishedConnectionState)) {
					this._lastPublishedConnectionState = curConnectionState;
					for (const cb of this.connectionStateSubscribers.values()) cb(curConnectionState);
				}
			});
		});
		__publicField$4(this, "mark", (name) => {
			if (this.debug) mark(name, this.sessionId);
		});
		if (typeof address === "object") throw new Error("Passing a ClientConfig object is no longer supported. Pass the URL of the Convex deployment as a string directly.");
		if (options?.skipConvexDeploymentUrlCheck !== true) validateDeploymentUrl(address);
		options = { ...options };
		const authRefreshTokenLeewaySeconds = options.authRefreshTokenLeewaySeconds ?? 10;
		let webSocketConstructor = options.webSocketConstructor;
		if (!webSocketConstructor && typeof WebSocket === "undefined") throw new Error("No WebSocket global variable defined! To use Convex in an environment without WebSocket try the HTTP client: https://docs.convex.dev/api/classes/browser.ConvexHttpClient");
		webSocketConstructor = webSocketConstructor || WebSocket;
		this.debug = options.reportDebugInfoToConvex ?? false;
		this.address = address;
		this.logger = options.logger === false ? instantiateNoopLogger({ verbose: options.verbose ?? false }) : options.logger !== true && options.logger ? options.logger : instantiateDefaultLogger({ verbose: options.verbose ?? false });
		const i = address.search("://");
		if (i === -1) throw new Error("Provided address was not an absolute URL.");
		const origin = address.substring(i + 3);
		const protocol = address.substring(0, i);
		let wsProtocol;
		if (protocol === "http") wsProtocol = "ws";
		else if (protocol === "https") wsProtocol = "wss";
		else throw new Error(`Unknown parent protocol ${protocol}`);
		const wsUri = `${wsProtocol}://${origin}/api/${version}/sync`;
		this.state = new LocalSyncState();
		this.remoteQuerySet = new RemoteQuerySet((queryId) => this.state.queryPath(queryId), this.logger);
		this.requestManager = new RequestManager(this.logger, this.markConnectionStateDirty);
		const pauseSocket = () => {
			this.webSocketManager.pause();
			this.state.pause();
		};
		this.authenticationManager = new AuthenticationManager(this.state, {
			authenticate: (token) => {
				const message = this.state.setAuth(token);
				this.webSocketManager.sendMessage(message);
				return message.baseVersion;
			},
			stopSocket: () => this.webSocketManager.stop(),
			tryRestartSocket: () => this.webSocketManager.tryRestart(),
			pauseSocket,
			resumeSocket: () => this.webSocketManager.resume(),
			clearAuth: () => {
				this.clearAuth();
			}
		}, {
			logger: this.logger,
			refreshTokenLeewaySeconds: authRefreshTokenLeewaySeconds,
			initialAuthTokenReuse: options.initialAuthTokenReuse ?? false
		});
		this.optimisticQueryResults = new OptimisticQueryResults();
		this.addOnTransitionHandler((transition) => {
			onTransition(transition.queries.map((q) => q.token));
		});
		this._nextRequestId = 0;
		this._sessionId = newSessionId();
		const { unsavedChangesWarning } = options;
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") {
			if (unsavedChangesWarning === true) throw new Error("unsavedChangesWarning requested, but window.addEventListener not found! Remove {unsavedChangesWarning: true} from Convex client options.");
		} else if (unsavedChangesWarning !== false) window.addEventListener("beforeunload", (e) => {
			if (this.requestManager.hasIncompleteRequests()) {
				e.preventDefault();
				const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
				(e || window.event).returnValue = confirmationMessage;
				return confirmationMessage;
			}
		});
		this.webSocketManager = new WebSocketManager(wsUri, {
			onOpen: (reconnectMetadata) => {
				this.mark("convexWebSocketOpen");
				this.webSocketManager.sendMessage({
					...reconnectMetadata,
					type: "Connect",
					sessionId: this._sessionId,
					maxObservedTimestamp: this.maxObservedTimestamp
				});
				this.remoteQuerySet = new RemoteQuerySet((queryId) => this.state.queryPath(queryId), this.logger);
				const [querySetModification, authModification] = this.state.restart();
				if (authModification) this.webSocketManager.sendMessage(authModification);
				this.webSocketManager.sendMessage(querySetModification);
				for (const message of this.requestManager.restart()) this.webSocketManager.sendMessage(message);
			},
			onResume: () => {
				const [querySetModification, authModification] = this.state.resume();
				if (authModification) this.webSocketManager.sendMessage(authModification);
				if (querySetModification) this.webSocketManager.sendMessage(querySetModification);
				for (const message of this.requestManager.resume()) this.webSocketManager.sendMessage(message);
			},
			onMessage: (serverMessage) => {
				if (!this.firstMessageReceived) {
					this.firstMessageReceived = true;
					this.mark("convexFirstMessageReceived");
					this.reportMarks();
				}
				switch (serverMessage.type) {
					case "Transition": {
						this.observedTimestamp(serverMessage.endVersion.ts);
						this.authenticationManager.onTransition(serverMessage);
						this.remoteQuerySet.transition(serverMessage);
						this.state.transition(serverMessage);
						const completedRequests = this.requestManager.removeCompleted(this.remoteQuerySet.timestamp());
						this.notifyOnQueryResultChanges(completedRequests);
						break;
					}
					case "MutationResponse": {
						if (serverMessage.success) this.observedTimestamp(serverMessage.ts);
						const completedMutationInfo = this.requestManager.onResponse(serverMessage);
						if (completedMutationInfo !== null) this.notifyOnQueryResultChanges(/* @__PURE__ */ new Map([[completedMutationInfo.requestId, completedMutationInfo.result]]));
						break;
					}
					case "ActionResponse":
						this.requestManager.onResponse(serverMessage);
						break;
					case "AuthError":
						this.authenticationManager.onAuthError(serverMessage);
						break;
					case "FatalError": {
						const error = logFatalError(this.logger, serverMessage.error);
						this.webSocketManager.terminate();
						throw error;
					}
					default:
				}
				return { hasSyncedPastLastReconnect: this.hasSyncedPastLastReconnect() };
			},
			onServerDisconnectError: options.onServerDisconnectError
		}, webSocketConstructor, this.logger, this.markConnectionStateDirty, this.debug);
		this.mark("convexClientConstructed");
		if (options.expectAuth) pauseSocket();
	}
	/**
	* Return true if there is outstanding work from prior to the time of the most recent restart.
	* This indicates that the client has not proven itself to have gotten past the issue that
	* potentially led to the restart. Use this to influence when to reset backoff after a failure.
	*/
	hasSyncedPastLastReconnect() {
		return this.requestManager.hasSyncedPastLastReconnect() && this.state.hasSyncedPastLastReconnect();
	}
	observedTimestamp(observedTs) {
		if (this.maxObservedTimestamp === void 0 || this.maxObservedTimestamp.lessThanOrEqual(observedTs)) this.maxObservedTimestamp = observedTs;
	}
	getMaxObservedTimestamp() {
		return this.maxObservedTimestamp;
	}
	/**
	* Compute the current query results based on the remoteQuerySet and the
	* current optimistic updates and call `onTransition` for all the changed
	* queries.
	*
	* @param completedMutations - A set of mutation IDs whose optimistic updates
	* are no longer needed.
	*/
	notifyOnQueryResultChanges(completedRequests) {
		const remoteQueryResults = this.remoteQuerySet.remoteQueryResults();
		const queryTokenToValue = /* @__PURE__ */ new Map();
		for (const [queryId, result] of remoteQueryResults) {
			const queryToken = this.state.queryToken(queryId);
			if (queryToken !== null) {
				const query = {
					result,
					udfPath: this.state.queryPath(queryId),
					args: this.state.queryArgs(queryId)
				};
				queryTokenToValue.set(queryToken, query);
			}
		}
		const changedQueryTokens = this.optimisticQueryResults.ingestQueryResultsFromServer(queryTokenToValue, new Set(completedRequests.keys()));
		this.handleTransition({
			queries: changedQueryTokens.map((token) => {
				return {
					token,
					modification: {
						kind: "Updated",
						result: this.optimisticQueryResults.rawQueryResult(token)
					}
				};
			}),
			reflectedMutations: Array.from(completedRequests).map(([requestId, result]) => ({
				requestId,
				result
			})),
			timestamp: this.remoteQuerySet.timestamp()
		});
	}
	handleTransition(transition) {
		for (const fn of this._onTransitionFns.values()) fn(transition);
	}
	/**
	* Add a handler that will be called on a transition.
	*
	* Any external side effects (e.g. setting React state) should be handled here.
	*
	* @param fn
	*
	* @returns
	*/
	addOnTransitionHandler(fn) {
		const id = this._transitionHandlerCounter++;
		this._onTransitionFns.set(id, fn);
		return () => this._onTransitionFns.delete(id);
	}
	/**
	* Get the current JWT auth token and decoded claims.
	*/
	getCurrentAuthClaims() {
		const authToken = this.state.getAuth();
		let decoded = {};
		if (authToken && authToken.tokenType === "User") try {
			decoded = authToken ? jwtDecode(authToken.value) : {};
		} catch {
			decoded = {};
		}
		else return;
		return {
			token: authToken.value,
			decoded
		};
	}
	/**
	* Set the authentication token to be used for subsequent queries and mutations.
	* `fetchToken` will be called automatically again if a token expires.
	* `fetchToken` should return `null` if the token cannot be retrieved, for example
	* when the user's rights were permanently revoked.
	* @param fetchToken - an async function returning the JWT-encoded OpenID Connect Identity Token
	* @param onChange - a callback that will be called when the authentication status changes
	* @param onRefreshChange - a callback called with `true` when the socket is paused to fetch a replacement token after a server rejection, and `false` when refresh completes
	*/
	setAuth(fetchToken, onChange, onRefreshChange) {
		this.authenticationManager.setConfig(fetchToken, onChange, onRefreshChange);
	}
	hasAuth() {
		return this.state.hasAuth();
	}
	/** @internal */
	setAdminAuth(value, fakeUserIdentity) {
		const message = this.state.setAdminAuth(value, fakeUserIdentity);
		this.webSocketManager.sendMessage(message);
	}
	clearAuth() {
		const message = this.state.clearAuth();
		this.webSocketManager.sendMessage(message);
	}
	/**
	* Subscribe to a query function.
	*
	* Whenever this query's result changes, the `onTransition` callback
	* passed into the constructor will be called.
	*
	* @param name - The name of the query.
	* @param args - An arguments object for the query. If this is omitted, the
	* arguments will be `{}`.
	* @param options - A {@link SubscribeOptions} options object for this query.
	
	* @returns An object containing a {@link QueryToken} corresponding to this
	* query and an `unsubscribe` callback.
	*/
	subscribe(name, args, options) {
		const argsObject = parseArgs(args);
		const { modification, queryToken, unsubscribe } = this.state.subscribe(name, argsObject, options?.journal, options?.componentPath);
		if (modification !== null) this.webSocketManager.sendMessage(modification);
		return {
			queryToken,
			unsubscribe: () => {
				const modification2 = unsubscribe();
				if (modification2) this.webSocketManager.sendMessage(modification2);
			}
		};
	}
	/**
	* A query result based only on the current, local state.
	*
	* The only way this will return a value is if we're already subscribed to the
	* query or its value has been set optimistically.
	*/
	localQueryResult(udfPath, args) {
		const queryToken = serializePathAndArgs(udfPath, parseArgs(args));
		return this.optimisticQueryResults.queryResult(queryToken);
	}
	/**
	* Get query result by query token based on current, local state
	*
	* The only way this will return a value is if we're already subscribed to the
	* query or its value has been set optimistically.
	*
	* @internal
	*/
	localQueryResultByToken(queryToken) {
		return this.optimisticQueryResults.queryResult(queryToken);
	}
	/**
	* Whether local query result is available for a token.
	*
	* This method does not throw if the result is an error.
	*
	* @internal
	*/
	hasLocalQueryResultByToken(queryToken) {
		return this.optimisticQueryResults.hasQueryResult(queryToken);
	}
	/**
	* @internal
	*/
	localQueryLogs(udfPath, args) {
		const queryToken = serializePathAndArgs(udfPath, parseArgs(args));
		return this.optimisticQueryResults.queryLogs(queryToken);
	}
	/**
	* Retrieve the current {@link QueryJournal} for this query function.
	*
	* If we have not yet received a result for this query, this will be `undefined`.
	*
	* @param name - The name of the query.
	* @param args - The arguments object for this query.
	* @returns The query's {@link QueryJournal} or `undefined`.
	*/
	queryJournal(name, args) {
		const queryToken = serializePathAndArgs(name, parseArgs(args));
		return this.state.queryJournal(queryToken);
	}
	/**
	* Get the current {@link ConnectionState} between the client and the Convex
	* backend.
	*
	* @returns The {@link ConnectionState} with the Convex backend.
	*/
	connectionState() {
		const wsConnectionState = this.webSocketManager.connectionState();
		return {
			hasInflightRequests: this.requestManager.hasInflightRequests(),
			isWebSocketConnected: wsConnectionState.isConnected,
			hasEverConnected: wsConnectionState.hasEverConnected,
			connectionCount: wsConnectionState.connectionCount,
			connectionRetries: wsConnectionState.connectionRetries,
			timeOfOldestInflightRequest: this.requestManager.timeOfOldestInflightRequest(),
			inflightMutations: this.requestManager.inflightMutations(),
			inflightActions: this.requestManager.inflightActions()
		};
	}
	/**
	* Subscribe to the {@link ConnectionState} between the client and the Convex
	* backend, calling a callback each time it changes.
	*
	* Subscribed callbacks will be called when any part of ConnectionState changes.
	* ConnectionState may grow in future versions (e.g. to provide a array of
	* inflight requests) in which case callbacks would be called more frequently.
	*
	* @returns An unsubscribe function to stop listening.
	*/
	subscribeToConnectionState(cb) {
		const id = this.nextConnectionStateSubscriberId++;
		this.connectionStateSubscribers.set(id, cb);
		return () => {
			this.connectionStateSubscribers.delete(id);
		};
	}
	/**
	* Execute a mutation function.
	*
	* @param name - The name of the mutation.
	* @param args - An arguments object for the mutation. If this is omitted,
	* the arguments will be `{}`.
	* @param options - A {@link MutationOptions} options object for this mutation.
	
	* @returns - A promise of the mutation's result.
	*/
	async mutation(name, args, options) {
		const result = await this.mutationInternal(name, args, options);
		if (!result.success) {
			if (result.errorData !== void 0) throw forwardData(result, new ConvexError(createHybridErrorStacktrace("mutation", name, result)));
			throw new Error(createHybridErrorStacktrace("mutation", name, result));
		}
		return result.value;
	}
	/**
	* @internal
	*/
	async mutationInternal(udfPath, args, options, componentPath) {
		const { mutationPromise } = this.enqueueMutation(udfPath, args, options, componentPath);
		return mutationPromise;
	}
	/**
	* @internal
	*/
	enqueueMutation(udfPath, args, options, componentPath) {
		const mutationArgs = parseArgs(args);
		this.tryReportLongDisconnect();
		const requestId = this.nextRequestId;
		this._nextRequestId++;
		if (options !== void 0) {
			const optimisticUpdate = options.optimisticUpdate;
			if (optimisticUpdate !== void 0) {
				const wrappedUpdate = (localQueryStore) => {
					if (optimisticUpdate(localQueryStore, mutationArgs) instanceof Promise) this.logger.warn("Optimistic update handler returned a Promise. Optimistic updates should be synchronous.");
				};
				const changedQueries = this.optimisticQueryResults.applyOptimisticUpdate(wrappedUpdate, requestId).map((token) => {
					const localResult = this.localQueryResultByToken(token);
					return {
						token,
						modification: {
							kind: "Updated",
							result: localResult === void 0 ? void 0 : {
								success: true,
								value: localResult,
								logLines: []
							}
						}
					};
				});
				this.handleTransition({
					queries: changedQueries,
					reflectedMutations: [],
					timestamp: this.remoteQuerySet.timestamp()
				});
			}
		}
		const message = {
			type: "Mutation",
			requestId,
			udfPath,
			componentPath,
			args: [convexToJson(mutationArgs)]
		};
		const mightBeSent = this.webSocketManager.sendMessage(message);
		return {
			requestId,
			mutationPromise: this.requestManager.request(message, mightBeSent)
		};
	}
	/**
	* Execute an action function.
	*
	* @param name - The name of the action.
	* @param args - An arguments object for the action. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the action's result.
	*/
	async action(name, args) {
		const result = await this.actionInternal(name, args);
		if (!result.success) {
			if (result.errorData !== void 0) throw forwardData(result, new ConvexError(createHybridErrorStacktrace("action", name, result)));
			throw new Error(createHybridErrorStacktrace("action", name, result));
		}
		return result.value;
	}
	/**
	* @internal
	*/
	async actionInternal(udfPath, args, componentPath) {
		const actionArgs = parseArgs(args);
		const requestId = this.nextRequestId;
		this._nextRequestId++;
		this.tryReportLongDisconnect();
		const message = {
			type: "Action",
			requestId,
			udfPath,
			componentPath,
			args: [convexToJson(actionArgs)]
		};
		const mightBeSent = this.webSocketManager.sendMessage(message);
		return this.requestManager.request(message, mightBeSent);
	}
	/**
	* Close any network handles associated with this client and stop all subscriptions.
	*
	* Call this method when you're done with an {@link BaseConvexClient} to
	* dispose of its sockets and resources.
	*
	* @returns A `Promise` fulfilled when the connection has been completely closed.
	*/
	async close() {
		this.authenticationManager.stop();
		return this.webSocketManager.terminate();
	}
	/**
	* Return the address for this client, useful for creating a new client.
	*
	* Not guaranteed to match the address with which this client was constructed:
	* it may be canonicalized.
	*/
	get url() {
		return this.address;
	}
	/**
	* @internal
	*/
	get nextRequestId() {
		return this._nextRequestId;
	}
	/**
	* @internal
	*/
	get sessionId() {
		return this._sessionId;
	}
	/**
	* Reports performance marks to the server. This should only be called when
	* we have a functional websocket.
	*/
	reportMarks() {
		if (this.debug) {
			const report = getMarksReport(this.sessionId);
			this.webSocketManager.sendMessage({
				type: "Event",
				eventType: "ClientConnect",
				event: report
			});
		}
	}
	tryReportLongDisconnect() {
		if (!this.debug) return;
		const timeOfOldestRequest = this.connectionState().timeOfOldestInflightRequest;
		if (timeOfOldestRequest === null || Date.now() - timeOfOldestRequest.getTime() <= 60 * 1e3) return;
		const endpoint = `${this.address}/api/debug_event`;
		fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Convex-Client": `npm-${version}`
			},
			body: JSON.stringify({ event: "LongWebsocketDisconnect" })
		}).then((response) => {
			if (!response.ok) this.logger.warn("Analytics request failed with response:", response.body);
		}).catch((error) => {
			this.logger.warn("Analytics response failed with error:", error);
		});
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/pagination.js
function asPaginationResult(value) {
	if (typeof value !== "object" || value === null || !Array.isArray(value.page) || typeof value.isDone !== "boolean" || typeof value.continueCursor !== "string") throw new Error(`Not a valid paginated query result: ${value?.toString()}`);
	return value;
}
//#endregion
//#region node_modules/convex/dist/esm/browser/sync/paginated_query_client.js
var __defProp$3 = Object.defineProperty;
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$3(obj, typeof key !== "symbol" ? key + "" : key, value);
var PaginatedQueryClient = class {
	constructor(client, onTransition) {
		this.client = client;
		this.onTransition = onTransition;
		__publicField$3(this, "paginatedQuerySet", /* @__PURE__ */ new Map());
		__publicField$3(this, "lastTransitionTs");
		this.lastTransitionTs = Long.fromNumber(0);
		this.client.addOnTransitionHandler((transition) => this.onBaseTransition(transition));
	}
	/**
	* Subscribe to a paginated query.
	*
	* @param name - The name of the paginated query function
	* @param args - Arguments for the query (excluding paginationOpts)
	* @param options - Pagination options including initialNumItems
	* @returns Object with paginatedQueryToken and unsubscribe function
	*/
	subscribe(name, args, options) {
		const canonicalizedUdfPath = canonicalizeUdfPath(name);
		const token = serializePaginatedPathAndArgs(canonicalizedUdfPath, args, options);
		const unsubscribe = () => this.removePaginatedQuerySubscriber(token);
		const existingEntry = this.paginatedQuerySet.get(token);
		if (existingEntry) {
			existingEntry.numSubscribers += 1;
			return {
				paginatedQueryToken: token,
				unsubscribe
			};
		}
		this.paginatedQuerySet.set(token, {
			token,
			canonicalizedUdfPath,
			args,
			numSubscribers: 1,
			options: { initialNumItems: options.initialNumItems },
			nextPageKey: 0,
			pageKeys: [],
			pageKeyToQuery: /* @__PURE__ */ new Map(),
			ongoingSplits: /* @__PURE__ */ new Map(),
			skip: false,
			id: options.id
		});
		this.addPageToPaginatedQuery(token, null, options.initialNumItems);
		return {
			paginatedQueryToken: token,
			unsubscribe
		};
	}
	/**
	* Get current results for a paginated query based on local state.
	*
	* Throws an error when one of the pages has errored.
	*/
	localQueryResult(name, args, options) {
		const token = serializePaginatedPathAndArgs(canonicalizeUdfPath(name), args, options);
		return this.localQueryResultByToken(token);
	}
	/**
	* @internal
	*/
	localQueryResultByToken(token) {
		const paginatedQuery = this.paginatedQuerySet.get(token);
		if (!paginatedQuery) return;
		const activePages = this.activePageQueryTokens(paginatedQuery);
		if (activePages.length === 0) return {
			results: [],
			status: "LoadingFirstPage",
			loadMore: (numItems) => {
				return this.loadMoreOfPaginatedQuery(token, numItems);
			}
		};
		let allResults = [];
		let hasUndefined = false;
		let isDone = false;
		for (const pageToken of activePages) {
			const result = this.client.localQueryResultByToken(pageToken);
			if (result === void 0) {
				hasUndefined = true;
				isDone = false;
				continue;
			}
			const paginationResult = asPaginationResult(result);
			allResults = allResults.concat(paginationResult.page);
			isDone = !!paginationResult.isDone;
		}
		let status;
		if (hasUndefined) status = allResults.length === 0 ? "LoadingFirstPage" : "LoadingMore";
		else if (isDone) status = "Exhausted";
		else status = "CanLoadMore";
		return {
			results: allResults,
			status,
			loadMore: (numItems) => {
				return this.loadMoreOfPaginatedQuery(token, numItems);
			}
		};
	}
	onBaseTransition(transition) {
		const changedBaseTokens = transition.queries.map((q) => q.token);
		const changed = this.queriesContainingTokens(changedBaseTokens);
		let paginatedQueries = [];
		if (changed.length > 0) {
			this.processPaginatedQuerySplits(changed, (token) => this.client.localQueryResultByToken(token));
			paginatedQueries = changed.map((token) => ({
				token,
				modification: {
					kind: "Updated",
					result: this.localQueryResultByToken(token)
				}
			}));
		}
		const extendedTransition = {
			...transition,
			paginatedQueries
		};
		this.onTransition(extendedTransition);
	}
	/**
	* Load more items for a paginated query.
	*
	* This *always* causes a transition, the status of the query
	* has probably changed from "CanLoadMore" to "LoadingMore".
	* Data might have changed too: maybe a subscription to this page
	* query already exists (unlikely but possible) or this page query
	* has an optimistic update providing some initial data.
	*
	* @internal
	*/
	loadMoreOfPaginatedQuery(token, numItems) {
		this.mustGetPaginatedQuery(token);
		const lastPageToken = this.queryTokenForLastPageOfPaginatedQuery(token);
		const lastPageResult = this.client.localQueryResultByToken(lastPageToken);
		if (!lastPageResult) return false;
		const paginationResult = asPaginationResult(lastPageResult);
		if (paginationResult.isDone) return false;
		this.addPageToPaginatedQuery(token, paginationResult.continueCursor, numItems);
		const loadMoreTransition = {
			timestamp: this.lastTransitionTs,
			reflectedMutations: [],
			queries: [],
			paginatedQueries: [{
				token,
				modification: {
					kind: "Updated",
					result: this.localQueryResultByToken(token)
				}
			}]
		};
		this.onTransition(loadMoreTransition);
		return true;
	}
	/**
	* @internal
	*/
	queriesContainingTokens(queryTokens) {
		if (queryTokens.length === 0) return [];
		const changed = [];
		const queryTokenSet = new Set(queryTokens);
		for (const [paginatedToken, paginatedQuery] of this.paginatedQuerySet) for (const pageToken of this.allQueryTokens(paginatedQuery)) if (queryTokenSet.has(pageToken)) {
			changed.push(paginatedToken);
			break;
		}
		return changed;
	}
	/**
	* @internal
	*/
	processPaginatedQuerySplits(changed, getResult) {
		for (const paginatedQueryToken of changed) {
			const paginatedQuery = this.mustGetPaginatedQuery(paginatedQueryToken);
			const { ongoingSplits, pageKeyToQuery, pageKeys } = paginatedQuery;
			for (const [pageKey, [splitKey1, splitKey2]] of ongoingSplits) if (getResult(pageKeyToQuery.get(splitKey1).queryToken) !== void 0 && getResult(pageKeyToQuery.get(splitKey2).queryToken) !== void 0) this.completePaginatedQuerySplit(paginatedQuery, pageKey, splitKey1, splitKey2);
			for (const pageKey of pageKeys) {
				if (ongoingSplits.has(pageKey)) continue;
				const pageToken = pageKeyToQuery.get(pageKey).queryToken;
				const pageResult = getResult(pageToken);
				if (!pageResult) continue;
				const result = asPaginationResult(pageResult);
				if (result.splitCursor && (result.pageStatus === "SplitRecommended" || result.pageStatus === "SplitRequired" || result.page.length > paginatedQuery.options.initialNumItems * 2)) this.splitPaginatedQueryPage(paginatedQuery, pageKey, result.splitCursor, result.continueCursor);
			}
		}
	}
	splitPaginatedQueryPage(paginatedQuery, pageKey, splitCursor, continueCursor) {
		const splitKey1 = paginatedQuery.nextPageKey++;
		const splitKey2 = paginatedQuery.nextPageKey++;
		const paginationOpts = {
			cursor: continueCursor,
			numItems: paginatedQuery.options.initialNumItems,
			id: paginatedQuery.id
		};
		const firstSubscription = this.client.subscribe(paginatedQuery.canonicalizedUdfPath, {
			...paginatedQuery.args,
			paginationOpts: {
				...paginationOpts,
				cursor: null,
				endCursor: splitCursor
			}
		});
		paginatedQuery.pageKeyToQuery.set(splitKey1, firstSubscription);
		const secondSubscription = this.client.subscribe(paginatedQuery.canonicalizedUdfPath, {
			...paginatedQuery.args,
			paginationOpts: {
				...paginationOpts,
				cursor: splitCursor,
				endCursor: continueCursor
			}
		});
		paginatedQuery.pageKeyToQuery.set(splitKey2, secondSubscription);
		paginatedQuery.ongoingSplits.set(pageKey, [splitKey1, splitKey2]);
	}
	/**
	* @internal
	*/
	addPageToPaginatedQuery(token, continueCursor, numItems) {
		const paginatedQuery = this.mustGetPaginatedQuery(token);
		const pageKey = paginatedQuery.nextPageKey++;
		const paginationOpts = {
			cursor: continueCursor,
			numItems,
			id: paginatedQuery.id
		};
		const pageArgs = {
			...paginatedQuery.args,
			paginationOpts
		};
		const subscription = this.client.subscribe(paginatedQuery.canonicalizedUdfPath, pageArgs);
		paginatedQuery.pageKeys.push(pageKey);
		paginatedQuery.pageKeyToQuery.set(pageKey, subscription);
		return subscription;
	}
	removePaginatedQuerySubscriber(token) {
		const paginatedQuery = this.paginatedQuerySet.get(token);
		if (!paginatedQuery) return;
		paginatedQuery.numSubscribers -= 1;
		if (paginatedQuery.numSubscribers > 0) return;
		for (const subscription of paginatedQuery.pageKeyToQuery.values()) subscription.unsubscribe();
		this.paginatedQuerySet.delete(token);
	}
	completePaginatedQuerySplit(paginatedQuery, pageKey, splitKey1, splitKey2) {
		const originalQuery = paginatedQuery.pageKeyToQuery.get(pageKey);
		paginatedQuery.pageKeyToQuery.delete(pageKey);
		const pageIndex = paginatedQuery.pageKeys.indexOf(pageKey);
		paginatedQuery.pageKeys.splice(pageIndex, 1, splitKey1, splitKey2);
		paginatedQuery.ongoingSplits.delete(pageKey);
		originalQuery.unsubscribe();
	}
	/** The query tokens for all active pages, in result order */
	activePageQueryTokens(paginatedQuery) {
		return paginatedQuery.pageKeys.map((pageKey) => paginatedQuery.pageKeyToQuery.get(pageKey).queryToken);
	}
	allQueryTokens(paginatedQuery) {
		return Array.from(paginatedQuery.pageKeyToQuery.values()).map((sub) => sub.queryToken);
	}
	queryTokenForLastPageOfPaginatedQuery(token) {
		const paginatedQuery = this.mustGetPaginatedQuery(token);
		const lastPageKey = paginatedQuery.pageKeys[paginatedQuery.pageKeys.length - 1];
		if (lastPageKey === void 0) throw new Error(`No pages for paginated query ${token}`);
		return paginatedQuery.pageKeyToQuery.get(lastPageKey).queryToken;
	}
	mustGetPaginatedQuery(token) {
		const paginatedQuery = this.paginatedQuerySet.get(token);
		if (!paginatedQuery) throw new Error("paginated query no longer exists for token " + token);
		return paginatedQuery;
	}
};
//#endregion
//#region node_modules/convex/dist/esm/browser/http_client.js
var __defProp$2 = Object.defineProperty;
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$2 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
var specifiedFetch = void 0;
var ConvexHttpClient = class {
	/**
	* Create a new {@link ConvexHttpClient}.
	*
	* @param address - The url of your Convex deployment, often provided
	* by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
	* @param options - An object of options.
	* - `skipConvexDeploymentUrlCheck` - Skip validating that the Convex deployment URL looks like
	* `https://happy-animal-123.convex.cloud` or localhost. This can be useful if running a self-hosted
	* Convex backend that uses a different URL.
	* - `logger` - A logger or a boolean. If not provided, logs to the console.
	* You can construct your own logger to customize logging to log elsewhere
	* or not log at all, or use `false` as a shorthand for a no-op logger.
	* A logger is an object with 4 methods: log(), warn(), error(), and logVerbose().
	* These methods can receive multiple arguments of any types, like console.log().
	* - `auth` - A JWT containing identity claims accessible in Convex functions.
	* This identity may expire so it may be necessary to call `setAuth()` later,
	* but for short-lived clients it's convenient to specify this value here.
	* - `fetch` - A custom fetch implementation to use for all HTTP requests made by this client.
	*/
	constructor(address, options) {
		__publicField$2(this, "address");
		__publicField$2(this, "auth");
		__publicField$2(this, "adminAuth");
		__publicField$2(this, "encodedTsPromise");
		__publicField$2(this, "debug");
		__publicField$2(this, "fetchOptions");
		__publicField$2(this, "fetch");
		__publicField$2(this, "logger");
		__publicField$2(this, "mutationQueue", []);
		__publicField$2(this, "isProcessingQueue", false);
		if (typeof options === "boolean") throw new Error("skipConvexDeploymentUrlCheck as the second argument is no longer supported. Please pass an options object, `{ skipConvexDeploymentUrlCheck: true }`.");
		if ((options ?? {}).skipConvexDeploymentUrlCheck !== true) validateDeploymentUrl(address);
		this.logger = options?.logger === false ? instantiateNoopLogger({ verbose: false }) : options?.logger !== true && options?.logger ? options.logger : instantiateDefaultLogger({ verbose: false });
		this.address = address;
		this.debug = true;
		this.auth = void 0;
		this.adminAuth = void 0;
		this.fetch = options?.fetch;
		if (options?.auth) this.setAuth(options.auth);
	}
	/**
	* Obtain the {@link ConvexHttpClient}'s URL to its backend.
	* @deprecated Use url, which returns the url without /api at the end.
	*
	* @returns The URL to the Convex backend, including the client's API version.
	*/
	backendUrl() {
		return `${this.address}/api`;
	}
	/**
	* Return the address for this client, useful for creating a new client.
	*
	* Not guaranteed to match the address with which this client was constructed:
	* it may be canonicalized.
	*/
	get url() {
		return this.address;
	}
	/**
	* Set the authentication token to be used for subsequent queries and mutations.
	*
	* Should be called whenever the token changes (i.e. due to expiration and refresh).
	*
	* @param value - JWT-encoded OpenID Connect identity token.
	*/
	setAuth(value) {
		this.clearAuth();
		this.auth = value;
	}
	/**
	* Set admin auth token to allow calling internal queries, mutations, and actions
	* and acting as an identity.
	*
	* @internal
	*/
	setAdminAuth(token, actingAsIdentity) {
		this.clearAuth();
		if (actingAsIdentity !== void 0) {
			const bytes = new TextEncoder().encode(JSON.stringify(actingAsIdentity));
			const actingAsIdentityEncoded = btoa(String.fromCodePoint(...bytes));
			this.adminAuth = `${token}:${actingAsIdentityEncoded}`;
		} else this.adminAuth = token;
	}
	/**
	* Clear the current authentication token if set.
	*/
	clearAuth() {
		this.auth = void 0;
		this.adminAuth = void 0;
	}
	/**
	* Sets whether the result log lines should be printed on the console or not.
	*
	* @internal
	*/
	setDebug(debug) {
		this.debug = debug;
	}
	/**
	* Used to customize the fetch behavior in some runtimes.
	*
	* @internal
	*/
	setFetchOptions(fetchOptions) {
		this.fetchOptions = fetchOptions;
	}
	/**
	* This API is experimental: it may change or disappear.
	*
	* Execute a Convex query function at the same timestamp as every other
	* consistent query execution run by this HTTP client.
	*
	* This doesn't make sense for long-lived ConvexHttpClients as Convex
	* backends can read a limited amount into the past: beyond 30 seconds
	* in the past may not be available.
	*
	* Create a new client to use a consistent time.
	*
	* @param name - The name of the query.
	* @param args - The arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the query's result.
	*
	* @deprecated This API is experimental: it may change or disappear.
	*/
	async consistentQuery(query, ...args) {
		const queryArgs = parseArgs(args[0]);
		const timestampPromise = this.getTimestamp();
		return await this.queryInner(query, queryArgs, { timestampPromise });
	}
	async getTimestamp() {
		if (this.encodedTsPromise) return this.encodedTsPromise;
		return this.encodedTsPromise = this.getTimestampInner();
	}
	async getTimestampInner() {
		const localFetch = this.fetch || specifiedFetch || fetch;
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		const response = await localFetch(`${this.address}/api/query_ts`, {
			...this.fetchOptions,
			method: "POST",
			headers
		});
		if (!response.ok) throw new Error(await response.text());
		const { ts } = await response.json();
		return ts;
	}
	/**
	* Execute a Convex query function.
	*
	* @param name - The name of the query.
	* @param args - The arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the query's result.
	*/
	async query(query, ...args) {
		const queryArgs = parseArgs(args[0]);
		return await this.queryInner(query, queryArgs, {});
	}
	async queryInner(query, queryArgs, options) {
		const name = getFunctionName(query);
		const args = [convexToJson(queryArgs)];
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const localFetch = this.fetch || specifiedFetch || fetch;
		const timestamp = options.timestampPromise ? await options.timestampPromise : void 0;
		const body = JSON.stringify({
			path: name,
			format: "convex_encoded_json",
			args,
			...timestamp ? { ts: timestamp } : {}
		});
		const response = await localFetch(timestamp ? `${this.address}/api/query_at_ts` : `${this.address}/api/query`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "query", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
	async mutationInner(mutation, mutationArgs) {
		const name = getFunctionName(mutation);
		const body = JSON.stringify({
			path: name,
			format: "convex_encoded_json",
			args: [convexToJson(mutationArgs)]
		});
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const response = await (this.fetch || specifiedFetch || fetch)(`${this.address}/api/mutation`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "mutation", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
	async processMutationQueue() {
		if (this.isProcessingQueue) return;
		this.isProcessingQueue = true;
		while (this.mutationQueue.length > 0) {
			const { mutation, args, resolve, reject } = this.mutationQueue.shift();
			try {
				resolve(await this.mutationInner(mutation, args));
			} catch (error) {
				reject(error);
			}
		}
		this.isProcessingQueue = false;
	}
	enqueueMutation(mutation, args) {
		return new Promise((resolve, reject) => {
			this.mutationQueue.push({
				mutation,
				args,
				resolve,
				reject
			});
			this.processMutationQueue();
		});
	}
	/**
	* Execute a Convex mutation function. Mutations are queued by default.
	*
	* @param name - The name of the mutation.
	* @param args - The arguments object for the mutation. If this is omitted,
	* the arguments will be `{}`.
	* @param options - An optional object containing
	* @returns A promise of the mutation's result.
	*/
	async mutation(mutation, ...args) {
		const [fnArgs, options] = args;
		const mutationArgs = parseArgs(fnArgs);
		if (!options?.skipQueue) return await this.enqueueMutation(mutation, mutationArgs);
		else return await this.mutationInner(mutation, mutationArgs);
	}
	/**
	* Execute a Convex action function. Actions are not queued.
	*
	* @param name - The name of the action.
	* @param args - The arguments object for the action. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the action's result.
	*/
	async action(action, ...args) {
		const actionArgs = parseArgs(args[0]);
		const name = getFunctionName(action);
		const body = JSON.stringify({
			path: name,
			format: "convex_encoded_json",
			args: [convexToJson(actionArgs)]
		});
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const response = await (this.fetch || specifiedFetch || fetch)(`${this.address}/api/action`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "action", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
	/**
	* Execute a Convex function of an unknown type. These function calls are not queued.
	*
	* @param name - The name of the function.
	* @param args - The arguments object for the function. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the function's result.
	*
	* @internal
	*/
	async function(anyFunction, componentPath, ...args) {
		const functionArgs = parseArgs(args[0]);
		const name = typeof anyFunction === "string" ? anyFunction : getFunctionName(anyFunction);
		const body = JSON.stringify({
			componentPath,
			path: name,
			format: "convex_encoded_json",
			args: convexToJson(functionArgs)
		});
		const headers = {
			"Content-Type": "application/json",
			"Convex-Client": `npm-${version}`
		};
		if (this.adminAuth) headers["Authorization"] = `Convex ${this.adminAuth}`;
		else if (this.auth) headers["Authorization"] = `Bearer ${this.auth}`;
		const response = await (this.fetch || specifiedFetch || fetch)(`${this.address}/api/function`, {
			...this.fetchOptions,
			body,
			method: "POST",
			headers
		});
		if (!response.ok && response.status !== 560) throw new Error(await response.text());
		const respJSON = await response.json();
		if (this.debug) for (const line of respJSON.logLines ?? []) logForFunction(this.logger, "info", "any", name, line);
		switch (respJSON.status) {
			case "success": return jsonToConvex(respJSON.value);
			case "error":
				if (respJSON.errorData !== void 0) throw forwardErrorData(respJSON.errorData, new ConvexError(respJSON.errorMessage));
				throw new Error(respJSON.errorMessage);
			default: throw new Error(`Invalid response: ${JSON.stringify(respJSON)}`);
		}
	}
};
function forwardErrorData(errorData, error) {
	error.data = jsonToConvex(errorData);
	return error;
}
//#endregion
//#region node_modules/convex/dist/esm/react/use_subscription.js
function useSubscription({ getCurrentValue, subscribe }) {
	const [state, setState] = (0, import_react.useState)(() => ({
		getCurrentValue,
		subscribe,
		value: getCurrentValue()
	}));
	let valueToReturn = state.value;
	if (state.getCurrentValue !== getCurrentValue || state.subscribe !== subscribe) {
		valueToReturn = getCurrentValue();
		setState({
			getCurrentValue,
			subscribe,
			value: valueToReturn
		});
	}
	(0, import_react.useEffect)(() => {
		let didUnsubscribe = false;
		const checkForUpdates = () => {
			if (didUnsubscribe) return;
			setState((prevState) => {
				if (prevState.getCurrentValue !== getCurrentValue || prevState.subscribe !== subscribe) return prevState;
				const value = getCurrentValue();
				if (prevState.value === value) return prevState;
				return {
					...prevState,
					value
				};
			});
		};
		const unsubscribe = subscribe(checkForUpdates);
		checkForUpdates();
		return () => {
			didUnsubscribe = true;
			unsubscribe();
		};
	}, [getCurrentValue, subscribe]);
	return valueToReturn;
}
//#endregion
//#region node_modules/convex/dist/esm/react/client.js
var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField$1 = (obj, key, value) => __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
var DEFAULT_EXTEND_SUBSCRIPTION_FOR = 5e3;
if (typeof import_react.default === "undefined") throw new Error("Required dependency 'react' not found");
function createMutation(mutationReference, client, update) {
	function mutation(args) {
		assertNotAccidentalArgument(args);
		return client.mutation(mutationReference, args, { optimisticUpdate: update });
	}
	mutation.withOptimisticUpdate = function withOptimisticUpdate(optimisticUpdate) {
		if (update !== void 0) throw new Error(`Already specified optimistic update for mutation ${getFunctionName(mutationReference)}`);
		return createMutation(mutationReference, client, optimisticUpdate);
	};
	return mutation;
}
function createAction(actionReference, client) {
	return function(args) {
		return client.action(actionReference, args);
	};
}
var ConvexReactClient = class {
	/**
	* @param address - The url of your Convex deployment, often provided
	* by an environment variable. E.g. `https://small-mouse-123.convex.cloud`.
	* @param options - See {@link ConvexReactClientOptions} for a full description.
	*/
	constructor(address, options) {
		__publicField$1(this, "address");
		__publicField$1(this, "cachedSync");
		__publicField$1(this, "cachedPaginatedQueryClient");
		__publicField$1(this, "listeners");
		__publicField$1(this, "options");
		__publicField$1(this, "closed", false);
		__publicField$1(this, "_logger");
		__publicField$1(this, "adminAuth");
		__publicField$1(this, "fakeUserIdentity");
		if (address === void 0) throw new Error("No address provided to ConvexReactClient.\nIf trying to deploy to production, make sure to follow all the instructions found at https://docs.convex.dev/production/hosting/\nIf running locally, make sure to run `convex dev` and ensure the .env.local file is populated.");
		if (typeof address !== "string") throw new Error(`ConvexReactClient requires a URL like 'https://happy-otter-123.convex.cloud', received something of type ${typeof address} instead.`);
		if (!address.includes("://")) throw new Error("Provided address was not an absolute URL.");
		this.address = address;
		this.listeners = /* @__PURE__ */ new Map();
		this._logger = options?.logger === false ? instantiateNoopLogger({ verbose: options?.verbose ?? false }) : options?.logger !== true && options?.logger ? options.logger : instantiateDefaultLogger({ verbose: options?.verbose ?? false });
		this.options = {
			...options,
			logger: this._logger
		};
	}
	/**
	* Return the address for this client, useful for creating a new client.
	*
	* Not guaranteed to match the address with which this client was constructed:
	* it may be canonicalized.
	*/
	get url() {
		return this.address;
	}
	/**
	* Lazily instantiate the `BaseConvexClient` so we don't create the WebSocket
	* when server-side rendering.
	*
	* @internal
	*/
	get sync() {
		if (this.closed) throw new Error("ConvexReactClient has already been closed.");
		if (this.cachedSync) return this.cachedSync;
		this.cachedSync = this.options.baseClient ?? new BaseConvexClient(this.address, () => {}, this.options);
		if (this.adminAuth) this.cachedSync.setAdminAuth(this.adminAuth, this.fakeUserIdentity);
		this.cachedPaginatedQueryClient = new PaginatedQueryClient(this.cachedSync, (transition) => this.handleTransition(transition));
		return this.cachedSync;
	}
	/**
	* Lazily instantiate the `PaginatedQueryClient` so we don't create it
	* when server-side rendering.
	*
	* @internal
	*/
	get paginatedQueryClient() {
		this.sync;
		if (this.cachedPaginatedQueryClient) return this.cachedPaginatedQueryClient;
		throw new Error("Should already be instantiated");
	}
	/**
	* Set the authentication token to be used for subsequent queries and mutations.
	* `fetchToken` will be called automatically again if a token expires.
	* `fetchToken` should return `null` if the token cannot be retrieved, for example
	* when the user's rights were permanently revoked.
	* @param fetchToken - an async function returning the JWT-encoded OpenID Connect Identity Token
	* @param onChange - a callback that will be called when the authentication status changes
	* @param onRefreshChange - a callback called with `true` when the socket is paused to fetch a replacement token after a server rejection, and `false` when refresh completes
	*/
	setAuth(fetchToken, onChange, onRefreshChange) {
		if (typeof fetchToken === "string") throw new Error("Passing a string to ConvexReactClient.setAuth is no longer supported, please upgrade to passing in an async function to handle reauthentication.");
		this.sync.setAuth(fetchToken, onChange ?? (() => {}), onRefreshChange);
	}
	/**
	* Clear the current authentication token if set.
	*/
	clearAuth() {
		this.sync.clearAuth();
	}
	/**
	* @internal
	*/
	setAdminAuth(token, identity) {
		this.adminAuth = token;
		this.fakeUserIdentity = identity;
		if (this.closed) throw new Error("ConvexReactClient has already been closed.");
		if (this.cachedSync) this.sync.setAdminAuth(token, identity);
	}
	/**
	* Construct a new {@link Watch} on a Convex query function.
	*
	* **Most application code should not call this method directly. Instead use
	* the {@link useQuery} hook.**
	*
	* The act of creating a watch does nothing, a Watch is stateless.
	*
	* @param query - A {@link server.FunctionReference} for the public query to run.
	* @param args - An arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @param options - A {@link WatchQueryOptions} options object for this query.
	*
	* @returns The {@link Watch} object.
	*/
	watchQuery(query, ...argsAndOptions) {
		const [args, options] = argsAndOptions;
		const name = getFunctionName(query);
		return {
			onUpdate: (callback) => {
				const { queryToken, unsubscribe } = this.sync.subscribe(name, args, options);
				const currentListeners = this.listeners.get(queryToken);
				if (currentListeners !== void 0) currentListeners.add(callback);
				else this.listeners.set(queryToken, /* @__PURE__ */ new Set([callback]));
				return () => {
					if (this.closed) return;
					const currentListeners2 = this.listeners.get(queryToken);
					currentListeners2.delete(callback);
					if (currentListeners2.size === 0) this.listeners.delete(queryToken);
					unsubscribe();
				};
			},
			localQueryResult: () => {
				if (this.cachedSync) return this.cachedSync.localQueryResult(name, args);
			},
			localQueryLogs: () => {
				if (this.cachedSync) return this.cachedSync.localQueryLogs(name, args);
			},
			journal: () => {
				if (this.cachedSync) return this.cachedSync.queryJournal(name, args);
			}
		};
	}
	/**
	* Indicates likely future interest in a query subscription.
	*
	* The implementation currently immediately subscribes to a query. In the future this method
	* may prioritize some queries over others, fetch the query result without subscribing, or
	* do nothing in slow network connections or high load scenarios.
	*
	* To use this in a React component, call useQuery() and ignore the return value.
	*
	* @param queryOptions - A query (function reference from an api object) and its args, plus
	* an optional extendSubscriptionFor for how long to subscribe to the query.
	*/
	prewarmQuery(queryOptions) {
		const extendSubscriptionFor = queryOptions.extendSubscriptionFor ?? DEFAULT_EXTEND_SUBSCRIPTION_FOR;
		const unsubscribe = this.watchQuery(queryOptions.query, queryOptions.args || {}).onUpdate(() => {});
		setTimeout(unsubscribe, extendSubscriptionFor);
	}
	/**
	* Construct a new {@link PaginatedWatch} on a Convex paginated query function.
	*
	* **Most application code should not call this method directly. Instead use
	* the {@link usePaginatedQuery} hook.**
	*
	* The act of creating a watch does nothing, a Watch is stateless.
	*
	* @param query - A {@link server.FunctionReference} for the public query to run.
	* @param args - An arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @param options - A {@link WatchPaginatedQueryOptions} options object for this query.
	*
	* @returns The {@link PaginatedWatch} object.
	*
	* @internal
	*/
	watchPaginatedQuery(query, args, options) {
		const name = getFunctionName(query);
		return {
			onUpdate: (callback) => {
				const { paginatedQueryToken, unsubscribe } = this.paginatedQueryClient.subscribe(name, args || {}, options);
				const currentListeners = this.listeners.get(paginatedQueryToken);
				if (currentListeners !== void 0) currentListeners.add(callback);
				else this.listeners.set(paginatedQueryToken, /* @__PURE__ */ new Set([callback]));
				return () => {
					if (this.closed) return;
					const currentListeners2 = this.listeners.get(paginatedQueryToken);
					currentListeners2.delete(callback);
					if (currentListeners2.size === 0) this.listeners.delete(paginatedQueryToken);
					unsubscribe();
				};
			},
			localQueryResult: () => {
				return this.paginatedQueryClient.localQueryResult(name, args, options);
			}
		};
	}
	/**
	* Execute a mutation function.
	*
	* @param mutation - A {@link server.FunctionReference} for the public mutation
	* to run.
	* @param args - An arguments object for the mutation. If this is omitted,
	* the arguments will be `{}`.
	* @param options - A {@link MutationOptions} options object for the mutation.
	* @returns A promise of the mutation's result.
	*/
	mutation(mutation, ...argsAndOptions) {
		const [args, options] = argsAndOptions;
		const name = getFunctionName(mutation);
		return this.sync.mutation(name, args, options);
	}
	/**
	* Execute an action function.
	*
	* @param action - A {@link server.FunctionReference} for the public action
	* to run.
	* @param args - An arguments object for the action. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the action's result.
	*/
	action(action, ...args) {
		const name = getFunctionName(action);
		return this.sync.action(name, ...args);
	}
	/**
	* Fetch a query result once.
	*
	* **Most application code should subscribe to queries instead, using
	* the {@link useQuery} hook.**
	*
	* @param query - A {@link server.FunctionReference} for the public query
	* to run.
	* @param args - An arguments object for the query. If this is omitted,
	* the arguments will be `{}`.
	* @returns A promise of the query's result.
	*/
	query(query, ...args) {
		const watch = this.watchQuery(query, ...args);
		const existingResult = watch.localQueryResult();
		if (existingResult !== void 0) return Promise.resolve(existingResult);
		return new Promise((resolve, reject) => {
			const unsubscribe = watch.onUpdate(() => {
				unsubscribe();
				try {
					resolve(watch.localQueryResult());
				} catch (e) {
					reject(e);
				}
			});
		});
	}
	/**
	* Get the current {@link ConnectionState} between the client and the Convex
	* backend.
	*
	* @returns The {@link ConnectionState} with the Convex backend.
	*/
	connectionState() {
		return this.sync.connectionState();
	}
	/**
	* Subscribe to the {@link ConnectionState} between the client and the Convex
	* backend, calling a callback each time it changes.
	*
	* Subscribed callbacks will be called when any part of ConnectionState changes.
	* ConnectionState may grow in future versions (e.g. to provide a array of
	* inflight requests) in which case callbacks would be called more frequently.
	* ConnectionState may also *lose* properties in future versions as we figure
	* out what information is most useful. As such this API is considered unstable.
	*
	* @returns An unsubscribe function to stop listening.
	*/
	subscribeToConnectionState(cb) {
		return this.sync.subscribeToConnectionState(cb);
	}
	/**
	* Get the logger for this client.
	*
	* @returns The {@link Logger} for this client.
	*/
	get logger() {
		return this._logger;
	}
	/**
	* Close any network handles associated with this client and stop all subscriptions.
	*
	* Call this method when you're done with a {@link ConvexReactClient} to
	* dispose of its sockets and resources.
	*
	* @returns A `Promise` fulfilled when the connection has been completely closed.
	*/
	async close() {
		this.closed = true;
		this.listeners = /* @__PURE__ */ new Map();
		if (this.cachedPaginatedQueryClient) this.cachedPaginatedQueryClient = void 0;
		if (this.cachedSync) {
			const sync = this.cachedSync;
			this.cachedSync = void 0;
			await sync.close();
		}
	}
	/**
	* Handle transitions from both base client and paginated client.
	* This ensures all transitions are processed synchronously and in order.
	*/
	handleTransition(transition) {
		const simple = transition.queries.map((q) => q.token);
		const paginated = transition.paginatedQueries.map((q) => q.token);
		this.transition([...simple, ...paginated]);
	}
	transition(updatedQueries) {
		for (const queryToken of updatedQueries) {
			const callbacks = this.listeners.get(queryToken);
			if (callbacks) for (const callback of callbacks) callback();
		}
	}
};
var ConvexContext = import_react.createContext(void 0);
function useConvex() {
	return (0, import_react.useContext)(ConvexContext);
}
var ConvexProvider = ({ client, children }) => {
	return import_react.createElement(ConvexContext.Provider, { value: client }, children);
};
function useQuery(query, ...args) {
	const skip = args[0] === "skip";
	const argsObject = args[0] === "skip" ? {} : parseArgs(args[0]);
	const queryReference = typeof query === "string" ? makeFunctionReference(query) : query;
	const queryName = getFunctionName(queryReference);
	const result = useQueries((0, import_react.useMemo)(() => skip ? {} : { query: {
		query: queryReference,
		args: argsObject
	} }, [
		JSON.stringify(convexToJson(argsObject)),
		queryName,
		skip
	]))["query"];
	if (result instanceof Error) throw result;
	return result;
}
function useMutation(mutation) {
	const mutationReference = typeof mutation === "string" ? makeFunctionReference(mutation) : mutation;
	const convex = (0, import_react.useContext)(ConvexContext);
	if (convex === void 0) throw new Error("Could not find Convex client! `useMutation` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app");
	return (0, import_react.useMemo)(() => createMutation(mutationReference, convex), [convex, getFunctionName(mutationReference)]);
}
function useAction(action) {
	const convex = (0, import_react.useContext)(ConvexContext);
	const actionReference = typeof action === "string" ? makeFunctionReference(action) : action;
	if (convex === void 0) throw new Error("Could not find Convex client! `useAction` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app");
	return (0, import_react.useMemo)(() => createAction(actionReference, convex), [convex, getFunctionName(actionReference)]);
}
function assertNotAccidentalArgument(value) {
	if (typeof value === "object" && value !== null && "bubbles" in value && "persist" in value && "isDefaultPrevented" in value) throw new Error(`Convex function called with SyntheticEvent object. Did you use a Convex function as an event handler directly? Event handlers like onClick receive an event object as their first argument. These SyntheticEvent objects are not valid Convex values. Try wrapping the function like \`const handler = () => myMutation();\` and using \`handler\` in the event handler.`);
}
//#endregion
//#region node_modules/convex/dist/esm/react/queries_observer.js
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
	enumerable: true,
	configurable: true,
	writable: true,
	value
}) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var QueriesObserver = class {
	constructor(createWatch) {
		__publicField(this, "createWatch");
		__publicField(this, "queries");
		__publicField(this, "listeners");
		this.createWatch = createWatch;
		this.queries = {};
		this.listeners = /* @__PURE__ */ new Set();
	}
	setQueries(newQueries) {
		for (const identifier of Object.keys(newQueries)) {
			const { query, args, paginationOptions } = newQueries[identifier];
			getFunctionName(query);
			if (this.queries[identifier] === void 0) this.addQuery(identifier, query, args, paginationOptions ? { paginationOptions } : {});
			else {
				const existingInfo = this.queries[identifier];
				if (getFunctionName(query) !== getFunctionName(existingInfo.query) || JSON.stringify(convexToJson(args)) !== JSON.stringify(convexToJson(existingInfo.args)) || JSON.stringify(paginationOptions) !== JSON.stringify(existingInfo.paginationOptions)) {
					this.removeQuery(identifier);
					this.addQuery(identifier, query, args, paginationOptions ? { paginationOptions } : {});
				}
			}
		}
		for (const identifier of Object.keys(this.queries)) if (newQueries[identifier] === void 0) this.removeQuery(identifier);
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	getLocalResults(queries) {
		const result = {};
		for (const identifier of Object.keys(queries)) {
			const { query, args } = queries[identifier];
			const paginationOptions = queries[identifier].paginationOptions;
			getFunctionName(query);
			const watch = this.createWatch(query, args, paginationOptions ? { paginationOptions } : {});
			let value;
			try {
				value = watch.localQueryResult();
			} catch (e) {
				if (e instanceof Error) value = e;
				else throw e;
			}
			result[identifier] = value;
		}
		return result;
	}
	setCreateWatch(createWatch) {
		this.createWatch = createWatch;
		for (const identifier of Object.keys(this.queries)) {
			const { query, args, watch, paginationOptions } = this.queries[identifier];
			const journal = "journal" in watch ? watch.journal() : void 0;
			this.removeQuery(identifier);
			this.addQuery(identifier, query, args, {
				...journal ? { journal } : [],
				...paginationOptions ? { paginationOptions } : {}
			});
		}
	}
	destroy() {
		for (const identifier of Object.keys(this.queries)) this.removeQuery(identifier);
		this.listeners = /* @__PURE__ */ new Set();
	}
	addQuery(identifier, query, args, { paginationOptions, journal }) {
		if (this.queries[identifier] !== void 0) throw new Error(`Tried to add a new query with identifier ${identifier} when it already exists.`);
		const watch = this.createWatch(query, args, {
			...journal ? { journal } : [],
			...paginationOptions ? { paginationOptions } : {}
		});
		const unsubscribe = watch.onUpdate(() => this.notifyListeners());
		this.queries[identifier] = {
			query,
			args,
			watch,
			unsubscribe,
			...paginationOptions ? { paginationOptions } : {}
		};
	}
	removeQuery(identifier) {
		const info = this.queries[identifier];
		if (info === void 0) throw new Error(`No query found with identifier ${identifier}.`);
		info.unsubscribe();
		delete this.queries[identifier];
	}
	notifyListeners() {
		for (const listener of this.listeners) listener();
	}
};
//#endregion
//#region node_modules/convex/dist/esm/react/use_queries.js
function useQueries(queries) {
	const convex = useConvex();
	if (convex === void 0) throw new Error("Could not find Convex client! `useQuery` must be used in the React component tree under `ConvexProvider`. Did you forget it? See https://docs.convex.dev/quick-start#set-up-convex-in-your-react-app");
	return useQueriesHelper(queries, (0, import_react.useMemo)(() => {
		return (query, args, { journal, paginationOptions }) => {
			if (paginationOptions) return convex.watchPaginatedQuery(query, args, paginationOptions);
			else return convex.watchQuery(query, args, journal ? { journal } : {});
		};
	}, [convex]));
}
function useQueriesHelper(queries, createWatch) {
	const [observer] = (0, import_react.useState)(() => new QueriesObserver(createWatch));
	if (observer.createWatch !== createWatch) observer.setCreateWatch(createWatch);
	(0, import_react.useEffect)(() => () => observer.destroy(), [observer]);
	return useSubscription((0, import_react.useMemo)(() => ({
		getCurrentValue: () => {
			return observer.getLocalResults(queries);
		},
		subscribe: (callback) => {
			observer.setQueries(queries);
			return observer.subscribe(callback);
		}
	}), [observer, queries]));
}
//#endregion
//#region node_modules/convex/dist/esm/react/ConvexAuthState.js
var ConvexAuthContext = (0, import_react.createContext)(void 0);
function ConvexProviderWithAuth({ children, client, useAuth }) {
	const { isLoading: authProviderLoading, isAuthenticated: authProviderAuthenticated, fetchAccessToken } = useAuth();
	const [isConvexAuthenticated, setIsConvexAuthenticated] = (0, import_react.useState)(null);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	if (authProviderLoading && isConvexAuthenticated !== null) {
		setIsConvexAuthenticated(null);
		setIsRefreshing(false);
	}
	if (!authProviderLoading && !authProviderAuthenticated && isConvexAuthenticated !== false) {
		setIsConvexAuthenticated(false);
		setIsRefreshing(false);
	}
	const isAuthenticated = authProviderAuthenticated && (isConvexAuthenticated ?? false);
	return /* @__PURE__ */ import_react.createElement(ConvexAuthContext.Provider, { value: {
		isLoading: isConvexAuthenticated === null,
		isAuthenticated,
		isRefreshing: isRefreshing && isAuthenticated
	} }, /* @__PURE__ */ import_react.createElement(ConvexAuthStateFirstEffect, {
		authProviderAuthenticated,
		fetchAccessToken,
		authProviderLoading,
		client,
		setIsConvexAuthenticated,
		setIsRefreshing
	}), /* @__PURE__ */ import_react.createElement(ConvexProvider, { client }, children), /* @__PURE__ */ import_react.createElement(ConvexAuthStateLastEffect, {
		authProviderAuthenticated,
		fetchAccessToken,
		authProviderLoading,
		client,
		setIsConvexAuthenticated,
		setIsRefreshing
	}));
}
function ConvexAuthStateFirstEffect({ authProviderAuthenticated, fetchAccessToken, authProviderLoading, client, setIsConvexAuthenticated, setIsRefreshing }) {
	(0, import_react.useEffect)(() => {
		let isThisEffectRelevant = true;
		if (authProviderAuthenticated) {
			client.setAuth(fetchAccessToken, (backendReportsIsAuthenticated) => {
				if (isThisEffectRelevant) setIsConvexAuthenticated(() => backendReportsIsAuthenticated);
			}, (isRefreshing) => {
				if (isThisEffectRelevant) setIsRefreshing(isRefreshing);
			});
			return () => {
				isThisEffectRelevant = false;
				setIsConvexAuthenticated((isConvexAuthenticated) => isConvexAuthenticated ? false : null);
				setIsRefreshing(false);
			};
		}
	}, [
		authProviderAuthenticated,
		fetchAccessToken,
		authProviderLoading,
		client,
		setIsConvexAuthenticated,
		setIsRefreshing
	]);
	return null;
}
function ConvexAuthStateLastEffect({ authProviderAuthenticated, fetchAccessToken, authProviderLoading, client, setIsConvexAuthenticated, setIsRefreshing }) {
	(0, import_react.useEffect)(() => {
		if (authProviderAuthenticated) return () => {
			client.clearAuth();
			setIsConvexAuthenticated(() => null);
			setIsRefreshing(false);
		};
	}, [
		authProviderAuthenticated,
		fetchAccessToken,
		authProviderLoading,
		client,
		setIsConvexAuthenticated,
		setIsRefreshing
	]);
	return null;
}
//#endregion
//#region node_modules/is-network-error/index.js
var objectToString = Object.prototype.toString;
var isError = (value) => objectToString.call(value) === "[object Error]";
var errorMessages = /* @__PURE__ */ new Set([
	"network error",
	"NetworkError when attempting to fetch resource.",
	"The Internet connection appears to be offline.",
	"Network request failed",
	"fetch failed",
	"terminated",
	" A network error occurred.",
	"Network connection lost"
]);
function isNetworkError(error) {
	if (!(error && isError(error) && error.name === "TypeError" && typeof error.message === "string")) return false;
	const { message, stack } = error;
	if (message === "Load failed" || message.startsWith("Load failed (") && message.endsWith(")")) return stack === void 0 || "__sentry_captured__" in error;
	if (message.startsWith("error sending request for url")) return true;
	if (message === "Failed to fetch" || message.startsWith("Failed to fetch (") && message.endsWith(")")) return true;
	return errorMessages.has(message);
}
//#endregion
//#region node_modules/@convex-dev/auth/dist/react/client.js
var RETRY_BACKOFF = [500, 2e3];
var RETRY_JITTER = 100;
var ConvexAuthActionsContext = (0, import_react.createContext)(void 0);
var ConvexAuthInternalContext = (0, import_react.createContext)(void 0);
function useAuth() {
	return (0, import_react.useContext)(ConvexAuthInternalContext);
}
var ConvexAuthTokenContext = (0, import_react.createContext)(null);
var VERIFIER_STORAGE_KEY = "__convexAuthOAuthVerifier";
var JWT_STORAGE_KEY = "__convexAuthJWT";
var REFRESH_TOKEN_STORAGE_KEY = "__convexAuthRefreshToken";
var SERVER_STATE_FETCH_TIME_STORAGE_KEY = "__convexAuthServerStateFetchTime";
function AuthProvider({ client, serverState, onChange, shouldHandleCode, storage, storageNamespace, replaceURL, children }) {
	const token = (0, import_react.useRef)(serverState?._state.token ?? null);
	const [isLoading, setIsLoading] = (0, import_react.useState)(token.current === null);
	const [tokenState, setTokenState] = (0, import_react.useState)(token.current);
	const verbose = client.verbose ?? false;
	const logVerbose = (0, import_react.useCallback)((message) => {
		if (verbose) {
			console.debug(`${(/* @__PURE__ */ new Date()).toISOString()} ${message}`);
			client.logger?.logVerbose(message);
		}
	}, [verbose]);
	const { storageSet, storageGet, storageRemove, storageKey } = useNamespacedStorage(storage, storageNamespace);
	const [isRefreshingToken, setIsRefreshingToken] = (0, import_react.useState)(false);
	const setToken = (0, import_react.useCallback)(async (args) => {
		const wasAuthenticated = token.current !== null;
		let newToken;
		if (args.tokens === null) {
			token.current = null;
			if (args.shouldStore) {
				await storageRemove(JWT_STORAGE_KEY);
				await storageRemove(REFRESH_TOKEN_STORAGE_KEY);
			}
			newToken = null;
		} else {
			const { token: value } = args.tokens;
			token.current = value;
			if (args.shouldStore) {
				const { refreshToken } = args.tokens;
				await storageSet(JWT_STORAGE_KEY, value);
				await storageSet(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
			}
			newToken = value;
		}
		if (wasAuthenticated !== (newToken !== null)) await onChange?.();
		setTokenState(newToken);
		setIsLoading(false);
	}, [storageSet, storageRemove]);
	(0, import_react.useEffect)(() => {
		const listener = async (e) => {
			if (isRefreshingToken) {
				e.preventDefault();
				const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
				e.returnValue = true;
				return confirmationMessage;
			}
		};
		browserAddEventListener("beforeunload", listener);
		return () => {
			browserRemoveEventListener("beforeunload", listener);
		};
	});
	(0, import_react.useEffect)(() => {
		const listener = (event) => {
			(async () => {
				if (event.storageArea !== storage) return;
				if (event.key === storageKey(JWT_STORAGE_KEY)) {
					const value = event.newValue;
					logVerbose(`synced access token, is null: ${value === null}`);
					await setToken({
						shouldStore: false,
						tokens: value === null ? null : { token: value }
					});
				}
			})();
		};
		browserAddEventListener("storage", listener);
		return () => browserRemoveEventListener("storage", listener);
	}, [setToken]);
	const verifyCode = (0, import_react.useCallback)(async (args) => {
		let lastError;
		let retry = 0;
		while (retry < RETRY_BACKOFF.length) try {
			return await client.unauthenticatedCall("auth:signIn", "code" in args ? {
				params: { code: args.code },
				verifier: args.verifier
			} : args);
		} catch (e) {
			lastError = e;
			if (!isNetworkError(e)) break;
			const wait = RETRY_BACKOFF[retry] + RETRY_JITTER * Math.random();
			retry++;
			logVerbose(`verifyCode failed with network error, retry ${retry} of ${RETRY_BACKOFF.length} in ${wait}ms`);
			await new Promise((resolve) => setTimeout(resolve, wait));
		}
		throw lastError;
	}, [client]);
	const verifyCodeAndSetToken = (0, import_react.useCallback)(async (args) => {
		const { tokens } = await verifyCode(args);
		logVerbose(`retrieved tokens, is null: ${tokens === null}`);
		await setToken({
			shouldStore: true,
			tokens: tokens ?? null
		});
		return tokens !== null;
	}, [client, setToken]);
	const signIn = (0, import_react.useCallback)(async (provider, args) => {
		const params = args instanceof FormData ? Array.from(args.entries()).reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {}) : args ?? {};
		const verifier = await storageGet(VERIFIER_STORAGE_KEY) ?? void 0;
		await storageRemove(VERIFIER_STORAGE_KEY);
		const result = await client.authenticatedCall("auth:signIn", {
			provider,
			params,
			verifier
		});
		if (result.redirect !== void 0) {
			const url = new URL(result.redirect);
			await storageSet(VERIFIER_STORAGE_KEY, result.verifier);
			if (navigator.product !== "ReactNative") window.location.href = url.toString();
			return {
				signingIn: false,
				redirect: url
			};
		} else if (result.tokens !== void 0) {
			const { tokens } = result;
			logVerbose(`signed in and got tokens, is null: ${tokens === null}`);
			await setToken({
				shouldStore: true,
				tokens
			});
			return { signingIn: result.tokens !== null };
		}
		return { signingIn: false };
	}, [
		client,
		setToken,
		storageGet
	]);
	const signOut = (0, import_react.useCallback)(async () => {
		try {
			await client.authenticatedCall("auth:signOut");
		} catch (error) {}
		logVerbose(`signed out, erasing tokens`);
		await setToken({
			shouldStore: true,
			tokens: null
		});
	}, [setToken, client]);
	const fetchAccessToken = (0, import_react.useCallback)(async ({ forceRefreshToken }) => {
		if (forceRefreshToken) {
			const tokenBeforeLockAquisition = token.current;
			return await browserMutex(REFRESH_TOKEN_STORAGE_KEY, async () => {
				const tokenAfterLockAquisition = token.current;
				if (tokenAfterLockAquisition !== tokenBeforeLockAquisition) {
					logVerbose(`returning synced token, is null: ${tokenAfterLockAquisition === null}`);
					return tokenAfterLockAquisition;
				}
				const refreshToken = await storageGet(REFRESH_TOKEN_STORAGE_KEY) ?? null;
				if (refreshToken !== null) {
					setIsRefreshingToken(true);
					await verifyCodeAndSetToken({ refreshToken }).finally(() => {
						setIsRefreshingToken(false);
					});
					logVerbose(`returning retrieved token, is null: ${tokenAfterLockAquisition === null}`);
					return token.current;
				} else {
					setIsRefreshingToken(false);
					logVerbose(`returning null, there is no refresh token`);
					return null;
				}
			});
		}
		return token.current;
	}, [
		verifyCodeAndSetToken,
		signOut,
		storageGet
	]);
	const signingInWithCodeFromURL = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		if (storage === void 0) throw new Error("`localStorage` is not available in this environment, set the `storage` prop on `ConvexAuthProvider`!");
		const readStateFromStorage = async () => {
			const token = await storageGet(JWT_STORAGE_KEY) ?? null;
			logVerbose(`retrieved token from storage, is null: ${token === null}`);
			await setToken({
				shouldStore: false,
				tokens: token === null ? null : { token }
			});
		};
		if (serverState !== void 0) {
			const timeFetched = storageGet(SERVER_STATE_FETCH_TIME_STORAGE_KEY);
			const setTokensFromServerState = (timeFetched) => {
				if (!timeFetched || serverState._timeFetched > +timeFetched) {
					const { token, refreshToken } = serverState._state;
					const tokens = token === null || refreshToken === null ? null : {
						token,
						refreshToken
					};
					storageSet(SERVER_STATE_FETCH_TIME_STORAGE_KEY, serverState._timeFetched.toString());
					setToken({
						tokens,
						shouldStore: true
					});
				} else readStateFromStorage();
			};
			if (timeFetched instanceof Promise) timeFetched.then(setTokensFromServerState);
			else setTokensFromServerState(timeFetched);
			return;
		}
		const code = typeof window?.location?.search !== "undefined" ? new URLSearchParams(window.location.search).get("code") : null;
		if (signingInWithCodeFromURL.current) {} else if (code && (shouldHandleCode === void 0 || (typeof shouldHandleCode === "function" ? shouldHandleCode() : shouldHandleCode))) {
			signingInWithCodeFromURL.current = true;
			const url = new URL(window.location.href);
			url.searchParams.delete("code");
			(async () => {
				await replaceURL(url.pathname + url.search + url.hash);
				await signIn(void 0, { code });
				signingInWithCodeFromURL.current = false;
			})();
		} else readStateFromStorage();
	}, [client, storageGet]);
	const actions = (0, import_react.useMemo)(() => ({
		signIn,
		signOut
	}), [signIn, signOut]);
	const isAuthenticated = tokenState !== null;
	const authState = (0, import_react.useMemo)(() => ({
		isLoading,
		isAuthenticated,
		fetchAccessToken
	}), [
		fetchAccessToken,
		isLoading,
		isAuthenticated
	]);
	return (0, import_jsx_runtime.jsx)(ConvexAuthInternalContext.Provider, {
		value: authState,
		children: (0, import_jsx_runtime.jsx)(ConvexAuthActionsContext.Provider, {
			value: actions,
			children: (0, import_jsx_runtime.jsx)(ConvexAuthTokenContext.Provider, {
				value: tokenState,
				children
			})
		})
	});
}
function useNamespacedStorage(peristentStorage, namespace) {
	const inMemoryStorage = useInMemoryStorage();
	const storage = (0, import_react.useMemo)(() => peristentStorage ?? inMemoryStorage(), [peristentStorage]);
	const escapedNamespace = namespace.replace(/[^a-zA-Z0-9]/g, "");
	const storageKey = (0, import_react.useCallback)((key) => `${key}_${escapedNamespace}`, [namespace]);
	return {
		storageSet: (0, import_react.useCallback)((key, value) => storage.setItem(storageKey(key), value), [storage, storageKey]),
		storageGet: (0, import_react.useCallback)((key) => storage.getItem(storageKey(key)), [storage, storageKey]),
		storageRemove: (0, import_react.useCallback)((key) => storage.removeItem(storageKey(key)), [storage, storageKey]),
		storageKey
	};
}
function useInMemoryStorage() {
	const [inMemoryStorage, setInMemoryStorage] = (0, import_react.useState)({});
	return () => ({
		getItem: (key) => inMemoryStorage[key],
		setItem: (key, value) => {
			setInMemoryStorage((prev) => ({
				...prev,
				[key]: value
			}));
		},
		removeItem: (key) => {
			setInMemoryStorage((prev) => {
				const { [key]: _, ...rest } = prev;
				return rest;
			});
		}
	});
}
async function browserMutex(key, callback) {
	const lockManager = window?.navigator?.locks;
	return lockManager !== void 0 ? await lockManager.request(key, callback) : await manualMutex(key, callback);
}
function getMutexValue(key) {
	if (globalThis.__convexAuthMutexes === void 0) globalThis.__convexAuthMutexes = {};
	let mutex = globalThis.__convexAuthMutexes[key];
	if (mutex === void 0) globalThis.__convexAuthMutexes[key] = {
		currentlyRunning: null,
		waiting: []
	};
	mutex = globalThis.__convexAuthMutexes[key];
	return mutex;
}
function setMutexValue(key, value) {
	globalThis.__convexAuthMutexes[key] = value;
}
async function enqueueCallbackForMutex(key, callback) {
	const mutex = getMutexValue(key);
	if (mutex.currentlyRunning === null) setMutexValue(key, {
		currentlyRunning: callback().finally(() => {
			const nextCb = getMutexValue(key).waiting.shift();
			getMutexValue(key).currentlyRunning = null;
			setMutexValue(key, {
				...getMutexValue(key),
				currentlyRunning: nextCb === void 0 ? null : enqueueCallbackForMutex(key, nextCb)
			});
		}),
		waiting: []
	});
	else setMutexValue(key, {
		...mutex,
		waiting: [...mutex.waiting, callback]
	});
}
async function manualMutex(key, callback) {
	return new Promise((resolve, reject) => {
		const wrappedCallback = () => {
			return callback().then((v) => resolve(v)).catch((e) => reject(e));
		};
		enqueueCallbackForMutex(key, wrappedCallback);
	});
}
function browserAddEventListener(type, listener, options) {
	if (typeof window === "undefined") return;
	window.addEventListener?.(type, listener, options);
}
function browserRemoveEventListener(type, listener, options) {
	if (typeof window === "undefined") return;
	window.removeEventListener?.(type, listener, options);
}
//#endregion
//#region node_modules/@convex-dev/auth/dist/react/index.js
/**
* React bindings for Convex Auth.
*
* @module
*/
/**
* Use this hook to access the `signIn` and `signOut` methods:
*
* ```ts
* import { useAuthActions } from "@convex-dev/auth/react";
*
* function SomeComponent() {
*   const { signIn, signOut } = useAuthActions();
*   // ...
* }
* ```
*/
function useAuthActions() {
	return (0, import_react.useContext)(ConvexAuthActionsContext);
}
/**
* Replace your `ConvexProvider` with this component to enable authentication.
*
* ```tsx
* import { ConvexAuthProvider } from "@convex-dev/auth/react";
* import { ConvexReactClient } from "convex/react";
* import { ReactNode } from "react";
*
* const convex = new ConvexReactClient(/* ... *\/);
*
* function RootComponent({ children }: { children: ReactNode }) {
*   return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>;
* }
* ```
*/
function ConvexAuthProvider(props) {
	const { client, storage, storageNamespace, replaceURL, shouldHandleCode, children } = props;
	return (0, import_jsx_runtime.jsx)(AuthProvider, {
		client: (0, import_react.useMemo)(() => ({
			authenticatedCall(action, args) {
				return client.action(action, args);
			},
			unauthenticatedCall(action, args) {
				return new ConvexHttpClient(client.address, { logger: client.logger }).action(action, args);
			},
			verbose: client.options?.verbose,
			logger: client.logger
		}), [client]),
		storage: storage ?? (typeof window === "undefined" ? void 0 : window?.localStorage),
		storageNamespace: storageNamespace ?? client.address,
		replaceURL: replaceURL ?? ((url) => {
			window.history.replaceState({}, "", url);
		}),
		shouldHandleCode,
		children: (0, import_jsx_runtime.jsx)(ConvexProviderWithAuth, {
			client,
			useAuth,
			children
		})
	});
}
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
	return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var toPascalCase = (string) => {
	const camelCase = toCamelCase(string);
	return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};
//#endregion
//#region node_modules/lucide-react/dist/esm/defaultAttributes.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var defaultAttributes = {
	xmlns: "http://www.w3.org/2000/svg",
	width: 24,
	height: 24,
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round",
	strokeLinejoin: "round"
};
//#endregion
//#region node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var hasA11yProp = (props) => {
	for (const prop in props) if (prop.startsWith("aria-") || prop === "role" || prop === "title") return true;
	return false;
};
//#endregion
//#region node_modules/lucide-react/dist/esm/Icon.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var Icon = (0, import_react.forwardRef)(({ color = "currentColor", size = 24, strokeWidth = 2, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => (0, import_react.createElement)("svg", {
	ref,
	...defaultAttributes,
	width: size,
	height: size,
	stroke: color,
	strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
	className: mergeClasses("lucide", className),
	...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
	...rest
}, [...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)), ...Array.isArray(children) ? children : [children]]));
//#endregion
//#region node_modules/lucide-react/dist/esm/createLucideIcon.js
/**
* @license lucide-react v0.577.0 - ISC
*
* This source code is licensed under the ISC license.
* See the LICENSE file in the root directory of this source tree.
*/
var createLucideIcon = (iconName, iconNode) => {
	const Component = (0, import_react.forwardRef)(({ className, ...props }, ref) => (0, import_react.createElement)(Icon, {
		ref,
		iconNode,
		className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
		...props
	}));
	Component.displayName = toPascalCase(iconName);
	return Component;
};
//#endregion
//#region node_modules/convex/dist/esm/server/components/index.js
function createChildComponents(root, pathParts) {
	return new Proxy({}, { get(_, prop) {
		if (typeof prop === "string") return createChildComponents(root, [...pathParts, prop]);
		else if (prop === toReferencePath) {
			if (pathParts.length < 1) {
				const found = [root, ...pathParts].join(".");
				throw new Error(`API path is expected to be of the form \`${root}.childComponent.functionName\`. Found: \`${found}\``);
			}
			return `_reference/childComponent/` + pathParts.join("/");
		} else return;
	} });
}
var componentsGeneric = () => createChildComponents("components", []);
//#endregion
//#region convex/_generated/api.js
/**
* Generated `api` utility.
*
* THIS CODE IS AUTOMATICALLY GENERATED.
*
* To regenerate, run `npx convex dev`.
* @module
*/
/**
* A utility for referencing Convex functions in your app's API.
*
* Usage:
* ```js
* const myFunctionReference = api.myModule.myFunction;
* ```
*/
var api = anyApi;
componentsGeneric();
//#endregion
export { escapeHtml as $, usePrevious as A, findFlatMatch as B, useRouter as C, require_jsx_runtime as D, useHydrated as E, resolvePath as F, createLRUCache as G, findSingleMatch as H, trimPath as I, arraysEqual as J, invariant as K, trimPathLeft as L, compileDecodeCharMap as M, interpolatePath as N, reactUse as O, joinPaths as P, encodePathLikeUrl as Q, trimPathRight as R, matchContext as S, ClientOnly as T, processRouteMasks as U, findRouteMatch as V, processRouteTree as W, decodePath as X, createControlledPromise as Y, deepEqual as Z, validateDeploymentUrl as _, useQueries as a, last as at, useStructuralSharing as b, useConvex as c, require_react_dom as ct, ConvexHttpClient as d, __toESM as dt, functionalUpdate as et, getFunctionName as f, jsonToConvex as g, convexToJson as h, useAuthActions as i, isPromise as it, cleanPath as j, useLayoutEffect as k, useMutation as l, require_react as lt, ConvexError as m, createLucideIcon as n, isDangerousProtocol as nt, ConvexReactClient as o, nullReplaceEqualDeep as ot, makeFunctionReference as p, DEFAULT_PROTOCOL_ALLOWLIST as q, ConvexAuthProvider as r, isModuleNotFoundError as rt, useAction as s, replaceEqualDeep as st, api as t, hasKeys as tt, useQuery as u, __commonJSMin as ut, Link as v, routerContext as w, useStore as x, useMatch as y, buildRouteBranch as z };
