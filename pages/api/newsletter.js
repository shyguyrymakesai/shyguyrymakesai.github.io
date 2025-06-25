export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Missing email' });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('Newsletter signup:', email);
  }

  const key = process.env.MAILJET_API_KEY;
  const secret = process.env.MAILJET_API_SECRET;
  const listId = process.env.MAILJET_LIST_ID;

  const auth = Buffer.from(`${key}:${secret}`).toString('base64');

  try {
    const response = await fetch(
      `https://api.mailjet.com/v3/REST/contactslist/${listId}/managecontact`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Email: email,
          Action: 'addnoforce',
        }),
      }
    );

    if (!response.ok) {
      let data = {};
      try {
        data = await response.json();
      } catch {}
      return res
        .status(response.status)
        .json({ error: data.ErrorMessage || 'Subscription failed' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ error: 'Network error' });
  }
}
