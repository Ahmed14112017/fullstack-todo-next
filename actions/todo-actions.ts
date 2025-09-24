"use server";
import { revalidatePath } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { IpropsTodo } from "@/interfaces";

const prisma = new PrismaClient();
export const getTodoListAction = async ({
  userid,
}: {
  userid: string | null;
}) => {
  return await prisma.todo.findMany({
    where: {
      user_id: userid as string,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
export const CreatTodoListAction = async ({
  title,
  body,
  completed,
  userid,
}: {
  title: string;
  body: string | undefined;
  completed: boolean;
  userid: string | null;
}) => {
  await prisma.todo.create({
    data: {
      title,
      body,
      completed,
      user_id: userid as string,
    },
  });
  revalidatePath("/");
};
export const DeleteTodoListAction = async ({ id }: { id: string }) => {
  await prisma.todo.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
};
export const UpdateTodoListAction = async ({
  id,
  title,
  completed,
  body,
}: IpropsTodo) => {
  await prisma.todo.update({
    where: {
      id,
    },
    data: {
      body,
      completed,
      title,
    },
  });
  revalidatePath("/");
};
