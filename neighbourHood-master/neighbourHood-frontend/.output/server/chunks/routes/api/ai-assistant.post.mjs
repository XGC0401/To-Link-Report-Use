import { d as defineEventHandler, r as readBody, u as useRuntimeConfig, c as createError } from '../../nitro/nitro.mjs';
import enLocale from '../../_/en.mjs';
import zhLocale from '../../_/zh.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'node:url';

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

export { aiAssistant_post as default };
//# sourceMappingURL=ai-assistant.post.mjs.map
