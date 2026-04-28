import process from 'node:process';globalThis._importMeta_={url:import.meta.url,env:process.env};import { tmpdir } from 'node:os';
import { defineEventHandler, handleCacheHeaders, splitCookiesString, createEvent, fetchWithEvent, isEvent, eventHandler, setHeaders, sendRedirect, proxyRequest, getRequestHeader, setResponseHeaders, setResponseStatus, send, getRequestHeaders, setResponseHeader, appendResponseHeader, getRequestURL, getResponseHeader, getResponseStatus, createError, getCookie, setCookie, removeResponseHeader, getQuery as getQuery$1, readBody, getRouterParam, createApp, createRouter as createRouter$1, toNodeListener, lazyEventHandler, getHeader, getResponseStatusText } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/h3/dist/index.mjs';
import { Server } from 'node:http';
import { resolve, dirname, join } from 'node:path';
import nodeCrypto from 'node:crypto';
import { parentPort, threadId } from 'node:worker_threads';
import { escapeHtml } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/@vue/shared/dist/shared.cjs.js';
import { createRenderer, getRequestDependencies, getPreloadLinks, getPrefetchLinks } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/vue-bundle-renderer/dist/runtime.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, joinRelativeURL, parsePath, withLeadingSlash, withTrailingSlash, decodePath, withoutTrailingSlash } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/ufo/dist/index.mjs';
import destr, { destr as destr$1 } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/destr/dist/index.mjs';
import { createHooks } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/hookable/dist/index.mjs';
import { createFetch, Headers as Headers$1 } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/ofetch/dist/node.mjs';
import { fetchNodeRequestHandler, callNodeRequestHandler } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/node-mock-http/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/unstorage/drivers/fs.mjs';
import { digest } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/ohash/dist/index.mjs';
import { klona } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/klona/dist/index.mjs';
import defu, { defuFn, createDefu } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/defu/dist/defu.mjs';
import { snakeCase } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/scule/dist/index.mjs';
import { getContext } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/unctx/dist/index.mjs';
import { toRouteMatcher, createRouter } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/radix3/dist/index.mjs';
import { readFile } from 'node:fs/promises';
import consola, { consola as consola$1 } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/consola/dist/index.mjs';
import { ErrorParser } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/youch-core/build/index.js';
import { Youch } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/youch/build/index.js';
import { SourceMapConsumer } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/source-map/source-map.js';
import { createRouterMatcher } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/vue-router/vue-router.node.mjs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { stringify, uneval } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/devalue/index.js';
import { captureRawStackTrace, parseRawStackTrace } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/errx/dist/index.js';
import { isVNode, toValue, isRef } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/vue/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname as dirname$1, resolve as resolve$1 } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/pathe/dist/index.mjs';
import { createHead as createHead$1, propsToString, renderSSRHead } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/unhead/dist/server.mjs';
import process$1 from 'node:process';
import { renderToString } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/vue/server-renderer/index.mjs';
import { walkResolver } from 'file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/node_modules/unhead/dist/utils.mjs';

const serverAssets = [{"baseName":"server","dir":"/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir, ignore: (asset?.ignore || []) }));
}

const storage$1 = createStorage({});

storage$1.mount('/assets', assets$1);

storage$1.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend","watchOptions":{"ignored":[null]}}));
storage$1.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/server","watchOptions":{"ignored":[null]}}));
storage$1.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/.nuxt"}));
storage$1.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/.nuxt/cache"}));
storage$1.mount('data', unstorage_47drivers_47fs({"driver":"fs","base":"/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/.data/kv"}));

function useStorage(base = "") {
  return base ? prefixStorage(storage$1, base) : storage$1;
}

const Hasher = /* @__PURE__ */ (() => {
  class Hasher2 {
    buff = "";
    #context = /* @__PURE__ */ new Map();
    write(str) {
      this.buff += str;
    }
    dispatch(value) {
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    }
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      objType = objectLength < 10 ? "unknown:[" + objString + "]" : objString.slice(8, objectLength - 1);
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = this.#context.get(object)) === void 0) {
        this.#context.set(object, this.#context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        this.write("buffer:");
        return this.write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else {
          this.unknown(object, objType);
        }
      } else {
        const keys = Object.keys(object).sort();
        const extraKeys = [];
        this.write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          this.write(":");
          this.dispatch(object[key]);
          this.write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    }
    array(arr, unordered) {
      unordered = unordered === void 0 ? false : unordered;
      this.write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = new Hasher2();
        hasher.dispatch(entry);
        for (const [key, value] of hasher.#context) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      this.#context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    }
    date(date) {
      return this.write("date:" + date.toJSON());
    }
    symbol(sym) {
      return this.write("symbol:" + sym.toString());
    }
    unknown(value, type) {
      this.write(type);
      if (!value) {
        return;
      }
      this.write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          [...value.entries()],
          true
          /* ordered */
        );
      }
    }
    error(err) {
      return this.write("error:" + err.toString());
    }
    boolean(bool) {
      return this.write("bool:" + bool);
    }
    string(string) {
      this.write("string:" + string.length + ":");
      this.write(string);
    }
    function(fn) {
      this.write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
    }
    number(number) {
      return this.write("number:" + number);
    }
    null() {
      return this.write("Null");
    }
    undefined() {
      return this.write("Undefined");
    }
    regexp(regex) {
      return this.write("regex:" + regex.toString());
    }
    arraybuffer(arr) {
      this.write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    }
    url(url) {
      return this.write("url:" + url.toString());
    }
    map(map) {
      this.write("map:");
      const arr = [...map];
      return this.array(arr, false);
    }
    set(set) {
      this.write("set:");
      const arr = [...set];
      return this.array(arr, false);
    }
    bigint(number) {
      return this.write("bigint:" + number.toString());
    }
  }
  for (const type of [
    "uint8array",
    "uint8clampedarray",
    "unt8array",
    "uint16array",
    "unt16array",
    "uint32array",
    "unt32array",
    "float32array",
    "float64array"
  ]) {
    Hasher2.prototype[type] = function(arr) {
      this.write(type + ":");
      return this.array([...arr], false);
    };
  }
  function isNativeFunction(f) {
    if (typeof f !== "function") {
      return false;
    }
    return Function.prototype.toString.call(f).slice(
      -15
      /* "[native code] }".length */
    ) === "[native code] }";
  }
  return Hasher2;
})();
function serialize(object) {
  const hasher = new Hasher();
  hasher.dispatch(object);
  return hasher.buff;
}
function hash(value) {
  return digest(typeof value === "string" ? value : serialize(value)).replace(/[-_]/g, "").slice(0, 10);
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== void 0);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === void 0) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== void 0) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(void 0);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== void 0) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.waitUntil = incomingEvent.waitUntil;
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== void 0) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

const inlineAppConfig = {
  "nuxt": {}
};



const appConfig = defuFn(inlineAppConfig);

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === void 0) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /\{\{([^{}]*)\}\}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "dev",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      }
    }
  },
  "public": {
    "n8nEnabled": false,
    "i18n": {
      "baseUrl": "",
      "defaultLocale": "en",
      "rootRedirect": "",
      "redirectStatusCode": 302,
      "skipSettingLocaleOnNavigate": false,
      "locales": [
        {
          "code": "en",
          "iso": "en-US",
          "name": "English",
          "language": ""
        },
        {
          "code": "zh",
          "iso": "zh-CN",
          "name": "中文",
          "language": ""
        }
      ],
      "detectBrowserLanguage": {
        "alwaysRedirect": false,
        "cookieCrossOrigin": false,
        "cookieDomain": "",
        "cookieKey": "i18n_redirected",
        "cookieSecure": false,
        "fallbackLocale": "",
        "redirectOn": "root",
        "useCookie": true
      },
      "experimental": {
        "localeDetector": "",
        "typedPages": true,
        "typedOptionsAndMessages": false,
        "alternateLinkCanonicalQueries": true,
        "devCache": false,
        "cacheLifetime": "",
        "stripMessagesPayload": false,
        "preload": false,
        "strictSeo": false,
        "nitroContextDetection": true,
        "httpCacheDuration": 10
      },
      "domainLocales": {
        "en": {
          "domain": ""
        },
        "zh": {
          "domain": ""
        }
      }
    }
  },
  "n8nWebhookUrl": "",
  "n8nInternalToken": ""
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: void 0
});

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function _captureError(error, type) {
  console.error(`[${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}

const iframeStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const memoryStore = {};

  const NONCE = ${JSON.stringify(nonce)}
  
  const mockStorage = {
    getItem: function(key) {
      return memoryStore[key] !== undefined ? memoryStore[key] : null;
    },
    setItem: function(key, value) {
      memoryStore[key] = String(value);
      window.parent.postMessage({
        type: 'storage-set',
        key: key,
        value: String(value),
        nonce: NONCE
      }, '*');
    },
    removeItem: function(key) {
      delete memoryStore[key];
      window.parent.postMessage({
        type: 'storage-remove',
        key: key,
        nonce: NONCE
      }, '*');
    },
    clear: function() {
      for (const key in memoryStore) {
        delete memoryStore[key];
      }
      window.parent.postMessage({
        type: 'storage-clear',
        nonce: NONCE
      }, '*');
    },
    key: function(index) {
      const keys = Object.keys(memoryStore);
      return keys[index] !== undefined ? keys[index] : null;
    },
    get length() {
      return Object.keys(memoryStore).length;
    }
  };
  
  try {
    Object.defineProperty(window, 'localStorage', {
      value: mockStorage,
      writable: false,
      configurable: true
    });
  } catch (e) {
    window.localStorage = mockStorage;
  }
  
  window.addEventListener('message', function(event) {
    if (event.data.type === 'storage-sync-data' && event.data.nonce === NONCE) {
      const data = event.data.data;
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          memoryStore[key] = data[key];
        }
      }
      if (typeof window.initTheme === 'function') {
        window.initTheme();
      }
      window.dispatchEvent(new Event('storage-ready'));
    }
  });
  
  window.parent.postMessage({ 
    type: 'storage-sync-request',
    nonce: NONCE
  }, '*');
})();
`
);
const parentStorageBridge = (nonce) => (
  /* js */
  `
(function() {
  const host = document.querySelector('nuxt-error-overlay');
  if (!host) return;
  
  // Wait for shadow root to be attached
  const checkShadow = setInterval(function() {
    if (host.shadowRoot) {
      clearInterval(checkShadow);
      const iframe = host.shadowRoot.getElementById('frame');
      if (!iframe) return;

      const NONCE = ${JSON.stringify(nonce)}
      
      window.addEventListener('message', function(event) {
        if (!event.data || event.data.nonce !== NONCE) return;
        
        const data = event.data;
        
        if (data.type === 'storage-set') {
          localStorage.setItem(data.key, data.value);
        } else if (data.type === 'storage-remove') {
          localStorage.removeItem(data.key);
        } else if (data.type === 'storage-clear') {
          localStorage.clear();
        } else if (data.type === 'storage-sync-request') {
          const allData = {};
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            allData[key] = localStorage.getItem(key);
          }
          iframe.contentWindow.postMessage({
            type: 'storage-sync-data',
            data: allData,
            nonce: NONCE
          }, '*');
        }
      });
    }
  }, 10);
})();
`
);
const errorCSS = (
  /* css */
  `
:host {
  --preview-width: 240px;
  --preview-height: 180px;
  --base-width: 1200px;
  --base-height: 900px;
  --z-base: 999999998;
  all: initial;
  display: contents;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
#frame {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  border: none;
  z-index: var(--z-base);
}
#frame[inert] {
  right: 5px;
  bottom: 5px;
  left: auto;
  top: auto;
  width: var(--base-width);
  height: var(--base-height);
  transform: scale(calc(240 / 1200));
  transform-origin: bottom right;
  overflow: hidden;
  border-radius: calc(1200 * 8px / 240);
}
#preview {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  overflow: hidden;
  border-radius: 8px;
  pointer-events: none;
  z-index: var(--z-base);
  background: white;
  display: none;
}
#frame:not([inert]) + #preview {
  display: block;
}
#toggle {
  position: fixed;
  right: 5px;
  bottom: 5px;
  width: var(--preview-width);
  height: var(--preview-height);
  background: none;
  border: 3px solid #00DC82;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s, box-shadow 0.2s;
  z-index: calc(var(--z-base) + 1);
}
#toggle:hover,
#toggle:focus {
  opacity: 1;
  box-shadow: 0 0 20px rgba(0, 220, 130, 0.6);
}
#toggle:focus-visible {
  outline: 3px solid #00DC82;
  outline-offset: 3px;
  box-shadow: 0 0 24px rgba(0, 220, 130, 0.8);
}
@media (prefers-reduced-motion: reduce) {
  #toggle {
    transition: none;
  }
}
`
);
function webComponentScript(base64HTML, startMinimized) {
  return (
    /* js */
    `
  (function() {
    try {
      const host = document.querySelector('nuxt-error-overlay');
      if (!host) return;
      
      const shadow = host.attachShadow({ mode: 'open' });
      
      // Create elements
      const style = document.createElement('style');
      style.textContent = ${JSON.stringify(errorCSS)};
      
      const iframe = document.createElement('iframe');
      iframe.id = 'frame';
      iframe.src = 'data:text/html;base64,${base64HTML}';
      iframe.title = 'Detailed error stack trace';
      iframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
      
      const preview = document.createElement('div');
      preview.id = 'preview';
      
      const button = document.createElement('button');
      button.id = 'toggle';
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('type', 'button');
      button.innerHTML = '<span class="sr-only">Toggle detailed error view</span>';
      
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('role', 'status');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.className = 'sr-only';
      
      // Update preview snapshot
      function updatePreview() {
        try {
          let previewIframe = preview.querySelector('iframe');
          if (!previewIframe) {
            previewIframe = document.createElement('iframe');
            previewIframe.style.cssText = 'width: 1200px; height: 900px; transform: scale(0.2); transform-origin: top left; border: none;';
            previewIframe.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            preview.appendChild(previewIframe);
          }
          
          const doctype = document.doctype ? '<!DOCTYPE ' + document.doctype.name + '>' : '';
          const cleanedHTML = document.documentElement.outerHTML
            .replace(/<nuxt-error-overlay[^>]*>.*?<\\/nuxt-error-overlay>/gs, '')
            .replace(/<script[^>]*>.*?<\\/script>/gs, '');
          
          const iframeDoc = previewIframe.contentDocument || previewIframe.contentWindow.document;
          iframeDoc.open();
          iframeDoc.write(doctype + cleanedHTML);
          iframeDoc.close();
        } catch (error) {
          console.error('Failed to update preview:', error);
        }
      }
      
      function toggleView() {
        const isMinimized = iframe.hasAttribute('inert');
        
        if (isMinimized) {
          updatePreview();
          iframe.removeAttribute('inert');
          button.setAttribute('aria-expanded', 'true');
          liveRegion.textContent = 'Showing detailed error view';
          setTimeout(function() {
            try { iframe.contentWindow.focus(); } catch {}
          }, 100);
        } else {
          iframe.setAttribute('inert', '');
          button.setAttribute('aria-expanded', 'false');
          liveRegion.textContent = 'Showing error page';
          button.focus();
        }
      }
      
      button.onclick = toggleView;
      
      document.addEventListener('keydown', function(e) {
        if ((e.key === 'Escape' || e.key === 'Esc') && !iframe.hasAttribute('inert')) {
          toggleView();
        }
      });
      
      // Append to shadow DOM
      shadow.appendChild(style);
      shadow.appendChild(liveRegion);
      shadow.appendChild(iframe);
      shadow.appendChild(preview);
      shadow.appendChild(button);
      
      if (${startMinimized}) {
        iframe.setAttribute('inert', '');
        button.setAttribute('aria-expanded', 'false');
      }
      
      // Initialize preview
      setTimeout(updatePreview, 100);
      
    } catch (error) {
      console.error('Failed to initialize Nuxt error overlay:', error);
    }
  })();
  `
  );
}
function generateErrorOverlayHTML(html, options) {
  const nonce = Array.from(crypto.getRandomValues(new Uint8Array(16)), (b) => b.toString(16).padStart(2, "0")).join("");
  const errorPage = html.replace("<head>", `<head><script>${iframeStorageBridge(nonce)}<\/script>`);
  const base64HTML = Buffer.from(errorPage, "utf8").toString("base64");
  return `
    <script>${parentStorageBridge(nonce)}<\/script>
    <nuxt-error-overlay></nuxt-error-overlay>
    <script>${webComponentScript(base64HTML, options?.startMinimized ?? false)}<\/script>
  `;
}

const errorHandler$0 = (async function errorhandler(error, event, { defaultHandler }) {
  if (event.handled || isJsonRequest(event)) {
    return;
  }
  const defaultRes = await defaultHandler(error, event, { json: true });
  const statusCode = error.statusCode || 500;
  if (statusCode === 404 && defaultRes.status === 302) {
    setResponseHeaders(event, defaultRes.headers);
    setResponseStatus(event, defaultRes.status, defaultRes.statusText);
    return send(event, JSON.stringify(defaultRes.body, null, 2));
  }
  if (typeof defaultRes.body !== "string" && Array.isArray(defaultRes.body.stack)) {
    defaultRes.body.stack = defaultRes.body.stack.join("\n");
  }
  const errorObject = defaultRes.body;
  const url = new URL(errorObject.url);
  errorObject.url = withoutBase(url.pathname, useRuntimeConfig(event).app.baseURL) + url.search + url.hash;
  errorObject.message ||= "Server Error";
  errorObject.data ||= error.data;
  errorObject.statusMessage ||= error.statusMessage;
  delete defaultRes.headers["content-type"];
  delete defaultRes.headers["content-security-policy"];
  setResponseHeaders(event, defaultRes.headers);
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (event.handled) {
    return;
  }
  if (!res) {
    const { template } = await Promise.resolve().then(function () { return error500; });
    {
      errorObject.description = errorObject.message;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  for (const [header, value] of res.headers.entries()) {
    if (header === "set-cookie") {
      appendResponseHeader(event, header, value);
      continue;
    }
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : defaultRes.status, res.statusText || defaultRes.statusText);
  if (!globalThis._importMeta_.test && typeof html === "string") {
    const prettyResponse = await defaultHandler(error, event, { json: false });
    return send(event, html.replace("</body>", `${generateErrorOverlayHTML(prettyResponse.body, { startMinimized: 300 <= statusCode && statusCode < 500 })}</body>`));
  }
  return send(event, html);
});

function defineNitroErrorHandler(handler) {
  return handler;
}

const errorHandler$1 = defineNitroErrorHandler(
  async function defaultNitroErrorHandler(error, event) {
    const res = await defaultHandler(error, event);
    if (!event.node?.res.headersSent) {
      setResponseHeaders(event, res.headers);
    }
    setResponseStatus(event, res.status, res.statusText);
    return send(
      event,
      typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2)
    );
  }
);
async function defaultHandler(error, event, opts) {
  const isSensitive = error.unhandled || error.fatal;
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage || "Server Error";
  const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
  if (statusCode === 404) {
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      const redirectTo = `${baseURL}${url.pathname.slice(1)}${url.search}`;
      return {
        status: 302,
        statusText: "Found",
        headers: { location: redirectTo },
        body: `Redirecting...`
      };
    }
  }
  await loadStackTrace(error).catch(consola.error);
  const youch = new Youch();
  if (isSensitive && !opts?.silent) {
    const tags = [error.unhandled && "[unhandled]", error.fatal && "[fatal]"].filter(Boolean).join(" ");
    const ansiError = await (await youch.toANSI(error)).replaceAll(process.cwd(), ".");
    consola.error(
      `[request error] ${tags} [${event.method}] ${url}

`,
      ansiError
    );
  }
  const useJSON = opts?.json ?? !getRequestHeader(event, "accept")?.includes("text/html");
  const headers = {
    "content-type": useJSON ? "application/json" : "text/html",
    // Prevent browser from guessing the MIME types of resources.
    "x-content-type-options": "nosniff",
    // Prevent error page from being embedded in an iframe
    "x-frame-options": "DENY",
    // Prevent browsers from sending the Referer header
    "referrer-policy": "no-referrer",
    // Disable the execution of any js
    "content-security-policy": "script-src 'self' 'unsafe-inline'; object-src 'none'; base-uri 'self';"
  };
  if (statusCode === 404 || !getResponseHeader(event, "cache-control")) {
    headers["cache-control"] = "no-cache";
  }
  const body = useJSON ? {
    error: true,
    url,
    statusCode,
    statusMessage,
    message: error.message,
    data: error.data,
    stack: error.stack?.split("\n").map((line) => line.trim())
  } : await youch.toHTML(error, {
    request: {
      url: url.href,
      method: event.method,
      headers: getRequestHeaders(event)
    }
  });
  return {
    status: statusCode,
    statusText: statusMessage,
    headers,
    body
  };
}
async function loadStackTrace(error) {
  if (!(error instanceof Error)) {
    return;
  }
  const parsed = await new ErrorParser().defineSourceLoader(sourceLoader).parse(error);
  const stack = error.message + "\n" + parsed.frames.map((frame) => fmtFrame(frame)).join("\n");
  Object.defineProperty(error, "stack", { value: stack });
  if (error.cause) {
    await loadStackTrace(error.cause).catch(consola.error);
  }
}
async function sourceLoader(frame) {
  if (!frame.fileName || frame.fileType !== "fs" || frame.type === "native") {
    return;
  }
  if (frame.type === "app") {
    const rawSourceMap = await readFile(`${frame.fileName}.map`, "utf8").catch(() => {
    });
    if (rawSourceMap) {
      const consumer = await new SourceMapConsumer(rawSourceMap);
      const originalPosition = consumer.originalPositionFor({ line: frame.lineNumber, column: frame.columnNumber });
      if (originalPosition.source && originalPosition.line) {
        frame.fileName = resolve(dirname(frame.fileName), originalPosition.source);
        frame.lineNumber = originalPosition.line;
        frame.columnNumber = originalPosition.column || 0;
      }
    }
  }
  const contents = await readFile(frame.fileName, "utf8").catch(() => {
  });
  return contents ? { contents } : void 0;
}
function fmtFrame(frame) {
  if (frame.type === "native") {
    return frame.raw;
  }
  const src = `${frame.fileName || ""}:${frame.lineNumber}:${frame.columnNumber})`;
  return frame.functionName ? `at ${frame.functionName} (${src}` : `at ${src}`;
}

const errorHandlers = [errorHandler$0, errorHandler$1];

async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      await handler(error, event, { defaultHandler });
      if (event.handled) {
        return; // Response handled
      }
    } catch(error) {
      // Handler itself thrown, log and continue
      console.error(error);
    }
  }
  // H3 will handle fallback
}

const script = `
if (!window.__NUXT_DEVTOOLS_TIME_METRIC__) {
  Object.defineProperty(window, '__NUXT_DEVTOOLS_TIME_METRIC__', {
    value: {},
    enumerable: false,
    configurable: true,
  })
}
window.__NUXT_DEVTOOLS_TIME_METRIC__.appInit = Date.now()
`;

const _vX21GQEfjy11jInAV5QZ7HLWwQvDrsNr6vOeIcrCq44 = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

/*!
  * shared v11.2.8
  * (c) 2025 kazuya kawaguchi
  * Released under the MIT License.
  */
const _create = Object.create;
const create$2 = (obj = null) => _create(obj);
/* eslint-enable */
/**
 * Useful Utilities By Evan you
 * Modified by kazuya kawaguchi
 * MIT License
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
 * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
 */
const isArray = Array.isArray;
const isFunction = (val) => typeof val === 'function';
const isString = (val) => typeof val === 'string';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isObject = (val) => val !== null && typeof val === 'object';
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);

const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function deepCopy(src, des) {
    // src and des should both be objects, and none of them can be a array
    if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
        throw new Error('Invalid value');
    }
    const stack = [{ src, des }];
    while (stack.length) {
        const { src, des } = stack.pop();
        // using `Object.keys` which skips prototype properties
        Object.keys(src).forEach(key => {
            if (key === '__proto__') {
                return;
            }
            // if src[key] is an object/array, set des[key]
            // to empty object/array to prevent setting by reference
            if (isObject(src[key]) && !isObject(des[key])) {
                des[key] = Array.isArray(src[key]) ? [] : create$2();
            }
            if (isNotObjectOrIsArray(des[key]) || isNotObjectOrIsArray(src[key])) {
                // replace with src[key] when:
                // src[key] or des[key] is not an object, or
                // src[key] or des[key] is an array
                des[key] = src[key];
            }
            else {
                // src[key] and des[key] are both objects, merge them
                stack.push({ src: src[key], des: des[key] });
            }
        });
    }
}

