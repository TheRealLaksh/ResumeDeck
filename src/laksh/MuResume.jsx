import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { MU_HEADER, MU_ROWS } from './mu';
import './mu.css';

// /laksh-mu: the resume in the Masters' Union format (one legal page, a label | content | date table).
// "Download PDF" prints the sheet with the browser's own PDF engine, so the text stays selectable for parsers.

const PAGE_W = 816; // 8.5 in at 96 dpi
const PAGE_H = 1344; // 14 in at 96 dpi

const Item = ({ it }) => {
  if (it.i) return <p className="mu-i">{it.i}</p>;
  if (it.b) return <p className="mu-b"><span aria-hidden="true">{'•'}</span>{it.b}</p>;
  if (it.r) return <p className="mu-r">{it.r}</p>;
  if (it.h) {
    return (
      <p className="mu-line">
        {it.date && <b className="mu-right">{it.date}</b>}
        <b>{it.h}</b>{it.desc ? ` ${it.desc}` : ''}
      </p>
    );
  }
  if (it.sub && it.t) return <p className="mu-line"><b>{it.sub}</b>{it.t}</p>;
  if (it.sub) return <p className="mu-line"><b>{it.sub}</b></p>;
  return (
    <p className="mu-line">
      {it.date && <span className="mu-right">{it.date}</span>}
      {it.t}
    </p>
  );
};

export default function MuResume() {
  const sheet = useRef(null);
  const [scale, setScale] = useState(1);
  const [size, setSize] = useState(9);

  useEffect(() => {
    document.title = 'Laksh Pradhwani | Resume (Masters’ Union format)';
    const fit = () => setScale(Math.min(1, (window.innerWidth - 16) / PAGE_W));
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  // Shrink the type a little (never below 8 pt) until everything fits on one legal page.
  useLayoutEffect(() => {
    let live = true;
    const run = () => {
      const el = sheet.current;
      if (!el || !live) return;
      let s = 9;
      el.style.setProperty('--mu-size', `${s}pt`);
      while (el.scrollHeight > PAGE_H && s > 8) {
        s -= 0.1;
        el.style.setProperty('--mu-size', `${s}pt`);
      }
      setSize(s);
    };
    run();
    document.fonts?.ready.then(run);
    return () => { live = false; };
  }, []);

  return (
    <div className="mu-page">
      <div className="mu-bar">
        <a href="/laksh">Back to resume</a>
        <button type="button" onClick={() => window.print()}>Download PDF</button>
      </div>
      <div className="mu-stage" style={{ '--mu-scale': scale, height: PAGE_H * scale }}>
        <main className="mu-sheet" ref={sheet} style={{ '--mu-size': `${size}pt` }}>
          <h1>{MU_HEADER.name}</h1>
          <p className="mu-contact">
            {MU_HEADER.links.map((l, i) => (
              <span key={l.label}>
                {i > 0 && ' | '}
                <a href={l.href}>{l.label}</a>
              </span>
            ))}
          </p>
          <table className="mu-table">
            <colgroup><col className="mu-c1" /><col /><col className="mu-c3" /></colgroup>
            <tbody>
              {MU_ROWS.map((row, n) => (
                <tr key={n}>
                  <th scope="row">
                    {row.label}
                    {row.sub && <span className="mu-sub">{row.sub}</span>}
                  </th>
                  <td>
                    {row.items.map((it, k) => <Item key={k} it={it} />)}
                  </td>
                  <td className="mu-date">
                    {row.date && (
                      <>
                        <b>{row.date[0]}</b>
                        <i>{row.date[1]}</i>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
}
