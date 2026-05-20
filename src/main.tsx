import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const root = document.getElementById('root')!

const tree = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Hydrate when the page was prerendered (root has children); create fresh otherwise.
if (root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, tree)
} else {
  ReactDOM.createRoot(root).render(tree)
}

// Snapshot-readiness marker — picked up by scripts/prerender.mjs to know when to capture HTML.
const markReady = () => document.documentElement.setAttribute('data-prerender-ready', 'true')
if ('requestIdleCallback' in window) {
  ;(window as Window).requestIdleCallback(markReady, { timeout: 5000 })
} else {
  setTimeout(markReady, 2000)
}