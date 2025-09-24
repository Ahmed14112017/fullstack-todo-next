"use client";
import { CreatTodoListAction } from "@/actions/todo-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Spinner from "./ui/spinner";
export default function AddtodoForm({ userid }: { userid: string | null }) {
  //   type FormValues = z.infer<typeof formSchema>;
  const [loading, Setloading] = useState(false);
  const [open, Setopen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      completed: false,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    Setloading(true);

    await CreatTodoListAction({
      title: data.title,
      body: data.body,
      completed: data.completed,
      userid: userid,
    });
    form.reset();
    Setloading(false);
    Setopen(false);
  };

  return (
    <Dialog open={open} onOpenChange={Setopen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          {" "}
          <Button variant="outline">
            <Plus />
            New ToDo
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>title</FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>short description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="body" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="completed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>completed</FormLabel>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">{loading ? <Spinner /> : "Submit"}</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
