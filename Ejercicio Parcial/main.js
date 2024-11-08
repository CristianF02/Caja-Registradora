let preciosProductos = {
    "balon": 50000,
    "uniforme": 75000,
    "peto": 12000,
    "cono": 15000,
    "guayos": 120000,
    "medias": 10000,
    "licras": 45000,
    "zapatillas": 85000
};

let cantidadesCampos = {
    "balon": document.getElementById('cantidad-balon'),
    "uniforme": document.getElementById('cantidad-uniforme'),
    "peto": document.getElementById('cantidad-peto'),
    "cono": document.getElementById('cantidad-cono'),
    "guayos": document.getElementById('cantidad-guayos'),
    "medias": document.getElementById('cantidad-medias'),
    "licras": document.getElementById('cantidad-licras'),
    "zapatillas": document.getElementById('cantidad-zapatillas')
};

let calculateBtn = document.getElementById('calculate-btn');
let resetBtn = document.getElementById('reset-btn');
let buyBtn = document.getElementById('buy-btn');
let totalPriceDisplay = document.getElementById('total-price');
let selectedProductsDisplay = document.getElementById('selected-products'); 
let purchaseDetailsDisplay = document.getElementById('purchase-details'); 
let searchBar = document.getElementById('search-bar');
let productList = document.getElementById('product-list');


searchBar.addEventListener('input', function () {
    let filter = searchBar.value.toLowerCase();
    let products = productList.getElementsByClassName('product');
    
    for (let i = 0; i < products.length; i++) {
        let label = products[i].getElementsByTagName('label')[0];
        if (label.innerHTML.toLowerCase().includes(filter)) {
            products[i].style.display = ""; 
        } else {
            products[i].style.display = "none"; 
        }
    }
});


function eliminarValorInicial(event) {
    if (event.target.value === '0') {
        event.target.value = '';
    }
}

for (let producto in cantidadesCampos) {
    cantidadesCampos[producto].addEventListener('focus', eliminarValorInicial);
}


function calcularPrecioTotal() {
    let precioTotal = 0;
    let productosSeleccionados = '';

    for (let producto in preciosProductos) {
        let cantidad = parseInt(cantidadesCampos[producto].value, 10);
        if (cantidad > 0) {
            precioTotal += preciosProductos[producto] * cantidad;
            productosSeleccionados += `${producto.charAt(0).toUpperCase() + producto.slice(1)} (Cantidad: ${cantidad}) - $${(preciosProductos[producto] * cantidad).toLocaleString()} COP<br>`;
        }
    }

    totalPriceDisplay.textContent = `Precio Total: $${precioTotal.toLocaleString()} COP`;
    selectedProductsDisplay.innerHTML = productosSeleccionados ? 'Productos Seleccionados:<br>' + productosSeleccionados : 'No se han seleccionado productos.';
}


function resetearCantidades() {
    for (let producto in cantidadesCampos) {
        cantidadesCampos[producto].value = 0;
    }
    totalPriceDisplay.textContent = `Precio Total: $0 COP`;
    selectedProductsDisplay.innerHTML = 'No se han seleccionado productos.';
    purchaseDetailsDisplay.innerHTML = '';
}



const confirmBtn = document.getElementById('confirm-btn');


function mostrarResumenCompra() {
    let precioTotal = 0;
    let tablaCompra = `
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Precio Total</th>
                </tr>
            </thead>
            <tbody>
    `;

    
    let hayProductosSeleccionados = false;

    
    for (let producto in preciosProductos) {
        let cantidad = parseInt(cantidadesCampos[producto].value, 10);
        if (cantidad > 0) {
            hayProductosSeleccionados = true; 
            let precioUnitario = preciosProductos[producto];
            let precioTotalProducto = precioUnitario * cantidad;
            precioTotal += precioTotalProducto;

            tablaCompra += `
                <tr>
                    <td>${producto.charAt(0).toUpperCase() + producto.slice(1)}</td>
                    <td>${cantidad}</td>
                    <td>$${precioUnitario.toLocaleString()} COP</td>
                    <td>$${precioTotalProducto.toLocaleString()} COP</td>
                </tr>
            `;
        }
    }

    tablaCompra += `
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3"><strong>Valor Total de la Factura:</strong></td>
                <td><strong>$${precioTotal.toLocaleString()} COP</strong></td>
            </tr>
        </tfoot>
    </table>`;

    let purchaseSummary = document.getElementById('purchase-summary');

    
    if (hayProductosSeleccionados) {
        purchaseSummary.innerHTML = tablaCompra;
        confirmBtn.style.display = 'block';  
    } else {
        purchaseSummary.innerHTML = 'No ha seleccionado productos para comprar.';
        confirmBtn.style.display = 'none';  
    }
}

buyBtn.addEventListener('click', mostrarResumenCompra);


buyBtn.addEventListener('click', mostrarResumenCompra);


buyBtn.addEventListener('click', mostrarResumenCompra);


calculateBtn.addEventListener('click', calcularPrecioTotal);
resetBtn.addEventListener('click', resetearCantidades);
buyBtn.addEventListener('click', mostrarResumenCompra);
