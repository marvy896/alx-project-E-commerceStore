import { useLocalStorage } from "usehooks-ts";

type CARTS = {
  productId: number;
  quantity: number;
  productName: string;
  price: number;
};

const useCart = () => {
  let [cartlog, setCartlog] = useLocalStorage<CARTS[]>("CARTS", []);
  return new cartsInteraction(cartlog, setCartlog);
};

class cartsInteraction {
  constructor(
    public cartlog: CARTS[],
    public setCartlog: (a: CARTS[]) => void
  ) {}
  getQuantity(productId: number, productName: string) {
    let searchProduct = this.cartlog.find(
      (x) => x.productId == productId && x.productName == productName
    );
    if (searchProduct == undefined) {
      return 0;
    }
    return searchProduct.quantity;
  }
  removeItems(productId: number, productName: string) {
    let searchProduct = this.cartlog.find(
      (x) => x.productId == productId && x.productName == productName
    );
    if (searchProduct == undefined) {
      this.cartlog.splice(0, this.cartlog.length);
    } else {
      searchProduct.quantity = 0;
    }
    this.setCartlog([...this.cartlog]);
  }

  removeProduct(productId: number) {
    let prd = this.cartlog.filter((i) => i.productId !== productId);
    this.setCartlog([...prd]);
  }

  increaseQuantity(productId: number, productName: string, price: number) {
    let searchProduct = this.cartlog.find(
      (x) => x.productId == productId && x.productName == productName
    );
    if (searchProduct == undefined) {
      this.cartlog.push({
        productName,
        productId,
        quantity: 1,
        price,
      });
    } else {
      searchProduct.quantity += 1;
    }

    this.setCartlog([...this.cartlog]);
  }
  decreaseQuantity(productId: number, productName: string) {
    let searchProduct = this.cartlog.find(
      (x) => x.productId == productId && x.productName == productName
    );
    if (searchProduct == undefined) {
      this.cartlog.shift();
    } else {
      searchProduct.quantity -= 1;
    }
    this.setCartlog([...this.cartlog]);
  }
  getTotalquantity() {
    let total = 0;
    for (const cartsItem of this.cartlog) {
      total += cartsItem.quantity;
    }
    // for (let x = 0; x < this.cartlog.length; x++) {
    //   total += this.cartlog[x]!.quantity;
    // }
    return total;
  }
  getTotalPrice(){
    let total = 0
    for (const cartsItem of this.cartlog){
      total += cartsItem.price
    }
      return total;
  }
  
}

export default useCart;
