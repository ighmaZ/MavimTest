//global variables
let orders = [];
let orderId = "";

function validate() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    //let tableEl = document.querySelector("table");

    if (username == "test" && password == "test") {
        setTimeout(function() {
            window.location = "orders.html";
        });
    } else {
        alert("login failed");
    }
}

function setTable(myOrders) {
    let tableData = "";
    myOrders.map((values) => {
        tableData += `            
        <tr>
    
            <td>
                <h5>${values.id}</h5>
            </td>
            <td><img src="./png-clipart-pizza-pizza-removebg-preview.png" alt="pizza"></td>
            <td>
                <h5>${values.Size}</h5>
            </td>
            <td>
                <h5>${values.Flavor}</h5>
            </td>
            <td>
                <h5>${values.Crust}</h5>
            </td>
            <td><a href="#"><i class="fas fa-trash-alt" id="delete-pizza" onClick = "deleteUser(${values.id})"></i></a> </td>   
    
        </tr>`; // HERE PASTED
    });
    document.getElementById("table_body").innerHTML = tableData;
}

// get request api
const getOrders = () => {
    fetch("https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza ")
        .then((data) => {
            return data.json();
        })
        .then((objectData) => {
            // console.log(objectData[0].id);
            orders = objectData;
            setTable(orders);
        })
        .catch((err) => {
            console.log(error);
        });
};
getOrders();

// popup

// new pizza
document.getElementById("login_button").addEventListener("click", function() {
    document.querySelector(".pop-up").style.display = "flex";
});
document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".pop-up").style.display = "none";
});

// delete order
document.getElementById("close-modal").addEventListener("click", function() {
    document.querySelector(".pop-up-delete").style.display = "none";
});
document.getElementById("delete-no").addEventListener("click", function() {
    document.querySelector(".pop-up-delete").style.display = "none";
});
document.getElementById("delete-yes").addEventListener("click", function() {
    fetch(
            "https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza" + "/" + orderId, {
                method: "delete",
            }
        )
        .then(() => {
            orders = orders.filter((order) => order.id !== orderId.toString());
            setTable(orders);
            document.querySelector(".pop-up-delete").style.display = "none";
        })
        .catch((e) => alert(" Item not deleted  "));
});

// add pizza by post request
let form = document.getElementById("form-2");
form.addEventListener("submit", function(e) {
    e.preventDefault();

    let newOrder = {
        Table_No: document.getElementById("Table_No").value,
        Size: document.getElementById("Size").value,
        Flavor: document.getElementById("Flavor").value,
        Crust: document.getElementById("Crust").value,
    };

    // fetch req
    fetch("https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza", {
            method: "POST",
            body: JSON.stringify(newOrder),
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
            },
        })
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            orders = [...orders, data];
            setTable(orders);
            alert(" click ok to add");
        });
});

//delete pizza
function deleteUser(id) {
    orderId = id;
    document.querySelector(".pop-up-delete").style.display = "flex";
}

// jquery
$("a img").click(function(e) {
    $(this).effect("shake");
    e.stopPropagation();
});
