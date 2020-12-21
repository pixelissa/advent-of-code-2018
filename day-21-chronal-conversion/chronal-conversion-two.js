// r2 is the bound register according to the input

const chronalConversionTwo = () => {
    let [r0, r1, r2, r3, r4, r5] = [0, 0, 0, 0, 0, 0];
    let lastSeenValue;
    const seen = new Map();

    while (true) {
        switch (r2) {
            case 0: r3 = 123; break;
            case 1: r3 &= 456; break;
            case 2: r3 === 72 ? r3 = 1 : r3 = 0; break;
            case 3: r2 += r3; break;
            case 4: r2 = 0; break;
            case 5: r3 = 0; break;
            case 6: r1 = r3 | 65536; break;
            case 7: r3 = 4921097; break;
            case 8: r4 = r1 & 255; break;
            case 9: r3 += r4; break;
            case 10: r3 &= 16777215; break;
            case 11: r3 *= 65899; break;
            case 12: r3 &= 16777215; break;
            case 13: 256 > r1 ? r4 = 1 : r4 = 0; break;
            case 14: r2 += r4; break;
            case 15: r2 += 1; break;
            case 16: r2 = 27; break;
            case 17: r4 = 0; break;
            case 18: r5 = r4 + 1; break;
            case 19: r5 *= 256; break;
            case 20: r5 > r1 ? r5 = 1 : r5 = 0; break;
            case 21: r2 += r5; break;
            case 22: r2 += 1; break;
            case 23: r2 = 25; break;
            case 24: r4 += 1; break;
            case 25: r2 = 17; break;
            case 26: r1 = r4; break;
            case 27: r2 = 7; break;
            case 28:
                if (seen.has(r3)) {
                    return lastSeenValue;
                }

                seen.set(r3, true);
                lastSeenValue = r3;
                r4 = 0;
                break;
            case 29: r2 += r4; break;
            case 30: r2 = 5; break;
            default: return;
        }

        r2++;
    }
};

console.log(chronalConversionTwo());