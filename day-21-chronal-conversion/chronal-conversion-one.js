// See notes at bottom
// r2 is the bound register according to the input

const chronalConversionOne = () => {
    let [r0, r1, r2, r3, r4, r5] = [0, 0, 0, 0, 0, 0];

    while (true) {
        switch (r2) {
            case 0: r3 = 123; break;
            case 1: r3 &= 456; break;
            case 2: r3 = r3 === 72 ? 1 : 0; break;
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
            case 13: r4 = 256 > r1 ? 1 : 0; break;
            case 14: r2 += r4; break;
            case 15: r2 += 1; break;
            case 16: r2 = 27; break;
            case 17: r4 = 0; break;
            case 18: r5 = r4 + 1; break;
            case 19: r5 *= 256; break;
            case 20: r5 = r5 > r1 ? 1 : 0; break;
            case 21: r2 += r5; break;
            case 22: r2 += 1; break;
            case 23: r2 = 25; break;
            case 24: r4 += 1; break;
            case 25: r2 = 17; break;
            case 26: r1 = r4; break;
            case 27: r2 = 7; break;
            case 28:
                // We return r3 the first time we get here, because r3 is what r0 should be equal to
                // in order to halt the program in the fewest instructions             
                return r3;
            case 29: r2 += r4; break;
            case 30: r2 = 5; break;
            default: return;
        }

        r2++;
    }
};

console.log(chronalConversionOne());

/*
ip 2

#0	seti 123 0 3
    r[3] = 123

#1	bani 3 456 3
    r[3] &= 456

#2	eqri 3 72 3
#3	addr 3 2 2	
#4	seti 0 0 2
    if r[3] !== 72 {
        loop forever (#4)
    }

#5	seti 0 0 3
    r[3] = 0

#6	bori 3 65536 1
    r[1] = r[3] | 0b10000000000000000   # ^2

#7	seti 4921097 0 3
    r[3] = 4921097
    
#8	bani 1 255 4		
    r[4] = r[1] & 0b11111111    # ^2 - 1

#9	addr 3 4 3			
    r[3] += r[4]

#10	bani 3 16777215 3	
    r[3] &= 0b111111111111111111111111  # ^2 - 1

#11	muli 3 65899 3		
    r[3] *= 0b10000000101101011

#12	bani 3 16777215 3	
    r[3] &= 0b111111111111111111111111

#13	gtir 256 1 4
#14	addr 4 2 2
#15	addi 2 1 2
    if 256 > r[1] {
        #16	seti 27 8 2
        Jump to 28
    }

#17	seti 0 5 4
    r[4] = 0
    
#18	addi 4 1 5
    r[5] = r[4] + 1
    
#19	muli 5 256 5
    r[5] *= 256

#20	gtrr 5 1 5
#21	addr 5 2 2
#22	addi 2 1 2
    if r[1] > r[5] {
        #23	seti 25 1 2
        Jump to 26
    }

#24	addi 4 1 4
    r[4]++

#25	seti 17 8 2
    r[2] = 17

#26	setr 4 3 1
    r[1] = r[4]

#27	seti 7 9 2
    r[2] = 7

#28	eqrr 3 0 4	
#29	addr 4 2 2
    if r[3] === r[0] {
        //??
    }
    else {
        #30	seti 5 4 2
        Jump back to line 6 
    }

*/