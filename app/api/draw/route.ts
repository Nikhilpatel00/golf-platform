import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    // 1. Get all users
    const { data: users, error } = await supabase
      .from('users')
      .select('*');

    if (error || !users || users.length === 0) {
      return Response.json({ error: "No users found" }, { status: 400 });
    }

    let bestUser = null;
    let bestScore = -Infinity;

    // 2. Loop through users and find best score
    for (const user of users) {
      const { data: scores } = await supabase
        .from('scores')
        .select('score')
        .eq('user_id', user.id)
        .order('score', { ascending: false })
        .limit(1);

      if (scores && scores.length > 0) {
        const userBestScore = scores[0].score;

        if (userBestScore > bestScore) {
          bestScore = userBestScore;
          bestUser = user;
        }
      }
    }

    if (!bestUser) {
      return Response.json({ error: "No scores found" }, { status: 400 });
    }

  return Response.json({
  message: "Winner selected (highest score)",
  winner: bestUser,
  score: bestScore,
  note: "Based on highest performance"
});

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}