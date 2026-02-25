let _lastMs = 0;
let _counter = 0;

function pad(num: number, len: number) {
    return (Array(len).join("0") + num).slice(-len);
}

export function AutoTimeID() {
    const d = new Date();

    const yy = String(d.getFullYear()).slice(2);
    const MM = pad(d.getMonth() + 1, 2);
    const DD = pad(d.getDate(), 2);
    const hh = pad(d.getHours(), 2);
    const mm = pad(d.getMinutes(), 2);
    const ss = pad(d.getSeconds(), 2);
    const ms = pad(d.getMilliseconds(), 3);

    const nowMs = d.getTime();

    // 判断是否同一毫秒
    if (nowMs === _lastMs) {
        _counter++;
    } else {
        _lastMs = nowMs;
        _counter = 0;
    }

    const countStr = pad(_counter, 3); // 000~999

    return `${yy}${MM}${DD}${hh}${mm}${ss}${ms}${countStr}`;
}
