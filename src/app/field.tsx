import * as React from "react"
import { cn } from "@/libs/utils"

const FieldGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div 
      data-slot="field-group" 
      className={cn("grid gap-6", className)} 
      {...props} 
    />
  )
}

interface FieldProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal"
}

const Field = ({ className, orientation = "vertical", ...props }: FieldProps) => {
  return (
    <div 
      data-slot="field" 
      className={cn(
        "grid gap-2",
        orientation === "horizontal" && "flex items-center gap-4",
        className
      )} 
      {...props} 
    />
  )
}

const FieldLabel = ({ className, ...props }: React.ComponentProps<"label">) => {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    />
  )
}

const FieldDescription = ({ className, ...props }: React.ComponentProps<"p">) => {
  return (
    <p
      data-slot="field-description"
      className={cn("text-muted-foreground text-[0.8rem]", className)}
      {...props}
    />
  )
}

export { Field, FieldGroup, FieldLabel, FieldDescription }