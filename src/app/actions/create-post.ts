'use server'
import type { Post } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {z} from 'zod';
import {auth} from "@/auth"
import {paths} from "@/path"
import { title } from "process";
import { error } from "console";
import { db } from "../db";
const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10)
})
interface CreatePostFormState {
    errors: {
        title?: string[],
        content?: string[],
        _form?: string[],
    }
}
export async function createPost(slug: string , formState : CreatePostFormState, formData: FormData)
: Promise<CreatePostFormState> 
{
    const result = createPostSchema.safeParse({
        title: formData.get('title'),
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
    const topic = await db.topic.findFirst({
        where: {slug},
    });
    console.log(slug);
    if(!topic) {
        return {
            errors: {
                _form: ['the topic is not exits']
            }
        }
    }
    let post: Post;
    try  {
          post= await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
                userId: session.user.id|| "",
                topicId: topic.id|| ""
            }
          })
    }catch (err: unknown){
            return {
                errors: {
                    _form: ['Database Error']
                }
            }
    }
    revalidatePath(paths.topicShowPath(slug));
    redirect("/");
}