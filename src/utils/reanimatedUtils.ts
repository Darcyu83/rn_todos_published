export const getSnapPoints = (
  currentX: number,
  velocity: number,
  points: number[]
) => {
  'worklet';

  const point = currentX + 0.1 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  const result = points.filter((p) => Math.abs(point - p) === minDelta)[0];
  return result;
};

export default { getSnapPoints };
