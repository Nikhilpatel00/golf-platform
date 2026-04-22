import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { user_id, score, played_at } = await req.json();

    if (!user_id || !score || !played_at) {
      return Response.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Check duplicate date
    const { data: existing } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', user_id)
      .eq('played_at', played_at);

    if (existing && existing.length > 0) {
      return Response.json({ error: "Score already exists for this date" }, { status: 400 });
    }

    // 2. Get all scores sorted oldest first
    const { data: scores } = await supabase
      .from('scores')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: true });

    // 3. Delete oldest if already 5 scores
    if (scores && scores.length >= 5) {
      const oldest = scores[0];

      await supabase
        .from('scores')
        .delete()
        .eq('id', oldest.id);
    }

    // 4. Insert new score
    const { data, error } = await supabase
      .from('scores')
      .insert([{ user_id, score, played_at }])
      .select();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      message: "Score added",
      data
    });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}