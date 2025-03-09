"use client"

 import * as React from "react"
 import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"
 import { DayPicker } from "react-day-picker"

 import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
       showOutsideDays={showOutsideDays}
       className={cn("p-3", className)}
       classNames={{
         months: "flex flex-col gap-2 relative",
         month: "flex flex-col gap-4",
         month_caption: "flex justify-center pt-1 relative items-center w-full",
         caption_label: "text-sm font-medium",
         nav: "flex items-center gap-1 absolute h-7 w-full z-10",
         button_previous: cn(
           buttonVariants({ variant: "outline" }),
           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
           "absolute left-1"
         ),
         button_next: cn(
           buttonVariants({ variant: "outline" }),
           "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
           "absolute right-1"
         ),
         month_grid: "w-full border-collapse space-x-1",
         weekdays: "flex",
         weekday:
           "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
         week: "flex w-full mt-2",
         day: cn(
           "group relative size-8 p-0 text-center text-sm focus-within:relative focus-within:z-20"
         ),
         day_button: cn(
           "size-8 p-0 font-normal aria-selected:opacity-100",
           props.mode === "range"
             ? "group-aria-selected:group-[.day-range-start]:bg-primary group-aria-selected:group-[.day-range-end]:bg-primary group-aria-selected:group-[.day-range-end]:rounded-md group-aria-selected:group-[.day-range-start]:rounded-md"
             : "group-aria-selected:bg-primary group-aria-selected:rounded-md"
         ),
         range_start: "day-range-start rounded-l-md",
         range_end: "day-range-end rounded-r-md",
         selected: "bg-accent text-primary-foreground",
         today:
           "bg-accent text-accent-foreground hover:bg-primary hover:text-primary-foreground rounded-md",
         outside: " text-muted-foreground aria-selected:text-muted-foreground",
         disabled: "text-muted-foreground opacity-50",
         range_middle:
           "aria-selected:bg-accent aria-selected:text-accent-foreground",
         hidden: "invisible",
         ...classNames,
       }}
       components={{
         Chevron: (props) => {
           if (props.orientation === "left") {
             return <ChevronLeftIcon {...props} />
           }
           return <ChevronRightIcon {...props} />
         },
       }}
       {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }