import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IpropsTodo } from "@/interfaces";
import { cuttitle } from "@/lib/utils";
import TableButtonAction from "./TableButtonAction";
export default function Todotable({ todo }: { todo: IpropsTodo[] }) {
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>title</TableHead>
          <TableHead>completed</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* */}

        {todo &&
          todo.map((to) => {
            return (
              <TableRow key={to.id}>
                <TableCell className="font-medium">{to.id}</TableCell>
                <TableCell>{cuttitle(to.title)}</TableCell>
                <TableCell>{to.completed ? "true" : "false"}</TableCell>
                <TableCell className="text-right">
                  <TableButtonAction todoselect={to.id ?? ""} todo={to} />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </Table>
  );
}
