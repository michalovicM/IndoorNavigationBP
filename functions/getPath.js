/**
* Function getPath() send request to the server and creates final path of the points
 * from target to the end point selected by the user.
 * It also checks for key sensitive inputs and diacritics.
* */

let finalSVGArray = [];

function getPath(){
    let mySource = $('#mySource').val().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ").join("");
    let myTarget = $('#myTarget').val().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().split(" ").join("");

    $('circle').remove();
    xFinish.clear()
    $('path').remove();

    event.preventDefault();
    $.ajax({
        url: "http://localhost:3000",
        method: 'POST',
        data: { mySource: mySource, myTarget: myTarget },
        success: function( result ) {
            finalSVGArray.length = 0;
            document.getElementById("mySource").className = document.getElementById("mySource").className.replace("error", "");
            document.getElementById("myTarget").className = document.getElementById("myTarget").className.replace("error", "");
            if(result === "invalidSource"){
                invalidInput();
                document.getElementById("caption").innerHTML = "";
                document.getElementById("captionII").innerHTML = "";
                document.getElementById("caption").textContent
                    += " Zadaný SOURCE nie je správny.";
                document.getElementById("captionII").textContent
                    += " Opravte Váš vstup a skúste ešte raz.";
                document.getElementById("mySource").className = document.getElementById("mySource").className + "error";
            }
            else if(result === "invalidTarget"){
                invalidInput();
                document.getElementById("caption").innerHTML = "";
                document.getElementById("captionII").innerHTML = "";
                document.getElementById("caption").textContent
                    += " Zadaný TARGET nie je správny.";
                document.getElementById("captionII").textContent
                    += " Opravte Váš vstup a skúste ešte raz.";
                document.getElementById("myTarget").className = document.getElementById("myTarget").className + "error";
            }
            else if(result === "invalidSourceAndTarget"){
                invalidInput();
                document.getElementById("caption").innerHTML = "";
                document.getElementById("captionII").innerHTML = "";
                document.getElementById("caption").textContent
                    += " Zadaný SOURCE a TARGET nie sú správne.";
                document.getElementById("captionII").textContent
                    += " Opravte Váš vstup a skúste ešte raz.";
                document.getElementById("mySource").className = document.getElementById("mySource").className + "error";
                document.getElementById("myTarget").className = document.getElementById("myTarget").className + "error";
            }
            else{
                finalSVGArray = result;
                console.log(finalSVGArray);
                prepareCanvas();
                showPath();
            }
        }
    });
}









