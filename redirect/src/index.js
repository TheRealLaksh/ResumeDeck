// Old address -> new address.
//   - Every path is redirected with a permanent 301, keeping the path and query, so shared links such as
//     profiley.lakshpradhwani.com/priya keep working and search engines move the old ranking to ResumeDeck.
//   - The home page (/) is the one exception for real visitors: browsers keep saved drafts per address, so the page first
//     hands the visitor's saved ResumeDeck data to the new address (via a hidden frame, see public/transfer.html there), then redirects.
//     Crawlers and link-preview bots always get the plain 301.

const NEW_ORIGIN = 'https://resumedeck.lakshpradhwani.com';
const BOTS = /bot|crawl|spider|slurp|facebookexternalhit|whatsapp|telegram|slack|linkedin|preview|embedly|pinterest/i;

const handoffPage = () => `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex"><link rel="canonical" href="${NEW_ORIGIN}/">
<title>Moving to ResumeDeck</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f3f0ea;color:#1c1b19;font:16px system-ui,sans-serif}p{max-width:24rem;text-align:center;line-height:1.5}</style>
</head><body>
<p>Profiley is now <strong>ResumeDeck</strong>. Taking you there<noscript> - <a href="${NEW_ORIGIN}/">continue</a></noscript>...</p>
<script>
(function () {
  var NEW = ${JSON.stringify(NEW_ORIGIN)};
  var go = function () { location.replace(NEW + '/' + location.search + location.hash); };
  var items = {};
  try {
    for (var i = 0; i < localStorage.length; i += 1) {
      var key = localStorage.key(i);
      if (key && key.indexOf('profiley_') === 0) items[key] = localStorage.getItem(key);
    }
  } catch (e) { return go(); }
  if (!Object.keys(items).length) return go();

  var done = false;
  var finish = function () { if (!done) { done = true; go(); } };
  var frame = document.createElement('iframe');
  frame.style.display = 'none';
  frame.src = NEW + '/transfer';
  window.addEventListener('message', function (e) {
    if (e.origin === NEW && e.data && e.data.type === 'resumedeck-transfer-done') finish();
  });
  frame.addEventListener('load', function () {
    frame.contentWindow.postMessage({ type: 'resumedeck-transfer', items: items }, NEW);
  });
  document.body.appendChild(frame);
  setTimeout(finish, 4000); // never leave anyone stuck here
})();
</script></body></html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const target = `${NEW_ORIGIN}${url.pathname}${url.search}`;
    const wantsPage =
      request.method === 'GET' &&
      url.pathname === '/' &&
      !BOTS.test(request.headers.get('user-agent') || '') &&
      (request.headers.get('accept') || '').includes('text/html');

    if (wantsPage) {
      return new Response(handoffPage(), { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' } });
    }
    return Response.redirect(target, 301);
  }
};
