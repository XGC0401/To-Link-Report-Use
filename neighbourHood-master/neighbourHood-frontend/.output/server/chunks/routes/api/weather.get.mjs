import { d as defineEventHandler, g as getQuery, a as getHeader } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import 'node:url';

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
  const query = getQuery(event);
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

export { weather_get as default };
//# sourceMappingURL=weather.get.mjs.map