const __nuxtMock = { runWithContext: async (fn) => await fn() };
const merger = createDefu((obj, key, value) => {
  if (key === "messages" || key === "datetimeFormats" || key === "numberFormats") {
    obj[key] ??= create$2(null);
    deepCopy(value, obj[key]);
    return true;
  }
});
async function loadVueI18nOptions(vueI18nConfigs) {
  const nuxtApp = __nuxtMock;
  let vueI18nOptions = { messages: create$2(null) };
  for (const configFile of vueI18nConfigs) {
    const resolver = await configFile().then((x) => x.default);
    const resolved = isFunction(resolver) ? await nuxtApp.runWithContext(() => resolver()) : resolver;
    vueI18nOptions = merger(create$2(null), resolved, vueI18nOptions);
  }
  vueI18nOptions.fallbackLocale ??= false;
  return vueI18nOptions;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
const isResolvedModule = (val) => isModule(val) || true;
async function getLocaleMessages(locale, loader) {
  const nuxtApp = __nuxtMock;
  try {
    const getter = await nuxtApp.runWithContext(loader.load).then((x) => isResolvedModule(x) ? x.default : x);
    return isFunction(getter) ? await nuxtApp.runWithContext(() => getter(locale)) : getter;
  } catch (e) {
    throw new Error(`Failed loading locale (${locale}): ` + e.message);
  }
}
async function getLocaleMessagesMerged(locale, loaders = []) {
  const nuxtApp = __nuxtMock;
  const messages = await Promise.all(
    loaders.map((loader) => nuxtApp.runWithContext(() => getLocaleMessages(locale, loader)))
  );
  const merged = {};
  for (const message of messages) {
    deepCopy(message, merged);
  }
  return merged;
}

// @ts-nocheck
const localeCodes =  [
  "en",
  "zh"
];
const localeLoaders = {
  en: [
    {
      key: "locale_en_46json_c2d77164",
      load: () => Promise.resolve().then(function () { return en; }),
      cache: true
    }
  ],
  zh: [
    {
      key: "locale_zh_46json_1bb1ddbe",
      load: () => Promise.resolve().then(function () { return zh; }),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "en",
    iso: "en-US",
    name: "English",
    language: undefined
  },
  {
    code: "zh",
    iso: "zh-CN",
    name: "中文",
    language: undefined
  }
];

const setupVueI18nOptions = async (defaultLocale) => {
  const options = await loadVueI18nOptions(vueI18nConfigs);
  options.locale = defaultLocale || options.locale || "en-US";
  options.defaultLocale = defaultLocale;
  options.fallbackLocale ??= false;
  options.messages ??= {};
  for (const locale of localeCodes) {
    options.messages[locale] ??= {};
  }
  return options;
};

function defineNitroPlugin(def) {
  return def;
}

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: void 0 };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const scheduledTasks = false;

const tasks = {
  
};

const __runningTasks__ = {};
async function runTask(name, {
  payload = {},
  context = {}
} = {}) {
  if (__runningTasks__[name]) {
    return __runningTasks__[name];
  }
  if (!(name in tasks)) {
    throw createError({
      message: `Task \`${name}\` is not available!`,
      statusCode: 404
    });
  }
  if (!tasks[name].resolve) {
    throw createError({
      message: `Task \`${name}\` is not implemented!`,
      statusCode: 501
    });
  }
  const handler = await tasks[name].resolve();
  const taskEvent = { name, payload, context };
  __runningTasks__[name] = handler.run(taskEvent);
  try {
    const res = await __runningTasks__[name];
    return res;
  } finally {
    delete __runningTasks__[name];
  }
}

function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function parseAcceptLanguage(value) {
  return value.split(",").map((tag) => tag.split(";")[0]).filter(
    (tag) => !(tag === "*" || tag === "")
  );
}
function createPathIndexLanguageParser(index = 0) {
  return (path) => {
    const rawPath = typeof path === "string" ? path : path.pathname;
    const normalizedPath = rawPath.split("?")[0];
    const parts = normalizedPath.split("/");
    if (parts[0] === "") {
      parts.shift();
    }
    return parts.length > index ? parts[index] || "" : "";
  };
}

function useRuntimeI18n(nuxtApp, event) {
  {
    return useRuntimeConfig(event).public.i18n;
  }
}
function useI18nDetection(nuxtApp) {
  const detectBrowserLanguage = useRuntimeI18n().detectBrowserLanguage;
  const detect = detectBrowserLanguage || {};
  return {
    ...detect,
    enabled: !!detectBrowserLanguage,
    cookieKey: detect.cookieKey || "i18n_redirected"
  };
}
function resolveRootRedirect(config) {
  if (!config) {
    return void 0;
  }
  return {
    path: "/" + (isString(config) ? config : config.path).replace(/^\//, ""),
    code: !isString(config) && config.statusCode || 302
  };
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}

function createLocaleConfigs(fallbackLocale) {
  const localeConfigs = {};
  for (const locale of localeCodes) {
    const fallbacks = getFallbackLocaleCodes(fallbackLocale, [locale]);
    const cacheable = isLocaleWithFallbacksCacheable(locale, fallbacks);
    localeConfigs[locale] = { fallbacks, cacheable };
  }
  return localeConfigs;
}
function getFallbackLocaleCodes(fallback, locales) {
  if (fallback === false) {
    return [];
  }
  if (isArray(fallback)) {
    return fallback;
  }
  let fallbackLocales = [];
  if (isString(fallback)) {
    if (locales.every((locale) => locale !== fallback)) {
      fallbackLocales.push(fallback);
    }
    return fallbackLocales;
  }
  const targets = [...locales, "default"];
  for (const locale of targets) {
    if (locale in fallback == false) {
      continue;
    }
    fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
  }
  return fallbackLocales;
}
function isLocaleCacheable(locale) {
  return localeLoaders[locale] != null && localeLoaders[locale].every((loader) => loader.cache !== false);
}
function isLocaleWithFallbacksCacheable(locale, fallbackLocales) {
  return isLocaleCacheable(locale) && fallbackLocales.every((fallbackLocale) => isLocaleCacheable(fallbackLocale));
}
function getDefaultLocaleForDomain(host) {
  return normalizedLocales.find((l) => !!l.defaultForDomains?.includes(host))?.code;
}
const isSupportedLocale = (locale) => localeCodes.includes(locale || "");

function useI18nContext(event) {
  if (event.context.nuxtI18n == null) {
    throw new Error("Nuxt I18n server context has not been set up yet.");
  }
  return event.context.nuxtI18n;
}
function tryUseI18nContext(event) {
  return event.context.nuxtI18n;
}
const getHost = (event) => getRequestURL(event, { xForwardedHost: true }).host;
async function initializeI18nContext(event) {
  const runtimeI18n = useRuntimeI18n(void 0, event);
  const defaultLocale = runtimeI18n.defaultLocale || "";
  const options = await setupVueI18nOptions(getDefaultLocaleForDomain(getHost(event)) || defaultLocale);
  const localeConfigs = createLocaleConfigs(options.fallbackLocale);
  const ctx = createI18nContext();
  ctx.vueI18nOptions = options;
  ctx.localeConfigs = localeConfigs;
  event.context.nuxtI18n = ctx;
  return ctx;
}
function createI18nContext() {
  return {
    messages: {},
    slp: {},
    localeConfigs: {},
    trackMap: {},
    vueI18nOptions: void 0,
    trackKey(key, locale) {
      this.trackMap[locale] ??= /* @__PURE__ */ new Set();
      this.trackMap[locale].add(key);
    }
  };
}

function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
  const matchedLocales = matchBrowserLocale(
    locales.map((l) => ({ code: l.code, language: l.language || l.code })),
    browserLocales
  );
  return matchedLocales.sort(compareBrowserLocale).at(0)?.code ?? "";
}

const appHead = {"meta":[{"name":"viewport","content":"width=device-width, initial-scale=1"},{"charset":"utf-8"}],"link":[],"style":[],"script":[],"noscript":[]};

const appRootTag = "div";

const appRootAttrs = {"id":"__nuxt"};

const appTeleportTag = "div";

const appTeleportAttrs = {"id":"teleports"};

const appSpaLoaderTag = "div";

const appSpaLoaderAttrs = {"id":"__nuxt-loader"};

const appId = "nuxt-app";

const separator = "___";
const pathLanguageParser = createPathIndexLanguageParser(0);
const getLocaleFromRoutePath = (path) => pathLanguageParser(path);
const getLocaleFromRouteName = (name) => name.split(separator).at(1) ?? "";
function normalizeInput(input) {
  return typeof input !== "object" ? String(input) : String(input?.name || input?.path || "");
}
function getLocaleFromRoute(route) {
  const input = normalizeInput(route);
  return input[0] === "/" ? getLocaleFromRoutePath(input) : getLocaleFromRouteName(input);
}

function matchDomainLocale(locales, host, pathLocale) {
  const normalizeDomain = (domain = "") => domain.replace(/https?:\/\//, "");
  const matches = locales.filter(
    (locale) => normalizeDomain(locale.domain) === host || toArray(locale.domains).includes(host)
  );
  if (matches.length <= 1) {
    return matches[0]?.code;
  }
  return (
    // match by current path locale
    matches.find((l) => l.code === pathLocale)?.code || matches.find((l) => l.defaultForDomains?.includes(host) ?? l.domainDefault)?.code
  );
}

const getCookieLocale = (event, cookieName) => (getCookie(event, cookieName)) || void 0;
const getRouteLocale = (event, route) => getLocaleFromRoute(route);
const getHeaderLocale = (event) => findBrowserLocale(normalizedLocales, parseAcceptLanguage(getRequestHeader(event, "accept-language") || ""));
const getHostLocale = (event, path, domainLocales) => {
  const host = getRequestURL(event, { xForwardedHost: true }).host;
  const locales = normalizedLocales.map((l) => ({
    ...l,
    domain: domainLocales[l.code]?.domain ?? l.domain
  }));
  return matchDomainLocale(locales, host, getLocaleFromRoutePath(path));
};
const useDetectors = (event, config, nuxtApp) => {
  if (!event) {
    throw new Error("H3Event is required for server-side locale detection");
  }
  const runtimeI18n = useRuntimeI18n();
  return {
    cookie: () => getCookieLocale(event, config.cookieKey),
    header: () => getHeaderLocale(event) ,
    navigator: () => void 0,
    host: (path) => getHostLocale(event, path, runtimeI18n.domainLocales),
    route: (path) => getRouteLocale(event, path)
  };
};

// Generated by @nuxtjs/i18n
const pathToI18nConfig = {};
const i18nPathToPath = {};

const matcher = createRouterMatcher([], {});
for (const path of Object.keys(i18nPathToPath)) {
  matcher.addRoute({ path, component: () => "", meta: {} });
}
const getI18nPathToI18nPath = (path, locale) => {
  if (!path || !locale) {
    return;
  }
  const plainPath = i18nPathToPath[path];
  const i18nConfig = pathToI18nConfig[plainPath];
  if (i18nConfig && i18nConfig[locale]) {
    return i18nConfig[locale] === true ? plainPath : i18nConfig[locale];
  }
};
function isExistingNuxtRoute(path) {
  if (path === "") {
    return;
  }
  if (path.endsWith("/__nuxt_error")) {
    return;
  }
  const resolvedMatch = matcher.resolve({ path }, { path: "/", name: "", matched: [], params: {}, meta: {} });
  return resolvedMatch.matched.length > 0 ? resolvedMatch : void 0;
}
function matchLocalized(path, locale, defaultLocale) {
  if (path === "") {
    return;
  }
  const parsed = parsePath(path);
  const resolvedMatch = matcher.resolve(
    { path: parsed.pathname || "/" },
    { path: "/", name: "", matched: [], params: {}, meta: {} }
  );
  if (resolvedMatch.matched.length > 0) {
    const alternate = getI18nPathToI18nPath(resolvedMatch.matched[0].path, locale);
    const match = matcher.resolve(
      { params: resolvedMatch.params },
      { path: alternate || "/", name: "", matched: [], params: {}, meta: {} }
    );
    return withLeadingSlash(joinURL("", match.path));
  }
}

function* detect(detectors, detection, path) {
  if (detection.enabled) {
    yield { locale: detectors.cookie(), source: "cookie" };
    yield { locale: detectors.header(), source: "header" };
  }
  yield { locale: detection.fallbackLocale, source: "fallback" };
}
const _tNrzlLCJ6ZMgCilQ6g2ZUCFOLX53UtVtnIfu21y_d8 = defineNitroPlugin(async (nitro) => {
  const runtimeI18n = useRuntimeI18n();
  const rootRedirect = resolveRootRedirect(runtimeI18n.rootRedirect);
  runtimeI18n.defaultLocale || "";
  try {
    const cacheStorage = useStorage("cache");
    const cachedKeys = await cacheStorage.getKeys("nitro:handlers:i18n");
    await Promise.all(cachedKeys.map((key) => cacheStorage.removeItem(key)));
  } catch {
  }
  const detection = useI18nDetection();
  const cookieOptions = {
    path: "/",
    domain: detection.cookieDomain || void 0,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: detection.cookieSecure
  };
  const createBaseUrlGetter = () => {
    isFunction(runtimeI18n.baseUrl) ? "" : runtimeI18n.baseUrl || "";
    if (isFunction(runtimeI18n.baseUrl)) {
      console.warn("[nuxt-i18n] Configuring baseUrl as a function is deprecated and will be removed in v11.");
      return () => "";
    }
    return (event, defaultLocale) => {
      return "";
    };
  };
  function resolveRedirectPath(event, path, pathLocale, defaultLocale, detector) {
    let locale = "";
    for (const detected of detect(detector, detection, event.path)) {
      if (detected.locale && isSupportedLocale(detected.locale)) {
        locale = detected.locale;
        break;
      }
    }
    locale ||= defaultLocale;
    function getLocalizedMatch(locale2) {
      const res = matchLocalized(path || "/", locale2);
      if (res && res !== event.path) {
        return res;
      }
    }
    let resolvedPath = void 0;
    let redirectCode = 302;
    const requestURL = getRequestURL(event);
    if (rootRedirect && requestURL.pathname === "/") {
      locale = detection.enabled && locale || defaultLocale;
      resolvedPath = isSupportedLocale(detector.route(rootRedirect.path)) && rootRedirect.path || matchLocalized(rootRedirect.path, locale);
      redirectCode = rootRedirect.code;
    } else if (runtimeI18n.redirectStatusCode) {
      redirectCode = runtimeI18n.redirectStatusCode;
    }
    switch (detection.redirectOn) {
      case "root":
        if (requestURL.pathname !== "/") {
          break;
        }
      // fallthrough (root has no prefix)
      case "no prefix":
        if (pathLocale) {
          break;
        }
      // fallthrough to resolve
      case "all":
        resolvedPath ??= getLocalizedMatch(locale);
        break;
    }
    if (requestURL.pathname === "/" && "no_prefix" === "prefix") ;
    return { path: resolvedPath, code: redirectCode, locale };
  }
  const baseUrlGetter = createBaseUrlGetter();
  nitro.hooks.hook("request", async (event) => {
    await initializeI18nContext(event);
  });
  nitro.hooks.hook("render:before", async ({ event }) => {
    const ctx = useI18nContext(event);
    const url = getRequestURL(event);
    const detector = useDetectors(event, detection);
    const localeSegment = detector.route(event.path);
    const pathLocale = isSupportedLocale(localeSegment) && localeSegment || void 0;
    const path = (pathLocale && url.pathname.slice(pathLocale.length + 1)) ?? url.pathname;
    if (!url.pathname.includes("/_i18n/p806Zz2H") && !isExistingNuxtRoute(path)) {
      return;
    }
    const resolved = resolveRedirectPath(event, path, pathLocale, ctx.vueI18nOptions.defaultLocale, detector);
    if (resolved.path && resolved.path !== url.pathname) {
      ctx.detectLocale = resolved.locale;
      detection.useCookie && setCookie(event, detection.cookieKey, resolved.locale, cookieOptions);
      await sendRedirect(
        event,
        joinURL(baseUrlGetter(event, ctx.vueI18nOptions.defaultLocale), resolved.path + url.search),
        resolved.code
      );
      return;
    }
  });
  nitro.hooks.hook("render:html", (htmlContext, { event }) => {
    tryUseI18nContext(event);
  });
});

const rootDir = "/workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend";

const devReducers = {
  VNode: (data) => isVNode(data) ? { type: data.type, props: data.props } : void 0,
  URL: (data) => data instanceof URL ? data.toString() : void 0
};
const asyncContext = getContext("nuxt-dev", { asyncContext: true, AsyncLocalStorage });
const _hBe9gg8mqkXi7XjtLiteBbcPjR5e4bYtLigTbm3Teg = (nitroApp) => {
  const handler = nitroApp.h3App.handler;
  nitroApp.h3App.handler = (event) => {
    return asyncContext.callAsync({ logs: [], event }, () => handler(event));
  };
  onConsoleLog((_log) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    const rawStack = captureRawStackTrace();
    if (!rawStack || rawStack.includes("runtime/vite-node.mjs")) {
      return;
    }
    const trace = [];
    let filename = "";
    for (const entry of parseRawStackTrace(rawStack)) {
      if (entry.source === globalThis._importMeta_.url) {
        continue;
      }
      if (EXCLUDE_TRACE_RE.test(entry.source)) {
        continue;
      }
      filename ||= entry.source.replace(withTrailingSlash(rootDir), "");
      trace.push({
        ...entry,
        source: entry.source.startsWith("file://") ? entry.source.replace("file://", "") : entry.source
      });
    }
    const log = {
      ..._log,
      // Pass along filename to allow the client to display more info about where log comes from
      filename,
      // Clean up file names in stack trace
      stack: trace
    };
    ctx.logs.push(log);
  });
  nitroApp.hooks.hook("afterResponse", () => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    return nitroApp.hooks.callHook("dev:ssr-logs", { logs: ctx.logs, path: ctx.event.path });
  });
  nitroApp.hooks.hook("render:html", (htmlContext) => {
    const ctx = asyncContext.tryUse();
    if (!ctx) {
      return;
    }
    try {
      const reducers = Object.assign(/* @__PURE__ */ Object.create(null), devReducers, ctx.event.context._payloadReducers);
      htmlContext.bodyAppend.unshift(`<script type="application/json" data-nuxt-logs="${appId}">${stringify(ctx.logs, reducers)}<\/script>`);
    } catch (e) {
      const shortError = e instanceof Error && "toString" in e ? ` Received \`${e.toString()}\`.` : "";
      console.warn(`[nuxt] Failed to stringify dev server logs.${shortError} You can define your own reducer/reviver for rich types following the instructions in https://nuxt.com/docs/4.x/api/composables/use-nuxt-app#payload.`);
    }
  });
};
const EXCLUDE_TRACE_RE = /\/node_modules\/(?:.*\/)?(?:nuxt|nuxt-nightly|nuxt-edge|nuxt3|consola|@vue)\/|core\/runtime\/nitro/;
function onConsoleLog(callback) {
  consola$1.addReporter({
    log(logObj) {
      callback(logObj);
    }
  });
  consola$1.wrapConsole();
}

const plugins = [
  _vX21GQEfjy11jInAV5QZ7HLWwQvDrsNr6vOeIcrCq44,
_tNrzlLCJ6ZMgCilQ6g2ZUCFOLX53UtVtnIfu21y_d8,
_hBe9gg8mqkXi7XjtLiteBbcPjR5e4bYtLigTbm3Teg
];

const assets = {
  "/index.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3484c-C9RVTtZZD8ShaHJiOxTYap7KVFg\"",
    "mtime": "2026-04-28T17:12:54.452Z",
    "size": 215116,
    "path": "index.mjs"
  },
  "/index.mjs.map": {
    "type": "application/json",
    "etag": "\"6f153-7SJD4oT7GH1/SlIDnBIn2l3VlWs\"",
    "mtime": "2026-04-28T17:12:54.452Z",
    "size": 454995,
    "path": "index.mjs.map"
  }
};

function readAsset (id) {
  const serverDir = dirname$1(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve$1(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _WTxeSu = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({ statusCode: 404 });
    }
    return;
  }
  if (asset.encoding !== void 0) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const VueResolver = (_, value) => {
  return isRef(value) ? toValue(value) : value;
};

const headSymbol = "usehead";
// @__NO_SIDE_EFFECTS__
function vueInstall(head) {
  const plugin = {
    install(app) {
      app.config.globalProperties.$unhead = head;
      app.config.globalProperties.$head = head;
      app.provide(headSymbol, head);
    }
  };
  return plugin.install;
}

// @__NO_SIDE_EFFECTS__
function resolveUnrefHeadInput(input) {
  return walkResolver(input, VueResolver);
}

// @__NO_SIDE_EFFECTS__
function createHead(options = {}) {
  const head = createHead$1({
    ...options,
    propResolvers: [VueResolver]
  });
  head.install = vueInstall(head);
  return head;
}

const unheadOptions = {
  disableDefaults: true,
};

function createSSRContext(event) {
  const ssrContext = {
    url: event.path,
    event,
    runtimeConfig: useRuntimeConfig(event),
    noSSR: true,
    head: createHead(unheadOptions),
    error: false,
    nuxt: void 0,
    /* NuxtApp */
    payload: {},
    _payloadReducers: /* @__PURE__ */ Object.create(null),
    modules: /* @__PURE__ */ new Set()
  };
  return ssrContext;
}
function setSSRError(ssrContext, error) {
  ssrContext.error = true;
  ssrContext.payload = { error };
  ssrContext.url = error.url;
}

const APP_ROOT_OPEN_TAG = `<${appRootTag}${propsToString(appRootAttrs)}>`;
const APP_ROOT_CLOSE_TAG = `</${appRootTag}>`;
const getServerEntry = () => Promise.resolve().then(function () { return server$1; }).then((r) => r.default || r);
const getClientManifest = () => import('file:///workspaces/To-Link-Report-Use/neighbourHood-master/neighbourHood-frontend/.nuxt//dist/server/client.manifest.mjs').then((r) => r.default || r).then((r) => typeof r === "function" ? r() : r);
const getSSRRenderer = lazyCachedFunction(async () => {
  const createSSRApp = await getServerEntry();
  if (!createSSRApp) {
    throw new Error("Server bundle is not available");
  }
  const precomputed = void 0 ;
  const renderer = createRenderer(createSSRApp, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: renderToString$1,
    buildAssetsURL
  });
  async function renderToString$1(input, context) {
    const html = await renderToString(input, context);
    if (process$1.env.NUXT_VITE_NODE_OPTIONS) {
      renderer.rendererContext.updateManifest(await getClientManifest());
    }
    return APP_ROOT_OPEN_TAG + html + APP_ROOT_CLOSE_TAG;
  }
  return renderer;
});
const getSPARenderer = lazyCachedFunction(async () => {
  const precomputed = void 0 ;
  const spaTemplate = await Promise.resolve().then(function () { return _virtual__spaTemplate; }).then((r) => r.template).catch(() => "").then((r) => {
    {
      const APP_SPA_LOADER_OPEN_TAG = `<${appSpaLoaderTag}${propsToString(appSpaLoaderAttrs)}>`;
      const APP_SPA_LOADER_CLOSE_TAG = `</${appSpaLoaderTag}>`;
      const appTemplate = APP_ROOT_OPEN_TAG + APP_ROOT_CLOSE_TAG;
      const loaderTemplate = r ? APP_SPA_LOADER_OPEN_TAG + r + APP_SPA_LOADER_CLOSE_TAG : "";
      return appTemplate + loaderTemplate;
    }
  });
  const renderer = createRenderer(() => () => {
  }, {
    precomputed,
    manifest: await getClientManifest() ,
    renderToString: () => spaTemplate,
    buildAssetsURL
  });
  const result = await renderer.renderToString({});
  const renderToString = (ssrContext) => {
    const config = useRuntimeConfig(ssrContext.event);
    ssrContext.modules ||= /* @__PURE__ */ new Set();
    ssrContext.payload.serverRendered = false;
    ssrContext.config = {
      public: config.public,
      app: config.app
    };
    return Promise.resolve(result);
  };
  return {
    rendererContext: renderer.rendererContext,
    renderToString
  };
});
function lazyCachedFunction(fn) {
  let res = null;
  return () => {
    if (res === null) {
      res = fn().catch((err) => {
        res = null;
        throw err;
      });
    }
    return res;
  };
}
function getRenderer(ssrContext) {
  return getSPARenderer() ;
}
const getSSRStyles = lazyCachedFunction(() => Promise.resolve().then(function () { return styles$1; }).then((r) => r.default || r));

