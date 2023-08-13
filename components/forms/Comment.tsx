"use client";
import React, { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import userSchema from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadThing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import commentSchema from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/post.actions";

interface Params {
  threadId: string;
  currentUserImage: string;
  currentUserId: string;
}
const Comment = ({ threadId, currentUserImage, currentUserId }: Params) => {
  const pathName = usePathname();

  const onSubmit = async (values: z.infer<typeof commentSchema>) => {

    await addCommentToThread(
      threadId,
      values.thread,
      JSON.parse(currentUserId),
      pathName
    );
    form.reset();
  };
  const form = useForm({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      thread: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="comment-form">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center w-full gap-3">
              <FormLabel>
                <Image
                  src={currentUserImage}
                  alt="Profile Photo"
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
              </FormLabel>

              <FormControl className="border-none bg-transparent">
                <Input
                  type="text"
                  placeholder="comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="comment-form_btn">
          Replay
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
