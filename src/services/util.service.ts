export const utilService = {
    getBaseUrl
}

function getBaseUrl() {
    let href = window.location.href
    const idx = href.indexOf('#')
    const baseUrl = href.substring(0, idx + 1)
    return baseUrl
}