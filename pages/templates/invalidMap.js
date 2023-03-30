export const invalidMap = {
  name: "invalidMap",
  start: [0, 0],
  end: [0, 2],
  map: [
    [
      {
        enabled: true,
        directions: { north: false, south: true, east: true, west: false },
        entities: [],
      },
      {
        enabled: true,
        directions: { north: false, south: true, east: false, west: true },
        entities: [],
      },
      {
        directions: { north: false, south: false, east: false, west: false },
        entities: [],
      },
    ],
    [
      {
        enabled: true,
        directions: { north: true, south: false, east: true, west: false },
        entities: [],
      },
      {
        enabled: true,
        directions: { north: true, south: true, east: true, west: true },
        entities: [],
      },
      {
        enabled: true,
        directions: { north: false, south: false, east: false, west: true },
        entities: [],
      },
    ],
    [
      {
        enabled: false,
        directions: { north: false, south: false, east: false, west: false },
        entities: [],
      },
      {
        enabled: true,
        directions: { north: true, south: false, east: false, west: false },
        entities: [],
      },
      {
        enabled: false,
        directions: { north: false, south: false, east: false, west: false },
        entities: [],
      },
    ],
  ],
};
