export class Order {
    public Name: string;
    public Price: number;
    public Description: string;
    public Quantity: number;

    constructor(public name: string, public price: number, public description: string, public quantity: number) {
        this.Name = name;
        this.Price = price;
        this.Description = description;
        this.Quantity = quantity
    }
}