import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/common/util/utils"
import { ReactNode } from "react"

//Conteiner principal das abas
export const Tabs = TabsPrimitive.Root

//Lista de botões de aba
interface TabsListProps {
    children?: ReactNode
    className?: string
}

export const TabsList: React.FC<TabsListProps> = ({
    children,
    className
}: TabsListProps) => {
    return (
        <TabsPrimitive.List className={cn(
            "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className
            )}>
            {children}
        </TabsPrimitive.List>

    )
}

//Botão de ação de cada aba
interface TabsTriggerProps {
    text?: string
    className?: string
    value: string
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  text,
  className,
  value
}: TabsTriggerProps) => {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        className
      )}
    >
      {text}
    </TabsPrimitive.Trigger>
  )
}

//Conteúdo da aba Content
interface TabsContentProps {
    children?: ReactNode
    value: string
    className?:string
}

export const TabsContent: React.FC<TabsContentProps> = ({
    children,
    value,
    className
}: TabsContentProps) => {
    return (
        <TabsPrimitive.Content value={value}
        className={cn(
            "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className
        )} >
            {children}
        </TabsPrimitive.Content>
    )
}