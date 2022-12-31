function enableGoogleAdsense () {
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement(`script`)
    scriptElement.type = `text/javascript`
    scriptElement.async
    scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
    scriptElement.crossOrigin = "anonymous"
    head.appendChild(scriptElement);
}

export default enableGoogleAdsense