// File path: findIntersection.ts

export const findIntersection = async (caseData: any) => {
  if (caseData.length === 1) {
    return {
      start_time_used: caseData[0].start_time,
      end_time_used: caseData[0].end_time,
    };
  }

  const intersection: any = { start_time_used: null, end_time_used: null };

  for (let i = 0; i < caseData.length; i++) {
    for (let j = i + 1; j < caseData.length; j++) {
      const start1 = caseData[i].start_time ? new Date(caseData[i].start_time) : null;
      const end1 = caseData[i].end_time ? new Date(caseData[i].end_time) : null;
      const start2 = caseData[j].start_time ? new Date(caseData[j].start_time) : null;
      const end2 = caseData[j].end_time ? new Date(caseData[j].end_time) : null;

      if (
        (start1 === null || end2 === null || start1 <= end2) &&
        (end1 === null || start2 === null || end1 >= start2)
      ) {
        const start_time_used =
          start1 && start2 ? (start1 > start2 ? start1 : start2) : start1 ? start1 : start2;
        const end_time_used = end1 && end2 ? (end1 < end2 ? end1 : end2) : end1 ? end1 : end2;

        if (
          intersection.start_time_used === null ||
          (start_time_used && start_time_used > new Date(intersection.start_time_used))
        ) {
          intersection.start_time_used = start_time_used ? start_time_used.toISOString() : null;
        }
        if (
          intersection.end_time_used === null ||
          (end_time_used && end_time_used < new Date(intersection.end_time_used))
        ) {
          intersection.end_time_used = end_time_used ? end_time_used.toISOString() : null;
        }
      }
    }
  }

  if (intersection.start_time_used) {
    intersection.start_time_used = intersection.start_time_used.replace('.000Z', 'Z');
  }
  if (intersection.end_time_used) {
    intersection.end_time_used = intersection.end_time_used.replace('.000Z', 'Z');
  }

  return intersection;
};
