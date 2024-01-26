"use client";
import React from "react";
import qs from "query-string";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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

const formSchema = z.object({
  url: z.string().min(5, {
    message: "url must be at least 5 characters.",
  }),
});

const HeroInput = () => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          url: values.url,
        },
      },
      { skipNull: true, skipEmptyString: true }
    );
    router.push("/generate" + url);
  }

  return (
    <div className="items-center justify-center  space-y-3 sm:flex sm:space-y-0">
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex space-x-3"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className=" text-black dark:text-white w-80 border-2 border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-none"
                      placeholder="Paste your url here.."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              variant="ghost"
              className="bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none text-white"
              type="submit"
            >
              Generate
            </Button>
          </form>
        </Form>
      </div>

      {/* <Link
              href={"/"}
              className="block py-2 px-4 dark:text-white hover:text-gray-500 font-medium duration-150 active:bg-gray-100 border rounded-lg"
            >
              Get access
            </Link> */}
    </div>
  );
};

export default HeroInput;
