/**
* Function showPath() is main function for displaying correct SVG, printing path
 * and moving between floors.
* */
function showPath(move){
    let i = 0; let captionLift, captionStairs;
    if(move === 1){
        $('path').remove();
        if (prev.style.display === "none")
            prev.style.display = "block";
        for( let x = 0; x < finalSVGArray.length; x++){
            if(currentStartID === finalSVGArray[x].ID) {
                try {
                    if(currentStartID !== finalSVGArray[x+1].ID) {
                        currentStartID = finalSVGArray[x+1].ID;
                        if(currentStartID === finalSVGArray[finalSVGArray.length - 1].ID)
                            next.style.display = "none";
                        i = x+1;
                        break;
                    }
                }
                catch(err) {
                    next.style.display = "none";
                }
            }
        }
    }
    if(move === -1)
    {
        let previousID = -1;
        $('path').remove();

        if (next.style.display === "none" ) {
            next.style.display = "block";
        }
        if(prev.style.display === "none" )
            prev.style.display = "block";

        for( let x = 0; x < finalSVGArray.length; x++){
            if(currentStartID === finalSVGArray[0].ID){
                prev.style.display = "none";
                break;
            }
            try {
                if(currentStartID === finalSVGArray[x+1].ID && previousID === -1) {
                    previousID = finalSVGArray[x].ID;
                    x = -1;
                    continue;
                }
                if(previousID === finalSVGArray[x].ID)
                {
                    currentStartID = previousID;
                    if(currentStartID === finalSVGArray[0].ID)
                        prev.style.display = "none";
                    i = x;
                    break;
                }
            }
            catch(err) {
                prev.style.display = "none";
            }
        }
    }
    mySVG.setAttribute("src", svgArray[currentStartID]);
    /**
     * To create basic description for the user.
     * "if" to check if user is not in final destination yet
     * else user is on SVG with final destination
     * */
    document.getElementById("caption").innerHTML = "";
    document.getElementById("captionII").innerHTML = "";
    if(currentStartID !== finalSVGArray[finalSVGArray.length-1].ID){
        document.getElementById("caption").textContent
            += captions[0][currentStartID].caption + ",";
        document.getElementById("captionII").textContent
            += "pokračujte prosím po vyznačenej trase tlačidlom *ĎALEJ*"
    }
    else {
        document.getElementById("caption").textContent
            += captions[0][currentStartID].caption+ "," + " v CIEĽOVEJ destinácii.";
        document.getElementById("captionII").textContent
            += "Hľadaný cieľ je vyznačený krížikom!"
    }
    /**
     * Basic resolutuion for SVG
     * **/
    let a,b;

    if(finalSVGArray[i].ID >= 5 && finalSVGArray[i].ID < 8){
        document.getElementById("myImg").style.width = "510px";
        document.getElementById("myImg").style.height = "817px";
         a = 510; b = 817;
    }

    else if(finalSVGArray[i].ID > 10) {

        document.getElementById("myImg").style.width = "1150px";
        document.getElementById("myImg").style.height = "510px";
        document.getElementById("slideShow").style.marginLeft = "150px";
        a = 1150; b = 510;
    }
    else {
        document.getElementById("myImg").style.width = "817px";
        document.getElementById("myImg").style.height = "510px";
        document.getElementById("slideShow").style.marginLeft = "300px";
        a = 817; b = 510;
    }

    $('circle').remove();
    xFinish.clear()
/**
 * Main loop for printing path
 * */
    while(currentStartID === finalSVGArray[i].ID ){
        captionLift = (finalSVGArray[i].place).match(/VYTAH/g);
        captionStairs = (finalSVGArray[i].place).match(/SCHODISKO/g);
        if(captionLift == "VYTAH" && currentStartID !== finalSVGArray[finalSVGArray.length-1].ID
        &&((getCaptionForNextFloor()) !== (currentFloor())) ){
            document.getElementById("captionII").innerHTML = "";
            document.getElementById("captionII").textContent
                += " pokračujte po vyznačenej trase a použite výťah. Vo výťahu stlačte číslo" + " "
                + getCaptionForNextFloor() + ".";
        }
        else if(captionStairs == "SCHODISKO" && currentStartID !== finalSVGArray[finalSVGArray.length-1].ID
            &&((getCaptionForNextFloor()) !== (currentFloor()))){
            document.getElementById("captionII").innerHTML = "";
            document.getElementById("captionII").textContent
                += " pokračujte po vyznačenej trase a choďte" + " " + getCaptionStairs() + " po schodoch";
        }
        try{
            if(finalSVGArray[i].place === finalSVGArray[finalSVGArray.length-1].place
            || finalSVGArray[0].place === finalSVGArray[finalSVGArray.length-1].place){
                xFinish
                    .size(a+15, b+15)
                    .line(0, 15, 15, 0).move(finalSVGArray[i].x-7, finalSVGArray[i].y-7)
                    .stroke({ color: 'red', width: 5, linecap: 'round' })
                xFinish
                    .size(a+15,b+15)
                    .line(0, -15, 15, 0).move(finalSVGArray[i].x-7, finalSVGArray[i].y-7)
                    .stroke({ color: 'red', width: 5, linecap: 'round' })
                if(finalSVGArray[0].place === finalSVGArray[finalSVGArray.length-1].place)
                    break;
            }
            if(finalSVGArray[i].place === finalSVGArray[0].place){
                circle
                    .size(a, b)
                    .circle(15).fill('red').move(finalSVGArray[i].x-8, finalSVGArray[i].y-8)
            }
            if(finalSVGArray[i+1].ID !== currentStartID){break;}
            path
                .size(a, b)
                .path()
                .attr({
                    fill: 'none',
                    stroke: 'red',
                    'stroke-width': 2,
                })
                .M({x: finalSVGArray[i].x, y:finalSVGArray[i].y})
                .M({x: finalSVGArray[i+1].x, y:finalSVGArray[i+1].y})
        }
        catch (err){
            break;
        }
        i++;
    }
}
