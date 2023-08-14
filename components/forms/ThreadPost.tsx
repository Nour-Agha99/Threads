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
import threadSchema from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/post.actions";

interface Props {
  user: {
    id: string;
    object_id: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

const ThreadPost = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const pathName = usePathname();

  const onSubmit = async (values: z.infer<typeof threadSchema>) => {
     
    await createThread({
      text: values.thread,
      author: userId,
      communityId:null,
      path: pathName,
    });
    router.push('/');
  };

  const form = useForm({
    resolver: zodResolver(threadSchema),
    defaultValues: {
      thread: "",
      accountId: userId,
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="account-form_label">content</FormLabel>

              <FormControl className="mt-10 no-focus border-dark-4 bg-dark-3 text-light-1">
                <Textarea
                  rows={15}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Post Thread
        </Button>
      </form>
    </Form>
  );
};

export default ThreadPost;
