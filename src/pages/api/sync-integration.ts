// src/pages/api/sync-integration.ts

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { user_id, provider } = req.body;

  const result = await fetch(
    "https://wirxvaxlqdbivfhovrnc.supabase.co/functions/v1/sync-integrations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ user_id, provider }),
    }
  );

  const text = await result.text();
  return res.status(result.status).send(text);
}
