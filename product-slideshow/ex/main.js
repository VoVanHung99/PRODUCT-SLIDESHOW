let jsonData;

async function getJSONData() {
    const res = await fetch("https://nguyenvu.store/wp-json/wc/v3/products?consumer_key=ck_ae0f234c096cfe3b6d4c3eafe8d6a78021593c80&consumer_secret=cs_223d9a5a89554c52710f1a63d17f6848d3f9e376");
    jsonData = await res.json();
    console.log(jsonData);
}

async function assignData() {
    await getJSONData();
    console.log(jsonData[0].description);
    let productItems = document.querySelectorAll('.carousel-cell');
    for (let i = 0; i < productItems.length; ++i) {
        productItems[i].classList.add(`product-${[i]}`);
        productItems[i].innerHTML += `
            <div class="product-container">
                <a href="${jsonData[i].permalink}">
                    <img src="${jsonData[i].images[0].src}" class="product-img" alt="">
                </a>
                <div class="product-content">
                        <div class="product-category-container">
                            <p class="product-category">${jsonData[i].categories[0].name}</p>
                        </div>
                        <div class="product-title">
                            <a href="${jsonData[i].permalink}">${jsonData[i].name}</a>
                        </div>
                        <div class="product-price">
                            ${jsonData[i].price_html}
                        </div>
                        <div class="product-btn-group">
                            <a>
                                <button class="add-to-cart">Thêm vào giỏ hàng</button>
                            </a>
                            <a href="#popup-product-${[i]}" data-effect="mfp-zoom-in">
                                <button class="product-detail">
                                    Xem chi tiết
                                </button>
                            </a>
                            <div id="popup-product-${[i]}" class="white-popup mfp-with-anim mfp-hide">
                                <h3 class="popup-title">Chi tiết sản phẩm</h3>
                                <div class="popup-content">
                                    <table>
                                        <th>Tên sản phẩm:</th>
                                        <td>${jsonData[i].name}</td>
                                    </table>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        `;
        let productDetailTable = document.querySelector(`.product-${[i]} table`);
        for (let j = 0; j < jsonData[i].attributes.length; ++j) {
            productDetailTable.innerHTML += `
                <tr>
                    <th>${jsonData[i].attributes[j].name}:</th>
                    <td>${jsonData[i].attributes[j].options[0]}</td>
                </tr>
            `;
        }
        $(".product-btn-group > a").magnificPopup({
            midClick: true,
        })
    }
}

assignData();
