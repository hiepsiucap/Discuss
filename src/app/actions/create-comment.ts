'use server'
import type { Comment } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {z} from 'zod';
import {auth} from "@/auth"
import {paths} from "@/path"
import { title } from "process";
import { error } from "console";
import { db } from "../db";

import { comment } from "postcss";
const CreateCommentSchema = z.object({
    content: z.string().min(10)
})
interface CreatePostFormState {
    errors: {
        content?: string[],
        _form?: string[],
    },
    success ?: boolean
}
export async function createComment({ postId, parentId } : {postId: string, parentId?: string} , formState : CreatePostFormState, formData: FormData)
: Promise<CreatePostFormState> 
{
    const result = CreateCommentSchema.safeParse({
        content: formData.get('content')
    })
    if(!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }
    const session = await auth();
        if(!session || !session.user)
        {
            return {
        errors: {
            _form: ['You must be signed in to do this ']
        },
    }
        }
    let comment: Comment;
    try  {
          comment= await db.comment.create({
            data: {
                postId:  postId,
                parentId,
                content: result.data.content,
                userId: session.user.id|| "",
                
            }
          })
    }catch (err: unknown){
            return {
                errors: {
                    _form: ['Database Error']
                }
            }
    }
    redirect("/");
}