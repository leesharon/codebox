export const utilService = {
    getBaseUrl,
    throttle
}

function getBaseUrl() {
    let href = window.location.href
    const idx = href.indexOf('#')
    const baseUrl = href.substring(0, idx + 1)
    return baseUrl
}

function throttle(cb: any, delay = 1000) {
    let shouldWait = false
    let waitingArgs: any

    const timeoutFunc = () => {
        if (waitingArgs == null) {
            shouldWait = false
        } else {
            cb(...waitingArgs)
            waitingArgs = null
            setTimeout(timeoutFunc, delay)
        }
    }

    return (...args: any) => {
        if (shouldWait) {
            waitingArgs = args
            return
        }
        cb(...args)
        shouldWait = true
        setTimeout(timeoutFunc, delay)
    }
}