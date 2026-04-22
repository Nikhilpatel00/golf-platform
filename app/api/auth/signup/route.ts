export async function POST(request: Request) {
  return new Response(
    JSON.stringify({ message: "Signup API working" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}