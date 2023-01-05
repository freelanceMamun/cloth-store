let shop = document.getElementById('shop');
// let shopItempData = [
//   {
//     id: 'ldjpowr',
//     name: 'Casual Shirt',
//     price: 145,
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi',
//     img: './image/p1.jpg',
//   },
//   {
//     id: 'lksjdre',
//     name: 'Ledius shoe',
//     price: 70,
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi',
//     img: 'image/p3.jpg',
//   },
//   {
//     id: 'plskdjprw',
//     name: 'T Bag',
//     price: 300,
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi',
//     img: 'image/p5.jpg',
//   },
//   {
//     id: 'ljkdsper',
//     name: 'Sun-Gluss',
//     price: 100,
//     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi',
//     img: 'image/p15.jpg',
//   },
// ];
let basket = JSON.parse(localStorage.getItem('ShopData')) || [];

let generateShop = () => {
  return (shop.innerHTML = shopItempData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
      <div class="item" id="products-id-$${id}">
      <img src="${img}" width="180px" alt="" />
      <div class="details">
        <h2>${name}</h2>
        <p>
          ${desc}
        </p>
        <div class="price-Quntity">
          <h3>$ ${price}</h3>
          <div class="buttons">    
            <button onclick="decrement(${id})"><i class="fa-solid fa-minus"></i></button>
            <div id=${id} class="Quntity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <button onclick="incrment(${id})"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      </div>
    </div>
      `;
    })
    .join(''));
};
generateShop();

console.log(basket);

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
  console.log(basket);
  localStorage.setItem('ShopData', JSON.stringify(basket));
};

let Update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calcluation();
};

let calcluation = () => {
  let cartIcon = document.getElementById('cartAmount');
  cartIcon.innerHTML = basket.map((e) => e.item).reduce((x, y) => x + y, 0);
};
calcluation();
