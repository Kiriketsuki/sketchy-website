
    var gridSize = 0; // how many boxes per row and per column
    var boxSize = 0; //initializing the boxSize variable
    var selectedColour = "black"; //initial colour black
    var isReverse = false;

    const gridContainer = document.querySelector("#gridContainer"); 

    var boxNodeList = [];

    const gridSizeInformation = document.querySelector("#gridSize");
    gridSizeInformation.textContent = (`The current grid size is ${gridSize} by ${gridSize}`);

    const selectedColourInformation = document.querySelector("#selectedColour");
    selectedColourInformation.textContent = (`The current colour ink is now ${selectedColour}`);
    selectedColourInformation.style.color = selectedColour;

    const isReverseInformation = document.querySelector("#isReverse");
    if (!isReverse) {
        isReverseInformation.textContent = (`The grids will darken`);
    }

    function updateBoxSize(a) {
        boxSize = (960/gridSize) - 0.005;
    }

    function chooseGridSize() {
        var requestedGridSize;
        var requestedGridSizeInt;

        requestedGridSize = parseInt(prompt("Please choose the size of the grid"));
        requestedGridSizeInt = requestedGridSize || 0;
        if (requestedGridSizeInt <= 0) {
            alert ("Sorry, invalid size chosen. Defaulted to 10 by 10");
            requestedGridSizeInt = 10;

        } 
        return requestedGridSizeInt;
    }

    function deleteChildren(container) {
        while (container.hasChildNodes()) {
            container.removeChild(container.lastChild);
        }
    }

    function generateGrid(gridSize,boxSize) {
        for (var i = 0; i < gridSize; i++) {
            var newRow = document.createElement("div");
            newRow.style.height = `${boxSize}px`;
            newRow.style.width = "100%";
            newRow.style.marginLeft = "auto";
            newRow.style.marginRight = "auto";
            newRow.classList.add("row");
            newRow.style.overflow = "hidden";

            for (var j = 0; j < gridSize; j++) {
                var newBox = document.createElement("span");
                newBox.style.boxSizing = "border-box";
                newBox.style.borderStyle = "dotted";
                newBox.style.borderWidth = "0.5px";
                newBox.style.borderColor = "hsl(0,0%,25%)";
                newBox.style.backgroundColor = "white";
                newBox.style.width = `${boxSize}px`;
                newBox.style.height = `${boxSize}px`;
                newBox.classList.add("box");
                newBox.style.display = "inline-block";
                newBox.setAttribute("data-lightness", 100);

                newRow.appendChild(newBox);
            }

            gridContainer.appendChild(newRow);
        }
    }

    function increaseOpacity(object,colour) { //colour should be a string, be it "black" or "white" or "hsl(hue,sat%,"
        objectLightness = parseInt(object.getAttribute("data-lightness"))
        if (colour == "black"){
            if (objectLightness == 0) {
                return;
            } else {
                objectLightness -= 10;
                object.setAttribute("data-lightness",objectLightness);
                object.style.backgroundColor = `hsl(0,0%,${objectLightness}%)`;
                return;
            }
        }   else {
                if (objectLightness == 0) {
                    return;
                } else {
                    objectLightness -= 10;
                    object.setAttribute("data-lightness",objectLightness);
                    object.style.backgroundColor = `${colour}${objectLightness}%)`
                    return;
                }
            
        }
    }

    function decreaseOpacity(object,colour) { //opposite of increase. For use when inReverse is true
        objectLightness = parseInt(object.getAttribute("data-lightness"))
        if (colour == "black"){
            if (objectLightness ==  100) {
                return;
            } else {
                objectLightness += 10;
                object.setAttribute("data-lightness",objectLightness);
                object.style.backgroundColor = `hsl(0,0%,${objectLightness}%)`;
                return;
            }
        }   else {
                if (objectLightness == 100) {
                    return;
                } else {
                    objectLightness += 10;
                    object.setAttribute("data-lightness",objectLightness);
                    object.style.backgroundColor = `${colour}${objectLightness}%)`
                    return;
                }
            
        }
    }

    function generateColour () { //should return a string
        var toReturn = "";
        var hueValue = 0;
        var satValue = 0;

        hueValue = Math.floor(Math.random()*361);
        satValue = Math.floor(Math.random()*101);
        toReturn = `hsl(${hueValue},${satValue}%,`
        return toReturn;
    }

    const sizeButton = document.querySelector("#sizeSelector");
    sizeButton.addEventListener("click", function (e){
        gridSize = chooseGridSize();
        updateBoxSize();
        gridSizeInformation.textContent = (`The current grid size is ${gridSize} by ${gridSize}`);
        deleteChildren(gridContainer);
        generateGrid(gridSize,boxSize);
        boxNodeList = document.querySelectorAll(".box");
        boxNodeList.forEach((span) => {
            span.addEventListener("mouseover", (e) =>{
                if (!isReverse) {
                    increaseOpacity(span,selectedColour);
                } else {
                    decreaseOpacity(span,selectedColour);
                }
                
            });
        })    
    })

    const randomButton = document.querySelector("#randomInk");
    randomButton.addEventListener("click", function(e){
        selectedColour = generateColour();
        selectedColourInformation.textContent = (`The current colour ink now has a HSL value of ${selectedColour}100%)`);
        selectedColourInformation.style.color = `${selectedColour}50%)`;
    })
    
    const blackButton = document.querySelector("#blackInk");
    blackButton.addEventListener("click", function(e) {
        selectedColour = "black";
        selectedColourInformation.textContent = (`The current colour ink is now black`);
        selectedColourInformation.style.color = selectedColour;
    })
    
    const reverseButton = document.querySelector("#reverseInk");
        reverseButton.addEventListener("click", function(e) {
        isReverse = !isReverse;
        if (!isReverse) {
            isReverseInformation.textContent = (`The grids will darken`);
        } else {
            isReverseInformation.textContent = (`The grids will lighten`);
        }
    })