async function renderInlineStyles(usedModules) {
  const styleMap = await getSSRStyles();
  const inlinedStyles = /* @__PURE__ */ new Set();
  for (const mod of usedModules) {
    if (mod in styleMap && styleMap[mod]) {
      for (const style of await styleMap[mod]()) {
        inlinedStyles.add(style);
      }
    }
  }
  return Array.from(inlinedStyles).map((style) => ({ innerHTML: style }));
}

const ROOT_NODE_REGEX = new RegExp(`^<${appRootTag}[^>]*>([\\s\\S]*)<\\/${appRootTag}>$`);
function getServerComponentHTML(body) {
  const match = body.match(ROOT_NODE_REGEX);
  return match?.[1] || body;
}
const SSR_SLOT_TELEPORT_MARKER = /^uid=([^;]*);slot=(.*)$/;
const SSR_CLIENT_TELEPORT_MARKER = /^uid=([^;]*);client=(.*)$/;
const SSR_CLIENT_SLOT_MARKER = /^island-slot=([^;]*);(.*)$/;
function getSlotIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.slots).length) {
    return void 0;
  }
  const response = {};
  for (const [name, slot] of Object.entries(ssrContext.islandContext.slots)) {
    response[name] = {
      ...slot,
      fallback: ssrContext.teleports?.[`island-fallback=${name}`]
    };
  }
  return response;
}
function getClientIslandResponse(ssrContext) {
  if (!ssrContext.islandContext || !Object.keys(ssrContext.islandContext.components).length) {
    return void 0;
  }
  const response = {};
  for (const [clientUid, component] of Object.entries(ssrContext.islandContext.components)) {
    const html = ssrContext.teleports?.[clientUid]?.replaceAll("<!--teleport start anchor-->", "") || "";
    response[clientUid] = {
      ...component,
      html,
      slots: getComponentSlotTeleport(clientUid, ssrContext.teleports ?? {})
    };
  }
  return response;
}
function getComponentSlotTeleport(clientUid, teleports) {
  const entries = Object.entries(teleports);
  const slots = {};
  for (const [key, value] of entries) {
    const match = key.match(SSR_CLIENT_SLOT_MARKER);
    if (match) {
      const [, id, slot] = match;
      if (!slot || clientUid !== id) {
        continue;
      }
      slots[slot] = value;
    }
  }
  return slots;
}
function replaceIslandTeleports(ssrContext, html) {
  const { teleports, islandContext } = ssrContext;
  if (islandContext || !teleports) {
    return html;
  }
  for (const key in teleports) {
    const matchClientComp = key.match(SSR_CLIENT_TELEPORT_MARKER);
    if (matchClientComp) {
      const [, uid, clientId] = matchClientComp;
      if (!uid || !clientId) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-component="${clientId}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
      continue;
    }
    const matchSlot = key.match(SSR_SLOT_TELEPORT_MARKER);
    if (matchSlot) {
      const [, uid, slot] = matchSlot;
      if (!uid || !slot) {
        continue;
      }
      html = html.replace(new RegExp(` data-island-uid="${uid}" data-island-slot="${slot}"[^>]*>`), (full) => {
        return full + teleports[key];
      });
    }
  }
  return html;
}

const ISLAND_SUFFIX_RE = /\.json(?:\?.*)?$/;
const _SxA8c9 = defineEventHandler(async (event) => {
  const nitroApp = useNitroApp();
  setResponseHeaders(event, {
    "content-type": "application/json;charset=utf-8",
    "x-powered-by": "Nuxt"
  });
  const islandContext = await getIslandContext(event);
  const ssrContext = {
    ...createSSRContext(event),
    islandContext,
    noSSR: false,
    url: islandContext.url
  };
  const renderer = await getSSRRenderer();
  const renderResult = await renderer.renderToString(ssrContext).catch(async (err) => {
    await ssrContext.nuxt?.hooks.callHook("app:error", err);
    throw err;
  });
  if (ssrContext.payload?.error) {
    throw ssrContext.payload.error;
  }
  const inlinedStyles = await renderInlineStyles(ssrContext.modules ?? []);
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult });
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  {
    const { styles } = getRequestDependencies(ssrContext, renderer.rendererContext);
    const link = [];
    for (const resource of Object.values(styles)) {
      if ("inline" in getQuery(resource.file)) {
        continue;
      }
      if (resource.file.includes("scoped") && !resource.file.includes("pages/")) {
        link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
      }
    }
    if (link.length) {
      ssrContext.head.push({ link }, { mode: "server" });
    }
  }
  const islandHead = {};
  for (const entry of ssrContext.head.entries.values()) {
    for (const [key, value] of Object.entries(resolveUnrefHeadInput(entry.input))) {
      const currentValue = islandHead[key];
      if (Array.isArray(currentValue)) {
        currentValue.push(...value);
      }
      islandHead[key] = value;
    }
  }
  const islandResponse = {
    id: islandContext.id,
    head: islandHead,
    html: getServerComponentHTML(renderResult.html),
    components: getClientIslandResponse(ssrContext),
    slots: getSlotIslandResponse(ssrContext)
  };
  await nitroApp.hooks.callHook("render:island", islandResponse, { event, islandContext });
  return islandResponse;
});
async function getIslandContext(event) {
  let url = event.path || "";
  const componentParts = url.substring("/__nuxt_island".length + 1).replace(ISLAND_SUFFIX_RE, "").split("_");
  const hashId = componentParts.length > 1 ? componentParts.pop() : void 0;
  const componentName = componentParts.join("_");
  const context = event.method === "GET" ? getQuery$1(event) : await readBody(event);
  const ctx = {
    url: "/",
    ...context,
    id: hashId,
    name: componentName,
    props: destr$1(context.props) || {},
    slots: {},
    components: {}
  };
  return ctx;
}

const storage = prefixStorage(useStorage(), "i18n");
function cachedFunctionI18n(fn, opts) {
  opts = { maxAge: 1, ...opts };
  const pending = {};
  async function get(key, resolver) {
    const isPending = pending[key];
    if (!isPending) {
      pending[key] = Promise.resolve(resolver());
    }
    try {
      return await pending[key];
    } finally {
      delete pending[key];
    }
  }
  return async (...args) => {
    const key = [opts.name, opts.getKey(...args)].join(":").replace(/:\/$/, ":index");
    const maxAge = opts.maxAge ?? 1;
    const isCacheable = !opts.shouldBypassCache(...args) && maxAge >= 0;
    const cache = isCacheable && await storage.getItemRaw(key);
    if (!cache || cache.ttl < Date.now()) {
      pending[key] = Promise.resolve(fn(...args));
      const value = await get(key, () => fn(...args));
      if (isCacheable) {
        await storage.setItemRaw(key, { ttl: Date.now() + maxAge * 1e3, value, mtime: Date.now() });
      }
      return value;
    }
    return cache.value;
  };
}

const _getMessages = async (locale) => {
  return { [locale]: await getLocaleMessagesMerged(locale, localeLoaders[locale]) };
};
cachedFunctionI18n(_getMessages, {
  name: "messages",
  maxAge: -1 ,
  getKey: (locale) => locale,
  shouldBypassCache: (locale) => !isLocaleCacheable(locale)
});
const getMessages = _getMessages ;
const _getMergedMessages = async (locale, fallbackLocales) => {
  const merged = {};
  try {
    if (fallbackLocales.length > 0) {
      const messages = await Promise.all(fallbackLocales.map(getMessages));
      for (const message2 of messages) {
        deepCopy(message2, merged);
      }
    }
    const message = await getMessages(locale);
    deepCopy(message, merged);
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message);
  }
};
const getMergedMessages = cachedFunctionI18n(_getMergedMessages, {
  name: "merged-single",
  maxAge: -1 ,
  getKey: (locale, fallbackLocales) => `${locale}-[${[...new Set(fallbackLocales)].sort().join("-")}]`,
  shouldBypassCache: (locale, fallbackLocales) => !isLocaleWithFallbacksCacheable(locale, fallbackLocales)
});
const _getAllMergedMessages = async (locales) => {
  const merged = {};
  try {
    const messages = await Promise.all(locales.map(getMessages));
    for (const message of messages) {
      deepCopy(message, merged);
    }
    return merged;
  } catch (e) {
    throw new Error("Failed to merge messages: " + e.message);
  }
};
cachedFunctionI18n(_getAllMergedMessages, {
  name: "merged-all",
  maxAge: -1 ,
  getKey: (locales) => locales.join("-"),
  shouldBypassCache: (locales) => !locales.every((locale) => isLocaleCacheable(locale))
});

