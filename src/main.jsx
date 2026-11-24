import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// /laksh is hand-built (not a Firestore share): its own page, loaded as a separate chunk
// so visitors never download the editor or Firebase for it.
const App = lazy(() => import('./App.jsx'))
const LakshResume = lazy(() => import('./laksh/LakshResume.jsx'))
const LakshClassic = lazy(() => import('./laksh/LakshClassic.jsx'))
const LakshMu = lazy(() => import('./laksh/MuResume.jsx'))
const isMuPage = /^\/laksh-mu\/?$/i.test(window.location.pathname)
const isLakshPage = /^\/laksh\/?$/i.test(window.location.pathname)
// Strict readers get the standard Profiley resume by default; ?view=creative opts in to the creative page.
const wantsCreative = new URLSearchParams(window.location.search).get('view') === 'creative'

// Per-path head tags. The static index.html describes the builder at "/"; other paths get their own
// canonical, and shared resumes (any other path) are kept out of search results.
const setHead = () => {
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '') return
  const origin = 'https://profiley.lakshpradhwani.com'
  const canonical = document.querySelector('link[rel="canonical"]')
  const robots = document.querySelector('meta[name="robots"]')
  if (isMuPage) {
    canonical?.setAttribute('href', `${origin}/laksh-mu`)
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Laksh Pradhwani's resume in the Masters' Union format.")
  } else if (isLakshPage) {
    canonical?.setAttribute('href', `${origin}/laksh`)
    document.querySelector('meta[name="description"]')?.setAttribute('content', "Laksh Pradhwani's resume: AI & Data Science student and web developer, built with Profiley.")
  } else {
    canonical?.setAttribute('href', `${origin}${path}`)
    robots?.setAttribute('content', 'noindex, follow')
  }
}
setHead()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={null}>
      {isMuPage ? <LakshMu /> : isLakshPage ? (wantsCreative ? <LakshResume /> : <LakshClassic />) : <App />}
    </Suspense>
  </StrictMode>,
)
