import {priceConvert} from '../../scripts/utils/price.js';

//unit testing - only testing a single function

describe('test suite: formatCurrency', ()=>{
    it('converts cents into dollars',()=>{
        expect(priceConvert(2095)).toEqual('20.95');
    });

    it('works with 0',()=>{
        expect(priceConvert(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent',()=>{
        expect(priceConvert(2000.5)).toEqual('20.01');
    });

    it('rounds down to the nearest cent',()=>{
        expect(priceConvert(2000.4)).toEqual('20.00');
    });

    it('works with negative numbers',()=>{
        expect(priceConvert(-500)).toEqual('-5.00');
    });
});