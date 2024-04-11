function EnableGoogleAdsense() {
  if (typeof document !== 'undefined') {
    const head = document.getElementsByTagName('head')[0]
    const scriptElement = document.createElement(`script`)
    scriptElement.type = `text/javascript`
    scriptElement.async = true
    scriptElement.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`
    scriptElement.crossOrigin = 'anonymous'
    head.appendChild(scriptElement)
  }
  return null // Return null when used as a React component
}

export default EnableGoogleAdsense
