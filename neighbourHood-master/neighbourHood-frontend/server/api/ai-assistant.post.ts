import enLocale from '../../i18n/locale/en.json'
import zhLocale from '../../i18n/locale/zh.json'

interface N8nWebhookPayload {
    message?: string
    building_id?: string
    lang?: 'en' | 'zh' | string
}

interface N8nWebhookResponse {
    reply?: string
    output?: string
    answer?: string
}

const getServerMessage = (lang: string | undefined, key: string, params?: Record<string, string>) => {
    const locale = lang === 'zh' ? zhLocale : enLocale
    const fallback = enLocale as Record<string, string>
    let text = (locale as Record<string, string>)[key] || fallback[key] || key

    if (params) {
        Object.entries(params).forEach(([paramKey, value]) => {
            text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), value)
        })
    }

    return text
}

export default defineEventHandler(async (event) => {
    const body = await readBody<N8nWebhookPayload>(event)
    const lang = body?.lang || 'en'
    const runtimeConfig = useRuntimeConfig(event)
    const env = ((globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env) || {}
    const webhookUrl = runtimeConfig.n8nWebhookUrl || env.N8N_WEBHOOK_URL || ''
    const internalToken = runtimeConfig.n8nInternalToken || env.N8N_INTERNAL_TOKEN || ''

    if (!webhookUrl) {
        throw createError({
            statusCode: 500,
            statusMessage: getServerMessage(lang, 'serverN8nNotConfigured')
        })
    }

    const message = (body?.message || '').trim()

    if (!message) {
        throw createError({
            statusCode: 400,
            statusMessage: getServerMessage(lang, 'serverMessageRequired')
        })
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    }

    if (internalToken) {
        headers['X-Internal-Token'] = internalToken
    }

    let result: N8nWebhookResponse | string
    try {
        result = await $fetch<N8nWebhookResponse | string>(webhookUrl, {
            method: 'POST',
            headers,
            body: {
                message,
                building_id: (body?.building_id || 'default').trim() || 'default',
                lang: body?.lang || 'en'
            }
        })
    } catch (error: any) {
        const statusCode = error?.response?.status || 502
        const details = error?.response?._data?.message || error?.message || getServerMessage(lang, 'serverReachN8nFailed')

        throw createError({
            statusCode,
            statusMessage: getServerMessage(lang, 'serverN8nRequestFailed', { details: String(details) })
        })
    }

    if (typeof result === 'string') {
        return { reply: result }
    }

    return {
        reply: result.reply || result.output || result.answer || ''
    }
})
