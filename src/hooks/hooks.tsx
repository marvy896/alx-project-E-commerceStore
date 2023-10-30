// import { useLocalStorage } from "usehooks-ts";

// type CARTS = {
//   productId: number;
//   quantity: number;
//   productName: string;
//   price: number;
// };

// const useCart = () => {
//   let [cartlog, setCartlog] = useLocalStorage<CARTS[]>("CARTS", []);
//   return new cartsInteraction(cartlog, setCartlog);
// };

// class cartsInteraction {
//   constructor(
//     public cartlog: CARTS[],
//     public setCartlog: (a: CARTS[]) => void
//   ) {}
//   getQuantity(productId: number, productName: string) {
//     let searchProduct = this.cartlog.find(
//       (x) => x.productId == productId && x.productName == productName
//     );
//     if (searchProduct == undefined) {
//       return 0;
//     }
//     return searchProduct.quantity;
//   }
//   removeItems(productId: number, productName: string) {
//     let searchProduct = this.cartlog.find(
//       (x) => x.productId == productId && x.productName == productName
//     );
//     if (searchProduct == undefined) {
//       this.cartlog.splice(0, this.cartlog.length);
//     } else {
//       searchProduct.quantity = 0;
//     }
//     this.setCartlog([...this.cartlog]);
//   }

//   removeProduct(productId: number) {
//     let prd = this.cartlog.filter((i) => i.productId !== productId);
//     this.setCartlog([...prd]);
//   }

//   increaseQuantity(productId: number, productName: string, price: number) {
//     let searchProduct = this.cartlog.find(
//       (x) => x.productId == productId && x.productName == productName
//     );
//     if (searchProduct == undefined) {
//       this.cartlog.push({
//         productName,
//         productId,
//         quantity: 1,
//         price,
//       });
//     } else {
//       searchProduct.quantity += 1;
//     }

//     this.setCartlog([...this.cartlog]);
//   }
//   decreaseQuantity(productId: number, productName: string) {
//     let searchProduct = this.cartlog.find(
//       (x) => x.productId == productId && x.productName == productName
//     );
//     if (searchProduct == undefined) {
//       this.cartlog.shift();
//     } else {
//       searchProduct.quantity -= 1;
//     }
//     this.setCartlog([...this.cartlog]);
//   }
//   getTotalquantity() {
//     let total = 0;
//     for (const cartsItem of this.cartlog) {
//       total += cartsItem.quantity;
//     }
//     // for (let x = 0; x < this.cartlog.length; x++) {
//     //   total += this.cartlog[x]!.quantity;
//     // }
//     return total;
//   }
//   getTotalPrice() {
//     let total = 0;
  
//     for (const cartsItem of this.cartlog) {
//       const itemPrice = parseFloat(cartsItem.price);
//       const itemQuantity = parseInt(cartsItem.quantity, 10); // Assuming quantity is an integer
  
//       if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
//         total += itemPrice * itemQuantity;
//       }
//     }
  
//     return total;
//   }
  
  
// }

// export default useCart;
import { useLocalStorage } from "usehooks-ts";

export interface CartItem {
  productId: number;
  quantity: number;
  productName: string;
  price: number;
}

const useCart = () => {
  const [cartlog, setCartlog] = useLocalStorage<CartItem[]>("CARTS", []);

  return new CartsInteraction(cartlog, setCartlog);
};

class CartsInteraction {
  constructor(
    public cartlog: CartItem[],
    public setCartlog: (items: CartItem[]) => void
  ) {}

  getQuantity(productId: number, productName: string): number {
    const searchProduct = this.cartlog.find(
      (item) => item.productId === productId && item.productName === productName
    );

    return searchProduct?.quantity || 0;
  }

  removeItems(productId: number, productName: string): void {
    const updatedCart = this.cartlog.filter(
      (item) => item.productId !== productId || item.productName !== productName
    );

    this.setCartlog(updatedCart);
  }

  removeProduct(productId: number): void {
    const updatedCart = this.cartlog.filter((item) => item.productId !== productId);
    this.setCartlog(updatedCart);
  }

  increaseQuantity(productId: number, productName: string, price: number): void {
    let updatedCart = [...this.cartlog];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.productId === productId && item.productName === productName
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({
        productName,
        productId,
        quantity: 1,
        price,
      });
    }

    this.setCartlog(updatedCart);
  }

  decreaseQuantity(productId: number, productName: string): void {
    let updatedCart = [...this.cartlog];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.productId === productId && item.productName === productName
    );

    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity -= 1;
      if (updatedCart[existingProductIndex].quantity <= 0) {
        updatedCart.splice(existingProductIndex, 1);
      }
    }

    this.setCartlog(updatedCart);
  }

  getTotalQuantity(): number {
    return this.cartlog.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice(): number {
    let total = 0;
  
    for (const cartItem of this.cartlog) {
      const itemPrice = parseFloat(String(cartItem.price));
      const itemQuantity = parseInt(String(cartItem.quantity), 10);
  
      if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
        total += itemPrice * itemQuantity;
      }
    }
  console.log(this.cartlog);
    return total;
  }
  
  
   
}

export default useCart;
