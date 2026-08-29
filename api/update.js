global.botStore = global.botStore || [];

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'POST') {
    const { username, bot_name, status } = req.body || {};
    if (username) {
      const index = global.botStore.findIndex(b => b.username === username);
      const newBot = { 
        username, 
        bot_name: bot_name || ("PC Bot - " + username), 
        status: status || "ONLINE", 
        lastSeen: Date.now() 
      };
      if (index !== -1) global.botStore[index] = newBot;
      else global.botStore.push(newBot);
    }
    return res.status(200).json({ success: true, data: global.botStore });
  }
  res.status(405).json({ error: "Method not allowed" });
}
