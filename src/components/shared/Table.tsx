"use client";



import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import CustomSpinner from "./CustomSpinner";
import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  key: keyof T | "actions" | "index";
  render?: (item: T) => ReactNode;
}

export interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
}

export function MyTable<T>({ columns, data, isLoading }: ReusableTableProps<T>) {
  if (isLoading) return <div><CustomSpinner/></div>;

  return (
    <div className="rounded-md border border-slate-200">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            {columns.map((col, i) => (
              <TableHead key={i} className="font-bold text-slate-700">
                {col.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            data.map((item, idx) => (
              <TableRow key={idx}>
                {columns.map((col, idx) => (
                  <TableCell key={idx}>
                    {col.render 
                      ? col.render(item) 
                      : (item[col.key as keyof T] as ReactNode)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center h-32 text-slate-500">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}