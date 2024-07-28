export const generateColumns = async (): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const columns = Array.from(
        { length: Math.floor(Math.random() * 99) + 2 },
        (_, i) => `Обработка ${i + 1}`,
      );
      resolve(columns);
    }, 1500);
  });
};

export const generateRows = async (
  columnCount: number,
): Promise<boolean[][]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const rows = Array.from(
        { length: Math.floor(Math.random() * 99) + 2 },
        () => Array.from({ length: columnCount }, () => Math.random() < 0.5),
      );
      resolve(rows);
    }, 1500);
  });
};
