import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenu, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, Plus } from "lucide-react";

interface HeaderProps {
    nome?: string
    email?: string
    logout?: () => void
}

//Header do usuário autenticado
export const Header: React.FC<HeaderProps> = ({
    nome,
    email,
    logout
}) => {
    return (
        <header className="flex items-center justify-between">
            <h1 className="text-3x1 font-bold">
                Gestão Financeira
            </h1>
            <div className="flex items-center gap-4">
            <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Transação
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant ="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="bg-gray-200 p-6">
                            <AvatarFallback>
                                {nome ?.split(" ")[0].charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {nome}
                        </p>
                        <p className="text-xs text-muted-foreground text-gray-500">
                            {email}
                        </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600 hover:text-black hover:border hover:border-black hover:bg-transparent transition-colors duration-200">
                    <LogOut className="w-4 h-4 mr-2 " />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>
        </header>
    );
}
