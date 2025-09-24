"use client";
import {
  CreatTodoListAction,
  UpdateTodoListAction,
} from "@/actions/todo-actions";
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
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Spinner from "./ui/spinner";
import { IpropsTodo } from "@/interfaces";
export default function EditTodo({
  open,
  onOpenChange,
  todoeditdata,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  todoeditdata: IpropsTodo | null;
}) {
  //   type FormValues = z.infer<typeof formSchema>;
  const [loading, Setloading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todoeditdata?.title ?? "",
      body: todoeditdata?.body ?? "",
      completed: todoeditdata?.completed ?? false,
    },
  });
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    Setloading(true);

    await UpdateTodoListAction({
      id: todoeditdata?.id,
      title: data.title,
      body: data.body,
      completed: data.completed,
    });
    form.reset({
      body: "",
      completed: false,
      title: "",
    });
    Setloading(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
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
