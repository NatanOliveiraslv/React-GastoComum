import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, DollarSign, FileText, Tag, Users, User } from "lucide-react";
import Image from "next/image";

const ExpenseDetails = () => {
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold text-center">Detalhes da Despesa</h2>

      <Card>
        <CardContent className="p-4 flex items-start space-x-2">
          <Tag className="text-violet-600" />
          <div>
            <p className="text-xs text-gray-500">Tipo de Despesa</p>
            <p className="font-semibold">Compras Essenciais</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-start space-x-2">
          <FileText className="text-violet-600" />
          <div>
            <p className="text-xs text-gray-500">Título da Despesa</p>
            <p className="font-semibold">Supermercado Mensal</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-start space-x-2">
          <DollarSign className="text-violet-600" />
          <div>
            <p className="text-xs text-gray-500">Valor</p>
            <p className="font-semibold text-violet-600">R$ 345,50</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-start space-x-2">
          <FileText className="text-violet-600" />
          <div>
            <p className="text-xs text-gray-500">Descrição</p>
            <p className="font-medium text-sm">
              Feira da semana no Supermercado Boa Esperança, incluí produtos de
              limpeza e alimentos perecíveis para a casa.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4 flex items-start space-x-2">
          <CalendarDays className="text-violet-600" />
          <div>
            <p className="text-xs text-gray-500">Data de Registro</p>
            <p className="font-medium">23 de Outubro de 2024</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start space-x-2 mb-2">
            <Users className="text-violet-600" />
            <div>
              <p className="text-xs text-gray-500">Usuários Envolvidos</p>
            </div>
          </div>
          <ul className="ml-8 space-y-1 text-sm">
            <li className="flex items-center space-x-2">
              <User className="w-4 h-4" /> <span>Luana Veiga</span>
            </li>
            <li className="flex items-center space-x-2">
              <User className="w-4 h-4" /> <span>Marcelo Peres</span>
            </li>
            <li className="flex items-center space-x-2">
              <User className="w-4 h-4" /> <span>Carla Dias</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-start space-x-2 mb-2">
            <DollarSign className="text-violet-600" />
            <div>
              <p className="text-xs text-gray-500">Comprovante de Pagamento</p>
            </div>
          </div>
          <Image
            src="/supermercado.jpg"
            alt="Comprovante"
            width={400}
            height={200}
            className="rounded-md mb-2"
          />
          <Button className="w-full bg-violet-600 hover:bg-violet-700 text-white">
            Ver Comprovante
          </Button>
        </CardContent>
      </Card>

      <Button variant="outline" className="w-full mt-2">
        <Users className="mr-2 h-4 w-4" /> Adicionar/Remover Usuários
      </Button>
    </div>
  );
}

export default ExpenseDetails