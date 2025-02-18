let axiosConfig = {
  headers: {
    Authorization: "Bearer "+ localStorage.getItem('token')
  }
}

async function singInAccount() {
  const loginEmail = document.querySelector('#email').value;
  const logInPassword = document.querySelector('#password').value;

  const login = {
    email: loginEmail,
    password: logInPassword
  }
  
    axios.post("http://localhost:3000/auth", login).then(response => {
      if(response) {
        let token = response.data.token;
        localStorage.setItem('token', token);
        axiosConfig.headers.Authorization = `Bearer ${token}`
      } else {
        console.log('Resposta nao encontrado')
      }
    });
      
}

const loginbtn = document.querySelector('#login-btn');
loginbtn.addEventListener('click', (e) => {
  singInAccount();
  e.preventDefault()
})

const list = document.querySelector(".product");

async function removeItem(item) {
  let id = item.getAttribute("data-id");
  try {
    await axios.delete("http://localhost:3000/product/" + id, axiosConfig);
    alert("Deletado com sucesso!");
  } catch (error) {
    console.log(error.message);
  }
}

axios
  .get("http://localhost:3000/product", axiosConfig)
  .then((product) => {
    const response = product.data;
    const products = response.products;

    products.map((product) => {
      let li = document.createElement("li");

      li.setAttribute("data-id", product.id);
      li.setAttribute("data-name", product.name);
      li.setAttribute("data-description", product.description);
      li.setAttribute("data-price", product.price);
      li.textContent = `
    ${product.id} 
    ${product.name} 
    ${product.description}  
    ${product.price} 
    ${product.category}`;
      list.appendChild(li);

      const deletbtn = document.createElement("button");
      deletbtn.textContent = "Delet";
      li.appendChild(deletbtn);

      deletbtn.addEventListener("click", () => {
        removeItem(li);
      });
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

function createProduct() {
  let name = document.querySelector("#name").value;
  let description = document.querySelector("#description").value;
  let price = document.querySelector("#price").value;
  let category = document.querySelector("#category").value;

  let newProduct = {
    name,
    description,
    price,
    category,
  };

  axios
    .post("http://localhost:3000/product", newProduct, axiosConfig)
    .then((response) => {
      console.log(response.data)
    })
    .catch((error) => {
      console.log(error.message);
    });
}

const btn = document.querySelector(".btn");

btn.addEventListener("click", (e) => {
  e.preventDefault();
  createProduct();
});
