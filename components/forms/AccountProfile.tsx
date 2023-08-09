"use client";
import React, { ChangeEvent } from "react";
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

const AccountProfile = ({ user, btnTitle }: Props) => {
  const handleImage = (
    e: ChangeEvent,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
  };
  const onSubmit = (values: z.infer<typeof userSchema>) => {
    console.log(values);
  };
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      profile_photo: "",
      name: "",
      username: "",
      bio: "",
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="account-form_image-label">
                {field.value ? (
                  <Image
                    src={field.value}
                    alt="profile photo"
                    width={96}
                    height={96}
                    priority
                    className="rounded-full object-contain"
                  />
                ) : (
                  <Image
                    src="/profile.svg"
                    alt="profile photo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                )}
              </FormLabel>

              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload photo"
                  className="account-form_image-input"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="account-form_label">name</FormLabel>

              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="account-form_label">username</FormLabel>

              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Input
                  type="text"
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3">
              <FormLabel className="account-form_label">bio</FormLabel>

              <FormControl className="flex-1 text-base-semibold text-gray-200">
                <Textarea
                  rows={10}
                  className="account-form_input no-focus"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">Submit</Button>
      </form>
    </Form>
  );
};

export default AccountProfile;
