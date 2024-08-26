// File path: __tests__/findIntersection.test.ts
/// <reference types="jest" />
import { findIntersection } from '../demo';

describe('findIntersection', () => {
  test('should return the single time range when only one is provided', async () => {
    const caseData = [
      { start_time: '2024-04-10T00:00:00Z', end_time: '2024-04-20T00:00:00Z' }
    ];
    const result = await findIntersection(caseData);
    expect(result).toEqual({
      start_time_used: '2024-04-10T00:00:00Z',
      end_time_used: '2024-04-20T00:00:00Z',
    });
  });

  test('should return an empty intersection when there is no overlap', async () => {
    const caseData = [
      { start_time: '2024-04-10T00:00:00Z', end_time: '2024-04-20T00:00:00Z' },
      { start_time: '2024-04-21T00:00:00Z', end_time: '2024-04-25T00:00:00Z' }
    ];
    const result = await findIntersection(caseData);
    expect(result).toEqual({
      start_time_used: null,
      end_time_used: null,
    });
  });

  test('should return the correct intersection when there is an overlap', async () => {
    const caseData = [
      { start_time: '2024-04-10T00:00:00Z', end_time: '2024-04-20T00:00:00Z' },
      { start_time: '2024-04-15T00:00:00Z', end_time: '2024-04-25T00:00:00Z' }
    ];
    const result = await findIntersection(caseData);
    expect(result).toEqual({
      start_time_used: '2024-04-15T00:00:00Z',
      end_time_used: '2024-04-20T00:00:00Z',
    });
  });

  test('should handle missing start_time or end_time in the time ranges', async () => {
    const caseData = [
      { start_time: '2024-04-10T00:00:00Z', end_time: '2024-04-20T00:00:00Z' },
      { start_time: null, end_time: '2024-04-25T00:00:00Z' }
    ];
    const result = await findIntersection(caseData);
    expect(result).toEqual({
      start_time_used: '2024-04-10T00:00:00Z',
      end_time_used: '2024-04-20T00:00:00Z',
    });
  });

  test('should handle all time ranges having null start_time or end_time', async () => {
    const caseData = [
      { start_time: null, end_time: null },
      { start_time: null, end_time: null }
    ];
    const result = await findIntersection(caseData);
    expect(result).toEqual({
      start_time_used: null,
      end_time_used: null,
    });
  });
});