const _messagesHandler = defineEventHandler(async (event) => {
  const locale = getRouterParam(event, "locale");
  if (!locale) {
    throw createError({ status: 400, message: "Locale not specified." });
  }
  const ctx = useI18nContext(event);
  if (ctx.localeConfigs && locale in ctx.localeConfigs === false) {
    throw createError({ status: 404, message: `Locale '${locale}' not found.` });
  }
  const messages = await getMergedMessages(locale, ctx.localeConfigs?.[locale]?.fallbacks ?? []);
  deepCopy(messages, ctx.messages);
  return ctx.messages;
});
const _cachedMessageLoader = defineCachedFunction(_messagesHandler, {
  name: "i18n:messages-internal",
  maxAge: -1 ,
  getKey: (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-"),
  async shouldBypassCache(event) {
    const locale = getRouterParam(event, "locale");
    if (locale == null) {
      return false;
    }
    const ctx = tryUseI18nContext(event) || await initializeI18nContext(event);
    return !ctx.localeConfigs?.[locale]?.cacheable;
  }
});
defineCachedEventHandler(_cachedMessageLoader, {
  name: "i18n:messages",
  maxAge: -1 ,
  swr: false,
  getKey: (event) => [getRouterParam(event, "locale") ?? "null", getRouterParam(event, "hash") ?? "null"].join("-")
});
const _Lc4srL = _messagesHandler ;

const _lazy_E8p_Lr = () => Promise.resolve().then(function () { return aiAssistant_post$1; });
const _lazy_jhc5n0 = () => Promise.resolve().then(function () { return weather_get$1; });
const _lazy_phWIhr = () => Promise.resolve().then(function () { return renderer$1; });

const handlers = [
  { route: '', handler: _WTxeSu, lazy: false, middleware: true, method: undefined },
  { route: '/api/ai-assistant', handler: _lazy_E8p_Lr, lazy: true, middleware: false, method: "post" },
  { route: '/api/weather', handler: _lazy_jhc5n0, lazy: true, middleware: false, method: "get" },
  { route: '/__nuxt_error', handler: _lazy_phWIhr, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_island/**', handler: _SxA8c9, lazy: false, middleware: false, method: undefined },
  { route: '/_i18n/:hash/:locale/messages.json', handler: _Lc4srL, lazy: false, middleware: false, method: undefined },
  { route: '/**', handler: _lazy_phWIhr, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(true),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const fetchContext = event.node.req?.__unenv__;
      if (fetchContext?._platform) {
        event.context = {
          _platform: fetchContext?._platform,
          // #3335
          ...fetchContext._platform,
          ...event.context
        };
      }
      if (!event.context.waitUntil && fetchContext?.waitUntil) {
        event.context.waitUntil = fetchContext.waitUntil;
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (event.context.waitUntil) {
          event.context.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const nodeHandler = toNodeListener(h3App);
  const localCall = (aRequest) => callNodeRequestHandler(
    nodeHandler,
    aRequest
  );
  const localFetch = (input, init) => {
    if (!input.toString().startsWith("/")) {
      return globalThis.fetch(input, init);
    }
    return fetchNodeRequestHandler(
      nodeHandler,
      input,
      init
    ).then((response) => normalizeFetchResponse(response));
  };
  const $fetch = createFetch({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

if (!globalThis.crypto) {
  globalThis.crypto = nodeCrypto.webcrypto;
}
const { NITRO_NO_UNIX_SOCKET, NITRO_DEV_WORKER_ID } = process.env;
trapUnhandledNodeErrors();
parentPort?.on("message", (msg) => {
  if (msg && msg.event === "shutdown") {
    shutdown();
  }
});
const nitroApp = useNitroApp();
const server$2 = new Server(toNodeListener(nitroApp.h3App));
let listener;
listen().catch(() => listen(
  true
  /* use random port */
)).catch((error) => {
  console.error("Dev worker failed to listen:", error);
  return shutdown();
});
nitroApp.router.get(
  "/_nitro/tasks",
  defineEventHandler(async (event) => {
    const _tasks = await Promise.all(
      Object.entries(tasks).map(async ([name, task]) => {
        const _task = await task.resolve?.();
        return [name, { description: _task?.meta?.description }];
      })
    );
    return {
      tasks: Object.fromEntries(_tasks),
      scheduledTasks
    };
  })
);
nitroApp.router.use(
  "/_nitro/tasks/:name",
  defineEventHandler(async (event) => {
    const name = getRouterParam(event, "name");
    const payload = {
      ...getQuery$1(event),
      ...await readBody(event).then((r) => r?.payload).catch(() => ({}))
    };
    return await runTask(name, { payload });
  })
);
function listen(useRandomPort = Boolean(
  NITRO_NO_UNIX_SOCKET || process.versions.webcontainer || "Bun" in globalThis && process.platform === "win32"
)) {
  return new Promise((resolve, reject) => {
    try {
      listener = server$2.listen(useRandomPort ? 0 : getSocketAddress(), () => {
        const address = server$2.address();
        parentPort?.postMessage({
          event: "listen",
          address: typeof address === "string" ? { socketPath: address } : { host: "localhost", port: address?.port }
        });
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
function getSocketAddress() {
  const socketName = `nitro-worker-${process.pid}-${threadId}-${NITRO_DEV_WORKER_ID}-${Math.round(Math.random() * 1e4)}.sock`;
  if (process.platform === "win32") {
    return join(String.raw`\\.\pipe`, socketName);
  }
  if (process.platform === "linux") {
    const nodeMajor = Number.parseInt(process.versions.node.split(".")[0], 10);
    if (nodeMajor >= 20) {
      return `\0${socketName}`;
    }
  }
  return join(tmpdir(), socketName);
}
async function shutdown() {
  server$2.closeAllConnections?.();
  await Promise.all([
    new Promise((resolve) => listener?.close(resolve)),
    nitroApp.hooks.callHook("close").catch(console.error)
  ]);
  parentPort?.postMessage({ event: "exit" });
}

const _messages = { "appName": "Nuxt", "statusCode": 500, "statusMessage": "Internal server error", "description": "This page is temporarily unavailable.", "refresh": "Refresh this page" };
const template$1 = (messages) => {
  messages = { ..._messages, ...messages };
  return '<!DOCTYPE html><html lang="en"><head><title>' + escapeHtml(messages.statusCode) + " - " + escapeHtml(messages.statusMessage) + " | " + escapeHtml(messages.appName) + `</title><meta charset="utf-8"><meta content="width=device-width,initial-scale=1.0,minimum-scale=1.0" name="viewport"><script>!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if("childList"===o.type)for(const e of o.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&r(e)}).observe(document,{childList:!0,subtree:!0})}function r(e){if(e.ep)return;e.ep=!0;const r=function(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?r.credentials="include":"anonymous"===e.crossOrigin?r.credentials="omit":r.credentials="same-origin",r}(e);fetch(e.href,r)}}();<\/script><style>*,:after,:before{border-color:var(--un-default-border-color,#e5e7eb);border-style:solid;border-width:0;box-sizing:border-box}:after,:before{--un-content:""}html{line-height:1.5;-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-feature-settings:normal;font-variation-settings:normal;-moz-tab-size:4;tab-size:4;-webkit-tap-highlight-color:transparent}body{line-height:inherit;margin:0}h1,h2{font-size:inherit;font-weight:inherit}h1,h2,p{margin:0}*,:after,:before{--un-rotate:0;--un-rotate-x:0;--un-rotate-y:0;--un-rotate-z:0;--un-scale-x:1;--un-scale-y:1;--un-scale-z:1;--un-skew-x:0;--un-skew-y:0;--un-translate-x:0;--un-translate-y:0;--un-translate-z:0;--un-pan-x: ;--un-pan-y: ;--un-pinch-zoom: ;--un-scroll-snap-strictness:proximity;--un-ordinal: ;--un-slashed-zero: ;--un-numeric-figure: ;--un-numeric-spacing: ;--un-numeric-fraction: ;--un-border-spacing-x:0;--un-border-spacing-y:0;--un-ring-offset-shadow:0 0 transparent;--un-ring-shadow:0 0 transparent;--un-shadow-inset: ;--un-shadow:0 0 transparent;--un-ring-inset: ;--un-ring-offset-width:0px;--un-ring-offset-color:#fff;--un-ring-width:0px;--un-ring-color:rgba(147,197,253,.5);--un-blur: ;--un-brightness: ;--un-contrast: ;--un-drop-shadow: ;--un-grayscale: ;--un-hue-rotate: ;--un-invert: ;--un-saturate: ;--un-sepia: ;--un-backdrop-blur: ;--un-backdrop-brightness: ;--un-backdrop-contrast: ;--un-backdrop-grayscale: ;--un-backdrop-hue-rotate: ;--un-backdrop-invert: ;--un-backdrop-opacity: ;--un-backdrop-saturate: ;--un-backdrop-sepia: }.grid{display:grid}.mb-2{margin-bottom:.5rem}.mb-4{margin-bottom:1rem}.max-w-520px{max-width:520px}.min-h-screen{min-height:100vh}.place-content-center{place-content:center}.overflow-hidden{overflow:hidden}.bg-white{--un-bg-opacity:1;background-color:rgb(255 255 255/var(--un-bg-opacity))}.px-2{padding-left:.5rem;padding-right:.5rem}.text-center{text-align:center}.text-\\[80px\\]{font-size:80px}.text-2xl{font-size:1.5rem;line-height:2rem}.text-\\[\\#020420\\]{--un-text-opacity:1;color:rgb(2 4 32/var(--un-text-opacity))}.text-\\[\\#64748B\\]{--un-text-opacity:1;color:rgb(100 116 139/var(--un-text-opacity))}.font-semibold{font-weight:600}.leading-none{line-height:1}.tracking-wide{letter-spacing:.025em}.font-sans{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji}.tabular-nums{--un-numeric-spacing:tabular-nums;font-variant-numeric:var(--un-ordinal) var(--un-slashed-zero) var(--un-numeric-figure) var(--un-numeric-spacing) var(--un-numeric-fraction)}.antialiased{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media(prefers-color-scheme:dark){.dark\\:bg-\\[\\#020420\\]{--un-bg-opacity:1;background-color:rgb(2 4 32/var(--un-bg-opacity))}.dark\\:text-white{--un-text-opacity:1;color:rgb(255 255 255/var(--un-text-opacity))}}@media(min-width:640px){.sm\\:text-\\[110px\\]{font-size:110px}.sm\\:text-3xl{font-size:1.875rem;line-height:2.25rem}}</style></head><body class="antialiased bg-white dark:bg-[#020420] dark:text-white font-sans grid min-h-screen overflow-hidden place-content-center text-[#020420] tracking-wide"><div class="max-w-520px text-center"><h1 class="font-semibold leading-none mb-4 sm:text-[110px] tabular-nums text-[80px]">` + escapeHtml(messages.statusCode) + '</h1><h2 class="font-semibold mb-2 sm:text-3xl text-2xl">' + escapeHtml(messages.statusMessage) + '</h2><p class="mb-4 px-2 text-[#64748B] text-md">' + escapeHtml(messages.description) + "</p></div></body></html>";
};

const error500 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template$1
}, Symbol.toStringTag, { value: 'Module' }));

var neighbourHood$1 = "To-Link";
var login$1 = "Log In";
var loggingIn$1 = "Logging in...";
var loginTitle$1 = "Welcome Back";
var loginSubtitle$1 = "Log In To Continue";
var email$1 = "Email:";
var password$1 = "Password:";
var emailPlaceholder$1 = "Please Enter Email";
var passwordPlaceholder$1 = "Please Enter Password";
var rememberMe$1 = "Remember me";
var brandTitle$1 = "To-Link";
var brandDescription$1 = "Connect with your community";
var appName$1 = "To-Link";
var searchPosts$1 = "Search posts...";
var loadingPosts$1 = "Loading posts...";
var profile$1 = "Profile";
var settings$1 = "Settings";
var language$1 = "Language";
var logout$1 = "Logout";
var createNewPost$1 = "Create New Post";
var home$1 = "Home";
var posts$1 = "Posts";
var nearbyShops$1 = "Nearby Shops";
var nearbyCommunity$1 = "Nearby Community";
var messages$1 = "Messages";
var friends$1 = "Friends";
var aiAssistant$1 = "AI Assistant";
var buildingInfo$1 = "Building Information";
var askAI$1 = "Ask AI about building info...";
var aiWelcome$1 = "Hello! I'm your building AI assistant. Ask me about regulations, meeting minutes, building management, and more.";
var exampleQuestions$1 = "Example Questions:";
var chatHistory$1 = "Chat History";
var newChat$1 = "New Chat";
var noChatHistory$1 = "No chat history yet";
var renameChatTitle$1 = "Rename Chat";
var renameChatPlaceholder$1 = "Enter new chat name";
var renameChatRequired$1 = "Please enter a chat name";
var deleteChatTitle$1 = "Delete Chat";
var deleteChatConfirm$1 = "Delete this chat history?";
var exampleQ1$1 = "What are the noise regulations?";
var exampleQ2$1 = "Who is the building chairman?";
var exampleQ3$1 = "When is the next meeting?";
var exampleQ4$1 = "What are the parking rules?";
var typeQuestion$1 = "Type your question...";
var welcomeTitle$1 = "Welcome to To-Link!";
var welcomeMessage$1 = "Connect with your neighbors, share stories, and build a stronger community together.";
var browseCommunities$1 = "Browse Communities";
var recentPosts$1 = "Recent Posts";
var recentlyAcceptedQuests$1 = "Recently Accepted Quests";
var yourPost$1 = "Your Post";
var category$1 = "Category";
var all$1 = "All";
var news$1 = "News";
var events$1 = "Events";
var help$1 = "Help";
var general$1 = "General";
var noPosts$1 = "No posts yet";
var noAcceptedQuests$1 = "No accepted quests yet";
var share$1 = "Share";
var sortBy$1 = "Sort By";
var latest$1 = "Latest";
var oldest$1 = "Oldest";
var mostLikes$1 = "Most Likes";
var leastLikes$1 = "Least Likes";
var mostComments$1 = "Most Comments";
var leastComments$1 = "Least Comments";
var searchQuests$1 = "Search quests...";
var highestReward$1 = "Highest Reward";
var lowestReward$1 = "Lowest Reward";
var myLocation$1 = "My Location";
var gettingLocation$1 = "Getting your location...";
var loadingShops$1 = "Loading nearby shops...";
var allCategories$1 = "All Categories";
var restaurant$1 = "Restaurant";
var convenienceStore$1 = "Convenience Store";
var coffeeShop$1 = "Coffee Shop";
var supermarket$1 = "Supermarket";
var pharmacy$1 = "Pharmacy";
var bakery$1 = "Bakery";
var searchShops$1 = "Search shops...";
var searchCommunities$1 = "Search communities...";
var loadingCommunities$1 = "Loading nearby communities...";
var noCommunityFound$1 = "No communities found nearby. Showing sample data.";
var failedToLoadCommunities$1 = "Failed to load communities. Please try again.";
var ngo$1 = "NGO";
var charityOrg$1 = "Charity Organization";
var communityCenter$1 = "Community Center";
var socialClub$1 = "Social Club";
var religiousOrg$1 = "Religious Organization";
var youthCenter$1 = "Youth Center";
var communityEvents$1 = "Community Events & Programs";
var noEvents$1 = "No events scheduled";
var event$1 = "Event";
var program$1 = "Program";
var imagePreview$1 = "Image Preview";
var createNewPostTitle$1 = "Create New Post";
var title$1 = "Title";
var enterTitle$1 = "Enter post title...";
var content$1 = "Content";
var shareThoughts$1 = "Share your thoughts with the community...";
var imagesOptional$1 = "Images (Optional)";
var tagsOptional$1 = "Tags (Optional)";
var addTags$1 = "Add tags like #PetCare, #Fixing...";
var tagHint$1 = "Tip: Tags should start with # (e.g., #PetCare)";
var cancel$1 = "Cancel";
var publishPost$1 = "Publish Post";
var selectCategory$1 = "Select category";
var enterContent$1 = "Please enter content";
var pleaseEnterTitle$1 = "Please enter a title";
var titleLength$1 = "Title must be between 3 and 100 characters";
var pleaseSelectCategory$1 = "Please select a category";
var contentLength$1 = "Content must be between 10 and 2000 characters";
var fillRequired$1 = "Please fill in all required fields correctly";
var onlyImages$1 = "Only image files are allowed!";
var imageSize$1 = "Image size cannot exceed 5MB!";
var postSuccess$1 = "Post published successfully!";
var postFailed$1 = "Failed to publish post. Please try again.";
var noShopsFound$1 = "No shops found nearby. Showing sample data.";
var failedToLoadShops$1 = "Failed to load shops. Showing sample data.";
var failedLoadShops$1 = "Failed to load shops. Showing sample data.";
var addressNotAvailable$1 = "Address not available";
var newFailedLoadShops = "Failed to load shops. Showing sample data.";
var hoursNotAvailable$1 = "Hours not available";
var geolocationNotSupported$1 = "Geolocation is not supported by your browser.";
var couldNotGetLocation$1 = "Could not get your location. Showing default area.";
var questRequests$1 = "Quest Requests";
var createQuestRequest$1 = "Create Quest Request";
var yourRewardPoints$1 = "Your Reward Points";
var redeemRewards$1 = "Redeem Rewards";
var fillAllFields$1 = "Please fill in all required fields";
var questCreatedSuccess$1 = "Quest request created successfully!";
var cannotAcceptOwnRequest$1 = "You cannot accept your own request";
var questAlreadyAccepted$1 = "This quest has been accepted";
var alreadyAcceptedOne$1 = "You already accept 1 request";
var questAcceptedSuccess$1 = "Quest accepted! Good luck!";
var acceptedQuest$1 = "Accepted Quest";
var notEnoughPoints$1 = "Not enough points";
var redeemSuccess$1 = "Successfully redeemed {name}!";
var distance$1 = "Distance";
var address$1 = "Address";
var hours$1 = "Hours";
var phone$1 = "Phone";
var website$1 = "Website";
var announcementsAndSales$1 = "Announcements & Sales";
var noAnnouncements$1 = "No announcements";
var search$1 = "Search...";
var activeNow$1 = "Active now";
var selectConversation$1 = "Select a conversation to start chatting";
var searchFriends$1 = "Search friends...";
var status$1 = "Status";
var online$1 = "Online";
var offline$1 = "Offline";
var message$1 = "Message";
var call$1 = "Call";
var edit$1 = "Edit";
var report$1 = "Report";
var introduceYourself$1 = "Introduce Yourself";
var missionDetails$1 = "Mission Details";
var yourIntroduction$1 = "Your Introduction";
var introductionHint$1 = "Tell the requester why you are perfect for this mission!";
var introductionPlaceholder$1 = "Example: Hi! I have 5 years of experience in this field and would love to help...";
var sendIntroduction$1 = "Send Introduction";
var missionApplication$1 = "Mission Application";
var mission$1 = "Mission:";
var introduction$1 = "Introduction:";
var clickToViewDetails$1 = "Click to view full details";
var typeMessage$1 = "Type a message...";
var save$1 = "Save";
var detail$1 = "Detail";
var tags$1 = "Tags";
var paymentMethod$1 = "Payment Method";
var faceToFace$1 = "Face-to-Face";
var rewardPoints$1 = "Reward Points";
var enterQuestTitle$1 = "Enter quest title";
var enterQuestDetails$1 = "Enter quest details";
var pleaseEnterQuestDetails$1 = "Please enter quest details";
var points$1 = "Points";
var sale$1 = "Sale";
var notice$1 = "Notice";
var likes$1 = "Likes";
var comments$1 = "Comments";
var availablePoints$1 = "Available Points";
var redeem$1 = "Redeem";
var communities$1 = "Communities";
var payment$1 = "Payment";
var acceptedBy$1 = "Accepted by";
var acceptQuest$1 = "Accept Quest";
var details$1 = "Details";
var create$1 = "Create";
var invalidCredentials$1 = "Invalid email or password";
var logingFailed$1 = "Login failed. Please try again.";
var profileSettings$1 = "Profile Settings";
var profilePicture$1 = "Profile Picture";
var changePhoto$1 = "Change Photo";
var username$1 = "Username";
var enterUsername$1 = "Enter your username";
var pleaseEnterUsername$1 = "Please enter a username";
var usernameLength$1 = "Username must be between 2 and 50 characters";
var bio$1 = "Bio";
var bioPlaceholder$1 = "Tell us about yourself...";
var themeColor$1 = "Theme Color";
var themePreview$1 = "This is how your theme color will look!";
var availability$1 = "Availability Schedule";
var availabilityHint$1 = "Select the days and times when you're available to help with quests";
var fullDayAll$1 = "All Date & Time";
var clearAll$1 = "Clear All";
var startTime$1 = "Start Time";
var endTime$1 = "End Time";
var monday$1 = "Monday";
var tuesday$1 = "Tuesday";
var wednesday$1 = "Wednesday";
var thursday$1 = "Thursday";
var friday$1 = "Friday";
var saturday$1 = "Saturday";
var sunday$1 = "Sunday";
var notifications$1 = "Notification Preferences";
var questNotifications$1 = "Quest";
var messageNotifications$1 = "Message";
var postNotifications$1 = "Post";
var saveChanges$1 = "Save Changes";
var avatarSize$1 = "Avatar image size cannot exceed 2MB!";
var profileSaved$1 = "Profile saved successfully!";
var profileSaveFailed$1 = "Failed to save profile. Please try again.";
var emailUpdateUnauthorized$1 = "Email could not be updated due to permission/session issue. Other profile changes were saved.";
var appearance$1 = "Appearance";
var fontSize$1 = "Font Size";
var small$1 = "Small";
var medium$1 = "Medium";
var large$1 = "Large";
var extraLarge$1 = "Extra Large";
var fontSizePreview$1 = "This is a preview of your selected font size.";
var displayMode$1 = "Display Mode";
var darkMode$1 = "Dark Mode";
var lightMode$1 = "Light Mode";
var layoutDensity$1 = "Layout Density";
var compactMode$1 = "Compact";
var comfortableMode$1 = "Comfortable";
var notificationPreferences$1 = "Notification Preferences";
var friendNotifications$1 = "Friend";
var systemNotifications$1 = "System";
var notificationSound$1 = "Notification Sound";
var enabled$1 = "Enabled";
var disabled$1 = "Disabled";
var emailNotifications$1 = "Email Notifications";
var languageAndRegion$1 = "Language & Region";
var hour$1 = "Hour";
var timeFormat$1 = "Time Format";
var dateFormat$1 = "Date Format";
var privacyAndSecurity$1 = "Privacy & Security";
var others$1 = "Others";
var appFeedback$1 = "App Feedback";
var communityFeedback$1 = "Community Feedback";
var aboutUs$1 = "About Us";
var version$1 = "Version";
var helpCenter$1 = "Help Center";
var privacyPolicy$1 = "Privacy Policy";
var termsOfService$1 = "Terms of Service";
var feedbackDescription$1 = "Feedback Description";
var feedbackPlaceholder$1 = "Please describe your feedback in detail. We appreciate your input!";
var attachments$1 = "Attachments (Optional)";
var uploadTip$1 = "You can upload up to 5 photos or videos (Max size: 10MB each)";
var maxFilesExceeded$1 = "Maximum 5 files allowed";
var pleaseEnterFeedback$1 = "Please enter your feedback";
var feedbackSubmitted$1 = "Thank you for your feedback!";
var preview$1 = "Preview";
var submit$1 = "Submit";
var helpCenterComingSoon$1 = "Help Center feature coming soon!";
var aboutUsMessage$1 = "About Us: To-Link v1.0.0 - Connect with your community!";
var privacyPolicyComingSoon$1 = "Privacy Policy feature coming soon!";
var termsOfServiceComingSoon$1 = "Terms of Service feature coming soon!";
var versionMessage$1 = "To-Link Version 1.0.0";
var profileVisibility$1 = "Profile Visibility";
var friendsOnly$1 = "Friends Only";
var showOnlineStatus$1 = "Show Online Status";
var visible$1 = "Visible";
var hidden$1 = "Hidden";
var allowMessages$1 = "Allow Messages From";
var everyone$1 = "Everyone";
var noOne$1 = "No One";
var on$1 = "On";
var off$1 = "Off";
var settingsSaved$1 = "Settings saved successfully!";
var settingsSaveFailed$1 = "Failed to save settings. Please try again.";
var languageChanged$1 = "Language changed successfully!";
var languageChangeFailed$1 = "Failed to change language.";
var postCreatedSuccess$1 = "Post created successfully!";
var postCreateFailed$1 = "Failed to create post. Please try again.";
var postUpdatedSuccess$1 = "Post updated successfully!";
var confirmDeletePostMessage$1 = "Are you sure you want to delete this post?";
var deletePostTitle$1 = "Delete Post";
var postDeletedSuccess$1 = "Post deleted successfully!";
var reportComingSoon$1 = "Report feature coming soon!";
var questUpdatedSuccess$1 = "Quest updated successfully!";
var confirmDeleteQuestMessage$1 = "Are you sure you want to delete this quest?";
var deleteQuestTitle$1 = "Delete Quest";
var questDeletedSuccess$1 = "Quest deleted successfully!";
var specialOffer$1 = "Special Offer from {shopName}";
var updatedOpeningHours$1 = "Updated Opening Hours at {shopName}";
var youAreHere$1 = "You are here";
var timeSelect$1 = "Time";
var To$1 = "To";
var shopping$1 = "Shopping Help";
var repair$1 = "Home Repair";
var care$1 = "Caretaking";
var daily$1 = "Daily Assistance";
var other$1 = "Others";
var fireEmergency$1 = "Fire Emergency";
var powerOutage$1 = "Power Outage";
var floodAlert$1 = "Flood Alert";
var callSecurity$1 = "Call Security";
var emergencyGroupChat$1 = "Emergency Group Chat";
var pleaseHelp$1 = "Please help — urgent assistance needed!";
var pleaseCheck$1 = "Please check — power outage reported!";
var callSecurityNow$1 = "Please call security now!";
var urgentPleaseRespond$1 = "Urgent — please respond!";
var emergencyAlert$1 = "Emergency Alert";
var emergencySent$1 = "Emergency message sent.";
var emergencyFailed$1 = "Failed to send emergency message.";
var photo$1 = "Photo";
var video$1 = "Video";
var document$1 = "Document";
var audio$1 = "Audio";
var location$1 = "Location";
var fileTooLarge$1 = "File size cannot exceed 10MB";
var fileSent$1 = "File sent successfully";
var fileFailed$1 = "Failed to upload file";
var download$1 = "Download";
var sharedLocation$1 = "Shared Location";
var openInMaps$1 = "Open in Maps";
var locationShared$1 = "Location shared successfully";
var locationError$1 = "Failed to get your location";
var locationNotSupported$1 = "Your browser does not support location sharing";
var locationDataLoadFailed$1 = "Failed to load location data. Please try again.";
var addressSection$1 = "Address";
var addressHint$1 = "Add your address details. You can control who can see each item.";
var addressCustomOptionHint$1 = "Type and press Enter if not listed";
var country$1 = "Country";
var countryPlaceholder$1 = "Select country";
var nation$1 = "Nation";
var nationPlaceholder$1 = "Select nation";
var nationSelectCountryFirst$1 = "Select country first";
var areaSelectNationFirst$1 = "Select nation first";
var countryChina$1 = "China";
var countryUnitedKingdom$1 = "United Kingdom";
var countryUnitedStates$1 = "United States";
var nationGuangdong$1 = "Guangdong";
var nationBeijing$1 = "Beijing";
var nationShanghai$1 = "Shanghai";
var nationEngland$1 = "England";
var nationScotland$1 = "Scotland";
var nationWales$1 = "Wales";
var nationNorthernIreland$1 = "Northern Ireland";
var nationCalifornia$1 = "California";
var nationNewYork$1 = "New York";
var nationTexas$1 = "Texas";
var area$1 = "Area";
var areaPlaceholder$1 = "Select area";
var areaKowloon$1 = "Kowloon";
var areaHongKong$1 = "Hong Kong";
var areaNewTerritories$1 = "New Territories";
var street$1 = "Street";
var streetPlaceholder$1 = "Enter street name";
var buildingName$1 = "Building Name";
var buildingPlaceholder$1 = "Enter building name";
var floor$1 = "Floor";
var floorPlaceholder$1 = "Enter floor";
var roomNumber$1 = "Room Number";
var roomPlaceholder$1 = "Enter room number";
var addressPrivacyTitle$1 = "Privacy for {item}";
var showAddressTo$1 = "Show this address item to";
var showNoOne$1 = "No-one";
var showFriendsOnly$1 = "Friends only";
var showSpecificPeopleOnly$1 = "Specific people only";
var showAllPeople$1 = "All people";
var specificPeople$1 = "Specific People";
var specificPeoplePlaceholder$1 = "Enter names, separated by commas";
var addressAllWarningMessage$1 = "It is not safe to share this address item with all people. Are you sure you want to show it to all people?";
var warningTitle$1 = "Warning";
var yes$1 = "Yes";
var no$1 = "No";
var languageEnglish$1 = "English";
var languageEnglishWithFlag$1 = "🇬🇧 English";
var languageChineseTraditional$1 = "Traditional Chinese";
var languageChineseTraditionalWithFlag$1 = "🇭🇰 Traditional Chinese";
var aiNoInfoMessage$1 = "I could not find this information in the current documents yet. Please contact building management.";
var aiConnectionErrorMessage$1 = "Unable to connect to AI service right now. Please try again later.";
var communityMockMeetupTitle$1 = "Community Meetup at {name}";
var communityMockMeetupContent$1 = "Join us for a community gathering and networking event!";
var communityMockVolunteerTitle$1 = "Volunteer Program";
var communityMockVolunteerContent$1 = "Help make a difference in our community. Sign up for our volunteer program!";
var communityMockYouthWorkshopTitle$1 = "Youth Workshop";
var communityMockYouthWorkshopContent$1 = "Creative workshops for young people ages 12-18.";
var communityMockCenterName$1 = "Community Care Center";
var communityMockNearbyLocation$1 = "Nearby location";
var communityMockHealthFairTitle$1 = "Community Health Fair";
var communityMockHealthFairContent$1 = "Free health screenings and wellness activities for all ages.";
var communityMockSeniorSupportTitle$1 = "Senior Support Program";
var communityMockSeniorSupportContent$1 = "Weekly programs and activities for senior citizens.";
var communityMockEveryTuesday$1 = "Every Tuesday";
var communityMockHopeFoundationName$1 = "Hope Foundation (NGO)";
var communityMockFoodDriveTitle$1 = "Food Drive Campaign";
var communityMockFoodDriveContent$1 = "Help us collect food for families in need.";
var communityMockYouthCenterName$1 = "Youth Activity Center";
var communityMockTeenGameNightTitle$1 = "Teen Game Night";
var communityMockTeenGameNightContent$1 = "Fun gaming and social activities for teens.";
var shopMockLatestDealsContent$1 = "Check out our latest deals and promotions!";
var shopMockExtendedHoursContent$1 = "We have extended our opening hours!";
var shopMockBigMacDealTitle$1 = "Big Mac Meal Deal";
var shopMockBigMacDealContent$1 = "Get a Big Mac meal for only $5.99!";
var serverN8nNotConfigured$1 = "n8n webhook is not configured on server";
var serverMessageRequired$1 = "message is required";
var serverReachN8nFailed$1 = "Failed to reach n8n webhook";
var serverN8nRequestFailed$1 = "n8n webhook request failed: {details}";
var pendingQuest$1 = "Pending Quest";
var noPendingQuests$1 = "No pending quests";
var pendingApplicants$1 = "Pending Applicants";
var approve$1 = "Approve";
var questOnHold$1 = "On Hold";
var questApprovedSuccess$1 = "Quest accepted successfully!";
var alreadyAppliedQuest$1 = "You have already applied for this quest";
var questApplicationSubmitted$1 = "Application submitted. Waiting for requester approval.";
var unknownUser$1 = "Unknown";
var backToTop$1 = "Back to Top";
var openLoginPage$1 = "Click to enter login";
var hoverForInfo$1 = "Hover for Info";
var assistanceSupport$1 = "Assistance and support";
var importantInformation$1 = "Important Information";
var othersTooltipDescription$1 = "Use this menu for feedback, community updates, and app policies.";
var premiumFeature$1 = "Premium Feature";
var weatherSunny$1 = "Sunny";
var weatherCity$1 = "Locating...";
var weatherDateMon$1 = "MON 08-23";
var weatherDayTue$1 = "TUE";
var weatherDayWed$1 = "WED";
var weatherDayThu$1 = "THU";
var weatherDayFri$1 = "FRI";
var weatherClear$1 = "Clear";
var weatherPartlyCloudy$1 = "Partly Cloudy";
var weatherCloudy$1 = "Cloudy";
var weatherFog$1 = "Fog";
var weatherDrizzle$1 = "Drizzle";
var weatherRain$1 = "Rain";
var weatherSnow$1 = "Snow";
var weatherThunderstorm$1 = "Thunderstorm";
var weatherUnknown$1 = "Weather";
var weatherLocationUnknown$1 = "Location unavailable";
const enLocale = {
	neighbourHood: neighbourHood$1,
	login: login$1,
	loggingIn: loggingIn$1,
	loginTitle: loginTitle$1,
	loginSubtitle: loginSubtitle$1,
	email: email$1,
	password: password$1,
	emailPlaceholder: emailPlaceholder$1,
	passwordPlaceholder: passwordPlaceholder$1,
	rememberMe: rememberMe$1,
	brandTitle: brandTitle$1,
	brandDescription: brandDescription$1,
	appName: appName$1,
	searchPosts: searchPosts$1,
	loadingPosts: loadingPosts$1,
	profile: profile$1,
	settings: settings$1,
	language: language$1,
	logout: logout$1,
	createNewPost: createNewPost$1,
	home: home$1,
	posts: posts$1,
	nearbyShops: nearbyShops$1,
	nearbyCommunity: nearbyCommunity$1,
	messages: messages$1,
	friends: friends$1,
	aiAssistant: aiAssistant$1,
	buildingInfo: buildingInfo$1,
	askAI: askAI$1,
	aiWelcome: aiWelcome$1,
	exampleQuestions: exampleQuestions$1,
	chatHistory: chatHistory$1,
	newChat: newChat$1,
	noChatHistory: noChatHistory$1,
	renameChatTitle: renameChatTitle$1,
	renameChatPlaceholder: renameChatPlaceholder$1,
	renameChatRequired: renameChatRequired$1,
	deleteChatTitle: deleteChatTitle$1,
	deleteChatConfirm: deleteChatConfirm$1,
	exampleQ1: exampleQ1$1,
	exampleQ2: exampleQ2$1,
	exampleQ3: exampleQ3$1,
	exampleQ4: exampleQ4$1,
	typeQuestion: typeQuestion$1,
	welcomeTitle: welcomeTitle$1,
	welcomeMessage: welcomeMessage$1,
	browseCommunities: browseCommunities$1,
	recentPosts: recentPosts$1,
	recentlyAcceptedQuests: recentlyAcceptedQuests$1,
	yourPost: yourPost$1,
	category: category$1,
	all: all$1,
	news: news$1,
	events: events$1,
	help: help$1,
	general: general$1,
	noPosts: noPosts$1,
	noAcceptedQuests: noAcceptedQuests$1,
	share: share$1,
	sortBy: sortBy$1,
	latest: latest$1,
	oldest: oldest$1,
	mostLikes: mostLikes$1,
	leastLikes: leastLikes$1,
	mostComments: mostComments$1,
	leastComments: leastComments$1,
	searchQuests: searchQuests$1,
	highestReward: highestReward$1,
	lowestReward: lowestReward$1,
	myLocation: myLocation$1,
	gettingLocation: gettingLocation$1,
	loadingShops: loadingShops$1,
	allCategories: allCategories$1,
	restaurant: restaurant$1,
	convenienceStore: convenienceStore$1,
	coffeeShop: coffeeShop$1,
	supermarket: supermarket$1,
	pharmacy: pharmacy$1,
	bakery: bakery$1,
	searchShops: searchShops$1,
	searchCommunities: searchCommunities$1,
	loadingCommunities: loadingCommunities$1,
	noCommunityFound: noCommunityFound$1,
	failedToLoadCommunities: failedToLoadCommunities$1,
	ngo: ngo$1,
	charityOrg: charityOrg$1,
	communityCenter: communityCenter$1,
	socialClub: socialClub$1,
	religiousOrg: religiousOrg$1,
	youthCenter: youthCenter$1,
	communityEvents: communityEvents$1,
	noEvents: noEvents$1,
	event: event$1,
	program: program$1,
	imagePreview: imagePreview$1,
	createNewPostTitle: createNewPostTitle$1,
	title: title$1,
	enterTitle: enterTitle$1,
	content: content$1,
	shareThoughts: shareThoughts$1,
	imagesOptional: imagesOptional$1,
	tagsOptional: tagsOptional$1,
	addTags: addTags$1,
	tagHint: tagHint$1,
	cancel: cancel$1,
	publishPost: publishPost$1,
	selectCategory: selectCategory$1,
	enterContent: enterContent$1,
	pleaseEnterTitle: pleaseEnterTitle$1,
	titleLength: titleLength$1,
	pleaseSelectCategory: pleaseSelectCategory$1,
	contentLength: contentLength$1,
	fillRequired: fillRequired$1,
	onlyImages: onlyImages$1,
	imageSize: imageSize$1,
	postSuccess: postSuccess$1,
	postFailed: postFailed$1,
	noShopsFound: noShopsFound$1,
	failedToLoadShops: failedToLoadShops$1,
	failedLoadShops: failedLoadShops$1,
	addressNotAvailable: addressNotAvailable$1,
	newFailedLoadShops: newFailedLoadShops,
	hoursNotAvailable: hoursNotAvailable$1,
	geolocationNotSupported: geolocationNotSupported$1,
	couldNotGetLocation: couldNotGetLocation$1,
	questRequests: questRequests$1,
	createQuestRequest: createQuestRequest$1,
	yourRewardPoints: yourRewardPoints$1,
	redeemRewards: redeemRewards$1,
	fillAllFields: fillAllFields$1,
	questCreatedSuccess: questCreatedSuccess$1,
	cannotAcceptOwnRequest: cannotAcceptOwnRequest$1,
	questAlreadyAccepted: questAlreadyAccepted$1,
	alreadyAcceptedOne: alreadyAcceptedOne$1,
	questAcceptedSuccess: questAcceptedSuccess$1,
	acceptedQuest: acceptedQuest$1,
	notEnoughPoints: notEnoughPoints$1,
	redeemSuccess: redeemSuccess$1,
	distance: distance$1,
	address: address$1,
	hours: hours$1,
	phone: phone$1,
	website: website$1,
	announcementsAndSales: announcementsAndSales$1,
	noAnnouncements: noAnnouncements$1,
	search: search$1,
	activeNow: activeNow$1,
	selectConversation: selectConversation$1,
	searchFriends: searchFriends$1,
	status: status$1,
	online: online$1,
	offline: offline$1,
	message: message$1,
	call: call$1,
	edit: edit$1,
	"delete": "Delete",
	report: report$1,
	introduceYourself: introduceYourself$1,
	missionDetails: missionDetails$1,
	yourIntroduction: yourIntroduction$1,
	introductionHint: introductionHint$1,
	introductionPlaceholder: introductionPlaceholder$1,
	sendIntroduction: sendIntroduction$1,
	missionApplication: missionApplication$1,
	mission: mission$1,
	introduction: introduction$1,
	clickToViewDetails: clickToViewDetails$1,
	typeMessage: typeMessage$1,
	save: save$1,
	detail: detail$1,
	tags: tags$1,
	paymentMethod: paymentMethod$1,
	faceToFace: faceToFace$1,
	rewardPoints: rewardPoints$1,
	enterQuestTitle: enterQuestTitle$1,
	enterQuestDetails: enterQuestDetails$1,
	pleaseEnterQuestDetails: pleaseEnterQuestDetails$1,
	points: points$1,
	sale: sale$1,
	notice: notice$1,
	likes: likes$1,
	comments: comments$1,
	availablePoints: availablePoints$1,
	redeem: redeem$1,
	communities: communities$1,
	payment: payment$1,
	acceptedBy: acceptedBy$1,
	acceptQuest: acceptQuest$1,
	details: details$1,
	create: create$1,
	invalidCredentials: invalidCredentials$1,
	logingFailed: logingFailed$1,
	profileSettings: profileSettings$1,
	profilePicture: profilePicture$1,
	changePhoto: changePhoto$1,
	username: username$1,
	enterUsername: enterUsername$1,
	pleaseEnterUsername: pleaseEnterUsername$1,
	usernameLength: usernameLength$1,
	bio: bio$1,
	bioPlaceholder: bioPlaceholder$1,
	themeColor: themeColor$1,
	themePreview: themePreview$1,
	availability: availability$1,
	availabilityHint: availabilityHint$1,
	fullDayAll: fullDayAll$1,
	clearAll: clearAll$1,
	startTime: startTime$1,
	endTime: endTime$1,
	monday: monday$1,
	tuesday: tuesday$1,
	wednesday: wednesday$1,
	thursday: thursday$1,
	friday: friday$1,
	saturday: saturday$1,
	sunday: sunday$1,
	notifications: notifications$1,
	questNotifications: questNotifications$1,
	messageNotifications: messageNotifications$1,
	postNotifications: postNotifications$1,
	saveChanges: saveChanges$1,
	avatarSize: avatarSize$1,
	profileSaved: profileSaved$1,
	profileSaveFailed: profileSaveFailed$1,
	emailUpdateUnauthorized: emailUpdateUnauthorized$1,
	appearance: appearance$1,
	fontSize: fontSize$1,
	small: small$1,
	medium: medium$1,
	large: large$1,
	extraLarge: extraLarge$1,
	fontSizePreview: fontSizePreview$1,
	displayMode: displayMode$1,
	darkMode: darkMode$1,
	lightMode: lightMode$1,
	layoutDensity: layoutDensity$1,
	compactMode: compactMode$1,
	comfortableMode: comfortableMode$1,
	notificationPreferences: notificationPreferences$1,
	friendNotifications: friendNotifications$1,
	systemNotifications: systemNotifications$1,
	notificationSound: notificationSound$1,
	enabled: enabled$1,
	disabled: disabled$1,
	emailNotifications: emailNotifications$1,
	languageAndRegion: languageAndRegion$1,
	hour: hour$1,
	timeFormat: timeFormat$1,
	dateFormat: dateFormat$1,
	privacyAndSecurity: privacyAndSecurity$1,
	others: others$1,
	appFeedback: appFeedback$1,
	communityFeedback: communityFeedback$1,
	aboutUs: aboutUs$1,
	version: version$1,
	helpCenter: helpCenter$1,
	privacyPolicy: privacyPolicy$1,
	termsOfService: termsOfService$1,
	feedbackDescription: feedbackDescription$1,
	feedbackPlaceholder: feedbackPlaceholder$1,
	attachments: attachments$1,
	uploadTip: uploadTip$1,
	maxFilesExceeded: maxFilesExceeded$1,
	pleaseEnterFeedback: pleaseEnterFeedback$1,
	feedbackSubmitted: feedbackSubmitted$1,
	preview: preview$1,
	submit: submit$1,
	helpCenterComingSoon: helpCenterComingSoon$1,
	aboutUsMessage: aboutUsMessage$1,
	privacyPolicyComingSoon: privacyPolicyComingSoon$1,
	termsOfServiceComingSoon: termsOfServiceComingSoon$1,
	versionMessage: versionMessage$1,
	profileVisibility: profileVisibility$1,
	"public": "Public",
	friendsOnly: friendsOnly$1,
	"private": "Private",
	showOnlineStatus: showOnlineStatus$1,
	visible: visible$1,
	hidden: hidden$1,
	allowMessages: allowMessages$1,
	everyone: everyone$1,
	noOne: noOne$1,
	on: on$1,
	off: off$1,
	settingsSaved: settingsSaved$1,
	settingsSaveFailed: settingsSaveFailed$1,
	languageChanged: languageChanged$1,
	languageChangeFailed: languageChangeFailed$1,
	postCreatedSuccess: postCreatedSuccess$1,
	postCreateFailed: postCreateFailed$1,
	postUpdatedSuccess: postUpdatedSuccess$1,
	confirmDeletePostMessage: confirmDeletePostMessage$1,
	deletePostTitle: deletePostTitle$1,
	postDeletedSuccess: postDeletedSuccess$1,
	reportComingSoon: reportComingSoon$1,
	questUpdatedSuccess: questUpdatedSuccess$1,
	confirmDeleteQuestMessage: confirmDeleteQuestMessage$1,
	deleteQuestTitle: deleteQuestTitle$1,
	questDeletedSuccess: questDeletedSuccess$1,
	specialOffer: specialOffer$1,
	updatedOpeningHours: updatedOpeningHours$1,
	youAreHere: youAreHere$1,
	timeSelect: timeSelect$1,
	To: To$1,
	shopping: shopping$1,
	repair: repair$1,
	care: care$1,
	daily: daily$1,
	other: other$1,
	fireEmergency: fireEmergency$1,
	powerOutage: powerOutage$1,
	floodAlert: floodAlert$1,
	callSecurity: callSecurity$1,
	emergencyGroupChat: emergencyGroupChat$1,
	pleaseHelp: pleaseHelp$1,
	pleaseCheck: pleaseCheck$1,
	callSecurityNow: callSecurityNow$1,
	urgentPleaseRespond: urgentPleaseRespond$1,
	emergencyAlert: emergencyAlert$1,
	emergencySent: emergencySent$1,
	emergencyFailed: emergencyFailed$1,
	photo: photo$1,
	video: video$1,
	document: document$1,
	audio: audio$1,
	location: location$1,
	fileTooLarge: fileTooLarge$1,
	fileSent: fileSent$1,
	fileFailed: fileFailed$1,
	download: download$1,
	sharedLocation: sharedLocation$1,
	openInMaps: openInMaps$1,
	locationShared: locationShared$1,
	locationError: locationError$1,
	locationNotSupported: locationNotSupported$1,
	locationDataLoadFailed: locationDataLoadFailed$1,
	addressSection: addressSection$1,
	addressHint: addressHint$1,
	addressCustomOptionHint: addressCustomOptionHint$1,
	country: country$1,
	countryPlaceholder: countryPlaceholder$1,
	nation: nation$1,
	nationPlaceholder: nationPlaceholder$1,
	nationSelectCountryFirst: nationSelectCountryFirst$1,
	areaSelectNationFirst: areaSelectNationFirst$1,
	countryChina: countryChina$1,
	countryUnitedKingdom: countryUnitedKingdom$1,
	countryUnitedStates: countryUnitedStates$1,
	nationGuangdong: nationGuangdong$1,
	nationBeijing: nationBeijing$1,
	nationShanghai: nationShanghai$1,
	nationEngland: nationEngland$1,
	nationScotland: nationScotland$1,
	nationWales: nationWales$1,
	nationNorthernIreland: nationNorthernIreland$1,
	nationCalifornia: nationCalifornia$1,
	nationNewYork: nationNewYork$1,
	nationTexas: nationTexas$1,
	area: area$1,
	areaPlaceholder: areaPlaceholder$1,
	areaKowloon: areaKowloon$1,
	areaHongKong: areaHongKong$1,
	areaNewTerritories: areaNewTerritories$1,
	street: street$1,
	streetPlaceholder: streetPlaceholder$1,
	buildingName: buildingName$1,
	buildingPlaceholder: buildingPlaceholder$1,
	floor: floor$1,
	floorPlaceholder: floorPlaceholder$1,
	roomNumber: roomNumber$1,
	roomPlaceholder: roomPlaceholder$1,
	addressPrivacyTitle: addressPrivacyTitle$1,
	showAddressTo: showAddressTo$1,
	showNoOne: showNoOne$1,
	showFriendsOnly: showFriendsOnly$1,
	showSpecificPeopleOnly: showSpecificPeopleOnly$1,
	showAllPeople: showAllPeople$1,
	specificPeople: specificPeople$1,
	specificPeoplePlaceholder: specificPeoplePlaceholder$1,
	addressAllWarningMessage: addressAllWarningMessage$1,
	warningTitle: warningTitle$1,
	yes: yes$1,
	no: no$1,
	languageEnglish: languageEnglish$1,
	languageEnglishWithFlag: languageEnglishWithFlag$1,
	languageChineseTraditional: languageChineseTraditional$1,
	languageChineseTraditionalWithFlag: languageChineseTraditionalWithFlag$1,
	aiNoInfoMessage: aiNoInfoMessage$1,
	aiConnectionErrorMessage: aiConnectionErrorMessage$1,
	communityMockMeetupTitle: communityMockMeetupTitle$1,
	communityMockMeetupContent: communityMockMeetupContent$1,
	communityMockVolunteerTitle: communityMockVolunteerTitle$1,
	communityMockVolunteerContent: communityMockVolunteerContent$1,
	communityMockYouthWorkshopTitle: communityMockYouthWorkshopTitle$1,
	communityMockYouthWorkshopContent: communityMockYouthWorkshopContent$1,
	communityMockCenterName: communityMockCenterName$1,
	communityMockNearbyLocation: communityMockNearbyLocation$1,
	communityMockHealthFairTitle: communityMockHealthFairTitle$1,
	communityMockHealthFairContent: communityMockHealthFairContent$1,
	communityMockSeniorSupportTitle: communityMockSeniorSupportTitle$1,
	communityMockSeniorSupportContent: communityMockSeniorSupportContent$1,
	communityMockEveryTuesday: communityMockEveryTuesday$1,
	communityMockHopeFoundationName: communityMockHopeFoundationName$1,
	communityMockFoodDriveTitle: communityMockFoodDriveTitle$1,
	communityMockFoodDriveContent: communityMockFoodDriveContent$1,
	communityMockYouthCenterName: communityMockYouthCenterName$1,
	communityMockTeenGameNightTitle: communityMockTeenGameNightTitle$1,
	communityMockTeenGameNightContent: communityMockTeenGameNightContent$1,
	shopMockLatestDealsContent: shopMockLatestDealsContent$1,
	shopMockExtendedHoursContent: shopMockExtendedHoursContent$1,
	shopMockBigMacDealTitle: shopMockBigMacDealTitle$1,
	shopMockBigMacDealContent: shopMockBigMacDealContent$1,
	serverN8nNotConfigured: serverN8nNotConfigured$1,
	serverMessageRequired: serverMessageRequired$1,
	serverReachN8nFailed: serverReachN8nFailed$1,
	serverN8nRequestFailed: serverN8nRequestFailed$1,
	pendingQuest: pendingQuest$1,
	noPendingQuests: noPendingQuests$1,
	pendingApplicants: pendingApplicants$1,
	approve: approve$1,
	questOnHold: questOnHold$1,
	questApprovedSuccess: questApprovedSuccess$1,
	alreadyAppliedQuest: alreadyAppliedQuest$1,
	questApplicationSubmitted: questApplicationSubmitted$1,
	unknownUser: unknownUser$1,
	backToTop: backToTop$1,
	openLoginPage: openLoginPage$1,
	hoverForInfo: hoverForInfo$1,
	assistanceSupport: assistanceSupport$1,
	importantInformation: importantInformation$1,
	othersTooltipDescription: othersTooltipDescription$1,
	premiumFeature: premiumFeature$1,
	weatherSunny: weatherSunny$1,
	weatherCity: weatherCity$1,
	weatherDateMon: weatherDateMon$1,
	weatherDayTue: weatherDayTue$1,
	weatherDayWed: weatherDayWed$1,
	weatherDayThu: weatherDayThu$1,
	weatherDayFri: weatherDayFri$1,
	weatherClear: weatherClear$1,
	weatherPartlyCloudy: weatherPartlyCloudy$1,
	weatherCloudy: weatherCloudy$1,
	weatherFog: weatherFog$1,
	weatherDrizzle: weatherDrizzle$1,
	weatherRain: weatherRain$1,
	weatherSnow: weatherSnow$1,
	weatherThunderstorm: weatherThunderstorm$1,
	weatherUnknown: weatherUnknown$1,
	weatherLocationUnknown: weatherLocationUnknown$1
};

const en = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  To: To$1,
  aboutUs: aboutUs$1,
  aboutUsMessage: aboutUsMessage$1,
  acceptQuest: acceptQuest$1,
  acceptedBy: acceptedBy$1,
  acceptedQuest: acceptedQuest$1,
  activeNow: activeNow$1,
  addTags: addTags$1,
  address: address$1,
  addressAllWarningMessage: addressAllWarningMessage$1,
  addressCustomOptionHint: addressCustomOptionHint$1,
  addressHint: addressHint$1,
  addressNotAvailable: addressNotAvailable$1,
  addressPrivacyTitle: addressPrivacyTitle$1,
  addressSection: addressSection$1,
  aiAssistant: aiAssistant$1,
  aiConnectionErrorMessage: aiConnectionErrorMessage$1,
  aiNoInfoMessage: aiNoInfoMessage$1,
  aiWelcome: aiWelcome$1,
  all: all$1,
  allCategories: allCategories$1,
  allowMessages: allowMessages$1,
  alreadyAcceptedOne: alreadyAcceptedOne$1,
  alreadyAppliedQuest: alreadyAppliedQuest$1,
  announcementsAndSales: announcementsAndSales$1,
  appFeedback: appFeedback$1,
  appName: appName$1,
  appearance: appearance$1,
  approve: approve$1,
  area: area$1,
  areaHongKong: areaHongKong$1,
  areaKowloon: areaKowloon$1,
  areaNewTerritories: areaNewTerritories$1,
  areaPlaceholder: areaPlaceholder$1,
  areaSelectNationFirst: areaSelectNationFirst$1,
  askAI: askAI$1,
  assistanceSupport: assistanceSupport$1,
  attachments: attachments$1,
  audio: audio$1,
  availability: availability$1,
  availabilityHint: availabilityHint$1,
  availablePoints: availablePoints$1,
  avatarSize: avatarSize$1,
  backToTop: backToTop$1,
  bakery: bakery$1,
  bio: bio$1,
  bioPlaceholder: bioPlaceholder$1,
  brandDescription: brandDescription$1,
  brandTitle: brandTitle$1,
  browseCommunities: browseCommunities$1,
  buildingInfo: buildingInfo$1,
  buildingName: buildingName$1,
  buildingPlaceholder: buildingPlaceholder$1,
  call: call$1,
  callSecurity: callSecurity$1,
  callSecurityNow: callSecurityNow$1,
  cancel: cancel$1,
  cannotAcceptOwnRequest: cannotAcceptOwnRequest$1,
  care: care$1,
  category: category$1,
  changePhoto: changePhoto$1,
  charityOrg: charityOrg$1,
  chatHistory: chatHistory$1,
  clearAll: clearAll$1,
  clickToViewDetails: clickToViewDetails$1,
  coffeeShop: coffeeShop$1,
  comfortableMode: comfortableMode$1,
  comments: comments$1,
  communities: communities$1,
  communityCenter: communityCenter$1,
  communityEvents: communityEvents$1,
  communityFeedback: communityFeedback$1,
  communityMockCenterName: communityMockCenterName$1,
  communityMockEveryTuesday: communityMockEveryTuesday$1,
  communityMockFoodDriveContent: communityMockFoodDriveContent$1,
  communityMockFoodDriveTitle: communityMockFoodDriveTitle$1,
  communityMockHealthFairContent: communityMockHealthFairContent$1,
  communityMockHealthFairTitle: communityMockHealthFairTitle$1,
  communityMockHopeFoundationName: communityMockHopeFoundationName$1,
  communityMockMeetupContent: communityMockMeetupContent$1,
  communityMockMeetupTitle: communityMockMeetupTitle$1,
  communityMockNearbyLocation: communityMockNearbyLocation$1,
  communityMockSeniorSupportContent: communityMockSeniorSupportContent$1,
  communityMockSeniorSupportTitle: communityMockSeniorSupportTitle$1,
  communityMockTeenGameNightContent: communityMockTeenGameNightContent$1,
  communityMockTeenGameNightTitle: communityMockTeenGameNightTitle$1,
  communityMockVolunteerContent: communityMockVolunteerContent$1,
  communityMockVolunteerTitle: communityMockVolunteerTitle$1,
  communityMockYouthCenterName: communityMockYouthCenterName$1,
  communityMockYouthWorkshopContent: communityMockYouthWorkshopContent$1,
  communityMockYouthWorkshopTitle: communityMockYouthWorkshopTitle$1,
  compactMode: compactMode$1,
  confirmDeletePostMessage: confirmDeletePostMessage$1,
  confirmDeleteQuestMessage: confirmDeleteQuestMessage$1,
  content: content$1,
  contentLength: contentLength$1,
  convenienceStore: convenienceStore$1,
  couldNotGetLocation: couldNotGetLocation$1,
  country: country$1,
  countryChina: countryChina$1,
  countryPlaceholder: countryPlaceholder$1,
  countryUnitedKingdom: countryUnitedKingdom$1,
  countryUnitedStates: countryUnitedStates$1,
  create: create$1,
  createNewPost: createNewPost$1,
  createNewPostTitle: createNewPostTitle$1,
  createQuestRequest: createQuestRequest$1,
  daily: daily$1,
  darkMode: darkMode$1,
  dateFormat: dateFormat$1,
  default: enLocale,
  deleteChatConfirm: deleteChatConfirm$1,
  deleteChatTitle: deleteChatTitle$1,
  deletePostTitle: deletePostTitle$1,
  deleteQuestTitle: deleteQuestTitle$1,
  detail: detail$1,
  details: details$1,
  disabled: disabled$1,
  displayMode: displayMode$1,
  distance: distance$1,
  document: document$1,
  download: download$1,
  edit: edit$1,
  email: email$1,
  emailNotifications: emailNotifications$1,
  emailPlaceholder: emailPlaceholder$1,
  emailUpdateUnauthorized: emailUpdateUnauthorized$1,
  emergencyAlert: emergencyAlert$1,
  emergencyFailed: emergencyFailed$1,
  emergencyGroupChat: emergencyGroupChat$1,
  emergencySent: emergencySent$1,
  enabled: enabled$1,
  endTime: endTime$1,
  enterContent: enterContent$1,
  enterQuestDetails: enterQuestDetails$1,
  enterQuestTitle: enterQuestTitle$1,
  enterTitle: enterTitle$1,
  enterUsername: enterUsername$1,
  event: event$1,
  events: events$1,
  everyone: everyone$1,
  exampleQ1: exampleQ1$1,
  exampleQ2: exampleQ2$1,
  exampleQ3: exampleQ3$1,
  exampleQ4: exampleQ4$1,
  exampleQuestions: exampleQuestions$1,
  extraLarge: extraLarge$1,
  faceToFace: faceToFace$1,
  failedLoadShops: failedLoadShops$1,
  failedToLoadCommunities: failedToLoadCommunities$1,
  failedToLoadShops: failedToLoadShops$1,
  feedbackDescription: feedbackDescription$1,
  feedbackPlaceholder: feedbackPlaceholder$1,
  feedbackSubmitted: feedbackSubmitted$1,
  fileFailed: fileFailed$1,
  fileSent: fileSent$1,
  fileTooLarge: fileTooLarge$1,
  fillAllFields: fillAllFields$1,
  fillRequired: fillRequired$1,
  fireEmergency: fireEmergency$1,
  floodAlert: floodAlert$1,
  floor: floor$1,
  floorPlaceholder: floorPlaceholder$1,
  fontSize: fontSize$1,
  fontSizePreview: fontSizePreview$1,
  friday: friday$1,
  friendNotifications: friendNotifications$1,
  friends: friends$1,
  friendsOnly: friendsOnly$1,
  fullDayAll: fullDayAll$1,
  general: general$1,
  geolocationNotSupported: geolocationNotSupported$1,
  gettingLocation: gettingLocation$1,
  help: help$1,
  helpCenter: helpCenter$1,
  helpCenterComingSoon: helpCenterComingSoon$1,
  hidden: hidden$1,
  highestReward: highestReward$1,
  home: home$1,
  hour: hour$1,
  hours: hours$1,
  hoursNotAvailable: hoursNotAvailable$1,
  hoverForInfo: hoverForInfo$1,
  imagePreview: imagePreview$1,
  imageSize: imageSize$1,
  imagesOptional: imagesOptional$1,
  importantInformation: importantInformation$1,
  introduceYourself: introduceYourself$1,
  introduction: introduction$1,
  introductionHint: introductionHint$1,
  introductionPlaceholder: introductionPlaceholder$1,
  invalidCredentials: invalidCredentials$1,
  language: language$1,
  languageAndRegion: languageAndRegion$1,
  languageChangeFailed: languageChangeFailed$1,
  languageChanged: languageChanged$1,
  languageChineseTraditional: languageChineseTraditional$1,
  languageChineseTraditionalWithFlag: languageChineseTraditionalWithFlag$1,
  languageEnglish: languageEnglish$1,
  languageEnglishWithFlag: languageEnglishWithFlag$1,
  large: large$1,
  latest: latest$1,
  layoutDensity: layoutDensity$1,
  leastComments: leastComments$1,
  leastLikes: leastLikes$1,
  lightMode: lightMode$1,
  likes: likes$1,
  loadingCommunities: loadingCommunities$1,
  loadingPosts: loadingPosts$1,
  loadingShops: loadingShops$1,
  location: location$1,
  locationDataLoadFailed: locationDataLoadFailed$1,
  locationError: locationError$1,
  locationNotSupported: locationNotSupported$1,
  locationShared: locationShared$1,
  loggingIn: loggingIn$1,
  login: login$1,
  loginSubtitle: loginSubtitle$1,
  loginTitle: loginTitle$1,
  logingFailed: logingFailed$1,
  logout: logout$1,
  lowestReward: lowestReward$1,
  maxFilesExceeded: maxFilesExceeded$1,
  medium: medium$1,
  message: message$1,
  messageNotifications: messageNotifications$1,
  messages: messages$1,
  mission: mission$1,
  missionApplication: missionApplication$1,
  missionDetails: missionDetails$1,
  monday: monday$1,
  mostComments: mostComments$1,
  mostLikes: mostLikes$1,
  myLocation: myLocation$1,
  nation: nation$1,
  nationBeijing: nationBeijing$1,
  nationCalifornia: nationCalifornia$1,
  nationEngland: nationEngland$1,
  nationGuangdong: nationGuangdong$1,
  nationNewYork: nationNewYork$1,
  nationNorthernIreland: nationNorthernIreland$1,
  nationPlaceholder: nationPlaceholder$1,
  nationScotland: nationScotland$1,
  nationSelectCountryFirst: nationSelectCountryFirst$1,
  nationShanghai: nationShanghai$1,
  nationTexas: nationTexas$1,
  nationWales: nationWales$1,
  nearbyCommunity: nearbyCommunity$1,
  nearbyShops: nearbyShops$1,
  neighbourHood: neighbourHood$1,
  newChat: newChat$1,
  newFailedLoadShops: newFailedLoadShops,
  news: news$1,
  ngo: ngo$1,
  no: no$1,
  noAcceptedQuests: noAcceptedQuests$1,
  noAnnouncements: noAnnouncements$1,
  noChatHistory: noChatHistory$1,
  noCommunityFound: noCommunityFound$1,
  noEvents: noEvents$1,
  noOne: noOne$1,
  noPendingQuests: noPendingQuests$1,
  noPosts: noPosts$1,
  noShopsFound: noShopsFound$1,
  notEnoughPoints: notEnoughPoints$1,
  notice: notice$1,
  notificationPreferences: notificationPreferences$1,
  notificationSound: notificationSound$1,
  notifications: notifications$1,
  off: off$1,
  offline: offline$1,
  oldest: oldest$1,
  on: on$1,
  online: online$1,
  onlyImages: onlyImages$1,
  openInMaps: openInMaps$1,
  openLoginPage: openLoginPage$1,
  other: other$1,
  others: others$1,
  othersTooltipDescription: othersTooltipDescription$1,
  password: password$1,
  passwordPlaceholder: passwordPlaceholder$1,
  payment: payment$1,
  paymentMethod: paymentMethod$1,
  pendingApplicants: pendingApplicants$1,
  pendingQuest: pendingQuest$1,
  pharmacy: pharmacy$1,
  phone: phone$1,
  photo: photo$1,
  pleaseCheck: pleaseCheck$1,
  pleaseEnterFeedback: pleaseEnterFeedback$1,
  pleaseEnterQuestDetails: pleaseEnterQuestDetails$1,
  pleaseEnterTitle: pleaseEnterTitle$1,
  pleaseEnterUsername: pleaseEnterUsername$1,
  pleaseHelp: pleaseHelp$1,
  pleaseSelectCategory: pleaseSelectCategory$1,
  points: points$1,
  postCreateFailed: postCreateFailed$1,
  postCreatedSuccess: postCreatedSuccess$1,
  postDeletedSuccess: postDeletedSuccess$1,
  postFailed: postFailed$1,
  postNotifications: postNotifications$1,
  postSuccess: postSuccess$1,
  postUpdatedSuccess: postUpdatedSuccess$1,
  posts: posts$1,
  powerOutage: powerOutage$1,
  premiumFeature: premiumFeature$1,
  preview: preview$1,
  privacyAndSecurity: privacyAndSecurity$1,
  privacyPolicy: privacyPolicy$1,
  privacyPolicyComingSoon: privacyPolicyComingSoon$1,
  profile: profile$1,
  profilePicture: profilePicture$1,
  profileSaveFailed: profileSaveFailed$1,
  profileSaved: profileSaved$1,
  profileSettings: profileSettings$1,
  profileVisibility: profileVisibility$1,
  program: program$1,
  publishPost: publishPost$1,
  questAcceptedSuccess: questAcceptedSuccess$1,
  questAlreadyAccepted: questAlreadyAccepted$1,
  questApplicationSubmitted: questApplicationSubmitted$1,
  questApprovedSuccess: questApprovedSuccess$1,
  questCreatedSuccess: questCreatedSuccess$1,
  questDeletedSuccess: questDeletedSuccess$1,
  questNotifications: questNotifications$1,
  questOnHold: questOnHold$1,
  questRequests: questRequests$1,
  questUpdatedSuccess: questUpdatedSuccess$1,
  recentPosts: recentPosts$1,
  recentlyAcceptedQuests: recentlyAcceptedQuests$1,
  redeem: redeem$1,
  redeemRewards: redeemRewards$1,
  redeemSuccess: redeemSuccess$1,
  religiousOrg: religiousOrg$1,
  rememberMe: rememberMe$1,
  renameChatPlaceholder: renameChatPlaceholder$1,
  renameChatRequired: renameChatRequired$1,
  renameChatTitle: renameChatTitle$1,
  repair: repair$1,
  report: report$1,
  reportComingSoon: reportComingSoon$1,
  restaurant: restaurant$1,
  rewardPoints: rewardPoints$1,
  roomNumber: roomNumber$1,
  roomPlaceholder: roomPlaceholder$1,
  sale: sale$1,
  saturday: saturday$1,
  save: save$1,
  saveChanges: saveChanges$1,
  search: search$1,
  searchCommunities: searchCommunities$1,
  searchFriends: searchFriends$1,
  searchPosts: searchPosts$1,
  searchQuests: searchQuests$1,
  searchShops: searchShops$1,
  selectCategory: selectCategory$1,
  selectConversation: selectConversation$1,
  sendIntroduction: sendIntroduction$1,
  serverMessageRequired: serverMessageRequired$1,
  serverN8nNotConfigured: serverN8nNotConfigured$1,
  serverN8nRequestFailed: serverN8nRequestFailed$1,
  serverReachN8nFailed: serverReachN8nFailed$1,
  settings: settings$1,
  settingsSaveFailed: settingsSaveFailed$1,
  settingsSaved: settingsSaved$1,
  share: share$1,
  shareThoughts: shareThoughts$1,
  sharedLocation: sharedLocation$1,
  shopMockBigMacDealContent: shopMockBigMacDealContent$1,
  shopMockBigMacDealTitle: shopMockBigMacDealTitle$1,
  shopMockExtendedHoursContent: shopMockExtendedHoursContent$1,
  shopMockLatestDealsContent: shopMockLatestDealsContent$1,
  shopping: shopping$1,
  showAddressTo: showAddressTo$1,
  showAllPeople: showAllPeople$1,
  showFriendsOnly: showFriendsOnly$1,
  showNoOne: showNoOne$1,
  showOnlineStatus: showOnlineStatus$1,
  showSpecificPeopleOnly: showSpecificPeopleOnly$1,
  small: small$1,
  socialClub: socialClub$1,
  sortBy: sortBy$1,
  specialOffer: specialOffer$1,
  specificPeople: specificPeople$1,
  specificPeoplePlaceholder: specificPeoplePlaceholder$1,
  startTime: startTime$1,
  status: status$1,
  street: street$1,
  streetPlaceholder: streetPlaceholder$1,
  submit: submit$1,
  sunday: sunday$1,
  supermarket: supermarket$1,
  systemNotifications: systemNotifications$1,
  tagHint: tagHint$1,
  tags: tags$1,
  tagsOptional: tagsOptional$1,
  termsOfService: termsOfService$1,
  termsOfServiceComingSoon: termsOfServiceComingSoon$1,
  themeColor: themeColor$1,
  themePreview: themePreview$1,
  thursday: thursday$1,
  timeFormat: timeFormat$1,
  timeSelect: timeSelect$1,
  title: title$1,
  titleLength: titleLength$1,
  tuesday: tuesday$1,
  typeMessage: typeMessage$1,
  typeQuestion: typeQuestion$1,
  unknownUser: unknownUser$1,
  updatedOpeningHours: updatedOpeningHours$1,
  uploadTip: uploadTip$1,
  urgentPleaseRespond: urgentPleaseRespond$1,
  username: username$1,
  usernameLength: usernameLength$1,
  version: version$1,
  versionMessage: versionMessage$1,
  video: video$1,
  visible: visible$1,
  warningTitle: warningTitle$1,
  weatherCity: weatherCity$1,
  weatherClear: weatherClear$1,
  weatherCloudy: weatherCloudy$1,
  weatherDateMon: weatherDateMon$1,
  weatherDayFri: weatherDayFri$1,
  weatherDayThu: weatherDayThu$1,
  weatherDayTue: weatherDayTue$1,
  weatherDayWed: weatherDayWed$1,
  weatherDrizzle: weatherDrizzle$1,
  weatherFog: weatherFog$1,
  weatherLocationUnknown: weatherLocationUnknown$1,
  weatherPartlyCloudy: weatherPartlyCloudy$1,
  weatherRain: weatherRain$1,
  weatherSnow: weatherSnow$1,
  weatherSunny: weatherSunny$1,
  weatherThunderstorm: weatherThunderstorm$1,
  weatherUnknown: weatherUnknown$1,
  website: website$1,
  wednesday: wednesday$1,
  welcomeMessage: welcomeMessage$1,
  welcomeTitle: welcomeTitle$1,
  yes: yes$1,
  youAreHere: youAreHere$1,
  yourIntroduction: yourIntroduction$1,
  yourPost: yourPost$1,
  yourRewardPoints: yourRewardPoints$1,
  youthCenter: youthCenter$1
}, Symbol.toStringTag, { value: 'Module' }));

var neighbourHood = "鄰到里";
var login = "登入";
var loggingIn = "登入中...";
var loginTitle = "歡迎回來";
var loginSubtitle = "登入繼續";
var email = "電郵：";
var password = "密碼：";
var emailPlaceholder = "請輸入電郵";
var passwordPlaceholder = "請輸入密碼";
var rememberMe = "記住我";
var brandTitle = "鄰到里";
var brandDescription = "連結你的社區";
var appName = "鄰到里";
var searchPosts = "搜尋文章...";
var loadingPosts = "載入文章中...";
var profile = "個人資料";
var settings = "設置";
var language = "語言";
var logout = "登出";
var createNewPost = "發表文章";
var home = "首頁";
var posts = "文章";
var nearbyShops = "附近商店";
var nearbyCommunity = "附近社區";
var messages = "訊息";
var friends = "朋友";
var aiAssistant = "AI 助手";
var buildingInfo = "大廈資訊";
var askAI = "詢問AI關於大廈資訊...";
var aiWelcome = "你好！我是你的大廈AI助手。你可以問我關於條例、會議紀錄、大廈管理等問題。";
var exampleQuestions = "範例問題：";
var chatHistory = "聊天記錄";
var newChat = "新對話";
var noChatHistory = "暫時沒有聊天記錄";
var renameChatTitle = "重新命名對話";
var renameChatPlaceholder = "輸入新的對話名稱";
var renameChatRequired = "請輸入對話名稱";
var deleteChatTitle = "刪除對話";
var deleteChatConfirm = "確定要刪除此聊天記錄？";
var exampleQ1 = "噪音條例是什麼？";
var exampleQ2 = "大廈主席是誰？";
var exampleQ3 = "下次會議是什麼時候？";
var exampleQ4 = "停車規則是什麼？";
var typeQuestion = "輸入你的問題...";
var welcomeTitle = "歡迎來到鄰到里!";
var welcomeMessage = "與你的鄰居聯繫、分享故事，一起建立更強大的社區。";
var browseCommunities = "瀏覽社區";
var recentPosts = "最近的文章";
var recentlyAcceptedQuests = "最近接受的任務";
var yourPost = "你的文章";
var category = "分類";
var all = "全部";
var news = "新聞";
var events = "活動";
var help = "求助";
var general = "一般";
var noPosts = "還沒有文章";
var noAcceptedQuests = "還沒有接受的任務";
var share = "分享";
var sortBy = "排序方式";
var latest = "最新";
var oldest = "最舊";
var mostLikes = "最多讚";
var leastLikes = "最少讚";
var mostComments = "最多留言";
var leastComments = "最少留言";
var searchQuests = "搜尋任務...";
var highestReward = "最高獎勵";
var lowestReward = "最低獎勵";
var myLocation = "我的位置";
var gettingLocation = "正在獲取您的位置...";
var loadingShops = "正在載入附近商店...";
var allCategories = "所有類別";
var restaurant = "餐廳";
var convenienceStore = "便利店";
var coffeeShop = "咖啡店";
var supermarket = "超市";
var pharmacy = "藥房";
var bakery = "麵包店";
var searchShops = "搜尋商店...";
var searchCommunities = "搜尋社區組織...";
var loadingCommunities = "載入附近社區組織中...";
var noCommunityFound = "附近沒有找到社區組織。顯示範例資料。";
var failedToLoadCommunities = "無法載入社區組織。請重試。";
var ngo = "非政府組織";
var charityOrg = "慈善組織";
var communityCenter = "社區中心";
var socialClub = "社交俱樂部";
var religiousOrg = "宗教組織";
var youthCenter = "青年中心";
var communityEvents = "社區活動與計畫";
var noEvents = "沒有安排活動";
var event = "活動";
var program = "計畫";
var imagePreview = "圖片預覽";
var createNewPostTitle = "建立新文章";
var title = "標題";
var enterTitle = "輸入文章標題...";
var content = "內容";
var shareThoughts = "與社區分享你的想法...";
var imagesOptional = "圖片（可選）";
var tagsOptional = "標籤（可選）";
var addTags = "新增標籤如 #寵物照顧, #維修...";
var tagHint = "提示：標籤應以 # 開頭（例如：#寵物照顧）";
var cancel = "取消";
var publishPost = "發表文章";
var selectCategory = "選擇分類";
var enterContent = "請輸入內容";
var pleaseEnterTitle = "請輸入標題";
var titleLength = "標題必須在3到100個字符之間";
var pleaseSelectCategory = "請選擇分類";
var contentLength = "內容必須在10到2000個字符之間";
var fillRequired = "請正確填寫所有必填字段";
var onlyImages = "只允許上傳圖片文件！";
var imageSize = "圖片大小不能超過5MB！";
var postSuccess = "文章發表成功！";
var postFailed = "發表文章失敗，請重試。";
var noShopsFound = "附近沒有找到商店。顯示示例數據。";
var failedToLoadShops = "無法加載商店。顯示示例數據。";
var failedLoadShops = "無法加載商店。顯示示例數據。";
var addressNotAvailable = "地址不可用";
var hoursNotAvailable = "營業時間不可用";
var geolocationNotSupported = "您的瀏覽器不支援地理定位。";
var couldNotGetLocation = "無法獲取您的位置。顯示預設區域。";
var questRequests = "任務請求";
var createQuestRequest = "建立任務請求";
var yourRewardPoints = "你的獎勵點數";
var redeemRewards = "兌換獎勵";
var fillAllFields = "請填寫所有必填欄位";
var questCreatedSuccess = "任務請求建立成功！";
var cannotAcceptOwnRequest = "你不能接受自己的請求";
var questAlreadyAccepted = "此任務已被接受";
var alreadyAcceptedOne = "你已經接受了1個請求";
var questAcceptedSuccess = "任務已接受！祝你好運！";
var acceptedQuest = "已接受任務";
var notEnoughPoints = "點數不足";
var redeemSuccess = "成功兌換{name}！";
var distance = "距離";
var address = "地址";
var hours = "營業時間";
var phone = "電話";
var website = "網站";
var announcementsAndSales = "公告與促銷";
var noAnnouncements = "暫無公告";
var search = "搜尋...";
var activeNow = "現在活躍";
var selectConversation = "選擇對話開始聊天";
var searchFriends = "搜尋朋友...";
var status = "狀態";
var online = "線上";
var offline = "離線";
var message = "訊息";
var call = "電話";
var edit = "編輯";
var report = "檢舉";
var introduceYourself = "自我介紹";
var missionDetails = "任務詳情";
var yourIntroduction = "您的介紹";
var introductionHint = "告訴請求者為什麼你最適合這個任務！";
var introductionPlaceholder = "例如：您好！我在這個領域有5年經驗，很樂意幫忙...";
var sendIntroduction = "發送介紹";
var missionApplication = "任務申請";
var mission = "任務：";
var introduction = "介紹：";
var clickToViewDetails = "點擊查看完整詳情";
var typeMessage = "輸入訊息...";
var save = "儲存";
var detail = "詳細資訊";
var tags = "標籤";
var paymentMethod = "付款方式";
var faceToFace = "面對面";
var rewardPoints = "獎勵點數";
var enterQuestTitle = "輸入任務標題";
var enterQuestDetails = "輸入任務詳情";
var pleaseEnterQuestDetails = "請輸入任務詳情";
var points = "點數";
var sale = "促銷";
var notice = "公告";
var likes = "讚";
var comments = "評論";
var availablePoints = "可用點數";
var redeem = "兌換";
var communities = "社區";
var payment = "付款";
var acceptedBy = "已被接受";
var acceptQuest = "接受任務";
var details = "詳細資訊";
var create = "建立";
var invalidCredentials = "電郵或密碼錯誤";
var logingFailed = "登入失敗，請重試。";
var profileSettings = "個人資料設定";
var profilePicture = "個人頭像";
var changePhoto = "更換照片";
var username = "用戶名稱";
var enterUsername = "輸入你的用戶名稱";
var pleaseEnterUsername = "請輸入用戶名稱";
var usernameLength = "用戶名稱必須在2到50個字元之間";
var bio = "個人簡介";
var bioPlaceholder = "介紹一下你自己...";
var themeColor = "主題顏色";
var themePreview = "這是你的主題顏色效果！";
var availability = "可用時間表";
var availabilityHint = "選擇你可以幫助完成任務的日期和時間";
var fullDayAll = "所有日期和時間";
var clearAll = "清除全部";
var startTime = "開始時間";
var endTime = "結束時間";
var monday = "星期一";
var tuesday = "星期二";
var wednesday = "星期三";
var thursday = "星期四";
var friday = "星期五";
var saturday = "星期六";
var sunday = "星期日";
var notifications = "通知偏好設定";
var questNotifications = "任務";
var messageNotifications = "訊息";
var postNotifications = "文章";
var saveChanges = "儲存變更";
var avatarSize = "頭像圖片大小不能超過2MB！";
var profileSaved = "個人資料已成功儲存！";
var profileSaveFailed = "儲存個人資料失敗，請重試。";
var emailUpdateUnauthorized = "因權限或登入狀態問題，電郵未能更新；其他個人資料已儲存。";
var appearance = "外觀";
var fontSize = "字體大小";
var small = "小";
var medium = "中";
var large = "大";
var extraLarge = "特大";
var fontSizePreview = "這是你選擇的字體大小預覽。";
var displayMode = "顯示模式";
var darkMode = "深色模式";
var lightMode = "淺色模式";
var layoutDensity = "版面密度";
var compactMode = "緊湊";
var comfortableMode = "舒適";
var notificationPreferences = "通知偏好設定";
var friendNotifications = "朋友";
var systemNotifications = "系統";
var notificationSound = "通知聲音";
var enabled = "啟用";
var disabled = "停用";
var emailNotifications = "電郵通知";
var languageAndRegion = "語言與地區";
var hour = "小時";
var timeFormat = "時間格式";
var dateFormat = "日期格式";
var privacyAndSecurity = "隱私與安全";
var others = "其他";
var appFeedback = "應用程式意見反饋";
var communityFeedback = "社區意見反饋";
var aboutUs = "關於我們";
var version = "版本";
var helpCenter = "幫助中心";
var privacyPolicy = "隱私政策";
var termsOfService = "服務條款";
var feedbackDescription = "意見描述";
var feedbackPlaceholder = "請詳細描述您的意見反饋。我們非常重視您的意見！";
var attachments = "附件（選填）";
var uploadTip = "您可以上傳最多5張照片或影片（每個檔案最大10MB）";
var maxFilesExceeded = "最多只能上傳5個檔案";
var pleaseEnterFeedback = "請輸入您的意見";
var feedbackSubmitted = "感謝您的意見反饋！";
var preview = "預覽";
var submit = "提交";
var helpCenterComingSoon = "幫助中心功能即將推出！";
var aboutUsMessage = "關於我們：To-Link v1.0.0 - 與您的社區連結！";
var privacyPolicyComingSoon = "隱私政策功能即將推出！";
var termsOfServiceComingSoon = "服務條款功能即將推出！";
var versionMessage = "To-Link 版本 1.0.0";
var profileVisibility = "個人資料可見度";
var friendsOnly = "僅朋友";
var showOnlineStatus = "顯示線上狀態";
var visible = "可見";
var hidden = "隱藏";
var allowMessages = "允許訊息來自";
var everyone = "所有人";
var noOne = "無人";
var on = "開啟";
var off = "關閉";
var settingsSaved = "設定已成功儲存！";
var settingsSaveFailed = "儲存設定失敗，請重試。";
var languageChanged = "語言已成功更改！";
var languageChangeFailed = "更改語言失敗。";
var postCreatedSuccess = "文章已成功建立！";
var postCreateFailed = "建立文章失敗，請重試。";
var postUpdatedSuccess = "文章已成功更新！";
var confirmDeletePostMessage = "您確定要刪除此文章嗎？";
var deletePostTitle = "刪除文章";
var postDeletedSuccess = "文章已成功刪除！";
var reportComingSoon = "檢舉功能即將推出！";
var questUpdatedSuccess = "任務已成功更新！";
var confirmDeleteQuestMessage = "您確定要刪除此任務嗎？";
var deleteQuestTitle = "刪除任務";
var questDeletedSuccess = "任務已成功刪除！";
var specialOffer = "{shopName}的特別優惠";
var updatedOpeningHours = "{shopName}更新營業時間";
var youAreHere = "您在這裡";
var timeSelect = "時間";
var To = "至";
var shopping = "代買代取";
var repair = "家務維修";
var care = "臨時照顧";
var daily = "生活協助";
var other = "其他";
var fireEmergency = "⚠️火警緊急情況";
var powerOutage = "停電";
var floodAlert = "水浸警報";
var callSecurity = "致電保安";
var emergencyGroupChat = "緊急群組對話";
var pleaseHelp = "請求協助 — 緊急需要援助！";
var pleaseCheck = "請檢查 — 有停電通報！";
var callSecurityNow = "請立即聯絡保安！";
var urgentPleaseRespond = "緊急 — 請回覆！";
var emergencyAlert = "緊急警報";
var emergencySent = "緊急訊息已發送。";
var emergencyFailed = "發送緊急訊息失敗。";
var photo = "照片";
var video = "影片";
var document = "文件";
var audio = "音訊";
var location = "位置";
var fileTooLarge = "文件大小不能超過10MB";
var fileSent = "文件已成功發送";
var fileFailed = "文件上傳失敗";
var download = "下載";
var sharedLocation = "分享的位置";
var openInMaps = "在地圖中打開";
var locationShared = "位置已成功分享";
var locationError = "無法獲取您的位置";
var locationNotSupported = "您的瀏覽器不支援位置分享";
var locationDataLoadFailed = "載入地理資料失敗，請稍後再試。";
var addressSection = "地址";
var addressHint = "加入你的地址資料，你可以為每一項設定可見對象。";
var addressCustomOptionHint = "若清單沒有，請輸入並按 Enter";
var country = "國家";
var countryPlaceholder = "選擇國家";
var nation = "地區／州";
var nationPlaceholder = "選擇地區／州";
var nationSelectCountryFirst = "請先選擇國家";
var areaSelectNationFirst = "請先選擇地區／州";
var countryChina = "中國";
var countryUnitedKingdom = "英國";
var countryUnitedStates = "美國";
var nationGuangdong = "廣東";
var nationBeijing = "北京";
var nationShanghai = "上海";
var nationEngland = "英格蘭";
var nationScotland = "蘇格蘭";
var nationWales = "威爾斯";
var nationNorthernIreland = "北愛爾蘭";
var nationCalifornia = "加州";
var nationNewYork = "紐約州";
var nationTexas = "德州";
var area = "地區";
var areaPlaceholder = "選擇地區";
var areaKowloon = "九龍";
var areaHongKong = "香港";
var areaNewTerritories = "新界";
var street = "街道";
var streetPlaceholder = "輸入街道名稱";
var buildingName = "大廈名稱";
var buildingPlaceholder = "輸入大廈名稱";
var floor = "樓層";
var floorPlaceholder = "輸入樓層";
var roomNumber = "房號";
var roomPlaceholder = "輸入房號";
var addressPrivacyTitle = "{item}的私隱設定";
var showAddressTo = "此地址項目顯示給";
var showNoOne = "不顯示給任何人";
var showFriendsOnly = "只限朋友";
var showSpecificPeopleOnly = "只限指定人士";
var showAllPeople = "所有人";
var specificPeople = "指定人士";
var specificPeoplePlaceholder = "輸入姓名，請用逗號分隔";
var addressAllWarningMessage = "將此地址項目分享給所有人並不安全。你確定要顯示給所有人嗎？";
var warningTitle = "警告";
var yes = "是";
var no = "否";
var languageEnglish = "英文";
var languageEnglishWithFlag = "🇬🇧 英文";
var languageChineseTraditional = "繁體中文";
var languageChineseTraditionalWithFlag = "🇭🇰 繁體中文";
var aiNoInfoMessage = "我暫時未能在現有文件中找到相關資料，請聯絡管理處。";
var aiConnectionErrorMessage = "暫時無法連接 AI 服務，請稍後再試。";
var communityMockMeetupTitle = "{name}社區聚會";
var communityMockMeetupContent = "加入我們的社區聚會和交流活動！";
var communityMockVolunteerTitle = "志願者計劃";
var communityMockVolunteerContent = "為我們的社區帶來改變。報名參加我們的志願者計劃！";
var communityMockYouthWorkshopTitle = "青年工作坊";
var communityMockYouthWorkshopContent = "針對12-18歲青少年的創意工作坊。";
var communityMockCenterName = "社區關懷中心";
var communityMockNearbyLocation = "附近位置";
var communityMockHealthFairTitle = "社區健康博覽會";
var communityMockHealthFairContent = "為所有年齡層提供免費健康檢查和健康活動。";
var communityMockSeniorSupportTitle = "長者支援計劃";
var communityMockSeniorSupportContent = "為長者提供的每週計劃和活動。";
var communityMockEveryTuesday = "每週二";
var communityMockHopeFoundationName = "希望基金會（NGO）";
var communityMockFoodDriveTitle = "食物捐贈活動";
var communityMockFoodDriveContent = "幫助我們為有需要的家庭收集食物。";
var communityMockYouthCenterName = "青年活動中心";
var communityMockTeenGameNightTitle = "青少年遊戲之夜";
var communityMockTeenGameNightContent = "為青少年提供有趣的遊戲和社交活動。";
var shopMockLatestDealsContent = "查看我們最新的優惠和促銷！";
var shopMockExtendedHoursContent = "我們延長了營業時間！";
var shopMockBigMacDealTitle = "巨無霸套餐優惠";
var shopMockBigMacDealContent = "巨無霸套餐只需 $5.99！";
var serverN8nNotConfigured = "伺服器尚未設定 n8n webhook";
var serverMessageRequired = "必須提供訊息內容";
var serverReachN8nFailed = "無法連接 n8n webhook";
var serverN8nRequestFailed = "n8n webhook 請求失敗：{details}";
var pendingQuest = "待處理任務";
var noPendingQuests = "沒有待處理任務";
var pendingApplicants = "申請者";
var approve = "核准";
var questOnHold = "處理中";
var questApprovedSuccess = "任務已成功確認接單！";
var alreadyAppliedQuest = "你已經申請過此任務";
var questApplicationSubmitted = "已提交申請，等待發佈者確認。";
var unknownUser = "未知用戶";
var backToTop = "返回頂部";
var openLoginPage = "點擊進入登入頁";
var hoverForInfo = "懸停查看資訊";
var assistanceSupport = "協助和支援";
var importantInformation = "重要資訊";
var othersTooltipDescription = "此選單可用於提交回饋、社區建議與查看平台政策。";
var premiumFeature = "進階功能";
var weatherSunny = "晴朗";
var weatherCity = "定位中...";
var weatherDateMon = "週一 08-23";
var weatherDayTue = "週二";
var weatherDayWed = "週三";
var weatherDayThu = "週四";
var weatherDayFri = "週五";
var weatherClear = "晴天";
var weatherPartlyCloudy = "局部多雲";
var weatherCloudy = "多雲";
var weatherFog = "有霧";
var weatherDrizzle = "毛毛雨";
var weatherRain = "下雨";
var weatherSnow = "下雪";
var weatherThunderstorm = "雷暴";
var weatherUnknown = "天氣";
var weatherLocationUnknown = "無法取得位置";
const zhLocale = {
	neighbourHood: neighbourHood,
	login: login,
	loggingIn: loggingIn,
	loginTitle: loginTitle,
	loginSubtitle: loginSubtitle,
	email: email,
	password: password,
	emailPlaceholder: emailPlaceholder,
	passwordPlaceholder: passwordPlaceholder,
	rememberMe: rememberMe,
	brandTitle: brandTitle,
	brandDescription: brandDescription,
	appName: appName,
	searchPosts: searchPosts,
	loadingPosts: loadingPosts,
	profile: profile,
	settings: settings,
	language: language,
	logout: logout,
	createNewPost: createNewPost,
	home: home,
	posts: posts,
	nearbyShops: nearbyShops,
	nearbyCommunity: nearbyCommunity,
	messages: messages,
	friends: friends,
	aiAssistant: aiAssistant,
	buildingInfo: buildingInfo,
	askAI: askAI,
	aiWelcome: aiWelcome,
	exampleQuestions: exampleQuestions,
	chatHistory: chatHistory,
	newChat: newChat,
	noChatHistory: noChatHistory,
	renameChatTitle: renameChatTitle,
	renameChatPlaceholder: renameChatPlaceholder,
	renameChatRequired: renameChatRequired,
	deleteChatTitle: deleteChatTitle,
	deleteChatConfirm: deleteChatConfirm,
	exampleQ1: exampleQ1,
	exampleQ2: exampleQ2,
	exampleQ3: exampleQ3,
	exampleQ4: exampleQ4,
	typeQuestion: typeQuestion,
	welcomeTitle: welcomeTitle,
	welcomeMessage: welcomeMessage,
	browseCommunities: browseCommunities,
	recentPosts: recentPosts,
	recentlyAcceptedQuests: recentlyAcceptedQuests,
	yourPost: yourPost,
	category: category,
	all: all,
	news: news,
	events: events,
	help: help,
	general: general,
	noPosts: noPosts,
	noAcceptedQuests: noAcceptedQuests,
	share: share,
	sortBy: sortBy,
	latest: latest,
	oldest: oldest,
	mostLikes: mostLikes,
	leastLikes: leastLikes,
	mostComments: mostComments,
	leastComments: leastComments,
	searchQuests: searchQuests,
	highestReward: highestReward,
	lowestReward: lowestReward,
	myLocation: myLocation,
	gettingLocation: gettingLocation,
	loadingShops: loadingShops,
	allCategories: allCategories,
	restaurant: restaurant,
	convenienceStore: convenienceStore,
	coffeeShop: coffeeShop,
	supermarket: supermarket,
	pharmacy: pharmacy,
	bakery: bakery,
	searchShops: searchShops,
	searchCommunities: searchCommunities,
	loadingCommunities: loadingCommunities,
	noCommunityFound: noCommunityFound,
	failedToLoadCommunities: failedToLoadCommunities,
	ngo: ngo,
	charityOrg: charityOrg,
	communityCenter: communityCenter,
	socialClub: socialClub,
	religiousOrg: religiousOrg,
	youthCenter: youthCenter,
	communityEvents: communityEvents,
	noEvents: noEvents,
	event: event,
	program: program,
	imagePreview: imagePreview,
	createNewPostTitle: createNewPostTitle,
	title: title,
	enterTitle: enterTitle,
	content: content,
	shareThoughts: shareThoughts,
	imagesOptional: imagesOptional,
	tagsOptional: tagsOptional,
	addTags: addTags,
	tagHint: tagHint,
	cancel: cancel,
	publishPost: publishPost,
	selectCategory: selectCategory,
	enterContent: enterContent,
	pleaseEnterTitle: pleaseEnterTitle,
	titleLength: titleLength,
	pleaseSelectCategory: pleaseSelectCategory,
	contentLength: contentLength,
	fillRequired: fillRequired,
	onlyImages: onlyImages,
	imageSize: imageSize,
	postSuccess: postSuccess,
	postFailed: postFailed,
	noShopsFound: noShopsFound,
	failedToLoadShops: failedToLoadShops,
	failedLoadShops: failedLoadShops,
	addressNotAvailable: addressNotAvailable,
	hoursNotAvailable: hoursNotAvailable,
	geolocationNotSupported: geolocationNotSupported,
	couldNotGetLocation: couldNotGetLocation,
	questRequests: questRequests,
	createQuestRequest: createQuestRequest,
	yourRewardPoints: yourRewardPoints,
	redeemRewards: redeemRewards,
	fillAllFields: fillAllFields,
	questCreatedSuccess: questCreatedSuccess,
	cannotAcceptOwnRequest: cannotAcceptOwnRequest,
	questAlreadyAccepted: questAlreadyAccepted,
	alreadyAcceptedOne: alreadyAcceptedOne,
	questAcceptedSuccess: questAcceptedSuccess,
	acceptedQuest: acceptedQuest,
	notEnoughPoints: notEnoughPoints,
	redeemSuccess: redeemSuccess,
	distance: distance,
	address: address,
	hours: hours,
	phone: phone,
	website: website,
	announcementsAndSales: announcementsAndSales,
	noAnnouncements: noAnnouncements,
	search: search,
	activeNow: activeNow,
	selectConversation: selectConversation,
	searchFriends: searchFriends,
	status: status,
	online: online,
	offline: offline,
	message: message,
	call: call,
	edit: edit,
	"delete": "刪除",
	report: report,
	introduceYourself: introduceYourself,
	missionDetails: missionDetails,
	yourIntroduction: yourIntroduction,
	introductionHint: introductionHint,
	introductionPlaceholder: introductionPlaceholder,
	sendIntroduction: sendIntroduction,
	missionApplication: missionApplication,
	mission: mission,
	introduction: introduction,
	clickToViewDetails: clickToViewDetails,
	typeMessage: typeMessage,
	save: save,
	detail: detail,
	tags: tags,
	paymentMethod: paymentMethod,
	faceToFace: faceToFace,
	rewardPoints: rewardPoints,
	enterQuestTitle: enterQuestTitle,
	enterQuestDetails: enterQuestDetails,
	pleaseEnterQuestDetails: pleaseEnterQuestDetails,
	points: points,
	sale: sale,
	notice: notice,
	likes: likes,
	comments: comments,
	availablePoints: availablePoints,
	redeem: redeem,
	communities: communities,
	payment: payment,
	acceptedBy: acceptedBy,
	acceptQuest: acceptQuest,
	details: details,
	create: create,
	invalidCredentials: invalidCredentials,
	logingFailed: logingFailed,
	profileSettings: profileSettings,
	profilePicture: profilePicture,
	changePhoto: changePhoto,
	username: username,
	enterUsername: enterUsername,
	pleaseEnterUsername: pleaseEnterUsername,
	usernameLength: usernameLength,
	bio: bio,
	bioPlaceholder: bioPlaceholder,
	themeColor: themeColor,
	themePreview: themePreview,
	availability: availability,
	availabilityHint: availabilityHint,
	fullDayAll: fullDayAll,
	clearAll: clearAll,
	startTime: startTime,
	endTime: endTime,
	monday: monday,
	tuesday: tuesday,
	wednesday: wednesday,
	thursday: thursday,
	friday: friday,
	saturday: saturday,
	sunday: sunday,
	notifications: notifications,
	questNotifications: questNotifications,
	messageNotifications: messageNotifications,
	postNotifications: postNotifications,
	saveChanges: saveChanges,
	avatarSize: avatarSize,
	profileSaved: profileSaved,
	profileSaveFailed: profileSaveFailed,
	emailUpdateUnauthorized: emailUpdateUnauthorized,
	appearance: appearance,
	fontSize: fontSize,
	small: small,
	medium: medium,
	large: large,
	extraLarge: extraLarge,
	fontSizePreview: fontSizePreview,
	displayMode: displayMode,
	darkMode: darkMode,
	lightMode: lightMode,
	layoutDensity: layoutDensity,
	compactMode: compactMode,
	comfortableMode: comfortableMode,
	notificationPreferences: notificationPreferences,
	friendNotifications: friendNotifications,
	systemNotifications: systemNotifications,
	notificationSound: notificationSound,
	enabled: enabled,
	disabled: disabled,
	emailNotifications: emailNotifications,
	languageAndRegion: languageAndRegion,
	hour: hour,
	timeFormat: timeFormat,
	dateFormat: dateFormat,
	privacyAndSecurity: privacyAndSecurity,
	others: others,
	appFeedback: appFeedback,
	communityFeedback: communityFeedback,
	aboutUs: aboutUs,
	version: version,
	helpCenter: helpCenter,
	privacyPolicy: privacyPolicy,
	termsOfService: termsOfService,
	feedbackDescription: feedbackDescription,
	feedbackPlaceholder: feedbackPlaceholder,
	attachments: attachments,
	uploadTip: uploadTip,
	maxFilesExceeded: maxFilesExceeded,
	pleaseEnterFeedback: pleaseEnterFeedback,
	feedbackSubmitted: feedbackSubmitted,
	preview: preview,
	submit: submit,
	helpCenterComingSoon: helpCenterComingSoon,
	aboutUsMessage: aboutUsMessage,
	privacyPolicyComingSoon: privacyPolicyComingSoon,
	termsOfServiceComingSoon: termsOfServiceComingSoon,
	versionMessage: versionMessage,
	profileVisibility: profileVisibility,
	"public": "公開",
	friendsOnly: friendsOnly,
	"private": "私人",
	showOnlineStatus: showOnlineStatus,
	visible: visible,
	hidden: hidden,
	allowMessages: allowMessages,
	everyone: everyone,
	noOne: noOne,
	on: on,
	off: off,
	settingsSaved: settingsSaved,
	settingsSaveFailed: settingsSaveFailed,
	languageChanged: languageChanged,
	languageChangeFailed: languageChangeFailed,
	postCreatedSuccess: postCreatedSuccess,
	postCreateFailed: postCreateFailed,
	postUpdatedSuccess: postUpdatedSuccess,
	confirmDeletePostMessage: confirmDeletePostMessage,
	deletePostTitle: deletePostTitle,
	postDeletedSuccess: postDeletedSuccess,
	reportComingSoon: reportComingSoon,
	questUpdatedSuccess: questUpdatedSuccess,
	confirmDeleteQuestMessage: confirmDeleteQuestMessage,
	deleteQuestTitle: deleteQuestTitle,
	questDeletedSuccess: questDeletedSuccess,
	specialOffer: specialOffer,
	updatedOpeningHours: updatedOpeningHours,
	youAreHere: youAreHere,
	timeSelect: timeSelect,
	To: To,
	shopping: shopping,
	repair: repair,
	care: care,
	daily: daily,
	other: other,
	fireEmergency: fireEmergency,
	powerOutage: powerOutage,
	floodAlert: floodAlert,
	callSecurity: callSecurity,
	emergencyGroupChat: emergencyGroupChat,
	pleaseHelp: pleaseHelp,
	pleaseCheck: pleaseCheck,
	callSecurityNow: callSecurityNow,
	urgentPleaseRespond: urgentPleaseRespond,
	emergencyAlert: emergencyAlert,
	emergencySent: emergencySent,
	emergencyFailed: emergencyFailed,
	photo: photo,
	video: video,
	document: document,
	audio: audio,
	location: location,
	fileTooLarge: fileTooLarge,
	fileSent: fileSent,
	fileFailed: fileFailed,
	download: download,
	sharedLocation: sharedLocation,
	openInMaps: openInMaps,
	locationShared: locationShared,
	locationError: locationError,
	locationNotSupported: locationNotSupported,
	locationDataLoadFailed: locationDataLoadFailed,
	addressSection: addressSection,
	addressHint: addressHint,
	addressCustomOptionHint: addressCustomOptionHint,
	country: country,
	countryPlaceholder: countryPlaceholder,
	nation: nation,
	nationPlaceholder: nationPlaceholder,
	nationSelectCountryFirst: nationSelectCountryFirst,
	areaSelectNationFirst: areaSelectNationFirst,
	countryChina: countryChina,
	countryUnitedKingdom: countryUnitedKingdom,
	countryUnitedStates: countryUnitedStates,
	nationGuangdong: nationGuangdong,
	nationBeijing: nationBeijing,
	nationShanghai: nationShanghai,
	nationEngland: nationEngland,
	nationScotland: nationScotland,
	nationWales: nationWales,
	nationNorthernIreland: nationNorthernIreland,
	nationCalifornia: nationCalifornia,
	nationNewYork: nationNewYork,
	nationTexas: nationTexas,
	area: area,
	areaPlaceholder: areaPlaceholder,
	areaKowloon: areaKowloon,
	areaHongKong: areaHongKong,
	areaNewTerritories: areaNewTerritories,
	street: street,
	streetPlaceholder: streetPlaceholder,
	buildingName: buildingName,
	buildingPlaceholder: buildingPlaceholder,
	floor: floor,
	floorPlaceholder: floorPlaceholder,
	roomNumber: roomNumber,
	roomPlaceholder: roomPlaceholder,
	addressPrivacyTitle: addressPrivacyTitle,
	showAddressTo: showAddressTo,
	showNoOne: showNoOne,
	showFriendsOnly: showFriendsOnly,
	showSpecificPeopleOnly: showSpecificPeopleOnly,
	showAllPeople: showAllPeople,
	specificPeople: specificPeople,
	specificPeoplePlaceholder: specificPeoplePlaceholder,
	addressAllWarningMessage: addressAllWarningMessage,
	warningTitle: warningTitle,
	yes: yes,
	no: no,
	languageEnglish: languageEnglish,
	languageEnglishWithFlag: languageEnglishWithFlag,
	languageChineseTraditional: languageChineseTraditional,
	languageChineseTraditionalWithFlag: languageChineseTraditionalWithFlag,
	aiNoInfoMessage: aiNoInfoMessage,
	aiConnectionErrorMessage: aiConnectionErrorMessage,
	communityMockMeetupTitle: communityMockMeetupTitle,
	communityMockMeetupContent: communityMockMeetupContent,
	communityMockVolunteerTitle: communityMockVolunteerTitle,
	communityMockVolunteerContent: communityMockVolunteerContent,
	communityMockYouthWorkshopTitle: communityMockYouthWorkshopTitle,
	communityMockYouthWorkshopContent: communityMockYouthWorkshopContent,
	communityMockCenterName: communityMockCenterName,
	communityMockNearbyLocation: communityMockNearbyLocation,
	communityMockHealthFairTitle: communityMockHealthFairTitle,
	communityMockHealthFairContent: communityMockHealthFairContent,
	communityMockSeniorSupportTitle: communityMockSeniorSupportTitle,
	communityMockSeniorSupportContent: communityMockSeniorSupportContent,
	communityMockEveryTuesday: communityMockEveryTuesday,
	communityMockHopeFoundationName: communityMockHopeFoundationName,
	communityMockFoodDriveTitle: communityMockFoodDriveTitle,
	communityMockFoodDriveContent: communityMockFoodDriveContent,
	communityMockYouthCenterName: communityMockYouthCenterName,
	communityMockTeenGameNightTitle: communityMockTeenGameNightTitle,
	communityMockTeenGameNightContent: communityMockTeenGameNightContent,
	shopMockLatestDealsContent: shopMockLatestDealsContent,
	shopMockExtendedHoursContent: shopMockExtendedHoursContent,
	shopMockBigMacDealTitle: shopMockBigMacDealTitle,
	shopMockBigMacDealContent: shopMockBigMacDealContent,
	serverN8nNotConfigured: serverN8nNotConfigured,
	serverMessageRequired: serverMessageRequired,
	serverReachN8nFailed: serverReachN8nFailed,
	serverN8nRequestFailed: serverN8nRequestFailed,
	pendingQuest: pendingQuest,
	noPendingQuests: noPendingQuests,
	pendingApplicants: pendingApplicants,
	approve: approve,
	questOnHold: questOnHold,
	questApprovedSuccess: questApprovedSuccess,
	alreadyAppliedQuest: alreadyAppliedQuest,
	questApplicationSubmitted: questApplicationSubmitted,
	unknownUser: unknownUser,
	backToTop: backToTop,
	openLoginPage: openLoginPage,
	hoverForInfo: hoverForInfo,
	assistanceSupport: assistanceSupport,
	importantInformation: importantInformation,
	othersTooltipDescription: othersTooltipDescription,
	premiumFeature: premiumFeature,
	weatherSunny: weatherSunny,
	weatherCity: weatherCity,
	weatherDateMon: weatherDateMon,
	weatherDayTue: weatherDayTue,
	weatherDayWed: weatherDayWed,
	weatherDayThu: weatherDayThu,
	weatherDayFri: weatherDayFri,
	weatherClear: weatherClear,
	weatherPartlyCloudy: weatherPartlyCloudy,
	weatherCloudy: weatherCloudy,
	weatherFog: weatherFog,
	weatherDrizzle: weatherDrizzle,
	weatherRain: weatherRain,
	weatherSnow: weatherSnow,
	weatherThunderstorm: weatherThunderstorm,
	weatherUnknown: weatherUnknown,
	weatherLocationUnknown: weatherLocationUnknown
};

const zh = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  To: To,
  aboutUs: aboutUs,
  aboutUsMessage: aboutUsMessage,
  acceptQuest: acceptQuest,
  acceptedBy: acceptedBy,
  acceptedQuest: acceptedQuest,
  activeNow: activeNow,
  addTags: addTags,
  address: address,
  addressAllWarningMessage: addressAllWarningMessage,
  addressCustomOptionHint: addressCustomOptionHint,
  addressHint: addressHint,
  addressNotAvailable: addressNotAvailable,
  addressPrivacyTitle: addressPrivacyTitle,
  addressSection: addressSection,
  aiAssistant: aiAssistant,
  aiConnectionErrorMessage: aiConnectionErrorMessage,
  aiNoInfoMessage: aiNoInfoMessage,
  aiWelcome: aiWelcome,
  all: all,
  allCategories: allCategories,
  allowMessages: allowMessages,
  alreadyAcceptedOne: alreadyAcceptedOne,
  alreadyAppliedQuest: alreadyAppliedQuest,
  announcementsAndSales: announcementsAndSales,
  appFeedback: appFeedback,
  appName: appName,
  appearance: appearance,
  approve: approve,
  area: area,
  areaHongKong: areaHongKong,
  areaKowloon: areaKowloon,
  areaNewTerritories: areaNewTerritories,
  areaPlaceholder: areaPlaceholder,
  areaSelectNationFirst: areaSelectNationFirst,
  askAI: askAI,
  assistanceSupport: assistanceSupport,
  attachments: attachments,
  audio: audio,
  availability: availability,
  availabilityHint: availabilityHint,
  availablePoints: availablePoints,
  avatarSize: avatarSize,
  backToTop: backToTop,
  bakery: bakery,
  bio: bio,
  bioPlaceholder: bioPlaceholder,
  brandDescription: brandDescription,
  brandTitle: brandTitle,
  browseCommunities: browseCommunities,
  buildingInfo: buildingInfo,
  buildingName: buildingName,
  buildingPlaceholder: buildingPlaceholder,
  call: call,
  callSecurity: callSecurity,
  callSecurityNow: callSecurityNow,
  cancel: cancel,
  cannotAcceptOwnRequest: cannotAcceptOwnRequest,
  care: care,
  category: category,
  changePhoto: changePhoto,
  charityOrg: charityOrg,
  chatHistory: chatHistory,
  clearAll: clearAll,
  clickToViewDetails: clickToViewDetails,
  coffeeShop: coffeeShop,
  comfortableMode: comfortableMode,
  comments: comments,
  communities: communities,
  communityCenter: communityCenter,
  communityEvents: communityEvents,
  communityFeedback: communityFeedback,
  communityMockCenterName: communityMockCenterName,
  communityMockEveryTuesday: communityMockEveryTuesday,
  communityMockFoodDriveContent: communityMockFoodDriveContent,
  communityMockFoodDriveTitle: communityMockFoodDriveTitle,
  communityMockHealthFairContent: communityMockHealthFairContent,
  communityMockHealthFairTitle: communityMockHealthFairTitle,
  communityMockHopeFoundationName: communityMockHopeFoundationName,
  communityMockMeetupContent: communityMockMeetupContent,
  communityMockMeetupTitle: communityMockMeetupTitle,
  communityMockNearbyLocation: communityMockNearbyLocation,
  communityMockSeniorSupportContent: communityMockSeniorSupportContent,
  communityMockSeniorSupportTitle: communityMockSeniorSupportTitle,
  communityMockTeenGameNightContent: communityMockTeenGameNightContent,
  communityMockTeenGameNightTitle: communityMockTeenGameNightTitle,
  communityMockVolunteerContent: communityMockVolunteerContent,
  communityMockVolunteerTitle: communityMockVolunteerTitle,
  communityMockYouthCenterName: communityMockYouthCenterName,
  communityMockYouthWorkshopContent: communityMockYouthWorkshopContent,
  communityMockYouthWorkshopTitle: communityMockYouthWorkshopTitle,
  compactMode: compactMode,
  confirmDeletePostMessage: confirmDeletePostMessage,
  confirmDeleteQuestMessage: confirmDeleteQuestMessage,
  content: content,
  contentLength: contentLength,
  convenienceStore: convenienceStore,
  couldNotGetLocation: couldNotGetLocation,
  country: country,
  countryChina: countryChina,
  countryPlaceholder: countryPlaceholder,
  countryUnitedKingdom: countryUnitedKingdom,
  countryUnitedStates: countryUnitedStates,
  create: create,
  createNewPost: createNewPost,
  createNewPostTitle: createNewPostTitle,
  createQuestRequest: createQuestRequest,
  daily: daily,
  darkMode: darkMode,
  dateFormat: dateFormat,
  default: zhLocale,
  deleteChatConfirm: deleteChatConfirm,
  deleteChatTitle: deleteChatTitle,
  deletePostTitle: deletePostTitle,
  deleteQuestTitle: deleteQuestTitle,
  detail: detail,
  details: details,
  disabled: disabled,
  displayMode: displayMode,
  distance: distance,
  document: document,
  download: download,
  edit: edit,
  email: email,
  emailNotifications: emailNotifications,
  emailPlaceholder: emailPlaceholder,
  emailUpdateUnauthorized: emailUpdateUnauthorized,
  emergencyAlert: emergencyAlert,
  emergencyFailed: emergencyFailed,
  emergencyGroupChat: emergencyGroupChat,
  emergencySent: emergencySent,
  enabled: enabled,
  endTime: endTime,
  enterContent: enterContent,
  enterQuestDetails: enterQuestDetails,
  enterQuestTitle: enterQuestTitle,
  enterTitle: enterTitle,
  enterUsername: enterUsername,
  event: event,
  events: events,
  everyone: everyone,
  exampleQ1: exampleQ1,
  exampleQ2: exampleQ2,
  exampleQ3: exampleQ3,
  exampleQ4: exampleQ4,
  exampleQuestions: exampleQuestions,
  extraLarge: extraLarge,
  faceToFace: faceToFace,
  failedLoadShops: failedLoadShops,
  failedToLoadCommunities: failedToLoadCommunities,
  failedToLoadShops: failedToLoadShops,
  feedbackDescription: feedbackDescription,
  feedbackPlaceholder: feedbackPlaceholder,
  feedbackSubmitted: feedbackSubmitted,
  fileFailed: fileFailed,
  fileSent: fileSent,
  fileTooLarge: fileTooLarge,
  fillAllFields: fillAllFields,
  fillRequired: fillRequired,
  fireEmergency: fireEmergency,
  floodAlert: floodAlert,
  floor: floor,
  floorPlaceholder: floorPlaceholder,
  fontSize: fontSize,
  fontSizePreview: fontSizePreview,
  friday: friday,
  friendNotifications: friendNotifications,
  friends: friends,
  friendsOnly: friendsOnly,
  fullDayAll: fullDayAll,
  general: general,
  geolocationNotSupported: geolocationNotSupported,
  gettingLocation: gettingLocation,
  help: help,
  helpCenter: helpCenter,
  helpCenterComingSoon: helpCenterComingSoon,
  hidden: hidden,
  highestReward: highestReward,
  home: home,
  hour: hour,
  hours: hours,
  hoursNotAvailable: hoursNotAvailable,
  hoverForInfo: hoverForInfo,
  imagePreview: imagePreview,
  imageSize: imageSize,
  imagesOptional: imagesOptional,
  importantInformation: importantInformation,
  introduceYourself: introduceYourself,
  introduction: introduction,
  introductionHint: introductionHint,
  introductionPlaceholder: introductionPlaceholder,
  invalidCredentials: invalidCredentials,
  language: language,
  languageAndRegion: languageAndRegion,
  languageChangeFailed: languageChangeFailed,
  languageChanged: languageChanged,
  languageChineseTraditional: languageChineseTraditional,
  languageChineseTraditionalWithFlag: languageChineseTraditionalWithFlag,
  languageEnglish: languageEnglish,
  languageEnglishWithFlag: languageEnglishWithFlag,
  large: large,
  latest: latest,
  layoutDensity: layoutDensity,
  leastComments: leastComments,
  leastLikes: leastLikes,
  lightMode: lightMode,
  likes: likes,
  loadingCommunities: loadingCommunities,
  loadingPosts: loadingPosts,
  loadingShops: loadingShops,
  location: location,
  locationDataLoadFailed: locationDataLoadFailed,
  locationError: locationError,
  locationNotSupported: locationNotSupported,
  locationShared: locationShared,
  loggingIn: loggingIn,
  login: login,
  loginSubtitle: loginSubtitle,
  loginTitle: loginTitle,
  logingFailed: logingFailed,
  logout: logout,
  lowestReward: lowestReward,
  maxFilesExceeded: maxFilesExceeded,
  medium: medium,
  message: message,
  messageNotifications: messageNotifications,
  messages: messages,
  mission: mission,
  missionApplication: missionApplication,
  missionDetails: missionDetails,
  monday: monday,
  mostComments: mostComments,
  mostLikes: mostLikes,
  myLocation: myLocation,
  nation: nation,
  nationBeijing: nationBeijing,
  nationCalifornia: nationCalifornia,
  nationEngland: nationEngland,
  nationGuangdong: nationGuangdong,
  nationNewYork: nationNewYork,
  nationNorthernIreland: nationNorthernIreland,
  nationPlaceholder: nationPlaceholder,
  nationScotland: nationScotland,
  nationSelectCountryFirst: nationSelectCountryFirst,
  nationShanghai: nationShanghai,
  nationTexas: nationTexas,
  nationWales: nationWales,
  nearbyCommunity: nearbyCommunity,
  nearbyShops: nearbyShops,
  neighbourHood: neighbourHood,
  newChat: newChat,
  news: news,
  ngo: ngo,
  no: no,
  noAcceptedQuests: noAcceptedQuests,
  noAnnouncements: noAnnouncements,
  noChatHistory: noChatHistory,
  noCommunityFound: noCommunityFound,
  noEvents: noEvents,
  noOne: noOne,
  noPendingQuests: noPendingQuests,
  noPosts: noPosts,
  noShopsFound: noShopsFound,
  notEnoughPoints: notEnoughPoints,
  notice: notice,
  notificationPreferences: notificationPreferences,
  notificationSound: notificationSound,
  notifications: notifications,
  off: off,
  offline: offline,
  oldest: oldest,
  on: on,
  online: online,
  onlyImages: onlyImages,
  openInMaps: openInMaps,
  openLoginPage: openLoginPage,
  other: other,
  others: others,
  othersTooltipDescription: othersTooltipDescription,
  password: password,
  passwordPlaceholder: passwordPlaceholder,
  payment: payment,
  paymentMethod: paymentMethod,
  pendingApplicants: pendingApplicants,
  pendingQuest: pendingQuest,
  pharmacy: pharmacy,
  phone: phone,
  photo: photo,
  pleaseCheck: pleaseCheck,
  pleaseEnterFeedback: pleaseEnterFeedback,
  pleaseEnterQuestDetails: pleaseEnterQuestDetails,
  pleaseEnterTitle: pleaseEnterTitle,
  pleaseEnterUsername: pleaseEnterUsername,
  pleaseHelp: pleaseHelp,
  pleaseSelectCategory: pleaseSelectCategory,
  points: points,
  postCreateFailed: postCreateFailed,
  postCreatedSuccess: postCreatedSuccess,
  postDeletedSuccess: postDeletedSuccess,
  postFailed: postFailed,
  postNotifications: postNotifications,
  postSuccess: postSuccess,
  postUpdatedSuccess: postUpdatedSuccess,
  posts: posts,
  powerOutage: powerOutage,
  premiumFeature: premiumFeature,
  preview: preview,
  privacyAndSecurity: privacyAndSecurity,
  privacyPolicy: privacyPolicy,
  privacyPolicyComingSoon: privacyPolicyComingSoon,
  profile: profile,
  profilePicture: profilePicture,
  profileSaveFailed: profileSaveFailed,
  profileSaved: profileSaved,
  profileSettings: profileSettings,
  profileVisibility: profileVisibility,
  program: program,
  publishPost: publishPost,
  questAcceptedSuccess: questAcceptedSuccess,
  questAlreadyAccepted: questAlreadyAccepted,
  questApplicationSubmitted: questApplicationSubmitted,
  questApprovedSuccess: questApprovedSuccess,
  questCreatedSuccess: questCreatedSuccess,
  questDeletedSuccess: questDeletedSuccess,
  questNotifications: questNotifications,
  questOnHold: questOnHold,
  questRequests: questRequests,
  questUpdatedSuccess: questUpdatedSuccess,
  recentPosts: recentPosts,
  recentlyAcceptedQuests: recentlyAcceptedQuests,
  redeem: redeem,
  redeemRewards: redeemRewards,
  redeemSuccess: redeemSuccess,
  religiousOrg: religiousOrg,
  rememberMe: rememberMe,
  renameChatPlaceholder: renameChatPlaceholder,
  renameChatRequired: renameChatRequired,
  renameChatTitle: renameChatTitle,
  repair: repair,
  report: report,
  reportComingSoon: reportComingSoon,
  restaurant: restaurant,
  rewardPoints: rewardPoints,
  roomNumber: roomNumber,
  roomPlaceholder: roomPlaceholder,
  sale: sale,
  saturday: saturday,
  save: save,
  saveChanges: saveChanges,
  search: search,
  searchCommunities: searchCommunities,
  searchFriends: searchFriends,
  searchPosts: searchPosts,
  searchQuests: searchQuests,
  searchShops: searchShops,
  selectCategory: selectCategory,
  selectConversation: selectConversation,
  sendIntroduction: sendIntroduction,
  serverMessageRequired: serverMessageRequired,
  serverN8nNotConfigured: serverN8nNotConfigured,
  serverN8nRequestFailed: serverN8nRequestFailed,
  serverReachN8nFailed: serverReachN8nFailed,
  settings: settings,
  settingsSaveFailed: settingsSaveFailed,
  settingsSaved: settingsSaved,
  share: share,
  shareThoughts: shareThoughts,
  sharedLocation: sharedLocation,
  shopMockBigMacDealContent: shopMockBigMacDealContent,
  shopMockBigMacDealTitle: shopMockBigMacDealTitle,
  shopMockExtendedHoursContent: shopMockExtendedHoursContent,
  shopMockLatestDealsContent: shopMockLatestDealsContent,
  shopping: shopping,
  showAddressTo: showAddressTo,
  showAllPeople: showAllPeople,
  showFriendsOnly: showFriendsOnly,
  showNoOne: showNoOne,
  showOnlineStatus: showOnlineStatus,
  showSpecificPeopleOnly: showSpecificPeopleOnly,
  small: small,
  socialClub: socialClub,
  sortBy: sortBy,
  specialOffer: specialOffer,
  specificPeople: specificPeople,
  specificPeoplePlaceholder: specificPeoplePlaceholder,
  startTime: startTime,
  status: status,
  street: street,
  streetPlaceholder: streetPlaceholder,
  submit: submit,
  sunday: sunday,
  supermarket: supermarket,
  systemNotifications: systemNotifications,
  tagHint: tagHint,
  tags: tags,
  tagsOptional: tagsOptional,
  termsOfService: termsOfService,
  termsOfServiceComingSoon: termsOfServiceComingSoon,
  themeColor: themeColor,
  themePreview: themePreview,
  thursday: thursday,
  timeFormat: timeFormat,
  timeSelect: timeSelect,
  title: title,
  titleLength: titleLength,
  tuesday: tuesday,
  typeMessage: typeMessage,
  typeQuestion: typeQuestion,
  unknownUser: unknownUser,
  updatedOpeningHours: updatedOpeningHours,
  uploadTip: uploadTip,
  urgentPleaseRespond: urgentPleaseRespond,
  username: username,
  usernameLength: usernameLength,
  version: version,
  versionMessage: versionMessage,
  video: video,
  visible: visible,
  warningTitle: warningTitle,
  weatherCity: weatherCity,
  weatherClear: weatherClear,
  weatherCloudy: weatherCloudy,
  weatherDateMon: weatherDateMon,
  weatherDayFri: weatherDayFri,
  weatherDayThu: weatherDayThu,
  weatherDayTue: weatherDayTue,
  weatherDayWed: weatherDayWed,
  weatherDrizzle: weatherDrizzle,
  weatherFog: weatherFog,
  weatherLocationUnknown: weatherLocationUnknown,
  weatherPartlyCloudy: weatherPartlyCloudy,
  weatherRain: weatherRain,
  weatherSnow: weatherSnow,
  weatherSunny: weatherSunny,
  weatherThunderstorm: weatherThunderstorm,
  weatherUnknown: weatherUnknown,
  website: website,
  wednesday: wednesday,
  welcomeMessage: welcomeMessage,
  welcomeTitle: welcomeTitle,
  yes: yes,
  youAreHere: youAreHere,
  yourIntroduction: yourIntroduction,
  yourPost: yourPost,
  yourRewardPoints: yourRewardPoints,
  youthCenter: youthCenter
}, Symbol.toStringTag, { value: 'Module' }));

