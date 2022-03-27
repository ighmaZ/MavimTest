function validate() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let tableEl = document.querySelector('table');

    if (username == "test" && password == "test") {

        // windows.location.href = "orders.html";
        setTimeout(function() { window.location = "orders.html" });


    } else {


        alert("login failed");

    }

}

// get request api

fetch("https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza ").then((data) => {

    return data.json(); // converted to objects
}).then((objectData) => {
    // console.log(objectData[0].id);
    let tableData = "";
    objectData.map((values) => {
        tableData += `            <tr>
      
        <td>
            <h5>${values.id}</h5>
        </td>
        <td><img src="/png-clipart-pizza-pizza-removebg-preview.png" alt="pizza"></td>
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
}).catch((err) => {
    console.log(error);
})

// popup

document.getElementById("login_button").addEventListener("click", function() {
    document.querySelector(".pop-up").style.display = "flex";
})
document.querySelector(".close").addEventListener("click", function() {
    document.querySelector(".pop-up").style.display = "none";

})

// add pizza by post request

let form = document.getElementById("form-2");
form.addEventListener("submit", function(e) {

    e.preventDefault()
    alert("🍕 pizza added! , Refresh!")

    let Table_No = document.getElementById('Table_No').value;
    let Size = document.getElementById('Size').value;
    let Flavor = document.getElementById('Flavor').value;
    let Crust = document.getElementById('Crust').value;

    // fetch req

    fetch("https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza", {
            method: 'POST',
            body: JSON.stringify({
                Table_No: Table_No,
                Size: Size,
                Flavor: Flavor,
                Crust: Crust
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        })
        .then(function(response) {
            return response.json()

        })
        .then(function(data) {
            console.log(data)

        })
})


//delete pizza

function deleteUser(userId) {

    alert('🍕 Item deleted successfully , refresh! ');
    return fetch('https://61b6012ac95dd70017d40dcd.mockapi.io/api/V1/Pizza' + '/' + userId, {
            method: 'delete'
        })
        .then(response => response.json());
}


// jquery

$("a img").click(function(e) {
    $(this).effect("shake");
    e.stopPropagation();
});
