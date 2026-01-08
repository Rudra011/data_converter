// Simple CSV parsing web worker with progress updates
self.onmessage = function (e) {
  const data = e.data || {};
  if (data.type === 'parseCSV') {
    try {
      const text = String(data.text || '');
      const total = text.length;
      const headers = [];
      const rows = [];
      let current = '';
      let inQuotes = false;
      let i = 0;
      const lines = [];
      for (; i < total; i++) {
        const ch = text[i];
        const next = text[i + 1];
        if (ch === '"') {
          if (inQuotes && next === '"') { current += '"'; i++; }
          else { inQuotes = !inQuotes; }
        } else if ((ch === '\n' || (ch === '\r' && next === '\n')) && !inQuotes) {
          if (current.trim()) lines.push(current);
          current = '';
          if (ch === '\r') i++; // skip \n
          // progress chunk per ~1MB or 5% of file
          if (total > 1024 * 1024 && i % Math.floor(total / 20) === 0) {
            self.postMessage({ type: 'progress', done: i, total });
          }
        } else {
          current += ch;
        }
      }
      if (current.trim()) lines.push(current);
      if (!lines.length) return self.postMessage({ type: 'result', headers: [], rows: [] });

      function parseLine(line) {
        const values = [];
        let cur = '';
        let quotes = false;
        for (let j = 0; j < line.length; j++) {
          const c = line[j];
          const n = line[j + 1];
          if (c === '"') {
            if (quotes && n === '"') { cur += '"'; j++; }
            else { quotes = !quotes; }
          } else if (c === ',' && !quotes) {
            values.push(cur); cur = '';
          } else {
            cur += c;
          }
        }
        values.push(cur);
        return values;
      }

      const hdrs = parseLine(lines[0]);
      for (let k = 1; k < lines.length; k++) {
        const vals = parseLine(lines[k]);
        const row = {};
        for (let h = 0; h < hdrs.length; h++) {
          row[hdrs[h]] = vals[h] || '';
        }
        rows.push(row);
      }
      self.postMessage({ type: 'result', headers: hdrs, rows });
    } catch (err) {
      self.postMessage({ type: 'error', error: String(err && err.message || err) });
    }
  }
};
