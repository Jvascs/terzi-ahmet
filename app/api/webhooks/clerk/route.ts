import { clerkClient } from "@clerk/nextjs/dist/types/server";
import { WebhookEvent } from "@clerk/nextjs/dist/types/server";
import {headers} from "next/headers";
import { NextResponse } from "next/server";

import { Webhook } from "svix";

export async function POST(req: Request) {
    
}