const server = () => {};

const server$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: server
}, Symbol.toStringTag, { value: 'Module' }));

const template = "";

const _virtual__spaTemplate = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  template: template
}, Symbol.toStringTag, { value: 'Module' }));

const styles = {};

const styles$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: styles
}, Symbol.toStringTag, { value: 'Module' }));

const getServerMessage = (lang, key, params) => {
  const locale = lang === "zh" ? zhLocale : enLocale;
  const fallback = enLocale;
  let text = locale[key] || fallback[key] || key;
  if (params) {
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, "g"), value);
    });
  }
  return text;
};
const aiAssistant_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d;
  const body = await readBody(event);
  const lang = (body == null ? void 0 : body.lang) || "en";
  const runtimeConfig = useRuntimeConfig(event);
  const env = ((_a = globalThis.process) == null ? void 0 : _a.env) || {};
  const webhookUrl = runtimeConfig.n8nWebhookUrl || env.N8N_WEBHOOK_URL || "";
  const internalToken = runtimeConfig.n8nInternalToken || env.N8N_INTERNAL_TOKEN || "";
  if (!webhookUrl) {
    throw createError({
      statusCode: 500,
      statusMessage: getServerMessage(lang, "serverN8nNotConfigured")
    });
  }
  const message = ((body == null ? void 0 : body.message) || "").trim();
  if (!message) {
    throw createError({
      statusCode: 400,
      statusMessage: getServerMessage(lang, "serverMessageRequired")
    });
  }
  const headers = {
    "Content-Type": "application/json"
  };
  if (internalToken) {
    headers["X-Internal-Token"] = internalToken;
  }
  let result;
  try {
    result = await $fetch(webhookUrl, {
      method: "POST",
      headers,
      body: {
        message,
        building_id: ((body == null ? void 0 : body.building_id) || "default").trim() || "default",
        lang: (body == null ? void 0 : body.lang) || "en"
      }
    });
  } catch (error) {
    const statusCode = ((_b = error == null ? void 0 : error.response) == null ? void 0 : _b.status) || 502;
    const details = ((_d = (_c = error == null ? void 0 : error.response) == null ? void 0 : _c._data) == null ? void 0 : _d.message) || (error == null ? void 0 : error.message) || getServerMessage(lang, "serverReachN8nFailed");
    throw createError({
      statusCode,
      statusMessage: getServerMessage(lang, "serverN8nRequestFailed", { details: String(details) })
    });
  }
  if (typeof result === "string") {
    return { reply: result };
  }
  return {
    reply: result.reply || result.output || result.answer || ""
  };
});

