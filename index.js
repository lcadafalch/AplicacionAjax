
//FUNCIÓN GET DE LOS EMPLEADOS


function getEmpleados() {
    $.ajax({
        "type": "GET",
        "url": "http://dummy.restapiexample.com/api/v1/employees",
        "dataType": "json",
        "headers": { "Content-Type": "application/json" },
        "success": (data) => { PrintEmpleados(data) },
        "error": (error) => { console.log(error) }

    })
}

// FUNCIÓN  GET DE LOS EMPLEADOS

function PrintEmpleados(arrEmpleados) {
    for (let objEmpleado of arrEmpleados) {
        let tr = ` <tr class="row_${objEmpleado["id"]}" >
                                <th scope="row"><i class="fas fa-user"></i></th>
                                <td>${objEmpleado["employee_name"]}</td>
                                <td>${objEmpleado["employee_salary"]}</td>
                                <td>${objEmpleado["employee_age"]}</td>
                                <td>
                                    <div class="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                                        <div class="btn-group" role="group" aria-label="First group">
                                            <button type="button" class="btn bg-primary"><i
                                                    class="fas fa-search"></i></i>

                                            </button>
                                        </div>
                                        <div class="btn-group" role="group" aria-label="Second group">
                                            <button type="button" class="btn " data-id="${objEmpleado["id"]}"><i class="fas fa-pen"></i></button>
                                        </div>
                                        <div class="btn-group" role="group" aria-label="Third group">
                                            <button type="button" class="btn bg-danger deleteButton"  data-id="${objEmpleado["id"]}"><i
                                                    class="fas fa-trash-alt"></i></button>
                                        </div>
                                    </div>
                                </td>
                            </tr>`;

        $("body > div > div.container > div.row > div.col-10 > table > tbody").append(tr);
    }
    preparaEventos();

}


//FUNCIÓN DELETE EMPLEADOS

function preparaEventos() {

    $('.deleteButton').each(
        function () {
            $(this).on('click', function () {
                let idUsuario = $(this).attr("data-id")
                alert(idUsuario)

                $.ajax({
                    "type": "DELETE",
                    "url": "http://dummy.restapiexample.com/delete/" + idUsuario,
                    "dataType": "json",
                    "headers": { "Content-Type": "application/json" },
                    "success": (data) => {

                        let tr = $(`.row_${idUsuario}`)
                        tr.remove();


                    },
                    "error": (error) => {
                        console.log(error);
                        let tr = $(`.row_${idUsuario}`)
                        tr.remove();
                    }

                })
            });

        }
    )
}


// FUNCIÓN AÑADIR USUARIO

function añadirUsuario() {


    let modeloEmpleado = {

        "name": $(".name_modal").val(),
        "salary": $(".salary_modal").val(),
        "age": $(".age_modal").val()

    }
    $('.botoninsertar').click(() => {
        $.ajax({

            "type": "POST",
            "url": "http://dummy.restapiexample.com/create",
            "dataType": "json",
            "data": JSON.stringify(modeloEmpleado),
            "headers": { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
            "success": (data) => {
                console.log(data)
                alert("Well done")
            },
            "error": (error) => { console.log(error) }

        })
    })
}


//FUNCTION GET LUPA

// function getLupa
// $.ajax({
//     "type": "GET",
//     "url": "http://dummy.restapiexample.com/api/v1/employees",
//     "dataType": "json",
//     "headers": { "Content-Type": "application/json" },
//     "success": (data) => { PrintEmpleados(data) },
//     "error": (error) => { console.log(error) }

// })
// $.("")


getEmpleados()