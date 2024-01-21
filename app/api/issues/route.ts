import { server } from "typescript";
import  {NextRequest, NextResponse} from "next/server";
import { createIssueSchema } from "../../validationSchema";

export async function POST (request: NextRequest) {
    const body = await request.json();
   const validation = createIssueSchema.safeParse(body);
   if(!validation.success)
   return NextResponse.json(validation.error.format, {status: 400})
}