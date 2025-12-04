import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { error } = await supabase.from("encuestas").insert([data]);

    if (error) {
      console.error("Error al guardar encuesta:", error);
      return NextResponse.json(
        { error: "Error al guardar la encuesta" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
