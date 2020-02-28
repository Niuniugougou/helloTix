export const timeformat = {
    timeformat(str) {
        if(!!str) {
            let ymd = str.split('T')[0];
            let hms = str.split('T')[1].split('.')[0];
            return ymd + " " + hms
        }else {
            return str
        }
    }
}