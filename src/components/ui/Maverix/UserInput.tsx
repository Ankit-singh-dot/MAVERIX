"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
const formSchema = z.object({
  input: z.string().min(2).max(200),
});
const UserInput = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/generate-questions", {
        method: "POST",
        body: JSON.stringify({ topic: values.input }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    } 
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-row  items-center justify-center gap-4 w-[50vw]"
      >
        <FormField
          control={form.control}
          name="input"
          render={({ field }) => (
            <FormItem className="flex-1 w-full">
              <FormControl>
                <Input
                  className="w-full  p-4 py-6 placeholder:text-sm bg-white  opacity-60"
                  placeholder="Enter the topic which you want to research"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="px-6 cursor-pointer ">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default UserInput;
