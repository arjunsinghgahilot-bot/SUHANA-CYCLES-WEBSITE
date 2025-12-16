/* script.js */

/* --- 1. PRODUCT DATA --- */
const PRODUCTS = [
    {id:1,title:'Classic Messenger Bag',cat:'Bag',price:5499,desc:'Spacious leather messenger with adjustable strap',img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9pVVG2KM-Y6movoXJMjG4_CKMGX7Dd5aWHQ&s']},
    {id:2,title:'Heritage Backpack',cat:'Bag',price:7599,desc:'Rugged backpack with padded compartment',img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1EZW1ZgGycUzxxpGdFo9dgPZxzCCmpghryQ&s']},
    {id:3,title:'Slim Wallet',cat:'Purse',price:999,desc:'Slim bi-fold wallet with card slots',img:['https://www.slimfoldwallet.com/cdn/shop/files/Square_MSS4_1800x.jpg?v=1699661720']},
    {id:5,title:'Biker Leather Jacket',cat:'Jacket',price:12999,desc:'Classic biker jacket with YKK zipper',img:['https://leatheriza.com/wp-content/uploads/2020/12/green-men-biker-leather-jacket-2-247x296.jpg']},
    {id:6,title:'Bomber Jacket',cat:'Jacket',price:13999,desc:'Tailored bomber with soft lining',img:['https://static2.goldengoose.com/public/Style/ECOMM/GMP00834.P001488-15527.jpg']},
    {id:7,title:'Leather Dress (Mini)',cat:'Dress',price:8999,desc:'Trendy leather mini dress for parties',img:['https://cdn-img.prettylittlething.com/b/2/8/1/b281ddd6084bf5d2340ac172190601047d9bbe8a_cni6225_1.jpg']},
    {id:8,title:'Crossbody Sling',cat:'Bag',price:3499,desc:'Small crossbody sling for essentials',img:['https://images.meesho.com/images/products/457157784/ikkcx_512.webp?width=512']},
    {id:9,title:'Formal Belt',cat:'Accessory',price:799,desc:'Full-grain leather belt with metal buckle',img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnsb50bdaeYLkkSKzkqQBv01OqIpr_VfzdlQ&s']},
    {id:10,title:'Watch Strap (Leather)',cat:'Accessory',price:499,desc:'Custom leather strap for watches',img:['https://m.media-amazon.com/images/I/61z0iOGNG8L._AC_UY1100_.jpg']},
    {id:11,title:'Laptop Sleeve',cat:'Bag',price:2299,desc:'Padded leather sleeve - 15 inch',img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzxFfZJ8A0TCAj-yLxP6KXd1aQWItXZCFVtQ&s']},
    {id:12,title:'Vintage Satchel',cat:'Bag',price:6799,desc:'Hand-stitched satchel with brass hardware',img:['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTua2-TNYJWe805bqkynrsT85VzCHjRl3O5Gg&s']},
    {id:13,title:'Card Holder',cat:'Purse',price:599,desc:'Minimal card holder for 4-6 cards',img:['https://m.media-amazon.com/images/I/71X65t0LheL.jpg']}
];

// Utility function
function formatINR(n){ return '₹' + n.toLocaleString('en-IN'); }

document.addEventListener('DOMContentLoaded', () => {

    /* --- 2. CATEGORY PAGE LOGIC (Product Filters and Grid) --- */
    const grid = document.getElementById('productGrid');
    const filterCategory = document.getElementById('filterCategory');
    const priceRange = document.getElementById('priceRange');
    const priceVal = document.getElementById('priceVal');
    const sortBy = document.getElementById('sortBy');
    const searchBox = document.getElementById('searchBox');

    if (grid) { // Only run if productGrid element exists (i.e., on category.html)

        // Populate category select
        const categories = ['All',...Array.from(new Set(PRODUCTS.map(p=>p.cat)))];
        filterCategory.innerHTML = categories.map(c => `<option value="${c.toLowerCase()}">${c}</option>`).join('');

        function renderProducts(){
            const cat = filterCategory.value;
            const maxPrice = Number(priceRange.value);
            const q = searchBox.value.trim().toLowerCase();
            
            let list = PRODUCTS.filter(p=>
                p.price <= maxPrice && 
                (cat === 'all' || p.cat.toLowerCase() === cat) && 
                (p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
            );
            
            // Sorting
            if(sortBy.value === 'price-asc') list.sort((a,b)=>a.price - b.price);
            if(sortBy.value === 'price-desc') list.sort((a,b)=>b.price - a.price);
            
            grid.innerHTML='';
            
            if(list.length === 0){
                grid.innerHTML='<div style="padding:18px;color:var(--text-muted); grid-column: 1 / -1; text-align: center;">No products found for selected filters.</div>'
            }
            
            list.forEach(p=>{
                // FIX: card.className='product-card' should match CSS
                const card = document.createElement('div');
                card.className='product-card'; 
                card.innerHTML = `
                    <img src="${p.img[0]}" class="product-img" alt="${p.title}">
                    <div class="product-info">
                        <div class="product-cat">${p.cat}</div>
                        <h4>${p.title}</h4>
                        <div class="product-price">${formatINR(p.price)}</div>
                        <div style="display:flex;gap:8px;margin-top:10px;justify-content:center;">
                            <button class="btn btn-outline" data-id="${p.id}">Details</button>
                            <button class="btn btn-primary" data-buy="${p.id}">Add to Cart</button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
            attachCardListeners();
        }

        function attachCardListeners(){
            document.querySelectorAll('.product-card .btn-outline').forEach(b => b.onclick = (e) => openModal(Number(e.currentTarget.dataset.id)));
            document.querySelectorAll('.product-card .btn-primary').forEach(b => b.onclick = (e) => alert('Added to cart: ' + PRODUCTS.find(p=>p.id===Number(e.currentTarget.dataset.buy)).title));
        }

        // Filter Event Listeners
        priceRange.addEventListener('input',()=>{ 
            priceVal.textContent = formatINR(Number(priceRange.value)); 
            renderProducts(); 
        });
        filterCategory.addEventListener('change',renderProducts);
        sortBy.addEventListener('change',renderProducts);
        searchBox.addEventListener('input',renderProducts);
        
        // Initial call to render products
        priceRange.dispatchEvent(new Event('input')); // To update price value and run first render
        // renderProducts(); // Called by priceRange.dispatchEvent
    }

    /* --- 3. MODAL LOGIC (Shared) --- */
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');
    const modalPrice = document.getElementById('modalPrice');
    const modalCat = document.getElementById('modalCat');
    const modalGallery = document.getElementById('modalGallery');
    const closeModal = document.getElementById('closeModal');
    const addCartModalBtn = document.getElementById('addCart'); // Button from the modal

    if(modal) {
        window.openModal = (id) => {
            const p = PRODUCTS.find(x => x.id === id);
            if(!p) return;
            
            modalTitle.textContent = p.title;
            modalDesc.textContent = p.desc;
            modalPrice.textContent = formatINR(p.price);
            modalCat.textContent = p.cat;
            modalGallery.innerHTML = `<img src="${p.img[0]}" style="width:100%;height:320px;object-fit:cover;border-radius:8px">`;
            
            // Set the Add to Cart button ID
            addCartModalBtn.setAttribute('data-buy', p.id); 
            addCartModalBtn.onclick = () => {
                 alert('Added to cart: ' + p.title);
                 modal.classList.remove('active');
            };
            
            // FIX: Use 'active' class name to open modal (to match CSS)
            modal.classList.add('active'); 
            modal.setAttribute('aria-hidden', 'false');
        }

        closeModal.addEventListener('click', () => { 
            modal.classList.remove('active'); 
            modal.setAttribute('aria-hidden', 'true'); 
        });
        
        modal.addEventListener('click', (e) => { 
            if(e.target === modal) { 
                modal.classList.remove('active'); 
                modal.setAttribute('aria-hidden', 'true'); 
            } 
        });
    }

    /* --- 4. CAROUSEL LOGIC (Only runs on index.html) --- */
    const track = document.getElementById('carouselTrack');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');

    if (track && nextBtn && prevBtn) {
        const slides = track.children; let idx=0; const total=slides.length;
        
        const updateCarousel = () => {
            track.style.transform = `translateX(-${idx * 100}%)`;
        };

        nextBtn.addEventListener('click', () => { idx = (idx + 1) % total; updateCarousel(); });
        prevBtn.addEventListener('click', () => { idx = (idx - 1 + total) % total; updateCarousel(); });
        
        // Auto play
        setInterval(() => { idx = (idx + 1) % total; updateCarousel(); }, 4500);
    }

    /* --- 5. CONTACT FORM SUBMISSION (Only runs on contact.html) --- */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => { 
            e.preventDefault(); 
            alert('Thank you! We received your message.'); 
            e.target.reset(); 
        });
    }

});