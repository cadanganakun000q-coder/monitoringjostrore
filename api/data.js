global.botStore = global.botStore || [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const now = Date.now();
  // Filter bot yang aktif dalam 30 detik terakhir
  global.botStore = global.botStore.filter(b => (now - (b.lastSeen || 0)) < 30000);

  res.status(200).json(global.botStore);
}
