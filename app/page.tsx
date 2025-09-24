import { getTodoListAction } from "@/actions/todo-actions";
import AddtodoForm from "@/components/AddtodoForm";
import Todotable from "@/components/Todotable";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await auth();
  console.log(user);
  const userid = user.userId;
  const todo = await getTodoListAction({ userid });

  return (
    <main className="container relative top-0 left-0">
      <AddtodoForm userid={userid} />
      <Todotable todo={todo} />
    </main>
  );
}
