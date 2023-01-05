let shoppingCart = document.getElementById('shopping-cart');
let vlabel = document.getElementById('label');
let basket = JSON.parse(localStorage.getItem('ShopData')) || [];

let calcluation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((e) => e.item).reduce((x, y) => x + y, 0);
};
calcluation();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItempData.find((x) => x.id === id) || [];
        let { img, price, name } = search;
        return `
       <div class="cart-item">
        <img src="${img}"  alt="" width="100"/>
         <div class="details">
             <div class="title-price-x">
               <h4 class="title-price">
               <p>${name}</p>
               <p class="cart-item-price">$ ${price}</p>
               </h4>
               <i class="fa-solid fa-xmark" onclick="removeItem(${id})"></i>
             </div>
             <div class="cart-buttons">
               <div class="buttons">    
                  <button onclick="decrement(${id})"><i class="fa-solid fa-minus"></i></button>
                   <div id=${id} class="Quntity">${item}</div>
                  <button onclick="incrment(${id})"><i class="fa-solid fa-plus"></i></button>
               </div>
             </div>
             <h3>
             $ ${item * price}
             </h3>
         </div>
       </div>
      `;
      })
      .join(''));
  } else {
    shoppingCart.innerHTML = '';
    vlabel.innerHTML = `
     <h3>Cart Is Empty</h3>
      <a href="index.html">
      <button class="HomeBtn">Back To Home<button/>
      </a> 
    `;
  }
};

generateCartItems();

let incrment = (id) => {
  let seletedItem = id;
  let search = basket.find((x) => x.id === seletedItem.id);
  if (search === undefined) {
    basket.push({
      id: seletedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  Update(seletedItem.id);
  localStorage.setItem('ShopData', JSON.stringify(basket));
};

let decrement = (id) => {
  let seletedItem = id;
  let search = basket.find((x) => x.id === seletedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  Update(seletedItem.id);
  basket = basket.filter((x) => x.item !== 0);
  generateCartItems();
  localStorage.setItem('ShopData', JSON.stringify(basket));
};

let Update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calcluation();
  TotalAmount();
};

let removeItem = (id) => {
  let seletedItem = id;
  basket = basket.filter((x) => x.id !== seletedItem.id);
  calcluation();
  generateCartItems();
  TotalAmount();
  localStorage.setItem('ShopData', JSON.stringify(basket));
};

let TotalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let filterData = shopItempData.find((x) => x.id === id);
        return filterData.price * item;
      })
      .reduce((x, y) => x + y, 0);

    return (vlabel.innerHTML = `
     <h3>Total Bill : $ ${amount}</h3>
     <button class="checkOut HomeBtn">Check Out<button>
     <button class="ClearCut" onclick="clereCut()">Clere Cut</button>
    `);
  } else return;
};
TotalAmount();

let clereCut = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem('ShopData', JSON.stringify(basket));
};
