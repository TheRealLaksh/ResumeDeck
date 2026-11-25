import React, { lazy, useMemo } from 'react';
import { muResume } from './mu';

const App = lazy(() => import('../App.jsx'));

/** /laksh-mu: the normal ResumeDeck read-only view, with the Masters' Union template applied. */
export default function MuResume() {
  const preset = useMemo(() => muResume(), []);
  return <App preset={preset} />;
}
