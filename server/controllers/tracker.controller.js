const axios = require('axios');
const TrackerService = require('../services/tracker.service');

const trackVisitorAction = async (req, res) => {
  try {
    const { action, page, referrer, timeOnPage, userAgent, visitType, sessionId } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Skip localhost and whitelisted IP
    if (ip === '::1' || ip === '127.0.0.1' || ip === process.env.OWNER_IP) {
      return res.status(200).json({ status: 'ignored', message: 'Local/Owner IP' });
    }

    // IP Geolocation (ipapi.co — Free tier)
    let location = 'Unknown Location';
    try {
      const geoResp = await axios.get(`https://ipapi.co/${ip}/json/`);
      if (geoResp.data && !geoResp.data.error) {
        location = `${geoResp.data.city}, ${geoResp.data.region}, ${geoResp.data.country_name}`;
      }
    } catch (geoError) {
      console.error('❌ IP Lookup Error:', geoError.message);
    }

    const payload = {
      action,
      page,
      location,
      ip,
      device: userAgent, // Simplified: use a library like ua-parser-js for better results
      referrer,
      timeOnPage,
      sessionId
    };

    // Dispatch Notifications
    await TrackerService.dispatchAll(payload);

    res.status(200).json({ status: 'success', message: 'Notification dispatched' });
  } catch (error) {
    console.error('❌ Tracking Controller Error:', error.message);
    res.status(500).json({ status: 'error', message: 'Failed to process tracking' });
  }
};

module.exports = { trackVisitorAction };
