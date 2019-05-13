function stdToEng(num){

    let float = parseFloat(num);
    let number = float.toFixed(2);
    let components=number.split(".",2);
    let int = components[0];
    let dec = components[1];
    let result = []

    for (let i = 0; i < int.length; i++) {

        const j = (int.length-i)-1;
        const k = i+1;
        const c = int.substr(j,1);

        if((k%3===0)&&(j!==0)&&(int.substr(0,1)!=="-")){

            result.push(c);
            result.push(",");

        }

        else{

            result.push(c);

        }

    }

    let numEng='';

    for (let i = 0; i < result.length; i++) {

        const j=(result.length-i)-1;
        const c=result[j];
        numEng+=c;

    }

    numEng+=".";
    numEng+=dec;

    return numEng;

}



function stdToMonth(num){

    let month;

    switch (num.toString()) {
        case "1":
            month = "ENERO"
            break;
        case "2":
            month = "FEBRERO"
            break;
        case "3":
            month = "MARZO"
            break;
        case "4":
            month = "ABRIL"
            break;
        case "5":
            month = "MAYO"
            break;
        case "6":
            month = "JUNIO"
            break;
        case "7":
            month = "JULIO"
            break;
        case "8":
            month = "AGOSTO"
            break;
        case "9":
            month = "SEPTIEMBRE"
            break;
        case "10":
            month = "OCTUBRE"
            break;
        case "11":
            month = "NOVIEMBRE"
            break;
        case "12":
            month = "DICIEMBRE"
            break;
        default:
            break;
    }

    return month;
    
}

function stdToDigits(num,digits){

    

}


