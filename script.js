// BASE DE DADOS DOS PRODUTOS
const products = [
    { id: 1, name: "Smash Top Bacon", category: "burgers", price: 32.90, desc: "2x Smash Burger 80g, muito queijo cheddar fatiado, bacon crocante em tiras e molho especial da casa no pão brioche selado.", img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80" },
    { id: 2, name: "Monster Cheddar Burger", category: "burgers", price: 38.90, desc: "Hambúrguer artesanal 180g, banhado em creme cheddar cremoso, farofa de bacon extra e pão de pimenta jalapeño.", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 3, name: "Chicken Crisp Crunch", category: "burgers", price: 29.90, desc: "Sobrecoxa empanada super crocante, salada coleslaw artesanal, picles da casa e maionese verde no pão brioche.", img: "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?w=500&q=80" },
    { id: 4, name: "Duplo Melted Trufado", category: "burgers", price: 44.90, desc: "2x Carnes de 160g, queijo emmental derretido, cogumelos salteados e maionese trufada no pão australiano.", img: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80" },
    { id: 5, name: "Batata Suprema Cheddar & Bacon", category: "porcoes", price: 26.90, desc: "Batata palito crocante coberta com requeijão cremoso tipo cheddar e bastante bacon picadinho. (Aprox. 400g)", img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?w=500&q=80" },
    { id: 6, name: "Coxinhas Gouda & Costela (8 un)", category: "porcoes", price: 24.90, desc: "Mini coxinhas sem massa recheadas com costela desfiatada e queijo gouda derretido.", img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&q=80" },
    { id: 7, name: "Onion Rings Crocantes", category: "porcoes", price: 21.90, desc: "Anéis de cebola empanados e dourados, acompanhados de molho barbecue artesanal.", img: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&q=80" },
    { id: 8, name: "Coca-Cola Zero 350ml", category: "bebidas", price: 7.00, desc: "Lata trincando de gelada 350ml.", img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
    { id: 9, name: "Suco Natural Laranja 500ml", category: "bebidas", price: 11.90, desc: "Suco 100% natural feito na hora sem adição de açúcar.", img: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80" },
    { id: 10, name: "Milkshake Nutella & Ninho 400ml", category: "sobremesas", price: 22.90, desc: "Sorvete baunilha batido com bastante Nutella pura e leite Ninho.", img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=500&q=80" },
    { id: 11, name: "Grand Gateau Red Velvet", category: "sobremesas", price: 28.90, desc: "Bolo quente de frutas vermelhas servido com picolé artesanal de ninho fundido.", img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=500&q=80" },
    { id: 12, name: "Combo Casal Top", category: "combos", price: 79.90, desc: "2x Smash Top Bacon + 1x Batata Suprema + 2x Sucos Laranja ou Refrigerantes.", img: "https://images.unsplash.com/photo-1521305916504-4a1121188589?w=500&q=80" }
];

// ESTADO DA APLICAÇÃO
let currentCategory = 'all';
let cart = [];
let activeModalProduct = null;
let modalQty = 1;
let deliveryType = 'delivery'; // 'delivery' ou 'pickup'
let appliedDiscount = 0;

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    updateCartUI();
});

// FILTRAR E RENDERIZAR PRODUTOS
function setCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500', 'text-gray-900');
        btn.classList.add('bg-gray-800', 'text-gray-300');
    });
    event.target.classList.add('bg-amber-500', 'text-gray-900');
    event.target.classList.remove('bg-gray-800', 'text-gray-300');
    renderProducts();
}

function filterProducts() {
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('products-grid');
    const query = document.getElementById('search-input').value.toLowerCase();
    grid.innerHTML = '';

    const filtered = products.filter(p => {
        const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
        const matchesSearch = p.name.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10">Nenhum produto encontrado.</div>`;
        return;
    }

    filtered.forEach(p => {
        grid.innerHTML += `
            <div class="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700/60 shadow-lg hover:border-amber-500/50 transition flex flex-col">
                <img src="${p.img}" alt="${p.name}" class="h-44 w-full object-cover">
                <div class="p-4 flex flex-col flex-grow justify-between space-y-3">
                    <div>
                        <h3 class="font-bold text-lg text-white">${p.name}</h3>
                        <p class="text-xs text-gray-400 mt-1 line-clamp-2">${p.desc}</p>
                    </div>
                    <div class="flex items-center justify-between pt-2">
                        <span class="font-black text-amber-500 text-lg">R$ ${p.price.toFixed(2).replace('.', ',')}</span>
                        <button onclick="openModal(${p.id})" class="bg-gray-700 hover:bg-amber-500 hover:text-gray-900 text-amber-400 font-bold px-3 py-1.5 rounded-xl text-sm transition flex items-center gap-1">
                            <i class="fa-solid fa-plus text-xs"></i> Pedir
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
}

// LÓGICA DO MODAL DE OPÇÕES
function openModal(id) {
    activeModalProduct = products.find(p => p.id === id);
    modalQty = 1;
    document.getElementById('modal-img').src = activeModalProduct.img;
    document.getElementById('modal-title').innerText = activeModalProduct.name;
    document.getElementById('modal-desc').innerText = activeModalProduct.desc;
    document.getElementById('modal-base-price').innerText = `R$ ${activeModalProduct.price.toFixed(2).replace('.', ',')}`;
    document.getElementById('modal-obs').value = '';
    document.getElementById('modal-qty').innerText = modalQty;

    document.querySelectorAll('.option-check').forEach(chk => chk.checked = false);
    document.querySelectorAll('.option-check').forEach(chk => chk.onchange = updateModalTotal);

    updateModalTotal();
    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

function changeQty(delta) {
    modalQty = Math.max(1, modalQty + delta);
    document.getElementById('modal-qty').innerText = modalQty;
    updateModalTotal();
}

function calculateModalSinglePrice() {
    let total = activeModalProduct.price;
    document.querySelectorAll('.option-check:checked').forEach(chk => {
        total += parseFloat(chk.getAttribute('data-price'));
    });
    return total;
}

function updateModalTotal() {
    const single = calculateModalSinglePrice();
    const total = single * modalQty;
    document.getElementById('modal-calc-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function confirmAddToCart() {
    const selectedOptions = [];
    document.querySelectorAll('.option-check:checked').forEach(chk => {
        selectedOptions.push({
            name: chk.getAttribute('data-name'),
            price: parseFloat(chk.getAttribute('data-price'))
        });
    });

    const obs = document.getElementById('modal-obs').value.trim();
    const unitPrice = calculateModalSinglePrice();

    cart.push({
        cartId: Date.now(),
        productId: activeModalProduct.id,
        name: activeModalProduct.name,
        unitPrice: unitPrice,
        qty: modalQty,
        options: selectedOptions,
        obs: obs
    });

    closeModal();
    updateCartUI();
    toggleCart();
}

// GERENCIAMENTO DO CARRINHO
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    drawer.classList.toggle('hidden');
}

function removeFromCart(cartId) {
    cart = cart.filter(item => item.cartId !== cartId);
    updateCartUI();
}

function changeCartItemQty(cartId, delta) {
    const item = cart.find(i => i.cartId === cartId);
    if (item) {
        item.qty += delta;
        if (item.qty <= 0) {
            removeFromCart(cartId);
        } else {
            updateCartUI();
        }
    }
}

function setDeliveryType(type) {
    deliveryType = type;
    const btnDel = document.getElementById('btn-delivery');
    const btnPick = document.getElementById('btn-pickup');
    const addr = document.getElementById('address-fields');

    if (type === 'delivery') {
        btnDel.className = "py-2 rounded-lg font-bold text-xs sm:text-sm bg-amber-500 text-gray-900 transition";
        btnPick.className = "py-2 rounded-lg font-bold text-xs sm:text-sm text-gray-400 transition";
        addr.classList.remove('hidden');
    } else {
        btnPick.className = "py-2 rounded-lg font-bold text-xs sm:text-sm bg-amber-500 text-gray-900 transition";
        btnDel.className = "py-2 rounded-lg font-bold text-xs sm:text-sm text-gray-400 transition";
        addr.classList.add('hidden');
    }
    updateCartUI();
}

function applyCoupon() {
    const code = document.getElementById('coupon-input').value.trim().toUpperCase();
    if (code === 'PRIMEIRA10') {
        appliedDiscount = 0.10;
        alert('Cupom PRIMEIRA10 aplicado! 10% de desconto.');
    } else if (code === 'TOP20') {
        appliedDiscount = 0.20;
        alert('Cupom VIP TOP20 aplicado! 20% de desconto.');
    } else {
        appliedDiscount = 0;
        alert('Cupom inválido.');
    }
    updateCartUI();
}

function updateCartUI() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
        const itemTotal = item.unitPrice * item.qty;
        subtotal += itemTotal;
        totalItems += item.qty;

        const optionsText = item.options.length > 0 ? item.options.map(o => o.name).join(', ') : '';

        container.innerHTML += `
            <div class="bg-gray-700/40 p-3 rounded-xl border border-gray-700 flex justify-between gap-3">
                <div class="flex-grow">
                    <h4 class="font-bold text-sm text-white">${item.name}</h4>
                    ${optionsText ? `<p class="text-xs text-amber-400 mt-0.5">+ ${optionsText}</p>` : ''}
                    ${item.obs ? `<p class="text-xs text-gray-400 italic mt-0.5">Obs: "${item.obs}"</p>` : ''}
                    <span class="text-xs font-bold text-gray-300 block mt-1">R$ ${item.unitPrice.toFixed(2).replace('.', ',')} un.</span>
                </div>
                <div class="flex flex-col justify-between items-end">
                    <button onclick="removeFromCart(${item.cartId})" class="text-xs text-red-400 hover:text-red-300">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                    <div class="flex items-center border border-gray-600 rounded bg-gray-800">
                        <button onclick="changeCartItemQty(${item.cartId}, -1)" class="px-2 py-0.5 text-xs text-gray-400">-</button>
                        <span class="px-2 py-0.5 text-xs font-bold text-white">${item.qty}</span>
                        <button onclick="changeCartItemQty(${item.cartId}, 1)" class="px-2 py-0.5 text-xs text-gray-400">+</button>
                    </div>
                </div>
            </div>
        `;
    });

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center text-gray-500 py-8">Seu carrinho está vazio.</div>`;
    }

    let deliveryFee = (deliveryType === 'pickup' || subtotal >= 50.00) ? 0.00 : 7.00;
    let discountAmount = subtotal * appliedDiscount;
    let total = subtotal - discountAmount + deliveryFee;

    document.getElementById('cart-badge-count').innerText = totalItems;
    document.getElementById('cart-badge-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;

    document.getElementById('summary-subtotal').innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
    document.getElementById('summary-delivery').innerText = deliveryFee === 0 ? 'GRÁTIS' : `R$ ${deliveryFee.toFixed(2).replace('.', ',')}`;

    if (appliedDiscount > 0) {
        document.getElementById('discount-row').classList.remove('hidden');
        document.getElementById('summary-discount').innerText = `- R$ ${discountAmount.toFixed(2).replace('.', ',')}`;
    } else {
        document.getElementById('discount-row').classList.add('hidden');
    }

    document.getElementById('summary-total').innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

function togglePaymentObs() {
    const pay = document.getElementById('cust-payment').value;
    const changeInput = document.getElementById('cust-change');
    if (pay === 'Dinheiro') {
        changeInput.classList.remove('hidden');
    } else {
        changeInput.classList.add('hidden');
    }
}

function copyPixKey() {
    navigator.clipboard.writeText('burgerssnackeria@top.com');
    alert('Chave PIX copiada para a área de transferência!');
}

function closePixModal() {
    document.getElementById('pix-modal').classList.add('hidden');
}

// FECHAR PEDIDO E ENVIAR PARA O WHATSAPP
function submitOrder() {
    if (cart.length === 0) {
        alert('Adicione itens ao carrinho antes de enviar!');
        return;
    }

    const name = document.getElementById('cust-name').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const complement = document.getElementById('cust-complement').value.trim();
    const payment = document.getElementById('cust-payment').value;
    const change = document.getElementById('cust-change').value.trim();

    if (!name || !phone) {
        alert('Por favor, preencha seu nome e telefone.');
        return;
    }

    if (deliveryType === 'delivery' && !address) {
        alert('Por favor, informe seu endereço para entrega.');
        return;
    }

    if (payment === 'PIX') {
        document.getElementById('pix-modal').classList.remove('hidden');
    }

    let subtotal = cart.reduce((acc, i) => acc + (i.unitPrice * i.qty), 0);
    let deliveryFee = (deliveryType === 'pickup' || subtotal >= 50.00) ? 0.00 : 7.00;
    let discountAmount = subtotal * appliedDiscount;
    let total = subtotal - discountAmount + deliveryFee;

    let msg = `🍔 *NOVO PEDIDO - BURGERS & SNACKERIA TOP*\n`;
    msg += `------------------------------------\n`;
    msg += `👤 *Cliente:* ${name}\n`;
    msg += `📞 *Contato:* ${phone}\n`;
    msg += `📌 *Tipo:* ${deliveryType === 'delivery' ? 'Entrega em Domicílio' : 'Retirada no Balcão'}\n`;
    
    if (deliveryType === 'delivery') {
        msg += `🏠 *Endereço:* ${address}\n`;
        if (complement) msg += `📍 *Ref/Comp:* ${complement}\n`;
    }

    msg += `💳 *Pagamento:* ${payment}\n`;
    if (payment === 'Dinheiro' && change) msg += `💵 *Troco para:* R$ ${change}\n`;

    msg += `\n📋 *ITENS DO PEDIDO:*\n`;
    cart.forEach(item => {
        msg += `• ${item.qty}x *${item.name}* = R$ ${(item.unitPrice * item.qty).toFixed(2).replace('.', ',')}\n`;
        if (item.options.length > 0) {
            msg += `  └ Adicionais: ${item.options.map(o => o.name).join(', ')}\n`;
        }
        if (item.obs) {
            msg += `  └ Obs: ${item.obs}\n`;
        }
    });

    msg += `\n------------------------------------\n`;
    msg += `*Subtotal:* R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
    msg += `*Taxa de Entrega:* ${deliveryFee === 0 ? 'GRÁTIS' : 'R$ ' + deliveryFee.toFixed(2).replace('.', ',')}\n`;
    if (appliedDiscount > 0) {
        msg += `*Desconto Cupom:* - R$ ${discountAmount.toFixed(2).replace('.', ',')}\n`;
    }
    msg += `💰 *TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*\n`;

    const whatsappNumber = "5541999999999"; 
    const encodedMsg = encodeURIComponent(msg);
    
    setTimeout(() => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
    }, payment === 'PIX' ? 1000 : 0);
}