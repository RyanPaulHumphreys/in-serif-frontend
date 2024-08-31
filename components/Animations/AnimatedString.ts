export default function GetAnimatedStringFrame(from : string, to : string, t : number) {
    if (t === from.length) return '';

    let result : string = '';
    if (t < from.length) {
        result = from.substring(0, from.length - t);
    } else {
        const index = t - from.length;
        result = to.substring(0, index);
    }
    return result;
}
