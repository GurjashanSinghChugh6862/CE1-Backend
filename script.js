const products = [
      {id:1,title:"Wireless Headphones",price:2499,description:"Wireless headphones with deep bass.",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",rating:4.5,category:"Electronics",discount:15},
      {id:2,title:"Smart Watch",price:3999,description:"Track your activity and daily notifications.",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",rating:4.3,category:"Electronics",discount:10},
      {id:3,title:"Running Shoes",price:2799,description:"Comfortable shoes for everyday workouts.",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",rating:4.6,category:"Footwear",discount:20},
      {id:4,title:"Classic Backpack",price:1499,description:"A useful backpack for college and travel.",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500",rating:4.2,category:"Accessories",discount:12},
      {id:5,title:"Digital Camera",price:24999,description:"Capture photos and travel memories.",image:"https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500",rating:4.7,category:"Electronics",discount:8},
      {id:6,title:"Sunglasses",price:999,description:"Classic sunglasses with UV protection.",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500",rating:4.1,category:"Fashion",discount:25},
      {id:7,title:"Coffee Mug",price:599,description:"Reusable mug for your favourite coffee.",image:"https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=500",rating:4.0,category:"Home",discount:5},
      {id:8,title:"Mechanical Keyboard",price:3499,description:"Comfortable keyboard for work and gaming.",image:"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",rating:4.8,category:"Electronics",discount:18},
      {id:9,title:"Leather Wallet",price:799,description:"A compact wallet for cards and cash.",image:"https://images.unsplash.com/photo-1627123424574-724758594e93?w=500",rating:4.2,category:"Accessories",discount:10},
      {id:10,title:"Bluetooth Speaker",price:1799,description:"Portable speaker with clear sound.",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500",rating:4.4,category:"Electronics",discount:15},
      {id:11,title:"Wristwatch",price:4999,description:"A simple watch for everyday wear.",image:"https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500",rating:4.5,category:"Fashion",discount:20},
      {id:12,title:"Desk Lamp",price:1199,description:"LED lamp for reading and studying.",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500",rating:4.1,category:"Home",discount:7},
      {id:13,title:"Gaming Mouse",price:1299,description:"Responsive mouse with adjustable DPI.",image:"https://images.unsplash.com/photo-1527814050087-3793815479db?w=500",rating:4.6,category:"Electronics",discount:15},
      {id:14,title:"Denim Jacket",price:2299,description:"A versatile jacket for casual outfits.",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",rating:4.3,category:"Clothing",discount:22},
      {id:15,title:"Water Bottle",price:499,description:"Reusable bottle for gym or everyday use.",image:"https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500",rating:4.0,category:"Fitness",discount:5},
      {id:16,title:"Laptop",price:64999,description:"A laptop for work, study and entertainment.",image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500",rating:4.7,category:"Electronics",discount:10},
      {id:17,title:"Casual T-Shirt",price:699,description:"Soft cotton T-shirt for everyday comfort.",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",rating:4.2,category:"Clothing",discount:12},
      {id:18,title:"Gaming Controller",price:2999,description:"Comfortable controller for gaming.",image:"https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500",rating:4.4,category:"Gaming",discount:10},
      {id:19,title:"Sports Backpack",price:1899,description:"Lightweight backpack for active days.",image:"https://images.unsplash.com/photo-1622260614153-03223fb72052?w=500",rating:4.1,category:"Fitness",discount:15},
      {id:20,title:"Flower Vase",price:899,description:"A simple decorative vase for your home.",image:"https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=500",rating:4.3,category:"Home",discount:8}
    ];

    const cart = {};
    let couponApplied = false;

    const money = amount => "₹" + Math.round(amount).toLocaleString("en-IN");
    const salePrice = product => product.price - (product.price * product.discount / 100);

    function showProducts() {
      const search = document.getElementById("searchInput").value.toLowerCase();
      const category = document.getElementById("categoryFilter").value;
      const sort = document.getElementById("sortFilter").value;

      let filtered = products.filter(product =>
        product.title.toLowerCase().includes(search) &&
        (category === "all" || product.category === category)
      );

      if (sort === "low") filtered.sort((a, b) => salePrice(a) - salePrice(b));
      if (sort === "high") filtered.sort((a, b) => salePrice(b) - salePrice(a));
      if (sort === "rating") filtered.sort((a, b) => b.rating - a.rating);

      document.getElementById("productList").innerHTML = filtered.length ? filtered.map(product => `
        <div class="product">
          <img src="${product.image}" alt="${product.title}">
          <div class="product-info">
            <small>${product.category} · ${product.discount}% off</small>
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <div class="rating">★ ${product.rating} / 5</div>
            <div class="product-bottom">
              <span class="price">${money(salePrice(product))}</span>
              <button class="add-button" onclick="addToCart(${product.id})">Add +</button>
            </div>
          </div>
        </div>
      `).join("") : '<div class="empty">No products found.</div>';
    }

    function addToCart(id) {
      if (cart[id]) cart[id].quantity++;
      else cart[id] = { product: products.find(product => product.id === id), quantity: 1 };
      updateCart();
    }

    function changeQuantity(id, change) {
      cart[id].quantity += change;
      if (cart[id].quantity <= 0) delete cart[id];
      updateCart();
    }

    function removeFromCart(id) {
      delete cart[id];
      updateCart();
    }

    function getTotals() {
      const items = Object.values(cart);
      const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const discount = items.reduce((sum, item) => sum + (item.product.price - salePrice(item.product)) * item.quantity, 0);
      const afterDiscount = subtotal - discount;
      const couponDiscount = couponApplied ? afterDiscount * 0.10 : 0;
      const delivery = items.length && afterDiscount - couponDiscount < 2000 ? 99 : 0;
      return {items, subtotal, discount, couponDiscount, delivery, total: afterDiscount - couponDiscount + delivery};
    }

    function updateCart() {
      const totals = getTotals();
      document.getElementById("cartCount").textContent =
        totals.items.reduce((sum, item) => sum + item.quantity, 0);

      document.getElementById("cartItems").innerHTML = totals.items.length ? totals.items.map(item => `
        <div class="cart-item">
          <img src="${item.product.image}" alt="${item.product.title}">
          <div class="cart-item-info">
            <h3>${item.product.title}</h3>
            <span>${money(salePrice(item.product))} each</span>
            <div class="quantity">
              <button onclick="changeQuantity(${item.product.id}, -1)">−</button>
              <span>${item.quantity}</span>
              <button onclick="changeQuantity(${item.product.id}, 1)">+</button>
            </div>
            <button class="remove-button" onclick="removeFromCart(${item.product.id})">Remove</button>
          </div>
          <strong>${money(salePrice(item.product) * item.quantity)}</strong>
        </div>
      `).join("") : '<div class="empty">Your cart is empty.</div>';

      document.getElementById("subtotal").textContent = money(totals.subtotal);
      document.getElementById("discount").textContent = "−" + money(totals.discount);
      document.getElementById("couponDiscount").textContent = "−" + money(totals.couponDiscount);
      document.getElementById("delivery").textContent = totals.delivery ? money(totals.delivery) : "Free";
      document.getElementById("total").textContent = money(totals.total);

      if (!totals.items.length) {
        couponApplied = false;
        document.getElementById("couponMessage").textContent = "Use SAVE10 for 10% extra off on orders above ₹1,000.";
      }
    }

    document.getElementById("searchInput").addEventListener("input", showProducts);
    document.getElementById("categoryFilter").addEventListener("change", showProducts);
    document.getElementById("sortFilter").addEventListener("change", showProducts);

    const categories = [...new Set(products.map(product => product.category))];
    categories.forEach(category => {
      document.getElementById("categoryFilter").innerHTML += `<option value="${category}">${category}</option>`;
    });

    document.getElementById("cartButton").addEventListener("click", () => {
      document.getElementById("shopSection").classList.add("hidden");
      document.getElementById("cartSection").classList.remove("hidden");
      updateCart();
    });

    document.getElementById("backButton").addEventListener("click", () => {
      document.getElementById("cartSection").classList.add("hidden");
      document.getElementById("shopSection").classList.remove("hidden");
    });

    document.getElementById("applyCoupon").addEventListener("click", () => {
      const code = document.getElementById("couponInput").value.trim().toUpperCase();
      const totals = getTotals();
      const message = document.getElementById("couponMessage");

      if (!totals.items.length) {
        couponApplied = false;
        message.textContent = "Add products to your cart first.";
      } else if (code !== "SAVE10") {
        couponApplied = false;
        message.textContent = "Invalid code. Try SAVE10.";
      } else if (totals.subtotal < 1000) {
        couponApplied = false;
        message.textContent = "Your subtotal must be at least ₹1,000.";
      } else {
        couponApplied = true;
        message.textContent = "Coupon applied successfully!";
      }

      updateCart();
    });

    document.getElementById("checkoutButton").addEventListener("click", () => {
      const totals = getTotals();
      if (!totals.items.length) {
        alert("Your cart is empty!");
        return;
      }

      alert("Order placed successfully! Total: " + money(totals.total) + "\\nThis is a demo checkout.");
      Object.keys(cart).forEach(id => delete cart[id]);
      couponApplied = false;
      updateCart();
    });

    showProducts();
    updateCart();