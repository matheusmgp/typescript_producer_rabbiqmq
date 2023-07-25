export default class Pedido{
    numero:number
    cnpj:string
    items:Item[]
    status:boolean
}

export class Item {
    nome:string
    qtd:number
}