const aiAssistant_post$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: aiAssistant_post
}, Symbol.toStringTag, { value: 'Module' }));

const DEFAULT_LAT = 43.3623;
const DEFAULT_LON = -8.4115;
const getNumericHeader = (event, name) => {
  const value = getHeader(event, name);
  if (!value) {
    return null;
  }
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
};
const getClientIp = (event) => {
  var _a;
  const forwarded = getHeader(event, "x-forwarded-for");
  if (forwarded) {
    return ((_a = forwarded.split(",")[0]) == null ? void 0 : _a.trim()) || null;
  }
  return getHeader(event, "x-real-ip") || null;
};
const resolveCoordinates = async (event, queryLat, queryLon) => {
  var _a, _b;
  if (Number.isFinite(queryLat) && Number.isFinite(queryLon)) {
    return {
      latitude: queryLat,
      longitude: queryLon,
      cityHint: null,
      countryHint: null,
      source: "query"
    };
  }
  const headerLatitude = (_a = getNumericHeader(event, "x-vercel-ip-latitude")) != null ? _a : getNumericHeader(event, "x-geo-latitude");
  const headerLongitude = (_b = getNumericHeader(event, "x-vercel-ip-longitude")) != null ? _b : getNumericHeader(event, "x-geo-longitude");
  if (headerLatitude !== null && headerLongitude !== null) {
    return {
      latitude: headerLatitude,
      longitude: headerLongitude,
      cityHint: null,
      countryHint: null,
      source: "header"
    };
  }
  const clientIp = getClientIp(event);
  if (clientIp) {
    try {
      const ipGeo = await $fetch(`https://ipapi.co/${clientIp}/json/`, {
        timeout: 2500
      });
      if (Number.isFinite(ipGeo.latitude) && Number.isFinite(ipGeo.longitude)) {
        return {
          latitude: ipGeo.latitude,
          longitude: ipGeo.longitude,
          cityHint: ipGeo.city || null,
          countryHint: ipGeo.country_name || null,
          source: "ip"
        };
      }
    } catch {
    }
  }
  return {
    latitude: DEFAULT_LAT,
    longitude: DEFAULT_LON,
    cityHint: null,
    countryHint: null,
    source: "default"
  };
};
const weather_get = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
  const query = getQuery$1(event);
  const lat = Number.parseFloat(String((_a = query.lat) != null ? _a : ""));
  const lon = Number.parseFloat(String((_b = query.lon) != null ? _b : ""));
  const lang = String((_c = query.lang) != null ? _c : "en") === "zh" ? "zh" : "en";
  const resolved = await resolveCoordinates(event, lat, lon);
  const latitude = resolved.latitude;
  const longitude = resolved.longitude;
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
  const weatherData = await $fetch(weatherUrl);
  let city = resolved.cityHint || "";
  let country = resolved.countryHint || "";
  try {
    const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&language=${lang}&count=1`;
    const geocodeData = await $fetch(geocodeUrl);
    const first = (_d = geocodeData.results) == null ? void 0 : _d[0];
    if (first == null ? void 0 : first.name) {
      city = first.name;
    }
    if (first == null ? void 0 : first.country) {
      country = first.country;
    }
  } catch {
  }
  const dailyTimes = ((_e = weatherData.daily) == null ? void 0 : _e.time) || [];
  const dailyCodes = ((_f = weatherData.daily) == null ? void 0 : _f.weather_code) || [];
  const dailyMax = ((_g = weatherData.daily) == null ? void 0 : _g.temperature_2m_max) || [];
  const dailyMin = ((_h = weatherData.daily) == null ? void 0 : _h.temperature_2m_min) || [];
  const daily = dailyTimes.map((date, index) => {
    var _a2, _b2, _c2;
    return {
      date,
      weatherCode: (_a2 = dailyCodes[index]) != null ? _a2 : 0,
      maxTemperature: (_b2 = dailyMax[index]) != null ? _b2 : 0,
      minTemperature: (_c2 = dailyMin[index]) != null ? _c2 : 0
    };
  });
  return {
    city,
    country,
    timezone: weatherData.timezone || "UTC",
    coordinates: {
      latitude,
      longitude
    },
    locationSource: resolved.source,
    current: {
      time: (_i = weatherData.current) == null ? void 0 : _i.time,
      temperature: (_j = weatherData.current) == null ? void 0 : _j.temperature_2m,
      weatherCode: (_k = weatherData.current) == null ? void 0 : _k.weather_code
    },
    daily
  };
});

const weather_get$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: weather_get
}, Symbol.toStringTag, { value: 'Module' }));

function renderPayloadResponse(ssrContext) {
  return {
    body: stringify(splitPayload(ssrContext).payload, ssrContext._payloadReducers) ,
    statusCode: getResponseStatus(ssrContext.event),
    statusMessage: getResponseStatusText(ssrContext.event),
    headers: {
      "content-type": "application/json;charset=utf-8" ,
      "x-powered-by": "Nuxt"
    }
  };
}
function renderPayloadJsonScript(opts) {
  const contents = opts.data ? stringify(opts.data, opts.ssrContext._payloadReducers) : "";
  const payload = {
    "type": "application/json",
    "innerHTML": contents,
    "data-nuxt-data": appId,
    "data-ssr": false
  };
  {
    payload.id = "__NUXT_DATA__";
  }
  if (opts.src) {
    payload["data-src"] = opts.src;
  }
  const config = uneval(opts.ssrContext.config);
  return [
    payload,
    {
      innerHTML: `window.__NUXT__={};window.__NUXT__.config=${config}`
    }
  ];
}
function splitPayload(ssrContext) {
  const { data, prerenderedAt, ...initial } = ssrContext.payload;
  return {
    initial: { ...initial, prerenderedAt },
    payload: { data, prerenderedAt }
  };
}

const renderSSRHeadOptions = {"omitLineBreaks":true};

globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const HAS_APP_TELEPORTS = !!(appTeleportAttrs.id);
const APP_TELEPORT_OPEN_TAG = HAS_APP_TELEPORTS ? `<${appTeleportTag}${propsToString(appTeleportAttrs)}>` : "";
const APP_TELEPORT_CLOSE_TAG = HAS_APP_TELEPORTS ? `</${appTeleportTag}>` : "";
const PAYLOAD_URL_RE = /^[^?]*\/_payload.json(?:\?.*)?$/ ;
const renderer = defineRenderHandler(async (event) => {
  const nitroApp = useNitroApp();
  const ssrError = event.path.startsWith("/__nuxt_error") ? getQuery$1(event) : null;
  if (ssrError && !("__unenv__" in event.node.req)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Page Not Found: /__nuxt_error"
    });
  }
  const ssrContext = createSSRContext(event);
  const headEntryOptions = { mode: "server" };
  ssrContext.head.push(appHead, headEntryOptions);
  if (ssrError) {
    ssrError.statusCode &&= Number.parseInt(ssrError.statusCode);
    if (typeof ssrError.data === "string") {
      try {
        ssrError.data = destr(ssrError.data);
      } catch {
      }
    }
    setSSRError(ssrContext, ssrError);
  }
  const isRenderingPayload = PAYLOAD_URL_RE.test(ssrContext.url);
  if (isRenderingPayload) {
    const url = ssrContext.url.substring(0, ssrContext.url.lastIndexOf("/")) || "/";
    ssrContext.url = url;
    event._path = event.node.req.url = url;
  }
  const routeOptions = getRouteRules(event);
  if (routeOptions.ssr === false) {
    ssrContext.noSSR = true;
  }
  const renderer = await getRenderer();
  const _rendered = await renderer.renderToString(ssrContext).catch(async (error) => {
    if (ssrContext._renderResponse && error.message === "skipping render") {
      return {};
    }
    const _err = !ssrError && ssrContext.payload?.error || error;
    await ssrContext.nuxt?.hooks.callHook("app:error", _err);
    throw _err;
  });
  const inlinedStyles = [];
  await ssrContext.nuxt?.hooks.callHook("app:rendered", { ssrContext, renderResult: _rendered });
  if (ssrContext._renderResponse) {
    return ssrContext._renderResponse;
  }
  if (ssrContext.payload?.error && !ssrError) {
    throw ssrContext.payload.error;
  }
  if (isRenderingPayload) {
    const response = renderPayloadResponse(ssrContext);
    return response;
  }
  const NO_SCRIPTS = routeOptions.noScripts;
  const { styles, scripts } = getRequestDependencies(ssrContext, renderer.rendererContext);
  if (ssrContext._preloadManifest && !NO_SCRIPTS) {
    ssrContext.head.push({
      link: [
        { rel: "preload", as: "fetch", fetchpriority: "low", crossorigin: "anonymous", href: buildAssetsURL(`builds/meta/${ssrContext.runtimeConfig.app.buildId}.json`) }
      ]
    }, { ...headEntryOptions, tagPriority: "low" });
  }
  if (inlinedStyles.length) {
    ssrContext.head.push({ style: inlinedStyles });
  }
  const link = [];
  for (const resource of Object.values(styles)) {
    if ("inline" in getQuery(resource.file)) {
      continue;
    }
    link.push({ rel: "stylesheet", href: renderer.rendererContext.buildAssetsURL(resource.file), crossorigin: "" });
  }
  if (link.length) {
    ssrContext.head.push({ link }, headEntryOptions);
  }
  if (!NO_SCRIPTS) {
    ssrContext.head.push({
      link: getPreloadLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      link: getPrefetchLinks(ssrContext, renderer.rendererContext)
    }, headEntryOptions);
    ssrContext.head.push({
      script: renderPayloadJsonScript({ ssrContext, data: ssrContext.payload }) 
    }, {
      ...headEntryOptions,
      // this should come before another end of body scripts
      tagPosition: "bodyClose",
      tagPriority: "high"
    });
  }
  if (!routeOptions.noScripts) {
    const tagPosition = "head";
    ssrContext.head.push({
      script: Object.values(scripts).map((resource) => ({
        type: resource.module ? "module" : null,
        src: renderer.rendererContext.buildAssetsURL(resource.file),
        defer: resource.module ? null : true,
        // if we are rendering script tag payloads that import an async payload
        // we need to ensure this resolves before executing the Nuxt entry
        tagPosition,
        crossorigin: ""
      }))
    }, headEntryOptions);
  }
  const { headTags, bodyTags, bodyTagsOpen, htmlAttrs, bodyAttrs } = await renderSSRHead(ssrContext.head, renderSSRHeadOptions);
  const htmlContext = {
    htmlAttrs: htmlAttrs ? [htmlAttrs] : [],
    head: normalizeChunks([headTags]),
    bodyAttrs: bodyAttrs ? [bodyAttrs] : [],
    bodyPrepend: normalizeChunks([bodyTagsOpen, ssrContext.teleports?.body]),
    body: [
      replaceIslandTeleports(ssrContext, _rendered.html) ,
      APP_TELEPORT_OPEN_TAG + (HAS_APP_TELEPORTS ? joinTags([ssrContext.teleports?.[`#${appTeleportAttrs.id}`]]) : "") + APP_TELEPORT_CLOSE_TAG
    ],
    bodyAppend: [bodyTags]
  };
  await nitroApp.hooks.callHook("render:html", htmlContext, { event });
  return {
    body: renderHTMLDocument(htmlContext),
    statusCode: getResponseStatus(event),
    statusMessage: getResponseStatusText(event),
    headers: {
      "content-type": "text/html;charset=utf-8",
      "x-powered-by": "Nuxt"
    }
  };
});
function normalizeChunks(chunks) {
  const result = [];
  for (const _chunk of chunks) {
    const chunk = _chunk?.trim();
    if (chunk) {
      result.push(chunk);
    }
  }
  return result;
}
function joinTags(tags) {
  return tags.join("");
}
function joinAttrs(chunks) {
  if (chunks.length === 0) {
    return "";
  }
  return " " + chunks.join(" ");
}
function renderHTMLDocument(html) {
  return `<!DOCTYPE html><html${joinAttrs(html.htmlAttrs)}><head>${joinTags(html.head)}</head><body${joinAttrs(html.bodyAttrs)}>${joinTags(html.bodyPrepend)}${joinTags(html.body)}${joinTags(html.bodyAppend)}</body></html>`;
}

const renderer$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: renderer
}, Symbol.toStringTag, { value: 'Module' }));
//# sourceMappingURL=index.mjs.map
