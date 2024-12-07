import { createClock, scaleTimeSeries } from "../lib";

createClock((clock, data) => {
  console.log(data);
  const radius = clock.width * 0.5;
  const supplyFromGrid = data["Electricity-supply-from-grid"];
  const supplyFromGridHour = supplyFromGrid.slice(0, 24);
  const supplyPhoto = data["Electricity-supply-photovoltaics"];
  const supplyPhotoHour = supplyPhoto.slice(0, 24);

  const min = radius * 0.0;
  const max = radius * 0.82;
  const [scaledSupplyFromGrid, scaledSupplyPhoto] = scaleTimeSeries(
    [supplyFromGridHour, supplyPhotoHour],
    min,
    max
  );

  clock.addRadialChart(scaledSupplyFromGrid, {
    subdivisions: 4,
    tint: {
      r: 255,
      g: 255,
      b: 255,
      a: 255,
    },
  });

  clock.addRadialChart(scaledSupplyPhoto, {
    subdivisions: 4,
    tint: {
      r: 255,
      g: 255,
      b: 255,
      a: 255,
    },
  });

  const steps = 80;

  clock.addRectangles({
    count: 12,
    width: 3,
    height: 100,
    offset: 20,
  });

  clock.addCustomShape({
    count: 12,
    handler: async (index, instance) => {
      return instance.createTextElement({
        text: `${index.toString().padStart(2, "0")}`,
        fontSize: 20,
        offset: 10,
      });
    },
  });
});
