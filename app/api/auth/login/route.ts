import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error || !data) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    return Response.json({
      message: "Login success",
      user: data
    });

  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}