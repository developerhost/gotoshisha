import { describe, it, expect } from 'vitest';
import { double, toUpperCase, sum, isEmpty } from './test-utils';

describe('test-utils', () => {
  describe('double関数のテスト', () => {
    it('正の数を2倍にする', () => {
      expect(double(5)).toBe(10);
      expect(double(3)).toBe(6);
    });

    it('負の数を2倍にする', () => {
      expect(double(-5)).toBe(-10);
      expect(double(-3)).toBe(-6);
    });

    it('0を2倍にする', () => {
      expect(double(0)).toBe(0);
    });

    it('小数を2倍にする', () => {
      expect(double(2.5)).toBe(5);
      expect(double(1.1)).toBeCloseTo(2.2);
    });
  });

  describe('toUpperCase関数のテスト', () => {
    it('小文字を大文字に変換する', () => {
      expect(toUpperCase('hello')).toBe('HELLO');
      expect(toUpperCase('world')).toBe('WORLD');
    });

    it('既に大文字の文字列はそのまま返す', () => {
      expect(toUpperCase('HELLO')).toBe('HELLO');
    });

    it('空文字列を処理する', () => {
      expect(toUpperCase('')).toBe('');
    });

    it('混在した文字列を処理する', () => {
      expect(toUpperCase('Hello World')).toBe('HELLO WORLD');
    });
  });

  describe('sum関数のテスト', () => {
    it('正の数の配列の合計を計算する', () => {
      expect(sum([1, 2, 3, 4, 5])).toBe(15);
      expect(sum([10, 20, 30])).toBe(60);
    });

    it('負の数を含む配列の合計を計算する', () => {
      expect(sum([-1, -2, -3])).toBe(-6);
      expect(sum([1, -2, 3])).toBe(2);
    });

    it('空の配列の合計は0になる', () => {
      expect(sum([])).toBe(0);
    });

    it('単一要素の配列の合計を計算する', () => {
      expect(sum([42])).toBe(42);
    });

    it('小数を含む配列の合計を計算する', () => {
      expect(sum([1.5, 2.5, 3])).toBe(7);
    });
  });

  describe('isEmpty関数のテスト', () => {
    it('空のオブジェクトに対してtrueを返す', () => {
      expect(isEmpty({})).toBe(true);
    });

    it('プロパティを持つオブジェクトに対してfalseを返す', () => {
      expect(isEmpty({ name: 'test' })).toBe(false);
      expect(isEmpty({ a: 1, b: 2 })).toBe(false);
    });

    it('undefinedやnullの値を持つプロパティがある場合はfalseを返す', () => {
      expect(isEmpty({ value: undefined })).toBe(false);
      expect(isEmpty({ value: null })).toBe(false);
    });
  });
});
