import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class ProductCodeProvider {
  findMaxIncreasingSubstrings(s: string): [number, number][] {
    const n: number = s.length;
    let result: [number, number][] = [];
    let max_length: number = 0;
    let start: number = 0;

    for (let i = 1; i <= n; i++) {
      if (i === n || s[i] <= s[i - 1]) {
        const length = i - start;
        if (length > max_length) {
          max_length = length;
          result = [[start, i - 1]];
        } else if (length === max_length) {
          result.push([start, i - 1]);
        }
        start = i;
      }
    }

    return result;
  }

  generateProductCode(productName: string): string {
    const hash = crypto
      .createHash('md5')
      .update(productName)
      .digest('hex')
      .substring(0, 7);

    const normalizedName = productName.toLowerCase().replace(/ /g, '');

    const substringsIndices = this.findMaxIncreasingSubstrings(normalizedName);

    const substrings = substringsIndices.map(([start, end]) =>
      normalizedName.slice(start, end + 1),
    );
    const concatenated = substrings.join('');

    const minStart = Math.min(...substringsIndices.map(([start]) => start));
    const maxEnd = Math.max(...substringsIndices.map(([, end]) => end));

    const productCode = `${hash}-${minStart}${concatenated}${maxEnd}`;
    return productCode;
  }
}
