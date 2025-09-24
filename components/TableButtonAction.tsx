"use client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Ellipsis, Eye, Pen, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { DeleteTodoListAction } from "@/actions/todo-actions";
import Spinner from "./ui/spinner";
import EditTodo from "./EditTodo";
import { IpropsTodo } from "@/interfaces";

export default function TableButtonAction({
  todoselect,
  todo,
}: {
  todoselect: string;
  todo: IpropsTodo;
}) {
  const [position, setPosition] = useState("bottom");
  const [loading, Setloading] = useState(false);
  const [openedit, setOpenEdit] = useState(false);
  const [todotoedit, settodotoedit] = useState<IpropsTodo | null>(null);
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem
              value="top"
              onClick={() => {
                setOpenEdit(true);
                settodotoedit(todo);
              }}
            >
              <Pen /> Edit
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem
              value="bottom"
              onClick={async () => {
                Setloading(true);
                await DeleteTodoListAction({ id: todoselect });
                Setloading(false);
              }}
            >
              {loading ? <Spinner /> : <Trash />} Delete
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              <Eye /> view
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {openedit && (
        <EditTodo
          open={openedit}
          onOpenChange={setOpenEdit}
          todoeditdata={todotoedit}
        />
      )}
    </div>
  );
}
